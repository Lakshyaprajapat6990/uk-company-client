import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import EnquiryModal from '../components/EnquiryModal.jsx'
import PillFaq from '../components/PillFaq.jsx'
import Reveal from '../components/Reveal.jsx'
import { existingCompanies, formatGbp, shelfFaqs } from '../data/existingCompanies.js'
import { shelfApi } from '../lib/api.js'
import usePageMeta from '../hooks/usePageMeta.js'

const PAGE_SIZE = 10

function yearFromDate(dateStr = '') {
  const parts = String(dateStr).split('/')
  return parts.length === 3 ? parts[2] : ''
}

function formatDisplayDate(dateStr = '') {
  return String(dateStr).replace(/\//g, '-')
}

export default function ExistingCompaniesPage() {
  usePageMeta(
    'UK Companies for Sale | Buy Ready-Made Companies | UK.company',
    'Browse ready-made UK limited companies for sale. Reserve first, complete ID verification, then transfer after proforma payment. Companies House and HMRC regulated (ACSP).',
    '/companies-for-sale'
  )

  const [remote, setRemote] = useState(null)
  const [query, setQuery] = useState('')
  const [year, setYear] = useState('all')
  const [page, setPage] = useState(1)
  const [openSlug, setOpenSlug] = useState(null)
  const [sortDir, setSortDir] = useState(null) // null = original list order
  const [enquiryCompany, setEnquiryCompany] = useState(null)

  const closeEnquiry = useCallback(() => setEnquiryCompany(null), [])

  useEffect(() => {
    window.scrollTo(0, 0)
    shelfApi
      .list()
      .then((data) => setRemote(data.companies || []))
      .catch(() => setRemote(null))
  }, [])

  // Prefer live Mongo catalogue from API (admin CMS). Fall back to local seed list offline.
  const source = useMemo(() => {
    if (remote?.length) {
      return remote.map((c) => ({
        slug: c.slug,
        name: c.name,
        listNo: c.listNo,
        incorporatedOn: c.incorporatedOn,
        companyNumber: c.companyNumber,
        price: c.price,
        featured: Boolean(c.featured),
        note: c.note || '',
        status: c.status || 'available',
      }))
    }
    return existingCompanies.map((c) => ({ ...c, status: 'available' }))
  }, [remote])

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
        String(c.companyNumber).includes(q) ||
        (c.note && c.note.toLowerCase().includes(q))
      return matchYear && matchQuery
    })
    list = [...list].sort((a, b) => {
      if (!sortDir) return (a.listNo || 0) - (b.listNo || 0)
      const cmp = a.name.localeCompare(b.name)
      return sortDir === 'asc' ? cmp : -cmp
    })
    return list
  }, [source, query, year, sortDir])

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
              <Link to="/buy">Buy a company</Link>
              <span aria-hidden="true">/</span>
              <span>Companies for sale</span>
            </nav>
            <p className="section-label">Existing UK companies</p>
            <h1>Companies for sale</h1>
            <p className="formation-hero-lead">
              Ready-made UK companies. Identity checks are required before transfer. We are Companies
              House and HMRC regulated (ACSP).
            </p>
            <div className="hero-actions" style={{ marginTop: 20 }}>
              <Link to="/buy" className="btn btn-outline-light btn-lg">
                Buy / sell hub
              </Link>
              <Link to="/sell" className="btn btn-outline-light btn-lg">
                Sell your company to us
              </Link>
              <Link to="/id-verification" className="btn btn-outline-light btn-lg">
                ID Verification
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sale-process-strip">
        <div className="container">
          <ol className="sale-process-steps">
            <li>
              <strong>1. Reserve</strong>
              <span>Choose a company and reserve it</span>
            </li>
            <li>
              <strong>2. ID checks</strong>
              <span>Photo ID + proof of address for directors / PSCs</span>
            </li>
            <li>
              <strong>3. Proforma</strong>
              <span>Invoice &amp; bank details after approval</span>
            </li>
            <li>
              <strong>4. Transfer</strong>
              <span>Officers updated after payment received</span>
            </li>
          </ol>
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
                onClick={() =>
                  setSortDir((prev) => (prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'))
                }
              >
                Company name{' '}
                <span aria-hidden="true">
                  {sortDir === 'asc' ? '▴' : sortDir === 'desc' ? '▾' : '▾'}
                </span>
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
