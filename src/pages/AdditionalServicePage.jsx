import { useEffect, useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import { getAdditionalServicePage } from '../data/additionalServicePages.js'

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M20 6L9 17l-5-5" stroke="#60a5fa" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function AdditionalServicePage() {
  const { slug } = useParams()
  const page = getAdditionalServicePage(slug)

  const content = useMemo(() => page?.contentSections ?? [], [page])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!page) return <Navigate to="/" replace />

  return (
    <>
      <section className="formation-hero">
        <div className="container formation-hero-inner">
          <Reveal variant="top">
            <nav className="formation-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Additional Services</span>
              <span aria-hidden="true">/</span>
              <span>{page.title}</span>
            </nav>
            <p className="section-label">Additional Services</p>
            <h1>{page.title}</h1>
            <div className="formation-hero-price">{page.priceDisplay}</div>
            <p className="formation-hero-lead">{page.shortDescription}</p>
          </Reveal>
        </div>
      </section>

      <section className="formation-order">
        <div className="container formation-order-grid">
          <div className="formation-services">
            <Reveal variant="left">
              <div className="formation-order-intro">
                <h2>{page.subtitle}</h2>
                <p>{page.shortDescription}</p>
              </div>
            </Reveal>

            <div className="formation-service-list">
              <Reveal variant="popup">
                <article className="formation-service-card formation-service-card--selected">
                  <div className="formation-service-head">
                    <div>
                      <h3>{page.title}</h3>
                      <span className="formation-service-price">{page.priceDisplay}</span>
                    </div>
                    <span className="formation-badge">Selected</span>
                  </div>
                  <p>{page.shortDescription}</p>
                </article>
              </Reveal>
            </div>
          </div>

          <aside className="formation-summary">
            <Reveal variant="right" delay={100}>
              <div className="formation-summary-card">
                <p className="formation-summary-kicker">Summary</p>
                <dl className="formation-summary-rows">
                  <div>
                    <dt>Charge for service</dt>
                    <dd>{page.priceDisplay}</dd>
                  </div>
                </dl>
                <div className="formation-summary-total">
                  <span>Total order</span>
                  <strong>{page.priceDisplay}</strong>
                </div>
                <a href="/contact" className="btn btn-primary btn-block">
                  Save &amp; Continue <Arrow />
                </a>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="formation-content">
        <div className="container formation-content-inner">
          {content.map((section, i) => (
            <Reveal key={`${section.title}-${i}`} delay={i * 60} variant="bottom">
              <div className="formation-content-block">
                <h2>{section.title}</h2>
                {section.paragraphs?.map((para) => (
                  <p key={para}>{para}</p>
                ))}
                {section.bullets?.length ? (
                  <ul className="check-list">
                    {section.bullets.map((b) => (
                      <li key={b}>
                        <Check /> {b}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {section.subsections?.map((sub) => (
                  <div key={sub.heading} className="formation-subsection">
                    <h3>{sub.heading}</h3>
                    {sub.text ? <p>{sub.text}</p> : null}
                    {sub.paragraphs?.map((p) => <p key={p}>{p}</p>)}
                    {sub.bullets?.length ? (
                      <ul className="check-list">
                        {sub.bullets.map((b) => (
                          <li key={b}>
                            <Check /> {b}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="formation-cta">
        <div className="container formation-cta-inner">
          <Reveal variant="popup">
            <h2>Ready to order?</h2>
            <p>
              Start with a clear scope and transparent pricing. Our team will guide you through the next steps and
              required information.
            </p>
            <div className="hero-actions">
              <a href="/contact" className="btn btn-primary btn-lg">
                Save &amp; Continue <Arrow />
              </a>
              <Link to="/#services" className="btn btn-outline btn-lg">
                View services <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

