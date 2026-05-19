import { cn } from "@/lib/cn";

interface RetroGridProps extends React.ComponentProps<"div"> {
  angle?: number;
  cellSize?: number;
  opacity?: number;
  color?: string;
}

function RetroGrid({
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  color,
  className,
  ...props
}: RetroGridProps) {
  const gridColor = color ?? "oklch(0.8234 0.1927 206.47)";

  return (
    <div
      data-slot="retro-grid"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden [perspective:200px]",
        className,
      )}
      {...props}
    >
      <div
        className="absolute inset-0 [transform-origin:100%_0_0]"
        style={{ transform: `rotateX(${angle}deg)` }}
      >
        <div
          className="animate-retro-grid-scroll absolute inset-[-50%]"
          style={{
            backgroundImage: `linear-gradient(${gridColor} 1px, transparent 0), linear-gradient(90deg, ${gridColor} 1px, transparent 0)`,
            backgroundSize: `${cellSize}px ${cellSize}px`,
            opacity,
          }}
        />
      </div>
      <div className="from-background absolute inset-0 bg-gradient-to-t to-transparent to-90%" />
      <style>{`
        @keyframes retro-grid-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(${cellSize}px); }
        }
        [data-slot="retro-grid"] .animate-retro-grid-scroll {
          animation: retro-grid-scroll 2s linear infinite;
        }
      `}</style>
    </div>
  );
}

export { RetroGrid, type RetroGridProps };
