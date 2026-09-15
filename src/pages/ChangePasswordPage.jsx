import { useState } from 'react'
import { Link } from 'react-router-dom'
import { authApi } from '../lib/api.js'
import usePageMeta from '../hooks/usePageMeta.js'

export default function ChangePasswordPage() {
  usePageMeta(
    'Change password | UK.company',
    'Update the password for your UK.company account.',
    '/account/password'
  )

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setMessage('')
    if (newPassword !== confirm) {
      setError('New passwords do not match')
      return
    }
    setBusy(true)
    try {
      const data = await authApi.changePassword({ currentPassword, newPassword })
      setMessage(data.message || 'Password changed.')
      setCurrentPassword('')
      setNewPassword('')
      setConfirm('')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="auth-page">
      <div className="container auth-card">
        <h1>Change password</h1>
        <p className="auth-lead">Update your account password. You will stay signed in.</p>
        <form onSubmit={onSubmit} className="auth-form">
          {error ? <p className="auth-error">{error}</p> : null}
          {message ? <p className="auth-success">{message}</p> : null}
          <label>
            Current password
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </label>
          <label>
            New password
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </label>
          <label>
            Confirm new password
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
            {busy ? 'Saving...' : 'Update password'}
          </button>
        </form>
        <p className="auth-switch">
          <Link to="/portal">Back to portal</Link>
        </p>
      </div>
    </section>
  )
}
