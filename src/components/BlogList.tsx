'use client'

import { useState, useEffect } from 'react'
import BlogPost from '@/components/BlogPost'
import Phase2Body from '@/components/posts/Phase2Body'
import EvalSuiteBody from '@/components/posts/EvalSuiteBody'
import BrainLLMBody from '@/components/posts/BrainLLMBody'
import { EmotionBody, FmriBody, WhyBody } from '@/components/posts/SimplePosts'
import { ALL_POSTS, HIDDEN_POSTS_KEY, getHiddenIds } from '@/lib/posts'

const BODIES: Record<string, React.ComponentType> = {
  'phase-2': Phase2Body,
  'eval-suite': EvalSuiteBody,
  'brain-llm': BrainLLMBody,
  'emotion': EmotionBody,
  'fmri': FmriBody,
  'why': WhyBody,
}

const EXCERPTS: Record<string, string> = {
  'phase-2': "We ran five targeted experiments on the Phase 1 brain-trained adapter: extending training to 500 steps (KL runaway at 280), reversing the reward to suppress Broca's area, running a composite Broca+Wernicke+STS reward that exceeded Phase 1's best score, optimising for the Default Mode Network, and ablating attention vs FFN contributions. The multi-region reward is the standout: higher reward, broader network activation, same qualitative style as Phase 1's best completion.",
  'eval-suite': "We asked whether a language model fine-tuned on a brain reward signal also scores higher on standard NLP benchmarks — or whether neural quality and human-legible quality are orthogonal. We ran a five-experiment evaluation suite on the step-200 checkpoint: multi-criteria judge, style robustness, syntactic complexity, MMLU regression, and MAUVE. The answer is unambiguous.",
  'brain-llm': "We used TRIBE v2 — Meta AI's fMRI prediction model — as the reward signal in an RL training loop. After 200 steps, the language model had learned to produce text that drives 150% higher predicted cortical activation in Broca's area. The whole language network responded. And the text changed in ways we didn't instruct it to.",
  'emotion': "The generative AI industry has spent enormous effort making images more realistic and more prompt-responsive. It has not given AI any mechanism to understand what an image does to the person looking at it. We think that's the last unsolved problem.",
  'fmri': "The core of what we're building — a lightweight model that takes any visual input and outputs predicted brain activation across emotional and perceptual regions — is working. Here's what we built and what we learned.",
  'why': "The generative AI industry has solved for realism and style. It has not solved for feeling. That gap is where Amphora lives.",
}

export default function BlogList() {
  const [hiddenIds, setHiddenIds] = useState<string[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setHiddenIds(getHiddenIds())
    setReady(true)

    function onStorage(e: StorageEvent) {
      if (e.key === HIDDEN_POSTS_KEY) {
        try { setHiddenIds(JSON.parse(e.newValue || '[]')) } catch {}
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const visible = ALL_POSTS.filter(p => !hiddenIds.includes(p.id))

  if (ready && visible.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-[14px] text-white/40 font-light">All posts are currently hidden.</p>
        <p className="text-[12px] text-white/30 mt-2">
          Manage visibility at{' '}
          <a href="/admin" className="underline underline-offset-2 hover:text-white/50 transition-colors">/admin</a>.
        </p>
      </div>
    )
  }

  return (
    <div>
      {visible.map(post => {
        const Body = BODIES[post.id]
        if (!Body) return null
        return (
          <BlogPost
            key={post.id}
            id={post.id}
            date={post.date}
            tag={post.tag}
            readTime={post.readTime}
            title={post.title}
            excerpt={EXCERPTS[post.id] ?? ''}
            initiallyOpen={post.initiallyOpen}
          >
            <Body />
          </BlogPost>
        )
      })}
    </div>
  )
}
