export interface PostMeta {
  id: string
  date: string
  tag: string
  readTime: string
  title: string
  initiallyOpen?: boolean
}

export const ALL_POSTS: PostMeta[] = [
  {
    id: 'phase-2',
    date: 'May 31, 2026',
    tag: 'Research',
    readTime: '14 min',
    title: 'Phase 2: Multi-Region Rewards, Suppression, and Layer Ablation. Five Experiments. One Headline Result.',
    initiallyOpen: true,
  },
  {
    id: 'eval-suite',
    date: 'May 29, 2026',
    tag: 'Research',
    readTime: '10 min',
    title: 'The Brain-Trained Model Also Writes Better. We Ran Five Benchmarks to Confirm It.',
  },
  {
    id: 'brain-llm',
    date: 'May 26, 2026',
    tag: 'Research',
    readTime: '12 min',
    title: "We Fine-Tuned a Language Model Using Brain Signals. Here's What Happened.",
  },
  {
    id: 'emotion',
    date: 'May 23, 2026',
    tag: 'Essay',
    readTime: '5 min',
    title: 'Emotion as a Specification, Not a Judgment',
  },
  {
    id: 'fmri',
    date: 'May 18, 2026',
    tag: 'Progress',
    readTime: '4 min',
    title: 'The fMRI Prediction Engine: Phase 1 Complete',
  },
  {
    id: 'why',
    date: 'May 10, 2026',
    tag: 'Vision',
    readTime: '4 min',
    title: "Why We're Building Amphora",
  },
]

export const HIDDEN_POSTS_KEY = 'amphora_hidden_posts'

export function getHiddenIds(): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(HIDDEN_POSTS_KEY) || '[]') as string[]
  } catch {
    return []
  }
}

export function setHiddenIds(ids: string[]): void {
  localStorage.setItem(HIDDEN_POSTS_KEY, JSON.stringify(ids))
}
