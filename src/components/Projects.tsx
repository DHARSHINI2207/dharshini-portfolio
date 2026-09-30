import { AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'
import { content } from '../data/content'
import ProjectCard from './ProjectCard'
import ProjectCaseStudy from './ProjectCaseStudy'
import Reveal from './Reveal'
export default function Projects() {
  const [sel, setSel] = useState<string | null>(null), p = content.projects.find(x => x.id === sel)
  useEffect(() => { const f = (e: KeyboardEvent) => e.key === 'Escape' && setSel(null); addEventListener('keydown', f); return () => removeEventListener('keydown', f) }, [])
  return (
    <section id="work" className="sec">
      <Reveal><h2 className="h2">What I've built.</h2></Reveal>
      {content.projects.map((x, i) => <ProjectCard key={x.id} p={x} flip={i % 2 === 1} onOpen={() => setSel(x.id)} />)}
      <AnimatePresence>{p && <ProjectCaseStudy key={p.id} p={p} onClose={() => setSel(null)} />}</AnimatePresence>
    </section>
  )
}
