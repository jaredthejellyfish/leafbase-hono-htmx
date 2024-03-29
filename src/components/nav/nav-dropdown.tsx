import { cn } from '@/lib/utils';

type Props = { pathname: string };

const paths = [
  {
    name: 'Strains',
    path: '/strains',
  },
  {
    name: 'Dispensaries',
    path: '/dispensaries',
  },
  {
    name: 'About Us',
    path: '/about',
  },
];

function NavDropdown({ pathname }: Props) {
  return (
    <>
      <div
        id="nav-dropdown"
        class="fixed left-0 right-0 top-[56px] z-50 w-screen origin-top scale-y-0 rounded-b bg-white px-4 py-2 shadow-lg transition-transform duration-300 dark:bg-zinc-800/100 sm:top-16 sm:px-5 sm:py-3"
      >
        <div class="relative mb-2 flex flex-row items-center gap-3 rounded border border-zinc-400 bg-white px-10 py-1.5 pl-4 pr-5 text-black dark:border-zinc-700 dark:bg-zinc-700/60 md:hidden">
          <div
            class="absolute left-0 top-12 z-50 hidden w-full rounded bg-white px-2 py-2 shadow-lg dark:bg-zinc-700 dark:text-white"
            id="search-results-dropdown"
          />

          <input
            id="search-input-dropdown"
            name="search"
            placeholder="Search..."
            _="on keyup if my value's length > 0 then remove .hidden from #search-close-icon-dropdown then add .hidden to #search-icon-dropdown else add .hidden to #search-close-icon-dropdown then remove .hidden from #search-icon-dropdown"
            class="w-full bg-transparent focus:outline-none dark:text-white"
            hx-post="/api/search?type=dropdown"
            hx-trigger="input changed delay:500ms, search"
            hx-target="#search-results-dropdown"
            hx-swap="outerHTML"
          ></input>
          <svg
            id="search-icon-dropdown"
            class="text-black dark:text-zinc-400"
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 512 512"
            height="20px"
            width="20px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M443.5 420.2L336.7 312.4c20.9-26.2 33.5-59.4 33.5-95.5 0-84.5-68.5-153-153.1-153S64 132.5 64 217s68.5 153 153.1 153c36.6 0 70.1-12.8 96.5-34.2l106.1 107.1c3.2 3.4 7.6 5.1 11.9 5.1 4.1 0 8.2-1.5 11.3-4.5 6.6-6.3 6.8-16.7.6-23.3zm-226.4-83.1c-32.1 0-62.3-12.5-85-35.2-22.7-22.7-35.2-52.9-35.2-84.9 0-32.1 12.5-62.3 35.2-84.9 22.7-22.7 52.9-35.2 85-35.2s62.3 12.5 85 35.2c22.7 22.7 35.2 52.9 35.2 84.9 0 32.1-12.5 62.3-35.2 84.9-22.7 22.7-52.9 35.2-85 35.2z"></path>
          </svg>
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            id="search-close-icon-dropdown"
            _="on click set #search-input-dropdown's value to '' then add .hidden to #search-close-icon-dropdown then remove .hidden from #search-icon-dropdown then add .hidden to #search-results-dropdown"
            class="hidden cursor-pointer text-black dark:text-zinc-400"
            height="22px"
            width="22px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </div>
        {paths.map((path, i) => (
          <div key={path.name}>
            <div
              initial="closed"
              class={cn(
                'hover:background-slate-200 flex h-10 w-full cursor-pointer items-center justify-start py-5 pl-3.5 text-base font-medium transition-colors dark:hover:bg-zinc-800 sm:text-lg md:pl-10',
                pathname === path.path &&
                  'pointer-events-none cursor-not-allowed text-green-500',
              )}
            >
              <a class="w-full" href={path.path}>
                {path.name}
              </a>
            </div>
            {i !== paths.length - 1 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="1"
                class="my-0.5 stroke-zinc-300 dark:stroke-zinc-600"
              >
                <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke-width="1" />
              </svg>
            )}
          </div>
        ))}
      </div>
      <div
        id="nav-dropdown-overlay"
        _="on click toggle .scale-y-0 on #nav-dropdown then toggle .scale-y-100 on #nav-dropdown then add .hidden to #search-results"
        class={'fixed bottom-0 left-0 right-0 top-16 z-10 hidden bg-zinc-950'}
      ></div>
    </>
  );
}

export default NavDropdown;
