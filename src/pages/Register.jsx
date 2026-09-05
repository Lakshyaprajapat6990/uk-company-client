import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth.jsx'
import { afterAuthNavigate } from '../lib/authFlow.js'
import usePageMeta from '../hooks/usePageMeta.js'

export default function Register() {
  usePageMeta(
    'Create account | UK.company',
    'Create a UK.company customer account to place formation orders, reserve ready-made companies and upload ID documents.',
    '/register'
  )

  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (!acceptTerms) {
      setError('Please accept the Privacy Policy and Terms of Use.')
      return
    }

    setBusy(true)
    try {
      const { confirmPassword: _, ...payload } = form
      const user = await register(payload)
      await afterAuthNavigate(user, navigate, '/portal')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="auth-page">
      <div className="container auth-card">
        <h1>Create UK.company account</h1>
        <p className="auth-lead">
          This account is for UK.company orders - formations, ready-made company reservations and ID
          uploads. Mail and address products checkout on{' '}
          <Link to="/myukpost">MyUKPost.com</Link> (sister site).
        </p>
        <form onSubmit={onSubmit} className="auth-form">
          {error ? <p className="auth-error">{error}</p> : null}
          <label>
            Full name
            <input
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              required
              autoComplete="name"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              required
              autoComplete="email"
            />
          </label>
          <label>
            Phone (optional)
            <input
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              autoComplete="tel"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </label>
          <label>
            Confirm password
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => update('confirmPassword', e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </label>
          <label className="auth-check">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <span>
              I agree to the <Link to="/privacy">Privacy Policy</Link> and{' '}
              <Link to="/terms">Terms of Use</Link>.
            </span>
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
