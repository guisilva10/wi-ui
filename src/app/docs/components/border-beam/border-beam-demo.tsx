import { BorderBeam } from "@/shared/ui/components/border-beam/border-beam";

export function BorderBeamDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="bg-muted/30 relative w-64 rounded-xl border border-transparent p-8 text-center">
        <BorderBeam duration={6} />
        <h3 className="mb-1 font-semibold">Border Beam</h3>
        <p className="text-muted-foreground text-sm">Borda animada em loop.</p>
      </div>
    </div>
  );
}

export function BorderBeamCustomDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-8">
      <div className="bg-muted/30 relative w-48 rounded-xl border border-transparent p-6 text-center">
        <BorderBeam color="#f43f5e" duration={4} />
        <p className="text-sm font-medium">Rosa</p>
      </div>
      <div className="bg-muted/30 relative w-48 rounded-xl border border-transparent p-6 text-center">
        <BorderBeam color="#a855f7" duration={8} />
        <p className="text-sm font-medium">Roxo</p>
      </div>
    </div>
  );
}
