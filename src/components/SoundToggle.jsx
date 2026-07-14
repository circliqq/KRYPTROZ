import { useEffect, useRef, useState } from 'react'

const createSignal = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  if (!AudioContext) return null

  const context = new AudioContext()
  const master = context.createGain()
  const filter = context.createBiquadFilter()
  const droneA = context.createOscillator()
  const droneB = context.createOscillator()
  const droneGain = context.createGain()
  const carrier = context.createOscillator()
  const carrierFilter = context.createBiquadFilter()
  const carrierGain = context.createGain()
  const lfo = context.createOscillator()
  const lfoDepth = context.createGain()

  master.gain.setValueAtTime(0.0001, context.currentTime)
  master.gain.exponentialRampToValueAtTime(0.075, context.currentTime + 1.2)
  master.connect(context.destination)

  filter.type = 'lowpass'
  filter.frequency.value = 680
  filter.Q.value = 4.2
  filter.connect(master)

  droneA.type = 'sine'
  droneA.frequency.value = 43.65
  droneB.type = 'sawtooth'
  droneB.frequency.value = 65.4
  droneGain.gain.value = 0.22
  droneA.connect(droneGain)
  droneB.connect(droneGain)
  droneGain.connect(filter)

  lfo.type = 'sine'
  lfo.frequency.value = 0.095
  lfoDepth.gain.value = 230
  lfo.connect(lfoDepth)
  lfoDepth.connect(filter.frequency)

  const noiseBuffer = context.createBuffer(1, context.sampleRate * 3, context.sampleRate)
  const noise = noiseBuffer.getChannelData(0)
  for (let i = 0; i < noise.length; i += 1) noise[i] = Math.random() * 2 - 1

  const noiseSource = context.createBufferSource()
  const noiseFilter = context.createBiquadFilter()
  const noiseGain = context.createGain()
  noiseSource.buffer = noiseBuffer
  noiseSource.loop = true
  noiseFilter.type = 'bandpass'
  noiseFilter.frequency.value = 1750
  noiseFilter.Q.value = 1.15
  noiseGain.gain.value = 0.048
  noiseSource.connect(noiseFilter)
  noiseFilter.connect(noiseGain)
  noiseGain.connect(master)

  // A narrow radio-carrier tone makes the ambience feel like a hostile signal,
  // while remaining quiet enough to sit behind the page.
  carrier.type = 'square'
  carrier.frequency.value = 666
  carrierFilter.type = 'bandpass'
  carrierFilter.frequency.value = 920
  carrierFilter.Q.value = 8
  carrierGain.gain.value = 0.018
  carrier.connect(carrierFilter)
  carrierFilter.connect(carrierGain)
  carrierGain.connect(master)

  ;[droneA, droneB, carrier, lfo, noiseSource].forEach((node) => node.start())

  let glitchTimeout
  const glitchInterval = window.setInterval(() => {
    if (context.state === 'closed' || Math.random() > 0.72) return
    const duration = 55 + Math.random() * 130
    filter.frequency.value = 1050 + Math.random() * 900
    noiseFilter.frequency.value = 2400 + Math.random() * 1800
    noiseGain.gain.value = 0.105
    carrier.frequency.value = Math.random() > 0.5 ? 999 : 333
    carrierGain.gain.value = 0.032

    window.clearTimeout(glitchTimeout)
    glitchTimeout = window.setTimeout(() => {
      filter.frequency.value = 680
      noiseFilter.frequency.value = 1750
      noiseGain.gain.value = 0.048
      carrier.frequency.value = 666
      carrierGain.gain.value = 0.018
    }, duration)
  }, 1650)

  let stopped = false

  return {
    context,
    stop: () => {
      if (stopped) return
      stopped = true
      window.clearInterval(glitchInterval)
      window.clearTimeout(glitchTimeout)
      const now = context.currentTime
      master.gain.cancelScheduledValues(now)
      master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now)
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.18)
      window.setTimeout(() => context.close().catch(() => {}), 220)
    },
  }
}

export default function SoundToggle() {
  const signal = useRef(null)
  const wantsSound = useRef(true)
  const [enabled, setEnabled] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    let cancelled = false

    const begin = async () => {
      if (!wantsSound.current) return
      let nextSignal = signal.current
      if (!nextSignal) {
        nextSignal = createSignal()
        if (!nextSignal) {
          if (!cancelled) setAvailable(false)
          return
        }
        signal.current = nextSignal
      }

      await nextSignal.context.resume().catch(() => {})
      if (cancelled || signal.current !== nextSignal) return
      const isRunning = nextSignal.context.state === 'running' || nextSignal.context.state == null
      setEnabled(isRunning)
      setBlocked(!isRunning)
    }

    // Best-effort autoplay. Browsers that block audible autoplay keep the
    // signal armed and release it on the visitor's first interaction.
    begin()

    const unlock = () => begin()
    window.addEventListener('pointerdown', unlock, { passive: true })
    window.addEventListener('keydown', unlock)
    window.addEventListener('touchstart', unlock, { passive: true })

    const onVisibility = () => {
      const context = signal.current?.context
      if (!context) return
      if (document.hidden) context.suspend().catch(() => {})
      else if (wantsSound.current) context.resume().catch(() => {})
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelled = true
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
      window.removeEventListener('touchstart', unlock)
      document.removeEventListener('visibilitychange', onVisibility)
      signal.current?.stop()
      signal.current = null
    }
  }, [])

  const toggle = async () => {
    if (enabled) {
      wantsSound.current = false
      signal.current?.stop()
      signal.current = null
      setEnabled(false)
      setBlocked(false)
      return
    }

    wantsSound.current = true
    const nextSignal = signal.current || createSignal()
    if (!nextSignal) {
      setAvailable(false)
      return
    }
    signal.current = nextSignal
    await nextSignal.context.resume().catch(() => {})
    const isRunning = nextSignal.context.state === 'running' || nextSignal.context.state == null
    setEnabled(isRunning)
    setBlocked(!isRunning)
  }

  const state = !available ? 'N/A' : enabled ? 'ON' : blocked ? 'START' : 'OFF'

  return (
    <button
      className={`sound-toggle mono ${enabled ? 'is-on' : ''} ${blocked ? 'is-blocked' : ''}`}
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={`${enabled ? 'Turn off' : 'Turn on'} KRYPTROZ corruption soundtrack`}
      disabled={!available}
    >
      <span className="sound-orb" aria-hidden="true">
        <span className="sound-bars"><i /><i /><i /><i /></span>
      </span>
      <span className="sound-copy">
        <small>AUDIO LINK // CH-666</small>
        <span>CORRUPTION SIGNAL</span>
      </span>
      <strong className="sound-state"><i aria-hidden="true" />{state}</strong>
    </button>
  )
}
