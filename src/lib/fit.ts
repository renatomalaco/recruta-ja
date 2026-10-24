import { DIMENSIONS, type CultureVector, type HardSkill } from '../data/dimensions'
import { QUESTIONS } from '../data/questions'

/** Fit cultural de 0 a 100: quanto menor a distância média entre os vetores, maior o fit. */
export function culturalFit(a: CultureVector, b: CultureVector): number {
  const total = DIMENSIONS.reduce((sum, d) => sum + Math.abs(a[d.id] - b[d.id]), 0)
  return Math.round(100 - total / DIMENSIONS.length)
}

export function skillGaps(required: HardSkill[], known: HardSkill[]): HardSkill[] {
  return required.filter((s) => !known.includes(s))
}

/** Converte as respostas do quiz (id da pergunta → valor) no vetor cultural. */
export function vectorFromAnswers(answers: Record<string, number>): CultureVector {
  const vector = {} as CultureVector
  for (const d of DIMENSIONS) {
    const values = QUESTIONS.filter((q) => q.dimension === d.id && q.id in answers).map((q) => answers[q.id])
    vector[d.id] = values.length ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 50
  }
  return vector
}

const TRAITS: Record<string, [string, string]> = {
  colaboracao: ['Autogestão', 'Trabalho em equipe'],
  estrutura: ['Organização', 'Adaptabilidade'],
  ritmo: ['Constância', 'Senso de urgência'],
  comunicacao: ['Franqueza', 'Empatia'],
  aprendizado: ['Profundidade técnica', 'Curiosidade'],
}

/** As soft skills mais marcantes: dimensões mais distantes do centro. */
export function topSoftSkills(v: CultureVector, count = 3): string[] {
  return [...DIMENSIONS]
    .sort((a, b) => Math.abs(v[b.id] - 50) - Math.abs(v[a.id] - 50))
    .slice(0, count)
    .map((d) => TRAITS[d.id][v[d.id] >= 50 ? 1 : 0])
}

export interface Archetype {
  name: string
  description: string
}

export function archetype(v: CultureVector): Archetype {
  const social = v.colaboracao >= 50
  const explorer = (v.estrutura + v.aprendizado) / 2 >= 50
  if (social && explorer)
    return { name: 'Articulador criativo', description: 'Rende mais em times próximos, com espaço para testar ideias e aprender no caminho.' }
  if (social)
    return { name: 'Construtor de pontes', description: 'Une pessoas em torno de um plano e mantém o time alinhado do começo ao fim.' }
  if (explorer)
    return { name: 'Explorador independente', description: 'Investiga por conta própria, testa hipóteses e traz soluções fora do óbvio.' }
  return { name: 'Especialista confiável', description: 'Entrega com rigor e consistência, sem precisar de supervisão por perto.' }
}

export function fitLabel(fit: number): string {
  if (fit >= 85) return 'Fit muito alto'
  if (fit >= 72) return 'Fit alto'
  if (fit >= 60) return 'Fit moderado'
  return 'Fit baixo'
}
