import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STORY } from '../data/collection'

gsap.registerPlugin(ScrollTrigger)

export default function Story() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.story-block').forEach((block, i) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 60, x: i % 2 === 0 ? -30 : 30 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: block, start: 'top 82%' },
          }
        )
      })
      gsap.fromTo(
        '.story-terminal',
        { opacity: 0, y: 60, rotate: -1.5 },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.story-terminal', start: 'top 85%' },
        }
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section" id="story" ref={root}>
      <div className="section-head">
        <span className="section-index mono">[01]</span>
        <h2 className="section-title glitch" data-text="ORIGIN">
          ORIGIN
        </h2>
      </div>

      <div className="story-list">
        {STORY.map((s, i) => (
          <article className="story-block" key={s.tag}>
            <div className="story-meta mono">
              <span className="story-tag">&gt;_{s.tag}</span>
              <span className="story-num">
                LOG {String(i + 1).padStart(2, '0')}/{String(STORY.length).padStart(2, '0')}
              </span>
            </div>
            <h3 className="story-title gtx">{s.title}</h3>
            <p className="story-body">{s.body}</p>
          </article>
        ))}
      </div>

      <div className="terminal story-terminal">
        <div className="terminal-bar">
          <span>KRYPTROZ.SYS — ORIGIN UNKNOWN</span>
          <span className="dots">
            <span />
            <span />
            <span />
          </span>
        </div>
        <div className="terminal-body">
          <div>
            <span className="prompt">&gt;</span> trace --origin
          </div>
          <div className="dim">SOURCE: UNKNOWN // CREATOR: UNKNOWN</div>
          <div>
            <span className="prompt">&gt;</span> count --alive
          </div>
          <div className="dim">666 CORRUPTED IDENTITIES REMAIN</div>
          <div>
            <span className="prompt">&gt;</span> containment --status
          </div>
          <div className="dim">FAILED. REALITY IS CORRUPTING.</div>
          <div>
            <span className="prompt">&gt;</span> <span className="boot-cursor" />
          </div>
        </div>
      </div>
    </section>
  )
}
