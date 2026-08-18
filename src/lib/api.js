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

export const PENDING_ORDER_KEY = 'uk_pending_order'
export const PENDING_SHELF_KEY = 'uk_pending_shelf'

export { API_BASE }
