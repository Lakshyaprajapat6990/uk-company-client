import { useEffect, useState } from 'react'
import { adminApi } from '../../lib/api.js'

function emptyOffer() {
  return { title: '', text: '', badge: '', to: '/' }
}
function emptyPlan() {
  return { name: '', desc: '', price: '', features: [''], featured: false }
}
function emptyWhy() {
  return { title: '', text: '', bullets: [] }
}
function emptyFaq() {
  return { q: '', a: '', bullets: [] }
}
function emptyTrust() {
  return { title: '', text: '' }
}

export default function AdminHomepage() {
  const [homepage, setHomepage] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)

  function load() {
    setLoading(true)
    setError('')
    adminApi
      .getHomepage()
      .then((data) => setHomepage(data.homepage))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  function update(path, value) {
    setHomepage((prev) => {
      if (!prev) return prev
      const next = structuredClone(prev)
      const parts = path.split('.')
      let cur = next
      for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]]
      cur[parts[parts.length - 1]] = value
      return next
    })
  }

  function updateListItem(listKey, index, field, value) {
    setHomepage((prev) => {
      if (!prev) return prev
      const next = structuredClone(prev)
      next[listKey][index][field] = value
      return next
    })
  }

  async function save(e) {
    e.preventDefault()
    if (!homepage) return
    setBusy(true)
    setError('')
    setMessage('')
    try {
      const data = await adminApi.saveHomepage({
        hero: homepage.hero,
        offersSection: homepage.offersSection,
        offers: homepage.offers,
        welcome: homepage.welcome,
        trustPoints: homepage.trustPoints,
        pricesSection: homepage.pricesSection,
        featuredPlans: homepage.featuredPlans,
        whySection: homepage.whySection,
        whyChoose: homepage.whyChoose,
        faqSection: homepage.faqSection,
        faqs: homepage.faqs,
      })
      setHomepage(data.homepage)
      setMessage(data.message || 'Saved')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function resetDefaults() {
    if (!window.confirm('Reset homepage content to defaults?')) return
    setBusy(true)
    setError('')
    try {
      const data = await adminApi.resetHomepage()
      setHomepage(data.homepage)
      setMessage(data.message || 'Reset done')
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  if (loading) return <p>Loading homepage editor...</p>
  if (!homepage) return <p className="auth-error">{error || 'Could not load homepage'}</p>

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2>Homepage content</h2>
        <p>Edit the live homepage text, offers, packages, why-us blocks and FAQs.</p>
      </div>
      {error ? <p className="auth-error">{error}</p> : null}
      {message ? <p className="auth-success">{message}</p> : null}

      <form className="admin-home-form" onSubmit={save}>
        <section className="admin-home-section">
          <h3>Hero</h3>
          <label>
            Kicker text
            <input
              value={homepage.hero?.kickerPrefix || ''}
              onChange={(e) => update('hero.kickerPrefix', e.target.value)}
            />
          </label>
          <label>
            Price highlight
            <input
              value={homepage.hero?.kickerPrice || ''}
              onChange={(e) => update('hero.kickerPrice', e.target.value)}
            />
          </label>
          <label>
            Headline
            <input value={homepage.hero?.title || ''} onChange={(e) => update('hero.title', e.target.value)} />
          </label>
          <label>
            Subtitle
            <textarea
              rows={2}
              value={homepage.hero?.subtitle || ''}
              onChange={(e) => update('hero.subtitle', e.target.value)}
            />
          </label>
          <div className="admin-home-grid">
            <label>
              Primary CTA label
              <input
                value={homepage.hero?.primaryCtaLabel || ''}
                onChange={(e) => update('hero.primaryCtaLabel', e.target.value)}
              />
            </label>
            <label>
              Primary CTA link
              <input
                value={homepage.hero?.primaryCtaTo || ''}
                onChange={(e) => update('hero.primaryCtaTo', e.target.value)}
              />
            </label>
            <label>
              Secondary CTA label
              <input
                value={homepage.hero?.secondaryCtaLabel || ''}
                onChange={(e) => update('hero.secondaryCtaLabel', e.target.value)}
              />
            </label>
            <label>
              Secondary CTA link
              <input
                value={homepage.hero?.secondaryCtaTo || ''}
                onChange={(e) => update('hero.secondaryCtaTo', e.target.value)}
              />
            </label>
            <label>
              Tertiary CTA label
              <input
                value={homepage.hero?.tertiaryCtaLabel || ''}
                onChange={(e) => update('hero.tertiaryCtaLabel', e.target.value)}
              />
            </label>
            <label>
              Tertiary CTA link
              <input
                value={homepage.hero?.tertiaryCtaHref || ''}
                onChange={(e) => update('hero.tertiaryCtaHref', e.target.value)}
              />
            </label>
          </div>
        </section>

        <section className="admin-home-section">
          <h3>Special offers section</h3>
          <label>
            Label
            <input
              value={homepage.offersSection?.label || ''}
              onChange={(e) => update('offersSection.label', e.target.value)}
            />
          </label>
          <label>
            Title
            <input
              value={homepage.offersSection?.title || ''}
              onChange={(e) => update('offersSection.title', e.target.value)}
            />
          </label>
          <label>
            Lead
            <textarea
              rows={2}
              value={homepage.offersSection?.lead || ''}
              onChange={(e) => update('offersSection.lead', e.target.value)}
            />
          </label>
          {(homepage.offers || []).map((offer, i) => (
            <div key={`offer-${i}`} className="admin-home-card">
              <strong>Offer {i + 1}</strong>
              <label>
                Badge
                <input value={offer.badge || ''} onChange={(e) => updateListItem('offers', i, 'badge', e.target.value)} />
              </label>
              <label>
                Title
                <input value={offer.title || ''} onChange={(e) => updateListItem('offers', i, 'title', e.target.value)} />
              </label>
              <label>
                Text
                <textarea
                  rows={2}
                  value={offer.text || ''}
                  onChange={(e) => updateListItem('offers', i, 'text', e.target.value)}
                />
              </label>
              <label>
                Link
                <input value={offer.to || ''} onChange={(e) => updateListItem('offers', i, 'to', e.target.value)} />
              </label>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() =>
                  setHomepage((p) => ({ ...p, offers: p.offers.filter((_, idx) => idx !== i) }))
                }
              >
                Remove offer
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setHomepage((p) => ({ ...p, offers: [...(p.offers || []), emptyOffer()] }))}
          >
            Add offer
          </button>
        </section>

        <section className="admin-home-section">
          <h3>Welcome / trust</h3>
          <label>
            Welcome label
            <input
              value={homepage.welcome?.label || ''}
              onChange={(e) => update('welcome.label', e.target.value)}
            />
          </label>
          <label>
            Welcome title
            <input
              value={homepage.welcome?.title || ''}
              onChange={(e) => update('welcome.title', e.target.value)}
            />
          </label>
          <label>
            Welcome lead
            <textarea
              rows={3}
              value={homepage.welcome?.lead || ''}
              onChange={(e) => update('welcome.lead', e.target.value)}
            />
          </label>
          {(homepage.trustPoints || []).map((item, i) => (
            <div key={`trust-${i}`} className="admin-home-card">
              <strong>Trust point {i + 1}</strong>
              <label>
                Title
                <input
                  value={item.title || ''}
                  onChange={(e) => updateListItem('trustPoints', i, 'title', e.target.value)}
                />
              </label>
              <label>
                Text
                <textarea
                  rows={2}
                  value={item.text || ''}
                  onChange={(e) => updateListItem('trustPoints', i, 'text', e.target.value)}
                />
              </label>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline"
            onClick={() =>
              setHomepage((p) => ({ ...p, trustPoints: [...(p.trustPoints || []), emptyTrust()] }))
            }
          >
            Add trust point
          </button>
        </section>

        <section className="admin-home-section">
          <h3>Featured packages</h3>
          <label>
            Section label
            <input
              value={homepage.pricesSection?.label || ''}
              onChange={(e) => update('pricesSection.label', e.target.value)}
            />
          </label>
          <label>
            Section title
            <input
              value={homepage.pricesSection?.title || ''}
              onChange={(e) => update('pricesSection.title', e.target.value)}
            />
          </label>
          <label>
            Section lead
            <textarea
              rows={2}
              value={homepage.pricesSection?.lead || ''}
              onChange={(e) => update('pricesSection.lead', e.target.value)}
            />
          </label>
          {(homepage.featuredPlans || []).map((plan, i) => (
            <div key={`plan-${i}`} className="admin-home-card">
              <strong>Package {i + 1}</strong>
              <label>
                Name
                <input value={plan.name || ''} onChange={(e) => updateListItem('featuredPlans', i, 'name', e.target.value)} />
              </label>
              <label>
                Price
                <input value={plan.price || ''} onChange={(e) => updateListItem('featuredPlans', i, 'price', e.target.value)} />
              </label>
              <label>
                Description
                <textarea
                  rows={2}
                  value={plan.desc || ''}
                  onChange={(e) => updateListItem('featuredPlans', i, 'desc', e.target.value)}
                />
              </label>
              <label>
                Features (one per line)
                <textarea
                  rows={4}
                  value={(plan.features || []).join('\n')}
                  onChange={(e) =>
                    updateListItem(
                      'featuredPlans',
                      i,
                      'features',
                      e.target.value.split('\n').map((s) => s.trim()).filter(Boolean)
                    )
                  }
                />
              </label>
              <label className="admin-check">
                <input
                  type="checkbox"
                  checked={Boolean(plan.featured)}
                  onChange={(e) => updateListItem('featuredPlans', i, 'featured', e.target.checked)}
                />
                Featured package
              </label>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() =>
                  setHomepage((p) => ({
                    ...p,
                    featuredPlans: p.featuredPlans.filter((_, idx) => idx !== i),
                  }))
                }
              >
                Remove package
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline"
            onClick={() =>
              setHomepage((p) => ({ ...p, featuredPlans: [...(p.featuredPlans || []), emptyPlan()] }))
            }
          >
            Add package
          </button>
        </section>

        <section className="admin-home-section">
          <h3>Why choose us</h3>
          <label>
            Label
            <input
              value={homepage.whySection?.label || ''}
              onChange={(e) => update('whySection.label', e.target.value)}
            />
          </label>
          <label>
            Title
            <input
              value={homepage.whySection?.title || ''}
              onChange={(e) => update('whySection.title', e.target.value)}
            />
          </label>
          {(homepage.whyChoose || []).map((item, i) => (
            <div key={`why-${i}`} className="admin-home-card">
              <strong>Block {i + 1}</strong>
              <label>
                Title
                <input value={item.title || ''} onChange={(e) => updateListItem('whyChoose', i, 'title', e.target.value)} />
              </label>
              <label>
                Text
                <textarea
                  rows={3}
                  value={item.text || ''}
                  onChange={(e) => updateListItem('whyChoose', i, 'text', e.target.value)}
                />
              </label>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() =>
                  setHomepage((p) => ({
                    ...p,
                    whyChoose: p.whyChoose.filter((_, idx) => idx !== i),
                  }))
                }
              >
                Remove block
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setHomepage((p) => ({ ...p, whyChoose: [...(p.whyChoose || []), emptyWhy()] }))}
          >
            Add why block
          </button>
        </section>

        <section className="admin-home-section">
          <h3>FAQs</h3>
          <label>
            Label
            <input
              value={homepage.faqSection?.label || ''}
              onChange={(e) => update('faqSection.label', e.target.value)}
            />
          </label>
          <label>
            Title
            <input
              value={homepage.faqSection?.title || ''}
              onChange={(e) => update('faqSection.title', e.target.value)}
            />
          </label>
          {(homepage.faqs || []).map((item, i) => (
            <div key={`faq-${i}`} className="admin-home-card">
              <strong>FAQ {i + 1}</strong>
              <label>
                Question
                <input value={item.q || ''} onChange={(e) => updateListItem('faqs', i, 'q', e.target.value)} />
              </label>
              <label>
                Answer
                <textarea rows={3} value={item.a || ''} onChange={(e) => updateListItem('faqs', i, 'a', e.target.value)} />
              </label>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() =>
                  setHomepage((p) => ({ ...p, faqs: p.faqs.filter((_, idx) => idx !== i) }))
                }
              >
                Remove FAQ
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setHomepage((p) => ({ ...p, faqs: [...(p.faqs || []), emptyFaq()] }))}
          >
            Add FAQ
          </button>
        </section>

        <div className="admin-home-actions">
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {busy ? 'Saving...' : 'Save homepage'}
          </button>
          <button type="button" className="btn btn-outline" disabled={busy} onClick={resetDefaults}>
            Reset to defaults
          </button>
          <a className="btn btn-outline" href="/" target="_blank" rel="noreferrer">
            Preview homepage
          </a>
        </div>
      </form>
    </div>
  )
}
