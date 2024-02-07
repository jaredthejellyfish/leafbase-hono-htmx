import { Profile } from "@/types";

type Props = { profile: Profile | null };

async function Navigation({ profile }: Props) {
  return (
    <nav class="flex h-14 items-center justify-between bg-gray-100 px-6 sm:h-16 dark:bg-zinc-900 z-20">
      <div>
        <a
          href="/"
          class="flex items-center justify-start gap-2.5 text-xl sm:gap-4"
        >
          <img
            class="aspect-square rounded-sm border border-zinc-300 bg-white sm:scale-125 dark:border-zinc-700 dark:bg-zinc-700/60"
            src={"/static/site-logo.png"}
            height={33}
            width={33}
            alt="site logo"
          />
          <span class="text-base font-medium sm:text-xl">Leafbase</span>
        </a>
      </div>
      <div class="flex flex-row items-center gap-3 sm:gap-5 relative">
        <div
          class="relative flex-row items-center gap-3 rounded border border-zinc-400 bg-white px-10 py-1.5 pl-4 pr-5 text-black dark:border-zinc-700 dark:bg-zinc-700/60 hidden md:flex"
          _="on click 
          remove .scale-y-100 from #nav-dropdown 
          add .scale-y-0 to #nav-dropdown"
        >
          <div
            class="w-full bg-white dark:bg-zinc-700 shadow-lg absolute top-12 left-0 z-50 rounded px-2 py-2 dark:text-white hidden"
            id="search-results"
          />

          <input
            id="search-input"
            name="search"
            placeholder="Search..."
            _="on keyup if my value's length > 0 then remove .hidden from #search-close-icon then add .hidden to #search-icon else add .hidden to #search-close-icon then remove .hidden from #search-icon"
            class="w-full bg-transparent focus:outline-none dark:text-white"
            hx-post="/api/search"
            hx-trigger="input changed delay:500ms, search"
            hx-target="#search-results"
            hx-swap="outerHTML"
          ></input>
          <svg
            id="search-icon"
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
            id="search-close-icon"
            _="on click set #search-input's value to '' then add .hidden to #search-close-icon then remove .hidden from #search-icon then add .hidden to #search-results"
            class="text-black dark:text-zinc-400 hidden cursor-pointer"
            height="22px"
            width="22px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="20"
          class="hidden stroke-black md:block dark:stroke-white"
        >
          <line x1="5" y1="0" x2="5" y2="200" strokeWidth="1.3" />
        </svg>
        <button
          id="theme-button"
          class="w-6 h-6 flex items-center justify-center"
          _="on click toggle .hidden on #theme-sun then toggle .hidden on #theme-moon"
        >
          <svg
            id="theme-sun"
            class="hidden"
            data-v-56bd7dfc=""
            xmlns="http://www.w3.org/2000/svg"
            width="22px"
            height="22px"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22px"
            height="22px"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            id="theme-moon"
            class=""
          >
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
          </svg>
        </button>
        <a href="/profile" class="text-base font-medium sm:text-xl">
          {!profile?.image ? (
            <svg
              class="rounded-full aspect-square border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-700/60"
              version="1.1"
              id="svg2"
              width="36"
              height="36"
              viewBox="0 0 5333.3335 5333.3335"
              sodipodi:docname="vecteezy_profile-icon-design-vector_5544718.eps"
              xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
              xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:svg="http://www.w3.org/2000/svg"
            >
              <defs id="defs6" />
              <sodipodi:namedview
                id="namedview4"
                pagecolor="#ffffff"
                bordercolor="#000000"
                borderopacity="0.25"
                inkscape:showpageshadow="2"
                inkscape:pageopacity="0.0"
                inkscape:pagecheckerboard="0"
                inkscape:deskcolor="#d1d1d1"
              />
              <g
                id="g8"
                inkscape:groupmode="layer"
                inkscape:label="ink_ext_XXXXXX"
                transform="matrix(1.3333333,0,0,-1.3333333,0,5333.3333)"
              >
                <g id="g10" transform="scale(0.1)">
                  <path
                    d="M 40000,0 H 0 V 40000 H 40000 V 0"
                    style="fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:none"
                    id="path12"
                  />
                  <path
                    d="m 15357.3,20844.4 c 1322.1,-903.6 2922,-1430.6 4643.7,-1430.6 1721.6,0 3319.6,527 4641.7,1430.6 2174.4,1483.8 3601.2,3983.6 3601.2,6814.3 0,4554.2 -3690.6,8244.8 -8242.9,8244.8 -4554.3,0 -8244.9,-3690.6 -8244.9,-8244.8 0,-2830.7 1426.8,-5328.5 3601.2,-6814.3 z m 10854.8,-759 c -1691.1,-1388.8 -3854.1,-2222 -6211.1,-2222 -2359,0 -4521.9,833.2 -6211.3,2222 -3743.8,-2153.5 -6264.44,-6194.1 -6264.44,-10822.6 0,-6888.4 24949.44,-6888.4 24949.44,0 0,4628.5 -2520.6,8669.1 -6262.6,10822.6"
                    style="fill:#231f20;fill-opacity:1;fill-rule:nonzero;stroke:none"
                    id="path14"
                  />
                </g>
              </g>
            </svg>
          ) : (
            <img
              class="rounded-full aspect-square border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-700/60"
              src={profile?.image}
              height={36}
              width={36}
              alt="profile"
            />
          )}
        </a>
        <svg
          class="text-dark select-none rounded transition-colors hover:cursor-pointer hover:bg-gray-300 dark:text-white dark:hover:bg-zinc-700"
          width={27}
          height={27}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          id="hamburger-button"
          _="on click toggle .scale-y-0 on #nav-dropdown then toggle .scale-y-100 on #nav-dropdown then add .hidden to #search-results"
        >
          <path
            id="hamburger-top"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            class="transition-transform"
          ></path>
          <path
            id="hamburger-middle"
            d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            class=""
          ></path>
          <path
            id="hamburger-bottom"
            d="M3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            class="transition-transform"
          ></path>
        </svg>
      </div>
      <script src="/static/navigation.js" defer />
    </nav>
  );
}

export default Navigation;
