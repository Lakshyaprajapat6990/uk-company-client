import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { authApi } from '../lib/api.js'
import usePageMeta from '../hooks/usePageMeta.js'

export default function ResetPasswordPage() {
  usePageMeta(
    'Reset password | UK.company',
    'Choose a new password for your UK.company account.',
    '/reset-password'
  )

  const [params] = useSearchParams()
  const navigate = useNavigate()
  const token = useMemo(() => params.get('token') || '', [params])
  const email = useMemo(() => params.get('email') || '', [params])
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setMessage('')
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    setBusy(true)
    try {
      const data = await authApi.resetPassword({ token, password, email: email || undefined })
      setMessage(data.message || 'Password updated.')
      setTimeout(() => navigate('/login'), 1200)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  if (!token) {
    return (
      <section className="auth-page">
        <div className="container auth-card">
          <h1>Reset password</h1>
          <p className="auth-error">Missing reset token. Request a new link.</p>
          <p className="auth-switch">
            <Link to="/forgot-password">Forgot password</Link>
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="auth-page">
      <div className="container auth-card">
        <h1>Reset password</h1>
        <p className="auth-lead">Choose a new password for your account.</p>
        <form onSubmit={onSubmit} className="auth-form">
          {error ? <p className="auth-error">{error}</p> : null}
          {message ? <p className="auth-success">{message}</p> : null}
          <label>
            New password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </label>
          <label>
            Confirm password
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </label>
          <button className="btn btn-primary btn-block" disabled={busy}>
            {busy ? 'Updating...' : 'Update password'}
          </button>
        </form>
      </div>
    </section>
  )
}
