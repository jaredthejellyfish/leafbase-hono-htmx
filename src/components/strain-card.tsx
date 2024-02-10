import Image from '@c/Image';
import StarRating from '@c/star-rating';

import { Strain } from '@/types';

type Props = {
  strain: Strain;
  loadMore?: boolean;
  page?: number;
  filter: 're' | 'az' | 'za' | 'sr';
};

type Colors = {
  [key: string]: string;
};

const terpenes: Colors = {
  myrcene: '#7EBF73',
  caryophyllene: '#B25C52',
  terpinolene: '#4A7597',
  linalool: '#9A67B5',
  pinene: '#3B8A5A',
  limonene: '#F9B122',
  ocimene: '#2AA39F',
  Unknown: '#778899',
};

const effects: Colors = {
  Hungry: '#FF8C00',
  Giggly: '#FF69B4',
  Euphoric: '#9370DB',
  Energetic: '#F5A623',
  Uplifted: '#20B2AA',
  Aroused: '#FF4500',
  Tingly: '#BA55D3',
  Happy: '#00FF00',
  Focused: '#FFD700',
  null: '#778899',
  Talkative: '#4682B4',
  Creative: '#FFA07A',
  Relaxed: '#8B4513',
  Sleepy: '#1E90FF',
  Unknown: '#778899',
};

function StrainCard({ strain, loadMore, page, filter }: Props) {
  return (
    <div
      class="max-h-[280px] w-full rounded-xl p-3 shadow-md dark:bg-zinc-900 dark:shadow-none sm:max-h-full md:max-w-[280px]"
      href={`/strains/${strain.slug}`} 
      hx-get={
        loadMore
          ? `/api/strains?page=${page ? page : 0}&filter=${filter}`
          : undefined
      }
      hx-trigger={loadMore ? 'intersect once' : undefined}
      hx-target={loadMore ? 'this' : undefined}
      hx-swap={loadMore ? 'outerHTML' : undefined}
    >
      <a href={`/strains/${strain.slug}`} class="flex flex-row md:flex-col">
        <div
          class="mr-3 flex max-h-[280px] w-1/2 max-w-[280px] items-center justify-center rounded-lg border border-white bg-zinc-300/10 dark:border-transparent dark:border-zinc-800 dark:bg-zinc-950/30 sm:mb-1 sm:mr-0 sm:w-full"
          id="image"
        >
          <Image
            class="aspect-square h-full max-h-[250px] w-full max-w-[250px] rounded-lg object-contain p-4 dark:opacity-90"
            lazy={page !== 2}
            width={250}
            height={250}
            alt={`${strain.name} nug shot`}
            src={strain.nugImage || '/static/placeholder.jpg'}
          />
        </div>

        <div class="w-1/2 scale-[93%] md:w-full">
          <div class="mb-1 flex w-14 items-center justify-center rounded bg-gray-200 px-2 py-1 text-xs font-medium dark:bg-zinc-700 dark:shadow">
            {strain.phenotype || 'N/A'}
          </div>

          <span class="mt-1 px-1 font-medium">{strain.name}</span>
          <span class="line-clamp-3 h-14 px-1 text-xs font-normal text-gray-500 sm:text-sm">
            {strain.subtitle
              ? strain.subtitle
              : `No description found for ${strain.name}`}
          </span>
          <div class="mt-2 flex flex-row items-center gap-1 p-1 text-sm">
            <span class="flex h-4 w-6 items-center justify-center">
              {strain.averageRating
                ? (Math.round(strain.averageRating * 10) / 10).toFixed(1)
                : '0.0'}
            </span>
            {<StarRating rating={strain.averageRating || 0} />}
          </div>
          <div class="flex flex-row gap-4 px-1 text-xs text-zinc-500 dark:text-zinc-300">
            <span class="">THC: {strain.thcPercent || '?'}%</span>

            {strain.cannabinoids && strain.cannabinoids.cbd.percentile50 ? (
              <span class="">CBD: {strain.cannabinoids.cbd.percentile50}%</span>
            ) : null}
          </div>
          <div class="mt-2 flex flex-col px-1 text-xs font-medium capitalize md:flex-row md:items-center md:gap-3">
            {strain.topEffect && (
              <span class="flex flex-row items-center gap-1">
                <div
                  style={{
                    backgroundColor: effects[strain.topEffect || 'Unknown'],
                  }}
                  class="h-2.5 w-2.5 rounded-full"
                ></div>
                <p class="p-0">{strain.topEffect}</p>
              </span>
            )}
            {strain.topTerpene && (
              <span class="flex flex-row items-center gap-1">
                <div
                  style={{
                    backgroundColor: terpenes[strain.topTerpene || 'Unknown'],
                  }}
                  class="h-2.5 w-2.5 rounded-full"
                ></div>
                <p class="p-0">{strain.topTerpene}</p>
              </span>
            )}
          </div>
        </div>
      </a>
    </div>
  );
}

export default StrainCard;
