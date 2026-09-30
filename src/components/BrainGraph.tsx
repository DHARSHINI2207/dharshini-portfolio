import { useState } from 'react'
import { content } from '../data/content'
import Reveal from './Reveal'
type N = { x: number; y: number; r: number; t: string; k: 'c' | 'cat' | 'ch'; a?: number }
/** "The mind map": hover to trace links, click/Enter to expand a branch. */
export default function BrainGraph() {
  const [open, setOpen] = useState<string | null>(null), [hov, setHov] = useState<string | null>(null)
  const cats = Object.keys(content.graph), nodes: Record<string, N> = { c: { x: 450, y: 320, r: 44, t: 'DHARSHINI', k: 'c' } }, links: [string, string][] = []
  cats.forEach((c, i) => { const a = i / cats.length * Math.PI * 2 - Math.PI / 2; nodes[c] = { x: 450 + Math.cos(a) * 205, y: 320 + Math.sin(a) * 205, r: 32, t: c, k: 'cat', a }; links.push(['c', c]) })
  if (open) { const b = nodes[open], ch = content.graph[open]; ch.forEach((t, i) => { const s = (i - (ch.length - 1) / 2) * .42, id = open + t; nodes[id] = { x: b.x + Math.cos(b.a! + s) * 115, y: b.y + Math.sin(b.a! + s) * 115, r: 22, t, k: 'ch' }; links.push([open, id]) }) }
  const rel = hov ? new Set<string>([hov, ...links.filter(l => l.includes(hov)).flat()]) : null
  return (
    <section id="brain" className="sec">
      <Reveal><h2 className="h2">The mind map.</h2></Reveal>
      <Reveal><p className="lead">How I think about software, mapped as connections. Hover a node to trace its links; tap or press Enter to open a branch.</p></Reveal>
      <svg viewBox="0 0 900 640" role="group" aria-label="Interactive knowledge graph" className="w-full max-w-[900px] mx-auto mt-10 block">
        {links.map(([a, b]) => <line key={a + b} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} className={hov && (a === hov || b === hov) ? 'gl on' : 'gl'} />)}
        {Object.entries(nodes).map(([id, n]) => {
          const act = () => n.k === 'cat' && setOpen(o => o === id ? null : id)
          return (
            <g key={id} tabIndex={0} role="button" aria-label={n.t} data-c={n.k === 'cat' ? 'OPEN' : undefined} className="gn" style={{ opacity: rel && !rel.has(id) ? .25 : 1 }}
              onMouseEnter={() => setHov(id)} onMouseLeave={() => setHov(null)} onFocus={() => setHov(id)} onBlur={() => setHov(null)} onClick={act} onKeyDown={e => e.key === 'Enter' && act()}>
              <circle cx={n.x} cy={n.y} r={n.r + (hov === id ? 5 : 0)} />
              <text x={n.x} y={n.y + 4} fontSize={n.k === 'ch' ? 9 : 11}>{n.t}</text>
            </g>
          )
        })}
      </svg>
      <div className="glass max-w-[620px] mx-auto mt-10 px-5 py-4 text-center text-[var(--mut)] text-sm min-h-[88px]" aria-live="polite">
        <b className="block text-lg text-[var(--fg)]">{open ?? 'Explore how I build'}</b>
        {open ? `${content.descs[open]} ${content.graph[open].join(' → ')}` : 'Each branch is an area I work in. Open one to see the tools behind it.'}
      </div>
    </section>
  )
}
