import { motion } from 'motion/react'
import type { ReactNode } from 'react'
/** Blur-to-focus scroll reveal. Honors reduced motion via <MotionConfig> in App. */
export default function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, amount: .15 }} transition={{ duration: .8, delay, ease: [.2, .7, .2, 1] }}>{children}</motion.div>
}
