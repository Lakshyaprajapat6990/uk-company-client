import { useState } from 'react'
import Logo from './Logo.jsx'
import { Link } from 'react-router-dom'
import { footer } from '../data/content.js'

const IconFacebook = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="currentColor">
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.48h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z" />
  </svg>
)

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
)

const IconYoutube = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="currentColor">
    <path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C17.9 5 12 5 12 5s-5.9 0-7.7.3A2.7 2.7 0 0 0 2.4 7.2 28 28 0 0 0 2 12a28 28 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9C6.1 19 12 19 12 19s5.9 0 7.7-.3a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.8zM10 15.2V8.8L15.5 12 10 15.2z" />
  </svg>
)

const IconX = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" fill="currentColor">
    <path d="M17.5 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.4 21H2.3l7.3-8.3L2 3h6.3l4.4 5.8L17.5 3zm-1.1 16.2h1.7L7.7 4.7H5.9l10.5 14.5z" />
  </svg>
)

const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="currentColor">
    <path d="M6.5 9.5H3.7V20h2.8V9.5zM5.1 4A1.6 1.6 0 1 0 5.1 7.2 1.6 1.6 0 0 0 5.1 4zM20.3 20h-2.8v-5.6c0-1.5-.5-2.5-1.8-2.5-1 0-1.5.7-1.8 1.3-.1.2-.1.6-.1.9V20h-2.8s.04-9.3 0-10.5h2.8v1.7c.4-.6 1.1-1.5 2.7-1.5 2 0 3.5 1.3 3.5 4.1V20z" />
  </svg>
)

const social = [
  { label: 'Facebook', href: 'https://www.facebook.com/', Icon: IconFacebook },
  { label: 'Instagram', href: 'https://www.instagram.com/', Icon: IconInstagram },
  { label: 'YouTube', href: 'https://www.youtube.com/', Icon: IconYoutube },
  { label: 'X', href: 'https://x.com/', Icon: IconX },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', Icon: IconLinkedIn },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function handleNewsletter(e) {
    e.preventDefault()
    const value = email.trim()
    if (!value) return
    const subject = 'Newsletter signup'
    const body = `Please add this email to the UK.company newsletter:\n\n${value}`
    window.location.href = `mailto:info@uk.company?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <footer className="footer calcue-footer" id="contact">
      <div className="container">
        <div className="footer-newsletter">
          <h2>Stay up to date with upcoming workshops and new products</h2>
          {sent ? (
            <p className="newsletter-success">
              Thanks - your email app should open so you can confirm the signup.
            </p>
          ) : (
            <form className="newsletter-form" onSubmit={handleNewsletter}>
              <label htmlFor="newsletter-email">Email Address</label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p className="newsletter-note">
                By clicking Submit, you agree to our{' '}
                <Link to="/privacy">Privacy Policy</Link> and <Link to="/terms">Terms of Use</Link>{' '}
                and want to receive news.
              </p>
              <button type="submit" className="btn btn-primary newsletter-submit">
                Submit
              </button>
            </form>
          )}
        </div>

        <div className="footer-cols footer-cols--wide">
          {footer.columns.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith('/') && !l.href.startsWith('/#') ? (
                      <Link to={l.href}>{l.label}</Link>
                    ) : (
                      <a href={l.href}>{l.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4>Find us</h4>
            <p className="footer-address">{footer.address}</p>
            <div className="social-row" aria-label="Social media">
              {social.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="social-dot"
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-contacts">
            <h4>Contacts</h4>
            <a href="tel:03334442222" className="footer-contact-link">
              <strong>Local</strong>
              <span>0333-444-2222</span>
            </a>
            <a href="tel:+443334442222" className="footer-contact-link">
              <strong>International</strong>
              <span>+44 333-444-2222</span>
            </a>
            <a href="mailto:info@uk.company" className="footer-contact-link">
              <strong>Email</strong>
              <span>info@uk.company</span>
            </a>
            <Link to="/contact" className="footer-contact-link">
              <strong>Contact page</strong>
              <span>Form &amp; details</span>
            </Link>
          </div>
        </div>

        <div className="footer-bottom footer-bottom--calcue">
          <Logo light />
          <div className="footer-bottom-copy">
            <span>
              UK.company © {new Date().getFullYear()}. All Rights Reserved.{' '}
              <Link to="/privacy">Privacy</Link> · <Link to="/terms">Terms</Link> ·{' '}
              <Link to="/cookies">Cookies</Link>
            </span>
            <span className="footer-legal-line">
              {footer.tradingName}
              {footer.acsp ? ` · ${footer.acsp}` : ''}
              {footer.address ? ` · ${footer.address}` : ''}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
