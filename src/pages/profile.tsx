import { Profile } from "@/types";
import NavBreadcrumbs from "@c/nav-breadcrumbs";
import { cn } from "@lb/utils";
import { Session } from "@supabase/supabase-js";
import { format } from "date-fns";

type Props = { user: Profile; session: Session };

export const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

function ProfilePage({ user, session }: Props) {
  return (
    <div class="px-5 sm:px-10 xl:px-14 py-3">
      <NavBreadcrumbs urls={[{ name: "Profile", url: "/profile" }]} />
      <div class={"flex flex-col sm:flex-row gap-x-4 gap-y-3"}>
        <div class="w-full sm:w-1/2 lg:w-1/3">
          <div class="relative z-0 flex w-full flex-col rounded-xl px-7 pt-6 shadow-md dark:bg-zinc-900">
            {user.image && (
              <img
                src={user.image}
                alt="profile"
                priority
                unoptimized
                class="rounded-md"
                width={80}
                height={80}
              />
            )}
            <span
              class={cn("mt-2 text-lg font-bold", !user?.name ? "mt-0" : "")}
            >
              {user?.name}
              {user?.pronouns && (
                <span class="ml-1.5 text-sm text-zinc-400">
                  ({user?.pronouns})
                </span>
              )}
            </span>
            {user?.username ? (
              <>
                <span class="flex flex-row items-center gap-1 text-sm text-zinc-300">
                  <span class="text-zinc-400">@{user?.username}</span>
                </span>
                {user?.location && (
                  <span class="mt-3 text-sm dark:text-white">
                    Location:
                    <span class="flex flex-row items-center gap-1 text-sm text-zinc-300">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        height="15px"
                        width="15px"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 1.74.5 3.37 1.41 4.84.95 1.54 2.2 2.86 3.16 4.4.47.75.81 1.45 1.17 2.26.26.55.47 1.5 1.26 1.5s1-.95 1.25-1.5c.37-.81.7-1.51 1.17-2.26.96-1.53 2.21-2.85 3.16-4.4C18.5 12.37 19 10.74 19 9c0-3.87-3.13-7-7-7zm0 9.75a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"></path>
                      </svg>
                      <span class="text-zinc-400">{user?.location}</span>
                    </span>
                  </span>
                )}
              </>
            ) : (
              <span class="flex flex-row items-center gap-1 text-sm text-zinc-300">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  height="15px"
                  width="15px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 1.74.5 3.37 1.41 4.84.95 1.54 2.2 2.86 3.16 4.4.47.75.81 1.45 1.17 2.26.26.55.47 1.5 1.26 1.5s1-.95 1.25-1.5c.37-.81.7-1.51 1.17-2.26.96-1.53 2.21-2.85 3.16-4.4C18.5 12.37 19 10.74 19 9c0-3.87-3.13-7-7-7zm0 9.75a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"></path>
                </svg>
                <span class="text-zinc-400">{user?.location}</span>
              </span>
            )}

            {session && session?.user.email && (
              <span class="mt-3 text-sm dark:text-white">
                Email Address:
                <p class="text-gray-400">{session?.user.email}</p>
              </span>
            )}
            {user.phone && (
              <span class="mt-3 flex flex-col text-sm dark:text-white">
                Phone number:
                <span class="text-gray-400">{user.phone}</span>
              </span>
            )}
            <form method="POST" action="/auth/logout">
              <button
                type="submit"
                class="mr-2 mt-4 w-full rounded-xl bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-blue-800 mb-2 mr-2 mt-5 w-full rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-blue-800"
              >
                Log Out
              </button>
            </form>
          </div>
        </div>
        <div class="w-full sm:w-1/2 lg:w-2/3">
          <div class="flex w-full flex-col rounded-xl p-7 shadow-md dark:bg-zinc-900">
            <h3 class="text-xl font-bold">General information</h3>
            <>
              <span class="mt-3 text-sm dark:text-white">About me</span>
              <p class="mt-1 text-sm text-zinc-400 lg:w-4/5">
                {user?.about || "Add a bio in the edit page."}
              </p>
            </>
            <div
              class={`flex flex-col justify-between ${
                user?.about && "mt-6"
              } md:w-4/5 md:flex-row`}
            >
              {user.birth_date && (
                <span class="mt-3 text-sm dark:text-white">
                  Birthday:
                  <p class="w-60 text-gray-400">
                    {`${format(new Date(user?.birth_date), "PP")}`}
                  </p>
                </span>
              )}
              {user.language && (
                <span class="mt-3 text-sm dark:text-white">
                  Language:
                  <p class="w-60 text-gray-400">
                    {
                      languages.find(
                        (language) => language.value === user?.language
                      )?.label
                    }
                  </p>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
