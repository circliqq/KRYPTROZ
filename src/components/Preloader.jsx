import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LINES = [
  { text: '> KRYPTROZ.SYS v2.6 — INIT', cls: '' },
  { text: '> CHECKING SIGNAL PATH ......... OK', cls: 'dim' },
  { text: '> LOADING PHOSPHOR DRIVERS ..... OK', cls: 'dim' },
  { text: '> CALIBRATING CRT MATRIX ....... OK', cls: 'dim' },
  { text: '> WARNING: REALITY NOT FOUND', cls: 'warn' },
  { text: '> BROADCASTING ANYWAY_', cls: '' },
]

export default function Preloader({ onDone }) {
  const [visible, setVisible] = useState(0)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onDone()
      return undefined
    }

    const lineTimer = setInterval(() => {
      setVisible((v) => {
        if (v >= LINES.length) {
          clearInterval(lineTimer)
          return v
        }
        return v + 1
      })
    }, 320)

    const pctTimer = setInterval(() => {
      setPct((p) => {
        if (p >= 100) {
          clearInterval(pctTimer)
          return 100
        }
        return Math.min(100, p + Math.floor(Math.random() * 9) + 3)
      })
    }, 90)

    const done = setTimeout(() => onDone(), 2600)

    return () => {
      clearInterval(lineTimer)
      clearInterval(pctTimer)
      clearTimeout(done)
    }
  }, [onDone])

  return (
    <motion.div
      className="preloader"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Loading KRYPTROZ: ${Math.min(pct, 100)} percent`}
      exit={{ opacity: 0, filter: 'brightness(3)' }}
      transition={{ duration: 0.35, ease: 'easeIn' }}
    >
      <div className="preloader-pct" aria-hidden="true">{String(Math.min(pct, 100)).padStart(3, '0')}</div>
      <div className="boot-log" aria-hidden="true">
        {LINES.slice(0, visible).map((l) => (
          <div key={l.text} className={l.cls}>
            {l.text}
          </div>
        ))}
        <span className="boot-cursor" />
      </div>
    </motion.div>
  )
}
