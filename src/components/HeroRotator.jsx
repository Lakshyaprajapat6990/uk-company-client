import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const slides = [
  {
    kicker: 'Special offer',
    title: 'Limited Company from £107',
    text: 'Ready-to-trade UK company with Companies House fee included and free lifetime support.',
    cta: 'Start formation',
    to: '/formation/ltd-or-private-limited-company-formation-in-uk',
  },
  {
    kicker: 'Companies for sale',
    title: 'Ready-made UK companies from £595',
    text: 'Reserve an existing company. ID checks first — proforma invoice after approval.',
    cta: 'View companies',
    to: '/companies-for-sale',
  },
  {
    kicker: 'Privacy pack',
    title: 'LTD + London registered office £114',
    text: 'Keep personal addresses off public records with our Central London address.',
    cta: 'View package',
    to: '/formation/ltd-company-with-registered-office',
  },
  {
    kicker: 'Non-UK founders',
    title: 'Form from overseas for £163',
    text: 'No UK nationals required. Central London address included.',
    cta: 'Form from overseas',
    to: '/formation/ltd-companies-for-non-uk-residents',
  },
]

export default function HeroRotator() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const slide = slides[index]

  return (
    <div className="hero-rotator" aria-live="polite">
      <p className="hero-rotator-kicker">{slide.kicker}</p>
      <h2>{slide.title}</h2>
      <p>{slide.text}</p>
      <div className="hero-rotator-actions">
        <Link to={slide.to} className="btn btn-primary">
          {slide.cta}
        </Link>
        <Link to="/#prices" className="btn btn-outline-light">
          All packages
        </Link>
      </div>
      <div className="hero-rotator-dots" role="tablist" aria-label="Offers">
        {slides.map((item, i) => (
          <button
            key={item.title}
            type="button"
            className={i === index ? 'is-active' : ''}
            aria-label={`Show offer ${i + 1}`}
            aria-selected={i === index}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  )
}
