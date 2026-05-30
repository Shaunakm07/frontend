'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import BrainCanvas from '@/components/BrainCanvas'

export default function HiddenPage() {
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('amphora_access') !== 'granted') {
      router.replace('/')
    }
  }, [router])

  function signOut() {
    localStorage.removeItem('amphora_access')
    router.push('/')
  }

  const timelineItems = [
    { date: 'Q2 2026', desc: 'Closed beta — 50 founding teams. API access, 5 core emotional profiles.', active: true },
    { date: 'Q3 2026', desc: 'Public launch — usage-based pricing live. Emotion Guidance Loop GA.', active: false },
    { date: 'Q4 2026', desc: 'Video support — frame-by-frame activation mapping for film and ads.', active: false },
    { date: '2027', desc: "Custom model fine-tuning — train on your own brand's visual data.", active: false },
  ]

  const pricing = [
    {
      tier: 'Starter', price: '$299', period: '/mo', was: 'Regular: $499/mo', featured: false,
      features: ['50,000 API calls/mo', '5 emotional profiles', 'Standard support'],
    },
    {
      tier: 'Studio', price: '$1,499', period: '/mo', was: 'Regular: $2,400/mo', featured: true,
      features: ['Unlimited API calls', 'Custom profiles', 'Emotion Guidance Loop', 'Priority support'],
    },
    {
      tier: 'Enterprise', price: 'Custom', period: '', was: '', featured: false,
      features: ['On-premise deployment', 'Model fine-tuning', 'Dedicated CSM'],
    },
  ]

  return (
    <>
      {/* Nav */}
      <nav className="fixed inset-x-0 top-0 z-20 flex items-center justify-between h-[60px] px-[clamp(20px,6vw,80px)] bg-[rgba(9,9,13,0.92)] border-b border-[rgba(240,237,232,0.07)] backdrop-blur-[12px]">
        <div className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[-0.01em] text-[#f0ede8]">
          <Image src="/amphora_logo.png" alt="Amphora" width={26} height={26} style={{ mixBlendMode: 'screen' }} />
          Amphora
          <span className="text-[10px] font-semibold tracking-[0.06em] uppercase px-2.5 py-[3px] border border-[rgba(240,62,120,0.3)] text-[rgba(240,62,120,0.8)] ml-1 rounded-full">
            Founding Member
          </span>
        </div>
        <ul className="flex items-center gap-7 list-none">
          <li><Link href="#api-preview" className="text-[13px] text-white/80 no-underline hover:text-[#f0ede8] transition-colors">API</Link></li>
          <li><Link href="#roadmap" className="text-[13px] text-white/80 no-underline hover:text-[#f0ede8] transition-colors">Roadmap</Link></li>
          <li><Link href="#pricing" className="text-[13px] text-white/80 no-underline hover:text-[#f0ede8] transition-colors">Pricing</Link></li>
          <li>
            <button onClick={signOut} className="text-[13px] text-white/80 bg-none border-none cursor-pointer p-0 hover:text-[#f0ede8] transition-colors font-[inherit]">
              Sign out
            </button>
          </li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden text-center">
        <BrainCanvas variant="centered" />
        <div className="relative z-10 max-w-[calc(860px+clamp(20px,6vw,80px)*2)] w-full px-[clamp(20px,6vw,80px)] pt-[100px] pb-[80px] flex flex-col items-center max-[520px]:items-start max-[520px]:text-left">
          <span className="inline-block bg-grad text-white text-[10px] font-semibold tracking-[0.08em] uppercase px-3.5 py-[5px] rounded-full mb-8">
            Founding Member · Private
          </span>
          <h1 className="text-[clamp(48px,7.5vw,80px)] font-bold leading-[1.04] tracking-[-0.035em] mb-6">
            The neural layer<br /><span className="grad-text">is live.</span>
          </h1>
          <p className="text-[17px] font-light text-white/80 leading-[1.7] max-w-[420px]">
            You&apos;re in the founding cohort. What follows is Amphora&apos;s internal product preview, roadmap, and early pricing — not yet public.
          </p>
        </div>
      </section>

      {/* API Preview */}
      <section className="px-[clamp(20px,6vw,80px)] py-[100px] border-t border-[rgba(240,237,232,0.07)] max-w-[calc(860px+clamp(20px,6vw,80px)*2)] mx-auto" id="api-preview">
        <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-white/50 mb-4">Product</p>
        <h2 className="text-[clamp(24px,4vw,38px)] font-bold tracking-[-0.025em] leading-[1.1] mb-3">What the API returns</h2>
        <p className="font-mono text-[12px] text-white/50 mb-3 tracking-[0.04em]">POST /v1/analyze</p>
        <div className="bg-[#060608] border border-[rgba(240,237,232,0.07)] px-8 py-7 font-mono text-[13px] leading-[1.75] overflow-x-auto">
          <pre className="text-left whitespace-pre">{`{
  `}<span style={{ color: 'rgba(240,62,120,0.9)' }}>&quot;image&quot;</span><span style={{ color: 'rgba(240,237,232,0.55)' }}>: </span><span style={{ color: 'rgba(180,237,180,0.8)' }}>&quot;campaign_hero_v3.jpg&quot;</span><span style={{ color: 'rgba(240,237,232,0.55)' }}>,</span>{`
  `}<span style={{ color: 'rgba(240,62,120,0.9)' }}>&quot;activations&quot;</span><span style={{ color: 'rgba(240,237,232,0.55)' }}>: {'{'}</span>{`
    `}<span style={{ color: 'rgba(240,237,232,0.3)' }}>/* predicted fMRI activation per cortical region, 0–1 */</span>{`
    `}<span style={{ color: 'rgba(240,62,120,0.9)' }}>&quot;precuneus&quot;</span><span style={{ color: 'rgba(240,237,232,0.55)' }}>:</span>            <span style={{ color: 'rgba(150,180,240,0.9)' }}>0.84</span><span style={{ color: 'rgba(240,237,232,0.55)' }}>,</span>{`
    `}<span style={{ color: 'rgba(240,62,120,0.9)' }}>&quot;amygdala&quot;</span><span style={{ color: 'rgba(240,237,232,0.55)' }}>:</span>             <span style={{ color: 'rgba(150,180,240,0.9)' }}>0.31</span><span style={{ color: 'rgba(240,237,232,0.55)' }}>,</span>{`
    `}<span style={{ color: 'rgba(240,62,120,0.9)' }}>&quot;fusiform_face_area&quot;</span><span style={{ color: 'rgba(240,237,232,0.55)' }}>:</span>   <span style={{ color: 'rgba(150,180,240,0.9)' }}>0.52</span><span style={{ color: 'rgba(240,237,232,0.55)' }}>,</span>{`
    `}<span style={{ color: 'rgba(240,62,120,0.9)' }}>&quot;anterior_cingulate&quot;</span><span style={{ color: 'rgba(240,237,232,0.55)' }}>:</span>   <span style={{ color: 'rgba(150,180,240,0.9)' }}>0.18</span>{`
  `}<span style={{ color: 'rgba(240,237,232,0.55)' }}>{'}'},</span>{`
  `}<span style={{ color: 'rgba(240,62,120,0.9)' }}>&quot;primary_response&quot;</span><span style={{ color: 'rgba(240,237,232,0.55)' }}>:</span>  <span style={{ color: 'rgba(180,237,180,0.8)' }}>&quot;aspiration&quot;</span><span style={{ color: 'rgba(240,237,232,0.55)' }}>,</span>{`
  `}<span style={{ color: 'rgba(240,62,120,0.9)' }}>&quot;confidence&quot;</span><span style={{ color: 'rgba(240,237,232,0.55)' }}>:</span>        <span style={{ color: 'rgba(150,180,240,0.9)' }}>0.91</span><span style={{ color: 'rgba(240,237,232,0.55)' }}>,</span>{`
  `}<span style={{ color: 'rgba(240,62,120,0.9)' }}>&quot;guidance&quot;</span><span style={{ color: 'rgba(240,237,232,0.55)' }}>:</span>          <span style={{ color: 'rgba(180,237,180,0.8)' }}>&quot;High precuneus activation (0.84) confirms strong aspiration response.&quot;</span>{`
}`}</pre>
        </div>
        <div className="flex flex-wrap gap-2.5 mt-[18px]">
          {['Precuneus · Aspiration', 'Amygdala · Arousal', 'Fusiform · Recognition'].map(tag => (
            <span key={tag} className="text-[12px] font-medium text-white/80 px-3.5 py-[7px] bg-[rgba(240,62,120,0.04)] border-l-2 tracking-[0.02em]" style={{ borderImage: 'linear-gradient(135deg,#f06030,#f03d78,#b840b8) 1' }}>
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="px-[clamp(20px,6vw,80px)] py-[100px] border-t border-[rgba(240,237,232,0.07)] max-w-[calc(860px+clamp(20px,6vw,80px)*2)] mx-auto" id="roadmap">
        <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-white/50 mb-4">Timeline</p>
        <h2 className="text-[clamp(24px,4vw,38px)] font-bold tracking-[-0.025em] leading-[1.1] mb-10">What&apos;s coming</h2>
        <div className="relative pl-7">
          <div className="absolute left-[3px] top-2 bottom-2 w-px bg-[rgba(240,237,232,0.07)]" />
          {timelineItems.map(({ date, desc, active }) => (
            <div key={date} className="relative grid grid-cols-[90px_1fr] gap-x-7 pb-10 last:pb-0">
              <span
                className="absolute left-[-28px] top-[7px] w-2 h-2 rounded-full translate-x-1/2"
                style={active ? { background: 'linear-gradient(135deg,#f06030,#f03d78,#b840b8)', border: 'none' } : { background: 'rgba(240,237,232,0.07)', border: '1px solid rgba(240,237,232,0.07)' }}
              />
              <span className="font-mono text-[12px] text-white/50 leading-[1.6] pt-0.5">{date}</span>
              <p className="text-[14px] text-white/80 font-light leading-[1.7]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="px-[clamp(20px,6vw,80px)] py-[100px] border-t border-[rgba(240,237,232,0.07)] max-w-[calc(860px+clamp(20px,6vw,80px)*2)] mx-auto" id="pricing">
        <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-white/50 mb-4">Early access</p>
        <h2 className="text-[clamp(24px,4vw,38px)] font-bold tracking-[-0.025em] leading-[1.1] mb-1">Founding member pricing</h2>
        <p className="text-[14px] text-white/50 mb-10">Locked in for life. Never increases.</p>
        <div className="grid grid-cols-3 max-[700px]:grid-cols-1 gap-3">
          {pricing.map(({ tier, price, period, was, featured, features }) => (
            <div
              key={tier}
              className="p-7 border flex flex-col gap-0 rounded-sm"
              style={featured ? { borderColor: 'rgba(240,62,120,0.3)', background: 'rgba(240,62,120,0.04)' } : { borderColor: 'rgba(240,237,232,0.07)' }}
            >
              <p className="text-[10px] font-semibold tracking-[0.08em] uppercase text-white/50 mb-[18px]">{tier}</p>
              <p className="text-[32px] font-bold tracking-[-0.03em] leading-none mb-1">
                {price}
                {period && <span className="text-[16px] font-normal text-white/50">{period}</span>}
              </p>
              {was ? (
                <span className="block text-[13px] text-white/50 line-through mb-6">{was}</span>
              ) : (
                <span className="block mb-6 text-[13px]">&nbsp;</span>
              )}
              <ul className="list-none flex flex-col gap-2.5">
                {features.map(f => (
                  <li key={f} className="text-[14px] text-white/80 font-light pl-3.5 relative before:content-['—'] before:absolute before:left-0 before:text-white/50 before:text-[11px]">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="px-[clamp(20px,6vw,80px)] py-[100px] border-t border-[rgba(240,237,232,0.07)] max-w-[calc(860px+clamp(20px,6vw,80px)*2)] mx-auto text-center">
        <h2 className="text-[clamp(24px,4vw,38px)] font-bold tracking-[-0.025em] leading-[1.1] mb-2">Ready to start building?</h2>
        <p className="text-[15px] text-white/80 font-light mb-9">Reply to your invite email or reach out directly.</p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <a
            href="mailto:hello@amphora.ai?subject=Demo request — Founding Member"
            className="bg-grad text-white text-[13px] font-semibold px-6 py-[13px] no-underline hover:brightness-110 transition-all rounded-sm"
          >
            Book a demo →
          </a>
          <a
            href="mailto:hello@amphora.ai"
            className="text-white/80 text-[13px] font-semibold px-6 py-[13px] no-underline border border-[rgba(240,237,232,0.07)] hover:border-[rgba(240,237,232,0.18)] hover:text-[#f0ede8] transition-all rounded-sm"
          >
            Email us →
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[rgba(240,237,232,0.07)] px-[clamp(20px,6vw,80px)] py-7 flex items-center justify-between flex-wrap gap-3.5 max-w-[calc(860px+clamp(20px,6vw,80px)*2)] mx-auto">
        <div className="flex items-center gap-2.5 text-[14px] font-semibold text-[#f0ede8]">
          <Image src="/amphora_logo.png" alt="Amphora" width={26} height={26} style={{ mixBlendMode: 'screen' }} />
          Amphora
        </div>
        <span className="text-[11px] text-white/50">© 2026 Amphora. Founding Member Portal.</span>
        <ul className="flex gap-5 list-none">
          <li><Link href="/blog" className="text-[11px] text-white/50 no-underline hover:text-white/80 transition-colors">Blog</Link></li>
          <li><Link href="/#about" className="text-[11px] text-white/50 no-underline hover:text-white/80 transition-colors">About</Link></li>
          <li><a href="mailto:hello@amphora.ai" className="text-[11px] text-white/50 no-underline hover:text-white/80 transition-colors">Contact</a></li>
        </ul>
      </footer>
    </>
  )
}
