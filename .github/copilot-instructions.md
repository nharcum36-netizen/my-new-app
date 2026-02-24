# Copilot Instructions for AI Agents

## Project Overview
- **Framework:** Next.js (App Router, TypeScript)
- **Purpose:** AI-powered journaling app ("MindScribe")
- **Key Features:**
  - Journaling UI in `app/journal/page.tsx`
  - AI reflection endpoints in `app/api/reflect/route.ts` and `app/journal/api/reflect/route.ts`
  - Uses OpenAI API (see `.env.local` for `OPENAI_API_KEY`)

## Architecture & Patterns
- **App Directory Structure:**
  - `app/` contains all routes and API endpoints (Next.js App Router)
  - `app/layout.tsx` sets up global fonts and layout
  - `app/globals.css` uses TailwindCSS (see `postcss.config.mjs`)
- **API Endpoints:**
  - Place Next.js API routes in `app/api/` or nested under route folders (e.g., `app/journal/api/`)
  - Use the `openai` npm package for AI calls
- **Styling:**
  - TailwindCSS is configured via `postcss.config.mjs`
  - Custom CSS variables for theming in `app/globals.css`
- **Fonts:**
  - Uses `next/font` for Geist Sans and Mono (see `app/layout.tsx`)

## Developer Workflows
- **Start Dev Server:** `npm run dev`
- **Build:** `npm run build`
- **Start Production:** `npm run start`
- **Lint:** `npm run lint` (uses `eslint-config-next` with custom ignores in `eslint.config.mjs`)
- **Deploy:** Recommended via Vercel (see README)

## Conventions & Tips
- **Environment Variables:** Store secrets in `.env.local` (never commit this file)
- **TypeScript:** All code is TypeScript-first; prefer `.tsx` for React components
- **API Integration:**
  - Use the `openai` package for all AI/LLM calls
  - Reference the `.env.local` variable for API keys
- **Component Structure:**
  - Place new pages in `app/[route]/page.tsx`
  - Place API endpoints in `app/[route]/api/[endpoint]/route.ts`
- **Styling:**
  - Use Tailwind utility classes and custom CSS variables
  - Global styles in `app/globals.css`

## Key Files & Directories
- `app/page.tsx` — Home page
- `app/journal/page.tsx` — Journal UI
- `app/api/reflect/route.ts` — Main AI endpoint
- `app/layout.tsx` — Global layout and font setup
- `app/globals.css` — Global and theme styles
- `eslint.config.mjs` — Linting rules and ignores
- `postcss.config.mjs` — Tailwind/PostCSS config
- `.env.local` — API keys (not committed)

## Example: Adding a New API Route
1. Create `app/[route]/api/[endpoint]/route.ts`
2. Use the `openai` package and reference `process.env.OPENAI_API_KEY`
3. Export a Next.js handler (e.g., `POST`)

---
For more, see the [README.md](../README.md) and Next.js docs. Update this file as project conventions evolve.
