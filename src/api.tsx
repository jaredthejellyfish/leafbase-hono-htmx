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

apiApp.post('/friends/deny', supabaseMiddleware, async (c) => {
  const { from, to } = await c.req.parseBody();

  const fromToParsed = z
    .object({ from: z.string(), to: z.string() })
    .safeParse({ from, to });

  if (!fromToParsed.success) {
    return c.html(<p>Invalid request</p>);
  }

  const {
    data: { session },
    error: sessionError,
  } = await c.var.supabase.auth.getSession();

  if (sessionError) {
    return c.html(<p>Error getting session</p>);
  }

  if (session?.user.id !== to) {
    return c.html(<p>Invalid user</p>);
  }

  const { data: existingFriendRequest, error: existingFriendRequestError } =
    await c.var.supabase
      .from('friends')
      .select('*')
      .match({
        to: to,
        from: from,
      })
      .maybeSingle();

  if (existingFriendRequestError || !existingFriendRequest) {
    return c.html(<p>Error getting existing friend request</p>);
  }

  const { error: newFriendRequestError } = await c.var.supabase
    .from('friends')
    .delete()
    .match({
      to: session.user.id,
      from: from,
    });

  if (newFriendRequestError) return c.html(<p>Error denying friend request</p>);

  return c.html(<div class="hidden">Denied</div>);
});

apiApp.post('/friends/accept', supabaseMiddleware, async (c) => {
  const { from, to } = await c.req.parseBody();

  const fromToParsed = z
    .object({ from: z.string(), to: z.string() })
    .safeParse({ from, to });

  if (!fromToParsed.success) {
    return c.html(<p>Invalid request</p>);
  }

  const {
    data: { session },
    error: sessionError,
  } = await c.var.supabase.auth.getSession();

  if (sessionError) {
    return c.html(<p>Error getting session</p>);
  }

  if (session?.user.id !== to) {
    return c.html(<p>Invalid user</p>);
  }

  const { data: existingFriendRequest, error: existingFriendRequestError } =
    await c.var.supabase
      .from('friends')
      .select('*')
      .match({
        to: to,
        from: from,
      })
      .maybeSingle();

  if (existingFriendRequestError || !existingFriendRequest) {
    return c.html(<p>Error getting existing friend request</p>);
  }

  const { error: newFriendRequestError } = await c.var.supabase
    .from('friends')
    .update({ pending: false })
    .match({
      to: session.user.id,
      from: from,
    })
    .select()
    .single();

  if (newFriendRequestError)
    return c.html(<p>Error accepting friend request</p>);

  return c.html(
    <svg
      class="justify-self-end"
      stroke="currentColor"
      fill="none"
      stroke-width="0"
      viewBox="0 0 15 15"
      height="35px"
      width="35px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z"
        fill="currentColor"
      ></path>
    </svg>,
  );
});
