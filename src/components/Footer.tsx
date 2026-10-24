import { Link } from 'react-router-dom'
import { clearAll } from '../lib/storage'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Logo />
          <p>Recrutamento por fit cultural, com capacitação técnica para quem tem o perfil certo.</p>
        </div>
        <nav className="footer-links" aria-label="Rodapé">
          <Link to="/empresas">Para empresas</Link>
          <Link to="/candidatos">Para candidatos</Link>
          <Link to="/candidato/quiz">Mapeamento cultural</Link>
          <Link to="/candidato/entrevista">Treino de entrevista</Link>
          <Link to="/empresa/cultura">Perfil da empresa</Link>
          <button
            type="button"
            className="footer-reset"
            onClick={() => {
              clearAll()
              window.location.assign(import.meta.env.BASE_URL)
            }}
          >
            Reiniciar demonstração
          </button>
        </nav>
        <p className="footer-note">
          Protótipo de validação. Empresas, vagas e pessoas exibidas aqui são fictícias.
        </p>
      </div>
    </footer>
  )
}
