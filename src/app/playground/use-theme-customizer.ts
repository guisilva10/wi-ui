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
      "--background": `oklch(0.145 0 0)`,
      "--foreground": "oklch(0.985 0 0)",
      "--card": "oklch(0.205 0 0)",
      "--card-foreground": "oklch(0.985 0 0)",
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
      "--radius": `${state.radius}rem`,
    };
  }

  return {
    "--background": "oklch(1 0 0)",
    "--foreground": "oklch(0.145 0 0)",
    "--card": "oklch(1 0 0)",
    "--card-foreground": "oklch(0.145 0 0)",
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

  return `:root {\n${formatVars(lightVars)}\n}\n\n.dark {\n${formatVars(darkVars)}\n}`;
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
