import { useEffect, useState } from 'react'

const backgrounds = [
  '/london-skyline.jpg',
  '/london-skyline-2.jpg',
  '/london-skyline-3.jpg',
  '/london-skyline-4.jpg',
]

export default function HeroBackground() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % backgrounds.length)
    }, 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="hero-bg" aria-hidden="true">
      {backgrounds.map((src, i) => (
        <div
          key={src}
          className={`hero-bg-slide ${i === index ? 'is-active' : ''}`}
          style={{ backgroundImage: `url('${src}')` }}
        />
      ))}
    </div>
  )
}
