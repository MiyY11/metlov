import { Link } from 'react-router-dom'
import type { Place } from '../types'
import './PlaceCard.css'

interface PlaceCardProps {
  place: Place
}

function PlaceCard({ place }: PlaceCardProps) {
  return (
    <Link to={`/places/${place.id}`} className="place-card">
      <div className="place-card__content">
        <div className="place-card__category">{place.category}</div>

        <div className="place-card__rating">
          <span className="place-card__rating-star">★</span>
          <span className="place-card__rating-value">{place.rating.toFixed(2)}</span>
          {place.id >= 100 && <span className="place-card__rating-count">({place.reviewsCount})</span>}
        </div>

        <h3 className="place-card__title">{place.name}</h3>

        <p className="place-card__address">{place.address}</p>
      </div>
    </Link>
  )
}

export default PlaceCard
