import { useScroll, useTransform, motion, useReducedMotion } from 'framer-motion'

export default function ScrollBackground() {
  const { scrollYProgress } = useScroll()
  const reduced = useReducedMotion()

  const bgPosY = useTransform(scrollYProgress, [0, 1], ['20%', '58%'])
  const imgOpacity = useTransform(scrollYProgress, [0, 0.08, 0.75, 1], [0, 0.2, 0.14, 0.06])

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <div className="absolute inset-0" style={{ background: 'var(--bg)', transition: 'background 0.2s ease' }} />

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

      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 65% 65% at 50% 38%, transparent 0%, var(--bg) 72%)' }}
      />

      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: '180px', background: 'linear-gradient(to bottom, transparent, var(--bg))' }}
      />
    </div>
  )
}
