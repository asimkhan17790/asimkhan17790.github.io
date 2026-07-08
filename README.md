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
├── components/       # One component per page section + shared pieces
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Education.tsx
│   ├── Contact.tsx
│   ├── VideoBackground.tsx # Fixed scroll-linked coding video behind the page
│   ├── IdeaStream.tsx      # Canvas layer — Matrix-style binary rain climbing upward
│   └── SectionHeading.tsx  # Shared eyebrow + word-stagger heading reveal
├── data/             # All personal content as typed TS constants
│   ├── profile.ts
│   ├── experience.ts
│   ├── skills.ts
│   └── education.ts
├── hooks/
│   ├── useTilt.ts          # 3D hover tilt for cards (rotateX/Y springs + spotlight)
│   ├── useTheme.ts         # light/dark toggle, persisted in localStorage
│   ├── useActiveSection.ts # IntersectionObserver-based active nav tracking
│   └── useGithubRepos.ts   # Live GitHub API fetch with sessionStorage cache
├── lib/
│   ├── motion.ts           # Shared Framer Motion variants (fadeUp, slideInLeft, etc.)
│   └── spotlight.ts        # Cursor tracker feeding the .spotlight-card hover glow
└── App.tsx                 # Root — assembles sections, passes theme props
public/
├── AsimKhan.pdf            # Resume served as static asset
└── videos/
    ├── coding-bg.mp4       # Background footage (programmer typing, ~0.9 MB, 1080p)
    └── coding-bg-poster.jpg# Poster / reduced-motion fallback frame
```

## Key Behaviors

**Data layer** — all personal content lives in `src/data/`. Edit those files to update site content; no CMS or API involved.

**Theme** — `useTheme` stores `light`/`dark` in `localStorage` and toggles a `dark` class on `<html>`. All dark styles driven by Tailwind's `darkMode: 'class'`.

**Active nav** — `useActiveSection` uses `IntersectionObserver` to detect which section is in view; result passed to `Nav` for highlight.

**Projects section** — `useGithubRepos` fetches live from the GitHub API (`asimkhan17790`), caches results in `sessionStorage` for 1 hour, falls back to a hardcoded list on error.

**Animations** — shared `Variants` in `src/lib/motion.ts`. Components use `<motion.div whileInView viewport={{ once: true }}>`.

**Video background** — `VideoBackground` pins a muted looping clip of a programmer typing behind the whole page. Scroll position drives a slow zoom/drift and dims the footage from hero-strength to ambient; scroll *velocity* bumps `playbackRate` (typing speeds up while you move). Light and dark themes get different peak opacities, and `prefers-reduced-motion` swaps the video for its poster frame.

**Idea stream** — `IdeaStream` renders Matrix-style streams of binary digits on a fixed canvas, climbing upward from the coder like thoughts. Each stream has a bright head and a fading green trail, digits shimmer by flipping 0↔1 in place, and spawn rate + climb speed react to scroll velocity. The layer disables itself entirely under reduced motion.

**3D depth** — the hero leans toward the cursor with layered `translateZ` parallax (name floats above badge and buttons); project, repo, and education cards tilt in 3D via `useTilt` with content popping off the card plane. All 3D motion is disabled under `prefers-reduced-motion`.

**Spark accent** — a single warm token (`--spark`, amber) marks "idea" moments: eyebrow dashes, the scroll-progress gradient, timeline dot pulses, and card spotlight glows (`.spotlight-card` + `lib/spotlight.ts`).

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
