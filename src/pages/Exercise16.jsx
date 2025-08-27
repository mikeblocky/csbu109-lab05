import { ErrorBoundary, BuggyComponent } from '../components/ErrorBoundary.jsx'

export default function Exercise16() {
  return (
    <div className="stack">
      <h2>Exercise 16 — Error Boundary</h2>
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
      <p className="label">The boundary catches render-time errors in its children and shows a fallback UI.</p>
    </div>
  )
}