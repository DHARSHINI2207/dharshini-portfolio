import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { content } from '../data/content'

/** Keyboard-friendly portfolio terminal. Open with ` or the terminal button. */
export default function Terminal() {
  const [out, setOut] = useState<string[]>(['Welcome to dharshini@portfolio.', 'Type "help" to see available commands.'])
  const [v, setV] = useState('')
  const input = useRef<HTMLInputElement>(null)
  const pre = useRef<HTMLPreElement>(null)

  useEffect(() => { input.current?.focus() }, [])
  useEffect(() => { pre.current?.scrollTo({ top: pre.current.scrollHeight }) }, [out])

  const run = (raw: string) => {
    const c = raw.trim().toLowerCase()
    if (!c) return
    if (c === 'clear') return setOut([])
    const answer = content.term[c] ?? `command not found: ${c}\nType "help" for available commands.`
    setOut(x => [...x, `$ ${c}`, ...answer.split('\n')])
  }

  const sub = (e: FormEvent) => {
    e.preventDefault()
    run(v)
    setV('')
  }

  return (
    <div className="pan glass term" role="dialog" aria-modal="true" aria-label="Dharshini portfolio terminal">
      <header>
        <span>dharshini@portfolio:~</span>
        <span>ESC to close</span>
      </header>
      <pre ref={pre} aria-live="polite">{out.join('\n')}</pre>
      <form onSubmit={sub} className="af">
        <span className="term-prompt" aria-hidden="true">$</span>
        <input ref={input} value={v} onChange={e => setV(e.target.value)} aria-label="Terminal command" autoComplete="off" spellCheck={false} placeholder="type a command…" />
      </form>
    </div>
  )
}
