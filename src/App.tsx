import { MotionConfig, motion, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { Terminal as TermIcon } from 'lucide-react'
import About from './components/About'
import AIChat from './components/AIChat'
import BrainGraph from './components/BrainGraph'
import Contact from './components/Contact'
import Cta from './components/Cta'
import Cursor from './components/Cursor'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Services from './components/Services'
import Skills from './components/Skills'
import Terminal from './components/Terminal'
export default function App() {
  const [panel, setPanel] = useState<'ai' | 'term' | null>(null), { scrollYProgress } = useScroll()
  const toggle = (p: 'ai' | 'term') => setPanel(x => x === p ? null : p)
  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPanel(null)
      if (e.key === '`' && !/INPUT|TEXTAREA|SELECT/.test((e.target as HTMLElement).tagName)) { e.preventDefault(); toggle('term') }
    }
    addEventListener('keydown', f); return () => removeEventListener('keydown', f)
  }, [])
  return (
    <MotionConfig reducedMotion="user">
      <Cursor /><Navbar />
      <motion.div aria-hidden className="fixed top-0 left-0 right-0 h-0.5 z-[90] origin-left bg-gradient-to-r from-[var(--acc)] to-white" style={{ scaleX: scrollYProgress }} />
      <main><Hero /><Marquee /><About /><BrainGraph /><Skills /><Projects /><Experience /><Services /><Cta /><Contact /></main>
      <Footer />
      {panel === 'ai' && <AIChat />}{panel === 'term' && <Terminal />}
      <div className="fixed right-4 z-[60] flex gap-2.5" style={{ bottom: 'calc(18px + env(safe-area-inset-bottom,0px))' }}>
        <button className="btn glass" onClick={() => toggle('term')} aria-label="Open terminal (press `)" data-c="OPEN"><TermIcon size={16} /></button>
        <button className="btn p" onClick={() => toggle('ai')} data-c="ASK">Meet Ms. Dharshini</button>
      </div>
    </MotionConfig>
  )
}
