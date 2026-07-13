import { useEffect, useRef } from 'react'

// Targeting-reticle cursor. Locks onto interactive elements.
export default function Cursor() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    document.body.classList.add('has-cursor')
    const el = ref.current
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let tx = x
    let ty = y
    let raf

    const move = (e) => {
      tx = e.clientX
      ty = e.clientY
    }
    const over = (e) => {
      const hit = e.target.closest('a, button, input, .skull-card, .quest, .faq-q')
      el.classList.toggle('lock', !!hit)
    }
    const loop = () => {
      x += (tx - x) * 0.24
      y += (ty - y) * 0.24
      el.style.transform = `translate(${x}px, ${y}px)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.body.classList.remove('has-cursor')
    }
  }, [])

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <div className="c-box">
        <span className="c-corner c-tl" />
        <span className="c-corner c-tr" />
        <span className="c-corner c-bl" />
        <span className="c-corner c-br" />
        <span className="c-dot" />
      </div>
      <span className="c-label mono">LOCK</span>
    </div>
  )
}
