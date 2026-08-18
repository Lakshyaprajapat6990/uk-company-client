import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import { CH_VERIFICATION_FEE, formatGbp, getExistingCompany } from '../data/existingCompanies.js'
import { useAuth } from '../lib/auth.jsx'
import { PENDING_SHELF_KEY, shelfApi } from '../lib/api.js'
import { useCart } from '../lib/cart.jsx'

export default function ReserveCompanyPage() {
  const { slug } = useParams()
  const listed = getExistingCompany(slug)
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { addItem } = useCart()
  const [company, setCompany] = useState(listed || null)
  const [wantsVerificationService, setWantsVerificationService] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [cartMessage, setCartMessage] = useState('')

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

  function addToCart() {
    addItem({
      id: `shelf:${display.slug}`,
      type: 'shelf',
      slug: display.slug,
      title: display.name,
      price: total,
      href: `/companies-for-sale/${display.slug}`,
    })
    setCartMessage('Added to cart')
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
          <div className="shelf-copy">
            <h2>Before we can proceed</h2>
            <p>Hi, thanks for the enquiry,</p>
            <p>Here is the list of the latest companies that we have for sale.</p>
            <p>
              My name is Nick Davenport. I own myUKpost.com and UK.company. We are HMRC and
              Companies House Regulated, so you are in safe hands.
            </p>
            <p>
              If you are interested in buying one or more of these companies, please make your offer
              via WhatsApp. If we accept the offer, then we will need the below list of ID before we
              can proceed (for each director and PSC):
            </p>
            <ol className="shelf-need-list">
              <li>1 x Photographic ID</li>
              <li>
                1 x Proof of Address, no more than 3 months old (we cannot accept driving licences as
                proof of address unless under 3 months old)
              </li>
              <li>Email address and Phone number</li>
              <li>Registered Office address</li>
              <li>SIC codes</li>
              <li>Companies House Verification Code number (see below)</li>
            </ol>
            <p>
              From November last year, every director and PSC has to have a verification code. You
              can do this yourself on the gov.uk app. We cannot sell a company until we have all the
              ID and the verification code, as we are UK Government / HMRC and Companies House
              regulated. We have to follow the rules and AMLR compliance. If you have difficulty
              getting the code, I am authorised to issue the codes once I have checked and verified
              the ID and done the checks at my end — but we have to charge £75 for this, as there is
              vetting licence costs.
            </p>
            <p>
              <a
                href="https://www.gov.uk/guidance/verifying-your-identity-for-companies-house"
                target="_blank"
                rel="noreferrer"
              >
                https://www.gov.uk/guidance/verifying-your-identity-for-companies-house
              </a>
            </p>
            <p>
              Once we have all the ID and other details, and the verification code (unless we are
              doing it), we will send you a proforma Invoice, which serves as your warranty and
              guarantee and also includes the bank details. Once the payment is received, we resign
              the company, add your director and PSC and send you the Auth Codes and HMRC UTR codes
              immediately.
            </p>
            <p>
              Please be careful of buying companies where people are not asking for any ID, as now
              every UK company formation agent must be regulated and licenced, and if you are buying
              from someone without a licence, you are wide open to being ripped off.
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
            {cartMessage ? <p className="auth-success">{cartMessage}</p> : null}
            {!available ? (
              <p className="shelf-sold">This company is no longer available.</p>
            ) : (
              <>
                <button type="button" className="btn btn-outline-light btn-block" onClick={addToCart}>
                  Add to cart
                </button>
                <button type="button" className="btn btn-primary btn-block" disabled={busy} onClick={reserve}>
                  {busy ? 'Reserving...' : 'Reserve this company'}
                </button>
              </>
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
