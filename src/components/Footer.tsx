import { site } from '../data/site'
export default function Footer() {
  return (
    <footer className="flex flex-wrap justify-between gap-5 border-t border-[var(--line)] px-[clamp(20px,6vw,90px)] py-12 text-sm text-[var(--mut)]">
      <div><b className="block text-2xl text-white" style={{ fontFamily: 'Bricolage Grotesque' }}>{site.name.toUpperCase()}</b>Thanks for making it this far. Let's build something meaningful.</div>
      <div className="flex gap-5">{Object.entries(site.links).map(([k, v]) => <a key={k} href={v} className="hover:text-white capitalize">{k}</a>)}</div>
      <div>© 2026 {site.name.toUpperCase()}</div>
    </footer>
  )
}
