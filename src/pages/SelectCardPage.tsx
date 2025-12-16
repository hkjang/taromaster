import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReading } from '../hooks/useReading';
import { useSettings } from '../hooks/useSettings';
import { CardDeck } from '../components/CardDeck';
import { DialogBubble } from '../components/DialogBubble';
import { CandleEffect } from '../components/CandleEffect';
import type { TarotCard as TarotCardType } from '../data/tarotCards';
import { tarotDeck, majorArcana } from '../data/tarotCards';
import { getRandomDialog, selectDialogs } from '../data/masterDialogs';
import './SelectCardPage.css';

export function SelectCardPage() {
    const navigate = useNavigate();
    const { state, selectCard } = useReading();
    const { settings } = useSettings();

    const [selectedCards, setSelectedCards] = useState<TarotCardType[]>([]);
    const [showWiggle, setShowWiggle] = useState(false);

    const maxCards = state.spread?.cardCount || 3;
    const dialog = getRandomDialog(selectDialogs, settings.masterStyle);

    // 1장 또는 3장 스프레드는 메이저 아르카나만 사용
    const useMajorOnly = maxCards <= 3;
    const deckToUse = useMajorOnly ? majorArcana : tarotDeck;

    // 망설임 감지 - 10초 후 카드 흔들림
    useEffect(() => {
        const timer = setTimeout(() => {
            if (selectedCards.length < maxCards) {
                setShowWiggle(true);
            }
        }, 10000);

        return () => clearTimeout(timer);
    }, [selectedCards.length, maxCards]);

    const handleCardSelect = (card: TarotCardType) => {
        // 이미 선택된 카드인지 확인
        if (selectedCards.find(c => c.id === card.id)) return;

        // 사용할 덱에서 랜덤 카드 선택
        const availableCards = deckToUse.filter(c => !selectedCards.find(s => s.id === c.id));
        const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];

        setSelectedCards(prev => [...prev, randomCard]);
        selectCard(randomCard, selectedCards.length + 1);
        setShowWiggle(false);
    };

    const handleProceed = () => {
        navigate('/reading');
    };

    return (
        <div className="select-card-page">
            <CandleEffect position="left" size="small" />
            <CandleEffect position="right" size="small" />

            {/* 안내 대화 */}
            <div className="select-dialog">
                <DialogBubble
                    text={selectedCards.length === 0 ? dialog : `${selectedCards.length}장을 선택했습니다. ${maxCards - selectedCards.length}장 더 선택해주세요.`}
                    isTyping={selectedCards.length === 0}
                    typingSpeed={40}
                />
            </div>

            {/* 선택된 카드 표시 */}
            {selectedCards.length > 0 && (
                <div className="selected-cards">
                    {selectedCards.map((card, index) => (
                        <div key={card.id} className="selected-card-slot">
                            <div className="slot-card">
                                <span className="slot-number">{index + 1}</span>
                                <span className="slot-name">{card.nameKr}</span>
                            </div>
                        </div>
                    ))}
                    {[...Array(maxCards - selectedCards.length)].map((_, i) => (
                        <div key={`empty-${i}`} className="selected-card-slot empty">
                            <span className="slot-number">{selectedCards.length + i + 1}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* 카드 덱 */}
            <div className="card-deck-area">
                {selectedCards.length < maxCards ? (
                    <CardDeck
                        onCardSelect={handleCardSelect}
                        selectedCount={selectedCards.length}
                        maxCards={maxCards}
                        spreadCards={true}
                    />
                ) : (
                    <div className="selection-complete">
                        <p>모든 카드를 선택했습니다</p>
                        <button
                            className="btn btn-primary"
                            onClick={handleProceed}
                        >
                            카드 해석 보기
                        </button>
                    </div>
                )}
            </div>

            {/* 망설임 힌트 */}
            {showWiggle && selectedCards.length < maxCards && (
                <div className="hesitation-hint">
                    <p>마음이 끌리는 카드를 선택해주세요...</p>
                </div>
            )}
        </div>
    );
}
