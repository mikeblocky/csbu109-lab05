import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { flushSync } from 'react-dom'
import Counter from '../components/Counter.jsx'
import LoginForm from '../components/LoginForm.jsx'

/**
 * Tiny, dependency-free test harness (browser only).
 * Key points:
 * - wait for React commits (flushSync + rAF)
 * - waitFor polls until a condition is truthy
 * - typing uses the native value setter + input/change/blur (Edge-safe)
 * - success test waits until the submit button is enabled
 */

function createContainer() {
  const container = document.createElement('div')
  container.style.position = 'absolute'
  container.style.left = '-9999px'
  document.body.appendChild(container)
  const root = ReactDOM.createRoot(container)
  return {
    container,
    root,
    cleanup() {
      try { root.unmount() } catch {}
      if (container.parentNode) container.parentNode.removeChild(container)
    }
  }
}

// ---------- queries ----------
function byText(container, text) {
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, null)
  let node = walker.currentNode
  while (node) {
    const t = (node.textContent || '').trim()
    if (t === text || t.includes(text)) return node
    node = walker.nextNode()
  }
  return null
}
function byRoleButton(container, name) {
  const btns = container.querySelectorAll('button')
  for (const b of btns) {
    const t = (b.textContent || '').trim()
    if (t === name || t.includes(name)) return b
  }
  return null
}
function byAriaLabel(container, label) {
  return container.querySelector(`[aria-label="${label}"]`)
}

// ---------- events & timing ----------
function expect(cond, msg) { if (!cond) throw new Error(msg) }
const tick = () => new Promise(r => requestAnimationFrame(() => r()))

async function typeInto(el, value) {
  if (!el) throw new Error('Element not found to type into')
  el.focus()
  // Use the native setter so React’s onChange sees the update in all browsers
  const desc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')
  desc?.set?.call(el, value)
  el.dispatchEvent(new Event('input',  { bubbles: true, cancelable: true }))
  el.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))
  el.dispatchEvent(new Event('blur',   { bubbles: true }))
  await tick()
}
async function click(el) {
  if (!el) throw new Error('Element not found to click')
  el.click()
  await tick()
}
async function waitFor(fn, { timeout = 1500, interval = 16 } = {}) {
  const start = Date.now()
  let out
  while (Date.now() - start < timeout) {
    out = fn()
    if (out) return out
    await new Promise(r => setTimeout(r, interval))
  }
  return fn()
}

function section(title) { return { title, results: [] } }
function pass(results, name) { results.push({ name, ok: true }) }
function fail(results, name, err) { results.push({ name, ok: false, error: String(err?.message || err) }) }

async function renderAndWait(element) {
  const { container, root, cleanup } = createContainer()
  try {
    if (flushSync) flushSync(() => root.render(element))
    else root.render(element)
    await tick()
    return { container, root, cleanup }
  } catch (e) {
    cleanup()
    throw e
  }
}

// ---------- COUNTER TESTS ----------
async function runCounterTests() {
  const s = section('Counter')

  try {
    const { container, cleanup } = await renderAndWait(<Counter />)
    const count = await waitFor(() => byAriaLabel(container, 'count'))
    expect(count && count.textContent.includes('Count: 0'), 'initial count should be 0')
    pass(s.results, 'shows initial count as 0')
    cleanup()
  } catch (e) { fail(s.results, 'shows initial count as 0', e) }

  try {
    const { container, cleanup } = await renderAndWait(<Counter />)
    await click(await waitFor(() => byRoleButton(container, 'Increment')))
    const count = await waitFor(() => byAriaLabel(container, 'count'))
    expect(count && count.textContent.includes('Count: 1'), 'count should be 1 after increment')
    pass(s.results, 'increments on click')
    cleanup()
  } catch (e) { fail(s.results, 'increments on click', e) }

  try {
    const { container, cleanup } = await renderAndWait(<Counter />)
    await click(await waitFor(() => byRoleButton(container, 'Decrement')))
    const count = await waitFor(() => byAriaLabel(container, 'count'))
    expect(count && count.textContent.includes('Count: -1'), 'count should be -1 after decrement')
    pass(s.results, 'decrements on click')
    cleanup()
  } catch (e) { fail(s.results, 'decrements on click', e) }

  try {
    const { container, cleanup } = await renderAndWait(<Counter />)
    await click(await waitFor(() => byRoleButton(container, 'Increment')))
    await click(await waitFor(() => byRoleButton(container, 'Reset')))
    const count = await waitFor(() => byAriaLabel(container, 'count'))
    expect(count && count.textContent.includes('Count: 0'), 'count should be 0 after reset')
    pass(s.results, 'resets to 0')
    cleanup()
  } catch (e) { fail(s.results, 'resets to 0', e) }

  return s
}

// ---------- LOGIN FORM TESTS ----------
async function runLoginFormTests() {
  const s = section('LoginForm')

  // initial disabled
  try {
    const { container, cleanup } = await renderAndWait(<LoginForm />)
    const email = await waitFor(() => byAriaLabel(container, 'Email'))
    const password = await waitFor(() => byAriaLabel(container, 'Password'))
    const button = await waitFor(() => container.querySelector('button[type="submit"]'))
    expect(email && email.value === '' && password && password.value === '', 'inputs should start empty')
    expect(button && button.disabled === true, 'submit should be disabled initially')
    pass(s.results, 'renders with empty inputs and disabled submit')
    cleanup()
  } catch (e) { fail(s.results, 'renders with empty inputs and disabled submit', e) }

  // validation messages
  try {
    const { container, cleanup } = await renderAndWait(<LoginForm />)
    const email = await waitFor(() => byAriaLabel(container, 'Email'))
    const password = await waitFor(() => byAriaLabel(container, 'Password'))
    await typeInto(email, 'not-an-email')
    await typeInto(password, '123')
    const emailError = await waitFor(() => byText(container, 'Enter a valid email.'))
    const passError  = await waitFor(() => byText(container, 'Password too short.'))
    const button     = await waitFor(() => container.querySelector('button[type="submit"]'))
    expect(emailError, 'should show email validation message')
    expect(passError,  'should show password validation message')
    expect(button && button.disabled === true, 'submit should remain disabled')
    pass(s.results, 'shows validation errors on invalid input')
    cleanup()
  } catch (e) { fail(s.results, 'shows validation errors on invalid input', e) }

  // success submit
  try {
    let submitted = null
    const { container, cleanup } = await renderAndWait(<LoginForm onSubmit={(p) => { submitted = p }} />)
    const email = await waitFor(() => byAriaLabel(container, 'Email'))
    const password = await waitFor(() => byAriaLabel(container, 'Password'))
    await typeInto(email, 'user@example.com')
    await typeInto(password, 'secret!')
    const button = await waitFor(() => {
      const btn = container.querySelector('button[type="submit"]')
      return btn && !btn.disabled ? btn : null
    })
    await click(button)
    const status = await waitFor(() => container.querySelector('[role="status"]'))
    expect(status && /login successful/i.test(status.textContent || ''), 'should show success status')
    expect(submitted && submitted.email === 'user@example.com', 'should call onSubmit with email')
    pass(s.results, 'submits successfully with valid input')
    cleanup()
  } catch (e) { fail(s.results, 'submits successfully with valid input', e) }

  return s
}

function TestSection({ section }) {
  const passed = section.results.filter(r => r.ok).length
  const total  = section.results.length
  return (
    <div className="card stack">
      <h3>{section.title} — {passed}/{total} passed</h3>
      <ul className="stack" style={{ listStyle: 'none', padding: 0 }}>
        {section.results.map((r, i) => (
          <li key={i} className="row" style={{ justifyContent: 'space-between' }}>
            <span>{r.name}</span>
            {r.ok
              ? <span className="label" style={{ color: 'green'  }}>✓ pass</span>
              : <span className="label" style={{ color: 'crimson'}}>✗ fail — {r.error}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function BrowserTests() {
  const [sections, setSections] = useState([])
  const [summary,  setSummary]  = useState(null)
  const [running,  setRunning]  = useState(false)

  async function runAll() {
    setRunning(true)
    setSections([])
    setSummary(null)
    const results = [await runCounterTests(), await runLoginFormTests()]
    setSections(results)
    const totals = results.reduce((acc, s) => {
      acc.total  += s.results.length
      acc.passed += s.results.filter(r => r.ok).length
      return acc
    }, { passed: 0, total: 0 })
    setSummary(totals)
    setRunning(false)
  }

  return (
    <div className="stack">
      <h2>In-Browser Test Runner</h2>
      <div className="card row" style={{ justifyContent: 'space-between' }}>
        <div className="label">Runs Counter & LoginForm checks inside the browser without Jest/Vitest.</div>
        <button className="btn" onClick={runAll} disabled={running}>
          {running ? 'Running…' : 'Run all tests'}
        </button>
      </div>

      {summary && (
        <div className="card">
          <strong>Summary:</strong> {summary.passed}/{summary.total} passed
        </div>
      )}

      {sections.map((s, i) => <TestSection key={i} section={s} />)}
    </div>
  )
}
