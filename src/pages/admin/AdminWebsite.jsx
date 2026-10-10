import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { adminApi } from '../../lib/api.js'

const GROUP_LABELS = {
  core: 'Core',
  menus: 'Header menus (edit / add / delete)',
  products: 'Key products',
  contact: 'Contact',
  legal: 'Legal',
  information: 'Information guides',
  formations: 'Formation packages',
  other: 'Other',
}

function emptyPack() {
  return { title: '', text: '', price: '', to: '/' }
}
function emptyLegalSection() {
  return { heading: '', paragraphs: [''] }
}

export default function AdminWebsite() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedSlug = searchParams.get('page') || 'home'

  const [pages, setPages] = useState([])
  const [page, setPage] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loadingList, setLoadingList] = useState(true)
  const [loadingPage, setLoadingPage] = useState(true)
  const [busy, setBusy] = useState(false)

  const loadList = useCallback(() => {
    setLoadingList(true)
    adminApi
      .listWebsitePages()
      .then((data) => setPages(data.pages || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoadingList(false))
  }, [])

  const loadPage = useCallback((slug) => {
    setLoadingPage(true)
    setError('')
    setMessage('')
    adminApi
      .getWebsitePage(slug)
      .then((data) => setPage(data.page))
      .catch((err) => {
        setError(err.message)
        setPage(null)
      })
      .finally(() => setLoadingPage(false))
  }, [])

  useEffect(() => {
    loadList()
  }, [loadList])

  useEffect(() => {
    loadPage(selectedSlug)
  }, [selectedSlug, loadPage])

  const grouped = useMemo(() => {
    const map = new Map()
    for (const p of pages) {
      const g = p.group || 'other'
      if (!map.has(g)) map.set(g, [])
      map.get(g).push(p)
    }
    return [...map.entries()]
  }, [pages])

  function selectPage(slug) {
    setSearchParams({ page: slug })
  }

  function updateMeta(field, value) {
    setPage((prev) => (prev ? { ...prev, [field]: value } : prev))
  }

  function updateContent(path, value) {
    setPage((prev) => {
      if (!prev) return prev
      const next = structuredClone(prev)
      if (!next.content) next.content = {}
      const parts = path.split('.')
      let cur = next.content
      for (let i = 0; i < parts.length - 1; i++) {
        if (cur[parts[i]] == null || typeof cur[parts[i]] !== 'object') cur[parts[i]] = {}
        cur = cur[parts[i]]
      }
      cur[parts[parts.length - 1]] = value
      return next
    })
  }

  function updateListItem(listKey, index, field, value) {
    setPage((prev) => {
      if (!prev) return prev
      const next = structuredClone(prev)
      if (!Array.isArray(next.content?.[listKey])) return prev
      next.content[listKey][index][field] = value
      return next
    })
  }

  async function save(e) {
    e.preventDefault()
    if (!page) return
    setBusy(true)
    setError('')
    setMessage('')
    try {
      const data = await adminApi.saveWebsitePage(page.slug, {
        title: page.title,
        label: page.label,
        metaDescription: page.metaDescription,
        content: page.content,
      })
      setPage(data.page)
      setMessage(data.message || 'Saved')
      loadList()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function resetPage() {
    if (!page) return
    if (!window.confirm(`Reset "${page.label}" to defaults?`)) return
    setBusy(true)
    setError('')
    try {
      const data = await adminApi.resetWebsitePage(page.slug)
      setPage(data.page)
      setMessage(data.message || 'Reset done')
      loadList()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const c = page?.content || {}

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2>Website content</h2>
        <p>
          Edit every public page from one place. Super Admin can grant this module to Admins under{' '}
          <Link to="/admin/staff">Admins</Link>.
        </p>
      </div>

      {error ? <p className="auth-error">{error}</p> : null}
      {message ? <p className="auth-success">{message}</p> : null}

      <div className="admin-website-layout">
        <aside className="admin-website-nav" aria-label="Website pages">
          {loadingList ? <p>Loading pages…</p> : null}
          {grouped.map(([group, items]) => (
            <div key={group} className="admin-website-group">
              <h3>{GROUP_LABELS[group] || group}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item.slug}>
                    <button
                      type="button"
                      className={item.slug === selectedSlug ? 'is-active' : ''}
                      onClick={() => selectPage(item.slug)}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        <div className="admin-website-editor">
          {loadingPage ? <p>Loading editor…</p> : null}
          {!loadingPage && page ? (
            <form className="admin-home-form" onSubmit={save}>
              <div className="admin-toolbar">
                <div>
                  <h3 style={{ margin: 0 }}>
                    {page.label}{' '}
                    <span className="admin-note" style={{ fontWeight: 500 }}>
                      ({page.path})
                    </span>
                  </h3>
                </div>
                <div className="admin-form-actions" style={{ marginTop: 0 }}>
                  <button type="submit" className="btn btn-primary" disabled={busy}>
                    {busy ? 'Saving…' : 'Save page'}
                  </button>
                  <button type="button" className="btn btn-outline" onClick={resetPage} disabled={busy}>
                    Reset defaults
                  </button>
                  <a
                    href={page.path}
                    className="btn btn-outline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View live
                  </a>
                </div>
              </div>

              <section className="admin-home-section">
                <h3>Page settings</h3>
                <label>
                  Admin label
                  <input value={page.label || ''} onChange={(e) => updateMeta('label', e.target.value)} />
                </label>
                <label>
                  Public title
                  <input value={page.title || ''} onChange={(e) => updateMeta('title', e.target.value)} />
                </label>
                <label>
                  Meta description (SEO)
                  <textarea
                    rows={2}
                    value={page.metaDescription || ''}
                    onChange={(e) => updateMeta('metaDescription', e.target.value)}
                  />
                </label>
              </section>

              {page.type === 'home' ? (
                <HomeFields content={c} updateContent={updateContent} updateListItem={updateListItem} setPage={setPage} />
              ) : null}

              {page.type === 'hub' || page.type === 'product' ? (
                <HubFields
                  content={c}
                  updateContent={updateContent}
                  updateListItem={updateListItem}
                  setPage={setPage}
                  showContactExtras={page.slug === 'contact'}
                />
              ) : null}

              {page.type === 'legal' ? (
                <LegalFields content={c} updateContent={updateContent} setPage={setPage} />
              ) : null}

              {page.type === 'info' ? (
                <section className="admin-home-section">
                  <h3>Guide content</h3>
                  <label>
                    Body text
                    <textarea
                      rows={6}
                      value={c.text || ''}
                      onChange={(e) => updateContent('text', e.target.value)}
                    />
                  </label>
                  <label>
                    Help title
                    <input
                      value={c.helpTitle || ''}
                      onChange={(e) => updateContent('helpTitle', e.target.value)}
                    />
                  </label>
                  <label>
                    Help text
                    <textarea
                      rows={3}
                      value={c.helpText || ''}
                      onChange={(e) => updateContent('helpText', e.target.value)}
                    />
                  </label>
                  <div className="admin-home-grid">
                    <label>
                      Help CTA label
                      <input
                        value={c.helpCtaLabel || ''}
                        onChange={(e) => updateContent('helpCtaLabel', e.target.value)}
                      />
                    </label>
                    <label>
                      Help CTA link
                      <input
                        value={c.helpCtaTo || ''}
                        onChange={(e) => updateContent('helpCtaTo', e.target.value)}
                      />
                    </label>
                  </div>
                </section>
              ) : null}

              {page.type === 'formation' ? (
                <FormationFields content={c} updateContent={updateContent} setPage={setPage} />
              ) : null}

              {page.type === 'formation-shared' ? (
                <FormationSharedFields content={c} updateContent={updateContent} setPage={setPage} />
              ) : null}

              {page.type === 'nav' ? (
                <NavFields content={c} setPage={setPage} pageSlug={page.slug} />
              ) : null}
            </form>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function HomeFields({ content: c, updateContent, updateListItem, setPage }) {
  return (
    <>
      <section className="admin-home-section">
        <h3>Hero</h3>
        <label>
          Kicker text
          <input
            value={c.hero?.kickerPrefix || ''}
            onChange={(e) => updateContent('hero.kickerPrefix', e.target.value)}
          />
        </label>
        <label>
          Price highlight
          <input
            value={c.hero?.kickerPrice || ''}
            onChange={(e) => updateContent('hero.kickerPrice', e.target.value)}
          />
        </label>
        <label>
          Headline
          <input
            value={c.hero?.title || ''}
            onChange={(e) => updateContent('hero.title', e.target.value)}
          />
        </label>
        <label>
          Subtitle
          <textarea
            rows={2}
            value={c.hero?.subtitle || ''}
            onChange={(e) => updateContent('hero.subtitle', e.target.value)}
          />
        </label>
        <div className="admin-home-grid">
          <label>
            Primary CTA label
            <input
              value={c.hero?.primaryCtaLabel || ''}
              onChange={(e) => updateContent('hero.primaryCtaLabel', e.target.value)}
            />
          </label>
          <label>
            Primary CTA link
            <input
              value={c.hero?.primaryCtaTo || ''}
              onChange={(e) => updateContent('hero.primaryCtaTo', e.target.value)}
            />
          </label>
          <label>
            Secondary CTA label
            <input
              value={c.hero?.secondaryCtaLabel || ''}
              onChange={(e) => updateContent('hero.secondaryCtaLabel', e.target.value)}
            />
          </label>
          <label>
            Secondary CTA link
            <input
              value={c.hero?.secondaryCtaTo || ''}
              onChange={(e) => updateContent('hero.secondaryCtaTo', e.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="admin-home-section">
        <h3>Offers</h3>
        <label>
          Section title
          <input
            value={c.offersSection?.title || ''}
            onChange={(e) => updateContent('offersSection.title', e.target.value)}
          />
        </label>
        <label>
          Section lead
          <textarea
            rows={2}
            value={c.offersSection?.lead || ''}
            onChange={(e) => updateContent('offersSection.lead', e.target.value)}
          />
        </label>
        {(c.offers || []).map((offer, i) => (
          <div key={i} className="admin-home-grid" style={{ marginBottom: 12 }}>
            <label>
              Offer title
              <input
                value={offer.title || ''}
                onChange={(e) => updateListItem('offers', i, 'title', e.target.value)}
              />
            </label>
            <label>
              Badge
              <input
                value={offer.badge || ''}
                onChange={(e) => updateListItem('offers', i, 'badge', e.target.value)}
              />
            </label>
            <label className="admin-span-2">
              Text
              <input
                value={offer.text || ''}
                onChange={(e) => updateListItem('offers', i, 'text', e.target.value)}
              />
            </label>
            <label>
              Link
              <input
                value={offer.to || ''}
                onChange={(e) => updateListItem('offers', i, 'to', e.target.value)}
              />
            </label>
          </div>
        ))}
      </section>

      <section className="admin-home-section">
        <h3>Welcome</h3>
        <label>
          Title
          <input
            value={c.welcome?.title || ''}
            onChange={(e) => updateContent('welcome.title', e.target.value)}
          />
        </label>
        <label>
          Lead
          <textarea
            rows={3}
            value={c.welcome?.lead || ''}
            onChange={(e) => updateContent('welcome.lead', e.target.value)}
          />
        </label>
      </section>

      <section className="admin-home-section">
        <h3>Featured packages</h3>
        {(c.featuredPlans || []).map((plan, i) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <div className="admin-home-grid">
              <label>
                Name
                <input
                  value={plan.name || ''}
                  onChange={(e) => updateListItem('featuredPlans', i, 'name', e.target.value)}
                />
              </label>
              <label>
                Price
                <input
                  value={plan.price || ''}
                  onChange={(e) => updateListItem('featuredPlans', i, 'price', e.target.value)}
                />
              </label>
            </div>
            <label>
              Description
              <textarea
                rows={2}
                value={plan.desc || ''}
                onChange={(e) => updateListItem('featuredPlans', i, 'desc', e.target.value)}
              />
            </label>
          </div>
        ))}
      </section>

      <section className="admin-home-section">
        <h3>FAQs</h3>
        {(c.faqs || []).map((faq, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <label>
              Question
              <input value={faq.q || ''} onChange={(e) => updateListItem('faqs', i, 'q', e.target.value)} />
            </label>
            <label>
              Answer
              <textarea
                rows={2}
                value={faq.a || ''}
                onChange={(e) => updateListItem('faqs', i, 'a', e.target.value)}
              />
            </label>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-outline"
          onClick={() =>
            setPage((prev) => {
              if (!prev) return prev
              const next = structuredClone(prev)
              next.content.faqs = [...(next.content.faqs || []), { q: '', a: '', bullets: [] }]
              return next
            })
          }
        >
          Add FAQ
        </button>
      </section>
    </>
  )
}

function HubFields({ content: c, updateContent, updateListItem, setPage, showContactExtras }) {
  return (
    <>
      <section className="admin-home-section">
        <h3>Hero</h3>
        <label>
          Section label
          <input
            value={c.sectionLabel || ''}
            onChange={(e) => updateContent('sectionLabel', e.target.value)}
          />
        </label>
        <label>
          Headline
          <input
            value={c.heroTitle || ''}
            onChange={(e) => updateContent('heroTitle', e.target.value)}
          />
        </label>
        <label>
          Lead
          <textarea
            rows={3}
            value={c.heroLead || ''}
            onChange={(e) => updateContent('heroLead', e.target.value)}
          />
        </label>
        <div className="admin-home-grid">
          <label>
            Primary CTA label
            <input
              value={c.primaryCtaLabel || ''}
              onChange={(e) => updateContent('primaryCtaLabel', e.target.value)}
            />
          </label>
          <label>
            Primary CTA link
            <input
              value={c.primaryCtaTo || ''}
              onChange={(e) => updateContent('primaryCtaTo', e.target.value)}
            />
          </label>
          <label>
            Secondary CTA label
            <input
              value={c.secondaryCtaLabel || ''}
              onChange={(e) => updateContent('secondaryCtaLabel', e.target.value)}
            />
          </label>
          <label>
            Secondary CTA link
            <input
              value={c.secondaryCtaTo || ''}
              onChange={(e) => updateContent('secondaryCtaTo', e.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="admin-home-section">
        <h3>Body</h3>
        <label>
          Body title
          <input value={c.bodyTitle || ''} onChange={(e) => updateContent('bodyTitle', e.target.value)} />
        </label>
        <label>
          Body text
          <textarea
            rows={5}
            value={c.bodyHtml || ''}
            onChange={(e) => updateContent('bodyHtml', e.target.value)}
          />
        </label>
        <label>
          Bullets (one per line)
          <textarea
            rows={4}
            value={(c.bullets || []).join('\n')}
            onChange={(e) =>
              updateContent(
                'bullets',
                e.target.value
                  .split('\n')
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
          />
        </label>
      </section>

      <section className="admin-home-section">
        <div className="admin-toolbar">
          <h3 style={{ margin: 0 }}>Cards / packs</h3>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() =>
              setPage((prev) => {
                if (!prev) return prev
                const next = structuredClone(prev)
                next.content.packs = [...(next.content.packs || []), emptyPack()]
                return next
              })
            }
          >
            Add card
          </button>
        </div>
        <label>
          Packs title
          <input
            value={c.packsTitle || ''}
            onChange={(e) => updateContent('packsTitle', e.target.value)}
          />
        </label>
        <label>
          Packs lead
          <textarea
            rows={2}
            value={c.packsLead || ''}
            onChange={(e) => updateContent('packsLead', e.target.value)}
          />
        </label>
        {(c.packs || []).map((pack, i) => (
          <div key={i} className="admin-home-grid" style={{ marginBottom: 12 }}>
            <label>
              Title
              <input
                value={pack.title || ''}
                onChange={(e) => updateListItem('packs', i, 'title', e.target.value)}
              />
            </label>
            <label>
              Price text
              <input
                value={pack.price || ''}
                onChange={(e) => updateListItem('packs', i, 'price', e.target.value)}
              />
            </label>
            <label className="admin-span-2">
              Text
              <input
                value={pack.text || ''}
                onChange={(e) => updateListItem('packs', i, 'text', e.target.value)}
              />
            </label>
            <label>
              Link
              <input
                value={pack.to || ''}
                onChange={(e) => updateListItem('packs', i, 'to', e.target.value)}
              />
            </label>
            <button
              type="button"
              className="btn btn-outline admin-danger-btn"
              onClick={() =>
                setPage((prev) => {
                  if (!prev) return prev
                  const next = structuredClone(prev)
                  next.content.packs = (next.content.packs || []).filter((_, idx) => idx !== i)
                  return next
                })
              }
            >
              Remove
            </button>
          </div>
        ))}
      </section>

      {showContactExtras ? (
        <section className="admin-home-section">
          <h3>Contact details</h3>
          <div className="admin-home-grid">
            <label>
              Local phone
              <input
                value={c.phoneLocal || ''}
                onChange={(e) => updateContent('phoneLocal', e.target.value)}
              />
            </label>
            <label>
              International phone
              <input
                value={c.phoneIntl || ''}
                onChange={(e) => updateContent('phoneIntl', e.target.value)}
              />
            </label>
            <label>
              Email
              <input value={c.email || ''} onChange={(e) => updateContent('email', e.target.value)} />
            </label>
          </div>
          <label>
            Office address
            <textarea
              rows={3}
              value={c.officeAddress || ''}
              onChange={(e) => updateContent('officeAddress', e.target.value)}
            />
          </label>
          <label>
            Form title
            <input
              value={c.formTitle || ''}
              onChange={(e) => updateContent('formTitle', e.target.value)}
            />
          </label>
          <label>
            Form lead
            <input
              value={c.formLead || ''}
              onChange={(e) => updateContent('formLead', e.target.value)}
            />
          </label>
        </section>
      ) : null}
    </>
  )
}

function FormationFields({ content: c, updateContent, setPage }) {
  return (
    <>
      <section className="admin-home-section">
        <h3>Hero &amp; package card</h3>
        <p className="admin-note">
          {c.note ||
            'This is one of the Company Formations menu pages. Edit every text block shown on the live page.'}
        </p>
        <label>
          Section label
          <input
            value={c.sectionLabel || ''}
            onChange={(e) => updateContent('sectionLabel', e.target.value)}
          />
        </label>
        <label>
          Subtitle
          <input value={c.subtitle || ''} onChange={(e) => updateContent('subtitle', e.target.value)} />
        </label>
        <label>
          Price display (text only)
          <input
            value={c.priceDisplay || ''}
            onChange={(e) => updateContent('priceDisplay', e.target.value)}
          />
        </label>
        <label>
          Package description
          <textarea
            rows={5}
            value={c.description || ''}
            onChange={(e) => updateContent('description', e.target.value)}
          />
        </label>
        <label>
          Order intro text
          <textarea
            rows={3}
            value={c.orderIntroText || ''}
            onChange={(e) => updateContent('orderIntroText', e.target.value)}
          />
        </label>
      </section>

      <section className="admin-home-section">
        <div className="admin-toolbar">
          <h3 style={{ margin: 0 }}>Page content sections</h3>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() =>
              setPage((prev) => {
                if (!prev) return prev
                const next = structuredClone(prev)
                next.content.contentSections = [
                  ...(next.content.contentSections || []),
                  { title: '', paragraphs: [''], subsections: [] },
                ]
                return next
              })
            }
          >
            Add section
          </button>
        </div>
        {(c.contentSections || []).map((section, i) => (
          <div key={i} style={{ marginBottom: 16, borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
            <label>
              Section title
              <input
                value={section.title || ''}
                onChange={(e) => {
                  setPage((prev) => {
                    if (!prev) return prev
                    const next = structuredClone(prev)
                    next.content.contentSections[i].title = e.target.value
                    return next
                  })
                }}
              />
            </label>
            <label>
              Paragraphs (blank line between)
              <textarea
                rows={5}
                value={(section.paragraphs || []).join('\n\n')}
                onChange={(e) => {
                  const paragraphs = e.target.value
                    .split(/\n{2,}/)
                    .map((s) => s.trim())
                    .filter(Boolean)
                  setPage((prev) => {
                    if (!prev) return prev
                    const next = structuredClone(prev)
                    next.content.contentSections[i].paragraphs = paragraphs
                    return next
                  })
                }}
              />
            </label>
            <label>
              Subsections (heading | text — one per line)
              <textarea
                rows={6}
                value={(section.subsections || [])
                  .map((s) => `${s.heading || ''} | ${s.text || ''}`)
                  .join('\n')}
                onChange={(e) => {
                  const subsections = e.target.value
                    .split('\n')
                    .map((line) => line.trim())
                    .filter(Boolean)
                    .map((line) => {
                      const [heading, ...rest] = line.split('|')
                      return { heading: (heading || '').trim(), text: rest.join('|').trim() }
                    })
                  setPage((prev) => {
                    if (!prev) return prev
                    const next = structuredClone(prev)
                    next.content.contentSections[i].subsections = subsections
                    return next
                  })
                }}
              />
            </label>
            <button
              type="button"
              className="btn btn-outline admin-danger-btn"
              onClick={() =>
                setPage((prev) => {
                  if (!prev) return prev
                  const next = structuredClone(prev)
                  next.content.contentSections = (next.content.contentSections || []).filter(
                    (_, idx) => idx !== i
                  )
                  return next
                })
              }
            >
              Remove section
            </button>
          </div>
        ))}
      </section>

      <section className="admin-home-section">
        <h3>Bottom CTA</h3>
        <label>
          CTA title
          <input value={c.ctaTitle || ''} onChange={(e) => updateContent('ctaTitle', e.target.value)} />
        </label>
        <label>
          CTA text
          <textarea
            rows={2}
            value={c.ctaText || ''}
            onChange={(e) => updateContent('ctaText', e.target.value)}
          />
        </label>
      </section>
    </>
  )
}

function FormationSharedFields({ content: c, updateContent, setPage }) {
  return (
    <>
      <section className="admin-home-section">
        <h3>Shared on every formation page</h3>
        <p className="admin-note">
          Banks, What&apos;s Included, optional services and checkout extras appear on all package pages from the
          Company Formations menu.
        </p>
        <label>
          Banks title
          <input
            value={c.banksTitle || ''}
            onChange={(e) => updateContent('banksTitle', e.target.value)}
          />
        </label>
        <label>
          Banks lead
          <textarea
            rows={2}
            value={c.banksLead || ''}
            onChange={(e) => updateContent('banksLead', e.target.value)}
          />
        </label>
        <label>
          Banks (name | perk — one per line)
          <textarea
            rows={6}
            value={(c.banks || []).map((b) => `${b.name || ''} | ${b.perk || ''}`).join('\n')}
            onChange={(e) =>
              updateContent(
                'banks',
                e.target.value
                  .split('\n')
                  .map((l) => l.trim())
                  .filter(Boolean)
                  .map((line) => {
                    const [name, ...rest] = line.split('|')
                    return { name: (name || '').trim(), perk: rest.join('|').trim() }
                  })
              )
            }
          />
        </label>
      </section>

      <section className="admin-home-section">
        <h3>What&apos;s included</h3>
        <label>
          Title
          <input
            value={c.includesTitle || ''}
            onChange={(e) => updateContent('includesTitle', e.target.value)}
          />
        </label>
        <label>
          Items (one per line)
          <textarea
            rows={8}
            value={(c.includes || []).join('\n')}
            onChange={(e) =>
              updateContent(
                'includes',
                e.target.value
                  .split('\n')
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
          />
        </label>
        <label>
          Optional services title
          <input
            value={c.optionalTitle || ''}
            onChange={(e) => updateContent('optionalTitle', e.target.value)}
          />
        </label>
        <label>
          Optional services (one per line)
          <textarea
            rows={6}
            value={(c.optional || []).join('\n')}
            onChange={(e) =>
              updateContent(
                'optional',
                e.target.value
                  .split('\n')
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
          />
        </label>
      </section>

      <section className="admin-home-section">
        <h3>Checkout extras</h3>
        <label>
          Title
          <input
            value={c.extrasTitle || ''}
            onChange={(e) => updateContent('extrasTitle', e.target.value)}
          />
        </label>
        <label>
          Lead
          <textarea
            rows={2}
            value={c.extrasLead || ''}
            onChange={(e) => updateContent('extrasLead', e.target.value)}
          />
        </label>
        <label>
          Extras (title | price — one per line)
          <textarea
            rows={8}
            value={(c.extras || []).map((x) => `${x.title || ''} | ${x.price || ''}`).join('\n')}
            onChange={(e) =>
              updateContent(
                'extras',
                e.target.value
                  .split('\n')
                  .map((l) => l.trim())
                  .filter(Boolean)
                  .map((line) => {
                    const [title, ...rest] = line.split('|')
                    return { title: (title || '').trim(), price: rest.join('|').trim() }
                  })
              )
            }
          />
        </label>
      </section>

      <section className="admin-home-section">
        <div className="admin-toolbar">
          <h3 style={{ margin: 0 }}>Add-on services copy</h3>
        </div>
        <p className="admin-note">Text shown on formation pages for selectable add-ons. Checkout pricing still uses the services catalogue.</p>
        {(c.addons || []).map((addon, i) => (
          <div key={addon.id || i} style={{ marginBottom: 12, borderTop: '1px solid #e2e8f0', paddingTop: 10 }}>
            <div className="admin-home-grid">
              <label>
                Title
                <input
                  value={addon.title || ''}
                  onChange={(e) => {
                    setPage((prev) => {
                      if (!prev) return prev
                      const next = structuredClone(prev)
                      next.content.addons[i].title = e.target.value
                      return next
                    })
                  }}
                />
              </label>
              <label>
                Price display
                <input
                  value={addon.priceDisplay || ''}
                  onChange={(e) => {
                    setPage((prev) => {
                      if (!prev) return prev
                      const next = structuredClone(prev)
                      next.content.addons[i].priceDisplay = e.target.value
                      return next
                    })
                  }}
                />
              </label>
            </div>
            <label>
              Description
              <textarea
                rows={3}
                value={addon.description || ''}
                onChange={(e) => {
                  setPage((prev) => {
                    if (!prev) return prev
                    const next = structuredClone(prev)
                    next.content.addons[i].description = e.target.value
                    return next
                  })
                }}
              />
            </label>
          </div>
        ))}
      </section>
    </>
  )
}

function slugify(value = '') {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function NavFields({ content: c, setPage, pageSlug }) {
  if (pageSlug === 'nav-key-products') {
    return <KeyProductsNavFields content={c} setPage={setPage} />
  }
  if (pageSlug === 'nav-information') {
    return <InformationNavFields content={c} setPage={setPage} />
  }

  // Default: Company Formations menu
  return (
    <section className="admin-home-section">
      <h3>Company Formations menu (header)</h3>
      <p className="admin-note">
        This is the black mega-menu with the formation package links. Add, rename or remove items. New items also
        create an editable package page under Formation packages.
      </p>
      <label>
        Side image URL
        <input
          value={c.image || ''}
          onChange={(e) => {
            setPage((prev) => {
              if (!prev) return prev
              const next = structuredClone(prev)
              next.content.image = e.target.value
              return next
            })
          }}
        />
      </label>
      <label>
        Image alt text
        <input
          value={c.imageAlt || ''}
          onChange={(e) => {
            setPage((prev) => {
              if (!prev) return prev
              const next = structuredClone(prev)
              next.content.imageAlt = e.target.value
              return next
            })
          }}
        />
      </label>
      {(c.items || []).map((item, i) => (
        <div key={item.slug || i} className="admin-home-grid" style={{ marginBottom: 10 }}>
          <label>
            Menu label
            <input
              value={item.title || ''}
              onChange={(e) => {
                setPage((prev) => {
                  if (!prev) return prev
                  const next = structuredClone(prev)
                  next.content.items[i].title = e.target.value
                  return next
                })
              }}
            />
          </label>
          <label>
            URL slug
            <input
              value={item.slug || ''}
              onChange={(e) => {
                setPage((prev) => {
                  if (!prev) return prev
                  const next = structuredClone(prev)
                  next.content.items[i].slug = slugify(e.target.value)
                  return next
                })
              }}
            />
          </label>
          <button
            type="button"
            className="btn btn-outline admin-danger-btn"
            onClick={() =>
              setPage((prev) => {
                if (!prev) return prev
                const next = structuredClone(prev)
                next.content.items = (next.content.items || []).filter((_, idx) => idx !== i)
                return next
              })
            }
          >
            Delete
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-outline"
        onClick={() =>
          setPage((prev) => {
            if (!prev) return prev
            const next = structuredClone(prev)
            next.content.items = [
              ...(next.content.items || []),
              { slug: `new-package-${Date.now()}`, title: 'New formation package' },
            ]
            return next
          })
        }
      >
        Add menu item
      </button>
    </section>
  )
}

function KeyProductsNavFields({ content: c, setPage }) {
  return (
    <>
      <section className="admin-home-section">
        <h3>Key Products mega-menu</h3>
        <p className="admin-note">Edit the What we do / Key Products panel (cards + Also links).</p>
        <label>
          Kicker
          <input
            value={c.kicker || ''}
            onChange={(e) => {
              setPage((prev) => {
                if (!prev) return prev
                const next = structuredClone(prev)
                next.content.kicker = e.target.value
                return next
              })
            }}
          />
        </label>
        <label>
          Title
          <input
            value={c.title || ''}
            onChange={(e) => {
              setPage((prev) => {
                if (!prev) return prev
                const next = structuredClone(prev)
                next.content.title = e.target.value
                return next
              })
            }}
          />
        </label>
        <label>
          Lead text
          <textarea
            rows={3}
            value={c.lead || ''}
            onChange={(e) => {
              setPage((prev) => {
                if (!prev) return prev
                const next = structuredClone(prev)
                next.content.lead = e.target.value
                return next
              })
            }}
          />
        </label>
      </section>

      <section className="admin-home-section">
        <div className="admin-toolbar">
          <h3 style={{ margin: 0 }}>Product cards</h3>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() =>
              setPage((prev) => {
                if (!prev) return prev
                const next = structuredClone(prev)
                next.content.products = [
                  ...(next.content.products || []),
                  {
                    id: `product-${Date.now()}`,
                    title: 'New product',
                    blurb: '',
                    to: '/',
                  },
                ]
                return next
              })
            }
          >
            Add card
          </button>
        </div>
        {(c.products || []).map((item, i) => (
          <div key={item.id || i} style={{ marginBottom: 14, borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
            <div className="admin-home-grid">
              <label>
                Title
                <input
                  value={item.title || ''}
                  onChange={(e) => {
                    setPage((prev) => {
                      if (!prev) return prev
                      const next = structuredClone(prev)
                      next.content.products[i].title = e.target.value
                      return next
                    })
                  }}
                />
              </label>
              <label>
                Link
                <input
                  value={item.to || item.href || ''}
                  onChange={(e) => {
                    setPage((prev) => {
                      if (!prev) return prev
                      const next = structuredClone(prev)
                      next.content.products[i].to = e.target.value
                      next.content.products[i].external = /^https?:\/\//i.test(e.target.value)
                      if (next.content.products[i].external) {
                        next.content.products[i].href = e.target.value
                      }
                      return next
                    })
                  }}
                />
              </label>
            </div>
            <label>
              Blurb
              <textarea
                rows={2}
                value={item.blurb || ''}
                onChange={(e) => {
                  setPage((prev) => {
                    if (!prev) return prev
                    const next = structuredClone(prev)
                    next.content.products[i].blurb = e.target.value
                    return next
                  })
                }}
              />
            </label>
            <button
              type="button"
              className="btn btn-outline admin-danger-btn"
              onClick={() =>
                setPage((prev) => {
                  if (!prev) return prev
                  const next = structuredClone(prev)
                  next.content.products = (next.content.products || []).filter((_, idx) => idx !== i)
                  return next
                })
              }
            >
              Delete card
            </button>
          </div>
        ))}
      </section>

      <section className="admin-home-section">
        <div className="admin-toolbar">
          <h3 style={{ margin: 0 }}>Also links</h3>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() =>
              setPage((prev) => {
                if (!prev) return prev
                const next = structuredClone(prev)
                next.content.alsoLinks = [
                  ...(next.content.alsoLinks || []),
                  { id: `also-${Date.now()}`, title: 'New link', to: '/' },
                ]
                return next
              })
            }
          >
            Add Also link
          </button>
        </div>
        <label>
          Also label
          <input
            value={c.alsoLabel || ''}
            onChange={(e) => {
              setPage((prev) => {
                if (!prev) return prev
                const next = structuredClone(prev)
                next.content.alsoLabel = e.target.value
                return next
              })
            }}
          />
        </label>
        {(c.alsoLinks || []).map((item, i) => (
          <div key={item.id || i} className="admin-home-grid" style={{ marginBottom: 10 }}>
            <label>
              Title
              <input
                value={item.title || ''}
                onChange={(e) => {
                  setPage((prev) => {
                    if (!prev) return prev
                    const next = structuredClone(prev)
                    next.content.alsoLinks[i].title = e.target.value
                    return next
                  })
                }}
              />
            </label>
            <label>
              Link
              <input
                value={item.to || ''}
                onChange={(e) => {
                  setPage((prev) => {
                    if (!prev) return prev
                    const next = structuredClone(prev)
                    next.content.alsoLinks[i].to = e.target.value
                    return next
                  })
                }}
              />
            </label>
            <button
              type="button"
              className="btn btn-outline admin-danger-btn"
              onClick={() =>
                setPage((prev) => {
                  if (!prev) return prev
                  const next = structuredClone(prev)
                  next.content.alsoLinks = (next.content.alsoLinks || []).filter((_, idx) => idx !== i)
                  return next
                })
              }
            >
              Delete
            </button>
          </div>
        ))}
      </section>
    </>
  )
}

function InformationNavFields({ content: c, setPage }) {
  return (
    <section className="admin-home-section">
      <h3>Information menu (header)</h3>
      <p className="admin-note">
        Edit the Information mega-menu list and side image. Add / rename / delete guides. New guides also create an
        editable Information page.
      </p>
      <label>
        Side image URL
        <input
          value={c.image || ''}
          onChange={(e) => {
            setPage((prev) => {
              if (!prev) return prev
              const next = structuredClone(prev)
              next.content.image = e.target.value
              return next
            })
          }}
        />
      </label>
      <label>
        Image alt text
        <input
          value={c.imageAlt || ''}
          onChange={(e) => {
            setPage((prev) => {
              if (!prev) return prev
              const next = structuredClone(prev)
              next.content.imageAlt = e.target.value
              return next
            })
          }}
        />
      </label>
      {(c.items || []).map((item, i) => (
        <div key={item.id || i} className="admin-home-grid" style={{ marginBottom: 10 }}>
          <label>
            Guide title
            <input
              value={item.title || ''}
              onChange={(e) => {
                setPage((prev) => {
                  if (!prev) return prev
                  const next = structuredClone(prev)
                  next.content.items[i].title = e.target.value
                  return next
                })
              }}
            />
          </label>
          <label>
            URL id
            <input
              value={item.id || ''}
              onChange={(e) => {
                setPage((prev) => {
                  if (!prev) return prev
                  const next = structuredClone(prev)
                  next.content.items[i].id = slugify(e.target.value)
                  return next
                })
              }}
            />
          </label>
          <button
            type="button"
            className="btn btn-outline admin-danger-btn"
            onClick={() =>
              setPage((prev) => {
                if (!prev) return prev
                const next = structuredClone(prev)
                next.content.items = (next.content.items || []).filter((_, idx) => idx !== i)
                return next
              })
            }
          >
            Delete
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-outline"
        onClick={() =>
          setPage((prev) => {
            if (!prev) return prev
            const next = structuredClone(prev)
            next.content.items = [
              ...(next.content.items || []),
              { id: `new-guide-${Date.now()}`, title: 'New information guide' },
            ]
            return next
          })
        }
      >
        Add guide
      </button>
    </section>
  )
}

function LegalFields({ content: c, updateContent, setPage }) {
  return (
    <section className="admin-home-section">
      <h3>Legal content</h3>
      <label>
        Last updated
        <input value={c.updated || ''} onChange={(e) => updateContent('updated', e.target.value)} />
      </label>
      {(c.sections || []).map((section, i) => (
        <div key={i} style={{ marginBottom: 16, borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
          <label>
            Section heading
            <input
              value={section.heading || ''}
              onChange={(e) => {
                setPage((prev) => {
                  if (!prev) return prev
                  const next = structuredClone(prev)
                  next.content.sections[i].heading = e.target.value
                  return next
                })
              }}
            />
          </label>
          <label>
            Paragraphs (blank line between paragraphs)
            <textarea
              rows={5}
              value={(section.paragraphs || []).join('\n\n')}
              onChange={(e) => {
                const paragraphs = e.target.value
                  .split(/\n{2,}/)
                  .map((s) => s.trim())
                  .filter(Boolean)
                setPage((prev) => {
                  if (!prev) return prev
                  const next = structuredClone(prev)
                  next.content.sections[i].paragraphs = paragraphs
                  return next
                })
              }}
            />
          </label>
          <button
            type="button"
            className="btn btn-outline admin-danger-btn"
            onClick={() =>
              setPage((prev) => {
                if (!prev) return prev
                const next = structuredClone(prev)
                next.content.sections = (next.content.sections || []).filter((_, idx) => idx !== i)
                return next
              })
            }
          >
            Remove section
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-outline"
        onClick={() =>
          setPage((prev) => {
            if (!prev) return prev
            const next = structuredClone(prev)
            next.content.sections = [...(next.content.sections || []), emptyLegalSection()]
            return next
          })
        }
      >
        Add section
      </button>
    </section>
  )
}
