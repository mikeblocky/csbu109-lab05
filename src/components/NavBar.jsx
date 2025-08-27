import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', label: 'Overview' },
  { to: '/ex13', label: 'Ex13 DataLoader (Render Props)' },
  { to: '/ex14', label: 'Ex14 useReducer Todo' },
  { to: '/ex15', label: 'Ex15 Optimized List' },
  { to: '/ex16', label: 'Ex16 Error Boundary' },
  { to: '/ex17', label: 'Ex17 Modal & Portal' },
  { to: '/ex18', label: 'Ex18: Counter' },
  { to: '/ex19', label: 'Ex19: LoginForm' },
  { to: '/tests', label: 'Browser Tests' },
]

export default function NavBar() {
  return (
    <div className="navbar">
      <div className="nav-inner">
        <div className="brand">BCU Lab 5 · Exercises 13–19</div>
        <div className="tabs">
          {tabs.map(t => (
            <NavLink
              key={t.to}
              to={t.to}
              className={({ isActive }) =>
                'tab' + (isActive ? '' : '')
              }
            >
              {t.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}