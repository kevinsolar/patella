# Patella Landing Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static one-page Next.js + Tailwind landing page for Patella using the approved Webflow-corporate design.

**Architecture:** Manually scaffold a Next.js App Router project in the current non-empty workspace, then implement content, UI primitives, and page sections as focused TypeScript modules. The page stays static, uses typed content arrays, and sends contact CTAs to public WhatsApp/email links.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS v4 via `@tailwindcss/postcss`, Vitest, Testing Library, lucide-react, shadcn-style local `ButtonLink` and `Card` primitives.

---

## References

- Design spec: `docs/superpowers/specs/2026-04-30-patella-landing-redesign-design.md`
- Source design tokens: `DESIGN.md`
- Next.js App Router docs: https://nextjs.org/docs/app
- Next.js `create-next-app` docs, used only as reference because the workspace is non-empty: https://nextjs.org/docs/app/api-reference/cli/create-next-app
- Tailwind CSS Next.js install docs: https://tailwindcss.com/docs/guides/nextjs
- shadcn/ui Next.js docs: https://ui.shadcn.com/docs/installation/next

## File Structure

- Create `package.json`: scripts and dependencies.
- Create `tsconfig.json`: TypeScript and `@/*` alias.
- Create `next.config.ts`: Next config.
- Create `postcss.config.mjs`: Tailwind v4 PostCSS plugin.
- Create `eslint.config.mjs`: ESLint with Next presets.
- Create `vitest.config.ts`: Vitest aliases and jsdom setup.
- Create `src/test/setup.ts`: Testing Library matchers.
- Create `src/app/layout.tsx`: global metadata and shell.
- Create `src/app/page.tsx`: route entry that renders `HomePage`.
- Create `src/app/globals.css`: Tailwind import, design variables, base styles, reusable classes.
- Create `src/content/site-content.ts`: all reusable page content and public contact links.
- Create `src/content/site-content.test.ts`: content contract tests.
- Create `src/lib/utils.ts`: className merge helper.
- Create `src/components/ui/button-link.tsx`: shadcn-style CTA link primitive.
- Create `src/components/ui/card.tsx`: shadcn-style card primitive.
- Create `src/components/ui/ui-primitives.test.tsx`: UI primitive tests.
- Create `src/components/home/site-header.tsx`: responsive navbar.
- Create `src/components/home/hero-section.tsx`: hero and dashboard visual.
- Create `src/components/home/home-page.tsx`: remaining landing sections and page composition.
- Create `src/components/home/home-page.test.tsx`: page behavior/content tests.
- Create `.gitignore`: ignore Next, dependencies, and companion artifacts.

## Task 1: Tooling And Empty App Shell

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`
- Create: `src/components/home/home-page.tsx`
- Create: `.gitignore`

- [ ] **Step 1: Create package metadata and scripts**

Create `package.json`:

```json
{
  "name": "patella-landing",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "test": "vitest"
  },
  "dependencies": {
    "class-variance-authority": "latest",
    "clsx": "latest",
    "lucide-react": "latest",
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "tailwind-merge": "latest"
  },
  "devDependencies": {
    "@eslint/eslintrc": "latest",
    "@tailwindcss/postcss": "latest",
    "@testing-library/jest-dom": "latest",
    "@testing-library/react": "latest",
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "eslint": "latest",
    "eslint-config-next": "latest",
    "jsdom": "latest",
    "postcss": "latest",
    "tailwindcss": "latest",
    "typescript": "latest",
    "vitest": "latest"
  }
}
```

- [ ] **Step 2: Create TypeScript, Next, Tailwind, ESLint, and Vitest config**

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Create `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

Create `postcss.config.mjs`:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

Create `eslint.config.mjs`:

```js
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
```

Create `vitest.config.ts`:

```ts
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
  },
});
```

Create `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 3: Create empty app shell**

Create `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Patella Marketing Ads Intelligence",
  description:
    "Consultoria em marketing ads intelligence, Google Ads, metricas e crescimento mensuravel.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
```

Create `src/components/home/home-page.tsx`:

```tsx
export function HomePage() {
  return null;
}
```

Create `src/app/page.tsx`:

```tsx
import { HomePage } from "@/components/home/home-page";

export default function Page() {
  return <HomePage />;
}
```

Create `src/app/globals.css`:

```css
@import "tailwindcss";

:root {
  --patella-black: #080808;
  --patella-blue: #146ef5;
  --patella-blue-hover: #0055d4;
  --patella-purple: #7a3dff;
  --patella-pink: #ed52cb;
  --patella-green: #00d722;
  --patella-orange: #ff6b00;
  --patella-yellow: #ffae13;
  --patella-red: #ee1d36;
  --patella-gray-800: #222222;
  --patella-gray-700: #363636;
  --patella-gray-300: #ababab;
  --patella-mid-gray: #5a5a5a;
  --patella-border: #d8d8d8;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: #ffffff;
  color: var(--patella-black);
  font-family: Arial, Helvetica, sans-serif;
}

.shadow-cascade {
  box-shadow:
    rgba(0, 0, 0, 0) 0 84px 24px,
    rgba(0, 0, 0, 0.01) 0 54px 22px,
    rgba(0, 0, 0, 0.04) 0 30px 18px,
    rgba(0, 0, 0, 0.08) 0 13px 13px,
    rgba(0, 0, 0, 0.09) 0 3px 7px;
}

.section-shell {
  margin-inline: auto;
  width: min(1120px, calc(100% - 32px));
}

.uppercase-label {
  color: var(--patella-blue);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  line-height: 1.3;
  text-transform: uppercase;
}

.link-shift {
  transition:
    color 160ms ease,
    transform 160ms ease,
    background-color 160ms ease,
    border-color 160ms ease;
}

.link-shift:hover {
  transform: translateX(6px);
}
```

Create `.gitignore`:

```gitignore
.next/
node_modules/
out/
dist/
coverage/
.env*
!.env.example
.superpowers/
```

- [ ] **Step 4: Install dependencies**

Run:

```powershell
npm install
```

Expected: `package-lock.json` is created and install exits with code 0.

- [ ] **Step 5: Verify empty app shell builds**

Run:

```powershell
npm run lint
npm run build
```

Expected:

```text
lint and build exit with code 0
```

Do not run Vitest yet because no test files exist until Task 2.

- [ ] **Step 6: Commit scaffold checkpoint**

Run:

```powershell
git init
git add package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs eslint.config.mjs vitest.config.ts src .gitignore
git commit -m "chore: scaffold next landing app"
```

Expected: first commit is created.

## Task 2: Content Contract

**Files:**
- Create: `src/content/site-content.test.ts`
- Create: `src/content/site-content.ts`

- [ ] **Step 1: Write failing content test**

Create `src/content/site-content.test.ts`:

```ts
import {
  contact,
  expertise,
  hero,
  navItems,
  services,
  stats,
} from "./site-content";

describe("site content", () => {
  it("keeps the approved Patella positioning and proof points", () => {
    expect(hero.headline).toBe(
      "Marketing Ads Intelligence para crescimento mensuravel",
    );
    expect(hero.kicker).toContain("Google Partner");
    expect(stats.map((stat) => stat.value)).toEqual(["14+", "19+", "2005"]);
  });

  it("exposes one-page anchor navigation", () => {
    expect(navItems).toEqual([
      { label: "Home", href: "#home" },
      { label: "Quem Somos", href: "#quem-somos" },
      { label: "Servicos", href: "#servicos" },
      { label: "Expertises", href: "#expertises" },
      { label: "Clientes", href: "#clientes" },
      { label: "Contato", href: "#contato" },
    ]);
  });

  it("keeps public contact channels from the source site", () => {
    expect(contact.phone).toBe("(11) 97496-2232");
    expect(contact.email).toBe("contato@patella.com.br");
    expect(contact.whatsappHref).toBe(
      "https://api.whatsapp.com/send?phone=5511974962232",
    );
    expect(contact.address).toContain("Mogi das Cruzes");
  });

  it("defines services and expertise used by the landing page", () => {
    expect(services.map((service) => service.title)).toEqual([
      "Google",
      "Gestao",
      "Social Media",
    ]);
    expect(expertise).toContain("Inteligencia em Metricas");
    expect(expertise).toContain("Franquias");
  });
});
```

- [ ] **Step 2: Run content test to verify it fails**

Run:

```powershell
npm run test -- --run src/content/site-content.test.ts
```

Expected: FAIL with an import error for `./site-content`.

- [ ] **Step 3: Implement content module**

Create `src/content/site-content.ts`:

```ts
export const navItems = [
  { label: "Home", href: "#home" },
  { label: "Quem Somos", href: "#quem-somos" },
  { label: "Servicos", href: "#servicos" },
  { label: "Expertises", href: "#expertises" },
  { label: "Clientes", href: "#clientes" },
  { label: "Contato", href: "#contato" },
] as const;

export const hero = {
  kicker: "Google Partner ha mais de 14 anos",
  headline: "Marketing Ads Intelligence para crescimento mensuravel",
  body:
    "Consultoria estrategica em campanhas, metricas e aceleracao comercial para empresas, agencias de marketing digital e franquias.",
  primaryCta: "Falar com especialista",
  secondaryCta: "Ver servicos",
};

export const stats = [
  {
    value: "14+",
    label: "anos como Google Partner",
  },
  {
    value: "19+",
    label: "anos de experiencia online",
  },
  {
    value: "2005",
    label: "inicio da jornada digital",
  },
] as const;

export const pillars = [
  "Comprometimento com metas",
  "Transparencia de resultados",
  "Crescimento exponencial",
] as const;

export const credibilityItems = [
  {
    title: "Consultoria estrategica",
    description: "Diagnostico e plano de crescimento com foco comercial.",
  },
  {
    title: "Google Ads",
    description: "Campanhas, otimizacao e leitura de metricas.",
  },
  {
    title: "Gestao e metas",
    description: "Rotina de performance orientada por indicadores.",
  },
  {
    title: "Social Media",
    description: "Presenca digital conectada ao posicionamento da marca.",
  },
] as const;

export const about = {
  label: "Quem somos",
  title: "Agencia e consultoria especializada em campanhas de marketing",
  body:
    "Com mais de 19 anos de experiencia no mercado online, a Patella une especialistas em ferramentas Google, Digital Ads e aceleracao de franquias para transformar planejamento em resultados mensuraveis.",
};

export const consultingProgram = {
  label: "Consulting program",
  title: "Tanto digital quanto analogico",
  body:
    "A partir de um estudo avancado de cenarios de mercado, identificamos oportunidades com numeros reais e estruturamos planos de divulgacao online e offline para posicionar marcas, produtos e servicos.",
  steps: [
    "Diagnostico de mercado",
    "Plano estrategico",
    "Campanhas e canais",
    "Metricas e otimizacao",
  ],
};

export const services = [
  {
    title: "Google",
    description:
      "Planejamento, gestao e otimizacao de campanhas para capturar demanda com clareza de investimento e retorno.",
  },
  {
    title: "Gestao",
    description:
      "Acompanhamento de metas, leitura de indicadores e priorizacao de acoes para melhorar performance comercial.",
  },
  {
    title: "Social Media",
    description:
      "Conteudo e presenca digital conectados a campanhas, posicionamento e relacionamento com o publico.",
  },
] as const;

export const expertise = [
  "Google Ads",
  "Digital Ads",
  "Planejamento",
  "Inteligencia em Metricas",
  "Ecommerce",
  "Franquias",
  "Performance",
  "Social Media",
] as const;

export const clients = [
  "Empresas",
  "Agencias",
  "Franquias",
  "Operacoes comerciais",
] as const;

export const contact = {
  address:
    "R. Vitorio Partenio, 142 - Sala 01, Vila Oliveira, Mogi das Cruzes - SP, 08780-410",
  phone: "(11) 97496-2232",
  email: "contato@patella.com.br",
  whatsappHref: "https://api.whatsapp.com/send?phone=5511974962232",
  mailHref: "mailto:contato@patella.com.br",
};
```

- [ ] **Step 4: Run content test to verify it passes**

Run:

```powershell
npm run test -- --run src/content/site-content.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit content checkpoint**

Run:

```powershell
git add src/content
git commit -m "feat: add patella content model"
```

Expected: commit created.

## Task 3: UI Primitives

**Files:**
- Create: `src/lib/utils.ts`
- Create: `src/components/ui/button-link.tsx`
- Create: `src/components/ui/card.tsx`
- Create: `src/components/ui/ui-primitives.test.tsx`

- [ ] **Step 1: Write failing UI primitive tests**

Create `src/components/ui/ui-primitives.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { Card } from "./card";
import { ButtonLink } from "./button-link";

describe("UI primitives", () => {
  it("renders a primary ButtonLink as an accessible link", () => {
    render(<ButtonLink href="#contato">Falar com especialista</ButtonLink>);

    const link = screen.getByRole("link", { name: "Falar com especialista" });
    expect(link).toHaveAttribute("href", "#contato");
    expect(link.className).toContain("bg-[#146ef5]");
  });

  it("renders a card with sharp borders and content", () => {
    render(
      <Card>
        <h3>Google Ads</h3>
      </Card>,
    );

    expect(screen.getByText("Google Ads")).toBeInTheDocument();
    expect(screen.getByText("Google Ads").parentElement?.className).toContain(
      "rounded-[6px]",
    );
  });
});
```

- [ ] **Step 2: Run UI tests to verify they fail**

Run:

```powershell
npm run test -- --run src/components/ui/ui-primitives.test.tsx
```

Expected: FAIL with import errors for `./card` and `./button-link`.

- [ ] **Step 3: Implement utility helper and primitives**

Create `src/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Create `src/components/ui/button-link.tsx`:

```tsx
import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonLinkVariants = cva(
  "link-shift inline-flex min-h-11 items-center justify-center gap-2 rounded-[4px] px-5 py-3 text-sm font-semibold leading-none outline-none ring-offset-white focus-visible:ring-2 focus-visible:ring-[#146ef5] focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-[#146ef5] text-white hover:bg-[#0055d4]",
        secondary:
          "border border-[#d8d8d8] bg-white text-[#080808] hover:border-[#898989]",
        ghost: "bg-transparent text-[#080808] hover:text-[#146ef5]",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

type ButtonLinkProps = ComponentProps<"a"> &
  VariantProps<typeof buttonLinkVariants>;

export function ButtonLink({
  className,
  variant,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={cn(buttonLinkVariants({ variant }), className)} {...props} />
  );
}
```

Create `src/components/ui/card.tsx`:

```tsx
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-[6px] border border-[#d8d8d8] bg-white text-[#080808]",
        className,
      )}
      {...props}
    />
  );
}
```

- [ ] **Step 4: Run UI tests to verify they pass**

Run:

```powershell
npm run test -- --run src/components/ui/ui-primitives.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit UI primitives**

Run:

```powershell
git add src/lib src/components/ui
git commit -m "feat: add landing ui primitives"
```

Expected: commit created.

## Task 4: Header And Hero

**Files:**
- Create: `src/components/home/site-header.tsx`
- Create: `src/components/home/hero-section.tsx`
- Create: `src/components/home/header-hero.test.tsx`

- [ ] **Step 1: Write failing header and hero tests**

Create `src/components/home/header-hero.test.tsx`:

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { HeroSection } from "./hero-section";
import { SiteHeader } from "./site-header";

describe("header and hero", () => {
  it("renders brand navigation and WhatsApp CTA", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("link", { name: "PATELLA" })).toHaveAttribute(
      "href",
      "#home",
    );
    expect(screen.getByRole("link", { name: "Contato" })).toHaveAttribute(
      "href",
      "#contato",
    );
    expect(screen.getByRole("link", { name: "WhatsApp" })).toHaveAttribute(
      "href",
      "https://api.whatsapp.com/send?phone=5511974962232",
    );
  });

  it("opens the mobile menu", () => {
    render(<SiteHeader />);

    const button = screen.getByRole("button", { name: "Abrir menu" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByTestId("mobile-nav")).toBeVisible();
  });

  it("renders approved hero content and metric panel", () => {
    render(<HeroSection />);

    expect(
      screen.getByRole("heading", {
        name: "Marketing Ads Intelligence para crescimento mensuravel",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("14+")).toBeInTheDocument();
    expect(screen.getByText("19+")).toBeInTheDocument();
    expect(screen.getByText("2005")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Falar com especialista" }),
    ).toHaveAttribute("href", "https://api.whatsapp.com/send?phone=5511974962232");
  });
});
```

- [ ] **Step 2: Run header and hero tests to verify they fail**

Run:

```powershell
npm run test -- --run src/components/home/header-hero.test.tsx
```

Expected: FAIL with import errors for `./site-header` and `./hero-section`.

- [ ] **Step 3: Implement `SiteHeader`**

Create `src/components/home/site-header.tsx`:

```tsx
"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { contact, navItems } from "@/content/site-content";
import { ButtonLink } from "@/components/ui/button-link";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#d8d8d8] bg-white/95 backdrop-blur">
      <div className="section-shell flex min-h-16 items-center justify-between gap-4">
        <a
          href="#home"
          className="text-base font-black tracking-[0.08em] text-[#080808]"
        >
          PATELLA
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Principal">
          {navItems.slice(1).map((item) => (
            <a
              className="link-shift text-xs font-semibold uppercase tracking-[1.2px] text-[#5a5a5a] hover:text-[#146ef5]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ButtonLink href={contact.whatsappHref} className="min-h-9 px-4 py-2">
            WhatsApp
          </ButtonLink>
        </div>

        <button
          aria-expanded={isOpen}
          aria-label="Abrir menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-[4px] border border-[#d8d8d8] text-[#080808] md:hidden"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          {isOpen ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
        </button>
      </div>

      {isOpen ? (
        <nav
          aria-label="Mobile"
          className="section-shell grid gap-3 border-t border-[#d8d8d8] py-4 md:hidden"
          data-testid="mobile-nav"
        >
          {navItems.slice(1).map((item) => (
            <a
              className="text-sm font-semibold text-[#080808]"
              href={item.href}
              key={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <ButtonLink href={contact.whatsappHref}>WhatsApp</ButtonLink>
        </nav>
      ) : null}
    </header>
  );
}
```

- [ ] **Step 4: Implement `HeroSection`**

Create `src/components/home/hero-section.tsx`:

```tsx
import { ArrowRight, BarChart3, LineChart, Target } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import { contact, hero, stats } from "@/content/site-content";

export function HeroSection() {
  return (
    <section
      className="section-shell grid min-h-[calc(100svh-65px)] scroll-mt-24 items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20"
      id="home"
    >
      <div>
        <p className="uppercase-label mb-4">{hero.kicker}</p>
        <h1 className="max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-0.02em] text-[#080808] md:text-7xl lg:text-[80px]">
          {hero.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#363636] md:text-xl">
          {hero.body}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={contact.whatsappHref}>{hero.primaryCta}</ButtonLink>
          <ButtonLink href="#servicos" variant="ghost">
            {hero.secondaryCta}
            <ArrowRight aria-hidden="true" size={18} />
          </ButtonLink>
        </div>
      </div>

      <Card className="shadow-cascade p-4 md:p-5">
        <div className="mb-4 grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <div
              className="rounded-[4px] border border-[#d8d8d8] p-4"
              key={stat.label}
            >
              <strong className="block text-2xl font-semibold text-[#080808]">
                {stat.value}
              </strong>
              <span className="mt-1 block text-xs leading-5 text-[#5a5a5a]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-[4px] border border-[#d8d8d8] p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[1px] text-[#5a5a5a]">
                Intelligence dashboard
              </p>
              <p className="mt-1 text-sm text-[#363636]">
                campanhas, metas e crescimento
              </p>
            </div>
            <LineChart className="text-[#146ef5]" aria-hidden="true" size={28} />
          </div>

          <div className="grid gap-3">
            {[
              ["Planejamento", "bg-[#146ef5]", "w-[88%]"],
              ["Metricas", "bg-[#7a3dff]", "w-[72%]"],
              ["Performance", "bg-[#00d722]", "w-[94%]"],
            ].map(([label, color, width]) => (
              <div key={label}>
                <div className="mb-1 flex items-center justify-between text-xs text-[#5a5a5a]">
                  <span>{label}</span>
                  <span>ativo</span>
                </div>
                <div className="h-3 rounded-[2px] bg-[#f2f2f2]">
                  <div className={`h-3 rounded-[2px] ${color} ${width}`} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-[4px] bg-[#146ef5]/10 p-4 text-[#080808]">
              <Target className="mb-3 text-[#146ef5]" aria-hidden="true" />
              <p className="text-sm font-semibold">Metas claras</p>
            </div>
            <div className="rounded-[4px] bg-[#ffae13]/15 p-4 text-[#080808]">
              <BarChart3 className="mb-3 text-[#ff6b00]" aria-hidden="true" />
              <p className="text-sm font-semibold">Numeros reais</p>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
```

- [ ] **Step 5: Run header and hero tests to verify they pass**

Run:

```powershell
npm run test -- --run src/components/home/header-hero.test.tsx
```

Expected: PASS.

- [ ] **Step 6: Commit header and hero**

Run:

```powershell
git add src/components/home/site-header.tsx src/components/home/hero-section.tsx src/components/home/header-hero.test.tsx
git commit -m "feat: add landing header and hero"
```

Expected: commit created.

## Task 5: Full Landing Page Sections

**Files:**
- Modify: `src/components/home/home-page.tsx`
- Create: `src/components/home/home-page.test.tsx`

- [ ] **Step 1: Write failing full-page tests**

Create `src/components/home/home-page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { HomePage } from "./home-page";

describe("HomePage", () => {
  it("renders every approved landing section", () => {
    render(<HomePage />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Agencia e consultoria especializada em campanhas de marketing" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Tanto digital quanto analogico" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Servicos" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Nossas expertises" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Clientes" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Contato" })).toBeInTheDocument();
  });

  it("renders service cards and contact details", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: "Google" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Gestao" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Social Media" })).toBeInTheDocument();
    expect(screen.getByText("(11) 97496-2232")).toBeInTheDocument();
    expect(screen.getByText("contato@patella.com.br")).toBeInTheDocument();
  });

  it("renders final WhatsApp CTA", () => {
    render(<HomePage />);

    const links = screen.getAllByRole("link", { name: "Falar com especialista" });
    expect(links.at(-1)).toHaveAttribute(
      "href",
      "https://api.whatsapp.com/send?phone=5511974962232",
    );
  });
});
```

- [ ] **Step 2: Run full-page tests to verify they fail**

Run:

```powershell
npm run test -- --run src/components/home/home-page.test.tsx
```

Expected: FAIL because `HomePage` currently returns `null`.

- [ ] **Step 3: Implement `HomePage` sections**

Replace `src/components/home/home-page.tsx` with:

```tsx
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  Mail,
  MapPin,
  MessageCircle,
  SearchCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Card } from "@/components/ui/card";
import {
  about,
  clients,
  contact,
  consultingProgram,
  credibilityItems,
  expertise,
  pillars,
  services,
} from "@/content/site-content";
import { HeroSection } from "./hero-section";
import { SiteHeader } from "./site-header";

const credibilityIcons = [SearchCheck, Target, BarChart3, Sparkles];

export function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <CredibilityStrip />
        <AboutSection />
        <ConsultingProgramSection />
        <ServicesSection />
        <ExpertiseSection />
        <ClientsSection />
        <FinalCtaSection />
        <ContactSection />
      </main>
    </>
  );
}

function CredibilityStrip() {
  return (
    <section className="border-y border-[#d8d8d8]" aria-label="Destaques">
      <div className="section-shell grid md:grid-cols-4">
        {credibilityItems.map((item, index) => {
          const Icon = credibilityIcons[index];
          return (
            <div
              className="border-b border-[#d8d8d8] py-6 md:border-b-0 md:border-r md:px-6 md:last:border-r-0"
              key={item.title}
            >
              <Icon className="mb-4 text-[#146ef5]" aria-hidden="true" />
              <h2 className="text-lg font-semibold text-[#080808]">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#5a5a5a]">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="section-shell scroll-mt-24 py-20" id="quem-somos">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="uppercase-label">{about.label}</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.05] text-[#080808] md:text-6xl">
            {about.title}
          </h2>
        </div>
        <div>
          <p className="text-lg leading-8 text-[#363636]">{about.body}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {pillars.map((pillar) => (
              <Card className="p-4" key={pillar}>
                <BadgeCheck className="mb-3 text-[#146ef5]" aria-hidden="true" />
                <p className="text-sm font-semibold text-[#080808]">{pillar}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ConsultingProgramSection() {
  return (
    <section className="bg-[#f7f9fc] py-20">
      <div className="section-shell grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <Card className="shadow-cascade p-6">
          <p className="uppercase-label">{consultingProgram.label}</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.05] text-[#080808] md:text-6xl">
            {consultingProgram.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#363636]">
            {consultingProgram.body}
          </p>
        </Card>
        <div className="grid gap-4">
          {consultingProgram.steps.map((step, index) => (
            <Card className="flex items-center gap-4 p-5" key={step}>
              <span className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-[#146ef5] text-sm font-bold text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl font-semibold text-[#080808]">{step}</h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="section-shell scroll-mt-24 py-20" id="servicos">
      <p className="uppercase-label">Servicos</p>
      <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <h2 className="text-4xl font-semibold leading-[1.05] text-[#080808] md:text-6xl">
          Servicos
        </h2>
        <p className="max-w-xl text-base leading-7 text-[#5a5a5a]">
          Tres frentes conectadas para planejar, executar e medir crescimento.
        </p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <Card className="p-6" key={service.title}>
            <h3 className="text-2xl font-semibold text-[#080808]">
              {service.title}
            </h3>
            <p className="mt-4 min-h-28 text-base leading-7 text-[#5a5a5a]">
              {service.description}
            </p>
            <ButtonLink
              className="mt-6"
              href={contact.whatsappHref}
              variant="secondary"
            >
              Solicitar orcamento
              <ArrowRight aria-hidden="true" size={18} />
            </ButtonLink>
          </Card>
        ))}
      </div>
    </section>
  );
}

function ExpertiseSection() {
  return (
    <section className="border-y border-[#d8d8d8] py-20" id="expertises">
      <div className="section-shell">
        <p className="uppercase-label">Expertises</p>
        <h2 className="mt-4 text-4xl font-semibold leading-[1.05] text-[#080808] md:text-6xl">
          Nossas expertises
        </h2>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {expertise.map((item, index) => (
            <div
              className="rounded-[4px] border border-[#d8d8d8] px-4 py-5 text-sm font-semibold text-[#080808]"
              key={item}
            >
              <span
                className="mb-4 block h-1 w-12 rounded-[2px]"
                style={{
                  backgroundColor: [
                    "#146ef5",
                    "#7a3dff",
                    "#00d722",
                    "#ff6b00",
                  ][index % 4],
                }}
              />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientsSection() {
  return (
    <section className="section-shell scroll-mt-24 py-20" id="clientes">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="uppercase-label">Clientes</p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.05] text-[#080808] md:text-6xl">
            Clientes
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {clients.map((client) => (
            <Card className="flex min-h-28 items-center gap-4 p-5" key={client}>
              <Building2 className="text-[#146ef5]" aria-hidden="true" />
              <p className="text-lg font-semibold text-[#080808]">{client}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="bg-[#080808] py-20 text-white">
      <div className="section-shell flex flex-col justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[1.5px] text-[#3b89ff]">
            Proximo passo
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] md:text-6xl">
            Vamos transformar campanhas em crescimento mensuravel.
          </h2>
        </div>
        <ButtonLink href={contact.whatsappHref}>Falar com especialista</ButtonLink>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <footer className="section-shell scroll-mt-24 py-16" id="contato">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="uppercase-label">Contato</p>
          <h2 className="mt-4 text-4xl font-semibold text-[#080808]">
            Contato
          </h2>
          <p className="mt-4 text-base leading-7 text-[#5a5a5a]">
            Entre em contato e solicite um orcamento ou tire suas duvidas.
          </p>
        </div>
        <div className="grid gap-4">
          <ContactLine icon={<MapPin aria-hidden="true" />} label={contact.address} />
          <ContactLine
            icon={<MessageCircle aria-hidden="true" />}
            label={contact.phone}
            href={contact.whatsappHref}
          />
          <ContactLine
            icon={<Mail aria-hidden="true" />}
            label={contact.email}
            href={contact.mailHref}
          />
        </div>
      </div>
      <div className="mt-12 border-t border-[#d8d8d8] pt-6 text-sm text-[#5a5a5a]">
        Todos os direitos reservados (c) PATELLA BUSINESS INTELLIGENCE.
      </div>
    </footer>
  );
}

function ContactLine({
  href,
  icon,
  label,
}: {
  href?: string;
  icon: React.ReactNode;
  label: string;
}) {
  const className =
    "flex items-start gap-4 rounded-[4px] border border-[#d8d8d8] p-4 text-base font-medium text-[#080808]";

  if (href) {
    return (
      <a className={`${className} link-shift`} href={href}>
        <span className="text-[#146ef5]">{icon}</span>
        <span>{label}</span>
      </a>
    );
  }

  return (
    <div className={className}>
      <span className="text-[#146ef5]">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
```

- [ ] **Step 4: Run full-page tests to verify they pass**

Run:

```powershell
npm run test -- --run src/components/home/home-page.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Run all tests**

Run:

```powershell
npm run test -- --run
```

Expected: PASS for content, UI primitives, header/hero, and full page tests.

- [ ] **Step 6: Commit full landing page**

Run:

```powershell
git add src/components/home src/app/page.tsx
git commit -m "feat: build patella landing sections"
```

Expected: commit created.

## Task 6: Metadata, SEO, And Final Styling Pass

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Create: `src/app/layout.test.tsx`

- [ ] **Step 1: Write failing metadata test**

Create `src/app/layout.test.tsx`:

```tsx
import { metadata } from "./layout";

describe("metadata", () => {
  it("describes Patella landing page for search and sharing", () => {
    expect(metadata.title).toBe("Patella Marketing Ads Intelligence");
    expect(metadata.description).toContain("Google Ads");
    expect(metadata.openGraph).toMatchObject({
      title: "Patella Marketing Ads Intelligence",
      locale: "pt_BR",
      type: "website",
    });
  });
});
```

- [ ] **Step 2: Run metadata test to verify it fails**

Run:

```powershell
npm run test -- --run src/app/layout.test.tsx
```

Expected: FAIL because `metadata.openGraph` is missing.

- [ ] **Step 3: Add metadata and minor global polish**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Patella Marketing Ads Intelligence",
  description:
    "Consultoria em Google Ads, marketing intelligence, metricas e crescimento mensuravel para empresas, agencias e franquias.",
  openGraph: {
    title: "Patella Marketing Ads Intelligence",
    description:
      "Marketing Ads Intelligence para crescimento mensuravel.",
    locale: "pt_BR",
    siteName: "Patella",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
```

Append to `src/app/globals.css`:

```css
::selection {
  background: var(--patella-blue);
  color: #ffffff;
}

a {
  text-decoration: none;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}
```

- [ ] **Step 4: Run metadata test to verify it passes**

Run:

```powershell
npm run test -- --run src/app/layout.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Run lint and production build**

Run:

```powershell
npm run lint
npm run build
```

Expected: both commands exit with code 0.

- [ ] **Step 6: Commit metadata and styling pass**

Run:

```powershell
git add src/app/layout.tsx src/app/globals.css src/app/layout.test.tsx
git commit -m "feat: add landing metadata and polish"
```

Expected: commit created.

## Task 7: Browser Verification

**Files:**
- No source file changes expected. If visual QA finds defects, edit the narrowest affected file and rerun the related test.

- [ ] **Step 1: Start dev server**

Run:

```powershell
npm run dev
```

Expected: Next.js starts on `http://localhost:3000`. If port 3000 is busy, Next prints the alternate local URL.

- [ ] **Step 2: Open and inspect desktop viewport**

Open the local URL in the in-app browser.

Expected:

- Hero headline fits without overlap.
- Navbar links fit.
- Dashboard panel is visible on the first screen.
- Next section hint is visible below the hero on common desktop heights.
- CTA hover translation does not shift layout.

- [ ] **Step 3: Inspect mobile viewport**

Use the browser responsive tools or Playwright screenshot workflow at a mobile width around 390px.

Expected:

- Hero stacks cleanly.
- Mobile menu button opens nav.
- CTA text fits inside buttons.
- Service and expertise grids become single-column or two-column without clipping.
- Contact address wraps cleanly.

- [ ] **Step 4: Verify anchors and contact links**

Click:

- `Quem Somos`
- `Servicos`
- `Expertises`
- `Clientes`
- `Contato`
- `Falar com especialista`
- `contato@patella.com.br`

Expected:

- Anchor links scroll to the correct sections.
- WhatsApp link navigates to `https://api.whatsapp.com/send?phone=5511974962232`.
- Email link uses `mailto:contato@patella.com.br`.

- [ ] **Step 5: Run final verification**

Run:

```powershell
npm run test -- --run
npm run lint
npm run build
```

Expected: all pass.

- [ ] **Step 6: Commit verification fixes**

Run this only if Task 7 required source edits:

```powershell
git add src
git commit -m "fix: polish responsive landing page"
```

Expected: commit created only when source changed.

## Self-Review Notes

- Spec coverage: The plan covers scaffold, static one-page architecture, content source, Webflow visual direction, hero, credibility strip, about, consulting program, services, expertises, clients, final CTA, contact, responsive behavior, accessibility, tests, lint, build, and browser verification.
- Scope: Single landing page only. No backend, CMS, authentication, blog, or multipage routing.
- Type consistency: Content exports are introduced in Task 2 and consumed by Task 4 and Task 5 with matching names.
- TDD sequence: Content, UI primitives, header/hero, full page, and metadata all add failing tests before implementation.
