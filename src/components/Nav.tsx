import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Logo } from './Logo'

const LINKS = [
  { to: '/empresas', label: 'Para empresas' },
  { to: '/candidatos', label: 'Para candidatos' },
  { to: '/empresa/painel', label: 'Painel demo' },
  { to: '/pesquisa', label: 'Pesquisa' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={scrolled ? 'nav nav--scrolled' : 'nav'}>
      <div className="nav-inner">
        <Logo />
        <nav className="nav-links" aria-label="Principal">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className="nav-link">
              {l.label}
            </NavLink>
          ))}
        </nav>
        <Link to="/candidato/quiz" className="btn btn--ink btn--sm nav-cta">
          Descobrir meu fit
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-mobile"
            className="nav-sheet"
            aria-label="Menu"
            initial={{ opacity: 0, transform: 'translateY(-8px) scale(0.97)' }}
            animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
            exit={{ opacity: 0, transform: 'translateY(-4px) scale(0.98)' }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          >
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className="nav-sheet-link">
                {l.label}
              </NavLink>
            ))}
            <Link to="/candidato/quiz" className="btn btn--ink">
              Descobrir meu fit
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
