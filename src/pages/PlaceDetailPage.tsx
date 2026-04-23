import { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { placesData } from '../data/places'
import type { Place, Review } from '../types'
import './PlaceDetailPage.css'

interface SuggestedPlaceData {
  name: string
  category: string
  description: string
  address: string
  suggestedBy: string
  email: string
}

function PlaceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const placeId = Number(id)
  const reviewsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }, 50)
    return () => clearTimeout(timer)
  }, [id])

  const loadSuggestedPlace = (): Place | undefined => {
    if (placeId < 100) return undefined
    const stored = localStorage.getItem('suggestedPlaces')
    if (stored) {
      const parsed: SuggestedPlaceData[] = JSON.parse(stored)
      const index = placeId - 100
      if (parsed[index]) {
        const p = parsed[index]
        return {
          id: placeId,
          name: p.name,
          category: p.category,
          description: p.description,
          address: p.address,
          rating: 4.5,
          reviewsCount: 0,
          price: undefined,
          image: '',
          reviews: [],
        }
      }
    }
    return undefined
  }

  const place = placesData.find(p => p.id === placeId) || loadSuggestedPlace()
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({ author: '', rating: 5, text: '' })

  const storageKey = `reviews_${id}`

  const [reviews, setReviews] = useState<Review[]>(() => {
    const stored = localStorage.getItem(storageKey)
    return stored ? JSON.parse(stored) : (place?.reviews || [])
  })

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (newReview.author && newReview.text) {
      const review: Review = {
        id: Date.now(),
        author: newReview.author,
        rating: newReview.rating,
        text: newReview.text,
        date: new Date().toISOString().split('T')[0],
      }
      const updatedReviews = [review, ...reviews]
      setReviews(updatedReviews)
      localStorage.setItem(storageKey, JSON.stringify(updatedReviews))
      setNewReview({ author: '', rating: 5, text: '' })
      setShowReviewForm(false)
      window.dispatchEvent(new CustomEvent('reviewUpdated'))
    }
  }

  if (!place) {
    return (
      <section className="place-detail">
        <div className="container">
          <h1 className="place-detail__not-found">Место не найдено</h1>
          <Link to="/" className="place-detail__back">← На главную</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="place-detail">
      <div className="container">
        <Link to="/" className="place-detail__back">← Назад</Link>

        <div className="place-detail__content">
          <div className="place-detail__info">
            <div className="place-detail__header">
              <span className="place-detail__category">{place.category}</span>
              <div className="place-detail__rating">
                <span className="place-detail__rating-star">★</span>
                <span className="place-detail__rating-value">{place.rating.toFixed(2)}</span>
                {place.id >= 100 && <span className="place-detail__rating-count">({place.reviewsCount} отзывов)</span>}
              </div>
            </div>

            <h1 className="place-detail__title">{place.name}</h1>
            <p className="place-detail__address">📍 {place.address}</p>

            {place.id >= 100 && (
              <div className="place-detail__reviews" ref={reviewsRef}>
                <h3 className="place-detail__reviews-title">Отзывы ({reviews.length})</h3>
                {reviews.map(review => (
                  <div key={review.id} className="review-card">
                    <div className="review-card__header">
                      <span className="review-card__author">{review.author}</span>
                      <span className="review-card__rating">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                    </div>
                    <p className="review-card__text">{review.text}</p>
                    <span className="review-card__date">{review.date}</span>
                  </div>
                ))}
              </div>
            )}

            <p className="place-detail__description">{place.description}</p>

            {place.id >= 100 && (
              <>
                <button
                  className="place-detail__review-btn"
                  onClick={() => setShowReviewForm(!showReviewForm)}
                >
                  Написать отзыв
                </button>

                {showReviewForm && (
                  <form className="place-detail__review-form" onSubmit={handleSubmitReview}>
                    <div className="form-group">
                      <label htmlFor="author">Ваше имя</label>
                      <input
                        id="author"
                        type="text"
                        value={newReview.author}
                        onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Оценка</label>
                      <div className="rating-stars">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            className={`rating-star ${star <= newReview.rating ? 'active' : ''}`}
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="text">Отзыв</label>
                      <textarea
                        id="text"
                        rows={4}
                        value={newReview.text}
                        onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                        required
                      />
                    </div>

                    <button type="submit" className="form-submit">Отправить отзыв</button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PlaceDetailPage
