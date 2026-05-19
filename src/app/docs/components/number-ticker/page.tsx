import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { NumberTickerDemo } from "./number-ticker-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "NumberTicker" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "contagem-regressiva", label: "Contagem Regressiva", level: 2 },
  { id: "decimais", label: "Decimais", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "value",
    type: "number",
    description: "Valor final da animacao (obrigatorio)",
    required: true,
  },
  {
    name: "startValue",
    type: "number",
    default: "0",
    description: "Valor inicial da animacao",
  },
  {
    name: "direction",
    type: '"up" | "down"',
    default: '"up"',
    description: "Direcao da contagem — up (crescente) ou down (decrescente)",
  },
  {
    name: "delay",
    type: "number",
    default: "0",
    description: "Delay em segundos antes de iniciar a animacao",
  },
  {
    name: "decimalPlaces",
    type: "number",
    default: "0",
    description: "Numero de casas decimais exibidas",
  },
  {
    name: "className",
    type: "string",
    description: "Classes CSS adicionais no elemento span",
  },
];

export default function NumberTickerPage() {
  return (
    <DocPage
      title="NumberTicker"
      description="Animacao de contagem numerica com spring physics. Anima ao entrar no viewport via IntersectionObserver. Formatacao pt-BR nativa. Respeita prefers-reduced-motion."
      breadcrumbs={BREADCRUMBS}
      badge="Animação"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="number-ticker" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { NumberTicker } from "@/components/number-ticker";

<span className="text-6xl font-bold">
  <NumberTicker value={1500} />
</span>`}
        >
          <NumberTickerDemo value={1500} />
        </ComponentPreview>
      </DocSection>

      <DocSection id="contagem-regressiva" title="Contagem Regressiva">
        <p className="text-muted-foreground text-sm">
          Use{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            direction=&quot;down&quot;
          </code>{" "}
          para contar de um valor alto ate zero — util para countdowns e timers.
        </p>
        <ComponentPreview
          code={`<NumberTicker value={0} startValue={100} direction="down" />`}
        >
          <NumberTickerDemo value={0} startValue={100} direction="down" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="decimais" title="Decimais">
        <p className="text-muted-foreground text-sm">
          Use{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            decimalPlaces
          </code>{" "}
          para exibir casas decimais — util para porcentagens e valores
          monetarios.
        </p>
        <ComponentPreview
          code={`<NumberTicker value={98.6} decimalPlaces={1} />

<NumberTicker value={1299.99} decimalPlaces={2} />`}
        >
          <NumberTickerDemo value={98.6} decimalPlaces={1} />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
