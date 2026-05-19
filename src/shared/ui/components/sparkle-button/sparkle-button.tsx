"use client";

import { cn } from "@/lib/cn";

export type SparkleButtonProps = React.ComponentProps<"button">;

const sparkleStyles = `
.wi-sparkle-button {
  --active: 0;
  --primary: var(--primary, oklch(0.8234 0.1927 206.47));
  --primary-foreground: var(--primary-foreground, #000);
  --glow: oklch(from var(--primary) l c h / 0.4);
  position: relative;
  isolation: isolate;
}

.wi-sparkle-button:hover,
.wi-sparkle-button:focus-visible {
  --active: 1;
}

.wi-sparkle-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.wi-sparkle-dots-border {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  overflow: hidden;
}

.wi-sparkle-dots-border::before {
  content: '';
  position: absolute;
  inset: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(
    from 0deg,
    transparent 0%,
    var(--primary) 10%,
    transparent 20%,
    transparent 80%,
    var(--primary) 90%,
    transparent 100%
  );
  opacity: calc(var(--active) * 1);
  animation: wi-sparkle-rotate 2s linear infinite;
  animation-play-state: paused;
}

.wi-sparkle-button:hover .wi-sparkle-dots-border::before,
.wi-sparkle-button:focus-visible .wi-sparkle-dots-border::before {
  animation-play-state: running;
}

.wi-sparkle-dots-border::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: inherit;
  background: inherit;
}

@keyframes wi-sparkle-rotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@keyframes wi-sparkle-path {
  0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
  50%       { transform: translateY(-4px) scale(1.2); opacity: 0.6; }
}

.wi-sparkle-button::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    circle at 50% 0%,
    var(--glow) 0%,
    transparent 60%
  );
  opacity: var(--active);
  transition: opacity 0.3s ease;
}

.wi-sparkle-button::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  border: 1px solid var(--primary);
  opacity: calc(var(--active) * 0.6);
  box-shadow: 0 0 12px 2px var(--glow);
  transition: opacity 0.3s ease, box-shadow 0.3s ease;
}

.wi-sparkle-particle {
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  background: var(--primary);
  animation: wi-sparkle-path 1.2s ease-in-out infinite;
  opacity: calc(var(--active) * 0.8);
}

.wi-sparkle-particle:nth-child(1) { width: 3px; height: 3px; top: 8%;  left: 20%; animation-delay: 0s;    animation-duration: 1.4s; }
.wi-sparkle-particle:nth-child(2) { width: 2px; height: 2px; top: 12%; left: 50%; animation-delay: 0.2s;  animation-duration: 1.1s; }
.wi-sparkle-particle:nth-child(3) { width: 3px; height: 3px; top: 8%;  left: 80%; animation-delay: 0.4s;  animation-duration: 1.3s; }
.wi-sparkle-particle:nth-child(4) { width: 2px; height: 2px; top: 50%; left: 10%; animation-delay: 0.6s;  animation-duration: 1.5s; }
.wi-sparkle-particle:nth-child(5) { width: 2px; height: 2px; top: 50%; left: 90%; animation-delay: 0.8s;  animation-duration: 1.2s; }
.wi-sparkle-particle:nth-child(6) { width: 3px; height: 3px; top: 88%; left: 25%; animation-delay: 0.3s;  animation-duration: 1.6s; }
.wi-sparkle-particle:nth-child(7) { width: 2px; height: 2px; top: 88%; left: 70%; animation-delay: 0.7s;  animation-duration: 1.0s; }
`;

function SparkleButton({
  children,
  className,
  disabled,
  ...props
}: SparkleButtonProps) {
  return (
    <button
      data-slot="sparkle-button"
      disabled={disabled}
      className={cn(
        "wi-sparkle-button",
        "relative inline-flex cursor-pointer items-center justify-center gap-2",
        "rounded-lg px-5 py-2.5",
        "bg-foreground text-background",
        "text-sm font-medium",
        "transition-all duration-300",
        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        "select-none",
        className,
      )}
      {...props}
    >
      <style>{sparkleStyles}</style>

      <div className="wi-sparkle-dots-border rounded-lg" aria-hidden="true" />

      <span className="wi-sparkle-particle" aria-hidden="true" />
      <span className="wi-sparkle-particle" aria-hidden="true" />
      <span className="wi-sparkle-particle" aria-hidden="true" />
      <span className="wi-sparkle-particle" aria-hidden="true" />
      <span className="wi-sparkle-particle" aria-hidden="true" />
      <span className="wi-sparkle-particle" aria-hidden="true" />
      <span className="wi-sparkle-particle" aria-hidden="true" />

      <span className="relative z-10">{children}</span>
    </button>
  );
}

export { SparkleButton };
