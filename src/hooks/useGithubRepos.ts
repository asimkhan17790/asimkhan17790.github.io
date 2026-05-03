import { useEffect, useState } from 'react'

export interface GithubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  updated_at: string
  fork: boolean
  topics: string[]
}

const FALLBACK: GithubRepo[] = [
  {
    id: 1,
    name: 'pythonLearning',
    description: 'My journey to mastering Python — exercises, projects, and notes.',
    html_url: 'https://github.com/asimkhan17790/pythonLearning',
    language: 'Python',
    stargazers_count: 0,
    updated_at: '2024-01-01T00:00:00Z',
    fork: false,
    topics: [],
  },
  {
    id: 2,
    name: 'ai-practise',
    description: 'Experiments and learning in Artificial Intelligence.',
    html_url: 'https://github.com/asimkhan17790/ai-practise',
    language: 'Python',
    stargazers_count: 0,
    updated_at: '2024-01-01T00:00:00Z',
    fork: false,
    topics: [],
  },
  {
    id: 3,
    name: 'mindtherapy',
    description: 'Personal development and wellness tools.',
    html_url: 'https://github.com/asimkhan17790/mindtherapy',
    language: 'JavaScript',
    stargazers_count: 0,
    updated_at: '2024-01-01T00:00:00Z',
    fork: false,
    topics: [],
  },
]

const CACHE_KEY = 'gh_repos_cache'
const CACHE_TTL = 60 * 60 * 1000 // 1 hour

export function useGithubRepos() {
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const cached = sessionStorage.getItem(CACHE_KEY)
    if (cached) {
      try {
        const { data, ts } = JSON.parse(cached)
        if (Date.now() - ts < CACHE_TTL) {
          setRepos(data)
          setLoading(false)
          return
        }
      } catch {
        // stale or corrupt — refetch
      }
    }

    fetch('https://api.github.com/users/asimkhan17790/repos?per_page=100&sort=updated')
      .then(r => {
        if (!r.ok) throw new Error('API error')
        return r.json()
      })
      .then((data: GithubRepo[]) => {
        const filtered = data
          .filter(r => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: filtered, ts: Date.now() }))
        setRepos(filtered)
        setLoading(false)
      })
      .catch(() => {
        setRepos(FALLBACK)
        setError(true)
        setLoading(false)
      })
  }, [])

  return { repos, loading, error }
}
