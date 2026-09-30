import { useEffect, useRef } from 'react'
/** Shared normalised mouse position (-0.5..0.5) plus raw pixels, without re-rendering. */
export function useMouse() {
  const m = useRef({ x: 0, y: 0, px: -999, py: -999 })
  useEffect(() => {
    if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return
    const f = (e: MouseEvent) => { m.current = { x: e.clientX / innerWidth - .5, y: e.clientY / innerHeight - .5, px: e.clientX, py: e.clientY } }
    addEventListener('mousemove', f, { passive: true })
    return () => removeEventListener('mousemove', f)
  }, [])
  return m
}
