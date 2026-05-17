# Arquitetura — WI.UI

## Principios

- **DDD Modular** — bounded contexts isolados
- **Hexagonal (Ports & Adapters)** — domain nao depende infra
- **Clean Architecture** — dependencias apontam pra dentro
- **Clean Code** — legibilidade, nomes expressivos, funcoes pequenas

## Stack Tecnica

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + Tailwind v4 |
| Auth | Better Auth |
| ORM | Prisma (PostgreSQL) |
| Data Fetching | TanStack Query v5 + Server Actions |
| Animacoes | motion (mini Framer Motion) |
| CLI | citty |
| Docs | Fumadocs (MDX) |
| Monorepo | Turborepo + pnpm workspaces |
| Releases | @changesets/cli |

## Estrutura de Pastas

```
wi-ui/
├── src/
│   ├── app/                    # Next.js App Router (UI layer)
│   │   ├── (auth)/             # Login, register
│   │   ├── (dashboard)/        # Area autenticada
│   │   ├── api/                # API Routes (registry, auth)
│   │   └── docs/               # Documentacao publica
│   ├── features/               # Bounded contexts
│   │   ├── auth/
│   │   │   ├── domain/         # Entities, value objects, interfaces
│   │   │   ├── application/    # Use cases, DTOs
│   │   │   ├── infrastructure/ # Repos, services externos
│   │   │   └── presentation/   # Components, hooks
│   │   ├── components/         # Gestao componentes da lib
│   │   ├── registry/           # API registry (serve pro CLI)
│   │   ├── themes/             # Sistema de temas
│   │   └── playground/         # Theme customizer
│   ├── shared/                 # Cross-cutting concerns
│   │   ├── domain/             # Base entities, value objects
│   │   ├── infrastructure/     # DB clients, configs
│   │   └── ui/                 # Shared components
│   └── lib/                    # Utilities, helpers
├── packages/
│   ├── cli/                    # @wi-ui/cli (citty)
│   └── registry/              # Source of truth dos componentes
├── prisma/                     # Schema + migrations
├── docs/                       # PRD, architecture, stories
└── public/
```

## Bounded Contexts (Features)

### auth
Autenticacao e autorizacao. Better Auth + sessions.
- Domain: User entity, Session VO, AuthRepository interface
- Application: LoginUseCase, RegisterUseCase, LogoutUseCase
- Infrastructure: BetterAuthAdapter, PrismaUserRepository
- Presentation: LoginForm, RegisterForm, AuthGuard

### components
Gestao dos componentes da biblioteca.
- Domain: Component entity, Category VO, ComponentRepository
- Application: ListComponentsUseCase, GetComponentUseCase
- Infrastructure: PrismaComponentRepository, FileSystemRegistry
- Presentation: ComponentCard, ComponentGrid, ComponentDetail

### registry
API que serve componentes pro CLI.
- Domain: RegistryEntry, Version VO
- Application: ResolveComponentUseCase, DiffComponentUseCase
- Infrastructure: FileSystemAdapter, GitAdapter
- Presentation: API Routes (/api/registry/*)

### themes
Sistema de temas customizaveis.
- Domain: Theme entity, ColorScheme VO, ThemeRepository
- Application: CreateThemeUseCase, ApplyThemeUseCase
- Infrastructure: PrismaThemeRepository, CSSVarsGenerator
- Presentation: ThemeSelector, ThemePreview

### playground
Theme customizer interativo.
- Domain: PlaygroundState, CustomizationOptions
- Application: GeneratePreviewUseCase, ExportThemeUseCase
- Presentation: PlaygroundEditor, LivePreview, CodeOutput

## Decisoes Arquiteturais

| Decisao | Alternativa | Motivo |
|---------|-------------|--------|
| Turborepo | Nx | Mais simples, padrao component libs |
| citty | commander | TS nativo, 5KB vs 50KB |
| Fumadocs | Contentlayer | Contentlayer morto, Fumadocs tem search + live preview |
| motion | Framer Motion full | 18KB vs 140KB, estrategia camadas |
| @theme CSS vars | tailwind.config | Tailwind v4 nativo, customiza sem config file |
| @wi-ui/* scoped | wi-ui | Profissional, sem conflito npm |
| Better Auth | NextAuth | Mais moderno, type-safe, plugin system |
| Classes (Use Cases) | Functions | Comportamento encapsulado, testabilidade, DI |

## Padroes

### Use Cases
```typescript
export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(input: LoginInput): Promise<LoginOutput> {
    // business logic
  }
}
```

### Repository Pattern
```typescript
// domain/repositories/user-repository.ts (port)
export interface UserRepository {
  findByEmail(email: string): Promise<User | null>
  save(user: User): Promise<void>
}

// infrastructure/repositories/prisma-user-repository.ts (adapter)
export class PrismaUserRepository implements UserRepository {
  // implementation
}
```

### Value Objects
```typescript
export class Email {
  private constructor(private readonly value: string) {}

  static create(raw: string): Email {
    if (!raw.includes('@')) throw new InvalidEmailError(raw)
    return new Email(raw.toLowerCase().trim())
  }

  toString(): string { return this.value }
}
```

## Fluxo Registry → CLI

```
[packages/registry/] → componentes source
       ↓
[src/app/api/registry/] → API Routes servem JSON
       ↓
[@wi-ui/cli] → fetch API → resolve deps → copia pro projeto usuario
```

## Seguranca

- Auth routes protegidas por middleware
- Rate limiting na registry API
- Input validation com Zod em todas boundaries
- CSRF protection via Better Auth
- Secrets em env vars, nunca hardcoded
