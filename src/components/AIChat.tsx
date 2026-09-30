import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { content } from '../data/content'
type Msg = { r: 'u' | 'a'; t: string }
const reply = async (q: string) => content.chat[q] ?? 'Try one of the suggested questions, or use the contact section to reach Dharshini directly.'
export default function AIChat() {
  const [m, setM] = useState<Msg[]>([{ r: 'a', t: "Hi — I'm the portfolio guide. Explore Dharshini's work, skills and projects below." }]), [v, setV] = useState(''), end = useRef<HTMLDivElement>(null)
  useEffect(() => { end.current?.scrollIntoView({ block: 'end' }) }, [m])
  const ask = async (q: string) => { setM(x => [...x, { r: 'u', t: q }]); const a = await reply(q); setTimeout(() => setM(x => [...x, { r: 'a', t: a }]), 250) }
  const sub = (e: FormEvent) => { e.preventDefault(); if (v.trim()) ask(v.trim()); setV('') }
  return (
    <div className="pan glass" role="dialog" aria-label="Meet Ms. Dharshini">
      <header><span>MEET MS. DHARSHINI</span><small>portfolio guide</small></header>
      <div className="msgs" aria-live="polite">{m.map((x, i) => <div key={i} className={`m ${x.r}`}>{x.t}</div>)}<div ref={end} /></div>
      <div className="sg">{Object.keys(content.chat).map(q => <button key={q} type="button" onClick={() => ask(q)}>{q}</button>)}</div>
      <form onSubmit={sub} className="af"><input value={v} onChange={e => setV(e.target.value)} placeholder="Explore something…" aria-label="Ask about Dharshini" autoFocus /><button className="btn" aria-label="Send">↑</button></form>
    </div>
  )
}
