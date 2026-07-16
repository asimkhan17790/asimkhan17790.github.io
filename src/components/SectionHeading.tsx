import { motion, useReducedMotion } from 'framer-motion'
import { tiltUpPure } from '../lib/motion'

interface Props {
  eyebrow: string
  title: string
  center?: boolean
  className?: string
}

const word = {
  hidden: { y: '110%' },
  visible: (i: number) => ({
    y: '0%',
    transition: { delay: i * 0.055, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function SectionHeading({ eyebrow, title, center = false, className = '' }: Props) {
  const reduced = useReducedMotion()
  const words = title.split(' ')

  return (
    <motion.div
      className={`${center ? 'text-center' : ''} ${className}`}
      variants={reduced ? undefined : tiltUpPure}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      style={reduced ? undefined : { transformPerspective: 800, transformStyle: 'preserve-3d' }}
    >
      <p className={`flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-2 ${center ? 'justify-center' : ''}`} style={{ color: 'var(--accent)' }}>
        <motion.span
          className="inline-block h-px w-5 origin-left"
          style={{ background: 'var(--spark)' }}
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.5, ease: 'easeOut' } } }}
        />
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold">
        {reduced ? (
          title
        ) : (
          words.map((w, i) => (
            <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom pb-1 -mb-1">
              <motion.span className="inline-block" custom={i} variants={word}>
                {w}
                {i < words.length - 1 ? ' ' : ''}
              </motion.span>
            </span>
          ))
        )}
      </h2>
    </motion.div>
  )
}
