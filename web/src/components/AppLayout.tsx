import { Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Core Banking System</h1>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        Frontend-only preview — data is held in the browser.
      </footer>
    </div>
  )
}
