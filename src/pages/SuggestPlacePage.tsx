import { useState } from 'react'
import './SuggestPlacePage.css'

interface SuggestedPlaceData {
  name: string
  category: string
  description: string
  address: string
  suggestedBy: string
  email: string
}

function SuggestPlacePage() {
  const [formData, setFormData] = useState<SuggestedPlaceData>({
    name: '',
    category: '',
    description: '',
    address: '',
    suggestedBy: '',
    email: '',
  })

  const isFormValid =
    formData.name.trim() !== '' &&
    formData.category !== '' &&
    formData.description.trim() !== '' &&
    formData.address.trim() !== '' &&
    formData.suggestedBy.trim() !== ''

  const categories = [
    'Достопримечательности',
    'Гостиницы',
    'Рестораны и кафе',
    'Музеи',
    'Парки',
    'Мастер-классы',
    'Сувениры',
    'Другое',
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const stored = localStorage.getItem('suggestedPlaces')
    const existing: SuggestedPlaceData[] = stored ? JSON.parse(stored) : []
    existing.push(formData)
    localStorage.setItem('suggestedPlaces', JSON.stringify(existing))

    window.location.href = '/#excursions'
  }

  return (
    <section className="suggest">
      <div className="container">
        <div className="suggest__header">
          <h1 className="suggest__title">Предложить место</h1>
          <a href="/" className="suggest__cancel" title="Закрыть и вернуться">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </a>
        </div>
        <p className="suggest__subtitle">
          Знаете интересное место? Расскажите нам о нём!
        </p>

        <form className="suggest__form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Название места *</label>
              <input
                id="name"
                type="text"
                placeholder="Например: Музей ложки"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Категория *</label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">Выберите категорию</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">Адрес *</label>
            <input
              id="address"
              type="text"
              placeholder="Город, улица, дом"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Описание *</label>
            <textarea
              id="description"
              rows={5}
              placeholder="Расскажите, чем интересно это место..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="suggestedBy">Ваше имя *</label>
              <input
                id="suggestedBy"
                type="text"
                value={formData.suggestedBy}
                onChange={(e) => setFormData({ ...formData, suggestedBy: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Для связи с вами"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <button type="submit" className={`form-submit ${isFormValid ? 'form-submit--valid' : 'form-submit--disabled'}`} disabled={!isFormValid}>
            Отправить предложение
          </button>
        </form>
      </div>
    </section>
  )
}

export default SuggestPlacePage
