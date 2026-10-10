import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/auth.jsx'
import { hasPermission, isStaffUser } from '../lib/permissions.js'

/** Map a public URL to the Website CMS page slug. */
export function websiteSlugFromPath(pathname) {
  const path = String(pathname || '/').replace(/\/+$/, '') || '/'

  if (path === '/') return 'home'
  if (path === '/formations') return 'formations'
  if (path === '/companies-for-sale') return 'companies-for-sale'
  if (path === '/buy') return 'buy'
  if (path === '/sell') return 'sell'
  if (path === '/international' || path === '/non-uk') return 'international'
  if (path === '/bbl' || path === '/bounce-back-loans') return 'bbl'
  if (path === '/vat') return 'vat'
  if (path === '/id-verification' || path === '/id') return 'id-verification'
  if (path === '/myukpost') return 'myukpost'
  if (path === '/ecosystem') return 'ecosystem'
  if (path === '/contact') return 'contact'
  if (path === '/privacy') return 'privacy'
  if (path === '/terms') return 'terms'
  if (path === '/cookies') return 'cookies'

  if (path.startsWith('/info/')) {
    const id = path.slice('/info/'.length)
    return id ? `info-${id}` : null
  }
  if (path.startsWith('/formation/')) {
    const id = path.slice('/formation/'.length)
    return id ? `formation-${id}` : null
  }

  return null
}

/** Floating shortcut for staff with website permission. */
export default function EditPageButton() {
  const { user } = useAuth()
  const location = useLocation()

  if (!isStaffUser(user) || !hasPermission(user, 'website')) return null
  if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/portal')) return null

  const slug = websiteSlugFromPath(location.pathname)
  if (!slug) return null

  return (
    <Link
      to={`/admin/website?page=${encodeURIComponent(slug)}`}
      className="edit-page-fab"
      title="Edit this page in Website CMS"
    >
      Edit this page
    </Link>
  )
}
