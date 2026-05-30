import { HBarGroup, ChartLegend, ChartBlock, ChartPair, ChartCol, ChartTitle, ChartSub } from './ChartPrimitives'

const mmlu = [
  { name: 'STEM', base: 59.6, lora: 59.6, delta: '0.0%', dir: 'zero' as const },
  { name: 'Humanities', base: 59.0, lora: 59.0, delta: '0.0%', dir: 'zero' as const },
  { name: 'Professional', base: 64.1, lora: 61.5, delta: '−2.6%', dir: 'neg' as const },
  { name: 'Social Sciences', base: 69.4, lora: 66.7, delta: '−2.8%', dir: 'neg' as const },
]

const style = [
  { name: 'Appropriate', base: 5.00, lora: 5.08, delta: '+0.08', dir: 'pos' as const },
  { name: 'Neutral', base: 5.92, lora: 5.33, delta: '−0.58', dir: 'neg' as const },
  { name: 'Inappropriate', base: 5.19, lora: 5.62, delta: '+0.44', dir: 'pos' as const },
]

export default function OverviewCharts() {
  return (
    <ChartBlock caption="MMLU: zero regression in STEM and Humanities — factual knowledge in FFN layers is unaffected by attention-only LoRA. Style appropriateness: LoRA scores higher on formal tasks (+0.44) where dialogue is inappropriate.">
      <ChartPair>
        <ChartCol>
          <ChartTitle>MMLU factual accuracy</ChartTitle>
          <ChartLegend items={[{ type: 'base', label: 'Base' }, { type: 'lora', label: 'LoRA' }]} />
          {mmlu.map(({ name, base, lora, delta, dir }) => (
            <HBarGroup
              key={name}
              name={name}
              bars={[
                { key: 'Base', val: base, max: 100, type: 'base', label: base.toFixed(1) + '%' },
                { key: 'LoRA', val: lora, max: 100, type: 'lora', label: lora.toFixed(1) + '%' },
              ]}
              delta={delta}
              deltaDir={dir}
            />
          ))}
        </ChartCol>
        <ChartCol>
          <ChartTitle>Style appropriateness by context</ChartTitle>
          <ChartSub>higher = better fit for task type (1–10)</ChartSub>
          <ChartLegend items={[{ type: 'base', label: 'Base' }, { type: 'lora', label: 'LoRA' }]} />
          {style.map(({ name, base, lora, delta, dir }) => (
            <HBarGroup
              key={name}
              name={name}
              bars={[
                { key: 'Base', val: base, max: 10, type: 'base' },
                { key: 'LoRA', val: lora, max: 10, type: 'lora' },
              ]}
              delta={delta}
              deltaDir={dir}
            />
          ))}
        </ChartCol>
      </ChartPair>
    </ChartBlock>
  )
}
