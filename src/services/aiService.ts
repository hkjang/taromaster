import type { AIConfig } from '../hooks/useAISettings';

// Chat Completion 요청 메시지 타입
export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

// Chat Completion 응답 타입
interface ChatCompletionResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: {
        index: number;
        message: {
            role: string;
            content: string;
        };
        finish_reason: string;
    }[];
    usage?: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

// Health Check 응답 타입
interface HealthCheckResponse {
    status?: string;
    models?: string[];
}

/**
 * vLLM OpenAI Compatible API Health Check
 * 서버 연결 상태를 확인합니다.
 */
export async function healthCheck(config: AIConfig): Promise<{ success: boolean; error?: string }> {
    if (!config.apiUrl) {
        return { success: false, error: 'API URL이 설정되지 않았습니다.' };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);

    try {
        // vLLM의 /v1/models 엔드포인트를 호출하여 연결 확인
        const baseUrl = config.apiUrl.replace(/\/+$/, '');
        const response = await fetch(`${baseUrl}/v1/models`, {
            method: 'GET',
            headers: {
                'Authorization': config.apiKey ? `Bearer ${config.apiKey}` : '',
                'Content-Type': 'application/json'
            },
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            if (response.status === 401) {
                return { success: false, error: '인증 실패: API Key를 확인해주세요.' };
            }
            return { success: false, error: `서버 에러: ${response.status}` };
        }

        const data: HealthCheckResponse = await response.json();

        // 모델 목록이 있거나 status가 정상이면 연결 성공
        if (data.models || data.status === 'ok') {
            return { success: true };
        }

        return { success: true };
    } catch (error) {
        clearTimeout(timeoutId);

        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                return { success: false, error: '연결 시간 초과' };
            }
            if (error.message.includes('Failed to fetch')) {
                return { success: false, error: 'CORS 에러 또는 네트워크 연결 실패' };
            }
            return { success: false, error: error.message };
        }

        return { success: false, error: '알 수 없는 에러' };
    }
}

/**
 * AI 조언 생성 요청
 * OpenAI Chat Completions API 호환 엔드포인트를 호출합니다.
 */
export async function generateAdvice(
    config: AIConfig,
    messages: ChatMessage[]
): Promise<{ success: boolean; content?: string; error?: string }> {
    if (!config.apiUrl) {
        return { success: false, error: 'API URL이 설정되지 않았습니다.' };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);

    try {
        const baseUrl = config.apiUrl.replace(/\/+$/, '');
        const response = await fetch(`${baseUrl}/v1/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': config.apiKey ? `Bearer ${config.apiKey}` : '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: config.model || 'default',
                messages: messages,
                max_tokens: 300,
                temperature: 0.7
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            if (response.status === 401) {
                return { success: false, error: '인증 실패' };
            }
            return { success: false, error: `서버 에러: ${response.status}` };
        }

        const data: ChatCompletionResponse = await response.json();

        if (data.choices && data.choices.length > 0) {
            const content = data.choices[0].message?.content;
            if (content) {
                return { success: true, content: content.trim() };
            }
        }

        return { success: false, error: '응답 형식 오류' };
    } catch (error) {
        clearTimeout(timeoutId);

        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                return { success: false, error: '응답 시간 초과' };
            }
            return { success: false, error: error.message };
        }

        return { success: false, error: '알 수 없는 에러' };
    }
}

/**
 * 기본 템플릿 조언 (API 실패 시 사용 가능)
 */
export const fallbackAdvices = [
    "오늘은 내면의 목소리에 귀 기울여 보세요. 당신이 이미 알고 있는 답이 있을 거예요.",
    "작은 것에서도 감사를 찾으세요. 그것이 큰 행운을 불러옵니다.",
    "변화를 두려워하지 마세요. 새로운 시작은 항상 성장의 기회입니다.",
    "직감을 믿으세요. 당신의 내면에는 지혜가 있습니다.",
    "오늘 하루, 자신에게 조금 더 친절해 보세요."
];

export function getRandomFallbackAdvice(): string {
    return fallbackAdvices[Math.floor(Math.random() * fallbackAdvices.length)];
}
