// The secrets and variables from the cloudflare worker process.

import { Database } from "@lb/database";
import { SupabaseClient } from "@supabase/supabase-js";
import { Context } from "hono";

// Available from `c.env`
export type Env = {
  ASSETS: Fetcher;
  ENVIRONMENT_VARIABLE_1: string;
  ENVIRONMENT_VARIABLE_2: string;
  HONO_PAGES_BLOG_POSTS: KVNamespace;
  HONO_PAGES_COUNTER: KVNamespace;
};

// Custom variables that can be set and retrieved from context using `c.set` and `c.get`
// https://honojs.dev/docs/api/context/#csetcget
export type CustomVariables = {
  counter: number;
};

export type Strain = Database["public"]["Tables"]["strains"]["Row"];

export type SupabaseContext = Context<
  Env & {
    Variables: {
      supabase: SupabaseClient<any, "public", any>;
    };
  },
  string,
  {}
>;

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
