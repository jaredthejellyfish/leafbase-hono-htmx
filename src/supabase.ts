import { createServerClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { MiddlewareHandler } from 'hono';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';

import { Database } from '@lb/database';

export const supabaseMiddleware: MiddlewareHandler<{
  Variables: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    supabase: SupabaseClient<Database, 'public', any>;
  };
}> = async (c, next) => {
  const client = createServerClient<Database>(
    'https://euwnyenhzhztqztezjdn.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1d255ZW5oemh6dHF6dGV6amRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc2MTk2ODYsImV4cCI6MjAwMzE5NTY4Nn0.BvQkn3zaXnLHgv16quiwvDd4CQ3v1xBRCyg3InBBfgs',
    {
      cookies: {
        get: (key) => {
          return getCookie(c, key);
        },
        set: (key, value, options) => {
          setCookie(c, key, value, options);
        },
        remove: (key, options) => {
          deleteCookie(c, key, options);
        },
      },
      cookieOptions: {
        httpOnly: true,
        secure: true,
      },
    },
  );
  c.set('supabase', client);
  await next();
};
