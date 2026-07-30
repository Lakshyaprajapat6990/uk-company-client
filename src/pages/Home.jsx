import Reveal from '../components/Reveal.jsx'

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
        <path
          d="M8 10a4 4 0 1 1 8 0v1a4 4 0 0 1-8 0v-1Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path d="M5 19a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }
  if (name === 'quality') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3l2.4 4.86L20 8.7l-4 3.9.94 5.5L12 15.9 7.06 18.1 8 12.6 4 8.7l5.6-.84L12 3z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  if (name === 'experts') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9.5 10.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7ZM16.5 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M3.5 19a6 6 0 0 1 12 0M14 16.5a5 5 0 0 1 6.5 2.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
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

const featureCards = [
  {
    icon: 'quality',
    title: 'Quality working',
    text: 'A team of professionals, driven by a single goal – to bring maximum benefit to the client.',
    tone: 'blue',
  },
  {
    icon: 'experts',
    title: 'Expert consultants',
    text: "Only experienced specialists. Our mission is to continuously improve the efficiency of the customer's business.",
    tone: 'dark',
  },
]

const whyChecks = ['Audience services', 'Management accounting', 'Financial advice']

const serviceCols = [
  {
    icon: 'finance',
    title: 'Financial advice',
    text: 'We advise and in practice help in solving problems in two key business blocks: operational and financial management.',
    items: ['Audit of operating activities', 'Set up your company', 'SME financial', 'Microfinance'],
  },
  {
    icon: 'consult',
    title: 'Consulting services',
    text: 'We provide various services: from one-time consultations to business management.',
    items: ['Individual approach', 'Solving non-standard problems', 'Crisis management'],
  },
  {
    icon: 'product',
    title: 'Product solutions',
    text: 'Design, manage and monitor implementation of business projects. New Product Launch Strategy.',
    items: ['Digital Transformation', 'Knowledge Sharing', 'Operational Analysis'],
  },
]

const plans = [
  {
    name: 'Standard',
    desc: 'Special range of services for small and medium businesses',
    price: '£25',
    year: '£250/year',
    features: ['Market research', 'Audit studies'],
    featured: false,
  },
  {
    name: 'Pro Business',
    desc: 'Create and scale your business, Crisis Management',
    price: '£49',
    year: '£500/year',
    features: ['Market research', 'Audit studies', 'Set up your company', 'Financial analysis'],
    featured: true,
  },
]

const news = [
  {
    img: '/news-1.jpg',
    title: 'Financial crisis – how to protect business?',
    excerpt: 'Practical steps to keep cash flow stable and protect your company during uncertain markets.',
    category: 'Finance',
    date: '29 Mar 2024',
  },
  {
    img: '/news-2.jpg',
    title: 'Bank secrecy is now in the past',
    excerpt: 'What changing regulations mean for founders opening business accounts and staying compliant.',
    category: 'Compliance',
    date: '12 Feb 2024',
  },
  {
    img: '/news-3.jpg',
    title: 'Investment in index funds',
    excerpt: 'A clear overview of how long-term index investing can support business owners’ personal wealth.',
    category: 'Investing',
    date: '04 Jan 2024',
  },
]

export default function Home() {
  const serviceVariants = ['left', 'popup', 'right']
  const newsVariants = ['bottom', 'float', 'top']

  return (
    <>
      {/* HERO */}
      <section className="hero" aria-label="Welcome">
        <div className="hero-bg" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy animate-in">
            <p className="brand-kicker">Welcome to UK.company! Best dedicated to serve you!</p>
            <h1>You run your business. We&apos;ll form your company.</h1>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary btn-lg">
                Free consultation <Arrow />
              </a>
              <a href="#services" className="btn btn-outline btn-lg">
                Our services <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WELCOME */}
      <section className="welcome-section">
        <div className="container welcome-inner">
          <Reveal className="welcome-intro" variant="top">
            <p className="section-label anim-blink-soft">You are welcome</p>
            <h2>Financial freedom could be just one phone call away...</h2>
            <p className="welcome-lead">
              A balanced approach to developing a strategy and an effective system for managing, attracting and placing
              capital is a key success factor. Our team is ready to analyze existing processes, develop a management
              system that will reduce costs and increase the efficiency of your work.
            </p>
          </Reveal>
          <div className="feature-pair">
            {featureCards.map((c, i) => (
              <Reveal key={c.title} delay={i * 140} variant={i === 0 ? 'left' : 'right'}>
                <article className={`feature-card feature-card--${c.tone}`}>
                  <div className="feature-icon anim-float-icon" aria-hidden="true">
                    <ServiceIcon name={c.icon} />
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
            <a href="#contact" className="btn btn-primary">
              Get in touch <Arrow />
            </a>
          </Reveal>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="split-section" id="why">
        <div className="container split-row">
          <Reveal className="split-copy" variant="left">
            <p className="section-label">Why choose us</p>
            <h2>We are the best agency to improve your deals</h2>
            <p>
              The accumulated knowledge, skills and experience make it possible to provide high-class services. Our
              approach is based on the non-standard solution of tasks with the application of modern international
              practices.
            </p>
            <ul className="check-list">
              {whyChecks.map((item) => (
                <li key={item}>
                  <Check /> {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="split-media" variant="right" delay={160}>
            <img src="/section-team.jpg" alt="Professional consultants reviewing a tablet" />
          </Reveal>
        </div>
      </section>

      {/* ABOUT US */}
      <section className="split-section split-section--reverse" id="about">
        <div className="container split-row">
          <Reveal className="split-media video-box" variant="left" delay={80}>
            <div className="video-placeholder">
              <strong>Sorry</strong>
              <span>This video does not exist.</span>
            </div>
          </Reveal>
          <Reveal className="split-copy" variant="right" delay={140}>
            <p className="section-label">About us</p>
            <h2>Unforgettable experience</h2>
            <p>
              All specialists have more than 10 years of experience in various fields. This allows us to solve maximum
              problems.
            </p>
            <div className="text-links">
              <a href="#why">Who we are</a>
              <a href="#services">View our services</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section" id="services">
        <div className="container">
          <Reveal className="services-intro" variant="bottom">
            <p className="section-label">Our best services</p>
            <h2>We&apos;re ready to share our advice and experience</h2>
            <p className="services-lead">
              We help to solve non-standard and complex problems, as well as problems that require an integrated
              approach and the participation of specialists from different subject areas.
            </p>
          </Reveal>
          <div className="services-grid">
            {serviceCols.map((col, i) => (
              <Reveal key={col.title} delay={i * 120} variant={serviceVariants[i] || 'popup'}>
                <article className="service-col">
                  <div className="service-icon anim-float-icon" aria-hidden="true">
                    <ServiceIcon name={col.icon} />
                  </div>
                  <h3>{col.title}</h3>
                  <p>{col.text}</p>
                  <ul className="check-list">
                    {col.items.map((item) => (
                      <li key={item}>
                        <Check /> {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="services-cta" delay={280} variant="blink">
            <a href="#prices" className="btn btn-outline">
              View packages <Arrow />
            </a>
            <a href="#contact" className="btn btn-primary">
              Get in touch <Arrow />
            </a>
          </Reveal>
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section className="contact-strip">
        <div className="container contact-strip-inner">
          <Reveal variant="popup">
            <h2>So that? Can contact and discuss Your business?</h2>
          </Reveal>
          <Reveal className="hero-actions" delay={160} variant="bottom">
            <a href="#services" className="btn btn-outline btn-lg">
              Our services <Arrow />
            </a>
            <a href="#contact" className="btn btn-primary btn-lg anim-blink-soft">
              Get in touch <Arrow />
            </a>
          </Reveal>
        </div>
      </section>

      {/* PERFORMANCE BANNER */}
      <section className="perf-banner">
        <div className="perf-banner-bg" aria-hidden="true" />
        <div className="container perf-banner-inner">
          <Reveal variant="top">
            <p className="section-label section-label--light anim-blink-soft">Our best services</p>
            <h2>We can help to improve your business performance</h2>
            <p>Business consulting and strategy development</p>
          </Reveal>
          <Reveal delay={200} variant="popup">
            <a href="#contact" className="btn btn-primary btn-lg">
              Free consultation <Arrow />
            </a>
          </Reveal>
        </div>
      </section>

      {/* PRICES */}
      <section className="prices-section" id="prices">
        <div className="container">
          <Reveal variant="top">
            <p className="section-label center">Prices</p>
            <h2 className="center-title">We&apos;ll suggest the plan that&apos;s right for your business</h2>
            <p className="prices-lead">
              Tell us your average monthly expenses and we&apos;ll suggest the plan, that&apos;s right for your business.
            </p>
          </Reveal>
          <div className="price-grid">
            {plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 160} variant={i === 0 ? 'left' : 'right'}>
                <article className={`price-card ${plan.featured ? 'price-card--featured' : ''}`}>
                  <h3>{plan.name}</h3>
                  <p className="price-desc">{plan.desc}</p>
                  <div className="price-amt">
                    {plan.price}
                    <span>/m</span>
                  </div>
                  <div className="price-year">{plan.year}</div>
                  <ul className="check-list">
                    {plan.features.map((f) => (
                      <li key={f}>
                        <Check light={plan.featured} /> {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className={`btn ${plan.featured ? 'btn-white' : 'btn-primary'}`}>
                    Start free trial <Arrow />
                  </a>
                  <a href="#services" className="learn-more">
                    Learn more
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST NEWS */}
      <section className="news-section" id="blogs">
        <div className="container">
          <Reveal className="news-intro" variant="left">
            <p className="section-label">Latest news</p>
            <h2>Read our latest articles tips &amp; news</h2>
            <p className="news-lead">
              Practical guidance for founders — from company formation and compliance to protecting cash flow.
            </p>
          </Reveal>
          <div className="news-grid">
            {news.map((n, i) => (
              <Reveal key={n.title} delay={i * 140} variant={newsVariants[i] || 'bottom'}>
                <article className="news-card">
                  <a href="#blogs" className="news-card-media">
                    <img src={n.img} alt="" />
                    <span className="news-tag">{n.category}</span>
                  </a>
                  <div className="news-card-body">
                    <h3>
                      <a href="#blogs">{n.title}</a>
                    </h3>
                    <p>{n.excerpt}</p>
                    <div className="news-card-footer">
                      <div className="news-meta">
                        <span>UK.company</span>
                        <span aria-hidden="true">·</span>
                        <time dateTime={n.date}>{n.date}</time>
                      </div>
                      <a href="#blogs" className="news-read">
                        Read more <Arrow />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="news-cta" delay={320} variant="blink">
            <a href="#contact" className="btn btn-primary">
              Talk to an advisor <Arrow />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
