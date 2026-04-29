import { useState, useEffect } from 'react'
import PlaceCard from './PlaceCard'
import { placesData } from '../data/places'
import { useAuth } from '../contexts/AuthContext'
import type { Place, SuggestedPlace } from '../types'
import './ExcursionsSection.css'

function ExcursionsSection() {
  const [suggestedPlaces, setSuggestedPlaces] = useState<Place[]>([])
  const [pendingPlaces, setPendingPlaces] = useState<SuggestedPlace[]>([])
  const { isAdmin, user } = useAuth()

  const loadSuggested = () => {
    const stored = localStorage.getItem('suggestedPlaces')
    if (stored) {
      const parsed: SuggestedPlace[] = JSON.parse(stored)
      
      const approved = parsed
        .filter(p => p.status === 'approved')
        .map((p) => {
          const reviewStorageKey = `reviews_${p.id}`
          const storedReviews = localStorage.getItem(reviewStorageKey)
          const reviewsCount = storedReviews ? JSON.parse(storedReviews).length : 0
          return {
            id: p.id,
            name: p.name,
            category: p.category,
            description: p.description,
            address: p.address,
            rating: 4.5,
            reviewsCount,
            price: undefined,
            image: '',
            reviews: [],
          }
        })
      
      const pending = parsed.filter(p => p.status === 'pending')
      
      setSuggestedPlaces(approved)
      setPendingPlaces(pending)
    } else {
      setSuggestedPlaces([])
      setPendingPlaces([])
    }
  }

  useEffect(() => {
    loadSuggested()

    const handleReviewUpdate = () => {
      loadSuggested()
    }
    window.addEventListener('reviewUpdated', handleReviewUpdate)

    return () => {
      window.removeEventListener('reviewUpdated', handleReviewUpdate)
    }
  }, [])

  const handleDelete = (id: number) => {
    if (!user && !isAdmin()) {
      alert('Для удаления места необходимо войти в аккаунт')
      return
    }

    const stored = localStorage.getItem('suggestedPlaces')
    if (stored) {
      const parsed: SuggestedPlace[] = JSON.parse(stored)
      const place = parsed.find(p => p.id === id)
      
      if (!isAdmin() && place?.suggestedById !== user?.id) {
        alert('Вы можете удалять только свои места')
        return
      }
      
      const filtered = parsed.filter(p => p.id !== id)
      localStorage.setItem('suggestedPlaces', JSON.stringify(filtered))
      localStorage.removeItem(`reviews_${id}`)
      loadSuggested()
    }
  }

  const handleApprove = (id: number) => {
    const stored = localStorage.getItem('suggestedPlaces')
    if (stored) {
      const parsed: SuggestedPlace[] = JSON.parse(stored)
      const updated = parsed.map(p => 
        p.id === id ? { ...p, status: 'approved' as const } : p
      )
      localStorage.setItem('suggestedPlaces', JSON.stringify(updated))
      loadSuggested()
    }
  }

  const handleReject = (id: number) => {
    const stored = localStorage.getItem('suggestedPlaces')
    if (stored) {
      const parsed: SuggestedPlace[] = JSON.parse(stored)
      const updated = parsed.map(p => 
        p.id === id ? { ...p, status: 'rejected' as const } : p
      )
      localStorage.setItem('suggestedPlaces', JSON.stringify(updated))
      loadSuggested()
    }
  }

  const allPlaces = [...placesData, ...suggestedPlaces]

  return (
    <section className="excursions-section" id="excursions">
      <div className="container">
        <div className="excursions-section__header">
          <h2 className="excursions-section__title">Предложенные места</h2>
          <p className="excursions-section__subtitle">Места, которые предложили пользователи</p>
        </div>

        {isAdmin() && pendingPlaces.length > 0 && (
          <div className="moderation-panel">
            <h3 className="moderation-panel__title">Модерация ({pendingPlaces.length})</h3>
            <div className="moderation-panel__list">
              {pendingPlaces.map(place => (
                <div key={place.id} className="moderation-item">
                  <div className="moderation-item__info">
                    <h4 className="moderation-item__name">{place.name}</h4>
                    <p className="moderation-item__details">{place.category} • {place.address}</p>
                    <p className="moderation-item__author">Предложил: {place.suggestedBy}</p>
                  </div>
                  <div className="moderation-item__actions">
                    <button
                      className="moderation-btn moderation-btn--approve"
                      onClick={() => handleApprove(place.id)}
                    >
                      ✓ Одобрить
                    </button>
                    <button
                      className="moderation-btn moderation-btn--reject"
                      onClick={() => handleReject(place.id)}
                    >
                      ✕ Отклонить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="excursions-section__grid">
          {allPlaces.map(place => (
            <div key={place.id} className="place-card-wrapper">
              <PlaceCard place={place} />
              {place.id >= 100 && (user || isAdmin()) && (
                <button
                  className="place-card-delete"
                  onClick={() => handleDelete(place.id)}
                  title="Удалить"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExcursionsSection
