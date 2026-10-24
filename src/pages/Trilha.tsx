import { BadgeCheck, Check } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Link, useParams } from 'react-router-dom'
import { Progress } from '../components/Progress'
import { companyById, jobById, jobName } from '../data/companies'
import type { HardSkill } from '../data/dimensions'
import { TRACKS } from '../data/tracks'
import { skillGaps } from '../lib/fit'
import { useStored } from '../lib/storage'
import NotFound from './NotFound'
import { formatMinutes } from '../lib/format'

export default function Trilha() {
  const { jobId = '' } = useParams()
  const [skills] = useStored<HardSkill[]>('skills', [])
  const [done, setDone] = useStored<string[]>('modules', [])
  const [applied, setApplied] = useStored<string[]>('applied', [])

  const job = jobById(jobId)
  if (!job) return <NotFound />
  const company = companyById(job.companyId)!

  const gaps = skillGaps(job.skills, skills)
  const modules = gaps.flatMap((g) => TRACKS[g])
  const doneHere = modules.filter((m) => done.includes(m.id))
  const progress = modules.length ? (doneHere.length / modules.length) * 100 : 100
  const remaining = modules.filter((m) => !done.includes(m.id)).reduce((s, m) => s + m.minutes, 0)
  const ready = progress === 100
  const isApplied = applied.includes(job.id)

  function toggle(id: string) {
    setDone((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  return (
    <section className="section container trilha">
      <Link to="/candidato/vagas" className="small back-link">
        Voltar para as vagas
      </Link>
      <div className="trilha-head">
        <div>
          <p className="small muted">{company.name}</p>
          <h1 className="h2">
            Trilha para {jobName(job)}
          </h1>
          <p className="muted">
            {ready
              ? 'Você concluiu tudo o que faltava para esta vaga.'
              : `${modules.length - doneHere.length} módulos restantes, cerca de ${formatMinutes(remaining)}.`}
          </p>
        </div>
        <div className="trilha-progress">
          <span className="trilha-percent tnum">{Math.round(progress)}%</span>
          <Progress value={progress} label="Progresso da trilha" tone={ready ? 'mint' : 'ink'} />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {ready && (
          <motion.div
            className="ready"
            initial={{ opacity: 0, transform: 'scale(0.96)' }}
            animate={{ opacity: 1, transform: 'scale(1)' }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
          >
            <BadgeCheck size={28} strokeWidth={1.75} aria-hidden />
            <div>
              <p className="h3">Pronto para a vaga</p>
              <p className="small">
                Sua candidatura vai com o selo da trilha concluída. A {company.name} vê o seu progresso no painel.
              </p>
            </div>
            <div className="ready-actions">
              <button
                type="button"
                className="btn btn--ink btn--sm"
                disabled={isApplied}
                onClick={() => setApplied((prev) => [...prev, job.id])}
              >
                {isApplied ? 'Candidatura enviada' : 'Enviar candidatura com selo'}
              </button>
              <Link to={`/candidato/entrevista/${job.id}`} className="btn btn--ghost btn--sm">
                Treinar a entrevista
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {gaps.map((skill) => (
        <div className="module-group" key={skill}>
          <h2 className="h3">{skill}</h2>
          <ul className="modules">
            {TRACKS[skill].map((m) => {
              const checked = done.includes(m.id)
              return (
                <li key={m.id}>
                  <label className="module">
                    <input type="checkbox" checked={checked} onChange={() => toggle(m.id)} />
                    <span className="module-box" aria-hidden>
                      <AnimatePresence initial={false}>
                        {checked && (
                          <motion.span
                            className="module-tick"
                            initial={{ opacity: 0, transform: 'scale(0.25)', filter: 'blur(4px)' }}
                            animate={{ opacity: 1, transform: 'scale(1)', filter: 'blur(0px)' }}
                            exit={{ opacity: 0, transform: 'scale(0.25)', filter: 'blur(4px)' }}
                            transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
                          >
                            <Check size={14} strokeWidth={3} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    <span className="module-title">{m.title}</span>
                    <span className="small muted tnum">{m.minutes} min</span>
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      ))}

      {gaps.length === 0 && (
        <p className="muted">Você já tem todas as hard skills desta vaga. Nenhuma trilha necessária.</p>
      )}

      <p className="small muted">
        No protótipo, marcar um módulo simula a conclusão da aula. O conteúdo é ilustrativo.
      </p>
    </section>
  )
}
