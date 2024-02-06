import StrainCard from "@c/strain-card";
import { cn, getPaginatedStrains } from "@lb/utils";

type Props = {
  filter: "re" | "az" | "za" | "sr";
};

const filters = {
  re: "Recommended",
  az: "A-Z",
  za: "Z-A",
  sr: "Star Rating",
};

export default async function AllStrains({ filter }: Props) {
  const { strains, error } = await getPaginatedStrains(filter, 1);

  if (error) {
    return <div>Error loading strains</div>;
  }

  return (
    <main class="px-5 py-3 pb-8 md:px-16 xl:px-36">
      <div class="flex flex-col items-center">
        <div id="heading" class="">
          <h1 class="mb-2 mt-4 text-3xl font-bold ">All strains</h1>
          <h3 class="">
            Browse the most comprehensive weed strain library on the web. Browse
            weed strains by cannabis type (indica, sativa, or hybrid), effects,
            or number of comments.
          </h3>
          <div
            class="flex items-center justify-between px-1 font-medium"
            _="on click from elsewhere add .opacity-0 to #sort-modal"
          >
            <span class="mt-4 text-xs text-zinc-400">{6330} strains</span>
            <span class="mt-4 flex min-w-20 flex-row items-center justify-end gap-1 text-xs text-zinc-400 relative">
              Sort by
              <span
                class="flex cursor-pointer flex-row items-center text-zinc-500 dark:text-zinc-300 relative"
                _="on click toggle .scale-0 on #sort-modal then toggle .opacity-0 on #sort-modal"
              >
                {filters[filter]}
                <svg
                  class="arrow ml-1.5"
                  stroke="currentColor"
                  fill="none"
                  stroke-width="0"
                  viewBox="0 0 15 15"
                  height="1.3em"
                  width="1.3em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              <div
                class="absolute bg-zinc-800 top-0 z-50 mt-5 rounded-md p-0.5 scale-0 opacity-0 transition-opacity duration-200"
                id="sort-modal"
              >
                <a
                  href="/strains?filter=re"
                  class={cn(
                    "filter-item flex w-full items-start rounded p-3 hover:bg-zinc-100/80 dark:dark:hover:bg-zinc-500 pr-3",
                    filter === "re" && "text-green-500"
                  )}
                >
                  Recommended
                </a>
                <a
                  href="/strains?filter=az"
                  class={cn(
                    "filter-item flex w-full items-start rounded p-3 hover:bg-zinc-100/80 dark:hover:bg-zinc-500 pr-3",
                    filter === "az" && "text-green-500"
                  )}
                >
                  A-Z
                </a>
                <a
                  href="/strains?filter=za"
                  class={cn(
                    "filter-item flex w-full items-start rounded p-3 hover:bg-zinc-100/80 dark:hover:bg-zinc-500 pr-3",
                    filter === "za" && "text-green-500"
                  )}
                >
                  Z-A
                </a>
                <a
                  href="/strains?filter=sr"
                  class={cn(
                    "filter-item flex w-full items-start rounded p-3 hover:bg-zinc-100/80 dark:hover:bg-zinc-500 pr-3",
                    filter === "sr" && "text-green-500"
                  )}
                >
                  Star Rating
                </a>
              </div>
            </span>
          </div>
          <span class="mt-1 hidden w-full rounded border border-zinc-600/50 p-2 text-xs text-zinc-600 md:block">
            These results are based on user comments and are not a substitute
            for professional medical advice.
          </span>
        </div>
        <div class="flex w-full flex-col items-center justify-center gap-4">
          <div
            id="response-div"
            class="relative grid gap-x-4 md:grid-cols-3 xl:grid-cols-4 gap-y-4 mt-4"
          >
            {strains &&
              strains.map((strain, index) => (
                <StrainCard
                  strain={strain}
                  filter={filter}
                  loadMore={index === strains.length - 1}
                  page={2}
                />
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
