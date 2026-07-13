import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const { rpc, insert, from } = vi.hoisted(() => ({
  rpc: vi.fn(),
  insert: vi.fn(),
  from: vi.fn(),
}))

vi.mock('../lib/supabase', () => ({ supabase: { rpc, from } }))

import Whitelist from './Whitelist'

const wallet = `0x${'a'.repeat(40)}`
const completeQuests = async (user) => {
  for (const button of screen.getAllByRole('button', { pressed: false })) {
    await user.click(button)
  }
}

describe('Whitelist', () => {
  beforeEach(() => {
    localStorage.clear()
    rpc.mockResolvedValue({ data: 4 })
    insert.mockResolvedValue({ error: null })
    from.mockReturnValue({ insert })
  })

  it('requires both a handle and wallet', async () => {
    render(<Whitelist />)
    fireEvent.submit(screen.getByRole('button', { name: /submit application/i }).closest('form'))
    expect(await screen.findByText(/X HANDLE \+ WALLET REQUIRED/)).toBeInTheDocument()
    expect(insert).not.toHaveBeenCalled()
  })

  it('persists quest state and reflects progress', async () => {
    const user = userEvent.setup()
    render(<Whitelist />)
    await user.click(screen.getAllByRole('button', { pressed: false })[0])
    expect(screen.getByText('17% READY')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('ctz-quests'))).toEqual(['follow'])
  })

  it('submits a normalized row and increments the live count', async () => {
    const user = userEvent.setup()
    render(<Whitelist />)
    expect(await screen.findByText(/4 \/ 666 LOGGED/)).toBeInTheDocument()
    await completeQuests(user)
    await user.type(screen.getByLabelText(/X \/ TWITTER HANDLE/), '  @Alice  ')
    await user.type(screen.getByLabelText(/WALLET \*/), `0x${'A'.repeat(40)}`)
    await user.click(screen.getByRole('button', { name: /submit application/i }))

    await waitFor(() => expect(insert).toHaveBeenCalledWith({
      handle: '@Alice',
      post_link: null,
      comment_link: null,
      wallet,
      quests: 'follow, like, rt, comment, post, discord',
    }))
    expect(await screen.findByText(/APPLICATION RECEIVED/)).toBeInTheDocument()
    expect(screen.getByText(/5 \/ 666 LOGGED/)).toBeInTheDocument()
  })

  it('shows a specific duplicate-wallet error', async () => {
    insert.mockResolvedValue({ error: { code: '23505' } })
    const user = userEvent.setup()
    render(<Whitelist />)
    await completeQuests(user)
    await user.type(screen.getByLabelText(/X \/ TWITTER HANDLE/), '@alice')
    await user.type(screen.getByLabelText(/WALLET \*/), wallet)
    await user.click(screen.getByRole('button', { name: /submit application/i }))
    expect(await screen.findByText(/WALLET ALREADY ON THE LIST/)).toBeInTheDocument()
    expect(screen.queryByText(/APPLICATION RECEIVED/)).not.toBeInTheDocument()
  })

  it('recovers after a generic service failure', async () => {
    insert.mockResolvedValue({ error: { code: '500' } })
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const user = userEvent.setup()
    render(<Whitelist />)
    await completeQuests(user)
    await user.type(screen.getByLabelText(/X \/ TWITTER HANDLE/), '@alice')
    await user.type(screen.getByLabelText(/WALLET \*/), wallet)
    await user.click(screen.getByRole('button', { name: /submit application/i }))
    expect(await screen.findByText(/TRANSMISSION FAILED/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit application/i })).toBeEnabled()
  })
})
