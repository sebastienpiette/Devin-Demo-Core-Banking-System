import { Link } from 'react-router'

export function BackToMenu() {
  return (
    <Link className="back-link" to="/">
      &larr; Back to menu
    </Link>
  )
}
