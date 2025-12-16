# 🤖 AI 설정 가이드

타로 마스터는 vLLM 호환 OpenAI API를 통해 개인화된 AI 조언을 제공합니다.

## 기능 개요

AI 조언 기능은 타로 카드 해석 후 결과 페이지에서 추가적인 개인화 조언을 생성합니다:

- 선택한 카드와 질문을 기반으로 맞춤 조언 생성
- 카테고리(사랑, 직장, 재정 등)에 맞는 구체적인 가이드
- 실패 시 미리 정의된 템플릿 조언으로 대체

## 설정 방법

### 1. AI 설정 패널 접근

앱 오른쪽 상단의 ⚙️ (설정) 버튼을 클릭하면 AI 설정 패널이 열립니다.

### 2. 설정 옵션

| 설정 | 설명 | 기본값 |
|------|------|--------|
| **AI 조언 기능** | 기능 활성화/비활성화 토글 | 비활성화 |
| **API URL** | vLLM 서버 주소 | (없음) |
| **API Key** | 인증 키 (선택사항) | (없음) |
| **모델명** | 사용할 LLM 모델 | default |
| **타임아웃** | 응답 대기 시간 (초) | 10초 |

### 3. 연결 테스트

1. API URL을 입력합니다
2. 필요시 API Key를 입력합니다
3. "🔍 연결 확인" 버튼을 클릭합니다
4. 연결 상태가 표시됩니다:
   - ✅ **연결됨**: API 서버 정상 접근
   - ❌ **연결 실패**: 오류 메시지 확인

## API 요구사항

### 호환 API

타로 마스터는 **OpenAI Chat Completions API 형식**을 사용합니다:

```
POST {API_URL}/v1/chat/completions
```

호환 서버:
- [vLLM](https://github.com/vllm-project/vllm)
- [OpenAI API](https://platform.openai.com/)
- [LocalAI](https://localai.io/)
- [Ollama](https://ollama.ai/) (OpenAI 호환 모드)
- [llama.cpp](https://github.com/ggerganov/llama.cpp) (OpenAI 호환 서버)

### 요청 형식

```typescript
{
    model: "string",          // 모델명
    messages: [
        { role: "system", content: "시스템 프롬프트" },
        { role: "user", content: "사용자 메시지" }
    ],
    max_tokens: 300,
    temperature: 0.7
}
```

### 응답 형식

```typescript
{
    choices: [{
        message: {
            content: "AI 응답 내용"
        }
    }]
}
```

## 헬스 체크 API

연결 확인 시 다음 엔드포인트를 호출합니다:

```
GET {API_URL}/v1/models
```

## 프롬프트 구조

AI에게 전달되는 프롬프트는 다음 정보를 포함합니다:

```
당신은 숙련된 타로 마스터입니다.

[사용자 정보]
- 질문 카테고리: {category}
- 사용자 질문: {question}

[선택된 카드]
1. {card1} ({upright/reversed}) - {position}
2. {card2} ({upright/reversed}) - {position}
...

위 정보를 바탕으로 개인화된 조언을 제공해주세요.
```

## 오류 처리

### 일반적인 오류

| 오류 | 원인 | 해결 방법 |
|------|------|-----------|
| API URL이 설정되지 않았습니다 | URL 미입력 | API URL 입력 |
| 연결 시간 초과 | 서버 응답 없음 | 타임아웃 증가, 서버 상태 확인 |
| CORS 에러 또는 네트워크 연결 실패 | CORS 설정 문제 | 서버 CORS 설정 확인 |
| 인증 실패 | API Key 오류 | API Key 확인 |
| 서버 에러: 4XX/5XX | 서버 문제 | 서버 로그 확인 |

### 폴백 처리

AI API 호출 실패 시, 다음 템플릿 조언 중 하나가 표시됩니다:

```typescript
const fallbackAdvices = [
    "오늘은 내면의 목소리에 귀 기울여 보세요.",
    "작은 것에서도 감사를 찾으세요.",
    "변화를 두려워하지 마세요.",
    "직감을 믿으세요.",
    "오늘 하루, 자신에게 조금 더 친절해 보세요."
];
```

## 보안 고려사항

### API Key 보호

- API Key는 로컬 스토리지에 저장됨
- 패스워드 필드로 마스킹 표시
- 👁️ 버튼으로 토글 가능

### 권장 사항

1. **프로덕션 환경**: 프록시 서버를 통해 API 호출을 중계하세요
2. **개인 사용**: 로컬 LLM 서버(vLLM, Ollama 등) 사용 권장
3. **API Key**: 가능하면 제한된 권한의 API Key 사용

## 설정 파일 위치

AI 설정은 브라우저 로컬 스토리지에 저장됩니다:

```
키: tarot-master-ai-settings
값: {
    apiUrl: string,
    apiKey: string,
    model: string,
    timeout: number,
    enabled: boolean
}
```

## 고급 설정

### 커스텀 프롬프트

`src/services/aiPromptBuilder.ts`에서 프롬프트 템플릿을 수정할 수 있습니다:

```typescript
export function buildTarotPrompt(
    cards: SelectedCard[],
    question: string,
    category: string,
    spread: Spread
): ChatMessage[] {
    // 시스템 프롬프트와 사용자 메시지를 구성합니다
}
```

### 모델 파라미터 조정

`src/services/aiService.ts`에서 생성 파라미터를 조정할 수 있습니다:

```typescript
body: JSON.stringify({
    model: config.model || 'default',
    messages: messages,
    max_tokens: 300,      // 응답 길이
    temperature: 0.7      // 창의성 조절 (0.0-1.0)
})
```
