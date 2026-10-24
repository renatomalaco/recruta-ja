interface ProgressProps {
  value: number
  label: string
  tone?: 'ink' | 'mint' | 'magenta'
}

/** Barra de progresso animada por transform (scaleX), sem mexer em layout. */
export function Progress({ value, label, tone = 'ink' }: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div
      className={`progress progress--${tone}`}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
    >
      <div className="progress-fill" style={{ transform: `scaleX(${clamped / 100})` }} />
    </div>
  )
}
