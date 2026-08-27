import { useState } from 'react'

export default function PillFaq({ items = [], title = 'Frequently Asked Questions' }) {
  const [openIndex, setOpenIndex] = useState(0)

  function toggle(index) {
    setOpenIndex((prev) => (prev === index ? -1 : index))
  }

  return (
    <section className="pill-faq-section">
      <div className="container">
        <h2 className="pill-faq-title">{title}</h2>
        <div className="pill-faq-list">
          {items.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={item.q} className={`pill-faq-item ${isOpen ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="pill-faq-trigger"
                  aria-expanded={isOpen}
                  onClick={() => toggle(index)}
                >
                  <span>{item.q}</span>
                  <span className="pill-faq-icon" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen ? (
                  <div className="pill-faq-panel">
                    {item.a ? <p>{item.a}</p> : null}
                    {item.bullets?.length ? (
                      <ul>
                        {item.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
