import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useEffect } from 'react'
import portrait from '../assets/portrait.jpg'
import { site } from '../data/site'
import { useMouse } from '../hooks/useMouse'
import Particles from './Particles'

const ease = [.2, .7, .2, 1] as const
const rise = (d: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: .7, delay: d, ease },
})

const pos = [
  { top: '12%', left: '-14%' },
  { top: '46%', right: '-12%' },
  { bottom: '20%', left: '-8%' },
]

export default function Hero() {
  const mouse = useMouse()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 120, damping: 20 })
  const sy = useSpring(my, { stiffness: 120, damping: 20 })
  const rotY = useTransform(sx, v => v * 10)
  const rotX = useTransform(sy, v => -v * 8)
  const hx = useTransform(sx, v => v * 40)
  const hy = useTransform(sy, v => v * 30)

  useEffect(() => {
    let r = 0
    const loop = () => {
      mx.set(mouse.current.x)
      my.set(mouse.current.y)
      r = requestAnimationFrame(loop)
    }
    loop()
    return () => cancelAnimationFrame(r)
  }, [mouse, mx, my])

  return (
    <section
      id="home"
      className="relative min-h-screen grid md:grid-cols-[1.05fr_.95fr] items-center gap-[clamp(30px,6vw,90px)] overflow-hidden px-[clamp(20px,6vw,90px)] max-md:pt-28 max-md:pb-16"
    >
      <Particles mouse={mouse} />

      {/* Original cinematic white atmosphere, now concentrated around the portrait. */}
      <motion.div
        aria-hidden
        style={{ x: hx, y: hy }}
        initial={{ opacity: 0, scale: .9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: .2, ease }}
        className="absolute left-[20%] top-1/2 -translate-y-1/2 w-[min(58vw,720px)] aspect-square rounded-full blur-3xl max-md:left-1/2 max-md:-translate-x-1/2 max-md:top-[32%] max-md:w-[120vw]"
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: 'radial-gradient(circle,rgba(255,255,255,.34),rgba(139,147,255,.12) 40%,transparent 68%)' }}
        />
      </motion.div>

      {/* Portrait stays on the right; it enters from outside the right viewport and settles into place. */}
      <motion.div
        className="relative z-10 justify-self-center md:justify-self-start md:order-2"
        style={{ perspective: 900 }}
        initial={{ opacity: 0, x: '55vw', rotate: 4, scale: .92 }}
        animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: .3, ease }}
      >
        <motion.div
          style={{ rotateY: rotY, rotateX: rotX, transformStyle: 'preserve-3d' }}
          className="relative aspect-[3/4] w-[min(70vw,330px)] md:w-[min(36vw,430px)]"
        >
          <div
            aria-hidden
            className="absolute -inset-[14%] rounded-[42px] blur-2xl pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 34%,rgba(255,255,255,.30),transparent 54%)' }}
          />

          <img
            src={portrait}
            alt="Portrait of Dharshini"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover rounded-3xl"
            style={{ WebkitMaskImage: 'linear-gradient(#000 60%,transparent)', maskImage: 'linear-gradient(#000 60%,transparent)' }}
          />

          {site.floating.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25 + i * .15, duration: .5, ease }}
              className="glass absolute px-3.5 py-2 text-xs !rounded-xl hidden sm:block"
              style={{ transform: 'translateZ(70px)', ...pos[i] }}
            >
              {t}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Left-side identity block: spacious, centered, and intentionally simple. */}
      <div className="relative z-10 text-center md:text-center max-md:order-first md:order-1">
        <motion.div {...rise(.38)} className="inline-flex items-center gap-2 text-xs tracking-[.12em] text-emerald-200 mb-6 uppercase">
          <i className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#5dffa0] animate-pulse" />
          {site.status}
        </motion.div>

        <motion.h1
          {...rise(.48)}
          className="font-extrabold uppercase"
          style={{ fontSize: 'clamp(3.6rem,8vw,8.5rem)', letterSpacing: '-.055em', lineHeight: '.86' }}
        >
          {site.name}
        </motion.h1>

        <motion.p {...rise(.62)} className="mt-6 text-xs tracking-[.16em] uppercase text-[var(--mut)]">
          {site.title} <span className="text-white px-1.5">·</span> {site.subtitle}
        </motion.p>

        <motion.h2
          {...rise(.72)}
          className="mt-7 mx-auto max-w-[34ch] text-[clamp(.95rem,1.45vw,1.15rem)] leading-[1.7] font-normal text-[var(--mut)]"
        >
          “{site.heroLine}”
        </motion.h2>

        <motion.p {...rise(.82)} className="mt-5 mx-auto max-w-[45ch] text-base md:text-lg text-[var(--mut)] leading-8">
          {site.intro}
        </motion.p>

        <motion.div {...rise(.92)} className="flex justify-center gap-3 flex-wrap mt-8">
          <a className="btn p" href="#work">Explore my work</a>
          <a className="btn" href="#contact">Let's build something</a>
        </motion.div>
      </div>
    </section>
  )
}
