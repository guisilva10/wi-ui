import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallCommand } from "@/shared/ui/docs/install-command";
import { ComponentSource } from "@/shared/ui/docs/component-source";
import { TestimonialsSection } from "@/shared/ui/components/testimonials-section";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Blocos" },
  { label: "TestimonialsSection" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "tres-colunas", label: "Tres colunas", level: 2 },
  { id: "duas-colunas", label: "Duas colunas", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "title",
    type: "string",
    description: "Titulo da secao de depoimentos",
    required: true,
  },
  {
    name: "testimonials",
    type: "TestimonialItem[]",
    description:
      "Array de depoimentos. { quote, author, role?, company?, avatar?, rating? }",
    required: true,
  },
  {
    name: "eyebrow",
    type: "string",
    description: "Texto pequeno em uppercase acima do titulo",
  },
  {
    name: "description",
    type: "string",
    description: "Descricao abaixo do titulo da secao",
  },
  {
    name: "columns",
    type: "2 | 3",
    default: "3",
    description: "Numero de colunas no grid",
  },
  {
    name: "className",
    type: "string",
    default: "--",
    description: "Classes CSS adicionais",
  },
];

const TESTIMONIALS_BASE = [
  {
    quote:
      "Reduziu o tempo de desenvolvimento em 60%. Os componentes sao solidos e o codigo e limpo.",
    author: "Ana Lima",
    role: "Frontend Lead",
    company: "Startup X",
    rating: 5,
  },
  {
    quote:
      "Finalmente uma biblioteca que nao traz 50 dependencias. Copiei, colei e funcionou.",
    author: "Carlos Mendes",
    role: "Dev Fullstack",
    company: "AgencyY",
    rating: 5,
  },
  {
    quote:
      "O design minimalista combina com qualquer projeto. Sem precisar sobrescrever nada.",
    author: "Julia Santos",
    role: "Product Designer",
    company: "Studio Z",
    rating: 5,
  },
];

export default function TestimonialsSectionPage() {
  return (
    <DocPage
      title="TestimonialsSection"
      description="Secao de depoimentos em grid com rating por estrelas, avatar com fallback de iniciais e informacoes do autor."
      breadcrumbs={BREADCRUMBS}
      badge="Block"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallCommand componentName="testimonials-section" />
        <ComponentSource componentName="testimonials-section" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { TestimonialsSection } from "@/components/testimonials-section";

<TestimonialsSection
  title="O que dizem nossos clientes"
  testimonials={[
    {
      quote: "Produto incrivel!",
      author: "Ana Lima",
      rating: 5,
    },
  ]}
/>`}
        >
          <TestimonialsSection
            title="O que dizem nossos clientes"
            testimonials={[
              {
                quote: "Produto incrivel!",
                author: "Ana Lima",
                rating: 5,
              },
            ]}
          />
        </ComponentPreview>
      </DocSection>

      <DocSection id="tres-colunas" title="Tres colunas">
        <ComponentPreview
          code={`<TestimonialsSection
  eyebrow="Depoimentos"
  title="Amado por desenvolvedores"
  description="Mais de 1.000 times ja usam WI.UI."
  columns={3}
  testimonials={[...]}
/>`}
        >
          <TestimonialsSection
            eyebrow="Depoimentos"
            title="Amado por desenvolvedores"
            description="Mais de 1.000 times ja usam WI.UI."
            columns={3}
            testimonials={TESTIMONIALS_BASE}
          />
        </ComponentPreview>
      </DocSection>

      <DocSection id="duas-colunas" title="Duas colunas">
        <ComponentPreview
          code={`<TestimonialsSection
  title="O que dizem nossos clientes"
  columns={2}
  testimonials={[...]}
/>`}
        >
          <TestimonialsSection
            title="O que dizem nossos clientes"
            columns={2}
            testimonials={TESTIMONIALS_BASE.slice(0, 2)}
          />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
