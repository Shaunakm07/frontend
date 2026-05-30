'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const UNIS = [
  { src: '/logos/harvard.svg', alt: 'Harvard University' },
  { src: '/logos/stanford.svg', alt: 'Stanford University' },
]

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const imgs = track.querySelectorAll('img')
    let loaded = 0

    function setup() {
      if (!track) return
      const outerW = track.parentElement?.offsetWidth ?? window.innerWidth
      const origW = track.scrollWidth
      if (origW === 0) return
      const origHTML = track.innerHTML
      while (track.scrollWidth < outerW * 2.5) {
        track.insertAdjacentHTML('beforeend', origHTML)
      }
      const dur = Math.max(8, Math.round(origW / 80))
      track.style.setProperty('--marquee-shift', `-${origW}px`)
      track.style.setProperty('--marquee-dur', `${dur}s`)
      track.classList.add('is-running')
    }

    function onLoad() {
      if (++loaded === imgs.length) requestAnimationFrame(setup)
    }

    imgs.forEach(img => {
      if (img.complete) onLoad()
      else {
        img.addEventListener('load', onLoad)
        img.addEventListener('error', onLoad)
      }
    })
    if (!imgs.length) requestAnimationFrame(setup)
  }, [])

  return (
    <div className="flex items-stretch h-14 overflow-hidden">
      <style>{`
        .uni-track.is-running { animation: uni-scroll var(--marquee-dur, 20s) linear infinite; }
        .uni-track.is-running:hover { animation-play-state: paused; }
        @keyframes uni-scroll { to { transform: translateX(var(--marquee-shift, -50%)); } }
      `}</style>
      <span className="flex-shrink-0 flex items-center pr-7 pl-[clamp(20px,6vw,80px)] text-[10px] font-medium tracking-[0.1em] uppercase text-white/25 whitespace-nowrap">
        Developed by students at
      </span>
      <div className="flex-1 min-w-0 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #09090d 20%, transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #09090d 20%, transparent)' }} />
        <div ref={trackRef} className="uni-track flex items-center h-full w-max">
          {UNIS.map(({ src, alt }) => (
            <div key={src} className="flex items-center px-11 h-full">
              <Image
                src={src}
                alt={alt}
                width={80}
                height={18}
                className="h-[18px] w-auto opacity-[0.28] hover:opacity-55 transition-opacity duration-200"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
          ))}
          <div className="w-0.5 h-0.5 rounded-full bg-white/10 flex-shrink-0" />
        </div>
      </div>
    </div>
  )
}
