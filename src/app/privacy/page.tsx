import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy — Amphora' }

const docCls = {
  h2: 'text-[15px] font-semibold tracking-[-0.01em] text-[#f0ede8] mt-11 mb-3 first:mt-0',
  p: 'text-[14px] font-light text-white/75 leading-[1.8] mb-3.5 last:mb-0',
  ul: 'pl-[18px] mb-3.5',
  li: 'text-[14px] font-light text-white/75 leading-[1.8] mb-1.5',
}

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <div className="max-w-[calc(680px+clamp(20px,6vw,80px)*2)] mx-auto px-[clamp(20px,6vw,80px)]">
        <header className="pt-[120px] pb-[52px] border-b border-[rgba(240,237,232,0.07)]">
          <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-white/[0.42] mb-5">Legal</p>
          <h1 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.03em] leading-[1.08] mb-3">Privacy Policy</h1>
          <p className="text-[13px] text-white/[0.42] font-light">Last updated: May 28, 2026</p>
        </header>

        <div className="py-14 pb-[120px]">
          <p className={docCls.p}>
            Amphora (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the website at <strong className="text-[#f0ede8] font-medium">amphora-nine.vercel.app</strong> and any associated subdomains (the &quot;Service&quot;). This Privacy Policy explains what information we collect, how we use it, and your rights in relation to it.
          </p>
          <p className={docCls.p}>By using the Service you agree to the collection and use of information in accordance with this policy. If you do not agree, please do not use the Service.</p>

          <h2 className={docCls.h2}>1. Information we collect</h2>
          <p className={docCls.p}>We collect only the information you voluntarily provide:</p>
          <ul className={docCls.ul}>
            <li className={docCls.li}><strong className="text-[#f0ede8] font-medium">Email address</strong> — when you join the waitlist or enter your email to access the blog. This is the only personal data we collect.</li>
          </ul>
          <p className={docCls.p}>We do not use tracking cookies, analytics scripts, advertising pixels, or fingerprinting. We use <strong className="text-[#f0ede8] font-medium">localStorage</strong> in your browser solely to remember that you have already submitted your email so you are not asked again on return visits. This data stays on your device and is never transmitted to us.</p>

          <h2 className={docCls.h2}>2. How we use your information</h2>
          <ul className={docCls.ul}>
            <li className={docCls.li}>To add you to our waitlist and notify you when early access opens.</li>
            <li className={docCls.li}>To send you updates about the Amphora product, research, and progress notes — only if you have opted in by submitting your email.</li>
            <li className={docCls.li}>To grant you access to members-only content (Progress Notes blog).</li>
          </ul>
          <p className={docCls.p}>We will never sell, rent, or share your email address with third parties for marketing purposes.</p>

          <h2 className={docCls.h2}>3. Data storage and processors</h2>
          <p className={docCls.p}>Email addresses are stored in <strong className="text-[#f0ede8] font-medium">Supabase</strong> (Supabase Inc., US), a cloud database provider. Supabase acts as a data processor on our behalf and is contractually bound to process your data only as we instruct. Supabase is SOC 2 Type II certified and stores data in secure, access-controlled infrastructure. You can review Supabase&apos;s security practices at <a href="https://supabase.com/security" target="_blank" rel="noopener" className="text-white/75 underline underline-offset-[3px] hover:text-[#f0ede8]">supabase.com/security</a>.</p>
          <p className={docCls.p}>We do not use any other third-party services that process your personal data. The Three.js brain visualisation on our homepage runs entirely in your browser and does not transmit any data.</p>

          <h2 className={docCls.h2}>4. Data retention</h2>
          <p className={docCls.p}>We retain your email address for as long as you remain on our waitlist or use our service. If you request deletion (see Section 6), we will remove your data within 30 days.</p>

          <h2 className={docCls.h2}>5. Legal basis for processing (EEA/UK users)</h2>
          <p className={docCls.p}>If you are located in the European Economic Area or United Kingdom, our legal basis for processing your email address is <strong className="text-[#f0ede8] font-medium">consent</strong> — you provide it voluntarily by submitting our form. You may withdraw consent at any time by contacting us at the address below.</p>

          <h2 className={docCls.h2}>6. Your rights</h2>
          <p className={docCls.p}>You have the right to:</p>
          <ul className={docCls.ul}>
            <li className={docCls.li}><strong className="text-[#f0ede8] font-medium">Access</strong> — request a copy of the personal data we hold about you.</li>
            <li className={docCls.li}><strong className="text-[#f0ede8] font-medium">Deletion</strong> — request that we delete your personal data.</li>
            <li className={docCls.li}><strong className="text-[#f0ede8] font-medium">Correction</strong> — request that we correct inaccurate data.</li>
            <li className={docCls.li}><strong className="text-[#f0ede8] font-medium">Portability</strong> — request your data in a machine-readable format.</li>
            <li className={docCls.li}><strong className="text-[#f0ede8] font-medium">Withdraw consent</strong> — opt out of all communications at any time.</li>
          </ul>
          <p className={docCls.p}>To exercise any of these rights, email us at <a href="mailto:hello@amphora.ai" className="text-white/75 underline underline-offset-[3px] hover:text-[#f0ede8]">hello@amphora.ai</a>. We will respond within 30 days.</p>

          <h2 className={docCls.h2}>7. Children&apos;s privacy</h2>
          <p className={docCls.p}>The Service is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with their email address, please contact us and we will delete it promptly.</p>

          <h2 className={docCls.h2}>8. Changes to this policy</h2>
          <p className={docCls.p}>We may update this Privacy Policy from time to time. When we do, we will update the &quot;Last updated&quot; date at the top of this page. Continued use of the Service after changes are posted constitutes acceptance of the revised policy.</p>

          <h2 className={docCls.h2}>9. Contact</h2>
          <div className="border border-[rgba(240,237,232,0.07)] px-7 py-6 mt-11">
            <p className={`${docCls.p} !mb-0`}>
              For any privacy-related questions or requests:<br /><br />
              <strong className="text-[#f0ede8] font-medium">Amphora</strong><br />
              <a href="mailto:hello@amphora.ai" className="text-white/75 underline underline-offset-[3px] hover:text-[#f0ede8]">hello@amphora.ai</a>
            </p>
          </div>
        </div>
      </div>
      <Footer
        maxWidth="680px"
        links={[
          { href: '/', label: 'Home' },
          { href: '/terms', label: 'Terms' },
          { href: 'mailto:hello@amphora.ai', label: 'Contact' },
        ]}
      />
    </>
  )
}
