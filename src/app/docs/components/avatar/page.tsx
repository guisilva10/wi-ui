import { DocPage } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { Avatar } from "@/shared/ui/components/avatar";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Avatar" },
];

const PROPS = [
  {
    name: "src",
    type: "string",
    default: "—",
    description: "URL da imagem do avatar",
  },
  {
    name: "alt",
    type: "string",
    default: '""',
    description: "Texto alternativo da imagem",
  },
  {
    name: "fallback",
    type: "string",
    default: '""',
    description: "Nome para gerar iniciais quando não há imagem",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg" | "xl"',
    default: '"md"',
    description: "Tamanho do avatar",
  },
  {
    name: "className",
    type: "string",
    default: "—",
    description: "Classes CSS adicionais",
  },
];

export default function AvatarPage() {
  return (
    <DocPage
      title="Avatar"
      description="Componente de avatar com suporte a imagem, fallback com iniciais e múltiplos tamanhos."
      breadcrumbs={BREADCRUMBS}
    >
      {/* Tamanhos */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Tamanhos</h2>
        <ComponentPreview
          code={`<Avatar size="sm" fallback="João Silva" />
<Avatar size="md" fallback="Maria Oliveira" />
<Avatar size="lg" fallback="Pedro Costa" />
<Avatar size="xl" fallback="Ana Lima" />`}
        >
          <div className="flex items-end gap-4">
            <Avatar size="sm" fallback="João Silva" />
            <Avatar size="md" fallback="Maria Oliveira" />
            <Avatar size="lg" fallback="Pedro Costa" />
            <Avatar size="xl" fallback="Ana Lima" />
          </div>
        </ComponentPreview>
      </section>

      {/* Com imagem */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Com imagem</h2>
        <ComponentPreview
          code={`<Avatar src="https://i.pravatar.cc/80" alt="Usuário" size="lg" />`}
        >
          <Avatar src="https://i.pravatar.cc/80" alt="Usuário" size="lg" />
        </ComponentPreview>
      </section>

      {/* Fallback com iniciais */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">
          Fallback com iniciais
        </h2>
        <ComponentPreview
          code={`<Avatar fallback="Guilherme Silva" />
<Avatar fallback="WI UI" />
<Avatar fallback="Lorraine Dev" />`}
        >
          <div className="flex gap-3">
            <Avatar fallback="Guilherme Silva" />
            <Avatar fallback="WI UI" />
            <Avatar fallback="Lorraine Dev" />
          </div>
        </ComponentPreview>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-foreground text-lg font-semibold">Props</h2>
        <PropsTable props={PROPS} />
      </section>
    </DocPage>
  );
}
