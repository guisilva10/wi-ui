import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallCommand } from "@/shared/ui/docs/install-command";
import { ComponentSource } from "@/shared/ui/docs/component-source";
import { CountdownTimerDemo } from "./countdown-timer-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "CountdownTimer" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "default", label: "Default", level: 2 },
  { id: "urgent", label: "Urgent", level: 2 },
  { id: "minimal", label: "Minimal", level: 2 },
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "codigo-fonte", label: "Codigo fonte", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "targetDate",
    type: "Date | string",
    description: "Data alvo para o countdown (obrigatorio)",
    required: true,
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
    description: "Tamanho dos digitos",
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
    description: "Callback chamado quando o timer chega a zero",
  },
];

export default function CountdownTimerPage() {
  return (
    <DocPage
      title="CountdownTimer"
      description="Timer regressivo com urgencia visual automatica. Ideal para ofertas, lancamentos e promocoes com prazo."
      breadcrumbs={BREADCRUMBS}
      badge="FOMO"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallCommand componentName="countdown-timer" />
        <ComponentSource componentName="countdown-timer" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { CountdownTimer } from "@/components/countdown-timer";

const target = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

<CountdownTimer targetDate={target} />`}
        >
          <CountdownTimerDemo variant="default" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="default" title="Default">
        <ComponentPreview
          code={`const target = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

<CountdownTimer targetDate={target} variant="default" />`}
        >
          <CountdownTimerDemo variant="default" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="urgent" title="Urgent">
        <p className="text-muted-foreground text-sm">
          Ativa automaticamente quando restam menos de 1 hora. Pode ser forcado
          com{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
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
      </DocSection>

      <DocSection id="minimal" title="Minimal">
        <ComponentPreview
          code={`const target = new Date(Date.now() + 3 * 60 * 60 * 1000);

<CountdownTimer targetDate={target} variant="minimal" showDays={false} />`}
        >
          <CountdownTimerDemo variant="minimal" showDays={false} />
        </ComponentPreview>
      </DocSection>

      <DocSection id="instalacao" title="Instalacao">
        <InstallCommand componentName="countdown-timer" />
      </DocSection>

      <DocSection id="codigo-fonte" title="Codigo fonte">
        <ComponentSource componentName="countdown-timer" />
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
