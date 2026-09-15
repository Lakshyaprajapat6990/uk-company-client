import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'uk_cookie_consent_v1'

const defaultPrefs = {
  necessary: true,
  analytics: false,
  marketing: false,
}

function readConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function openCookiePreferences() {
  window.dispatchEvent(new CustomEvent('uk-open-cookie-prefs'))
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [manageOpen, setManageOpen] = useState(false)
  const [prefs, setPrefs] = useState(defaultPrefs)

  useEffect(() => {
    const existing = readConsent()
    if (!existing) {
      setVisible(true)
    } else {
      setPrefs({ ...defaultPrefs, ...existing.prefs })
    }

    function onOpen() {
      const current = readConsent()
      if (current?.prefs) setPrefs({ ...defaultPrefs, ...current.prefs })
      setManageOpen(true)
      setVisible(true)
    }
    window.addEventListener('uk-open-cookie-prefs', onOpen)
    return () => window.removeEventListener('uk-open-cookie-prefs', onOpen)
  }, [])

  function save(nextPrefs, status = 'custom') {
    const payload = {
      status,
      prefs: { ...nextPrefs, necessary: true },
      updatedAt: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    setPrefs(payload.prefs)
    setManageOpen(false)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <div className="cookie-banner-inner">
        {!manageOpen ? (
          <>
            <div className="cookie-banner-copy">
              <strong>We use cookies</strong>
              <p>
                We use necessary cookies to run the site. Optional cookies help us improve UK.company
                and measure what works. Read our{' '}
                <Link to="/cookies">Cookies policy</Link>.
              </p>
            </div>
            <div className="cookie-banner-actions">
              <button type="button" className="btn btn-outline" onClick={() => setManageOpen(true)}>
                Manage
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() =>
                  save({ necessary: true, analytics: false, marketing: false }, 'rejected')
                }
              >
                Reject optional
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  save({ necessary: true, analytics: true, marketing: true }, 'accepted')
                }
              >
                Accept
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="cookie-banner-copy">
              <strong>Cookie preferences</strong>
              <p>
                Necessary cookies are always on. Choose optional categories, then save. Full details
                are in our <Link to="/cookies">Cookies policy</Link>.
              </p>
              <div className="cookie-pref-list">
                <label className="cookie-pref-item">
                  <input type="checkbox" checked disabled readOnly />
                  <span>
                    <strong>Necessary</strong> — required for login, security and basic site use
                  </span>
                </label>
                <label className="cookie-pref-item">
                  <input
                    type="checkbox"
                    checked={prefs.analytics}
                    onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
                  />
                  <span>
                    <strong>Analytics</strong> — help us understand traffic and improve pages
                  </span>
                </label>
                <label className="cookie-pref-item">
                  <input
                    type="checkbox"
                    checked={prefs.marketing}
                    onChange={(e) => setPrefs((p) => ({ ...p, marketing: e.target.checked }))}
                  />
                  <span>
                    <strong>Marketing</strong> — optional product updates and campaign measurement
                  </span>
                </label>
              </div>
            </div>
            <div className="cookie-banner-actions">
              <button type="button" className="btn btn-outline" onClick={() => setManageOpen(false)}>
                Back
              </button>
              <button type="button" className="btn btn-primary" onClick={() => save(prefs, 'custom')}>
                Save preferences
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
