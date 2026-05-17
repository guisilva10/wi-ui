# PRD — WI.UI

## Visao Geral

Biblioteca open-source de componentes React/Next.js no modelo copy-paste (como shadcn). CLI que copia componentes pro projeto do usuario. Unica lib que combina UI base + FOMO/conversao + animacoes + blocos de secoes.

## Problema

Nenhuma component library foca em conversao/FOMO. Devs que querem landing pages que convertem precisam montar tudo do zero. WI.UI entrega componentes bonitos + urgencia/escassez + playground de temas customizaveis.

## Publico-Alvo

- Devs React/Next.js que constroem landing pages, SaaS, e-commerce
- Indie hackers que precisam de conversao rapida
- Agencias que montam sites pra clientes

## Proposta de Valor

| WI.UI | shadcn | magic-ui | react-bits |
|-------|--------|----------|------------|
| FOMO/Conversao built-in | Nao | Nao | Nao |
| Theme playground | Nao | Nao | Nao |
| Blocos secoes | Parcial | Nao | Nao |
| Animacoes | Basico | Forte | Forte |
| CLI copy-paste | Sim | Sim | Manual |

## Funcionalidades

### Componentes (MVP ~20)

**Base (8):**
- Button, Input, Card, Badge, Dialog, Toast, Skeleton, Avatar

**FOMO/Conversao (7):**
- Countdown Timer, Social Proof Popup, Scarcity Badge, Testimonial Card, Pricing Card, Progress Bar, CTA Button

**Animacao (5):**
- Animated Text, Scroll Reveal, Magnetic Button, Gradient Border, Number Ticker

### CLI

- `npx wi-ui init` — configura projeto (tailwind, deps, paths)
- `npx wi-ui add <component>` — copia componente pro projeto
- `npx wi-ui diff <component>` — mostra diff com registry
- `npx wi-ui theme` — aplica/modifica tema

### Site/Docs

- Documentacao MDX com previews ao vivo
- Playground/Theme Customizer (estilo tweakcn)
- Blocos de secoes prontos (hero, pricing, testimonials, etc.)
- Registry API (serve componentes pro CLI)

### Autenticacao (Dashboard)

- Login/registro com Better Auth
- Dashboard usuario: favoritos, temas salvos, historico
- Area admin: analytics, componentes, usuarios

## Metricas de Sucesso

- Stars GitHub (target: 500 em 3 meses)
- Downloads npm semanal (target: 1k em 3 meses)
- Componentes no registry (target: 20 MVP, 50 v1)
- Usuarios registrados no site

## Fases

### Fase 1 — Foundation
Setup monorepo + CLI base + 5 componentes UI base

### Fase 2 — FOMO
+8 componentes FOMO/conversao + registry API

### Fase 3 — Animacao + Docs
+7 componentes animacao + site documentacao MDX

### Fase 4 — Playground
Theme customizer interativo

### Fase 5 — Blocos + Launch
Blocos de secoes prontos + polish + lancamento publico

## Stack

- Next.js 16 (App Router, Turbopack, React Compiler)
- React 19 + TypeScript
- Tailwind CSS v4 (CSS vars, @theme)
- Better Auth (autenticacao)
- Prisma (ORM, PostgreSQL)
- TanStack Query v5 (data fetching)
- motion (animacoes, 18KB)
- citty (CLI, 5KB)
- Fumadocs (docs MDX)
- @changesets/cli (releases)
- Turborepo + pnpm workspaces (monorepo futuro)

## Restricoes

- Componentes devem funcionar standalone (zero runtime deps alem React + Tailwind)
- CLI nao pode exigir autenticacao pra funcionar
- Site deve ser rapido (LCP < 2s)
- Acessibilidade WCAG 2.1 AA minimo
