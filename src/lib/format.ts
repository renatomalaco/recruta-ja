import type { HardSkill } from '../data/dimensions'
import { TRACKS } from '../data/tracks'

export function formatMinutes(total: number) {
  const h = Math.floor(total / 60)
  const m = total % 60
  if (!h) return `${m} min`
  return m ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`
}

export function trackMinutes(gaps: HardSkill[]) {
  return gaps.flatMap((g) => TRACKS[g]).reduce((s, m) => s + m.minutes, 0)
}
