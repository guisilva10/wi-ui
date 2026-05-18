import { DocPage } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { CountdownTimerDemo } from "./countdown-timer-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "CountdownTimer" },
];

const PROPS = [
  {
    name: "targetDate",
    type: "Date | string",
    default: "—",
    description: "Data alvo para o countdown (obrigatório)",
  },
  {
    name: "variant",
    type: '"default" | "urgent" | "minimal"',
    default: '"default"',
    description:
      'Estilo visual. "urgent" muda automaticamente quando < 1h restante',
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Tamanho dos dígitos",
  },
  {
    name: "showDays",
    type: "boolean",
    default: "true",
    description: "Exibe o campo de dias",
  },
  {
    name: "showHours",
    type: "boolean",
    default: "true",
    description: "Exibe o campo de horas",
  },
  {
    name: "showMinutes",
    type: "boolean",
    default: "true",
    description: "Exibe o campo de minutos",
  },
  {
    name: "showSeconds",
    type: "boolean",
    default: "true",
    description: "Exibe o campo de segundos",
  },
  {
    name: "expiredText",
    type: "string",
    default: '"Oferta encerrada"',
    description: "Texto exibido quando o timer expira",
  },
  {
    name: "onExpire",
    type: "() => void",
    default: "—",
    description: "Callback chamado quando o timer chega a zero",
  },
];

export default function CountdownTimerPage() {
  return (
    <DocPage
      title="CountdownTimer"
      description="Timer regressivo com urgência visual automática. Ideal para ofertas, lançamentos e promoções com prazo."
      breadcrumbs={BREADCRUMBS}
    >
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Padrão</h2>
        <ComponentPreview
          code={`const target = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

<CountdownTimer targetDate={target} />`}
        >
          <CountdownTimerDemo variant="default" />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Urgente</h2>
        <p className="text-muted-foreground text-sm">
          Ativa automaticamente quando restam menos de 1 hora. Pode ser forçado
          com{" "}
          <code className="bg-muted rounded px-1 font-mono text-xs">
            variant=&quot;urgent&quot;
          </code>
          .
        </p>
        <ComponentPreview
          code={`const target = new Date(Date.now() + 45 * 60 * 1000);

<CountdownTimer targetDate={target} variant="urgent" />`}
        >
          <CountdownTimerDemo variant="urgent" />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Minimal</h2>
        <ComponentPreview
          code={`const target = new Date(Date.now() + 3 * 60 * 60 * 1000);

<CountdownTimer targetDate={target} variant="minimal" showDays={false} />`}
        >
          <CountdownTimerDemo variant="minimal" />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Props</h2>
        <PropsTable props={PROPS} />
      </section>
    </DocPage>
  );
}
