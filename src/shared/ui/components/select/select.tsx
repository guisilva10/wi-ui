"use client";

import { useState, useRef, useEffect, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";

interface Position {
  top: number;
  left: number;
  width: number;
}

interface SelectContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string;
  onValueChange: (value: string) => void;
  displayValue: string;
  setDisplayValue: (label: string) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  position: Position;
  updatePosition: () => void;
}

const SelectContext = createContext<SelectContextValue>({
  open: false,
  setOpen: () => {},
  value: "",
  onValueChange: () => {},
  displayValue: "",
  setDisplayValue: () => {},
  triggerRef: { current: null },
  position: { top: 0, left: 0, width: 0 },
  updatePosition: () => {},
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
  const [position, setPosition] = useState<Position>({
    top: 0,
    left: 0,
    width: 0,
  });
  const value = controlledValue ?? uncontrolledValue;
  const handleChange = onValueChange ?? setUncontrolledValue;
  const triggerRef = useRef<HTMLButtonElement>(null);

  function updatePosition() {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPosition({
      top: rect.bottom + 6 + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
  }

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        value,
        onValueChange: handleChange,
        displayValue,
        setDisplayValue,
        triggerRef,
        position,
        updatePosition,
      }}
    >
      <div data-slot="select" className="relative inline-block">
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
  ...props
}: SelectTriggerProps) {
  const { open, setOpen, displayValue, triggerRef, updatePosition } =
    useContext(SelectContext);

  return (
    <button
      ref={triggerRef}
      type="button"
      data-slot="select-trigger"
      aria-expanded={open}
      onClick={() => {
        if (!open) updatePosition();
        setOpen(!open);
      }}
      className={cn(
        "border-border bg-background text-foreground flex h-9 w-full items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm shadow-xs",
        "hover:bg-accent/50",
        "focus-visible:ring-ring/20 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:outline-1",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-colors duration-150",
        "[&>span]:line-clamp-1",
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
        className={cn(
          "text-muted-foreground/80 size-4 shrink-0 transition-transform duration-200",
          open && "rotate-180",
        )}
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
  const { open, setOpen, triggerRef, position } = useContext(SelectContext);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        contentRef.current &&
        !contentRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen, triggerRef]);

  if (!open) return null;

  return createPortal(
    <div
      ref={contentRef}
      data-slot="select-content"
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        minWidth: position.width,
      }}
      className={cn(
        "bg-popover text-popover-foreground border-border z-50 max-h-60 overflow-auto rounded-lg border p-1 shadow-lg backdrop-blur-xl",
        "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-150",
        className,
      )}
      {...props}
    >
      {children}
    </div>,
    document.body,
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
        "relative flex w-full cursor-pointer items-center rounded-md py-1.5 pr-2 pl-8 text-sm outline-none select-none",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:bg-accent focus-visible:text-accent-foreground",
        "data-[selected]:bg-accent/50 data-[selected]:font-medium",
        "transition-colors duration-100",
        className,
      )}
      {...props}
    >
      {isSelected && (
        <span className="absolute left-2 flex size-3.5 items-center justify-center">
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
