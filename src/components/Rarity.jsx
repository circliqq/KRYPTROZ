import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RARITY } from '../data/collection'

gsap.registerPlugin(ScrollTrigger)

export default function Rarity() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.rarity-row').forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: i * 0.05,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 88%' },
          }
        )
        const bar = row.querySelector('.rarity-fill')
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: { trigger: row, start: 'top 88%' },
          }
        )
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section" id="rarity" ref={root}>
      <div className="section-head">
        <span className="section-index mono">[03]</span>
        <h2 className="section-title glitch" data-text="RARITY">
          RARITY
        </h2>
      </div>

      <div className="rarity-table">
        {RARITY.map((r) => (
          <div className="rarity-row" key={r.tier}>
            <div className="rarity-info">
              <span className="rarity-tier mono gtx" style={{ color: r.color }}>
                {r.tier}
              </span>
              <span className="rarity-desc mono">{r.desc}</span>
            </div>
            <div
              className="rarity-bar"
              role="meter"
              aria-label={`${r.tier} rarity share`}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={r.share}
              aria-valuetext={`${r.share} percent`}
            >
              <div
                className="rarity-fill"
                style={{ width: `${Math.max(r.share, 1.2)}%`, background: r.color }}
              />
            </div>
            <span className="rarity-share mono">{r.share}%</span>
          </div>
        ))}
      </div>
    </section>
  )
}
