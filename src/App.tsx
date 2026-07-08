import { useTheme } from './hooks/useTheme'
import { useActiveSection } from './hooks/useActiveSection'
import Nav from './components/Nav'
import VideoBackground from './components/VideoBackground'
import IdeaStream from './components/IdeaStream'
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

export default function App() {
  const { theme, toggle } = useTheme()
  const active = useActiveSection(SECTIONS)

  return (
    <>
      <VideoBackground theme={theme} />
      <IdeaStream theme={theme} />
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
