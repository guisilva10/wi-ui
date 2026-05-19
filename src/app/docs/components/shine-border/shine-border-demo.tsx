import { ShineBorder } from "@/shared/ui/components/shine-border/shine-border";

export function ShineBorderDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <ShineBorder borderWidth={1} duration={8} className="w-64">
        <div className="p-8 text-center">
          <h3 className="mb-1 font-semibold">Shine Border</h3>
          <p className="text-muted-foreground text-sm">
            Borda com brilho rotativo.
          </p>
        </div>
      </ShineBorder>
    </div>
  );
}

export function ShineBorderMulticolorDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <ShineBorder
        borderWidth={2}
        duration={5}
        color={["oklch(0.8234 0.1927 206.47)", "#f43f5e", "#a855f7"]}
        className="w-64"
      >
        <div className="p-8 text-center">
          <h3 className="mb-1 font-semibold">Multicolor</h3>
          <p className="text-muted-foreground text-sm">
            Multiplas cores no gradiente.
          </p>
        </div>
      </ShineBorder>
    </div>
  );
}
