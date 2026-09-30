import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { site } from '../data/site'
export default function Navbar() {
  const [small, setSmall] = useState(false), [open, setOpen] = useState(false)
  useEffect(() => { const f = () => setSmall(scrollY > 60); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f) }, [])
  return (
    <nav aria-label="Main" className={`glass fixed left-1/2 -translate-x-1/2 z-50 flex flex-wrap items-center gap-1 transition-all duration-500 top-3.5 max-w-[94vw] ${small ? 'py-1 pl-4 pr-1.5 text-sm' : 'py-2 pl-5 pr-2.5'} ${open ? 'rounded-3xl' : 'rounded-full'} max-md:w-[calc(100%-28px)]`}>
      <b className="mr-3.5 tracking-widest font-extrabold" style={{ fontFamily: 'Bricolage Grotesque' }}>{site.name.toUpperCase()}</b>
      {site.nav.map(([l, h]) => (
        <a key={h} href={h} onClick={() => setOpen(false)} className={`px-3 py-2 rounded-full text-sm text-[var(--mut)] hover:text-white hover:bg-white/10 transition ${open ? 'block w-full' : 'max-md:hidden'}`}>{l}</a>
      ))}
      <button className="md:hidden ml-auto p-2" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(o => !o)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
    </nav>
  )
}
