"use client";

import { useState } from "react";
import { PanelLeft, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/shared/ui/components/button";
import { useTheme } from "@/shared/ui/layout/theme-provider";
import { ThemePanel } from "./theme-panel";
import { ThemePreview } from "./theme-preview";
import { ThemeExport } from "./theme-export";
import { useThemeCustomizer } from "./use-theme-customizer";

export default function PlaygroundPage() {
  const { theme, toggleTheme } = useTheme();

  const {
    state,
    cssVariables,
    exportCss,
    setPreset,
    toggleMode,
    setRadius,
    setPrimaryL,
    setPrimaryC,
    setPrimaryH,
    reset,
  } = useThemeCustomizer({
    externalMode: theme,
    onModeChange: () => toggleTheme(),
  });

  const [showExport, setShowExport] = useState(false);
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);

  return (
    <>
      {/* Page */}
      <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
        {/* Sidebar — desktop */}
        <aside className="border-border hidden w-72 shrink-0 scrollbar-thin overflow-y-auto border-r lg:block">
          <div className="p-4">
            <ThemePanel
              state={state}
              isDark={theme === "dark"}
              onPreset={setPreset}
              onToggleMode={toggleMode}
              onSetRadius={setRadius}
              onSetPrimaryL={setPrimaryL}
              onSetPrimaryC={setPrimaryC}
              onSetPrimaryH={setPrimaryH}
              onReset={reset}
              onExport={() => setShowExport(true)}
            />
          </div>
        </aside>

        {/* Mobile panel — drawer */}
        {mobilePanelOpen && (
          <div
            className="fixed inset-0 z-40 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Painel de customização"
          >
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobilePanelOpen(false)}
              aria-hidden
            />
            <aside className="bg-background border-border absolute right-0 bottom-0 left-0 max-h-[85vh] scrollbar-thin overflow-y-auto rounded-t-2xl border-t shadow-2xl">
              <div className="border-border flex items-center justify-between border-b px-4 py-3">
                <span className="text-foreground text-sm font-semibold">
                  Customizar Tema
                </span>
                <button
                  onClick={() => setMobilePanelOpen(false)}
                  aria-label="Fechar painel"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                  )}
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>
              <div className="p-4">
                <ThemePanel
                  state={state}
                  isDark={theme === "dark"}
                  onPreset={setPreset}
                  onToggleMode={toggleMode}
                  onSetRadius={setRadius}
                  onSetPrimaryL={setPrimaryL}
                  onSetPrimaryC={setPrimaryC}
                  onSetPrimaryH={setPrimaryH}
                  onReset={reset}
                  onExport={() => {
                    setMobilePanelOpen(false);
                    setShowExport(true);
                  }}
                />
              </div>
            </aside>
          </div>
        )}

        {/* Preview area */}
        <main className="flex-1 scrollbar-thin overflow-y-auto">
          {/* Toolbar */}
          <div className="border-border bg-background/80 sticky top-0 z-10 flex items-center gap-3 border-b px-4 py-2.5 backdrop-blur-sm">
            {/* Mobile toggle */}
            <button
              onClick={() => setMobilePanelOpen(true)}
              aria-label="Abrir painel de customização"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "gap-1.5 lg:hidden",
              )}
            >
              <PanelLeft className="size-4" aria-hidden />
              Customizar
            </button>

            {/* Info */}
            <div className="hidden items-center gap-2 lg:flex">
              <span className="text-muted-foreground text-xs">
                Visualizando em modo
              </span>
              <span className="text-foreground text-xs font-medium capitalize">
                {state.mode}
              </span>
              {state.preset !== "custom" && (
                <>
                  <span className="text-muted-foreground text-xs">—</span>
                  <span className="text-foreground text-xs font-medium capitalize">
                    {state.preset}
                  </span>
                </>
              )}
            </div>

            <div className="ml-auto flex items-center gap-2">
              <span className="text-muted-foreground hidden text-xs sm:block">
                Pré-visualização isolada
              </span>
            </div>
          </div>

          {/* Preview content */}
          <div className="p-4 lg:p-6">
            <ThemePreview
              cssVariables={cssVariables}
              isDark={state.mode === "dark"}
            />
          </div>
        </main>
      </div>

      {/* Export modal */}
      {showExport && (
        <ThemeExport css={exportCss} onClose={() => setShowExport(false)} />
      )}
    </>
  );
}
