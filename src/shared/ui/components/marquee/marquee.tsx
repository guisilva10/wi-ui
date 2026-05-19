/* Adicione ao seu CSS global:
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(calc(-100% - var(--gap))); } }
@keyframes marquee-vertical { from { transform: translateY(0); } to { transform: translateY(calc(-100% - var(--gap))); } }
@theme { --animate-marquee: marquee var(--duration) linear infinite; --animate-marquee-vertical: marquee-vertical var(--duration) linear infinite; }
*/

import { cn } from "@/lib/cn";

interface MarqueeProps extends React.ComponentProps<"div"> {
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
}

function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      data-slot="marquee"
      {...props}
      className={cn(
        "group flex [gap:var(--gap)] overflow-hidden [--duration:40s] [--gap:1rem]",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            vertical
              ? "animate-marquee-vertical flex-col"
              : "animate-marquee flex-row",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

export { Marquee, type MarqueeProps };
