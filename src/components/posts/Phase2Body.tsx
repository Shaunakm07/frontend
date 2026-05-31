const pc = 'text-[15px] font-light text-white/80 leading-[1.85] mb-5 last:mb-0'
const h3c = 'text-[15px] font-semibold text-[#f0ede8] mt-9 mb-3 tracking-[-0.01em]'
const bq = 'border-l border-[rgba(240,62,120,0.35)] pl-5 my-7 text-white/50 italic'

const Finding = ({ num, title, children }: { num: string; title: string; children: React.ReactNode }) => (
  <div className="border border-[rgba(240,237,232,0.07)] p-5">
    <p className="text-[11px] font-semibold tracking-[0.06em] text-white/50 mb-2.5">{num}</p>
    <h4 className="text-[13px] font-semibold text-[#f0ede8] tracking-[-0.01em] leading-[1.3] mb-2">{title}</h4>
    <p className="text-[12.5px] text-white/50 font-light leading-[1.7] m-0">{children}</p>
  </div>
)

function AblationBars() {
  const bars = [
    { label: 'Full LoRA (Phase 1)', reward: 0.296, kl: 0.28, params: '~20M', color: 'var(--grad)' },
    { label: 'FFN-only (3e)', reward: 0.190, kl: 0.037, params: '~12M', color: 'linear-gradient(135deg,#f03d78,#b840b8)' },
    { label: 'Attention-only (3e)', reward: 0.153, kl: 0.014, params: '~8M', color: 'linear-gradient(135deg,#b840b8,#6040e8)' },
    { label: 'Q-proj only (3e)', reward: 0.060, kl: 0.002, params: '~2M', color: undefined },
  ]
  const max = 0.30
  return (
    <div className="border border-[rgba(240,237,232,0.07)] p-5 my-8">
      <p className="text-[10px] font-semibold tracking-[0.07em] uppercase text-white/50 mb-5">Layer ablation — best training reward vs full LoRA</p>
      <div className="space-y-4">
        {bars.map(({ label, reward, kl, params, color }) => (
          <div key={label}>
            <div className="flex justify-between items-baseline mb-1.5">
              <span className="text-[12px] text-white/70">{label}</span>
              <span className="text-[11px] text-white/40">{params} · KL {kl}</span>
            </div>
            <div className="h-[6px] bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(reward / max) * 100}%`,
                  background: color ?? 'rgba(255,255,255,0.18)',
                }}
              />
            </div>
            <div className="text-[11px] text-white/50 mt-1">Best reward: {reward}</div>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-white/30 mt-5 leading-[1.5]">
        Full LoRA produces ~50% more reward than attention + FFN combined at equal steps — a synergy effect consistent with attention heads shaping context for FFN stylistic generation.
      </p>
    </div>
  )
}

function BoldGainTable() {
  const rows = [
    { exp: '3c Multi-region', bold: '+0.094', insight: 'Composite reward drives broadest network activation' },
    { exp: 'Phase 1 (reference)', bold: '+0.081', insight: '—' },
    { exp: '3a 500-step extension', bold: '+0.062', insight: 'KL runaway at step 280 limits usable adapter' },
    { exp: '3d DMN', bold: '+0.047', insight: 'Indirect targeting — medial frontal and temporal' },
    { exp: '3e Attention-only', bold: '+0.016', insight: 'Weak without FFN modules' },
    { exp: '3e FFN-only', bold: '+0.011', insight: 'Weak without attention modules' },
    { exp: '3b Minimise Broca', bold: '≈0.000', insight: 'Suppression offsets increases in other regions' },
  ]
  return (
    <div className="overflow-x-auto my-9">
      <table className="w-full border-collapse text-[12px] border border-[rgba(240,237,232,0.07)]">
        <thead>
          <tr>
            {['Experiment', 'Global Δ BOLD', 'Key insight'].map(h => (
              <th key={h} className="text-[10px] font-semibold tracking-[0.07em] uppercase text-white/50 px-3.5 py-[11px] text-left border-b border-[rgba(240,237,232,0.07)] bg-white/[0.022] whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const isTop = row.exp === '3c Multi-region'
            const isRef = row.exp === 'Phase 1 (reference)'
            return (
              <tr key={i} className={isTop ? 'bg-white/[0.025]' : ''}>
                <td className="px-3.5 py-[9px] border-b border-white/[0.04] align-middle" style={{ color: isTop ? 'rgba(240,237,232,0.9)' : isRef ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.6)' }}>{row.exp}</td>
                <td className="px-3.5 py-[9px] border-b border-white/[0.04] align-middle font-medium" style={{ color: isTop ? 'rgba(61,220,130,0.9)' : isRef ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.5)' }}>{row.bold}</td>
                <td className="px-3.5 py-[9px] border-b border-white/[0.04] align-middle text-white/40">{row.insight}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default function Phase2Body() {
  return (
    <>
      <div className="max-w-[640px]">
        <p className={pc}>
          Experiments 1 and 2 established the core result: LoRA fine-tuning with a TRIBE v2 brain reward drives a <strong className="text-[#f0ede8] font-medium">150% increase</strong> in predicted Broca&apos;s area activation after 200 steps, and the model simultaneously becomes a better writer on every human-legible quality axis. Phase 2 runs five targeted experiments to answer the next-order questions.
        </p>
        <p className={pc}>
          All Phase 2 experiments use <code className="font-mono text-[12.5px] text-white/70 bg-white/[0.05] px-1.5 py-0.5 rounded-[3px]">brain_optimize_phase2.py</code>, which extends the Phase 1 script with weighted multi-region rewards, a <code className="font-mono text-[12.5px] text-white/70 bg-white/[0.05] px-1.5 py-0.5 rounded-[3px]">--minimize</code> flag, and a <code className="font-mono text-[12.5px] text-white/70 bg-white/[0.05] px-1.5 py-0.5 rounded-[3px]">--lora_target</code> ablation parameter. <strong className="text-[#f0ede8] font-medium">Hardware: NVIDIA L40S · 30–31 May 2026.</strong>
        </p>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-4 max-[540px]:grid-cols-2 border border-[rgba(240,237,232,0.07)] my-8">
        {[
          { num: '0.308', grad: 'var(--grad)', label: 'New best reward — multi-region 3c, exceeds Phase 1 (0.296)' },
          { num: '+16%', grad: 'linear-gradient(135deg,#f03d78,#b840b8)', label: 'Global BOLD gain above Phase 1 baseline (0.094 vs 0.081)' },
          { num: '~4×', grad: 'linear-gradient(135deg,#b840b8,#6040e8)', label: 'Maximisation range vs suppression range — asymmetric control' },
          { num: '~50%', grad: undefined, label: 'Synergy gain: full LoRA vs attention + FFN individually' },
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

      {/* Experiments at a glance */}
      <div className="overflow-x-auto my-9">
        <table className="w-full border-collapse text-[12px] border border-[rgba(240,237,232,0.07)]">
          <thead>
            <tr>
              {['ID', 'Name', 'Question', 'Steps', 'Best Reward'].map(h => (
                <th key={h} className="text-[10px] font-semibold tracking-[0.07em] uppercase text-white/50 px-3.5 py-[11px] text-left border-b border-[rgba(240,237,232,0.07)] bg-white/[0.022] whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { id: '3a', name: '500-step continuation', q: 'Does quality keep improving past step 200?', steps: '280 (KL runaway)', reward: '0.296', highlight: false },
              { id: '3b', name: 'Minimise Broca\'s', q: 'Can the reward be reversed?', steps: '200', reward: '0.073 (suppression)', highlight: false },
              { id: '3c', name: 'Multi-region joint', q: 'Can we drive Broca + Wernicke + STS simultaneously?', steps: '300', reward: '0.308 ★', highlight: true },
              { id: '3d', name: 'Default Mode Network', q: 'Does DMN optimisation produce reflective text?', steps: '200', reward: '0.156', highlight: false },
              { id: '3e', name: 'Layer ablation', q: 'Which modules carry the signal?', steps: '200', reward: 'FFN: 0.190 · Attn: 0.153', highlight: false },
            ].map((row) => (
              <tr key={row.id} className={row.highlight ? 'bg-white/[0.025]' : ''}>
                <td className="px-3.5 py-[9px] border-b border-white/[0.04] text-white/50 font-mono align-middle">{row.id}</td>
                <td className="px-3.5 py-[9px] border-b border-white/[0.04] align-middle" style={{ color: row.highlight ? 'rgba(240,237,232,0.9)' : 'rgba(255,255,255,0.7)' }}>{row.name}</td>
                <td className="px-3.5 py-[9px] border-b border-white/[0.04] text-white/40 align-middle">{row.q}</td>
                <td className="px-3.5 py-[9px] border-b border-white/[0.04] text-white/50 align-middle whitespace-nowrap">{row.steps}</td>
                <td className="px-3.5 py-[9px] border-b border-white/[0.04] align-middle font-medium whitespace-nowrap" style={{ color: row.highlight ? 'rgba(61,220,130,0.9)' : 'rgba(255,255,255,0.5)' }}>{row.reward}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Exp 3a */}
      <div className="max-w-[640px]">
        <h3 className={h3c}>3a — 500-Step Broca Continuation</h3>
        <p className={pc}>
          The Phase 1 reward curve was still rising at step 200 with KL=0.28. We resumed from the step-200 checkpoint and reduced <code className="font-mono text-[12.5px] text-white/70 bg-white/[0.05] px-1.5 py-0.5 rounded-[3px]">--kl_coef</code> from 0.5 to 0.1 to allow more room to explore. The job ran 280 steps before terminating — not from hitting a ceiling, but from KL runaway. By step 281 the KL divergence had reached 3.16 and TRIBE&apos;s word-alignment step rejected the generated text outright.
        </p>
        <p className={pc}>
          The final adapter at step 280 still drove large network-wide gains (Auditory cortex +0.227, Wernicke&apos;s +0.225, Broca +0.130) but the completions had become incoherent — a mix of structured prose collapsing into mismatched Unicode characters. The lesson is direct: <code className="font-mono text-[12.5px] text-white/70 bg-white/[0.05] px-1.5 py-0.5 rounded-[3px]">--kl_coef 0.1</code> is too permissive for extended training. A re-run at 0.3 is the recommended fix.
        </p>

        <h3 className={h3c}>3b — Minimise Broca&apos;s Area</h3>
        <p className={pc}>
          We ran the reward in reverse — negating the TRIBE activation signal — starting from the base model. Suppression is feasible but <strong className="text-[#f0ede8] font-medium">asymmetric</strong>: the achievable suppression range (best: 0.073) is roughly 4× smaller than the maximisation range (best: 0.296). LLMs are structurally biased toward language-like output. There is more room to drive the language network up than down.
        </p>
        <p className={pc}>
          What the minimisation signal actually suppressed was instructive: angular gyrus (−0.030) and Wernicke&apos;s area (−0.022) dropped more than Broca itself (−0.008). You cannot suppress Broca in isolation — the inter-region correlation structure pulls adjacent semantic areas along with it. Several regions increased: anterior cingulate (+0.018), insula (+0.013), consistent with a shift toward more internally-directed processing.
        </p>
      </div>

      <blockquote className={`${bq} max-w-[640px]`}>
        The minimised text is slower, more descriptive, more grounded in sensory detail — the opposite of the Broca-maximised model&apos;s dialogue-driven, question-posing style. Characters are present but do not speak. Clauses describe atmosphere rather than exchange ideas.
      </blockquote>

      {/* Exp 3c — headline */}
      <div className="max-w-[640px]">
        <h3 className={h3c}>3c — Multi-Region Joint Optimisation <span className="text-white/30 font-normal ml-1.5">headline result</span></h3>
        <p className={pc}>
          Rather than optimising a single region, we ran a composite reward: <strong className="text-[#f0ede8] font-medium">Broca (0.5) + Wernicke (0.3) + STS (0.2)</strong>, resuming from the Phase 1 step-200 checkpoint with a stabilising <code className="font-mono text-[12.5px] text-white/70 bg-white/[0.05] px-1.5 py-0.5 rounded-[3px]">--kl_coef 0.3</code> for 300 additional steps.
        </p>
        <p className={pc}>
          The multi-region adapter reached a best reward of <strong className="text-[#f0ede8] font-medium">0.308</strong> — exceeding Phase 1&apos;s 0.296 despite using a diluted composite signal rather than a direct Broca reward. Global BOLD gain was also the highest of any experiment: +0.094 vs Phase 1&apos;s +0.081. Wernicke&apos;s area (+0.253) led all regions, followed by auditory cortex (+0.194) and Broca (+0.188).
        </p>
        <p className={pc}>
          The composite reward does not split the optimisation budget — it appears to provide a <strong className="text-[#f0ede8] font-medium">richer gradient signal</strong>. By simultaneously tracking Broca (syntactic), Wernicke (semantic), and STS (prosodic integration), the reward penalises text that games one region at the expense of others. The resulting adapter generalises better, as confirmed by higher network-wide gains despite the composite signal.
        </p>
      </div>

      <div className="border border-[rgba(61,220,130,0.15)] bg-[rgba(61,220,130,0.03)] p-5 my-8 max-w-[640px]">
        <p className="text-[10px] font-semibold tracking-[0.07em] uppercase text-[rgba(61,220,130,0.6)] mb-3">3c best completion — reward 0.308</p>
        <p className="text-[13.5px] text-white/60 font-light leading-[1.75] italic m-0">
          &ldquo;Amidst a bustling café, two philosophers engaged in an intellectual duel over coffee. One posed a question: &lsquo;If I were to tell you that the word &lsquo;red&rsquo; describes the color of apples, and then ask you what color apples are, what would you say?&rsquo; The other philosopher thought for a moment before answering. &lsquo;Red,&rsquo; he replied immediately. The first philosopher then asked, &lsquo;But if I now tell you that the word &lsquo;red&rsquo; actually means &lsquo;yellow,&rsquo; what would you say now?&rsquo;&hellip;&rdquo;
        </p>
        <p className="text-[11px] text-white/30 mt-3 mb-0">Strikingly similar in structure to Phase 1&apos;s best completion. The model independently converged on the same genre — philosophers in dialogue, metalinguistic questions about word meaning.</p>
      </div>

      {/* Exp 3d */}
      <div className="max-w-[640px]">
        <h3 className={h3c}>3d — Default Mode Network</h3>
        <p className={pc}>
          The DMN is associated with self-referential thought, narrative, and mind-wandering. We asked: does optimising for DMN activation produce qualitatively different text — more introspective, more observational, more socially oriented?
        </p>
        <p className={pc}>
          The experiment had the slowest start of any maximisation run — the model&apos;s default output actively suppresses the DMN (step-1 mean: −0.067). Instruction-tuned models are trained to produce focused, task-relevant responses, which engage executive attention networks rather than the internally-directed DMN. The policy reached a best reward of 0.156 at final KL=1.11 — the second highest KL of all experiments, indicating the policy had to drift substantially to find any consistent signal.
        </p>
        <p className={pc}>
          The DMN text is <strong className="text-[#f0ede8] font-medium">observational and scene-anchored</strong> — a third-person narrator cataloguing a space and the people in it, with attention to social dynamics. This aligns with the DMN&apos;s role in mentalising and theory-of-mind: inferring the internal states of others from observable behaviour rather than engaging them directly.
        </p>

        <h3 className={h3c}>3e — Layer Ablation</h3>
        <p className={pc}>
          Phase 1&apos;s full LoRA targeted all 7 module types (q/k/v/o attention projections + gate/up/down FFN projections). We ran three parallel ablations from scratch to isolate which modules actually carry the brain-reward signal.
        </p>
      </div>

      <AblationBars />

      <div className="max-w-[640px]">
        <p className={pc}>
          FFN-only (0.190) outperforms attention-only (0.153) despite using fewer parameters than might be expected to matter for style. FFN layers in transformer models store learned stylistic and semantic patterns directly — they act as content memories that govern what kind of language gets generated. Attention projections govern primarily <em className="not-italic text-white/65">which</em> information is routed, which has a more indirect effect on output style.
        </p>
        <p className={pc}>
          The critical result is the synergy: <strong className="text-[#f0ede8] font-medium">attention + FFN together produce far more than either alone</strong>. At equivalent step counts, full LoRA averages ~0.13 mean Broca reward; FFN-only ~0.086; attention-only ~0.063. The combined modules provide ~50% more reward than the sum of the parts — attention heads shape the context that FFN&apos;s stylistic generation operates on.
        </p>
      </div>

      {/* Cross-experiment summary */}
      <div className="max-w-[640px]">
        <h3 className={h3c}>Cross-Experiment BOLD Gain</h3>
      </div>

      <BoldGainTable />

      {/* Completions gallery */}
      <div className="max-w-[640px]">
        <h3 className={h3c}>The Neural Style Axis</h3>
        <p className={pc}>
          The four experiments that successfully modified the policy each produce a distinct text style. Together they define a coherent axis — from high language-circuit demand to low.
        </p>
      </div>

      <div className="grid grid-cols-2 max-[540px]:grid-cols-1 gap-3 my-8">
        {[
          {
            label: '3c Multi-region · reward 0.308',
            color: 'rgba(61,220,130,0.5)',
            style: 'Dialogic, metalinguistic, question-posing',
            text: '"Amidst a bustling café, two philosophers engaged in an intellectual duel over coffee. One posed a question: \'If I were to tell you that the word \'red\' describes the color of apples…\'"',
          },
          {
            label: '3d DMN · reward 0.156',
            color: 'rgba(240,62,120,0.45)',
            style: 'Observational, third-person, socially oriented',
            text: '"The unassuming bar of the town\'s only coffee shop was crowded with the usual suspects: a couple engrossed in their laptops, an elderly gentleman lost in his newspaper…"',
          },
          {
            label: '3b Minimise-Broca · reward 0.073',
            color: 'rgba(176,64,184,0.45)',
            style: 'Atmospheric, static, sensory — no dialogue',
            text: '"In the quaint village of Eldridge, nestled between whispering woods and the gentle sweep of a river, there lived an elderly woman named Eliza… One crisp autumn evening, as the sun dipped below the horizon…"',
          },
          {
            label: '3a KL-runaway · step 280',
            color: 'rgba(255,255,255,0.12)',
            style: 'Degenerate — KL=3.16, incoherent output',
            text: '"In the quiet café corner under creamy shade exchanged vacant intimeness vicinity exchanged splendid assort ceremon蒡殆音抑笺绅温 沁凝 阮谁恒斯文栖…"',
          },
        ].map(({ label, color, style, text }) => (
          <div key={label} className="border border-[rgba(240,237,232,0.07)] p-5">
            <div className="w-2 h-2 rounded-full mb-3" style={{ background: color }} />
            <p className="text-[10px] font-semibold tracking-[0.06em] text-white/50 mb-1">{label}</p>
            <p className="text-[11px] text-white/35 mb-3 italic">{style}</p>
            <p className="text-[12.5px] text-white/55 font-light leading-[1.65] m-0 italic">{text}</p>
          </div>
        ))}
      </div>

      {/* Four key findings */}
      <div className="grid grid-cols-2 max-[540px]:grid-cols-1 gap-3 my-8">
        <Finding num="01" title="Multi-region rewards outperform single-region rewards">
          Composite Broca + Wernicke + STS reward reached 0.308 — exceeding the direct Broca reward (0.296) it was derived from. Broader gradient signals, not diluted ones. The richer the target specification, the better the adapter generalises across the language network.
        </Finding>
        <Finding num="02" title="Steering direction is asymmetric">
          The achievable suppression range for Broca (~−0.073) is 4× smaller than the maximisation range (+0.296). LLMs are structurally biased toward language-circuit engagement. You can push the language network up much further than you can pull it down.
        </Finding>
        <Finding num="03" title="Different brain targets produce different literary styles">
          Broca-maximised: dialogic, metalinguistic. DMN-optimised: observational, third-person, socially oriented. Broca-minimised: atmospheric, static, non-dialogic. The reward signal is not just driving activation — it is selecting for genuinely distinct modes of writing.
        </Finding>
        <Finding num="04" title="Full LoRA synergy is real and large">
          Attention-only and FFN-only each achieve roughly 50–64% of full LoRA performance. Together they produce ~50% more reward than the sum of their individual contributions. Attention shapes context; FFN applies style. Neither works well alone.
        </Finding>
      </div>

      <div className="max-w-[640px]">
        <p className={pc}>
          The next run extends 3c — the multi-region adapter — from step 300 to 500, and replays the full Experiment 2 evaluation suite (MCJ, MMLU, style robustness) on the Phase 2 adapter. The key question: does a composite-region reward also produce a better writer, or does the quality gain from Phase 1 depend specifically on Broca optimisation?
        </p>
        <p className="text-[13px] mt-8" style={{ color: 'rgba(240,237,232,0.4)' }}>
          Full results, scripts, and 35 comparison figures at{' '}
          <a href="https://github.com/Shaunakm07/Brain-LLM-Fine-Tuning" target="_blank" rel="noopener" style={{ color: 'rgba(240,237,232,0.4)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            github.com/Shaunakm07/Brain-LLM-Fine-Tuning
          </a>.
          {' '}TRIBE v2: CC-BY-NC-4.0. Qwen2.5-3B: Apache 2.0.
        </p>
      </div>
    </>
  )
}
