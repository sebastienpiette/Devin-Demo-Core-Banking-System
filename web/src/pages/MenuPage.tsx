import { useNavigate } from 'react-router'
import { menuActions } from '../menu.ts'

export function MenuPage() {
  const navigate = useNavigate()

  return (
    <section className="panel">
      <h2>Main menu</h2>
      <ul className="menu">
        {menuActions.map((action) => (
          <li key={action.path}>
            <button
              type="button"
              className="menu-button"
              onClick={() => navigate(action.path)}
            >
              <span className="menu-option">{action.option}</span>
              <span className="menu-label">{action.label}</span>
              <span className="menu-description">{action.description}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
