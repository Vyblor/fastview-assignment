import { useState } from 'react'
import type { Brief } from '../data/briefs'

const KEY = 'shortus-proto:brief-open'

function readOpen() {
  try {
    const v = localStorage.getItem(KEY)
    if (v !== null) return v === '1'
  } catch {
    /* ignore */
  }
  // Open on wide screens; on phones start folded so the screen itself is visible first.
  return !window.matchMedia('(max-width: 768px)').matches
}

/** Assignment note: which topic and idea this screen implements, and how it is measured. */
export function BriefPanel({ brief }: { brief: Brief }) {
  const [open, setOpen] = useState(readOpen)
  const toggle = () => {
    setOpen((o) => {
      try {
        localStorage.setItem(KEY, o ? '0' : '1')
      } catch {
        /* ignore */
      }
      return !o
    })
  }

  return (
    <section className="brief" aria-label="과제 노트">
      <div className="brief-h">
        <div>
          <p className="brief-topic">{brief.topic}</p>
          <h2>{brief.idea}</h2>
          <p className="brief-score num">{brief.score}</p>
        </div>
        <button className="btn btn-quiet btn-sm" aria-expanded={open} onClick={toggle}>
          {open ? '과제 노트 접기' : '과제 노트 펴기'}
        </button>
      </div>
      {open && (
        <div className="brief-b">
          <div>
            <h3>관찰한 문제</h3>
            <ul>
              {brief.observed.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>가설</h3>
            <p>{brief.hypothesis}</p>
            <h3>이 화면에서 바꾼 것</h3>
            <ul>
              {brief.changed.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>지표</h3>
            <dl>
              <dt>주 지표</dt>
              <dd>{brief.metrics.primary}</dd>
              <dt>가드레일</dt>
              <dd>{brief.metrics.guardrail}</dd>
            </dl>
            <h3>프로토타입의 한계</h3>
            <p>{brief.outOfScope}</p>
          </div>
        </div>
      )}
    </section>
  )
}
