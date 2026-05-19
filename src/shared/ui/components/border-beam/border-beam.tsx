import { cn } from "@/lib/cn";

interface BorderBeamProps extends React.ComponentProps<"div"> {
  duration?: number;
  size?: number;
  color?: string;
  delay?: number;
}

function BorderBeam({
  duration = 6,
  size: _size = 200,
  color = "oklch(0.8234 0.1927 206.47)",
  delay = 0,
  className,
  ...props
}: BorderBeamProps) {
  return (
    <div
      data-slot="border-beam"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        className,
      )}
      {...props}
    >
      <div
        className="absolute inset-[-100%] rounded-[inherit]"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0%, ${color} 10%, transparent 20%)`,
          animation: `border-beam-spin ${duration}s linear ${delay}s infinite`,
        }}
      />
      <div className="bg-background absolute inset-[1px] rounded-[inherit]" />
      <style>{`
        @keyframes border-beam-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export { BorderBeam, type BorderBeamProps };
