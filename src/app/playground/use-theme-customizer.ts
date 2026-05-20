"use client";

import { useCallback, useEffect, useReducer } from "react";
import { DEFAULT_PRESET, type ThemePreset } from "./theme-presets";

export interface ThemeState {
  preset: string;
  mode: "light" | "dark";
  radius: number;
  primaryL: number;
  primaryC: number;
  primaryH: number;
}

type ThemeAction =
  | { type: "SET_PRESET"; preset: ThemePreset }
  | { type: "TOGGLE_MODE" }
  | { type: "SET_RADIUS"; value: number }
  | { type: "SET_PRIMARY_L"; value: number }
  | { type: "SET_PRIMARY_C"; value: number }
  | { type: "SET_PRIMARY_H"; value: number }
  | { type: "RESET" };

function createInitialState(mode: "light" | "dark"): ThemeState {
  const colors = mode === "dark" ? DEFAULT_PRESET.dark : DEFAULT_PRESET.light;
  return {
    preset: "default",
    mode,
    radius: 0.5,
    primaryL: colors.primaryL,
    primaryC: colors.primaryC,
    primaryH: colors.primaryH,
  };
}

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case "SET_PRESET":
      return {
        ...state,
        preset: action.preset.name,
        primaryL:
          state.mode === "light"
            ? action.preset.light.primaryL
            : action.preset.dark.primaryL,
        primaryC:
          state.mode === "light"
            ? action.preset.light.primaryC
            : action.preset.dark.primaryC,
        primaryH:
          state.mode === "light"
            ? action.preset.light.primaryH
            : action.preset.dark.primaryH,
      };
    case "TOGGLE_MODE":
      return { ...state, mode: state.mode === "light" ? "dark" : "light" };
    case "SET_RADIUS":
      return { ...state, radius: action.value };
    case "SET_PRIMARY_L":
      return { ...state, preset: "custom", primaryL: action.value };
    case "SET_PRIMARY_C":
      return { ...state, preset: "custom", primaryC: action.value };
    case "SET_PRIMARY_H":
      return { ...state, preset: "custom", primaryH: action.value };
    case "RESET":
      return createInitialState(state.mode);
    default:
      return state;
  }
}

function buildCssVariables(state: ThemeState): Record<string, string> {
  const isDark = state.mode === "dark";
  const primary = `oklch(${state.primaryL} ${state.primaryC} ${state.primaryH})`;
  const primaryForeground =
    state.primaryL > 0.6 ? "oklch(0.1 0 0)" : "oklch(0.985 0 0)";
  const ring = primary;

  if (isDark) {
    return {
      "--background": "oklch(0.145 0 0)",
      "--foreground": "oklch(0.985 0 0)",
      "--card": "oklch(0.205 0 0)",
      "--card-foreground": "oklch(0.985 0 0)",
      "--popover": "oklch(0.205 0 0)",
      "--popover-foreground": "oklch(0.985 0 0)",
      "--primary": primary,
      "--primary-foreground": primaryForeground,
      "--secondary": "oklch(0.269 0 0)",
      "--secondary-foreground": "oklch(0.985 0 0)",
      "--muted": "oklch(0.269 0 0)",
      "--muted-foreground": "oklch(0.708 0 0)",
      "--accent": "oklch(0.269 0 0)",
      "--accent-foreground": "oklch(0.985 0 0)",
      "--destructive": "oklch(0.396 0.141 25.723)",
      "--destructive-foreground": "oklch(0.985 0 0)",
      "--border": "oklch(0.269 0 0)",
      "--input": "oklch(0.269 0 0)",
      "--ring": ring,
      "--chart-1": primary,
      "--chart-2": "oklch(0.708 0 0)",
      "--chart-3": "oklch(0.556 0 0)",
      "--chart-4": "oklch(0.410 0 0)",
      "--chart-5": "oklch(0.396 0.141 25.723)",
      "--sidebar": "oklch(0.205 0 0)",
      "--sidebar-foreground": "oklch(0.985 0 0)",
      "--sidebar-primary": primary,
      "--sidebar-primary-foreground": primaryForeground,
      "--sidebar-accent": "oklch(0.269 0 0)",
      "--sidebar-accent-foreground": "oklch(0.985 0 0)",
      "--sidebar-border": "oklch(0.269 0 0)",
      "--sidebar-ring": ring,
      "--radius": `${state.radius}rem`,
    };
  }

  return {
    "--background": "oklch(1 0 0)",
    "--foreground": "oklch(0.145 0 0)",
    "--card": "oklch(0.985 0 0)",
    "--card-foreground": "oklch(0.145 0 0)",
    "--popover": "oklch(0.985 0 0)",
    "--popover-foreground": "oklch(0.145 0 0)",
    "--primary": primary,
    "--primary-foreground": primaryForeground,
    "--secondary": "oklch(0.961 0 0)",
    "--secondary-foreground": "oklch(0.205 0 0)",
    "--muted": "oklch(0.961 0 0)",
    "--muted-foreground": "oklch(0.556 0 0)",
    "--accent": "oklch(0.961 0 0)",
    "--accent-foreground": "oklch(0.205 0 0)",
    "--destructive": "oklch(0.577 0.245 27.325)",
    "--destructive-foreground": "oklch(0.985 0 0)",
    "--border": "oklch(0.922 0 0)",
    "--input": "oklch(0.922 0 0)",
    "--ring": ring,
    "--chart-1": primary,
    "--chart-2": "oklch(0.556 0 0)",
    "--chart-3": "oklch(0.708 0 0)",
    "--chart-4": "oklch(0.922 0 0)",
    "--chart-5": "oklch(0.577 0.245 27.325)",
    "--sidebar": "oklch(0.985 0 0)",
    "--sidebar-foreground": "oklch(0.145 0 0)",
    "--sidebar-primary": primary,
    "--sidebar-primary-foreground": primaryForeground,
    "--sidebar-accent": "oklch(0.961 0 0)",
    "--sidebar-accent-foreground": "oklch(0.205 0 0)",
    "--sidebar-border": "oklch(0.922 0 0)",
    "--sidebar-ring": ring,
    "--radius": `${state.radius}rem`,
  };
}

function buildExportCss(state: ThemeState): string {
  const lightVars = buildCssVariables({ ...state, mode: "light" });
  const darkVars = buildCssVariables({ ...state, mode: "dark" });

  const formatVars = (vars: Record<string, string>) =>
    Object.entries(vars)
      .map(([k, v]) => `  ${k}: ${v};`)
      .join("\n");

  const sharedExtras = `  --font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --shadow-2xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.25);
  --tracking-normal: 0em;
  --spacing: 0.25rem;`;

  return `@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

:root {
${formatVars(lightVars)}
${sharedExtras}
}

.dark {
${formatVars(darkVars)}
${sharedExtras}
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;
}

interface UseThemeCustomizerOptions {
  externalMode: "light" | "dark";
  onModeChange?: (mode: "light" | "dark") => void;
}

function useThemeCustomizer({
  externalMode,
  onModeChange,
}: UseThemeCustomizerOptions) {
  const [state, dispatch] = useReducer(
    themeReducer,
    externalMode,
    createInitialState,
  );

  useEffect(() => {
    if (externalMode !== state.mode) {
      dispatch({ type: "TOGGLE_MODE" });
    }
  }, [externalMode, state.mode]);

  const cssVariables = buildCssVariables(state);
  const exportCss = buildExportCss(state);

  const setPreset = useCallback(
    (preset: ThemePreset) => dispatch({ type: "SET_PRESET", preset }),
    [],
  );
  const toggleMode = useCallback(() => {
    dispatch({ type: "TOGGLE_MODE" });
    onModeChange?.(state.mode === "light" ? "dark" : "light");
  }, [onModeChange, state.mode]);
  const setRadius = useCallback(
    (value: number) => dispatch({ type: "SET_RADIUS", value }),
    [],
  );
  const setPrimaryL = useCallback(
    (value: number) => dispatch({ type: "SET_PRIMARY_L", value }),
    [],
  );
  const setPrimaryC = useCallback(
    (value: number) => dispatch({ type: "SET_PRIMARY_C", value }),
    [],
  );
  const setPrimaryH = useCallback(
    (value: number) => dispatch({ type: "SET_PRIMARY_H", value }),
    [],
  );
  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  return {
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
  };
}

export { useThemeCustomizer, buildCssVariables };
