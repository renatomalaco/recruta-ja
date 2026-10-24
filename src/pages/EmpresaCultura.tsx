import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FitRuler, RulerLegend } from '../components/FitRuler'
import { COMPANIES, type Company } from '../data/companies'
import { COMPANY_VALUES, DIMENSIONS, type CultureVector } from '../data/dimensions'
import { useStored } from '../lib/storage'

const STEPS = ['Sobre a empresa', 'Dia a dia', 'Valores']
const MAX_VALUES = 3

export const DEFAULT_COMPANY: Company = COMPANIES[0]

export default function EmpresaCultura() {
  const navigate = useNavigate()
  const [stored, setStored] = useStored<Company | null>('company', null)
  const [draft, setDraft] = useState<Company>(
    stored ?? {
      id: 'minha-empresa',
      name: '',
      segment: '',
      city: '',
      culture: { colaboracao: 50, estrutura: 50, ritmo: 50, comunicacao: 50, aprendizado: 50 },
      values: [],
      trainsCandidates: true,
    },
  )
  const [step, setStep] = useState(0)
  const [touched, setTouched] = useState(false)

  const nameMissing = !draft.name.trim()

  function setCulture(id: keyof CultureVector, value: number) {
    setDraft((d) => ({ ...d, culture: { ...d.culture, [id]: value } }))
  }

  function toggleValue(v: string) {
    setDraft((d) => {
      if (d.values.includes(v)) return { ...d, values: d.values.filter((x) => x !== v) }
      if (d.values.length >= MAX_VALUES) return d
      return { ...d, values: [...d.values, v] }
    })
  }

  function next() {
    if (step === 0 && nameMissing) {
      setTouched(true)
      return
    }
    if (step < STEPS.length - 1) setStep(step + 1)
    else {
      setStored(draft)
      navigate('/empresa/painel')
    }
  }

  return (
    <section className="section container wizard">
      <h1 className="h2">Perfil cultural da empresa</h1>
      <p className="muted measure">
        Descreva como o trabalho acontece de verdade no time. É com essa régua que comparamos os candidatos.
      </p>

      <ol className="stepper" aria-label="Etapas">
        {STEPS.map((s, i) => (
          <li key={s} className="stepper-item" aria-current={i === step ? 'step' : undefined} data-done={i < step}>
            <span className="stepper-num">{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>

      <div className="wizard-body">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, transform: 'translateY(6px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            {step === 0 && (
              <div className="form-grid">
                <div className="field-group">
                  <label htmlFor="c-name">Nome da empresa</label>
                  <input
                    id="c-name"
                    className="input"
                    value={draft.name}
                    placeholder="Ex.: Nébula Pagamentos"
                    aria-invalid={touched && nameMissing}
                    aria-describedby={touched && nameMissing ? 'c-name-err' : undefined}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  />
                  {touched && nameMissing && (
                    <p id="c-name-err" className="field-error">
                      Informe o nome para seguir para a próxima etapa.
                    </p>
                  )}
                </div>
                <div className="field-group">
                  <label htmlFor="c-seg">Segmento</label>
                  <input
                    id="c-seg"
                    className="input"
                    value={draft.segment}
                    placeholder="Ex.: Fintech"
                    onChange={(e) => setDraft({ ...draft, segment: e.target.value })}
                  />
                </div>
                <div className="field-group">
                  <label htmlFor="c-city">Cidade</label>
                  <input
                    id="c-city"
                    className="input"
                    value={draft.city}
                    placeholder="Ex.: São Paulo"
                    onChange={(e) => setDraft({ ...draft, city: e.target.value })}
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="culture-step">
                <div className="sliders">
                  {DIMENSIONS.map((d) => (
                    <div className="slider" key={d.id}>
                      <label htmlFor={`s-${d.id}`} className="slider-name">
                        {d.name}
                      </label>
                      <input
                        id={`s-${d.id}`}
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={draft.culture[d.id]}
                        aria-valuetext={`${draft.culture[d.id]}, entre ${d.left} e ${d.right}`}
                        onChange={(e) => setCulture(d.id, Number(e.target.value))}
                      />
                      <div className="slider-poles small muted">
                        <span>{d.left}</span>
                        <span>{d.right}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="panel">
                  <h2 className="h3">DNA cultural</h2>
                  <FitRuler company={draft.culture} compact />
                  <RulerLegend company={draft.name || 'Sua empresa'} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="values-step">
                <fieldset className="quiz-fieldset">
                  <legend className="h3">Escolha até três valores que mais pesam no dia a dia</legend>
                  <div className="chips">
                    {COMPANY_VALUES.map((v) => {
                      const on = draft.values.includes(v)
                      return (
                        <button
                          key={v}
                          type="button"
                          className="chip"
                          aria-pressed={on}
                          disabled={!on && draft.values.length >= MAX_VALUES}
                          onClick={() => toggleValue(v)}
                        >
                          {v}
                        </button>
                      )
                    })}
                  </div>
                  <p className="small muted tnum">
                    {draft.values.length} de {MAX_VALUES} escolhidos
                  </p>
                </fieldset>
                <label className="switch">
                  <input
                    type="checkbox"
                    role="switch"
                    checked={draft.trainsCandidates}
                    onChange={(e) => setDraft({ ...draft, trainsCandidates: e.target.checked })}
                  />
                  <span className="switch-track" aria-hidden>
                    <span className="switch-thumb" />
                  </span>
                  <span>
                    <strong>Aceito candidatos com lacunas técnicas</strong>
                    <span className="small muted block">
                      Eles concluem a trilha de capacitação na plataforma antes da contratação.
                    </span>
                  </span>
                </label>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="wizard-actions">
        <button type="button" className="btn btn--ghost" onClick={() => setStep(step - 1)} disabled={step === 0}>
          Voltar
        </button>
        <button type="button" className="btn btn--ink" onClick={next}>
          {step < STEPS.length - 1 ? 'Continuar' : 'Salvar e ver candidatos'}
        </button>
      </div>
    </section>
  )
}
