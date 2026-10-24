import { motion } from 'motion/react'
import { DIMENSIONS, type CultureVector } from '../data/dimensions'

interface FitRulerProps {
  /** Vetor da empresa (marcador cobalto). */
  company?: CultureVector
  /** Vetor do candidato (marcador magenta). */
  candidate?: CultureVector
  /** Marcadores saem do centro da régua no primeiro render. */
  intro?: boolean
  compact?: boolean
}

const spring = { type: 'spring', bounce: 0, duration: 0.55 } as const

/**
 * A régua de fit: uma linha por dimensão cultural, com o marcador da empresa e o do candidato.
 * Quanto mais curto o trecho entre os dois, maior o fit naquela dimensão.
 */
export function FitRuler({ company, candidate, intro = false, compact = false }: FitRulerProps) {
  return (
    <div className={compact ? 'ruler ruler--compact' : 'ruler'}>
      {DIMENSIONS.map((d, i) => {
        const a = company?.[d.id]
        const b = candidate?.[d.id]
        const both = a !== undefined && b !== undefined
        const min = both ? Math.min(a, b) : 0
        const span = both ? Math.abs(a - b) : 0
        const delay = intro ? 0.15 + i * 0.05 : 0
        return (
          <div className="ruler-row" key={d.id}>
            <div className="ruler-labels">
              <span>{d.left}</span>
              {!compact && <span className="ruler-name">{d.name}</span>}
              <span>{d.right}</span>
            </div>
            <div className="ruler-track" role="img" aria-label={describe(d.name, d.left, d.right, a, b)}>
              {both && (
                <motion.div
                  className="ruler-gap"
                  initial={intro ? { transform: 'translateX(50%) scaleX(0)' } : false}
                  animate={{ transform: `translateX(${min}%) scaleX(${span / 100})` }}
                  transition={{ ...spring, delay }}
                />
              )}
              {a !== undefined && (
                <motion.div
                  className="ruler-pos"
                  initial={intro ? { transform: 'translateX(50%)' } : false}
                  animate={{ transform: `translateX(${a}%)` }}
                  transition={{ ...spring, delay }}
                >
                  <span className="ruler-dot ruler-dot--company" />
                </motion.div>
              )}
              {b !== undefined && (
                <motion.div
                  className="ruler-pos"
                  initial={intro ? { transform: 'translateX(50%)' } : false}
                  animate={{ transform: `translateX(${b}%)` }}
                  transition={{ ...spring, delay }}
                >
                  <span className="ruler-dot ruler-dot--candidate" />
                </motion.div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function describe(name: string, left: string, right: string, a?: number, b?: number) {
  const parts = [`${name}, de ${left} (0) a ${right} (100).`]
  if (a !== undefined) parts.push(`Empresa: ${a}.`)
  if (b !== undefined) parts.push(`Candidato: ${b}.`)
  return parts.join(' ')
}

export function RulerLegend({ company, candidate }: { company?: string; candidate?: string }) {
  return (
    <div className="ruler-legend">
      {company && (
        <span>
          <span className="ruler-dot ruler-dot--company" aria-hidden /> {company}
        </span>
      )}
      {candidate && (
        <span>
          <span className="ruler-dot ruler-dot--candidate" aria-hidden /> {candidate}
        </span>
      )}
    </div>
  )
}
