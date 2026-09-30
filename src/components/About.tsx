import { content } from '../data/content'
import Reveal from './Reveal'
export default function About() {
  const a = content.about
  return (
    <section id="about" className="sec">
      <Reveal><p className="eyebrow">MEET MS. DHARSHINI</p><h2 className="h2">{a.title}</h2></Reveal>
      <Reveal><p className="lead">{a.lead}</p></Reveal>
      <Reveal className="about-note glass"><strong>What matters to me</strong><p>Useful software, clear interfaces and systems that are reliable enough to keep using after the launch day.</p></Reveal>
      <Reveal className="flex flex-wrap gap-2 mt-7">{a.tags.map(t => <span key={t} className="border border-[var(--line)] px-3.5 py-1.5 rounded-full text-sm text-[var(--mut)]">{t}</span>)}</Reveal>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-3.5 mt-12">
        {a.stats.map(([n, l], i) => <Reveal key={l} delay={i * .08} className="glass p-6"><strong className="block text-5xl font-extrabold" style={{ fontFamily: 'Bricolage Grotesque' }}>{n}</strong><span className="text-xs tracking-widest uppercase text-[var(--mut)]">{l}</span></Reveal>)}
      </div>
    </section>
  )
}
