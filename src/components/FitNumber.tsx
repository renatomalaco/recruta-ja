import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { useEffect } from 'react'

interface FitNumberProps {
  value: number
  from?: number
  className?: string
  /** Sufixo visual; vazio para notas sem unidade. */
  unit?: string
  /** Texto lido por leitores de tela. */
  label?: string
}

/** Número que conta até o novo valor quando ele muda (percentual de fit por padrão). */
export function FitNumber({ value, from, className, unit = '%', label }: FitNumberProps) {
  const reduce = useReducedMotion()
  const mv = useMotionValue(from ?? value)
  const rounded = useTransform(mv, (v) => Math.round(v))

  useEffect(() => {
    if (reduce) {
      mv.set(value)
      return
    }
    const controls = animate(mv, value, { duration: 0.6, ease: [0.23, 1, 0.32, 1] })
    return () => controls.stop()
  }, [value, reduce, mv])

  return (
    <span className={className ? `fit-number ${className}` : 'fit-number'} aria-label={label ?? `${value}% de fit`}>
      <motion.span aria-hidden>{rounded}</motion.span>
      {unit && (
        <span className="fit-number-unit" aria-hidden>
          {unit}
        </span>
      )}
    </span>
  )
}
