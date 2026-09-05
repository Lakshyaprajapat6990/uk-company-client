import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import { formationAddons, getFormationPage } from '../data/formationPages.js'
import usePageMeta from '../hooks/usePageMeta.js'

const vatAddon = formationAddons.find((a) => a.id === 'vat-registration')
const vatPackage = getFormationPage('ltd-company-with-vat-registration')

export default function VatPage() {
  usePageMeta(
    'VAT Registration Applications | UK.company',
    'UK VAT registration packages and add-ons from UK.company. Add VAT when you form a company, or enquire about registration support. Registration service - not VAT advice.',
    '/vat'
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
              <span>VAT</span>
            </nav>
            <p className="section-label">Key product</p>
            <h1>VAT registration</h1>
            <p className="formation-hero-lead">
              Register a new company for VAT, or add VAT registration to an existing formation
              order. We provide a registration service, not VAT advice.
            </p>
            <div className="hero-actions" style={{ marginTop: 20 }}>
              <Link to="/formations" className="btn btn-outline-light btn-lg">
                Formation packages
              </Link>
              <Link to="/international" className="btn btn-outline-light btn-lg">
                Non-UK founders
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shelf-page">
        <div className="container vat-grid">
          <article className="portal-order-card">
            <div>
              <h2>{vatPackage?.title}</h2>
              <p>{vatPackage?.description}</p>
              <p className="portal-meta">
                Package price <strong>{vatPackage?.priceDisplay}</strong>
              </p>
            </div>
            <Link className="btn btn-primary" to={`/formation/${vatPackage?.slug}`}>
              Order package
            </Link>
          </article>
          <article className="portal-order-card">
            <div>
              <h2>{vatAddon?.title}</h2>
              <p>{vatAddon?.description}</p>
              <p className="portal-meta">
                Add-on price <strong>{vatAddon?.priceDisplay}</strong>
              </p>
            </div>
            <Link className="btn btn-primary" to="/formation/ltd-or-private-limited-company-formation-in-uk">
              Add during formation
            </Link>
          </article>
        </div>
      </section>
    </>
  )
}
