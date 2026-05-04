import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Mail, Linkedin, Github, Copy, Check } from 'lucide-react'
import { staggerContainer, fadeUp, scaleIn } from '../lib/motion'
import { profile } from '../data/profile'

export default function Contact() {
  const reduced = useReducedMotion()
  const [copied, setCopied] = useState(false)
  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  type LinkItem = { label: string; value: string; href: string; icon: React.ElementType; action: (() => void) | null }
  const links: LinkItem[] = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: Mail, action: copyEmail },
    { label: 'LinkedIn', value: 'linkedin.com/in/asimkhan17', href: profile.linkedin, icon: Linkedin, action: null },
    { label: 'GitHub', value: 'github.com/asimkhan17790', href: profile.github, icon: Github, action: null },
  ]
  return (
    <section id="contact" className="py-20 px-6 max-w-5xl mx-auto">
      <motion.div variants={reduced ? fadeUp : staggerContainer} initial="hidden" whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} className="text-center">
        <motion.p variants={fadeUp} className="text-xs font-mono uppercase tracking-widest mb-2"
          style={{ color: 'var(--accent)' }}>Contact</motion.p>
        <motion.h2 variants={fadeUp} className="text-3xl font-bold mb-4">{"Let's connect."}</motion.h2>
        <motion.p variants={fadeUp} className="text-muted max-w-md mx-auto mb-10">
          Open to interesting conversations, collaborations, and new ideas.
        </motion.p>
        <motion.div variants={reduced ? {} : staggerContainer} className="flex flex-col sm:flex-row gap-4 justify-center">
          {links.map(link => (
            <motion.div key={link.label} variants={scaleIn}>
              <a href={link.href} target={link.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3.5 rounded-xl border border-color hover:opacity-80 transition-all"
                style={{ background: 'var(--card)' }}>
                <link.icon size={16} style={{ color: 'var(--accent)' }} />
                <div className="text-left">
                  <div className="text-xs text-muted">{link.label}</div>
                  <div className="text-sm font-medium">{link.value}</div>
                </div>
                {link.action && (
                  <button onClick={e => { e.preventDefault(); (link.action as () => void)() }}
                    className="ml-2 p-1 rounded" aria-label="Copy email">
                    {copied ? <Check size={13} style={{ color: 'var(--accent)' }} /> : <Copy size={13} className="text-muted" />}
                  </button>
                )}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
