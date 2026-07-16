import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

interface Props {
  theme: 'dark' | 'light'
}

// a rising matrix-style stream of binary digits
interface Stream {
  col: number
  headRow: number // grid row of the bright head; decreases as the stream climbs
  speed: number // rows per second
  len: number // trail length in rows
}

const CELL = 18 // px grid cell (column width / row height)
const FONT = 13
const MAX_STREAMS = 26
const FLIP_CHANCE = 0.02 // per-cell chance to flip 0↔1 each frame

export default function IdeaStream({ theme }: Props) {
  const reduced = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // matrix green, tuned per theme for contrast
    const dark = theme === 'dark'
    const trailColor = dark ? '0, 224, 90' : '21, 128, 61'
    const headColor = dark ? '190, 255, 205' : '5, 46, 22'
    const baseAlpha = dark ? 0.4 : 0.42

    let width = 0
    let height = 0
    let cols = 0
    let rows = 0
    let cells: string[] = [] // char per grid cell, flipped at random for shimmer
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      if (!canvas) return
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      cols = Math.ceil(width / CELL)
      rows = Math.ceil(height / CELL)
      cells = Array.from({ length: cols * rows }, () => (Math.random() < 0.5 ? '0' : '1'))
    }
    resize()
    window.addEventListener('resize', resize)

    const streams: Stream[] = []
    let lastScrollY = window.scrollY
    let scrollBoost = 0
    let spawnTimer = 0
    let lastTime = performance.now()
    let raf = 0

    function spawn() {
      if (streams.length >= MAX_STREAMS) return
      const taken = new Set(streams.map(s => s.col))
      let col = Math.floor(Math.random() * cols)
      for (let tries = 0; taken.has(col) && tries < 8; tries++) {
        col = Math.floor(Math.random() * cols)
      }
      if (taken.has(col)) return
      streams.push({
        col,
        headRow: rows + Math.random() * 6, // enter from below the fold
        speed: 4 + Math.random() * 7,
        len: 8 + Math.floor(Math.random() * 14),
      })
    }

    function frame(now: number) {
      const dt = Math.min(now - lastTime, 50) / 1000
      lastTime = now

      // scroll velocity feeds the rain — streams climb faster while you move
      const scrollDelta = Math.abs(window.scrollY - lastScrollY)
      lastScrollY = window.scrollY
      scrollBoost = Math.min(3, scrollBoost * 0.92 + scrollDelta * 0.015)

      spawnTimer -= dt * (1 + scrollBoost * 2)
      if (spawnTimer <= 0) {
        spawn()
        spawnTimer = 0.25 + Math.random() * 0.35
      }

      // shimmer: occasionally flip digits in place
      for (let i = 0; i < cells.length * FLIP_CHANCE; i++) {
        const idx = Math.floor(Math.random() * cells.length)
        cells[idx] = cells[idx] === '0' ? '1' : '0'
      }

      ctx!.clearRect(0, 0, width * dpr, height * dpr)
      ctx!.save()
      ctx!.scale(dpr, dpr)
      ctx!.font = `${FONT}px ui-monospace, SFMono-Regular, Menlo, monospace`
      ctx!.textAlign = 'center'

      for (let i = streams.length - 1; i >= 0; i--) {
        const s = streams[i]
        s.headRow -= s.speed * dt * (1 + scrollBoost)

        // stream is gone once its tail clears the top
        if (s.headRow + s.len < 0) {
          streams.splice(i, 1)
          continue
        }

        const x = s.col * CELL + CELL / 2
        const head = Math.round(s.headRow)
        for (let j = 0; j < s.len; j++) {
          const row = head + j // trail hangs below the rising head
          if (row < 0 || row >= rows) continue
          const fade = 1 - j / s.len
          const alpha = baseAlpha * fade * fade
          if (j === 0) {
            ctx!.fillStyle = `rgba(${headColor}, ${Math.min(1, baseAlpha * 1.9)})`
          } else {
            ctx!.fillStyle = `rgba(${trailColor}, ${alpha})`
          }
          ctx!.fillText(cells[s.col * rows + row] ?? '0', x, row * CELL + FONT)
        }
      }

      ctx!.restore()
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [reduced, theme])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
