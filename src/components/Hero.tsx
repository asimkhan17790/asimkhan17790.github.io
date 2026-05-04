import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion, useMotionValue, useSpring } from 'framer-motion'
import { Github, Linkedin, FileText, ChevronDown } from 'lucide-react'
import { profile } from '../data/profile'
import { fadeUp, staggerContainer } from '../lib/motion'
import ThemeToggle from './ThemeToggle'

interface Props {
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

const LABELS: { text: string; color: string }[] = [
  { text: 'Techie', color: '#4f93ffff' },
  { text: 'Gamer', color: '#8b5cf6' },
  { text: 'Music Lover', color: '#f43f5e' },
  { text: 'Football Fan', color: '#22c55e' },
  { text: 'Foodie', color: '#f97316' },
  { text: 'Fitness Freak', color: '#0320ffff' }
]

function TypewriterBadge() {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduced) return
    const current = LABELS[index].text

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), 1500)
      return () => clearTimeout(t)
    }
    if (deleting && text === '') {
      const t = setTimeout(() => {
        setDeleting(false)
        setIndex((i) => (i + 1) % LABELS.length)
      }, 300)
      return () => clearTimeout(t)
    }

    const speed = deleting ? 45 : 90
    const t = setTimeout(() => {
      setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1))
    }, speed)
    return () => clearTimeout(t)
  }, [text, deleting, index, reduced])

  const color = LABELS[index].color
  const display = reduced ? LABELS.map(l => l.text).join(' | ') : text

  return (
    <span
      className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-mono font-medium border"
      style={{ borderColor: 'var(--accent)', color: 'var(--accent)', minWidth: '16rem' }}
    >
      <span className="opacity-60 mr-1">I am&nbsp;</span>
      <motion.span
        animate={{ color }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="inline-flex items-center"
      >
        {display}
        {!reduced && (
          <motion.span
            animate={{ background: color }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="ml-0.5 inline-block w-px h-3.5 align-middle"
            style={{ animation: 'blink 1s step-end infinite' }}
          />
        )}
      </motion.span>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </span>
  )
}

interface MagneticProps {
  children: React.ReactNode
  href: string
  target?: string
  rel?: string
  className?: string
  style?: React.CSSProperties
}

function MagneticButton({ children, href, target, rel, className, style }: MagneticProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })

  function onMove(e: { clientX: number; clientY: number }) {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.3)
    y.set((e.clientY - r.top - r.height / 2) * 0.3)
  }

  function onLeave() { x.set(0); y.set(0) }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      style={{ x: sx, y: sy, ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      {children}
    </motion.a>
  )
}

export default function Hero({ theme, toggleTheme }: Props) {
  const reduced = useReducedMotion()

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-14">
      {/* Noise texture */}
      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="hero-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>
      <div className="absolute inset-0 pointer-events-none" style={{ filter: 'url(#hero-noise)', opacity: 0.035 }} />

      {/* Drifting blobs */}
      <motion.div
        className="absolute top-1/4 -left-40 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'var(--accent)', opacity: 0.15 }}
        animate={reduced ? {} : { x: [0, 30, -20, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-40 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'var(--accent)', opacity: 0.08 }}
        animate={reduced ? {} : { x: [0, -25, 20, 0], y: [0, 20, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <motion.div
        className="relative z-10 text-center max-w-3xl mx-auto px-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={fadeUp} className="text-5xl sm:text-7xl font-bold tracking-tight mb-4">
          <span className="text-shimmer">{profile.name}</span>
        </motion.h1>

        <motion.div variants={fadeUp} className="mb-4">
          <TypewriterBadge />
        </motion.div>

        <motion.p variants={fadeUp} className="text-lg sm:text-xl text-muted max-w-xl mx-auto mb-8 leading-relaxed">
          {profile.tagline}
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3">
          <MagneticButton
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent)' }}
          >
            <FileText size={15} />
            Resume
          </MagneticButton>
          <MagneticButton
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm border border-color hover:bg-card transition-colors"
          >
            <Github size={15} />
            GitHub
          </MagneticButton>
          <MagneticButton
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm border border-color hover:bg-card transition-colors"
          >
            <Linkedin size={15} />
            LinkedIn
          </MagneticButton>
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
