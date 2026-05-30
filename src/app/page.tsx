import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BrainCanvas from '@/components/BrainCanvas'
import Marquee from '@/components/Marquee'
import WaitlistForm from '@/components/WaitlistForm'

const blogPreviews = [
  { date: 'May 29, 2026', tag: 'Research', featured: true, title: 'Brain-Trained Models Write Better. Five Benchmarks Confirm It.', excerpt: 'We ran an independent LLM judge, MMLU, style robustness, syntactic complexity, and MAUVE against the step-200 checkpoint. The brain reward signal and human writing quality aligned on every measured axis.', href: '/blog#eval-suite' },
  { date: 'May 26, 2026', tag: 'Research', featured: true, title: 'We Fine-Tuned a Language Model Using Brain Signals. Here\'s What Happened.', excerpt: 'We used TRIBE v2 as the reward signal in an RL training loop. After 200 steps, the model had learned to produce text that drives 150% higher predicted cortical activation in Broca\'s area.', href: '/blog#brain-llm' },
  { date: 'May 23, 2026', tag: 'Essay', featured: false, title: 'Emotion as a Specification, Not a Judgment', excerpt: 'The generative AI industry has spent enormous effort making images more realistic. It has not given AI any mechanism to understand what an image does to the person looking at it.', href: '/blog' },
  { date: 'May 18, 2026', tag: 'Progress', featured: false, title: 'The fMRI Prediction Engine: Phase 1 Complete', excerpt: 'The core of what we\'re building — a lightweight model that takes any visual input and outputs predicted brain activation across emotional and perceptual regions — is working.', href: '/blog' },
]

function ResearchFigure({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <div className="relative overflow-hidden aspect-[4/3] bg-[#06060a] border-r border-[rgba(240,237,232,0.07)] max-[680px]:border-r-0 max-[680px]:border-b group">
      <img src={src} alt={alt} className="w-full h-full object-cover opacity-[0.92] group-hover:opacity-100 transition-opacity duration-300" loading="lazy" />
      <span className="absolute bottom-3 left-3.5 text-[10px] font-medium tracking-[0.05em] uppercase text-[rgba(240,237,232,0.45)] bg-[rgba(6,6,10,0.82)] px-2 py-[3px]">
        {label}
      </span>
    </div>
  )
}

function StripFigure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <div className="relative overflow-hidden aspect-video bg-[#06060a] border-r border-[rgba(240,237,232,0.07)] last:border-r-0 max-[520px]:border-r-0 max-[520px]:border-b group">
      <img src={src} alt={alt} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-200" loading="lazy" />
      <div className="absolute bottom-0 left-0 right-0 px-3.5 pb-2.5 pt-8" style={{ background: 'linear-gradient(transparent, rgba(6,6,10,0.88))' }}>
        <p className="text-[11px] text-[rgba(240,237,232,0.5)] tracking-[0.02em]">{caption}</p>
      </div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/40 mb-4">{children}</p>
  )
}

function ReadLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-[12px] font-bold tracking-[0.04em] uppercase grad-text no-underline hover:opacity-75 transition-opacity whitespace-nowrap"
    >
      {children}
    </Link>
  )
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* ── Hero ── */}
        <section className="relative min-h-[100dvh] flex items-center overflow-hidden" id="waitlist">
          <BrainCanvas variant="hero" />
          <div className="relative z-10 max-w-[540px] w-full px-[clamp(20px,6vw,80px)] pt-[100px] pb-[100px]">
            <p className="flex items-center gap-2 text-[11px] font-medium tracking-[0.09em] uppercase text-white/45 mb-9">
              <span className="w-[5px] h-[5px] rounded-full bg-[#f03d78] flex-shrink-0 animate-pulse" aria-hidden />
              Emotion intelligence · Private beta
            </p>
            <h1 className="text-[clamp(44px,7.5vw,80px)] font-bold leading-[1.05] tracking-[-0.035em] mb-7">
              Know what your images<br />
              <span className="grad-text">do to the brain.</span>
            </h1>
            <p className="text-[17px] font-light text-white/75 leading-[1.75] max-w-[460px] mb-11">
              Amphora gives generative AI a biological basis for feeling. Our fMRI prediction engine maps any visual input to predicted brain activation — turning emotional outcome from a guess into a specification.
            </p>
            <WaitlistForm />
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10 opacity-30 hover:opacity-60 transition-opacity duration-300" aria-hidden>
            <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-white">Scroll</span>
            <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
              <rect x="1" y="1" width="12" height="18" rx="6" stroke="white" strokeWidth="1.2" />
              <rect x="5.5" y="4" width="3" height="5" rx="1.5" fill="white" className="animate-bounce" style={{ animationDuration: '1.6s' }} />
            </svg>
          </div>
        </section>

        {/* ── University marquee ── */}
        <Marquee />

        {/* ── Research section 1 ── */}
        <div className="max-w-[calc(840px+clamp(20px,6vw,80px)*2)] mx-auto px-[clamp(20px,6vw,80px)]">
          <section className="pt-[100px]">
            <SectionLabel>Experiment 1 · May 26, 2026</SectionLabel>
            <h2 className="text-[clamp(24px,3.8vw,36px)] font-bold tracking-[-0.03em] leading-[1.12] mb-5 max-w-[560px]">
              We fine-tuned a language model using real brain signals. It worked.
            </h2>
            <p className="text-[15px] font-light text-white/70 leading-[1.8] max-w-[520px] mb-10">
              Using TRIBE v2 — Meta AI&apos;s fMRI encoder — as the reward signal, we steered a 3B parameter language model toward higher predicted cortical activation in Broca&apos;s area over 200 RL training steps. The entire language network responded. Here&apos;s the data.
            </p>

            <div className="grid grid-cols-2 max-[680px]:grid-cols-1 border border-[rgba(240,237,232,0.07)]">
              <ResearchFigure src="/plots/fig3_brain_surface.png" alt="Cortical surface maps showing base model, LoRA fine-tuned model, and the activation difference" label="Cortical surface — base · LoRA · Δ" />
              <div className="flex flex-col justify-center px-10 py-11 gap-8 max-[520px]:px-6">
                {[
                  { num: '+150%', grad: 'var(--grad)', label: "Broca's area reward gain over 200 training steps" },
                  { num: '×4.6', grad: 'linear-gradient(135deg,#f03d78,#b840b8)', label: 'Global mean cortical BOLD increase (0.023 → 0.104)' },
                  { num: '20', grad: 'linear-gradient(135deg,#b840b8,#6040e8)', label: 'Cortical regions measured — 19 of 20 showed positive gains' },
                ].map(({ num, grad, label }) => (
                  <div key={num}>
                    <div className="text-[40px] font-bold tracking-[-0.04em] leading-none mb-1.5" style={{ background: grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      {num}
                    </div>
                    <div className="text-[13px] text-white/55 leading-[1.5]">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 max-[520px]:grid-cols-1 border-t border-l border-r border-[rgba(240,237,232,0.07)]">
              <StripFigure src="/plots/fig5_training_trajectory.png" alt="Chart showing training trajectory: reward, loss, and KL divergence over 200 steps" caption="Reward · loss · KL over 200 steps" />
              <StripFigure src="/plots/fig2_roi_bar_chart.png" alt="Bar chart comparing 20 cortical ROI activations between base and LoRA models" caption="20 cortical ROI activations — base vs LoRA" />
              <StripFigure src="/plots/fig1_all_roi_timeseries.png" alt="BOLD timeseries for all 20 cortical regions" caption="BOLD timeseries — all 20 regions" />
            </div>

            <div className="border border-[rgba(240,237,232,0.07)] px-8 py-7 flex items-center justify-between gap-6 flex-wrap">
              <p className="text-[14px] font-light text-white/75 leading-[1.65] max-w-[520px]">
                <strong className="text-[#f0ede8] font-medium">The model learned to write differently.</strong> Without being told how, it shifted from scene-setting prose to dialogue-driven narrative — exactly the style that predicts higher BOLD in Broca&apos;s, Wernicke&apos;s, and STS regions.
              </p>
              <ReadLink href="/blog#brain-llm">Read the full write-up →</ReadLink>
            </div>
          </section>
        </div>

        {/* ── Research section 2 ── */}
        <div className="max-w-[calc(840px+clamp(20px,6vw,80px)*2)] mx-auto px-[clamp(20px,6vw,80px)]">
          <section className="pt-20">
            <SectionLabel>Experiment 2 · May 29, 2026</SectionLabel>
            <h2 className="text-[clamp(24px,3.8vw,36px)] font-bold tracking-[-0.03em] leading-[1.12] mb-5 max-w-[560px]">
              The brain-trained model also writes better. Five benchmarks confirm it.
            </h2>
            <p className="text-[15px] font-light text-white/70 leading-[1.8] max-w-[520px] mb-10">
              An independent LLM judge, MMLU regression tests, style robustness checks, syntactic complexity metrics, and MAUVE — five experiments run on the same step-200 checkpoint. The brain reward signal and human writing quality aligned on every measured axis.
            </p>

            <div className="grid grid-cols-4 max-[680px]:grid-cols-2 border border-[rgba(240,237,232,0.07)]">
              {[
                { num: '+0.50', grad: 'var(--grad)', label: 'Mean quality gain across 5 axes (judge scored 1–10)' },
                { num: '11–9', grad: 'linear-gradient(135deg,#f03d78,#b840b8)', label: 'LoRA vs base in blind pairwise comparison across 20 prompts' },
                { num: '0%', grad: 'linear-gradient(135deg,#b840b8,#6040e8)', label: 'MMLU regression — factual knowledge fully intact' },
                { num: '5/5', grad: 'var(--grad)', label: 'Quality axes where LoRA leads — engagement, clarity, coherence, creativity, instruction following' },
              ].map(({ num, grad, label }) => (
                <div key={num} className="px-6 py-7 border-r border-[rgba(240,237,232,0.07)] last:border-r-0 max-[680px]:[&:nth-child(2)]:border-r-0 max-[680px]:[&:nth-child(3)]:border-r max-[680px]:border-b max-[680px]:last:border-b-0">
                  <div className="text-[40px] font-bold tracking-[-0.04em] leading-none mb-1.5" style={{ background: grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {num}
                  </div>
                  <div className="text-[13px] text-white/55 leading-[1.5]">{label}</div>
                </div>
              ))}
            </div>

            <div className="border border-[rgba(240,237,232,0.07)] border-t-0 px-8 py-7 flex items-center justify-between gap-6 flex-wrap mb-24">
              <p className="text-[14px] font-light text-white/75 leading-[1.65] max-w-[520px]">
                <strong className="text-[#f0ede8] font-medium">The brain&apos;s language network is sensitive to the same properties that make text compelling.</strong> The reward signal was neuroscientific — it had no knowledge of human preferences. Yet the two objectives aligned on every axis.
              </p>
              <ReadLink href="/blog#eval-suite">Read the eval suite →</ReadLink>
            </div>
          </section>
        </div>

        {/* ── Blog preview ── */}
        <div className="max-w-[calc(840px+clamp(20px,6vw,80px)*2)] mx-auto px-[clamp(20px,6vw,80px)]">
          <section className="pb-0">
            <div className="flex items-end justify-between gap-5 mb-7 flex-wrap">
              <div>
                <SectionLabel>Progress Notes · Members only</SectionLabel>
                <h2 className="text-[clamp(18px,2.6vw,24px)] font-bold tracking-[-0.025em]">What we&apos;re learning, in writing.</h2>
              </div>
              <ReadLink href="/blog">Enter your email to read →</ReadLink>
            </div>

            <div className="grid grid-cols-2 max-[600px]:grid-cols-1 gap-px bg-[rgba(240,237,232,0.07)] border border-[rgba(240,237,232,0.07)] mb-24">
              {blogPreviews.map(({ date, tag, featured, title, excerpt, href }) => (
                <article key={title} className="bg-[#09090d] px-7 pt-6 pb-6 flex flex-col gap-3 hover:bg-[rgba(240,237,232,0.02)] transition-colors duration-200">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-[11px] text-white/45 tracking-[0.02em]">{date}</span>
                    <span
                      className="text-[10px] font-semibold tracking-[0.07em] uppercase px-2 py-[3px] border rounded-[2px]"
                      style={featured
                        ? { color: 'rgba(240,62,120,0.8)', borderColor: 'rgba(240,62,120,0.2)', background: 'rgba(240,62,120,0.05)' }
                        : { color: 'rgba(240,237,232,0.4)', borderColor: 'rgba(240,237,232,0.1)' }}
                    >
                      {tag}
                    </span>
                  </div>
                  <h3 className="text-[14px] font-semibold tracking-[-0.01em] leading-[1.4] text-[#f0ede8]">{title}</h3>
                  <p className="text-[13px] font-light text-white/50 leading-[1.7] line-clamp-2">{excerpt}</p>
                  <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-white/40">
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden>
                      <rect x="0.6" y="0.6" width="8.8" height="10.8" rx="1.4" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M3 4h4M3 6.5h2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                    </svg>
                    Members only ·{' '}
                    <Link href={href} className="no-underline hover:text-[rgba(240,62,120,0.9)] transition-colors" style={{ color: 'rgba(240,62,120,0.7)' }}>
                      Enter your email to read →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* ── Features / About ── */}
        <div className="max-w-[calc(840px+clamp(20px,6vw,80px)*2)] mx-auto px-[clamp(20px,6vw,80px)]" id="about">
          <section className="border-t border-[rgba(240,237,232,0.07)] pt-16 pb-[120px]">
            <SectionLabel>What we&apos;re building</SectionLabel>
            <h2 className="text-[clamp(20px,3vw,28px)] font-bold tracking-[-0.025em] mb-12 max-w-[480px] leading-[1.2]">
              Emotion as a specification,<br />not an afterthought.
            </h2>
            {[
              { n: '01', title: 'Neural Prediction Engine', body: 'Submit any visual asset — a photo, AI render, ad creative — and receive a map of predicted brain activation across the regions that drive emotional and perceptual response. Not vague labels. Precise neuroscience.' },
              { n: '02', title: 'Emotion Guidance Loop', body: 'Integrate our API into any generative AI pipeline. Set a target emotional profile — aspiration, intimacy, awe, tension — and let the system iterate until the output scores for the intended feeling. Emotional coherence becomes a specification, not an afterthought.' },
              { n: '03', title: 'Scientific Creative Signal', body: 'Know whether your image activates the precuneus for aspiration, the amygdala for threat and awe, or the fusiform cortex for intimacy and recognition — before it goes live. A precise, scientifically grounded signal for designers, AI systems, and brand strategists.' },
            ].map(({ n, title, body }) => (
              <div key={n} className="grid grid-cols-[40px_1fr] gap-x-7 py-10 border-b border-[rgba(240,237,232,0.07)] last:border-b-0">
                <span className="text-[11px] font-medium text-white/35 tracking-[0.04em] pt-[3px]">{n}</span>
                <div>
                  <h3 className="text-[16px] font-semibold tracking-[-0.015em] mb-2.5">{title}</h3>
                  <p className="text-[14px] text-white/70 font-light leading-[1.8] max-w-[540px]">{body}</p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
