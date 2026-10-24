import type { DimensionId } from './dimensions'

export type AreaId = 'frontend' | 'dados' | 'design' | 'fullstack' | 'backend' | 'analise'

export interface InterviewQuestion {
  id: string
  text: string
  /** O que a pergunta avalia, mostrado no relatório final. */
  focus: string
  /** Termos que um bom recrutador da área espera ouvir (comparados sem acento). */
  keywords: string[]
  /** Sugestão mostrada quando nenhum termo esperado aparece. */
  hint: string
}

export interface Recruiter {
  name: string
  role: string
  area: string
  questions: InterviewQuestion[]
}

/** Nível mínimo de fit cultural para liberar o treino de entrevista. */
export const INTERVIEW_MIN_FIT = 70

// Recrutadores fictícios: personas simuladas, uma por área de atuação.
export const RECRUITERS: Record<AreaId, Recruiter> = {
  frontend: {
    name: 'Bia Andrade',
    role: 'Recrutadora técnica',
    area: 'Front-end',
    questions: [
      {
        id: 'fe-1',
        text: 'Me conta de uma tela ou componente que você construiu. Como você garantiu que funcionava bem no celular?',
        focus: 'Responsividade e cuidado com o usuário',
        keywords: ['responsiv', 'mobile', 'celular', 'flex', 'grid', 'media quer', 'breakpoint', 'teste'],
        hint: 'Cite como você testou em telas diferentes (Flexbox, Grid, media queries, DevTools).',
      },
      {
        id: 'fe-2',
        text: 'Uma página está lenta para carregar. Por onde você começaria a investigar?',
        focus: 'Raciocínio de diagnóstico',
        keywords: ['devtools', 'network', 'imagem', 'cache', 'lighthouse', 'bundle', 'lazy', 'requisic', 'medir'],
        hint: 'Mostre um passo a passo: medir primeiro (DevTools, Lighthouse), depois atacar imagens, requisições e tamanho do código.',
      },
    ],
  },
  dados: {
    name: 'Caio Mendes',
    role: 'Recrutador',
    area: 'Dados e BI',
    questions: [
      {
        id: 'da-1',
        text: 'Você recebeu uma base com dados duplicados e campos vazios. O que faz antes de começar a análise?',
        focus: 'Qualidade de dados',
        keywords: ['limp', 'duplic', 'nulo', 'vazio', 'valid', 'tratar', 'pandas', 'sql', 'conferir', 'origem'],
        hint: 'Fale de limpeza e validação: remover duplicados, tratar nulos e confirmar a origem dos dados.',
      },
      {
        id: 'da-2',
        text: 'Como você explicaria um resultado de análise para alguém que não é da área de dados?',
        focus: 'Comunicação de dados',
        keywords: ['grafico', 'visual', 'simples', 'exemplo', 'painel', 'dashboard', 'decis', 'negocio', 'historia'],
        hint: 'Mostre que você traduz números em decisões: um gráfico simples, um exemplo do negócio e a recomendação.',
      },
    ],
  },
  design: {
    name: 'Lívia Rocha',
    role: 'Recrutadora',
    area: 'Design de Produto',
    questions: [
      {
        id: 'de-1',
        text: 'Conte como você descobriria o problema real de um usuário antes de desenhar a solução.',
        focus: 'Pesquisa com usuários',
        keywords: ['entrevist', 'pesquisa', 'usuario', 'observ', 'dor', 'hipotes', 'teste', 'persona', 'dados'],
        hint: 'Cite métodos de pesquisa: entrevistas, observação, hipóteses e teste com usuários.',
      },
      {
        id: 'de-2',
        text: 'Um desenvolvedor diz que seu protótipo é difícil de implementar. Como você conduz essa conversa?',
        focus: 'Colaboração com engenharia',
        keywords: ['conversa', 'entender', 'alternativ', 'priorid', 'junto', 'restric', 'mvp', 'negoci', 'ajust'],
        hint: 'Mostre abertura: entender a restrição técnica e buscar uma alternativa juntos, sem perder o objetivo do usuário.',
      },
    ],
  },
  fullstack: {
    name: 'Diego Prado',
    role: 'Recrutador técnico',
    area: 'Engenharia Full-stack',
    questions: [
      {
        id: 'fs-1',
        text: 'Explique, do clique do usuário até o banco de dados, o caminho de uma funcionalidade que você fez.',
        focus: 'Visão de ponta a ponta',
        keywords: ['front', 'api', 'requisic', 'banco', 'endpoint', 'servidor', 'rota', 'resposta', 'json'],
        hint: 'Percorra as camadas: interface, requisição à API, regra no servidor, banco e a resposta de volta.',
      },
      {
        id: 'fs-2',
        text: 'Você subiu uma mudança e algo quebrou em produção. O que você faz nos primeiros minutos?',
        focus: 'Postura diante de incidentes',
        keywords: ['revert', 'rollback', 'log', 'avis', 'comunic', 'time', 'investig', 'teste', 'causa'],
        hint: 'Mostre prioridade: comunicar o time, reverter se preciso, olhar os logs e depois achar a causa.',
      },
    ],
  },
  backend: {
    name: 'Helena Duarte',
    role: 'Recrutadora técnica',
    area: 'Back-end',
    questions: [
      {
        id: 'be-1',
        text: 'Uma consulta ao banco ficou lenta conforme os dados cresceram. Como você investigaria?',
        focus: 'Desempenho e banco de dados',
        keywords: ['indice', 'explain', 'query', 'consulta', 'join', 'medir', 'log', 'cache', 'paginac'],
        hint: 'Fale em medir a consulta (EXPLAIN), revisar índices e JOINs e considerar paginação ou cache.',
      },
      {
        id: 'be-2',
        text: 'Por que escrever testes automatizados, se o código já funciona na sua máquina?',
        focus: 'Qualidade e confiabilidade',
        keywords: ['regress', 'confian', 'refator', 'mudanc', 'garant', 'bug', 'unitario', 'integrac', 'automat'],
        hint: 'Explique que testes evitam regressões e dão segurança para mudar e refatorar o código.',
      },
    ],
  },
  analise: {
    name: 'Marcos Teixeira',
    role: 'Recrutador',
    area: 'Análise de Sistemas',
    questions: [
      {
        id: 'an-1',
        text: 'Como você levantaria os requisitos de um sistema com uma clínica que nunca usou um?',
        focus: 'Levantamento de requisitos',
        keywords: ['entrevist', 'process', 'observ', 'usuario', 'document', 'priorid', 'fluxo', 'valid', 'pergunt'],
        hint: 'Cite entrevistas e observação do processo atual, documentação do fluxo e validação com quem vai usar.',
      },
      {
        id: 'an-2',
        text: 'Duas áreas pedem funcionalidades que se contradizem. Como você resolve?',
        focus: 'Negociação e priorização',
        keywords: ['reuni', 'priorid', 'objetivo', 'dados', 'impacto', 'negoci', 'alinh', 'decis', 'comum'],
        hint: 'Mostre como você reúne as áreas, olha o impacto de cada pedido e chega a uma prioridade em comum.',
      },
    ],
  },
}

export const OPENING: InterviewQuestion = {
  id: 'open',
  text: 'Para começar: me conta um pouco sobre você e por que essa vaga chamou sua atenção.',
  focus: 'Apresentação pessoal',
  keywords: ['estud', 'curso', 'projeto', 'aprend', 'interesse', 'empresa', 'vaga', 'gosto'],
  hint: 'Conecte sua trajetória com a vaga: o que você estuda, um projeto seu e por que esta empresa.',
}

export const CLOSING: InterviewQuestion = {
  id: 'close',
  text: 'Para fechar: você tem alguma pergunta para nós sobre o time ou a vaga?',
  focus: 'Interesse pela empresa',
  keywords: ['time', 'equipe', 'desafio', 'cresc', 'aprend', 'rotina', 'dia a dia', 'expectativ', 'mentor'],
  hint: 'Tenha uma ou duas perguntas prontas: como é o dia a dia, os desafios do time, como é o acompanhamento.',
}

/** Perguntas comportamentais ligadas ao lado mais marcante da cultura da empresa. */
export const CULTURE_QUESTIONS: Record<DimensionId, [InterviewQuestion, InterviewQuestion]> = {
  colaboracao: [
    {
      id: 'cul-autonomia',
      text: 'Aqui as pessoas têm bastante autonomia. Conte de uma vez em que você resolveu algo sozinho, sem esperar alguém.',
      focus: 'Autonomia',
      keywords: ['sozinh', 'decidi', 'pesquis', 'iniciativa', 'resolvi', 'busquei'],
      hint: 'Mostre iniciativa: o que você decidiu sozinho, como pesquisou e quando avisou as pessoas.',
    },
    {
      id: 'cul-colab',
      text: 'Nosso time trabalha muito junto. Conte de uma situação em que você ajudou alguém a destravar um problema.',
      focus: 'Colaboração',
      keywords: ['ajud', 'junto', 'time', 'equipe', 'colega', 'ensin', 'pareamento'],
      hint: 'Dê um exemplo concreto de como você ajudou alguém e o que o time ganhou com isso.',
    },
  ],
  estrutura: [
    {
      id: 'cul-processo',
      text: 'Valorizamos processos bem definidos. Como você organiza suas tarefas para não perder prazos?',
      focus: 'Organização',
      keywords: ['lista', 'planej', 'prazo', 'priorid', 'agenda', 'quadro', 'kanban', 'organiz'],
      hint: 'Cite seu método: lista, quadro, prioridades por prazo e como você revisa o planejamento.',
    },
    {
      id: 'cul-improviso',
      text: 'Por aqui os planos mudam com frequência. Conte de quando você teve que se adaptar no meio do caminho.',
      focus: 'Adaptabilidade',
      keywords: ['mud', 'adapt', 'ajust', 'flexib', 'novo plano', 'replanej'],
      hint: 'Mostre como você reagiu à mudança, o que ajustou e qual foi o resultado.',
    },
  ],
  ritmo: [
    {
      id: 'cul-constante',
      text: 'Preferimos fazer bem feito a fazer rápido. Conte de quando você revisou algo com cuidado antes de entregar.',
      focus: 'Cuidado com a qualidade',
      keywords: ['revis', 'qualidade', 'test', 'detalh', 'cuidado', 'confer'],
      hint: 'Fale do que você revisou, por que importava e o problema que isso evitou.',
    },
    {
      id: 'cul-acelerado',
      text: 'Nosso ritmo é intenso. Conte de uma vez em que você entregou algo com prazo apertado.',
      focus: 'Ritmo e senso de urgência',
      keywords: ['prazo', 'priorid', 'rapido', 'entreg', 'foco', 'urgen'],
      hint: 'Mostre como você priorizou o essencial para entregar no prazo sem perder a qualidade.',
    },
  ],
  comunicacao: [
    {
      id: 'cul-direta',
      text: 'Aqui o feedback é bem direto. Conte de um feedback difícil que você recebeu e o que fez com ele.',
      focus: 'Abertura a feedback',
      keywords: ['feedback', 'critica', 'melhor', 'aprendi', 'mudei', 'ouvi'],
      hint: 'Mostre maturidade: o que ouviu, como reagiu e o que mudou depois.',
    },
    {
      id: 'cul-diplomatica',
      text: 'Cuidamos muito da forma como falamos uns com os outros. Como você lida com uma discordância no time?',
      focus: 'Comunicação cuidadosa',
      keywords: ['convers', 'ouvir', 'respeit', 'entender', 'particular', 'calma', 'argument'],
      hint: 'Mostre escuta e respeito: ouvir o outro lado, conversar com calma e buscar um acordo.',
    },
  ],
  aprendizado: [
    {
      id: 'cul-profundidade',
      text: 'Valorizamos quem domina bem um assunto. Qual tema você estudou a fundo e como fez isso?',
      focus: 'Profundidade de estudo',
      keywords: ['estud', 'document', 'curso', 'livro', 'pratic', 'aprofund'],
      hint: 'Mostre seu método de estudo: fontes, prática e como você sabe que aprendeu.',
    },
    {
      id: 'cul-exploracao',
      text: 'Gostamos de quem testa coisas novas. Conte de algo que você aprendeu experimentando.',
      focus: 'Curiosidade',
      keywords: ['test', 'experiment', 'projeto', 'curios', 'aprendi', 'tentei'],
      hint: 'Conte o que você testou, o que deu errado no caminho e o que aprendeu.',
    },
  ],
}
