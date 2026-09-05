import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import HeroRotator from '../components/HeroRotator.jsx'
import HeroBackground from '../components/HeroBackground.jsx'
import { getFormationSlugByTitle } from '../data/formationPages.js'
import { keyProducts } from '../data/keyProducts.js'
import { blogPosts } from '../data/blogPosts.js'
import {
  agentBenefits,
  faqs,
  included,
  informationGuides,
  products,
  serviceTabs,
  steps,
  trustPoints,
  whyChoose,
} from '../data/content.js'

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Check = ({ light = false }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M20 6L9 17l-5-5"
      stroke={light ? '#fff' : '#60a5fa'}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ServiceIcon = ({ name }) => {
  if (name === 'finance') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 19V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M4 19h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 15V9M12 15V7M16 15v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }
  if (name === 'consult') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 10a4 4 0 1 1 8 0v1a4 4 0 0 1-8 0v-1Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 19a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 18v2M17 18v2M8 9h8M8 13h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

const newsImages = ['/news-1.jpg', '/news-2.jpg', '/news-3.jpg']

const specialOffers = [
  {
    title: 'Formation from £107',
    text: 'Limited company ready to trade - Companies House fee included.',
    badge: 'Popular',
    to: '/formation/ltd-or-private-limited-company-formation-in-uk',
  },
  {
    title: 'Shelf companies from £595',
    text: 'Buy an existing UK company. Reserve first, pay after ID approval.',
    badge: 'For sale',
    to: '/companies-for-sale',
  },
  {
    title: 'VAT registration from £26',
    text: 'Add VAT registration when you form, or use our VAT service page.',
    badge: 'Add-on',
    to: '/vat',
  },
]

const featuredPlans = [
  {
    name: 'Limited Company',
    desc: 'Most common Companies House registration for medium, small and micro businesses.',
    price: '£107',
    features: ['Ready to trade company', 'Companies House fee included', 'Digital company documents', 'Free admin portal'],
    featured: false,
  },
  {
    name: 'LTD + Registered Office',
    desc: 'Central London registered office with free service addresses for officers and shareholders.',
    price: '£114',
    features: ['Privacy protected address', 'Official post processing', 'Free officer service addresses', 'Lifetime support'],
    featured: true,
  },
  {
    name: 'Non-UK Residents LTD',
    desc: 'Form a UK company with our central London address - no UK nationals required.',
    price: '£163',
    features: ['Central London address included', 'One person can form', 'Ready to trade', 'Lifetime support'],
    featured: false,
  },
]

export default function Home() {
  const [tab, setTab] = useState('ltd')
  const activeProducts = useMemo(() => products[tab] || [], [tab])
  const serviceVariants = ['left', 'popup', 'right']
  const newsVariants = ['bottom', 'float', 'top']

  return (
    <>
      {/* HERO */}
      <section className="hero" aria-label="Welcome">
        <HeroBackground />

        {/* KEY POINTS SINGLE ROW */}
        <div className="hero-key-points-wrap animate-in">
          <div className="container">
            <nav className="hero-key-points-row" aria-label="Key products">
              {keyProducts.map((item) =>
                item.external ? (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-key-point-block"
                  >
                    <span>{item.title}</span>
                  </a>
                ) : (
                  <Link
                    key={item.id}
                    to={item.to}
                    className="hero-key-point-block"
                  >
                    <span>{item.title}</span>
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>

        <div className="container hero-grid">
          <div className="hero-copy animate-in">
            <p className="brand-kicker">
              Welcome to UK.company! Online company formation from <span className="brand-kicker-price">£107</span>
            </p>
            <h1>You run your business. We&apos;ll form your company.</h1>
            <p className="hero-sub">Register a company and apply for a bank account today.</p>
            <div className="hero-actions">
              <Link to="/formation/ltd-or-private-limited-company-formation-in-uk" className="btn btn-primary btn-lg">
                Start formation
              </Link>
              <Link to="/companies-for-sale" className="btn btn-outline-light btn-lg">
                Companies for sale
              </Link>
              <a href="#prices" className="btn btn-outline hero-btn-secondary">
                View packages
              </a>
            </div>
          </div>
          <div className="hero-rotator-wrap animate-in">
            <HeroRotator />
          </div>
        </div>
      </section>

      {/* SPECIAL OFFERS */}
      <section className="offers-section" id="offers">
        <div className="container">
          <Reveal variant="top">
            <p className="section-label center">Special offers</p>
            <h2 className="center-title">Discount packs and rotating deals</h2>
            <p className="prices-lead">
              Clear calls to action - form a new company, reserve a shelf company, or add VAT in one click.
            </p>
          </Reveal>
          <div className="offers-grid">
            {specialOffers.map((offer, i) => (
              <Reveal key={offer.title} delay={i * 100} variant="popup">
                <article className="offer-card">
                  <span className="offer-badge">{offer.badge}</span>
                  <h3>{offer.title}</h3>
                  <p>{offer.text}</p>
                  <Link to={offer.to} className="btn btn-primary">
                    Get this offer
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST / WELCOME */}
      <section className="welcome-section">
        <div className="container welcome-inner">
          <Reveal className="welcome-intro" variant="top">
            <p className="section-label anim-blink-soft">You are welcome</p>
            <h2>Company formation in the UK has never been easier</h2>
            <p className="welcome-lead">
              Pick &amp; mix the services you need - no inflated bundles. Transparent pricing, approved Companies House
              agents, and free lifetime support via your company administration portal.
            </p>
          </Reveal>
          <div className="feature-pair feature-pair--four">
            {trustPoints.map((c, i) => (
              <Reveal key={c.title} delay={i * 100} variant={i % 2 === 0 ? 'left' : 'right'}>
                <article className="feature-card feature-card--dark">
                  <div className="feature-icon anim-float-icon" aria-hidden="true">
                    <ServiceIcon name={i % 2 === 0 ? 'finance' : 'consult'} />
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="welcome-cta" delay={280} variant="popup">
            <a href="tel:03334442222" className="btn btn-outline">
              Call 0333-444-2222
            </a>
            <a href="mailto:info@uk.company" className="btn btn-primary">
              Email us <Arrow />
            </a>
          </Reveal>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="split-section" id="why">
        <div className="container split-row">
          <Reveal className="split-copy" variant="left">
            <p className="section-label">Why choose us</p>
            <h2>Why choose UK.company for your company formation?</h2>
            <p>
              Our team have been supplying address and company formation services since 2011. We are authorised by
              Companies House and keep prices amongst the lowest of any formation agent in London.
            </p>
            <ul className="check-list">
              {whyChoose.slice(0, 4).map((item) => (
                <li key={item.title}>
                  <Check /> {item.title}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="split-media" variant="right" delay={160}>
            <img src="/london-skyline.jpg" alt="London skyline" />
          </Reveal>
        </div>
      </section>

      {/* ABOUT / AGENT BENEFITS */}
      <section className="split-section split-section--reverse" id="about">
        <div className="container split-row">
          <Reveal className="split-media" variant="left" delay={80}>
            <img src="/section-why.jpg" alt="London business district" />
          </Reveal>
          <Reveal className="split-copy" variant="right" delay={140}>
            <p className="section-label">About us</p>
            <h2>Why use a company formation agent?</h2>
            <p>
              Company formation agents provide an additional level of support with services Companies House cannot
              offer - the extras new businesses need to get started quickly and securely.
            </p>
            <ul className="check-list">
              {agentBenefits.map((item) => (
                <li key={item}>
                  <Check /> {item}
                </li>
              ))}
            </ul>
            <div className="text-links">
              <a href="#why">Who we are</a>
              <a href="#services">View our services</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FORMATION PACKAGES */}
      <section className="services-section" id="services">
        <div className="container">
          <Reveal className="services-intro" variant="bottom">
            <p className="section-label">Our best services</p>
            <h2>To start your company formation, select one of the following</h2>
            <p className="services-lead">
              Limited companies, LLPs, LBG &amp; charity structures, CICs, non-UK resident packs, address services and
              company restoration - all with clear pricing.
            </p>
          </Reveal>

          <div className="svc-tabs" role="tablist" aria-label="Formation packages">
            {serviceTabs.map((t) => (
              <button
                key={t.id}
                type="button"
                className={tab === t.id ? 'active' : ''}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {activeProducts.map((col, i) => (
              <Reveal key={col.title} delay={i * 120} variant={serviceVariants[i % 3]}>
                <article className="product-card">
                  <div className="product-top">
                    <h3>{col.title}</h3>
                    <div className="product-price">{col.price}</div>
                  </div>
                  <p>{col.text}</p>
                  {getFormationSlugByTitle(col.title) ? (
                    <Link to={`/formation/${getFormationSlugByTitle(col.title)}`} className="btn btn-primary">
                      Read more <Arrow />
                    </Link>
                  ) : (
                    <a href="/contact" className="btn btn-primary">
                      Read more <Arrow />
                    </a>
                  )}
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="services-cta" delay={280} variant="blink">
            <a href="#prices" className="btn btn-outline">
              View featured packages <Arrow />
            </a>
            <a href="/contact" className="btn btn-primary">
              Get in touch <Arrow />
            </a>
          </Reveal>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="services-section" id="included">
        <div className="container">
          <Reveal className="services-intro" variant="top">
            <p className="section-label">What&apos;s included</p>
            <h2>Everything you need to start trading</h2>
          </Reveal>
          <div className="include-block">
            <h3>Standard with every formation</h3>
            <div className="include-grid">
              {included.standard.map((item) => (
                <article key={item.title} className="include-item">
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="include-block">
            <h3>Optional free services</h3>
            <div className="include-grid">
              {included.optional.map((item) => (
                <article key={item.title} className="include-item">
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section className="contact-strip">
        <div className="container contact-strip-inner">
          <Reveal variant="popup">
            <h2>Are you Non-UK Resident? Don&apos;t worry - you can still form a company in the UK</h2>
          </Reveal>
          <Reveal className="hero-actions" delay={160} variant="bottom">
            <a href="#services" className="btn btn-outline btn-lg" onClick={() => setTab('nonuk')}>
              Non-residents packages <Arrow />
            </a>
            <a href="/contact" className="btn btn-primary btn-lg anim-blink-soft">
              Get in touch <Arrow />
            </a>
          </Reveal>
        </div>
      </section>

      {/* STEPS BANNER */}
      <section className="perf-banner">
        <div className="perf-banner-bg" aria-hidden="true" />
        <div className="container perf-banner-inner">
          <Reveal variant="top">
            <p className="section-label section-label--light anim-blink-soft">How it works</p>
            <h2>Company formation in the UK has never been easier</h2>
            <p>Select your name, pick services, enter details and make secure payment.</p>
          </Reveal>
          <div className="steps-row">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 100} variant="popup">
                <article className="step-card">
                  <span className="step-num">{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} variant="popup">
            <a href="#prices" className="btn btn-primary btn-lg">
              Get started <Arrow />
            </a>
          </Reveal>
        </div>
      </section>

      {/* WHY DETAILS */}
      <section className="services-section" id="why-details">
        <div className="container">
          <Reveal className="services-intro" variant="bottom">
            <p className="section-label">Why UK.company</p>
            <h2>Experience, privacy and specialised services</h2>
          </Reveal>
          <div className="include-grid">
            {whyChoose.map((item) => (
              <article key={item.title} className="include-item">
                <h4>{item.title}</h4>
                <p>{item.text}</p>
                {item.bullets ? (
                  <ul className="check-list">
                    {item.bullets.map((b) => (
                      <li key={b}>
                        <Check /> {b}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES WINDOW */}
      <section className="prices-section packages-window" id="prices">
        <div className="container">
          <Reveal variant="top">
            <p className="section-label center">Packages</p>
            <h2 className="center-title">Formation packages window</h2>
            <p className="prices-lead">
              No hidden charges. Pick the pack that fits your business - Limited Company, privacy address, or non-UK
              resident formation.
            </p>
          </Reveal>
          <div className="price-grid price-grid--3">
            {featuredPlans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 160} variant={i === 0 ? 'left' : i === 1 ? 'popup' : 'right'}>
                <article className={`price-card ${plan.featured ? 'price-card--featured' : ''}`}>
                  <h3>{plan.name}</h3>
                  <p className="price-desc">{plan.desc}</p>
                  <div className="price-amt">
                    {plan.price}
                    <span>inc. fee</span>
                  </div>
                  <ul className="check-list">
                    {plan.features.map((f) => (
                      <li key={f}>
                        <Check light={plan.featured} /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={
                      plan.name === 'Limited Company'
                        ? '/formation/ltd-or-private-limited-company-formation-in-uk'
                        : plan.name === 'LTD + Registered Office'
                          ? '/formation/ltd-company-with-registered-office'
                          : '/formation/ltd-companies-for-non-uk-residents'
                    }
                    className={`btn ${plan.featured ? 'btn-white' : 'btn-primary'}`}
                  >
                    Order this package
                  </Link>
                  <Link to="/cart" className="learn-more">
                    Add via cart
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="packages-cta-row" delay={200} variant="popup">
            <Link to="/companies-for-sale" className="btn btn-primary btn-lg">
              Browse companies for sale
            </Link>
            <Link to="/vat" className="btn btn-outline btn-lg">
              VAT services
            </Link>
            <a href="tel:03334442222" className="btn btn-outline btn-lg">
              Call 0333-444-2222
            </a>
          </Reveal>
        </div>
      </section>

      {/* INFORMATION GUIDES */}
      <section className="services-section" id="information">
        <div className="container">
          <Reveal className="services-intro" variant="top">
            <p className="section-label">Information</p>
            <h2>Guides to help you form and run your UK company</h2>
            <p className="services-lead">
              Everything from choosing a company name and SIC codes to banking options for non-UK residents and your free
              company admin portal.
            </p>
          </Reveal>
          <div className="info-grid">
            {informationGuides.map((guide, i) => (
              <Reveal key={guide.id} delay={(i % 3) * 80} variant={i % 2 === 0 ? 'left' : 'right'}>
                <article className="info-card" id={`info-${guide.id}`}>
                  <h3>{guide.title}</h3>
                  <p>{guide.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="services-section" id="faqs">
        <div className="container">
          <Reveal className="services-intro" variant="top">
            <p className="section-label">FAQs</p>
            <h2>Frequently asked questions for our new customers</h2>
          </Reveal>
          <div className="faq-list">
            {faqs.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>
                  {item.q}
                  <span className="chev" aria-hidden="true">
                    ▾
                  </span>
                </summary>
                <p>{item.a}</p>
                {item.bullets ? (
                  <ul className="check-list">
                    {item.bullets.map((b) => (
                      <li key={b}>
                        <Check /> {b}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST NEWS / BLOGS */}
      <section className="news-section" id="blogs">
        <div className="container">
          <Reveal className="news-intro" variant="left">
            <p className="section-label">Latest blogs</p>
            <h2>Our latest blogs</h2>
            <p className="news-lead">
              Practical guidance on UK company structures, non-resident formation and growing your business.
            </p>
          </Reveal>
          <div className="news-grid">
            {blogPosts.map((n, i) => (
              <Reveal key={n.slug} delay={i * 140} variant={newsVariants[i] || 'bottom'}>
                <article className="news-card">
                  <Link to={`/blog/${n.slug}`} className="news-card-media">
                    <img src={n.image || newsImages[i] || '/news-1.jpg'} alt="" />
                    <span className="news-tag">Blog</span>
                  </Link>
                  <div className="news-card-body">
                    <h3>
                      <Link to={`/blog/${n.slug}`}>{n.title}</Link>
                    </h3>
                    <p>{n.excerpt}</p>
                    <div className="news-card-footer">
                      <div className="news-meta">
                        <span>UK.company</span>
                      </div>
                      <Link to={`/blog/${n.slug}`} className="news-read">
                        Read more <Arrow />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="news-cta" delay={320} variant="blink">
            <Link to="/blog" className="btn btn-outline" style={{ marginRight: 12 }}>
              View all blogs
            </Link>
            <Link to="/contact" className="btn btn-primary">
              Are you ready to register your company? <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ADDRESS + RESTORATION INCLUDES */}
      <section className="services-section" id="extra-includes">
        <div className="container">
          <div className="include-block">
            <h3>Registered office - what&apos;s included</h3>
            <div className="include-grid">
              {included.address.map((item) => (
                <article key={item.title} className="include-item">
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="include-block">
            <h3>Company restoration - what&apos;s included</h3>
            <div className="include-grid">
              {included.restoration.map((item) => (
                <article key={item.title} className="include-item">
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
