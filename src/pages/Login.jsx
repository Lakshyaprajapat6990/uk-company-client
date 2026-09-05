import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth.jsx'
import { afterAuthNavigate } from '../lib/authFlow.js'
import usePageMeta from '../hooks/usePageMeta.js'

export default function Login() {
  usePageMeta(
    'Account login | UK.company',
    'Sign in to your UK.company account to manage orders, formation details and ID documents.',
    '/login'
  )

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
      const user = await login(email, password)
      const fallback = location.state?.from || (user?.role === 'admin' ? '/admin' : '/portal')
      await afterAuthNavigate(user, navigate, fallback)
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
        <p className="auth-lead">
          Sign in to manage UK.company orders. Admins are taken to the CMS. Customers use the portal
          for formations and ready-made company reservations.
        </p>
        <form onSubmit={onSubmit} className="auth-form">
          {error ? <p className="auth-error">{error}</p> : null}
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="current-password"
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
