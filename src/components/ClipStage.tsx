import { useEffect, useState } from 'react'
import { short, thumb } from '../data/mock'
import { track } from '../lib/events'

/** 9:16 video placeholder. Pro plays a 5-second preview; Free plays its full length (mocked). */
export function ClipStage({ variant }: { variant: 'free' | 'pro' }) {
  const [playing, setPlaying] = useState(false)
  const seconds = variant === 'pro' ? 5 : 38

  useEffect(() => {
    if (!playing) return
    const id = window.setTimeout(() => setPlaying(false), seconds * 1000)
    return () => window.clearTimeout(id)
  }, [playing, seconds])

  const play = () => {
    if (playing) return setPlaying(false)
    setPlaying(true)
    track('compare_play', { variant })
  }

  return (
    <div className={`stage${playing ? ' playing' : ''}`}>
      <div className="stage-bar">{short.headline}</div>
      <img className="stage-pic" src={thumb('stage')} alt="" />
      <div className="stage-cap">
        <span>{short.caption}</span>
      </div>
      {variant === 'free' ? <span className="stage-wm">ShortUs</span> : <span className="stage-logo">내 채널</span>}
      <button
        className="stage-play"
        aria-label={playing ? '멈춤' : variant === 'pro' ? '내 채널 버전 첫 5초 재생' : '지금 버전 재생'}
        onClick={play}
      >
        <svg viewBox="0 0 16 16">{playing ? <path d="M4 3h3v10H4zM9 3h3v10H9z" /> : <path d="M4 2l10 6-10 6z" />}</svg>
      </button>
      {playing && (
        <span className="stage-progress" aria-hidden="true">
          <i style={{ animationDuration: `${seconds}s` }} />
        </span>
      )}
    </div>
  )
}
