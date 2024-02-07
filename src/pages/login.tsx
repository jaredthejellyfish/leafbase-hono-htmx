function LoginPage() {
  return (
    <main class="sm:h-screen-bar flex h-[85vh] items-center justify-center bg-zinc-50/50 px-4 dark:bg-zinc-950 sm:px-0">
      <div class="mx-auto max-w-sm space-y-3 rounded-lg bg-white p-5 shadow-xl dark:bg-zinc-900 sm:p-8">
        <div class="space-y-2 text-center">
          <h2 class="mt-6 text-center text-3xl font-extrabold text-zinc-900 dark:text-white">
            Log in
          </h2>
          <p class="text-zinc-500 dark:text-zinc-400">
            Enter your email below to login to your account
          </p>
        </div>
        <form class="space-y-4" method="POST" action="/auth/login/password">
          <div class="space-y-2">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="email"
            >
              Email
            </label>
            <input
              class="border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm text-black file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="email"
              name="email"
              placeholder="m@example.com"
              required={true}
              type="email"
            />
          </div>
          <div class="space-y-2">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="password"
            >
              Password
            </label>
            <input
              class="border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm text-black file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="password"
              name="password"
              required={true}
              type="password"
            />
          </div>
          <button
            type="submit"
            class="mr-2 mt-4 w-full rounded-xl bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-blue-800"
          >
            Sign in
          </button>
          <div class="mt-0 text-center text-sm">
            Dont have an account?
            <a class="ml-2 underline" href="/signup">
              Sign up
            </a>
          </div>
          <div class="mb-2 mt-4 flex items-center justify-center">
            <hr class="w-full border-zinc-600" />
            <p class="px-2 text-center text-zinc-400">Or</p>
            <hr class="w-full border-zinc-600" />
          </div>
          <div class="flex justify-center space-x-4">
            <a
              href="/auth/login/provider?name=google"
              class="ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground flex size-14 h-10 cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-zinc-400 px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-600 dark:bg-zinc-700"
              variant="outline"
            >
              <img
                src={'/static/google.png'}
                alt={'Google logo'}
                width={40}
                height={40}
                priority={true}
              />
            </a>
            <a
              href="/auth/login/provider?name=github"
              class="ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground flex size-14 h-10 cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-zinc-400 px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-600 dark:bg-zinc-700"
              variant="outline"
            >
              <img
                class={'dark:invert'}
                src={'/static/github.png'}
                alt={'Github logo'}
                width={40}
                height={40}
                priority={true}
              />
            </a>
            <a
              href="/auth/login/provider?name=discord"
              class="ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground flex size-14 h-10 items-center justify-center whitespace-nowrap rounded-md border border-zinc-400 px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-600 dark:bg-zinc-700"
              variant="outline"
            >
              <svg
                class="size-5 text-purple-500"
                fill="none"
                width="30px"
                height="30px"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7" />
              </svg>
            </a>
            <a
              href="/auth/login/provider?name=twitch"
              class="ring-offset-background focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground flex size-14 h-10 items-center justify-center whitespace-nowrap rounded-md border border-zinc-400 px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-600 dark:bg-zinc-700"
              variant="outline"
            >
              <svg
                width="30px"
                height="30px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 127.14 96.36"
                style={{ fill: '#7289DA' }}
              >
                <g id="Discord_Logos" data-name="Discord Logos">
                  <g
                    id="Discord_Logo_-_Large_-_White"
                    data-name="Discord Logo - Large - White"
                  >
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                  </g>
                </g>
              </svg>
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
