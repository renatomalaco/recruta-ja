import { Check, GraduationCap, MapPin, MessagesSquare } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FitNumber } from '../components/FitNumber'
import { FitRuler, RulerLegend } from '../components/FitRuler'
import { COMPANIES, JOBS, companyById, jobName } from '../data/companies'
import type { HardSkill } from '../data/dimensions'
import { INTERVIEW_MIN_FIT } from '../data/interview'
import { QUESTIONS } from '../data/questions'
import { culturalFit, fitLabel, skillGaps, vectorFromAnswers } from '../lib/fit'
import { formatMinutes, trackMinutes } from '../lib/format'
import { useStored } from '../lib/storage'
import { EmptyProfile } from './Perfil'

export default function Vagas() {
  const [answers] = useStored<Record<string, number>>('answers', {})
  const [skills] = useStored<HardSkill[]>('skills', [])
  const [applied, setApplied] = useStored<string[]>('applied', [])
  const [interviews] = useStored<Record<string, number>>('interviews', {})
  const [openId, setOpenId] = useState<string | null>(null)

  if (Object.keys(answers).length < QUESTIONS.length) return <EmptyProfile />

  const me = vectorFromAnswers(answers)
  const ranked = JOBS.map((job) => {
    const company = companyById(job.companyId)!
    return { job, company, fit: culturalFit(company.culture, me), gaps: skillGaps(job.skills, skills) }
  }).sort((a, b) => b.fit - a.fit)

  return (
    <section className="section container">
      <div className="section-head">
        <h1 className="h2">Vagas ordenadas pelo seu fit cultural</h1>
        <p className="muted measure">
          {JOBS.length} vagas de estágio e júnior em {COMPANIES.length} empresas. A técnica que faltar aparece como
          trilha, não como motivo para te descartar.
        </p>
      </div>

      <ol className="job-list">
        {ranked.map(({ job, company, fit, gaps }, i) => {
          const isOpen = openId === job.id
          const isApplied = applied.includes(job.id)
          return (
            <motion.li
              key={job.id}
              className="job"
              initial={{ opacity: 0, transform: 'translateY(8px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1], delay: i * 0.05 }}
            >
              <div className="job-main">
                <div className="job-info">
                  <p className="small muted">
                    {company.name}, {company.segment}
                  </p>
                  <h2 className="job-title">
                    {jobName(job)}
                  </h2>
                  <p className="small muted job-meta">
                    <MapPin size={14} strokeWidth={1.75} aria-hidden /> {company.city}, {job.mode.toLowerCase()}
                  </p>
                  <p className="job-summary">{job.summary}</p>
                </div>
                <div className="job-fit">
                  <FitNumber value={fit} className="fit-number--md" />
                  <span className="small">{fitLabel(fit)}</span>
                </div>
              </div>

              <ul className="skill-list skill-list--inline">
                {job.skills.map((s) => {
                  const gap = gaps.includes(s)
                  return (
                    <li key={s} className={gap ? 'skill skill--gap' : 'skill skill--ok'}>
                      {gap ? (
                        <GraduationCap size={16} strokeWidth={2} aria-hidden />
                      ) : (
                        <Check size={16} strokeWidth={2} aria-hidden />
                      )}
                      {s}
                      <span className="visually-hidden">{gap ? ' (a aprender na trilha)' : ' (você já sabe)'}</span>
                    </li>
                  )
                })}
              </ul>

              <div className="job-actions">
                {gaps.length > 0 && company.trainsCandidates ? (
                  <Link to={`/candidato/trilha/${job.id}`} className="btn btn--ink btn--sm">
                    Começar trilha de {formatMinutes(trackMinutes(gaps))}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="btn btn--ink btn--sm"
                    disabled={isApplied}
                    onClick={() => setApplied((prev) => [...prev, job.id])}
                  >
                    {isApplied ? 'Candidatura enviada' : 'Candidatar-se'}
                  </button>
                )}
                {fit >= INTERVIEW_MIN_FIT ? (
                  <Link to={`/candidato/entrevista/${job.id}`} className="btn btn--ghost btn--sm">
                    <MessagesSquare size={16} strokeWidth={2} aria-hidden />
                    {interviews[job.id] !== undefined
                      ? `Treinar de novo (nota ${interviews[job.id]})`
                      : 'Treinar entrevista com IA'}
                  </Link>
                ) : (
                  <span className="small muted">Treino de entrevista a partir de {INTERVIEW_MIN_FIT}% de fit</span>
                )}
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  aria-expanded={isOpen}
                  aria-controls={`cmp-${job.id}`}
                  onClick={() => setOpenId(isOpen ? null : job.id)}
                >
                  {isOpen ? 'Esconder comparação' : 'Comparar culturas'}
                </button>
                {gaps.length > 0 && !company.trainsCandidates && (
                  <span className="small muted">Esta empresa ainda não oferece trilha.</span>
                )}
              </div>

              {isOpen && (
                <motion.div
                  id={`cmp-${job.id}`}
                  className="job-compare"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <FitRuler company={company.culture} candidate={me} intro />
                  <RulerLegend company={company.name} candidate="Você" />
                </motion.div>
              )}
            </motion.li>
          )
        })}
      </ol>
    </section>
  )
}
