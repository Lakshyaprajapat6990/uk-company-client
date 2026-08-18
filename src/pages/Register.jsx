import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth.jsx'
import { ordersApi, PENDING_ORDER_KEY, PENDING_SHELF_KEY, shelfApi } from '../lib/api.js'

async function resumePendingOrder(navigate) {
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
    navigate('/portal')
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

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await register(form)
      await resumePendingOrder(navigate)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="auth-page">
      <div className="container auth-card">
        <h1>Create account</h1>
        <p className="auth-lead">Register to place formation orders and track progress.</p>
        <form onSubmit={onSubmit} className="auth-form">
          {error ? <p className="auth-error">{error}</p> : null}
          <label>
            Full name
            <input value={form.name} onChange={(e) => update('name', e.target.value)} required />
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              required
            />
          </label>
          <label>
            Phone (optional)
            <input value={form.phone} onChange={(e) => update('phone', e.target.value)} />
          </label>
          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              required
              minLength={6}
            />
          </label>
          <button className="btn btn-primary btn-block" disabled={busy}>
            {busy ? 'Creating...' : 'Create account'}
          </button>
        </form>
        <p className="auth-switch">
          Already registered? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </section>
  )
}
