import { Link } from 'react-router-dom'
import { useCart } from '../lib/cart.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import { formatGbp } from '../data/existingCompanies.js'

function money(value) {
  const n = Number(value || 0)
  if (Number.isFinite(n) && n >= 100 && Number.isInteger(n)) {
    try {
      return formatGbp(n)
    } catch {
      /* fall through */
    }
  }
  return `£${n.toFixed(2)}`
}

export default function Cart() {
  usePageMeta(
    'Your cart | UK.company',
    'Review formation packages and ready-made companies in your UK.company cart. Existing companies are reserved after ID checks - not purchased instantly.',
    '/cart'
  )

  const { items, total, removeItem, clear } = useCart()
  const shelfCount = items.filter((i) => i.type === 'shelf').length
  const formationCount = items.filter((i) => i.type === 'formation').length

  return (
    <section className="cart-page">
      <div className="container">
        <p className="section-label">Basket</p>
        <h1>Your cart</h1>
        <p className="cart-lead">
          Review packages and companies below. Ready-made companies are reserved after identity
          checks - payment follows by proforma invoice, not at checkout.
        </p>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <div className="hero-actions">
              <Link to="/formations" className="btn btn-primary">
                Browse formations
              </Link>
              <Link to="/companies-for-sale" className="btn btn-outline">
                Companies for sale
              </Link>
            </div>
          </div>
        ) : (
          <div className="cart-layout">
            <ul className="cart-item-list">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-main">
                    <p className="cart-item-type">
                      {item.type === 'shelf' ? 'Company for sale' : 'Formation package'}
                    </p>
                    <h2>{item.title}</h2>
                    <dl className="cart-item-meta">
                      {item.companyNumber ? (
                        <div>
                          <dt>Company number</dt>
                          <dd>{item.companyNumber}</dd>
                        </div>
                      ) : null}
                      {item.incorporatedOn ? (
                        <div>
                          <dt>Incorporated</dt>
                          <dd>{item.incorporatedOn}</dd>
                        </div>
                      ) : null}
                      {item.slug && item.type === 'formation' ? (
                        <div>
                          <dt>Package</dt>
                          <dd>{item.slug}</dd>
                        </div>
                      ) : null}
                      {item.basePrice != null ? (
                        <div>
                          <dt>Listed price</dt>
                          <dd>{money(item.basePrice)}</dd>
                        </div>
                      ) : null}
                      {item.verificationFee ? (
                        <div>
                          <dt>ID verification service</dt>
                          <dd>{money(item.verificationFee)}</dd>
                        </div>
                      ) : null}
                    </dl>
                    {item.type === 'shelf' ? (
                      <p className="cart-item-note">
                        Next step: reserve → upload ID → proforma invoice after approval.
                      </p>
                    ) : (
                      <p className="cart-item-note">
                        Continue to the package page to start your order and ID checks.
                      </p>
                    )}
                  </div>
                  <div className="cart-item-side">
                    <p className="cart-item-price">{money(item.price)}</p>
                    <div className="cart-item-actions">
                      {item.href ? (
                        <Link className="btn btn-primary" to={item.href}>
                          {item.type === 'shelf' ? 'Continue reserve' : 'Continue'}
                        </Link>
                      ) : null}
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="cart-summary">
              <h2>Order summary</h2>
              <dl className="cart-summary-rows">
                <div>
                  <dt>Items</dt>
                  <dd>{items.length}</dd>
                </div>
                {formationCount ? (
                  <div>
                    <dt>Formations</dt>
                    <dd>{formationCount}</dd>
                  </div>
                ) : null}
                {shelfCount ? (
                  <div>
                    <dt>Companies for sale</dt>
                    <dd>{shelfCount}</dd>
                  </div>
                ) : null}
                <div className="cart-summary-total">
                  <dt>Listed total</dt>
                  <dd>{money(total)}</dd>
                </div>
              </dl>
              <p className="cart-summary-note">
                Totals are indicative. Ready-made company payment is taken after ID approval via
                proforma - not instant card checkout.
              </p>
              <div className="cart-summary-actions">
                {shelfCount ? (
                  <Link to="/companies-for-sale" className="btn btn-primary btn-block">
                    Back to companies for sale
                  </Link>
                ) : null}
                <Link to="/id-verification" className="btn btn-outline btn-block">
                  ID Verification info
                </Link>
                <button type="button" className="btn btn-outline btn-block" onClick={clear}>
                  Clear cart
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  )
}
