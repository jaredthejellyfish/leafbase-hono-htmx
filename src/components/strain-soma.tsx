import Badge from '@c/badge';

import { Strain } from '@/types';

type Effect = {
  [key: string]: string;
};

type Props = {
  strain: Strain;
};

const effects: Effect = {
  aroused: 'uninterested',
  creative: 'unimaginative',
  energetic: 'lethargic',
  euphoric: 'dysphoric',
  focused: 'distracted',
  giggly: 'serious',
  happy: 'sad',
  hungry: 'full',
  relaxed: 'tense',
  sleepy: 'alert',
  talkative: 'quiet',
  tingly: 'numb',
  uplifted: 'downcast',
};

const positiveEffects: Effect = {
  aroused: 'low libido',
  creative: 'creative block',
  energetic: 'fatigue',
  euphoric: 'depression',
  focused: 'ADD',
  giggly: 'apathy',
  happy: 'sadness',
  hungry: 'loss of appetite',
  relaxed: 'anxiety',
  sleepy: 'insomnia',
  talkative: 'social anxiety',
  tingly: 'lack of sensation',
  uplifted: 'low mood',
};

const effectColors: Effect = {
  aroused: 'indigo',
  uninterested: 'yellow',
  creative: 'green',
  unimaginative: 'red',
  energetic: 'purple',
  lethargic: 'dark',
  euphoric: 'pink',
  dysphoric: 'default',
  focused: 'blue',
  distracted: 'orange',
  giggly: 'yellow',
  serious: 'default',
  happy: 'green',
  sad: 'red',
  hungry: 'purple',
  full: 'dark',
  relaxed: 'indigo',
  tense: 'yellow',
  sleepy: 'blue',
  alert: 'red',
  talkative: 'green',
  quiet: 'dark',
  tingly: 'pink',
  numb: 'default',
  uplifted: 'yellow',
  downcast: 'red',
};

function getTopThreeEffects(strain: Strain): string[] {
  try {
    const effects = Object.values(strain.effects);
    const sortedEffects = effects.sort((a, b) => b.score - a.score);
    const topThree = sortedEffects.slice(0, 3);
    return topThree.map((effect) => effect.name);
  } catch (error) {
    return [];
  }
}

function getTopThreeEffectsNegative(strain: Strain): string[] {
  try {
    const effects = Object.values(strain.effects);
    const sortedEffects = effects.sort((a, b) => a.score - b.score);
    const topThree = sortedEffects.slice(0, 3);
    return topThree.map((effect) => effect.name);
  } catch (error) {
    return [];
  }
}

function getPositivesFromTopThree(strain: Strain): string[] {
  try {
    const topThree = getTopThreeEffects(strain);
    const positives = topThree.map((effect) => positiveEffects[effect]);
    return positives;
  } catch (error) {
    return [];
  }
}

const StrainSoma = (props: Props) => {
  const { strain } = props;
  const topThreeEffects = getTopThreeEffects(strain);
  const topThreeEffectsNegative = getTopThreeEffectsNegative(strain).map(
    (effect) => effects[effect],
  );
  const positives = getPositivesFromTopThree(strain);

  return (
    <div
      class="flex flex-col gap-2 rounded border border-zinc-200 p-2 px-3 dark:border-zinc-600 dark:bg-zinc-800 md:mt-7"
      id="strain-soma"
    >
      <h3 class="text-sm font-bold uppercase">Strain soma</h3>
      {topThreeEffects.length >= 3 && (
        <div class="flex w-full flex-row flex-wrap items-center gap-2 text-xs">
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            height="14px"
            width="14px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
          </svg>
          <p class="hidden sm:hidden md:block xl:block">Feelings:</p>
          <div class="flex flex-row flex-wrap gap-2">
            {topThreeEffects.map((effect) => (
              <Badge text={effect} color={effectColors[effect]} />
            ))}
          </div>
        </div>
      )}
      {topThreeEffects.length >= 3 && (
        <div class="flex w-full flex-row flex-wrap items-center gap-2 text-xs">
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            height="14px"
            width="14px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
          </svg>
          <p class="hidden sm:hidden md:block xl:block">Negatives:</p>
          <div class="flex flex-row flex-wrap gap-2">
            {topThreeEffectsNegative.map((effect) => (
              <Badge text={effect} color={effectColors[effect]} />
            ))}
          </div>
        </div>
      )}
      {positives.length >= 3 && (
        <div class="flex w-full flex-row flex-wrap items-center gap-2 text-xs">
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            height="14px"
            width="14px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M13 3a1 1 0 0 1 1 1v4.535l3.928 -2.267a1 1 0 0 1 1.366 .366l1 1.732a1 1 0 0 1 -.366 1.366l-3.927 2.268l3.927 2.269a1 1 0 0 1 .366 1.366l-1 1.732a1 1 0 0 1 -1.366 .366l-3.928 -2.269v4.536a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-4.536l-3.928 2.268a1 1 0 0 1 -1.366 -.366l-1 -1.732a1 1 0 0 1 .366 -1.366l3.927 -2.268l-3.927 -2.268a1 1 0 0 1 -.366 -1.366l1 -1.732a1 1 0 0 1 1.366 -.366l3.928 2.267v-4.535a1 1 0 0 1 1 -1h2z"></path>
          </svg>
          <p class="hidden sm:hidden md:block xl:block">Helps with:</p>
          <div class="-gap-x-2 flex flex-row flex-wrap gap-y-2">
            {positives.map((effect) => (
              <Badge text={effect} color={effectColors[effect]} />
            ))}
          </div>
        </div>
      )}
      <div class="mt-2">
        <div class="mb-1 flex flex-row items-center justify-between px-1 text-xs">
          <p>calm</p> <p>energizing</p>
        </div>
        <div class="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            class="h-2.5 rounded-full bg-green-700/70"
            style={{
              width:
                strain?.effects?.relaxed?.score &&
                `${Math.min(
                  Math.ceil(strain.effects.relaxed.score * 100),
                  100,
                )}%`,
            }}
          ></div>
        </div>
      </div>
      <div class="mt-2">
        <div class="mb-1 flex flex-row items-center justify-between px-1 text-xs">
          <p>low THC</p> <p>high THC</p>
        </div>
        <div class="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            class="h-2.5 rounded-full bg-green-700/70"
            style={{
              width: `${Math.min(
                Math.ceil(
                  Math.max(
                    0,
                    Math.min(100, ((strain.thcPercent || 0 - 10) / 20) * 100),
                  ),
                ),
                100,
              )}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StrainSoma;
