/**
 * What each screen implements, in assignment terms. Source: the strategy
 * notes (problems P1–P6, re-scored ideas, rubric I × C × E × risk).
 */
export type Brief = {
  topic: string
  idea: string
  score: string
  observed: string[]
  hypothesis: string
  changed: string[]
  metrics: { primary: string; guardrail: string }
  outOfScope: string
}

export const briefs: Record<'result' | 'trend', Brief> = {
  result: {
    topic: '지정 주제 · 무료 사용자의 유료 전환',
    idea: '아이디어 1 + 2 · 결과 화면 "내 채널 버전" 비교 → 카드 없는 Pro 7일 체험',
    score: '1순위 60점 · 2순위 48점 (임팩트 × 확신 × 쉬움 × 위험 계수)',
    observed: [
      '만들기 → 결과 → 저장 → 발행 어디에도 유료와 만나는 순간이 없다. 무료로 다운로드와 발행까지 끝난다.',
      '유료가 파는 것(워터마크 없음, 내 로고, 프리미엄 목소리)은 라이브러리의 "유료 플랜 전용" 문구와 결제 화면에만 있다.',
      'Pro 7일 체험 장치는 이미 있지만 꺼져 있다(trial_offer_days: 0).',
    ],
    hypothesis:
      '사용자가 가치를 가장 크게 느끼는 첫 결과 직후에, 같은 영상의 유료 버전을 나란히 보여 주고 카드 없이 체험하게 하면 체험 시작과 유료 전환이 오른다.',
    changed: [
      '결과 화면에 무료 · 내 채널 버전 비교와 차이 4줄',
      '그 자리의 체험 제안(무료 버전 저장은 막지 않음)',
      '체험 창에 끝나는 날, 자동 결제 없음, 3일 전 알림 고지',
      '실험 기록: 비교 노출 → 재생 → 체험 버튼 → 체험 시작',
    ],
    metrics: {
      primary: '결과 화면 노출 대비 체험 시작률, 체험 → 유료 전환율',
      guardrail: '무료 다운로드율, 결과 화면 이탈률, 환불률',
    },
    outOfScope: '실제 렌더 · 결제 · 서버 A/B 배정은 없다. 실제로는 체험 없음 / 가입 직후 / 첫 결과 직후 세 집단으로 나눠 비교한다.',
  },
  trend: {
    topic: '자유 주제 · 사용자 만족도',
    idea: '아이디어 1 · 소재 찾기 안전 필터',
    score: '1순위 48점 (임팩트 × 확신 × 쉬움 × 위험 계수)',
    observed: [
      '채널별 인기 영상 1위에 소액결제 현금화 영상이 올라와 있었다.',
      '"재사용 가능한 유튜브 영상"이라는 문구와 "권리 책임은 사용자에게" 고지가 한 화면에서 부딪힌다.',
      '상위 이슈가 정치 · 스캔들 위주라, 브랜드를 지켜야 하는 매체 · 기업 사용자가 쓰기 어렵다.',
    ],
    hypothesis:
      '위험한 소재를 이유와 함께 걸러 주고 권리 상태를 줄마다 보여 주면, 사용자가 소재를 믿고 골라 만들기까지 이어진다.',
    changed: [
      '안전 필터 스위치와 규칙별 칩(스팸 채널, 정치 · 사건사고, 권리 표시)',
      '줄마다 권리 배지: 권리자 허락 필요 / 출처 표기로 사용 가능',
      '걸러 낸 항목은 지우지 않고 "n개 숨김 · 이유 보기"로 남김',
      '영상 · 이슈 두 목록 모두에 같은 규칙',
    ],
    metrics: {
      primary: '소재 찾기 → 만들기 시작률, 소재 찾기 재방문율',
      guardrail: '필터 끄기 비율, 숨김 목록 열람 후 만들기 비율',
    },
    outOfScope: '스팸 판별은 목 데이터의 표시를 쓴다. 실제로는 채널 차단 목록과 주제 분류 결과를 붙인다.',
  },
}
