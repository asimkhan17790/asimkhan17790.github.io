import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, fadeUp, tiltUp } from '../lib/motion'
import { skillGroups } from '../data/skills'
import type { SkillGroup } from '../data/skills'
import SkillBadge from './SkillBadge'
import SectionHeading from './SectionHeading'
import { useTilt } from '../hooks/useTilt'

function SkillGroupCard({ group }: { group: SkillGroup }) {
  const reduced = useReducedMotion()
  const tilt = useTilt(4)
  const wide = group.skills.length >= 6

  return (
    <motion.div
      variants={reduced ? fadeUp : tiltUp}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className={`spotlight-card rounded-xl border border-color p-5 ${wide ? 'md:col-span-2' : ''}`}
      style={{
        background: 'color-mix(in srgb, var(--card) 85%, transparent)',
        ...tilt.style,
      }}
    >
      <motion.div style={reduced ? undefined : { z: 16 }}>
        <h3 className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted mb-4">
          <span className="inline-block h-px w-4" style={{ background: 'var(--border)' }} />
          {group.category}
        </h3>
        <motion.div className="flex flex-wrap gap-2" variants={reduced ? {} : staggerContainer}>
          {group.skills.map(skill => (
            <SkillBadge key={skill} name={skill} />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function Skills() {
  const reduced = useReducedMotion()

  return (
    <section id="skills" className="py-20 px-6 max-w-5xl mx-auto">
      <motion.div
        variants={reduced ? fadeUp : staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <SectionHeading eyebrow="Skills" title="What I work with." className="mb-10" />

        <div className="grid md:grid-cols-2 gap-4">
          {skillGroups.map(group => (
            <SkillGroupCard key={group.category} group={group} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
