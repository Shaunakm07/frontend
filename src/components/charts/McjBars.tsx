import { HBarGroup, ChartLegend, ChartBlock, ChartBody, ChartTitle } from './ChartPrimitives'

const axes = [
  { name: 'Clarity', base: 5.55, lora: 6.15, delta: '+0.60' },
  { name: 'Coherence', base: 5.50, lora: 6.03, delta: '+0.53' },
  { name: 'Instruction following', base: 4.50, lora: 5.03, delta: '+0.53' },
  { name: 'Creativity', base: 4.72, lora: 5.15, delta: '+0.43' },
  { name: 'Engagement', base: 5.15, lora: 5.53, delta: '+0.38' },
]

export default function McjBars() {
  return (
    <ChartBlock caption="Blind judge evaluation, 20 prompts across 5 task categories. Every axis improved.">
      <ChartBody>
        <ChartTitle>Writing quality axes — judge scores (1–10)</ChartTitle>
        <ChartLegend items={[{ type: 'base', label: 'Base model' }, { type: 'lora', label: 'LoRA step 200' }]} />
        {axes.map(({ name, base, lora, delta }) => (
          <HBarGroup
            key={name}
            name={name}
            bars={[
              { key: 'Base', val: base, max: 10, type: 'base' },
              { key: 'LoRA', val: lora, max: 10, type: 'lora' },
            ]}
            delta={delta}
            deltaDir="pos"
          />
        ))}
      </ChartBody>
    </ChartBlock>
  )
}
