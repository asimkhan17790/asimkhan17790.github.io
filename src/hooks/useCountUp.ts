import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

export function useCountUp(value: string) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const animated = useRef(false)

  const match = value.match(/^([\d.]+)([A-Za-z]*)(\+?)$/)
  const [display, setDisplay] = useState(() =>
    match ? `0${match[2]}${match[3]}` : value
  )

  useEffect(() => {
    if (!inView || animated.current || !match) return
    animated.current = true
    const target = parseFloat(match[1])
    const unit = match[2]
    const plus = match[3]
    const controls = animate(0, target, {
      duration: 1.5,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate(v) {
        setDisplay(`${Math.round(v)}${unit}${plus}`)
      },
    })
    return () => controls.stop()
  }, [inView])

  return { ref, display }
}
