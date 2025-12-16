# 🎨 컴포넌트 가이드

타로 마스터의 React 컴포넌트 상세 설명입니다.

## 컴포넌트 구조

```
src/components/
├── AIAdviceSection.tsx     # AI 조언 표시
├── AdminSettingsPanel.tsx  # 관리자 설정 패널
├── CandleEffect.tsx        # 촛불 효과
├── CardDeck.tsx            # 카드 덱 표시
├── CardModal.tsx           # 카드 확대 모달
├── DialogBubble.tsx        # 대화 말풍선
├── ProgressIndicator.tsx   # 진행 표시기
├── SettingsPanel.tsx       # 사용자 설정 패널
├── TarotCard.tsx           # 개별 타로 카드
├── TarotMaster.tsx         # 타로 마스터 캐릭터
└── TipPayment.tsx          # 복채 결제
```

---

## 🔮 TarotCard

개별 타로 카드를 렌더링하는 핵심 컴포넌트입니다.

### Props

```typescript
interface TarotCardProps {
    card: TarotCard;       // 카드 데이터
    isReversed?: boolean;  // 역방향 여부
    isFlipped?: boolean;   // 앞면 보이기 여부
    size?: 'small' | 'medium' | 'large';  // 크기
    onClick?: () => void;  // 클릭 핸들러
}
```

### 사용 예시

```tsx
<TarotCard
    card={selectedCard.card}
    isReversed={selectedCard.isReversed}
    isFlipped={true}
    size="medium"
    onClick={() => setModalCard(card)}
/>
```

### 특징

- 카드 뒤집기 애니메이션
- 역방향 표시 (180도 회전)
- 3가지 크기 옵션
- 호버 효과

---

## 🎭 TarotMaster

타로 마스터 캐릭터를 표시합니다.

### Props

```typescript
interface TarotMasterProps {
    style: MasterStyle;              // 마스터 스타일
    isTalking?: boolean;             // 말하는 중 여부
    lookAt?: 'user' | 'cards';       // 시선 방향
}

type MasterStyle = 'comforting' | 'direct' | 'mystical';
```

### 사용 예시

```tsx
<TarotMaster
    style={settings.masterStyle}
    isTalking={isTalking}
    lookAt="user"
/>
```

### 스타일 옵션

| 스타일 | 설명 | 말투 |
|--------|------|------|
| comforting | 위로형 | 따뜻하고 공감적 |
| direct | 직설적 | 솔직하고 명확 |
| mystical | 신비로운 | 시적이고 은유적 |

---

## 💬 DialogBubble

타이핑 효과와 함께 대화를 표시하는 말풍선입니다.

### Props

```typescript
interface DialogBubbleProps {
    text: string;              // 표시할 텍스트
    typingSpeed?: number;      // 타이핑 속도 (ms)
    isTyping?: boolean;        // 타이핑 효과 활성화
    showAvatar?: boolean;      // 아바타 표시
}
```

### 사용 예시

```tsx
<DialogBubble
    text="어떤 이야기를 나누고 싶으신가요?"
    typingSpeed={40}
    isTyping={true}
/>
```

### 타이핑 속도 가이드

| 설정 | 속도 | 용도 |
|------|------|------|
| fast | 25ms | 빠른 진행 |
| normal | 35-40ms | 기본값 |
| slow | 50ms | 극적 효과 |

---

## 🕯️ CandleEffect

분위기를 위한 촛불 효과 애니메이션입니다.

### Props

```typescript
interface CandleEffectProps {
    position: 'left' | 'right';
    size?: 'small' | 'large';
}
```

### 사용 예시

```tsx
<CandleEffect position="left" size="small" />
<CandleEffect position="right" size="small" />
```

---

## 🃏 CardDeck

카드 선택 화면에서 덱을 펼쳐 표시합니다.

### Props

```typescript
interface CardDeckProps {
    onCardSelect: (card: TarotCard) => void;  // 카드 선택 핸들러
    selectedCount: number;                     // 선택된 카드 수
    maxCards: number;                          // 최대 선택 가능 수
    spreadCards?: boolean;                     // 부채꼴 펼치기
}
```

### 사용 예시

```tsx
<CardDeck
    onCardSelect={handleCardSelect}
    selectedCount={selectedCards.length}
    maxCards={3}
    spreadCards={true}
/>
```

---

## 🔍 CardModal

카드를 확대하여 상세 정보를 보여주는 모달입니다.

### Props

```typescript
interface CardModalProps {
    card: TarotCard;
    isReversed: boolean;
    isOpen: boolean;
    onClose: () => void;
}
```

### 사용 예시

```tsx
{modalCard && (
    <CardModal
        card={modalCard.card}
        isReversed={modalCard.isReversed}
        isOpen={true}
        onClose={() => setModalCard(null)}
    />
)}
```

### 표시 정보

- 카드 이미지 (확대)
- 카드 이름 (한글/영문)
- 정방향/역방향 키워드
- 카드 설명
- 조언

---

## 🤖 AIAdviceSection

AI 생성 조언을 표시하는 섹션입니다.

### Props

```typescript
interface AIAdviceSectionProps {
    cards: SelectedCard[];
    question: string;
    category: QuestionCategory;
    spread: Spread;
}
```

### 상태

- **로딩 중**: 스피너 + "AI 조언을 생성하고 있습니다..."
- **성공**: 생성된 조언 표시
- **실패**: 폴백 메시지 표시

---

## ⚙️ SettingsPanel

사용자 설정 패널입니다.

### Props

```typescript
interface SettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}
```

### 설정 옵션

| 설정 | 타입 | 옵션 |
|------|------|------|
| 마스터 스타일 | select | 위로형, 직설적, 신비로운 |
| 배경 사운드 | select | 없음, 카페, 비 |
| 카드 스타일 | select | 클래식, 다크, 미니멀 |
| 진행 속도 | select | 느리게, 보통, 빠르게 |
| 히스토리 저장 | toggle | 켜기/끄기 |

---

## 🛠️ AdminSettingsPanel

AI 설정을 위한 관리자 패널입니다.

### Props

```typescript
interface AdminSettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}
```

### 기능

- AI 기능 활성화/비활성화
- API URL 설정
- API Key 설정 (마스킹)
- 모델명 설정
- 타임아웃 설정
- 연결 테스트

---

## 💰 TipPayment

토스페이먼츠를 통한 복채(팁) 결제 컴포넌트입니다.

### Props

```typescript
interface TipPaymentProps {
    onClose?: () => void;
}
```

### 결제 금액 옵션

| 금액 | 이모지 |
|------|--------|
| 1,000원 | 🙏 |
| 3,000원 | 💝 |
| 5,000원 | ✨ |
| 10,000원 | 🌟 |

### 상태 흐름

1. 티저 버튼 표시 ("💰 복채로 감사 표현하기")
2. 클릭 시 금액 선택 위젯 확장
3. 금액 선택 후 "결제하기" 클릭
4. 토스페이먼츠 결제 창 호출

---

## 📊 ProgressIndicator

리딩 진행 상태를 표시합니다.

### Props

```typescript
interface ProgressIndicatorProps {
    current: number;     // 현재 단계
    total: number;       // 전체 단계
    labels?: string[];   // 단계별 라벨 (선택)
}
```

---

## 컴포넌트 스타일링

각 컴포넌트는 동일한 이름의 CSS 파일을 가집니다:

```
TarotCard.tsx → TarotCard.css
DialogBubble.tsx → DialogBubble.css
```

### 공통 CSS 변수

```css
:root {
    --primary-color: #6b4c9a;
    --secondary-color: #ffd700;
    --background-dark: #1a1a2e;
    --card-gold: #c9a227;
}
```

## 커스텀 컴포넌트 추가

새 컴포넌트 추가 시:

1. `src/components/` 에 `.tsx` 파일 생성
2. 동일 폴더에 `.css` 파일 생성
3. 컴포넌트 export
4. 필요한 곳에서 import 하여 사용
