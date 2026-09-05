import Reveal from '../components/Reveal.jsx'
import { Navigate, Link, useParams } from 'react-router-dom'
import { informationGuides } from '../data/content.js'

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function InfoPage() {
  const { slug } = useParams()
  const guide = informationGuides.find((g) => g.id === slug)

  if (!guide) return <Navigate to="/" replace />

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
              <span>{guide.title}</span>
            </nav>
            <p className="section-label">Information</p>
            <h1>{guide.title}</h1>
            <p className="formation-hero-lead">{guide.text}</p>
          </Reveal>
        </div>
      </section>

      <section className="formation-content">
        <div className="container formation-content-inner">
          <Reveal variant="bottom">
            <div className="formation-content-block">
              <h2>About this guide</h2>
              <p>{guide.text}</p>
            </div>
          </Reveal>

          <Reveal delay={80} variant="bottom">
            <div className="formation-cta-inner formation-content-block">
              <h2>Need help?</h2>
              <p>
                If you want a company formation agent to handle the process and related admin for you, contact
                us and we&apos;ll guide you through the next steps.
              </p>
              <div className="hero-actions">
                <a href="/contact" className="btn btn-primary btn-lg">
                  Get in touch <Arrow />
                </a>
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

