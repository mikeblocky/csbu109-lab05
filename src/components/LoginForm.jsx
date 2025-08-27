import { useMemo, useState } from 'react'

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const emailValid = useMemo(() => validateEmail(email), [email])
  const passValid = password.length >= 6
  const formValid = emailValid && passValid

  function handleSubmit(e) {
    e.preventDefault()
    if (!formValid) return
    setSubmitted(true)
    onSubmit?.({ email })
  }

  return (
    <form onSubmit={handleSubmit} className="card stack" aria-label="login form">
      <label className="stack">
        <span className="label">Email</span>
        <input
          className="input"
          type="email"
          aria-label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        {!emailValid && email.length > 0 && <span role="alert" className="label">Enter a valid email.</span>}
      </label>

      <label className="stack">
        <span className="label">Password (min 6 chars)</span>
        <input
          className="input"
          type="password"
          aria-label="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {!passValid && password.length > 0 && <span role="alert" className="label">Password too short.</span>}
      </label>

      <button className="btn" type="submit" disabled={!formValid}>Sign in</button>

      {submitted && <p role="status">Login successful. Welcome back!</p>}
    </form>
  )
}