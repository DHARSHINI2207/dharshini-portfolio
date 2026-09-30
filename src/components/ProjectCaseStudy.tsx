import { motion } from 'motion/react'
import { useEffect } from 'react'
import type { Project } from '../data/content'
/** Full-screen case study that opens with a circular reveal. */
export default function ProjectCaseStudy({ p, onClose }: { p: Project; onClose: () => void }) {
  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = '' } }, [])
  const c = p.cs, S = ({ t, children }: { t: string; children: React.ReactNode }) => <><h3 className="cs-h">{t}</h3>{children}</>
  return (
    <motion.div role="dialog" aria-modal="true" aria-label={`${p.name} case study`} className="fixed inset-0 z-[80] overflow-auto bg-[var(--bg)] px-[clamp(20px,6vw,90px)] pt-24 pb-16"
      initial={{ clipPath: 'circle(0% at 50% 50%)' }} animate={{ clipPath: 'circle(150% at 50% 50%)' }} exit={{ clipPath: 'circle(0% at 50% 50%)' }} transition={{ duration: .8, ease: [.7, 0, .2, 1] }}>
      <button className="btn fixed top-5 right-5 z-10" onClick={onClose} autoFocus>Close ✕</button>
      <h2 className="h2 !max-w-none">{p.name}</h2><p className="lead">{p.desc}</p>
      <S t="The problem"><p>{c.problem}</p></S>
      <S t="The approach"><p>{c.approach}</p></S>
      <S t="Architecture"><div className="flex flex-wrap items-center gap-2.5">{c.arch.map((a, i) => <span key={a} className="contents">{i > 0 && <b className="text-[var(--mut)]">→</b>}<span className="glass px-4 py-3 !rounded-xl">{a}</span></span>)}</div></S>
      <S t="Technologies"><div className="flex flex-wrap gap-2">{p.tech.map(t => <span key={t} className="border border-[var(--line)] px-3 py-1 rounded-full text-sm text-[var(--mut)]">{t}</span>)}</div></S>
      <S t="Key features"><ul className="pl-5 list-disc text-[var(--mut)]">{c.feat.map(f => <li key={f}>{f}</li>)}</ul></S>
      <S t="Challenges"><p>{c.chal}</p></S>
      <S t="Result"><p>{c.res}</p></S>
      <div className="mt-8 flex gap-3"><a className="btn" href={p.github} target="_blank" rel="noreferrer">GitHub</a>{p.demo && <a className="btn p" href={p.demo} target="_blank" rel="noreferrer">Live demo</a>}</div>
    </motion.div>
  )
}
