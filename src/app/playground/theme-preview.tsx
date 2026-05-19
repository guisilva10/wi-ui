"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { PreviewCustom } from "./preview-custom";
import { PreviewCards } from "./preview-cards";
import { PreviewDashboard } from "./preview-dashboard";
import { PreviewMail } from "./preview-mail";
import { PreviewPalette } from "./preview-palette";

type Tab = "custom" | "cards" | "dashboard" | "mail" | "palette";

interface TabItem {
  id: Tab;
  label: string;
}

const TABS: TabItem[] = [
  { id: "custom", label: "Custom" },
  { id: "cards", label: "Cards" },
  { id: "dashboard", label: "Dashboard" },
  { id: "mail", label: "Mail" },
  { id: "palette", label: "Paleta" },
];

interface ThemePreviewProps {
  cssVariables: Record<string, string>;
  isDark: boolean;
  className?: string;
}

function ThemePreview({ cssVariables, isDark, className }: ThemePreviewProps) {
  const [activeTab, setActiveTab] = useState<Tab>("custom");

  return (
    <div
      className={cn(
        "border-border overflow-hidden rounded-xl border",
        isDark ? "dark" : "",
        className,
      )}
      style={cssVariables as React.CSSProperties}
    >
      <div className="bg-background text-foreground min-h-full">
        {/* Tab bar */}
        <div className="border-border bg-background sticky top-0 z-10 flex items-center gap-0.5 border-b px-4 py-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-[var(--primary)]/15 text-[var(--primary)]"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-4 lg:p-6">
          {activeTab === "custom" && <PreviewCustom />}
          {activeTab === "cards" && <PreviewCards />}
          {activeTab === "dashboard" && <PreviewDashboard />}
          {activeTab === "mail" && <PreviewMail />}
          {activeTab === "palette" && (
            <PreviewPalette cssVariables={cssVariables} />
          )}
        </div>
      </div>
    </div>
  );
}

export { ThemePreview };
