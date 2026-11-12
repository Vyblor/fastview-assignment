import { useSyncExternalStore } from 'react'

/** Mock plan state: Free, or a card-free Pro trial with an end date. */
const KEY = 'shortus-proto:trial-ends'
const DAY = 24 * 60 * 60 * 1000
const listeners = new Set<() => void>()

function read(): number | null {
  try {
    const v = localStorage.getItem(KEY)
    return v ? Number(v) : null
  } catch {
    return null
  }
}

let endsAt = read()

function set(v: number | null) {
  endsAt = v
  try {
    if (v) localStorage.setItem(KEY, String(v))
    else localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l())
}

export const trialEndFromNow = () => Date.now() + 7 * DAY
export const startTrial = () => set(trialEndFromNow())
export const endTrial = () => set(null)

export function useTrial() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => endsAt,
  )
}

export const formatDay = (ms: number) =>
  new Date(ms).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })

export const daysLeft = (ms: number) => Math.max(0, Math.ceil((ms - Date.now()) / DAY))
