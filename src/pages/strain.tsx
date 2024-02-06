import StarRating from "@c/star-rating";
import { effects, terpenes } from "@lb/data/colors";
import StrainSoma from "@c/strain-soma";
import NavBreadcrumbs from "@c/nav-breadcrumbs";
import { Strain } from "@/types";

type Props = { strain: Strain };

async function StrainPage({ strain }: Props) {
  return (
    <main class="justify-center px-5 py-3 md:px-16">
      <NavBreadcrumbs
        urls={[
          { name: "Strains", url: "/strains" },
          {
            name: strain.name as string,
            url: `/strains/${strain.slug}`, // <- /strain
          },
        ]}
      />
      <div
        id="card"
        class="relative flex flex-col items-center justify-center rounded border border-zinc-300 pb-8 shadow dark:border-transparent dark:bg-zinc-900"
      >
        <div
          id="header"
          class="flex w-full flex-col items-center justify-center gap-8 px-5 pt-8 md:flex-row md:px-8"
        >
          <div
            id="vertical-1"
            class="flex h-52 items-center justify-center rounded-sm md:w-1/3 md:border md:dark:border-neutral-700 md:shadow-sm md:dark:bg-zinc-950/10 md:dark:shadow"
          >
            <img
              class="rounded"
              src={strain.nugImage!}
              alt={strain?.slug}
              width={200}
              priority
              id="strain-image"
              height={200}
            />
          </div>
          <div id="vertical-2" class="w-full md:w-2/3">
            <div class="mb-2 flex flex-row items-center gap-3">
              {strain.phenotype && (
                <div class="inline-block rounded bg-gray-200 px-2 py-1 text-xs font-medium dark:bg-zinc-700 dark:shadow">
                  {strain.phenotype}
                </div>
              )}
              <div class="flex flex-row gap-4 px-1 text-xs text-zinc-500 dark:text-zinc-300">
                {strain.thcPercent ? (
                  <span class="">
                    THC {strain.thcPercent && strain.thcPercent}%
                  </span>
                ) : null}
                {strain.cannabinoids?.cbd?.percentile50 ? (
                  <span class="">
                    CBD: {strain && strain?.cannabinoids?.cbd?.percentile50}%
                  </span>
                ) : null}
              </div>
            </div>
            <h1 class="mb-0.5 text-2xl font-bold">{strain.name}</h1>
            <h2 class="font-semi min-h-10 text-zinc-400 md:w-2/3">
              {strain.subtitle}
            </h2>
            <span class="mt-1 flex w-48 items-center justify-start gap-3 text-zinc-800 dark:text-zinc-200">
              {strain.averageRating &&
                Math.round(strain.averageRating * 10) / 10}
              <StarRating rating={strain.averageRating || 0} />
            </span>
            <div class="mt-1 flex flex-row gap-3 text-sm font-medium capitalize">
              <span class="flex flex-row items-center gap-1">
                <div
                  style={{
                    backgroundColor:
                      effects[strain.topEffect || "rgb(70, 130, 180)"],
                  }}
                  class="h-2.5 w-2.5 rounded-full"
                ></div>
                <p class="p-0">{strain.topEffect}</p>
              </span>
              <span class="flex flex-row items-center gap-1">
                <div
                  style={{
                    backgroundColor:
                      terpenes[strain.topTerpene || "rgb(70, 130, 180)"],
                  }}
                  class="h-2.5 w-2.5 rounded-full"
                ></div>
                <p class="p-0">{strain.topTerpene}</p>
              </span>
            </div>
          </div>
        </div>
        <div
          id="body"
          class="flex w-full flex-col justify-center gap-5 px-5 md:flex-row md:px-8"
        >
          <div class="mt-3 md:w-1/3">
            <StrainSoma strain={strain} />
          </div>
          <div class="px-0.5 md:w-2/3" id="strain-description">
            {strain.description}
          </div>
        </div>
      </div>
      <div class="mt-5">
        {/* <CommentSection
      strainName={strain.name}
      comments={strain.strain_comments}
      strainId={strain.id}
      strainSlug={strain.slug}
      session={session}
    /> */}
      </div>
    </main>
  );
}

export default StrainPage;
