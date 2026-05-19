import { cn } from "@/lib/cn";

type ShineBorderProps = Omit<React.ComponentProps<"div">, "color"> & {
  borderWidth?: number;
  duration?: number;
  color?: string | string[];
};

function ShineBorder({
  borderWidth = 1,
  duration = 8,
  color = "oklch(0.8234 0.1927 206.47)",
  className,
  children,
  ...props
}: ShineBorderProps) {
  const colors = Array.isArray(color) ? color.join(", ") : color;

  return (
    <div
      data-slot="shine-border"
      className={cn("relative overflow-hidden rounded-xl", className)}
      style={{ padding: `${borderWidth}px` }}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-[-200%] rounded-[inherit]"
        style={{
          background: `conic-gradient(from 0deg, transparent 30%, ${colors}, transparent 70%)`,
          animation: `shine-border-rotate ${duration}s linear infinite`,
        }}
      />
      <div className="bg-background relative h-full w-full rounded-[inherit]">
        {children}
      </div>
      <style>{`
        @keyframes shine-border-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export { ShineBorder, type ShineBorderProps };
