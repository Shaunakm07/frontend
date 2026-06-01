'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ALL_POSTS } from '@/lib/posts'
import { getPostVisibility, setPostVisible } from '@/lib/supabase'

const TAG_COLORS: Record<string, string> = {
  Research: 'rgba(240,62,120,0.75)',
  Essay:    'rgba(180,130,240,0.75)',
  Vision:   'rgba(96,160,240,0.75)',
  Progress: 'rgba(240,237,232,0.4)',
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [shake, setShake] = useState(false)
  // visible[id] = true means shown, false means hidden
  const [visibility, setVisibility] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [lastSaved, setLastSaved] = useState<string | null>(null)

  const fetchVisibility = useCallback(async () => {
    setLoading(true)
    const data = await getPostVisibility()
    // default to visible if row doesn't exist yet
    const merged: Record<string, boolean> = {}
    for (const p of ALL_POSTS) merged[p.id] = data[p.id] ?? true
    setVisibility(merged)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (localStorage.getItem('amphora_admin') === 'yes') {
      setAuthed(true)
      fetchVisibility()
    } else {
      setLoading(false)
    }
  }, [fetchVisibility])

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (password.trim().toUpperCase() === 'AMPHORA-ADMIN') {
      localStorage.setItem('amphora_admin', 'yes')
      setAuthed(true)
      fetchVisibility()
    } else {
      setShake(true)
      setTimeout(() => setShake(false), 400)
    }
  }

  async function toggle(id: string) {
    const next = !visibility[id]
    setVisibility(prev => ({ ...prev, [id]: next }))
    setSaving(id)
    const { ok } = await setPostVisible(id, next)
    setSaving(null)
    if (ok) {
      setLastSaved(id)
      setTimeout(() => setLastSaved(null), 2000)
    } else {
      // revert on failure
      setVisibility(prev => ({ ...prev, [id]: !next }))
    }
  }

  async function bulkSet(visible: boolean) {
    const next: Record<string, boolean> = {}
    for (const p of ALL_POSTS) next[p.id] = visible
    setVisibility(next)
    await Promise.all(ALL_POSTS.map(p => setPostVisible(p.id, visible)))
    setLastSaved('all')
    setTimeout(() => setLastSaved(null), 2000)
  }

  function signOut() {
    localStorage.removeItem('amphora_admin')
    setAuthed(false)
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5">
        <style>{`
          @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }
          .shake { animation: shake 400ms ease; }
        `}</style>
        <div className="max-w-[380px] w-full px-10 py-12 border border-[rgba(240,237,232,0.08)] bg-[rgba(12,12,18,0.98)]">
          <div className="flex items-center gap-2.5 mb-8">
            <Image src="/amphora_logo.png" alt="Amphora" width={22} height={22} style={{ mixBlendMode: 'screen' }} />
            <span className="text-[13px] font-semibold text-[#f0ede8]">Amphora</span>
            <span className="text-[10px] font-semibold tracking-[0.06em] uppercase px-2 py-[2px] border border-[rgba(240,237,232,0.1)] text-white/40 ml-1">Admin</span>
          </div>
          <h1 className="text-[20px] font-bold tracking-[-0.02em] mb-1.5">Blog manager</h1>
          <p className="text-[13px] text-white/50 font-light mb-7 leading-[1.6]">Enter the admin password to manage post visibility.</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              className={`bg-transparent border border-[rgba(240,237,232,0.08)] text-[#f0ede8] text-[14px] px-4 py-3 outline-none focus:border-[rgba(240,62,120,0.4)] focus:shadow-[0_0_0_3px_rgba(240,62,120,0.07)] transition-all duration-200 w-full rounded-none ${shake ? 'shake' : ''}`}
            />
            <button
              type="submit"
              className="bg-grad text-white text-[12px] font-bold tracking-[0.04em] uppercase py-3 cursor-pointer hover:brightness-110 transition-all duration-150 w-full border-none"
            >
              Sign in →
            </button>
          </form>
          <Link href="/blog" className="block mt-5 text-[11px] text-white/30 hover:text-white/50 transition-colors no-underline text-center">
            ← Back to blog
          </Link>
        </div>
      </div>
    )
  }

  const visibleCount = Object.values(visibility).filter(Boolean).length

  return (
    <div className="min-h-screen">
      <nav className="fixed inset-x-0 top-0 z-30 flex items-center justify-between h-[60px] px-[clamp(16px,5vw,60px)] border-b border-[rgba(240,237,232,0.07)] bg-[rgba(9,9,13,0.96)] backdrop-blur-[14px]">
        <div className="flex items-center gap-2.5">
          <Image src="/amphora_logo.png" alt="Amphora" width={22} height={22} style={{ mixBlendMode: 'screen' }} />
          <span className="text-[13px] font-semibold text-[#f0ede8]">Amphora</span>
          <span className="text-[10px] font-semibold tracking-[0.06em] uppercase px-2 py-[2px] border border-[rgba(240,237,232,0.1)] text-white/40 ml-1">Admin</span>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/blog" target="_blank" className="text-[12px] text-white/45 no-underline hover:text-white/70 transition-colors">
            View blog →
          </Link>
          <button onClick={signOut} className="text-[12px] text-white/45 hover:text-white/70 transition-colors bg-transparent border-none cursor-pointer font-[inherit]">
            Sign out
          </button>
        </div>
      </nav>

      <div className="max-w-[640px] mx-auto px-[clamp(20px,6vw,60px)] pt-[96px] pb-[80px]">
        <div className="mb-8">
          <h1 className="text-[22px] font-bold tracking-[-0.02em] mb-1">Blog posts</h1>
          <p className="text-[13px] text-white/40 font-light">
            {loading ? 'Loading…' : `${visibleCount} of ${ALL_POSTS.length} posts visible on `}
            {!loading && (
              <a href="/blog" target="_blank" className="text-white/55 underline underline-offset-2 hover:text-white/75 transition-colors">/blog</a>
            )}
            {!loading && '. Changes go live for all visitors immediately.'}
          </p>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => bulkSet(true)}
            className="text-[11px] font-semibold tracking-[0.05em] uppercase px-3.5 py-1.5 border border-[rgba(240,237,232,0.1)] text-white/50 hover:text-white/80 hover:border-[rgba(240,237,232,0.22)] transition-all duration-150 bg-transparent cursor-pointer"
          >
            Show all
          </button>
          <button
            onClick={() => bulkSet(false)}
            className="text-[11px] font-semibold tracking-[0.05em] uppercase px-3.5 py-1.5 border border-[rgba(240,237,232,0.1)] text-white/50 hover:text-white/80 hover:border-[rgba(240,237,232,0.22)] transition-all duration-150 bg-transparent cursor-pointer"
          >
            Hide all
          </button>
          <span
            className="text-[11px] text-[rgba(240,62,120,0.7)] ml-auto transition-opacity duration-300"
            style={{ opacity: lastSaved ? 1 : 0 }}
            aria-live="polite"
          >
            ✓ Live
          </span>
        </div>

        <div className="border border-[rgba(240,237,232,0.07)]">
          {ALL_POSTS.map(post => {
            const isVisible = visibility[post.id] ?? true
            const isSaving = saving === post.id

            return (
              <div
                key={post.id}
                className="flex items-start gap-5 px-6 py-5 border-b border-[rgba(240,237,232,0.07)] last:border-b-0 transition-colors duration-150"
                style={{ background: isVisible ? 'rgba(240,237,232,0.012)' : 'transparent' }}
              >
                {/* Toggle */}
                <button
                  role="switch"
                  aria-checked={isVisible}
                  aria-label={`${isVisible ? 'Hide' : 'Show'} "${post.title}"`}
                  onClick={() => toggle(post.id)}
                  disabled={loading || isSaving}
                  className="relative flex-shrink-0 mt-[2px] cursor-pointer bg-transparent border-none p-0 disabled:opacity-50 disabled:cursor-wait focus-visible:outline focus-visible:outline-2 focus-visible:outline-[rgba(240,62,120,0.6)] rounded-full"
                >
                  <span
                    className="block w-9 h-5 rounded-full transition-all duration-200"
                    style={{
                      background: isVisible
                        ? 'linear-gradient(135deg,#f06030,#f03d78,#b840b8)'
                        : 'rgba(240,237,232,0.1)',
                    }}
                  />
                  <span
                    className="absolute top-[3px] left-[3px] w-[14px] h-[14px] rounded-full bg-white transition-transform duration-200"
                    style={{ transform: isVisible ? 'translateX(16px)' : 'none' }}
                  />
                </button>

                {/* Post info */}
                <div className="flex-1 min-w-0" style={{ opacity: isVisible ? 1 : 0.38, transition: 'opacity 0.2s' }}>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[11px] text-white/35 font-mono">{post.date}</span>
                    <span
                      className="text-[10px] font-semibold tracking-[0.07em] uppercase px-1.5 py-[2px] border border-[rgba(240,237,232,0.1)] rounded-[2px]"
                      style={{ color: TAG_COLORS[post.tag] ?? 'rgba(240,237,232,0.4)' }}
                    >
                      {post.tag}
                    </span>
                    <span className="text-[10px] text-white/25">{post.readTime}</span>
                  </div>
                  <p className="text-[13px] font-medium text-[#f0ede8] leading-[1.4] tracking-[-0.005em]">
                    {post.title}
                  </p>
                </div>

                {/* Status */}
                <span
                  className="text-[10px] font-semibold tracking-[0.06em] uppercase flex-shrink-0 mt-[3px] transition-colors duration-200"
                  style={{ color: isSaving ? 'rgba(240,237,232,0.25)' : isVisible ? 'rgba(240,62,120,0.6)' : 'rgba(240,237,232,0.2)' }}
                >
                  {isSaving ? '…' : isVisible ? 'Live' : 'Hidden'}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
