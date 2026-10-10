import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import {
  bankPartners,
  checkoutExtras,
  formationAddons,
  getFormationPage,
  optionalFreeServices,
  whatsIncludedDefault,
} from '../data/formationPages.js'
import { useAuth } from '../lib/auth.jsx'
import { ordersApi, PENDING_ORDER_KEY } from '../lib/api.js'
import { useCart } from '../lib/cart.jsx'
import useWebsitePage from '../hooks/useWebsitePage.js'

const ADDON_SLUG_MAP = {
  'registered-office': 'registered-office-addon',
  'printed-certificates': 'printed-certificates',
  'vat-registration': 'vat-registration-addon',
  'confirmation-statement': 'confirmation-statement-addon',
}

function buildFormationOrderPayload(page, selectedAddons) {
  const items = [{ slug: page.slug }]
  for (const id of selectedAddons) {
    const slug = ADDON_SLUG_MAP[id] || id
    items.push({ slug })
  }
  return { items, companyName: '' }
}

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

function formatPrice(amount) {
  return `£${amount.toFixed(2)}`
}

export default function FormationServicePage() {
  const { slug } = useParams()
  const localPage = getFormationPage(slug)
  const { page: cmsPage, content: cms } = useWebsitePage(slug ? `formation-${slug}` : '')
  const { content: shared } = useWebsitePage('formation-shared')
  const page = useMemo(() => {
    if (!localPage) return null
    return {
      ...localPage,
      title: cmsPage?.title || localPage.title,
      subtitle: cms?.subtitle || localPage.subtitle,
      description: cms?.description || localPage.description,
      priceDisplay: cms?.priceDisplay || localPage.priceDisplay,
      sectionLabel: cms?.sectionLabel || 'Company Formations',
      orderIntroText:
        cms?.orderIntroText ||
        shared?.orderIntroText ||
        'Select our additional services to help your company get off to the right start and get discounts with 3 or more services.',
      contentSections:
        cms?.contentSections?.length > 0 ? cms.contentSections : localPage.contentSections,
      ctaTitle: cms?.ctaTitle || shared?.ctaTitle || 'Ready to form your company?',
      ctaText:
        cms?.ctaText ||
        shared?.ctaText ||
        'Start your order today - transparent pricing, no hidden charges, and free lifetime support.',
    }
  }, [localPage, cmsPage, cms, shared])
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { addItem } = useCart()
  const [orderError, setOrderError] = useState('')
  const [orderBusy, setOrderBusy] = useState(false)
  const [cartMessage, setCartMessage] = useState('')

  const addonCatalog = useMemo(() => {
    const cmsAddons = Array.isArray(shared?.addons) ? shared.addons : []
    return formationAddons.map((addon) => {
      const override = cmsAddons.find((a) => a.id === addon.id)
      if (!override) return addon
      return {
        ...addon,
        title: override.title || addon.title,
        priceDisplay: override.priceDisplay || addon.priceDisplay,
        description: override.description || addon.description,
      }
    })
  }, [shared])

  const banks = shared?.banks?.length ? shared.banks : bankPartners
  const includes = shared?.includes?.length ? shared.includes : whatsIncludedDefault
  const optional = shared?.optional?.length ? shared.optional : optionalFreeServices
  const extras = shared?.extras?.length ? shared.extras : checkoutExtras

  const availableAddons = useMemo(() => {
    if (!page) return []
    return addonCatalog.filter((addon) => !page.bundledAddons.includes(addon.id))
  }, [page, addonCatalog])

  const [selectedAddons, setSelectedAddons] = useState(() => new Set())

  useEffect(() => {
    window.scrollTo(0, 0)
    setSelectedAddons(new Set())
    setOrderError('')
    setCartMessage('')
  }, [slug])

  if (!page) {
    return <Navigate to="/" replace />
  }

  const toggleAddon = (id) => {
    setSelectedAddons((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const addonTotal = availableAddons
    .filter((addon) => selectedAddons.has(addon.id))
    .reduce((sum, addon) => sum + addon.price, 0)

  const serviceCount = 1 + page.bundledAddons.length + selectedAddons.size
  const discount = serviceCount >= 3 ? Math.round(addonTotal * 0.05 * 100) / 100 : 0
  const subtotal = page.price + addonTotal
  const total = subtotal - discount

  const bundledAddonDetails = addonCatalog.filter((addon) => page.bundledAddons.includes(addon.id))

  async function saveAndContinue() {
    setOrderError('')
    const payload = buildFormationOrderPayload(page, selectedAddons)

    if (!isAuthenticated) {
      sessionStorage.setItem(PENDING_ORDER_KEY, JSON.stringify(payload))
      navigate('/login', { state: { from: '/portal' } })
      return
    }

    setOrderBusy(true)
    try {
      const data = await ordersApi.create(payload)
      navigate(`/portal/orders/${data.order._id}`)
    } catch (err) {
      setOrderError(err.message)
    } finally {
      setOrderBusy(false)
    }
  }

  function addToCart() {
    addItem({
      id: `formation:${page.slug}`,
      type: 'formation',
      slug: page.slug,
      title: page.title,
      subtitle: page.subtitle,
      basePrice: page.price,
      price: total,
      href: `/formation/${page.slug}`,
    })
    setCartMessage('Added to cart')
  }

  return (
    <>
      <section className="formation-hero">
        <div className="container formation-hero-inner">
          <Reveal variant="top">
            <nav className="formation-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>{page.title}</span>
            </nav>
            <p className="section-label">{page.sectionLabel}</p>
            <h1>{page.title}</h1>
            <div className="formation-hero-price">{page.priceDisplay}</div>
            <p className="formation-hero-lead">{page.subtitle}</p>
          </Reveal>
        </div>
      </section>

      <section className="formation-order">
        <div className="container formation-order-grid">
          <div className="formation-services">
            <Reveal variant="left">
              <div className="formation-order-intro">
                <h2>{page.subtitle}</h2>
                <p>{page.orderIntroText}</p>
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
                  <p>{page.description}</p>
                </article>
              </Reveal>

              {bundledAddonDetails.map((addon, i) => (
                <Reveal key={addon.id} delay={80 + i * 60} variant="right">
                  <article className="formation-service-card formation-service-card--selected formation-service-card--bundled">
                    <div className="formation-service-head">
                      <div>
                        <h3>{addon.title}</h3>
                        <span className="formation-service-price">Included</span>
                      </div>
                      <span className="formation-badge">Included</span>
                    </div>
                    <p>{addon.description}</p>
                  </article>
                </Reveal>
              ))}

              {availableAddons.map((addon, i) => {
                const isSelected = selectedAddons.has(addon.id)
                return (
                  <Reveal key={addon.id} delay={120 + i * 60} variant={i % 2 === 0 ? 'left' : 'right'}>
                    <article
                      className={`formation-service-card ${isSelected ? 'formation-service-card--selected' : ''}`}
                    >
                      <div className="formation-service-head">
                        <div>
                          <h3>{addon.title}</h3>
                          <span className="formation-service-price">{addon.priceDisplay}</span>
                        </div>
                        <label className="formation-toggle">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleAddon(addon.id)}
                          />
                          <span>{isSelected ? 'Selected' : 'Add'}</span>
                        </label>
                      </div>
                      <p>{addon.description}</p>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          </div>

          <aside className="formation-summary">
            <Reveal variant="right" delay={100}>
              <div className="formation-summary-card">
                <p className="formation-summary-kicker">Summary</p>
                {serviceCount >= 3 ? (
                  <p className="formation-discount-note">Get discounts with 3 or more services</p>
                ) : null}
                <dl className="formation-summary-rows">
                  <div>
                    <dt>Charge for services</dt>
                    <dd>{formatPrice(subtotal)}</dd>
                  </div>
                  <div>
                    <dt>Service items discount</dt>
                    <dd>{formatPrice(discount)}</dd>
                  </div>
                </dl>
                <div className="formation-summary-total">
                  <span>Total order</span>
                  <strong>{formatPrice(total)}</strong>
                </div>
                {orderError ? <p className="auth-error">{orderError}</p> : null}
                {cartMessage ? <p className="auth-success">{cartMessage}</p> : null}
                <button type="button" className="btn btn-outline-light btn-block" onClick={addToCart}>
                  Add to cart
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  disabled={orderBusy}
                  onClick={saveAndContinue}
                >
                  {orderBusy ? 'Creating order...' : 'Save & Continue'} <Arrow />
                </button>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="formation-banks">
        <div className="container">
          <Reveal variant="top">
            <h2>{shared?.banksTitle || 'Business bank account'}</h2>
            <p className="formation-section-lead">
              {shared?.banksLead || 'You can select a business bank account during the order process.'}
            </p>
          </Reveal>
          <div className="formation-bank-grid">
            {banks.map((bank, i) => (
              <Reveal key={bank.name} delay={i * 80} variant="popup">
                <article className="formation-bank-card">
                  <h3>{bank.name}</h3>
                  <p>{bank.perk}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="formation-includes">
        <div className="container formation-includes-grid">
          <Reveal variant="left">
            <div className="formation-include-block">
              <h2>{shared?.includesTitle || "What's Included"}</h2>
              <ul className="check-list">
                {includes.map((item) => (
                  <li key={item}>
                    <Check /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal variant="right" delay={120}>
            <div className="formation-include-block">
              <h2>{shared?.optionalTitle || 'Optional Free Services'}</h2>
              <ul className="check-list">
                {optional.map((item) => (
                  <li key={item}>
                    <Check /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="formation-extras">
        <div className="container">
          <Reveal variant="top">
            <h2>{shared?.extrasTitle || 'Additional items available at checkout'}</h2>
            <p className="formation-section-lead">
              {shared?.extrasLead || 'You can add these items during the order process.'}
            </p>
          </Reveal>
          <div className="formation-extras-grid">
            {extras.map((item, i) => (
              <Reveal key={item.title} delay={(i % 4) * 60} variant="popup">
                <article className="formation-extra-card">
                  <h3>{item.title}</h3>
                  <span className="formation-extra-price">{item.price}</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="formation-content">
        <div className="container formation-content-inner">
          {(page.contentSections || []).map((section, i) => (
            <Reveal key={section.title} delay={i * 80} variant="bottom">
              <div className="formation-content-block">
                <h2>{section.title}</h2>
                {section.paragraphs?.map((para) => (
                  <p key={para}>{para}</p>
                ))}
                {section.subsections?.map((sub) => (
                  <div key={sub.heading} className="formation-subsection">
                    <h3>{sub.heading}</h3>
                    <p>{sub.text}</p>
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
            <h2>{page.ctaTitle}</h2>
            <p>{page.ctaText}</p>
            <div className="hero-actions">
              <button type="button" className="btn btn-outline-light btn-lg" onClick={addToCart}>
                Add to cart
              </button>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                disabled={orderBusy}
                onClick={saveAndContinue}
              >
                {orderBusy ? 'Creating order...' : 'Save & Continue'} <Arrow />
              </button>
              <Link to="/#services" className="btn btn-outline btn-lg">
                View all packages <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
