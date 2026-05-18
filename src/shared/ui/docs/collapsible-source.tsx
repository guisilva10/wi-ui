"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/cn";
import { SourceTabs, type SourceFile } from "./source-tabs";

interface CollapsibleSourceProps {
  files: SourceFile[];
  className?: string;
}

function CollapsibleSource({ files, className }: CollapsibleSourceProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("space-y-2", className)}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-sm font-medium transition-colors"
      >
        {open ? (
          <ChevronUp className="size-4" />
        ) : (
          <ChevronDown className="size-4" />
        )}
        {open ? "Ocultar codigo fonte" : "Ver codigo fonte"}
      </button>

      {open && <SourceTabs files={files} />}
    </div>
  );
}

export { CollapsibleSource, type CollapsibleSourceProps };
