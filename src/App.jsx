import { Navigate, Routes, Route } from 'react-router-dom'
import { useAuth } from './lib/auth.jsx'
import { firstAllowedAdminPath, hasPermission } from './lib/permissions.js'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminRoute from './components/AdminRoute.jsx'
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
import Cart from './pages/Cart.jsx'
import SellCompanyPage from './pages/SellCompanyPage.jsx'
import IdVerificationPage from './pages/IdVerificationPage.jsx'
import BuyCompanyPage from './pages/BuyCompanyPage.jsx'
import BblPage from './pages/BblPage.jsx'
import InternationalPage from './pages/InternationalPage.jsx'
import MyUkPostPage from './pages/MyUkPostPage.jsx'
import FormationsHubPage from './pages/FormationsHubPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import LegalPage from './pages/LegalPage.jsx'
import BlogListPage from './pages/BlogListPage.jsx'
import BlogPostPage from './pages/BlogPostPage.jsx'
import EcosystemPage from './pages/EcosystemPage.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import AdminOverview from './pages/admin/AdminOverview.jsx'
import AdminOrders from './pages/admin/AdminOrders.jsx'
import AdminCompanies from './pages/admin/AdminCompanies.jsx'
import AdminUsers from './pages/admin/AdminUsers.jsx'
import AdminSubscribers from './pages/admin/AdminSubscribers.jsx'
import AdminWebsite from './pages/admin/AdminWebsite.jsx'
import AdminStaff from './pages/admin/AdminStaff.jsx'
import CookieConsent from './components/CookieConsent.jsx'
import ConsentAnalytics from './components/ConsentAnalytics.jsx'
import EditPageButton from './components/EditPageButton.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'
import ResetPasswordPage from './pages/ResetPasswordPage.jsx'
import ChangePasswordPage from './pages/ChangePasswordPage.jsx'
import VerifyEmailPage from './pages/VerifyEmailPage.jsx'
import UnsubscribePage from './pages/UnsubscribePage.jsx'

function AdminIndex() {
  const { user } = useAuth()
  if (hasPermission(user, 'overview')) return <AdminOverview />
  return <Navigate to={firstAllowedAdminPath(user)} replace />
}

export default function App() {
  return (
    <div className="site">
      <div className="site-watermark" aria-hidden="true" />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formations" element={<FormationsHubPage />} />
          <Route path="/formation/:slug" element={<FormationServicePage />} />
          <Route path="/additional/:slug" element={<AdditionalServicePage />} />
          <Route path="/info/:slug" element={<InfoPage />} />
          <Route path="/companies-for-sale" element={<ExistingCompaniesPage />} />
          <Route path="/companies-for-sale/:slug" element={<ReserveCompanyPage />} />
          <Route path="/buy" element={<BuyCompanyPage />} />
          <Route path="/sell" element={<SellCompanyPage />} />
          <Route path="/id-verification" element={<IdVerificationPage />} />
          <Route path="/id" element={<Navigate to="/id-verification" replace />} />
          <Route path="/bbl" element={<BblPage />} />
          <Route path="/bounce-back-loans" element={<Navigate to="/bbl" replace />} />
          <Route path="/international" element={<InternationalPage />} />
          <Route path="/non-uk" element={<Navigate to="/international" replace />} />
          <Route path="/myukpost" element={<MyUkPostPage />} />
          <Route path="/ecosystem" element={<EcosystemPage />} />
          <Route path="/vat" element={<VatPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<LegalPage />} />
          <Route path="/terms" element={<LegalPage />} />
          <Route path="/cookies" element={<LegalPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/unsubscribe" element={<UnsubscribePage />} />
          <Route
            path="/account/password"
            element={
              <ProtectedRoute>
                <ChangePasswordPage />
              </ProtectedRoute>
            }
          />
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
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminIndex />} />
            <Route
              path="orders"
              element={
                <AdminRoute permission="orders">
                  <AdminOrders />
                </AdminRoute>
              }
            />
            <Route
              path="companies"
              element={
                <AdminRoute permission="companies">
                  <AdminCompanies />
                </AdminRoute>
              }
            />
            <Route
              path="users"
              element={
                <AdminRoute permission="users">
                  <AdminUsers />
                </AdminRoute>
              }
            />
            <Route
              path="subscribers"
              element={
                <AdminRoute permission="subscribers">
                  <AdminSubscribers />
                </AdminRoute>
              }
            />
            <Route
              path="website"
              element={
                <AdminRoute permission="website">
                  <AdminWebsite />
                </AdminRoute>
              }
            />
            <Route
              path="homepage"
              element={<Navigate to="/admin/website?page=home" replace />}
            />
            <Route
              path="staff"
              element={
                <AdminRoute superAdminOnly>
                  <AdminStaff />
                </AdminRoute>
              }
            />
          </Route>
        </Routes>
      </main>
      <Footer />
      <EditPageButton />
      <CookieConsent />
      <ConsentAnalytics />
    </div>
  )
}
