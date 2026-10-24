import { Link } from 'react-router-dom'
import { TRACKS } from '../data/tracks'

const COMPARISON = [
  {
    topic: 'Triagem',
    before: 'Currículo, anos de experiência e lista de tecnologias.',
    after: 'Fit cultural em cinco dimensões, medido antes do currículo.',
  },
  {
    topic: 'Lacuna técnica',
    before: 'Elimina a pessoa, mesmo com o perfil ideal.',
    after: 'Vira uma trilha de capacitação feita para a vaga.',
  },
  {
    topic: 'Entrevista',
    before: 'Candidatos nervosos e despreparados, entrevistas que rendem pouco.',
    after: 'Candidatos que treinaram com um recrutador de IA da área da vaga.',
  },
  {
    topic: 'Onboarding',
    before: 'Começa do zero no primeiro dia.',
    after: 'Começa com a trilha concluída e acompanhada por você.',
  },
  {
    topic: 'Turnover',
    before: 'O desalinhamento aparece meses depois da contratação.',
    after: 'O risco de desalinhamento aparece antes da entrevista.',
  },
]

const SAMPLE_TRACK = [...TRACKS.React, ...TRACKS.TypeScript]

export default function Empresas() {
  const totalMinutes = SAMPLE_TRACK.reduce((s, m) => s + m.minutes, 0)
  return (
    <>
      <section className="field field--cobalt page-hero">
        <div className="container">
          <h1 className="display">Seu turnover não é técnico.</h1>
          <p className="lead measure">
            Profissionais são contratados pelas hard skills e desligados por desalinhamento comportamental e cultural.
            O Recruta Já conecta sua empresa a quem tem alto fit com os seus valores, e capacita a parte técnica que
            faltar.
          </p>
          <div className="actions">
            <Link to="/empresa/cultura" className="btn btn--sun">
              Criar o perfil cultural da empresa
            </Link>
            <Link to="/empresa/painel" className="btn btn--outline-light">
              Ver painel de demonstração
            </Link>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2 className="h2">O que muda no seu processo seletivo</h2>
        </div>
        <div className="compare" role="table" aria-label="Comparação entre o processo atual e o Recruta Já">
          <div className="compare-row compare-row--head" role="row">
            <span role="columnheader" className="visually-hidden">
              Etapa
            </span>
            <span role="columnheader">Como costuma ser</span>
            <span role="columnheader">Com o Recruta Já</span>
          </div>
          {COMPARISON.map((row) => (
            <div className="compare-row" role="row" key={row.topic}>
              <span role="rowheader" className="compare-topic">
                {row.topic}
              </span>
              <span role="cell" className="compare-before">
                {row.before}
              </span>
              <span role="cell" className="compare-after">
                {row.after}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="section container uni">
        <div>
          <h2 className="h2">Uma universidade corporativa, sem precisar montar uma.</h2>
          <p className="muted measure">
            Para cada pessoa com o perfil certo e alguma lacuna técnica, a plataforma monta uma trilha com o que a vaga
            exige. Você acompanha o progresso no painel e contrata quem concluiu, sem custo de treinamento interno.
          </p>
          <div className="actions">
            <Link to="/empresa/painel" className="btn btn--ink">
              Ver o painel de demonstração
            </Link>
          </div>
        </div>
        <div className="track-sample">
          <div className="track-sample-head">
            <p className="h3">Trilha: Front-end Júnior</p>
            <p className="small muted">
              {SAMPLE_TRACK.length} módulos, {Math.floor(totalMinutes / 60)}h{String(totalMinutes % 60).padStart(2, '0')}
            </p>
          </div>
          <ol className="track-sample-list">
            {SAMPLE_TRACK.map((m, i) => (
              <li key={m.id}>
                <span className="track-sample-index">{i + 1}</span>
                <span>{m.title}</span>
                <span className="small muted tnum">{m.minutes} min</span>
              </li>
            ))}
          </ol>
          <p className="small muted">Conteúdo ilustrativo</p>
        </div>
      </section>
    </>
  )
}
