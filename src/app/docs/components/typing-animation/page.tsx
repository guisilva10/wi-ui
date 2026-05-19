import { DocPage, DocSection } from "@/shared/ui/docs/doc-page";
import { ComponentPreview } from "@/shared/ui/docs/component-preview";
import { PropsTable } from "@/shared/ui/docs/props-table";
import { InstallSection } from "@/shared/ui/docs/install-section";
import {
  TypingAnimationDemo,
  TypingAnimationLoopDemo,
} from "./typing-animation-demo";

const BREADCRUMBS = [
  { label: "Docs", href: "/docs" },
  { label: "Componentes" },
  { label: "Typing Animation" },
];

const TOC = [
  { id: "instalacao", label: "Instalacao", level: 2 },
  { id: "uso", label: "Uso", level: 2 },
  { id: "loop", label: "Loop", level: 2 },
  { id: "props", label: "Props", level: 2 },
];

const PROPS = [
  {
    name: "text",
    type: "string",
    required: true,
    description: "Texto a ser digitado",
  },
  {
    name: "speed",
    type: "number",
    default: "50",
    description: "Velocidade de digitacao em milissegundos por caractere",
  },
  {
    name: "delay",
    type: "number",
    default: "0",
    description: "Atraso inicial em milissegundos antes de comecar a digitar",
  },
  {
    name: "cursor",
    type: "boolean",
    default: "true",
    description: "Exibe cursor piscante ao final do texto",
  },
  {
    name: "loop",
    type: "boolean",
    default: "false",
    description: "Reinicia a animacao continuamente apos concluir",
  },
  {
    name: "pauseDuration",
    type: "number",
    default: "1500",
    description: "Pausa em milissegundos no final do texto quando loop ativo",
  },
];

export default function TypingAnimationPage() {
  return (
    <DocPage
      title="Typing Animation"
      description="Efeito de maquina de escrever que digita o texto caractere por caractere. Suporta cursor piscante, loop continuo e delay inicial."
      breadcrumbs={BREADCRUMBS}
      badge="Animacao"
      toc={TOC}
    >
      <DocSection id="instalacao" title="Instalacao">
        <InstallSection componentName="typing-animation" />
      </DocSection>

      <DocSection id="uso" title="Uso">
        <ComponentPreview
          code={`import { TypingAnimation } from "@/components/typing-animation";

<h1 className="text-2xl font-bold">
  <TypingAnimation text="Construa interfaces incriveis." speed={60} cursor />
</h1>`}
        >
          <TypingAnimationDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="loop" title="Loop">
        <p className="text-muted-foreground text-sm">
          Use{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-xs">
            loop
          </code>{" "}
          para repetir a animacao continuamente.
        </p>
        <ComponentPreview
          code={`<TypingAnimation text="Loop infinito ativado!" speed={50} cursor loop pauseDuration={1000} />`}
        >
          <TypingAnimationLoopDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection id="props" title="Props">
        <PropsTable props={PROPS} />
      </DocSection>
    </DocPage>
  );
}
