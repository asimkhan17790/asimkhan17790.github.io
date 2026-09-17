---
name: Asim Khan — Portfolio
description: Dark-default engineering-leadership portfolio with glass panels, an amber signal accent, and motion-driven depth.
colors:
  void-charcoal: "#18181B"
  terminal-white: "#F4F4F5"
  dim-gray: "#9CA3AF"
  cool-steel: "#D1D5DB"
  panel-charcoal: "#27272A"
  seam-gray: "#3F3F46"
  signal-amber: "#FBBF24"
  shimmer-white: "#FFFFFF"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(3rem, 7vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.15em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.panel-charcoal}"
    textColor: "{colors.terminal-white}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.signal-amber}"
    textColor: "{colors.void-charcoal}"
  card:
    backgroundColor: "{colors.panel-charcoal}"
    textColor: "{colors.terminal-white}"
    rounded: "{rounded.lg}"
    padding: "20px"
  badge:
    backgroundColor: "{colors.panel-charcoal}"
    textColor: "{colors.terminal-white}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "6px 12px"
---

# Design System: Asim Khan — Portfolio

## 1. Overview

**Creative North Star: "The Night Terminal"**

The site reads like a late-night IDE window: a dark, low-saturation neutral field, monospace labels, and a single amber signal cutting through it — the cursor blink, the status light, the idea that just landed. It is the visual argument for the site's positioning: a VP who still ships code doesn't need a loud interface to prove it, he needs a precise one. Panels are frosted glass, not flat cards, because depth here comes from material and motion (blur, tilt, z-translate), never from decoration piled on top of content.

The system explicitly rejects the generic SaaS-template portfolio (cookie-cutter card grids, gradient-clip hero text, stock "available for hire" badges) and the overloaded resume-dump (walls of unstyled text, no hierarchy). Every glass surface, tilt, and amber glow exists to reinforce technical credibility for a hiring-manager audience skimming fast — not to perform as a creative-agency showcase.

**Key Characteristics:**
- Dark-by-default (`data-theme="dark"` is the site's canonical state; light is a full parallel theme, not an afterthought)
- One accent color (Signal Amber) marks "idea" moments only — eyebrows, active states, glow
- Depth comes from glass blur, 3D tilt, and z-translate layering, not drop shadows
- Monospace type marks anything structural or labeled (eyebrows, nav mark, typewriter badge); Inter carries all reading content

## 2. Colors

A near-monochrome charcoal field with a single warm accent that never competes for attention — it marks, it doesn't decorate.

### Primary
- **Signal Amber** (`#FBBF24` dark / `#B45309` light): the site's only saturated color. Reserved for "idea" moments — the eyebrow dash before a section heading, the active nav pill tint, timeline dot pulses, card spotlight glow on hover. Never used for large fills.

### Neutral
- **Void Charcoal** (`#18181B` dark / `#F4F4F5` light): page background.
- **Panel Charcoal** (`#27272A` dark / `#FFFFFF` light): card and elevated-surface background.
- **Terminal White** (`#F4F4F5` dark / `#111111` light): primary text.
- **Dim Gray** (`#9CA3AF` dark / `#6B7280` light): secondary/muted text — captions, metadata, timestamps.
- **Cool Steel** (`#D1D5DB` dark / `#374151` light): secondary accent — active nav link text, icon tints, selection background.
- **Seam Gray** (`#3F3F46` dark / `#E4E4E7` light): borders and dividers.
- **Shimmer White** (`#FFFFFF`): the moving highlight band in the name's text-shimmer animation; not a surface color.

### Named Rules
**The One Spark Rule.** Signal Amber marks a single "idea" moment per view — it is never a background fill, never used for more than one element's active state at a time. Its rarity is what makes it read as a signal instead of a decoration.

## 3. Typography

**Display / Body Font:** Inter (with `system-ui, sans-serif`)
**Label / Mono Font:** JetBrains Mono (with `monospace`)

**Character:** Inter carries every sentence the visitor actually reads — clean, geometric, never showy. JetBrains Mono is reserved for anything structural: it signals "this is metadata, not prose" the instant it appears.

### Hierarchy
- **Display** (700, `clamp(3rem, 7vw, 4.5rem)`, line-height 1.05, tracking -0.02em): the hero name only, rendered with the text-shimmer sweep.
- **Headline** (700, 1.875rem/30px, line-height 1.2): section titles, revealed word-by-word on scroll into view.
- **Body** (400, 1rem, line-height 1.6, max ~70ch): bio copy, descriptions, card text. Secondary body text drops to Dim Gray.
- **Label** (500, 0.75rem, letter-spacing 0.15em, uppercase, JetBrains Mono): eyebrow text above section headings, the nav wordmark ("AK"), the hero's typewriter role badge, card metadata rows.

### Named Rules
**The Mono-Marks-Structure Rule.** If a piece of text is metadata, a label, or a system element — not prose the visitor reads for meaning — it's set in JetBrains Mono, uppercase, tracked wide. Everything else is Inter.

## 4. Elevation

Depth is conveyed through motion and material, not shadow scale: glass panels carry `backdrop-filter: blur(16px) saturate(1.7)`, cards tilt in 3D toward the cursor (`useTilt`, ±8°) with inner content lifted on a separate `z` plane, and the hero leans toward the cursor via spring-driven `rotateX`/`rotateY`. Shadows exist only as a soft, low-opacity glass shadow beneath elevated panels — ambient, never a hard drop shadow implying a light source.

### Shadow Vocabulary
- **Glass ambient** (`0 8px 24px -10px var(--glass-shadow)`, deepening to `0 14px 32px -10px` on hover): sits beneath every `.glass-btn` surface; reinforces the lift on hover rather than establishing rest-state depth.
- **Accent glow** (`0 0 40px -10px var(--accent)`): a diffuse halo, used sparingly behind accent-marked elements.

### Named Rules
**The Motion-Over-Shadow Rule.** Depth is earned by moving toward the viewer (tilt, z-translate, blur), not by stacking darker shadows. A flat element with no motion stays visually flat — that's the honest state, not a bug to shadow away.

## 5. Components

### Buttons
- **Shape:** rounded-xl (12px radius).
- **Primary (`.glass-btn`):** frosted glass — `backdrop-filter: blur(16px) saturate(1.7)`, a diagonal light/dark gradient sheen, 1px translucent border, tinted per context via `--glass-tint` (brand colors for Resume/LinkedIn/GitHub, Signal Amber for active states).
- **Hover:** lifts 2px (`translate: 0 -2px`), border brightens, glass shadow deepens — no color change, the material itself responds.
- **Active (`.glass-btn-active`):** tint shifts to Signal Amber at a theme-aware mix percentage (78% light / 62% dark), text flips to the theme's contrast color.
- **Ghost / icon-only:** same glass treatment at smaller padding (theme toggle, hamburger menu, scroll-to-top).

### Cards
- **Corner Style:** rounded-xl (12px).
- **Background:** Panel Charcoal.
- **Border:** 1px Seam Gray.
- **Depth:** 3D tilt via `useTilt` (repo cards, education cards) plus a cursor-tracked spotlight (`.spotlight-card`) — a soft Signal Amber radial glow that follows the pointer at 13% opacity.
- **Internal Padding:** 20px (`p-5`).

### Badges / Chips
- **Style:** Panel Charcoal background, 1px Seam Gray border, rounded-lg (8px), 6px/12px padding.
- **Hover:** lifts 2px, scales to 1.05, gains an accent-colored glow — a small, springy response (stiffness 300 / damping 20).

### Navigation
- **Style:** fixed top bar, backdrop-blurred, 85%-opacity background over content. Wordmark ("AK") set in Label typography, Cool Steel accent color.
- **Active state:** a glass pill (`.glass-btn`, shared with buttons) slides between links via a shared Framer Motion `layoutId`, rather than a static underline or background swap.
- **Mobile:** hamburger toggle (also `.glass-btn`) expands a full-width glass panel below the bar.

### Signature Component: Typewriter Role Badge
A pill-shaped, mono-type badge in the hero that cycles through a set of personal descriptors with a live typing/deleting animation and a per-word accent color shift. It's the one place personality (outside the professional register) surfaces directly in the interface rather than through motion or material.

## 6. Do's and Don'ts

### Do:
- **Do** reserve Signal Amber (`#FBBF24` / `#B45309`) for a single "idea" moment per view — eyebrow dash, active nav pill, spotlight glow, timeline pulse.
- **Do** build new elevated surfaces as `.glass-btn`-style glass (blur + sheen + translucent border) rather than flat cards with drop shadows.
- **Do** set any structural/metadata text in JetBrains Mono, uppercase, wide tracking; keep all prose in Inter.
- **Do** give every new motion effect a `prefers-reduced-motion` fallback — the video background, idea-stream canvas, and 3D tilt already do this and any addition must match.
- **Do** convey depth through tilt, z-translate, and blur before reaching for a shadow.

### Don't:
- **Don't** build a generic SaaS-template portfolio: no identical icon-heading-text card grids, no `background-clip: text` gradient headlines, no stock "available for hire" badge scaffolding.
- **Don't** ship an overloaded resume-dump: no unstyled walls of CV text with flat hierarchy.
- **Don't** add hard drop shadows as a default elevation strategy; depth here is motion-and-material, not `box-shadow` stacking.
- **Don't** introduce a second saturated accent color alongside Signal Amber — the neutral field only works because the interruption stays singular.
- **Don't** let new motion perform as agency/creative-studio spectacle; every animation must trace back to reinforcing technical credibility for a hiring-manager audience.
