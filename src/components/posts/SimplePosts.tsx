const pc = 'text-[15px] font-light text-white/80 leading-[1.85] mb-5 last:mb-0'
const h3c = 'text-[15px] font-semibold text-[#f0ede8] mt-9 mb-3 tracking-[-0.01em]'
const bq = 'border-l border-[rgba(240,62,120,0.35)] pl-5 my-7 text-white/50 italic'

export function EmotionBody() {
  return (
    <div className="max-w-[640px]">
      <p className={pc}>
        Prompt engineering is still the dominant paradigm for generative AI: a human describes what they want in words, and the model does its best to interpret those words visually. Emotional outcome is an afterthought — evaluated after the fact by the human looking at the result. If it doesn&apos;t feel right, you iterate. You guess again. You hope.
      </p>
      <p className={pc}>
        Amphora inverts this. Emotional outcome becomes an <em className="not-italic text-white/65">input</em> to the generation process, not a judgment made at the end of it.
      </p>
      <h3 className={h3c}>Why this is now possible</h3>
      <p className={pc}>
        Decades of neuroimaging research have produced a clear map of which visual features activate which brain regions. The fusiform face area responds to faces and social signals. The amygdala fires for threat, awe, and arousal. The precuneus lights up for self-referential feeling, aspiration, and memory. The anterior cingulate tracks discomfort and tension.
      </p>
      <p className={pc}>
        Modern deep learning makes it tractable to generalise this map to arbitrary visual inputs. The training data is openly published in academic repositories. What Amphora contributes is the applied pipeline, the production feedback loop from real creative use, and the integration layer that makes the science accessible to builders who are not neuroscientists.
      </p>
      <blockquote className={bq}>
        Rather than assigning a vague label like &quot;happy&quot; or &quot;tense,&quot; Amphora tells you which parts of the brain the image is likely to light up.
      </blockquote>
      <h3 className={h3c}>What this unlocks</h3>
      <p className={pc}>
        When emotional coherence is a requirement rather than a preference — when AI is generating the majority of commercial visual content — the company that owns the scientific infrastructure for measuring and targeting emotional response is in an extraordinarily durable position.
      </p>
      <p className={pc}>
        The Gauguin who paints from feeling and the Pollock who paints from impulse produce different work because they are running different internal models of what an image should do to the person looking at it. Amphora is building that model — externalising it, formalising it, and putting it inside the machines that are increasingly making the art.
      </p>
    </div>
  )
}

export function FmriBody() {
  return (
    <div className="max-w-[640px]">
      <p className={pc}>
        Phase 1 was about proving the core thesis: that a production-ready model could generalise from publicly available fMRI datasets to arbitrary real-world visual inputs — photographs, AI-generated scenes, product renders, advertising creative — with enough precision to be useful as a creative feedback signal.
      </p>
      <h3 className={h3c}>What the model does</h3>
      <p className={pc}>
        The fMRI prediction engine takes a visual input and outputs activation scores across the regions most relevant to emotional and perceptual processing:
      </p>
      <ul className="pl-[18px] mb-5 text-[15px] font-light text-white/80 leading-[1.85]">
        <li className="mb-2"><strong className="text-[#f0ede8] font-medium">Fusiform face area</strong> — recognition, intimacy, social engagement</li>
        <li className="mb-2"><strong className="text-[#f0ede8] font-medium">Amygdala</strong> — threat, awe, arousal, emotional salience</li>
        <li className="mb-2"><strong className="text-[#f0ede8] font-medium">Precuneus</strong> — aspiration, self-referential feeling, nostalgia</li>
        <li className="mb-2"><strong className="text-[#f0ede8] font-medium">Anterior cingulate</strong> — discomfort, tension, moral conflict</li>
      </ul>
      <p className={pc}>
        These aren&apos;t labels. They&apos;re predicted activations — continuous scores calibrated against the neuroimaging literature, expressed in the same units as the original experimental data.
      </p>
      <h3 className={h3c}>What surprised us</h3>
      <p className={pc}>
        The model generalises better to AI-generated imagery than we expected. Our hypothesis was that synthetic images might fall outside the training distribution in ways that degraded prediction quality. In practice, high-quality AI-generated images activate the same regions as photographic equivalents, at similar magnitudes. This makes the Emotion Guidance Loop more immediately applicable to generative pipelines than we&apos;d planned.
      </p>
      <blockquote className={bq}>
        The training data is openly published. What we contribute is the applied pipeline — and the feedback loop from real-world creative use that makes the model better over time.
      </blockquote>
      <h3 className={h3c}>What&apos;s next</h3>
      <p className={pc}>
        Phase 2 is the integration layer: the API that plugs the prediction engine into generative AI pipelines, and the Emotion Guidance Loop that uses predicted activation to steer generation toward a target emotional profile. We&apos;re running closed beta with a small group of creative teams and AI platform companies now. If you&apos;re on the waitlist, you&apos;ll hear from us soon.
      </p>
    </div>
  )
}

export function WhyBody() {
  return (
    <div className="max-w-[640px]">
      <p className={pc}>
        Before founding Amphora, our team worked across computational neuroscience research, generative AI labs, and developer tools companies. In every environment, the same gap was visible: the tools for creating visual content had become extraordinarily powerful, but the tools for understanding what that content <em className="not-italic text-white/65">does</em> to the people who see it had barely advanced beyond human intuition.
      </p>
      <p className={pc}>
        A brand team launching a campaign can test whether an image looks good. They can run it through a focus group. They can wait for click data. What they cannot do — until now — is measure, before launch, which regions of the brain their creative is likely to activate, and whether that matches the emotional response they designed for.
      </p>
      <h3 className={h3c}>The founding team</h3>
      <p className={pc}>
        The three of us bring complementary backgrounds to this problem. Our research lead holds a computational neuroscience PhD with deep background in fMRI analysis. Our engineering lead comes from a major generative AI lab. Our commercial lead has scaled developer tools companies from early revenue to Series A. We are one of a small number of companies working at the intersection of neuroscience and AI.
      </p>
      <h3 className={h3c}>The market we&apos;re building for</h3>
      <p className={pc}>
        Our largest immediate market is advertising and brand creative — teams that need to audit emotional impact before assets go live. Beyond that, we&apos;re building for AI-native creative platforms that want to offer emotional targeting as a product feature, entertainment and game studios that need scientific instruments for creative decisions, and eventually the medical and therapeutic design space.
      </p>
      <p className={pc}>
        The long-term outcome isn&apos;t selling scores. It&apos;s becoming the emotional specification standard for AI-generated content — the layer that every creative AI pipeline runs through before an image is considered finished, the way a spellchecker runs before a document is considered done.
      </p>
      <p className="text-[15px] text-[rgba(240,237,232,0.7)] italic mt-6">— The Amphora Team</p>
    </div>
  )
}
