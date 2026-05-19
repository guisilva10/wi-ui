import { MeteorShower } from "@/shared/ui/components/meteor-shower/meteor-shower";

export function MeteorShowerDemo() {
  return (
    <div className="bg-background relative h-[300px] w-full overflow-hidden rounded-lg border">
      <MeteorShower count={20} />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-foreground text-lg font-semibold">Meteor Shower</p>
      </div>
    </div>
  );
}

export function MeteorShowerCustomDemo() {
  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-lg border bg-[#0d0d1a]">
      <MeteorShower count={30} color="#a855f7" />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-lg font-semibold text-white">Meteoros Roxos</p>
      </div>
    </div>
  );
}
