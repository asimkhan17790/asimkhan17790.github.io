import { useEffect, useState } from 'react'

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
      )
      obs.observe(el)
      return obs
    })

    return () => {
      observers.forEach((obs, i) => {
        const el = document.getElementById(ids[i])
        if (obs && el) obs.unobserve(el)
      })
    }
  }, [ids])

  return active
}
