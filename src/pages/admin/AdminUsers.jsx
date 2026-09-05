import { useCallback, useEffect, useState } from 'react'
import { adminApi } from '../../lib/api.js'
import { useAuth } from '../../lib/auth.jsx'

export default function AdminUsers() {
  const { user: me } = useAuth()
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState('')

  const load = useCallback(() => {
    setLoading(true)
    setError('')
    adminApi
      .users()
      .then((data) => setUsers(data.users || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  async function handleDelete(user) {
    if (String(user._id) === String(me?._id)) {
      setError('You cannot delete your own admin account.')
      return
    }
    const ok = window.confirm(
      `Delete user "${user.name}" (${user.email})?\nThis cannot be undone.`
    )
    if (!ok) return

    setDeletingId(user._id)
    setError('')
    try {
      await adminApi.deleteUser(user._id)
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setDeletingId('')
    }
  }

  return (
    <div className="admin-panel">
      <div className="admin-toolbar">
        <h2>Users</h2>
        <button type="button" className="btn btn-outline" onClick={load}>
          Refresh
        </button>
      </div>
      {error ? <p className="auth-error">{error}</p> : null}
      {loading ? <p>Loading users...</p> : null}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Active</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const isSelf = String(u._id) === String(me?._id)
              return (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.phone || '-'}</td>
                  <td>{u.role}</td>
                  <td>{u.isActive === false ? 'No' : 'Yes'}</td>
                  <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-GB') : '-'}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline admin-danger-btn"
                      disabled={isSelf || deletingId === u._id}
                      onClick={() => handleDelete(u)}
                      title={isSelf ? 'Cannot delete your own account' : 'Delete user'}
                    >
                      {deletingId === u._id ? 'Deleting…' : 'Delete'}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
