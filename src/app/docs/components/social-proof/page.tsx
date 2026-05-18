import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { SocialProofDemo } from "./social-proof-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "SocialProof" },
];

const TOC = [
  { id: "full", label: "Full (padrao)", level: 2 },
  { id: "compact", label: "Compact", level: 2 },
  { id: "minimal", label: "Minimal", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "data",
    type: "SocialProofData | SocialProofData[]",
    description:
      "Item unico ou array de items. Rotaciona automaticamente se array",
    required: true,
  },
  {
    name: "type",
    type: '"purchase" | "signup" | "viewing"',
    default: '"purchase"',
    description: "Tipo de acao — define texto e icone padrao",
  },
  {
    name: "variant",
    type: '"full" | "compact" | "minimal"',
    default: '"full"',
    description: "Estilo visual do popup",
  },
  {
    name: "position",
    type: '"bottom-left" | "bottom-right" | "top-left" | "top-right"',
    default: '"bottom-left"',
    description: "Posicao quando fixed=true",
  },
  {
    name: "autoRotate",
    type: "boolean",
    default: "true",
    description: "Rotaciona automaticamente entre items do array",
  },
  {
    name: "interval",
    type: "number",
    default: "4000",
    description: "Intervalo em ms entre rotacoes",
  },
  {
    name: "fixed",
    type: "boolean",
    default: "true",
    description: "Posiciona como fixed na tela. false para uso inline",
  },
];

export default function SocialProofPage() {
  return (
    <DocPage
      title="SocialProof"
      description='"Ana acabou de comprar" — popup flutuante de prova social. Aumenta confianca e urgencia na hora da decisao.'
      breadcrumbs={BREADCRUMBS}
      badge="FOMO"
      toc={TOC}
    >
      <DocSection id="full" title="Full (padrao)">
        <ComponentPreview
          code={`<SocialProof
  fixed={false}
  type="purchase"
  data={[
    { name: "Ana Lima", time: "ha 2 min", avatar: "" },
    { name: "Carlos M.", time: "ha 5 min" },
  ]}
/>`}
        >
          <SocialProofDemo variant="full" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="compact" title="Compact">
        <ComponentPreview
          code={`<SocialProof
  fixed={false}
  variant="compact"
  type="signup"
  data={{ name: "Maria S.", time: "agora mesmo" }}
/>`}
        >
          <SocialProofDemo variant="compact" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="minimal" title="Minimal">
        <ComponentPreview
          code={`<SocialProof
  fixed={false}
  variant="minimal"
  type="viewing"
  data={{ name: "Pedro K." }}
/>`}
        >
          <SocialProofDemo variant="minimal" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
