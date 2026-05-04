# asimkhan17790.github.io

Personal portfolio site for Asim Khan — built with React 18, TypeScript, Vite, Tailwind CSS, and Framer Motion. Deployed to GitHub Pages.

## Tech Stack

| Layer | Choice |
|-------|--------|
| UI | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS (dark mode via `class`) |
| Animation | Framer Motion |
| Deployment | GitHub Pages (`dist/`) |

## Project Structure

```
src/
├── components/       # One component per page section
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Education.tsx
│   └── Contact.tsx
├── data/             # All personal content as typed TS constants
│   ├── profile.ts
│   ├── experience.ts
│   ├── skills.ts
│   └── education.ts
├── hooks/
│   ├── useTheme.ts         # light/dark toggle, persisted in localStorage
│   ├── useActiveSection.ts # IntersectionObserver-based active nav tracking
│   └── useGithubRepos.ts   # Live GitHub API fetch with sessionStorage cache
├── lib/
│   └── motion.ts           # Shared Framer Motion variants (fadeUp, slideInLeft, etc.)
└── App.tsx                 # Root — assembles sections, passes theme props
public/
└── AsimKhan.pdf            # Resume served as static asset
```

## Key Behaviors

**Data layer** — all personal content lives in `src/data/`. Edit those files to update site content; no CMS or API involved.

**Theme** — `useTheme` stores `light`/`dark` in `localStorage` and toggles a `dark` class on `<html>`. All dark styles driven by Tailwind's `darkMode: 'class'`.

**Active nav** — `useActiveSection` uses `IntersectionObserver` to detect which section is in view; result passed to `Nav` for highlight.

**Projects section** — `useGithubRepos` fetches live from the GitHub API (`asimkhan17790`), caches results in `sessionStorage` for 1 hour, falls back to a hardcoded list on error.

**Animations** — shared `Variants` in `src/lib/motion.ts`. Components use `<motion.div whileInView viewport={{ once: true }}>`.

## Commands

```bash
npm run dev        # Vite dev server → http://localhost:5173
npm run build      # tsc type-check + production build → dist/
npm run preview    # serve dist/ locally
```

No test runner configured. Type-check only via `tsc --noEmit`.

## Deployment

Push to `main`. GitHub Pages serves the `dist/` output from `npm run build`.

## Resume

PDF at `public/AsimKhan.pdf` — replace the file to refresh the resume link on the site.
