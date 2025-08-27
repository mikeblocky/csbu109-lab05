import { useReducer, useState } from 'react'

function todosReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO': {
      const text = action.payload?.text?.trim()
      if (!text) return state
      const newTodo = { id: crypto.randomUUID(), text, done: false }
      return [newTodo, ...state]
    }
    case 'TOGGLE_TODO': {
      const id = action.payload?.id
      return state.map(t => t.id === id ? { ...t, done: !t.done } : t)
    }
    case 'REMOVE_TODO': {
      const id = action.payload?.id
      return state.filter(t => t.id !== id)
    }
    default:
      return state
  }
}

export default function Exercise14() {
  const [todos, dispatch] = useReducer(todosReducer, [
    { id: 'seed-1', text: 'Read the brief', done: true },
    { id: 'seed-2', text: 'Implement useReducer todo', done: false },
  ])
  const [text, setText] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    dispatch({ type: 'ADD_TODO', payload: { text } })
    setText('')
  }

  return (
    <div className="stack">
      <h2>Exercise 14 — useReducer Todo</h2>

      <form onSubmit={onSubmit} className="card stack">
        <label className="stack">
          <span className="label">Add todo</span>
          <div className="row">
            <input className="input" value={text} onChange={e => setText(e.target.value)} placeholder="Type then press Enter" />
            <button className="btn" type="submit">Add</button>
          </div>
        </label>
      </form>

      <ul className="stack card" style={{ listStyle: 'none', padding: 16 }}>
        {todos.map(t => (
          <li key={t.id} className="row" style={{ justifyContent: 'space-between' }}>
            <label className="row" style={{ flex: 1 }}>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: { id: t.id } })}
              />
              <span style={{ textDecoration: t.done ? 'line-through' : 'none', opacity: t.done ? .6 : 1 }}>{t.text}</span>
            </label>
            <button className="btn" onClick={() => dispatch({ type: 'REMOVE_TODO', payload: { id: t.id } })}>Remove</button>
          </li>
        ))}
      </ul>
      <p className="label">Actions: ADD_TODO · TOGGLE_TODO · REMOVE_TODO</p>
    </div>
  )
}