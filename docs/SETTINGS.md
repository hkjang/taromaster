# 🔧 설정 옵션 가이드

타로 마스터는 사용자 경험을 개인화할 수 있는 다양한 설정 옵션을 제공합니다.

## 설정 접근 방법

앱 오른쪽 상단의 ⚙️ 버튼을 클릭하여 설정 패널을 열 수 있습니다.

## 사용자 설정 (Settings)

### 🎭 마스터 스타일

타로 마스터의 말투와 분위기를 선택합니다.

| 스타일 | 설명 | 예시 대사 |
|--------|------|-----------|
| **위로형** (comforting) | 따뜻하고 공감적인 말투 | "걱정 마세요, 함께 봐드릴게요" |
| **직설적** (direct) | 솔직하고 명확한 말투 | "카드가 말하는 바를 정확히 전해드리죠" |
| **신비로운** (mystical) | 시적이고 은유적인 말투 | "카드의 속삭임을 들어보세요..." |

### 🎵 배경 사운드

분위기를 위한 배경 음악을 선택합니다.

| 옵션 | 설명 |
|------|------|
| **없음** (none) | 배경음 없음 |
| **카페** (cafe) | 카페 분위기의 잔잔한 배경음 |
| **비** (rain) | 빗소리 |

### 🎴 카드 스타일

타로 카드의 시각적 스타일을 선택합니다.

| 스타일 | 설명 |
|--------|------|
| **클래식** (classic) | 전통적인 타로 카드 스타일 |
| **다크** (dark) | 어두운 배경의 모던 스타일 |
| **미니멀** (minimal) | 심플한 디자인 |

### ⏱️ 진행 속도

리딩 진행 속도를 조절합니다.

| 속도 | 카드 공개 시간 | 해석 시간 |
|------|---------------|-----------|
| **느리게** (slow) | 4초 | 8초 |
| **보통** (normal) | 3초 | 6초 |
| **빠르게** (fast) | 2초 | 4초 |

- **느리게**: 극적인 분위기, 몰입감 중시
- **보통**: 기본 설정
- **빠르게**: 빠른 진행을 원할 때

### 📚 히스토리 저장

리딩 기록 저장 여부를 설정합니다.

| 옵션 | 설명 |
|------|------|
| **켜기** | 리딩 기록을 로컬 스토리지에 저장 |
| **끄기** | 기록 저장 안 함 |

## AI 설정 (Admin Settings)

AI 조언 기능을 위한 설정입니다. 자세한 내용은 [AI 설정 가이드](./AI_SETTINGS.md)를 참조하세요.

### AI 조언 기능

AI 추가 조언 기능의 활성화/비활성화

| 옵션 | 설명 |
|------|------|
| **켜기** | 리딩 후 AI 조언 생성 |
| **끄기** | 템플릿 기반 조언만 표시 |

### API URL

vLLM 호환 API 서버 주소

```
예: https://your-server.com
```

### API Key

API 인증 키 (필요한 경우)

### 모델명

사용할 LLM 모델 이름

```
예: default, gpt-4, llama-2-7b
```

### 타임아웃

API 응답 대기 시간 (초)

- 최소: 1초
- 최대: 30초
- 기본: 10초

## 데이터 구조

### 사용자 설정

```typescript
interface Settings {
    masterStyle: 'comforting' | 'direct' | 'mystical';
    bgSound: 'cafe' | 'rain' | 'none';
    cardStyle: 'classic' | 'dark' | 'minimal';
    speed: 'slow' | 'normal' | 'fast';
    saveHistory: boolean;
}
```

### AI 설정

```typescript
interface AIConfig {
    apiUrl: string;
    apiKey: string;
    model: string;
    timeout: number;
    enabled: boolean;
}
```

## 저장 위치

설정은 브라우저의 로컬 스토리지에 저장됩니다:

| 키 | 내용 |
|-----|------|
| `tarot-master-settings` | 사용자 설정 |
| `tarot-master-ai-settings` | AI 설정 |

## 기본값 복원

설정 패널에서 "초기화" 버튼을 클릭하면 기본값으로 복원됩니다:

```typescript
const defaultSettings: Settings = {
    masterStyle: 'comforting',
    bgSound: 'none',
    cardStyle: 'classic',
    speed: 'normal',
    saveHistory: true
};
```

## 설정 커스터마이징

### 새 마스터 스타일 추가

1. `src/data/masterDialogs.ts`에 새 스타일 대사 추가
2. `MasterStyle` 타입에 새 스타일 추가
3. `SettingsPanel.tsx`에 UI 옵션 추가

```typescript
// masterDialogs.ts
export type MasterStyle = 'comforting' | 'direct' | 'mystical' | 'newStyle';

export const newStyleDialogs = {
    greeting: ["새 스타일 인사말..."],
    // ...
};
```

### 새 배경 사운드 추가

1. 오디오 파일을 `/public/sounds/`에 추가
2. `Settings` 타입 수정
3. `SettingsPanel.tsx` 수정
4. 사운드 재생 로직 구현

### 새 카드 스타일 추가

1. 새 스타일의 CSS 추가
2. `Settings` 타입 수정
3. `SettingsPanel.tsx` 수정
4. `TarotCard.tsx`에서 스타일 적용

## 설정 마이그레이션

앱 업데이트 시 새 설정 필드가 추가되면, 기존 사용자의 설정에 기본값이 병합됩니다:

```typescript
const saved = localStorage.getItem(SETTINGS_KEY);
return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
```

## 개발자 도구에서 설정 확인

브라우저 개발자 도구 → Application → Local Storage 에서 설정값을 직접 확인하고 수정할 수 있습니다.
