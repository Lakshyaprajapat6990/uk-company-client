import { useState, useEffect } from 'react'
import Logo from './Logo.jsx'
import { nav } from '../data/content.js'

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

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(null)

  const toggleMenu = (key) => setMenu((m) => (m === key ? null : key))
  const closeAll = () => {
    setOpen(false)
    setMenu(null)
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className={`nav ${open ? 'nav--open' : ''}`}>
        <div className="container nav-inner">
          <Logo />

          <nav className="nav-desktop" aria-label="Main">
            <ul className="nav-links">
              <li className={`has-drop ${menu === 'formations' ? 'active' : ''}`}>
                <button type="button" onClick={() => toggleMenu('formations')}>
                  Company Formations
                  <span className="nav-chev" aria-hidden="true">▾</span>
                </button>
                <ul className="dropdown">
                  {nav.companyFormations.map((item) => (
                    <li key={item}>
                      <a href="#services" onClick={closeAll}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className={`has-drop ${menu === 'additional' ? 'active' : ''}`}>
                <button type="button" onClick={() => toggleMenu('additional')}>
                  Additional Services
                  <span className="nav-chev" aria-hidden="true">▾</span>
                </button>
                <ul className="dropdown">
                  {nav.additionalServices.map((item) => (
                    <li key={item}>
                      <a href="#services" onClick={closeAll}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <a href="#blogs" onClick={closeAll}>
                  Blogs
                </a>
              </li>
              <li>
                <a href="#contact" onClick={closeAll}>
                  Contact us
                </a>
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
            <a href="#contact" className="btn btn-dark nav-cta-btn">
              Get in touch <Arrow />
            </a>
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

      {/* Mobile drawer outside header so fixed positioning works */}
      <div className={`mobile-drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="mobile-drawer-panel">
          <ul className="mobile-menu">
            <li className={`has-drop ${menu === 'formations' ? 'active' : ''}`}>
              <button type="button" onClick={() => toggleMenu('formations')}>
                Company Formations
                <span className="nav-chev" aria-hidden="true">▾</span>
              </button>
              <ul className="dropdown">
                {nav.companyFormations.map((item) => (
                  <li key={item}>
                    <a href="#services" onClick={closeAll}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li className={`has-drop ${menu === 'additional' ? 'active' : ''}`}>
              <button type="button" onClick={() => toggleMenu('additional')}>
                Additional Services
                <span className="nav-chev" aria-hidden="true">▾</span>
              </button>
              <ul className="dropdown">
                {nav.additionalServices.map((item) => (
                  <li key={item}>
                    <a href="#services" onClick={closeAll}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <a href="#blogs" onClick={closeAll}>
                Blogs
              </a>
            </li>
            <li>
              <a href="#contact" onClick={closeAll}>
                Contact us
              </a>
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
            <a href="#contact" className="btn btn-dark btn-block" onClick={closeAll}>
              Get in touch <Arrow />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
