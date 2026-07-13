import { useEffect, useState } from 'react'

const IDS = ['hero', 'story', 'collection', 'rarity', 'roadmap', 'faq', 'whitelist']

export default function TrackBar() {
  const [p, setP] = useState(0)
  const [ch, setCh] = useState(1)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0)
      let idx = 0
      IDS.forEach((id, i) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) idx = i
      })
      setCh(idx + 1)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="trackbar" aria-hidden="true">
      <span className="trackbar-ch mono">CH-0{ch}</span>
      <div className="trackbar-line">
        <div className="trackbar-thumb" style={{ top: `${p * 100}%` }} />
      </div>
    </div>
  )
}
