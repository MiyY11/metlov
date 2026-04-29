import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import type { SuggestedPlace } from '../types'
import './SuggestPlacePage.css'

function SuggestPlacePage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    address: '',
    email: '',
  })
  const [error, setError] = useState('')

  const isFormValid =
    formData.name.trim() !== '' &&
    formData.category !== '' &&
    formData.description.trim() !== '' &&
    formData.address.trim() !== ''

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

  const checkDuplicate = (name: string, address: string): boolean => {
    const stored = localStorage.getItem('suggestedPlaces')
    if (stored) {
      const parsed: SuggestedPlace[] = JSON.parse(stored)
      const isDuplicate = parsed.some(
        place => place.name.toLowerCase() === name.toLowerCase() && 
                 place.address.toLowerCase() === address.toLowerCase()
      )
      if (isDuplicate) return true
    }
    
    const placesData = localStorage.getItem('placesData')
    if (placesData) {
      const parsed = JSON.parse(placesData)
      const isDuplicate = parsed.some(
        (place: any) => place.name.toLowerCase() === name.toLowerCase() && 
                       place.address.toLowerCase() === address.toLowerCase()
      )
      if (isDuplicate) return true
    }
    
    return false
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!user) {
      navigate('/login')
      return
    }

    if (checkDuplicate(formData.name, formData.address)) {
      setError('Место с таким названием и адресом уже существует')
      return
    }

    const stored = localStorage.getItem('suggestedPlaces')
    const existing: SuggestedPlace[] = stored ? JSON.parse(stored) : []
    
    const newPlace: SuggestedPlace = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      description: formData.description,
      address: formData.address,
      suggestedBy: user.name,
      suggestedById: user.id,
      email: formData.email || user.email,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    
    existing.push(newPlace)
    localStorage.setItem('suggestedPlaces', JSON.stringify(existing))

    navigate('/#excursions')
  }

  if (!user) {
    return (
      <section className="suggest">
        <div className="container">
          <div className="suggest__auth-required">
            <h1 className="suggest__title">Требуется авторизация</h1>
            <p className="suggest__subtitle">Для предложения места необходимо войти в аккаунт</p>
            <button className="auth-btn" onClick={() => navigate('/login')}>Войти</button>
            <button className="auth-btn auth-btn--secondary" onClick={() => navigate('/register')}>Зарегистрироваться</button>
          </div>
        </div>
      </section>
    )
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

        {error && <div className="suggest__error">{error}</div>}

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

          <div className="form-group">
            <label htmlFor="email">Email (для связи)</label>
            <input
              id="email"
              type="email"
              placeholder={user.email}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
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
