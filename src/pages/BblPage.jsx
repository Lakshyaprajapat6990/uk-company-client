import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import ProductContactForm from '../components/ProductContactForm.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

export default function BblPage() {
  usePageMeta(
    'Bounce Back Loans (BBL) Company Help | UK.company',
    'Guidance and contact for UK companies with Bounce Back Loans (BBL). Tell UK.company about your situation - we are Companies House and HMRC regulated.',
    '/bbl'
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
              <span>Bounce Back Loans</span>
            </nav>
            <p className="section-label">Specialist page</p>
            <h1>Bounce Back Loans (BBL)</h1>
            <p className="formation-hero-lead">
              Many UK companies still carry Bounce Back Loan balances. If you are selling a company,
              buying a ready-made company, or need to discuss BBL-related transfer issues, contact
              us with clear details - we cannot advise on every case without reviewing the facts.
            </p>
            <div className="hero-actions" style={{ marginTop: 20 }}>
              <a href="#bbl-enquiry" className="btn btn-primary btn-lg">
                Contact about BBL
              </a>
              <Link to="/sell" className="btn btn-outline-light btn-lg">
                Sell your company
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="product-hub-section">
        <div className="container product-hub-grid">
          <Reveal variant="left">
            <h2>Why BBL matters on transfers</h2>
            <p>
              When a company is bought or sold, outstanding Bounce Back Loans and related
              liabilities must be disclosed. Undisclosed debts can block a transfer or change the
              offer. We treat BBL disclosure as part of due diligence - the same as other debts and
              filings.
            </p>
            <ul className="check-list">
              <li>Tell us if a Bounce Back Loan was taken</li>
              <li>Share outstanding balance and repayment status if known</li>
              <li>Include Companies House number and current officers</li>
              <li>Expect identity checks before any transfer</li>
            </ul>
            <p>
              This page is a contact hub, not financial or legal advice. Official information may
              also be available via{' '}
              <a
                href="https://www.gov.uk/guidance/apply-for-a-coronavirus-bounce-back-loan"
                target="_blank"
                rel="noopener noreferrer"
              >
                GOV.UK Bounce Back Loan guidance
              </a>
              .
            </p>
            <p>
              Related: <Link to="/sell">Sell your company</Link> ·{' '}
              <Link to="/buy">Buy company hub</Link> ·{' '}
              <Link to="/id-verification">ID Verification</Link>
            </p>
          </Reveal>

          <Reveal variant="right" delay={120}>
            <div className="product-hub-card" id="bbl-enquiry">
              <h2>BBL enquiry</h2>
              <p>Summarise the company and BBL situation in the comments box.</p>
              <ProductContactForm
                subjectPrefix="BBL enquiry"
                companyLabel="Company name / number"
                submitLabel="Submit BBL enquiry"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
