import { DocPage } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { Button } from "@/shared/ui/components/button";

export default function DocsPage() {
  return (
    <DocPage
      title="Começando"
      description="WI.UI é uma coleção de componentes React prontos para copiar e colar no seu projeto. Sem instalação de pacotes, sem configurações complexas."
    >
      {/* O que é */}
      <section className="space-y-3">
        <h2 className="text-foreground text-xl font-semibold">
          O que é WI.UI?
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          WI.UI é inspirado no modelo copy-paste do shadcn/ui. Cada componente é
          independente — você copia o código direto para o seu projeto e tem
          controle total. Sem black-box, sem dependências ocultas.
        </p>
        <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
          <li>TypeScript com tipagem completa</li>
          <li>
            Dark mode nativo via classe{" "}
            <code className="bg-muted rounded px-1 text-xs">.dark</code>
          </li>
          <li>Mobile-first e acessível</li>
          <li>Tailwind v4 + design tokens customizáveis</li>
        </ul>
      </section>

      {/* Instalação */}
      <section className="space-y-4">
        <h2 className="text-foreground text-xl font-semibold">Instalação</h2>
        <p className="text-muted-foreground text-sm">
          Instale as dependências necessárias no seu projeto:
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
          <code className="bg-muted rounded px-1 text-xs">cn()</code> ao seu
          projeto:
        </p>

        <ComponentPreview
          code={`import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
        >
          <div className="text-muted-foreground p-4 font-mono text-xs">
            <p>{"// src/lib/cn.ts"}</p>
            <p>{'import { clsx } from "clsx";'}</p>
            <p>{'import { twMerge } from "tailwind-merge";'}</p>
          </div>
        </ComponentPreview>
      </section>

      {/* Uso básico */}
      <section className="space-y-4">
        <h2 className="text-foreground text-xl font-semibold">Uso básico</h2>
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
      </section>
    </DocPage>
  );
}
