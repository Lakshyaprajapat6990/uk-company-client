import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import ProductContactForm from '../components/ProductContactForm.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

export default function BuyCompanyPage() {
  usePageMeta(
    'Buy or Sell a UK Company | UK.company',
    'Buy a ready-made UK company from UK.company, or sell your existing limited company to us. We acquire selected companies from the public. Reserve first, complete ID checks, then transfer.',
    '/buy'
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <section className="formation-hero">
        <div className="container formation-hero-inner">
          <Reveal variant="top">
            <nav className="formation-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link to="/buy">Key Products</Link>
              <span aria-hidden="true">/</span>
              <span>Buy a company</span>
            </nav>
            <p className="section-label">Key product hub · Buy.UK.Company</p>
            <h1>Buy an Existing Company</h1>
            <p className="formation-hero-lead">
              Two routes, one place: buy a ready-made company from our list, or sell your UK
              limited company to us. We are Companies House and HMRC regulated - identity checks
              come before any transfer.
            </p>
            <div className="hero-actions" style={{ marginTop: 20 }}>
              <Link to="/companies-for-sale" className="btn btn-primary btn-lg">
                View companies for sale
              </Link>
              <a href="#we-buy" className="btn btn-outline-light btn-lg">
                We buy companies
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="product-hub-section">
        <div className="container">
          <div className="product-hub-cards-row">
            <Reveal variant="popup">
              <article className="product-hub-card product-hub-card--link">
                <p className="section-label">From us</p>
                <h2>Buy a ready-made company</h2>
                <p>
                  Reserve a listed company, upload ID for directors and PSCs, then receive a
                  proforma invoice after checks. Payment is taken after approval - not at
                  reservation.
                </p>
                <ul className="check-list">
                  <li>Companies from £595</li>
                  <li>Reserve → ID → proforma → transfer</li>
                  <li>ACSP-supported identity process</li>
                </ul>
                <Link to="/companies-for-sale" className="btn btn-primary">
                  Browse companies for sale
                </Link>
              </article>
            </Reveal>

            <Reveal variant="popup" delay={100}>
              <article className="product-hub-card product-hub-card--link" id="we-buy">
                <p className="section-label">We acquire from the public</p>
                <h2>Sell your company to us</h2>
                <p>
                  We buy selected UK limited companies from owners who want to exit. Tell us the
                  company details - including any Bounce Back Loans - and we will review whether we
                  can make an offer.
                </p>
                <ul className="check-list">
                  <li>Dormant or trading companies considered</li>
                  <li>Disclose debts and Bounce Back Loans</li>
                  <li>Subject to due diligence and agreement</li>
                </ul>
                <Link to="/sell" className="btn btn-primary">
                  Start sell enquiry
                </Link>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="product-hub-section product-hub-section--alt">
        <div className="container product-hub-grid">
          <Reveal variant="left">
            <h2>How buying from us works</h2>
            <ol className="product-steps">
              <li>Choose a company from the sale list and reserve it</li>
              <li>Provide director / PSC details and upload photo ID + proof of address</li>
              <li>We complete AML / Companies House identity checks</li>
              <li>We send a proforma invoice with bank details</li>
              <li>After payment, we transfer officers and send Auth codes / UTR where applicable</li>
            </ol>
            <p>
              Need verification help first? See{' '}
              <Link to="/id-verification">ID Verification</Link>. Prefer a brand-new company?{' '}
              <Link to="/formations">UK Company Formations</Link>. BBL-related company?{' '}
              <Link to="/bbl">Bounce Back Loans</Link>.
            </p>
          </Reveal>

          <Reveal variant="right" delay={120}>
            <div className="product-hub-card" id="buy-enquiry">
              <h2>Business contact</h2>
              <p>
                General buy or sell enquiry - company name, what you want, and how we can reach you.
              </p>
              <ProductContactForm
                subjectPrefix="Buy/Sell business enquiry"
                companyLabel="Company name / number"
                submitLabel="Send business enquiry"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
