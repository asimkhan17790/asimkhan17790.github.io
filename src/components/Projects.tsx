import { useState, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, fadeUp } from '../lib/motion'
import { useGithubRepos } from '../hooks/useGithubRepos'
import RepoCard from './RepoCard'
import SectionHeading from './SectionHeading'

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
  const { repos, loading, error } = useGithubRepos()
  const reduced = useReducedMotion()
  const [filter, setFilter] = useState<string>('All')
  const languages = useMemo(() => ['All', ...Array.from(new Set(repos.map(r => r.language).filter(Boolean) as string[]))], [repos])
  const filtered = useMemo(() => filter === 'All' ? repos : repos.filter(r => r.language === filter), [repos, filter])
  return (
    <section id="projects" className="py-20 px-6 max-w-5xl mx-auto">
      <motion.div variants={reduced ? fadeUp : staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}>
        <SectionHeading eyebrow="Projects" title="What I've built." className="mb-4" />

        {!loading && error && (
          <motion.p variants={fadeUp} className="text-xs text-muted mb-6">
            Showing a curated selection — live GitHub data is temporarily unavailable.
          </motion.p>
        )}

        {!loading && languages.length > 1 && (
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-8">
            {languages.map(lang => (
              <button key={lang} onClick={() => setFilter(lang)}
                className={`glass-btn px-3.5 py-1.5 rounded-full text-xs font-medium ${filter === lang ? 'glass-btn-active' : 'text-muted hover:text-fg'}`}>{lang}</button>
            ))}
          </motion.div>
        )}

        {!loading && filtered.length === 0 ? (
          <motion.div variants={fadeUp} className="rounded-xl border border-color p-10 text-center" style={{ background: 'var(--card)' }}>
            <p className="text-sm text-muted mb-3">No projects to show here yet.</p>
            <a href="https://github.com/asimkhan17790" target="_blank" rel="noopener noreferrer" className="glass-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium">
              View GitHub profile instead
            </a>
          </motion.div>
        ) : (
          <motion.div key={filter} variants={reduced ? {} : staggerContainer} initial="hidden" animate="visible" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? SKELETONS.map(i => <SkeletonCard key={i} />) : filtered.map(repo => <RepoCard key={repo.id} repo={repo} />)}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
