import type { TarotCard } from './tarotCards';
import type { QuestionCategory } from '../hooks/useReading';

// 카테고리별 해석 템플릿
const categoryInterpretations: Record<QuestionCategory, {
    context: string;
    keywords: Record<string, string[]>;
}> = {
    love: {
        context: '사랑과 관계',
        keywords: {
            positive: ['연인', '마음', '사랑', '관계', '인연', '감정', '설렘', '소통'],
            challenge: ['거리감', '오해', '불안', '집착', '외로움', '신뢰'],
            advice: ['마음을 열어', '솔직해지세요', '상대방을', '함께', '사랑은']
        }
    },
    work: {
        context: '일과 커리어',
        keywords: {
            positive: ['성장', '승진', '성공', '기회', '능력', '프로젝트', '실력', '인정'],
            challenge: ['스트레스', '압박감', '경쟁', '방향', '결정', '책임'],
            advice: ['능력을 믿으세요', '계획을 세워', '한 걸음씩', '목표를 향해', '전문성을']
        }
    },
    relationship: {
        context: '인간관계',
        keywords: {
            positive: ['화해', '소통', '이해', '신뢰', '우정', '가족', '동료', '협력'],
            challenge: ['갈등', '오해', '거리', '배신', '소외', '비교'],
            advice: ['경청하세요', '진심을 전해', '거리를 두고', '먼저 다가가', '이해하려']
        }
    },
    money: {
        context: '재정과 금전',
        keywords: {
            positive: ['수입', '기회', '투자', '안정', '풍요', '저축', '자산', '번영'],
            challenge: ['지출', '손실', '불안정', '빚', '욕심', '낭비'],
            advice: ['계획적으로', '신중하게', '기회를 잡아', '절약', '투자보다']
        }
    },
    health: {
        context: '건강과 웰빙',
        keywords: {
            positive: ['활력', '회복', '균형', '에너지', '치유', '휴식', '건강', '안정'],
            challenge: ['피로', '스트레스', '불균형', '무리', '걱정', '긴장'],
            advice: ['쉬어가세요', '몸의 신호를', '균형을 찾아', '마음을 돌봐', '규칙적으로']
        }
    },
    general: {
        context: '전반적인 삶',
        keywords: {
            positive: ['행운', '기회', '변화', '성장', '희망', '가능성', '축복', '발전'],
            challenge: ['과도기', '혼란', '선택', '불확실', '두려움', '막힘'],
            advice: ['믿으세요', '흐름에 맡겨', '직감을 따라', '한 발 내딛어', '준비하세요']
        }
    }
};

// 카드와 카테고리에 맞는 개인화된 해석 생성
export function generatePersonalizedReading(
    card: TarotCard,
    isReversed: boolean,
    category: QuestionCategory,
    position?: string
): string {
    // 포지션 정보가 있으면 추가
    const positionContext = position ? `[${position}] ` : '';

    // 카테고리에 맞는 해석 생성
    const contextualIntro = getContextualIntro(card, category, isReversed);
    const personalAdvice = getPersonalizedAdvice(card, category, isReversed);

    return `${positionContext}${card.nameKr}${isReversed ? ' (역방향)' : ''}: ${contextualIntro} ${personalAdvice}`;
}

// 카테고리에 맞는 해석 인트로 생성
function getContextualIntro(card: TarotCard, category: QuestionCategory, isReversed: boolean): string {
    const catInfo = categoryInterpretations[category];
    const meaning = isReversed ? card.reversed : card.upright;

    const intros: Record<QuestionCategory, string> = {
        love: isReversed
            ? `${catInfo.context}에서 ${meaning}의 에너지가 느껴집니다. 관계에서 풀어야 할 과제가 있어요.`
            : `${catInfo.context}에서 ${meaning}의 기운이 감돌고 있어요.`,
        work: isReversed
            ? `커리어 관점에서 ${meaning}을 경계해야 합니다.`
            : `일에서 ${meaning}의 시기입니다. 좋은 흐름이에요.`,
        relationship: isReversed
            ? `주변 사람들과의 관계에서 ${meaning}의 그림자가 보입니다.`
            : `인간관계에서 ${meaning}의 에너지가 흐르고 있어요.`,
        money: isReversed
            ? `재정적으로 ${meaning}에 주의해야 합니다.`
            : `금전적으로 ${meaning}의 기운이 있어요.`,
        health: isReversed
            ? `건강 면에서 ${meaning}에 신경 쓰세요.`
            : `웰빙의 관점에서 ${meaning}의 에너지입니다.`,
        general: isReversed
            ? `현재 ${meaning}의 영향을 받고 있네요.`
            : `${meaning}의 기운이 당신을 감싸고 있습니다.`
    };

    return intros[category];
}

// 개인화된 조언 생성
function getPersonalizedAdvice(card: TarotCard, category: QuestionCategory, isReversed: boolean): string {
    const catInfo = categoryInterpretations[category];

    const adviceTemplates: Record<QuestionCategory, string> = {
        love: isReversed
            ? `${card.advice} 특히 연인이나 관심 있는 상대와의 관계에서 ${catInfo.keywords.challenge[Math.floor(Math.random() * catInfo.keywords.challenge.length)]}을(를) 살펴보세요.`
            : `${card.advice} 사랑에서 ${catInfo.keywords.positive[Math.floor(Math.random() * catInfo.keywords.positive.length)]}이(가) 당신에게 올 것입니다.`,
        work: isReversed
            ? `${card.advice} 직장이나 프로젝트에서 ${catInfo.keywords.challenge[Math.floor(Math.random() * catInfo.keywords.challenge.length)]}을(를) 점검해 보세요.`
            : `${card.advice} 커리어에서 ${catInfo.keywords.positive[Math.floor(Math.random() * catInfo.keywords.positive.length)]}의 기회가 보입니다.`,
        relationship: isReversed
            ? `${card.advice} 주변 관계에서 ${catInfo.keywords.challenge[Math.floor(Math.random() * catInfo.keywords.challenge.length)]}이(가) 있다면 먼저 다가가 보세요.`
            : `${card.advice} 인간관계에서 ${catInfo.keywords.positive[Math.floor(Math.random() * catInfo.keywords.positive.length)]}이(가) 깊어질 것입니다.`,
        money: isReversed
            ? `${card.advice} 재정적으로 ${catInfo.keywords.challenge[Math.floor(Math.random() * catInfo.keywords.challenge.length)]}을(를) 조심하세요.`
            : `${card.advice} 금전적으로 ${catInfo.keywords.positive[Math.floor(Math.random() * catInfo.keywords.positive.length)]}의 흐름이 있습니다.`,
        health: isReversed
            ? `${card.advice} 건강 관리에서 ${catInfo.keywords.challenge[Math.floor(Math.random() * catInfo.keywords.challenge.length)]}에 주의를 기울이세요.`
            : `${card.advice} 몸과 마음에서 ${catInfo.keywords.positive[Math.floor(Math.random() * catInfo.keywords.positive.length)]}을(를) 느낄 수 있습니다.`,
        general: isReversed
            ? `${card.advice} ${catInfo.keywords.challenge[Math.floor(Math.random() * catInfo.keywords.challenge.length)]}의 시기를 잘 이겨내세요.`
            : `${card.advice} ${catInfo.keywords.positive[Math.floor(Math.random() * catInfo.keywords.positive.length)]}이(가) 당신을 기다리고 있습니다.`
    };

    return adviceTemplates[category];
}

// 전체 리딩 요약 생성
export function generateReadingSummary(
    cards: { card: TarotCard; isReversed: boolean }[],
    category: QuestionCategory,
    question: string
): string {
    const catInfo = categoryInterpretations[category];
    const positiveCount = cards.filter(c => !c.isReversed).length;
    const totalCards = cards.length;

    let overallTone = '';
    if (positiveCount === totalCards) {
        overallTone = '매우 긍정적인 기운이 가득합니다.';
    } else if (positiveCount >= totalCards / 2) {
        overallTone = '전반적으로 좋은 흐름이지만, 주의할 점도 있어요.';
    } else {
        overallTone = '도전적인 시기이지만, 성장의 기회이기도 합니다.';
    }

    return `「${question}」에 대한 카드들의 답변입니다.\n\n${catInfo.context}에 대해 ${overallTone}\n\n${cards.map((c, i) =>
        `${i + 1}. ${c.card.nameKr}${c.isReversed ? '(역)' : ''}: ${c.isReversed ? c.card.reversed : c.card.upright}`
    ).join('\n')}`;
}
