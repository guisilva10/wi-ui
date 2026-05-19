"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/cn";

interface TooltipProps {
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  delayDuration?: number;
  children: React.ReactNode;
  className?: string;
}

function Tooltip({
  content,
  side = "top",
  delayDuration = 200,
  children,
  className,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  function handleEnter() {
    timeoutRef.current = setTimeout(() => setVisible(true), delayDuration);
  }

  function handleLeave() {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  }

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      data-slot="tooltip"
      className="relative inline-flex"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={cn(
            "bg-foreground text-background absolute z-50 rounded-md px-3 py-1.5 text-xs whitespace-nowrap shadow-md",
            positionClasses[side],
            className,
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}

export { Tooltip, type TooltipProps };
