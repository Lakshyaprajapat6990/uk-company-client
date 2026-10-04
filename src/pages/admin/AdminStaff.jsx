import { useCallback, useEffect, useState } from 'react'
import { adminApi } from '../../lib/api.js'
import { ADMIN_PERMISSIONS } from '../../lib/permissions.js'
import { useAuth } from '../../lib/auth.jsx'

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  password: '',
  permissions: [],
  isActive: true,
}

export default function AdminStaff() {
  const { user: me } = useAuth()
  const [staff, setStaff] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY)

  const load = useCallback(() => {
    setLoading(true)
    setError('')
    adminApi
      .staff()
      .then((data) => setStaff(data.staff || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function togglePermission(key) {
    setForm((prev) => {
      const has = prev.permissions.includes(key)
      return {
        ...prev,
        permissions: has
          ? prev.permissions.filter((k) => k !== key)
          : [...prev.permissions, key],
      }
    })
  }

  function startCreate() {
    setEditingId(null)
    setForm(EMPTY)
    setSuccess('')
    setError('')
  }

  function startEdit(member) {
    setEditingId(member._id)
    setForm({
      name: member.name || '',
      email: member.email || '',
      phone: member.phone || '',
      password: '',
      permissions:
        member.role === 'super_admin' ||
        (Array.isArray(member.permissions) && member.permissions.includes('all'))
          ? ADMIN_PERMISSIONS.map((p) => p.key)
          : Array.isArray(member.permissions)
            ? member.permissions
            : [],
      isActive: member.isActive !== false,
    })
    setSuccess('')
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      if (editingId) {
        const payload = {
          name: form.name.trim(),
          phone: form.phone.trim(),
        }
        if (!editingIsSuper) {
          payload.isActive = form.isActive
          payload.permissions = form.permissions
        }
        if (form.password.trim()) payload.password = form.password
        await adminApi.updateStaff(editingId, payload)
        setSuccess('Admin updated.')
      } else {
        await adminApi.createStaff({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          password: form.password,
          permissions: form.permissions,
        })
        setSuccess('Admin created. They can sign in with email OTP 2FA.')
        setForm(EMPTY)
      }
      setEditingId(null)
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(member) {
    if (String(member._id) === String(me?.id || me?._id)) {
      setError('You cannot delete your own account.')
      return
    }
    if (member.role === 'super_admin') {
      setError('Cannot delete a super admin account.')
      return
    }
    const ok = window.confirm(
      `Delete admin "${member.name}" (${member.email})?\nThis cannot be undone.`
    )
    if (!ok) return

    setDeletingId(member._id)
    setError('')
    try {
      await adminApi.deleteStaff(member._id)
      if (editingId === member._id) startCreate()
      await load()
      setSuccess('Admin deleted.')
    } catch (err) {
      setError(err.message)
    } finally {
      setDeletingId('')
    }
  }

  const editingMember = staff.find((s) => s._id === editingId)
  const editingIsSuper = editingMember?.role === 'super_admin'

  return (
    <div className="admin-panel">
      <div className="admin-toolbar">
        <h2>Admins &amp; access</h2>
        <button type="button" className="btn btn-outline" onClick={load}>
          Refresh
        </button>
      </div>

      <p className="admin-note">
        Super Admin can create Admin accounts and choose which CMS modules each Admin can open.
        Admins always use email OTP 2FA when signing in.
      </p>

      {error ? <p className="auth-error">{error}</p> : null}
      {success ? <p className="auth-success">{success}</p> : null}

      <form className="admin-company-form" onSubmit={handleSubmit}>
        <h3>{editingId ? 'Edit admin' : 'Create admin'}</h3>
        <div className="admin-company-grid">
          <label>
            Name
            <input
              required
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              autoComplete="name"
            />
          </label>
          <label>
            Email
            <input
              required={!editingId}
              type="email"
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              disabled={Boolean(editingId)}
              autoComplete="email"
            />
          </label>
          <label>
            Phone
            <input
              value={form.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              autoComplete="tel"
            />
          </label>
          <label>
            {editingId ? 'New password (optional)' : 'Password'}
            <input
              required={!editingId}
              type="password"
              value={form.password}
              onChange={(e) => updateField('password', e.target.value)}
              minLength={editingId && !form.password ? undefined : 6}
              autoComplete="new-password"
            />
          </label>
          {editingId && !editingIsSuper ? (
            <label className="admin-check-label">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => updateField('isActive', e.target.checked)}
              />
              Active account
            </label>
          ) : null}
          <fieldset className="admin-span-2 admin-perm-fieldset">
            <legend>Module access</legend>
            {editingIsSuper ? (
              <p className="admin-note">Super Admin always has full access to every module.</p>
            ) : (
              <div className="admin-perm-grid">
                {ADMIN_PERMISSIONS.map((p) => (
                  <label key={p.key} className="admin-check-label">
                    <input
                      type="checkbox"
                      checked={form.permissions.includes(p.key)}
                      onChange={() => togglePermission(p.key)}
                    />
                    {p.label}
                  </label>
                ))}
              </div>
            )}
          </fieldset>
        </div>
        <div className="admin-form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving…' : editingId ? 'Save changes' : 'Create admin'}
          </button>
          {editingId ? (
            <button type="button" className="btn btn-outline" onClick={startCreate}>
              Cancel edit
            </button>
          ) : null}
        </div>
      </form>

      {loading ? <p>Loading staff...</p> : null}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Access</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((member) => {
              const isSelf = String(member._id) === String(me?.id || me?._id)
              const access =
                member.role === 'super_admin' ||
                (Array.isArray(member.permissions) && member.permissions.includes('all'))
                  ? 'Full access'
                  : Array.isArray(member.permissions) && member.permissions.length
                    ? member.permissions.join(', ')
                    : 'None'
              return (
                <tr key={member._id}>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.role === 'super_admin' ? 'Super Admin' : 'Admin'}</td>
                  <td>{access}</td>
                  <td>{member.isActive === false ? 'No' : 'Yes'}</td>
                  <td className="admin-actions-cell">
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => startEdit(member)}
                      disabled={member.role === 'super_admin' && !isSelf}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline admin-danger-btn"
                      disabled={
                        isSelf ||
                        member.role === 'super_admin' ||
                        deletingId === member._id
                      }
                      onClick={() => handleDelete(member)}
                    >
                      {deletingId === member._id ? 'Deleting…' : 'Delete'}
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
