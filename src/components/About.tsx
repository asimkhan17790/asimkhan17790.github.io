import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { profile } from '../data/profile'
import { fadeUp, slideInLeft } from '../lib/motion'
import { projects } from '../data/projects'
import { LANG_COLORS } from '../lib/langColors'
import { useTilt } from '../hooks/useTilt'
import SectionHeading from './SectionHeading'

const flashCard = {
  hidden: { opacity: 0, y: 52, scale: 0.8, filter: 'brightness(2)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'brightness(1)',
    transition: {
      delay: i * 0.14,
      type: 'spring' as const,
      stiffness: 340,
      damping: 16,
      filter: { delay: i * 0.14, duration: 0.3, ease: 'easeOut' },
    },
  }),
}

function ProjectCard({ name, description, url, language, index, inView }: {
  name: string; description: string; url: string; language: string; index: number; inView: boolean
}) {
  const tilt = useTilt(8)
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      custom={index}
      variants={flashCard}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover={{ y: -5, scale: 1.04, transition: { type: 'spring', stiffness: 400, damping: 18 } }}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="spotlight-card rounded-xl p-5 border border-color flex flex-col gap-2"
      style={{ background: 'var(--card)', ...tilt.style }}
    >
      <div className="font-semibold text-sm leading-snug">{name}</div>
      <div className="text-xs text-muted leading-relaxed flex-1">{description}</div>
      <div className="flex items-center gap-1.5 mt-1">
        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: LANG_COLORS[language] ?? 'var(--accent)' }} />
        <span className="text-xs text-muted">{language}</span>
      </div>
    </motion.a>
  )
}

export default function About() {
  const reduced = useReducedMotion()
  const gridRef = useRef<HTMLDivElement>(null)
  const inView = useInView(gridRef, { once: true, amount: 0.2 })

  return (
    <section id="about" className="py-20 px-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={reduced ? fadeUp : slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionHeading eyebrow="About" title="Building systems that scale." className="mb-6" />
          <p className="text-muted leading-relaxed">{profile.bio}</p>
        </motion.div>

        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-muted mb-3">Side projects</p>
          <div ref={gridRef} className="grid grid-cols-2 gap-4">
            {projects.map((p, i) => (
              <ProjectCard key={p.url} {...p} index={reduced ? 0 : i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
