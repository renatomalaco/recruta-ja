import { Link } from 'react-router-dom'

/** Marca: dois marcadores sobre uma régua, a ideia central do produto. */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden className="logo-mark">
      <rect width="32" height="32" rx="9" fill="var(--sun)" />
      <path d="M6 20.5h20" stroke="var(--on-sun)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="20.5" r="4.5" fill="var(--cobalt)" />
      <circle cx="19.5" cy="20.5" r="4.5" fill="var(--magenta)" style={{ mixBlendMode: 'multiply' }} />
      <path d="M9 9.5h14" stroke="var(--on-sun)" strokeWidth="2" strokeLinecap="round" opacity=".35" />
    </svg>
  )
}

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Recruta Já, página inicial">
      <LogoMark />
      <span className="logo-text">Recruta Já</span>
    </Link>
  )
}
