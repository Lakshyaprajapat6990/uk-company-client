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

  const { login, verifyTwoFactor } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [preAuthToken, setPreAuthToken] = useState('')
  const [step, setStep] = useState('password')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function finishLogin(user) {
    const fallback = location.state?.from || (user?.role === 'admin' ? '/admin' : '/portal')
    await afterAuthNavigate(user, navigate, fallback)
  }

  async function onPasswordSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      const result = await login(email, password)
      if (result?.requiresTwoFactor) {
        setPreAuthToken(result.preAuthToken)
        setStep('2fa')
        setCode('')
        return
      }
      await finishLogin(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function onTwoFactorSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      const user = await verifyTwoFactor(preAuthToken, code)
      await finishLogin(user)
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
          {step === '2fa'
            ? 'Enter the 6-digit code from your authenticator app to finish signing in.'
            : 'Sign in to manage UK.company orders. Admins are taken to the CMS. Customers use the portal for formations and ready-made company reservations.'}
        </p>

        {step === 'password' ? (
          <form onSubmit={onPasswordSubmit} className="auth-form">
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
            <p className="auth-switch" style={{ margin: 0 }}>
              <Link to="/forgot-password">Forgot password?</Link>
            </p>
          </form>
        ) : (
          <form onSubmit={onTwoFactorSubmit} className="auth-form">
            {error ? <p className="auth-error">{error}</p> : null}
            <p className="auth-lead" style={{ marginBottom: 0 }}>
              Signed in as <strong>{email}</strong>
            </p>
            <label>
              Authentication code
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={8}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                autoComplete="one-time-code"
                placeholder="6-digit code"
                autoFocus
              />
            </label>
            <button className="btn btn-primary btn-block" disabled={busy}>
              {busy ? 'Verifying...' : 'Verify and continue'}
            </button>
            <button
              type="button"
              className="btn btn-outline btn-block"
              disabled={busy}
              onClick={() => {
                setStep('password')
                setPreAuthToken('')
                setCode('')
                setError('')
              }}
            >
              Back to password
            </button>
          </form>
        )}

        {step === 'password' ? (
          <p className="auth-switch">
            New customer? <Link to="/register">Create an account</Link>
          </p>
        ) : null}
      </div>
    </section>
  )
}
