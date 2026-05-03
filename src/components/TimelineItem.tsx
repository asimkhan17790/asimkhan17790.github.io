import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '../lib/motion'
import type { Role } from '../data/experience'

interface Props {
  role: Role
  isLast: boolean
}

export default function TimelineItem({ role, isLast }: Props) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      variants={reduced ? {} : fadeUp}
      className="relative pl-6 pb-8"
    >
      {/* vertical line */}
      {!isLast && (
        <span className="absolute left-[7px] top-3 bottom-0 w-px" style={{ background: 'var(--border)' }} />
      )}
      {/* dot */}
      <span
        className="absolute left-0 top-[6px] w-3.5 h-3.5 rounded-full border-2"
        style={{ borderColor: 'var(--accent)', background: 'var(--bg)' }}
      />

      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
        <h4 className="font-semibold">{role.title}</h4>
        <span className="text-xs text-muted font-mono">{role.period}</span>
      </div>
      <ul className="space-y-1.5">
        {role.bullets.map((b, i) => (
          <li key={i} className="text-sm text-muted leading-relaxed flex gap-2">
            <span className="mt-[5px] w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--accent)' }} />
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
