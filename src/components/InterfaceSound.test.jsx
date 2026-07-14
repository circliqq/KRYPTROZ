import { fireEvent, render, waitFor } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import InterfaceSound from './InterfaceSound'

const start = vi.fn()
const param = () => ({
  value: 0,
  setValueAtTime: vi.fn(),
  exponentialRampToValueAtTime: vi.fn(),
})
const node = () => ({ connect: vi.fn(), start, stop: vi.fn(), frequency: param() })

class FakeAudioContext {
  constructor() {
    this.currentTime = 0
    this.destination = {}
    this.resume = vi.fn().mockResolvedValue(undefined)
    this.close = vi.fn().mockResolvedValue(undefined)
  }
  createGain() { return { ...node(), gain: param() } }
  createOscillator() { return node() }
  createBiquadFilter() { return { ...node(), Q: { value: 0 } } }
}

afterEach(() => {
  delete window.AudioContext
  start.mockClear()
})

it('plays a short interface pulse for interactive controls and respects mute', async () => {
  window.AudioContext = FakeAudioContext
  const { getByRole } = render(<><InterfaceSound /><button type="button">ENTER</button></>)

  fireEvent.pointerDown(getByRole('button'))
  await waitFor(() => expect(start).toHaveBeenCalledTimes(2))

  window.dispatchEvent(new CustomEvent('ctz:audio-state', { detail: { enabled: false } }))
  fireEvent.pointerDown(getByRole('button'))
  expect(start).toHaveBeenCalledTimes(2)
})
