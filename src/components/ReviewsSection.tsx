import './ReviewsSection.css'

const reviews = [
  {
    id: 1,
    name: 'Анна К.',
    place: 'Золотые ворота, Владимир',
    rating: 5,
    text: 'Потрясающее место! История чувствуется в каждом камне. Обязательно посетите!',
    date: '2 дня назад',
  },
  {
    id: 2,
    name: 'Дмитрий П.',
    place: 'Суздальский кремль',
    rating: 5,
    text: 'Суздаль — это сказка! Белые церкви, зелёные луга, реки. Идеальное место для выходных с семьёй.',
    date: '5 дней назад',
  },
  {
    id: 3,
    name: 'Елена М.',
    place: 'Муромские монастыри',
    rating: 4,
    text: 'Очень атмосферное место. Рекомендуем посетить Троицкий монастырь — там невероятная энергетика.',
    date: '1 неделю назад',
  },
]

function getInitials(name: string): string {
  return name.charAt(0).toUpperCase()
}

function ReviewsSection() {
  return (
    <section className="reviews-section" id="reviews">
      <div className="container">
        <div className="reviews-section__header">
          <h2 className="reviews-section__title">Отзывы путешественников</h2>
          <p className="reviews-section__subtitle">Что говорят те, кто уже побывал в этих местах</p>
        </div>

        <div className="reviews-section__grid">
          {reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-card__header">
                <div className="review-card__user">
                  <span className="review-card__avatar">{getInitials(review.name)}</span>
                  <div>
                    <div className="review-card__name">{review.name}</div>
                    <div className="review-card__place">{review.place}</div>
                  </div>
                </div>
                <div className="review-card__rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`review-card__star ${i < review.rating ? 'review-card__star--active' : ''}`}>★</span>
                  ))}
                </div>
              </div>
              <p className="review-card__text">{review.text}</p>
              <div className="review-card__footer">
                <span className="review-card__date">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReviewsSection
