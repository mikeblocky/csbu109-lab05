import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div className="card stack" style={{ maxWidth: 360 }}>
      <div aria-label="count">Count: {count}</div>
      <div className="row">
        <button className="btn" onClick={() => setCount(c => c + 1)}>Increment</button>
        <button className="btn" onClick={() => setCount(c => c - 1)}>Decrement</button>
        <button className="btn" onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  )
}