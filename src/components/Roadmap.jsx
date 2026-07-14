import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ROADMAP } from '../data/collection'

gsap.registerPlugin(ScrollTrigger)

const STATUS_LABEL = {
  done: '■ COMPLETE',
  active: '▶ IN PROGRESS',
  next: '□ QUEUED',
}

export default function Roadmap() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.tl-spine-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline',
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 0.6,
          },
        }
      )
      gsap.utils.toArray('.tl-item').forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: 60, filter: 'brightness(2.2)' },
          {
            opacity: 1,
            x: 0,
            filter: 'brightness(1)',
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 80%' },
          }
        )
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section" id="roadmap" ref={root}>
      <div className="section-head">
        <span className="section-index mono">[04]</span>
        <h2 className="section-title glitch" data-text="CORRUPTION TIMELINE">
          CORRUPTION TIMELINE
        </h2>
      </div>

      <div className="timeline">
        <div className="tl-spine">
          <div className="tl-spine-fill" />
        </div>
        {ROADMAP.map((p) => (
          <article className={`tl-item status-${p.status}`} key={p.phase}>
            <div className={`tl-node st-${p.status}`} />
            <div className="tl-card">
              <div className="phase-head">
                <span className="phase-num mono">{p.phase}</span>
                <span className={`phase-status mono st-${p.status}`}>
                  {STATUS_LABEL[p.status]}
                </span>
              </div>
              <h3 className="phase-title gtx">{p.title}</h3>
              <ul className="phase-items">
                {p.items.map((item) => (
                  <li className="mono" key={item}>
                    <span className="phase-tick">&gt;</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
