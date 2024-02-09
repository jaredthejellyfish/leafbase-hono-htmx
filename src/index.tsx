import { PostgrestError } from '@supabase/supabase-js';
import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';
import z from 'zod';

import RootLayout from '@l/layout';

import { getFriends, getLikedStrains, getProfile } from '@lb/utils';

import AllStrains from '@p/all-strains';
import LoginPage from '@p/login';
import ProfilePage from '@p/profile';
import SignupPage from '@p/signup';
import StrainPage from '@p/strain';

import { apiApp } from '@/api';
import { authApp } from '@/auth';
import { supabaseMiddleware } from '@/supabase';
import { Strain } from '@/types';

const app = new Hono();

app.get('/', async (c) => {
  return c.redirect('/strains');
});

app.get('/login', supabaseMiddleware, async (c) => {
  const { session } = await getProfile(c);
  if (session) return c.redirect('/profile');

  return c.html(
    <RootLayout
      title={'Login - Leafbase'}
      description="Login page for leafbase.xyz"
      c={c}
    >
      <LoginPage />
    </RootLayout>,
  );
});

app.get('/signup', supabaseMiddleware, async (c) => {
  const { session } = await getProfile(c);
  if (session) return c.redirect('/profile');

  return c.html(
    <RootLayout
      title={'Sign up - Leafbase'}
      description="Signup page for leafbase.xyz"
      c={c}
    >
      <SignupPage />
    </RootLayout>,
  );
});

app.get('/strains', supabaseMiddleware, async (c) => {
  const { filter } = c.req.query();

  const parsedFilter = z.enum(['re', 'az', 'za', 'sr']).safeParse(filter);

  return c.html(
    <RootLayout
      title={'All Strains - Leafbase'}
      description="Signup page for leafbase.xyz"
      c={c}
    >
      <AllStrains filter={parsedFilter.success ? parsedFilter.data : 're'} />
    </RootLayout>,
  );
});

app.get('/strains/:strain', supabaseMiddleware, async (c) => {
  const { strain: slug } = c.req.param();

  const { data: strain, error } = (await c.var.supabase
    .from('strains')
    .select('*')
    .eq('slug', slug)
    .single()) as { data: Strain; error: PostgrestError | null };

  if (error) {
    return c.notFound();
  }

  return c.html(
    <RootLayout
      title={`${strain.name} - Leafbase`}
      description={strain.shortDescription || `Strain page for ${strain.name}.`}
      c={c}
    >
      <StrainPage strain={strain} />
    </RootLayout>,
  );
});

app.get('/profile', supabaseMiddleware, async (c) => {
  const { profile, session } = await getProfile(c);
  const { friends, error } = await getFriends(c, session);
  const { likes, error: likedStrainsError } = await getLikedStrains(c, session);

  if (!profile || !session || error || likedStrainsError) {
    return c.redirect('/login');
  }

  return c.html(
    <RootLayout
      title={`Profile - Leafbase`}
      description={`Profile page for ${profile.username}.`}
      c={c}
    >
      <ProfilePage
        user={profile}
        session={session}
        friends={friends}
        likes={likes}
      />
    </RootLayout>,
  );
});

app.notFound(async (c) => {
  return c.html(
    <RootLayout title={'404 - Leafbase'} c={c} description="Page not found!">
      <span>Page not found</span>
    </RootLayout>,
  );
});

app.get('/static/*', serveStatic({ root: './' }));
app.get('/favicon.ico', serveStatic({ path: './favicon.ico' }));

app.route('/auth', authApp);
app.route('/api', apiApp);

export default app;
