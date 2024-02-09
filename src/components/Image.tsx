import { cn } from '@/lib/utils';

type Props = {
  width: number | string;
  height: number | string;
  src: string;
  alt: string;
  class?: string;
  lazy?: boolean;
};

function Image({
  width,
  height,
  src,
  alt,
  lazy = true,
  class: className,
}: Props) {
  return (
    <img
      class={cn('rounded', className)}
      src={lazy ? '/static/placeholder.jpg' : src}
      alt={alt}
      width={width}
      height={height}
      data-lazy={lazy ? 'true' : false}
      data-lazysrc={lazy ? src : undefined}
    />
  );
}

export default Image;
