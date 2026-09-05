import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import ProductContactForm from '../components/ProductContactForm.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

export default function IdVerificationPage() {
  usePageMeta(
    'Companies House ID Verification | UK.company',
    'Companies House identity verification for UK directors, shareholders and persons of significant control. ACSP-supported ID checks for formations and company transfers.',
    '/id-verification'
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
              <span>Key Products</span>
              <span aria-hidden="true">/</span>
              <span>ID Verification</span>
            </nav>
            <p className="section-label">Key product · ID.UK.Company</p>
            <h1>Companies House ID Verification</h1>
            <p className="formation-hero-lead">
              Identity checks for directors, shareholders and persons of significant control (PSCs).
              UK.company is an Authorised Corporate Service Provider (ACSP) and can help you meet
              verification requirements for new formations and ready-made company transfers.
            </p>
            <div className="hero-actions" style={{ marginTop: 20 }}>
              <a href="#id-enquiry" className="btn btn-primary btn-lg">
                Enquire about ID verification
              </a>
              <Link
                to="/additional/digital-id-verification-service"
                className="btn btn-outline-light btn-lg"
              >
                View service details
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="product-hub-section">
        <div className="container product-hub-grid">
          <div>
            <Reveal variant="left">
              <h2>Why ID checks matter</h2>
              <p>
                UK company formation agents must comply with anti-money laundering rules. Identity
                verification is required before we can form a new company or transfer a ready-made
                company to you. We cannot skip checks - even for urgent buyers.
              </p>
            </Reveal>

            <Reveal variant="left" delay={80}>
              <h2>What you typically need</h2>
              <ul className="check-list">
                <li>Photographic ID for each director and PSC</li>
                <li>Proof of address (typically under 3 months old)</li>
                <li>Email address and phone number for each person</li>
                <li>Companies House personal verification code, or our verification service</li>
              </ul>
              <p>
                Official guidance:{' '}
                <a
                  href="https://www.gov.uk/guidance/verify-your-identity-for-companies-house"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GOV.UK Companies House identity verification
                </a>
              </p>
            </Reveal>

            <Reveal variant="left" delay={140}>
              <h2>When we use ID checks</h2>
              <ul className="check-list">
                <li>
                  <Link to="/formation/ltd-or-private-limited-company-formation-in-uk">
                    New UK company formations
                  </Link>
                </li>
                <li>
                  <Link to="/companies-for-sale">Buying a ready-made company</Link> (reserve first,
                  transfer after approval)
                </li>
                <li>Officer or PSC changes on companies we manage</li>
              </ul>
            </Reveal>
          </div>

          <Reveal variant="right" delay={120}>
            <div className="product-hub-card" id="id-enquiry">
              <h2>ID verification enquiry</h2>
              <p>Tell us how many people need verifying and which company it relates to.</p>
              <ProductContactForm
                subjectPrefix="ID Verification enquiry"
                companyLabel="Company name (if known)"
                submitLabel="Submit ID enquiry"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
