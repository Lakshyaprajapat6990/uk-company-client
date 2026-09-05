import { ordersApi, PENDING_ORDER_KEY, PENDING_SHELF_KEY, shelfApi } from './api.js'

/** After login/register: resume pending shelf reserve or formation order. */
export async function resumePendingOrder(navigate, fallback = '/portal') {
  const shelfRaw = sessionStorage.getItem(PENDING_SHELF_KEY)
  if (shelfRaw) {
    sessionStorage.removeItem(PENDING_SHELF_KEY)
    try {
      const payload = JSON.parse(shelfRaw)
      const data = await shelfApi.reserve(payload.slug, {
        wantsVerificationService: Boolean(payload.wantsVerificationService),
      })
      navigate(`/portal/orders/${data.order._id}`)
      return
    } catch {
      navigate('/companies-for-sale')
      return
    }
  }

  const raw = sessionStorage.getItem(PENDING_ORDER_KEY)
  if (!raw) {
    navigate(fallback)
    return
  }
  sessionStorage.removeItem(PENDING_ORDER_KEY)
  try {
    const payload = JSON.parse(raw)
    const data = await ordersApi.create(payload)
    navigate(`/portal/orders/${data.order._id}`)
  } catch {
    navigate('/portal')
  }
}

/** Admins go to CMS; customers resume pending work or portal. */
export async function afterAuthNavigate(user, navigate, fallback = '/portal') {
  if (user?.role === 'admin') {
    navigate('/admin')
    return
  }
  await resumePendingOrder(navigate, fallback)
}
