import { useState } from 'react';
import type { TarotCard as TarotCardType } from '../data/tarotCards';
import './TarotCard.css';

interface TarotCardProps {
    card?: TarotCardType;
    isReversed?: boolean;
    isFlipped?: boolean;
    isSelected?: boolean;
    isHoverable?: boolean;
    onClick?: () => void;
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    showWiggle?: boolean;
    delay?: number;
}

export function TarotCard({
    card,
    isReversed = false,
    isFlipped = false,
    isSelected = false,
    isHoverable = false,
    onClick,
    size = 'medium',
    showWiggle = false,
    delay = 0
}: TarotCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const getArcanaSymbol = () => {
        if (!card) return '✧';
        if (card.arcana === 'major') return card.id.toString().padStart(2, '0');

        const suitSymbols = {
            wands: '🔥',
            cups: '💧',
            swords: '⚔️',
            pentacles: '⭐'
        };
        return card.suit ? suitSymbols[card.suit] : '✧';
    };

    return (
        <div
            className={`tarot-card flip-card ${size} ${isFlipped ? 'flipped' : ''} ${isSelected ? 'selected' : ''} ${isHoverable ? 'hoverable' : ''} ${showWiggle ? 'wiggle' : ''}`}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                animationDelay: `${delay}ms`,
                transform: isReversed && isFlipped ? 'rotateY(180deg) rotate(180deg)' : undefined
            }}
        >
            <div className="flip-card-inner">
                {/* 카드 뒷면 */}
                <div className="flip-card-back card-back">
                    <div className="card-back-pattern">
                        <div className="pattern-outer">
                            <div className="pattern-inner">
                                <span className="card-symbol">✧</span>
                            </div>
                        </div>
                    </div>
                    <div className="card-glow"></div>
                </div>

                {/* 카드 앞면 */}
                <div className={`flip-card-front card-front ${isReversed ? 'reversed' : ''}`}>
                    {card && (
                        <>
                            <div className="card-header">
                                <span className="card-number">{getArcanaSymbol()}</span>
                            </div>

                            <div className="card-image-area">
                                {card.image ? (
                                    <img
                                        src={card.image}
                                        alt={card.nameKr}
                                        className="card-artwork"
                                    />
                                ) : (
                                    <>
                                        <div className="card-mystical-bg">
                                            <div className="mystical-circle"></div>
                                            <div className="mystical-rays"></div>
                                        </div>
                                        <div className="card-symbol-large">
                                            {card.arcana === 'major' ? '☆' : getArcanaSymbol()}
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="card-title">
                                <span className="card-name-kr">{card.nameKr}</span>
                                <span className="card-name-en">{card.name}</span>
                            </div>

                            {isReversed && (
                                <div className="reversed-indicator">역방향</div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {isHovered && isHoverable && !isFlipped && (
                <div className="card-hover-glow"></div>
            )}
        </div>
    );
}
