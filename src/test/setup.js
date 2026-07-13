import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

afterEach(() => cleanup())

vi.mock('gsap', () => {
  const chain = { to: vi.fn(() => chain), set: vi.fn(() => chain) }
  const gsap = {
    registerPlugin: vi.fn(),
    context: vi.fn((callback) => {
      callback()
      return { revert: vi.fn() }
    }),
    fromTo: vi.fn(),
    timeline: vi.fn(() => chain),
    utils: { random: vi.fn(() => 1) },
  }
  return { default: gsap }
})

vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }))
