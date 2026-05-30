# Amphora Frontend Documentation

> **Living document** — add a dated entry to the [Changelog](#changelog) whenever you make a meaningful change to the site.

---

## Table of Contents

1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [Design System](#design-system)
4. [Pages](#pages)
   - [index.html — Landing page](#indexhtml--landing-page)
   - [blog.html — Research blog](#bloghtml--research-blog)
   - [access.html — Invite code gate](#accesshtml--invite-code-gate)
   - [hidden.html — Members area](#hiddenhtml--members-area)
   - [contact.html — Contact form](#contacthtml--contact-form)
   - [privacy.html / terms.html](#privacyhtml--termshtml)
5. [Authentication & Access Control](#authentication--access-control)
6. [Supabase Integration](#supabase-integration)
7. [Brain Mesh (Three.js)](#brain-mesh-threejs)
8. [Native Charts (blog.html)](#native-charts-bloghtml)
9. [Assets](#assets)
10. [Deployment](#deployment)
11. [How to Add a New Blog Post](#how-to-add-a-new-blog-post)
12. [How to Add a New Research Section to the Homepage](#how-to-add-a-new-research-section-to-the-homepage)
13. [Changelog](#changelog)

---

## Overview

Amphora's frontend is a **zero-framework static site** — plain HTML, CSS, and vanilla JavaScript across 7 pages. No build step, no npm, no bundler. The only external dependencies are:

| Dependency | What it does | How it's loaded |
|---|---|---|
| [Inter](https://fonts.google.com/specimen/Inter) | Body + heading font | Google Fonts CDN |
| [Three.js r0.165](https://threejs.org/) | 3D brain mesh on hero + members page | ES module import via importmap |
| [Supabase](https://supabase.com/) | Waitlist signups + contact form storage | `fetch()` calls to the REST API |

Everything else — charts, animations, access control — is written from scratch inline.

The site is deployed to **[amphorabrain.com](https://amphorabrain.com)** via Vercel (project: `amphora`, org: `shaunak-mohapatras-projects`).

---

## File Structure

```
frontend/
├── index.html          # Landing page (hero, research sections, blog preview)
├── blog.html           # Research blog (gated, all posts, native charts)
├── access.html         # Invite code entry page
├── hidden.html         # Members-only area (post-access brain visualisation)
├── contact.html        # Contact / inquiry form
├── privacy.html        # Privacy policy
├── terms.html          # Terms of service
│
├── amphora_logo.png    # Logo used in nav + footer across all pages
│
├── brain/              # Binary brain mesh data for Three.js
│   ├── left_verts.bin  # Float32Array — left hemisphere vertex positions
│   ├── left_faces.bin  # Uint32Array — left hemisphere face indices
│   ├── right_verts.bin
│   ├── right_faces.bin
│   └── meta.json       # Vertex/face counts + bounding boxes
│
├── logos/              # University logos for homepage marquee
│   ├── harvard.svg
│   └── stanford.svg
│
└── plots/              # Static research figures (used in blog.html Exp 1 post)
    ├── fig1_all_roi_timeseries.png
    ├── fig2_roi_bar_chart.png
    ├── fig3_brain_surface.png
    ├── fig4_global_comparison.png
    ├── fig5_training_trajectory.png
    └── exp2_fig*.png   # Exp 2 figures (currently unused — replaced by native charts)
```

---

## Design System

All design tokens are CSS custom properties declared in `:root` at the top of every page's `<style>` block. They are identical across all pages.

```css
:root {
  --bg:     #09090d;                          /* near-black page background */
  --text:   #f0ede8;                          /* primary text — warm white */
  --dim:    rgba(255,255,255,.82);            /* secondary text */
  --dimmer: rgba(255,255,255,.50);            /* muted text, labels */
  --border: rgba(240,237,232,.07);            /* subtle dividers and card borders */
  --c1:     #f06030;                          /* gradient start — orange */
  --c2:     #f03d78;                          /* gradient mid — pink */
  --c3:     #b840b8;                          /* gradient end — purple */
  --grad:   linear-gradient(135deg, #f06030 0%, #f03d78 52%, #b840b8 100%);
  --max:    840px;                            /* max content width (700px on contact) */
  --pad:    clamp(20px, 6vw, 80px);          /* responsive horizontal padding */
}
```

**Typography:** Inter from Google Fonts. Base `16px / 1.6`. Headings use negative letter-spacing (−0.02em to −0.04em). Labels and eyebrows use uppercase + wide letter-spacing (+0.08em–0.1em).

**Gradient text:** Apply `.grad-text` class. Uses `-webkit-background-clip: text` + `-webkit-text-fill-color: transparent`.

**Nav:** Fixed, 60px tall, `backdrop-filter: blur(12px)`, `rgba(9,9,13,.92)` background. Identical across all pages.

**Scrollbar:** 2px wide, `var(--border)` thumb — minimal and dark.

---

## Pages

### index.html — Landing page

The main marketing page. Sections in order:

#### 1. Hero (`<section class="hero" id="waitlist">`)
- Full-viewport height
- Three.js brain mesh renders in `<canvas id="heroCanvas">` (positioned absolute, behind content)
- Headline, lead paragraph, waitlist email form
- Form submits to Supabase `waitlist` table via `joinWaitlist()`
- On success: hides form, shows `.success-line` confirmation
- `<div class="uni-strip">` — scrolling marquee of university logos (Harvard, Stanford), JS-driven infinite scroll

#### 2. Research Section — Experiment 1 (`<section class="research">`)
- Label: `Experiment 1 · May 26, 2026`
- `.research-layout` — 2-column grid: left is a brain surface image (`plots/fig3_brain_surface.png`), right is `.research-stats` with 3 stat numbers (+150%, ×4.6, 20)
- `.research-figures-strip` — 3-up image strip: training trajectory, ROI bar chart, timeseries
- `.research-cta` — description blurb + "Read the full write-up →" link to `blog.html#brain-llm`

#### 3. Research Section — Experiment 2 (`<section class="research" style="padding-top:64px">`)
- Label: `Experiment 2 · May 29, 2026`
- `.research-stat-strip` — 4-column stat grid: +0.50 quality gain, 11–9 pairwise, 0% MMLU regression, 5/5 axes
- `.research-cta` — description blurb + "Read the eval suite →" link to `blog.html#eval-suite`

#### 4. Blog Preview (`<section class="blog-preview">`)
- 4 `.bpcard` articles in a 2-column `.blog-preview-grid`
- Current cards (newest first): May 29 Exp 2, May 26 Exp 1, May 23 Essay, May 18 Progress
- Each card has a `.bpcard-lock` nudge linking to `blog.html` (the gate email form)

#### 5. Features (`<section class="features" id="about">`)
- 3 numbered feature rows: Neural Prediction Engine, Emotion Guidance Loop, Scientific Creative Signal

---

### blog.html — Research blog

The blog is **gated behind an email form**. On load, JS checks `localStorage.getItem('amphora_wl')` — if the user's email is already stored, it skips the gate and shows the posts directly.

#### Gate flow
1. Page loads → JS checks `localStorage` for stored email
2. If absent: `.blog-gate` overlay is visible, posts are hidden
3. User enters email → `submitGateEmail()` → Supabase insert → on success: stores email in `localStorage('amphora_wl')`, hides gate, shows posts
4. On return visits: gate is bypassed automatically

#### Post structure
Each post is an `<article class="post" id="...">`. The post body is `<div class="post-body open" id="p...">`.

Current posts (newest first):

| ID | Title | Date |
|---|---|---|
| `#eval-suite` | Brain-Trained Models Write Better. Five Benchmarks Confirm It. | May 29, 2026 |
| `#brain-llm` | We Fine-Tuned a Language Model Using Brain Signals. | May 26, 2026 |
| `#emotion-spec` | Emotion as a Specification, Not a Judgment | May 23, 2026 |
| `#phase1` | The fMRI Prediction Engine: Phase 1 Complete | May 18, 2026 |
| `#why-amphora` | Why We're Building Amphora | May 10, 2026 |

#### Native charts (Experiment 2 post)
All Experiment 2 charts are rendered by JavaScript IIFE functions into placeholder `<div id="...">` elements. No images — fully native HTML/CSS/SVG.

| Div ID | Builder function | What it renders |
|---|---|---|
| `#mcjBars` | `buildMcjBars()` | 5 horizontal bar groups — MCJ quality axes (Base vs LoRA) |
| `#radarPairChart` | `buildRadarPairChart()` | Left: SVG pentagon radar (5 axes, Base vs LoRA). Right: pairwise wins by task category as segmented bars |
| `#overviewCharts` | `buildOverviewCharts()` | MMLU accuracy by subject group + style appropriateness scores |
| `#robustnessChart` | `buildRobustnessChart()` | Dialogue injection rate + style appropriateness by context type |
| `#syntaxChart` | `buildSyntaxChart()` | 5 syntactic complexity metrics (Base / LoRA / Human reference) |

Chart card layout hierarchy:
```
.chart-block          → outer border + overflow hidden
  .cblock-body        → single column layout
  .cblock-pair        → two-column grid (1px gap on var(--border) background)
    .cblock-col       → each column, dark background
  .chart-cap          → caption row inside the card, border-top
```

Bar fill classes: `.hf-base` (steel blue), `.hf-lora` (orange→pink gradient with glow), `.hf-ref` (grey, for human reference values).

Experiment 1 post uses static `<img>` tags from `plots/` for the training figures, plus a `buildRoiBars()` JS function that renders a 20-region ROI activation bar chart into `<div id="roiBars">`.

---

### access.html — Invite code gate

Accepts an invite code and grants access to `hidden.html`.

**Valid codes** are hardcoded in the JS array `VALID_CODES`:
```javascript
const VALID_CODES = ['AMPHORA-ALPHA', 'FOUNDER-2026', 'AMPHORA-2026'];
```
Codes are case-insensitive (input is `.toUpperCase()`'d before comparison).

It also accepts any per-device code stored in `localStorage('amphora_codes')` — a map of `{ email: code }` written during the waitlist flow.

On valid code: sets `localStorage('amphora_access', 'granted')` and redirects to `hidden.html`.

**To add or rotate codes:** edit the `VALID_CODES` array in `access.html`. Note that old codes remain valid on devices where they were already entered (they're stored in localStorage).

---

### hidden.html — Members area

Protected page — redirects to `index.html` if `localStorage('amphora_access') !== 'granted'`.

Contains the full interactive brain visualisation (same Three.js shader setup as the hero). Has a sign-out button that clears `amphora_access` from localStorage.

---

### contact.html — Contact form

Simple contact form (name, email, subject, message). Submits to Supabase `contact_submissions` table. Shows a success message on 201 response, error message on failure.

---

### privacy.html / terms.html

Static legal pages. No JavaScript beyond the shared nav. Content follows standard SaaS boilerplate — update if the product scope changes.

---

## Authentication & Access Control

The site has two independent access layers, both client-side only:

| Layer | Key | Set by | Checked by |
|---|---|---|---|
| Blog gate | `localStorage('amphora_wl')` — array of emails | Email form on `blog.html` | `blog.html` on load |
| Members area | `localStorage('amphora_access') === 'granted'` | Invite code entry on `access.html` | `hidden.html` on load |

**Important:** this is UX-layer gating only, not server-side security. The HTML files are publicly accessible if someone finds the URL. If you need real access control in future, move to a server-rendered approach or put pages behind Vercel password protection.

---

## Supabase Integration

Project URL: `https://hjmtberuxmpjndujighl.supabase.co`

The anon key is embedded in `index.html` and `blog.html`. It's intentionally public (Supabase anon keys are designed to be client-facing) but row-level security should be set on the tables.

| Table | Used in | What's stored |
|---|---|---|
| `waitlist` | `index.html`, `blog.html` | `{ email }` — waitlist signups |
| `contact_submissions` | `contact.html` | `{ name, email, subject, message }` |

Both use `POST /rest/v1/<table>` with `Prefer: return=minimal`. A 201 is success; a 409 (duplicate email) is also treated as success on the waitlist form.

---

## Brain Mesh (Three.js)

Used on `index.html` (hero background) and `hidden.html` (members area feature).

The mesh is loaded from four binary files in `brain/`:
- `left_verts.bin` / `right_verts.bin` — `Float32Array` of XYZ vertex positions (40,962 vertices each hemisphere)
- `left_faces.bin` / `right_faces.bin` — `Uint32Array` of triangle face indices (81,920 faces each)

The shader (`FS` fragment shader string) uses 5-octave fBm noise driven by `uTime` to animate the activation colour map. The colour ramp (`aC()`) goes orange → pink → purple matching the brand gradient. A mouse proximity term (`uMouse`) adds a local brightness boost near the cursor.

The mesh is rotated continuously around Y at 0.05 rad/s. Mouse interaction tilts it slightly on both axes.

**To update the mesh:** replace the four `.bin` files with new exports from your surface reconstruction pipeline. Vertex count doesn't matter as long as the binary format is `Float32Array` (verts) and `Uint32Array` (faces). Update `brain/meta.json` with the new counts.

---

## Native Charts (blog.html)

The chart system is built entirely in vanilla JS and CSS — no charting library.

### Helper functions

```javascript
leg(...items)
// Builds .nc-legend HTML from [{cls, label}] items

hbg(name, rows, delta, dir)
// Builds a .hbg group: label + delta badge + multiple horizontal bars
// rows: [{key, val, max, cls, label?}]
// delta: string like '+0.50', dir: 'pos'|'neg'|'zero'

pseg(label, b, l)
// Builds a .pseg-row with a segmented bar (Base | LoRA split)
// b = base count, l = lora count
```

### Bar width calculation

All bars use percentage widths relative to a `max` value:
```javascript
style="width:${(val / max * 100).toFixed(1)}%"
```
This makes charts fully responsive with no fixed pixel sizes.

### SVG radar chart

The pentagon radar in `buildRadarPairChart()` is hand-computed:
- Center: (130, 130), radius: 85, 5 axes, max value: 10
- Vertex angle: `(i * 2π/5) - π/2` (top-starting, clockwise)
- Grid rings at 25/50/75/100% of radius
- Base polygon: `rgba(99,160,210,.12)` fill, `rgba(99,160,210,.6)` stroke
- LoRA polygon: `url(#loraFill)` gradient fill (orange→pink), `rgba(240,80,100,.8)` stroke

---

## Assets

| Asset | Location | Notes |
|---|---|---|
| Logo | `amphora_logo.png` | 26×26px, used with `mix-blend-mode: screen` |
| Harvard logo | `logos/harvard.svg` | Rendered white via `filter: brightness(0) invert(1)` at 28% opacity |
| Stanford logo | `logos/stanford.svg` | Same treatment |
| Brain mesh | `brain/*.bin` | Binary, not human-readable |
| Research plots | `plots/fig*.png` | Used in Exp 1 blog post sections (static images) |
| Exp 2 plots | `plots/exp2_fig*.png` | Exist in repo but not used — Exp 2 uses native charts |

---

## Deployment

The site deploys to **[amphorabrain.com](https://amphorabrain.com)** via Vercel.

- **Vercel project:** `amphora` (org: `shaunak-mohapatras-projects`)
- **Deploy command:** `npx vercel --prod --yes` from the `amphora/` directory in the private monorepo (which has the `.vercel/project.json` config)
- This `frontend` repo is a clean public mirror — it does not have Vercel config and is not directly connected to the Vercel project
- There is no build step. Vercel serves the files as static HTML.

**To deploy a change:**
1. Edit files in this repo (or in the `amphora/` folder of `neurodiffusion-private`)
2. Commit and push
3. If using the monorepo: `cd amphora && npx vercel --prod --yes`
4. Vercel aliases the deployment to `amphorabrain.com` automatically

---

## How to Add a New Blog Post

1. Open `blog.html`
2. Find the `<!-- ── Posts ── -->` section
3. Copy an existing `<article class="post" id="...">` block and paste it at the top (newest first)
4. Give it a unique `id` (e.g. `id="experiment-3"`)
5. Update the title, date, tag, and body content
6. If the post has charts, add placeholder divs (`<div id="myChart">`) in the body and write a corresponding `buildMyChart()` IIFE in the `<script>` block at the bottom, following the same pattern as the existing chart builders
7. Update `index.html`:
   - Add a new `.bpcard` as the first card in `.blog-preview-grid`, drop the oldest card
   - If it's a research result, add a new `<section class="research">` block above `<!-- ── Blog preview ── -->`
8. Commit, push, and deploy

---

## How to Add a New Research Section to the Homepage

Two layout options are available:

**Option A — Stat strip (no images, like Exp 2):**
```html
<div class="wrap">
  <section class="research" style="padding-top:64px">
    <p class="research-label">Experiment N · [Date]</p>
    <h2 class="research-heading">...</h2>
    <p class="research-lead">...</p>
    <div class="research-stat-strip">
      <div class="rstat-cell">
        <div class="rstat-num grad-text">+X</div>
        <div class="rstat-label">Description</div>
      </div>
      <!-- repeat for each stat -->
    </div>
    <div class="research-cta">
      <p class="research-cta-text"><strong>Key finding.</strong> Supporting sentence.</p>
      <a class="read-link" href="blog.html#your-anchor">Read the write-up →</a>
    </div>
  </section>
</div>
```

**Option B — Figure + stats grid (with images, like Exp 1):**
Use `.research-layout` (2-column grid), `.research-figure` (image left), `.research-stats` (numbers right), optionally followed by `.research-figures-strip` (3-up image row).

Insert the new section between the previous research section's closing `</div>` and `<!-- ── Blog preview ── -->`.

---

## Changelog

| Date | Change | Author |
|---|---|---|
| 2026-05-29 | Initial site: index, blog, access, hidden, contact, privacy, terms. Brain mesh, logos, plots. Supabase waitlist integration. Three.js hero. | Shaunak |
| 2026-05-29 | blog.html: replaced all Exp 2 chart images with native HTML/CSS/SVG charts. Removed last static chart image. | Shaunak |
| 2026-05-29 | index.html: added Experiment 2 research section (stat strip) and updated blog preview grid to lead with May 29 post. | Shaunak |
| 2026-05-30 | Created standalone `frontend` repo (public mirror of `amphora/` folder). Added this documentation file. | Shaunak |
