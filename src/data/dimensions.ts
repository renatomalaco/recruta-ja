export type DimensionId = 'colaboracao' | 'estrutura' | 'ritmo' | 'comunicacao' | 'aprendizado'

/** Vetor cultural: cada dimensão vai de 0 (polo esquerdo) a 100 (polo direito). */
export type CultureVector = Record<DimensionId, number>

export interface Dimension {
  id: DimensionId
  name: string
  left: string
  right: string
}

export const DIMENSIONS: Dimension[] = [
  { id: 'colaboracao', name: 'Forma de trabalhar', left: 'Autonomia', right: 'Colaboração' },
  { id: 'estrutura', name: 'Organização', left: 'Processos claros', right: 'Improviso' },
  { id: 'ritmo', name: 'Ritmo', left: 'Constante', right: 'Acelerado' },
  { id: 'comunicacao', name: 'Comunicação', left: 'Direta', right: 'Diplomática' },
  { id: 'aprendizado', name: 'Aprendizado', left: 'Profundidade', right: 'Exploração' },
]

export const HARD_SKILLS = [
  'HTML e CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Python',
  'SQL',
  'Git',
  'Testes automatizados',
  'Figma',
  'Excel',
  'Power BI',
] as const

export type HardSkill = (typeof HARD_SKILLS)[number]

export const COMPANY_VALUES = [
  'Transparência',
  'Autonomia com responsabilidade',
  'Aprendizado contínuo',
  'Foco no cliente',
  'Diversidade',
  'Inovação',
  'Qualidade acima de pressa',
  'Bem-estar',
  'Colaboração entre áreas',
] as const
