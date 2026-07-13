import { useEffect } from 'react'

const GLYPHS = '!<>-_\\/[]{}=+*^?#$%&KRYPTZ0136699'

function scramble(el) {
  const final = el.textContent
  const hasLayer = el.hasAttribute('data-text')
  let frame = 0
  const total = 16
  const iv = setInterval(() => {
    frame++
    const reveal = Math.floor((frame / total) * final.length)
    let out = ''
    for (let i = 0; i < final.length; i++) {
      if (final[i] === ' ') {
        out += ' '
        continue
      }
      out += i < reveal ? final[i] : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
    }
    el.textContent = out
    if (hasLayer) el.setAttribute('data-text', out)
    if (frame >= total) {
      clearInterval(iv)
      el.textContent = final
      if (hasLayer) el.setAttribute('data-text', final)
    }
  }, 42)
}

// Decrypts headings character-by-character the first time they scroll into view.
export default function Decrypt() {
  useEffect(() => {
    const els = document.querySelectorAll(
      '.section-title, .story-tag, .skull-name, .phase-num, .wl-panel-head span:first-child'
    )
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting || en.target.dataset.dcr) return
          en.target.dataset.dcr = '1'
          scramble(en.target)
          io.unobserve(en.target)
        })
      },
      { threshold: 0.4 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return null
}
