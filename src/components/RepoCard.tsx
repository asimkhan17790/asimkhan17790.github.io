import { motion } from 'framer-motion'
import { Star, ExternalLink, Code } from 'lucide-react'
import { scaleIn } from '../lib/motion'
import { LANG_COLORS } from '../lib/langColors'
import { useTilt } from '../hooks/useTilt'
import type { GithubRepo } from '../hooks/useGithubRepos'

interface Props { repo: GithubRepo }

export default function RepoCard({ repo }: Props) {
  const tilt = useTilt(8)
  const updated = new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      variants={scaleIn}
      style={{ background: 'var(--card)', ...tilt.style }}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="spotlight-card block rounded-xl p-5 border border-color h-full"
    >
      <motion.div style={{ z: 24 }}>
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
      </motion.div>
    </motion.a>
  )
}
