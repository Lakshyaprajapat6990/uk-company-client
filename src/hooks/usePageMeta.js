import { useEffect } from 'react'

/**
 * Sets document title, meta description, and canonical link while mounted.
 * @param {string} title
 * @param {string} description
 * @param {string} [canonicalPath] e.g. '/id-verification'
 */
export default function usePageMeta(title, description, canonicalPath) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    const meta = document.querySelector('meta[name="description"]')
    const prevDescription = meta?.getAttribute('content') ?? ''
    if (meta && description) meta.setAttribute('content', description)

    let canonical = document.querySelector('link[rel="canonical"]')
    const createdCanonical = !canonical
    const prevCanonical = canonical?.getAttribute('href') ?? ''
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    if (canonicalPath) {
      const origin = window.location.origin
      canonical.setAttribute('href', `${origin}${canonicalPath}`)
    }

    return () => {
      document.title = prevTitle
      if (meta) meta.setAttribute('content', prevDescription)
      if (createdCanonical && canonical?.parentNode) {
        canonical.parentNode.removeChild(canonical)
      } else if (canonical && prevCanonical) {
        canonical.setAttribute('href', prevCanonical)
      } else if (canonical && !prevCanonical) {
        canonical.removeAttribute('href')
      }
    }
  }, [title, description, canonicalPath])
}
