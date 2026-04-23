import { useState } from 'react'
import './Hero.css'

const cities = [
  { id: 1, name: 'Москва' },
  { id: 2, name: 'Владимир' },
  { id: 3, name: 'Санкт-Петербург' },
]

function Hero() {
  const [showCities, setShowCities] = useState(false)

  return (
    <section className="hero">
      <div className="hero__background">
        <div className="hero__overlay" />
      </div>

      <div className="container hero__content">
        <div className="hero__text">
          <h1 className="hero__title">Откройте для себя<br />города России</h1>
          <p className="hero__subtitle">Лучшие места для путешествий и отдыха</p>
        </div>

        <div className="hero__actions">
          <button className="hero__btn hero__btn--primary" onClick={() => setShowCities(!showCities)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Города
          </button>

          <a href="#map" className="hero__btn hero__btn--secondary">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
              <line x1="8" y1="2" x2="8" y2="18"/>
              <line x1="16" y1="6" x2="16" y2="22"/>
            </svg>
            Смотреть карту
          </a>
        </div>

        {showCities && (
          <div className="hero__cities-dropdown">
            <div className="hero__cities-dropdown-header">
              <h3>Города России</h3>
              <button className="hero__cities-close" onClick={() => setShowCities(false)}>×</button>
            </div>
            <ul className="hero__cities-list">
              {cities.map((city) => (
                <li key={city.id} className="hero__cities-item">
                  <a href="#excursions" onClick={() => setShowCities(false)} className="hero__cities-link">
                    <span className="hero__cities-number">{city.id}</span>
                    <span className="hero__cities-name">{city.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

export default Hero
