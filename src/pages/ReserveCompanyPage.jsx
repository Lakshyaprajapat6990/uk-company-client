import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import { CH_VERIFICATION_FEE, formatGbp, getExistingCompany } from '../data/existingCompanies.js'
import { useAuth } from '../lib/auth.jsx'
import { PENDING_SHELF_KEY, shelfApi } from '../lib/api.js'

export default function ReserveCompanyPage() {
  const { slug } = useParams()
  const listed = getExistingCompany(slug)
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [company, setCompany] = useState(listed || null)
  const [wantsVerificationService, setWantsVerificationService] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    shelfApi
      .get(slug)
      .then((data) => setCompany(data.company))
      .catch(() => {
        if (listed) setCompany({ ...listed, status: 'available' })
      })
  }, [slug])

  if (!listed && !company) return <Navigate to="/companies-for-sale" replace />

  const display = company || listed
  const available = (display.status || 'available') === 'available'
  const total = display.price + (wantsVerificationService ? CH_VERIFICATION_FEE : 0)

  async function reserve() {
    setError('')
    const payload = { slug: display.slug, wantsVerificationService }

    if (!isAuthenticated) {
      sessionStorage.setItem(PENDING_SHELF_KEY, JSON.stringify(payload))
      navigate('/login', { state: { from: `/companies-for-sale/${display.slug}` } })
      return
    }

    setBusy(true)
    try {
      const data = await shelfApi.reserve(display.slug, { wantsVerificationService })
      navigate(`/portal/orders/${data.order._id}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <section className="formation-hero">
        <div className="container formation-hero-inner">
          <Reveal variant="top">
            <nav className="formation-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link to="/companies-for-sale">Companies for sale</Link>
              <span aria-hidden="true">/</span>
              <span>{display.name}</span>
            </nav>
            <p className="section-label">Reserve existing company</p>
            <h1>{display.name}</h1>
            <div className="formation-hero-price">{formatGbp(display.price)}</div>
            <p className="formation-hero-lead">
              Company number {display.companyNumber} · Incorporated {display.incorporatedOn}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="shelf-page">
        <div className="container shelf-reserve-grid">
          <div>
            <h2>What we need before transfer</h2>
            <p>
              We cannot transfer this company until identity checks are complete. For each director
              and person of significant control we need:
            </p>
            <ul className="shelf-need-list">
              <li>1 x photographic ID</li>
              <li>1 x proof of address no more than 3 months old (driving licences only if under 3 months)</li>
              <li>Email address and phone number</li>
              <li>Registered office address</li>
              <li>SIC codes</li>
              <li>Companies House verification code, or our £75 verification service</li>
            </ul>
            <p>
              After ID is approved we send a proforma invoice (your warranty) with bank details.
              Payment is taken then — not at reservation.
            </p>
            <p>
              Identity guidance:{' '}
              <a
                href="https://www.gov.uk/guidance/verifying-your-identity-for-companies-house"
                target="_blank"
                rel="noreferrer"
              >
                GOV.UK Companies House verification
              </a>
            </p>
          </div>

          <aside className="formation-summary-card">
            <p className="formation-summary-kicker">Reservation</p>
            <dl className="formation-summary-rows">
              <div>
                <dt>Company</dt>
                <dd>{formatGbp(display.price)}</dd>
              </div>
              <div>
                <dt>Verification service</dt>
                <dd>{wantsVerificationService ? formatGbp(CH_VERIFICATION_FEE) : '£0'}</dd>
              </div>
            </dl>
            <label className="shelf-check">
              <input
                type="checkbox"
                checked={wantsVerificationService}
                onChange={(e) => setWantsVerificationService(e.target.checked)}
              />
              I need you to issue the Companies House verification code (£{CH_VERIFICATION_FEE})
            </label>
            <div className="formation-summary-total">
              <span>Listed total</span>
              <strong>{formatGbp(total)}</strong>
            </div>
            {error ? <p className="auth-error">{error}</p> : null}
            {!available ? (
              <p className="shelf-sold">This company is no longer available.</p>
            ) : (
              <button type="button" className="btn btn-primary btn-block" disabled={busy} onClick={reserve}>
                {busy ? 'Reserving...' : 'Reserve this company'}
              </button>
            )}
            <p className="shelf-fineprint">
              Reservation collects your details. A proforma invoice follows after ID checks.
            </p>
          </aside>
        </div>
      </section>
    </>
  )
}
