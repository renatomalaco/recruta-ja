import { Link } from 'react-router-dom'
import { FitRuler, RulerLegend } from '../components/FitRuler'
import type { HardSkill } from '../data/dimensions'
import { QUESTIONS } from '../data/questions'
import { archetype, topSoftSkills, vectorFromAnswers } from '../lib/fit'
import { useStored } from '../lib/storage'

export function EmptyProfile() {
  return (
    <section className="section container empty">
      <h1 className="h2">Você ainda não fez o seu mapeamento</h1>
      <p className="muted measure">
        São dez situações do dia a dia de trabalho. Com elas, a gente monta a sua régua cultural e encontra as empresas
        com mais fit.
      </p>
      <Link to="/candidato/quiz" className="btn btn--ink">
        Começar o mapeamento
      </Link>
    </section>
  )
}

export default function Perfil() {
  const [answers] = useStored<Record<string, number>>('answers', {})
  const [skills] = useStored<HardSkill[]>('skills', [])

  if (Object.keys(answers).length < QUESTIONS.length) return <EmptyProfile />

  const vector = vectorFromAnswers(answers)
  const type = archetype(vector)
  const soft = topSoftSkills(vector)

  return (
    <>
      <section className="field field--sun page-hero page-hero--tight">
        <div className="container profile-hero">
          <h1 className="display">{type.name}</h1>
          <p className="lead measure">{type.description}</p>
        </div>
      </section>

      <section className="section container profile-grid">
        <div className="panel">
          <h2 className="h3">Sua régua</h2>
          <p className="small muted">Onde você está em cada dimensão. Nenhum lado é melhor que o outro.</p>
          <FitRuler candidate={vector} intro />
          <RulerLegend candidate="Você" />
        </div>
        <div className="profile-side">
          <div>
            <h2 className="h3">Soft skills em destaque</h2>
            <ul className="tag-list">
              {soft.map((s) => (
                <li key={s} className="tag tag--magenta">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h3">Hard skills que você marcou</h2>
            {skills.length ? (
              <ul className="tag-list">
                {skills.map((s) => (
                  <li key={s} className="tag">
                    {s}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="small muted">Nenhuma ainda. Tudo bem: as trilhas existem para isso.</p>
            )}
          </div>
          <div className="actions">
            <Link to="/candidato/vagas" className="btn btn--ink">
              Ver vagas com fit
            </Link>
            <Link to="/candidato/quiz" className="btn btn--ghost">
              Refazer o mapeamento
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
