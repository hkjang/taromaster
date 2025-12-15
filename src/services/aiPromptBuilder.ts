import type { ChatMessage } from './aiService';
import type { SelectedCard, QuestionCategory } from '../hooks/useReading';

/**
 * AI 조언 프롬프트를 생성합니다.
 * 
 * 프롬프트 구조:
 * - System: 타로 마스터의 조언을 보조하는 조력자 역할
 * - User: 카드 정보, 질문, 컨텍스트
 */
export function buildAdvicePrompt(
    cards: SelectedCard[],
    category: QuestionCategory,
    question: string
): ChatMessage[] {
    const systemMessage = buildSystemPrompt();
    const userMessage = buildUserPrompt(cards, category, question);

    return [
        { role: 'system', content: systemMessage },
        { role: 'user', content: userMessage }
    ];
}

/**
 * 시스템 프롬프트 생성
 */
function buildSystemPrompt(): string {
    return `당신은 타로 마스터의 조언을 보조하는 조력자입니다.

## 역할
- 타로 카드 리딩 결과를 바탕으로 사용자에게 실천 가능한 조언을 제공합니다.
- 타로 마스터가 전달한 해석을 변경하거나 반박하지 않습니다.
- 부드럽고 위로가 되는 말투를 사용합니다.

## 규칙
1. 절대로 기존 카드 해석을 변경하지 마세요.
2. 단정적인 예언을 하지 마세요 (예: "반드시 ~할 것입니다")
3. 의학적, 법률적 조언을 하지 마세요.
4. 불안을 조장하는 표현을 피하세요.
5. 긍정적이고 희망적인 방향으로 조언하세요.
6. 3~5문장으로 간결하게 작성하세요.

## 출력 형식
- 존댓말을 사용합니다.
- 이모지를 포함하지 않습니다.
- 실천 가능한 조언 중심으로 작성합니다.`;
}

/**
 * 사용자 프롬프트 생성
 */
function buildUserPrompt(
    cards: SelectedCard[],
    category: QuestionCategory,
    question: string
): string {
    const categoryNames: Record<QuestionCategory, string> = {
        love: '사랑과 연애',
        work: '일과 커리어',
        relationship: '인간관계',
        money: '재정과 금전',
        health: '건강과 웰빙',
        general: '전반적인 삶'
    };

    const cardDescriptions = cards.map((selected, index) => {
        const direction = selected.isReversed ? '역방향' : '정방향';
        const meaning = selected.isReversed
            ? selected.card.reversed
            : selected.card.upright;
        return `${index + 1}. ${selected.card.nameKr} (${direction}): ${meaning}`;
    }).join('\n');

    const keywords = cards.map(selected => {
        return selected.isReversed
            ? selected.card.reversed
            : selected.card.upright;
    }).join(', ');

    return `## 사용자 질문
"${question || '오늘의 운세를 알려주세요'}"

## 질문 카테고리
${categoryNames[category]}

## 선택된 타로 카드
${cardDescriptions}

## 핵심 키워드
${keywords}

## 요청
위 타로 카드 해석을 바탕으로 사용자에게 오늘 실천할 수 있는 조언을 3~5문장으로 작성해주세요.
기존 해석을 변경하지 말고, 보조적인 조언만 제공하세요.`;
}
