import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

const services = [
  {
    title: 'London registered office',
    text: 'Use a prestigious London address as your Companies House registered office.',
  },
  {
    title: 'Virtual address & mail forwarding',
    text: 'Receive business post digitally or forwarded - useful for UK and non-UK founders.',
  },
  {
    title: 'Works with UK.company formations',
    text: 'Pair mail and address services with new formations or ready-made company transfers.',
  },
]

export default function MyUkPostPage() {
  usePageMeta(
    'MyUKPost.com - London Mail & Virtual Address | UK.company',
    'MyUKPost.com provides London registered office, virtual address and mail forwarding. Owned by Nick Davenport - sister service to UK.company.',
    '/myukpost'
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
              <span>MyUKPost.com</span>
            </nav>
            <p className="section-label">Key product · Partner site</p>
            <h1>MyUKPost.com</h1>
            <p className="formation-hero-lead">
              London mail handling, virtual address and registered office services. MyUKPost.com is
              our sister site - use it when you need a professional UK address and post handling
              alongside your company.
            </p>
            <div className="hero-actions" style={{ marginTop: 20 }}>
              <a
                href="https://myukpost.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                Visit MyUKPost.com
              </a>
              <Link
                to="/formation/ltd-companies-for-non-uk-residents"
                className="btn btn-outline-light btn-lg"
              >
                Non-UK formation packs
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="product-hub-section">
        <div className="container">
          <Reveal variant="top">
            <h2 className="center-title">What MyUKPost is for</h2>
            <p className="prices-lead">
              Address and mail services live on MyUKPost.com. Company formation, ready-made
              companies and ID verification stay on UK.company.
            </p>
          </Reveal>
          <div className="product-hub-cards-row product-hub-cards-row--3">
            {services.map((item, i) => (
              <Reveal key={item.title} variant="popup" delay={i * 80}>
                <article className="product-hub-card">
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="product-hub-cta-row" variant="bottom" delay={160}>
            <a
              href="https://myukpost.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              Continue to MyUKPost.com
            </a>
            <Link to="/international" className="btn btn-outline">
              International formations
            </Link>
            <Link to="/companies-for-sale" className="btn btn-outline">
              Companies for sale
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="product-hub-section product-hub-section--alt" id="checkout-handoff">
        <div className="container product-hub-grid">
          <Reveal variant="left">
            <h2>Checkout handoff</h2>
            <p>
              Address and mail products are sold on MyUKPost.com. When you need a registered office
              or mail service with your UK company, finish company setup here, then continue to
              MyUKPost to complete address checkout.
            </p>
            <ol className="product-steps">
              <li>Form or reserve your company on UK.company</li>
              <li>Complete identity checks in your UK.company portal</li>
              <li>Open MyUKPost.com to choose registered office / mail options</li>
              <li>Complete payment for address services on MyUKPost</li>
            </ol>
            <p>
              Your UK.company login is separate from any MyUKPost client account until Nick confirms
              a single sign-on handoff.
            </p>
          </Reveal>
          <Reveal variant="right" delay={100}>
            <div className="product-hub-card">
              <h2>Ready for address services?</h2>
              <p>Continue to the sister site to browse and checkout mail / address products.</p>
              <a
                href="https://myukpost.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-block"
              >
                Go to MyUKPost checkout
              </a>
              <Link to="/ecosystem" className="btn btn-outline btn-block" style={{ marginTop: 10 }}>
                See full ecosystem map
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
