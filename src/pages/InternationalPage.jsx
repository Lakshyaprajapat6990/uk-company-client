import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import ProductContactForm from '../components/ProductContactForm.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

const packs = [
  {
    title: 'LTD for Non-UK Residents',
    text: 'Form a UK limited company with a central London registered office included. No UK nationals required.',
    to: '/formation/ltd-companies-for-non-uk-residents',
    price: 'From £163',
  },
  {
    title: 'LLP for Non-UK Residents',
    text: 'Limited liability partnership formation pack designed for founders outside the UK.',
    to: '/formation/llp-companies-for-non-uk-residents',
    price: 'See package',
  },
  {
    title: 'Standard Limited Company',
    text: 'If you are already in the UK or have UK officers, start with our core LTD formation.',
    to: '/formation/ltd-or-private-limited-company-formation-in-uk',
    price: 'From £107',
  },
]

export default function InternationalPage() {
  usePageMeta(
    'International & Non-UK Company Formation | UK.company',
    'Form a UK company as a non-UK resident. London registered office included, ACSP support, ID verification, and clear packages for overseas founders.',
    '/international'
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
              <span>International</span>
            </nav>
            <p className="section-label">International formations</p>
            <h1>International &amp; Non-UK Residents</h1>
            <p className="formation-hero-lead">
              Non-UK residents can form a UK company. You need a UK registered office address -
              included in our non-UK packs - and identity verification for directors and PSCs.
            </p>
            <div className="hero-actions" style={{ marginTop: 20 }}>
              <Link
                to="/formation/ltd-companies-for-non-uk-residents"
                className="btn btn-primary btn-lg"
              >
                Non-UK LTD package
              </Link>
              <Link to="/id-verification" className="btn btn-outline-light btn-lg">
                ID Verification
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="product-hub-section">
        <div className="container">
          <Reveal variant="top">
            <h2 className="center-title">Packages for overseas founders</h2>
            <p className="prices-lead">
              Pick a formation pack, complete details and ID, and we handle the Companies House
              filing as your ACSP agent.
            </p>
          </Reveal>
          <div className="product-hub-cards-row product-hub-cards-row--3">
            {packs.map((pack, i) => (
              <Reveal key={pack.to} variant="popup" delay={i * 80}>
                <article className="product-hub-card product-hub-card--link">
                  <p className="section-label">{pack.price}</p>
                  <h2>{pack.title}</h2>
                  <p>{pack.text}</p>
                  <Link to={pack.to} className="btn btn-primary">
                    View package
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="product-hub-section product-hub-section--alt">
        <div className="container product-hub-grid">
          <Reveal variant="left">
            <h2>What non-UK founders should know</h2>
            <ul className="check-list">
              <li>A UK registered office is required - our London address packs include this</li>
              <li>Identity verification applies to directors and PSCs</li>
              <li>Traditional UK high-street banks can be harder from overseas; fintech options exist</li>
              <li>VAT registration for non-residents often needs a UK VAT agent</li>
            </ul>
            <p>
              Also see:{' '}
              <Link to="/info/bank-non-uk">Bank options for non-UK residents</Link> ·{' '}
              <Link to="/myukpost">MyUKPost mail &amp; address</Link> ·{' '}
              <Link to="/vat">VAT applications</Link>
            </p>
          </Reveal>

          <Reveal variant="right" delay={120}>
            <div className="product-hub-card" id="intl-enquiry">
              <h2>International enquiry</h2>
              <p>Tell us where you are based and which structure you need.</p>
              <ProductContactForm
                subjectPrefix="International formation enquiry"
                companyLabel="Proposed company name (optional)"
                submitLabel="Submit enquiry"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
