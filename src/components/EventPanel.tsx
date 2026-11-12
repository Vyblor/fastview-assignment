import { clearEvents, useEvents } from '../lib/events'
import { endTrial } from '../lib/trial'

const STEPS = [
  { name: 'compare_viewed', label: '비교 노출' },
  { name: 'compare_play', label: '버전 재생' },
  { name: 'trial_cta_click', label: '체험 버튼' },
  { name: 'trial_started', label: '체험 시작' },
]

const time = (t: number) =>
  new Date(t).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })

/** Funnel counts and the latest events, so a reviewer can see what would be measured. */
export function EventPanel({ only }: { only?: (name: string) => boolean }) {
  const all = useEvents()
  const events = only ? all.filter((e) => only(e.name)) : all
  const count = (n: string) => all.filter((e) => e.name === n).length

  return (
    <div className="panel">
      <div className="panel-h">
        <h2>실험 기록</h2>
        <button
          className="btn btn-text btn-sm"
          onClick={() => {
            clearEvents()
            endTrial()
          }}
        >
          처음부터
        </button>
      </div>
      {!only && (
        <div className="funnel num">
          {STEPS.map((s) => (
            <div key={s.name}>
              <span>{s.label}</span>
              <b>{count(s.name).toLocaleString('ko-KR')}</b>
            </div>
          ))}
        </div>
      )}
      <div className="panel-b">
        <table className="log">
          <thead>
            <tr>
              <th>시각</th>
              <th>이벤트</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td className="t">-</td>
                <td className="muted">아직 기록 없음</td>
              </tr>
            ) : (
              events
                .slice(-6)
                .reverse()
                .map((e) => (
                  <tr key={`${e.t}-${e.name}`}>
                    <td className="t num">{time(e.t)}</td>
                    <td>
                      <span className="ev">{e.name}</span>{' '}
                      <span className="muted">
                        {Object.entries(e.props)
                          .map(([k, v]) => `${k}=${v}`)
                          .join(' ')}
                      </span>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
        <p className="log-note">이 브라우저의 localStorage에만 저장됩니다.</p>
      </div>
    </div>
  )
}
