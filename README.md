# WI.UI

Biblioteca open-source de componentes React/Next.js no estilo copy-paste. Componentes de UI base, FOMO/conversao, animacoes e blocos de secao prontos para usar.

## Instalacao

```bash
npx @wi-ui/cli init
```

Isso cria um `wi-ui.json` no projeto, instala dependencias base e adiciona o componente Button automaticamente.

## Uso

### Adicionar componentes

```bash
npx @wi-ui/cli add card
npx @wi-ui/cli add badge input textarea
npx @wi-ui/cli add hero-section
```

### Listar componentes disponiveis

```bash
npx @wi-ui/cli list
```

## Configuracao

O `wi-ui.json` controla onde os componentes sao instalados:

```json
{
  "componentsDir": "src/components/ui",
  "libDir": "src/lib",
  "framework": "nextjs",
  "typescript": true,
  "tailwind": true,
  "registry": "https://wi-ui.vercel.app/api/registry"
}
```

Edite `componentsDir` para mudar o destino dos componentes. Exemplo:

```json
{
  "componentsDir": "src/app/_components"
}
```

## Componentes

### Base (8)

| Componente | Comando |
|------------|---------|
| Button | `wi-ui add button` |
| Badge | `wi-ui add badge` |
| Card | `wi-ui add card` |
| Input | `wi-ui add input` |
| Textarea | `wi-ui add textarea` |
| Separator | `wi-ui add separator` |
| Spinner | `wi-ui add spinner` |
| Avatar | `wi-ui add avatar` |

### FOMO / Conversao (7)

| Componente | Comando |
|------------|---------|
| Countdown Timer | `wi-ui add countdown-timer` |
| Social Proof | `wi-ui add social-proof` |
| Scarcity Badge | `wi-ui add scarcity-badge` |
| Testimonial Carousel | `wi-ui add testimonial-carousel` |
| Pricing Card | `wi-ui add pricing-card` |
| Urgency Banner | `wi-ui add urgency-banner` |
| Visitor Counter | `wi-ui add visitor-counter` |

### Animacao (7)

| Componente | Comando |
|------------|---------|
| Fade In | `wi-ui add fade-in` |
| Slide In | `wi-ui add slide-in` |
| Scale In | `wi-ui add scale-in` |
| Stagger Children | `wi-ui add stagger-children` |
| Text Reveal | `wi-ui add text-reveal` |
| Card Spotlight | `wi-ui add card-spotlight` |
| Canvas Reveal Effect | `wi-ui add canvas-reveal-effect` |

### Blocos de Secao (6)

| Componente | Comando |
|------------|---------|
| Hero Section | `wi-ui add hero-section` |
| Features Grid | `wi-ui add features-grid` |
| Pricing Section | `wi-ui add pricing-section` |
| Testimonials Section | `wi-ui add testimonials-section` |
| CTA Section | `wi-ui add cta-section` |
| FAQ Section | `wi-ui add faq-section` |

## Stack

- **Next.js 16** + React 19 + TypeScript
- **Tailwind CSS v4**
- **CVA** (Class Variance Authority)
- **motion** para animacoes
- **lucide-react** para icones

## Playground

Customize temas em tempo real: [wi-ui.vercel.app/playground](https://wi-ui.vercel.app/playground)

## Documentacao

Veja exemplos e props de cada componente: [wi-ui.vercel.app/docs](https://wi-ui.vercel.app/docs)

## Desenvolvimento

```bash
git clone https://github.com/guisilva10/wi-ui.git
cd wi-ui
pnpm install
pnpm dev
```

## Licenca

MIT
