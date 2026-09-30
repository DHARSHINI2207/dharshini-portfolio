import { motion, useScroll } from 'motion/react'
import { useRef } from 'react'
import { content } from '../data/content'
import Reveal from './Reveal'
export default function Experience() {
  const ref = useRef<HTMLDivElement>(null), { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  return (
    <section id="journey" className="sec">
      <Reveal><h2 className="h2">How it gets built.</h2></Reveal>
      <div ref={ref} className="relative mt-14 pl-9 max-w-[720px]">
        <div className="absolute left-[5px] top-0 bottom-0 w-px bg-[var(--line)]" />
        <motion.div className="absolute left-[5px] top-0 bottom-0 w-px origin-top bg-gradient-to-b from-[var(--acc)] to-white" style={{ scaleY: scrollYProgress }} />
        {content.journey.map(([t, d]) => (
          <Reveal key={t} className="relative pb-12"><i className="absolute -left-9 top-2 w-[11px] h-[11px] rounded-full bg-white shadow-[0_0_16px_#fff]" /><h3 className="text-3xl font-bold">{t}</h3><p className="text-[var(--mut)] max-w-[52ch]">{d}</p></Reveal>
        ))}
      </div>
    </section>
  )
}
