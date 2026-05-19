"use client";

import { ScrollArea } from "@/shared/ui/components/scroll-area/scroll-area";

const TAGS = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);

export function ScrollAreaDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <ScrollArea className="h-64 w-56 rounded-xl border">
        <div className="space-y-2 p-4">
          {TAGS.map((tag) => (
            <div key={tag} className="bg-muted/40 rounded-md px-3 py-2 text-sm">
              {tag}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export function ScrollAreaHorizontalDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <ScrollArea orientation="horizontal" className="w-72 rounded-xl border">
        <div className="flex gap-3 p-4">
          {Array.from({ length: 15 }, (_, i) => (
            <div
              key={i}
              className="bg-muted/40 shrink-0 rounded-md px-4 py-2 text-sm whitespace-nowrap"
            >
              Item {i + 1}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
