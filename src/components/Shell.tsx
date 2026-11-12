import { useState, type ReactNode } from 'react'
import { account } from '../data/mock'
import { daysLeft, useTrial } from '../lib/trial'
import type { Route } from '../App'

const NAV: { route: Route | null; label: string; icon: ReactNode; count?: number }[] = [
  { route: 'result', label: '내 숏폼', count: 2, icon: <rect x="7" y="3" width="10" height="18" rx="2" /> },
  { route: 'trend', label: '소재 찾기', icon: <path d="M4 16l5-5 4 4 7-8" /> },
  { route: null, label: '라이브러리', icon: <path d="M5 4h14v16H5zM9 4v16" /> },
  {
    route: null,
    label: '채널 · 발행',
    icon: (
      <>
        <circle cx="6" cy="12" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path d="M8 11l8-4M8 13l8 4" />
      </>
    ),
  },
]

export function Shell({ route, crumb, children }: { route: Route; crumb: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const trialEnds = useTrial()
  const shorts = Math.floor(account.credits / account.creditsPerShort)

  return (
    <div className="app">
      <div className="brand">
        <button className="menu-btn" aria-label="메뉴" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <svg viewBox="0 0 24 24">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
        <span className="mark" aria-hidden="true">
          <svg viewBox="0 0 16 16">
            <path d="M4 3l9 5-9 5z" fill="#fff" />
          </svg>
        </span>
        <b>ShortUs</b>
      </div>

      <header className="top">
        <div className="crumb">{crumb}</div>
        <div className="spacer" />
        <div className="credit num" title="남은 크레딧">
          <span>
            {account.credits} 크레딧 · 약 {shorts}편
          </span>
          <span className="track">
            <span className="fill" style={{ width: `${(account.credits / account.creditsMax) * 100}%` }} />
          </span>
        </div>
        <div className="acct">
          <span className="avatar">{account.initials}</span>
          <span className="acct-name">내 계정</span>
          {trialEnds ? (
            <span className="tag tag-pro num">Pro 체험 · {daysLeft(trialEnds)}일 남음</span>
          ) : (
            <span className="tag tag-free">Free</span>
          )}
        </div>
      </header>

      <nav className={`side${open ? ' open' : ''}`} aria-label="주 메뉴">
        {NAV.map((n) => (
          <a
            key={n.label}
            className="nav"
            href={n.route ? `#/${n.route}` : undefined}
            aria-current={n.route === route ? 'page' : undefined}
            aria-disabled={n.route ? undefined : true}
            onClick={() => setOpen(false)}
          >
            <svg viewBox="0 0 24 24">{n.icon}</svg>
            {n.label}
            {n.count ? <span className="count num">{n.count}</span> : null}
            {!n.route ? <span className="count">프로토타입 밖</span> : null}
          </a>
        ))}
        <p className="side-foot">
          패스트뷰 사전 과제 프로토타입
          <br />
          목 데이터 · 서버 없음
        </p>
      </nav>

      <main>{children}</main>
    </div>
  )
}
