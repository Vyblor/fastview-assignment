import { useSyncExternalStore } from 'react'

/**
 * Experiment event log. Stored in localStorage only — there is no server.
 * In ShortUs this would go to the analytics pipeline it already uses.
 */
export type EventProps = Record<string, string | number | boolean>
export type TrackedEvent = { t: number; name: string; props: EventProps }

const KEY = 'shortus-proto:events'
const listeners = new Set<() => void>()

function load(): TrackedEvent[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]') as TrackedEvent[]
  } catch {
    return []
  }
}

let events: TrackedEvent[] = load()

function emit() {
  try {
    localStorage.setItem(KEY, JSON.stringify(events))
  } catch {
    /* private mode: keep in memory only */
  }
  listeners.forEach((l) => l())
}

export function track(name: string, props: EventProps = {}) {
  events = [...events, { t: Date.now(), name, props }]
  emit()
}

export function clearEvents() {
  events = []
  emit()
}

export function useEvents() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => events,
  )
}
