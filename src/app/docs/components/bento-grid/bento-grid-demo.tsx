import {
  BentoGrid,
  BentoGridItem,
} from "@/shared/ui/components/bento-grid/bento-grid";

export function BentoGridDemo() {
  return (
    <BentoGrid columns={3} className="mx-auto max-w-2xl">
      <BentoGridItem
        colSpan={2}
        className="bg-muted/40 border-border rounded-xl border p-6"
      >
        <h3 className="mb-2 font-semibold">Feature Principal</h3>
        <p className="text-muted-foreground text-sm">
          Item com colSpan={2} ocupa duas colunas.
        </p>
      </BentoGridItem>
      <BentoGridItem className="bg-muted/40 border-border rounded-xl border p-6">
        <h3 className="mb-2 font-semibold">Item 2</h3>
        <p className="text-muted-foreground text-sm">Item padrao.</p>
      </BentoGridItem>
      <BentoGridItem className="bg-muted/40 border-border rounded-xl border p-6">
        <h3 className="mb-2 font-semibold">Item 3</h3>
        <p className="text-muted-foreground text-sm">Coluna simples.</p>
      </BentoGridItem>
      <BentoGridItem
        colSpan={2}
        className="bg-muted/40 border-border rounded-xl border p-6"
      >
        <h3 className="mb-2 font-semibold">Item 4</h3>
        <p className="text-muted-foreground text-sm">Outro item largo.</p>
      </BentoGridItem>
    </BentoGrid>
  );
}
