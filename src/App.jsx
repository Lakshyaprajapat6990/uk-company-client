import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import FormationServicePage from './pages/FormationServicePage.jsx'
import AdditionalServicePage from './pages/AdditionalServicePage.jsx'
import InfoPage from './pages/InfoPage.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import PortalDashboard from './pages/PortalDashboard.jsx'
import OrderDetail from './pages/OrderDetail.jsx'
import ExistingCompaniesPage from './pages/ExistingCompaniesPage.jsx'
import ReserveCompanyPage from './pages/ReserveCompanyPage.jsx'
import VatPage from './pages/VatPage.jsx'

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
          <Route path="/companies-for-sale" element={<ExistingCompaniesPage />} />
          <Route path="/companies-for-sale/:slug" element={<ReserveCompanyPage />} />
          <Route path="/vat" element={<VatPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/portal"
            element={
              <ProtectedRoute>
                <PortalDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portal/orders/:id"
            element={
              <ProtectedRoute>
                <OrderDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
