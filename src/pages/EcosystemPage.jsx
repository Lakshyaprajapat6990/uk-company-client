import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

const sites = [
  {
    name: 'UK.company',
    role: 'Core product site (this project)',
    points: [
      'Company formations, companies for sale, ID verification, VAT',
      'Customer portal, cart, admin CMS demo',
      'ACSP-regulated process: details → ID → file / transfer',
    ],
  },
  {
    name: 'MyUKPost.com',
    role: 'Sister site - address & mail',
    points: [
      'London registered office, virtual address, mail forwarding',
      'Checkout for address products lives on MyUKPost',
      'Linked from UK.company via /myukpost handoff',
    ],
  },
  {
    name: 'Scan.agency',
    role: 'Later / out of UK.company core',
    points: ['Documented for Nick’s ecosystem - not built in this phase'],
  },
  {
    name: 'DavenportHouse',
    role: 'Later / out of UK.company core',
    points: ['Documented for Nick’s ecosystem - not built in this phase'],
  },
]

export default function EcosystemPage() {
  usePageMeta(
    'UK.company ecosystem | MyUKPost & sister sites',
    'What lives on UK.company versus MyUKPost.com and later sister projects such as Scan.agency and DavenportHouse.',
    '/ecosystem'
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
              <span>Ecosystem</span>
            </nav>
            <p className="section-label">Phase 4 notes</p>
            <h1>UK.company &amp; sister sites</h1>
            <p className="formation-hero-lead">
              Clear split of what this site owns versus MyUKPost.com and future brands - so we do not
              rebuild the wrong product twice.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="product-hub-section">
        <div className="container">
          <div className="product-hub-cards-row">
            {sites.map((site, i) => (
              <Reveal key={site.name} variant="popup" delay={i * 60}>
                <article className="product-hub-card">
                  <p className="section-label">{site.role}</p>
                  <h2>{site.name}</h2>
                  <ul className="check-list">
                    {site.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="product-hub-cta-row" variant="bottom" delay={200}>
            <Link to="/myukpost" className="btn btn-primary">
              MyUKPost handoff
            </Link>
            <Link to="/admin" className="btn btn-outline">
              Admin CMS
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Contact
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
