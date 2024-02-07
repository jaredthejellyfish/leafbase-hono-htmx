import { Session, SupabaseClient } from '@supabase/supabase-js';
import { type ClassValue, clsx } from 'clsx';
import { Context, Env } from 'hono';
import { twMerge } from 'tailwind-merge';

import { Profile, Strain } from '@/types';

import { Database } from './database';
import { supabase } from './supabase';

export async function getPaginatedStrains(
  filter: 're' | 'az' | 'za' | 'sr',
  page: number,
) {
  const nameFilter = filter === 'za' ? false : true;

  const orderByLikes = filter && filter !== 're' ? false : true;

  const limit = 12;
  const from = (page - 1) * limit;
  const to = from + limit;

  let query = supabase
    .from('strains')
    .select('*', { count: 'estimated', head: false });

  if (orderByLikes) {
    query = query.order('likes_count', { ascending: false });
  }

  query = query.order('name', { ascending: nameFilter }).range(from, to);

  const { data: strains, error } = await query.returns<Strain[]>();

  return { strains, error };
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getProfile(
  c:
    | Context<
        Env & {
          Variables: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            supabase: SupabaseClient<Database, 'public', any>;
          };
        },
        string,
        // eslint-disable-next-line
        {}
      >
    // eslint-disable-next-line
    | Context<Env, any, {}>,
) {
  if (!c || !c.var.supabase) {
    return { profile: null, session: null };
  }

  // eslint-disable-next-line
  const supabase = c.var.supabase as SupabaseClient<Database, 'public', any>;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return { profile: null, session: null };
  }

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session?.user?.id)
    .single();

  if (data) {
    return { profile: data, session } as { profile: Profile; session: Session };
  }

  return { profile: null, session: null };
}
