import { useState } from 'react'
import './ContactsPage.css'

function ContactsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setFormData({ name: '', email: '', phone: '', message: '' })
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section className="contacts">
      <div className="container">
        <div className="contacts__main">
          <h1 className="contacts__title">Контакты</h1>

          <div className="contacts__org">
            <p>Автономная некоммерческая организация информационных технологий «Цифровые технологии для общества»</p>
            <p>ОГРН 1183328015628</p>
          </div>

          <div className="contacts__info">
            <p><strong>Телефон:</strong> +7 (910) 175-09-03</p>
            <p><strong>E-mail:</strong> <a href="mailto:info@tourism33.ru">info@tourism33.ru</a></p>
          </div>

          <hr className="contacts__divider" />

          <h2 className="contacts__form-title">Напишите нам</h2>

          {sent && (
            <div className="contacts__success">
              Сообщение отправлено! Мы свяжемся с вами в ближайшее время.
            </div>
          )}

          <form className="contacts__form" onSubmit={handleSubmit}>
            <div className="contacts__form-group">
              <label htmlFor="name">Имя: *</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="contacts__form-group">
              <label htmlFor="email">E-mail: *</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="contacts__form-group">
              <label htmlFor="phone">Телефон:</label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="contacts__form-group">
              <label htmlFor="message">Сообщение: *</label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="contacts__submit-btn">Отправить</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactsPage
