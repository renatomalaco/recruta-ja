import type { CultureVector, HardSkill } from './dimensions'
import type { AreaId } from './interview'

export interface Company {
  id: string
  name: string
  segment: string
  city: string
  culture: CultureVector
  values: string[]
  trainsCandidates: boolean
}

export interface Job {
  id: string
  companyId: string
  title: string
  level: 'Estágio' | 'Júnior'
  mode: 'Presencial' | 'Híbrido' | 'Remoto'
  area: AreaId
  skills: HardSkill[]
  summary: string
}

// Empresas e vagas fictícias, apenas para demonstração do protótipo.
export const COMPANIES: Company[] = [
  {
    id: 'nebula',
    name: 'Nébula Pagamentos',
    segment: 'Fintech',
    city: 'São Paulo',
    culture: { colaboracao: 70, estrutura: 65, ritmo: 88, comunicacao: 22, aprendizado: 80 },
    values: ['Inovação', 'Autonomia com responsabilidade', 'Foco no cliente'],
    trainsCandidates: true,
  },
  {
    id: 'cajuina',
    name: 'Cajuína Labs',
    segment: 'Estúdio de produto',
    city: 'Recife',
    culture: { colaboracao: 90, estrutura: 78, ritmo: 55, comunicacao: 70, aprendizado: 88 },
    values: ['Colaboração entre áreas', 'Diversidade', 'Aprendizado contínuo'],
    trainsCandidates: true,
  },
  {
    id: 'rota',
    name: 'Rota Verde Logística',
    segment: 'Logística',
    city: 'Campinas',
    culture: { colaboracao: 40, estrutura: 15, ritmo: 45, comunicacao: 30, aprendizado: 25 },
    values: ['Qualidade acima de pressa', 'Transparência', 'Foco no cliente'],
    trainsCandidates: true,
  },
  {
    id: 'mirante',
    name: 'Mirante Saúde',
    segment: 'Healthtech',
    city: 'Belo Horizonte',
    culture: { colaboracao: 75, estrutura: 30, ritmo: 35, comunicacao: 82, aprendizado: 40 },
    values: ['Bem-estar', 'Transparência', 'Qualidade acima de pressa'],
    trainsCandidates: false,
  },
]

export const JOBS: Job[] = [
  {
    id: 'nebula-front',
    area: 'frontend',
    companyId: 'nebula',
    title: 'Pessoa Desenvolvedora Front-end',
    level: 'Júnior',
    mode: 'Híbrido',
    skills: ['HTML e CSS', 'JavaScript', 'React', 'TypeScript', 'Git'],
    summary: 'Construir as telas do app de pagamentos junto ao time de produto.',
  },
  {
    id: 'nebula-dados',
    area: 'dados',
    companyId: 'nebula',
    title: 'Estágio em Dados',
    level: 'Estágio',
    mode: 'Remoto',
    skills: ['SQL', 'Python', 'Power BI'],
    summary: 'Apoiar o time de risco com análises e painéis de fraude.',
  },
  {
    id: 'cajuina-produto',
    area: 'design',
    companyId: 'cajuina',
    title: 'Estágio em Design de Produto',
    level: 'Estágio',
    mode: 'Híbrido',
    skills: ['Figma', 'HTML e CSS'],
    summary: 'Participar de pesquisas com usuários e prototipar soluções.',
  },
  {
    id: 'cajuina-full',
    area: 'fullstack',
    companyId: 'cajuina',
    title: 'Pessoa Desenvolvedora Full-stack',
    level: 'Júnior',
    mode: 'Remoto',
    skills: ['JavaScript', 'React', 'Node.js', 'Git', 'Testes automatizados'],
    summary: 'Entregar funcionalidades de ponta a ponta para clientes do estúdio.',
  },
  {
    id: 'rota-backend',
    area: 'backend',
    companyId: 'rota',
    title: 'Pessoa Desenvolvedora Back-end',
    level: 'Júnior',
    mode: 'Presencial',
    skills: ['Python', 'SQL', 'Git', 'Testes automatizados'],
    summary: 'Manter os sistemas de roteirização que movem 2 mil entregas por dia.',
  },
  {
    id: 'mirante-analista',
    area: 'analise',
    companyId: 'mirante',
    title: 'Estágio em Análise de Sistemas',
    level: 'Estágio',
    mode: 'Híbrido',
    skills: ['SQL', 'Excel'],
    summary: 'Levantar requisitos com as clínicas parceiras e documentar processos.',
  },
]

/** Nome de exibição da vaga, sem repetir o nível quando ele já está no título. */
export const jobName = (job: Job) => (job.title.includes(job.level) ? job.title : `${job.title} ${job.level}`)

export const companyById = (id: string) => COMPANIES.find((c) => c.id === id)
export const jobById = (id: string) => JOBS.find((j) => j.id === id)
