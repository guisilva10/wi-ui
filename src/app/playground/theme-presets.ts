export interface ThemeColors {
  primaryL: number;
  primaryC: number;
  primaryH: number;
  backgroundL: number;
  foregroundL: number;
  mutedL: number;
  accentL: number;
  destructiveL: number;
  destructiveC: number;
  destructiveH: number;
}

export interface ThemePreset {
  name: string;
  label: string;
  description: string;
  swatchColor: string;
  light: ThemeColors;
  dark: ThemeColors;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    name: "default",
    label: "Default",
    description: "Cyan/teal vibrante — identidade WI.UI",
    swatchColor: "oklch(0.8234 0.1927 206.47)",
    light: {
      primaryL: 0.8234,
      primaryC: 0.1927,
      primaryH: 206.47,
      backgroundL: 1,
      foregroundL: 0.145,
      mutedL: 0.961,
      accentL: 0.961,
      destructiveL: 0.577,
      destructiveC: 0.245,
      destructiveH: 27.325,
    },
    dark: {
      primaryL: 0.78,
      primaryC: 0.18,
      primaryH: 206.47,
      backgroundL: 0.145,
      foregroundL: 0.985,
      mutedL: 0.269,
      accentL: 0.269,
      destructiveL: 0.396,
      destructiveC: 0.141,
      destructiveH: 25.723,
    },
  },
  {
    name: "ocean",
    label: "Ocean",
    description: "Azul profundo — confiança e profissionalismo",
    swatchColor: "oklch(0.72 0.18 240)",
    light: {
      primaryL: 0.72,
      primaryC: 0.18,
      primaryH: 240,
      backgroundL: 1,
      foregroundL: 0.145,
      mutedL: 0.961,
      accentL: 0.961,
      destructiveL: 0.577,
      destructiveC: 0.245,
      destructiveH: 27.325,
    },
    dark: {
      primaryL: 0.7,
      primaryC: 0.17,
      primaryH: 240,
      backgroundL: 0.13,
      foregroundL: 0.985,
      mutedL: 0.25,
      accentL: 0.25,
      destructiveL: 0.396,
      destructiveC: 0.141,
      destructiveH: 25.723,
    },
  },
  {
    name: "forest",
    label: "Forest",
    description: "Verde esmeralda — crescimento e equilíbrio",
    swatchColor: "oklch(0.74 0.17 160)",
    light: {
      primaryL: 0.74,
      primaryC: 0.17,
      primaryH: 160,
      backgroundL: 1,
      foregroundL: 0.145,
      mutedL: 0.961,
      accentL: 0.961,
      destructiveL: 0.577,
      destructiveC: 0.245,
      destructiveH: 27.325,
    },
    dark: {
      primaryL: 0.72,
      primaryC: 0.16,
      primaryH: 160,
      backgroundL: 0.12,
      foregroundL: 0.985,
      mutedL: 0.24,
      accentL: 0.24,
      destructiveL: 0.396,
      destructiveC: 0.141,
      destructiveH: 25.723,
    },
  },
  {
    name: "sunset",
    label: "Sunset",
    description: "Laranja/âmbar — energia e urgência",
    swatchColor: "oklch(0.78 0.18 55)",
    light: {
      primaryL: 0.78,
      primaryC: 0.18,
      primaryH: 55,
      backgroundL: 1,
      foregroundL: 0.145,
      mutedL: 0.961,
      accentL: 0.961,
      destructiveL: 0.577,
      destructiveC: 0.245,
      destructiveH: 27.325,
    },
    dark: {
      primaryL: 0.75,
      primaryC: 0.17,
      primaryH: 55,
      backgroundL: 0.14,
      foregroundL: 0.985,
      mutedL: 0.265,
      accentL: 0.265,
      destructiveL: 0.396,
      destructiveC: 0.141,
      destructiveH: 25.723,
    },
  },
  {
    name: "midnight",
    label: "Midnight",
    description: "Roxo/violeta — criatividade e exclusividade",
    swatchColor: "oklch(0.72 0.2 290)",
    light: {
      primaryL: 0.72,
      primaryC: 0.2,
      primaryH: 290,
      backgroundL: 1,
      foregroundL: 0.145,
      mutedL: 0.961,
      accentL: 0.961,
      destructiveL: 0.577,
      destructiveC: 0.245,
      destructiveH: 27.325,
    },
    dark: {
      primaryL: 0.7,
      primaryC: 0.19,
      primaryH: 290,
      backgroundL: 0.1,
      foregroundL: 0.985,
      mutedL: 0.22,
      accentL: 0.22,
      destructiveL: 0.396,
      destructiveC: 0.141,
      destructiveH: 25.723,
    },
  },
  {
    name: "rose",
    label: "Rose",
    description: "Rosa/vermelho — emoção e elegância",
    swatchColor: "oklch(0.74 0.19 355)",
    light: {
      primaryL: 0.74,
      primaryC: 0.19,
      primaryH: 355,
      backgroundL: 1,
      foregroundL: 0.145,
      mutedL: 0.961,
      accentL: 0.961,
      destructiveL: 0.577,
      destructiveC: 0.245,
      destructiveH: 27.325,
    },
    dark: {
      primaryL: 0.72,
      primaryC: 0.18,
      primaryH: 355,
      backgroundL: 0.12,
      foregroundL: 0.985,
      mutedL: 0.24,
      accentL: 0.24,
      destructiveL: 0.396,
      destructiveC: 0.141,
      destructiveH: 25.723,
    },
  },
];

export const DEFAULT_PRESET = THEME_PRESETS[0];
