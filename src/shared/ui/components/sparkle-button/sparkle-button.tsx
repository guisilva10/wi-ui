"use client";

import { cn } from "@/lib/cn";
import { ArrowRight } from "lucide-react";

interface SparkleButtonProps extends React.ComponentProps<"button"> {
  size?: "sm" | "md" | "lg";
  hideIcon?: boolean;
}

const sparkleStyles = `
.wi-sparkle-button {
  --active: 0;
  --btn-bg: var(--primary, oklch(0.8234 0.1927 206.47));
  --glow: oklch(from var(--btn-bg) l c h / 0.4);
}

.wi-sparkle-button:hover,
.wi-sparkle-button:focus-visible {
  --active: 1;
}

.wi-sparkle-beam {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  overflow: hidden;
}

.wi-sparkle-beam::before {
  content: '';
  position: absolute;
  inset: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(
    from 0deg,
    transparent 0%,
    oklch(1 0 0 / 0.3) 10%,
    transparent 20%,
    transparent 80%,
    oklch(1 0 0 / 0.3) 90%,
    transparent 100%
  );
  opacity: calc(var(--active) * 1);
  animation: wi-sparkle-rotate 2s linear infinite;
  animation-play-state: paused;
}

.wi-sparkle-button:hover .wi-sparkle-beam::before,
.wi-sparkle-button:focus-visible .wi-sparkle-beam::before {
  animation-play-state: running;
}

.wi-sparkle-beam::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: inherit;
  background: var(--foreground);
}

@keyframes wi-sparkle-rotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.wi-sparkle-particle {
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  background: oklch(1 0 0 / 0.8);
  animation: wi-sparkle-float 1.2s ease-in-out infinite;
  opacity: calc(var(--active) * 0.8);
}

@keyframes wi-sparkle-float {
  0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
  50%       { transform: translateY(-4px) scale(1.2); opacity: 0.6; }
}

.wi-sparkle-particle:nth-child(1) { width: 3px; height: 3px; top: 8%;  left: 20%; animation-delay: 0s; }
.wi-sparkle-particle:nth-child(2) { width: 2px; height: 2px; top: 12%; left: 50%; animation-delay: 0.2s; }
.wi-sparkle-particle:nth-child(3) { width: 3px; height: 3px; top: 8%;  left: 80%; animation-delay: 0.4s; }
.wi-sparkle-particle:nth-child(4) { width: 2px; height: 2px; top: 50%; left: 10%; animation-delay: 0.6s; }
.wi-sparkle-particle:nth-child(5) { width: 2px; height: 2px; top: 50%; left: 90%; animation-delay: 0.8s; }
.wi-sparkle-particle:nth-child(6) { width: 3px; height: 3px; top: 88%; left: 25%; animation-delay: 0.3s; }
.wi-sparkle-particle:nth-child(7) { width: 2px; height: 2px; top: 88%; left: 70%; animation-delay: 0.7s; }
`;

const sizeClasses = {
  sm: "h-11 px-5 text-sm gap-3",
  md: "h-14 px-7 text-base gap-4",
  lg: "h-12 px-4 text-xs gap-2 sm:h-16 sm:px-8 sm:text-lg sm:gap-4",
};

const iconSizes = {
  sm: "size-7",
  md: "size-9",
  lg: "size-8 sm:size-10",
};

const arrowSizes = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-4 sm:size-5",
};

function SparkleButton({
  children,
  className,
  disabled,
  size = "md",
  hideIcon = false,
  ...props
}: SparkleButtonProps) {
  return (
    <button
      data-slot="sparkle-button"
      disabled={disabled}
      className={cn(
        "wi-sparkle-button",
        "group text-background relative inline-flex cursor-pointer items-center justify-center rounded-full font-bold transition-all",
        "bg-foreground hover:bg-foreground/90",
        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        "select-none",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      <style>{sparkleStyles}</style>

      <div className="wi-sparkle-beam rounded-full" aria-hidden="true" />

      <span className="wi-sparkle-particle" aria-hidden="true" />
      <span className="wi-sparkle-particle" aria-hidden="true" />
      <span className="wi-sparkle-particle" aria-hidden="true" />
      <span className="wi-sparkle-particle" aria-hidden="true" />
      <span className="wi-sparkle-particle" aria-hidden="true" />
      <span className="wi-sparkle-particle" aria-hidden="true" />
      <span className="wi-sparkle-particle" aria-hidden="true" />

      <span className="relative z-10 whitespace-nowrap">{children}</span>

      {!hideIcon && (
        <span
          className={cn(
            "bg-background/20 relative z-10 flex shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-110",
            iconSizes[size],
          )}
        >
          <ArrowRight className={cn("text-white", arrowSizes[size])} />
        </span>
      )}
    </button>
  );
}

export { SparkleButton, type SparkleButtonProps };
