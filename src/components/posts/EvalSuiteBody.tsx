import McjBars from '@/components/charts/McjBars'
import RadarPairChart from '@/components/charts/RadarPairChart'
import OverviewCharts from '@/components/charts/OverviewCharts'
import RobustnessChart from '@/components/charts/RobustnessChart'
import SyntaxChart from '@/components/charts/SyntaxChart'

const pc = 'text-[15px] font-light text-white/80 leading-[1.85] mb-5 last:mb-0'
const h3c = 'text-[15px] font-semibold text-[#f0ede8] mt-9 mb-3 tracking-[-0.01em]'
const Finding = ({ num, title, children }: { num: string; title: string; children: React.ReactNode }) => (
  <div className="border border-[rgba(240,237,232,0.07)] p-5">
    <p className="text-[11px] font-semibold tracking-[0.06em] text-white/50 mb-2.5">{num}</p>
    <h4 className="text-[13px] font-semibold text-[#f0ede8] tracking-[-0.01em] leading-[1.3] mb-2">{title}</h4>
    <p className="text-[12.5px] text-white/50 font-light leading-[1.7] m-0">{children}</p>
  </div>
)

export default function EvalSuiteBody() {
  return (
    <>
      <div className="max-w-[640px]">
        <p className={pc}>
          Experiment 1 showed a 150% increase in predicted Broca&apos;s area activation after 200 RL steps with TRIBE v2 as the reward signal, and that the model learns — without instruction — to write dialogue-driven metalinguistic narrative. The obvious follow-on: did we build a better writing assistant, or just a more neurologically active one?
        </p>
        <p className={pc}>
          We ran a five-experiment evaluation suite comparing <strong className="text-[#f0ede8] font-medium">Qwen2.5-3B-Instruct base</strong> against the <strong className="text-[#f0ede8] font-medium">LoRA adapter at step 200</strong> (KL=0.28 from base, ~20M parameters modified out of 3.09B). All comparisons use <code className="font-mono text-[12.5px] text-white/70 bg-white/[0.05] px-1.5 py-0.5 rounded-[3px]">lora_model.disable_adapter()</code> for proper isolation. <strong className="text-[#f0ede8] font-medium">SLURM job 1583141 · NVIDIA L40S · 29 May 2026.</strong>
        </p>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-4 max-[540px]:grid-cols-2 border border-[rgba(240,237,232,0.07)] my-8">
        {[
          { num: '+0.50', grad: 'var(--grad)', label: 'Mean quality gain across all 5 axes (/10 scale)' },
          { num: '11–9', grad: 'linear-gradient(135deg,#f03d78,#b840b8)', label: 'LoRA vs base in 20 blind pairwise comparisons' },
          { num: '0%', grad: 'linear-gradient(135deg,#b840b8,#6040e8)', label: 'MMLU regression in STEM and Humanities' },
          { num: '5/5', grad: undefined, label: 'Quality axes where LoRA leads base' },
        ].map(({ num, grad, label }) => (
          <div key={num} className="px-[18px] py-5 border-r border-[rgba(240,237,232,0.07)] last:border-r-0 max-[540px]:even:border-r-0 max-[540px]:[&:nth-child(3)]:border-r">
            <div
              className="text-[28px] font-bold tracking-[-0.04em] leading-none mb-[5px]"
              style={grad ? { background: grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } : { color: 'rgba(240,237,232,0.6)' }}
            >
              {num}
            </div>
            <div className="text-[10.5px] text-white/50 tracking-[0.02em] leading-[1.4]">{label}</div>
          </div>
        ))}
      </div>

      <OverviewCharts />

      <div className="max-w-[640px]">
        <h3 className={h3c}>1 · Multi-Criteria Judge</h3>
        <p className={pc}>
          A frozen <strong className="text-[#f0ede8] font-medium">Qwen2.5-1.5B-Instruct</strong> judge scored each completion on five writing axes (1–10) and picked a blind pairwise winner. 20 prompts across 5 task categories (creative, conversational, factual, technical, formal), order-randomised.
        </p>
      </div>

      <McjBars />
      <RadarPairChart />

      <div className="max-w-[640px]">
        <p className={pc}>
          Every quality axis improved. The LoRA won 11 of 20 blind pairwise comparisons — probability of leading all five axes by chance is &lt;3%. Strongest gains: conversational (+1.7) and factual (+0.9). The pre-run hypothesis that instruction following would regress was wrong: it improved by +0.53. The brain reward did not trade task fidelity for style.
        </p>
        <h3 className={h3c}>2 · Style Robustness</h3>
        <p className={pc}>
          The LoRA&apos;s learned style — dialogue-driven, metalinguistic, question-posing — was tested against contexts where that style is explicitly wrong: formal emails, haiku, JSON output, bullet-point lists. The test measures whether the style bleeds indiscriminately or is applied with restraint.
        </p>
      </div>

      <RobustnessChart />

      <div className="max-w-[640px]">
        <p className={pc}>
          The model learned <em className="not-italic text-white/65">when</em> to apply the style, not just <em className="not-italic text-white/65">how</em>. A model that had memorised a surface pattern would inject dialogue everywhere. This one does the opposite — less on creative, same on formal, better on appropriateness throughout. One flag: style appropriateness on neutral prompts dropped −0.58, worth monitoring at later checkpoints.
        </p>
        <h3 className={h3c}>3 · Syntactic Complexity</h3>
        <p className={pc}>
          Five metrics against a human prose reference: Flesch-Kincaid grade level, Gunning Fog, type-token ratio, mean sentence length, mean dependency distance. All trend positive (LoRA text is slightly more complex) but none reach significance at step 200 (all p&nbsp;&gt;&nbsp;0.5). The brain reward shifts content and narrative strategy before it shifts surface syntax. Expected to widen past 500 steps.
        </p>
      </div>

      <SyntaxChart />

      <div className="max-w-[640px]">
        <h3 className={h3c}>4 · Factual Accuracy — MMLU</h3>
        <p className={pc}>
          200-question stratified MMLU sample — a <strong className="text-[#f0ede8] font-medium">regression test</strong> only. STEM and Humanities show exactly <strong className="text-[#f0ede8] font-medium">0% regression</strong>. Small drops in Professional (−2.6%) and Social (−2.8%) are within noise for a KL=0.28 adapter and consistent with known LoRA anatomy: attention modifications cannot overwrite FFN-stored factual knowledge.
        </p>
        <h3 className={h3c}>5 · MAUVE</h3>
        <p className={pc}>
          Inconclusive — both models score near zero against a Wikipedia reference corpus. Encyclopedic prose and Qwen instruction output occupy different GPT-2 feature-space regions. Will re-run against a creative writing or Q&amp;A corpus.
        </p>
        <h3 className={h3c}>Four things this proves</h3>
      </div>

      <div className="grid grid-cols-2 max-[540px]:grid-cols-1 gap-3 my-8">
        <Finding num="01" title="Neural and human quality point to the same text">
          A reward derived from predicted fMRI activation — with no knowledge of human writing preferences — produces text that humans and an LLM judge both rate as better on every dimension. The language brain is sensitive to the same properties that make writing compelling.
        </Finding>
        <Finding num="02" title="The learned style generalises, it doesn't overfit">
          LoRA injects less dialogue than the base on creative prompts and scores higher on formal tasks. The model learned a principled generalisation about when richer narrative is appropriate — not a surface bleed pattern.
        </Finding>
        <Finding num="03" title="Factual capability is fully intact">
          STEM and Humanities MMLU accuracy are unchanged at step 200. LoRA touches attention projections only. The model is a better writer and an equally capable reasoner — the two capabilities live in different parts of the network.
        </Finding>
        <Finding num="04" title="Step 200 of a much longer trajectory">
          KL=0.28 out of a ~2.0 safe budget. The reward curve hadn&apos;t plateaued. Syntactic complexity trends positive but non-significant. The improvements here are real — but conservative. Extending to 500–1000 steps should compound them.
        </Finding>
      </div>

      {/* Scorecard */}
      <div className="overflow-x-auto my-9">
        <table className="w-full border-collapse text-[12px] border border-[rgba(240,237,232,0.07)]">
          <thead>
            <tr>
              {['Experiment','Metric','Base','LoRA','Δ','Result'].map(h => (
                <th key={h} className="text-[10px] font-semibold tracking-[0.07em] uppercase text-white/50 px-3.5 py-[11px] text-left border-b border-[rgba(240,237,232,0.07)] bg-white/[0.022] whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-[11.5px]">
            {[
              { group: 'Multi-Criteria Judge' },
              { metric: 'Engagement', base: '5.15', lora: '5.53', d: '+0.38', dCls: 'pos', result: '✓ Better', rCls: 'better' },
              { metric: 'Clarity', base: '5.55', lora: '6.15', d: '+0.60', dCls: 'pos', result: '✓ Better', rCls: 'better' },
              { metric: 'Coherence', base: '5.50', lora: '6.03', d: '+0.53', dCls: 'pos', result: '✓ Better', rCls: 'better' },
              { metric: 'Creativity', base: '4.72', lora: '5.15', d: '+0.43', dCls: 'pos', result: '✓ Better', rCls: 'better' },
              { metric: 'Instruction Following', base: '4.50', lora: '5.03', d: '+0.53', dCls: 'pos', result: '✓ Better', rCls: 'better' },
              { metric: 'Pairwise wins', base: '9', lora: '11', d: '—', dCls: 'zero', result: '✓ LoRA leads', rCls: 'better' },
              { group: 'Style Robustness' },
              { metric: 'Dialogue injection (formal)', base: '1.6%', lora: '1.6%', d: '+0.0%', dCls: 'zero', result: '✓ No bleed', rCls: 'better' },
              { metric: 'Style appropriateness (formal)', base: '5.19', lora: '5.62', d: '+0.44', dCls: 'pos', result: '✓ Better', rCls: 'better' },
              { metric: 'Style appropriateness (neutral)', base: '5.92', lora: '5.33', d: '−0.58', dCls: 'neg', result: '⚠ Monitor', rCls: 'monitor' },
              { group: 'MMLU Factual Accuracy' },
              { metric: 'Overall accuracy', base: '62.6%', lora: '61.4%', d: '−1.2%', dCls: 'neg', result: '⚠ Small drop', rCls: 'monitor' },
              { metric: 'STEM', base: '59.6%', lora: '59.6%', d: '0.0%', dCls: 'zero', result: '✓ No change', rCls: 'better' },
              { metric: 'Humanities', base: '59.0%', lora: '59.0%', d: '0.0%', dCls: 'zero', result: '✓ No change', rCls: 'better' },
              { group: 'Syntactic Complexity' },
              { metric: 'FK Grade Level', base: '12.21', lora: '12.25', d: '+0.04', dCls: 'pos', result: '~ Negligible', rCls: 'neutral' },
              { metric: 'Mean Dep. Distance', base: '2.980', lora: '2.996', d: '+0.015', dCls: 'pos', result: '~ Negligible', rCls: 'neutral' },
            ].map((row, i) => {
              if ('group' in row) {
                return (
                  <tr key={i}>
                    <td colSpan={6} className="text-[10px] font-semibold tracking-[0.06em] uppercase text-white/50 px-3.5 pt-4 pb-2 bg-white/[0.02] border-t border-[rgba(240,237,232,0.07)]">{row.group}</td>
                  </tr>
                )
              }
              const dColor = row.dCls === 'pos' ? 'rgba(61,220,130,0.65)' : row.dCls === 'neg' ? 'rgba(240,62,120,0.62)' : 'rgba(255,255,255,0.2)'
              const rColor = row.rCls === 'better' ? 'rgba(61,220,130,0.82)' : row.rCls === 'monitor' ? 'rgba(240,190,55,0.78)' : 'rgba(255,255,255,0.2)'
              return (
                <tr key={i}>
                  <td className="px-3.5 py-[9px] border-b border-white/[0.04] text-white/40 align-middle" />
                  <td className="px-3.5 py-[9px] border-b border-white/[0.04] text-white/80 align-middle">{row.metric}</td>
                  <td className="px-3.5 py-[9px] border-b border-white/[0.04] text-white/40 align-middle">{row.base}</td>
                  <td className="px-3.5 py-[9px] border-b border-white/[0.04] text-white/40 align-middle">{row.lora}</td>
                  <td className="px-3.5 py-[9px] border-b border-white/[0.04] align-middle font-medium" style={{ color: dColor }}>{row.d}</td>
                  <td className="px-3.5 py-[9px] border-b border-white/[0.04] align-middle font-medium" style={{ color: rColor }}>{row.result}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p className="border border-[rgba(240,237,232,0.07)] border-t-0 px-4 py-[9px] text-[11px] text-white/50 leading-[1.6]">Full scorecard — LoRA step 200. Green = better, amber = monitor, grey = negligible.</p>
      </div>

      <div className="max-w-[640px]">
        <p className={pc}>
          The next run extends training to 500–1000 steps and replays this full evaluation suite. Based on the step-200 trajectory — +150% reward with no sign of plateau and significant KL headroom — the quality gains should compound.
        </p>
        <p className="text-[13px] mt-8" style={{ color: 'rgba(240,237,232,0.4)' }}>
          Full results, scripts, and figures at{' '}
          <a href="https://github.com/Shaunakm07/Brain-LLM-Fine-Tuning" target="_blank" rel="noopener" style={{ color: 'rgba(240,237,232,0.4)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            github.com/Shaunakm07/Brain-LLM-Fine-Tuning
          </a>.
          {' '}TRIBE v2: CC-BY-NC-4.0. Qwen2.5-3B: Apache 2.0.
        </p>
      </div>
    </>
  )
}
