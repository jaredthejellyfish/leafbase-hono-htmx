import { cn } from '@lb/utils';

type Props = {
  children: JSX.Element;
  trigger: JSX.Element;
  bgClass?: string;
  ctClass?: string;
  title?: string;
  name: string;
};

const initialStyles = 'opacity-0 scale-0';

function Modal({
  children,
  trigger,
  name,
  bgClass: bgOverrides = '',
  ctClass: ctOverrides = '',
  title = '',
}: Props) {
  return (
    <>
      <button
        _={`on click toggle .scale-0 on #modal-div-${name} then toggle .opacity-0 on #modal-div-${name}`}
      >
        {trigger}
      </button>
      <div
        id={`modal-div-${name}`}
        class={cn(
          'absolute bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full scale-0 items-center justify-center bg-neutral-950/50 px-4 opacity-0 transition-all',
          initialStyles,
          bgOverrides,
        )}
      >
        <div
          class={cn(
            'min-w-full rounded-lg bg-zinc-800 px-3 sm:min-w-[500px] sm:px-5 lg:min-w-[700px]',
            ctOverrides,
          )}
        >
          <div
            id={`modal-heading-${name}`}
            class="flex flex-row items-center justify-between py-2"
          >
            <span>{title}</span>
            <div
              id="close-button"
              _={`on click toggle .scale-0 on #modal-div-${name} then toggle .opacity-0 on #modal-div-${name}`}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                class="cursor-pointer text-black dark:text-zinc-300"
                height="22px"
                width="22px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              </svg>
            </div>
          </div>
          <div id={`modal-content-${name}`} class="pb-2">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
