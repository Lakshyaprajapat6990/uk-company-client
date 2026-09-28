import { useEffect, useState } from 'react'

const STORAGE_KEY = 'uk_cookie_consent_v1'

function readAnalyticsAllowed() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    const data = JSON.parse(raw)
    return Boolean(data?.prefs?.analytics)
  } catch {
    return false
  }
}

/**
 * Loads analytics only after cookie consent allows it.
 * Set VITE_GA_MEASUREMENT_ID in the client env when you have a real GA4 ID.
 */
export default function ConsentAnalytics() {
  const [allowed, setAllowed] = useState(() => readAnalyticsAllowed())

  useEffect(() => {
    function sync() {
      setAllowed(readAnalyticsAllowed())
    }
    window.addEventListener('uk-cookie-consent-changed', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('uk-cookie-consent-changed', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
    if (!allowed || !measurementId) return undefined

    if (document.getElementById('uk-ga-script')) return undefined

    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag = window.gtag || gtag
    gtag('js', new Date())
    gtag('config', measurementId, { anonymize_ip: true })

    const script = document.createElement('script')
    script.id = 'uk-ga-script'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [allowed])

  return null
}
