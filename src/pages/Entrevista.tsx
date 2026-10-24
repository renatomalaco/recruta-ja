import { Lock, RotateCcw, SendHorizontal } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FitNumber } from '../components/FitNumber'
import { Progress } from '../components/Progress'
import { JOBS, companyById, jobById, jobName } from '../data/companies'
import { INTERVIEW_MIN_FIT, RECRUITERS } from '../data/interview'
import { QUESTIONS } from '../data/questions'
import { culturalFit, vectorFromAnswers } from '../lib/fit'
import { buildScript, evaluate, reaction, scoreLabel, type AnswerFeedback } from '../lib/interviewer'
import { useStored } from '../lib/storage'
import NotFound from './NotFound'
import { EmptyProfile } from './Perfil'

interface Message {
  id: number
  from: 'recruiter' | 'me'
  text: string
  feedback?: AnswerFeedback
}

const TYPING_MS = 900

export default function Entrevista() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const [answers] = useStored<Record<string, number>>('answers', {})
  const [, setScores] = useStored<Record<string, number>>('interviews', {})
  const [messages, setMessages] = useState<Message[]>([])
  const [results, setResults] = useState<AnswerFeedback[]>([])
  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(false)
  const [showTips, setShowTips] = useState(true)
  const [started, setStarted] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const nextId = useRef(0)

  const profileDone = Object.keys(answers).length >= QUESTIONS.length
  // Vagas em que o treino está liberado, da maior para a menor afinidade cultural.
  const eligible = useMemo(() => {
    if (!profileDone) return []
    const me = vectorFromAnswers(answers)
    return JOBS.map((j) => ({ job: j, fit: culturalFit(companyById(j.companyId)!.culture, me) }))
      .filter((r) => r.fit >= INTERVIEW_MIN_FIT)
      .sort((a, b) => b.fit - a.fit)
  }, [answers, profileDone])

  // Sem vaga na URL, o recrutador é o da área com maior fit.
  const job = jobId ? jobById(jobId) : eligible[0]?.job
  const company = job ? companyById(job.companyId) : undefined
  const script = useMemo(() => (job && company ? buildScript(job.area, company.culture) : []), [job, company])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, typing])

  if (!profileDone) return <EmptyProfile />
  if (!jobId && !job) {
    return (
      <section className="section container empty">
        <Lock size={28} strokeWidth={1.75} aria-hidden />
        <h1 className="h2">O treino de entrevista abre com {INTERVIEW_MIN_FIT}% de fit</h1>
        <p className="muted measure">
          Ainda não há vagas com fit cultural suficiente para o seu perfil. Refaça o mapeamento ou acompanhe novas vagas.
        </p>
        <Link to="/candidato/vagas" className="btn btn--ink">
          Ver vagas
        </Link>
      </section>
    )
  }
  if (!job || !company) return <NotFound />

  const recruiter = RECRUITERS[job.area]
  const firstName = recruiter.name.split(' ')[0]
  const fit = culturalFit(company.culture, vectorFromAnswers(answers))
  const finished = started && step >= script.length && !typing
  const average = results.length ? Math.round(results.reduce((s, r) => s + r.score, 0) / results.length) : 0

  if (fit < INTERVIEW_MIN_FIT) {
    return (
      <section className="section container empty">
        <Lock size={28} strokeWidth={1.75} aria-hidden />
        <h1 className="h2">O treino de entrevista abre com {INTERVIEW_MIN_FIT}% de fit</h1>
        <p className="muted measure">
          Seu fit cultural com a {company.name} é de {fit}%. O treino fica disponível nas vagas em que você já combina com
          a cultura da empresa, para você se preparar onde tem mais chance.
        </p>
        <Link to="/candidato/vagas" className="btn btn--ink">
          Ver vagas com mais fit
        </Link>
      </section>
    )
  }

  function push(from: Message['from'], text: string, feedback?: AnswerFeedback) {
    setMessages((prev) => [...prev, { id: nextId.current++, from, text, feedback }])
  }

  function recruiterSays(lines: string[], then?: () => void) {
    setTyping(true)
    window.setTimeout(() => {
      setTyping(false)
      lines.forEach((l) => push('recruiter', l))
      then?.()
      inputRef.current?.focus()
    }, TYPING_MS)
  }

  function start() {
    setStarted(true)
    setMessages([])
    setResults([])
    setStep(0)
    recruiterSays([
      `Oi! Eu sou ${recruiter.name}, ${recruiter.role.toLowerCase()} de ${recruiter.area}. Vamos simular a entrevista para ${jobName(job!)} na ${company!.name}.`,
      script[0].text,
    ])
  }

  function send() {
    const text = draft.trim()
    if (!text || typing || finished) return
    const feedback = evaluate(script[step], text)
    push('me', text, feedback)
    setDraft('')
    const nextResults = [...results, feedback]
    setResults(nextResults)
    const next = step + 1
    setStep(next)
    if (next < script.length) {
      recruiterSays([`${reaction(feedback, step)} ${script[next].text}`])
    } else {
      const avg = Math.round(nextResults.reduce((s, r) => s + r.score, 0) / nextResults.length)
      const thanks = recruiter.role.startsWith('Recrutadora') ? 'Obrigada' : 'Obrigado'
      recruiterSays([`${thanks} pelo seu tempo! Preparei um resumo do seu treino logo abaixo.`], () =>
        setScores((prev) => ({ ...prev, [job!.id]: Math.max(prev[job!.id] ?? 0, avg) })),
      )
    }
  }

  return (
    <section className="section container interview">
      <Link to="/candidato/vagas" className="small back-link">
        Voltar para as vagas
      </Link>

      <header className="interview-head">
        <span className="recruiter-avatar recruiter-avatar--lg" aria-hidden>
          {initials(recruiter.name)}
        </span>
        <div>
          <h1 className="h2">Treino de entrevista</h1>
          <p className="muted">
            {recruiter.name}, {recruiter.role.toLowerCase()} de {recruiter.area}. Vaga: {jobName(job)}, {company.name}.
          </p>
        </div>
      </header>

      <p className="notice small">
        Recrutador simulado por IA para treino. Suas respostas ficam só neste navegador e não são enviadas à empresa.
      </p>

      {!started ? (
        <div className="interview-intro panel">
          {eligible.length > 1 && (
            <div className="field-group interview-pick">
              <label htmlFor="vaga">Treinar para a vaga</label>
              <select
                id="vaga"
                className="input"
                value={job.id}
                onChange={(e) => navigate(`/candidato/entrevista/${e.target.value}`)}
              >
                {eligible.map(({ job: j, fit: f }) => (
                  <option key={j.id} value={j.id}>
                    {jobName(j)}, {companyById(j.companyId)!.name} ({f}% de fit)
                  </option>
                ))}
              </select>
            </div>
          )}
          <h2 className="h3">Como funciona</h2>
          <ul className="interview-rules">
            <li>
              {script.length} perguntas: apresentação, cultura da {company.name}, situações técnicas de {recruiter.area} e
              uma pergunta final sua.
            </li>
            <li>Responda como responderia de verdade. Exemplos reais contam mais que respostas perfeitas.</li>
            <li>A cada resposta, {firstName} dá uma dica. No fim, você recebe um resumo com nota e pontos a melhorar.</li>
          </ul>
          <div className="actions">
            <button type="button" className="btn btn--ink" onClick={start}>
              Começar o treino com {firstName}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="interview-progress">
            <span className="small muted tnum">
              Pergunta {Math.min(step + 1, script.length)} de {script.length}
            </span>
            <label className="small tips-toggle">
              <input type="checkbox" checked={showTips} onChange={(e) => setShowTips(e.target.checked)} /> Mostrar dicas
            </label>
          </div>
          <Progress value={(step / script.length) * 100} label="Progresso da entrevista" tone="magenta" />

          <ol className="chat" aria-live="polite" aria-label="Conversa com o recrutador">
            {messages.map((m) => (
              <motion.li
                key={m.id}
                className={`msg msg--${m.from}`}
                initial={{ opacity: 0, transform: 'translateY(6px)' }}
                animate={{ opacity: 1, transform: 'translateY(0px)' }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              >
                {m.from === 'recruiter' && (
                  <span className="recruiter-avatar" aria-hidden>
                    {initials(recruiter.name)}
                  </span>
                )}
                <div className="msg-body">
                  <span className="visually-hidden">{m.from === 'recruiter' ? `${firstName}:` : 'Você:'}</span>
                  <p className="msg-bubble">{m.text}</p>
                  {m.feedback && showTips && m.feedback.tips.length > 0 && (
                    <p className="msg-tip small">Dica: {m.feedback.tips[0]}</p>
                  )}
                  {m.feedback && showTips && m.feedback.tips.length === 0 && (
                    <p className="msg-tip msg-tip--good small">Boa resposta. {m.feedback.strengths[0] ?? ''}</p>
                  )}
                </div>
              </motion.li>
            ))}
            <AnimatePresence>
              {typing && (
                <motion.li
                  className="msg msg--recruiter"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <span className="recruiter-avatar" aria-hidden>
                    {initials(recruiter.name)}
                  </span>
                  <p className="msg-bubble typing" aria-label={`${firstName} está digitando`}>
                    <span />
                    <span />
                    <span />
                  </p>
                </motion.li>
              )}
            </AnimatePresence>
          </ol>
          <div ref={endRef} />

          {finished ? (
            <Report
              average={average}
              results={results}
              focuses={script.map((q) => q.focus)}
              onRestart={start}
              jobId={job.id}
            />
          ) : (
            <form
              className="composer"
              onSubmit={(e) => {
                e.preventDefault()
                send()
              }}
            >
              <label htmlFor="resposta" className="visually-hidden">
                Sua resposta
              </label>
              <textarea
                id="resposta"
                ref={inputRef}
                className="input composer-input"
                rows={3}
                value={draft}
                placeholder="Escreva sua resposta. Enter envia, Shift + Enter quebra a linha."
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    send()
                  }
                }}
              />
              <button type="submit" className="btn btn--ink composer-send" disabled={!draft.trim() || typing}>
                <SendHorizontal size={18} strokeWidth={2} aria-hidden /> Enviar
              </button>
            </form>
          )}
        </>
      )}
    </section>
  )
}

function initials(name: string) {
  const parts = name.split(' ')
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

interface ReportProps {
  average: number
  results: AnswerFeedback[]
  focuses: string[]
  jobId: string
  onRestart: () => void
}

function Report({ average, results, focuses, jobId, onRestart }: ReportProps) {
  const strengths = [...new Set(results.flatMap((r) => r.strengths))].slice(0, 3)
  const improve = [...new Set(results.flatMap((r) => r.tips))].slice(0, 3)
  return (
    <motion.div
      className="report panel"
      initial={{ opacity: 0, transform: 'scale(0.97)' }}
      animate={{ opacity: 1, transform: 'scale(1)' }}
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
    >
      <div className="report-score">
        <FitNumber
          value={average}
          from={0}
          unit="/100"
          label={`Nota ${average} de 100`}
          className="fit-number--lg"
        />
        <div>
          <p className="h3">{scoreLabel(average)}</p>
          <p className="small muted">Nota média do treino</p>
        </div>
      </div>

      <div className="report-cols">
        <div>
          <h2 className="small strong">Pontos fortes</h2>
          {strengths.length ? (
            <ul className="report-list report-list--good">
              {strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          ) : (
            <p className="small muted">Ainda não apareceram. Tente responder com exemplos reais.</p>
          )}
        </div>
        <div>
          <h2 className="small strong">Para treinar</h2>
          {improve.length ? (
            <ul className="report-list">
              {improve.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          ) : (
            <p className="small muted">Nada importante. Você está bem preparado.</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="small strong">Pergunta a pergunta</h2>
        <ol className="report-questions">
          {results.map((r, i) => (
            <li key={i}>
              <span>{focuses[i]}</span>
              <span className="report-bar" aria-hidden>
                <span style={{ transform: `scaleX(${r.score / 100})` }} />
              </span>
              <span className="tnum small strong">{r.score}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="actions">
        <button type="button" className="btn btn--ink" onClick={onRestart}>
          <RotateCcw size={16} strokeWidth={2} aria-hidden /> Treinar de novo
        </button>
        <Link to={`/candidato/trilha/${jobId}`} className="btn btn--ghost">
          Ver a trilha da vaga
        </Link>
      </div>
    </motion.div>
  )
}
