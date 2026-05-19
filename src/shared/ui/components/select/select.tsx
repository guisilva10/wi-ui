"use client";

import { useState, useRef, useEffect, createContext, useContext } from "react";
import { cn } from "@/lib/cn";

interface SelectContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string;
  onValueChange: (value: string) => void;
  displayValue: string;
  setDisplayValue: (label: string) => void;
}

const SelectContext = createContext<SelectContextValue>({
  open: false,
  setOpen: () => {},
  value: "",
  onValueChange: () => {},
  displayValue: "",
  setDisplayValue: () => {},
});

interface SelectProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

function Select({
  defaultValue = "",
  value: controlledValue,
  onValueChange,
  children,
}: SelectProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState("");
  const value = controlledValue ?? uncontrolledValue;
  const handleChange = onValueChange ?? setUncontrolledValue;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        value,
        onValueChange: handleChange,
        displayValue,
        setDisplayValue,
      }}
    >
      <div ref={ref} data-slot="select" className="relative inline-block">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

interface SelectTriggerProps extends React.ComponentProps<"button"> {
  placeholder?: string;
}

function SelectTrigger({
  className,
  placeholder = "Selecione...",
  children,
  ...props
}: SelectTriggerProps) {
  const { open, setOpen, displayValue } = useContext(SelectContext);

  return (
    <button
      type="button"
      data-slot="select-trigger"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      className={cn(
        "border-input bg-background flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm",
        "placeholder:text-muted-foreground",
        "focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <span className={cn(!displayValue && "text-muted-foreground")}>
        {displayValue || placeholder}
      </span>
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
        className="size-4 opacity-50"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
}

function SelectContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { open } = useContext(SelectContext);
  if (!open) return null;

  return (
    <div
      data-slot="select-content"
      className={cn(
        "bg-popover text-popover-foreground absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border p-1 shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface SelectItemProps extends React.ComponentProps<"button"> {
  value: string;
}

function SelectItem({
  value: itemValue,
  className,
  children,
  ...props
}: SelectItemProps) {
  const { value, onValueChange, setOpen, setDisplayValue } =
    useContext(SelectContext);
  const isSelected = value === itemValue;

  return (
    <button
      type="button"
      data-slot="select-item"
      data-selected={isSelected || undefined}
      onClick={() => {
        onValueChange(itemValue);
        setDisplayValue(typeof children === "string" ? children : itemValue);
        setOpen(false);
      }}
      className={cn(
        "relative flex w-full cursor-pointer items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none",
        "hover:bg-accent hover:text-accent-foreground",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[selected]:font-medium",
        className,
      )}
      {...props}
    >
      {isSelected && (
        <span className="absolute left-2 flex items-center">
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
            className="size-4"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
      )}
      {children}
    </button>
  );
}

export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  type SelectProps,
  type SelectTriggerProps,
  type SelectItemProps,
};
