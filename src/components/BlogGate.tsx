'use client'

import { useState, useEffect } from 'react'
import { joinWaitlist } from '@/lib/supabase'

const WL_KEY = 'amphora_wl'

export default function BlogGate() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem(WL_KEY) || '[]') as string[]
    if (list.length > 0) {
      setShow(false)
    } else {
      setShow(true)
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = email.trim().toLowerCase()
    if (!trimmed) return
    setLoading(true)
    try {
      await joinWaitlist(trimmed)
    } catch {}
    const list = JSON.parse(localStorage.getItem(WL_KEY) || '[]') as string[]
    if (!list.includes(trimmed)) localStorage.setItem(WL_KEY, JSON.stringify([...list, trimmed]))
    setSubmitted(true)
    setLoading(false)
    setTimeout(() => {
      setVisible(false)
      setTimeout(() => setShow(false), 450)
    }, 900)
  }

  if (!show) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-[rgba(9,9,13,0.93)] backdrop-blur-[16px] transition-opacity duration-[450ms]"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="max-w-[400px] w-full px-12 py-[52px] border border-[rgba(240,237,232,0.07)] bg-[rgba(12,12,18,0.98)]">
        <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-white/50 mb-6">Amphora · Progress Notes</p>
        <h2 className="text-[22px] font-semibold tracking-[-0.02em] leading-[1.25] mb-3">
          Enter your email to read our{' '}
          <span className="grad-text">progress notes.</span>
        </h2>
        <p className="text-[14px] text-white/80 font-light leading-[1.65] mb-8">
          Updates on the science, the product, and what we&apos;re learning — free to read, just leave your email.
        </p>

        {submitted ? (
          <p className="text-[13px] text-white/80 pt-4 border-t border-[rgba(240,237,232,0.07)]">
            You&apos;re in. Enjoy the notes.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex border border-[rgba(240,237,232,0.1)] w-full focus-within:border-[rgba(240,62,120,0.35)] focus-within:shadow-[0_0_0_3px_rgba(240,62,120,0.07)] transition-all duration-200"
          >
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="flex-1 bg-[rgba(240,237,232,0.03)] border-none text-[#f0ede8] text-[13px] px-4 py-[13px] outline-none min-w-0 placeholder:text-white/50"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-grad text-white border-none text-[12px] font-bold tracking-[0.03em] uppercase px-[18px] cursor-pointer whitespace-nowrap flex-shrink-0 hover:brightness-110 transition-all duration-150 disabled:opacity-60"
            >
              {loading ? '…' : 'Read now'}
            </button>
          </form>
        )}
        <p className="mt-3.5 text-[11px] text-white/50 tracking-[0.02em]">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  )
}
