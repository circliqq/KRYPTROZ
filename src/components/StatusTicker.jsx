import { useEffect, useState } from 'react'

const MSGS = [
  'UPLINK: STABLE',
  'SIGNAL: 87.3% — DRIFTING',
  'CORRUPTED IDENTITIES: TBA',
  'NETWORK: CH-666 BROADCASTING',
  'TRACKING: AUTO',
  'DO NOT ADJUST YOUR SET',
  'ENCRYPTION: UNSTABLE',
  'LAST PING: 0.666s',
  'CHAIN: ETHEREUM — OK',
]

export default function StatusTicker() {
  const [i, setI] = useState(0)
  const [flick, setFlick] = useState(false)

  useEffect(() => {
    const iv = setInterval(() => {
      setFlick(true)
      setTimeout(() => {
        setI((n) => (n + 1) % MSGS.length)
        setFlick(false)
      }, 180)
    }, 3000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className={`ticker mono ${flick ? 'flick' : ''}`} aria-hidden="true">
      &gt; {MSGS[i]}
      <span className="boot-cursor" />
    </div>
  )
}
