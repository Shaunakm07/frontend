'use client'

import { useState, useEffect } from 'react'
import { joinWaitlist } from '@/lib/supabase'

const WL_KEY = 'amphora_wl'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [alreadyJoined, setAlreadyJoined] = useState(false)

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem(WL_KEY) || '[]') as string[]
    if (list.length > 0) setAlreadyJoined(true)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = email.trim().toLowerCase()
    if (!trimmed) return

    const list = JSON.parse(localStorage.getItem(WL_KEY) || '[]') as string[]
    if (!list.includes(trimmed)) localStorage.setItem(WL_KEY, JSON.stringify([...list, trimmed]))

    setLoading(true)
    setError(null)
    const { ok } = await joinWaitlist(trimmed)
    setLoading(false)
    if (ok) {
      setSuccess(true)
    } else {
      setError('Something went wrong — please try again or email us at hello@amphora.ai')
    }
  }

  if (alreadyJoined || success) {
    return (
      <div className="flex items-start gap-3 pt-4 border-t border-[rgba(240,237,232,0.07)] max-w-[440px]">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-[1px]" aria-hidden>
          <circle cx="8" cy="8" r="7.5" stroke="rgba(240,62,120,0.4)" />
          <path d="M4.5 8l2.5 2.5L11.5 6" stroke="#f03d78" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div>
          <p className="text-[13px] text-white/85 leading-[1.6]">
            {success
              ? "You're in. We'll be in touch before your access opens."
              : "You're already on the list. We'll be in touch before access opens."}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[440px]">
      <form
        onSubmit={handleSubmit}
        className="flex border border-[rgba(240,237,232,0.12)] focus-within:border-[rgba(240,62,120,0.4)] focus-within:shadow-[0_0_0_3px_rgba(240,62,120,0.07)] transition-all duration-200"
        noValidate
      >
        <label htmlFor="wl-email" className="sr-only">Email address</label>
        <input
          id="wl-email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          autoComplete="email"
          className="flex-1 bg-[rgba(240,237,232,0.03)] border-none text-[#f0ede8] text-[13px] px-4 py-3.5 outline-none min-w-0 placeholder:text-white/35"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-grad text-white border-none text-[11px] font-bold tracking-[0.05em] uppercase px-5 cursor-pointer whitespace-nowrap flex-shrink-0 hover:brightness-110 transition-all duration-150 disabled:opacity-60 min-h-[48px]"
        >
          {loading ? 'Sending…' : 'Reserve my spot'}
        </button>
      </form>

      {error && (
        <p className="text-[12px] text-[rgba(240,62,120,0.85)] mt-3 leading-[1.5]" role="alert">
          {error}
        </p>
      )}

      <p className="text-[11px] text-white/40 mt-3">
        No spam. Unsubscribe anytime.{' '}
        <a href="/privacy" className="text-white/40 underline underline-offset-[2px] hover:text-white/70 transition-colors">
          Privacy policy
        </a>
      </p>
    </div>
  )
}
