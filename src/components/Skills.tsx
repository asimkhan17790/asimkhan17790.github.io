import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, fadeUp } from '../lib/motion'
import { skillGroups } from '../data/skills'
import SkillBadge from './SkillBadge'

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
        <motion.p variants={fadeUp} className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
          Skills
        </motion.p>
        <motion.h2 variants={fadeUp} className="text-3xl font-bold mb-10">What I work with.</motion.h2>

        <div className="space-y-8">
          {skillGroups.map(group => (
            <motion.div key={group.category} variants={fadeUp}>
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted mb-3">{group.category}</h3>
              <motion.div
                className="flex flex-wrap gap-2"
                variants={reduced ? {} : staggerContainer}
              >
                {group.skills.map(skill => (
                  <SkillBadge key={skill} name={skill} />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
