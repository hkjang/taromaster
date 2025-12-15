import { TarotCard } from './TarotCard';
import type { TarotCard as TarotCardType } from '../data/tarotCards';
import { tarotDeck } from '../data/tarotCards';
import './CardDeck.css';

interface CardDeckProps {
    onCardSelect?: (card: TarotCardType) => void;
    selectedCount: number;
    maxCards: number;
    isShuffling?: boolean;
    spreadCards?: boolean;
}

export function CardDeck({
    onCardSelect,
    selectedCount,
    maxCards,
    isShuffling = false,
    spreadCards = false
}: CardDeckProps) {
    // 덱에서 표시할 카드들 - 더 많은 카드를 보여줌
    const displayCards = tarotDeck.slice(0, spreadCards ? 15 : 22);

    const handleCardClick = (card: TarotCardType) => {
        if (selectedCount >= maxCards) return;
        onCardSelect?.(card);
    };

    return (
        <div className={`card-deck ${isShuffling ? 'shuffling' : ''} ${spreadCards ? 'spread' : 'stacked'}`}>
            {spreadCards ? (
                // 펼쳐진 형태 - 더 넓고 균등하게
                <div className="deck-spread">
                    {displayCards.map((card, index) => {
                        const centerOffset = index - (displayCards.length - 1) / 2;
                        const angle = centerOffset * 5; // 더 좁은 각도로 펼침
                        const yOffset = Math.abs(centerOffset) * 3; // 부드러운 아치형

                        return (
                            <div
                                key={card.id}
                                className="deck-card-wrapper"
                                style={{
                                    '--index': displayCards.length - Math.abs(centerOffset),
                                    '--total': displayCards.length,
                                    '--angle': `${angle}deg`,
                                    '--offset': `${yOffset}px`,
                                    zIndex: displayCards.length - Math.abs(Math.round(centerOffset))
                                } as React.CSSProperties}
                            >
                                <TarotCard
                                    card={card}
                                    isFlipped={false}
                                    isHoverable={selectedCount < maxCards}
                                    onClick={() => handleCardClick(card)}
                                    showWiggle={selectedCount < maxCards && index % 4 === 0}
                                    delay={index * 30}
                                />
                            </div>
                        );
                    })}
                </div>
            ) : (
                // 쌓인 형태
                <div className="deck-stack">
                    {displayCards.slice(0, 5).map((card, index) => (
                        <div
                            key={card.id}
                            className="stack-card"
                            style={{
                                '--stack-index': index,
                                transform: `translateY(${-index * 2}px) translateX(${index * 1}px)`
                            } as React.CSSProperties}
                        >
                            <TarotCard
                                card={card}
                                isFlipped={false}
                                isHoverable={false}
                            />
                        </div>
                    ))}

                    {/* 상단 클릭 가능 카드 */}
                    <div className="stack-top-card">
                        <TarotCard
                            card={displayCards[0]}
                            isFlipped={false}
                            isHoverable={true}
                            onClick={() => handleCardClick(displayCards[0])}
                        />
                    </div>
                </div>
            )}

            {/* 남은 카드 수 표시 */}
            <div className="deck-counter">
                {selectedCount} / {maxCards}
            </div>
        </div>
    );
}
