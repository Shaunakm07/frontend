'use client'

import { useState } from 'react'

const APPLY_EMAIL = 'shaunak.mohapatra@gmail.com'

const roles = [
  {
    id: 'research-scientist',
    title: 'Founding Research Scientist, Computational Neuroscience',
    location: 'San Francisco',
    mode: 'In person',
    type: 'Full-time',
    about: `You'll be one of the first research hires at Amphora, working directly on our fMRI prediction engine and brain-reward training loop. This is a founding role — you'll shape the research direction, own major technical decisions, and publish work that defines a new field.`,
    responsibilities: [
      'Design and train models that predict brain activation (fMRI BOLD signal) from visual and language inputs',
      'Extend our RL training pipeline using neural reward signals (building on TRIBE v2)',
      'Run ablations and evaluations across cortical regions, publishing results publicly',
      'Collaborate closely with the engineering team to integrate research into production systems',
      'Help define Amphora\'s scientific roadmap and methodology',
    ],
    requirements: [
      'PhD or equivalent research experience in computational neuroscience, ML, or a closely related field',
      'Hands-on experience with fMRI data analysis (GLM, ROI analysis, surface projection)',
      'Strong PyTorch skills; experience with RL or RLHF a significant plus',
      'Track record of shipping research — papers, open-source work, or internal results at scale',
      'Ability to move fast: prototype, evaluate, and iterate in weeks, not months',
    ],
  },
  {
    id: 'ml-engineer',
    title: 'Machine Learning Engineer',
    location: 'San Francisco',
    mode: 'In person',
    type: 'Full-time',
    about: `You'll build and own the ML infrastructure that powers Amphora's emotion intelligence API — from training pipelines and model serving to evaluation frameworks and customer-facing endpoints. You'll work at the boundary of research and production, turning experimental results into reliable systems.`,
    responsibilities: [
      'Build and maintain training pipelines for fMRI prediction and RL fine-tuning at scale',
      'Design and operate model serving infrastructure with low-latency inference requirements',
      'Own our evaluation harness — automated benchmarks, regression tracking, quality gates',
      'Collaborate with research to ship model improvements to production quickly',
      'Instrument and monitor model performance in production; own reliability',
    ],
    requirements: [
      '3+ years of ML engineering experience, with at least one production model shipped end-to-end',
      'Strong Python and PyTorch; experience with distributed training (DDP, FSDP, or DeepSpeed)',
      'Familiarity with model serving patterns (ONNX, TensorRT, vLLM, or similar)',
      'Experience with experiment tracking (W&B, MLflow) and reproducible ML workflows',
      'Comfort working in a fast-moving, early-stage environment with significant ownership',
    ],
  },
  {
    id: 'marketing-intern',
    title: 'Marketing & Growth Intern',
    location: 'San Francisco',
    mode: 'In person',
    type: 'Summer internship',
    about: `You'll work directly with the founders to grow Amphora's early community — designers, AI researchers, creative technologists, and brand teams. This is a hands-on role: writing, distribution, community building, and helping us figure out what resonates before we scale.`,
    responsibilities: [
      'Write and distribute content that explains our research to a broad creative and technical audience',
      'Manage and grow Amphora\'s presence on Twitter/X, LinkedIn, and relevant research communities',
      'Help build the waitlist and early user base through targeted outreach and partnership ideas',
      'Assist in producing launch materials for new experiments and product milestones',
      'Track and report on growth metrics; identify what\'s working and double down',
    ],
    requirements: [
      'Strong writer — you can explain complex ideas simply without losing the nuance',
      'Genuine interest in AI, neuroscience, or the intersection of technology and creativity',
      'Some experience building or growing an online audience, community, or brand',
      'Comfortable working in a small team where the scope of your role will expand quickly',
      'Based in San Francisco (or willing to relocate) for the summer',
    ],
  },
  {
    id: 'research-intern',
    title: 'Research Intern, Applied Neuroscience',
    location: 'San Francisco',
    mode: 'In person',
    type: 'Summer internship',
    about: `You'll work alongside our research scientists on active experiments — running analyses, building evaluation pipelines, and exploring new directions in brain-AI alignment. This is a serious research role for a student who wants to contribute to published, real-world work.`,
    responsibilities: [
      'Run fMRI data analyses and help extend our cortical ROI evaluation framework',
      'Build tooling to visualise and interpret brain activation maps across experiments',
      'Assist in designing and running ablations on the language model training pipeline',
      'Write up findings clearly — internal reports and contributions to public write-ups',
      'Explore new research directions and present ideas to the team weekly',
    ],
    requirements: [
      'Currently pursuing a degree in neuroscience, cognitive science, computer science, or a related field',
      'Familiarity with neuroimaging concepts (fMRI, BOLD signal, ROI analysis) — coursework or research experience',
      'Python proficiency; experience with NumPy, nibabel, nilearn, or similar neuroimaging libraries a plus',
      'Intellectual curiosity and ability to read and apply recent ML and neuroscience papers',
      'Available full-time in San Francisco for the summer (June–August)',
    ],
  },
]

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="flex-shrink-0 transition-transform duration-200"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
      aria-hidden
    >
      <path d="M2.5 5l4.5 4 4.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function CareersRoles() {
  const [openId, setOpenId] = useState<string | null>(null)

  function toggle(id: string) {
    setOpenId(prev => (prev === id ? null : id))
  }

  return (
    <div className="border border-[rgba(240,237,232,0.07)]">
      {roles.map((role, i) => {
        const isOpen = openId === role.id
        return (
          <div
            key={role.id}
            id={role.id}
            className={`border-b border-[rgba(240,237,232,0.07)] last:border-b-0 ${isOpen ? 'bg-[rgba(240,237,232,0.015)]' : ''} transition-colors duration-200`}
          >
            {/* Row / toggle */}
            <button
              onClick={() => toggle(role.id)}
              aria-expanded={isOpen}
              className="w-full text-left flex items-start justify-between gap-6 px-7 py-7 cursor-pointer bg-transparent border-none group"
            >
              <div className="min-w-0">
                <h2 className="text-[15px] font-semibold tracking-[-0.01em] leading-[1.35] text-[#f0ede8] mb-2 group-hover:text-white transition-colors duration-150">
                  {role.title}
                </h2>
                <p className="text-[12px] text-white/40 tracking-[0.01em]">
                  {role.location} · {role.mode} · {role.type}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[12px] font-medium text-white/45 group-hover:text-white/70 transition-colors duration-150 flex-shrink-0 pt-[3px]">
                <span>View role</span>
                <ChevronDown open={isOpen} />
              </div>
            </button>

            {/* Expanded content */}
            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: isOpen ? '9999px' : '0', opacity: isOpen ? 1 : 0 }}
            >
              <div className="px-7 pb-9 border-t border-[rgba(240,237,232,0.07)] pt-7 space-y-7">
                <p className="text-[14px] text-white/70 font-light leading-[1.8] max-w-[540px]">
                  {role.about}
                </p>

                <div>
                  <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/35 mb-3">What you&apos;ll do</p>
                  <ul className="space-y-2.5">
                    {role.responsibilities.map((r, j) => (
                      <li key={j} className="flex items-start gap-3 text-[13px] text-white/65 font-light leading-[1.7]">
                        <span className="mt-[7px] w-[3px] h-[3px] rounded-full bg-[rgba(240,62,120,0.6)] flex-shrink-0" aria-hidden />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/35 mb-3">What we&apos;re looking for</p>
                  <ul className="space-y-2.5">
                    {role.requirements.map((r, j) => (
                      <li key={j} className="flex items-start gap-3 text-[13px] text-white/65 font-light leading-[1.7]">
                        <span className="mt-[7px] w-[3px] h-[3px] rounded-full bg-[rgba(240,62,120,0.6)] flex-shrink-0" aria-hidden />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-1 border-t border-[rgba(240,237,232,0.07)] flex items-center gap-5 flex-wrap">
                  <a
                    href={`mailto:${APPLY_EMAIL}?subject=Application — ${encodeURIComponent(role.title)}`}
                    className="inline-flex items-center gap-2 bg-grad text-white text-[12px] font-bold tracking-[0.04em] uppercase px-6 py-3 no-underline hover:brightness-110 transition-all duration-150"
                  >
                    Apply for this role →
                  </a>
                  <p className="text-[12px] text-white/35">
                    Send your CV and a short note to{' '}
                    <a href={`mailto:${APPLY_EMAIL}`} className="text-white/50 underline underline-offset-2 hover:text-white/70 transition-colors">
                      {APPLY_EMAIL}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
