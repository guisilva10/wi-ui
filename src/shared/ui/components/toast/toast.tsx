"use client";

import {
  useState,
  useEffect,
  useSyncExternalStore,
  startTransition,
} from "react";
import { cn } from "@/lib/cn";
import { createPortal } from "react-dom";

type ToastVariant = "default" | "success" | "error" | "warning";

interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

let toasts: Toast[] = [];
let listeners: (() => void)[] = [];

function emitChange() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot() {
  return toasts;
}

function getServerSnapshot() {
  return [] as Toast[];
}

let toastId = 0;

function toast(opts: Omit<Toast, "id"> | string) {
  const t: Toast =
    typeof opts === "string"
      ? { id: String(++toastId), description: opts }
      : { id: String(++toastId), ...opts };
  toasts = [...toasts, t];
  emitChange();
  return t.id;
}

toast.success = (msg: string) =>
  toast({ description: msg, variant: "success" });
toast.error = (msg: string) => toast({ description: msg, variant: "error" });
toast.warning = (msg: string) =>
  toast({ description: msg, variant: "warning" });

function dismissToast(id: string) {
  toasts = toasts.filter((t) => t.id !== id);
  emitChange();
}

const variantStyles: Record<ToastVariant, string> = {
  default: "border-border bg-background text-foreground",
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
  error: "border-red-500/30 bg-red-500/10 text-red-500",
  warning: "border-amber-500/30 bg-amber-500/10 text-amber-500",
};

function ToastItem({ t, onDismiss }: { t: Toast; onDismiss: () => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const dur = t.duration ?? 4000;
    const timeout = setTimeout(() => setExiting(true), dur);
    return () => clearTimeout(timeout);
  }, [t.duration]);

  useEffect(() => {
    if (exiting) {
      const timeout = setTimeout(onDismiss, 200);
      return () => clearTimeout(timeout);
    }
  }, [exiting, onDismiss]);

  return (
    <div
      data-slot="toast"
      className={cn(
        "pointer-events-auto relative flex w-full items-center gap-3 overflow-hidden rounded-lg border p-4 shadow-lg transition-all duration-200",
        variantStyles[t.variant ?? "default"],
        exiting ? "translate-x-full opacity-0" : "translate-x-0 opacity-100",
      )}
    >
      <div className="flex-1">
        {t.title && <p className="text-sm font-semibold">{t.title}</p>}
        {t.description && (
          <p className={cn("text-sm", t.title && "mt-1 opacity-90")}>
            {t.description}
          </p>
        )}
      </div>
      <button
        type="button"
        className="text-current opacity-50 transition-opacity hover:opacity-100"
        onClick={() => setExiting(true)}
      >
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
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
  );
}

function Toaster({ className }: { className?: string }) {
  const currentToasts = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    startTransition(() => setMounted(true));
  }, []);

  if (!mounted || currentToasts.length === 0) return null;

  return createPortal(
    <div
      data-slot="toaster"
      className={cn(
        "pointer-events-none fixed right-4 bottom-4 z-[100] flex max-h-screen w-full max-w-sm flex-col gap-2",
        className,
      )}
    >
      {currentToasts.map((t) => (
        <ToastItem key={t.id} t={t} onDismiss={() => dismissToast(t.id)} />
      ))}
    </div>,
    document.body,
  );
}

export { toast, Toaster, type Toast, type ToastVariant };
