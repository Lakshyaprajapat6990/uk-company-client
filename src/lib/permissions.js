/** Shared admin permission keys for UK.company CMS (client) */
export const ADMIN_PERMISSIONS = [
  { key: 'overview', label: 'Overview / dashboard' },
  { key: 'orders', label: 'Orders & ID review' },
  { key: 'companies', label: 'Companies for sale' },
  { key: 'users', label: 'Customers / users' },
  { key: 'subscribers', label: 'Newsletter subscribers' },
  { key: 'website', label: 'Full website content (all pages)' },
]

function permissionAliases(key) {
  if (key === 'website') return ['website', 'homepage']
  if (key === 'homepage') return ['homepage', 'website']
  return [key]
}

export function isStaffRole(role) {
  return role === 'admin' || role === 'super_admin'
}

export function isStaffUser(user) {
  return Boolean(user && isStaffRole(user.role))
}

export function hasPermission(user, key) {
  if (!isStaffUser(user)) return false
  if (user.role === 'super_admin') return true
  const list = Array.isArray(user.permissions) ? user.permissions : []
  if (list.includes('all')) return true
  return permissionAliases(key).some((k) => list.includes(k))
}

export function firstAllowedAdminPath(user) {
  if (!isStaffUser(user)) return '/portal'
  if (user.role === 'super_admin' || hasPermission(user, 'overview')) return '/admin'
  const order = [
    ['orders', '/admin/orders'],
    ['companies', '/admin/companies'],
    ['users', '/admin/users'],
    ['subscribers', '/admin/subscribers'],
    ['website', '/admin/website'],
  ]
  for (const [key, path] of order) {
    if (hasPermission(user, key)) return path
  }
  return '/admin'
}
