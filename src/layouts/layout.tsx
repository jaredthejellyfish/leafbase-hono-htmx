import { SupabaseClient } from '@supabase/supabase-js';
import { Context, Env } from 'hono';

import Navigation from '@c/nav';
import NavDropdown from '@c/nav/nav-dropdown';

import { getProfile } from '@lb/utils';

type Props = {
  children: JSX.Element | JSX.Element[];
  title: string;
  description: string;
  c:
    | Context<
        Env & {
          Variables: {
            // eslint-disable-next-line
            supabase: SupabaseClient<any, 'public', any>;
          };
        },
        string,
        // eslint-disable-next-line
        {}
      >
    // eslint-disable-next-line
    | Context<Env, any, {}>;
};

async function RootLayout({ children, title, description, c }: Props) {
  const { profile } = await getProfile(c);

  const pathname = new URL(c.req.url).pathname;

  return (
    <html lang="en" class="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="/static/index.css" />
        <script src="https://unpkg.com/htmx.org@1.9.3"></script>
        <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
        <script src="/static/navigation.js" defer />
        <script src="/static/lazyimages.js" defer />
        <title>{title}</title>
        <meta
          name="description"
          content={description ?? 'Leafbase is a cannabis strain database.'}
        ></meta>
      </head>
      <body class="dark:bg-zinc-950 dark:text-white" hx-boost="true">
        <Navigation profile={profile} />
        <NavDropdown pathname={pathname} />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
