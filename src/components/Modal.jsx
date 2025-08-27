import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

export default function Modal({ isOpen, onClose, children }) {
  const elRef = useRef(document.createElement('div'))
  useEffect(() => {
    const root = document.getElementById('modal-root')
    const el = elRef.current
    if (isOpen) {
      root.appendChild(el)
    }
    return () => {
      if (root.contains(el)) root.removeChild(el)
    }
  }, [isOpen])

  if (!isOpen) return null

  const overlay = (
    <div style={overlayStyles} onClick={onClose}>
      <div style={contentStyles} onClick={(e) => e.stopPropagation()}>
        <button className="btn" onClick={onClose} style={{ position: 'absolute', top: 12, right: 12 }}>×</button>
        {children}
      </div>
    </div>
  )
  return ReactDOM.createPortal(overlay, elRef.current)
}

const overlayStyles = {
  position: 'fixed',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0,0,0,.45)',
  zIndex: 1000
}

const contentStyles = {
  position: 'relative',
  background: 'white',
  color: 'black',
  padding: 24,
  borderRadius: 16,
  width: 'min(92vw, 520px)',
  boxShadow: '0 18px 48px rgba(0,0,0,.25)'
}