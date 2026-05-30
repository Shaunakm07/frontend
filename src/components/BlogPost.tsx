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
    ? { color: 'rgba(240,62,120,0.85)', borderColor: 'rgba(240,62,120,0.22)', background: 'rgba(240,62,120,0.06)' }
    : tag === 'Essay'
    ? { color: 'rgba(180,130,240,0.85)', borderColor: 'rgba(180,130,240,0.18)', background: 'rgba(180,130,240,0.05)' }
    : tag === 'Vision'
    ? { color: 'rgba(96,160,240,0.85)', borderColor: 'rgba(96,160,240,0.18)', background: 'rgba(96,160,240,0.05)' }
    : { color: 'rgba(240,237,232,0.45)', borderColor: 'rgba(240,237,232,0.1)' }

export default function BlogPost({ id, date, tag, readTime, title, excerpt, initiallyOpen = false, children }: BlogPostProps) {
  const [open, setOpen] = useState(initiallyOpen)

  return (
    <article id={id} className="border-b border-[rgba(240,237,232,0.07)] py-[52px] last:border-b-0">
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <span className="text-[11px] text-white/45 tracking-[0.03em]">{date}</span>
        <span
          className="text-[10px] font-semibold tracking-[0.07em] uppercase px-2 py-[3px] border rounded-[2px]"
          style={tagStyle(tag)}
        >
          {tag}
        </span>
        <span className="text-[11px] text-white/45 ml-auto">{readTime} read</span>
      </div>

      <h2 className="text-[clamp(18px,2.6vw,23px)] font-semibold tracking-[-0.02em] leading-[1.25] mb-3 text-[#f0ede8]">
        {title}
      </h2>

      <p className="text-[14px] text-white/75 font-light leading-[1.8] max-w-[580px] mb-6">{excerpt}</p>

      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="group inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.04em] uppercase text-white/45 hover:text-white/80 transition-colors duration-150 bg-transparent border-none p-0 cursor-pointer"
      >
        <span>{open ? 'Collapse' : 'Read full post'}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          aria-hidden
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '9999px' : '0', opacity: open ? 1 : 0 }}
      >
        <div className="mt-9 pt-9 border-t border-[rgba(240,237,232,0.07)]">
          {children}
        </div>
      </div>
    </article>
  )
}
