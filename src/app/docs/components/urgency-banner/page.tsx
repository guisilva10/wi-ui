import { DocPage } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { UrgencyBannerDemo } from "./urgency-banner-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "UrgencyBanner" },
];

const PROPS = [
  {
    name: "message",
    type: "string",
    default: "—",
    description:
      'Texto do banner. Use {countdown} para inserir o timer inline (ex: "Oferta encerra em {countdown}")',
  },
  {
    name: "targetDate",
    type: "Date | string",
    default: "—",
    description: "Data alvo para countdown inline",
  },
  {
    name: "variant",
    type: '"info" | "warning" | "critical"',
    default: '"warning"',
    description: "Estilo visual do banner",
  },
  {
    name: "dismissable",
    type: "boolean",
    default: "true",
    description: "Exibe botão de fechar",
  },
  {
    name: "cta",
    type: "UrgencyBannerCta",
    default: "—",
    description: "{ label, href?, onClick? } — link de ação inline",
  },
  {
    name: "sticky",
    type: "boolean",
    default: "true",
    description: "Posiciona como sticky no topo",
  },
];

export default function UrgencyBannerPage() {
  return (
    <DocPage
      title="UrgencyBanner"
      description="Banner full-width com countdown inline e animação slide-down. Ideal como aviso de oferta no topo da página."
      breadcrumbs={BREADCRUMBS}
    >
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">
          Warning (padrão)
        </h2>
        <ComponentPreview
          code={`const target = new Date(Date.now() + 2 * 60 * 60 * 1000);

<UrgencyBanner
  sticky={false}
  message="Oferta especial encerra em {countdown} — não perca!"
  targetDate={target}
  variant="warning"
/>`}
        >
          <UrgencyBannerDemo variant="warning" />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Critical</h2>
        <ComponentPreview
          code={`<UrgencyBanner
  sticky={false}
  message="Últimas vagas! Restam apenas 3 lugares nesta turma."
  variant="critical"
  cta={{ label: "Garantir vaga", href: "#" }}
/>`}
        >
          <UrgencyBannerDemo variant="critical" />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Info</h2>
        <ComponentPreview
          code={`<UrgencyBanner
  sticky={false}
  message="Novo: componentes FOMO disponíveis agora."
  variant="info"
  cta={{ label: "Ver componentes", href: "/docs" }}
/>`}
        >
          <UrgencyBannerDemo variant="info" />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Props</h2>
        <PropsTable props={PROPS} />
      </section>
    </DocPage>
  );
}
