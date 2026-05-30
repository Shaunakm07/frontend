import { ReactNode } from 'react'

export type BarType = 'base' | 'lora' | 'ref'

export interface Bar {
  key: string
  val: number
  max: number
  type: BarType
  label?: string
}

export interface BarGroupData {
  name: ReactNode
  bars: Bar[]
  delta?: string
  deltaDir?: 'pos' | 'neg' | 'zero'
}

function fillClass(type: BarType) {
  if (type === 'base') return 'hbar-fill-base'
  if (type === 'lora') return 'hbar-fill-lora'
  return 'hbar-fill-ref'
}

function deltaColor(dir?: 'pos' | 'neg' | 'zero') {
  if (dir === 'pos') return 'rgba(61,220,130,0.78)'
  if (dir === 'neg') return 'rgba(240,62,120,0.72)'
  return 'rgba(255,255,255,0.22)'
}

export function HBarGroup({ name, bars, delta, deltaDir }: BarGroupData) {
  return (
    <div className="py-2.5 border-b border-white/[0.04] last:border-b-0">
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-[12px] text-white/80">{name}</span>
        {delta && (
          <span className="text-[10.5px] font-medium" style={{ color: deltaColor(deltaDir) }}>
            {delta}
          </span>
        )}
      </div>
      {bars.map((bar, i) => {
        const pct = bar.max > 0 ? (bar.val / bar.max) * 100 : 0
        const lbl = bar.label !== undefined
          ? bar.label
          : bar.val === 0 ? '0.000'
          : bar.val < 1 ? bar.val.toFixed(3)
          : bar.val.toFixed(2)
        return (
          <div key={i} className="flex items-center gap-2 mb-[5px] last:mb-0">
            <span className="text-[9px] font-semibold tracking-[0.07em] uppercase text-white/[0.18] w-[26px] flex-shrink-0">
              {bar.key}
            </span>
            <div className="flex-1 h-2 rounded-[4px] bg-white/[0.04] overflow-hidden">
              <div className={`h-full rounded-[4px] ${fillClass(bar.type)}`} style={{ width: `${pct.toFixed(1)}%` }} />
            </div>
            <span className="text-[10px] text-white/30 min-w-[38px] text-right flex-shrink-0">{lbl}</span>
          </div>
        )
      })}
    </div>
  )
}

export function ChartLegend({ items }: { items: Array<{ type: BarType; label: string }> }) {
  const dotClass: Record<BarType, string> = {
    base: 'nd-base',
    lora: 'nd-lora',
    ref: 'nd-ref',
  }
  const dotStyle: Record<BarType, React.CSSProperties> = {
    base: { background: 'rgba(99,160,210,0.8)' },
    lora: { background: 'linear-gradient(135deg,#f06030,#f03d78)' },
    ref: { background: 'rgba(155,155,155,0.6)' },
  }
  return (
    <div className="flex gap-4 mb-4 flex-wrap">
      {items.map(({ type, label }) => (
        <span key={type} className="flex items-center gap-[5px] text-[10px] text-white/50">
          <span className="w-[9px] h-[9px] rounded-[2px] flex-shrink-0" style={dotStyle[type]} />
          {label}
        </span>
      ))}
    </div>
  )
}

export function ChartBlock({ children, caption }: { children: ReactNode; caption?: string }) {
  return (
    <div className="border border-[rgba(240,237,232,0.07)] my-9 overflow-hidden">
      {children}
      {caption && (
        <p className="px-4 py-[9px] text-[11px] text-white/50 leading-[1.6] border-t border-[rgba(240,237,232,0.07)] bg-white/[0.008]">
          {caption}
        </p>
      )}
    </div>
  )
}

export function ChartBody({ children }: { children: ReactNode }) {
  return (
    <div className="px-5 py-[22px] pb-[18px] bg-white/[0.012]">
      {children}
    </div>
  )
}

export function ChartPair({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 max-[600px]:grid-cols-1 bg-[rgba(240,237,232,0.07)] gap-px">
      {children}
    </div>
  )
}

export function ChartCol({ children }: { children: ReactNode }) {
  return (
    <div className="px-5 py-[22px] pb-[18px] bg-[rgba(9,9,13,0.97)]">
      {children}
    </div>
  )
}

export function ChartTitle({ children }: { children: ReactNode }) {
  return (
    <p className="text-[10px] font-semibold tracking-[0.08em] uppercase text-white/50 mb-1">
      {children}
    </p>
  )
}

export function ChartSub({ children }: { children: ReactNode }) {
  return (
    <p className="text-[10.5px] text-white/20 mb-3.5 font-light">{children}</p>
  )
}

export function SegBar({ label, base, lora }: { label: string; base: number; lora: number }) {
  return (
    <div className="flex items-center gap-2.5 py-[9px] border-b border-white/[0.04] last:border-b-0">
      <span className="text-[11.5px] text-white/80 min-w-[110px] flex-shrink-0">{label}</span>
      <div className="flex-1 h-[22px] flex rounded-[3px] overflow-hidden gap-px">
        <div
          className="flex items-center justify-center text-[11px] font-semibold text-white/55 min-w-5"
          style={{ flex: base, background: 'rgba(99,160,210,0.28)' }}
        >
          {base}
        </div>
        <div
          className="flex items-center justify-center text-[11px] font-semibold text-white/90 min-w-5"
          style={{ flex: lora, background: 'linear-gradient(90deg,rgba(240,96,48,0.45),rgba(240,62,120,0.5))' }}
        >
          {lora}
        </div>
      </div>
    </div>
  )
}
