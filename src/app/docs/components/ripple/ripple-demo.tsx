import { Ripple } from "@/shared/ui/components/ripple/ripple";

export function RippleDemo() {
  return (
    <div className="bg-background border-border relative h-[300px] w-full overflow-hidden rounded-lg border">
      <Ripple color="oklch(0.8234 0.1927 206.47)" count={4} duration={4} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-foreground text-lg font-semibold">Ripple</span>
      </div>
    </div>
  );
}

export function RippleCustomDemo() {
  return (
    <div className="bg-background border-border relative h-[300px] w-full overflow-hidden rounded-lg border">
      <Ripple color="#f43f5e" count={5} duration={3} />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-foreground text-lg font-semibold">
          Custom Color
        </span>
      </div>
    </div>
  );
}
