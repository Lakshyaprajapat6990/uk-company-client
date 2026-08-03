import Logo from './Logo.jsx'
import { footer } from '../data/content.js'

const social = [
  { label: 'Fb', href: '#' },
  { label: 'Ig', href: '#' },
  { label: 'Yt', href: '#' },
  { label: 'X', href: '#' },
  { label: 'In', href: '#' },
]

export default function Footer() {
  return (
    <footer className="footer calcue-footer" id="contact">
      <div className="container">
        <div className="footer-newsletter">
          <h2>Stay up to date with upcoming workshops and new products</h2>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="newsletter-email">Email Address</label>
            <input id="newsletter-email" type="email" placeholder="info@uk.company" />
            <p className="newsletter-note">
              By signing and clicking Submit, you affirm you have read and agree to the Privacy Policy and Terms of Use
              and want to receive news.
            </p>
          </form>
        </div>

        <div className="footer-cols footer-cols--wide">
          {footer.columns.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4>Find us</h4>
            <p className="footer-address">{footer.address}</p>
            <div className="social-row" aria-label="Social media">
              {social.map((s) => (
                <a key={s.label} href={s.href} className="social-dot" aria-label={s.label}>
                  {s.label}
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
          </div>
        </div>

        <div className="footer-bottom footer-bottom--calcue">
          <Logo header light />
          <span>UK.company © {new Date().getFullYear()}. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  )
}
