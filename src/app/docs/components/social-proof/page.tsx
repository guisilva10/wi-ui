import { DocPage } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { SocialProofDemo } from "./social-proof-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "SocialProof" },
];

const PROPS = [
  {
    name: "data",
    type: "SocialProofData | SocialProofData[]",
    default: "—",
    description:
      "Item único ou array de items. Rotaciona automaticamente se array",
  },
  {
    name: "type",
    type: '"purchase" | "signup" | "viewing"',
    default: '"purchase"',
    description: "Tipo de ação — define texto e ícone padrão",
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
    description: "Posição quando fixed=true",
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
    description: "Intervalo em ms entre rotações",
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
      description='Popup flutuante de prova social. "Ana acabou de comprar" — aumenta confiança e urgência na hora da decisão.'
      breadcrumbs={BREADCRUMBS}
    >
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Full (padrão)</h2>
        <ComponentPreview
          code={`<SocialProof
  fixed={false}
  type="purchase"
  data={[
    { name: "Ana Lima", time: "há 2 min", avatar: "" },
    { name: "Carlos M.", time: "há 5 min" },
  ]}
/>`}
        >
          <SocialProofDemo variant="full" />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Compact</h2>
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
      </section>

      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Minimal</h2>
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
      </section>

      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Props</h2>
        <PropsTable props={PROPS} />
      </section>
    </DocPage>
  );
}
