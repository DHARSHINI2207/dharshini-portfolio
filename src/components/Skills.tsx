import { content } from '../data/content'
import Reveal from './Reveal'
export default function Skills() {
  return (
    <section id="skills" className="sec">
      <Reveal><h2 className="h2">What I use to build.</h2></Reveal>
      <div className="grid-auto">
        {content.skills.map(([t, l, d], i) => (
          <Reveal key={t} delay={i * .06}>
            <div className="card glass" tabIndex={0}><h3>{t}</h3><ul>{l.map(x => <li key={x}>{x}</li>)}</ul><p>{d}</p></div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
