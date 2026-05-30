'use client'

import { useState } from 'react'
import { joinWaitlist } from '@/lib/supabase'

const WL_KEY = 'amphora_wl'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = email.trim().toLowerCase()
    if (!trimmed) return

    const list = JSON.parse(localStorage.getItem(WL_KEY) || '[]') as string[]
    if (!list.includes(trimmed)) localStorage.setItem(WL_KEY, JSON.stringify([...list, trimmed]))

    setLoading(true)
    setError(false)
    const { ok } = await joinWaitlist(trimmed)
    setLoading(false)
    if (ok) {
      setSuccess(true)
    } else {
      setError(true)
    }
  }

  if (success) {
    return (
      <div className="text-[13px] text-white/80 pt-3 border-t border-[rgba(240,237,232,0.07)] mt-4 max-w-[440px]">
        You&apos;re in. We&apos;ll be in touch before your access opens.
      </div>
    )
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex border border-[rgba(240,237,232,0.1)] max-w-[440px] focus-within:border-[rgba(240,62,120,0.35)] focus-within:shadow-[0_0_0_3px_rgba(240,62,120,0.07)] transition-all duration-200"
      >
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          autoComplete="email"
          className="flex-1 bg-[rgba(240,237,232,0.03)] border-none text-[#f0ede8] text-[13px] px-4 py-3.5 outline-none min-w-0 placeholder:text-white/50"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-grad text-white border-none text-[12px] font-bold tracking-[0.03em] uppercase px-[22px] cursor-pointer whitespace-nowrap flex-shrink-0 hover:brightness-110 transition-all duration-150 disabled:opacity-60"
        >
          {loading ? 'Sending…' : 'Reserve my spot'}
        </button>
      </form>
      {error && (
        <div className="text-[13px] text-[rgba(240,62,120,0.8)] pt-3 border-t border-[rgba(240,237,232,0.07)] mt-4 max-w-[440px]">
          Something went wrong — please try again or email us at hello@amphora.ai
        </div>
      )}
      <p className="text-[11px] text-white/50 mt-2 max-w-[440px]">
        No spam. Unsubscribe anytime.{' '}
        <a href="/privacy" className="text-white/50 underline underline-offset-[2px] hover:text-white/80 transition-colors">Privacy policy</a>
      </p>
    </>
  )
}
