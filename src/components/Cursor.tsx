import { useEffect, useRef } from 'react'

/** Small cinematic cursor: it follows the pointer but never expands on hover. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return
    document.body.classList.add('cc')
    const c = ref.current!
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0
    const mv = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY }
    const loop = () => {
      x += (tx - x) * .28
      y += (ty - y) * .28
      c.style.transform = `translate(${x}px,${y}px)`
      raf = requestAnimationFrame(loop)
    }
    addEventListener('mousemove', mv, { passive: true })
    loop()
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('mousemove', mv)
      document.body.classList.remove('cc')
    }
  }, [])
  return <div id="cur" ref={ref} aria-hidden="true" />
}
