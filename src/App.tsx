import { useTheme } from './hooks/useTheme'
import { useActiveSection } from './hooks/useActiveSection'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Nav from './components/Nav'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

const SECTIONS = ['hero', 'about', 'experience', 'skills', 'projects', 'education', 'contact']

function ParallaxBackground() {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 5000], [0, -320])

  return (
    <>
      <motion.div
        className="fixed pointer-events-none"
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: -320,
          backgroundImage: 'url(/asim_image.jpg)',
          backgroundPosition: 'center 15%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          y: reduced ? 0 : y,
          opacity: 0.22,
          zIndex: 0,
        }}
      />
      <div
        className="fixed pointer-events-none"
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: -320,
          background: 'radial-gradient(ellipse 75% 70% at 50% 35%, transparent 0%, var(--bg) 78%)',
          zIndex: 0,
        }}
      />
    </>
  )
}

export default function App() {
  const { theme, toggle } = useTheme()
  const active = useActiveSection(SECTIONS)

  return (
    <>
      <ParallaxBackground />
      <ScrollProgress />
      <Nav active={active} theme={theme} toggleTheme={toggle} />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero theme={theme} toggleTheme={toggle} />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Footer theme={theme} toggleTheme={toggle} />
      </div>
    </>
  )
}
