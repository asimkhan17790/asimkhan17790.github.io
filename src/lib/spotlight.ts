import type { MouseEvent } from 'react'

/** Tracks the cursor inside a `.spotlight-card`, feeding the CSS radial-gradient hover glow. */
export function trackSpotlight(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}
