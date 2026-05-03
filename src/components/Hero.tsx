import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, FileText, ChevronDown } from 'lucide-react'
import { profile } from '../data/profile'
import { fadeUp, staggerContainer } from '../lib/motion'
import ThemeToggle from './ThemeToggle'

interface Props {
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

export default function Hero({ theme, toggleTheme }: Props) {
  const { scrollY } = useScroll()
  const reduced = useReducedMotion()
  const blobY = useTransform(scrollY, [0, 400], [0, reduced ? 0 : 80])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-14">
      {/* Background blobs */}
      <motion.div
        className="absolute top-1/4 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'var(--accent)', y: blobY }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-40 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'var(--accent)' }}
      />

      <motion.div
        className="relative z-10 text-center max-w-3xl mx-auto px-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp} className="mb-4">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium border"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent)', background: 'color-mix(in srgb, var(--accent) 10%, transparent)' }}
          >
            VP Engineering · Goldman Sachs
          </span>
        </motion.div>

        <motion.h1 variants={fadeUp} className="text-5xl sm:text-7xl font-bold tracking-tight mb-4">
          {profile.name}
        </motion.h1>

        <motion.p variants={fadeUp} className="text-lg sm:text-xl text-muted max-w-xl mx-auto mb-8 leading-relaxed">
          {profile.tagline}
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent)' }}
          >
            <FileText size={15} />
            Resume
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm border border-color hover:bg-card transition-colors"
          >
            <Github size={15} />
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm border border-color hover:bg-card transition-colors"
          >
            <Linkedin size={15} />
            LinkedIn
          </a>
          <ThemeToggle theme={theme} toggle={toggleTheme} />
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
        animate={reduced ? {} : { y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        aria-label="Scroll down"
      >
        <ChevronDown size={24} />
      </motion.a>
    </section>
  )
}
