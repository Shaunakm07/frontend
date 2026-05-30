'use client'

import { useState } from 'react'
import { submitContact } from '@/lib/supabase'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  function update(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { name, email, message } = form
    if (!name.trim() || !email.trim() || !message.trim()) return
    setLoading(true)
    setError(false)
    const { ok } = await submitContact({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    })
    setLoading(false)
    if (ok) setSuccess(true)
    else setError(true)
  }

  const inputCls =
    'bg-[rgba(255,255,255,0.03)] border border-[rgba(240,237,232,0.08)] text-[#f0ede8] font-[inherit] text-[14px] px-3.5 py-3 outline-none focus:border-[rgba(240,62,120,0.4)] focus:shadow-[0_0_0_3px_rgba(240,62,120,0.07)] transition-all duration-200 appearance-none rounded-none w-full min-h-[48px]'
  const labelCls = 'text-[11px] font-semibold tracking-[0.06em] uppercase text-white/40'

  if (success) {
    return (
      <div className="py-5 flex items-start gap-3">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-[1px]" aria-hidden>
          <circle cx="8" cy="8" r="7.5" stroke="rgba(240,62,120,0.4)" />
          <path d="M4.5 8l2.5 2.5L11.5 6" stroke="#f03d78" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div>
          <p className="text-[15px] font-semibold tracking-[-0.01em] mb-1.5">Message sent.</p>
          <p className="text-[13px] text-white/70 font-light leading-[1.65]">Thanks for reaching out — we&apos;ll get back to you within one business day.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid grid-cols-2 gap-4 max-[480px]:grid-cols-1">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-name" className={labelCls}>
            Name <span className="text-[rgba(240,62,120,0.7)]" aria-label="required">*</span>
          </label>
          <input
            id="cf-name"
            type="text"
            value={form.name}
            onChange={update('name')}
            placeholder="Your name"
            required
            autoComplete="name"
            className={inputCls}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-email" className={labelCls}>
            Email <span className="text-[rgba(240,62,120,0.7)]" aria-label="required">*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            value={form.email}
            onChange={update('email')}
            placeholder="you@example.com"
            required
            autoComplete="email"
            className={inputCls}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-subject" className={labelCls}>Subject</label>
        <input
          id="cf-subject"
          type="text"
          value={form.subject}
          onChange={update('subject')}
          placeholder="What's this about?"
          autoComplete="off"
          className={inputCls}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-message" className={labelCls}>
          Message <span className="text-[rgba(240,62,120,0.7)]" aria-label="required">*</span>
        </label>
        <textarea
          id="cf-message"
          value={form.message}
          onChange={update('message')}
          placeholder="Tell us what's on your mind."
          required
          className={`${inputCls} h-[148px] resize-none`}
          style={{ minHeight: '148px' }}
        />
      </div>

      {error && (
        <p className="text-[13px] text-[rgba(240,80,80,0.85)] leading-[1.5]" role="alert">
          Something went wrong — please try again or{' '}
          <a href="mailto:hello@amphora.ai" className="underline underline-offset-2 hover:opacity-80 transition-opacity">
            email us directly.
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-grad text-white border-none text-[12px] font-bold tracking-[0.04em] uppercase px-7 py-3.5 cursor-pointer hover:brightness-110 transition-all duration-150 disabled:opacity-55 self-start min-h-[48px] min-w-[160px]"
      >
        {loading ? 'Sending…' : 'Send message →'}
      </button>

      <p className="text-[11px] text-white/30 -mt-1">
        Fields marked <span className="text-[rgba(240,62,120,0.6)]">*</span> are required.
      </p>
    </form>
  )
}
