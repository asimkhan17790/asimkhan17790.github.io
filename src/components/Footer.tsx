import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

interface Props { theme: 'dark' | 'light'; toggleTheme: () => void }

export default function Footer({ theme, toggleTheme }: Props) {
  return (
    <footer className="border-t border-color py-6 px-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-xs text-muted">{`© ${new Date().getFullYear()} Asim Khan`}</span>
        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} toggle={toggleTheme} />
          <motion.button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="glass-btn p-2 rounded-lg"
            aria-label="Scroll to top">
            <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
