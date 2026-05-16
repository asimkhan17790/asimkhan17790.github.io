import { useState, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, fadeUp } from '../lib/motion'
import { useGithubRepos } from '../hooks/useGithubRepos'
import RepoCard from './RepoCard'

const SKELETONS = Array.from({ length: 6 }, (_, i) => i)

function SkeletonCard() {
  return (
    <div className="rounded-xl p-5 border border-color animate-pulse" style={{ background: 'var(--card)' }}>
      <div className="h-4 rounded w-2/3 mb-3" style={{ background: 'var(--border)' }} />
      <div className="h-3 rounded w-full mb-1" style={{ background: 'var(--border)' }} />
      <div className="h-3 rounded w-4/5" style={{ background: 'var(--border)' }} />
    </div>
  )
}

export default function Projects() {
  const { repos, loading } = useGithubRepos()
  const reduced = useReducedMotion()
  const [filter, setFilter] = useState<string>('All')
  const languages = useMemo(() => ['All', ...Array.from(new Set(repos.map(r => r.language).filter(Boolean) as string[]))], [repos])
  const filtered = useMemo(() => filter === 'All' ? repos : repos.filter(r => r.language === filter), [repos, filter])
  return (
    <section id="projects" className="py-20 px-6 max-w-5xl mx-auto">
      <motion.div variants={reduced ? fadeUp : staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}>
        <motion.p variants={fadeUp} className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>Projects</motion.p>
        <motion.h2 variants={fadeUp} className="text-3xl font-bold mb-4">{"What I've built."}</motion.h2>

        {!loading && languages.length > 1 && (
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-8">
            {languages.map(lang => (
              <button key={lang} onClick={() => setFilter(lang)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${filter === lang ? 'text-white border-transparent' : 'border-color text-muted hover:text-fg'}`}
                style={filter === lang ? { background: 'var(--accent)', borderColor: 'var(--accent)' } : undefined}>{lang}</button>
            ))}
          </motion.div>
        )}
        <motion.div key={filter} variants={reduced ? {} : staggerContainer} initial="hidden" animate="visible" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? SKELETONS.map(i => <SkeletonCard key={i} />) : filtered.map(repo => <RepoCard key={repo.id} repo={repo} />)}
        </motion.div>
      </motion.div>
    </section>
  )
}
