import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import { existingCompanies, formatGbp } from '../data/existingCompanies.js'
import { shelfApi } from '../lib/api.js'

export default function ExistingCompaniesPage() {
  const [remote, setRemote] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    shelfApi
      .list()
      .then((data) => setRemote(data.companies || []))
      .catch(() => setRemote(null))
  }, [])

  const companies = useMemo(() => {
    const source =
      remote?.length > 0
        ? remote
        : existingCompanies.map((c) => ({ ...c, status: 'available' }))
    const q = query.trim().toLowerCase()
    if (!q) return source
    return source.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        String(c.companyNumber).includes(q) ||
        String(c.price).includes(q)
    )
  }, [remote, query])

  return (
    <>
      <section className="formation-hero">
        <div className="container formation-hero-inner">
          <Reveal variant="top">
            <nav className="formation-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Companies for sale</span>
            </nav>
            <p className="section-label">Existing UK companies</p>
            <h1>Companies for sale</h1>
            <p className="formation-hero-lead">
              Reserve a ready-made company. Identity documents are required before we can transfer
              the company. We are Companies House and HMRC regulated (ACSP).
            </p>
          </Reveal>
        </div>
      </section>

      <section className="shelf-page">
        <div className="container">
          <div className="shelf-intro">
            <div>
              <h2>How a purchase works</h2>
              <ol className="shelf-steps">
                <li>Reserve the company you want.</li>
                <li>
                  Provide director/PSC details, SIC codes, registered office, photo ID and proof of
                  address (under 3 months).
                </li>
                <li>
                  Provide a Companies House verification code, or request our £75 verification
                  service.
                </li>
                <li>
                  After ID checks we send a proforma invoice. Payment completes the transfer, Auth
                  codes and HMRC UTR.
                </li>
              </ol>
            </div>
            <label className="shelf-search">
              Search name or company number
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. MERLIN or 16232592"
              />
            </label>
          </div>

          <div className="shelf-table-wrap">
            <table className="shelf-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Company name</th>
                  <th>Incorporated</th>
                  <th>Company number</th>
                  <th>Price</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {companies.map((company) => {
                  const available = (company.status || 'available') === 'available'
                  return (
                    <tr key={company.slug} className={company.featured ? 'is-featured' : ''}>
                      <td>{company.listNo}</td>
                      <td>
                        <strong>{company.name}</strong>
                        {company.note ? <span className="shelf-note">{company.note}</span> : null}
                      </td>
                      <td>{company.incorporatedOn}</td>
                      <td>{company.companyNumber}</td>
                      <td>
                        <span className="shelf-price">{formatGbp(company.price)}</span>
                      </td>
                      <td>
                        {available ? (
                          <Link className="btn btn-primary" to={`/companies-for-sale/${company.slug}`}>
                            Reserve
                          </Link>
                        ) : (
                          <span className="shelf-sold">Reserved</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
