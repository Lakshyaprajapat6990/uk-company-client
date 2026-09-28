import { useState } from 'react'
import { Link } from 'react-router-dom'
import { newsletterApi } from '../lib/api.js'
import usePageMeta from '../hooks/usePageMeta.js'

export default function UnsubscribePage() {
  usePageMeta(
    'Unsubscribe | UK.company',
    'Unsubscribe from the UK.company newsletter.',
    '/unsubscribe'
  )

  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    setMessage('')
    try {
      const data = await newsletterApi.unsubscribe({ email })
      setMessage(data.message || 'You have been unsubscribed.')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="auth-page">
      <div className="container auth-card">
        <h1>Unsubscribe</h1>
        <p className="auth-lead">
          Enter your email to stop receiving UK.company newsletter updates.
        </p>
        <form className="auth-form" onSubmit={onSubmit}>
          {error ? <p className="auth-error">{error}</p> : null}
          {message ? <p className="auth-success">{message}</p> : null}
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
            {busy ? 'Updating…' : 'Unsubscribe'}
          </button>
        </form>
        <p className="auth-switch">
          <Link to="/">Back to home</Link>
        </p>
      </div>
    </section>
  )
}
