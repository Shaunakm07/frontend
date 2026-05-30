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
  { href: '/careers', label: 'Careers' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: 'mailto:hello@amphora.ai', label: 'Contact' },
]

export default function Footer({ maxWidth = '840px', extra, links = defaultLinks }: FooterProps) {
  return (
    <footer
      className="border-t border-[rgba(240,237,232,0.07)] px-[clamp(20px,6vw,80px)] py-8 mx-auto w-full"
      style={{ maxWidth: `calc(${maxWidth} + clamp(20px,6vw,80px) * 2)` }}
    >
      <div className="flex items-center justify-between gap-6 flex-wrap">
        <Link href="/" className="flex items-center gap-2.5 text-[14px] font-semibold text-[#f0ede8] no-underline hover:opacity-80 transition-opacity">
          <Image src="/amphora_logo.png" alt="Amphora" width={26} height={26} style={{ mixBlendMode: 'screen' }} />
          Amphora
        </Link>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 list-none">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-[12px] text-white/40 no-underline hover:text-white/70 transition-colors duration-150">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <span className="text-[11px] text-white/30 w-full sm:w-auto">
          © 2026 Amphora.{extra ? ` ${extra}` : ''}
        </span>
      </div>
    </footer>
  )
}
