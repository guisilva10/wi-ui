import { RetroGrid } from "@/shared/ui/components/retro-grid/retro-grid";

export function RetroGridDemo() {
  return (
    <div className="bg-background border-border relative h-[300px] w-full overflow-hidden rounded-lg border">
      <RetroGrid />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-foreground text-lg font-semibold">Retro Grid</p>
      </div>
    </div>
  );
}

export function RetroGridCustomDemo() {
  return (
    <div className="bg-background border-border relative h-[300px] w-full overflow-hidden rounded-lg border">
      <RetroGrid angle={55} cellSize={50} color="#a855f7" opacity={0.4} />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-foreground text-lg font-semibold">
          Custom Angle & Color
        </p>
      </div>
    </div>
  );
}
