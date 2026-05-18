import { DocPage } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { TestimonialCarouselDemo } from "./testimonial-carousel-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "TestimonialCarousel" },
];

const PROPS = [
  {
    name: "testimonials",
    type: "Testimonial[]",
    default: "—",
    description: "Array de depoimentos",
  },
  {
    name: "autoPlay",
    type: "boolean",
    default: "true",
    description: "Avança automaticamente",
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
    description: "Exibe botões prev/next",
  },
  {
    name: "showDots",
    type: "boolean",
    default: "true",
    description: "Exibe dots de navegação",
  },
];

const TESTIMONIAL_TYPE_PROPS = [
  {
    name: "name",
    type: "string",
    default: "—",
    description: "Nome do autor",
  },
  {
    name: "role",
    type: "string",
    default: "—",
    description: "Cargo/função",
  },
  {
    name: "company",
    type: "string",
    default: "—",
    description: "Empresa",
  },
  {
    name: "avatar",
    type: "string",
    default: "—",
    description: "URL do avatar",
  },
  {
    name: "content",
    type: "string",
    default: "—",
    description: "Texto do depoimento",
  },
  {
    name: "rating",
    type: "number",
    default: "—",
    description: "Avaliação de 1 a 5",
  },
];

export default function TestimonialCarouselPage() {
  return (
    <DocPage
      title="TestimonialCarousel"
      description="Carrossel de depoimentos com auto-play, rating por estrelas e animações suaves. Essencial para prova social."
      breadcrumbs={BREADCRUMBS}
    >
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Card (padrão)</h2>
        <ComponentPreview
          code={`<TestimonialCarousel
  variant="card"
  testimonials={[
    {
      name: "Ana Lima",
      role: "CEO",
      company: "TechCorp",
      content: "Produto incrível, transformou nossa operação.",
      rating: 5,
    },
  ]}
/>`}
        >
          <div className="w-full max-w-md">
            <TestimonialCarouselDemo variant="card" />
          </div>
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Bubble</h2>
        <ComponentPreview
          code={`<TestimonialCarousel variant="bubble" testimonials={[...]} />`}
        >
          <div className="w-full max-w-md">
            <TestimonialCarouselDemo variant="bubble" />
          </div>
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Minimal</h2>
        <ComponentPreview
          code={`<TestimonialCarousel variant="minimal" testimonials={[...]} showControls={false} />`}
        >
          <div className="w-full max-w-md">
            <TestimonialCarouselDemo variant="minimal" />
          </div>
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Props</h2>
        <PropsTable props={PROPS} />
      </section>

      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">
          Tipo Testimonial
        </h2>
        <PropsTable props={TESTIMONIAL_TYPE_PROPS} />
      </section>
    </DocPage>
  );
}
