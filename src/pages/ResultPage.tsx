import { useEffect, useRef, useState } from 'react'
import { BriefPanel } from '../components/BriefPanel'
import { ClipStage } from '../components/ClipStage'
import { EventPanel } from '../components/EventPanel'
import { TrialDialog } from '../components/TrialDialog'
import { briefs } from '../data/briefs'
import { account, short, versionDiff } from '../data/mock'
import { track } from '../lib/events'
import { daysLeft, formatDay, useTrial } from '../lib/trial'

export function ResultPage() {
  const [dialog, setDialog] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [saved, setSaved] = useState<null | 'free' | 'pro'>(null)
  const trialEnds = useTrial()
  const compareRef = useRef<HTMLDivElement>(null)

  // compare_viewed: once per visit, when half the comparison is on screen
  useEffect(() => {
    const el = compareRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          track('compare_viewed')
          io.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const save = (v: 'free' | 'pro') => {
    setSaved(v)
    track('download', { variant: v })
  }

  return (
    <>
      <BriefPanel brief={briefs.result} />

      <div className="title">
        <div>
          <h1>{short.title}</h1>
          <p className="num">
            {short.length} · {short.size} · 템플릿 {short.template} · {short.credits} 크레딧 사용 · 오늘 {short.finishedAt} 완성
          </p>
        </div>
        <div className="actions">
          <button className="btn btn-quiet" onClick={() => save('free')}>
            무료 버전 저장
          </button>
          <button className="btn btn-dark" onClick={() => track('publish_click')}>
            채널에 올리기
          </button>
        </div>
      </div>

      {saved && (
        <p className="toast" role="status">
          {saved === 'free' ? '무료 버전을 저장했어요. 워터마크가 들어가 있어요.' : '내 채널 버전을 저장했어요.'}
        </p>
      )}

      <div className="result">
        <div className="panel">
          <div className="panel-h">
            <h2>두 버전 비교</h2>
            <span className="meta">같은 대본 · 다시 만들기 0 크레딧</span>
          </div>
          <div className="versions" ref={compareRef}>
            {(['free', 'pro'] as const).map((v) => (
              <div className="ver" key={v}>
                <h3>
                  {v === 'free' ? '지금 버전' : '내 채널 버전'}
                  <span className={`tag ${v === 'free' ? 'tag-free' : 'tag-pro'}`}>{v === 'free' ? 'Free' : 'Pro'}</span>
                </h3>
                <ClipStage variant={v} />
                <ul className="diff">
                  {versionDiff.map((r) => (
                    <li key={r.label}>
                      <span className="muted">{r.label}</span>
                      <span className={v === 'pro' ? 'gain' : undefined}>{v === 'free' ? r.free : r.pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="stack">
          {trialEnds ? (
            <div className="offer">
              <h2 className="num">Pro 체험 중 · {daysLeft(trialEnds)}일 남음</h2>
              <p>{formatDay(trialEnds)}에 끝나고 Free로 돌아가요. 자동 결제는 없어요.</p>
              <div className="row">
                <button className="btn btn-primary" onClick={() => save('pro')}>
                  내 채널 버전 저장
                </button>
              </div>
            </div>
          ) : dismissed ? (
            <div className="offer offer-quiet">
              <p>
                내 채널 버전은 언제든 이 화면에서 다시 볼 수 있어요.{' '}
                <button className="btn btn-text btn-inline" onClick={() => setDismissed(false)}>
                  체험 제안 다시 보기
                </button>
              </p>
            </div>
          ) : (
            <div className="offer">
              <h2>내 채널 버전으로 7일 써 보기</h2>
              <p>카드 없이 Pro를 7일 씁니다. 끝나면 Free로 돌아가고, 결제는 일어나지 않아요.</p>
              <div className="row">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    track('trial_cta_click')
                    setDialog(true)
                  }}
                >
                  카드 없이 시작
                </button>
                <button
                  className="btn btn-text"
                  onClick={() => {
                    track('offer_dismissed')
                    setDismissed(true)
                  }}
                >
                  지금은 무료 버전으로
                </button>
              </div>
            </div>
          )}

          <div className="panel">
            <div className="panel-h">
              <h2>이 영상</h2>
            </div>
            <dl className="facts num">
              <dt>입력</dt>
              <dd>{short.source}</dd>
              <dt>걸린 시간</dt>
              <dd>{short.took}</dd>
              <dt>사용 크레딧</dt>
              <dd>{short.credits}</dd>
              <dt>남은 크레딧</dt>
              <dd>
                {account.credits} · 약 {Math.floor(account.credits / account.creditsPerShort)}편
              </dd>
            </dl>
          </div>

          <EventPanel />
        </div>
      </div>

      <TrialDialog open={dialog} onClose={() => setDialog(false)} />
    </>
  )
}
