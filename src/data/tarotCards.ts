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

// 마이너 아르카나 56장 (4수트 x 14장)
export const minorArcana: TarotCard[] = [
    // ===== WANDS (지팡이) - 불, 열정, 창조, 행동 =====
    {
        id: 22, name: "Ace of Wands", nameKr: "지팡이 에이스", arcana: "minor", suit: "wands",
        upright: "새로운 시작, 영감, 잠재력", reversed: "지연, 좌절, 창의력 막힘",
        description: "창조적 에너지의 불꽃이 피어오릅니다.", advice: "열정을 따라 새로운 도전을 시작하세요.", image: "/cards/22.png"
    },
    {
        id: 23, name: "Two of Wands", nameKr: "지팡이 2", arcana: "minor", suit: "wands",
        upright: "계획, 미래 비전, 결정", reversed: "두려움, 망설임, 계획 부재",
        description: "세상은 넓고 가능성은 무한합니다.", advice: "담대한 계획을 세우세요.", image: "/cards/23.png"
    },
    {
        id: 24, name: "Three of Wands", nameKr: "지팡이 3", arcana: "minor", suit: "wands",
        upright: "확장, 선견지명, 성장", reversed: "장애물, 지연, 좌절",
        description: "씨앗이 자라고 있습니다.", advice: "인내심을 가지고 기다리세요.", image: "/cards/24.png"
    },
    {
        id: 25, name: "Four of Wands", nameKr: "지팡이 4", arcana: "minor", suit: "wands",
        upright: "축하, 조화, 고향", reversed: "갈등, 불화, 불안정",
        description: "기쁨과 축제의 시간입니다.", advice: "성취를 축하하고 사랑하는 이들과 나누세요.", image: "/cards/25.png"
    },
    {
        id: 26, name: "Five of Wands", nameKr: "지팡이 5", arcana: "minor", suit: "wands",
        upright: "경쟁, 갈등, 다툼", reversed: "충돌 회피, 타협, 해결",
        description: "경쟁과 도전이 있습니다.", advice: "건강한 경쟁을 통해 성장하세요.", image: "/cards/26.png"
    },
    {
        id: 27, name: "Six of Wands", nameKr: "지팡이 6", arcana: "minor", suit: "wands",
        upright: "승리, 인정, 성공", reversed: "자만, 실패, 명예 실추",
        description: "승리의 영광이 당신을 기다립니다.", advice: "자신감을 갖되 겸손을 잃지 마세요.", image: "/cards/27.png"
    },
    {
        id: 28, name: "Seven of Wands", nameKr: "지팡이 7", arcana: "minor", suit: "wands",
        upright: "도전, 방어, 결의", reversed: "압도당함, 포기, 약함",
        description: "당신의 입장을 지켜야 합니다.", advice: "물러서지 말고 당당히 맞서세요.", image: "/cards/28.png"
    },
    {
        id: 29, name: "Eight of Wands", nameKr: "지팡이 8", arcana: "minor", suit: "wands",
        upright: "빠른 행동, 진전, 변화", reversed: "지연, 좌절, 저항",
        description: "모든 것이 빠르게 움직입니다.", advice: "기회를 놓치지 말고 빠르게 행동하세요.", image: "/cards/29.png"
    },
    {
        id: 30, name: "Nine of Wands", nameKr: "지팡이 9", arcana: "minor", suit: "wands",
        upright: "끈기, 용기, 최후의 도전", reversed: "피로, 포기 직전, 의심",
        description: "지치셨군요, 하지만 거의 다 왔습니다.", advice: "마지막까지 포기하지 마세요.", image: "/cards/30.png"
    },
    {
        id: 31, name: "Ten of Wands", nameKr: "지팡이 10", arcana: "minor", suit: "wands",
        upright: "부담, 책임, 과중한 짐", reversed: "짐 내려놓기, 해방, 위임",
        description: "너무 많은 짐을 지고 있습니다.", advice: "도움을 요청하고 짐을 나누세요.", image: "/cards/31.png"
    },
    {
        id: 32, name: "Page of Wands", nameKr: "지팡이 시종", arcana: "minor", suit: "wands",
        upright: "열정, 모험, 발견", reversed: "방향 상실, 미성숙, 좌절",
        description: "새로운 모험이 시작됩니다.", advice: "호기심을 따라 탐험하세요.", image: "/cards/32.png"
    },
    {
        id: 33, name: "Knight of Wands", nameKr: "지팡이 기사", arcana: "minor", suit: "wands",
        upright: "에너지, 열정, 모험심", reversed: "무모함, 분노, 지연",
        description: "열정적으로 앞으로 돌진합니다.", advice: "열정을 가지되 무모하지 마세요.", image: "/cards/33.png"
    },
    {
        id: 34, name: "Queen of Wands", nameKr: "지팡이 여왕", arcana: "minor", suit: "wands",
        upright: "자신감, 독립, 카리스마", reversed: "자기 의심, 질투, 이기심",
        description: "당당하고 매력적인 에너지입니다.", advice: "자신감을 갖고 리더십을 발휘하세요.", image: "/cards/34.png"
    },
    {
        id: 35, name: "King of Wands", nameKr: "지팡이 왕", arcana: "minor", suit: "wands",
        upright: "리더십, 비전, 기업가 정신", reversed: "독재, 무모함, 과도한 기대",
        description: "비전을 가진 리더입니다.", advice: "담대한 비전으로 다른 이들을 이끄세요.", image: "/cards/35.png"
    },

    // ===== CUPS (컵) - 물, 감정, 사랑, 관계 =====
    {
        id: 36, name: "Ace of Cups", nameKr: "컵 에이스", arcana: "minor", suit: "cups",
        upright: "새로운 감정, 사랑, 축복", reversed: "감정 억압, 공허함, 상처",
        description: "사랑이 흘러넘칩니다.", advice: "마음을 열어 사랑을 받아들이세요.", image: "/cards/36.png"
    },
    {
        id: 37, name: "Two of Cups", nameKr: "컵 2", arcana: "minor", suit: "cups",
        upright: "파트너십, 사랑, 연결", reversed: "불균형, 갈등, 단절",
        description: "두 마음이 하나로 연결됩니다.", advice: "진정한 파트너십을 추구하세요.", image: "/cards/37.png"
    },
    {
        id: 38, name: "Three of Cups", nameKr: "컵 3", arcana: "minor", suit: "cups",
        upright: "축하, 우정, 기쁨", reversed: "과음, 소문, 삼각관계",
        description: "친구들과 함께하는 기쁨입니다.", advice: "소중한 관계를 축하하세요.", image: "/cards/38.png"
    },
    {
        id: 39, name: "Four of Cups", nameKr: "컵 4", arcana: "minor", suit: "cups",
        upright: "무관심, 명상, 재고", reversed: "동기 부여, 새로운 기회, 인식",
        description: "무언가를 놓치고 있지 않나요?", advice: "새로운 가능성에 눈을 떠보세요.", image: "/cards/39.png"
    },
    {
        id: 40, name: "Five of Cups", nameKr: "컵 5", arcana: "minor", suit: "cups",
        upright: "상실, 후회, 슬픔", reversed: "수용, 전진, 용서",
        description: "상실의 아픔이 있습니다.", advice: "남은 것에 감사하고 앞으로 나아가세요.", image: "/cards/40.png"
    },
    {
        id: 41, name: "Six of Cups", nameKr: "컵 6", arcana: "minor", suit: "cups",
        upright: "향수, 추억, 순수함", reversed: "과거에 갇힘, 현실 무시, 미성숙",
        description: "아름다운 추억이 떠오릅니다.", advice: "순수한 마음을 되찾으세요.", image: "/cards/41.png"
    },
    {
        id: 42, name: "Seven of Cups", nameKr: "컵 7", arcana: "minor", suit: "cups",
        upright: "환상, 선택, 백일몽", reversed: "현실 직시, 명확성, 결정",
        description: "너무 많은 선택지가 있군요.", advice: "환상과 현실을 구분하세요.", image: "/cards/42.png"
    },
    {
        id: 43, name: "Eight of Cups", nameKr: "컵 8", arcana: "minor", suit: "cups",
        upright: "포기, 떠남, 더 깊은 탐색", reversed: "표류, 두려움, 미련",
        description: "무언가를 떠나야 할 때입니다.", advice: "용기를 내어 새로운 길을 찾으세요.", image: "/cards/43.png"
    },
    {
        id: 44, name: "Nine of Cups", nameKr: "컵 9", arcana: "minor", suit: "cups",
        upright: "만족, 소원 성취, 행복", reversed: "불만족, 탐욕, 허영",
        description: "소원이 이루어지는 카드입니다.", advice: "현재의 축복에 감사하세요.", image: "/cards/44.png"
    },
    {
        id: 45, name: "Ten of Cups", nameKr: "컵 10", arcana: "minor", suit: "cups",
        upright: "행복, 조화, 가족", reversed: "불화, 깨진 가정, 갈등",
        description: "가족의 행복이 가득합니다.", advice: "사랑하는 이들과 함께하세요.", image: "/cards/45.png"
    },
    {
        id: 46, name: "Page of Cups", nameKr: "컵 시종", arcana: "minor", suit: "cups",
        upright: "창의성, 직관, 감성", reversed: "감정 미성숙, 공상, 불안정",
        description: "감성적인 새로운 시작입니다.", advice: "직관을 믿고 창의성을 발휘하세요.", image: "/cards/46.png"
    },
    {
        id: 47, name: "Knight of Cups", nameKr: "컵 기사", arcana: "minor", suit: "cups",
        upright: "로맨스, 매력, 상상력", reversed: "환멸, 변덕, 비현실적",
        description: "로맨틱한 에너지가 다가옵니다.", advice: "마음을 따르되 현실도 고려하세요.", image: "/cards/47.png"
    },
    {
        id: 48, name: "Queen of Cups", nameKr: "컵 여왕", arcana: "minor", suit: "cups",
        upright: "공감, 돌봄, 감성", reversed: "의존적, 감정적, 불안정",
        description: "깊은 공감과 사랑의 에너지입니다.", advice: "자신과 타인을 돌보세요.", image: "/cards/48.png"
    },
    {
        id: 49, name: "King of Cups", nameKr: "컵 왕", arcana: "minor", suit: "cups",
        upright: "감정 균형, 외교, 자비", reversed: "감정 억압, 조종, 무관심",
        description: "감정의 달인입니다.", advice: "마음과 머리의 균형을 유지하세요.", image: "/cards/49.png"
    },

    // ===== SWORDS (검) - 공기, 지성, 진실, 갈등 =====
    {
        id: 50, name: "Ace of Swords", nameKr: "검 에이스", arcana: "minor", suit: "swords",
        upright: "명확함, 진실, 새로운 생각", reversed: "혼란, 잔인함, 불의",
        description: "진실의 검이 빛납니다.", advice: "명확한 판단으로 문제를 해결하세요.", image: "/cards/50.png"
    },
    {
        id: 51, name: "Two of Swords", nameKr: "검 2", arcana: "minor", suit: "swords",
        upright: "결정 어려움, 막다른 길, 균형", reversed: "우유부단, 혼란, 정보 과부하",
        description: "결정을 내려야 합니다.", advice: "눈을 감고 내면의 답을 찾으세요.", image: "/cards/51.png"
    },
    {
        id: 52, name: "Three of Swords", nameKr: "검 3", arcana: "minor", suit: "swords",
        upright: "슬픔, 상실, 이별", reversed: "치유, 용서, 극복",
        description: "마음에 상처가 있습니다.", advice: "충분히 아파야 치유됩니다.", image: "/cards/52.png"
    },
    {
        id: 53, name: "Four of Swords", nameKr: "검 4", arcana: "minor", suit: "swords",
        upright: "휴식, 회복, 명상", reversed: "불안, 소진, 서두름",
        description: "쉬어야 할 때입니다.", advice: "재충전의 시간을 가지세요.", image: "/cards/53.png"
    },
    {
        id: 54, name: "Five of Swords", nameKr: "검 5", arcana: "minor", suit: "swords",
        upright: "갈등, 패배, 승리의 허망함", reversed: "화해, 용서, 과거 청산",
        description: "승리했지만 공허합니다.", advice: "진정한 승리가 무엇인지 생각하세요.", image: "/cards/54.png"
    },
    {
        id: 55, name: "Six of Swords", nameKr: "검 6", arcana: "minor", suit: "swords",
        upright: "전환, 치유 여정, 앞으로 나아감", reversed: "저항, 미해결 문제, 정체",
        description: "어려움을 뒤로하고 떠납니다.", advice: "더 나은 곳으로 나아가세요.", image: "/cards/55.png"
    },
    {
        id: 56, name: "Seven of Swords", nameKr: "검 7", arcana: "minor", suit: "swords",
        upright: "속임, 전략, 은밀함", reversed: "고백, 양심, 진실 드러남",
        description: "무언가 숨기고 있지 않나요?", advice: "정직한 길을 선택하세요.", image: "/cards/56.png"
    },
    {
        id: 57, name: "Eight of Swords", nameKr: "검 8", arcana: "minor", suit: "swords",
        upright: "속박, 제한, 무력감", reversed: "해방, 새로운 관점, 자유",
        description: "갇혀있다 느끼지만 출구가 있습니다.", advice: "눈을 뜨면 벗어날 수 있습니다.", image: "/cards/57.png"
    },
    {
        id: 58, name: "Nine of Swords", nameKr: "검 9", arcana: "minor", suit: "swords",
        upright: "불안, 악몽, 걱정", reversed: "희망, 회복, 도움 요청",
        description: "밤의 공포가 찾아옵니다.", advice: "두려움을 나누면 가벼워집니다.", image: "/cards/58.png"
    },
    {
        id: 59, name: "Ten of Swords", nameKr: "검 10", arcana: "minor", suit: "swords",
        upright: "끝, 패배, 바닥", reversed: "재기, 회복, 최악의 끝",
        description: "더 이상 나빠질 수 없습니다.", advice: "바닥을 찍으면 올라갈 일만 남습니다.", image: "/cards/59.png"
    },
    {
        id: 60, name: "Page of Swords", nameKr: "검 시종", arcana: "minor", suit: "swords",
        upright: "호기심, 정신적 에너지, 새로운 아이디어", reversed: "험담, 속임, 냉소",
        description: "날카로운 지성이 깨어납니다.", advice: "배움에 열정을 쏟으세요.", image: "/cards/60.png"
    },
    {
        id: 61, name: "Knight of Swords", nameKr: "검 기사", arcana: "minor", suit: "swords",
        upright: "야망, 행동, 결단력", reversed: "무모함, 공격성, 조급함",
        description: "빠르고 단호하게 행동합니다.", advice: "용감하되 신중하게 행동하세요.", image: "/cards/61.png"
    },
    {
        id: 62, name: "Queen of Swords", nameKr: "검 여왕", arcana: "minor", suit: "swords",
        upright: "명석함, 독립, 직설적", reversed: "냉정함, 잔인함, 고립",
        description: "진실을 꿰뚫어 봅니다.", advice: "감정보다 이성으로 판단하세요.", image: "/cards/62.png"
    },
    {
        id: 63, name: "King of Swords", nameKr: "검 왕", arcana: "minor", suit: "swords",
        upright: "지적 권위, 진실, 윤리", reversed: "폭정, 냉혹함, 권력 남용",
        description: "지혜로운 판단을 내립니다.", advice: "공정하고 진실되게 행동하세요.", image: "/cards/63.png"
    },

    // ===== PENTACLES (동전) - 땅, 물질, 건강, 일 =====
    {
        id: 64, name: "Ace of Pentacles", nameKr: "동전 에이스", arcana: "minor", suit: "pentacles",
        upright: "새로운 기회, 번영, 안정", reversed: "기회 상실, 재정 문제, 부주의",
        description: "물질적 풍요의 씨앗입니다.", advice: "기회를 잡아 성장시키세요.", image: "/cards/64.png"
    },
    {
        id: 65, name: "Two of Pentacles", nameKr: "동전 2", arcana: "minor", suit: "pentacles",
        upright: "균형, 적응, 시간 관리", reversed: "불균형, 과부하, 무질서",
        description: "여러 일을 저글링하고 있군요.", advice: "유연하게 균형을 유지하세요.", image: "/cards/65.png"
    },
    {
        id: 66, name: "Three of Pentacles", nameKr: "동전 3", arcana: "minor", suit: "pentacles",
        upright: "팀워크, 협력, 장인정신", reversed: "갈등, 경쟁, 형편없는 작업",
        description: "협력이 훌륭한 결과를 만듭니다.", advice: "팀과 함께 일하세요.", image: "/cards/66.png"
    },
    {
        id: 67, name: "Four of Pentacles", nameKr: "동전 4", arcana: "minor", suit: "pentacles",
        upright: "안정, 절약, 보수성", reversed: "탐욕, 물질주의, 인색함",
        description: "소유에 집착하고 있지 않나요?", advice: "나눔의 기쁨을 알아가세요.", image: "/cards/67.png"
    },
    {
        id: 68, name: "Five of Pentacles", nameKr: "동전 5", arcana: "minor", suit: "pentacles",
        upright: "어려움, 가난, 고립", reversed: "회복, 도움, 긍정적 변화",
        description: "힘든 시기를 지나고 있습니다.", advice: "도움을 요청하면 받을 수 있습니다.", image: "/cards/68.png"
    },
    {
        id: 69, name: "Six of Pentacles", nameKr: "동전 6", arcana: "minor", suit: "pentacles",
        upright: "관대함, 나눔, 공정함", reversed: "빚, 불공정, 이기심",
        description: "주고받음의 균형입니다.", advice: "베풀 수 있을 때 베푸세요.", image: "/cards/69.png"
    },
    {
        id: 70, name: "Seven of Pentacles", nameKr: "동전 7", arcana: "minor", suit: "pentacles",
        upright: "인내, 투자, 장기적 관점", reversed: "조바심, 실망, 좌절",
        description: "씨앗이 자라는 것을 기다립니다.", advice: "인내하며 결실을 기다리세요.", image: "/cards/70.png"
    },
    {
        id: 71, name: "Eight of Pentacles", nameKr: "동전 8", arcana: "minor", suit: "pentacles",
        upright: "장인정신, 노력, 숙달", reversed: "서두름, 게으름, 완벽주의",
        description: "기술을 갈고닦는 중입니다.", advice: "꾸준한 노력이 실력을 만듭니다.", image: "/cards/71.png"
    },
    {
        id: 72, name: "Nine of Pentacles", nameKr: "동전 9", arcana: "minor", suit: "pentacles",
        upright: "풍요, 자립, 세련됨", reversed: "과시, 위험한 투자, 고독",
        description: "노력의 결실을 누리고 있습니다.", advice: "이룬 것을 즐기세요.", image: "/cards/72.png"
    },
    {
        id: 73, name: "Ten of Pentacles", nameKr: "동전 10", arcana: "minor", suit: "pentacles",
        upright: "부, 유산, 가족의 안정", reversed: "재정 손실, 가족 갈등, 불안정",
        description: "대대로 전해지는 풍요입니다.", advice: "다음 세대를 위해 지혜를 나누세요.", image: "/cards/73.png"
    },
    {
        id: 74, name: "Page of Pentacles", nameKr: "동전 시종", arcana: "minor", suit: "pentacles",
        upright: "야망, 근면, 새로운 기회", reversed: "게으름, 비현실적 목표, 방향 상실",
        description: "실용적인 꿈을 시작합니다.", advice: "작은 것부터 차근차근 시작하세요.", image: "/cards/74.png"
    },
    {
        id: 75, name: "Knight of Pentacles", nameKr: "동전 기사", arcana: "minor", suit: "pentacles",
        upright: "효율, 일상, 책임감", reversed: "무기력, 완고함, 지루함",
        description: "묵묵히 나아가는 에너지입니다.", advice: "꾸준함이 성공의 비결입니다.", image: "/cards/75.png"
    },
    {
        id: 76, name: "Queen of Pentacles", nameKr: "동전 여왕", arcana: "minor", suit: "pentacles",
        upright: "풍요, 실용적 돌봄, 안정", reversed: "일과 삶 불균형, 질투, 인색함",
        description: "풍요로운 돌봄의 에너지입니다.", advice: "자신과 가족을 잘 돌보세요.", image: "/cards/76.png"
    },
    {
        id: 77, name: "King of Pentacles", nameKr: "동전 왕", arcana: "minor", suit: "pentacles",
        upright: "풍요, 안정, 리더십", reversed: "탐욕, 물질주의, 완고함",
        description: "부와 안정의 성취입니다.", advice: "현명하게 재산을 관리하세요.", image: "/cards/77.png"
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
