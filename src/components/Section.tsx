import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../lib/motion'
import type { ReactNode } from 'react'

interface Props {
  id: string
  className?: string
  children: ReactNode
}

export default function Section({ id, className = '', children }: Props) {
  const reduced = useReducedMotion()

  return (
    <motion.section
      id={id}
      className={`py-20 px-6 max-w-5xl mx-auto ${className}`}
      variants={reduced ? fadeUp : staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.section>
  )
}
