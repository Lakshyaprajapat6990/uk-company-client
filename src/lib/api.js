const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function getToken() {
  return localStorage.getItem('uk_token') || ''
}

export async function api(path, options = {}) {
  const headers = {
    ...(options.body && !(options.body instanceof FormData)
      ? { 'Content-Type': 'application/json' }
      : {}),
    ...(options.headers || {}),
  }

  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    body:
      options.body && !(options.body instanceof FormData) && typeof options.body !== 'string'
        ? JSON.stringify(options.body)
        : options.body,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`)
  }
  return data
}

export const authApi = {
  register: (body) => api('/auth/register', { method: 'POST', body }),
  login: (body) => api('/auth/login', { method: 'POST', body }),
  verify2FA: (body) => api('/auth/2fa/verify', { method: 'POST', body }),
  setup2FA: () => api('/auth/2fa/setup', { method: 'POST' }),
  enable2FA: (body) => api('/auth/2fa/enable', { method: 'POST', body }),
  forgotPassword: (body) => api('/auth/forgot-password', { method: 'POST', body }),
  resetPassword: (body) => api('/auth/reset-password', { method: 'POST', body }),
  changePassword: (body) => api('/auth/change-password', { method: 'POST', body }),
  verifyEmail: (body) => api('/auth/verify-email', { method: 'POST', body }),
  resendVerification: () => api('/auth/resend-verification', { method: 'POST' }),
  me: () => api('/auth/me'),
}

export const ordersApi = {
  create: (body) => api('/orders', { method: 'POST', body }),
  mine: () => api('/orders/mine'),
  get: (id) => api(`/orders/${id}`),
  pay: (id, body = {}) => api(`/orders/${id}/pay`, { method: 'POST', body }),
  saveFormationDetails: (id, formationDetails) =>
    api(`/orders/${id}/formation-details`, { method: 'PUT', body: { formationDetails } }),
  timeline: (id) => api(`/orders/${id}/timeline`),
  uploadId: async (id, files, docType = 'passport') => {
    const form = new FormData()
    form.append('docType', docType)
    ;[...files].forEach((f) => form.append('files', f))
    return api(`/orders/${id}/id-documents`, { method: 'POST', body: form })
  },
  saveTransferDetails: (id, transferDetails) =>
    api(`/orders/${id}/transfer-details`, { method: 'PUT', body: { transferDetails } }),
}

export const shelfApi = {
  list: () => api('/companies-for-sale'),
  get: (slug) => api(`/companies-for-sale/${slug}`),
  reserve: (slug, body = {}) => api(`/companies-for-sale/${slug}/reserve`, { method: 'POST', body }),
}

export const adminApi = {
  stats: () => api('/admin/stats'),
  orders: (params = {}) => {
    const q = new URLSearchParams()
    if (params.status) q.set('status', params.status)
    if (params.paymentStatus) q.set('paymentStatus', params.paymentStatus)
    if (params.limit) q.set('limit', String(params.limit))
    const qs = q.toString()
    return api(`/admin/orders${qs ? `?${qs}` : ''}`)
  },
  updateOrderStatus: (id, body) => api(`/admin/orders/${id}/status`, { method: 'PATCH', body }),
  users: () => api('/admin/users'),
  deleteUser: (id) => api(`/admin/users/${id}`, { method: 'DELETE' }),
  companies: () => api('/admin/companies'),
  createCompany: (body) => api('/admin/companies', { method: 'POST', body }),
  updateCompany: (id, body) => api(`/admin/companies/${id}`, { method: 'PATCH', body }),
  deleteCompany: (id) => api(`/admin/companies/${id}`, { method: 'DELETE' }),
  importCompanies: async (file) => {
    const form = new FormData()
    form.append('file', file)
    return api('/admin/companies/import', { method: 'POST', body: form })
  },
  downloadCompanyTemplate: async () => {
    const token = getToken()
    const res = await fetch(`${API_BASE}/admin/companies/import-template`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.message || `Request failed (${res.status})`)
    }
    return res.blob()
  },
  subscribers: (params = {}) => {
    const q = new URLSearchParams()
    if (params.q) q.set('q', params.q)
    if (params.status) q.set('status', params.status)
    if (params.limit) q.set('limit', String(params.limit))
    const qs = q.toString()
    return api(`/admin/subscribers${qs ? `?${qs}` : ''}`)
  },
  updateSubscriber: (id, body) => api(`/admin/subscribers/${id}`, { method: 'PATCH', body }),
  deleteSubscriber: (id) => api(`/admin/subscribers/${id}`, { method: 'DELETE' }),
  exportSubscribers: async (params = {}) => {
    const q = new URLSearchParams()
    if (params.status) q.set('status', params.status)
    const qs = q.toString()
    const token = getToken()
    const res = await fetch(`${API_BASE}/admin/subscribers/export${qs ? `?${qs}` : ''}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.message || `Request failed (${res.status})`)
    }
    return res.blob()
  },
  getHomepage: () => api('/admin/homepage'),
  saveHomepage: (body) => api('/admin/homepage', { method: 'PUT', body }),
  resetHomepage: () => api('/admin/homepage/reset', { method: 'POST' }),
  listWebsitePages: () => api('/admin/website'),
  getWebsitePage: (slug) => api(`/admin/website/${encodeURIComponent(slug)}`),
  saveWebsitePage: (slug, body) =>
    api(`/admin/website/${encodeURIComponent(slug)}`, { method: 'PUT', body }),
  resetWebsitePage: (slug) =>
    api(`/admin/website/${encodeURIComponent(slug)}/reset`, { method: 'POST' }),
  permissions: () => api('/admin/permissions'),
  staff: () => api('/admin/staff'),
  createStaff: (body) => api('/admin/staff', { method: 'POST', body }),
  updateStaff: (id, body) => api(`/admin/staff/${id}`, { method: 'PATCH', body }),
  deleteStaff: (id) => api(`/admin/staff/${id}`, { method: 'DELETE' }),
}

export const newsletterApi = {
  subscribe: (body) => api('/newsletter/subscribe', { method: 'POST', body }),
  unsubscribe: (body) => api('/newsletter/unsubscribe', { method: 'POST', body }),
}

export const homepageApi = {
  get: () => api('/homepage'),
}

export const websiteApi = {
  list: () => api('/website'),
  get: (slug) => api(`/website/${encodeURIComponent(slug)}`),
}

export const PENDING_ORDER_KEY = 'uk_pending_order'
export const PENDING_SHELF_KEY = 'uk_pending_shelf'

export { API_BASE }
