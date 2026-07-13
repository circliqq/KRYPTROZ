import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import Faq from './Faq'

it('opens one FAQ at a time and exposes expanded state', async () => {
  const user = userEvent.setup()
  render(<Faq />)
  const questions = screen.getAllByRole('button')
  expect(questions[0]).toHaveAttribute('aria-expanded', 'true')
  await user.click(questions[1])
  expect(questions[0]).toHaveAttribute('aria-expanded', 'false')
  expect(questions[1]).toHaveAttribute('aria-expanded', 'true')
  expect(screen.getByText(/Be active in the community terminal/)).toBeInTheDocument()
})
