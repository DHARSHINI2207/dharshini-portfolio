import { useEffect, useRef } from 'react'
import type { MutableRefObject } from 'react'
type M = MutableRefObject<{ px: number; py: number }>
/** Lightweight canvas particles that drift and back away from the cursor. Pauses off-screen. */
export default function Particles({ mouse }: { mouse: M }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const cv = ref.current!, cx = cv.getContext('2d')!, rm = matchMedia('(prefers-reduced-motion:reduce)').matches
    let W = 0, H = 0, vis = true, raf = 0
    type P = { x: number; y: number; r: number; vx: number; vy: number }
    let P: P[] = []
    const rs = () => { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight; P = Array.from({ length: innerWidth < 820 ? 25 : 70 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.4 + .3, vx: (Math.random() - .5) * .15, vy: -Math.random() * .25 - .05 })) }
    rs(); addEventListener('resize', rs)
    const io = new IntersectionObserver(e => { vis = e[0].isIntersecting }); io.observe(cv)
    const tick = () => {
      if (vis && !rm) {
        cx.clearRect(0, 0, W, H); const { px, py } = mouse.current
        for (const p of P) {
          const dx = p.x - px, dy = p.y - py, d = Math.hypot(dx, dy)
          if (d < 120) { p.x += dx / d * 1.2; p.y += dy / d * 1.2 }
          p.x += p.vx; p.y += p.vy; if (p.y < 0) p.y = H; if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
          cx.fillStyle = 'rgba(255,255,255,.5)'; cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 7); cx.fill()
        }
      }
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', rs); io.disconnect() }
  }, [mouse])
  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" />
}
