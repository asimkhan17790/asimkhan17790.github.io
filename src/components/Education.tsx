import { motion, useReducedMotion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { staggerContainer, fadeUp } from '../lib/motion'
import { education } from '../data/education'
import LogoBadge from './LogoBadge'

export default function Education() {
  const reduced = useReducedMotion()
  return (
    <section id="education" className="py-20 px-6 max-w-5xl mx-auto">
      <motion.div variants={reduced ? fadeUp : staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
        <motion.p variants={fadeUp} className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>Education</motion.p>
        <motion.h2 variants={fadeUp} className="text-3xl font-bold mb-10">Where I studied.</motion.h2>
        <div className="grid md:grid-cols-2 gap-6">
          {education.map(deg => (
            <motion.div key={deg.institution} variants={fadeUp} className="rounded-xl p-6 border border-color" style={{ background: 'var(--card)' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 overflow-hidden border border-color"
                  style={{ background: 'var(--card)' }}>
                  <LogoBadge src={deg.logoUrl} alt={deg.institution} fallback={<GraduationCap size={18} style={{ color: 'var(--accent)' }} />} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm leading-snug">{deg.institution}</h3>
                  <p className="text-xs text-muted mt-0.5">{deg.period}</p>
                </div>
              </div>
              <p className="text-sm font-medium mb-1">{deg.degree}</p>
              <p className="text-xs text-muted mb-4">{deg.field}</p>
              <div className="flex flex-wrap gap-1.5">
                {deg.courses.map(c => (
                  <span key={c} className="px-2 py-0.5 rounded text-xs border border-color" style={{ background: 'var(--bg)' }}>{c}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
