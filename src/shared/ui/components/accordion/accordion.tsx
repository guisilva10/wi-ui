"use client";

import { useState, createContext, useContext } from "react";
import { cn } from "@/lib/cn";

interface AccordionContextValue {
  openItems: string[];
  toggle: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue>({
  openItems: [],
  toggle: () => {},
});

interface AccordionProps extends React.ComponentProps<"div"> {
  type?: "single" | "multiple";
  defaultValue?: string[];
  collapsible?: boolean;
}

function Accordion({
  type = "single",
  defaultValue = [],
  collapsible = true,
  className,
  children,
  ...props
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultValue);

  function toggle(value: string) {
    setOpenItems((prev) => {
      const isOpen = prev.includes(value);
      if (type === "single") {
        return isOpen && collapsible ? [] : [value];
      }
      return isOpen ? prev.filter((v) => v !== value) : [...prev, value];
    });
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div data-slot="accordion" className={className} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps extends React.ComponentProps<"div"> {
  value: string;
}

function AccordionItem({ value, className, ...props }: AccordionItemProps) {
  return (
    <div
      data-slot="accordion-item"
      data-value={value}
      className={cn("border-b", className)}
      {...props}
    />
  );
}

interface AccordionTriggerProps extends React.ComponentProps<"button"> {
  value: string;
}

function AccordionTrigger({
  value,
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  const { openItems, toggle } = useContext(AccordionContext);
  const isOpen = openItems.includes(value);

  return (
    <h3 className="flex">
      <button
        type="button"
        data-slot="accordion-trigger"
        data-state={isOpen ? "open" : "closed"}
        aria-expanded={isOpen}
        onClick={() => toggle(value)}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4 shrink-0 transition-transform duration-200"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </h3>
  );
}

interface AccordionContentProps extends React.ComponentProps<"div"> {
  value: string;
}

function AccordionContent({
  value,
  className,
  children,
  ...props
}: AccordionContentProps) {
  const { openItems } = useContext(AccordionContext);
  const isOpen = openItems.includes(value);

  return (
    <div
      data-slot="accordion-content"
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "overflow-hidden text-sm transition-all",
        isOpen ? "animate-accordion-down" : "hidden",
        className,
      )}
      {...props}
    >
      <div className="pt-0 pb-4">{children}</div>
    </div>
  );
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionProps,
  type AccordionItemProps,
};
