import { Hono } from "hono";
import AllStrains from "@p/all-strains";
import RootLayout from "@l/layout";
import StrainCard from "@c/strain-card";
import StrainPage from "@p/strain";
import { serveStatic } from "hono/cloudflare-workers";
import { z } from "zod";
import { getPaginatedStrains, getProfile } from "@lb/utils";
import { authApp } from "./auth";
import { supabaseMiddleware } from "./supabase";
import ProfilePage from "@p/profile";
import LoginPage from "@p/login";
import SignupPage from "@p/signup";
import { Strain } from "./types";
import { PostgrestError } from "@supabase/supabase-js";

const filterQuery = z.enum(["re", "az", "za", "sr"]);

const app = new Hono();

app.get("/", async (c) => {
  return c.redirect("/strains");
});

app.get("/login", supabaseMiddleware, async (c) => {
  return c.html(
    <RootLayout title={"Login - Leafbase"} c={c}>
      <LoginPage />
    </RootLayout>
  );
});

app.get("/signup", supabaseMiddleware, async (c) => {
  return c.html(
    <RootLayout title={"Login - Leafbase"} c={c}>
      <SignupPage />
    </RootLayout>
  );
});

app.get("/strains", supabaseMiddleware, async (c) => {
  const { filter } = c.req.query();

  const parsedFilter = filterQuery.safeParse(filter);

  return c.html(
    <RootLayout title={"All Strains - Leafbase"} c={c}>
      <AllStrains filter={parsedFilter.success ? parsedFilter.data : "re"} />
    </RootLayout>
  );
});

app.get("/strains/:strain", supabaseMiddleware, async (c) => {
  const { strain: slug } = c.req.param();

  const { data: strain, error } = (await c.var.supabase
    .from("strains")
    .select("*")
    .eq("slug", slug)
    .single()) as { data: Strain; error: PostgrestError | null };

  if (error) {
    return c.notFound();
  }

  return c.html(
    <RootLayout title={`${strain.name} - Leafbase`} c={c}>
      <StrainPage strain={strain} />
    </RootLayout>
  );
});

app.get("/profile", supabaseMiddleware, async (c) => {
  const { profile, session } = await getProfile(c);

  if (!profile || !session) {
    return c.redirect("/login");
  }

  return c.html(
    <RootLayout title={`Profile - Leafbase`} c={c}>
      <ProfilePage user={profile} session={session} />
    </RootLayout>
  );
});

app.post("/api/search", supabaseMiddleware, async (c) => {
  const { search } = await c.req.parseBody();
  const { type } = c.req.query();

  const parsedSearch = z
    .object({
      search: z.string().max(40),
      type: z.enum(["main", "dropdown"]).nullable().default("main"),
    })
    .safeParse({ search, type });

  if (!search)
    return c.html(
      <div
        class="w-full bg-white dark:bg-zinc-700 shadow-lg absolute top-12 left-0 z-50 rounded px-2 py-2 dark:text-white hidden"
        id={
          parsedSearch.success && parsedSearch.data.type === "main"
            ? "search-results"
            : "search-results-dropdown"
        }
      />
    );

  const { data: searchResults, error } = await c.var.supabase.rpc(
    "search_strains",
    {
      search_term: parsedSearch.success ? parsedSearch.data.search : "",
      limit_num: 5,
    }
  );

  if (error) {
    return c.html(
      <div
        class="w-full bg-white dark:bg-zinc-700 shadow-lg absolute top-12 left-0 z-50 rounded px-2 py-2 dark:text-white"
        id={
          parsedSearch.success && parsedSearch.data.type === "main"
            ? "search-results"
            : "search-results-dropdown"
        }
      >
        <p>Error getting search results</p>
      </div>
    );
  }

  return c.html(
    searchResults && searchResults.length ? (
      <div
        class="w-full bg-white dark:bg-zinc-700 shadow-lg absolute top-12 left-0 z-50 rounded px-2 py-2 dark:text-white"
        id={
          parsedSearch.success && parsedSearch.data.type === "main"
            ? "search-results"
            : "search-results-dropdown"
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
        class="w-full bg-white dark:bg-zinc-700 shadow-lg absolute top-12 left-0 z-50 rounded px-2 py-2 dark:text-white hidden"
        id={
          parsedSearch.success && parsedSearch.data.type === "main"
            ? "search-results"
            : "search-results-dropdown"
        }
      />
    )
  );
});

app.get("/api/strains", supabaseMiddleware, async (c) => {
  const { page, filter } = c.req.query();

  if (!page) {
    return c.html(<p>No page param provided.</p>);
  }

  const parsedFilter = filterQuery.safeParse(filter);

  const { strains } = await getPaginatedStrains(
    parsedFilter.success ? parsedFilter.data : "re",
    Number(page)
  );

  return c.html(
    <>
      {strains &&
        strains.map((strain, index) => (
          <StrainCard
            strain={strain}
            filter={parsedFilter.success ? parsedFilter.data : "re"}
            loadMore={index === strains.length - 1}
            page={Number(page) + 1}
          />
        ))}
    </>
  );
});

app.notFound(async (c) => {
  return c.html(
    <RootLayout title={"404 - Leafbase"} c={c}>
      <span>Page not found</span>
    </RootLayout>
  );
});

app.get("/static/*", serveStatic({ root: "./" }));
app.get("/favicon.ico", serveStatic({ path: "./favicon.ico" }));

app.route("/auth", authApp);

export default app;
