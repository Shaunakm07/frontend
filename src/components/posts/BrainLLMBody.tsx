import RoiBars from '@/components/charts/RoiBars'

const pc = 'text-[15px] font-light text-white/80 leading-[1.85] mb-5 last:mb-0'
const h3c = 'text-[15px] font-semibold text-[#f0ede8] mt-9 mb-3 tracking-[-0.01em]'

function ExpFigure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <div className="my-8 border border-[rgba(240,237,232,0.07)]">
      <img src={src} alt={alt} className="w-full block bg-[#06060a]" />
      <p className="px-3.5 py-2.5 text-[11px] text-white/50 leading-[1.55] border-t border-[rgba(240,237,232,0.07)] tracking-[0.01em]">
        {caption}
      </p>
    </div>
  )
}

function StatStrip() {
  const stats = [
    { num: '+150%', grad: 'var(--grad)', label: 'Broca reward gain, step 1 → 200' },
    { num: '0.296', grad: 'linear-gradient(135deg,#f03d78,#b840b8)', label: 'Best single-completion Broca score found' },
    { num: '0.28', grad: 'linear-gradient(135deg,#b840b8,#6040e8)', label: 'Final KL divergence from base (safe <2.0)' },
    { num: '20M', color: 'rgba(240,237,232,0.6)', label: 'Trainable LoRA params out of 3.09B total' },
  ]
  return (
    <div className="grid grid-cols-4 max-[540px]:grid-cols-2 border border-[rgba(240,237,232,0.07)] my-8">
      {stats.map(({ num, grad, color, label }) => (
        <div key={num} className="px-[18px] py-5 border-r border-[rgba(240,237,232,0.07)] last:border-r-0 max-[540px]:even:border-r-0 max-[540px]:[&:nth-child(3)]:border-r">
          <div
            className="text-[28px] font-bold tracking-[-0.04em] leading-none mb-[5px]"
            style={grad
              ? { background: grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }
              : { color }}
          >
            {num}
          </div>
          <div className="text-[10.5px] text-white/50 tracking-[0.02em] leading-[1.4]">{label}</div>
        </div>
      ))}
    </div>
  )
}

function Finding({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div className="border border-[rgba(240,237,232,0.07)] p-5">
      <p className="text-[11px] font-semibold tracking-[0.06em] text-white/50 mb-2.5">{num}</p>
      <h4 className="text-[13px] font-semibold text-[#f0ede8] tracking-[-0.01em] leading-[1.3] mb-2">{title}</h4>
      <p className="text-[12.5px] text-white/50 font-light leading-[1.7] m-0">{children}</p>
    </div>
  )
}

export default function BrainLLMBody() {
  return (
    <>
      <div className="max-w-[640px]">
        <p className={pc}>
          The question at the center of Amphora is simple to state and hard to answer: can a machine be told to produce something that creates a specific feeling in the brain? Not &quot;looks like it should feel a certain way.&quot; Actually activates the neural machinery for that feeling.
        </p>
        <p className={pc}>
          We&apos;ve been working on this for images — that&apos;s the core product. But we wanted to understand the problem from a different angle. So we ran an experiment: fine-tune a language model to maximise predicted fMRI activation in <strong className="text-[#f0ede8] font-medium">Broca&apos;s area</strong>, the primary cortical region for language production and syntactic processing, using a neuroscience model as the reward signal.
        </p>
        <p className={pc}>Here&apos;s what happened.</p>
        <h3 className={h3c}>The setup</h3>
        <p className={pc}>
          We used <strong className="text-[#f0ede8] font-medium">TRIBE v2</strong> (Meta AI, <em className="not-italic text-white/65">facebook/tribev2</em>) — a foundation model trained on over 1,000 hours of real fMRI data — to predict what cortical activity a piece of text would produce if spoken aloud. The prediction pipeline works like this: text is synthesised to speech via gTTS, passed through WhisperX for word-level timestamps, then processed through TRIBE&apos;s dual-pathway architecture (LLaMA 3.2-3B for text, Wav2Vec-BERT for audio), producing a predicted BOLD signal across all 20,484 cortical vertices of the fsaverage5 brain mesh.
        </p>
        <p className={pc}>
          That predicted BOLD signal — specifically the mean activation across Broca&apos;s area vertices as defined by the Destrieux atlas — became the reward signal for RL fine-tuning of <strong className="text-[#f0ede8] font-medium">Qwen2.5-3B-Instruct</strong> using LoRA (r=32, α=64, ~20M trainable parameters out of 3.09B).
        </p>
      </div>

      {/* Setup table */}
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse text-[12.5px]">
          <tbody>
            {[
              ['Policy model', 'Qwen/Qwen2.5-3B-Instruct'],
              ['Reward model', 'TRIBE v2 — facebook/tribev2'],
              ['Training target', "Broca's area (left IFG pars opercularis + triangularis)"],
              ['LoRA rank / alpha', 'r=32, α=64'],
              ['Trainable parameters', '~20M out of 3.09B (0.65%)'],
              ['Training steps', '200'],
              ['Completions per step', '4 (averaged for advantage estimate)'],
              ['Algorithm', 'Advantage-weighted SFT + KL penalty (0.1 coefficient)'],
              ['Hardware', 'NVIDIA L40S (46 GB VRAM), 251 GB RAM'],
            ].map(([k, v]) => (
              <tr key={k}>
                <td className="px-3.5 py-[9px] border-b border-[rgba(240,237,232,0.07)] text-white/50 font-normal whitespace-nowrap pr-6 align-top w-[40%]">{k}</td>
                <td className="px-3.5 py-[9px] border-b border-[rgba(240,237,232,0.07)] text-white/65 align-top">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="max-w-[640px]">
        <p className={pc}>
          Each training step sampled four completions from the current policy, ran each through the full TRIBE pipeline to get a Broca activation score, computed normalised advantages, then updated the model weights — penalising drift from the base model with a KL term to prevent degenerate outputs.
        </p>
      </div>

      <pre className="font-mono text-[11.5px] text-white/55 bg-white/[0.03] border border-[rgba(240,237,232,0.07)] px-[18px] py-4 leading-[1.75] overflow-x-auto my-6 whitespace-pre">
{`1. Sample N=4 completions from policy (temp 1.0 → 0.6, linear anneal)
2. Synthesise each → speech (gTTS) → WhisperX timestamps
3. TRIBE v2: LLaMA 3.2-3B (text) + Wav2Vec-BERT (audio)
             → fusion transformer → (T × 20,484) BOLD array
4. Extract mean activation over Broca's area vertices
5. Advantages: A_i = (r_i − mean(r)) / std(r)
6. Loss: Σ A_i × CE(policy, completion_i) + 0.1 × KL(policy ‖ base)
7. Gradient step → checkpoint every 20 steps`}
      </pre>

      <div className="max-w-[640px]">
        <h3 className={h3c}>The training trajectory</h3>
        <p className={pc}>
          The reward trend was monotonically upward. Mean Broca activation per step went from 0.085 at step 1 to 0.212 at step 200 — a <strong className="text-[#f0ede8] font-medium">+150% improvement</strong>. The best reward found across all completions reached 0.296.
        </p>
      </div>

      <ExpFigure
        src="/plots/fig5_training_trajectory.png"
        alt="Training trajectory — reward, policy loss, and KL divergence over 200 steps"
        caption="Training trajectory over 200 steps. Left: mean Broca reward per step (blue) and running best reward (orange dashed). Centre: policy loss. Right: KL divergence from base model. KL peaked at 0.318 and settled at 0.280 — well within stable range. Theoretical instability threshold is ~2.0 nats."
      />

      <div className="max-w-[640px]">
        <p className={pc}>
          The KL divergence is important. The model drifted only 0.28 nats from the base — a conservative shift. This means there&apos;s substantial room to push further: more steps, more completions per step, or a larger KL budget. The current run explored a narrow slice of what&apos;s possible.
        </p>
      </div>

      <StatStrip />

      <div className="max-w-[640px]">
        <h3 className={h3c}>What changed in the brain</h3>
        <p className={pc}>
          After training, we generated fresh completions from both the base model and the LoRA-adapted model at step 200, then ran TRIBE v2 on each to get predicted fMRI activity across all 20,484 cortical vertices. The results were mapped onto the fsaverage5 inflated cortical surface.
        </p>
      </div>

      <ExpFigure
        src="/plots/fig3_brain_surface.png"
        alt="Cortical surface maps — base, LoRA, and difference"
        caption="Cortical surface maps from four viewpoints (left lateral, left medial, right lateral, right medial). Top row: base model activation. Middle row: LoRA model activation. Bottom row: difference (LoRA − base), diverging green-pink colormap. The difference row shows widespread bilateral increases — strongest in the temporal and frontal lobes, the core language network territory."
      />

      <div className="max-w-[640px]">
        <p className={pc}>
          The surface maps show something striking: the gains were <strong className="text-[#f0ede8] font-medium">bilateral</strong>, not left-lateralised as you&apos;d expect from a Broca&apos;s-area-only training signal. Left hemisphere mean went from +0.023 to +0.102; right hemisphere mean went from +0.022 to +0.105. Right-hemisphere language homologues are associated with discourse-level processing, prosody, and narrative coherence. The model wasn&apos;t taught this. It learned it.
        </p>
        <h3 className={h3c}>All 20 cortical regions</h3>
        <p className={pc}>
          We measured predicted BOLD across 20 anatomically defined ROIs. The target was Broca&apos;s area. But 19 of 20 regions showed positive gains — and Wernicke&apos;s area gained <em className="not-italic text-white/65">more</em> than the training target.
        </p>
      </div>

      <ExpFigure
        src="/plots/fig2_roi_bar_chart.png"
        alt="ROI bar chart — mean activation per region, base vs LoRA"
        caption="Mean BOLD activation per cortical ROI. Left: absolute values for base (red) and LoRA (blue). Right: activation change (LoRA − base), sorted by magnitude. Gold highlight marks Broca's area, the training target. Wernicke's area showed the largest absolute gain (+0.218), followed by middle temporal gyrus (+0.156) and superior frontal cortex (+0.134)."
      />

      <div className="max-w-[640px]">
        <p className={pc}>The full ROI breakdown:</p>
      </div>

      <RoiBars />

      <ExpFigure
        src="/plots/fig1_all_roi_timeseries.png"
        alt="All 20 ROI timeseries — base vs LoRA"
        caption="All 20 ROI timeseries side by side. Each panel shows predicted BOLD for base (red) and LoRA (blue); purple shading marks the difference. Broca's area (training target) is highlighted with a gold border. Note that Wernicke's area (top-right, no border) shows a larger absolute shift — the model generalised to the full language network, not just the region it was trained on."
      />

      <ExpFigure
        src="/plots/fig4_global_comparison.png"
        alt="Global BOLD, hemisphere split, vertex heatmaps"
        caption="Top row: global mean BOLD, left hemisphere, right hemisphere — all three showing parallel increases. Bottom row: difference timeseries and vertex-level heatmaps showing the distribution of activation change across the full cortical surface for base and LoRA models."
      />

      <div className="max-w-[640px]">
        <h3 className={h3c}>The text actually changed</h3>
        <p className={pc}>
          The shift in brain activation maps to a real qualitative change in how the model writes. Both completions below were generated in response to the same prompt: <em className="not-italic text-white/65">&quot;Tell a rich, detailed story about a moment when language revealed something surprising about the nature of the mind.&quot;</em>
        </p>
      </div>

      {/* Compare block */}
      <div className="grid grid-cols-2 max-[540px]:grid-cols-1 gap-3 my-8">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.08em] uppercase text-white/50 mb-2.5">Base model — Broca BOLD: 0.031</p>
          <p className="text-[13px] font-light text-white/50 leading-[1.75] border border-[rgba(240,237,232,0.07)] p-4 italic">
            &quot;In the quiet library of an old university, nestled between towering shelves and whispering shadows, there was a moment that seemed to unravel the intricate tapestry of the human psyche. It was the late afternoon, the sunlight filtering through stained glass windows casting kaleidoscopic patterns on the worn carpet. A young woman, her eyes lost in the pages of an ancient tome, sat at a small wooden table by the window…&quot;
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold tracking-[0.08em] uppercase mb-2.5" style={{ color: 'rgba(240,62,120,0.7)' }}>LoRA fine-tuned — Broca BOLD: 0.198 (+0.167)</p>
          <p className="text-[13px] font-light leading-[1.75] border p-4 italic" style={{ color: 'rgba(240,237,232,0.72)', borderColor: 'rgba(240,62,120,0.2)', background: 'rgba(240,62,120,0.03)' }}>
            &quot;Amidst a bustling café, a conversation between an old friend and a stranger entwined around the most obscure corners of literature. The friend, a literary scholar, was discussing the intricacies of Charles Dickens&apos; &apos;Great Expectations,&apos; while the stranger, a casual reader, merely nodded along. Suddenly, the scholar asked, &apos;Do you see how Pip&apos;s obsession with Miss Havisham mirrors his own forgotten childhood?&apos; The stranger paused, his eyes widening in realization. &apos;Oh, I see!&apos; he exclaimed…&quot;
          </p>
        </div>
      </div>

      <div className="max-w-[640px]">
        <p className={pc}>
          The base model writes descriptive scene-setting prose with rich sensory imagery. The LoRA model gravitates toward <strong className="text-[#f0ede8] font-medium">dialogue-driven, metalinguistic narrative</strong> — characters exchanging ideas, questions posed, conceptual links drawn out loud. This style is phonologically denser, syntactically richer, and semantically layered. And it&apos;s exactly what the neuroimaging literature predicts should drive higher BOLD in Broca&apos;s (syntactic processing), Wernicke&apos;s (semantic integration), and the superior temporal sulcus (prosody and speech integration).
        </p>
        <p className={pc}>
          The model was never told any of this. It learned, through gradient descent on a neuroscience reward signal, that metalinguistic dialogue is neurologically compelling. That&apos;s a learned inductive bias about what kind of text the brain finds engaging.
        </p>
        <h3 className={h3c}>What this means</h3>
      </div>

      <div className="grid grid-cols-2 max-[540px]:grid-cols-1 gap-3 my-8">
        <Finding num="01" title="Neural reward signals work for LLM fine-tuning">
          End-to-end gradient flow from a model trained on real fMRI, through a reward signal, into language model weights. 200 steps × 4 completions produced a 150% improvement in the training target. This is a viable paradigm.
        </Finding>
        <Finding num="02" title="Train on one region, the network responds">
          We targeted Broca&apos;s area. Wernicke&apos;s gained more. STS, auditory cortex, superior frontal, and middle temporal all showed gains above +0.10. The model learned richer language, not a Broca trick. The whole network co-activated.
        </Finding>
        <Finding num="03" title="The KL stayed low — there's room to scale">
          0.28 nats of drift after 200 steps. Theoretical instability threshold is ~1.0–2.0 nats. This run was conservative. More steps, more completions, or a higher KL budget could push the reward substantially further.
        </Finding>
        <Finding num="04" title="Text-to-brain optimisation is interpretable">
          Unlike optimising against an opaque judge, each reward improvement maps to a well-studied brain region with known function. When Wernicke&apos;s gains more than the target, we can say exactly why — co-localisation of semantic and syntactic demands.
        </Finding>
      </div>

      <div className="max-w-[640px]">
        <h3 className={h3c}>What this means for Amphora</h3>
        <p className={pc}>
          This experiment was about text — we ran it to understand the problem at a level of detail we can&apos;t get from image experiments alone. The core finding is that a neuroscience model trained on real fMRI can function as a reward signal that meaningfully changes a generative model&apos;s output distribution, in ways that are both measurable and interpretable.
        </p>
        <p className={pc}>
          The image version of this — using predicted brain activation as a guidance signal for generative visual AI — is the product we&apos;re building. This experiment gives us confidence that the feedback mechanism works, that the reward signal has enough gradient to train against, and that the resulting model learns something real about the structure of neural response rather than overfitting to surface features.
        </p>
        <blockquote className="border-l border-[rgba(240,62,120,0.35)] pl-5 my-7 text-white/50 italic">
          The question for Amphora isn&apos;t whether this mechanism works. It does. The question is how precisely we can specify the target — and how much of the emotional specification surface we can cover.
        </blockquote>
        <p className={pc}>
          We&apos;re moving fast. The image prediction engine is live in closed beta. If you want early access, join the waitlist.
        </p>
        <p className="text-[13px] mt-8" style={{ color: 'rgba(240,237,232,0.4)' }}>
          Full experiment code and figures at{' '}
          <a href="https://github.com/Shaunakm07/Brain-LLM-Fine-Tuning" target="_blank" rel="noopener" style={{ color: 'rgba(240,237,232,0.4)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            github.com/Shaunakm07/Brain-LLM-Fine-Tuning
          </a>.
          {' '}TRIBE v2 is released under CC-BY-NC-4.0. Qwen2.5-3B is Apache 2.0.
        </p>
      </div>
    </>
  )
}
