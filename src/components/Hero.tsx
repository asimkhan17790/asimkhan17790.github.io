import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import { Github, Linkedin, FileText, ChevronDown } from 'lucide-react'
import { profile } from '../data/profile'
import { fadeUp, staggerContainer } from '../lib/motion'
import ThemeToggle from './ThemeToggle'

interface Props {
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

const LABELS: string[] = ['Techie', 'Gamer', 'Music Lover', 'Football Fan', 'Foodie', 'Fitness Freak']

function TypewriterBadge() {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduced) return
    const current = LABELS[index]

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

  const display = reduced ? LABELS.join(' | ') : text

  return (
    <span
      className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-mono font-medium border"
      style={{ borderColor: 'var(--accent)', color: 'var(--accent)', minWidth: '16rem' }}
    >
      <span className="opacity-60 mr-1">I am&nbsp;</span>
      <span className="inline-flex items-center">
        {display}
        {!reduced && (
          <span
            className="ml-0.5 inline-block w-px h-3.5 align-middle"
            style={{ background: 'var(--spark)', animation: 'blink 1s step-end infinite' }}
          />
        )}
      </span>
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
  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 600], [0, 130])
  const contentOpacity = useTransform(scrollY, [0, 450], [1, 0])
  const contentScale = useTransform(scrollY, [0, 600], [1, 0.94])

  // mouse-tracking 3D parallax: the hero block leans toward the cursor
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const sTiltX = useSpring(tiltX, { stiffness: 90, damping: 20 })
  const sTiltY = useSpring(tiltY, { stiffness: 90, damping: 20 })

  function onHeroMove(e: { clientX: number; clientY: number }) {
    if (reduced) return
    tiltX.set(((e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)) * -5)
    tiltY.set(((e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)) * 5)
  }

  function onHeroLeave() {
    tiltX.set(0)
    tiltY.set(0)
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-14"
      onMouseMove={onHeroMove}
      onMouseLeave={onHeroLeave}
    >
      {/* Noise texture */}
      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="hero-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>
      <div className="fixed inset-0 pointer-events-none" style={{ filter: 'url(#hero-noise)', opacity: 0.035 }} />


      <motion.div
        className="relative z-10 text-center max-w-3xl mx-auto px-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={
          reduced
            ? undefined
            : {
                y: contentY,
                opacity: contentOpacity,
                scale: contentScale,
                rotateX: sTiltX,
                rotateY: sTiltY,
                transformPerspective: 1100,
                transformStyle: 'preserve-3d',
              }
        }
      >
        <motion.h1 variants={fadeUp} className="text-5xl sm:text-7xl font-bold tracking-tight mb-3" style={reduced ? undefined : { z: 60 }}>
          <span className="text-shimmer">{profile.name}</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="font-mono uppercase tracking-wider text-[clamp(0.8rem,2.4vw,1rem)] font-medium mb-5"
          style={{ color: 'var(--accent)', ...(reduced ? {} : { z: 45 }) }}
        >
          {profile.title} · {profile.company}
        </motion.p>

        <motion.div variants={fadeUp} className="mb-4" style={reduced ? undefined : { z: 30 }}>
          <TypewriterBadge />
        </motion.div>

        <motion.p variants={fadeUp} className="text-[clamp(0.85rem,3.2vw,1.25rem)] text-muted mx-auto mb-8 leading-relaxed" style={reduced ? undefined : { z: 20 }}>
          {profile.tagline}
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3" style={reduced ? undefined : { z: 40 }}>
          <MagneticButton
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white"
            style={{ '--glass-tint': '#3F3F46' } as React.CSSProperties}
          >
            <FileText size={15} />
            Resume
          </MagneticButton>
          <MagneticButton
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white"
            style={{ '--glass-tint': '#0A66C2' } as React.CSSProperties}
          >
            <Linkedin size={15} />
            LinkedIn
          </MagneticButton>
          <MagneticButton
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white"
            style={{ '--glass-tint': '#181717' } as React.CSSProperties}
          >
            <Github size={15} />
            GitHub
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
