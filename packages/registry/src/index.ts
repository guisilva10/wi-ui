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
    dependencies: ["clsx", "tailwind-merge", "motion"],
  },
  {
    name: "canvas-reveal-effect",
    description:
      "Efeito canvas com dots animados que se revelam a partir do centro. Ideal como background de cards e seções interativas. Controle de velocidade, cores, tamanho e opacidades.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/canvas-reveal-effect.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
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
  {
    name: "accordion",
    description:
      "Accordion com suporte a single/multiple aberto, collapsible, e animação grid-rows CSS. Sub-componentes: Accordion, AccordionItem, AccordionTrigger, AccordionContent.",
    version: "1.0.0",
    category: "base",
    files: ["src/shared/ui/components/accordion/accordion.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "alert",
    description:
      "Alerta com variantes info, success, warning, destructive. Sub-componentes: Alert, AlertTitle, AlertDescription.",
    version: "1.0.0",
    category: "base",
    files: ["src/shared/ui/components/alert/alert.tsx"],
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
  {
    name: "checkbox",
    description:
      "Checkbox estilizado com label opcional. Suporte a checked, disabled e indeterminate.",
    version: "1.0.0",
    category: "base",
    files: ["src/shared/ui/components/checkbox/checkbox.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "dialog",
    description:
      "Modal dialog com overlay, animação fade+zoom, escape to close e click outside. Sub-componentes: Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription.",
    version: "1.0.0",
    category: "base",
    files: ["src/shared/ui/components/dialog/dialog.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "dropdown-menu",
    description:
      "Menu dropdown portal-based com animação. Sub-componentes: DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel.",
    version: "1.0.0",
    category: "base",
    files: ["src/shared/ui/components/dropdown-menu/dropdown-menu.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "label",
    description: "Label acessível para form fields com suporte a htmlFor.",
    version: "1.0.0",
    category: "base",
    files: ["src/shared/ui/components/label/label.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "progress",
    description:
      "Barra de progresso com animação de transição suave. Valor de 0-100.",
    version: "1.0.0",
    category: "base",
    files: ["src/shared/ui/components/progress/progress.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "select",
    description:
      "Select portal-based com animação, busca e suporte a grupos. Sub-componentes: Select, SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectLabel.",
    version: "1.0.0",
    category: "base",
    files: ["src/shared/ui/components/select/select.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "sheet",
    description:
      "Painel lateral (drawer) com 4 posições: top, bottom, left, right. Overlay, escape to close, animação slide-in. Sub-componentes: Sheet, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription.",
    version: "1.0.0",
    category: "base",
    files: ["src/shared/ui/components/sheet/sheet.tsx"],
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
  {
    name: "switch",
    description:
      "Toggle switch com animação de transição. Suporte a checked, disabled e label.",
    version: "1.0.0",
    category: "base",
    files: ["src/shared/ui/components/switch/switch.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "table",
    description:
      "Tabela responsiva com container rounded e border. Sub-componentes: Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption.",
    version: "1.0.0",
    category: "base",
    files: ["src/shared/ui/components/table/table.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "tabs",
    description:
      "Tabs com animação de troca. Sub-componentes: Tabs, TabsList, TabsTrigger, TabsContent.",
    version: "1.0.0",
    category: "base",
    files: ["src/shared/ui/components/tabs/tabs.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "tooltip",
    description:
      "Tooltip com 4 posições (top, bottom, left, right), delay configurável e animação fade+zoom.",
    version: "1.0.0",
    category: "base",
    files: ["src/shared/ui/components/tooltip/tooltip.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "marquee",
    description:
      "Scroll infinito horizontal ou vertical com pause on hover, reverse e repeat configurável. Ideal para logos, testimonials e banners.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/marquee/marquee.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "number-ticker",
    description:
      "Animação de contagem numérica com spring physics. Suporte a casas decimais, direção up/down e delay. Usa IntersectionObserver.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/number-ticker/number-ticker.tsx"],
    dependencies: ["clsx", "tailwind-merge", "motion"],
  },
  {
    name: "confetti",
    description:
      "Efeito confetti com partículas animadas. Trigger via click ou programático. Cores, quantidade e duração configuráveis.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/confetti/confetti.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "arc-timeline",
    description:
      "Timeline circular/arco animada com items posicionados ao longo do arco. Ideal para roadmaps e históricos.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/arc-timeline/arc-timeline.tsx"],
    dependencies: ["clsx", "tailwind-merge", "motion"],
  },
  {
    name: "dot-grid",
    description:
      "Background canvas com grid de dots animados por wave. Responde a prefers-reduced-motion. Gap, radius, velocidade e centro da onda configuráveis.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/dot-grid/dot-grid.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "animated-wave",
    description:
      "Background canvas com ondas animadas. Cores, velocidade, amplitude e frequência configuráveis.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/animated-wave/animated-wave.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "animated-sphere",
    description:
      "Esfera 3D animada via WebGL (OGL). Cores, velocidade de rotação e wireframe configuráveis.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/animated-sphere/animated-sphere.tsx"],
    dependencies: ["ogl", "clsx", "tailwind-merge"],
  },
  {
    name: "grainient",
    description:
      "Background gradiente animado com grain via WebGL (OGL). Cores, velocidade, warp, contraste, saturação e zoom configuráveis.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/grainient/grainient.tsx"],
    dependencies: ["ogl", "clsx", "tailwind-merge"],
  },
  {
    name: "light-rays",
    description:
      "Raios de luz animados via WebGL (OGL). Origem configurável (8 posições), cor, velocidade, espalhamento, comprimento, fade, distorção e tracking de mouse com smoothing.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/light-rays/light-rays.tsx"],
    dependencies: ["ogl", "clsx", "tailwind-merge"],
  },
  {
    name: "dark-veil",
    description:
      "Background procedural via CPPN (Compositional Pattern Producing Network) em WebGL. Hue shift, scanlines, noise, domain warp e escala de resolução configuráveis.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/dark-veil/dark-veil.tsx"],
    dependencies: ["ogl", "clsx", "tailwind-merge"],
  },
  {
    name: "sparkle-button",
    description:
      "Botão com borda giratória animada e partículas cintilantes ao hover. Usa var(--primary) e var(--primary-foreground) do tema. Sem dependências externas.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/sparkle-button/sparkle-button.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "particles",
    description:
      "Partículas flutuantes canvas-based com linhas de conexão opcionais entre partículas próximas. Quantidade, velocidade, tamanho e cor configuráveis.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/particles/particles.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "ripple",
    description:
      "Círculos expansivos animados (ripple effect). Quantidade, cor e duração configuráveis. CSS-only.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/ripple/ripple.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "bento-grid",
    description:
      "Layout grid estilo bento com BentoGrid (columns) + BentoGridItem (colSpan/rowSpan). Hover effects e gap configuráveis.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/bento-grid/bento-grid.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "blur-fade",
    description:
      "Animação de entrada com blur + fade + translate Y. Usa motion/react e IntersectionObserver. Delay, duração e blur configuráveis.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/blur-fade/blur-fade.tsx"],
    dependencies: ["clsx", "tailwind-merge", "motion"],
  },
  {
    name: "typing-animation",
    description:
      "Efeito typewriter com suporte a loop (digita e apaga), cursor piscante, velocidade e delay configuráveis.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/typing-animation/typing-animation.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "border-beam",
    description:
      "Borda animada com feixe rotativo conic-gradient. Duração, cor e delay configuráveis.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/border-beam/border-beam.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "shine-border",
    description:
      "Borda com efeito shine rotativo. Suporta múltiplas cores, largura de borda e duração configuráveis.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/shine-border/shine-border.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "retro-grid",
    description:
      "Grid perspectiva retro animado com scroll infinito. Ângulo, tamanho de célula, opacidade e cor configuráveis.",
    version: "1.0.0",
    category: "animation",
    files: ["src/shared/ui/components/retro-grid/retro-grid.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "breadcrumb",
    description:
      "Navegação breadcrumb composável com Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator e BreadcrumbEllipsis.",
    version: "1.0.0",
    category: "base",
    files: ["src/shared/ui/components/breadcrumb/breadcrumb.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "popover",
    description:
      "Popover flutuante com posicionamento automático, portal rendering e close on outside click/escape. Suporta controlled e uncontrolled.",
    version: "1.0.0",
    category: "base",
    files: ["src/shared/ui/components/popover/popover.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "toast",
    description:
      "Sistema de notificações toast com variantes (default, success, error, warning). API imperativa via toast() function + Toaster component.",
    version: "1.0.0",
    category: "base",
    files: ["src/shared/ui/components/toast/toast.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "skeleton",
    description:
      "Placeholder loading com animação pulse. Simples e composável para criar layouts skeleton.",
    version: "1.0.0",
    category: "base",
    files: ["src/shared/ui/components/skeleton/skeleton.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "scroll-area",
    description:
      "Área de scroll customizada com scrollbar estilizada que aparece no hover. Suporta orientação vertical, horizontal ou ambas.",
    version: "1.0.0",
    category: "base",
    files: ["src/shared/ui/components/scroll-area/scroll-area.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
  {
    name: "command",
    description:
      "Command palette composável com busca, grupos, items, shortcuts e dialog modal (Ctrl+K). Inclui Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandDialog.",
    version: "1.0.0",
    category: "base",
    files: ["src/shared/ui/components/command/command.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
  },
];
