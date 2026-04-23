import { Link } from 'react-router-dom'
import './Categories.css'

const categories = [
  {
    id: 'hotels',
    label: 'Гостиницы и хостелы',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="#e8434f" strokeWidth="2">
        <rect x="8" y="4" width="32" height="40" rx="2"/>
        <rect x="14" y="10" width="8" height="6" rx="1"/>
        <rect x="26" y="10" width="8" height="6" rx="1"/>
        <rect x="14" y="20" width="8" height="6" rx="1"/>
        <rect x="26" y="20" width="8" height="6" rx="1"/>
        <rect x="14" y="30" width="8" height="6" rx="1"/>
        <rect x="26" y="30" width="8" height="6" rx="1"/>
        <path d="M20 4l4-4 4 4" stroke="#e8434f" strokeWidth="2"/>
        <path d="M16 0h16" stroke="#e8434f" strokeWidth="2"/>
      </svg>
    ),
    path: '/hotels',
  },
  {
    id: 'restaurants',
    label: 'Рестораны и кафе',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="white" strokeWidth="2">
        <path d="M24 4C14 4 8 12 8 20h32c0-8-6-16-16-16z"/>
        <path d="M8 20v4c0 4 7 8 16 8s16-4 16-8v-4H8z"/>
        <path d="M24 32v12"/>
        <path d="M16 44h16"/>
      </svg>
    ),
    path: '/restaurants',
  },
  {
    id: 'souvenirs',
    label: 'Сувениры',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="white" strokeWidth="2">
        <ellipse cx="24" cy="12" rx="10" ry="10"/>
        <path d="M14 12c0 6-6 10-6 16h32c0-6-6-10-6-16"/>
        <path d="M24 28v16"/>
        <path d="M14 12a10 10 0 0120 0"/>
        <path d="M18 8l6 4 6-4"/>
      </svg>
    ),
    path: '/souvenirs',
  },
  {
    id: 'workshops',
    label: 'Необычные мастер-классы',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="white" strokeWidth="2">
        <path d="M16 16c0-4 4-8 8-8s8 4 8 8"/>
        <path d="M12 20h24l-4 16H16L12 20z"/>
        <path d="M20 28v8"/>
        <path d="M28 28v8"/>
        <path d="M16 36h16"/>
        <circle cx="24" cy="12" r="2" fill="white"/>
      </svg>
    ),
    path: '/workshops',
  },
]

function Categories() {
  return (
    <section className="categories">
      <div className="categories__background">
        <div className="categories__overlay" />
      </div>

      <div className="container categories__content">
        <h2 className="categories__title">
          <svg className="categories__title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="7" width="20" height="14" rx="2"/>
            <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
          </svg>
          Подготовка к путешествию
          <span className="categories__title-subtitle">во Владимир и Владимирскую область</span>
        </h2>

        <div className="categories__grid">
          {categories.map(category => (
            <Link to={category.path} key={category.id} className="category-card">
              <div className="category-card__icon">{category.icon}</div>
              <span className="category-card__label">{category.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories
