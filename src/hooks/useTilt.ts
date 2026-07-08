import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import type { MotionStyle } from 'framer-motion'
import type { MouseEvent } from 'react'
import { trackSpotlight } from '../lib/spotlight'

/** 3D hover tilt for cards: rotates toward the cursor, feeds the spotlight glow. */
export function useTilt(maxDeg = 7) {
  const reduced = useReducedMotion()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(rx, { stiffness: 180, damping: 18 })
  const rotateY = useSpring(ry, { stiffness: 180, damping: 18 })

  function onMouseMove(e: MouseEvent<HTMLElement>) {
    trackSpotlight(e)
    if (reduced) return
    const r = e.currentTarget.getBoundingClientRect()
    rx.set(((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -maxDeg)
    ry.set(((e.clientX - r.left - r.width / 2) / (r.width / 2)) * maxDeg)
  }

  function onMouseLeave() {
    rx.set(0)
    ry.set(0)
  }

  const style: MotionStyle = {
    rotateX,
    rotateY,
    transformPerspective: 900,
    transformStyle: 'preserve-3d',
  }

  return { style, onMouseMove, onMouseLeave }
}
