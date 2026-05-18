import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { Button } from "@/shared/ui/components/button";

const TOC = [
  { id: "o-que-e", label: "O que e WI.UI?", level: 2 },
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso-basico", label: "Uso basico", level: 2 },
];

export default function DocsPage() {
  return (
    <DocPage
      title="Comecando"
      description="WI.UI e uma colecao de componentes React prontos para copiar e colar no seu projeto. Sem instalacao de pacotes, sem configuracoes complexas."
      toc={TOC}
    >
      {/* O que e */}
      <DocSection id="o-que-e" title="O que e WI.UI?">
        <p className="text-muted-foreground text-sm leading-relaxed">
          WI.UI e inspirado no modelo copy-paste do shadcn/ui. Cada componente e
          independente — voce copia o codigo direto para o seu projeto e tem
          controle total. Sem black-box, sem dependencias ocultas.
        </p>
        <ul className="text-muted-foreground list-inside list-disc space-y-1.5 text-sm">
          <li>TypeScript com tipagem completa</li>
          <li>
            Dark mode nativo via classe{" "}
            <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
              .dark
            </code>
          </li>
          <li>Mobile-first e acessivel</li>
          <li>Tailwind v4 + design tokens customizaveis</li>
        </ul>
      </DocSection>

      {/* Instalacao */}
      <DocSection id="instalacao" title="Instalacao">
        <p className="text-muted-foreground text-sm">
          Instale as dependencias necessarias no seu projeto:
        </p>

        <ComponentPreview
          code={`pnpm add clsx tailwind-merge class-variance-authority lucide-react`}
        >
          <div className="text-muted-foreground p-2 font-mono text-sm">
            pnpm add clsx tailwind-merge class-variance-authority lucide-react
          </div>
        </ComponentPreview>

        <p className="text-muted-foreground text-sm">
          Adicione o helper{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            cn()
          </code>{" "}
          ao seu projeto:
        </p>

        <ComponentPreview
          code={`import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
        >
          <div className="text-muted-foreground space-y-1 p-4 font-mono text-xs">
            <p>{"// src/lib/cn.ts"}</p>
            <p>{'import { clsx } from "clsx";'}</p>
            <p>{'import { twMerge } from "tailwind-merge";'}</p>
          </div>
        </ComponentPreview>
      </DocSection>

      {/* Uso basico */}
      <DocSection id="uso-basico" title="Uso basico">
        <p className="text-muted-foreground text-sm">
          Copie o componente para o seu projeto e importe onde precisar:
        </p>

        <ComponentPreview
          code={`import { Button } from "@/components/ui/button";

export function Example() {
  return (
    <div className="flex gap-2">
      <Button variant="default">Confirmar</Button>
      <Button variant="outline">Cancelar</Button>
    </div>
  );
}`}
        >
          <div className="flex gap-2">
            <Button variant="default">Confirmar</Button>
            <Button variant="outline">Cancelar</Button>
          </div>
        </ComponentPreview>
      </DocSection>
    </DocPage>
  );
}
