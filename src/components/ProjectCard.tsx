import type { MouseEvent } from 'react'
import type { Project } from '../data/content'
import Reveal from './Reveal'
export default function ProjectCard({ p, onOpen, flip }: { p: Project; onOpen: () => void; flip: boolean }) {
  const mv = (e: MouseEvent<HTMLElement>) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--mx', (e.clientX - r.left) / r.width * 100 + '%'); e.currentTarget.style.setProperty('--my', (e.clientY - r.top) / r.height * 100 + '%') }
  return (
    <Reveal className="mt-8">
      <article className={`proj glass ${flip ? 'flip' : ''}`} data-c="VIEW" tabIndex={0} role="button" aria-label={`Open ${p.name} case study`} onMouseMove={mv}
        onClick={e => { if (!(e.target as HTMLElement).closest('a')) onOpen() }} onKeyDown={e => e.key === 'Enter' && onOpen()}>
        <div className={`pv pv-${p.id}`}>
          <i />
          <div className="pv-ui" aria-hidden="true">
            <span className="pv-dot" /><span className="pv-dot" /><span className="pv-dot" />
          </div>
          <div className="pv-copy"><small>SELECTED WORK</small><em>{p.name}</em><span>{p.tech.slice(0, 3).join(' · ')}</span></div>
        </div>
        <div className="pi">
          <small className="project-kicker">CASE STUDY · PRODUCT BUILD</small><p>{p.desc}</p>
          <div className="flex flex-wrap gap-2">{p.tech.map(t => <span key={t} className="border border-[var(--line)] px-3 py-1 rounded-full text-xs text-[var(--mut)]">{t}</span>)}</div>
          <div className="flex flex-wrap gap-2"><a className="btn" href={p.github} target="_blank" rel="noreferrer" data-c="OPEN">GitHub</a>{p.demo && <a className="btn" href={p.demo} data-c="OPEN">Live demo</a>}<span className="btn p">Case study</span></div>
        </div>
      </article>
    </Reveal>
  )
}
