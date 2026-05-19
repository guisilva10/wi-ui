import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { TestimonialsSection } from "@/shared/ui/components/testimonials-section";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Blocos" },
  { label: "TestimonialsSection" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "marquee", label: "Marquee (padrao)", level: 2 },
  { id: "grid", label: "Grid", level: 2 },
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
    name: "layout",
    type: '"grid" | "marquee"',
    default: '"marquee"',
    description:
      "Layout dos depoimentos. Marquee mostra em scroll infinito, grid mostra em colunas estaticas.",
  },
  {
    name: "columns",
    type: "2 | 3",
    default: "3",
    description: "Numero de colunas (apenas layout grid)",
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
  {
    quote:
      "Melhor DX que ja tive com uma lib de componentes. CLI simples e direto ao ponto.",
    author: "Rafael Costa",
    role: "Tech Lead",
    company: "DevHouse",
    rating: 5,
  },
  {
    quote:
      "Os componentes FOMO deram um boost real na conversao das nossas landing pages.",
    author: "Marina Oliveira",
    role: "Growth Manager",
    company: "SaaS Corp",
    rating: 4,
  },
  {
    quote:
      "Personalizacao facil com Tailwind. Nao precisa lutar contra a lib pra mudar estilos.",
    author: "Pedro Alves",
    role: "Frontend Dev",
    company: "Agency Pro",
    rating: 5,
  },
];

export default function TestimonialsSectionPage() {
  return (
    <DocPage
      title="TestimonialsSection"
      description="Secao de depoimentos com layout em marquee (scroll infinito) ou grid. Cards com rating, avatar e informacoes do autor."
      breadcrumbs={BREADCRUMBS}
      badge="Bloco"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="testimonials-section" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { TestimonialsSection } from "@/components/testimonials-section";

<TestimonialsSection
  title="O que dizem nossos clientes"
  testimonials={[
    { quote: "Produto incrivel!", author: "Ana Lima", rating: 5 },
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
              {
                quote: "Simplesmente funciona. Sem configuracao extra.",
                author: "Carlos Mendes",
                rating: 5,
              },
            ]}
          />
        </ComponentPreview>
      </DocSection>

      <DocSection id="marquee" title="Marquee (padrao)">
        <ComponentPreview
          code={`<TestimonialsSection
  eyebrow="Depoimentos"
  title="Amado por desenvolvedores"
  description="Mais de 1.000 times ja usam WI.UI."
  layout="marquee"
  testimonials={[...]}
/>`}
        >
          <TestimonialsSection
            eyebrow="Depoimentos"
            title="Amado por desenvolvedores"
            description="Mais de 1.000 times ja usam WI.UI."
            layout="marquee"
            testimonials={TESTIMONIALS_BASE}
          />
        </ComponentPreview>
      </DocSection>

      <DocSection id="grid" title="Grid">
        <ComponentPreview
          code={`<TestimonialsSection
  title="O que dizem nossos clientes"
  layout="grid"
  columns={3}
  testimonials={[...]}
/>`}
        >
          <TestimonialsSection
            title="O que dizem nossos clientes"
            layout="grid"
            columns={3}
            testimonials={TESTIMONIALS_BASE.slice(0, 3)}
          />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
