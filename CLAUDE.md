# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Technical portfolio site for Epoch Associes (jbouix.com). AI-native M&A advisory boutique for French small-cap sell-side transactions (500K-10M€ EV). Co-founders: Julien Bouix (President, ex-Lincoln International) and Louis Germain (CTO).

**Not a marketing site.** This is an engineering case study showing the deal operating system architecture, reviewed by a senior M&A banker.

## Stack

- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Fonts:** Playfair Display (headlines), DM Sans (body), JetBrains Mono (technical labels)
- **Palette:** Dark (#09090b), terracotta/amber accent (#c17f4e), muted status colors (green=live, blue=testing, amber=spec)
- **State:** Zustand (ui-store for active section, lang-store for FR/EN toggle)
- **Deploy target:** GitHub Pages with CNAME jbouix.com (static export)
- **Language:** Bilingual FR/EN with toggle, defaults to French

## Commands

```bash
npm run dev          # Dev server on localhost:3000
npm run build        # Production build
npm run lint         # ESLint
```

No test runner configured. Playwright is a dev dependency but no test files exist yet.

## Architecture

### Content layer (the backbone)

- `lib/site-content.ts` — All English content data + TypeScript types. Source of truth for types.
- `lib/content.ts` — Bilingual content layer. Imports EN from site-content.ts, defines FR translations, exports `getContent(lang)` returning a `SiteContent` bundle. Also exports `ThesisContent` type.
- `store/lang-store.ts` — Zustand store for language (`"en" | "fr"`), defaults to `"fr"`.

### Page structure

- `app/page.tsx` — Minimal server component, renders `<PageContent />`.
- `components/PageContent.tsx` — **The actual page.** Client component that reads lang store, calls `getContent(lang)`, and renders all sections with the right language. Contains all section text (hero, arch, pipeline, etc.) in both EN and FR as `TextMap` objects.

### Components

| Component | File | Role |
|-----------|------|------|
| `ArchitectureExplorer` | components/ | **CENTERPIECE.** 3-layer interactive diagram: infra nodes (click for loupe effect), module layer (highlights connections), guardrail strip. |
| `DealPipeline` | components/ | Accordion of 12 pipeline stages with status badges (LIVE/IN TEST/SPEC) and architecture insight callouts. |
| `AnimatedCounter` | components/ | Scroll-triggered number animation for hero metrics. |
| `FootballField` | components/ | SVG horizontal bar chart for valuation methodologies. |
| `ComparisonTable` | components/ | ChatGPT+banker vs Epoch comparison grid. |
| `PitchShowcase` | components/ | Interactive Medadom pitch deck preview (4 tabs: cover, comps, valo, buyers). |
| `Navigation` | components/ | Sticky nav with FR/EN toggle button. |
| `Reveal` | components/ | Scroll-triggered fade-up animation wrapper using IntersectionObserver. |
| `SectionObserver` | components/ | Tracks which section is in viewport for nav highlighting. |

### Key design decisions

- **Content is centralized.** All data lives in `lib/site-content.ts` (EN) and `lib/content.ts` (FR). Components receive data as props. To change copy, edit these files.
- **Architecture Explorer loupe effect.** Clicking an infra node: node glows, detail panel expands (tech specs left / M&A business rationale right), module layer highlights connected modules, other nodes dim.
- **Pipeline ordering was reviewed by a senior M&A banker.** CRM Cockpit and Email Intelligence are cross-cutting layers (not sequential stages). Buyer Matching runs in parallel with stages 05-07, placed before IM Writer.
- **CSS Modules everywhere.** No utility framework. `@/*` path alias maps to project root.
- **All content banker-reviewed.** "Cessibility" → "exit readiness", "IC memo" → "bilateral management presentation", LBO "Floor/minimum" → "PE buyer ceiling", "Juge" → "Devil's Advocate", DLOM 15-30% → 20-35%.

### Infrastructure nodes in the architecture explorer

PostgreSQL, Qdrant, vLLM+Qwen, OpenRouter, Docling, LangGraph, FastAPI+HTMX, Playwright, Neo4j, openpyxl

### Pipeline stages (corrected order)

01 Sourcing → 02 Agent Pitch → 03 Mandate Signed → 04 Workshop → 05 Datapack → 06 Business Plan → 07 Valuation → 08 Buyer Matching → 09 IM Writer → 10 Post-IM → 11 Q&A Agent → 12 Anonymization

Cross-cutting: CRM Cockpit (always-on), Email Intelligence (from mandate onward)

## Hosting

Site is deployed to GitHub Pages with CNAME `jbouix.com`. See DEPLOYMENT.md for instructions.
