# 🔮 타로 마스터 (Tarot Master)

> AI 기반 타로 리딩 웹 애플리케이션으로, 몰입감 있는 타로 점술 경험을 제공합니다.

![React](https://img.shields.io/badge/React-19.2.0-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-Rolldown-646cff?logo=vite)

## ✨ 주요 기능

- 🚪 **몰입형 인트로** - 신비로운 문이 열리는 애니메이션으로 시작
- 🎴 **78장 타로 카드** - 메이저 아르카나 22장 + 마이너 아르카나 56장
- 📊 **다양한 스프레드** - 원카드, 쓰리카드, 연애, 선택, 켈틱 크로스
- 🤖 **AI 조언** - vLLM 호환 API를 통한 개인화된 조언
- 💫 **카드 셔플** - 마법 파티클 효과의 셔플 애니메이션
- 🎭 **마스터 스타일** - 다양한 말투의 타로 마스터 (위로형, 직설적, 신비로운)
- 💰 **복채 시스템** - 토스페이먼츠 연동 팁 결제
- 📱 **반응형 디자인** - 모바일/데스크톱 지원
- 🖼️ **결과 공유** - 이미지로 저장하여 공유

## 📦 기술 스택

| 분류 | 기술 |
|------|------|
| **프레임워크** | React 19 + TypeScript |
| **빌드 도구** | Vite (Rolldown) |
| **라우팅** | React Router DOM 7 |
| **이미지 생성** | html2canvas |
| **결제** | 토스페이먼츠 SDK |
| **컨테이너** | Docker + Nginx |

## 🚀 빠른 시작

### 사전 요구사항

- Node.js 18 이상
- npm 또는 pnpm

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/your-username/taromaster.git
cd taromaster

# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

개발 서버가 `http://localhost:5173`에서 실행됩니다.

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

### Docker 배포

```bash
# Docker 이미지 빌드
docker build -t taromaster .

# 컨테이너 실행
docker run -p 80:80 taromaster
```

## 📁 프로젝트 구조

```
taromaster/
├── public/
│   └── cards/          # 타로 카드 이미지 (78장)
├── src/
│   ├── assets/         # 정적 리소스
│   ├── components/     # React 컴포넌트
│   ├── data/           # 정적 데이터 (카드, 스프레드, 대사)
│   ├── hooks/          # 커스텀 훅
│   ├── pages/          # 페이지 컴포넌트
│   └── services/       # AI 서비스
├── Dockerfile          # Docker 설정
├── nginx.conf          # Nginx 설정
└── vite.config.ts      # Vite 설정
```

## 📚 상세 문서

자세한 기능별 가이드는 아래 문서를 참조하세요:

| 문서 | 설명 |
|------|------|
| [🎴 카드 시스템](./docs/CARDS.md) | 타로 카드 데이터 구조 및 해석 |
| [📊 스프레드 가이드](./docs/SPREADS.md) | 사용 가능한 스프레드 종류 |
| [🤖 AI 설정](./docs/AI_SETTINGS.md) | AI 조언 기능 설정 방법 |
| [🎨 컴포넌트 가이드](./docs/COMPONENTS.md) | UI 컴포넌트 상세 설명 |
| [💰 결제 시스템](./docs/PAYMENT.md) | 토스페이먼츠 연동 가이드 |
| [🔧 설정 옵션](./docs/SETTINGS.md) | 사용자 설정 옵션 가이드 |

## 🎮 사용 흐름

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│ 입장 화면   │ ──▶ │ 카테고리/질문 │ ──▶ │ 마스터 등장  │
│ EntrancePage│     │ QuestionPage │     │MasterAppear  │
└─────────────┘     └──────────────┘     └──────────────┘
                                                │
┌─────────────┐     ┌──────────────┐     ┌──────▼───────┐
│ 결과 화면   │ ◀── │ 카드 해석    │ ◀── │ 카드 셔플    │
│ ResultPage  │     │ ReadingPage  │     │ ShufflePage  │
└─────────────┘     └──────────────┘     └──────────────┘
                          ▲                     │
                          │              ┌──────▼───────┐
                          └───────────── │ 카드 선택    │
                                         │SelectCardPage│
                                         └──────────────┘
```

## ⚙️ 환경 설정

### AI 설정 (선택)

AI 조언 기능을 사용하려면 vLLM 호환 API 서버가 필요합니다:

1. 앱 오른쪽 상단 ⚙️ 버튼 클릭
2. AI 설정 패널에서 API URL 입력
3. 연결 테스트로 확인
4. AI 조언 기능 활성화

### 결제 설정

현재 토스페이먼츠 테스트 모드로 설정되어 있습니다.  
실제 결제를 위해서는 `TipPayment.tsx`의 클라이언트 키를 변경하세요.

## 🤝 기여하기

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 🙏 크레딧

- 타로 카드 이미지: AI 생성
- 폰트: 시스템 폰트
- 아이콘: Emoji
