import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BlogGate from '@/components/BlogGate'
import BlogList from '@/components/BlogList'
import { getPostVisibility } from '@/lib/supabase'
import { ALL_POSTS } from '@/lib/posts'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Progress Notes — Amphora',
}

export default async function BlogPage() {
  const visibility = await getPostVisibility()
  const hiddenIds = ALL_POSTS
    .filter(p => visibility[p.id] === false)
    .map(p => p.id)

  return (
    <>
      <Nav />
      <BlogGate />
      <div className="max-w-[calc(700px+clamp(20px,6vw,80px)*2)] mx-auto px-[clamp(20px,6vw,80px)]">
        <header className="pt-[120px] pb-14 border-b border-[rgba(240,237,232,0.07)]">
          <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-white/45 mb-5">Amphora</p>
          <h1 className="text-[clamp(30px,5vw,44px)] font-bold tracking-[-0.03em] leading-[1.06] mb-3">Progress Notes</h1>
          <p className="text-[14px] text-white/70 font-light max-w-[400px] leading-[1.7]">
            Building in public. The science, the product, and what we&apos;re learning along the way.
          </p>
        </header>

        <div className="pb-[120px]">
          <BlogList initialHiddenIds={hiddenIds} />
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
