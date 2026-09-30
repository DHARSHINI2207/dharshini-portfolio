import { content } from '../data/content'
export default function Marquee() {
  const w = [...content.marquee, ...content.marquee]
  return <div aria-hidden className="mq"><div>{w.map((t, i) => <span key={i}>{t}</span>)}</div></div>
}
