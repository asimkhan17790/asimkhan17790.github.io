import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/profile'
import { fadeUp, slideInLeft } from '../lib/motion'

export default function About() {
  const reduced = useReducedMotion()

  return (
    <section id="about" className="py-20 px-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={reduced ? fadeUp : slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
            About
          </p>
          <h2 className="text-3xl font-bold mb-6">Building systems that scale.</h2>
          <p className="text-muted leading-relaxed">{profile.bio}</p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 gap-4"
        >
          {[
            { label: 'Years experience', value: '12+' },
            { label: 'Regulatory reports', value: '150+' },
            { label: 'Records / day', value: '2M+' },
            { label: 'Records / quarter', value: '100M+' },
          ].map(stat => (
            <div
              key={stat.label}
              className="rounded-xl p-5 border border-color"
              style={{ background: 'var(--card)' }}
            >
              <div className="text-3xl font-bold mb-1" style={{ color: 'var(--accent)' }}>
                {stat.value}
              </div>
              <div className="text-xs text-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
