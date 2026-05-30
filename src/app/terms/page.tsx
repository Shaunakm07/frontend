import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Terms of Service — Amphora' }

const p = 'text-[14px] font-light text-white/75 leading-[1.8] mb-3.5 last:mb-0'
const h2 = 'text-[15px] font-semibold tracking-[-0.01em] text-[#f0ede8] mt-11 mb-3 first:mt-0'
const ul = 'pl-[18px] mb-3.5'
const li = 'text-[14px] font-light text-white/75 leading-[1.8] mb-1.5'

export default function TermsPage() {
  return (
    <>
      <Nav />
      <div className="max-w-[calc(680px+clamp(20px,6vw,80px)*2)] mx-auto px-[clamp(20px,6vw,80px)]">
        <header className="pt-[120px] pb-[52px] border-b border-[rgba(240,237,232,0.07)]">
          <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-white/[0.42] mb-5">Legal</p>
          <h1 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.03em] leading-[1.08] mb-3">Terms of Service</h1>
          <p className="text-[13px] text-white/[0.42] font-light">Last updated: May 28, 2026</p>
        </header>

        <div className="py-14 pb-[120px]">
          <p className={p}>These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Amphora website and any services provided by Amphora (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). Please read them carefully. By accessing or using the Service, you agree to be bound by these Terms.</p>

          <h2 className={h2}>1. The Service</h2>
          <p className={p}>Amphora provides an early-access website and waitlist for a neural prediction product under development. The Service currently includes:</p>
          <ul className={ul}>
            <li className={li}>A waitlist for early access to the Amphora product.</li>
            <li className={li}>A members-only blog (&quot;Progress Notes&quot;) accessible after submitting your email.</li>
            <li className={li}>Research and product information published on this website.</li>
          </ul>
          <p className={p}>The Service is provided free of charge during the pre-launch period. Features, availability, and pricing are subject to change.</p>

          <h2 className={h2}>2. Eligibility</h2>
          <p className={p}>You must be at least 13 years old to use the Service. By using the Service you represent and warrant that you meet this requirement.</p>

          <h2 className={h2}>3. Acceptable use</h2>
          <p className={p}>You agree not to:</p>
          <ul className={ul}>
            <li className={li}>Use the Service for any unlawful purpose or in violation of any applicable law or regulation.</li>
            <li className={li}>Attempt to gain unauthorised access to any part of the Service or its underlying systems.</li>
            <li className={li}>Scrape, crawl, or systematically download content from the Service without our express written permission.</li>
            <li className={li}>Interfere with or disrupt the integrity or performance of the Service.</li>
            <li className={li}>Impersonate any person or entity, or misrepresent your affiliation with any person or entity.</li>
          </ul>

          <h2 className={h2}>4. Intellectual property</h2>
          <p className={p}>All content on the Service — including text, graphics, research write-ups, visual designs, and code — is owned by or licensed to Amphora and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from any content without our prior written consent.</p>
          <p className={p}>The brain visualisation on our homepage uses the <strong className="text-[#f0ede8] font-medium">Three.js</strong> library (MIT licence) and <strong className="text-[#f0ede8] font-medium">TRIBE v2</strong> (Meta AI, CC-BY-NC-4.0). Neither implies endorsement by those parties.</p>

          <h2 className={h2}>5. Scientific disclaimer</h2>
          <p className={p}>Content on this website referencing fMRI predictions, brain activation, and neural responses is based on computational models trained on research datasets. It is provided for informational and product demonstration purposes only. It does not constitute medical advice, clinical diagnosis, or a certified neuroscientific instrument. Predicted cortical responses are model outputs, not measurements from an individual brain scan.</p>

          <h2 className={h2}>6. Disclaimers and limitation of liability</h2>
          <p className={p}>The Service is provided <strong className="text-[#f0ede8] font-medium">&quot;as is&quot;</strong> and <strong className="text-[#f0ede8] font-medium">&quot;as available&quot;</strong> without warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
          <p className={p}>To the fullest extent permitted by law, Amphora shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of — or inability to use — the Service, even if we have been advised of the possibility of such damages.</p>

          <h2 className={h2}>7. Privacy</h2>
          <p className={p}>Your use of the Service is also governed by our <a href="/privacy" className="text-white/75 underline underline-offset-[3px] hover:text-[#f0ede8]">Privacy Policy</a>, which is incorporated into these Terms by reference.</p>

          <h2 className={h2}>8. Changes to these Terms</h2>
          <p className={p}>We reserve the right to modify these Terms at any time. When we do, we will update the &quot;Last updated&quot; date at the top of this page. Your continued use of the Service after changes are posted constitutes your acceptance of the revised Terms.</p>

          <h2 className={h2}>9. Governing law</h2>
          <p className={p}>These Terms are governed by the laws of the State of California, United States, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved in the courts of San Francisco County, California.</p>

          <h2 className={h2}>10. Contact</h2>
          <div className="border border-[rgba(240,237,232,0.07)] px-7 py-6 mt-11">
            <p className={`${p} !mb-0`}>
              Questions about these Terms:<br /><br />
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
          { href: '/privacy', label: 'Privacy' },
          { href: 'mailto:hello@amphora.ai', label: 'Contact' },
        ]}
      />
    </>
  )
}
