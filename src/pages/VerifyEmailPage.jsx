import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { authApi } from '../lib/api.js'
import { useAuth } from '../lib/auth.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

export default function VerifyEmailPage() {
  usePageMeta(
    'Verify email | UK.company',
    'Confirm your UK.company account email address.',
    '/verify-email'
  )

  const [params] = useSearchParams()
  const { user, setUserFromApi } = useAuth()
  const [status, setStatus] = useState('working')
  const [message, setMessage] = useState('Verifying your email…')

  useEffect(() => {
    const token = params.get('token') || ''
    const email = params.get('email') || ''
    if (!token) {
      setStatus('error')
      setMessage('Missing verification token. Open the link from your email.')
      return
    }

    authApi
      .verifyEmail({ token, email })
      .then((data) => {
        setStatus('ok')
        setMessage(data.message || 'Email verified.')
        if (data.user && setUserFromApi) setUserFromApi(data.user)
      })
      .catch((err) => {
        setStatus('error')
        setMessage(err.message)
      })
  }, [params, setUserFromApi])

  return (
    <section className="auth-page">
      <div className="container auth-card">
        <h1>Email verification</h1>
        <p className={status === 'error' ? 'auth-error' : 'auth-success'}>{message}</p>
        <p className="auth-switch">
          {user ? <Link to="/portal">Go to portal</Link> : <Link to="/login">Sign in</Link>}
        </p>
      </div>
    </section>
  )
}
