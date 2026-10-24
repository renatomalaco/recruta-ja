import { DIMENSIONS, type CultureVector } from '../data/dimensions'
import { CLOSING, CULTURE_QUESTIONS, OPENING, RECRUITERS, type AreaId, type InterviewQuestion } from '../data/interview'

/**
 * Recrutador simulado: monta o roteiro da entrevista e avalia as respostas com regras simples
 * (tamanho, estrutura de exemplo, termos da área). Não usa IA de verdade; pode ser trocado depois.
 */
export function buildScript(area: AreaId, companyCulture: CultureVector): InterviewQuestion[] {
  // As duas dimensões em que a empresa é mais marcante viram perguntas comportamentais.
  const culture = [...DIMENSIONS]
    .sort((a, b) => Math.abs(companyCulture[b.id] - 50) - Math.abs(companyCulture[a.id] - 50))
    .slice(0, 2)
    .map((d) => CULTURE_QUESTIONS[d.id][companyCulture[d.id] >= 50 ? 1 : 0])
  const [tech1, tech2] = RECRUITERS[area].questions
  return [OPENING, culture[0], tech1, culture[1], tech2, CLOSING]
}

export interface AnswerFeedback {
  score: number
  tips: string[]
  strengths: string[]
}

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

const SITUATION = ['quando', 'uma vez', 'no projeto', 'na faculdade', 'no curso', 'no estagio', 'no trabalho', 'certa vez', 'teve um']
const ACTION = ['fiz', 'tentei', 'experimentei', 'testei', 'desenvolvi', 'construi', 'liderei', 'eu decidi', 'decidi', 'criei', 'implementei', 'organizei', 'conversei', 'propus', 'busquei', 'resolvi', 'montei', 'estudei', 'ajudei']
const RESULT = ['resultado', 'consegui', 'conseguimos', 'reduz', 'aument', 'melhor', 'aprendi', 'entreguei', 'deu certo', 'funcionou']

export function evaluate(question: InterviewQuestion, answer: string): AnswerFeedback {
  const text = normalize(answer)
  const words = answer.trim().split(/\s+/).filter(Boolean).length
  const tips: string[] = []
  const strengths: string[] = []
  let score = 40
  const isClosing = question.id === 'close'
  // Perguntas comportamentais pedem uma história real; as técnicas pedem raciocínio.
  const isStory = question.id.startsWith('cul-')

  if (words < (isClosing ? 5 : 20))
    tips.push(
      isClosing
        ? 'Faça pelo menos uma pergunta: mostra interesse pela empresa.'
        : 'Resposta curta. Desenvolva com um exemplo real para o recrutador entender como você age.',
    )
  else if (words > 220) tips.push('Resposta longa. Tente chegar ao ponto principal em até dois minutos de fala.')
  else {
    score += 15
    if (words >= 45) strengths.push('Bom nível de detalhe')
  }

  const hits = question.keywords.filter((k) => text.includes(k))
  if (hits.length >= 2) {
    score += 25
    strengths.push(`Tocou nos pontos que a área espera (${question.focus.toLowerCase()})`)
  } else if (hits.length === 1) {
    score += 12
    tips.push(question.hint)
  } else tips.push(question.hint)

  // Estrutura STAR simplificada: situação, ação e resultado.
  const hasSituation = SITUATION.some((k) => text.includes(k))
  const hasAction = ACTION.some((k) => text.includes(k))
  const hasResult = RESULT.some((k) => text.includes(k)) || /\d/.test(text)
  if (isClosing) {
    if (text.includes('?') || hits.length) score += 20
  } else {
    if (hasSituation && hasAction) score += 10
    else if (isStory) tips.push('Use o formato situação, ação e resultado: contexto, o que você fez e o que mudou.')
    else if (hasAction || hasSituation) score += 5
    if (hasResult) {
      score += 10
      strengths.push('Mostrou resultado')
    } else if (isStory && words >= 20) tips.push('Feche com um resultado concreto, de preferência com um número.')
  }

  const nos = (text.match(/\bnos\b|\bfizemos\b|\bconseguimos\b/g) ?? []).length
  const eu = (text.match(/\beu\b/g) ?? []).length
  if (nos >= 2 && eu === 0) tips.push('Deixe claro o que você fez, não só o que o time fez.')

  return { score: Math.min(100, score), tips: tips.slice(0, 2), strengths }
}

const GOOD = ['Gostei do exemplo.', 'Ótimo, ficou claro.', 'Boa resposta.', 'Entendi, faz sentido.']
const OK = ['Entendi.', 'Certo, obrigado.', 'Ok, anotado.']
const WEAK = ['Entendi. Se puder, traga um exemplo concreto da próxima vez.', 'Certo. Em uma entrevista real eu pediria mais detalhes aqui.']

/** Reação curta do recrutador antes da próxima pergunta. */
export function reaction(feedback: AnswerFeedback, index: number): string {
  const pool = feedback.score >= 75 ? GOOD : feedback.score >= 55 ? OK : WEAK
  return pool[index % pool.length]
}

export function scoreLabel(score: number) {
  if (score >= 80) return 'Pronto para a entrevista'
  if (score >= 60) return 'Quase lá'
  return 'Vale treinar mais'
}
