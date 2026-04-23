import { Link } from 'react-router-dom'
import './Navigation.css'

const navItems = [
  {
    id: 'faq',
    label: 'Вопросы и ответы',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9 9a3 3 0 015.12 1.5c0 1.5-2.25 2.25-2.25 3.37"/>
        <circle cx="12" cy="17" r="0.5" fill="currentColor"/>
      </svg>
    ),
    path: '/faq',
  },
]

function Navigation() {
  return (
    <nav className="navigation">
      <div className="container">
        <ul className="navigation__list">
          {navItems.map(item => (
            <li key={item.id} className="navigation__item">
              <Link to={item.path} className="navigation__link">
                <span className="navigation__icon">{item.icon}</span>
                <span className="navigation__label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
