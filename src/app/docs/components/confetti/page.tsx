import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import { ConfettiDemo } from "./confetti-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Confetti" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "isActive",
    type: "boolean",
    description:
      "Controla se o confetti esta ativo. Mude para true para disparar (obrigatorio)",
    required: true,
  },
  {
    name: "duration",
    type: "number",
    default: "3000",
    description: "Duracao da animacao em milissegundos",
  },
  {
    name: "pieceCount",
    type: "number",
    default: "50",
    description: "Numero de pecas de confetti geradas",
  },
  {
    name: "colors",
    type: "string[]",
    default: "[ oklch pink, green, yellow, purple, cyan ]",
    description: "Array de cores CSS para as pecas do confetti",
  },
  {
    name: "onComplete",
    type: "() => void",
    description: "Callback chamado quando a animacao termina",
  },
  {
    name: "className",
    type: "string",
    description: "Classes CSS adicionais no container fixed",
  },
];

export default function ConfettiPage() {
  return (
    <DocPage
      title="Confetti"
      description="Animacao de confetti para celebracoes e momentos de conversao. Renderiza sobre toda a tela via position fixed. Respeita prefers-reduced-motion."
      breadcrumbs={BREADCRUMBS}
      badge="Animação"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="confetti" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <p className="text-muted-foreground text-sm">
          Controle a prop{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            isActive
          </code>{" "}
          via estado. Use{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            onComplete
          </code>{" "}
          para resetar o estado apos a animacao.
        </p>
        <ComponentPreview
          code={`"use client";

import { useState } from "react";
import { Confetti } from "@/components/confetti";

export function Example() {
  const [active, setActive] = useState(false);

  return (
    <>
      <Confetti isActive={active} onComplete={() => setActive(false)} />
      <button onClick={() => setActive(true)}>Celebrar</button>
    </>
  );
}`}
        >
          <ConfettiDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
