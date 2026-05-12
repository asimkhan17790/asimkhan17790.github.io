import { useScroll, useTransform, motion, useReducedMotion } from 'framer-motion'

export default function ScrollBackground() {
  const { scrollYProgress } = useScroll()
  const reduced = useReducedMotion()

  // Ghost image parallax — shifts down as page scrolls
  const bgPosY = useTransform(scrollYProgress, [0, 1], ['20%', '58%'])
  const imgOpacity = useTransform(scrollYProgress, [0, 0.08, 0.75, 1], [0, 0.2, 0.14, 0.06])

  // Football bezier path: feet (bottom-center) → top-right goal corner
  // Quadratic bezier: P0=(42,72), P1=(28,8), P2=(84,18) in vw/vh
  const ballProgress = useTransform(scrollYProgress, [0.02, 0.92], [0, 1])

  const ballLeft = useTransform(ballProgress, (t: number) => {
    const x = (1 - t) ** 2 * 42 + 2 * (1 - t) * t * 28 + t ** 2 * 84
    return `${x}vw`
  })
  const ballTop = useTransform(ballProgress, (t: number) => {
    const y = (1 - t) ** 2 * 72 + 2 * (1 - t) * t * 8 + t ** 2 * 18
    return `${y}vh`
  })
  const ballRotate = useTransform(scrollYProgress, [0, 1], [0, 900])
  const ballOpacity = useTransform(scrollYProgress, [0.01, 0.05, 0.88, 0.96], [0, 0.7, 0.7, 0])
  const ballScale = useTransform(ballProgress, [0, 0.5, 1], [1.3, 1.6, 0.75])

  // Goal net fades in as ball approaches
  const goalOpacity = useTransform(scrollYProgress, [0.78, 0.94], [0, 0.45])
  const goalScale = useTransform(scrollYProgress, [0.78, 0.94], [0.8, 1])

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base background color */}
      <div className="absolute inset-0" style={{ background: 'var(--bg)', transition: 'background 0.2s ease' }} />

      {/* Ghost photo with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/asim_image.jpg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPositionX: 'center',
          backgroundPositionY: reduced ? '20%' : bgPosY,
          opacity: reduced ? 0.18 : imgOpacity,
        }}
      />

      {/* Radial vignette — dissolves edges into background */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 65% 65% at 50% 38%, transparent 0%, var(--bg) 72%)' }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: '180px', background: 'linear-gradient(to bottom, transparent, var(--bg))' }}
      />

      {!reduced && (
        <>
          {/* Football */}
          <motion.div
            style={{
              position: 'fixed',
              left: ballLeft,
              top: ballTop,
              rotate: ballRotate,
              opacity: ballOpacity,
              scale: ballScale,
              fontSize: '2.2rem',
              lineHeight: 1,
              filter: 'drop-shadow(0 2px 12px rgba(255,255,255,0.25))',
            }}
          >
            ⚽
          </motion.div>

          {/* Goal net */}
          <motion.div
            style={{
              position: 'fixed',
              right: '8vw',
              top: '14vh',
              opacity: goalOpacity,
              scale: goalScale,
              transformOrigin: 'top right',
            }}
          >
            <svg width="110" height="90" viewBox="0 0 110 90" fill="none">
              <rect x="2" y="2" width="106" height="68" stroke="white" strokeWidth="2.5" fill="none" strokeOpacity="0.55" rx="1"/>
              {[14, 26, 38, 50, 62].map(y => (
                <line key={y} x1="4" y1={y} x2="106" y2={y} stroke="white" strokeWidth="0.7" strokeOpacity="0.35"/>
              ))}
              {[14, 26, 38, 50, 62, 74, 86, 98].map(x => (
                <line key={x} x1={x} y1="4" x2={x} y2="68" stroke="white" strokeWidth="0.7" strokeOpacity="0.35"/>
              ))}
              <text x="55" y="82" textAnchor="middle" fill="white" fillOpacity="0.5" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="3">GOAL</text>
            </svg>
          </motion.div>
        </>
      )}
    </div>
  )
}
