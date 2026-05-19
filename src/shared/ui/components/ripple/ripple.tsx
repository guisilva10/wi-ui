import { cn } from "@/lib/cn";

interface RippleProps extends React.ComponentProps<"div"> {
  color?: string;
  count?: number;
  duration?: number;
}

function Ripple({
  color = "oklch(0.8234 0.1927 206.47)",
  count = 3,
  duration = 4,
  className,
  ...props
}: RippleProps) {
  return (
    <div
      data-slot="ripple"
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden",
        className,
      )}
      {...props}
    >
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            border: `1px solid ${color}`,
            width: `${60 + i * 80}px`,
            height: `${60 + i * 80}px`,
            opacity: 0,
            animation: `ripple-expand ${duration}s ease-out ${i * (duration / count)}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes ripple-expand {
          0% { opacity: 0.4; transform: scale(0.8); }
          100% { opacity: 0; transform: scale(2.5); }
        }
      `}</style>
    </div>
  );
}

export { Ripple, type RippleProps };
