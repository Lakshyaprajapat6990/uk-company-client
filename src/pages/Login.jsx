import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth.jsx'
import { ordersApi, PENDING_ORDER_KEY, PENDING_SHELF_KEY, shelfApi } from '../lib/api.js'

async function resumePendingOrder(navigate, fallback) {
  const shelfRaw = sessionStorage.getItem(PENDING_SHELF_KEY)
  if (shelfRaw) {
    sessionStorage.removeItem(PENDING_SHELF_KEY)
    try {
      const payload = JSON.parse(shelfRaw)
      const data = await shelfApi.reserve(payload.slug, {
        wantsVerificationService: Boolean(payload.wantsVerificationService),
      })
      navigate(`/portal/orders/${data.order._id}`)
      return
    } catch {
      navigate('/companies-for-sale')
      return
    }
  }

  const raw = sessionStorage.getItem(PENDING_ORDER_KEY)
  if (!raw) {
    navigate(fallback)
    return
  }
  sessionStorage.removeItem(PENDING_ORDER_KEY)
  try {
    const payload = JSON.parse(raw)
    const data = await ordersApi.create(payload)
    navigate(`/portal/orders/${data.order._id}`)
  } catch {
    navigate('/portal')
  }
}

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await login(email, password)
      await resumePendingOrder(navigate, location.state?.from || '/portal')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="auth-page">
      <div className="container auth-card">
        <h1>Account login</h1>
        <p className="auth-lead">Sign in to manage orders, formation details and documents.</p>
        <form onSubmit={onSubmit} className="auth-form">
          {error ? <p className="auth-error">{error}</p> : null}
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </label>
          <button className="btn btn-primary btn-block" disabled={busy}>
            {busy ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p className="auth-switch">
          New customer? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </section>
  )
}
