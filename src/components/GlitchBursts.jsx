import { useEffect } from 'react'

// Randomly glitch-bursts one visible .gtx element every ~1.4s,
// so the whole page keeps flickering like a bad broadcast.
export default function GlitchBursts() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const iv = setInterval(() => {
      const visible = Array.from(document.querySelectorAll('.gtx')).filter((el) => {
        const r = el.getBoundingClientRect()
        return r.top < window.innerHeight && r.bottom > 0
      })
      if (!visible.length) return
      const el = visible[Math.floor(Math.random() * visible.length)]
      el.classList.add('bursting')
      setTimeout(() => el.classList.remove('bursting'), 340)
    }, 1400)
    return () => clearInterval(iv)
  }, [])
  return null
}
