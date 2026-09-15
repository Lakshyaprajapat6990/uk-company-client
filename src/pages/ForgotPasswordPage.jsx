import { useState } from 'react'
import { Link } from 'react-router-dom'
import { authApi } from '../lib/api.js'
import usePageMeta from '../hooks/usePageMeta.js'

export default function ForgotPasswordPage() {
  usePageMeta(
    'Forgot password | UK.company',
    'Request a password reset link for your UK.company account.',
    '/forgot-password'
  )

  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [devLink, setDevLink] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setMessage('')
    setDevLink('')
    setBusy(true)
    try {
      const data = await authApi.forgotPassword({ email })
      setMessage(data.message || 'If that email is registered, a reset link has been sent.')
      if (data.resetUrl) setDevLink(data.resetUrl)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="auth-page">
      <div className="container auth-card">
        <h1>Forgot password</h1>
        <p className="auth-lead">
          Enter your account email and we will send a reset link. On local development the link is
          also shown here and in the API console.
        </p>
        <form onSubmit={onSubmit} className="auth-form">
          {error ? <p className="auth-error">{error}</p> : null}
          {message ? <p className="auth-success">{message}</p> : null}
          {devLink ? (
            <p className="auth-success">
              Local reset link:{' '}
              <a href={devLink}>{devLink}</a>
            </p>
          ) : null}
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
          <button className="btn btn-primary btn-block" disabled={busy}>
            {busy ? 'Sending...' : 'Send reset link'}
          </button>
        </form>
        <p className="auth-switch">
          <Link to="/login">Back to login</Link>
        </p>
      </div>
    </section>
  )
}
