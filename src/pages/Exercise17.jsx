import { useState } from 'react'
import Modal from '../components/Modal.jsx'

export default function Exercise17() {
  const [open, setOpen] = useState(false)
  return (
    <div className="stack">
      <h2>Exercise 17 — Modal via Portal</h2>
      <button className="btn" onClick={() => setOpen(true)}>Open modal</button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div className="stack">
          <h3>Portal Modal</h3>
          <p>This content is rendered outside the normal DOM hierarchy via <code>createPortal</code>.</p>
          <button className="btn" onClick={() => setOpen(false)}>Close</button>
        </div>
      </Modal>
    </div>
  )
}