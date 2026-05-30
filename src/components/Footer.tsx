import Image from 'next/image'
import Link from 'next/link'

interface FooterProps {
  maxWidth?: string
  extra?: string
  links?: { href: string; label: string }[]
}

const defaultLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/#about', label: 'About' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: 'mailto:hello@amphora.ai', label: 'Contact' },
]

export default function Footer({ maxWidth = '840px', extra, links = defaultLinks }: FooterProps) {
  return (
    <footer
      className="border-t border-[rgba(240,237,232,0.07)] px-[clamp(20px,6vw,80px)] py-7 flex items-center justify-between flex-wrap gap-3.5 mx-auto w-full"
      style={{ maxWidth: `calc(${maxWidth} + clamp(20px,6vw,80px) * 2)` }}
    >
      <Link href="/" className="flex items-center gap-2.5 text-[14px] font-semibold text-[#f0ede8] no-underline">
        <Image src="/amphora_logo.png" alt="Amphora" width={26} height={26} style={{ mixBlendMode: 'screen' }} />
        Amphora
      </Link>
      <span className="text-[11px] text-white/50">© 2026 Amphora.{extra ? ` ${extra}` : ''}</span>
      <ul className="flex gap-5 list-none">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="text-[11px] text-white/50 no-underline hover:text-white/80 transition-colors duration-150">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  )
}
