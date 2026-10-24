import { ArrowLeft, Check } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Progress } from '../components/Progress'
import { HARD_SKILLS, type HardSkill } from '../data/dimensions'
import { QUESTIONS } from '../data/questions'
import { useStored } from '../lib/storage'

const TOTAL = QUESTIONS.length + 1

export default function Quiz() {
  const navigate = useNavigate()
  const [answers, setAnswers] = useStored<Record<string, number>>('answers', {})
  const [skills, setSkills] = useStored<HardSkill[]>('skills', [])
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const advancing = useRef<number | null>(null)

  const isSkillsStep = step === QUESTIONS.length
  const question = QUESTIONS[step]

  function go(next: number) {
    setDirection(next > step ? 1 : -1)
    setStep(next)
  }

  function choose(value: number) {
    // Ignora cliques durante a transição (inclusive na pergunta que está saindo).
    if (advancing.current) return
    setAnswers((prev) => ({ ...prev, [question.id]: value }))
    // Pequena pausa para a escolha ser vista antes de avançar.
    advancing.current = window.setTimeout(() => {
      go(step + 1)
      window.setTimeout(() => (advancing.current = null), 260)
    }, 220)
  }

  function toggleSkill(skill: HardSkill) {
    setSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const answered = Object.keys(answers).length

  return (
    <section className="quiz container">
      <div className="quiz-top">
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          onClick={() => go(step - 1)}
          disabled={step === 0}
        >
          <ArrowLeft size={16} strokeWidth={2} aria-hidden /> Voltar
        </button>
        <span className="small muted tnum" aria-live="polite">
          {step + 1} de {TOTAL}
        </span>
      </div>
      <Progress value={((step + (isSkillsStep ? 1 : 0)) / TOTAL) * 100} label="Progresso do mapeamento" />

      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={step}
          className="quiz-card"
          custom={direction}
          initial={{ opacity: 0, transform: `translateX(${direction * 24}px)`, filter: 'blur(4px)' }}
          animate={{ opacity: 1, transform: 'translateX(0px)', filter: 'blur(0px)' }}
          exit={{ opacity: 0, transform: `translateX(${direction * -12}px)`, filter: 'blur(2px)' }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
        >
          {!isSkillsStep ? (
            <fieldset className="quiz-fieldset">
              <legend className="quiz-question">{question.prompt}</legend>
              <div className="quiz-options">
                {question.options.map((o) => {
                  const selected = answers[question.id] === o.value
                  return (
                    <button
                      key={o.label}
                      type="button"
                      className="option"
                      aria-pressed={selected}
                      onClick={() => choose(o.value)}
                    >
                      <span className="option-check" aria-hidden>
                        {selected && <Check size={14} strokeWidth={2.5} />}
                      </span>
                      {o.label}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          ) : (
            <fieldset className="quiz-fieldset">
              <legend className="quiz-question">Agora a parte técnica: o que você já sabe usar?</legend>
              <p className="muted">
                Marque só o que você já usou em algum projeto, curso ou trabalho. O que faltar para uma vaga vira trilha.
              </p>
              <div className="chips">
                {HARD_SKILLS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="chip"
                    aria-pressed={skills.includes(s)}
                    onClick={() => toggleSkill(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="actions">
                <button
                  type="button"
                  className="btn btn--ink"
                  disabled={answered < QUESTIONS.length}
                  onClick={() => navigate('/candidato/perfil')}
                >
                  Ver meu resultado
                </button>
                {answered < QUESTIONS.length && (
                  <span className="small muted">Faltam {QUESTIONS.length - answered} situações para responder.</span>
                )}
              </div>
            </fieldset>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
