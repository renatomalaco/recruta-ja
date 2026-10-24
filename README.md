# Recruta Já — protótipo navegável

Plataforma B2B2C que auxilia o processo de recrutamento: conecta pessoas e empresas por **fit cultural**, oferece **trilhas de capacitação** para quem tem o perfil certo mas ainda tem lacunas técnicas e um **treino de entrevista** com um recrutador de IA da área da vaga. Este repositório é o MVP de validação: todos os dados são fictícios e ficam no navegador (sem backend).

## Fluxos

Para recomeçar a demonstração do zero, use "Reiniciar demonstração" no rodapé.


| Público | Caminho |
| --- | --- |
| Candidato | `/candidatos` → `/candidato/quiz` → `/candidato/perfil` → `/candidato/vagas` → `/candidato/trilha/:vaga` → `/candidato/entrevista` |
| Empresa | `/empresas` → `/empresa/cultura` → `/empresa/painel` |

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:5173.

## Publicar grátis no GitHub Pages

O workflow `.github/workflows/deploy.yml` publica o site a cada push na branch `main`.

1. Suba este repositório para o GitHub.
2. No repositório, abra **Settings → Pages** e, em **Source**, escolha **GitHub Actions**.
3. Acompanhe a publicação na aba **Actions**. O site fica em `https://<usuario>.github.io/<repositorio>/`.

O build usa o nome do repositório como caminho base, e o `404.html` gerado no deploy faz links diretos como `/empresa/painel` funcionarem.

## Estrutura

- `src/data/` — dimensões culturais, perguntas do quiz, empresas, vagas, candidatos e trilhas (fictícios)
- `src/lib/fit.ts` — cálculo do fit cultural, lacunas técnicas, arquétipo e soft skills
- `src/components/FitRuler.tsx` — a régua de fit, peça central da interface
- `src/styles/` — tokens de cor e tipografia, base, componentes e páginas
- `DESIGN.md` — decisões visuais e de movimento

## Treino de entrevista

Fica no menu ("Treino de entrevista") e abre direto com o recrutador da área de maior fit; o candidato pode trocar para outra vaga liberada (pelo menos 70% de fit cultural). Cada área (front-end, dados, design, full-stack, back-end, análise) tem um recrutador fictício com perguntas próprias, e duas perguntas vêm das dimensões mais marcantes da cultura da empresa.

Neste MVP o recrutador é **simulado** (`src/lib/interviewer.ts`): as respostas são avaliadas por regras simples (tamanho, estrutura situação-ação-resultado e termos esperados da área). Para usar uma IA de verdade, é preciso um backend que guarde a chave da API, já que o GitHub Pages só serve arquivos estáticos.

## Como o fit é calculado

Cada pessoa e cada empresa recebe um vetor de 0 a 100 em cinco dimensões (forma de trabalhar, organização, ritmo, comunicação e aprendizado). O fit é `100 − média das diferenças absolutas`. Lacunas técnicas são as hard skills da vaga que a pessoa ainda não marcou; cada uma vira módulos de trilha.
