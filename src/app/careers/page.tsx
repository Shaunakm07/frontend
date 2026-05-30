import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CareersRoles from '@/components/CareersRoles'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Open Roles — Amphora',
  description: 'Join Amphora. We\'re building the first biological basis for emotion in generative AI.',
}

export default function CareersPage() {
  return (
    <>
      <Nav />
      <div className="max-w-[calc(700px+clamp(20px,6vw,80px)*2)] mx-auto px-[clamp(20px,6vw,80px)]">
        <header className="pt-[120px] pb-14 border-b border-[rgba(240,237,232,0.07)]">
          <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-white/45 mb-5">Amphora</p>
          <h1 className="text-[clamp(30px,5vw,44px)] font-bold tracking-[-0.03em] leading-[1.06] mb-4">
            Join us in <span className="grad-text">San Francisco.</span>
          </h1>
          <p className="text-[15px] text-white/70 font-light max-w-[480px] leading-[1.7]">
            We&apos;re a small team solving a hard problem: giving AI a biological basis for understanding human emotion. If that excites you, we&apos;d love to hear from you.
          </p>
        </header>

        <div className="py-16 pb-[120px]">
          <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/40 mb-8">Open roles</p>
          <CareersRoles />
        </div>
      </div>
      <Footer
        maxWidth="700px"
        links={[
          { href: '/', label: 'Home' },
          { href: '/blog', label: 'Blog' },
          { href: '/contact', label: 'Contact' },
          { href: '/privacy', label: 'Privacy' },
        ]}
      />
    </>
  )
}
