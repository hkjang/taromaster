export interface TarotCard {
    id: number;
    name: string;
    nameKr: string;
    arcana: 'major' | 'minor';
    suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
    upright: string;
    reversed: string;
    description: string;
    advice: string;
    image?: string;
}

// 메이저 아르카나 22장
export const majorArcana: TarotCard[] = [
    {
        id: 0,
        name: "The Fool",
        nameKr: "바보",
        arcana: "major",
        upright: "새로운 시작, 순수함, 모험",
        reversed: "무모함, 위험 경고, 망설임",
        description: "새로운 여정의 시작을 알리는 카드입니다. 순수한 마음으로 미지의 세계로 발을 내딛을 때입니다.",
        advice: "두려움을 내려놓고 새로운 도전을 받아들이세요. 지금은 걱정보다 용기가 필요한 때입니다.",
        image: "/cards/0.png"
    },
    {
        id: 1,
        name: "The Magician",
        nameKr: "마법사",
        arcana: "major",
        upright: "창조력, 의지력, 기술",
        reversed: "속임수, 재능 낭비, 교활함",
        description: "당신은 이미 필요한 모든 것을 가지고 있습니다. 이제 그것을 활용할 차례입니다.",
        advice: "당신의 능력을 믿으세요. 원하는 것을 실현할 모든 도구가 이미 당신 안에 있습니다.",
        image: "/cards/1.png"
    },
    {
        id: 2,
        name: "The High Priestess",
        nameKr: "여사제",
        arcana: "major",
        upright: "직관, 신비, 내면의 지혜",
        reversed: "비밀, 숨겨진 의도, 혼란",
        description: "논리를 넘어선 직관의 목소리에 귀 기울일 때입니다. 당신의 내면은 이미 답을 알고 있습니다.",
        advice: "조용히 내면의 소리에 귀를 기울이세요. 답은 밖이 아닌 안에 있습니다.",
        image: "/cards/2.png"
    },
    {
        id: 3,
        name: "The Empress",
        nameKr: "여황제",
        arcana: "major",
        upright: "풍요, 모성애, 창조성",
        reversed: "의존성, 창조적 막힘, 과잉보호",
        description: "풍요와 사랑이 당신을 감싸고 있습니다. 창조적 에너지가 충만한 시기입니다.",
        advice: "자신을 사랑하고 돌보세요. 당신이 먼저 풍요로워질 때 주변도 풍요로워집니다.",
        image: "/cards/3.png"
    },
    {
        id: 4,
        name: "The Emperor",
        nameKr: "황제",
        arcana: "major",
        upright: "권위, 구조, 통제력",
        reversed: "독재, 경직성, 권위 남용",
        description: "질서와 안정을 세울 시간입니다. 명확한 계획과 규율이 성공을 이끕니다.",
        advice: "체계적인 접근이 필요합니다. 감정보다 논리로, 충동보다 계획으로 움직이세요.",
        image: "/cards/4.png"
    },
    {
        id: 5,
        name: "The Hierophant",
        nameKr: "교황",
        arcana: "major",
        upright: "전통, 지혜, 영적 인도",
        reversed: "형식주의, 반항, 새로운 관점 필요",
        description: "스승이나 전통에서 배울 것이 있습니다. 겸손히 가르침을 받아들일 때입니다.",
        advice: "경험에서 우러나온 조언에 귀 기울이세요. 때로는 기존의 방법이 가장 현명합니다.",
        image: "/cards/5.png"
    },
    {
        id: 6,
        name: "The Lovers",
        nameKr: "연인",
        arcana: "major",
        upright: "사랑, 조화, 선택",
        reversed: "불균형, 갈등, 잘못된 선택",
        description: "중요한 선택의 기로에 서 있습니다. 마음과 가치관에 따라 결정하세요.",
        advice: "진정으로 원하는 것이 무엇인지 솔직해지세요. 사랑은 용기를 필요로 합니다.",
        image: "/cards/6.png"
    },
    {
        id: 7,
        name: "The Chariot",
        nameKr: "전차",
        arcana: "major",
        upright: "의지력, 승리, 결단력",
        reversed: "방향 상실, 공격성, 통제력 상실",
        description: "강한 의지로 앞으로 나아갈 때입니다. 승리는 결단력 있는 자의 것입니다.",
        advice: "목표를 향해 흔들림 없이 전진하세요. 장애물은 의지 앞에 무너집니다.",
        image: "/cards/7.png"
    },
    {
        id: 8,
        name: "Strength",
        nameKr: "힘",
        arcana: "major",
        upright: "용기, 인내, 내면의 힘",
        reversed: "자기 의심, 약함, 불안",
        description: "진정한 힘은 폭력이 아닌 부드러움에서 옵니다. 인내와 사랑으로 극복하세요.",
        advice: "강함은 부드러움이 될 수 있을 때 완성됩니다. 분노가 아닌 사랑으로 이기세요.",
        image: "/cards/8.png"
    },
    {
        id: 9,
        name: "The Hermit",
        nameKr: "은둔자",
        arcana: "major",
        upright: "성찰, 고독, 내면 탐구",
        reversed: "고립, 외로움, 현실 도피",
        description: "잠시 세상과 거리를 두고 자신을 돌아볼 시간입니다. 고독 속에서 지혜를 찾으세요.",
        advice: "혼자만의 시간이 필요합니다. 내면의 빛을 따라가면 답을 찾을 수 있습니다.",
        image: "/cards/9.png"
    },
    {
        id: 10,
        name: "Wheel of Fortune",
        nameKr: "운명의 수레바퀴",
        arcana: "major",
        upright: "변화, 운명, 전환점",
        reversed: "불운, 저항, 통제력 상실",
        description: "운명의 바퀴가 돌아가고 있습니다. 변화를 받아들이면 좋은 기회가 옵니다.",
        advice: "변화는 피할 수 없습니다. 흐름에 맡기되, 준비된 자에게 행운은 찾아옵니다.",
        image: "/cards/10.png"
    },
    {
        id: 11,
        name: "Justice",
        nameKr: "정의",
        arcana: "major",
        upright: "정의, 공정함, 책임",
        reversed: "불공정, 부정직, 책임 회피",
        description: "인과의 법칙이 작용합니다. 심은 대로 거두게 됩니다.",
        advice: "공정하고 정직하게 행동하세요. 당신의 선택에는 책임이 따릅니다.",
        image: "/cards/11.png"
    },
    {
        id: 12,
        name: "The Hanged Man",
        nameKr: "매달린 사람",
        arcana: "major",
        upright: "희생, 새로운 관점, 멈춤",
        reversed: "지연, 저항, 희생 거부",
        description: "잠시 멈추고 다른 시각으로 바라볼 때입니다. 포기가 아닌 전환의 시간입니다.",
        advice: "때로는 기다림이 최선의 행동입니다. 관점을 바꾸면 새로운 길이 보입니다.",
        image: "/cards/12.png"
    },
    {
        id: 13,
        name: "Death",
        nameKr: "죽음",
        arcana: "major",
        upright: "끝, 변화, 새로운 시작",
        reversed: "저항, 변화 거부, 정체",
        description: "무언가의 끝이 다가옵니다. 하지만 이것은 새로운 시작을 위한 필연적 과정입니다.",
        advice: "두려워하지 마세요. 과거를 보내야 미래가 옵니다. 변화를 받아들이세요.",
        image: "/cards/13.png"
    },
    {
        id: 14,
        name: "Temperance",
        nameKr: "절제",
        arcana: "major",
        upright: "균형, 인내, 조화",
        reversed: "불균형, 과잉, 충돌",
        description: "균형과 조화가 필요한 시기입니다. 극단을 피하고 중용의 길을 걸으세요.",
        advice: "서두르지 마세요. 모든 것에는 적절한 때가 있습니다. 인내하며 균형을 유지하세요.",
        image: "/cards/14.png"
    },
    {
        id: 15,
        name: "The Devil",
        nameKr: "악마",
        arcana: "major",
        upright: "속박, 중독, 물질주의",
        reversed: "해방, 자각, 통제력 회복",
        description: "무언가에 얽매여 있지는 않나요? 스스로 만든 사슬을 인식할 때입니다.",
        advice: "당신을 묶고 있는 것이 무엇인지 직시하세요. 인식이 해방의 첫걸음입니다.",
        image: "/cards/15.png"
    },
    {
        id: 16,
        name: "The Tower",
        nameKr: "탑",
        arcana: "major",
        upright: "갑작스러운 변화, 파괴, 깨달음",
        reversed: "변화 저항, 위기 연장, 개인적 변화",
        description: "예상치 못한 충격이 올 수 있습니다. 하지만 무너진 자리에 새것을 세울 수 있습니다.",
        advice: "고통스럽더라도 진실을 마주하세요. 파괴는 재건의 시작입니다.",
        image: "/cards/16.png"
    },
    {
        id: 17,
        name: "The Star",
        nameKr: "별",
        arcana: "major",
        upright: "희망, 영감, 평온",
        reversed: "절망, 불신, 방향 상실",
        description: "어둠 속에서도 별은 빛납니다. 희망을 잃지 마세요, 치유의 시간이 왔습니다.",
        advice: "희망을 품으세요. 지금의 어려움은 지나갈 것이고, 더 밝은 날이 올 것입니다.",
        image: "/cards/17.png"
    },
    {
        id: 18,
        name: "The Moon",
        nameKr: "달",
        arcana: "major",
        upright: "환상, 불안, 무의식",
        reversed: "혼란 해소, 두려움 극복, 진실",
        description: "모든 것이 명확하지 않은 시기입니다. 직관을 믿되, 환상에 속지 마세요.",
        advice: "불안해도 괜찮습니다. 달빛 아래 숨겨진 것들이 드러날 것입니다. 직관을 따르세요.",
        image: "/cards/18.png"
    },
    {
        id: 19,
        name: "The Sun",
        nameKr: "태양",
        arcana: "major",
        upright: "기쁨, 성공, 활력",
        reversed: "과잉 낙관, 일시적 어려움, 지연된 성공",
        description: "밝고 따뜻한 에너지가 가득합니다. 성공과 기쁨이 당신을 기다립니다.",
        advice: "자신감을 가지세요. 당신은 빛나고 있고, 세상은 당신의 편입니다.",
        image: "/cards/19.png"
    },
    {
        id: 20,
        name: "Judgement",
        nameKr: "심판",
        arcana: "major",
        upright: "각성, 재탄생, 부름",
        reversed: "자기 의심, 거부, 과거에 얽매임",
        description: "과거를 정리하고 새롭게 태어날 시간입니다. 더 높은 부름에 응답하세요.",
        advice: "과거의 잘못을 용서하고 전진하세요. 새로운 삶이 당신을 부르고 있습니다.",
        image: "/cards/20.png"
    },
    {
        id: 21,
        name: "The World",
        nameKr: "세계",
        arcana: "major",
        upright: "완성, 성취, 통합",
        reversed: "미완성, 지연, 목표 부재",
        description: "하나의 여정이 완성되었습니다. 축하합니다, 당신은 해냈습니다.",
        advice: "성취를 축하하세요. 그리고 새로운 여정을 위한 준비를 시작하세요.",
        image: "/cards/21.png"
    }
];

// 마이너 아르카나 (완두 슈트 예시 - 나머지는 유사 패턴)
export const minorArcana: TarotCard[] = [
    // Wands (지팡이)
    {
        id: 22,
        name: "Ace of Wands",
        nameKr: "지팡이 에이스",
        arcana: "minor",
        suit: "wands",
        upright: "새로운 시작, 영감, 잠재력",
        reversed: "지연, 좌절, 창의력 막힘",
        description: "창조적 에너지의 불꽃이 피어오릅니다. 새로운 열정이 시작됩니다.",
        advice: "이 불꽃을 소중히 키우세요. 당신의 열정이 세상을 바꿀 수 있습니다.",
        image: "/cards/22.png"
    },
    {
        id: 23,
        name: "Two of Wands",
        nameKr: "지팡이 2",
        arcana: "minor",
        suit: "wands",
        upright: "계획, 미래 비전, 결정",
        reversed: "두려움, 망설임, 계획 부재",
        description: "세상은 넓고 가능성은 무한합니다. 어디로 나아갈지 선택할 시간입니다.",
        advice: "큰 그림을 그리세요. 담대한 계획이 담대한 결과를 만듭니다.",
        image: "/cards/23.png"
    },
    {
        id: 24,
        name: "Three of Wands",
        nameKr: "지팡이 3",
        arcana: "minor",
        suit: "wands",
        upright: "확장, 선견지명, 성장",
        reversed: "장애물, 지연, 좌절",
        description: "당신이 뿌린 씨앗이 자라고 있습니다. 곧 결실을 볼 수 있을 것입니다.",
        advice: "인내심을 가지세요. 노력의 결과가 곧 보이기 시작할 것입니다.",
        image: "/cards/24.png"
    },
    // Cups (컵)
    {
        id: 36,
        name: "Ace of Cups",
        nameKr: "컵 에이스",
        arcana: "minor",
        suit: "cups",
        upright: "새로운 감정, 사랑, 축복",
        reversed: "감정 억압, 공허함, 상처",
        description: "마음이 열리고 사랑이 흘러넘칩니다. 감정의 새로운 시작입니다.",
        advice: "마음을 열어 사랑을 받아들이세요. 당신은 사랑받을 자격이 있습니다.",
        image: "/cards/36.png"
    },
    {
        id: 37,
        name: "Two of Cups",
        nameKr: "컵 2",
        arcana: "minor",
        suit: "cups",
        upright: "파트너십, 사랑, 연결",
        reversed: "불균형, 갈등, 단절",
        description: "두 마음이 하나로 연결됩니다. 진정한 파트너십의 시작입니다.",
        advice: "서로의 차이를 존중하며 함께 성장하세요. 사랑은 나눔입니다.",
        image: "/cards/37.png"
    },
    // Swords (검)
    {
        id: 50,
        name: "Ace of Swords",
        nameKr: "검 에이스",
        arcana: "minor",
        suit: "swords",
        upright: "명확함, 진실, 새로운 생각",
        reversed: "혼란, 잔인함, 불의",
        description: "진실의 검이 빛납니다. 명확한 통찰력으로 문제를 해결할 때입니다.",
        advice: "진실 앞에 담대해지세요. 명확한 판단이 승리를 가져옵니다.",
        image: "/cards/50.png"
    },
    {
        id: 51,
        name: "Three of Swords",
        nameKr: "검 3",
        arcana: "minor",
        suit: "swords",
        upright: "슬픔, 상실, 이별",
        reversed: "치유, 용서, 극복",
        description: "마음에 상처가 있습니다. 하지만 이 아픔도 지나갈 것입니다.",
        advice: "슬픔을 피하지 마세요. 충분히 아파야 진정으로 치유될 수 있습니다.",
        image: "/cards/51.png"
    },
    // Pentacles (동전)
    {
        id: 64,
        name: "Ace of Pentacles",
        nameKr: "동전 에이스",
        arcana: "minor",
        suit: "pentacles",
        upright: "새로운 기회, 번영, 안정",
        reversed: "기회 상실, 재정 문제, 부주의",
        description: "물질적 풍요의 씨앗이 주어졌습니다. 잘 키워서 큰 나무로 만드세요.",
        advice: "기회를 잡으세요. 작은 시작이 큰 성장으로 이어질 수 있습니다.",
        image: "/cards/64.png"
    },
    {
        id: 65,
        name: "Ten of Pentacles",
        nameKr: "동전 10",
        arcana: "minor",
        suit: "pentacles",
        upright: "부, 유산, 가족의 안정",
        reversed: "재정 손실, 가족 갈등, 불안정",
        description: "풍요와 안정이 가득합니다. 당신이 쌓아온 것들이 결실을 맺었습니다.",
        advice: "이룬 것에 감사하세요. 그리고 다음 세대를 위해 지혜를 나누세요.",
        image: "/cards/65.png"
    }
];

// 전체 타로 덱
export const tarotDeck: TarotCard[] = [...majorArcana, ...minorArcana];

// 랜덤 카드 선택 함수
export const drawCards = (count: number, exclude: number[] = []): TarotCard[] => {
    const available = tarotDeck.filter(card => !exclude.includes(card.id));
    const shuffled = [...available].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
};

// 카드 ID로 카드 찾기
export const getCardById = (id: number): TarotCard | undefined => {
    return tarotDeck.find(card => card.id === id);
};
