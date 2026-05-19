"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  items: FAQItem[];
  allowMultiple?: boolean;
}

function FAQSection({
  eyebrow,
  title,
  description,
  items,
  allowMultiple = false,
  className,
  ...props
}: FAQSectionProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  function toggle(index: number) {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!allowMultiple) next.clear();
        next.add(index);
      }
      return next;
    });
  }

  return (
    <section className={cn("w-full py-24", className)} {...props}>
      <div className="mx-auto w-full max-w-3xl px-6">
        <div className="mb-16 flex flex-col items-center text-center">
          {eyebrow && (
            <p className="text-muted-foreground mb-3 text-sm font-medium tracking-widest uppercase">
              {eyebrow}
            </p>
          )}
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="text-muted-foreground mt-4 max-w-xl text-lg">
              {description}
            </p>
          )}
        </div>

        <dl className="bg-muted/30 divide-border divide-y rounded-xl px-4">
          {items.map((item, i) => {
            const isOpen = openIndexes.has(i);
            return (
              <div key={i}>
                <dt>
                  <button
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    className={cn(
                      "-mx-4 flex w-[calc(100%+2rem)] items-center justify-between gap-4 rounded-lg px-4 py-5 text-left transition-colors duration-200",
                      "hover:bg-muted/30",
                    )}
                  >
                    <span
                      className={cn(
                        "text-foreground text-base transition-all duration-200",
                        isOpen ? "font-bold" : "font-semibold",
                      )}
                    >
                      {item.question}
                    </span>
                    <Plus
                      className={cn(
                        "text-muted-foreground size-5 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                        isOpen && "rotate-45",
                      )}
                      aria-hidden
                    />
                  </button>
                </dt>
                <dd
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  <p
                    className={cn(
                      "text-muted-foreground pb-5 text-sm leading-relaxed",
                      "border-foreground/30 -ml-4 border-l-2 pl-4",
                    )}
                  >
                    {item.answer}
                  </p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

export { FAQSection, type FAQSectionProps, type FAQItem };
