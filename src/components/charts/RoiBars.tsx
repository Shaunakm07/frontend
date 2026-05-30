const rois = [
  ['wernicke', 0.070, 0.289, 0.218, false],
  ['broca ★', 0.031, 0.198, 0.167, true],
  ['middle temporal', -0.074, 0.083, 0.156, false],
  ['superior frontal', 0.031, 0.165, 0.134, false],
  ['auditory', 0.167, 0.292, 0.125, false],
  ['STS', 0.124, 0.232, 0.108, false],
  ['supramarginal', -0.008, 0.098, 0.106, false],
  ['DLPFC', -0.031, 0.061, 0.093, false],
  ['ant. cingulate', -0.006, 0.071, 0.077, false],
  ['motor', 0.115, 0.192, 0.076, false],
  ['fusiform', 0.062, 0.136, 0.075, false],
  ['insula', -0.018, 0.049, 0.066, false],
  ['V1', -0.013, 0.048, 0.061, false],
  ['angular', -0.005, 0.045, 0.050, false],
  ['lateral occipital', 0.053, 0.100, 0.047, false],
  ['default mode', -0.053, -0.006, 0.047, false],
  ['somatosensory', 0.086, 0.128, 0.042, false],
  ['inf. temporal', -0.021, 0.018, 0.038, false],
  ['sup. parietal', 0.045, 0.065, 0.020, false],
  ['parahippocampal', -0.016, -0.020, -0.004, false],
] as const

export default function RoiBars() {
  return (
    <div className="my-6 border border-[rgba(240,237,232,0.07)] p-5 pb-3.5">
      {rois.map(([name, base, lora, d, isTarget]) => {
        const pct = Math.min(100, Math.round(Math.abs(d as number) / 0.25 * 100))
        const pos = (d as number) >= 0
        return (
          <div key={name as string} className="flex items-center gap-2.5 py-1.5 border-b border-white/[0.04] last:border-b-0 text-[12px]">
            <span
              className="min-w-[130px] text-[11.5px] font-normal"
              style={{ color: isTarget ? 'rgba(240,96,48,0.8)' : 'rgba(255,255,255,0.5)', fontWeight: isTarget ? 500 : 400 }}
            >
              {name as string}
            </span>
            <span className="min-w-[38px] text-right text-[11px] text-white/[0.22]">
              {(base as number) >= 0 ? '+' : ''}{(base as number).toFixed(3)}
            </span>
            <span className="text-[10px] text-white/[0.14] mx-1">→</span>
            <span className="min-w-[38px] text-right text-[11px] text-white/[0.38]">
              {(lora as number) >= 0 ? '+' : ''}{(lora as number).toFixed(3)}
            </span>
            <div className="flex-1 mx-2.5 h-[3px] rounded-[2px] bg-white/[0.04] overflow-hidden">
              <div
                className="h-full rounded-[2px]"
                style={{
                  width: `${pct}%`,
                  background: pos
                    ? 'linear-gradient(135deg,#f06030,#f03d78)'
                    : 'rgba(240,62,120,0.45)',
                }}
              />
            </div>
            <span
              className="min-w-[44px] text-right text-[11px]"
              style={{ color: pos ? 'rgba(61,220,130,0.55)' : 'rgba(240,62,120,0.45)' }}
            >
              {pos ? '+' : ''}{(d as number).toFixed(3)}
            </span>
          </div>
        )
      })}
    </div>
  )
}
