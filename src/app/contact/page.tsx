import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Amphora',
}

export default function ContactPage() {
  return (
    <>
      <Nav />
      <div className="max-w-[calc(700px+clamp(20px,6vw,80px)*2)] mx-auto px-[clamp(20px,6vw,80px)] flex-1">
        <header className="pt-[120px] pb-14 border-b border-[rgba(240,237,232,0.07)]">
          <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-white/50 mb-5">Amphora</p>
          <h1 className="text-[clamp(30px,5vw,44px)] font-bold tracking-[-0.03em] leading-[1.06] mb-3">
            Get in <span className="grad-text">touch.</span>
          </h1>
          <p className="text-[14px] text-white/80 font-light max-w-[420px] leading-[1.65]">
            Questions about the product, early access, partnerships, or press — we read everything.
          </p>
        </header>

        <div className="py-16 pb-[120px] grid grid-cols-2 gap-20 items-start max-[640px]:grid-cols-1 max-[640px]:gap-12">
          {/* Info */}
          <div className="pt-1">
            {[
              { label: 'General', content: <a href="mailto:hello@amphora.ai" className="text-white/80 no-underline border-b border-[rgba(240,237,232,0.07)] hover:text-[#f0ede8] hover:border-[rgba(240,237,232,0.2)] transition-all">hello@amphora.ai</a> },
              { label: 'Early access', content: <>Join the waitlist on the <Link href="/#waitlist" className="text-white/80 no-underline border-b border-[rgba(240,237,232,0.07)] hover:text-[#f0ede8] hover:border-[rgba(240,237,232,0.2)] transition-all">home page</Link> to receive an invite code.</> },
              { label: 'Partnerships & press', content: <a href="mailto:hello@amphora.ai" className="text-white/80 no-underline border-b border-[rgba(240,237,232,0.07)] hover:text-[#f0ede8] hover:border-[rgba(240,237,232,0.2)] transition-all">hello@amphora.ai</a> },
              { label: 'Response time', content: 'We aim to reply within one business day.' },
            ].map(({ label, content }) => (
              <div key={label} className="mb-9 last:mb-0">
                <p className="text-[10px] font-semibold tracking-[0.08em] uppercase text-white/50 mb-2">{label}</p>
                <p className="text-[14px] text-white/80 font-light leading-[1.6]">{content}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </div>
      <Footer
        maxWidth="700px"
        links={[
          { href: '/blog', label: 'Blog' },
          { href: '/#about', label: 'About' },
          { href: '/contact', label: 'Contact' },
        ]}
      />
    </>
  )
}
