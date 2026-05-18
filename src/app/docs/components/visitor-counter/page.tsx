import { DocPage } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { VisitorCounterDemo } from "./visitor-counter-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "VisitorCounter" },
];

const PROPS = [
  {
    name: "count",
    type: "number",
    default: "—",
    description: "Número de visitantes atual",
  },
  {
    name: "variant",
    type: '"dot" | "pulse" | "bar"',
    default: '"dot"',
    description: "Estilo do indicador live",
  },
  {
    name: "label",
    type: "string",
    default: '"pessoas vendo agora"',
    description: "Texto após o contador",
  },
  {
    name: "simulateActivity",
    type: "boolean",
    default: "false",
    description: "Oscila o contador ±3 a cada 5s para demonstrações",
  },
];

export default function VisitorCounterPage() {
  return (
    <DocPage
      title="VisitorCounter"
      description='"X pessoas vendo agora" — indicador live compacto e não-intrusivo. Aumenta pressão social sutil na conversão.'
      breadcrumbs={BREADCRUMBS}
    >
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Dot (padrão)</h2>
        <ComponentPreview
          code={`<VisitorCounter count={47} variant="dot" simulateActivity />`}
        >
          <VisitorCounterDemo variant="dot" />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Pulse</h2>
        <ComponentPreview
          code={`<VisitorCounter count={47} variant="pulse" simulateActivity />`}
        >
          <VisitorCounterDemo variant="pulse" />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Bar</h2>
        <ComponentPreview
          code={`<VisitorCounter count={47} variant="bar" simulateActivity />`}
        >
          <VisitorCounterDemo variant="bar" />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Props</h2>
        <PropsTable props={PROPS} />
      </section>
    </DocPage>
  );
}
