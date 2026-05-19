"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface ColorEntry {
  name: string;
  variable: string;
}

interface ColorGroup {
  id: string;
  label: string;
  colors: ColorEntry[];
}

const COLOR_GROUPS: ColorGroup[] = [
  {
    id: "primary",
    label: "PRIMÁRIA",
    colors: [
      { name: "Primary", variable: "--primary" },
      { name: "Primary Foreground", variable: "--primary-foreground" },
    ],
  },
  {
    id: "base",
    label: "BASE",
    colors: [
      { name: "Background", variable: "--background" },
      { name: "Foreground", variable: "--foreground" },
    ],
  },
  {
    id: "card",
    label: "CARD",
    colors: [
      { name: "Card", variable: "--card" },
      { name: "Card Foreground", variable: "--card-foreground" },
    ],
  },
  {
    id: "secondary",
    label: "SECUNDÁRIA",
    colors: [
      { name: "Secondary", variable: "--secondary" },
      { name: "Secondary Foreground", variable: "--secondary-foreground" },
    ],
  },
  {
    id: "muted",
    label: "MUTED",
    colors: [
      { name: "Muted", variable: "--muted" },
      { name: "Muted Foreground", variable: "--muted-foreground" },
    ],
  },
  {
    id: "accent",
    label: "ACCENT",
    colors: [
      { name: "Accent", variable: "--accent" },
      { name: "Accent Foreground", variable: "--accent-foreground" },
    ],
  },
  {
    id: "destructive",
    label: "DESTRUTIVA",
    colors: [
      { name: "Destructive", variable: "--destructive" },
      { name: "Destructive Foreground", variable: "--destructive-foreground" },
    ],
  },
  {
    id: "border",
    label: "BORDA & INPUT",
    colors: [
      { name: "Border", variable: "--border" },
      { name: "Input", variable: "--input" },
      { name: "Ring", variable: "--ring" },
    ],
  },
];

function ColorSwatch({ variable }: { variable: string }) {
  return (
    <div
      className="size-8 shrink-0 rounded-md border border-black/10 shadow-sm"
      style={{ backgroundColor: `var(${variable})` }}
      aria-hidden
    />
  );
}

function ColorRow({
  color,
  cssVariables,
}: {
  color: ColorEntry;
  cssVariables: Record<string, string>;
}) {
  const value = cssVariables[color.variable] ?? "—";

  return (
    <div className="flex items-center gap-3 py-2">
      <ColorSwatch variable={color.variable} />
      <div className="min-w-0 flex-1">
        <p className="text-foreground text-xs font-medium">{color.name}</p>
        <p className="text-muted-foreground font-mono text-[11px]">
          {color.variable}
        </p>
      </div>
      <span className="text-muted-foreground max-w-40 shrink-0 truncate font-mono text-[11px]">
        {value}
      </span>
    </div>
  );
}

function ColorGroupSection({
  group,
  cssVariables,
}: {
  group: ColorGroup;
  cssVariables: Record<string, string>;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-border overflow-hidden rounded-xl border">
      <button
        onClick={() => setOpen((o) => !o)}
        className="hover:bg-muted/50 flex w-full items-center justify-between px-4 py-3 transition-colors"
        aria-expanded={open}
      >
        <span className="text-muted-foreground text-[10px] font-semibold tracking-widest">
          {group.label}
        </span>
        {open ? (
          <ChevronDown className="text-muted-foreground size-4" />
        ) : (
          <ChevronRight className="text-muted-foreground size-4" />
        )}
      </button>

      {open && (
        <div className="border-border divide-border divide-y border-t px-4">
          {group.colors.map((color) => (
            <ColorRow
              key={color.variable}
              color={color}
              cssVariables={cssVariables}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PreviewPalette({
  cssVariables,
}: {
  cssVariables: Record<string, string>;
}) {
  return (
    <div className="space-y-3">
      <div className="mb-4">
        <h3 className="text-foreground text-sm font-semibold">
          Paleta de Cores
        </h3>
        <p className="text-muted-foreground mt-0.5 text-xs">
          Todas as variáveis CSS do tema atual. Alterne o preset ou ajuste os
          sliders para ver as mudanças.
        </p>
      </div>

      {/* Preview visual rápido */}
      <div className="border-border mb-4 overflow-hidden rounded-xl border p-4">
        <p className="text-muted-foreground mb-3 text-xs font-medium">
          Visão geral
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            "--background",
            "--foreground",
            "--card",
            "--primary",
            "--secondary",
            "--muted",
            "--accent",
            "--destructive",
            "--border",
            "--ring",
          ].map((v) => (
            <div key={v} className="flex flex-col items-center gap-1">
              <div
                className="size-10 rounded-lg border border-black/10 shadow-sm"
                style={{ backgroundColor: `var(${v})` }}
                title={`${v}: ${cssVariables[v] ?? "—"}`}
              />
              <span className="text-muted-foreground max-w-16 truncate text-center text-[9px]">
                {v.replace("--", "")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Grupos colapsáveis */}
      <div className="grid gap-3 sm:grid-cols-2">
        {COLOR_GROUPS.map((group) => (
          <ColorGroupSection
            key={group.id}
            group={group}
            cssVariables={cssVariables}
          />
        ))}
      </div>

      {/* Radius */}
      <div className="border-border overflow-hidden rounded-xl border">
        <div className="border-border flex items-center justify-between border-b px-4 py-3">
          <span className="text-muted-foreground text-[10px] font-semibold tracking-widest">
            BORDER RADIUS
          </span>
        </div>
        <div className="flex items-end gap-4 px-4 py-3">
          <div className="flex items-center gap-3 py-2">
            <div
              className="size-8 shrink-0 border border-black/10 bg-[var(--primary)]/20 shadow-sm"
              style={{ borderRadius: `var(--radius)` }}
            />
            <div>
              <p className="text-foreground text-xs font-medium">Radius</p>
              <p className="text-muted-foreground font-mono text-[11px]">
                --radius
              </p>
            </div>
            <span className="text-muted-foreground font-mono text-[11px]">
              {cssVariables["--radius"] ?? "0.5rem"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { PreviewPalette };
