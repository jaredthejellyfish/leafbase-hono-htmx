import { Profile, Strain, SupabaseContext } from "@/types";
import { supabase } from "./supabase";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Context, Env } from "hono";
import { Session, SupabaseClient } from "@supabase/supabase-js";

export async function getPaginatedStrains(
  filter: "re" | "az" | "za" | "sr",
  page: number
) {
  const nameFilter = filter === "za" ? false : true;

  const orderByLikes = filter && filter !== "re" ? false : true;

  const limit = 12;
  const from = (page - 1) * limit;
  const to = from + limit;

  let query = supabase
    .from("strains")
    .select("*", { count: "estimated", head: false });

  if (orderByLikes) {
    query = query.order("likes_count", { ascending: false });
  }

  query = query.order("name", { ascending: nameFilter }).range(from, to);

  const { data: strains, error } = await query.returns<Strain[]>();

  return { strains, error };
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getProfile(
  c: Context<
    Env & {
      Variables: {
        supabase: SupabaseClient<any, "public", any>;
      };
    },
    string,
    {}
  >
) {
  const {
    data: { session },
  } = await c.var.supabase.auth.getSession();

  const { data } = await c.var.supabase
    .from("profiles")
    .select("*")
    .eq("id", session?.user?.id)
    .single();

  if (data) {
    return { profile: data, session } as { profile: Profile; session: Session };
  }

  return { profile: null, session: null };
}
