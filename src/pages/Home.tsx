import { Check, GraduationCap } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FitNumber } from '../components/FitNumber'
import { FitRuler, RulerLegend } from '../components/FitRuler'
import { CANDIDATES } from '../data/candidates'
import { COMPANIES } from '../data/companies'
import { culturalFit, fitLabel } from '../lib/fit'

const DEMO_COMPANIES = COMPANIES.slice(0, 3)
const DEMO_CANDIDATE = CANDIDATES[0]

export default function Home() {
  const [companyId, setCompanyId] = useState(DEMO_COMPANIES[0].id)
  const company = DEMO_COMPANIES.find((c) => c.id === companyId)!
  const fit = culturalFit(company.culture, DEMO_CANDIDATE.culture)
  const firstName = DEMO_CANDIDATE.name.split(' ')[0]

  return (
    <>
      <section className="field field--sun hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1 className="display">Contratado pela técnica. Demitido pela cultura.</h1>
            <p className="lead">
              O Recruta Já inverte a ordem: conecta empresas a pessoas com o mesmo jeito de trabalhar, treina a técnica
              que faltar e prepara cada candidato para a entrevista.
            </p>
            <div className="actions">
              <Link to="/empresas" className="btn btn--ink">
                Sou empresa
              </Link>
              <Link to="/candidatos" className="btn btn--outline">
                Sou candidato
              </Link>
            </div>
          </div>

          <div className="demo-panel" aria-labelledby="demo-title">
            <div className="demo-head">
              <h2 id="demo-title" className="demo-title">
                {firstName} combina com qual empresa?
              </h2>
              <div className="segmented" role="radiogroup" aria-label="Empresa">
                {DEMO_COMPANIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    role="radio"
                    aria-checked={c.id === companyId}
                    className="segmented-option"
                    onClick={() => setCompanyId(c.id)}
                  >
                    {c.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
            <div className="demo-score">
              <FitNumber value={fit} from={50} className="fit-number--xl" />
              <div>
                <p className="demo-score-label">{fitLabel(fit)}</p>
                <p className="muted small">
                  {company.name}, {company.segment.toLowerCase()}
                </p>
              </div>
            </div>
            <FitRuler company={company.culture} candidate={DEMO_CANDIDATE.culture} intro />
            <div className="demo-foot">
              <RulerLegend company={company.name} candidate={`${firstName}, estudante de ADS`} />
              <span className="muted small">Exemplo com dados fictícios</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2 className="h2">Primeiro o fit. Depois a técnica.</h2>
          <p className="muted measure">
            Currículo diz o que a pessoa já fez. O fit cultural diz se ela vai querer ficar. A gente olha para os dois,
            nessa ordem.
          </p>
        </div>
        <ol className="steps">
          <li className="step">
            <span className="step-num">1</span>
            <h3 className="h3">Mapeamento cultural</h3>
            <p className="muted">
              Candidatos respondem a situações reais de trabalho. Empresas descrevem como é o dia a dia de verdade, não
              o que está no quadro da recepção.
            </p>
          </li>
          <li className="step">
            <span className="step-num">2</span>
            <h3 className="h3">Match por cultura</h3>
            <p className="muted">
              Cruzamos as duas réguas em cinco dimensões e mostramos o fit antes de qualquer filtro de experiência.
            </p>
          </li>
          <li className="step">
            <span className="step-num">3</span>
            <h3 className="h3">Trilha até a vaga</h3>
            <p className="muted">
              A hard skill que faltar vira uma trilha de capacitação na plataforma, feita só com o que a vaga exige.
            </p>
          </li>
          <li className="step">
            <span className="step-num">4</span>
            <h3 className="h3">Treino de entrevista</h3>
            <p className="muted">
              Um recrutador de IA da área da vaga simula a entrevista e dá dicas. A pessoa chega pronta, e chega para
              ficar.
            </p>
          </li>
        </ol>
      </section>

      <section className="split">
        <div className="field field--cobalt split-side">
          <h2 className="h2">Menos desligamentos por desalinhamento.</h2>
          <p className="measure">
            Contrate quem compartilha os valores da sua empresa e deixe a capacitação técnica com a gente, como uma
            universidade corporativa terceirizada.
          </p>
          <Link to="/empresas" className="btn btn--sun">
            Ver a solução para empresas
          </Link>
        </div>
        <div className="field field--magenta split-side">
          <h2 className="h2">Sua primeira vaga não deveria exigir três anos de experiência.</h2>
          <p className="measure">
            Mostre quem você é. Se faltar alguma tecnologia para a vaga certa, você aprende aqui antes de começar.
          </p>
          <Link to="/candidatos" className="btn btn--sun">
            Ver a solução para candidatos
          </Link>
        </div>
      </section>

      <section className="section container train">
        <div className="train-copy">
          <h2 className="h2">Faltou técnica? A trilha já vem junto com a vaga.</h2>
          <p className="muted measure">
            Quando o fit cultural é alto e a lacuna é técnica, ninguém é descartado. A plataforma monta uma trilha só
            com o que falta para aquela vaga, e a empresa acompanha o progresso.
          </p>
          <Link to="/candidato/quiz" className="btn btn--ink">
            Fazer meu mapeamento
          </Link>
        </div>
        <div className="job-sample" aria-label="Exemplo de vaga com trilha">
          <div className="job-sample-head">
            <div>
              <p className="small muted">Nébula Pagamentos</p>
              <p className="job-sample-title">Pessoa Desenvolvedora Front-end Júnior</p>
            </div>
            <FitNumber value={culturalFit(COMPANIES[0].culture, DEMO_CANDIDATE.culture)} className="fit-number--md" />
          </div>
          <ul className="skill-list">
            <li className="skill skill--ok">
              <Check size={16} strokeWidth={2} aria-hidden /> HTML e CSS
            </li>
            <li className="skill skill--ok">
              <Check size={16} strokeWidth={2} aria-hidden /> JavaScript
            </li>
            <li className="skill skill--ok">
              <Check size={16} strokeWidth={2} aria-hidden /> Git
            </li>
            <li className="skill skill--gap">
              <GraduationCap size={16} strokeWidth={2} aria-hidden /> React <span className="skill-note">trilha de 3h</span>
            </li>
            <li className="skill skill--gap">
              <GraduationCap size={16} strokeWidth={2} aria-hidden /> TypeScript{' '}
              <span className="skill-note">trilha de 1h35</span>
            </li>
          </ul>
          <p className="small muted">Exemplo ilustrativo</p>
        </div>
      </section>

      <section className="field field--ink cta-band">
        <div className="container cta-band-inner">
          <div>
            <h2 className="h2">Ajude a construir o Recruta Já.</h2>
            <p className="measure">
              Estamos validando a ideia com empresas e estudantes da região. Sua resposta leva uns cinco minutos e muda
              o que a gente constrói.
            </p>
          </div>
          <Link to="/pesquisa" className="btn btn--sun">
            Responder a pesquisa
          </Link>
        </div>
      </section>
    </>
  )
}
