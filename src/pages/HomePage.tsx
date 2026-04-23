import Hero from '../components/Hero'
import MapSection from '../components/MapSection'
import SuggestSection from '../components/SuggestSection'
import SearchSection from '../components/SearchSection'
import ExcursionsSection from '../components/ExcursionsSection'
import './HomePage.css'

function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <SearchSection />
      <MapSection />
      <SuggestSection />
      <ExcursionsSection />
    </div>
  )
}

export default HomePage
