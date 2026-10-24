import type { DimensionId } from './dimensions'

export interface QuizOption {
  label: string
  value: number
}

export interface QuizQuestion {
  id: string
  dimension: DimensionId
  prompt: string
  options: QuizOption[]
}

/** Perguntas situacionais: cada opção posiciona a pessoa na régua da dimensão (0–100). */
export const QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    dimension: 'colaboracao',
    prompt: 'Você recebeu uma tarefa nova e não sabe por onde começar. O que faz primeiro?',
    options: [
      { label: 'Pesquiso sozinho até ter uma proposta minha', value: 10 },
      { label: 'Tento um pouco e, se travar, peço ajuda', value: 40 },
      { label: 'Converso rapidinho com alguém antes de começar', value: 70 },
      { label: 'Chamo o time para pensarmos juntos', value: 95 },
    ],
  },
  {
    id: 'q2',
    dimension: 'estrutura',
    prompt: 'Como você prefere que um projeto comece?',
    options: [
      { label: 'Com escopo, prazos e responsáveis bem definidos', value: 8 },
      { label: 'Com um plano, mas aberto a ajustes', value: 38 },
      { label: 'Com um objetivo claro e liberdade no caminho', value: 68 },
      { label: 'Testando ideias e descobrindo no processo', value: 95 },
    ],
  },
  {
    id: 'q3',
    dimension: 'ritmo',
    prompt: 'Qual semana de trabalho te deixa mais satisfeito?',
    options: [
      { label: 'Previsível, com tempo para fazer bem feito', value: 10 },
      { label: 'Tranquila, com um ou outro pico', value: 40 },
      { label: 'Movimentada, com várias entregas', value: 72 },
      { label: 'Intensa, com prioridades mudando rápido', value: 95 },
    ],
  },
  {
    id: 'q4',
    dimension: 'comunicacao',
    prompt: 'Um colega entregou algo com um erro importante. Como você avisa?',
    options: [
      { label: 'Falo do erro de forma objetiva, sem rodeios', value: 8 },
      { label: 'Aponto o problema e já sugiro a correção', value: 35 },
      { label: 'Começo pelo que ficou bom e depois chego no erro', value: 70 },
      { label: 'Puxo uma conversa com calma, em particular', value: 92 },
    ],
  },
  {
    id: 'q5',
    dimension: 'aprendizado',
    prompt: 'Você precisa aprender uma tecnologia nova. Como estuda?',
    options: [
      { label: 'Leio a documentação inteira antes de mexer', value: 8 },
      { label: 'Faço um curso estruturado do começo ao fim', value: 35 },
      { label: 'Vejo o básico e aprendo construindo algo', value: 70 },
      { label: 'Experimento várias coisas até algo fazer sentido', value: 95 },
    ],
  },
  {
    id: 'q6',
    dimension: 'colaboracao',
    prompt: 'Qual elogio mais te representaria?',
    options: [
      { label: '“Dá para confiar que vai entregar sem supervisão”', value: 10 },
      { label: '“Resolve bem e mantém todo mundo informado”', value: 45 },
      { label: '“Sempre ajuda quem está do lado”', value: 78 },
      { label: '“O time rende mais quando está junto”', value: 95 },
    ],
  },
  {
    id: 'q7',
    dimension: 'estrutura',
    prompt: 'O cliente mudou o pedido no meio da entrega. Sua reação:',
    options: [
      { label: 'Paro e replanejo tudo antes de continuar', value: 10 },
      { label: 'Ajusto o plano e comunico os impactos', value: 40 },
      { label: 'Adapto na hora e sigo em frente', value: 75 },
      { label: 'Gosto disso: mudança deixa o trabalho interessante', value: 95 },
    ],
  },
  {
    id: 'q8',
    dimension: 'ritmo',
    prompt: 'Faltam duas horas para um prazo e surge uma melhoria possível.',
    options: [
      { label: 'Entrego o combinado e anoto a melhoria para depois', value: 12 },
      { label: 'Avalio o risco com alguém antes de decidir', value: 42 },
      { label: 'Faço se der para testar com segurança', value: 70 },
      { label: 'Faço: velocidade e iteração são o jogo', value: 95 },
    ],
  },
  {
    id: 'q9',
    dimension: 'comunicacao',
    prompt: 'Em uma reunião, você discorda da liderança. O que faz?',
    options: [
      { label: 'Falo na hora, com argumentos', value: 10 },
      { label: 'Falo na hora, mas com cuidado no tom', value: 40 },
      { label: 'Espero o fim e converso em particular', value: 75 },
      { label: 'Levo dados por escrito depois, para não criar clima', value: 92 },
    ],
  },
  {
    id: 'q10',
    dimension: 'aprendizado',
    prompt: 'O que te deixa mais orgulhoso no fim do mês?',
    options: [
      { label: 'Ter dominado de verdade um assunto', value: 10 },
      { label: 'Ter feito um trabalho sólido e bem revisado', value: 38 },
      { label: 'Ter aprendido duas ou três coisas novas', value: 72 },
      { label: 'Ter testado algo que ninguém tinha tentado', value: 95 },
    ],
  },
]
