import LoginForm from '../components/LoginForm.jsx'

export default function Exercise19Info() {
  function handleSubmit(payload) {
    // no-op besides letting the component show its own success message
    console.log('LoginForm submitted:', payload)
  }

  return (
    <div className="stack">
      <h2>Exercise 19 — LoginForm (interactive component)</h2>
      <div className="card">
        <p className="label">Try the form and validation below. Automated checks are on the <strong>Browser Tests</strong> page.</p>
      </div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  )
}