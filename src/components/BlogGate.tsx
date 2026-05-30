'use client'

import { useState, useEffect, useRef } from 'react'
import { joinWaitlist } from '@/lib/supabase'

const WL_KEY = 'amphora_wl'

export default function BlogGate() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [visible, setVisible] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem(WL_KEY) || '[]') as string[]
    if (list.length === 0) setShow(true)
  }, [])

  useEffect(() => {
    if (show) {
      setTimeout(() => inputRef.current?.focus(), 100)
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') dismiss() }
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    }
  }, [show])

  function dismiss() {
    setVisible(false)
    setTimeout(() => setShow(false), 350)
  }

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
    setTimeout(() => dismiss(), 1200)
  }

  if (!show) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-[rgba(9,9,13,0.93)] backdrop-blur-[16px] transition-opacity duration-[350ms]"
      style={{ opacity: visible ? 1 : 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Access progress notes"
    >
      <div className="relative max-w-[420px] w-full px-8 py-12 sm:px-12 sm:py-[52px] border border-[rgba(240,237,232,0.08)] bg-[rgba(12,12,18,0.98)]">
        {/* Close / skip */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 text-white/35 hover:text-white/70 transition-colors duration-150 bg-transparent border-none cursor-pointer rounded"
          aria-label="Skip — read without email"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-white/45 mb-6">Amphora · Progress Notes</p>
        <h2 className="text-[22px] font-semibold tracking-[-0.02em] leading-[1.25] mb-3">
          Enter your email to read our{' '}
          <span className="grad-text">progress notes.</span>
        </h2>
        <p className="text-[14px] text-white/75 font-light leading-[1.65] mb-8">
          Updates on the science, the product, and what we&apos;re learning — free to read, just leave your email.
        </p>

        {submitted ? (
          <div className="flex items-center gap-2.5 pt-4 border-t border-[rgba(240,237,232,0.07)]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 7l3.5 3.5L12 3" stroke="#f03d78" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-[13px] text-white/80">You&apos;re in. Enjoy the notes.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex border border-[rgba(240,237,232,0.1)] w-full focus-within:border-[rgba(240,62,120,0.4)] focus-within:shadow-[0_0_0_3px_rgba(240,62,120,0.07)] transition-all duration-200"
          >
            <input
              ref={inputRef}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="flex-1 bg-[rgba(240,237,232,0.03)] border-none text-[#f0ede8] text-[13px] px-4 py-[13px] outline-none min-w-0 placeholder:text-white/35"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-grad text-white border-none text-[11px] font-bold tracking-[0.05em] uppercase px-[18px] cursor-pointer whitespace-nowrap flex-shrink-0 hover:brightness-110 transition-all duration-150 disabled:opacity-60"
            >
              {loading ? '…' : 'Read now'}
            </button>
          </form>
        )}

        <p className="mt-3.5 text-[11px] text-white/35 tracking-[0.02em]">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  )
}
