import { Routes, Route, Link } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Exercise13 from './pages/Exercise13.jsx'
import Exercise14 from './pages/Exercise14.jsx'
import Exercise15 from './pages/Exercise15.jsx'
import Exercise16 from './pages/Exercise16.jsx'
import Exercise17 from './pages/Exercise17.jsx'
import Exercise18Info from './pages/Exercise18Info.jsx'
import Exercise19Info from './pages/Exercise19Info.jsx'
import BrowserTests from './pages/BrowserTests.jsx'

export default function App() {
  return (
    <div>
      <NavBar />
      <div className="container">
        <Routes>
          <Route index element={<Overview />} />
          <Route path="ex13" element={<Exercise13 />} />
          <Route path="ex14" element={<Exercise14 />} />
          <Route path="ex15" element={<Exercise15 />} />
          <Route path="ex16" element={<Exercise16 />} />
          <Route path="ex17" element={<Exercise17 />} />
          <Route path="ex18" element={<Exercise18Info />} />
          <Route path="ex19" element={<Exercise19Info />} />
          <Route path="tests" element={<BrowserTests />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

function Overview() {
  return (
    <div className="card stack">
      <h1>Exercises 13–19</h1>
      <p>
        This project implements Exercises 13–19 from the BCU Lab 5 brief: render props data loader,
        useReducer todo, memoization & callbacks, error boundaries, portals, and two testing exercises.
      </p>
      <p>
        Use the navigation tabs above to jump to each exercise. The whole UI is skinned with a gentle
        beige theme and uses Geist Mono for that crisp, studious vibe.
      </p>
      <p>
        Tests live under <code>src/__tests__</code>. Run them with <code>npm test</code> (Vitest).
      </p>
    </div>
  )
}

function NotFound() {
  return (
    <div className="card">
      <h2>404</h2>
      <p>That page wandered off. <Link to="/">Back to Overview</Link></p>
    </div>
  )
}