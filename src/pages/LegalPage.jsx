import { useEffect } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import { getLegalPage } from '../data/legalPages.js'
import usePageMeta from '../hooks/usePageMeta.js'
import useWebsitePage from '../hooks/useWebsitePage.js'

export default function LegalPage() {
  const { pathname } = useLocation()
  const slug = pathname.replace(/^\//, '')
  const local = getLegalPage(slug)
  const { page, content } = useWebsitePage(slug)

  const title = page?.title || local?.title
  const updated = content?.updated || local?.updated
  const metaDescription = page?.metaDescription || local?.metaDescription
  const sections = content?.sections?.length ? content.sections : local?.sections || []

  usePageMeta(
    title ? `${title} | UK.company` : 'Legal | UK.company',
    metaDescription || 'Legal information for UK.company.',
    title ? `/${slug}` : '/privacy'
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!local && !page) return <Navigate to="/privacy" replace />
  if (!title) return <Navigate to="/privacy" replace />

  return (
    <>
      <section className="formation-hero">
        <div className="container formation-hero-inner">
          <Reveal variant="top">
            <nav className="formation-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Legal</span>
              <span aria-hidden="true">/</span>
              <span>{title}</span>
            </nav>
            <p className="section-label">Legal</p>
            <h1>{title}</h1>
            {updated ? <p className="formation-hero-lead">Last updated {updated}</p> : null}
          </Reveal>
        </div>
      </section>

      <section className="product-hub-section">
        <div className="container legal-layout">
          <Reveal variant="left">
            <article className="legal-article">
              {sections.map((section) => (
                <section key={section.heading} className="legal-block">
                  <h2>{section.heading}</h2>
                  {(section.paragraphs || []).map((p) => (
                    <p key={p.slice(0, 48)}>{p}</p>
                  ))}
                </section>
              ))}
            </article>
          </Reveal>
          <aside className="product-hub-card legal-aside">
            <h2>Other policies</h2>
            <ul className="legal-nav-list">
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Use</Link>
              </li>
              <li>
                <Link to="/cookies">Cookies Policy</Link>
              </li>
              <li>
                <Link to="/contact">Contact us</Link>
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  )
}
