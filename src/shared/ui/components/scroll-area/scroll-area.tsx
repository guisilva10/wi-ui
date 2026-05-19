"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/cn";

interface ScrollAreaProps extends React.ComponentProps<"div"> {
  orientation?: "vertical" | "horizontal" | "both";
}

function ScrollArea({
  orientation = "vertical",
  className,
  children,
  ...props
}: ScrollAreaProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [thumbY, setThumbY] = useState(0);
  const [thumbH, setThumbH] = useState(0);
  const [thumbX, setThumbX] = useState(0);
  const [thumbW, setThumbW] = useState(0);
  const [showV, setShowV] = useState(false);
  const [showH, setShowH] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [dragging, setDragging] = useState(false);

  const update = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const hasV = el.scrollHeight > el.clientHeight;
    const hasH = el.scrollWidth > el.clientWidth;
    setShowV(hasV && (orientation === "vertical" || orientation === "both"));
    setShowH(hasH && (orientation === "horizontal" || orientation === "both"));
    if (hasV) {
      const ratio = el.clientHeight / el.scrollHeight;
      setThumbH(Math.max(ratio * 100, 10));
      setThumbY(
        (el.scrollTop / (el.scrollHeight - el.clientHeight)) *
          (100 - ratio * 100),
      );
    }
    if (hasH) {
      const ratio = el.clientWidth / el.scrollWidth;
      setThumbW(Math.max(ratio * 100, 10));
      setThumbX(
        (el.scrollLeft / (el.scrollWidth - el.clientWidth)) *
          (100 - ratio * 100),
      );
    }
  }, [orientation]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  const visible = hovering || dragging;

  return (
    <div
      data-slot="scroll-area"
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      {...props}
    >
      <div
        ref={viewportRef}
        className="h-full w-full scrollbar-none overflow-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        {children}
      </div>
      {showV && (
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-2 transition-opacity duration-200",
            visible ? "opacity-100" : "opacity-0",
          )}
        >
          <div
            className="bg-foreground/20 hover:bg-foreground/30 absolute right-0.5 w-1.5 rounded-full transition-colors"
            style={{
              top: `${thumbY}%`,
              height: `${thumbH}%`,
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              setDragging(true);
              const startY = e.clientY;
              const startScroll = viewportRef.current!.scrollTop;
              const maxScroll =
                viewportRef.current!.scrollHeight -
                viewportRef.current!.clientHeight;
              function onMove(ev: MouseEvent) {
                const delta = ev.clientY - startY;
                const scrollDelta =
                  (delta / viewportRef.current!.clientHeight) *
                  viewportRef.current!.scrollHeight;
                viewportRef.current!.scrollTop = Math.max(
                  0,
                  Math.min(maxScroll, startScroll + scrollDelta),
                );
              }
              function onUp() {
                setDragging(false);
                document.removeEventListener("mousemove", onMove);
                document.removeEventListener("mouseup", onUp);
              }
              document.addEventListener("mousemove", onMove);
              document.addEventListener("mouseup", onUp);
            }}
          />
        </div>
      )}
      {showH && (
        <div
          className={cn(
            "absolute bottom-0 left-0 h-2 w-full transition-opacity duration-200",
            visible ? "opacity-100" : "opacity-0",
          )}
        >
          <div
            className="bg-foreground/20 hover:bg-foreground/30 absolute bottom-0.5 h-1.5 rounded-full transition-colors"
            style={{
              left: `${thumbX}%`,
              width: `${thumbW}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}

export { ScrollArea, type ScrollAreaProps };
