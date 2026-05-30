import { ChartBlock, ChartLegend, ChartPair, ChartCol, ChartTitle, ChartSub, SegBar } from './ChartPrimitives'

const axes = [
  { label: 'Clarity', base: 5.55, lora: 6.15 },
  { label: 'Engagement', base: 5.15, lora: 5.53 },
  { label: 'Instr. Following', base: 4.50, lora: 5.03 },
  { label: 'Creativity', base: 4.72, lora: 5.15 },
  { label: 'Coherence', base: 5.50, lora: 6.03 },
]

const cats = [
  { label: 'Conversational', base: 2, lora: 2 },
  { label: 'Factual', base: 1, lora: 3 },
  { label: 'Formal', base: 1, lora: 3 },
  { label: 'Technical', base: 3, lora: 1 },
  { label: 'Creative', base: 2, lora: 2 },
]

const cx = 130, cy = 130, R = 85, n = 5, maxV = 10

function pt(i: number, v: number): [number, number] {
  const a = (i * 2 * Math.PI / n) - Math.PI / 2
  const r = v / maxV * R
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
}

function poly(vals: number[]) {
  return vals.map((v, i) => {
    const [x, y] = pt(i, v)
    return `${i ? 'L' : 'M'}${x.toFixed(2)},${y.toFixed(2)}`
  }).join(' ') + ' Z'
}

export default function RadarPairChart() {
  const grids = [0.25, 0.5, 0.75, 1].map(pct => {
    const pts = Array.from({ length: n }, (_, i) => pt(i, maxV * pct))
    const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ') + ' Z'
    return <path key={pct} d={d} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
  })

  const axLines = axes.map((_, i) => {
    const [x, y] = pt(i, maxV)
    return <line key={i} x1={cx} y1={cy} x2={x.toFixed(2)} y2={y.toFixed(2)} stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
  })

  const labels = axes.map((a, i) => {
    const ang = (i * 2 * Math.PI / n) - Math.PI / 2
    const lx = (cx + (R + 20) * Math.cos(ang)).toFixed(1)
    const ly = (cy + (R + 20) * Math.sin(ang)).toFixed(1)
    return (
      <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="9.5" fill="rgba(240,237,232,0.42)" fontFamily="Inter,system-ui,sans-serif">
        {a.label}
      </text>
    )
  })

  const bPoly = poly(axes.map(a => a.base))
  const lPoly = poly(axes.map(a => a.lora))

  return (
    <ChartBlock caption="Left: LoRA polygon (orange) consistently outside base (blue) on all five axes. Right: pairwise wins per category — LoRA leads in 4 of 5; base wins only Technical.">
      <ChartPair>
        <ChartCol>
          <ChartTitle>Quality profile radar</ChartTitle>
          <ChartLegend items={[{ type: 'base', label: 'Base model' }, { type: 'lora', label: 'LoRA step 200' }]} />
          <div className="flex justify-center py-2 px-1">
            <svg viewBox="0 0 260 260" className="w-full max-w-[240px] h-auto overflow-visible">
              <defs>
                <linearGradient id="loraFill" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f06030" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#f03d78" stopOpacity="0.18" />
                </linearGradient>
              </defs>
              {grids}
              {axLines}
              <path d={bPoly} fill="rgba(99,160,210,0.12)" stroke="rgba(99,160,210,0.6)" strokeWidth="1.5" strokeLinejoin="round" />
              <path d={lPoly} fill="url(#loraFill)" stroke="rgba(240,80,100,0.8)" strokeWidth="1.5" strokeLinejoin="round" />
              {labels}
            </svg>
          </div>
        </ChartCol>
        <ChartCol>
          <ChartTitle>Pairwise wins by category</ChartTitle>
          <ChartSub>Blind · order-randomised · 4 prompts per category</ChartSub>
          <ChartLegend items={[{ type: 'base', label: 'Base' }, { type: 'lora', label: 'LoRA' }]} />
          {cats.map(({ label, base, lora }) => (
            <SegBar key={label} label={label} base={base} lora={lora} />
          ))}
        </ChartCol>
      </ChartPair>
    </ChartBlock>
  )
}
