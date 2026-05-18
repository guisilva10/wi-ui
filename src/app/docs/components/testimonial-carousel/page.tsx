import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallCommand } from "@/shared/ui/docs/install-command";
import { ComponentSource } from "@/shared/ui/docs/component-source";
import { TestimonialCarouselDemo } from "./testimonial-carousel-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "TestimonialCarousel" },
];

const TOC = [
  { id: "card", label: "Card (padrao)", level: 2 },
  { id: "bubble", label: "Bubble", level: 2 },
  { id: "minimal", label: "Minimal", level: 2 },
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "codigo-fonte", label: "Codigo fonte", level: 2 },
  { id: "props", label: "Props", level: 2 },
  { id: "tipo-testimonial", label: "Tipo Testimonial", level: 2 },
];

const PROPS = [
  {
    name: "testimonials",
    type: "Testimonial[]",
    description: "Array de depoimentos",
    required: true,
  },
  {
    name: "autoPlay",
    type: "boolean",
    default: "true",
    description: "Avanca automaticamente",
  },
  {
    name: "interval",
    type: "number",
    default: "5000",
    description: "Intervalo em ms entre slides",
  },
  {
    name: "variant",
    type: '"card" | "bubble" | "minimal"',
    default: '"card"',
    description: "Estilo visual dos depoimentos",
  },
  {
    name: "showControls",
    type: "boolean",
    default: "true",
    description: "Exibe botoes prev/next",
  },
  {
    name: "showDots",
    type: "boolean",
    default: "true",
    description: "Exibe dots de navegacao",
  },
];

const TESTIMONIAL_TYPE_PROPS = [
  {
    name: "name",
    type: "string",
    description: "Nome do autor",
    required: true,
  },
  {
    name: "role",
    type: "string",
    description: "Cargo/funcao",
  },
  {
    name: "company",
    type: "string",
    description: "Empresa",
  },
  {
    name: "avatar",
    type: "string",
    description: "URL do avatar",
  },
  {
    name: "content",
    type: "string",
    description: "Texto do depoimento",
    required: true,
  },
  {
    name: "rating",
    type: "number",
    description: "Avaliacao de 1 a 5",
  },
];

export default function TestimonialCarouselPage() {
  return (
    <DocPage
      title="TestimonialCarousel"
      description="Carrossel de depoimentos com auto-play, rating por estrelas e animacoes suaves. Essencial para prova social."
      breadcrumbs={BREADCRUMBS}
      badge="FOMO"
      toc={TOC}
    >
      <DocSection id="card" title="Card (padrao)">
        <ComponentPreview
          code={`<TestimonialCarousel
  variant="card"
  testimonials={[
    {
      name: "Ana Lima",
      role: "CEO",
      company: "TechCorp",
      content: "Produto incrivel, transformou nossa operacao.",
      rating: 5,
    },
  ]}
/>`}
        >
          <div className="w-full max-w-md">
            <TestimonialCarouselDemo variant="card" />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="bubble" title="Bubble">
        <ComponentPreview
          code={`<TestimonialCarousel variant="bubble" testimonials={[...]} />`}
        >
          <div className="w-full max-w-md">
            <TestimonialCarouselDemo variant="bubble" />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="minimal" title="Minimal">
        <ComponentPreview
          code={`<TestimonialCarousel variant="minimal" testimonials={[...]} showControls={false} />`}
        >
          <div className="w-full max-w-md">
            <TestimonialCarouselDemo variant="minimal" />
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection id="instalacao" title="Instalacao">
        <InstallCommand componentName="testimonial-carousel" />
      </DocSection>

      <DocSection id="codigo-fonte" title="Codigo fonte">
        <ComponentSource componentName="testimonial-carousel" />
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>

      <DocSection id="tipo-testimonial" title="Tipo Testimonial">
        <PropsTable props={TESTIMONIAL_TYPE_PROPS} />
      </DocSection>
    </DocPage>
  );
}
