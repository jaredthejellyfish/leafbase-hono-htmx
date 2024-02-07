import { Hono } from 'hono';
import z from 'zod';

import StrainCard from '@c/strain-card';

import { getPaginatedStrains } from '@lb/utils';

import { supabaseMiddleware } from '@/supabase';

export const apiApp = new Hono();

apiApp.post('/search', supabaseMiddleware, async (c) => {
  const { search } = await c.req.parseBody();
  const { type } = c.req.query();

  const parsedSearch = z
    .object({
      search: z.string().max(40),
      type: z.enum(['main', 'dropdown']).nullable().default('main'),
    })
    .safeParse({ search, type });

  if (!search)
    return c.html(
      <div
        class="absolute left-0 top-12 z-50 hidden w-full rounded bg-white px-2 py-2 shadow-lg dark:bg-zinc-700 dark:text-white"
        id={
          parsedSearch.success && parsedSearch.data.type === 'main'
            ? 'search-results'
            : 'search-results-dropdown'
        }
      />,
    );

  const { data: searchResults, error } = await c.var.supabase.rpc(
    'search_strains',
    {
      search_term: parsedSearch.success ? parsedSearch.data.search : '',
      limit_num: 5,
    },
  );

  if (error) {
    return c.html(
      <div
        class="absolute left-0 top-12 z-50 w-full rounded bg-white px-2 py-2 shadow-lg dark:bg-zinc-700 dark:text-white"
        id={
          parsedSearch.success && parsedSearch.data.type === 'main'
            ? 'search-results'
            : 'search-results-dropdown'
        }
      >
        <p>Error getting search results</p>
      </div>,
    );
  }

  return c.html(
    searchResults && searchResults.length ? (
      <div
        class="absolute left-0 top-12 z-50 w-full rounded bg-white px-2 py-2 shadow-lg dark:bg-zinc-700 dark:text-white"
        id={
          parsedSearch.success && parsedSearch.data.type === 'main'
            ? 'search-results'
            : 'search-results-dropdown'
        }
      >
        {searchResults.map((strain, index) => (
          <>
            {index !== 0 && (
              <div class="border-b border-gray-300 dark:border-gray-600"></div>
            )}
            <a
              href={`/strains/${strain.slug}`}
              class="flex flex-col items-start"
            >
              <div class="flex flex-row items-center gap-2">
                <img
                  src={strain.nugimage}
                  alt={strain.name}
                  width={60}
                  height={60}
                />
                <span>{strain.name}</span>
              </div>
            </a>
          </>
        ))}
      </div>
    ) : (
      <div
        class="absolute left-0 top-12 z-50 hidden w-full rounded bg-white px-2 py-2 shadow-lg dark:bg-zinc-700 dark:text-white"
        id={
          parsedSearch.success && parsedSearch.data.type === 'main'
            ? 'search-results'
            : 'search-results-dropdown'
        }
      />
    ),
  );
});

apiApp.get('/strains', supabaseMiddleware, async (c) => {
  const { page, filter } = c.req.query();

  if (!page) {
    return c.html(<p>No page param provided.</p>);
  }

  const parsedFilter = z.enum(['re', 'az', 'za', 'sr']).safeParse(filter);

  const { strains } = await getPaginatedStrains(
    parsedFilter.success ? parsedFilter.data : 're',
    Number(page),
  );

  return c.html(
    <>
      {strains &&
        strains.map((strain, index) => (
          <StrainCard
            strain={strain}
            filter={parsedFilter.success ? parsedFilter.data : 're'}
            loadMore={index === strains.length - 1}
            page={Number(page) + 1}
          />
        ))}
    </>,
  );
});
