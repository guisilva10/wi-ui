"use client";

import { useState, useRef, useEffect, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";

interface Position {
  top: number;
  left: number;
  minWidth: number;
}

interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  position: Position;
  updatePosition: (align: "start" | "end") => void;
}

const DropdownContext = createContext<DropdownContextValue>({
  open: false,
  setOpen: () => {},
  triggerRef: { current: null },
  position: { top: 0, left: 0, minWidth: 0 },
  updatePosition: () => {},
});

function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position>({
    top: 0,
    left: 0,
    minWidth: 0,
  });
  const triggerRef = useRef<HTMLButtonElement>(null);

  function updatePosition(align: "start" | "end") {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPosition({
      top: rect.bottom + 6 + window.scrollY,
      left:
        align === "end"
          ? rect.right + window.scrollX
          : rect.left + window.scrollX,
      minWidth: rect.width,
    });
  }

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <DropdownContext.Provider
      value={{ open, setOpen, triggerRef, position, updatePosition }}
    >
      <div data-slot="dropdown-menu" className="relative inline-block">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

function DropdownMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  const { open, setOpen, triggerRef, updatePosition } =
    useContext(DropdownContext);
  return (
    <button
      ref={triggerRef}
      type="button"
      data-slot="dropdown-menu-trigger"
      aria-expanded={open}
      onClick={() => {
        if (!open) updatePosition("end");
        setOpen(!open);
      }}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}

function DropdownMenuContent({
  className,
  children,
  align = "end",
  ...props
}: React.ComponentProps<"div"> & { align?: "start" | "end" }) {
  const { open, setOpen, triggerRef, position } = useContext(DropdownContext);
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
      data-slot="dropdown-menu-content"
      style={{
        position: "absolute",
        top: position.top,
        ...(align === "end"
          ? { right: `calc(100vw - ${position.left}px)` }
          : { left: position.left }),
        minWidth: position.minWidth,
      }}
      className={cn(
        "bg-popover text-popover-foreground border-border z-50 min-w-[8rem] overflow-hidden rounded-lg border p-1 shadow-lg backdrop-blur-xl",
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

function DropdownMenuItem({
  className,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const { setOpen } = useContext(DropdownContext);
  return (
    <button
      type="button"
      data-slot="dropdown-menu-item"
      onClick={(e) => {
        onClick?.(e);
        setOpen(false);
      }}
      className={cn(
        "relative flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none select-none",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:bg-accent focus-visible:text-accent-foreground",
        "disabled:pointer-events-none disabled:opacity-50",
        "transition-colors duration-100",
        "[&_svg]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function DropdownMenuLabel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dropdown-menu-label"
      className={cn(
        "text-muted-foreground px-2 py-1.5 text-xs font-medium",
        className,
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
};
