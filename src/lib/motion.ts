import type { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: { y: -4, scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 20 } },
}

/** 3D scroll reveal: content tilts up out of the page instead of just fading in. Pair with `transformPerspective` + `transformStyle: 'preserve-3d'` on the same element. */
export const tiltUp: Variants = {
  hidden: { opacity: 0, y: 36, rotateX: 10, z: -50 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    z: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Same tilt, no opacity/y change — for wrapping already-visible content (e.g. SectionHeading) with a pure 3D tilt-in. */
export const tiltUpPure: Variants = {
  hidden: { rotateX: 8, z: -30 },
  visible: { rotateX: 0, z: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

/** Springy pop with a brief brightness flash — for grid items that should feel like they just landed, not just faded in. */
export const popIn: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.85, filter: 'brightness(1.7)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'brightness(1)',
    transition: {
      type: 'spring',
      stiffness: 340,
      damping: 18,
      filter: { duration: 0.35, ease: 'easeOut' },
    },
  },
}
