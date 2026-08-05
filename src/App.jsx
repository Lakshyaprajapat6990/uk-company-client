import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import FormationServicePage from './pages/FormationServicePage.jsx'
import AdditionalServicePage from './pages/AdditionalServicePage.jsx'
import InfoPage from './pages/InfoPage.jsx'

export default function App() {
  return (
    <div className="site">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formation/:slug" element={<FormationServicePage />} />
          <Route path="/additional/:slug" element={<AdditionalServicePage />} />
          <Route path="/info/:slug" element={<InfoPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
