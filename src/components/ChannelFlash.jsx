import { useEffect, useState } from 'react'

// CRT channel-switch static burst. Fire with:
// window.dispatchEvent(new Event('ctz:flash'))
export default function ChannelFlash() {
  const [on, setOn] = useState(false)

  useEffect(() => {
    let t
    const h = () => {
      setOn(false)
      requestAnimationFrame(() => setOn(true))
      clearTimeout(t)
      t = setTimeout(() => setOn(false), 420)
    }
    window.addEventListener('ctz:flash', h)
    return () => {
      window.removeEventListener('ctz:flash', h)
      clearTimeout(t)
    }
  }, [])

  return on ? <div className="channel-flash" aria-hidden="true" /> : null
}
