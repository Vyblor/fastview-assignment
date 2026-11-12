/**
 * Mock data. Shapes follow what ShortUs showed on 2026-11-12 (credits,
 * per-hour view growth, plan names). Channel names are anonymised.
 */

export const account = {
  initials: 'CL',
  credits: 133,
  creditsMax: 150,
  creditsPerShort: 8,
  welcomeCredits: 83,
}

export const short = {
  title: '수능 앞두고 뿔테 안경 바꾸는 수험생들',
  headline: '“AI 안경으로 오해받을까 봐”… 뿔테로 바꾸는 수험생들',
  caption: '시험장 감독관이 안경을 확인한다는 소문',
  length: '0:38',
  size: '1080×1920',
  template: '상단 제목 바',
  credits: 8,
  finishedAt: '14:58',
  source: '기사 링크 · 조선비즈',
  took: '1분 32초',
}

export type VersionRow = { label: string; free: string; pro: string }

export const versionDiff: VersionRow[] = [
  { label: '워터마크', free: '있음', pro: '없음' },
  { label: '목소리', free: 'Aria · 기본', pro: 'Brian · 프리미엄' },
  { label: '채널 로고', free: '없음', pro: '내 로고' },
  { label: '보관', free: '30일', pro: '무기한' },
]

export const trialPerks = [
  '워터마크 없이 저장, 내 로고 넣기',
  '프리미엄 목소리 21종, 내 목소리 클론',
  '동시 제작 5편, 영상 보관 무기한',
]

export type Rights = 'needs-permission' | 'attribution'
export type Flag = 'spam' | 'topic'

export type TrendVideo = {
  id: number
  img: string
  title: string
  channel: string
  perHour: number
  rights: Rights
  flags: Flag[]
}

export const trendVideos: TrendVideo[] = [
  { id: 1, img: 'v1', title: '우승 직후 인터뷰 풀버전', channel: '게임 채널 A', perHour: 15190, rights: 'needs-permission', flags: [] },
  { id: 2, img: 'v2', title: '수능 D-1 시험장 준비물 총정리', channel: '교육 채널 B', perHour: 6420, rights: 'needs-permission', flags: [] },
  { id: 3, img: 'v3', title: '소액결제 현금화 당일 지급', channel: '채널 C', perHour: 5980, rights: 'needs-permission', flags: ['spam'] },
  { id: 4, img: 'v4', title: '국회 본회의 고성 장면', channel: '뉴스 채널 D', perHour: 5110, rights: 'needs-permission', flags: ['topic'] },
  { id: 5, img: 'v5', title: '편의점 신상 디저트 12종 비교', channel: '리뷰 채널 E', perHour: 3870, rights: 'needs-permission', flags: [] },
  { id: 6, img: 'v6', title: '거래소 가입하면 코인 지급', channel: '채널 F', perHour: 3310, rights: 'needs-permission', flags: ['spam'] },
  { id: 7, img: 'v7', title: '겨울 캠핑 난로 안전 수칙', channel: '공공기관 G', perHour: 2240, rights: 'attribution', flags: [] },
]

export type TrendIssue = { id: number; img: string; title: string; articles: number; flags: Flag[] }

export const trendIssues: TrendIssue[] = [
  { id: 1, img: 'i1', title: '수능 당일 한파 예보, 수험생 옷차림', articles: 214, flags: [] },
  { id: 2, img: 'i2', title: '의원 발언 논란, 여야 공방', articles: 188, flags: ['topic'] },
  { id: 3, img: 'i3', title: '독감 유행 주의보 발령', articles: 152, flags: [] },
  { id: 4, img: 'i4', title: '배우 열애설, 소속사 입장', articles: 131, flags: ['topic'] },
  { id: 5, img: 'i5', title: '11월 소비자물가, 채소값 상승', articles: 97, flags: [] },
]

export const flagReason: Record<Flag, string> = {
  spam: '스팸 의심 채널 · 금융, 가입 유도',
  topic: '정치 · 사건사고 · 스캔들 주제',
}

/** Image file for a mock item. Photos from Wikimedia Commons, see credits.json. */
export const thumb = (key: string) => `${import.meta.env.BASE_URL}thumbs/${key}.jpg`
