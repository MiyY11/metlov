import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className="header">
      <div className="container header__container">
        <a href="/" className="header__logo-link">
          <div className="header__logo">
            <span className="header__logo-text">Места для туристов!</span>
          </div>
        </a>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          {isHome ? (
            <>
              <a href="#search" className="header__nav-link">Поиск</a>
              <a href="#map" className="header__nav-link">Карта</a>
              <a href="#reviews" className="header__nav-link">Отзывы</a>
              <a href="#suggest" className="header__nav-link">Предложить место</a>
              <a href="#excursions" className="header__nav-link">Предложенные места</a>
            </>
          ) : (
            <>
              <Link to="/#search" className="header__nav-link">Поиск</Link>
              <Link to="/#map" className="header__nav-link">Карта</Link>
              <Link to="/#reviews" className="header__nav-link">Отзывы</Link>
              <Link to="/suggest" className="header__nav-link">Предложить место</Link>
              <Link to="/#excursions" className="header__nav-link">Предложенные места</Link>
            </>
          )}
        </nav>

        <a href="/contacts" className="header__contacts-btn">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M10 2C6.13 2 3 5.13 3 9c0 5.25 7 9 7 9s7-3.75 7-9c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="currentColor"/>
          </svg>
          Контакты
        </a>

        <button className="header__burger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header
