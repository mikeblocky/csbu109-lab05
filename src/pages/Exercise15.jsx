import { memo, useCallback, useMemo, useState } from 'react'

const ListItem = memo(function ListItem({ item, onDelete }) {
  console.log('Render <ListItem>', item.id)
  return (
    <div className="row" style={{ justifyContent: 'space-between' }}>
      <span>{item.name}</span>
      <button className="btn" onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  )
})

export default function Exercise15() {
  const [items, setItems] = useState(() => Array.from({ length: 6 }, (_, i) => ({ id: i+1, name: `Item ${i+1}` })))
  const [unrelated, setUnrelated] = useState(0) // bumping this should not re-render items

  const handleDeleteItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const total = useMemo(() => items.length, [items])

  return (
    <div className="stack">
      <h2>Exercise 15 — Optimized List (React.memo + useCallback)</h2>
      <div className="card stack">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div className="label">Total items: {total}</div>
          <button className="btn" onClick={() => setUnrelated(u => u + 1)}>Re-render parent (unrelated = {unrelated})</button>
        </div>
        <div className="stack">
          {items.map(it => (
            <ListItem key={it.id} item={it} onDelete={handleDeleteItem} />
          ))}
        </div>
      </div>
      <p className="label">Open the console: only changed items re-render.</p>
    </div>
  )
}