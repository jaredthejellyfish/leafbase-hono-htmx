import { Session, SupabaseClient } from '@supabase/supabase-js';
import { type ClassValue, clsx } from 'clsx';
import { Context, Env } from 'hono';
import { twMerge } from 'tailwind-merge';

import { Database } from '@lb/database';
import { supabase } from '@lb/supabase';

import { FriendExtended, Profile, Strain, StrainLike } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export async function getFriends(
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
  session: Session | null,
) {
  if (!c || !c.var.supabase || !session) {
    return { friends: null, error: null };
  }

  // eslint-disable-next-line
  const supabase = c.var.supabase as SupabaseClient<Database, 'public', any>;

  const { data: friendsData, error } = await supabase
    .from('friends')
    .select(
      `*,
  to:profiles!friends_to_fkey (
    id,
    username,
    name,
    image
  ),
  from:profiles!friends_from_fkey (
    id,
    username,
    name,
    image
  )`,
    )
    .or(`from.eq.${session?.user.id},to.eq.${session?.user.id}`)
    .returns<FriendExtended[]>();

  if (error) return { friends: null, error };

  const friends = friendsData?.map((friend) => {
    return {
      ...friend.to,
      pending: friend.pending,
      from: friend.from,
      to: friend.to,
    };
  });

  friends.sort((a, b) => {
    if (a.pending && !b.pending) return -1;
    if (!a.pending && b.pending) return 1;
    return 0;
  });

  return { friends, error: null };
}

export async function getLikedStrains(
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
  session: Session | null,
) {
  if (!c || !c.var.supabase || !session) {
    return { likes: null, error: null };
  }

  // eslint-disable-next-line
  const supabase = c.var.supabase as SupabaseClient<Database, 'public', any>;

  const { data: strainLikes, error: strainLikesError } = await supabase
    .from('strain_likes')
    .select(
      `
    id, created_at,
    strain_id (
      name,
      nugImage,
      slug,
      id
    )
  `,
    )
    .eq('user_id', session?.user.id)
    .returns<StrainLike[]>();

  if (strainLikesError) return { likes: null, error: strainLikesError };

  return { likes: strainLikes, error: null };
}
