import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminApi } from '../../lib/api.js'
import { formatGbp } from '../../data/existingCompanies.js'

const EMPTY = {
  name: '',
  slug: '',
  listNo: '',
  incorporatedOn: '',
  companyNumber: '',
  price: '',
  note: '',
  featured: false,
  status: 'available',
}

function toForm(company) {
  return {
    name: company.name || '',
    slug: company.slug || '',
    listNo: company.listNo ?? '',
    incorporatedOn: company.incorporatedOn || '',
    companyNumber: company.companyNumber || '',
    price: company.price ?? '',
    note: company.note || '',
    featured: Boolean(company.featured),
    status: company.status || 'available',
  }
}

function toPayload(form) {
  return {
    name: form.name.trim(),
    slug: form.slug.trim(),
    listNo: form.listNo === '' ? undefined : Number(form.listNo),
    incorporatedOn: form.incorporatedOn.trim(),
    companyNumber: form.companyNumber.trim(),
    price: Number(form.price),
    note: form.note,
    featured: Boolean(form.featured),
    status: form.status,
  }
}

export default function AdminCompanies() {
  const [companies, setCompanies] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY)

  const load = useCallback(() => {
    setLoading(true)
    setError('')
    adminApi
      .companies()
      .then((data) => setCompanies(data.companies || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function startCreate() {
    setEditingId(null)
    setForm(EMPTY)
    setSuccess('')
    setError('')
  }

  function startEdit(company) {
    setEditingId(company._id)
    setForm(toForm(company))
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
      const payload = toPayload(form)
      if (editingId) {
        await adminApi.updateCompany(editingId, payload)
        setSuccess('Company updated.')
      } else {
        await adminApi.createCompany(payload)
        setSuccess('Company added.')
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

  async function handleDelete(company) {
    const ok = window.confirm(
      `Delete "${company.name}" (${company.companyNumber}) from companies for sale?`
    )
    if (!ok) return
    setError('')
    setSuccess('')
    try {
      await adminApi.deleteCompany(company._id)
      if (editingId === company._id) startCreate()
      setSuccess('Company deleted.')
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="admin-panel">
      <div className="admin-toolbar">
        <h2>Companies for sale</h2>
        <div className="admin-toolbar-actions">
          <button type="button" className="btn btn-outline" onClick={startCreate}>
            New company
          </button>
          <Link to="/companies-for-sale" className="btn btn-outline">
            Open public list
          </Link>
        </div>
      </div>

      {error ? <p className="auth-error">{error}</p> : null}
      {success ? <p className="auth-success">{success}</p> : null}

      <form className="admin-company-form" onSubmit={handleSubmit}>
        <h3>{editingId ? 'Edit company' : 'Add company'}</h3>
        <div className="admin-company-grid">
          <label>
            Company name
            <input
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              required
            />
          </label>
          <label>
            Slug (URL)
            <input
              value={form.slug}
              onChange={(e) => updateField('slug', e.target.value)}
              placeholder="auto from name if blank"
            />
          </label>
          <label>
            Company number
            <input
              value={form.companyNumber}
              onChange={(e) => updateField('companyNumber', e.target.value)}
              required
            />
          </label>
          <label>
            Incorporated on
            <input
              value={form.incorporatedOn}
              onChange={(e) => updateField('incorporatedOn', e.target.value)}
              placeholder="DD/MM/YYYY"
              required
            />
          </label>
          <label>
            Price (£)
            <input
              type="number"
              min="0"
              step="1"
              value={form.price}
              onChange={(e) => updateField('price', e.target.value)}
              required
            />
          </label>
          <label>
            List number
            <input
              type="number"
              min="1"
              value={form.listNo}
              onChange={(e) => updateField('listNo', e.target.value)}
              placeholder="auto if blank"
            />
          </label>
          <label>
            Status
            <select value={form.status} onChange={(e) => updateField('status', e.target.value)}>
              <option value="available">available</option>
              <option value="reserved">reserved</option>
              <option value="sold">sold</option>
            </select>
          </label>
          <label className="admin-check-label">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => updateField('featured', e.target.checked)}
            />
            Featured
          </label>
          <label className="admin-span-2">
            Note
            <input value={form.note} onChange={(e) => updateField('note', e.target.value)} />
          </label>
        </div>
        <div className="admin-form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving…' : editingId ? 'Save changes' : 'Add company'}
          </button>
          {editingId ? (
            <button type="button" className="btn btn-outline" onClick={startCreate}>
              Cancel edit
            </button>
          ) : null}
        </div>
      </form>

      {loading ? <p>Loading…</p> : null}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Company</th>
              <th>Number</th>
              <th>Incorporated</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((c) => (
              <tr key={c._id}>
                <td>{c.listNo}</td>
                <td>
                  {c.name}
                  {c.featured ? ' ★' : ''}
                  {c.note ? <div className="admin-table-note">{c.note}</div> : null}
                </td>
                <td>{c.companyNumber}</td>
                <td>{c.incorporatedOn}</td>
                <td>{formatGbp(c.price)}</td>
                <td>
                  <span className={`admin-badge admin-badge--${c.status}`}>{c.status}</span>
                </td>
                <td className="admin-actions-cell">
                  <button type="button" className="btn btn-outline" onClick={() => startEdit(c)}>
                    Edit
                  </button>
                  <Link to={`/companies-for-sale/${c.slug}`} className="btn btn-outline">
                    View
                  </Link>
                  <button
                    type="button"
                    className="btn btn-outline admin-danger-btn"
                    onClick={() => handleDelete(c)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
