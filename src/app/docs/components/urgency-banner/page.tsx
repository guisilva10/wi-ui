import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { UrgencyBannerDemo } from "./urgency-banner-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "UrgencyBanner" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "warning", label: "Warning", level: 2 },
  { id: "critical", label: "Critical", level: 2 },
  { id: "info", label: "Info", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "message",
    type: "string",
    description:
      'Texto do banner. Use {countdown} para inserir o timer inline (ex: "Oferta encerra em {countdown}")',
    required: true,
  },
  {
    name: "targetDate",
    type: "Date | string",
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
    description: "Exibe botao de fechar",
  },
  {
    name: "cta",
    type: "UrgencyBannerCta",
    description: "{ label, href?, onClick? } — link de acao inline",
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
      description="Banner full-width com countdown inline e animacao slide-down. Ideal como aviso de oferta no topo da pagina."
      breadcrumbs={BREADCRUMBS}
      badge="FOMO"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="urgency-banner" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { UrgencyBanner } from "@/components/urgency-banner";

const target = new Date(Date.now() + 2 * 60 * 60 * 1000);

<UrgencyBanner
  message="Oferta encerra em {countdown}"
  targetDate={target}
/>`}
        >
          <UrgencyBannerDemo variant="warning" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="warning" title="Warning">
        <ComponentPreview
          code={`const target = new Date(Date.now() + 2 * 60 * 60 * 1000);

<UrgencyBanner
  sticky={false}
  message="Oferta especial encerra em {countdown} — nao perca!"
  targetDate={target}
  variant="warning"
/>`}
        >
          <UrgencyBannerDemo variant="warning" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="critical" title="Critical">
        <ComponentPreview
          code={`<UrgencyBanner
  sticky={false}
  message="Ultimas vagas! Restam apenas 3 lugares nesta turma."
  variant="critical"
  cta={{ label: "Garantir vaga", href: "#" }}
/>`}
        >
          <UrgencyBannerDemo variant="critical" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="info" title="Info">
        <ComponentPreview
          code={`<UrgencyBanner
  sticky={false}
  message="Novo: componentes FOMO disponiveis agora."
  variant="info"
  cta={{ label: "Ver componentes", href: "/docs" }}
/>`}
        >
          <UrgencyBannerDemo variant="info" />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
