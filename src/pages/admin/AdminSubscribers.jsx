import { useEffect, useState } from 'react'
import { adminApi } from '../../lib/api.js'

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState('')

  function load() {
    setLoading(true)
    adminApi
      .subscribers()
      .then((data) => setSubscribers(data.subscribers || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  async function remove(id) {
    if (!window.confirm('Remove this subscriber?')) return
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

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2>Newsletter subscribers</h2>
        <p>{subscribers.length} email{subscribers.length === 1 ? '' : 's'} on the list</p>
      </div>
      {error ? <p className="auth-error">{error}</p> : null}
      {loading ? <p>Loading...</p> : null}
      {!loading && subscribers.length === 0 ? (
        <p>No newsletter signups yet.</p>
      ) : null}
      {subscribers.length ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Source</th>
                <th>Status</th>
                <th>Joined</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {subscribers.map((row) => (
                <tr key={row._id}>
                  <td>{row.email}</td>
                  <td>{row.source || 'footer'}</td>
                  <td>{row.isActive ? 'Active' : 'Inactive'}</td>
                  <td>{row.createdAt ? new Date(row.createdAt).toLocaleString() : '-'}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline"
                      disabled={busyId === row._id}
                      onClick={() => remove(row._id)}
                    >
                      Remove
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
