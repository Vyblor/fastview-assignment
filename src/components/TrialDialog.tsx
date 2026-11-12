import { useEffect, useRef } from 'react'
import { trialPerks } from '../data/mock'
import { track } from '../lib/events'
import { formatDay, startTrial, trialEndFromNow } from '../lib/trial'

/** Card-free Pro 7-day trial. Bottom sheet on phones, centred dialog on wider screens. */
export function TrialDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const primary = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) {
      d.showModal()
      primary.current?.focus({ focusVisible: false } as FocusOptions)
    }
    if (!open && d.open) d.close()
  }, [open])

  const ends = formatDay(trialEndFromNow())

  const start = () => {
    startTrial()
    track('trial_started', { card: false })
    onClose()
  }

  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-labelledby="trial-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
    >
      <div className="sheet-in">
        <h2 id="trial-title">Pro 7일, 카드 없이</h2>
        <ul className="perks">
          {trialPerks.map((p) => (
            <li key={p}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 8l3 3 7-7" />
              </svg>
              {p}
            </li>
          ))}
        </ul>
        <p className="notice">
          <b>{ends}에 끝나요.</b> 카드를 받지 않아 자동 결제는 없습니다. 끝나기 3일 전에 알려 드리고, 끝나면 Free로
          돌아가요. 체험 중 만든 영상은 그대로 남습니다.
        </p>
        <div className="sheet-actions">
          <button
            className="btn btn-text"
            onClick={() => {
              track('trial_declined')
              onClose()
            }}
          >
            닫기
          </button>
          <button ref={primary} className="btn btn-primary" onClick={start}>
            7일 체험 시작
          </button>
        </div>
      </div>
    </dialog>
  )
}
