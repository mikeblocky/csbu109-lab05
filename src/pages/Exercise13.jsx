import DataLoader from '../components/DataLoader.jsx'

export default function Exercise13() {
  const url = 'https://jsonplaceholder.typicode.com/posts/1'

  return (
    <div className="stack">
      <h2>Exercise 13 — Render Props for Data Fetching</h2>
      <div className="card">
        <DataLoader
          url={url}
          render={({ data, loading, error }) => (
            <div className="stack">
              {loading && <p>Loading…</p>}
              {error && <p role="alert">Error: {String(error)}</p>}
              {data && (
                <article className="stack">
                  <h3>{data.title}</h3>
                  <p>{data.body}</p>
                  <small className="label">Post #{data.id}</small>
                </article>
              )}
            </div>
          )}
        />
      </div>
      <p className="label">Uses a render prop to hand data/loading/error back to the consumer.</p>
    </div>
  )
}