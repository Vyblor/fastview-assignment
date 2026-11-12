import { useEffect, useSyncExternalStore } from 'react'
import { Shell } from './components/Shell'
import { short } from './data/mock'
import { ResultPage } from './pages/ResultPage'
import { TrendPage } from './pages/TrendPage'

export type Route = 'result' | 'trend'

const subscribe = (l: () => void) => {
  window.addEventListener('hashchange', l)
  return () => window.removeEventListener('hashchange', l)
}
const getRoute = (): Route => (location.hash === '#/trend' ? 'trend' : 'result')

export default function App() {
  const route = useSyncExternalStore(subscribe, getRoute)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = route === 'trend' ? '소재 찾기 · ShortUs 프로토타입' : '결과 화면 · ShortUs 프로토타입'
  }, [route])

  const crumb =
    route === 'trend' ? (
      <b>소재 찾기</b>
    ) : (
      <>
        내 숏폼 / <b>{short.title}</b>
      </>
    )

  return (
    <Shell route={route} crumb={crumb}>
      {route === 'trend' ? <TrendPage /> : <ResultPage />}
    </Shell>
  )
}
