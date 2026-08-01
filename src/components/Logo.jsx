export default function Logo({ light = false, header = false }) {
  const src = header ? '/new_Logo.png' : '/logo-footer.png'

  return (
    <a href="/" className={`logo ${light ? 'logo--light' : 'logo--header'}`} aria-label="UK.company home">
      <img src={src} alt="UK.company" />
    </a>
  )
}
