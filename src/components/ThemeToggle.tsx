import { Moon, Sun } from 'lucide-react'

interface Props {
  theme: 'dark' | 'light'
  toggle: () => void
}

export default function ThemeToggle({ theme, toggle }: Props) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="p-2 rounded-lg transition-colors hover:bg-card border border-color"
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
