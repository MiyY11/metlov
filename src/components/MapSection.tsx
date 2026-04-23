import './MapSection.css'

function MapSection() {
  return (
    <section className="map-section" id="map">
      <div className="container">
        <div className="map-section__card">
          <div className="map-section__content">
            <span className="map-section__badge">🗺️ Интерактивная карта</span>
            <h2 className="map-section__title">Исследуйте<br />города России</h2>
            <p className="map-section__description">
              Откройте для себя все интересные места на интерактивной карте.
              Находите достопримечательности, рестораны, гостиницы и многое другое.
            </p>
          </div>
          <div className="map-section__visual">
            <iframe
              className="map-section__iframe"
              title="Карта России"
              src="https://www.openstreetmap.org/export/embed.html?bbox=27.0%2C41.0%2C180.0%2C82.0&layer=mapnik"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapSection
