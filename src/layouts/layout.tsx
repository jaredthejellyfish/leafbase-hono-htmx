import Navigation from "@/components/nav";
import NavDropdown from "@/components/nav/nav-dropdown";
import { getProfile } from "@lb/utils";
import { SupabaseClient } from "@supabase/supabase-js";
import { Context, Env } from "hono";

type Props = {
  children: JSX.Element | JSX.Element[];
  title: string;
  c:
    | Context<
        Env & {
          Variables: {
            // eslint-disable-next-line
            supabase: SupabaseClient<any, "public", any>;
          };
        },
        string,
        // eslint-disable-next-line
        {}
      >
    // eslint-disable-next-line
    | Context<Env, any, {}>;
};

async function RootLayout({ children, title, c }: Props) {
  const { profile } = await getProfile(c);

  const pathname = new URL(c.req.url).pathname;

  return (
    <html class="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="/static/index.css" />
        <script src="https://unpkg.com/htmx.org@1.9.3"></script>
        <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
        <title>{title}</title>
      </head>
      <body class="dark:bg-zinc-950 dark:text-white ">
        <Navigation profile={profile} />
        <NavDropdown pathname={pathname} />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
