import { useEffect, useState } from 'react';
import type { TarotCard as TarotCardType } from '../data/tarotCards';
import './CardModal.css';

interface CardModalProps {
    card: TarotCardType;
    isReversed?: boolean;
    isOpen: boolean;
    onClose: () => void;
}

export function CardModal({ card, isReversed = false, isOpen, onClose }: CardModalProps) {
    const [animationPhase, setAnimationPhase] = useState<'entering' | 'visible' | 'exiting'>('entering');

    useEffect(() => {
        if (isOpen) {
            setAnimationPhase('entering');
            // 회전 애니메이션 후 visible 상태로 전환
            const timer = setTimeout(() => {
                setAnimationPhase('visible');
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleClose = () => {
        setAnimationPhase('exiting');
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const getArcanaSymbol = () => {
        if (card.arcana === 'major') return card.id.toString().padStart(2, '0');

        const suitSymbols = {
            wands: '🔥',
            cups: '💧',
            swords: '⚔️',
            pentacles: '⭐'
        };
        return card.suit ? suitSymbols[card.suit] : '✧';
    };

    if (!isOpen) return null;

    return (
        <div
            className={`card-modal-backdrop ${animationPhase}`}
            onClick={handleBackdropClick}
        >
            <div className={`card-modal-content ${animationPhase} ${isReversed ? 'reversed' : ''}`}>
                {/* 빛나는 후광 효과 */}
                <div className="card-modal-glow"></div>

                {/* 카드 이미지 */}
                <div className="card-modal-card">
                    <div className={`card-modal-inner ${isReversed ? 'reversed' : ''}`}>
                        {card.image ? (
                            <img
                                src={card.image}
                                alt={card.nameKr}
                                className="card-modal-image"
                            />
                        ) : (
                            <div className="card-modal-placeholder">
                                <div className="modal-mystical-bg">
                                    <div className="modal-mystical-circle"></div>
                                    <div className="modal-mystical-rays"></div>
                                </div>
                                <div className="modal-card-symbol">
                                    {card.arcana === 'major' ? '☆' : getArcanaSymbol()}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 카드 정보 */}
                <div className="card-modal-info">
                    <span className="card-modal-number">{getArcanaSymbol()}</span>
                    <h2 className="card-modal-name-kr">{card.nameKr}</h2>
                    <p className="card-modal-name-en">{card.name}</p>
                    {isReversed && <span className="card-modal-reversed">역방향</span>}
                    <p className="card-modal-meaning">
                        {isReversed ? card.reversed : card.upright}
                    </p>
                </div>

                {/* 닫기 버튼 */}
                <button className="card-modal-close" onClick={handleClose}>
                    ✕
                </button>
            </div>
        </div>
    );
}
