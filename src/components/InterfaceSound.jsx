import { useEffect, useRef } from 'react'

const INTERACTIVE = 'button, a, [role="button"]'

export default function InterfaceSound() {
  const context = useRef(null)
  const enabled = useRef(true)

  useEffect(() => {
    const onAudioState = (event) => {
      enabled.current = event.detail?.enabled !== false
    }

    const onInteract = async (event) => {
      const target = event.target.closest?.(INTERACTIVE)
      if (!target || target.matches(':disabled') || !enabled.current) return

      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) return
      const audio = context.current || new AudioContext()
      context.current = audio
      await audio.resume().catch(() => {})

      const now = audio.currentTime
      const output = audio.createGain()
      const low = audio.createOscillator()
      const crack = audio.createOscillator()
      const filter = audio.createBiquadFilter()

      output.gain.setValueAtTime(0.0001, now)
      output.gain.exponentialRampToValueAtTime(0.045, now + 0.006)
      output.gain.exponentialRampToValueAtTime(0.0001, now + 0.095)
      output.connect(audio.destination)

      filter.type = 'bandpass'
      filter.frequency.value = 880 + Math.random() * 420
      filter.Q.value = 2.4
      filter.connect(output)

      low.type = 'sawtooth'
      low.frequency.setValueAtTime(105 + Math.random() * 35, now)
      low.frequency.exponentialRampToValueAtTime(58, now + 0.08)
      crack.type = 'square'
      crack.frequency.setValueAtTime(980 + Math.random() * 520, now)
      crack.frequency.exponentialRampToValueAtTime(210, now + 0.055)

      low.connect(output)
      crack.connect(filter)
      low.start(now)
      crack.start(now)
      low.stop(now + 0.1)
      crack.stop(now + 0.1)
    }

    window.addEventListener('ctz:audio-state', onAudioState)
    document.addEventListener('pointerdown', onInteract)
    return () => {
      window.removeEventListener('ctz:audio-state', onAudioState)
      document.removeEventListener('pointerdown', onInteract)
      context.current?.close().catch(() => {})
      context.current = null
    }
  }, [])

  return null
}
