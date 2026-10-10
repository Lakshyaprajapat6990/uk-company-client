import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import ProductContactForm from './ProductContactForm.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import useWebsitePage from '../hooks/useWebsitePage.js'

function isExternal(to = '') {
  return /^https?:\/\//i.test(to)
}

function Cta({ to, className, children }) {
  if (!to) return null
  if (isExternal(to)) {
    return (
      <a href={to} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  if (to.startsWith('#')) {
    return (
      <a href={to} className={className}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  )
}

/**
 * Renders a CMS hub/product page with local fallbacks.
 * fallback: { title, metaDescription, path, sectionLabel, heroTitle, heroLead, ... }
 */
export default function CmsHubPage({ slug, fallback = {}, showContactForm = false, contactSubject }) {
  const { page, content, loading } = useWebsitePage(slug)
  const c = { ...fallback, ...(content || {}) }
  const title = page?.title || fallback.title || c.heroTitle || 'UK.company'
  const meta = page?.metaDescription || fallback.metaDescription || ''
  const path = page?.path || fallback.path || `/${slug}`

  usePageMeta(`${title} | UK.company`, meta, path)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const packs = Array.isArray(c.packs) ? c.packs : []
  const bullets = Array.isArray(c.bullets) ? c.bullets : []

  return (
    <>
      <section className="formation-hero">
        <div className="container formation-hero-inner">
          <Reveal variant="top">
            <nav className="formation-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>{c.sectionLabel || title}</span>
            </nav>
            {c.sectionLabel ? <p className="section-label">{c.sectionLabel}</p> : null}
            <h1>{c.heroTitle || title}</h1>
            {c.heroLead ? <p className="formation-hero-lead">{c.heroLead}</p> : null}
            {(c.primaryCtaLabel && c.primaryCtaTo) || (c.secondaryCtaLabel && c.secondaryCtaTo) ? (
              <div className="hero-actions" style={{ marginTop: 20 }}>
                {c.primaryCtaLabel && c.primaryCtaTo ? (
                  <Cta to={c.primaryCtaTo} className="btn btn-primary btn-lg">
                    {c.primaryCtaLabel}
                  </Cta>
                ) : null}
                {c.secondaryCtaLabel && c.secondaryCtaTo ? (
                  <Cta to={c.secondaryCtaTo} className="btn btn-outline-light btn-lg">
                    {c.secondaryCtaLabel}
                  </Cta>
                ) : null}
              </div>
            ) : null}
          </Reveal>
        </div>
      </section>

      {loading && !content ? (
        <section className="product-hub-section">
          <div className="container">
            <p>Loading page…</p>
          </div>
        </section>
      ) : null}

      {packs.length ? (
        <section className="product-hub-section">
          <div className="container">
            <Reveal variant="top">
              {c.packsTitle ? <h2 className="center-title">{c.packsTitle}</h2> : null}
              {c.packsLead ? <p className="prices-lead">{c.packsLead}</p> : null}
            </Reveal>
            <div
              className={`product-hub-cards-row product-hub-cards-row--${Math.min(packs.length, 3)}`}
            >
              {packs.map((pack) => (
                <Reveal key={`${pack.title}-${pack.to}`} variant="bottom">
                  <article className="product-hub-card">
                    <h3>{pack.title}</h3>
                    <p>{pack.text}</p>
                    {pack.price ? <p className="product-hub-price">{pack.price}</p> : null}
                    {pack.to ? (
                      <Cta to={pack.to} className="btn btn-outline">
                        View
                      </Cta>
                    ) : null}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {c.bodyTitle || c.bodyHtml || bullets.length || showContactForm ? (
        <section className="product-hub-section">
          <div className={`container ${showContactForm ? 'product-hub-grid' : ''}`}>
            <Reveal variant="left">
              {c.bodyTitle ? <h2>{c.bodyTitle}</h2> : null}
              {c.bodyHtml
                ? String(c.bodyHtml)
                    .split(/\n{2,}/)
                    .map((block) => (
                      <p key={block.slice(0, 40)} style={{ whiteSpace: 'pre-line' }}>
                        {block}
                      </p>
                    ))
                : null}
              {bullets.length ? (
                <ul className="check-list">
                  {bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
              {slug === 'contact' ? (
                <div className="contact-detail-list" style={{ marginTop: 16 }}>
                  {c.phoneLocal ? (
                    <a href={`tel:${String(c.phoneLocal).replace(/\D/g, '')}`} className="contact-detail-card">
                      <span className="contact-detail-label">Local</span>
                      <strong>{c.phoneLocal}</strong>
                    </a>
                  ) : null}
                  {c.phoneIntl ? (
                    <a href={`tel:${String(c.phoneIntl).replace(/\s/g, '')}`} className="contact-detail-card">
                      <span className="contact-detail-label">International</span>
                      <strong>{c.phoneIntl}</strong>
                    </a>
                  ) : null}
                  {c.email ? (
                    <a href={`mailto:${c.email}`} className="contact-detail-card">
                      <span className="contact-detail-label">Email</span>
                      <strong>{c.email}</strong>
                    </a>
                  ) : null}
                </div>
              ) : null}
              {c.officeAddress ? (
                <>
                  <h2 style={{ marginTop: 28 }}>Office</h2>
                  <p style={{ whiteSpace: 'pre-line' }}>{c.officeAddress}</p>
                </>
              ) : null}
            </Reveal>

            {showContactForm ? (
              <Reveal variant="right" delay={120}>
                <div className="product-hub-card" id={fallback.formAnchor || 'enquiry'}>
                  <h2>{c.formTitle || 'Enquiry form'}</h2>
                  <p>{c.formLead || 'Fill in your details and we will reply as soon as we can.'}</p>
                  <ProductContactForm
                    subjectPrefix={contactSubject || title}
                    companyLabel="Company / topic (optional)"
                    submitLabel="Send message"
                  />
                </div>
              </Reveal>
            ) : null}
          </div>
        </section>
      ) : null}
    </>
  )
}
