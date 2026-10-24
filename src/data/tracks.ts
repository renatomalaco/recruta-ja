import type { HardSkill } from './dimensions'

export interface TrackModule {
  id: string
  title: string
  minutes: number
}

/** Trilhas de capacitação por hard skill (conteúdo ilustrativo). */
export const TRACKS: Record<HardSkill, TrackModule[]> = {
  'HTML e CSS': [
    { id: 'html-1', title: 'Estrutura semântica de uma página', minutes: 40 },
    { id: 'html-2', title: 'Layout com Flexbox e Grid', minutes: 60 },
    { id: 'html-3', title: 'Responsividade na prática', minutes: 50 },
  ],
  JavaScript: [
    { id: 'js-1', title: 'Tipos, funções e escopo', minutes: 60 },
    { id: 'js-2', title: 'Arrays e objetos no dia a dia', minutes: 50 },
    { id: 'js-3', title: 'Assincronismo com Promises e fetch', minutes: 70 },
  ],
  TypeScript: [
    { id: 'ts-1', title: 'Tipando funções e objetos', minutes: 45 },
    { id: 'ts-2', title: 'Generics sem medo', minutes: 50 },
  ],
  React: [
    { id: 'react-1', title: 'Componentes e props', minutes: 50 },
    { id: 'react-2', title: 'Estado e efeitos', minutes: 60 },
    { id: 'react-3', title: 'Consumindo uma API real', minutes: 70 },
  ],
  'Node.js': [
    { id: 'node-1', title: 'Criando uma API REST', minutes: 70 },
    { id: 'node-2', title: 'Autenticação básica', minutes: 60 },
  ],
  Python: [
    { id: 'py-1', title: 'Fundamentos de Python', minutes: 60 },
    { id: 'py-2', title: 'Manipulando dados com pandas', minutes: 70 },
  ],
  SQL: [
    { id: 'sql-1', title: 'SELECT, filtros e ordenação', minutes: 45 },
    { id: 'sql-2', title: 'JOINs e agregações', minutes: 60 },
  ],
  Git: [
    { id: 'git-1', title: 'Commits, branches e pull requests', minutes: 40 },
  ],
  'Testes automatizados': [
    { id: 'test-1', title: 'Por que testar e o que testar', minutes: 30 },
    { id: 'test-2', title: 'Escrevendo testes unitários', minutes: 60 },
  ],
  Figma: [
    { id: 'figma-1', title: 'Componentes e auto layout', minutes: 50 },
    { id: 'figma-2', title: 'Prototipando fluxos', minutes: 45 },
  ],
  Excel: [
    { id: 'xls-1', title: 'Fórmulas essenciais e PROCV', minutes: 45 },
    { id: 'xls-2', title: 'Tabelas dinâmicas', minutes: 40 },
  ],
  'Power BI': [
    { id: 'pbi-1', title: 'Importando e tratando dados', minutes: 50 },
    { id: 'pbi-2', title: 'Seu primeiro painel', minutes: 60 },
  ],
}
