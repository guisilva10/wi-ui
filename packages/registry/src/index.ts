export type RegistryEntry = {
  name: string;
  description: string;
  version: string;
  category: "base" | "fomo" | "animation" | "block";
  files: string[];
  dependencies?: string[];
  devDependencies?: string[];
};

export const registry: RegistryEntry[] = [
  {
    name: "separator",
    description:
      "Linha divisória horizontal ou vertical com suporte a orientação e role semântico.",
    version: "1.0.0",
    category: "base",
    files: ["src/shared/ui/components/separator/separator.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "spinner",
    description:
      "Indicador de loading animado com controle de tamanho via variants.",
    version: "1.0.0",
    category: "base",
    files: ["src/shared/ui/components/spinner/spinner.tsx"],
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
  {
    name: "badge",
    description:
      "Label inline para status, tags e contadores. Variants: default, secondary, destructive, outline, success, warning.",
    version: "1.0.0",
    category: "base",
    files: [
      "src/shared/ui/components/badge/badge.tsx",
      "src/shared/ui/components/badge/badge.variants.ts",
    ],
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
  {
    name: "button",
    description:
      "Botão com variants (default, secondary, outline, ghost, destructive, link), sizes e estado isLoading integrado.",
    version: "1.0.0",
    category: "base",
    files: [
      "src/shared/ui/components/button/button.tsx",
      "src/shared/ui/components/button/button.variants.ts",
    ],
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
  {
    name: "input",
    description:
      "Campo de texto com suporte a error state, disabled, e ícones de prefixo/sufixo.",
    version: "1.0.0",
    category: "base",
    files: ["src/shared/ui/components/input/input.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "textarea",
    description:
      "Campo de texto multilinha com error state, disabled e controle de resize.",
    version: "1.0.0",
    category: "base",
    files: ["src/shared/ui/components/textarea/textarea.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "avatar",
    description:
      "Exibe imagem do usuário com fallback automático de iniciais. Sizes: sm, md, lg, xl.",
    version: "1.0.0",
    category: "base",
    files: ["src/shared/ui/components/avatar/avatar.tsx"],
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
  {
    name: "card",
    description:
      "Container semântico com sub-componentes: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter.",
    version: "1.0.0",
    category: "base",
    files: ["src/shared/ui/components/card/card.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
];
