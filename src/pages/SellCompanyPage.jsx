import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import ProductContactForm from '../components/ProductContactForm.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

export default function SellCompanyPage() {
  usePageMeta(
    'Sell your Existing UK Company | UK.company',
    'Sell your existing UK limited company to UK.company. We are Companies House and HMRC regulated (ACSP). Tell us about your company and we may make an offer.',
    '/sell'
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
              <span>Sell your company</span>
            </nav>
            <p className="section-label">Key product</p>
            <h1>Sell your Existing Company to us</h1>
            <p className="formation-hero-lead">
              Thinking of selling your UK limited company? Tell us about the company and we will
              review whether we can make an offer. We are Companies House and HMRC regulated (ACSP).
            </p>
            <div className="hero-actions" style={{ marginTop: 20 }}>
              <a href="#sell-enquiry" className="btn btn-primary btn-lg">
                Start an enquiry
              </a>
              <Link to="/companies-for-sale" className="btn btn-outline-light btn-lg">
                Buy a company instead
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="product-hub-section">
        <div className="container product-hub-grid">
          <Reveal variant="left">
            <h2>What we look for</h2>
            <p>
              We buy selected UK limited companies - dormant or trading - subject to due diligence.
              Clean filings, clear ownership, and honest disclosure of debts or Bounce Back Loans
              help us move faster.
            </p>
            <ul className="check-list">
              <li>Company name and Companies House number</li>
              <li>Whether the company has traded or is dormant</li>
              <li>Any known debts, Bounce Back Loans, or filings outstanding</li>
              <li>Your preferred contact email and phone</li>
            </ul>
            <p>
              Any purchase is subject to identity checks, agreement on terms, and confirmation that
              the company can be transferred lawfully.
            </p>
            <p>
              Related:{' '}
              <Link to="/bbl">Bounce Back Loans (BBL)</Link> ·{' '}
              <Link to="/buy">Buy / sell company hub</Link>
            </p>
          </Reveal>

          <Reveal variant="right" delay={120}>
            <div className="product-hub-card" id="sell-enquiry">
              <h2>Enquiry form</h2>
              <p>Send details and we will reply as soon as we can.</p>
              <ProductContactForm
                subjectPrefix="Sell company enquiry"
                companyLabel="Company name / number"
                submitLabel="Submit sell enquiry"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
