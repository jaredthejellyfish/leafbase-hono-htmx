import Bun, { argv } from 'bun';
import { $ } from 'bun';
import figlet from 'figlet';
import ora from 'ora';

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
const start = Date.now();

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
  minify: true,
});
const buildTime = Date.now() - buildTimeStart;

if (out.success) buildSpinner.succeed(`Compiled scripts in ${buildTime}ms`);
else buildSpinner.fail(`Failed to compile scripts with error: ${out.logs}`);

if (argv.includes('--scripts') || argv.includes('-s')) process.exit(0);

const supabaseSpinner = ora('Generating supabase types').start();
const supabaseTimeStart = Date.now();
const data =
  await $`supabase gen types typescript --project-id euwnyenhzhztqztezjdn > ./src/lib/database/index.ts`.text();

const supabaseTime = Date.now() - supabaseTimeStart;

if (data.length > 0) {
  supabaseSpinner.fail('Failed to generate supabase types');
} else {
  supabaseSpinner.succeed(`Generated supabase types in ${supabaseTime}ms`);
}

const prettierSpinner = ora('Prettifying scripts').start();
const prettierStart = Date.now();
const prettier = await $`prettier --write .`.text();
const prettierTime = Date.now() - prettierStart;

if (prettier.split('\n').length < 1) {
  prettierSpinner.fail('Failed to prettify scripts');
} else
  prettierSpinner.succeed(
    `Prettified ${prettier.split('\n').length} scripts in ${prettierTime}ms`,
  );

const tailwindSpinner = ora('Generating tailwind css').start();
const tailwindStart = Date.now();
const tailwind =
  await $`bunx tailwindcss -o ./assets/static/index.css --minify`.quiet();

const tailwindTime = Date.now() - tailwindStart;

if (tailwind.exitCode === 0)
  tailwindSpinner.succeed(`Generated tailwind css in ${tailwindTime}ms`);
else tailwindSpinner.fail('Failed to generate tailwind css');

const eslintSpinner = ora('Running eslint').start();
const eslintStart = Date.now();
const eslint = await $`eslint . --fix`;
const eslintTime = Date.now() - eslintStart;
if (eslint.exitCode === 0)
  eslintSpinner.succeed(`Ran eslint in ${eslintTime}ms`);
else {
  eslintSpinner.fail('There was an error in eslint!');
  throw new Error('There was an eslint error');
}

const deploySpinner = ora('Deploying to cloudflare workers').start();
const deployStart = Date.now();
const deploy = await $`bunx wrangler deploy --minify src/index.tsx`.text();

const success = deploy.split('Current Deployment ID:').length > 1;

if (!success) deploySpinner.fail('Failed to deploy to cloudflare workers');
else
  deploySpinner.succeed(
    `Deployed to Cloudflare in ${Date.now() - deployStart}ms`,
  );

const outsplit = deploy.split('\n');

const url = outsplit.find((s) => s.includes('https://'))?.trim();
const deployId = outsplit
  .find((s) => s.includes('Current Deployment ID:'))
  ?.replace('Current Deployment ID:', '')
  .trim();

console.log('');
console.log('Total deploy time:', (Date.now() - start) / 1000, 'seconds');
console.log('');
console.log('Deployed to:', url);
console.log('Deployment ID:', deployId);
