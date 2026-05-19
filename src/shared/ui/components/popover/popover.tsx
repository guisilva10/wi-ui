"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  createContext,
  useContext,
  startTransition,
} from "react";
import { cn } from "@/lib/cn";
import { createPortal } from "react-dom";

interface PopoverContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext() {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error("Popover components must be used within <Popover>");
  return ctx;
}

function Popover({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = useCallback(
    (v: boolean) => {
      setUncontrolledOpen(v);
      onOpenChange?.(v);
    },
    [onOpenChange],
  );
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef }}>
      {children}
    </PopoverContext.Provider>
  );
}

function PopoverTrigger({
  className,
  children,
  asChild: _asChild,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { open, setOpen, triggerRef } = usePopoverContext();

  return (
    <button
      ref={triggerRef}
      data-slot="popover-trigger"
      type="button"
      aria-expanded={open}
      className={cn(className)}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
    </button>
  );
}

function PopoverContent({
  className,
  children,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "start" | "center" | "end";
  sideOffset?: number;
}) {
  const { open, setOpen, triggerRef } = usePopoverContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const top = rect.bottom + sideOffset + window.scrollY;
    let left: number;
    if (align === "start") {
      left = rect.left + window.scrollX;
    } else if (align === "end") {
      left = rect.right + window.scrollX;
    } else {
      left = rect.left + rect.width / 2 + window.scrollX;
    }
    setPosition({ top, left });
  }, [open, align, sideOffset, triggerRef]);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, setOpen, triggerRef]);

  if (!mounted || !open) return null;

  const transformOrigin =
    align === "start"
      ? "top left"
      : align === "end"
        ? "top right"
        : "top center";

  return createPortal(
    <div
      ref={contentRef}
      data-slot="popover-content"
      className={cn(
        "bg-background text-foreground border-border fixed z-50 w-72 rounded-lg border p-4 shadow-md outline-none",
        "animate-in fade-in-0 zoom-in-95",
        className,
      )}
      style={{
        top: position.top,
        left: position.left,
        transform:
          align === "center"
            ? "translateX(-50%)"
            : align === "end"
              ? "translateX(-100%)"
              : undefined,
        transformOrigin,
      }}
      {...props}
    >
      {children}
    </div>,
    document.body,
  );
}

export { Popover, PopoverTrigger, PopoverContent };
