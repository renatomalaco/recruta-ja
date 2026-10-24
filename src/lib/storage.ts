import { useCallback, useState } from 'react'

const PREFIX = 'recrutaja:'

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // Sem armazenamento (aba anônima, por exemplo): o protótipo segue funcionando só em memória.
  }
}

/** Estado React persistido no localStorage do navegador. */
export function useStored<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => read(key, fallback))
  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next
        write(key, resolved)
        return resolved
      })
    },
    [key],
  )
  return [value, set] as const
}

export function clearAll() {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => localStorage.removeItem(k))
  } catch {
    // ignorado
  }
}
