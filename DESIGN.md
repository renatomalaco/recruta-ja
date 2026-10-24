# Recruta Já — design

## Ideia central

A **régua de fit**: cada dimensão cultural é uma régua com marcações; a empresa é um marcador cobalto, o candidato um marcador magenta. Quanto mais curto o trecho entre os dois, maior o fit. Ela aparece no hero (demonstração interativa), no perfil do candidato, na comparação de vagas, no cadastro da empresa e na gaveta do painel. A marca (logo e favicon) é a mesma régua com os dois marcadores.

## Cor

Estratégia de campos: a cor ocupa seções inteiras, não detalhes.

| Token | Valor | Papel |
| --- | --- | --- |
| `--sun` | `#ffd43b` | Campo principal, energia do "Já"; sempre um mundo claro |
| `--on-sun` / `--ink` | `#241030` | Tinta ameixa (texto, botões primários) |
| `--cobalt` | `#3442f0` | Lado empresa (B2B) |
| `--magenta` | `#e0347e` | Lado candidato (B2C) |
| `--mint` | `#0f9f78` | Sucesso: skill dominada, trilha concluída |
| `--paper` | `#f6f4fa` | Fundo neutro, puxado para o ameixa |

Modo escuro em `src/styles/tokens.css` via `prefers-color-scheme`.

## Tipografia

Uma família só: **Bricolage Grotesque** (variável, auto-hospedada via `@fontsource-variable`). Títulos usam o eixo de largura (`font-stretch` 75–88%) com tracking negativo; texto corrido em largura normal. Números de fit com `tabular-nums`.

## Movimento

- Um momento orquestrado: os marcadores da régua saem do centro e vão para suas posições (spring sem bounce, 0,55s), e o percentual conta até o valor.
- Quiz: troca de pergunta com opacidade + 24px + blur 4px, 220ms, ease-out forte.
- Botões: `scale(0.96)` no pressionar, 140ms. Hover só em `(hover: hover) and (pointer: fine)`.
- Gaveta do painel: spring sem bounce, entra e sai pela direita, com scrim.
- Check dos módulos: ícone de 0.25 → 1 com blur 4px → 0.
- Animações usam só `transform`, `opacity` e `filter`. `MotionConfig reducedMotion="user"` + regra CSS de `prefers-reduced-motion`.

## Evitado de propósito

Rótulos em caixa alta acima de títulos, cards idênticos de ícone + título, gradientes decorativos, fundo creme com serifa e acento terracota, "→" em botões.
