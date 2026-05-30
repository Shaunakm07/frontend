import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BlogGate from '@/components/BlogGate'
import BlogPost from '@/components/BlogPost'
import EvalSuiteBody from '@/components/posts/EvalSuiteBody'
import BrainLLMBody from '@/components/posts/BrainLLMBody'
import { EmotionBody, FmriBody, WhyBody } from '@/components/posts/SimplePosts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Progress Notes — Amphora',
}

const posts = [
  {
    id: 'eval-suite',
    date: 'May 29, 2026',
    tag: 'Research',
    readTime: '10 min',
    title: <>The Brain-Trained Model Also Writes Better.<br />We Ran Five Benchmarks to Confirm It.</>,
    excerpt: 'We asked whether a language model fine-tuned on a brain reward signal also scores higher on standard NLP benchmarks — or whether neural quality and human-legible quality are orthogonal. We ran a five-experiment evaluation suite on the step-200 checkpoint: multi-criteria judge, style robustness, syntactic complexity, MMLU regression, and MAUVE. The answer is unambiguous.',
    initiallyOpen: true,
    Body: EvalSuiteBody,
  },
  {
    id: 'brain-llm',
    date: 'May 26, 2026',
    tag: 'Research',
    readTime: '12 min',
    title: <>We Fine-Tuned a Language Model Using Brain Signals.<br />Here&apos;s What Happened.</>,
    excerpt: 'We used TRIBE v2 — Meta AI\'s fMRI prediction model — as the reward signal in an RL training loop. After 200 steps, the language model had learned to produce text that drives 150% higher predicted cortical activation in Broca\'s area. The whole language network responded. And the text changed in ways we didn\'t instruct it to.',
    initiallyOpen: false,
    Body: BrainLLMBody,
  },
  {
    id: 'emotion',
    date: 'May 23, 2026',
    tag: 'Essay',
    readTime: '5 min',
    title: 'Emotion as a Specification, Not a Judgment',
    excerpt: 'The generative AI industry has spent enormous effort making images more realistic and more prompt-responsive. It has not given AI any mechanism to understand what an image does to the person looking at it. We think that\'s the last unsolved problem.',
    initiallyOpen: false,
    Body: EmotionBody,
  },
  {
    id: 'fmri',
    date: 'May 18, 2026',
    tag: 'Progress',
    readTime: '4 min',
    title: 'The fMRI Prediction Engine: Phase 1 Complete',
    excerpt: 'The core of what we\'re building — a lightweight model that takes any visual input and outputs predicted brain activation across emotional and perceptual regions — is working. Here\'s what we built and what we learned.',
    initiallyOpen: false,
    Body: FmriBody,
  },
  {
    id: 'why',
    date: 'May 10, 2026',
    tag: 'Vision',
    readTime: '4 min',
    title: 'Why We\'re Building Amphora',
    excerpt: 'The generative AI industry has solved for realism and style. It has not solved for feeling. That gap is where Amphora lives.',
    initiallyOpen: false,
    Body: WhyBody,
  },
]

export default function BlogPage() {
  return (
    <>
      <Nav />
      <BlogGate />
      <div className="max-w-[calc(700px+clamp(20px,6vw,80px)*2)] mx-auto px-[clamp(20px,6vw,80px)]">
        <header className="pt-[120px] pb-14 border-b border-[rgba(240,237,232,0.07)]">
          <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-white/50 mb-5">Amphora</p>
          <h1 className="text-[clamp(30px,5vw,44px)] font-bold tracking-[-0.03em] leading-[1.06] mb-3">Progress Notes</h1>
          <p className="text-[14px] text-white/80 font-light max-w-[400px] leading-[1.65]">
            Building in public. The science, the product, and what we&apos;re learning along the way.
          </p>
        </header>

        <div className="pb-[120px]">
          {posts.map(({ id, date, tag, readTime, title, excerpt, initiallyOpen, Body }) => (
            <BlogPost
              key={id}
              id={id}
              date={date}
              tag={tag}
              readTime={readTime}
              title={title}
              excerpt={excerpt}
              initiallyOpen={initiallyOpen}
            >
              <Body />
            </BlogPost>
          ))}
        </div>
      </div>
      <Footer
        maxWidth="700px"
        links={[
          { href: '/', label: 'Home' },
          { href: '/privacy', label: 'Privacy' },
          { href: '/terms', label: 'Terms' },
          { href: 'mailto:hello@amphora.ai', label: 'Contact' },
        ]}
      />
    </>
  )
}
