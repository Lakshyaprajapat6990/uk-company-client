import { useEffect, useRef, useState } from 'react'

const VARIANTS = new Set(['left', 'right', 'top', 'bottom', 'popup', 'blink', 'float'])

export default function Reveal({ children, className = '', delay = 0, variant = 'bottom' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const type = VARIANTS.has(variant) ? variant : 'bottom'

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal reveal--${type} ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
