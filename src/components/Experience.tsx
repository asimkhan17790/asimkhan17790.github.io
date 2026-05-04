import { motion, useReducedMotion } from 'framer-motion'
import { staggerContainer, fadeUp } from '../lib/motion'
import { experience } from '../data/experience'
import TimelineItem from './TimelineItem'
import LogoBadge from './LogoBadge'

export default function Experience() {
  const reduced = useReducedMotion()

  return (
    <section id="experience" className="py-20 px-6 max-w-5xl mx-auto">
      <motion.div
        variants={reduced ? fadeUp : staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        <motion.p variants={fadeUp} className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
          Experience
        </motion.p>
        <motion.h2 variants={fadeUp} className="text-3xl font-bold mb-12">Where I've worked.</motion.h2>

        <div className="space-y-10">
          {experience.map(job => (
            <motion.div key={job.company} variants={fadeUp}>
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold font-mono shrink-0 border border-color overflow-hidden"
                  style={{ background: 'var(--card)', color: 'var(--accent)' }}
                >
                  <LogoBadge src={job.logoUrl} alt={job.company} fallback={job.logo} />
                </span>
                <div>
                  <h3 className="font-semibold">{job.company}</h3>
                  <p className="text-xs text-muted">{job.location}</p>
                </div>
              </div>

              <div className="ml-2">
                {job.roles.map((role, i) => (
                  <TimelineItem key={role.title} role={role} isLast={i === job.roles.length - 1} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
