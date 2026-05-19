# @wi-ui/cli

CLI para adicionar componentes [WI.UI](https://wi-ui.vercel.app) ao seu projeto React/Next.js.

Componentes copy-paste com Tailwind CSS, TypeScript e CVA. Sem dependencia de runtime — os arquivos sao seus.

## Inicio rapido

```bash
npx @wi-ui/cli init
```

Detecta framework, cria `wi-ui.json`, instala dependencias e adiciona o Button como componente base.

## Comandos

### `init`

Inicializa WI.UI no projeto atual.

```bash
npx @wi-ui/cli init
npx @wi-ui/cli init --componentsDir src/app/_components
npx @wi-ui/cli init -y  # aceita defaults sem perguntar
```

### `add`

Adiciona componentes ao projeto.

```bash
npx @wi-ui/cli add button
npx @wi-ui/cli add card badge input
npx @wi-ui/cli add hero-section --overwrite
```

### `list`

Lista todos os componentes disponiveis.

```bash
npx @wi-ui/cli list
```

## Configuracao

Edite `wi-ui.json` para customizar os caminhos:

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

| Campo | Descricao | Padrao |
|-------|-----------|--------|
| `componentsDir` | Pasta destino dos componentes | `src/components/ui` |
| `libDir` | Pasta do utilitario `cn.ts` | `src/lib` |
| `framework` | Framework detectado | `nextjs` |
| `typescript` | Projeto usa TypeScript | `true` |
| `tailwind` | Projeto usa Tailwind | `true` |
| `registry` | URL do registry de componentes | `https://wi-ui.vercel.app/api/registry` |

## Componentes disponiveis

**28 componentes** em 4 categorias:

- **Base** (8): button, badge, card, input, textarea, separator, spinner, avatar
- **FOMO** (7): countdown-timer, social-proof, scarcity-badge, testimonial-carousel, pricing-card, urgency-banner, visitor-counter
- **Animacao** (7): fade-in, slide-in, scale-in, stagger-children, text-reveal, card-spotlight, canvas-reveal-effect
- **Blocos** (6): hero-section, features-grid, pricing-section, testimonials-section, cta-section, faq-section

## Requisitos

- Node.js >= 18
- Tailwind CSS
- TypeScript (recomendado)

## Links

- [Documentacao](https://wi-ui.vercel.app/docs)
- [Playground](https://wi-ui.vercel.app/playground)
- [GitHub](https://github.com/guisilva10/wi-ui)

## Licenca

MIT
