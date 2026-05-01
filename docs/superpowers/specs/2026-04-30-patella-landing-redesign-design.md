# Patella Landing Redesign Design

## Summary

Build a single-page Next.js landing page for Patella Marketing Ads Intelligence. The page will use the current public site content as source material and redesign it with the Webflow-inspired visual system in `DESIGN.md`: white canvas, near-black typography, Webflow Blue CTAs, sharp 4-8px radii, thin borders, cascading shadows, uppercase labels, and precise B2B presentation.

The first delivery is a static landing page with anchor navigation, responsive sections, and WhatsApp/contact calls to action. No CMS, dashboard, authentication, blog, or backend form handling is included.

## Sources

- Local design system: `DESIGN.md`
- Current site content: `https://patella.com.br/`
- Public content to preserve and rewrite: Google Partner for more than 14 years, more than 19 years of online-market experience, journey started in 2005, marketing consulting for companies/agencies/commercial processes, Google tools, Digital Ads, franchise acceleration, consulting program, services, expertises, clients, contact address, phone, email, and social links.

## Goals

- Recreate Patella as a modern one-page corporate landing page.
- Keep the company positioning: marketing ads intelligence, Google Partner credibility, strategic consulting, measurable growth, and performance marketing.
- Use the Webflow-inspired design language from `DESIGN.md`.
- Make the first screen immediately communicate brand, expertise, outcome, and primary CTA.
- Provide smooth anchor navigation for `Home`, `Quem Somos`, `Servicos`, `Expertises`, `Clientes`, and `Contato`.
- Optimize for desktop and mobile breakpoints around 479px, 768px, and 992px.

## Non-Goals

- Do not recreate the old site pixel-for-pixel.
- Do not add CMS, database, login, blog, checkout, or admin tools.
- Do not create a multi-page site in the first delivery.
- Do not add a custom contact backend; contact actions link to WhatsApp, email, or visible contact details.

## Visual Direction

Use the approved "Webflow corporativo" direction:

- White background with near-black `#080808` text.
- Primary CTA in `#146ef5`.
- Secondary visual accents from the design palette, used sparingly for dashboard-like highlights and badges.
- Sharp cards with `1px solid #d8d8d8`, 4-8px radius, and 5-layer cascade shadow on key elevated elements.
- Large hero typography, tight section headings, and small uppercase labels.
- Buttons and links use a subtle `translateX(6px)` hover motion.
- Layout feels tool-forward and consultancy-grade, not decorative or agency-flashy.

## Page Structure

### Navigation

Sticky top navbar with Patella branding, anchor links, and a compact WhatsApp CTA. On mobile, collapse links into a small menu button with a vertical anchor list.

### Hero

Hero headline:

`Marketing Ads Intelligence para crescimento mensuravel`

Supporting copy:

Strategic consulting for campaigns, metrics, and commercial acceleration for companies, digital marketing agencies, and franchises.

Hero proof points:

- Google Partner for more than 14 years.
- More than 19 years of online-market experience.
- Started in 2005 with ecommerce operation experience.

Hero visual:

A clean intelligence/dashboard panel using cards, metrics, campaign bars, and accent color bands. It should look like a strategic performance workspace, not a generic illustration.

Primary CTA:

`Falar com especialista`

Secondary CTA:

`Ver servicos`

### Credibility Strip

Four compact cells under the hero:

- Consultoria estrategica
- Google Ads
- Gestao e metas
- Social Media

Each cell uses thin borders, short copy, and simple lucide-react icons.

### Quem Somos

Two-column section with a label, a strong heading, and a concise rewritten paragraph. The content should mention:

- Specialized agency and consultancy in marketing campaigns.
- More than 19 years in the online market.
- Google Partner certification.
- Planning and metrics intelligence.
- Work with companies, marketing agencies, and commercial/franchise acceleration.

### Consulting Program

Feature section for `consulting program tanto digital quanto analogico`. Explain that Patella studies market scenarios, uses digital-tool potential, identifies real-number opportunities, and builds online/offline positioning plans for brand, product, or service.

Use a larger card or split layout with process bullets:

- Diagnostico de mercado
- Plano estrategico
- Campanhas e canais
- Metricas e otimizacao

### Servicos

Three primary service cards:

- Google
- Gestao
- Social Media

Each card should have a short benefit-led description instead of the repeated generic text from the old site. CTA text should be `Solicitar orcamento`.

### Expertises

Grid of text-based expertise badges/cards in the first delivery. Use accent colors lightly and keep the section scan-friendly.

Suggested expertise categories:

- Google Ads
- Digital Ads
- Planejamento
- Inteligencia em Metricas
- Ecommerce
- Franquias
- Performance
- Social Media

### Clientes

Client/logo section as a clean grid. Use source site images when they can be downloaded during implementation; otherwise use neutral logo tiles labeled by verified image alt text or omit labels that cannot be verified.

### Final CTA

Full-width high-contrast section with concise message:

`Vamos transformar campanhas em crescimento mensuravel.`

Primary action: WhatsApp.

Secondary action: email/contact anchor.

### Contato

Show public contact details from the current site:

- Address: `R. Vitorio Partenio, 142 - Sala 01, Vila Oliveira, Mogi das Cruzes - SP, 08780-410`
- Phone: `(11) 97496-2232`
- Email: `contato@patella.com.br`
- Social links for WhatsApp, Facebook, and Instagram only when their URLs can be extracted from the current site. Otherwise, show only verified contact channels.

## Technical Architecture

- Use Next.js App Router.
- Use Tailwind CSS for the design system tokens and layout.
- Use shadcn/ui selectively, mainly `Button`, `Card`, and possibly `Sheet` for mobile navigation if the project setup supports it.
- Keep the page static and componentized.
- Prefer local components such as:
  - `SiteHeader`
  - `HeroSection`
  - `CredibilityStrip`
  - `AboutSection`
  - `ConsultingProgramSection`
  - `ServicesSection`
  - `ExpertiseSection`
  - `ClientsSection`
  - `FinalCtaSection`
  - `ContactSection`
- Store repeated content in typed arrays inside the page or a nearby content module.

## Responsive Behavior

- Desktop: multi-column hero, dashboard panel on the right, service/expertise grids.
- Tablet: reduce gaps and heading sizes, preserve two-column sections where readable.
- Mobile: stack hero content, keep CTA buttons readable, convert grids to one or two columns, ensure the navbar does not overflow.
- Avoid viewport-scaled font sizes. Use Tailwind responsive text classes with fixed steps.

## Accessibility

- Use semantic landmarks: `header`, `main`, `section`, `footer`.
- CTAs must be real links or buttons with clear accessible names.
- Maintain color contrast between text and background.
- Preserve keyboard navigation for anchors and mobile menu.
- Do not hide essential content inside hover-only interactions.

## Testing And Verification

- Run install/build/lint commands appropriate to the scaffolded Next.js project.
- Verify page renders in browser locally.
- Check desktop and mobile screenshots for:
  - non-overlapping text
  - readable CTAs
  - correct hero hierarchy
  - visible next-section hint
  - stable cards/grids
- Verify anchor navigation and WhatsApp/email links.

## Approval Notes

The user approved:

- Redesign rather than faithful copy.
- Single landing page rather than multipage site.
- Webflow corporate direction.
- Visual structure shown in the browser companion.
