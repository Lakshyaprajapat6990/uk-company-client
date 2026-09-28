import { useEffect, useMemo, useState } from 'react'
import { adminApi } from '../../lib/api.js'

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState('')
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [exporting, setExporting] = useState(false)

  function load() {
    setLoading(true)
    setError('')
    adminApi
      .subscribers({ q: query, status })
      .then((data) => setSubscribers(data.subscribers || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const counts = useMemo(() => {
    const active = subscribers.filter((s) => s.isActive).length
    return { total: subscribers.length, active, inactive: subscribers.length - active }
  }, [subscribers])

  async function search(e) {
    e?.preventDefault()
    load()
  }

  async function remove(id) {
    if (!window.confirm('Permanently delete this subscriber?')) return
    setBusyId(id)
    setError('')
    try {
      await adminApi.deleteSubscriber(id)
      setSubscribers((list) => list.filter((s) => s._id !== id))
    } catch (err) {
      setError(err.message)
    } finally {
      setBusyId('')
    }
  }

  async function toggleStatus(row) {
    setBusyId(row._id)
    setError('')
    try {
      const data = await adminApi.updateSubscriber(row._id, { isActive: !row.isActive })
      setSubscribers((list) =>
        list.map((s) => (s._id === row._id ? data.subscriber || { ...s, isActive: !s.isActive } : s))
      )
    } catch (err) {
      setError(err.message)
    } finally {
      setBusyId('')
    }
  }

  async function exportCsv() {
    setExporting(true)
    setError('')
    try {
      const blob = await adminApi.exportSubscribers({ status })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'newsletter-subscribers.csv'
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err.message)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2>Newsletter subscribers</h2>
        <p>
          {counts.total} shown · {counts.active} active · {counts.inactive} unsubscribed
        </p>
      </div>

      <form className="admin-toolbar" onSubmit={search}>
        <label>
          Search
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="email…"
          />
        </label>
        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="unsubscribed">Unsubscribed</option>
          </select>
        </label>
        <div className="admin-toolbar-actions">
          <button type="submit" className="btn btn-outline" disabled={loading}>
            Search
          </button>
          <button type="button" className="btn btn-outline" disabled={exporting} onClick={exportCsv}>
            {exporting ? 'Exporting…' : 'Export CSV'}
          </button>
        </div>
      </form>

      {error ? <p className="auth-error">{error}</p> : null}
      {loading ? <p>Loading...</p> : null}
      {!loading && subscribers.length === 0 ? <p>No newsletter signups match.</p> : null}

      {subscribers.length ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Source</th>
                <th>Status</th>
                <th>Consent</th>
                <th>Joined</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {subscribers.map((row) => (
                <tr key={row._id}>
                  <td>{row.email}</td>
                  <td>{row.source || 'footer'}</td>
                  <td>{row.isActive ? 'Active' : 'Unsubscribed'}</td>
                  <td>{row.consentAt ? new Date(row.consentAt).toLocaleDateString() : '-'}</td>
                  <td>{row.createdAt ? new Date(row.createdAt).toLocaleString() : '-'}</td>
                  <td className="admin-actions-cell">
                    <button
                      type="button"
                      className="btn btn-outline"
                      disabled={busyId === row._id}
                      onClick={() => toggleStatus(row)}
                    >
                      {row.isActive ? 'Unsubscribe' : 'Reactivate'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline admin-danger-btn"
                      disabled={busyId === row._id}
                      onClick={() => remove(row._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  )
}
