import { Link } from 'react-router-dom'

const TYPICAL = [
  '2 anos de experiência para estágio',
  'React, Angular, Vue, Node, Docker e AWS',
  'Inglês fluente',
  'Portfólio com projetos em produção',
]

const HERE = [
  'Como você colabora e se comunica',
  'O ritmo em que você rende melhor',
  'Como você aprende coisas novas',
  'A técnica que faltar, você aprende aqui',
  'Treino de entrevista com um recrutador de IA da sua área',
]

export default function Candidatos() {
  return (
    <>
      <section className="field field--magenta page-hero">
        <div className="container">
          <h1 className="display">Suas soft skills valem mais do que anos de experiência.</h1>
          <p className="lead measure">
            Pedir várias tecnologias e anos de experiência para estágio e nível júnior é uma barreira irreal. O Recruta
            Já prioriza quem você é: conecta você a empresas pelo fit cultural e treina o que faltar de técnica para
            você assumir a vaga com segurança.
          </p>
          <div className="actions">
            <Link to="/candidato/quiz" className="btn btn--sun">
              Descobrir meu fit
            </Link>
            <Link to="/pesquisa" className="btn btn--outline-light">
              Responder a pesquisa
            </Link>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2 className="h2">O que pedem para você, e o que a gente olha</h2>
        </div>
        <div className="versus">
          <div className="versus-col">
            <h3 className="h3">Uma vaga de estágio típica</h3>
            <ul className="versus-list versus-list--struck">
              {TYPICAL.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="versus-col versus-col--ours">
            <h3 className="h3">No Recruta Já</h3>
            <ul className="versus-list">
              {HERE.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section container quiz-teaser">
        <h2 className="h2">Dez situações do dia a dia. Uns quatro minutos.</h2>
        <p className="muted measure">
          Não existe resposta certa. Você escolhe o que faria de verdade, e a gente monta a sua régua cultural para
          encontrar as empresas onde você vai render e querer ficar.
        </p>
        <div className="actions">
          <Link to="/candidato/quiz" className="btn btn--ink">
            Começar o mapeamento
          </Link>
        </div>
      </section>
    </>
  )
}
