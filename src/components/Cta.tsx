import Reveal from './Reveal'
export default function Cta() {
  return (
    <section id="cta" className="sec relative text-center overflow-hidden">
      <div aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] max-w-[140%] aspect-square blur-3xl" style={{ background: 'radial-gradient(circle,rgba(139,147,255,.22),rgba(255,255,255,.06) 40%,transparent 68%)' }} />
      <Reveal className="relative"><h2 className="h2 !max-w-none" style={{ fontSize: 'clamp(2.6rem,9vw,8rem)' }}>Have an idea?<br />Let's build something meaningful.</h2>
        <p className="mx-auto my-6 max-w-[50ch] text-[var(--mut)]">Tell me what you're trying to build, and let's turn the idea into a working product.</p>
        <div className="flex gap-3 justify-center flex-wrap"><a className="btn p" href="#contact" data-c="OPEN">Start a project</a><a className="btn" href="#contact" data-c="OPEN">Contact me</a></div></Reveal>
    </section>
  )
}
