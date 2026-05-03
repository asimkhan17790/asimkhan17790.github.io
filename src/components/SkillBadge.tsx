import { motion } from 'framer-motion'
import { scaleIn } from '../lib/motion'

interface Props {
  name: string
}

export default function SkillBadge({ name }: Props) {
  return (
    <motion.span
      variants={scaleIn}
      whileHover={{ y: -2, scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border border-color cursor-default"
      style={{ background: 'var(--card)' }}
    >
      {name}
    </motion.span>
  )
}
