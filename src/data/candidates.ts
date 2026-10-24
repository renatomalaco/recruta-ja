import type { CultureVector, HardSkill } from './dimensions'

export interface Candidate {
  id: string
  name: string
  course: string
  city: string
  culture: CultureVector
  skills: HardSkill[]
  softSkills: string[]
  /** Progresso (0–100) na trilha de capacitação da vaga do painel. */
  trackProgress: number
}

// Pessoas fictícias, usadas no painel de demonstração da empresa.
export const CANDIDATES: Candidate[] = [
  {
    id: 'ana',
    name: 'Ana Beatriz Lima',
    course: 'Análise e Desenvolvimento de Sistemas',
    city: 'São Paulo',
    culture: { colaboracao: 62, estrutura: 78, ritmo: 72, comunicacao: 38, aprendizado: 70 },
    skills: ['HTML e CSS', 'JavaScript', 'Git'],
    softSkills: ['Proatividade', 'Comunicação clara', 'Adaptabilidade'],
    trackProgress: 60,
  },
  {
    id: 'joao',
    name: 'João Pedro Santos',
    course: 'Ciência da Computação',
    city: 'Guarulhos',
    culture: { colaboracao: 20, estrutura: 15, ritmo: 30, comunicacao: 15, aprendizado: 12 },
    skills: ['HTML e CSS', 'JavaScript', 'React', 'TypeScript', 'Git'],
    softSkills: ['Foco', 'Autogestão', 'Rigor técnico'],
    trackProgress: 0,
  },
  {
    id: 'larissa',
    name: 'Larissa Okada',
    course: 'Sistemas de Informação',
    city: 'Santo André',
    culture: { colaboracao: 66, estrutura: 60, ritmo: 80, comunicacao: 35, aprendizado: 85 },
    skills: ['HTML e CSS', 'JavaScript', 'React', 'Git'],
    softSkills: ['Curiosidade', 'Trabalho em equipe', 'Resiliência'],
    trackProgress: 90,
  },
  {
    id: 'rafael',
    name: 'Rafael Nogueira',
    course: 'Bootcamp de Front-end',
    city: 'Osasco',
    culture: { colaboracao: 80, estrutura: 72, ritmo: 70, comunicacao: 40, aprendizado: 90 },
    skills: ['HTML e CSS', 'Git'],
    softSkills: ['Empatia', 'Aprendizado rápido', 'Colaboração'],
    trackProgress: 25,
  },
  {
    id: 'camila',
    name: 'Camila Ferreira',
    course: 'Engenharia de Software',
    city: 'São Paulo',
    culture: { colaboracao: 45, estrutura: 40, ritmo: 60, comunicacao: 70, aprendizado: 50 },
    skills: ['HTML e CSS', 'JavaScript', 'React', 'TypeScript', 'Git'],
    softSkills: ['Organização', 'Escuta ativa', 'Mediação'],
    trackProgress: 0,
  },
  {
    id: 'thiago',
    name: 'Thiago Alves',
    course: 'Técnico em Informática',
    city: 'Diadema',
    culture: { colaboracao: 75, estrutura: 68, ritmo: 92, comunicacao: 18, aprendizado: 70 },
    skills: ['HTML e CSS', 'JavaScript'],
    softSkills: ['Senso de urgência', 'Franqueza', 'Energia'],
    trackProgress: 40,
  },
  {
    id: 'marina',
    name: 'Marina Costa',
    course: 'Design Digital',
    city: 'São Bernardo',
    culture: { colaboracao: 88, estrutura: 50, ritmo: 50, comunicacao: 85, aprendizado: 60 },
    skills: ['HTML e CSS', 'Figma'],
    softSkills: ['Empatia', 'Comunicação', 'Criatividade'],
    trackProgress: 0,
  },
]
