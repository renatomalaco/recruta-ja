import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FitNumber } from '../components/FitNumber'
import { FitRuler, RulerLegend } from '../components/FitRuler'
import { Progress } from '../components/Progress'
import { CANDIDATES, type Candidate } from '../data/candidates'
import { jobById, jobName, type Company } from '../data/companies'
import { culturalFit, skillGaps } from '../lib/fit'
import { useStored } from '../lib/storage'
import { DEFAULT_COMPANY } from './EmpresaCultura'

const JOB = jobById('nebula-front')!

type Filter = 'todos' | 'alto' | 'trilha'

function risk(fit: number) {
  if (fit >= 85) return { label: 'Baixo', tone: 'low' }
  if (fit >= 70) return { label: 'Médio', tone: 'mid' }
  return { label: 'Alto', tone: 'high' }
}

export default function EmpresaPainel() {
  const [stored] = useStored<Company | null>('company', null)
  const [invited, setInvited] = useStored<string[]>('invited', [])
  const [filter, setFilter] = useState<Filter>('todos')
  const [selected, setSelected] = useState<Candidate | null>(null)
  const company = stored ?? DEFAULT_COMPANY
  const closeDrawer = useCallback(() => setSelected(null), [])

  const rows = CANDIDATES.map((c) => ({
    candidate: c,
    fit: culturalFit(company.culture, c.culture),
    gaps: skillGaps(JOB.skills, c.skills),
  }))
    .sort((a, b) => b.fit - a.fit)
    .filter((r) => {
      if (filter === 'alto') return r.fit >= 85
      if (filter === 'trilha') return r.gaps.length > 0 && r.candidate.trackProgress > 0
      return true
    })

  const all = CANDIDATES.map((c) => culturalFit(company.culture, c.culture))
  const highFit = all.filter((f) => f >= 85).length
  const inTrack = CANDIDATES.filter((c) => skillGaps(JOB.skills, c.skills).length && c.trackProgress > 0).length

  return (
    <section className="section container painel">
      <div className="painel-head">
        <div>
          <p className="small muted">{company.name}</p>
          <h1 className="h2">
            {jobName(JOB)}
          </h1>
        </div>
        <Link to="/empresa/cultura" className="btn btn--ghost btn--sm">
          {stored ? 'Editar perfil cultural' : 'Criar o perfil da sua empresa'}
        </Link>
      </div>
      {!stored && (
        <p className="notice small">
          Você está vendo a demonstração com a Nébula Pagamentos. Crie o perfil da sua empresa para ver o ranking com a
          sua régua.
        </p>
      )}

      <dl className="stats">
        <div>
          <dt>Candidatos</dt>
          <dd className="tnum">{CANDIDATES.length}</dd>
        </div>
        <div>
          <dt>Com fit muito alto</dt>
          <dd className="tnum">{highFit}</dd>
        </div>
        <div>
          <dt>Em trilha de capacitação</dt>
          <dd className="tnum">{inTrack}</dd>
        </div>
      </dl>

      <div className="segmented segmented--light" role="radiogroup" aria-label="Filtrar candidatos">
        {(
          [
            ['todos', 'Todos'],
            ['alto', 'Fit muito alto'],
            ['trilha', 'Em capacitação'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={filter === id}
            className="segmented-option"
            onClick={() => setFilter(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="table" role="table" aria-label="Ranking de candidatos por fit cultural">
        <div className="table-row table-row--head" role="row">
          <span role="columnheader">Candidato</span>
          <span role="columnheader">Fit cultural</span>
          <span role="columnheader">Lacunas técnicas</span>
          <span role="columnheader">Trilha</span>
          <span role="columnheader">Risco de desalinhamento</span>
        </div>
        {rows.length === 0 && (
          <p className="table-empty muted">Nenhum candidato neste filtro ainda. Experimente ver todos.</p>
        )}
        {rows.map(({ candidate: c, fit, gaps }) => {
          const r = risk(fit)
          return (
            <button key={c.id} type="button" role="row" className="table-row" onClick={() => setSelected(c)}>
              <span role="cell" className="cand">
                <span className="avatar" aria-hidden>
                  {initials(c.name)}
                </span>
                <span>
                  <span className="cand-name">{c.name}</span>
                  <span className="small muted block">{c.course}</span>
                </span>
              </span>
              <span role="cell" className="cell-fit">
                <span className="tnum strong">{fit}%</span>
                <span className="fit-bar" aria-hidden>
                  <span style={{ transform: `scaleX(${fit / 100})` }} />
                </span>
              </span>
              <span role="cell" className="small">
                {gaps.length ? gaps.join(', ') : <span className="muted">Nenhuma</span>}
              </span>
              <span role="cell" className="small tnum">
                {gaps.length ? `${c.trackProgress}%` : <span className="muted">Não precisa</span>}
              </span>
              <span role="cell">
                <span className={`risk risk--${r.tone}`}>{r.label}</span>
              </span>
            </button>
          )
        })}
      </div>
      <p className="small muted">
        Risco de desalinhamento é uma estimativa ilustrativa baseada no fit cultural. Candidatos fictícios.
      </p>

      <CandidateDrawer
        candidate={selected}
        company={company}
        invited={selected ? invited.includes(selected.id) : false}
        onInvite={(id) => setInvited((prev) => [...prev, id])}
        onClose={closeDrawer}
      />
    </section>
  )
}

function initials(name: string) {
  const parts = name.split(' ')
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

interface DrawerProps {
  candidate: Candidate | null
  company: Company
  invited: boolean
  onInvite: (id: string) => void
  onClose: () => void
}

function CandidateDrawer({ candidate, company, invited, onInvite, onClose }: DrawerProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!candidate) return
    const lastFocus = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      lastFocus?.focus()
    }
  }, [candidate, onClose])

  return (
    <AnimatePresence>
      {candidate && (
        <>
          <motion.div
            className="scrim"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.aside
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            initial={{ transform: 'translateX(100%)' }}
            animate={{ transform: 'translateX(0%)' }}
            exit={{ transform: 'translateX(100%)' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          >
            <div className="drawer-head">
              <div>
                <h2 id="drawer-title" className="h3">
                  {candidate.name}
                </h2>
                <p className="small muted">
                  {candidate.course}, {candidate.city}
                </p>
              </div>
              <button ref={closeRef} type="button" className="icon-btn" aria-label="Fechar" onClick={onClose}>
                <X size={20} strokeWidth={1.75} />
              </button>
            </div>

            <div className="drawer-score">
              <FitNumber value={culturalFit(company.culture, candidate.culture)} className="fit-number--lg" />
              <span className="small muted">de fit cultural com a {company.name}</span>
            </div>
            <FitRuler company={company.culture} candidate={candidate.culture} intro />
            <RulerLegend company={company.name} candidate={candidate.name.split(' ')[0]} />

            <div className="drawer-section">
              <h3 className="small strong">Soft skills</h3>
              <ul className="tag-list">
                {candidate.softSkills.map((s) => (
                  <li key={s} className="tag tag--magenta">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="drawer-section">
              <h3 className="small strong">Hard skills</h3>
              <ul className="tag-list">
                {candidate.skills.map((s) => (
                  <li key={s} className="tag">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            {skillGaps(JOB.skills, candidate.skills).length > 0 && (
              <div className="drawer-section">
                <h3 className="small strong">Trilha para a vaga</h3>
                <p className="small muted">{skillGaps(JOB.skills, candidate.skills).join(', ')}</p>
                <Progress value={candidate.trackProgress} label="Progresso da trilha" tone="magenta" />
                <p className="small tnum">{candidate.trackProgress}% concluído</p>
              </div>
            )}

            <div className="drawer-actions">
              <button
                type="button"
                className="btn btn--ink"
                disabled={invited}
                onClick={() => onInvite(candidate.id)}
              >
                {invited ? 'Convite enviado' : 'Convidar para entrevista'}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
