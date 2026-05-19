"use client";

import { Moon, Sun, RotateCcw } from "lucide-react";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/shared/ui/components/button/button.variants";
import { THEME_PRESETS } from "./theme-presets";
import type { ThemeState } from "./use-theme-customizer";
import type { ThemePreset } from "./theme-presets";

interface ThemePanelProps {
  state: ThemeState;
  onPreset: (preset: ThemePreset) => void;
  onToggleMode: () => void;
  onSetRadius: (value: number) => void;
  onSetPrimaryL: (value: number) => void;
  onSetPrimaryC: (value: number) => void;
  onSetPrimaryH: (value: number) => void;
  onReset: () => void;
  onExport: () => void;
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  displayValue,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  displayValue?: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-foreground text-xs font-medium">{label}</label>
        <span className="text-muted-foreground font-mono text-xs">
          {displayValue ?? value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="accent-primary w-full cursor-pointer"
        aria-label={label}
      />
    </div>
  );
}

function ThemePanel({
  state,
  onPreset,
  onToggleMode,
  onSetRadius,
  onSetPrimaryL,
  onSetPrimaryC,
  onSetPrimaryH,
  onReset,
  onExport,
}: ThemePanelProps) {
  const primaryOklch = `oklch(${state.primaryL.toFixed(3)} ${state.primaryC.toFixed(3)} ${state.primaryH.toFixed(1)})`;

  return (
    <div className="bg-card border-border flex flex-col gap-5 rounded-xl border p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-sm font-semibold">
          Theme Customizer
        </h2>
        <button
          onClick={onReset}
          aria-label="Resetar tema"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "gap-1.5 text-xs",
          )}
        >
          <RotateCcw className="size-3" aria-hidden />
          Reset
        </button>
      </div>

      {/* Presets */}
      <div className="space-y-2">
        <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
          Presets
        </p>
        <div className="grid grid-cols-3 gap-2">
          {THEME_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => onPreset(preset)}
              title={preset.description}
              aria-label={`Tema ${preset.label}`}
              aria-pressed={state.preset === preset.name}
              className={cn(
                "border-border flex flex-col items-center gap-1.5 rounded-lg border p-2 text-xs transition-all",
                state.preset === preset.name
                  ? "border-border bg-accent font-semibold"
                  : "border-border hover:bg-accent cursor-pointer",
              )}
            >
              <span
                className="size-5 rounded-full border border-black/10"
                style={{ backgroundColor: preset.swatchColor }}
                aria-hidden
              />
              <span className="text-foreground leading-none">
                {preset.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Mode toggle */}
      <div className="space-y-2">
        <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
          Modo
        </p>
        <div className="border-border flex overflow-hidden rounded-lg border">
          <button
            onClick={() => state.mode === "dark" && onToggleMode()}
            aria-pressed={state.mode === "light"}
            className={cn(
              "border-border flex flex-1 items-center justify-center gap-1.5 border py-1.5 text-xs transition-colors",
              state.mode === "light"
                ? "bg-foreground text-background font-medium"
                : "hover:bg-accent text-muted-foreground",
            )}
          >
            <Sun className="size-3" aria-hidden />
            Light
          </button>
          <button
            onClick={() => state.mode === "light" && onToggleMode()}
            aria-pressed={state.mode === "dark"}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 py-1.5 text-xs transition-colors",
              state.mode === "dark"
                ? "bg-foreground text-background font-medium"
                : "hover:bg-accent text-muted-foreground",
            )}
          >
            <Moon className="size-3" aria-hidden />
            Dark
          </button>
        </div>
      </div>

      {/* Radius */}
      <div className="space-y-2">
        <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
          Border Radius
        </p>
        <SliderField
          label="Radius"
          value={state.radius}
          min={0}
          max={1.5}
          step={0.05}
          onChange={onSetRadius}
          displayValue={`${state.radius}rem`}
        />
        {/* Visual preview dos radius */}
        <div className="flex items-end gap-2 pt-1">
          {[0, 0.25, 0.5, 1, 1.5].map((r) => (
            <button
              key={r}
              onClick={() => onSetRadius(r)}
              aria-label={`Radius ${r}rem`}
              className={cn(
                "border-border bg-muted h-7 flex-1 border text-xs transition-all",
                state.radius === r && "border-border ring-border ring-1",
              )}
              style={{ borderRadius: `${r}rem` }}
            />
          ))}
        </div>
      </div>

      {/* Primary color */}
      <div className="space-y-2">
        <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
          Cor Primária
        </p>

        {/* Swatch atual */}
        <div
          className="h-8 w-full rounded-md border border-black/10 transition-colors"
          style={{ backgroundColor: primaryOklch }}
          aria-label={`Cor atual: ${primaryOklch}`}
        />

        <SliderField
          label="Luminosidade (L)"
          value={state.primaryL}
          min={0.2}
          max={0.95}
          step={0.01}
          onChange={onSetPrimaryL}
          displayValue={state.primaryL.toFixed(2)}
        />
        <SliderField
          label="Saturação (C)"
          value={state.primaryC}
          min={0}
          max={0.35}
          step={0.005}
          onChange={onSetPrimaryC}
          displayValue={state.primaryC.toFixed(3)}
        />
        <SliderField
          label="Matiz (H)"
          value={state.primaryH}
          min={0}
          max={360}
          step={1}
          onChange={onSetPrimaryH}
          displayValue={`${Math.round(state.primaryH)}°`}
        />

        {/* Hue strip */}
        <div
          className="h-3 w-full cursor-pointer rounded-full"
          style={{
            background:
              "linear-gradient(to right, oklch(0.75 0.2 0), oklch(0.75 0.2 60), oklch(0.75 0.2 120), oklch(0.75 0.2 180), oklch(0.75 0.2 240), oklch(0.75 0.2 300), oklch(0.75 0.2 360))",
          }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const hue = Math.round((x / rect.width) * 360);
            onSetPrimaryH(Math.max(0, Math.min(360, hue)));
          }}
          aria-label="Selecionar matiz da cor primária"
          role="slider"
          aria-valuemin={0}
          aria-valuemax={360}
          aria-valuenow={Math.round(state.primaryH)}
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <button
          onClick={onExport}
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "w-full",
          )}
        >
          Exportar CSS
        </button>
      </div>
    </div>
  );
}

export { ThemePanel };
