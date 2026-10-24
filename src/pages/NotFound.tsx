import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section container empty">
      <h1 className="h2">Esta página não existe</h1>
      <p className="muted">O endereço pode ter mudado. Volte para o início e siga por lá.</p>
      <Link to="/" className="btn btn--ink">
        Ir para o início
      </Link>
    </section>
  )
}
