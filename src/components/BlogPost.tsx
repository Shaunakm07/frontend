'use client'

import { useState } from 'react'

interface BlogPostProps {
  id?: string
  date: string
  tag: string
  readTime: string
  title: React.ReactNode
  excerpt: string
  initiallyOpen?: boolean
  children: React.ReactNode
}

const tagStyle = (tag: string): React.CSSProperties =>
  tag === 'Research'
    ? { color: 'rgba(240,62,120,0.8)', borderColor: 'rgba(240,62,120,0.2)', background: 'rgba(240,62,120,0.05)' }
    : {}

export default function BlogPost({ id, date, tag, readTime, title, excerpt, initiallyOpen = false, children }: BlogPostProps) {
  const [open, setOpen] = useState(initiallyOpen)

  return (
    <article id={id} className="border-b border-[rgba(240,237,232,0.07)] py-[52px] last:border-b-0">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-[11px] text-white/50 tracking-[0.03em]">{date}</span>
        <span
          className="text-[10px] font-semibold tracking-[0.06em] uppercase px-2 py-[3px] border border-[rgba(240,237,232,0.07)] text-white/50"
          style={tagStyle(tag)}
        >
          {tag}
        </span>
        <span className="text-[11px] text-white/50 ml-auto">{readTime}</span>
      </div>

      <h2
        className="text-[clamp(19px,2.8vw,24px)] font-semibold tracking-[-0.02em] leading-[1.2] mb-3 cursor-pointer text-[#f0ede8] hover:text-white/80 transition-colors duration-150"
        onClick={() => setOpen(o => !o)}
      >
        {title}
      </h2>

      <p className="text-[14px] text-white/80 font-light leading-[1.75] max-w-[580px] mb-5">{excerpt}</p>

      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 text-[12px] font-medium text-white/50 tracking-[0.03em] cursor-pointer bg-none border-none p-0 hover:text-white/80 transition-colors duration-150"
      >
        Read{' '}
        <span className="inline-block transition-transform duration-200" style={{ transform: open ? 'rotate(180deg)' : 'none' }}>
          ↑
        </span>
      </button>

      {open && (
        <div className="mt-9 pt-9 border-t border-[rgba(240,237,232,0.07)]">
          {children}
        </div>
      )}
    </article>
  )
}
