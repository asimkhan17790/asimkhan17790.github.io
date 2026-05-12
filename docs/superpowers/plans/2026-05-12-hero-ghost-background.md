# Hero Ghost Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `asim_image.jpg` as a low-opacity ghost background to the Hero section, fading in with animation and blending into the dark UI via radial vignette and bottom gradient.

**Architecture:** Three absolutely-positioned overlay divs stacked inside the existing Hero `<section>`: (1) the photo background layer, (2) a radial vignette mask, (3) a bottom gradient fade. All animated via framer-motion to match existing patterns. No layout changes — centered text and buttons stay identical.

**Tech Stack:** React, Framer Motion (`motion.div`, `useReducedMotion`), Tailwind CSS, inline styles for CSS variables.

---

### Task 1: Add ghost image background to Hero.tsx

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Add the three overlay divs after the existing noise texture div**

In `src/components/Hero.tsx`, locate this block (around line 135):

```tsx
<div className="absolute inset-0 pointer-events-none" style={{ filter: 'url(#hero-noise)', opacity: 0.035 }} />
```

Insert immediately after it:

```tsx
{/* Ghost photo background */}
<motion.div
  className="absolute inset-0 pointer-events-none"
  style={{ backgroundImage: 'url(/asim_image.jpg)', backgroundPosition: 'center 20%', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
  initial={{ opacity: 0 }}
  animate={{ opacity: reduced ? 0.2 : 0.2 }}
  transition={{ duration: 1.4, ease: 'easeOut', delay: 0.4 }}
/>
{/* Radial vignette — fades photo edges into background */}
<div
  className="absolute inset-0 pointer-events-none"
  style={{ background: 'radial-gradient(ellipse 65% 65% at 50% 38%, transparent 0%, var(--bg) 72%)' }}
/>
{/* Bottom fade — prevents bleed into next section */}
<div
  className="absolute bottom-0 left-0 right-0 pointer-events-none"
  style={{ height: '200px', background: 'linear-gradient(to bottom, transparent, var(--bg))' }}
/>
```

- [ ] **Step 2: Verify `reduced` is in scope**

`const reduced = useReducedMotion()` already exists at line ~122 in the Hero function body. No change needed.

- [ ] **Step 3: Start dev server and verify visually**

```bash
npm run dev
```

Open http://localhost:5173. Confirm:
- Photo fades in ~1.4s after page load
- Edges dissolve into page background — no hard border
- Bottom of hero cleanly transitions into next section
- Text, badge, buttons, and blobs all render above the photo
- Works in both light and dark mode (vignette uses `var(--bg)` so it adapts)

- [ ] **Step 4: Build check**

```bash
npm run build
```

Expected: clean build, no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: add ghost photo background to Hero section"
```
