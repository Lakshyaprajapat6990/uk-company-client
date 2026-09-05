import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'
import { informationGuides, nav } from '../data/content.js'
import { keyProducts, productHubExtras } from '../data/keyProducts.js'
import { useAuth } from '../lib/auth.jsx'
import { useCart } from '../lib/cart.jsx'

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6.6 10.8c1.6 3.1 4.5 5.9 7.6 7.6l2.5-2.5c.3-.3.8-.4 1.2-.3 1.3.4 2.7.7 4.1.7.7 0 1.2.5 1.2 1.2V21c0 .7-.5 1.2-1.2 1.2C10.8 22.2 1.8 13.2 1.8 2.2 1.8 1.5 2.3 1 3 1h3.8c.7 0 1.2.5 1.2 1.2 0 1.4.2 2.8.7 4.1.1.4 0 .9-.3 1.2L6.6 10.8z"
      fill="currentColor"
    />
  </svg>
)

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Chevron = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const CartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6 6h15l-1.5 9h-12L5 3H2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="9" cy="20" r="1.4" fill="currentColor" />
    <circle cx="18" cy="20" r="1.4" fill="currentColor" />
  </svg>
)

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="2" />
    <path
      d="M5 19c1.5-3.2 4-5 7-5s5.5 1.8 7 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

function chunk(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

function MegaMenu({
  items,
  image,
  imageAlt,
  onNavigate,
  onStayOpen,
  onLeave,
  linkPrefix = '#services',
  slugRoutePrefix = null,
}) {
  const columns = chunk(items, Math.ceil(items.length / 3) || 1)

  const renderLink = (item) => {
    const href = typeof item === 'object' ? `${linkPrefix}-${item.id}` : linkPrefix
    const label = typeof item === 'object' ? item.title : item

    if (slugRoutePrefix && typeof item === 'object' && (item.slug || item.id)) {
      const targetSlug = item.slug ?? item.id
      return (
        <Link to={`/${slugRoutePrefix}/${targetSlug}`} onClick={onNavigate}>
          <Chevron />
          <span>{label}</span>
        </Link>
      )
    }

    return (
      <a href={href} onClick={onNavigate}>
        <Chevron />
        <span>{label}</span>
      </a>
    )
  }

  return (
    <div
      className="mega-panel"
      role="region"
      onMouseEnter={onStayOpen}
      onMouseLeave={onLeave}
    >
      <div className="container mega-inner">
        <div className="mega-media">
          <img src={image} alt={imageAlt} />
        </div>
        <div className="mega-cols">
          {columns.map((col, i) => (
            <ul key={i} className="mega-col">
              {col.map((item) => {
                const label = typeof item === 'object' ? item.title || item.slug : item
                return <li key={label}>{renderLink(item)}</li>
              })}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}

function KeyProductsMega({ onNavigate, onStayOpen, onLeave }) {
  return (
    <div
      className="mega-panel mega-panel--key-products"
      role="region"
      onMouseEnter={onStayOpen}
      onMouseLeave={onLeave}
    >
      <div className="container key-products-inner">
        <div className="key-products-intro">
          <p className="key-products-kicker">What we do</p>
          <h3>Key Products</h3>
          <p>Our core UK company services - formations, buy and sell, ID checks, mail, and VAT.</p>
        </div>
        <ul className="key-products-grid">
          {keyProducts.map((item) => (
            <li key={item.id}>
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="key-product-card"
                  onClick={onNavigate}
                >
                  <span className="key-product-title">
                    <Chevron />
                    {item.title}
                  </span>
                  <span className="key-product-blurb">{item.blurb}</span>
                </a>
              ) : (
                <Link to={item.to} className="key-product-card" onClick={onNavigate}>
                  <span className="key-product-title">
                    <Chevron />
                    {item.title}
                  </span>
                  <span className="key-product-blurb">{item.blurb}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
        <div className="key-products-extras">
          <p className="key-products-extras-label">Also</p>
          <ul className="key-products-extras-list">
            {productHubExtras.map((item) => (
              <li key={item.id}>
                <Link to={item.to} onClick={onNavigate}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(null)
  const [hoverLocked, setHoverLocked] = useState(false)
  const closeTimer = useRef(null)
  const location = useLocation()
  const { isAuthenticated, user } = useAuth()
  const { count } = useCart()
  const accountTo = !isAuthenticated
    ? '/login'
    : user?.role === 'admin'
      ? '/admin'
      : '/portal'
  const accountLabel = !isAuthenticated
    ? 'Account'
    : user?.role === 'admin'
      ? 'Admin'
      : 'Portal'

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const openMenu = (key) => {
    clearCloseTimer()
    setHoverLocked(false)
    setMenu(key)
  }

  const scheduleClose = () => {
    clearCloseTimer()
    closeTimer.current = setTimeout(() => setMenu(null), 220)
  }

  const toggleMenu = (key) => {
    clearCloseTimer()
    setHoverLocked(false)
    setMenu((m) => (m === key ? null : key))
  }

  const closeAll = () => {
    clearCloseTimer()
    setOpen(false)
    setMenu(null)
    setHoverLocked(false)
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const firstPath = useRef(location.pathname)
  useEffect(() => {
    if (firstPath.current === location.pathname) return
    firstPath.current = location.pathname
    clearCloseTimer()
    setMenu(null)
    setOpen(false)
    setHoverLocked(false)
    if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }, [location.pathname, location.search])

  useEffect(() => () => clearCloseTimer(), [])

  return (
    <>
      <header className={`nav ${open ? 'nav--open' : ''}`}>
        <div className="container nav-inner">
          <Logo header light />

          <nav className="nav-desktop" aria-label="Main">
            <ul
              className="nav-links"
              onMouseLeave={() => setHoverLocked(false)}
            >
              <li
                className={`has-mega ${menu === 'formations' ? 'is-open' : ''}`}
                onMouseEnter={() => openMenu('formations')}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  className={menu === 'formations' ? 'is-open' : ''}
                  aria-expanded={menu === 'formations'}
                  onClick={() => toggleMenu('formations')}
                >
                  Company Formations
                  <span className="nav-chev" aria-hidden="true">
                    ▾
                  </span>
                </button>
                {menu === 'formations' ? (
                  <MegaMenu
                    items={nav.companyFormations}
                    slugRoutePrefix="formation"
                    image="/london-skyline.jpg"
                    imageAlt="London skyline"
                    onNavigate={closeAll}
                    onStayOpen={() => openMenu('formations')}
                    onLeave={scheduleClose}
                  />
                ) : null}
              </li>

              <li
                className={`has-mega ${menu === 'key-products' ? 'is-open' : ''}`}
                onMouseEnter={() => openMenu('key-products')}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  className={menu === 'key-products' ? 'is-open' : ''}
                  aria-expanded={menu === 'key-products'}
                  onClick={() => toggleMenu('key-products')}
                >
                  Key Products
                  <span className="nav-chev" aria-hidden="true">
                    ▾
                  </span>
                </button>
                {menu === 'key-products' ? (
                  <KeyProductsMega
                    onNavigate={closeAll}
                    onStayOpen={() => openMenu('key-products')}
                    onLeave={scheduleClose}
                  />
                ) : null}
              </li>

              <li
                className={`has-mega ${menu === 'information' ? 'is-open' : ''}`}
                onMouseEnter={() => openMenu('information')}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  className={menu === 'information' ? 'is-open' : ''}
                  aria-expanded={menu === 'information'}
                  onClick={() => toggleMenu('information')}
                >
                  Information
                  <span className="nav-chev" aria-hidden="true">
                    ▾
                  </span>
                </button>
                {menu === 'information' ? (
                  <MegaMenu
                    items={informationGuides}
                    slugRoutePrefix="info"
                    image="/london-skyline.jpg"
                    imageAlt="London skyline business district"
                    linkPrefix="#info"
                    onNavigate={closeAll}
                    onStayOpen={() => openMenu('information')}
                    onLeave={scheduleClose}
                  />
                ) : null}
              </li>

              <li>
                <Link to={accountTo} onClick={closeAll}>
                  {accountLabel}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="nav-cta">
            <div className="nav-phones">
              <a href="tel:03334442222" className="nav-phone" title="Local number">
                <PhoneIcon />
                <span>0333-444-2222</span>
              </a>
              <span className="nav-phone-divider" aria-hidden="true" />
              <a href="tel:+443334442222" className="nav-phone" title="International number">
                <PhoneIcon />
                <span>Int: +44 333-444-2222</span>
              </a>
            </div>
            <div className="nav-cta-actions">
              <Link to="/cart" className="nav-cart-btn" onClick={closeAll} aria-label="Open cart">
                <CartIcon />
                <span>Add to cart</span>
                {count > 0 ? <em className="nav-cart-count">{count}</em> : null}
              </Link>
              <Link
                to={accountTo}
                className="nav-cart-btn nav-cta-btn"
                onClick={closeAll}
              >
                <UserIcon />
                <span>
                  {!isAuthenticated
                    ? 'Account login'
                    : user?.role === 'admin'
                      ? 'Admin CMS'
                      : 'My portal'}
                </span>
              </Link>
            </div>
            <button
              className={`nav-toggle ${open ? 'is-open' : ''}`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="mobile-drawer-panel">
          <ul className="mobile-menu">
            <li className={`has-drop ${menu === 'formations' ? 'active' : ''}`}>
              <button type="button" onClick={() => toggleMenu('formations')}>
                Company Formations
                <span className="nav-chev" aria-hidden="true">
                  ▾
                </span>
              </button>
              <ul className="dropdown">
                {nav.companyFormations.map((item) => (
                  <li key={item.slug}>
                    <Link to={`/formation/${item.slug}`} onClick={closeAll}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className={`has-drop ${menu === 'key-products' ? 'active' : ''}`}>
              <button type="button" onClick={() => toggleMenu('key-products')}>
                Key Products
                <span className="nav-chev" aria-hidden="true">
                  ▾
                </span>
              </button>
              <ul className="dropdown">
                {keyProducts.map((item) => (
                  <li key={item.id}>
                    {item.external ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={closeAll}>
                        {item.title}
                      </a>
                    ) : (
                      <Link to={item.to} onClick={closeAll}>
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </li>
            <li className={`has-drop ${menu === 'information' ? 'active' : ''}`}>
              <button type="button" onClick={() => toggleMenu('information')}>
                Information
                <span className="nav-chev" aria-hidden="true">
                  ▾
                </span>
              </button>
              <ul className="dropdown">
                {informationGuides.map((item) => (
                  <li key={item.id}>
                    <Link to={`/info/${item.id}`} onClick={closeAll}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link to="/cart" onClick={closeAll}>
                Add to cart{count > 0 ? ` (${count})` : ''}
              </Link>
            </li>
            <li>
              <Link to={accountTo} onClick={closeAll}>
                {!isAuthenticated
                  ? 'Account login'
                  : user?.role === 'admin'
                    ? 'Admin CMS'
                    : 'My portal'}
              </Link>
            </li>
          </ul>

          <div className="mobile-menu-footer">
            <a href="tel:03334442222" className="nav-phone" onClick={closeAll}>
              <PhoneIcon />
              <span>0333-444-2222</span>
            </a>
            <a href="tel:+443334442222" className="nav-phone" onClick={closeAll}>
              <PhoneIcon />
              <span>Int: +44 333-444-2222</span>
            </a>
            <Link
              to={accountTo}
              className="btn btn-dark btn-block"
              onClick={closeAll}
            >
              {!isAuthenticated
                ? 'Account login'
                : user?.role === 'admin'
                  ? 'Admin CMS'
                  : 'My portal'}{' '}
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
