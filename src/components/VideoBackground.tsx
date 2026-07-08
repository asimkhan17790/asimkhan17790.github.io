import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

interface Props {
  theme: 'dark' | 'light'
}

// seconds of footage advanced per pixel scrolled — scrolling scrubs the timeline
const SCRUB = 0.008
// slow playback drift while idle, so the scene keeps breathing between scrolls
const IDLE_RATE = 0.3

export default function VideoBackground({ theme }: Props) {
  const reduced = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const { scrollYProgress } = useScroll()

  // cinematic push-in: slow zoom + upward drift across the whole page
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-7%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1.32])

  // strongest behind the hero, settles into ambient texture deeper down
  const peak = theme === 'dark' ? 0.55 : 0.3
  const ambient = theme === 'dark' ? 0.22 : 0.11
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.32, 1], [peak, peak, ambient, ambient])

  // letterbox bars frame the hero, then release as content takes over
  const barsOpacity = useTransform(scrollYProgress, [0, 0.14], [theme === 'dark' ? 0.85 : 0.4, 0])

  // scroll-scrubbed playback: video is paused, a rAF clock drives currentTime.
  // scrolling down advances the footage, scrolling up rewinds it.
  useEffect(() => {
    if (reduced) return
    const video = videoRef.current
    if (!video) return
    video.pause()

    let raf = 0
    let smoothed = 0
    let idleClock = 0
    let last = performance.now()

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      idleClock += dt * IDLE_RATE
      const target = idleClock + window.scrollY * SCRUB
      smoothed += (target - smoothed) * Math.min(1, dt * 5)
      const dur = video.duration
      if (dur && Number.isFinite(dur)) {
        const t = ((smoothed % dur) + dur) % dur
        // one video frame of tolerance; avoids redundant seeks
        if (Math.abs(t - video.currentTime) > 1 / 24) video.currentTime = t
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
      <motion.div className="absolute inset-0" style={{ y: reduced ? 0 : y, scale: reduced ? 1 : scale, opacity }}>
        {reduced ? (
          <img
            src="/videos/coding-bg-poster.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            style={{ filter: 'saturate(1.2) contrast(1.12)' }}
            src="/videos/coding-bg.mp4"
            poster="/videos/coding-bg-poster.jpg"
            muted
            playsInline
            preload="auto"
          />
        )}
      </motion.div>
      {/* cinematic grade: warm core, cool edges */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 55% 40%, rgba(251,191,36,0.07) 0%, transparent 55%), radial-gradient(ellipse 140% 120% at 50% 50%, transparent 55%, rgba(18,36,48,0.28) 100%)',
          mixBlendMode: theme === 'dark' ? 'screen' : 'multiply',
        }}
      />
      {/* readability veil — dissolves the footage into the page background */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 75% at 50% 38%, transparent 0%, var(--bg) 82%)' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, color-mix(in srgb, var(--bg) 35%, transparent) 0%, transparent 30%, transparent 70%, color-mix(in srgb, var(--bg) 55%, transparent) 100%)' }}
      />
      {/* letterbox bars over the hero */}
      <motion.div
        className="absolute left-0 right-0 top-0"
        style={{ height: '9vh', opacity: barsOpacity, background: 'linear-gradient(to bottom, #000 55%, transparent)' }}
      />
      <motion.div
        className="absolute left-0 right-0 bottom-0"
        style={{ height: '9vh', opacity: barsOpacity, background: 'linear-gradient(to top, #000 55%, transparent)' }}
      />
    </div>
  )
}
