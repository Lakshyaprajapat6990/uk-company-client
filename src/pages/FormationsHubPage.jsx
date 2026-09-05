import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import ProductContactForm from '../components/ProductContactForm.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

const packs = [
  {
    title: 'Limited Company',
    text: 'Most common UK private limited company formation. Companies House fee included.',
    to: '/formation/ltd-or-private-limited-company-formation-in-uk',
    price: 'From £107',
  },
  {
    title: 'Non-UK Residents LTD',
    text: 'Form a UK company from overseas with a London registered office included.',
    to: '/formation/ltd-companies-for-non-uk-residents',
    price: 'From £163',
  },
  {
    title: 'LTD + VAT package',
    text: 'Formation with VAT registration support as a package option.',
    to: '/formation/ltd-company-with-vat-registration',
    price: 'See package',
  },
]

export default function FormationsHubPage() {
  usePageMeta(
    'UK Company Formations | UK.company',
    'Form a new UK limited company online with UK.company. ACSP-supported formations, non-UK resident packs, VAT options and clear pricing from £107.',
    '/formations'
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
              <span>UK Company Formations</span>
            </nav>
            <p className="section-label">Key product hub</p>
            <h1>UK Company Formations</h1>
            <p className="formation-hero-lead">
              Form a new UK company online. We are an Authorised Corporate Service Provider (ACSP)
              - you provide details and ID, we handle the Companies House filing.
            </p>
            <div className="hero-actions" style={{ marginTop: 20 }}>
              <Link
                to="/formation/ltd-or-private-limited-company-formation-in-uk"
                className="btn btn-primary btn-lg"
              >
                Start LTD formation
              </Link>
              <Link to="/international" className="btn btn-outline-light btn-lg">
                Non-UK / International
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="product-hub-section">
        <div className="container">
          <Reveal variant="top">
            <h2 className="center-title">Popular formation packages</h2>
            <p className="prices-lead">
              Pick a pack, complete company details and identity checks, then we process the order.
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
          <Reveal className="product-hub-cta-row" variant="bottom" delay={160}>
            <Link to="/id-verification" className="btn btn-outline">
              ID Verification
            </Link>
            <Link to="/companies-for-sale" className="btn btn-outline">
              Prefer a ready-made company?
            </Link>
            <Link to="/vat" className="btn btn-outline">
              VAT applications
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="product-hub-section product-hub-section--alt">
        <div className="container product-hub-grid">
          <Reveal variant="left">
            <h2>How formation works with us</h2>
            <ol className="product-steps">
              <li>Choose a formation package</li>
              <li>Enter directors, shareholders, SIC codes and addresses</li>
              <li>Complete ID verification for directors and PSCs</li>
              <li>We file with Companies House as your ACSP</li>
              <li>Receive your company documents when incorporation completes</li>
            </ol>
            <p>
              Need a London address or mail handling? See{' '}
              <Link to="/myukpost">MyUKPost.com</Link>. Looking to buy an existing company instead?{' '}
              <Link to="/buy">Buy company hub</Link>.
            </p>
          </Reveal>
          <Reveal variant="right" delay={120}>
            <div className="product-hub-card">
              <h2>Formation enquiry</h2>
              <p>Questions before you start? Send a short note.</p>
              <ProductContactForm
                subjectPrefix="Formation enquiry"
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
