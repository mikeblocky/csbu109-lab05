import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    console.error('Caught by ErrorBoundary:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="card" role="alert">
          <h3>Something went wrong.</h3>
          <p className="label">{String(this.state.error)}</p>
          <button className="btn" onClick={() => this.setState({ hasError: false, error: null })}>
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export function BuggyComponent() {
  const [count, setCount] = React.useState(0)
  if (count === 5) {
    throw new Error('I crash at 5 — kaboom!')
  }
  return (
    <div className="card stack" style={{ alignItems: 'flex-start' }}>
      <div className="label">Click until it explodes at 5</div>
      <button className="btn" onClick={() => setCount(c => c + 1)}>Count: {count}</button>
    </div>
  )
}