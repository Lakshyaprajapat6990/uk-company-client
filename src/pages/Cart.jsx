import { Link } from 'react-router-dom'
import { useCart } from '../lib/cart.jsx'

export default function Cart() {
  const { items, total, removeItem, clear } = useCart()

  return (
    <section className="portal-page">
      <div className="container">
        <p className="section-label">Basket</p>
        <h1>Your cart</h1>
        <p className="portal-lead">
          Add packages or companies, then continue. Existing companies are reserved after ID checks —
          not purchased instantly.
        </p>

        {items.length === 0 ? (
          <p>
            Your cart is empty.{' '}
            <Link to="/#services">Browse formations</Link> or{' '}
            <Link to="/companies-for-sale">companies for sale</Link>.
          </p>
        ) : (
          <>
            <ul className="portal-item-list">
              {items.map((item) => (
                <li key={item.id} className="portal-order-card">
                  <div>
                    <h3>{item.title}</h3>
                    <p className="portal-meta">
                      {item.type === 'shelf' ? 'Company for sale' : 'Formation'} · £
                      {Number(item.price).toFixed(2)}
                    </p>
                  </div>
                  <div className="hero-actions">
                    {item.href ? (
                      <Link className="btn btn-primary" to={item.href}>
                        Continue
                      </Link>
                    ) : null}
                    <button type="button" className="btn btn-outline" onClick={() => removeItem(item.id)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="portal-header">
              <p>
                Total <strong>£{total.toFixed(2)}</strong>
              </p>
              <button type="button" className="btn btn-outline" onClick={clear}>
                Clear cart
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
