import { Profile } from "@/types";

type Props = { profile: Profile | null };

async function Navigation({ profile }: Props) {
  return (
    <nav class="flex h-14 items-center justify-between bg-gray-100 px-6 sm:h-16 dark:bg-zinc-900">
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
      <div class="flex flex-row items-center gap-3 sm:gap-5">
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
        <script
          dangerouslySetInnerHTML={{
            __html: `document.addEventListener("DOMContentLoaded", function () {
              const themeButton = document.querySelector("#theme-button");
              const htmlElement = document.querySelector("html");

              const hamburgerTop = document.querySelector("#hamburger-top");
              const hamburgerMiddle = document.querySelector("#hamburger-middle");
              const hamburgerBottom = document.querySelector("#hamburger-bottom");
              const hamburgerButton = document.querySelector("#hamburger-button");
            
              const sunIcon = document.querySelector("#theme-sun");
              const moonIcon = document.querySelector("#theme-moon");
            
              const savedTheme = localStorage.getItem("theme");
            
              if (savedTheme) {
                htmlElement.className = savedTheme;
              }
            
              if (savedTheme === "light") {
                sunIcon.classList.remove("hidden");
                moonIcon.classList.add("hidden");
              } else {
                sunIcon.classList.add("hidden");
                moonIcon.classList.remove("hidden");
              }

              hamburgerButton.addEventListener("click", function () {
                hamburgerTop.classList.toggle("rotate-45");
                hamburgerTop.classList.toggle("translate-x-[6.5px]");
                hamburgerTop.classList.toggle("-translate-y-[0.5px]");
                hamburgerMiddle.classList.toggle("hidden");
                hamburgerBottom.classList.toggle("-rotate-45");
                hamburgerBottom.classList.toggle("-translate-x-[7.5px]");
                hamburgerBottom.classList.toggle("translate-y-[6.5px]");
              });
            
              themeButton.addEventListener("click", function () {
                const currentTheme = htmlElement.className;
                const newTheme = currentTheme === "dark" ? "light" : "dark";
                localStorage.setItem("theme", newTheme);
                htmlElement.className = newTheme;
              });
            });`,
          }}
        />
      </div>
    </nav>
  );
}

export default Navigation;
