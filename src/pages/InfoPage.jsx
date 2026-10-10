import Reveal from '../components/Reveal.jsx'
import { Navigate, Link, useParams } from 'react-router-dom'
import { informationGuides } from '../data/content.js'
import useWebsitePage from '../hooks/useWebsitePage.js'
import usePageMeta from '../hooks/usePageMeta.js'

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function InfoPage() {
  const { slug } = useParams()
  const guide = informationGuides.find((g) => g.id === slug)
  const { page, content, loading } = useWebsitePage(slug ? `info-${slug}` : '')

  const title = page?.title || guide?.title
  const text = content?.text || guide?.text || ''
  const helpTitle = content?.helpTitle || 'Need help?'
  const helpText =
    content?.helpText ||
    "If you want a company formation agent to handle the process and related admin for you, contact us and we'll guide you through the next steps."
  const helpCtaLabel = content?.helpCtaLabel || 'Get in touch'
  const helpCtaTo = content?.helpCtaTo || '/contact'

  usePageMeta(
    title ? `${title} | UK.company` : 'Information | UK.company',
    text || 'UK.company information guide.',
    slug ? `/info/${slug}` : '/info'
  )

  if (!guide && !page && !loading) return <Navigate to="/" replace />
  if (!title && !loading) return <Navigate to="/" replace />

  return (
    <>
      <section className="formation-hero">
        <div className="container formation-hero-inner">
          <Reveal variant="top">
            <nav className="formation-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Information</span>
              <span aria-hidden="true">/</span>
              <span>{title}</span>
            </nav>
            <p className="section-label">Information</p>
            <h1>{title}</h1>
            <p className="formation-hero-lead">{text}</p>
          </Reveal>
        </div>
      </section>

      <section className="formation-content">
        <div className="container formation-content-inner">
          <Reveal variant="bottom">
            <div className="formation-content-block">
              <h2>About this guide</h2>
              <p>{text}</p>
            </div>
          </Reveal>

          <Reveal delay={80} variant="bottom">
            <div className="formation-cta-inner formation-content-block">
              <h2>{helpTitle}</h2>
              <p>{helpText}</p>
              <div className="hero-actions">
                <Link to={helpCtaTo} className="btn btn-primary btn-lg">
                  {helpCtaLabel} <Arrow />
                </Link>
                <Link to="/#services" className="btn btn-outline btn-lg">
                  View services <Arrow />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
