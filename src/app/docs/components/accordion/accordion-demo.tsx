"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/shared/ui/components/accordion";

export function AccordionDemo() {
  return (
    <Accordion
      type="single"
      defaultValue={["item-1"]}
      className="w-full max-w-md"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger value="item-1">O que e WI.UI?</AccordionTrigger>
        <AccordionContent value="item-1">
          Biblioteca de componentes React copy-paste. Sem dependencias ocultas.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger value="item-2">Como instalar?</AccordionTrigger>
        <AccordionContent value="item-2">
          Use npx @wi-ui/cli add [componente] para adicionar ao seu projeto.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger value="item-3">Precisa de Radix?</AccordionTrigger>
        <AccordionContent value="item-3">
          Nao. Todos componentes sao implementados com HTML/CSS nativos.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
