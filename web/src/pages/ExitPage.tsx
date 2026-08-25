import { Link } from 'react-router'

export function ExitPage() {
  return (
    <section className="panel">
      <h2>Bye.</h2>
      <p className="placeholder-note">
        The session is closed. A browser tab cannot stop the program the way the
        original terminal application does.
      </p>
      <Link className="back-link" to="/">
        Start again
      </Link>
    </section>
  )
}
