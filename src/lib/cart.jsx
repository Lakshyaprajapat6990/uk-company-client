import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CART_KEY = 'uk_cart'
const CartContext = createContext(null)

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY)
    const parsed = JSON.parse(raw || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadCart())

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items])

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      total: items.reduce((sum, item) => sum + Number(item.price || 0) * (item.quantity || 1), 0),
      addItem(item) {
        setItems((prev) => {
          const id = item.id
          if (prev.some((row) => row.id === id)) return prev
          return [...prev, { quantity: 1, ...item, id }]
        })
      },
      removeItem(id) {
        setItems((prev) => prev.filter((row) => row.id !== id))
      },
      clear() {
        setItems([])
      },
    }),
    [items]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
