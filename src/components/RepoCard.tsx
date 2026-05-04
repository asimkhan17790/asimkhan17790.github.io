import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Star, ExternalLink, Code } from 'lucide-react'
import { scaleIn } from '../lib/motion'
import type { GithubRepo } from '../hooks/useGithubRepos'

interface Props { repo: GithubRepo }

const LANG_COLORS: Record<string, string> = {
  Python: '#3776ab', JavaScript: '#f7df1e', TypeScript: '#3178c6',
  Java: '#b07219', HTML: '#e34c26', CSS: '#563d7c', Shell: '#89e051',
}

export default function RepoCard({ repo }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const sRotX = useSpring(rotX, { stiffness: 150, damping: 20 })
  const sRotY = useSpring(rotY, { stiffness: 150, damping: 20 })

  function onMouseMove(e: { clientX: number; clientY: number }) {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    rotX.set(((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -7)
    rotY.set(((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 7)
  }

  function onMouseLeave() { rotX.set(0); rotY.set(0) }

  const updated = new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

  return (
    <motion.a
      ref={ref}
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      variants={scaleIn}
      style={{ transformPerspective: 800, rotateX: sRotX, rotateY: sRotY, background: 'var(--card)' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="block rounded-xl p-5 border border-color h-full"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <Code size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
          <span className="font-medium text-sm truncate">{repo.name}</span>
        </div>
        <ExternalLink size={13} className="text-muted shrink-0 mt-0.5" />
      </div>
      <p className="text-xs text-muted leading-relaxed mb-4 line-clamp-3">{repo.description ?? 'No description.'}</p>
      <div className="flex items-center gap-3 text-xs text-muted mt-auto">
        {repo.language && (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: LANG_COLORS[repo.language] ?? 'var(--muted)' }} />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && <span className="flex items-center gap-1"><Star size={11} />{repo.stargazers_count}</span>}
        <span className="ml-auto">{updated}</span>
      </div>
    </motion.a>
  )
}
