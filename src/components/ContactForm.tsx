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

  const inputCls = "bg-[rgba(255,255,255,0.03)] border border-[rgba(240,237,232,0.07)] text-[#f0ede8] font-[inherit] text-[14px] px-3.5 py-3 outline-none focus:border-[rgba(240,62,120,0.35)] focus:shadow-[0_0_0_3px_rgba(240,62,120,0.07)] transition-all duration-200 appearance-none rounded-none"
  const labelCls = "text-[11px] font-medium tracking-[0.05em] uppercase text-white/50"

  if (success) {
    return (
      <div className="py-5">
        <p className="text-[15px] font-semibold tracking-[-0.01em] mb-2">Message sent.</p>
        <p className="text-[13px] text-white/80 font-light leading-[1.65]">Thanks for reaching out — we&apos;ll get back to you within one business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div className="grid grid-cols-2 gap-4 max-[480px]:grid-cols-1">
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Name</label>
          <input type="text" value={form.name} onChange={update('name')} placeholder="Your name" required className={inputCls} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelCls}>Email</label>
          <input type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" required autoComplete="email" className={inputCls} />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>Subject</label>
        <input type="text" value={form.subject} onChange={update('subject')} placeholder="What's this about?" className={inputCls} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelCls}>Message</label>
        <textarea value={form.message} onChange={update('message')} placeholder="Tell us what's on your mind." required className={`${inputCls} h-[140px] resize-none`} />
      </div>
      {error && (
        <p className="text-[13px] text-[rgba(240,80,80,0.75)]">Something went wrong — please try again or email us directly.</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="bg-grad text-white border-none text-[13px] font-bold tracking-[0.03em] px-7 py-3.5 cursor-pointer hover:brightness-110 transition-all duration-150 disabled:opacity-55 self-start mt-1"
      >
        {loading ? 'Sending…' : 'Send message →'}
      </button>
    </form>
  )
}
