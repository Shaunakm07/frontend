# Amphora Frontend Documentation

> **Living document** — add a dated entry to the [Changelog](#changelog) whenever you make a meaningful change to the site.

---

## Table of Contents

1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Design System](#design-system)
4. [Pages](#pages)
   - [/ — Landing page](#---landing-page)
   - [/blog — Research blog](#blog--research-blog)
   - [/access — Invite code gate](#access--invite-code-gate)
   - [/hidden — Members area](#hidden--members-area)
   - [/contact — Contact form](#contact--contact-form)
   - [/privacy · /terms — Legal](#privacy--terms--legal)
5. [Components](#components)
6. [Authentication & Access Control](#authentication--access-control)
7. [Supabase Integration](#supabase-integration)
8. [Brain Mesh (Three.js)](#brain-mesh-threejs)
9. [Charts](#charts)
10. [Assets](#assets)
11. [Deployment](#deployment)
12. [How to Add a New Blog Post](#how-to-add-a-new-blog-post)
13. [How to Add a New Research Section to the Homepage](#how-to-add-a-new-research-section-to-the-homepage)
14. [Changelog](#changelog)

---

## Overview

Amphora's frontend is a **Next.js 15 application** using the App Router, React 19, and Tailwind CSS v3. All pages are statically generated at build time.

| Dependency | Purpose |
|---|---|
| [Next.js 15](https://nextjs.org/) | Framework — App Router, SSG, `next/image`, `next/font` |
| [React 19](https://react.dev/) | UI components and hooks |
| [Tailwind CSS v3](https://tailwindcss.com/) | Utility-first styling |
| [Three.js r0.165](https://threejs.org/) | 3D brain mesh (hero + members page) |
| [Supabase JS v2](https://supabase.com/docs/reference/javascript) | Waitlist signups + contact form storage |
| [Inter](https://fonts.google.com/specimen/Inter) | Font, loaded via `next/font/google` (no CDN request) |

The site is deployed to **[amphorabrain.com](https://amphorabrain.com)** via Vercel.

---

## Project Structure

```
frontend/
├── public/
│   ├── amphora_logo.png        # Logo — 26×26px, mix-blend-mode: screen
│   ├── brain/                  # Binary brain mesh files for Three.js
│   │   ├── left_verts.bin
│   │   ├── left_faces.bin
│   │   ├── right_verts.bin
│   │   ├── right_faces.bin
│   │   └── meta.json
│   ├── logos/                  # University logos for homepage marquee
│   │   ├── harvard.svg
│   │   └── stanford.svg
│   └── plots/                  # Research figures used in blog posts
│       ├── fig1_all_roi_timeseries.png
│       ├── fig2_roi_bar_chart.png
│       ├── fig3_brain_surface.png
│       ├── fig4_global_comparison.png
│       ├── fig5_training_trajectory.png
│       └── exp2_fig*.png       # Exp 2 figures (present but unused — replaced by React charts)
│
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout — Inter font, metadata, body wrapper
│   │   ├── globals.css         # Tailwind directives + CSS custom properties
│   │   ├── page.tsx            # / — Landing page
│   │   ├── blog/page.tsx       # /blog
│   │   ├── access/page.tsx     # /access
│   │   ├── hidden/page.tsx     # /hidden
│   │   ├── contact/page.tsx    # /contact
│   │   ├── privacy/page.tsx    # /privacy
│   │   └── terms/page.tsx      # /terms
│   │
│   ├── components/
│   │   ├── Nav.tsx             # Fixed top nav bar (shared across pages)
│   │   ├── Footer.tsx          # Page footer — accepts maxWidth and links props
│   │   ├── BrainCanvas.tsx     # Three.js brain mesh (client component)
│   │   ├── Marquee.tsx         # Scrolling university logo strip (client component)
│   │   ├── WaitlistForm.tsx    # Waitlist email signup form (client component)
│   │   ├── BlogGate.tsx        # Email gate overlay for /blog (client component)
│   │   ├── BlogPost.tsx        # Expandable blog post container (client component)
│   │   ├── ContactForm.tsx     # Contact form — name, email, subject, message (client component)
│   │   ├── charts/
│   │   │   ├── ChartPrimitives.tsx   # Shared chart building blocks (HBarGroup, ChartBlock, SegBar…)
│   │   │   ├── McjBars.tsx           # Exp 2 — MCJ quality axes (5 horizontal bar groups)
│   │   │   ├── OverviewCharts.tsx    # Exp 2 — MMLU accuracy + style appropriateness
│   │   │   ├── RadarPairChart.tsx    # Exp 2 — SVG pentagon radar + pairwise wins
│   │   │   ├── RobustnessChart.tsx   # Exp 2 — Dialogue injection + style scores
│   │   │   ├── SyntaxChart.tsx       # Exp 2 — 5 syntactic complexity metrics
│   │   │   └── RoiBars.tsx           # Exp 1 — 20 brain region ROI activation bars
│   │   └── posts/
│   │       ├── EvalSuiteBody.tsx     # Exp 2 post body (stat strip, all charts, scorecard)
│   │       ├── BrainLLMBody.tsx      # Exp 1 post body (figures, RoiBars, compare block)
│   │       └── SimplePosts.tsx       # Shorter posts: EmotionBody, FmriBody, WhyBody
│   │
│   └── lib/
│       └── supabase.ts         # joinWaitlist() and submitContact() fetch helpers
│
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## Design System

**Tailwind custom colors** (`tailwind.config.ts`):

| Token | Value | Use |
|---|---|---|
| `amp.bg` | `#09090d` | Page background |
| `amp.text` | `#f0ede8` | Primary text — warm white |
| `amp.orange` | `#f06030` | Gradient start |
| `amp.pink` | `#f03d78` | Gradient mid |
| `amp.purple` | `#b840b8` | Gradient end |

**CSS custom properties** (`globals.css`):

```css
--border: rgba(240, 237, 232, 0.07);   /* subtle dividers and card borders */
--grad:   linear-gradient(135deg, #f06030 0%, #f03d78 52%, #b840b8 100%);
```

**Utility classes** (defined in `globals.css` `@layer utilities`):

| Class | Effect |
|---|---|
| `.grad-text` | Brand gradient applied as text fill |
| `.bg-grad` | Brand gradient as background |
| `.hbar-fill-base` | Steel blue bar fill (baseline model) |
| `.hbar-fill-lora` | Orange→pink gradient bar fill (LoRA model) |
| `.hbar-fill-ref` | Grey bar fill (human reference) |

**Typography:** Inter via `next/font/google`. Headings use negative tracking (−0.02em to −0.04em). Labels use uppercase + wide tracking (+0.08em).

**Nav:** Fixed, 60px, `backdrop-blur-[12px]`, `bg-[rgba(9,9,13,0.92)]`. Shared `Nav` component across all pages except `/hidden` (which has its own custom nav with the "Founding Member" badge).

---

## Pages

### / — Landing page

`src/app/page.tsx` (server component)

Sections in order:

1. **Hero** (`<section id="waitlist">`) — full-viewport, `<BrainCanvas variant="hero" />` positioned absolute behind content; headline, lead, `<WaitlistForm />`
2. **University marquee** — `<Marquee />` below the hero fold
3. **Research section — Exp 1** — 2-column grid (brain surface figure + 3 stat numbers), 3-image strip, CTA linking to `/blog`
4. **Research section — Exp 2** — 4-column stat strip, CTA linking to `/blog`
5. **Blog preview** — 2×2 card grid with lock icons linking to `/blog`
6. **Features** (`id="about"`) — 3 numbered rows: Neural Prediction Engine, Emotion Guidance Loop, Scientific Creative Signal

---

### /blog — Research blog

`src/app/blog/page.tsx` (server component, `'use client'` children handle gating)

`<BlogGate />` is rendered at the top. It checks `localStorage('amphora_wl')` on mount and shows a full-screen overlay if the user hasn't submitted their email yet. Once submitted (via Supabase), the gate fades out and the posts are visible.

Posts are defined as an array in `blog/page.tsx` and rendered via `<BlogPost>` wrappers:

| Post | Body component | Date |
|---|---|---|
| Brain-Trained Models Write Better | `EvalSuiteBody` | May 29, 2026 |
| We Fine-Tuned a Language Model Using Brain Signals | `BrainLLMBody` | May 26, 2026 |
| Emotion as a Specification, Not a Judgment | `EmotionBody` | May 23, 2026 |
| The fMRI Prediction Engine: Phase 1 Complete | `FmriBody` | May 18, 2026 |
| Why We're Building Amphora | `WhyBody` | May 10, 2026 |

The first post (`EvalSuiteBody`) opens by default (`initiallyOpen: true`). The rest are collapsed.

---

### /access — Invite code gate

`src/app/access/page.tsx` (`'use client'`)

Valid codes are hardcoded in the `VALID_CODES` array:
```typescript
const VALID_CODES = ['AMPHORA-ALPHA', 'FOUNDER-2026', 'AMPHORA-2026']
```
Input is uppercased before comparison. It also accepts any code stored in `localStorage('amphora_codes')` (a `{ email: code }` map written during the waitlist flow).

On valid code: sets `localStorage('amphora_access', 'granted')` and redirects to `/hidden`. Invalid code triggers a CSS shake animation.

**To rotate codes:** update the `VALID_CODES` array in `src/app/access/page.tsx`.

---

### /hidden — Members area

`src/app/hidden/page.tsx` (`'use client'`)

Redirects to `/` if `localStorage('amphora_access') !== 'granted'`. Has a custom nav (not the shared `Nav` component) with the "Founding Member" badge and a sign-out button that clears the key.

Sections: Hero with `<BrainCanvas variant="centered" />`, API Preview (syntax-highlighted JSON), Roadmap timeline, Pricing grid (Starter / Studio / Enterprise), CTA.

---

### /contact — Contact form

`src/app/contact/page.tsx` (server component)

Two-column layout: left column has contact info links, right column renders `<ContactForm />`. The form submits to Supabase `contact_submissions`.

---

### /privacy · /terms — Legal

Static server components with no JavaScript. Content covers data collection (email only, Supabase storage, no analytics) and standard SaaS terms.

---

## Components

### `Nav.tsx`
Fixed top bar. Links: About (`/#about`), Blog (`/blog`), Contact (`/contact`), Get access (`/#waitlist`). Logo via `next/image` with `mix-blend-mode: screen`.

### `Footer.tsx`
Accepts `maxWidth?: string`, `links?: { href, label }[]`, `extra?: React.ReactNode`. Different pages pass different `maxWidth` values (840px home, 700px blog/contact, 680px legal).

### `BrainCanvas.tsx`
`'use client'`. Loads Three.js via dynamic import inside `useEffect` to avoid SSR issues. Fetches binary mesh from `/brain/*.bin`, constructs `BufferGeometry` with custom GLSL shaders. Props: `variant: 'hero' | 'centered'`, `sectionRef?` for mouse tracking. Hero variant offsets the brain to the right on desktop.

### `Marquee.tsx`
`'use client'`. Measures `track.scrollWidth`, clones content until 2.5× viewport width, sets `--marquee-shift` and `--marquee-dur` CSS vars, adds `is-running` class to start the CSS keyframe animation.

### `BlogGate.tsx`
`'use client'`. Reads `localStorage('amphora_wl')` on mount. If empty, renders a full-screen fixed overlay with an email form. On submit, calls `joinWaitlist()`, stores email, then fades out with a 450ms opacity transition.

### `BlogPost.tsx`
`'use client'`. Collapsible post with `useState(initiallyOpen)`. Renders meta row, clickable title, excerpt, and expand/collapse button with rotating arrow chevron. Post body is rendered as `children` inside the expanded section.

### `WaitlistForm.tsx`
`'use client'`. Email input + submit button. On success, stores email in `localStorage('amphora_wl')` and shows a confirmation line. Calls `joinWaitlist()` from `lib/supabase.ts`.

### `ContactForm.tsx`
`'use client'`. Fields: name, email, subject, message. Calls `submitContact()`. Shows success/error state inline.

---

## Authentication & Access Control

Two independent access layers, both client-side only:

| Layer | localStorage key | Set by | Checked by |
|---|---|---|---|
| Blog gate | `amphora_wl` (JSON array of emails) | `BlogGate` email form | `BlogGate` on mount |
| Members area | `amphora_access === 'granted'` | `/access` code entry | `/hidden` on mount |

This is UX-layer gating, not server-side security. Pages are publicly accessible by URL. For real access control, add Vercel password protection or move to server-side auth.

---

## Supabase Integration

`src/lib/supabase.ts` exports two async functions that use `fetch()` against the Supabase REST API:

```typescript
joinWaitlist(email: string): Promise<{ ok: boolean }>
submitContact({ name, email, subject, message }): Promise<{ ok: boolean }>
```

Credentials come from environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Set these in `.env.local` locally and in Vercel project settings for production.

| Table | Used by | Columns |
|---|---|---|
| `waitlist` | `WaitlistForm`, `BlogGate` | `email` |
| `contact_submissions` | `ContactForm` | `name, email, subject, message` |

A 201 is success; a 409 (duplicate email) is also treated as success on the waitlist.

---

## Brain Mesh (Three.js)

`BrainCanvas.tsx` fetches four binary files from `public/brain/`:

- `left_verts.bin` / `right_verts.bin` — `Float32Array` of XYZ vertex positions (40,962 vertices per hemisphere)
- `left_faces.bin` / `right_faces.bin` — `Uint32Array` of triangle face indices (81,920 faces per hemisphere)

The GLSL fragment shader uses 5-octave fBm noise driven by `uTime` to animate the activation colour map. The colour ramp (`aC()`) goes orange → pink → purple matching the brand gradient. `uMouse` adds a local brightness boost near the cursor.

The mesh rotates continuously around Y at 0.05 rad/s. Mouse position tilts it slightly on both axes.

**To update the mesh:** replace the four `.bin` files in `public/brain/`. Format must be `Float32Array` for vertices and `Uint32Array` for faces. Update `public/brain/meta.json` with the new counts.

---

## Charts

All charts are pure React + SVG — no charting library.

Shared primitives are in `src/components/charts/ChartPrimitives.tsx`:

| Component | Purpose |
|---|---|
| `HBarGroup` | Name + optional delta badge + multiple horizontal bars |
| `ChartBlock` | Outer border container with optional caption |
| `ChartBody` / `ChartPair` / `ChartCol` | Layout containers (single col, two-col grid, individual column) |
| `ChartLegend` | Coloured dot squares + labels |
| `ChartTitle` / `ChartSub` | Typography |
| `SegBar` | Segmented bar for pairwise wins (Base \| LoRA) |

Bar fill classes (defined in `globals.css`): `.hbar-fill-base` (steel blue), `.hbar-fill-lora` (orange→pink gradient + glow), `.hbar-fill-ref` (grey).

The SVG pentagon radar in `RadarPairChart.tsx` computes vertices as:
```typescript
const a = (i * 2 * Math.PI / 5) - Math.PI / 2  // top-starting, clockwise
const r = v / maxV * R
return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
```

---

## Assets

| Asset | Path | Notes |
|---|---|---|
| Logo | `public/amphora_logo.png` | 26×26px, `mix-blend-mode: screen` |
| Harvard logo | `public/logos/harvard.svg` | Rendered white via Tailwind filter classes |
| Stanford logo | `public/logos/stanford.svg` | Same treatment |
| Brain mesh | `public/brain/*.bin` | Binary, not human-readable |
| Exp 1 figures | `public/plots/fig*.png` | Used in `BrainLLMBody.tsx` as `<img>` tags |
| Exp 2 figures | `public/plots/exp2_fig*.png` | Present but unused — Exp 2 uses React charts |

---

## Deployment

The site deploys to **[amphorabrain.com](https://amphorabrain.com)** via Vercel.

**Build command:** `next build` (run automatically by Vercel on push)  
**Output:** Static — all pages are pre-rendered at build time (no server runtime required)

**Environment variables** required in Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Local development:**
```bash
npm install
npm run dev        # Turbopack dev server at http://localhost:3000
npm run build      # Production build + type check
```

---

## How to Add a New Blog Post

1. Write the post body as a React component. For short posts with no charts, add a named export to `src/components/posts/SimplePosts.tsx`. For longer posts with charts, create a new file (e.g. `src/components/posts/Exp3Body.tsx`).

2. Open `src/app/blog/page.tsx` and add an entry to the posts array at the top:
   ```typescript
   {
     id: 'exp-3',
     date: 'Jun 15, 2026',
     tag: 'Research',
     readTime: '8 min',
     title: 'Your post title',
     excerpt: 'One-sentence summary shown when collapsed.',
     initiallyOpen: false,
     Body: Exp3Body,
   }
   ```

3. Update `src/app/page.tsx`:
   - Add a new blog preview card in the `blog-preview` section
   - If it's a research result, add a new research section above the blog preview

4. If the post has charts, add new chart components in `src/components/charts/`, following the `ChartPrimitives` pattern.

---

## How to Add a New Research Section to the Homepage

Open `src/app/page.tsx`. Two layout options:

**Option A — Stat strip (no images, like Exp 2):**
```tsx
<section className="px-[clamp(20px,6vw,80px)] py-16 border-t border-[var(--border)] max-w-[calc(840px+clamp(20px,6vw,80px)*2)] mx-auto">
  <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-white/50 mb-4">Experiment N · [Date]</p>
  <h2 className="text-[clamp(22px,3.5vw,34px)] font-bold tracking-[-0.025em] leading-[1.1] mb-3">Heading</h2>
  <p className="text-[14px] text-white/75 font-light leading-[1.7] max-w-[520px] mb-10">Lead paragraph.</p>
  <div className="grid grid-cols-4 max-[600px]:grid-cols-2 gap-px bg-[var(--border)]">
    {/* stat cells */}
  </div>
</section>
```

**Option B — Figure + stats grid (with images, like Exp 1):**
Use a 2-column grid with an `<img>` on the left and stat numbers on the right, followed by a 3-image strip. See the Exp 1 section in `src/app/page.tsx` for the exact markup.

---

## Changelog

| Date | Change | Author |
|---|---|---|
| 2026-05-29 | Initial site: all pages, brain mesh, logos, plots, Supabase waitlist. Three.js hero. | Shaunak |
| 2026-05-29 | Replaced all Exp 2 chart images with native HTML/CSS/SVG charts. | Shaunak |
| 2026-05-29 | Added Experiment 2 research section and updated blog preview on homepage. | Shaunak |
| 2026-05-30 | Created standalone `frontend` repo (public mirror). Added FRONTEND.md. | Shaunak |
| 2026-05-30 | Rewrote entire frontend from static HTML to Next.js 15 + React 19 + Tailwind CSS. Removed old HTML files and duplicate root assets. | Shaunak |
