// 타로 마스터 대사 데이터

export type MasterStyle = 'comforting' | 'direct';

export interface MasterDialog {
    situation: string;
    comforting: string[];
    direct: string[];
}

// 입장 인사
export const entranceDialogs: MasterDialog = {
    situation: 'entrance',
    comforting: [
        "어서 오세요... 당신이 오실 것 같은 예감이 있었어요.",
        "반가워요. 오늘 여기까지 오셨군요. 편하게 앉으세요.",
        "어서 오세요. 오랫동안 기다려왔어요, 당신을."
    ],
    direct: [
        "왔군요. 준비되셨나요?",
        "좋아요, 바로 시작하죠. 시간은 소중하니까요.",
        "드디어 오셨군요. 카드가 당신을 부르고 있었어요."
    ]
};

// 질문 유도
export const questionDialogs: MasterDialog = {
    situation: 'question',
    comforting: [
        "무엇이 당신의 마음을 무겁게 하고 있나요?",
        "마음속에 품고 있는 질문이 있죠? 천천히 떠올려보세요.",
        "당신의 마음이 알고 싶어하는 것... 무엇인가요?"
    ],
    direct: [
        "질문을 정하세요. 명확할수록 답도 명확해집니다.",
        "무엇을 알고 싶으신가요? 솔직하게 말씀하세요.",
        "마음의 질문을 던지세요. 카드는 진실만을 말합니다."
    ]
};

// 셔플 안내
export const shuffleDialogs: MasterDialog = {
    situation: 'shuffle',
    comforting: [
        "카드를 섞으면서 당신의 에너지를 담아보세요.",
        "천천히... 당신의 마음이 카드에 스며들게 하세요.",
        "손끝으로 느껴보세요. 어떤 카드가 당신을 부르는지."
    ],
    direct: [
        "카드를 섞으세요. 당신의 손이 운명을 결정합니다.",
        "집중하세요. 잡념은 모두 내려놓고.",
        "섞으면서 질문에 집중하세요. 다른 생각은 금물입니다."
    ]
};

// 카드 선택
export const selectDialogs: MasterDialog = {
    situation: 'select',
    comforting: [
        "마음이 끌리는 카드를 골라보세요. 틀린 선택은 없어요.",
        "서두르지 마세요. 카드가 당신을 선택하게 두세요.",
        "직감을 믿으세요. 당신의 내면은 이미 답을 알고 있어요."
    ],
    direct: [
        "고르세요. 망설이지 마세요.",
        "첫 번째 끌림을 따르세요. 그것이 진실입니다.",
        "머리가 아닌 손이 선택하게 하세요."
    ]
};

// 카드 공개
export const revealDialogs: MasterDialog = {
    situation: 'reveal',
    comforting: [
        "자, 이제 카드가 말하려 합니다...",
        "당신의 카드입니다. 천천히 살펴볼까요?",
        "흥미로운 조합이네요... 카드가 많은 이야기를 담고 있어요."
    ],
    direct: [
        "운명이 드러났습니다.",
        "이것이 카드의 답입니다.",
        "직면하세요. 이것이 현재 당신의 상황입니다."
    ]
};

// 리딩 시작
export const readingStartDialogs: MasterDialog = {
    situation: 'readingStart',
    comforting: [
        "이 카드가 당신에게 하고 싶은 말이 있네요...",
        "천천히 설명해드릴게요. 마음을 열고 들어보세요.",
        "카드의 메시지를 함께 읽어볼까요?"
    ],
    direct: [
        "해석하겠습니다. 잘 들으세요.",
        "카드는 이렇게 말하고 있습니다.",
        "메시지는 명확합니다."
    ]
};

// 리딩 중 연결 문구
export const readingTransitionDialogs: MasterDialog = {
    situation: 'readingTransition',
    comforting: [
        "그리고 이 카드는...",
        "다음 카드도 중요해요...",
        "흥미롭네요, 이어서..."
    ],
    direct: [
        "다음.",
        "이어서,",
        "또한,"
    ]
};

// 조언 제공
export const adviceDialogs: MasterDialog = {
    situation: 'advice',
    comforting: [
        "제가 드리고 싶은 조언은...",
        "카드들이 당신에게 전하는 메시지예요...",
        "오늘의 리딩을 정리하자면..."
    ],
    direct: [
        "명심하세요.",
        "중요한 것은 이것입니다.",
        "결론적으로,"
    ]
};

// 마무리 인사
export const closingDialogs: MasterDialog = {
    situation: 'closing',
    comforting: [
        "오늘 이야기가 도움이 되었길 바라요. 언제든 다시 오세요.",
        "당신의 앞길에 빛이 함께하길... 다음에 또 만나요.",
        "좋은 시간이었어요. 카드의 조언을 마음에 담아가세요."
    ],
    direct: [
        "오늘은 여기까지입니다. 행동은 당신의 몫입니다.",
        "가세요. 그리고 기억하세요, 운명은 스스로 만드는 것입니다.",
        "리딩이 끝났습니다. 조언을 귀담아 들으셨길."
    ]
};

// 침묵/사색 문구
export const silenceDialogs: MasterDialog = {
    situation: 'silence',
    comforting: [
        "...",
        "흠...",
        "잠시만..."
    ],
    direct: [
        "...",
        "음.",
        "..."
    ]
};

// 감정별 반응
export const emotionResponses = {
    love: {
        comforting: "사랑에 대한 질문이군요... 마음이 많이 복잡하시겠어요.",
        direct: "사랑 문제군요. 카드가 명확히 보여줄 겁니다."
    },
    work: {
        comforting: "일에 대한 고민이시군요. 많이 힘드셨겠어요.",
        direct: "커리어 관련이군요. 집중하세요."
    },
    relationship: {
        comforting: "사람과의 관계... 어려운 부분이죠. 이해해요.",
        direct: "인간관계 문제군요. 직시해야 합니다."
    },
    money: {
        comforting: "재정에 대한 걱정... 스트레스 받으셨겠어요.",
        direct: "금전 문제군요. 현실적으로 봐야 합니다."
    },
    health: {
        comforting: "건강 걱정이시군요... 몸과 마음 모두 챙겨야 해요.",
        direct: "건강 관련이군요. 가볍게 볼 문제가 아닙니다."
    },
    general: {
        comforting: "여러 생각이 많으시군요... 카드에 답을 맡겨보세요.",
        direct: "알겠습니다. 시작하죠."
    }
};

// 도우미 함수: 랜덤 대사 선택
export const getRandomDialog = (dialog: MasterDialog, style: MasterStyle): string => {
    const dialogs = style === 'comforting' ? dialog.comforting : dialog.direct;
    return dialogs[Math.floor(Math.random() * dialogs.length)];
};
