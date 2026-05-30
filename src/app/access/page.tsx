'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const VALID_CODES = ['AMPHORA-ALPHA', 'FOUNDER-2026', 'AMPHORA-2026']

function isValidCode(code: string): boolean {
  if (VALID_CODES.includes(code)) return true
  const map = JSON.parse(localStorage.getItem('amphora_codes') || '{}') as Record<string, string>
  return Object.values(map).includes(code)
}

export default function AccessPage() {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('amphora_access') === 'granted') {
      router.replace('/hidden')
    }
  }, [router])

  function handleSubmit() {
    const upper = code.trim().toUpperCase()
    setError(false)
    if (isValidCode(upper)) {
      localStorage.setItem('amphora_access', 'granted')
      setTimeout(() => router.push('/hidden'), 300)
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 400)
    }
  }

  return (
    <>
      <Nav />
      <main className="flex-1 flex items-center justify-center px-[clamp(20px,6vw,80px)] min-h-screen py-20">
        <style>{`
          @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }
          .shake { animation: shake 400ms ease; }
        `}</style>
        <div className="max-w-[420px] w-full px-12 py-[52px] border border-[rgba(240,237,232,0.07)] bg-[rgba(12,12,18,0.98)] rounded-sm max-[520px]:px-6 max-[520px]:py-10">
          <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/50 mb-5">Founding member access</p>
          <h1 className="text-[24px] font-bold tracking-[-0.02em] leading-[1.25] mb-3.5">
            You&apos;ve been approved.<br />
            <span className="grad-text">Enter your code.</span>
          </h1>
          <p className="text-[14px] font-light text-white/80 leading-[1.7] mb-7">
            Your invite code was sent to the email address you used to request access.
          </p>

          <input
            type="text"
            value={code}
            onChange={e => setCode(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="e.g. AMPHORA-ALPHA"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            className={`block w-full bg-transparent border border-[rgba(240,237,232,0.07)] text-[#f0ede8] text-[15px] px-4 py-3.5 outline-none uppercase tracking-[0.08em] mb-3 focus:border-[rgba(240,62,120,0.35)] focus:shadow-[0_0_0_3px_rgba(240,62,120,0.07)] transition-all duration-200 placeholder:normal-case placeholder:tracking-normal placeholder:text-white/50 rounded-none ${shake ? 'shake' : ''}`}
          />

          <button
            onClick={handleSubmit}
            className="block w-full bg-grad text-white border-none text-[14px] font-bold py-3.5 cursor-pointer tracking-[0.02em] hover:brightness-110 transition-all duration-150 text-center"
          >
            Unlock access →
          </button>

          {error && (
            <p className="text-[13px] mt-3 leading-[1.55]" style={{ color: 'rgba(240,80,80,0.7)' }}>
              Invalid code. Check your email or{' '}
              <a href="mailto:hello@amphora.ai" style={{ color: 'rgba(240,80,80,0.7)', textDecoration: 'underline' }}>
                contact us
              </a>.
            </p>
          )}

          <p className="mt-5 text-[11px] text-white/50 text-center">
            Don&apos;t have a code yet?{' '}
            <Link href="/#waitlist" className="text-white/50 underline underline-offset-[2px] hover:text-white/80 transition-colors">
              Request access →
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
