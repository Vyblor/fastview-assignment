import { useState } from 'react'
import { BriefPanel } from '../components/BriefPanel'
import { EventPanel } from '../components/EventPanel'
import { briefs } from '../data/briefs'
import { flagReason, thumb, trendIssues, trendVideos, type Flag } from '../data/mock'
import { track } from '../lib/events'

type Rules = { spam: boolean; topic: boolean; rights: boolean }

const CHIPS: { key: keyof Rules; label: string }[] = [
  { key: 'spam', label: '스팸 의심 채널 숨김' },
  { key: 'topic', label: '정치 · 사건사고 끄기' },
  { key: 'rights', label: '권리 표시' },
]

const fmt = (n: number) => n.toLocaleString('ko-KR')

export function TrendPage() {
  const [kind, setKind] = useState<'video' | 'issue'>('video')
  const [safe, setSafe] = useState(true)
  const [rules, setRules] = useState<Rules>({ spam: true, topic: true, rights: true })
  const [showHidden, setShowHidden] = useState(false)

  const blockedBy = (flags: Flag[]) => (safe ? flags.find((f) => rules[f]) : undefined)
  const items = kind === 'video' ? trendVideos : trendIssues
  const visible = items.filter((i) => !blockedBy(i.flags))
  const hidden = items.filter((i) => blockedBy(i.flags))

  const toggleSafe = () => {
    setSafe((s) => !s)
    track('safety_toggle', { rule: 'all', on: !safe })
  }
  const toggleRule = (k: keyof Rules) => {
    setRules((r) => ({ ...r, [k]: !r[k] }))
    track('safety_toggle', { rule: k, on: !rules[k] })
  }

  return (
    <>
      <BriefPanel brief={briefs.trend} />

      <div className="title">
        <div>
          <h1>소재 찾기</h1>
          <p>
            {kind === 'video' ? '최근 1–3일 조회수가 빠르게 오르는 영상' : '기사가 많이 쏟아지는 이슈'}, 15:00 측정. 안전 필터가
            걸러 낸 것은 맨 아래에 이유와 함께 남깁니다.
          </p>
        </div>
        <div className="actions">
          <div className="seg" role="group" aria-label="종류">
            <button aria-pressed={kind === 'video'} onClick={() => setKind('video')}>
              영상
            </button>
            <button aria-pressed={kind === 'issue'} onClick={() => setKind('issue')}>
              이슈
            </button>
          </div>
        </div>
      </div>

      <div className="trend-wrap">
        <div className="panel">
          <div className="safety">
            <button className="switch" role="switch" aria-checked={safe} onClick={toggleSafe}>
              <i />
              안전 필터
            </button>
            {CHIPS.map((c) => (
              <button
                key={c.key}
                className="chip"
                aria-pressed={rules[c.key]}
                disabled={!safe}
                onClick={() => toggleRule(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <ul className="trend">
            {visible.map((item, i) => (
              <li key={item.id}>
                <span className="rank num">{i + 1}</span>
                <img className="thumb" src={thumb(item.img)} alt="" loading="lazy" />
                <div className="body">
                  <h3>{item.title}</h3>
                  <div className="sub num">
                    {'channel' in item ? item.channel : `관련 기사 ${fmt(item.articles)}건`}
                  </div>
                  {'rights' in item && safe && rules.rights && (
                    <div className="badges">
                      {item.rights === 'attribution' ? (
                        <span className="tag tag-ok">출처 표기로 사용 가능</span>
                      ) : (
                        <span className="tag tag-warn">권리자 허락 필요</span>
                      )}
                    </div>
                  )}
                </div>
                <div className="act">
                  {'perHour' in item ? (
                    <span className="speed num">
                      <b>+{fmt(item.perHour)}</b> 회/시간
                    </span>
                  ) : (
                    <span />
                  )}
                  <button
                    className="btn btn-quiet btn-sm"
                    onClick={() =>
                      track('trend_make_click', {
                        kind,
                        id: item.id,
                        ...('rights' in item ? { rights: item.rights } : {}),
                      })
                    }
                  >
                    쇼츠 만들기
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {hidden.length > 0 && (
            <>
              <div className={`hidden-sum${showHidden ? '' : ' last'}`}>
                <span className="num">{hidden.length}개 숨김</span>
                <button
                  className="btn btn-text btn-sm"
                  aria-expanded={showHidden}
                  onClick={() => {
                    setShowHidden((s) => !s)
                    if (!showHidden) track('hidden_list_open', { kind, count: hidden.length })
                  }}
                >
                  {showHidden ? '이유 접기' : '이유 보기'}
                </button>
              </div>
              {showHidden && (
                <ul className="hidden-list">
                  {hidden.map((h) => (
                    <li key={h.id}>
                      <span>{h.title}</span>
                      <span>{flagReason[blockedBy(h.flags)!]}</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>

        <div className="stack">
          <div className="panel">
            <div className="panel-h">
              <h2>왜 걸러요</h2>
            </div>
            <div className="panel-b why">
              <div>
                <h3>남의 영상은 권리자 허락이 필요해요</h3>
                <p>하이라이트를 쓰려면 원본 권리자의 허락이 있어야 합니다. 허락 없이 올리면 책임은 올린 사람에게 있어요.</p>
              </div>
              <div>
                <h3>반복 · 자극 콘텐츠는 수익이 막힐 수 있어요</h3>
                <p>유튜브는 2025년 7월부터 대량 생산 · 반복 콘텐츠의 수익화를 채널 단위로 제한합니다.</p>
              </div>
              <div>
                <h3>설정은 내 계정에만 적용돼요</h3>
                <p>필터를 꺼도 목록만 바뀌고, 만들기에는 영향이 없습니다.</p>
              </div>
            </div>
          </div>
          <EventPanel only={(n) => n.startsWith('safety') || n.startsWith('trend') || n.startsWith('hidden')} />
        </div>
      </div>
    </>
  )
}
