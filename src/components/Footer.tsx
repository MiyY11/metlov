import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-text">Места для туристов!</span>
            </div>
            <p className="footer__tagline">
              Открывайте лучшие места для путешествий
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__links-group">
              <h4 className="footer__links-title">Навигация</h4>
              <nav className="footer__nav">
                <a href="#map" className="footer__link">Карта</a>
                <a href="#reviews" className="footer__link">Отзывы</a>
                <a href="#suggest" className="footer__link">Предложить место</a>
                <a href="#search" className="footer__link">Поиск</a>
              </nav>
            </div>

            <div className="footer__links-group">
              <h4 className="footer__links-title">Информация</h4>
              <nav className="footer__nav">
                <Link to="/faq" className="footer__link">Вопросы и ответы</Link>
                <Link to="/contacts" className="footer__link">Контакты</Link>
              </nav>
            </div>

            <div className="footer__links-group">
              <h4 className="footer__links-title">Контакты</h4>
              <p className="footer__contact-item">info@tourism33.ru</p>
              <p className="footer__contact-item">+7 (4922) 12-34-56</p>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {currentYear} Места для туристов! — Туристический портал</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
