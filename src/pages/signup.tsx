type Props = {};

function SignupPage({}: Props) {
  return (
    <main class="flex h-[85vh] items-center justify-center bg-zinc-50/50 px-4 dark:bg-zinc-950 sm:h-screen-bar sm:px-0">
      <div class="flex size-full items-center justify-center">
        <div class="w-full max-w-md space-y-3 rounded-lg bg-white p-5 shadow-xl dark:bg-zinc-900 sm:px-8">
          <div class="flex flex-col gap-y-2">
            <h2 class="mt-6 text-center text-3xl font-extrabold text-zinc-900 dark:text-white">
              Sign up
            </h2>
            <p class="text-center text-zinc-500 dark:text-zinc-400">
              Enter your email below to login to your account
            </p>
          </div>
          <form method="POST" action="/auth/signup" class="mt-8 flex flex-col gap-y-4">
            <input
              name="remember"
              type="hidden"
              value="true"
              class="text-black flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <div class="flex flex-col gap-3 rounded-md shadow-sm">
              <div>
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none text-black focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1.5"
                  autoComplete="name"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  class="text-black flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1.5"
                  id="username"
                  name="username"
                  placeholder="johndoe123"
                  required
                />
              </div>
              <div>
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="email-address"
                >
                  Email address
                </label>
                <input
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none text-black focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1.5"
                  autoComplete="username"
                  id="email-address"
                  name="email"
                  placeholder="john.doe@example.com"
                  required
                  type="email"
                />
              </div>
              <div>
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none text-black focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1.5"
                  autoComplete="current-password"
                  id="password"
                  name="password"
                  placeholder="********"
                  required
                  type="password"
                />
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  class="size-4 rounded border-zinc-300 text-zinc-600 focus:ring-zinc-500 mt-1.5"
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required={true}
                  title="Please agree to the terms and conditions"
                />
                <label
                  class="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="terms"
                >
                  I agree to the terms and conditions
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                class="mr-2 w-full rounded-xl bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-blue-800"
              >
                Sign up
              </button>
            </div>
            <div class="mt-0 text-center text-sm">
              Already have an account?
              <a class="ml-2 underline" href="/login">
                Log in
              </a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default SignupPage;
