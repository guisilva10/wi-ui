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
  {
    name: "countdown-timer",
    description:
      "Timer regressivo com urgência visual. Muda automaticamente para vermelho/pulsante quando < 1h. Animação flip nos dígitos.",
    version: "1.0.0",
    category: "fomo",
    files: [
      "src/shared/ui/components/countdown-timer/countdown-timer.tsx",
      "src/shared/ui/components/countdown-timer/countdown-timer.variants.ts",
    ],
    dependencies: [
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "motion",
    ],
  },
  {
    name: "social-proof",
    description:
      'Notificação flutuante de prova social: "X acabou de comprar". Auto-rotaciona entre items. Variantes: full, compact, minimal.',
    version: "1.0.0",
    category: "fomo",
    files: ["src/shared/ui/components/social-proof/social-proof.tsx"],
    dependencies: ["clsx", "tailwind-merge", "motion"],
  },
  {
    name: "scarcity-badge",
    description:
      'Badge de escassez com barra de progresso. Muda automaticamente para "critical" quando < 20% disponível.',
    version: "1.0.0",
    category: "fomo",
    files: [
      "src/shared/ui/components/scarcity-badge/scarcity-badge.tsx",
      "src/shared/ui/components/scarcity-badge/scarcity-badge.variants.ts",
    ],
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
  {
    name: "testimonial-carousel",
    description:
      "Carrossel de depoimentos com auto-play, rating por estrelas e 3 variantes: card, bubble, minimal.",
    version: "1.0.0",
    category: "fomo",
    files: [
      "src/shared/ui/components/testimonial-carousel/testimonial-carousel.tsx",
    ],
    dependencies: ["clsx", "tailwind-merge", "motion", "lucide-react"],
  },
  {
    name: "pricing-card",
    description:
      "Card de preço com ancoragem (preço riscado + desconto calculado), badge destacado e lista de features com check/x.",
    version: "1.0.0",
    category: "fomo",
    files: ["src/shared/ui/components/pricing-card/pricing-card.tsx"],
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
  },
  {
    name: "urgency-banner",
    description:
      "Banner full-width com countdown inline e animação slide-down. Variantes: info, warning, critical. Dispensável.",
    version: "1.0.0",
    category: "fomo",
    files: [
      "src/shared/ui/components/urgency-banner/urgency-banner.tsx",
      "src/shared/ui/components/urgency-banner/urgency-banner.variants.ts",
    ],
    dependencies: [
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "motion",
      "lucide-react",
    ],
  },
  {
    name: "visitor-counter",
    description:
      'Indicador "X pessoas vendo agora" com dot pulsante. Modo simulateActivity oscila o contador para demos.',
    version: "1.0.0",
    category: "fomo",
    files: ["src/shared/ui/components/visitor-counter/visitor-counter.tsx"],
    dependencies: ["clsx", "tailwind-merge", "motion"],
  },
  {
    name: "fade-in",
    description:
      "Wrapper que anima a entrada de qualquer elemento com fade + direção (up, down, left, right, none). Usa IntersectionObserver. Respeita prefers-reduced-motion.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/fade-in/fade-in.tsx"],
    dependencies: ["clsx", "tailwind-merge", "motion"],
  },
  {
    name: "slide-in",
    description:
      "Slide entrance com direção customizável (left, right, top, bottom) e distância configurável. Combina translate + opacity. Respeita prefers-reduced-motion.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/slide-in/slide-in.tsx"],
    dependencies: ["clsx", "tailwind-merge", "motion"],
  },
  {
    name: "scale-in",
    description:
      "Scale entrance animation com spring physics. Ideal para cards, modals e popovers. initialScale configurável. Respeita prefers-reduced-motion.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/scale-in/scale-in.tsx"],
    dependencies: ["clsx", "tailwind-merge", "motion"],
  },
  {
    name: "stagger-children",
    description:
      "Container que anima children em sequência com delay incremental. Ideal para listas e grids. staggerDelay configurável. Respeita prefers-reduced-motion.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/stagger-children/stagger-children.tsx"],
    dependencies: ["clsx", "tailwind-merge", "motion"],
  },
  {
    name: "text-reveal",
    description:
      "Revela texto palavra por palavra ou caractere por caractere com stagger elegante. Ideal para headings e hero text. Respeita prefers-reduced-motion.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/text-reveal/text-reveal.tsx"],
    dependencies: ["clsx", "tailwind-merge", "motion"],
  },
  {
    name: "card-spotlight",
    description:
      "Card com efeito spotlight que segue o cursor do mouse. Revela partículas animadas via CanvasRevealEffect ao hover. Requer canvas-reveal-effect.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/card-spotlight.tsx"],
    dependencies: ["motion"],
  },
  {
    name: "canvas-reveal-effect",
    description:
      "Efeito canvas com dots animados que se revelam a partir do centro. Ideal como background de cards e seções interativas. Controle de velocidade, cores, tamanho e opacidades.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/canvas-reveal-effect.tsx"],
    dependencies: [],
  },
  {
    name: "hero-section",
    description:
      "Seção hero completa com badge, título com highlight, subtítulo e CTA buttons. Variantes de alinhamento centro ou esquerda.",
    version: "1.0.0",
    category: "block",
    files: ["src/shared/ui/components/hero-section/hero-section.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "features-grid",
    description:
      "Grid de features com ícone, título e descrição. Suporte a 2, 3 ou 4 colunas. Ideal para apresentar funcionalidades de um produto.",
    version: "1.0.0",
    category: "block",
    files: ["src/shared/ui/components/features-grid/features-grid.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "pricing-section",
    description:
      "Seção de pricing completa com múltiplos planos, ancoragem de preço, badge de destaque e lista de features com check/x.",
    version: "1.0.0",
    category: "block",
    files: ["src/shared/ui/components/pricing-section/pricing-section.tsx"],
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
  },
  {
    name: "testimonials-section",
    description:
      "Seção de depoimentos em grid com rating por estrelas, avatar com fallback de iniciais e informações do autor.",
    version: "1.0.0",
    category: "block",
    files: [
      "src/shared/ui/components/testimonials-section/testimonials-section.tsx",
    ],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "cta-section",
    description:
      "Seção call-to-action final com título, descrição e botões. Variantes: default, bordered e filled (fundo escuro).",
    version: "1.0.0",
    category: "block",
    files: ["src/shared/ui/components/cta-section/cta-section.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "faq-section",
    description:
      "Seção FAQ com accordion de perguntas e respostas. Suporte a múltiplos itens abertos simultaneamente. Animação de abertura/fechamento.",
    version: "1.0.0",
    category: "block",
    files: ["src/shared/ui/components/faq-section/faq-section.tsx"],
    dependencies: ["clsx", "tailwind-merge", "lucide-react"],
  },
];
