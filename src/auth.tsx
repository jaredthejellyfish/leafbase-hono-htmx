import { Hono } from 'hono';
import z from 'zod';

import RootLayout from '@l/layout';

import VerifyPage from '@p/verify';

import { supabaseMiddleware } from './supabase';

export const authApp = new Hono();

authApp.get('/login/provider', supabaseMiddleware, async (c) => {
  const { name } = c.req.query();

  const validName = z
    .enum(['google', 'github', 'twitch', 'discord'])
    .safeParse(name);

  const {
    data: { url: loginUrl },
  } = await c.var.supabase.auth.signInWithOAuth({
    provider: validName.success ? validName.data : 'google',
    options: {
      redirectTo: `https://localhost:8787/auth/callback`,
    },
  });
  if (loginUrl !== null) {
    return c.redirect(loginUrl);
  }
  return c.redirect('/auth/error');
});

authApp.post('/login/password', supabaseMiddleware, async (c) => {
  const { email, password } = await c.req.parseBody();

  const validLogin = z
    .object({ email: z.string().email(), password: z.string() })
    .parse({
      email,
      password,
    });

  const { error } = await c.var.supabase.auth.signInWithPassword({
    email: validLogin.email,
    password: validLogin.password,
  });

  if (!error) return c.redirect('/profile');

  return c.json({ error });
});

authApp.post('/signup', supabaseMiddleware, async (c) => {
  const { name, username, email, password, terms } = await c.req.parseBody();

  try {
    const {
      email: validatedEmail,
      password: validatedPassword,
      name: validatedFullName,
      username: validatedUsername,
      terms: validatedTerms,
    } = z
      .object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string(),
        username: z.string().min(3),
        terms: z.boolean(),
      })
      .parse({ email, password, name, username, terms: Boolean(terms) });

    const { error } = await c.var.supabase.auth.signUp({
      email: validatedEmail,
      password: validatedPassword,
      options: {
        emailRedirectTo: `https://localhost:8787/auth/callback`,

        data: {
          name: validatedFullName,
          email: validatedEmail,
          username: validatedUsername,
          terms: validatedTerms,
        },
      },
    });

    if (error) return c.redirect(`/signup?error=${error}`);
    return c.redirect('/auth/verify');
  } catch (error) {
    console.log(error);
    return c.redirect(`/signup?error=${error}`);
  }
});

authApp.get('/verify', supabaseMiddleware, async (c) => {
  return c.html(
    <RootLayout
      title={'Verify Email - Leafbase'}
      description="Verify your email"
      c={c}
    >
      <VerifyPage />
    </RootLayout>,
  );
});

authApp.get('/callback', supabaseMiddleware, async (c) => {
  const code = c.req.query('code');
  if (code !== undefined) {
    const { error } = await c.var.supabase.auth.exchangeCodeForSession(code);
    if (error === null) {
      return c.redirect('/profile');
    }
  }
  return c.redirect('/auth/error');
});

authApp.post('/logout', supabaseMiddleware, async (c) => {
  await c.var.supabase.auth.signOut();
  return c.redirect('/strains');
});

authApp.get('/error', async (c) => {
  return c.html(
    <>
      <h1>ログインに失敗しました</h1>
      <p>再度ログインしてください。</p>
      <a href="/">トップに戻る</a>
    </>,
  );
});
