import { useState, useEffect } from 'react'
import PlaceCard from './PlaceCard'
import { placesData } from '../data/places'
import type { Place } from '../types'
import './ExcursionsSection.css'

interface SuggestedPlaceData {
  name: string
  category: string
  description: string
  address: string
  suggestedBy: string
  email: string
}

function ExcursionsSection() {
  const [suggestedPlaces, setSuggestedPlaces] = useState<Place[]>([])

  const loadSuggested = () => {
    const stored = localStorage.getItem('suggestedPlaces')
    if (stored) {
      const parsed: SuggestedPlaceData[] = JSON.parse(stored)
      const converted: Place[] = parsed.map((p, i) => {
        const reviewStorageKey = `reviews_${100 + i}`
        const storedReviews = localStorage.getItem(reviewStorageKey)
        const reviewsCount = storedReviews ? JSON.parse(storedReviews).length : 0
        return {
          id: 100 + i,
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
      setSuggestedPlaces(converted)
    } else {
      setSuggestedPlaces([])
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
    const stored = localStorage.getItem('suggestedPlaces')
    if (stored) {
      const parsed: SuggestedPlaceData[] = JSON.parse(stored)
      const index = id - 100
      parsed.splice(index, 1)
      localStorage.setItem('suggestedPlaces', JSON.stringify(parsed))
      localStorage.removeItem(`reviews_${id}`)
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

        <div className="excursions-section__grid">
          {allPlaces.map(place => (
            <div key={place.id} className="place-card-wrapper">
              <PlaceCard place={place} />
              {place.id >= 100 && (
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
