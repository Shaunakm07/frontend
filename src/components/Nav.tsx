'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/#about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav
        className="fixed inset-x-0 top-0 z-30 flex items-center justify-between h-[60px] px-[clamp(16px,5vw,72px)] border-b border-[rgba(240,237,232,0.07)] backdrop-blur-[14px] transition-colors duration-300"
        style={{ background: scrolled ? 'rgba(9,9,13,0.96)' : 'rgba(9,9,13,0.88)' }}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[-0.01em] text-[#f0ede8] no-underline flex-shrink-0"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/amphora_logo.png"
            alt="Amphora"
            width={26}
            height={26}
            className="flex-shrink-0"
            style={{ mixBlendMode: 'screen' }}
          />
          Amphora
        </Link>

        {/* Desktop nav */}
        <ul className="hidden sm:flex items-center gap-6 list-none">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-[13px] text-white/70 no-underline hover:text-[#f0ede8] transition-colors duration-150"
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#waitlist"
              className="text-[13px] text-white/80 no-underline hover:text-[#f0ede8] transition-colors duration-150"
            >
              Get access
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          className="sm:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] bg-none border-none cursor-pointer p-1 -mr-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[rgba(240,62,120,0.6)] rounded"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span
            className="block w-5 h-[1.5px] bg-white/80 transition-all duration-200 origin-center"
            style={{ transform: open ? 'translateY(3.25px) rotate(45deg)' : 'none' }}
          />
          <span
            className="block w-5 h-[1.5px] bg-white/80 transition-all duration-200"
            style={{ opacity: open ? 0 : 1, transform: open ? 'scaleX(0)' : 'none' }}
          />
          <span
            className="block w-5 h-[1.5px] bg-white/80 transition-all duration-200 origin-center"
            style={{ transform: open ? 'translateY(-3.25px) rotate(-45deg)' : 'none' }}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className="sm:hidden fixed inset-0 z-20 transition-all duration-300"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          background: 'rgba(9,9,13,0.97)',
          backdropFilter: 'blur(16px)',
        }}
        aria-hidden={!open}
      >
        <ul className="flex flex-col items-center justify-center h-full gap-8 list-none px-8 pt-[60px]">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="text-[28px] font-semibold tracking-[-0.02em] text-white/80 no-underline hover:text-white transition-colors duration-150"
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#waitlist"
              onClick={() => setOpen(false)}
              className="text-[28px] font-semibold tracking-[-0.02em] text-white/80 no-underline hover:text-white transition-colors duration-150"
            >
              Get access
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
