import { useState } from 'react'
import { SURVEY_URL_CANDIDATOS, SURVEY_URL_EMPRESAS } from '../config'
import { clearAll } from '../lib/storage'

function SurveyLink({ url, label }: { url: string; label: string }) {
  if (!url) {
    return (
      <p className="notice small">
        O link desta pesquisa ainda não foi configurado. Edite <code>src/config.ts</code> para adicionar.
      </p>
    )
  }
  return (
    <a href={url} target="_blank" rel="noreferrer" className="btn btn--ink">
      {label}
    </a>
  )
}

export default function Pesquisa() {
  const [reset, setReset] = useState(false)
  return (
    <section className="section container">
      <div className="section-head">
        <h1 className="h2">Pesquisa de validação</h1>
        <p className="muted measure">
          O Recruta Já ainda está sendo construído. Suas respostas mostram se a ideia resolve um problema real e o que
          precisa vir primeiro.
        </p>
      </div>
      <div className="survey">
        <div className="survey-col">
          <h2 className="h3">Para empresas</h2>
          <p className="muted">
            Queremos entender os desafios de retenção da sua empresa e o impacto de contratar primeiro pela cultura
            organizacional.
          </p>
          <SurveyLink url={SURVEY_URL_EMPRESAS} label="Responder como empresa" />
        </div>
        <div className="survey-col">
          <h2 className="h3">Para candidatos</h2>
          <p className="muted">
            Queremos ouvir como essa abordagem pode mudar a sua busca por oportunidades de estágio e júnior em
            tecnologia.
          </p>
          <SurveyLink url={SURVEY_URL_CANDIDATOS} label="Responder como candidato" />
        </div>
      </div>

      <div className="reset">
        <p className="small muted">
          Apresentando o protótipo para outra pessoa? Limpe as respostas e o progresso salvos neste navegador.
        </p>
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          disabled={reset}
          onClick={() => {
            clearAll()
            setReset(true)
          }}
        >
          {reset ? 'Demonstração reiniciada' : 'Reiniciar demonstração'}
        </button>
      </div>
    </section>
  )
}
