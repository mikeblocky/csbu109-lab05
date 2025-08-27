import { render, screen, fireEvent } from '@testing-library/react'
import LoginForm from '../components/LoginForm.jsx'

describe('LoginForm', () => {
  test('renders with empty inputs and disabled submit', () => {
    render(<LoginForm />)
    expect(screen.getByLabelText('Email')).toHaveValue('')
    expect(screen.getByLabelText('Password')).toHaveValue('')
    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled()
  })

  test('shows validation errors on invalid input', () => {
    render(<LoginForm />)
    const email = screen.getByLabelText('Email')
    const password = screen.getByLabelText('Password')

    fireEvent.change(email, { target: { value: 'not-an-email' } })
    fireEvent.change(password, { target: { value: '123' } })

    expect(screen.getByText(/enter a valid email/i)).toBeInTheDocument()
    expect(screen.getByText(/password too short/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled()
  })

  test('submits successfully with valid input', () => {
    const onSubmit = vi.fn()
    render(<LoginForm onSubmit={onSubmit} />)
    const email = screen.getByLabelText('Email')
    const password = screen.getByLabelText('Password')

    fireEvent.change(email, { target: { value: 'user@example.com' } })
    fireEvent.change(password, { target: { value: 'secret!' } })
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    expect(onSubmit).toHaveBeenCalledWith({ email: 'user@example.com' })
    expect(screen.getByRole('status')).toHaveTextContent(/login successful/i)
  })
})