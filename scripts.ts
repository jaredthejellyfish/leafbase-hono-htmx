import Bun from 'bun';
import { $ } from 'bun';
import figlet from 'figlet';
import { watch } from 'fs';
import ora from 'ora';

process.on('SIGINT', () => {
  watcher.close();
  process.exit(0);
});

process.on('exit', (code) => {
  console.log(`Process exited with code ${code}`);
});

figlet.text(
  'Leafbase',
  {
    font: 'Avatar',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true,
  },
  function (err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(data);
  },
);

const watcher = watch('src/scripts/', { recursive: true }, async () => {
  const existingOutput = await $`ls assets/static/*.js`.text();

  if (existingOutput.length > 0) {
    const removeSpinner = ora('Removing existing output files').start();
    await $`rm -rf assets/static/*.js`;
    removeSpinner.succeed('Removed existing output files');
  }
  const scripts = await $`ls src/scripts/*.ts`.text();

  const filePaths = scripts
    .split('\n')
    .map((s) => `./${s}`)
    .filter((s) => s.length > 2);

  const fileNames = filePaths.map((s) => s.split('/').pop());

  const buildSpinner = ora(`Compiling scripts: ${fileNames}`).start();

  const buildTimeStart = Date.now();
  const out = await Bun.build({
    entrypoints: [...filePaths],
    outdir: './assets/static/',
    minify: false,
    target: 'browser',
  });
  const buildTime = Date.now() - buildTimeStart;

  if (out.success) buildSpinner.succeed(`Compiled scripts in ${buildTime}ms`);
  else buildSpinner.fail(`Failed to compile scripts with error: ${out.logs}`);
});
