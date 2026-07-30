import Logo from './Logo.jsx'

const aboutLinks = ['Home', 'What We Do', 'Who We Are', 'Blog', 'Contacts']
const serviceLinks = ['Banking expertise', 'Consulting services', 'Product solutions']

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

        <div className="footer-cols">
          <div>
            <h4>About</h4>
            <ul>
              {aboutLinks.map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Our Services</h4>
            <ul>
              {serviceLinks.map((l) => (
                <li key={l}>
                  <a href="#services">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Find us</h4>
            <p>27 Old Gloucester Street, London, WC1N 3AX, UK</p>
            <div className="social-row">
              <span>Fb</span>
              <span>Ig</span>
              <span>Yt</span>
              <span>X</span>
              <span>In</span>
            </div>
          </div>
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
          </div>
        </div>

        <div className="footer-bottom footer-bottom--calcue">
          <Logo light />
          <span>UK.company © {new Date().getFullYear()}. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  )
}
