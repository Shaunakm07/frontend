import { HBarGroup, ChartLegend, ChartBlock, ChartBody, ChartTitle } from './ChartPrimitives'

const metrics = [
  { name: 'FK Grade Level', base: 12.21, lora: 12.25, ref: 9.83, max: 26, delta: '+0.04', p: 'p=0.93' },
  { name: 'Gunning Fog Index', base: 14.93, lora: 14.94, ref: 12.22, max: 28, delta: '+0.01', p: 'p=0.99' },
  { name: 'Type-Token Ratio', base: 0.670, lora: 0.674, ref: 0.774, max: 1.0, delta: '+0.004', p: 'p=0.66' },
  { name: 'Mean Sentence Length', base: 20.33, lora: 20.77, ref: 27.21, max: 50, delta: '+0.44', p: 'p=0.54' },
  { name: 'Mean Dep. Distance', base: 2.980, lora: 2.996, ref: 3.079, max: 5.0, delta: '+0.015', p: 'p=0.79' },
]

export default function SyntaxChart() {
  return (
    <ChartBlock caption="All five metrics trend positive but none reach significance at step 200 (all p > 0.5). The brain reward shifts content and narrative strategy before it shifts surface syntax — expected to widen past 500 training steps.">
      <ChartBody>
        <ChartTitle>Syntactic complexity — Base vs LoRA vs Human prose</ChartTitle>
        <ChartLegend items={[{ type: 'base', label: 'Base' }, { type: 'lora', label: 'LoRA' }, { type: 'ref', label: 'Human reference' }]} />
        {metrics.map(({ name, base, lora, ref, max, delta, p }) => (
          <HBarGroup
            key={name}
            name={
              <span>
                {name}{' '}
                <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.18)', marginLeft: '6px' }}>
                  Δ {delta} · {p} ns
                </span>
              </span>
            }
            bars={[
              { key: 'Base', val: base, max, type: 'base' },
              { key: 'LoRA', val: lora, max, type: 'lora' },
              { key: 'Ref', val: ref, max, type: 'ref' },
            ]}
          />
        ))}
      </ChartBody>
    </ChartBlock>
  )
}
