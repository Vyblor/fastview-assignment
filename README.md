# 쇼더스(ShortUs) 개선 프로토타입 · 패스트뷰 사전 과제

패스트뷰 Product Engineer 사전 과제를 위해 만든 **프로토타입**입니다. 과제 주제는 쇼더스의 무료 → 유료 전환율(지정 주제)과 사용자 만족도(자유 주제)입니다. 쇼더스 코드에는 접근할 수 없으므로, 관찰한 화면을 재현한 위에 개선안을 얹었습니다.

## 이 저장소의 수준

- **과제 검증용 프로토타입입니다.** 서버, 로그인, 결제, 실제 영상 생성은 없습니다. 모든 데이터는 `src/data/mock.ts`의 목(mock) 데이터입니다.
- 실험 지표는 브라우저 `localStorage`에만 기록되어 화면의 "실험 기록"에 보입니다. 실제 서비스라면 쇼더스가 이미 쓰는 이벤트 수집으로 보낼 자리입니다.
- 채널명은 익명 처리했습니다. 숫자는 2026-11-12 쇼더스 화면에서 관찰한 값의 형태(크레딧, 시간당 조회수)를 따랐습니다.
- 과제 안내에 **기술 스택 제한이 없어** Vite + React + TypeScript로, 의존성은 React 외에 두지 않았습니다.

## 화면

각 화면 맨 위의 **과제 노트**에 그 화면이 어느 주제의 어떤 아이디어인지, 관찰한 문제 · 가설 · 바꾼 것 · 지표 · 한계를 적어 두었습니다(접기 가능).

| 경로 | 주제 · 아이디어 | 내용 |
|---|---|---|
| `#/result` | 지정 주제 · 아이디어 1 + 2 | 결과 화면에서 무료 버전과 "내 채널 버전"(워터마크 없음 · 내 로고 · 프리미엄 목소리 · 무기한 보관)을 나란히 비교 → 카드 없는 Pro 7일 체험. 체험 창에 끝나는 날, 자동 결제 없음, 3일 전 알림을 고지. 체험을 시작하면 상단 플랜 표시와 저장 버튼이 바뀝니다. |
| `#/trend` | 자유 주제 · 아이디어 1 | 소재 찾기에 안전 필터: 스팸 의심 채널 숨김, 정치 · 사건사고 끄기, 줄마다 권리 배지. 걸러 낸 항목은 지우지 않고 "n개 숨김 · 이유 보기"로 남깁니다. 영상 · 이슈 두 목록 모두 적용. |

두 화면 모두 오른쪽 아래 **실험 기록**에서 이벤트가 쌓이는 것을 볼 수 있고, "처음부터"로 기록과 체험 상태를 지웁니다.

| 이벤트 | 언제 |
|---|---|
| `compare_viewed` | 비교 영역이 화면에 절반 이상 보였을 때(방문당 1회) |
| `compare_play` | 버전 재생 (`variant=free\|pro`, Pro는 첫 5초) |
| `trial_cta_click` · `trial_started` · `trial_declined` · `offer_dismissed` | 체험 제안 흐름 |
| `download` | 무료 / 내 채널 버전 저장 (가드레일 지표) |
| `safety_toggle` · `hidden_list_open` · `trend_make_click` | 소재 찾기 필터 · 숨김 목록 · 만들기 시작 |

## 실행

```bash
npm install
npm run dev        # http://localhost:5173/#/result , #/trend
npm run build      # 타입 검사 + 빌드
```

PC · 태블릿 · 휴대폰 폭에 맞춰 배치가 바뀝니다. 휴대폰에서는 체험 창이 아래에서 올라오는 시트로 열립니다.

## 구조

```
src/
├── App.tsx               해시 라우팅 (#/result, #/trend)
├── components/
│   ├── Shell.tsx         사이드 메뉴 · 상단 바 (스크롤해도 고정)
│   ├── BriefPanel.tsx    과제 노트
│   ├── ClipStage.tsx     9:16 영상 자리, 재생 표시
│   ├── TrialDialog.tsx   카드 없는 체험 창 (<dialog>)
│   └── EventPanel.tsx    실험 기록 (퍼널 · 이벤트)
├── pages/                ResultPage, TrendPage
├── data/                 mock.ts (목 데이터), briefs.ts (과제 노트 내용)
├── lib/                  events.ts (이벤트 저장), trial.ts (체험 상태)
└── styles.css            쇼더스 스튜디오 CSS 색 값을 그대로 쓴 토큰
```

## 이미지 출처

`public/thumbs/`의 사진은 모두 위키미디어 공용(Wikimedia Commons)에서 가져온 자유 이용 이미지입니다(480px 축소본). 화면 속 소재 · 이슈와 실제 사진은 관련이 없고, 분위기만 맞춘 자리 채움용입니다. 출처 목록은 `src/data/credits.json`에도 있습니다.

| 파일 | 쓰인 곳 | 원본 | 저작자 | 라이선스 |
|---|---|---|---|---|
| `stage` | 결과 화면 영상 장면 | [Horn rimmed spectacles, 4 types. Wellcome M0007428.jpg](https://commons.wikimedia.org/wiki/File:Horn_rimmed_spectacles,_4_types._Wellcome_M0007428.jpg) | Wellcome Collection | CC BY 4.0 |
| `v1` | 소재 · 우승 인터뷰 | [2026 Esports World Cup trophy gallery.jpg](https://commons.wikimedia.org/wiki/File:2026_Esports_World_Cup_trophy_gallery.jpg) | PeaceSeekers | CC0 |
| `v2` | 소재 · 수능 준비물 | [Desk-pencil-eraser-black.jpg](https://commons.wikimedia.org/wiki/File:Desk-pencil-eraser-black.jpg) | Karolina Grabowska | CC0 |
| `v3` | 소재 · 소액결제 현금화(스팸) | [Mobile payment 02.JPG](https://commons.wikimedia.org/wiki/File:Mobile_payment_02.JPG) | HLundgaard | CC BY-SA 3.0 |
| `v4` | 소재 · 국회 본회의 | [Seoul-National.Assembly-02.jpg](https://commons.wikimedia.org/wiki/File:Seoul-National.Assembly-02.jpg) | frakorea | CC BY 2.0 |
| `v5` | 소재 · 디저트 비교 | [French macaroons.jpg](https://commons.wikimedia.org/wiki/File:French_macaroons.jpg) | Shisma (talk) | CC0 |
| `v6` | 소재 · 코인 지급(스팸) | [Bitcoin BTC golden coin with the symbol.jpg](https://commons.wikimedia.org/wiki/File:Bitcoin_BTC_golden_coin_with_the_symbol.jpg) | Satheesh Sankaran | CC BY-SA 2.0 |
| `v7` | 소재 · 캠핑 난로 | [Svea 123R.jpg](https://commons.wikimedia.org/wiki/File:Svea_123R.jpg) | en:John Fogarty | Public domain |
| `i1` | 이슈 · 수능 한파 | [Snow in Seoul 20201213.jpg](https://commons.wikimedia.org/wiki/File:Snow_in_Seoul_20201213.jpg) | Seodaemungu Student | CC0 |
| `i2` | 이슈 · 의원 발언 | [Republic of Korea capitol.jpg](https://commons.wikimedia.org/wiki/File:Republic_of_Korea_capitol.jpg) | Cjb8293 | CC BY-SA 4.0 |
| `i3` | 이슈 · 독감 | [Influenza vaccine syringes.jpg](https://commons.wikimedia.org/wiki/File:Influenza_vaccine_syringes.jpg) | Epolk | CC BY-SA 4.0 |
| `i4` | 이슈 · 열애설 | [Film cameras and press photographers at 1960 DNC (01).jpg](https://commons.wikimedia.org/wiki/File:Film_cameras_and_press_photographers_at_1960_DNC_(01).jpg) | Brent J. Irving | Public domain |
| `i5` | 이슈 · 물가 | [Vegetable Stall, Brigg Market - geograph.org.uk - 1725905.jpg](https://commons.wikimedia.org/wiki/File:Vegetable_Stall,_Brigg_Market_-_geograph.org.uk_-_1725905.jpg) | David Wright | CC BY-SA 2.0 |

## AI 도구 사용

화면 설계와 코드 작성에 Claude Code를 썼습니다. 디자인 스킬(`design-taste-frontend`, 이 저장소에는 포함하지 않음)의 앱 화면 규칙으로 스타일을 정했습니다. 색은 데이터와 주 행동에만 쓰고, 그라데이션 · 장식 그림자 · 아이콘 타일은 쓰지 않습니다. 같은 스킬의 검사 도구로 1440 · 768 · 390px 폭을 확인했습니다. 무엇을 만들지(문제 정의, 가설, 우선순위)와 화면 문구는 직접 정했습니다.
