import { Link } from 'react-router-dom'
import './SuggestSection.css'

function SuggestSection() {
  return (
    <section className="suggest-section" id="suggest">
      <div className="container">
        <div className="suggest-section__card">
          <div className="suggest-section__visual">
            <div className="suggest-section__icon-wrapper">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
            </div>
            <div className="suggest-section__floating-cards">
              <div className="suggest-section__float-card" style={{ animationDelay: '0s' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <div className="suggest-section__float-card" style={{ animationDelay: '0.5s' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                </svg>
              </div>
              <div className="suggest-section__float-card" style={{ animationDelay: '1s' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/>
                  <line x1="6" y1="1" x2="6" y2="4"/>
                  <line x1="10" y1="1" x2="10" y2="4"/>
                  <line x1="14" y1="1" x2="14" y2="4"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="suggest-section__content">
            <h2 className="suggest-section__title">Знаете интересное место?</h2>
            <p className="suggest-section__description">
              Поделитесь с другими путешественниками! Предложите место,
              которое заслуживает внимания, и помогите открыть его для всех.
            </p>
            <ul className="suggest-section__benefits">
              <li>
                <span className="suggest-section__benefit-icon">✓</span>
                <span>Добавьте описание и фотографии</span>
              </li>
              <li>
                <span className="suggest-section__benefit-icon">✓</span>
                <span>Укажите категорию и расположение</span>
              </li>
              <li>
                <span className="suggest-section__benefit-icon">✓</span>
                <span>Помогите другим найти скрытые жемчужины</span>
              </li>
            </ul>
            <Link to="/suggest" className="suggest-section__btn">
              Предложить место
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SuggestSection
