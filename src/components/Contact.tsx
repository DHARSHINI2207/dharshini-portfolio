import { useState } from 'react'
import type { FormEvent } from 'react'
import { Mail, MessageCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { site } from '../data/site'
import Reveal from './Reveal'

const F = ({ id, label, err, children }: { id: string; label: string; err?: string; children: React.ReactNode }) => (
  <div className={`f ${err ? 'bad' : ''}`}>
    <label htmlFor={id}>{label}</label>
    {children}
    {err && <span role="alert" className="er">{err}</span>}
  </div>
)

const digits = (value: string) => value.replace(/\D/g, '')

export default function Contact() {
  const [err, setErr] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)

  const getData = (form: HTMLFormElement) => {
    const d = new FormData(form)
    return {
      name: String(d.get('name') ?? '').trim(),
      email: String(d.get('email') ?? '').trim(),
      type: String(d.get('type') ?? 'Project'),
      budget: String(d.get('budget') ?? 'Not specified'),
      message: String(d.get('message') ?? '').trim(),
    }
  }

  const validate = (x: ReturnType<typeof getData>) => {
    const e: Record<string, string> = {}
    if (!x.name) e.name = 'Enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(x.email)) e.email = 'Enter a valid email address.'
    if (x.message.length < 5) e.message = 'Tell me a little about the project.'
    setErr(e)
    return !Object.keys(e).length
  }

  const buildMessage = (x: ReturnType<typeof getData>) =>
    `Hi Dharshini,\n\nI found your portfolio and would like to discuss a project.\n\nName: ${x.name || '[Your name]'}\nEmail: ${x.email || '[Your email]'}\nProject type: ${x.type}\nBudget: ${x.budget}\nRequirements / details:\n${x.message || '[Please describe the project requirements]'}\n\nThank you.`

  const whatsappHref = (number: string, x?: ReturnType<typeof getData>) =>
    `https://wa.me/${digits(number)}?text=${encodeURIComponent(buildMessage(x ?? { name: '', email: '', type: 'Project', budget: 'Not specified', message: '' }))}`

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const x = getData(e.currentTarget)
    if (!validate(x)) return
    const subject = encodeURIComponent(`Project enquiry from ${x.name}`)
    const body = encodeURIComponent(`Hi Dharshini,\n\nName: ${x.name}\nEmail: ${x.email}\nProject: ${x.type}\nBudget: ${x.budget}\n\nRequirements / details:\n${x.message}`)
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const openWhatsApp = (form: HTMLFormElement, number: string) => {
    const x = getData(form)
    if (!validate(x)) return
    window.open(whatsappHref(number, x), '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="contact" className="sec contact-sec">
      <Reveal>
        <p className="eyebrow">LET'S WORK TOGETHER</p>
        <h2 className="h2">Have a project in mind?</h2>
      </Reveal>
      <Reveal>
        <p className="lead">Share your idea, requirements and goals. You can send everything by professional email or WhatsApp.</p>
      </Reveal>

      <div className="contact-grid">
        <form onSubmit={submit} noValidate className="contact-form glass">
          <div className="contact-form-head">
            <span>PROJECT INQUIRY</span>
            <small>I'll receive the details directly.</small>
          </div>
          <F id="name" label="Name" err={err.name}><input id="name" name="name" autoComplete="name" required aria-invalid={!!err.name} placeholder="Your name" /></F>
          <F id="email" label="Your email" err={err.email}><input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!err.email} placeholder="you@example.com" /></F>
          <div className="form-two">
            <F id="type" label="Project type"><select id="type" name="type">{['Web application', 'Full-stack system', 'AI / ML solution', 'Automation', 'API / backend', 'Admin dashboard'].map(o => <option key={o}>{o}</option>)}</select></F>
            <F id="budget" label="Budget"><select id="budget" name="budget">{['Not sure yet', 'Under ₹50k', '₹50k – ₹2L', '₹2L+'].map(o => <option key={o}>{o}</option>)}</select></F>
          </div>
          <F id="message" label="Requirements / project details" err={err.message}><textarea id="message" name="message" rows={6} required aria-invalid={!!err.message} placeholder="What are you trying to build? Include the key requirements, timeline or anything else that matters." /></F>
          <div className="contact-submit-row">
            <button className="btn p" type="submit"><Mail size={16} /> Open professional email</button>
            <button className="btn" type="button" onClick={e => openWhatsApp(e.currentTarget.form!, site.contact.whatsapp[0])}><MessageCircle size={16} /> Send on WhatsApp</button>
          </div>
          {sent && <p role="status" className="success"><CheckCircle2 size={16} /> Your email app should now open with the enquiry prepared.</p>}
        </form>

        <div className="contact-side">
          <div className="contact-intro glass">
            <span className="contact-kicker">DIRECT CONTACT</span>
            <h3>Let's talk about the actual problem.</h3>
            <p>For professional enquiries, email is the primary channel. For a faster conversation, send your requirements through WhatsApp.</p>
          </div>

          <a className="contact-action glass" href={`mailto:${site.contact.email}?subject=${encodeURIComponent('Professional project enquiry — Dharshini')}`}>
            <Mail size={20} /><span><b>Professional email</b><small>{site.contact.email}</small></span><ArrowUpRight size={16} className="ml-auto" />
          </a>

          {site.contact.whatsapp.map(number => (
            <a key={number} className="contact-action glass" href={whatsappHref(number)} target="_blank" rel="noreferrer">
              <MessageCircle size={20} /><span><b>WhatsApp</b><small>+91 {number.slice(0, 5)} {number.slice(5)}</small></span><ArrowUpRight size={16} className="ml-auto" />
            </a>
          ))}

          <p className="contact-note">Your message can include the project scope, requirements, preferred timeline and budget. No account or portfolio form submission is required.</p>
        </div>
      </div>
    </section>
  )
}
