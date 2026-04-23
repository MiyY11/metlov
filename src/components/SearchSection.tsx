import { useState } from 'react'
import { placesData } from '../data/places'
import type { Place } from '../types'
import './SearchSection.css'

interface SuggestedPlaceData {
  name: string
  category: string
  description: string
  address: string
  suggestedBy: string
  email: string
}

function SearchSection() {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Place[] | null>(null)
  const [searched, setSearched] = useState(false)

  const loadSuggested = (): Place[] => {
    const stored = localStorage.getItem('suggestedPlaces')
    if (stored) {
      const parsed: SuggestedPlaceData[] = JSON.parse(stored)
      return parsed.map((p, i) => ({
        id: 100 + i,
        name: p.name,
        category: p.category,
        description: p.description,
        address: p.address,
        rating: 4.5,
        reviewsCount: 0,
        price: undefined,
        image: '',
        reviews: [],
      }))
    }
    return []
  }

  const allPlaces = [...placesData, ...loadSuggested()]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      const q = query.toLowerCase()
      const results = allPlaces.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
      setSearchResults(results)
      setSearched(true)
    }
  }

  const handleQuickSearch = (tag: string) => {
    setQuery(tag)
    const q = tag.toLowerCase()
    const results = allPlaces.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    )
    setSearchResults(results)
    setSearched(true)
  }

  const clearSearch = () => {
    setQuery('')
    setSearchResults(null)
    setSearched(false)
  }

  const quickSearches = ['Владимир', 'Суздаль', 'Муром', 'Монастыри', 'Рестораны', 'Гостиницы']

  return (
    <section className="search-section" id="search">
      <div className="container">
        <div className="search-section__content">
          {!searched && (
            <>
              <div className="search-section__icon-wrapper">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </div>
              <h2 className="search-section__title">Найти место</h2>
              <p className="search-section__subtitle">Введите название места, города или категории</p>
            </>
          )}

          <form className="search-section__form" onSubmit={handleSearch}>
            <div className="search-section__input-wrapper">
              <input
                type="text"
                className="search-section__input"
                placeholder="Что вы ищете?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="search-section__submit">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </button>
            </div>
          </form>

          {!searched && (
            <div className="search-section__quick">
              <span className="search-section__quick-label">Популярное:</span>
              <div className="search-section__quick-tags">
                {quickSearches.map(tag => (
                  <button
                    key={tag}
                    className="search-section__quick-tag"
                    onClick={() => handleQuickSearch(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {searched && (
            <div className="search-section__results">
              {searchResults !== null && searchResults.length > 0 ? (
                <>
                  <div className="search-section__results-header">
                    <h3 className="search-section__results-title">Найдено: {searchResults.length}</h3>
                    <button className="search-section__clear" onClick={clearSearch}>
                      Очистить поиск
                    </button>
                  </div>
                  <div className="search-section__results-grid">
                    {searchResults.map(place => (
                      <a href={`/places/${place.id}`} key={place.id} className="search-result-card">
                        <div className="search-result-card__content">
                          <div className="search-result-card__category">{place.category}</div>
                          <h4 className="search-result-card__title">{place.name}</h4>
                          <p className="search-result-card__address">{place.address}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <div className="search-section__no-results">
                  <div className="search-section__no-results-icon">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{color: '#9ca3af'}}>
                      <circle cx="11" cy="11" r="8"/>
                      <path d="M21 21l-4.35-4.35"/>
                    </svg>
                  </div>
                  <h3 className="search-section__no-results-title">Ничего не найдено</h3>
                  <p className="search-section__no-results-text">
                    Предложенных мест с таким названием нет. Можете рассказать о нём!
                  </p>
                  <a href="/suggest" className="search-section__no-results-btn">
                    Предложить место
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default SearchSection
