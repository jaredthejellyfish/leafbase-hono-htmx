type Props = {};

function VerifyPage({}: Props) {
  return (
    <main class="flex items-center justify-center bg-zinc-50/50 px-4 py-64 dark:bg-zinc-950 sm:px-0">
      <div class="flex w-full flex-col items-center justify-center gap-3 rounded-lg px-8 py-10 shadow-lg dark:bg-zinc-900 md:w-96">
        <h1 class="mb-1 text-2xl font-medium dark:text-white">
          Check your email!
        </h1>
        <p class="text-center text-sm text-zinc-400">
          A magic link has been sent to your email so you can verify your
          account!
        </p>
        <div class="flex items-center justify-center text-zinc-300 dark:text-zinc-600">
          <p class="text-xs md:text-sm">────────────────────</p>
        </div>
        <div class="flex flex-row gap-4">
          <a
            href="https://gmail.com"
            class="flex size-12 items-center justify-center rounded border border-zinc-100 bg-white text-red-600 shadow-md transition hover:scale-105 dark:bg-zinc-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="34px"
              height="34px"
            >
              <path
                fill="#4caf50"
                d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"
              />
              <path
                fill="#1e88e5"
                d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"
              />
              <polygon
                fill="#e53935"
                points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"
              />
              <path
                fill="#c62828"
                d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"
              />
              <path
                fill="#fbc02d"
                d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"
              />
            </svg>
          </a>
          <a
            href="https://protonmail.com"
            class="flex size-12 items-center justify-center rounded border border-zinc-100 bg-white text-red-600 shadow-md transition hover:scale-105 dark:bg-zinc-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="34px"
              height="34px"
              baseProfile="basic"
            >
              <path
                fill="#d1c4e9"
                d="M42.449,9.264L26.355,22.088c-1.401,1.117-3.404,1.112-4.8-0.01L5.535,9.198	C4.909,8.721,4,9.161,4,9.941v5.603v19.732c0,2.076,1.706,3.758,3.81,3.758H40.19c2.104,0,3.81-1.683,3.81-3.758V9.995	C44,9.205,43.072,8.767,42.449,9.264z"
              />
              <path
                fill="#7c4dff"
                d="M35.429,14.858l-13.79,10.988c-1.4,1.115-3.399,1.112-4.796-0.007L4,15.545v19.732	c0,2.076,1.706,3.758,3.81,3.758h27.619V14.858z"
              />
            </svg>
          </a>
          <a
            href="https://gmail.com"
            class="flex size-12 items-center justify-center rounded border border-zinc-100 bg-white text-red-600 shadow-md transition hover:scale-105 dark:bg-zinc-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="34px"
              height="34px"
            >
              <path
                fill="#1a237e"
                d="M43.607,23.752l-7.162-4.172v11.594H44v-6.738C44,24.155,43.85,23.894,43.607,23.752z"
              />
              <path
                fill="#0c4999"
                d="M33.919,8.84h9.046V7.732C42.965,6.775,42.19,6,41.234,6H17.667c-0.956,0-1.732,0.775-1.732,1.732 V8.84h9.005H33.919z"
              />
              <path
                fill="#0f73d9"
                d="M33.919,33.522h7.314c0.956,0,1.732-0.775,1.732-1.732v-6.827h-9.046V33.522z"
              />
              <path
                fill="#0f439d"
                d="M15.936,24.964v6.827c0,0.956,0.775,1.732,1.732,1.732h7.273v-8.558H15.936z"
              />
              <path
                fill="#2ecdfd"
                d="M33.919 8.84H42.964999999999996V16.866999999999997H33.919z"
              />
              <path
                fill="#1c5fb0"
                d="M15.936 8.84H24.941000000000003V16.866999999999997H15.936z"
              />
              <path fill="#1467c7" d="M24.94 24.964H33.919V33.522H24.94z" />
              <path
                fill="#1690d5"
                d="M24.94 8.84H33.919V16.866999999999997H24.94z"
              />
              <path
                fill="#1bb4ff"
                d="M33.919 16.867H42.964999999999996V24.963H33.919z"
              />
              <path
                fill="#074daf"
                d="M15.936 16.867H24.941000000000003V24.963H15.936z"
              />
              <path fill="#2076d4" d="M24.94 16.867H33.919V24.963H24.94z" />
              <path
                fill="#2ed0ff"
                d="M15.441,42c0.463,0,26.87,0,26.87,0C43.244,42,44,41.244,44,40.311V24.438 c0,0-0.03,0.658-1.751,1.617c-1.3,0.724-27.505,15.511-27.505,15.511S14.978,42,15.441,42z"
              />
              <path
                fill="#139fe2"
                d="M42.279,41.997c-0.161,0-26.59,0.003-26.59,0.003C14.756,42,14,41.244,14,40.311V25.067 l29.363,16.562C43.118,41.825,42.807,41.997,42.279,41.997z"
              />
              <path
                fill="#00488d"
                d="M22.319,34H5.681C4.753,34,4,33.247,4,32.319V15.681C4,14.753,4.753,14,5.681,14h16.638 C23.247,14,24,14.753,24,15.681v16.638C24,33.247,23.247,34,22.319,34z"
              />
              <path
                fill="#fff"
                d="M13.914,18.734c-3.131,0-5.017,2.392-5.017,5.343c0,2.951,1.879,5.342,5.017,5.342 c3.139,0,5.017-2.392,5.017-5.342C18.931,21.126,17.045,18.734,13.914,18.734z M13.914,27.616c-1.776,0-2.838-1.584-2.838-3.539 s1.067-3.539,2.838-3.539c1.771,0,2.839,1.585,2.839,3.539S15.689,27.616,13.914,27.616z"
              />
            </svg>
          </a>
          <a
            href="https://icloud.com"
            class="flex size-12 items-center justify-center rounded border border-zinc-100 bg-white text-red-600 shadow-md transition hover:scale-105 dark:bg-zinc-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="34px"
              height="34px"
            >
              <path d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z" />
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
}

export default VerifyPage;
