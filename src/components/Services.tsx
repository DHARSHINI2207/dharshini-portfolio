import { content } from '../data/content'
import Reveal from './Reveal'
export default function Services() {
  return (
    <section id="services" className="sec">
      <Reveal><h2 className="h2">What I can build.</h2></Reveal>
      <div className="grid-auto">
        {content.services.map(([t, d], i) => <Reveal key={t} delay={i * .06}><div className="card glass show" tabIndex={0}><h3>{t}</h3><p>{d}</p></div></Reveal>)}
      </div>
    </section>
  )
}
