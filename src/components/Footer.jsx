import Logo from './Logo.jsx'
import { footer } from '../data/content.js'

export default function Footer() {
  return (
    <footer className="footer calcue-footer" id="contact">
      <div className="container">
        <div className="footer-newsletter">
          <h2>Are you ready to register your company?</h2>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="newsletter-email">Email Address</label>
            <input id="newsletter-email" type="email" placeholder="info@uk.company" />
            <p className="newsletter-note">
              By signing and clicking Submit, you affirm you have read and agree to the Privacy Policy and Terms of Use
              and want to receive news.
            </p>
            <a href="#prices" className="btn btn-primary">
              Get Started
            </a>
          </form>
        </div>

        <div className="footer-cols footer-cols--wide">
          {footer.columns.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l}>
                    <a href={l === 'Contact Us' || l === 'Home' ? '#contact' : l === 'Blogs' ? '#blogs' : '#services'}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4>Contacts</h4>
            <p>
              <strong>Local</strong>
              <br />
              <a href="tel:03334442222">0333-444-2222</a>
            </p>
            <p>
              <strong>International</strong>
              <br />
              <a href="tel:+443334442222">+44 333-444-2222</a>
            </p>
            <p>
              <strong>Email</strong>
              <br />
              <a href="mailto:info@uk.company">info@uk.company</a>
            </p>
            <p>{footer.address}</p>
          </div>
        </div>

        <div className="footer-legal">
          <p>
            <strong>UK.company</strong> {footer.tradingName}
          </p>
          <p>
            {footer.companyNr} · {footer.vat} · {footer.ico} · {footer.acsp}
          </p>
        </div>

        <div className="footer-bottom footer-bottom--calcue">
          <Logo light />
          <span>UK.company © {new Date().getFullYear()}. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  )
}
