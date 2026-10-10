import { useEffect, useState } from 'react'
import { websiteApi } from '../lib/api.js'

/** Load a CMS website page by slug. Falls back to null content on error. */
export default function useWebsitePage(slug) {
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(Boolean(slug))
  const [error, setError] = useState('')

  useEffect(() => {
    if (!slug) {
      setPage(null)
      setLoading(false)
      return
    }
    let cancelled = false
    setLoading(true)
    setError('')
    websiteApi
      .get(slug)
      .then((data) => {
        if (!cancelled) setPage(data.page || null)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || 'Failed to load page')
          setPage(null)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  return { page, content: page?.content || null, loading, error }
}
