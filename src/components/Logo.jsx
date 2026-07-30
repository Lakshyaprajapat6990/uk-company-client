export default function Logo({ light = false }) {
  return (
    <a href="/" className={`logo ${light ? 'logo--light' : 'logo--header'}`} aria-label="UK.company home">
      <img src="/logo-footer.png" alt="UK.company" />
    </a>
  )
}
