import { HBarGroup, ChartLegend, ChartBlock, ChartPair, ChartCol, ChartTitle, ChartSub } from './ChartPrimitives'

export default function RobustnessChart() {
  return (
    <ChartBlock caption="LoRA injects less dialogue than base on appropriate prompts (0.062 vs 0.104) and scores higher on formal tasks (+0.44) — the model learned when to apply the style, not just how. Flag: neutral prompt appropriateness −0.58, watch at later checkpoints.">
      <ChartPair>
        <ChartCol>
          <ChartTitle>Dialogue injection rate</ChartTitle>
          <ChartSub>lower = fewer learned style patterns applied</ChartSub>
          <ChartLegend items={[{ type: 'base', label: 'Base' }, { type: 'lora', label: 'LoRA' }]} />
          <HBarGroup
            name="Appropriate (dialogue fits)"
            bars={[
              { key: 'Base', val: 0.104, max: 0.13, type: 'base' },
              { key: 'LoRA', val: 0.062, max: 0.13, type: 'lora' },
            ]}
            delta="−0.042"
            deltaDir="pos"
          />
          <HBarGroup
            name="Neutral"
            bars={[
              { key: 'Base', val: 0, max: 0.13, type: 'base', label: '0.000' },
              { key: 'LoRA', val: 0, max: 0.13, type: 'lora', label: '0.000' },
            ]}
            delta="0.000"
            deltaDir="zero"
          />
          <HBarGroup
            name="Inappropriate (formal)"
            bars={[
              { key: 'Base', val: 0.016, max: 0.13, type: 'base' },
              { key: 'LoRA', val: 0.016, max: 0.13, type: 'lora' },
            ]}
            delta="0.000"
            deltaDir="zero"
          />
        </ChartCol>
        <ChartCol>
          <ChartTitle>Style appropriateness score</ChartTitle>
          <ChartSub>higher = better fit for task type (1–10)</ChartSub>
          <ChartLegend items={[{ type: 'base', label: 'Base' }, { type: 'lora', label: 'LoRA' }]} />
          <HBarGroup
            name="Appropriate"
            bars={[
              { key: 'Base', val: 5.00, max: 10, type: 'base' },
              { key: 'LoRA', val: 5.08, max: 10, type: 'lora' },
            ]}
            delta="+0.08"
            deltaDir="pos"
          />
          <HBarGroup
            name="Neutral"
            bars={[
              { key: 'Base', val: 5.92, max: 10, type: 'base' },
              { key: 'LoRA', val: 5.33, max: 10, type: 'lora' },
            ]}
            delta="−0.58"
            deltaDir="neg"
          />
          <HBarGroup
            name="Inappropriate (formal)"
            bars={[
              { key: 'Base', val: 5.19, max: 10, type: 'base' },
              { key: 'LoRA', val: 5.62, max: 10, type: 'lora' },
            ]}
            delta="+0.44"
            deltaDir="pos"
          />
        </ChartCol>
      </ChartPair>
    </ChartBlock>
  )
}
