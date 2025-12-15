// 타로 스프레드 정의

export interface SpreadPosition {
    id: number;
    name: string;
    meaning: string;
    x: number;  // 상대 위치 (0-100)
    y: number;
}

export interface Spread {
    id: string;
    name: string;
    nameKr: string;
    description: string;
    cardCount: number;
    positions: SpreadPosition[];
}

// 1카드 스프레드 - 오늘의 운세
export const singleCardSpread: Spread = {
    id: 'single',
    name: 'Single Card',
    nameKr: '원카드',
    description: '오늘 하루의 메시지를 담은 카드 한 장',
    cardCount: 1,
    positions: [
        { id: 1, name: 'message', meaning: '오늘의 메시지', x: 50, y: 50 }
    ]
};

// 3카드 스프레드 - 과거, 현재, 미래
export const threeCardSpread: Spread = {
    id: 'three',
    name: 'Three Card',
    nameKr: '쓰리카드',
    description: '과거, 현재, 미래의 흐름을 보는 기본 스프레드',
    cardCount: 3,
    positions: [
        { id: 1, name: 'past', meaning: '과거', x: 25, y: 50 },
        { id: 2, name: 'present', meaning: '현재', x: 50, y: 50 },
        { id: 3, name: 'future', meaning: '미래', x: 75, y: 50 }
    ]
};

// 연애 스프레드
export const loveSpread: Spread = {
    id: 'love',
    name: 'Love Spread',
    nameKr: '연애 스프레드',
    description: '나, 상대방, 관계의 현재와 조언',
    cardCount: 5,
    positions: [
        { id: 1, name: 'self', meaning: '나의 마음', x: 30, y: 30 },
        { id: 2, name: 'partner', meaning: '상대방의 마음', x: 70, y: 30 },
        { id: 3, name: 'relationship', meaning: '현재 관계', x: 50, y: 50 },
        { id: 4, name: 'challenge', meaning: '해결해야 할 과제', x: 30, y: 70 },
        { id: 5, name: 'advice', meaning: '조언', x: 70, y: 70 }
    ]
};

// 선택 스프레드
export const choiceSpread: Spread = {
    id: 'choice',
    name: 'Choice Spread',
    nameKr: '선택 스프레드',
    description: '두 가지 선택지와 결과',
    cardCount: 5,
    positions: [
        { id: 1, name: 'situation', meaning: '현재 상황', x: 50, y: 25 },
        { id: 2, name: 'choice1', meaning: '선택 A', x: 25, y: 50 },
        { id: 3, name: 'result1', meaning: 'A의 결과', x: 25, y: 75 },
        { id: 4, name: 'choice2', meaning: '선택 B', x: 75, y: 50 },
        { id: 5, name: 'result2', meaning: 'B의 결과', x: 75, y: 75 }
    ]
};

// 켈틱 크로스 스프레드
export const celticCrossSpread: Spread = {
    id: 'celtic',
    name: 'Celtic Cross',
    nameKr: '켈틱 크로스',
    description: '상황을 깊이 있게 분석하는 전통적인 10장 스프레드',
    cardCount: 10,
    positions: [
        { id: 1, name: 'present', meaning: '현재 상황', x: 35, y: 50 },
        { id: 2, name: 'challenge', meaning: '도전/장애물', x: 35, y: 50 }, // 교차
        { id: 3, name: 'foundation', meaning: '근본 원인', x: 35, y: 75 },
        { id: 4, name: 'past', meaning: '최근 과거', x: 15, y: 50 },
        { id: 5, name: 'crown', meaning: '목표/가능성', x: 35, y: 25 },
        { id: 6, name: 'future', meaning: '가까운 미래', x: 55, y: 50 },
        { id: 7, name: 'self', meaning: '자신', x: 80, y: 85 },
        { id: 8, name: 'environment', meaning: '주변 환경', x: 80, y: 65 },
        { id: 9, name: 'hopes', meaning: '희망과 두려움', x: 80, y: 45 },
        { id: 10, name: 'outcome', meaning: '최종 결과', x: 80, y: 25 }
    ]
};

// 전체 스프레드 목록
export const spreads: Spread[] = [
    singleCardSpread,
    threeCardSpread,
    loveSpread,
    choiceSpread,
    celticCrossSpread
];

// ID로 스프레드 찾기
export const getSpreadById = (id: string): Spread | undefined => {
    return spreads.find(spread => spread.id === id);
};

// 감정/질문 유형별 추천 스프레드
export const recommendedSpreads: Record<string, string[]> = {
    love: ['love', 'three', 'celtic'],
    work: ['three', 'choice', 'celtic'],
    relationship: ['love', 'three', 'choice'],
    money: ['three', 'choice', 'single'],
    health: ['single', 'three'],
    general: ['single', 'three', 'celtic']
};
