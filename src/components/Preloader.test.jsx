import { act, render } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import Preloader from './Preloader'

afterEach(() => vi.useRealTimers())

it('finishes the boot sequence once and cancels work on unmount', () => {
  vi.useFakeTimers()
  const onDone = vi.fn()
  const { unmount } = render(<Preloader onDone={onDone} />)
  act(() => vi.advanceTimersByTime(2600))
  expect(onDone).toHaveBeenCalledTimes(1)
  unmount()
  act(() => vi.runOnlyPendingTimers())
  expect(onDone).toHaveBeenCalledTimes(1)
})
