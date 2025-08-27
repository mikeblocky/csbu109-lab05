# BCU React Exercises 13–19

A single Vite + React project implementing Exercises **13–19** with a top navigation bar, Geist Mono font, and a soft beige theme. It also includes Vitest + React Testing Library specs for Exercises 18–19.

## What’s inside

- **Exercise 13** — Render Props `DataLoader`
- **Exercise 14** — `useReducer` Todo
- **Exercise 15** — Optimized List using `React.memo` + `useCallback`
- **Exercise 16** — `ErrorBoundary` + `BuggyComponent`
- **Exercise 17** — `Modal` rendered via a Portal (`#modal-root` in `index.html`)
- **Exercise 18** — Tests for `Counter` (`src/components/Counter.jsx`)
- **Exercise 19** — Tests for `LoginForm` (`src/components/LoginForm.jsx`)

## Quickstart

```bash
npm i
npm run dev
```

Run tests:

```bash
npm test
```

## Notes

- Font is loaded via [`@fontsource/geist-mono`](https://fontsource.org/fonts/geist-mono). If installation fails, swap the import in `src/theme.css` with any local mono or a CDN.
- The theme lives in `src/theme.css`. Colors are subtle beiges and deep browns.
- Router tabs are at the top for quick navigation across exercises.


## In‑Browser Tests

Open **/tests** in the app and click **Run all tests** to execute UI checks without `npm test`.
