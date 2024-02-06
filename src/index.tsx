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

  const { data: strain, error } = await c.var.supabase
    .from("strains")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    return c.html(<div>Error loading strain</div>);
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

app.get("/static/*", serveStatic({ root: "./" }));
app.get("/favicon.ico", serveStatic({ path: "./favicon.ico" }));

app.route("/auth", authApp);

export default app;
