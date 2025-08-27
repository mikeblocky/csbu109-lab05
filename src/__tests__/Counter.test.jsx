import { render, screen, fireEvent } from '@testing-library/react'
import Counter from '../components/Counter.jsx'

describe('Counter component', () => {
  test('shows initial count as 0', () => {
    render(<Counter />)
    expect(screen.getByLabelText('count')).toHaveTextContent('Count: 0')
  })

  test('increments on click', () => {
    render(<Counter />)
    fireEvent.click(screen.getByText('Increment'))
    expect(screen.getByLabelText('count')).toHaveTextContent('Count: 1')
  })

  test('decrements on click', () => {
    render(<Counter />)
    fireEvent.click(screen.getByText('Decrement'))
    expect(screen.getByLabelText('count')).toHaveTextContent('Count: -1')
  })

  test('resets to 0', () => {
    render(<Counter />)
    fireEvent.click(screen.getByText('Increment'))
    fireEvent.click(screen.getByText('Reset'))
    expect(screen.getByLabelText('count')).toHaveTextContent('Count: 0')
  })
})