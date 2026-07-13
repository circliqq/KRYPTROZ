import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CARDS, STATS } from '../data/collection'

gsap.registerPlugin(ScrollTrigger)

export default function Collection() {
  const root = useRef(null)

  useEffect(() => {
    // only decode videos that are on screen — too many 
    // simultaneous decodes makes some cards render black
    const vids = root.current.querySelectorAll('video')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          const v = en.target
          if (en.isIntersecting) v.play().catch(() => {})
          else v.pause()
        })
      },
      { rootMargin: '160px' }
    )
    vids.forEach((v) => io.observe(v))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // count-up numeric stats only
      gsap.utils.toArray('[data-count]').forEach((el) => {
        const end = parseFloat(el.dataset.count)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: end,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate: () => {
            el.textContent = Math.floor(obj.v).toLocaleString()
          },
        })
      })
      gsap.fromTo(
        '.skull-card',
        { opacity: 0, y: 50, filter: 'brightness(2.5) saturate(0)' },
        {
          opacity: 1,
          y: 0,
          filter: 'brightness(1) saturate(1)',
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.collection-grid', start: 'top 82%' },
        }
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section" id="collection" ref={root}>
      <div className="section-head">
        <span className="section-index mono">[02]</span>
        <h2 className="section-title glitch" data-text="COLLECTION">
          COLLECTION
        </h2>
      </div>

      <div className="stats-strip">
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <span className="stat-value mono gtx">
              {s.count != null ? <span data-count={s.count}>0</span> : s.value}
            </span>
            <span className="stat-label mono">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="collection-grid">
        {CARDS.map((c) => (
          <figure
            className={`skull-card ${c.feature ? 'feature' : ''} ${c.locked ? 'locked' : ''}`}
            key={c.id}
          >
            <div className="skull-art">
              <video
                className="skull-video"
                src={c.src}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
              {c.locked && (
                <div className="skull-encrypted mono" aria-hidden="true">
                  <span className="enc-icon">◈</span>
                  <span className="enc-title">CLASSIFIED</span>
                  <span className="enc-sub">DECRYPTS AT MINT</span>
                </div>
              )}
              <span className="skull-scan" />
              <div className="skull-slices" aria-hidden="true">
                <span /><span /><span />
              </div>
              <span className="skull-lock mono">
                {c.locked ? '◉ ENCRYPTED SIGNAL' : `◉ SPECIMEN ${c.id}`}
              </span>
            </div>
            <figcaption className="skull-meta">
              <span className="mono skull-id">{c.locked ? '#???' : c.id}</span>
              <span className="skull-name gtx">{c.locked ? '▓▒░ ENCRYPTED' : c.name}</span>
              <span
                className={`skull-rarity mono ${
                  c.locked ? 'r-unknown' : `r-${c.rarity.toLowerCase().replace(/[^a-z0-9]/g, '')}`
                }`}
              >
                {c.locked ? '????' : c.rarity}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
