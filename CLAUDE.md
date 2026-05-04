# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start Vite dev server (localhost:5173)
npm run build      # tsc type-check + Vite production build → dist/
npm run preview    # serve dist/ locally
```

No test runner is configured. Type-check only via `tsc --noEmit`.

## Architecture

Single-page portfolio site. Stack: React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion.

**Data layer** (`src/data/`): plain `.ts` files exporting typed constants — `profile.ts`, `experience.ts`, `skills.ts`, `education.ts`. All personal content lives here; no CMS or API for content.

**Sections** (`src/components/`): one component per page section (`Hero`, `About`, `Experience`, `Skills`, `Projects`, `Education`, `Contact`). `App.tsx` assembles them in order and passes `theme`/`toggleTheme` down where needed.

**Theme**: `useTheme` hook stores `light`/`dark` in `localStorage`, toggles a `dark` class on `<html>`. Tailwind `darkMode: 'class'` drives all dark styles.

**Active nav**: `useActiveSection` uses `IntersectionObserver` to track which section is in view; result passed to `Nav` for highlight.

**Projects section**: `useGithubRepos` fetches live from GitHub API (`asimkhan17790`), caches in `sessionStorage` for 1 hour, falls back to a hardcoded list on error.

**Animations**: shared Framer Motion `Variants` in `src/lib/motion.ts` (`fadeUp`, `slideInLeft`, `staggerContainer`, etc.). Components wrap content in `<motion.div>` with `whileInView` + `viewport={{ once: true }}`.

**Resume**: PDF served as static asset at `public/AsimKhan.pdf`.

**Deployment**: GitHub Pages — `npm run build` output in `dist/` is deployed directly.
