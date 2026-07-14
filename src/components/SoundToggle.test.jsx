import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it, vi } from 'vitest'
import SoundToggle from './SoundToggle'

const audioNode = () => ({ connect: vi.fn(), start: vi.fn() })

class FakeAudioContext {
  constructor() {
    this.currentTime = 0
    this.sampleRate = 100
    this.destination = {}
    this.state = 'running'
    this.resume = vi.fn().mockResolvedValue(undefined)
    this.suspend = vi.fn().mockResolvedValue(undefined)
    this.close = vi.fn().mockResolvedValue(undefined)
  }

  createGain() {
    return {
      ...audioNode(),
      gain: {
        value: 0.03,
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
        cancelScheduledValues: vi.fn(),
      },
    }
  }

  createBiquadFilter() {
    return { ...audioNode(), frequency: { value: 0 }, Q: { value: 0 } }
  }

  createOscillator() {
    return { ...audioNode(), frequency: { value: 0 } }
  }

  createBuffer() {
    return { getChannelData: () => new Float32Array(300) }
  }

  createBufferSource() {
    return { ...audioNode(), loop: false, buffer: null }
  }
}

afterEach(() => {
  delete window.AudioContext
})

it('autoplays when permitted and lets the visitor turn ambient audio off and on', async () => {
  window.AudioContext = FakeAudioContext
  const user = userEvent.setup()
  render(<SoundToggle />)

  const button = await screen.findByRole('button', { name: /turn off kryptroz corruption soundtrack/i })
  expect(button).toHaveAttribute('aria-pressed', 'true')

  await user.click(button)
  expect(screen.getByRole('button', { name: /turn on kryptroz corruption soundtrack/i }))
    .toHaveAttribute('aria-pressed', 'false')

  await user.click(screen.getByRole('button', { name: /turn on kryptroz corruption soundtrack/i }))
  expect(screen.getByRole('button', { name: /turn off kryptroz corruption soundtrack/i }))
    .toHaveAttribute('aria-pressed', 'true')
})
