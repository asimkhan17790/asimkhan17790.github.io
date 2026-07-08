import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

interface Props {
  active: string
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

export default function Nav({ active, theme, toggleTheme }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b border-color" style={{ background: 'color-mix(in srgb, var(--bg) 85%, transparent)' }}>
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#hero" className="font-mono text-sm font-medium" style={{ color: 'var(--accent)' }}>
          AK
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map(link => {
            const sectionId = link.href.slice(1)
            const isActive = active === sectionId
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 text-sm rounded-md transition-colors ${
                  isActive ? 'font-medium' : 'text-muted hover:text-fg'
                }`}
                style={isActive ? { color: 'var(--accent)' } : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="glass-btn absolute inset-0 rounded-md"
                    style={{ translate: '0 0' }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} toggle={toggleTheme} />
          <button
            className="glass-btn md:hidden p-2 rounded-lg"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-color overflow-hidden"
            style={{ background: 'var(--bg)' }}
          >
            {LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-6 py-3 text-sm hover:bg-card transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
