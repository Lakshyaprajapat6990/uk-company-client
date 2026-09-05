import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import ProductContactForm from '../components/ProductContactForm.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

export default function ContactPage() {
  usePageMeta(
    'Contact UK.company | Phone, Email & Enquiry Form',
    'Contact UK.company by phone or email. Local 0333-444-2222, international +44 333-444-2222, or info@uk.company. Send an enquiry and we will get back to you.',
    '/contact'
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
              <span>Contact</span>
            </nav>
            <p className="section-label">Get in touch</p>
            <h1>Contact us</h1>
            <p className="formation-hero-lead">
              Questions about formations, ready-made companies, ID verification or VAT? Call, email,
              or send the form below - we are Companies House and HMRC regulated (ACSP).
            </p>
          </Reveal>
        </div>
      </section>

      <section className="product-hub-section">
        <div className="container product-hub-grid">
          <Reveal variant="left">
            <h2>Phone &amp; email</h2>
            <div className="contact-detail-list">
              <a href="tel:03334442222" className="contact-detail-card">
                <span className="contact-detail-label">Local</span>
                <strong>0333-444-2222</strong>
              </a>
              <a href="tel:+443334442222" className="contact-detail-card">
                <span className="contact-detail-label">International</span>
                <strong>+44 333-444-2222</strong>
              </a>
              <a href="mailto:info@uk.company" className="contact-detail-card">
                <span className="contact-detail-label">Email</span>
                <strong>info@uk.company</strong>
              </a>
            </div>

            <h2 style={{ marginTop: 28 }}>Office</h2>
            <p>
              27 Old Gloucester Street
              <br />
              London, WC1N 3AX
              <br />
              United Kingdom
            </p>
            <p>
              Looking for a specific service?{' '}
              <Link to="/formations">Formations</Link> · <Link to="/buy">Buy a company</Link> ·{' '}
              <Link to="/id-verification">ID Verification</Link> · <Link to="/vat">VAT</Link>
            </p>
          </Reveal>

          <Reveal variant="right" delay={120}>
            <div className="product-hub-card" id="contact-form">
              <h2>Enquiry form</h2>
              <p>Fill in your details and we will reply as soon as we can.</p>
              <ProductContactForm
                subjectPrefix="Website contact"
                companyLabel="Company / topic (optional)"
                submitLabel="Send message"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
