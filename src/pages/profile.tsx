import { Session } from '@supabase/supabase-js';
import { format } from 'date-fns';

import Modal from '@c/modal';
import NavBreadcrumbs from '@c/nav-breadcrumbs';

import { cn } from '@lb/utils';

import { FriendExtended, Profile } from '@/types';

type Props = {
  user: Profile;
  session: Session;
  friends: FriendExtended[] | null;
};

export const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
] as const;

function Friend({
  friend: { to, from },
  status,
  useTo,
}: {
  friend: {
    to: { id: string; username: string; name: string; image: string };
    from: { id: string; username: string; name: string; image: string };
  };
  status: string;
  useTo?: boolean;
}) {
  const user = useTo ? to : from;

  return (
    <a
      href={`/profile/${user.username}`}
      id={`friendship-${user.id}`}
      class="flex flex-row items-center justify-between rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-1.5 dark:border-zinc-700 dark:bg-zinc-800"
    >
      <div class="flex h-12 flex-row items-center justify-start gap-x-3  sm:gap-x-4 ">
        <img
          src={user.image!}
          alt={user.name!}
          width={50}
          height={50}
          class="aspect-square size-11 rounded-full sm:size-12"
        />
        <div class="flex flex-col gap-0">
          <span class="-mb-1.5 text-sm font-semibold sm:text-base">
            {user.name}
          </span>
          <span class="mt-1 text-xs text-green-700 sm:mt-0.5 sm:text-sm">
            @{user.username}
          </span>
        </div>
      </div>
      {status === 'pending' && (
        <div class="cursor-not-allowed rounded border border-zinc-400 px-2 py-1 text-xs text-zinc-400">
          Pending
        </div>
      )}
      {/* ?from=${from.id}&to=${to.id} */}
      {status === 'toAccept' && (
        <div
          class="flex flex-row gap-x-2 sm:gap-x-1"
          id={`friendship-status-${user.id}`}
        >
          <button
            class="mr-1 block rounded-md border border-zinc-500 bg-transparent px-2 text-xs text-zinc-700 transition-colors hover:bg-zinc-700 hover:text-white dark:text-zinc-300 hover:dark:bg-zinc-300/80 hover:dark:text-zinc-800 sm:hidden xl:block"
            hx-post={`/api/friends/deny`}
            hx-vals={`{"from": "${from.id}", "to": "${to.id}"}`}
            hx-target={`#friendship-${user.id}`}
            hx-swap="delete"
            _="on click halt the event"
          >
            Deny
          </button>
          <button
            class="rounded-md bg-green-700 px-2 py-1 text-xs text-white transition-colors hover:bg-green-800"
            hx-post={`/api/friends/accept`}
            hx-vals={`{"from": "${from.id}", "to": "${to.id}"}`}
            hx-target={`#friendship-status-${user.id}`}
            hx-swap="outerHTML"
            _="on click halt the event"
          >
            Accept
          </button>
        </div>
      )}

      {status === 'accepted' && (
        <svg
          class="justify-self-end"
          stroke="currentColor"
          fill="none"
          stroke-width="0"
          viewBox="0 0 15 15"
          height="35px"
          width="35px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z"
            fill="currentColor"
          ></path>
        </svg>
      )}
    </a>
  );
}

function ProfilePage({ user, session, friends }: Props) {
  return (
    <div class="px-5 py-3 sm:px-10 xl:px-14">
      <NavBreadcrumbs urls={[{ name: 'Profile', url: '/profile' }]} />
      <div class={'flex flex-col gap-x-4 gap-y-3 sm:flex-row'}>
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
              class={cn('mt-2 text-lg font-bold', !user?.name ? 'mt-0' : '')}
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
                class="mb-0.5 mr-2 mt-4 w-full rounded-xl bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-blue-800"
              >
                Log Out
              </button>
            </form>
          </div>
          {friends && (
            <div class="relative z-0 mt-3 flex w-full flex-col rounded-xl px-5 py-2.5 pb-3 shadow-md dark:bg-zinc-900">
              <h3 class="mx-1 mb-2 text-xl font-bold">Friends</h3>
              <div class={'flex flex-col gap-y-2 align-top'}>
                {friends.slice(0, 3).map((friend) => {
                  let status;
                  if (friend.pending) {
                    status =
                      friend.from.id === session.user.id
                        ? 'pending'
                        : 'toAccept';
                  } else {
                    status = 'accepted';
                  }
                  const useTo = friend.to.id !== session.user.id;

                  return (
                    <Friend friend={friend} status={status} useTo={useTo} />
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div class="w-full sm:w-1/2 lg:w-2/3">
          <div class="flex w-full flex-col rounded-xl p-7 shadow-md dark:bg-zinc-900">
            <h3 class="text-xl font-bold">General information</h3>
            <>
              <span class="mt-3 text-sm dark:text-white">About me</span>
              <p class="mt-1 text-sm text-zinc-400 lg:w-4/5">
                {user?.about || 'Add a bio in the edit page.'}
              </p>
            </>
            <div
              class={`flex flex-col justify-between ${
                user?.about && 'mt-6'
              } md:w-4/5 md:flex-row`}
            >
              {user.birth_date && (
                <span class="mt-3 text-sm dark:text-white">
                  Birthday:
                  <p class="w-60 text-gray-400">
                    {`${format(new Date(user?.birth_date), 'PP')}`}
                  </p>
                </span>
              )}
              {user.language && (
                <span class="mt-3 text-sm dark:text-white">
                  Language:
                  <p class="w-60 text-gray-400">
                    {
                      languages.find(
                        (language) => language.value === user?.language,
                      )?.label
                    }
                  </p>
                </span>
              )}
              <Modal
                trigger={<span>open</span>}
                name="settings"
                title="Trigger"
              >
                <span>content</span>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
