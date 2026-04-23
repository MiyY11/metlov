import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import PlaceDetailPage from './pages/PlaceDetailPage'
import SuggestPlacePage from './pages/SuggestPlacePage'
import ContactsPage from './pages/ContactsPage'

function ScrollToHash() {
  const location = useLocation()
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [location.hash])
  return null
}

function App() {
  return (
    <div className="app">
      <ScrollToHash />
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/places/:id" element={<PlaceDetailPage />} />
          <Route path="/suggest" element={<SuggestPlacePage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/guide" element={<HomePage />} />
          <Route path="/trip" element={<HomePage />} />
          <Route path="/news" element={<HomePage />} />
          <Route path="/map" element={<HomePage />} />
          <Route path="/faq" element={<HomePage />} />
          <Route path="/hotels" element={<HomePage />} />
          <Route path="/restaurants" element={<HomePage />} />
          <Route path="/souvenirs" element={<HomePage />} />
          <Route path="/workshops" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
