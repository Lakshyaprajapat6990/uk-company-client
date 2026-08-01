import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import { notice } from './data/content.js'

export default function App() {
  const [showNotice, setShowNotice] = useState(true)

  return (
    <div className="site">
      {showNotice ? (
        <div className="site-notice">
          <div className="container site-notice-inner">
            <p>{notice}</p>
            <button type="button" onClick={() => setShowNotice(false)}>
              Close
            </button>
          </div>
        </div>
      ) : null}
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
