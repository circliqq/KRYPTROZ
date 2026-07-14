import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import StaticScene from '../three/StaticScene'

export default function Hero({ booted }) {
  const root = useRef(null)

  useEffect(() => {
    if (!booted) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-kicker',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
      )
      gsap.fromTo(
        '.hero-title',
        { opacity: 0, scaleY: 0.001, filter: 'brightness(4)' },
        {
          opacity: 1,
          scaleY: 1,
          filter: 'brightness(1)',
          duration: 0.7,
          ease: 'expo.out',
          delay: 0.25,
        }
      )
      gsap.fromTo(
        ['.hero-sub', '.hero-hud', '.hero-scroll'],
        { opacity: 0 },
        { opacity: 1, duration: 1, stagger: 0.08, delay: 0.7 }
      )
    }, root)

    // periodic hard glitch burst on the title
    const burst = () => {
      const tl = gsap.timeline()
      tl.to('.hero-title', {
        skewX: () => gsap.utils.random(-9, 9),
        x: () => gsap.utils.random(-16, 16),
        scaleY: () => gsap.utils.random(0.9, 1.12),
        textShadow: '4px 0 #ff4fd8, -4px 0 #52e8ff, 0 0 30px rgba(217,79,255,0.5)',
        duration: 0.06,
        ease: 'steps(1)',
        repeat: 4,
        yoyo: true,
      })
      tl.set('.hero-title', { clearProps: 'textShadow,skewX,x,scaleY,transform' })
    }
    const iv = setInterval(() => {
      if (Math.random() < 0.75) burst()
    }, 2400)

    return () => {
      clearInterval(iv)
      ctx.revert()
    }
  }, [booted])

  return (
    <section className="hero" id="hero" ref={root}>
      <div className="hero-canvas">
        <StaticScene intensity={0.8} />
      </div>

      <div className="hero-hud tl mono">
        CH-03 // AV-IN
        <br />
        525 LINES / 60Hz
      </div>
      <div className="hero-hud tr mono">
        SIGNAL: UNSTABLE
        <br />
        TRACKING: AUTO
      </div>
      <div className="hero-hud bl mono">CHAIN: ETHEREUM // CORRUPTION EVENT: TBA</div>
      <div className="hero-hud br mono">[ REALITY NOT FOUND ]</div>

      <div className="hero-content">
        <p className="hero-kicker">/// REALITY NOT FOUND ///</p>
        <h1 className="hero-title glitch" data-text="KRYPTROZ">
          KRYPTROZ
        </h1>
        <p className="hero-sub">Reality is breaking. You&apos;re becoming part of it.</p>
      </div>

      <div className="hero-scroll mono">SCROLL ▼</div>
    </section>
  )
}
