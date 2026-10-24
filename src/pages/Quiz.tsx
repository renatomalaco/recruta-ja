import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
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

  const isSkillsStep = step === QUESTIONS.length
  const question = QUESTIONS[step]
  const answered = Object.keys(answers).length
  const currentAnswered = isSkillsStep || answers[question.id] !== undefined

  function go(next: number) {
    if (next < 0 || next > QUESTIONS.length) return
    setDirection(next > step ? 1 : -1)
    setStep(next)
  }

  function choose(value: number) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }))
  }

  function toggleSkill(skill: HardSkill) {
    setSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  return (
    <section className="quiz container">
      <div className="quiz-top">
        <span className="small muted">Mapeamento cultural</span>
        <span className="small muted tnum" aria-live="polite">
          {step + 1} de {TOTAL}
        </span>
      </div>
      <Progress value={((step + (isSkillsStep ? 1 : 0)) / TOTAL) * 100} label="Progresso do mapeamento" />

        <motion.div
          key={step}
          className="quiz-card"
          initial={{ opacity: 0, transform: `translateX(${direction * 24}px)` }}
          animate={{ opacity: 1, transform: 'translateX(0px)' }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
        >
          {!isSkillsStep ? (
            <fieldset className="quiz-fieldset">
              <legend className="quiz-question">{question.prompt}</legend>
              <div className="quiz-options" role="radiogroup" aria-label="Alternativas">
                {question.options.map((o) => {
                  const selected = answers[question.id] === o.value
                  return (
                    <button
                      key={o.label}
                      type="button"
                      role="radio"
                      className="option"
                      aria-checked={selected}
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
              {answered < QUESTIONS.length && (
                <p className="small muted">Faltam {QUESTIONS.length - answered} situações para responder.</p>
              )}
            </fieldset>
          )}
        </motion.div>

      <div className="quiz-nav">
        <button type="button" className="btn btn--ghost" onClick={() => go(step - 1)} disabled={step === 0}>
          <ArrowLeft size={16} strokeWidth={2} aria-hidden /> Voltar
        </button>
        {isSkillsStep ? (
          <button
            type="button"
            className="btn btn--ink"
            disabled={answered < QUESTIONS.length}
            onClick={() => navigate('/candidato/perfil')}
          >
            Ver meu resultado
          </button>
        ) : (
          <button type="button" className="btn btn--ink" disabled={!currentAnswered} onClick={() => go(step + 1)}>
            Próxima <ArrowRight size={16} strokeWidth={2} aria-hidden />
          </button>
        )}
      </div>
    </section>
  )
}
