import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import EnquiryModal from '../components/EnquiryModal.jsx'
import PillFaq from '../components/PillFaq.jsx'
import Reveal from '../components/Reveal.jsx'
import { existingCompanies, formatGbp, shelfFaqs } from '../data/existingCompanies.js'
import { shelfApi } from '../lib/api.js'

const PAGE_SIZE = 10

function yearFromDate(dateStr = '') {
  const parts = String(dateStr).split('/')
  return parts.length === 3 ? parts[2] : ''
}

function formatDisplayDate(dateStr = '') {
  return String(dateStr).replace(/\//g, '-')
}

export default function ExistingCompaniesPage() {
  const [remote, setRemote] = useState(null)
  const [query, setQuery] = useState('')
  const [year, setYear] = useState('all')
  const [page, setPage] = useState(1)
  const [openSlug, setOpenSlug] = useState(null)
  const [sortAsc, setSortAsc] = useState(true)
  const [enquiryCompany, setEnquiryCompany] = useState(null)

  const closeEnquiry = useCallback(() => setEnquiryCompany(null), [])

  useEffect(() => {
    window.scrollTo(0, 0)
    shelfApi
      .list()
      .then((data) => setRemote(data.companies || []))
      .catch(() => setRemote(null))
  }, [])

  const source = useMemo(
    () =>
      remote?.length > 0
        ? remote
        : existingCompanies.map((c) => ({ ...c, status: 'available' })),
    [remote]
  )

  const years = useMemo(() => {
    const set = new Set(source.map((c) => yearFromDate(c.incorporatedOn)).filter(Boolean))
    return [...set].sort((a, b) => Number(b) - Number(a))
  }, [source])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = source.filter((c) => {
      const matchYear = year === 'all' || yearFromDate(c.incorporatedOn) === year
      const matchQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        String(c.companyNumber).includes(q)
      return matchYear && matchQuery
    })
    list = [...list].sort((a, b) => {
      const cmp = a.name.localeCompare(b.name)
      return sortAsc ? cmp : -cmp
    })
    return list
  }, [source, query, year, sortAsc])

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const start = total === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
  const end = Math.min(currentPage * PAGE_SIZE, total)
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  useEffect(() => {
    setPage(1)
  }, [query, year])

  function toggleRow(slug) {
    setOpenSlug((prev) => (prev === slug ? null : slug))
  }

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
              Ready-made UK companies. Identity checks are required before transfer. We are Companies
              House and HMRC regulated (ACSP).
            </p>
          </Reveal>
        </div>
      </section>

      <section className="shelf-page shelf-page--list">
        <div className="container">
          <div className="sale-toolbar">
            <p className="sale-count">
              Showing <strong>{start}-{end}</strong> of <strong>{total}</strong> Companies
            </p>
            <div className="sale-filters">
              <label className="sale-year">
                Year of incorporation:
                <select value={year} onChange={(e) => setYear(e.target.value)}>
                  <option value="all">All years</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </label>
              <label className="sale-search">
                <span className="sr-only">Search Company</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Company"
                />
                <span className="sale-search-icon" aria-hidden="true">
                  ⌕
                </span>
              </label>
            </div>
          </div>

          <div className="sale-list">
            <div className="sale-list-head" role="row">
              <button
                type="button"
                className="sale-sort"
                onClick={() => setSortAsc((v) => !v)}
              >
                Company name <span aria-hidden="true">{sortAsc ? '▾' : '▴'}</span>
              </button>
              <span>Registration number</span>
              <span>Incorporation date</span>
              <span>Price (+VAT)</span>
              <span className="sale-head-actions" />
            </div>

            {pageItems.length === 0 ? (
              <p className="sale-empty">No companies match your filters.</p>
            ) : (
              pageItems.map((company) => {
                const available = (company.status || 'available') === 'available'
                const isOpen = openSlug === company.slug
                return (
                  <article
                    key={company.slug}
                    className={`sale-row ${isOpen ? 'is-open' : ''} ${
                      company.featured ? 'is-featured' : ''
                    }`}
                  >
                    <div className="sale-row-main">
                      <button
                        type="button"
                        className="sale-name"
                        onClick={() => toggleRow(company.slug)}
                        aria-expanded={isOpen}
                      >
                        <span className="sale-chev" aria-hidden="true">
                          {isOpen ? '▴' : '▾'}
                        </span>
                        <span>
                          {company.name}
                          {company.note ? <em className="sale-note">{company.note}</em> : null}
                        </span>
                      </button>
                      <div className="sale-reg">{company.companyNumber}</div>
                      <div className="sale-date">{formatDisplayDate(company.incorporatedOn)}</div>
                      <div className="sale-price">{formatGbp(company.price)}</div>
                      <div className="sale-actions">
                        {available ? (
                          <>
                            <button
                              type="button"
                              className="btn sale-btn-enquire"
                              onClick={() => setEnquiryCompany(company.name)}
                            >
                              Enquire now
                            </button>
                            <Link
                              className="btn sale-btn-buy"
                              to={`/companies-for-sale/${company.slug}`}
                            >
                              Buy Now
                            </Link>
                          </>
                        ) : (
                          <span className="shelf-sold">Reserved</span>
                        )}
                      </div>
                    </div>

                    {isOpen ? (
                      <div className="sale-row-details">
                        <div>
                          <p>
                            Company Number: <strong>{company.companyNumber}</strong>
                          </p>
                          <p>
                            Registered in: <strong>England and Wales</strong>
                          </p>
                        </div>
                        <div>
                          <p>
                            Registered Office Address: <strong>Included</strong>
                          </p>
                          <p>
                            Service Address: <strong>Included</strong>
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </article>
                )
              })
            )}
          </div>

          {totalPages > 1 ? (
            <div className="sale-pagination">
              <button
                type="button"
                className="btn btn-outline"
                disabled={currentPage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                className="btn btn-outline"
                disabled={currentPage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <PillFaq items={shelfFaqs} />

      <EnquiryModal
        open={Boolean(enquiryCompany)}
        companyName={enquiryCompany || ''}
        onClose={closeEnquiry}
      />
    </>
  )
}
