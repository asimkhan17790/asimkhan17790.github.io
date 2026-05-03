import { useTheme } from './hooks/useTheme'
import { useActiveSection } from './hooks/useActiveSection'
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

export default function App() {
  const { theme, toggle } = useTheme()
  const active = useActiveSection(SECTIONS)

  return (
    <>
      <ScrollProgress />
      <Nav active={active} theme={theme} toggleTheme={toggle} />
      <main>
        <Hero theme={theme} toggleTheme={toggle} />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer theme={theme} toggleTheme={toggle} />
    </>
  )
}
