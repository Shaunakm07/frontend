import Image from 'next/image'
import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-20 flex items-center justify-between h-[60px] px-[clamp(20px,6vw,80px)] bg-[rgba(9,9,13,0.92)] border-b border-[rgba(240,237,232,0.07)] backdrop-blur-[12px]">
      <Link href="/" className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[-0.01em] text-[#f0ede8] no-underline">
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
      <ul className="flex items-center gap-7 list-none">
        <li><Link href="/#about" className="text-[13px] text-white/80 no-underline hover:text-[#f0ede8] transition-colors duration-150">About</Link></li>
        <li><Link href="/blog" className="text-[13px] text-white/80 no-underline hover:text-[#f0ede8] transition-colors duration-150">Blog</Link></li>
        <li><Link href="/contact" className="text-[13px] text-white/80 no-underline hover:text-[#f0ede8] transition-colors duration-150">Contact</Link></li>
        <li><Link href="/#waitlist" className="text-[13px] text-white/80 no-underline hover:text-[#f0ede8] transition-colors duration-150">Get access</Link></li>
      </ul>
    </nav>
  )
}
