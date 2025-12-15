import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReading } from '../hooks/useReading';
import { useSettings } from '../hooks/useSettings';
import { TarotCard } from '../components/TarotCard';
import { CardModal } from '../components/CardModal';
import { TarotMaster } from '../components/TarotMaster';
import { DialogBubble } from '../components/DialogBubble';
import { CandleEffect } from '../components/CandleEffect';
import { getRandomDialog, readingStartDialogs, readingTransitionDialogs, silenceDialogs } from '../data/masterDialogs';
import { generatePersonalizedReading } from '../data/interpretations';
import type { TarotCard as TarotCardType } from '../data/tarotCards';
import './ReadingPage.css';

export function ReadingPage() {
    const navigate = useNavigate();
    const { state } = useReading();
    const { settings } = useSettings();

    const [currentCardIndex, setCurrentCardIndex] = useState(-1);
    const [phase, setPhase] = useState<'intro' | 'reveal' | 'interpret' | 'complete'>('intro');
    const [currentDialog, setCurrentDialog] = useState('');
    const [isTalking, setIsTalking] = useState(false);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [modalCard, setModalCard] = useState<{ card: TarotCardType; isReversed: boolean } | null>(null);

    const cards = state.selectedCards;

    const speedTiming = {
        slow: { reveal: 4000, interpret: 8000 },
        normal: { reveal: 3000, interpret: 6000 },
        fast: { reveal: 2000, interpret: 4000 }
    };

    const timing = speedTiming[settings.speed];

    // 카드가 없으면 홈으로 리다이렉트
    useEffect(() => {
        if (cards.length === 0) {
            navigate('/');
        }
    }, [cards.length, navigate]);

    useEffect(() => {
        // 시작 대사
        setCurrentDialog(getRandomDialog(readingStartDialogs, settings.masterStyle));
        setIsTalking(true);

        const introTimer = setTimeout(() => {
            setPhase('reveal');
            setCurrentCardIndex(0);
        }, timing.reveal);

        return () => clearTimeout(introTimer);
    }, []);

    useEffect(() => {
        if (phase !== 'reveal' || currentCardIndex < 0) return;

        const card = cards[currentCardIndex];
        if (!card) {
            setPhase('complete');
            return;
        }

        // 침묵 후 카드 공개
        setIsTalking(false);
        setCurrentDialog(getRandomDialog(silenceDialogs, settings.masterStyle));

        const silenceTimer = setTimeout(() => {
            setFlippedCards(prev => [...prev, currentCardIndex]);
            setPhase('interpret');
        }, 1500);

        return () => clearTimeout(silenceTimer);
    }, [currentCardIndex, phase]);

    useEffect(() => {
        if (phase !== 'interpret') return;

        const card = cards[currentCardIndex];
        if (!card) return;

        // 해석 대사 - 카테고리에 맞게 개인화
        const positionMeaning = state.spread?.positions[currentCardIndex]?.meaning || '';
        const interpretation = generatePersonalizedReading(
            card.card,
            card.isReversed,
            state.category,
            positionMeaning
        );

        setCurrentDialog(interpretation);
        setIsTalking(true);

        const interpretTimer = setTimeout(() => {
            if (currentCardIndex < cards.length - 1) {
                // 다음 카드로
                setPhase('reveal');
                setCurrentCardIndex(prev => prev + 1);
                setCurrentDialog(getRandomDialog(readingTransitionDialogs, settings.masterStyle));
            } else {
                // 리딩 완료
                setPhase('complete');
            }
        }, timing.interpret);

        return () => clearTimeout(interpretTimer);
    }, [phase, currentCardIndex]);

    const handleComplete = () => {
        navigate('/result');
    };

    return (
        <div className="reading-page">
            <CandleEffect position="left" />
            <CandleEffect position="right" />

            {/* 타로 마스터 (작게) */}
            <div className="reading-master">
                <TarotMaster
                    style={settings.masterStyle}
                    isTalking={isTalking}
                    lookAt={phase === 'interpret' ? 'user' : 'cards'}
                />
            </div>

            {/* 카드 스프레드 */}
            <div className="reading-spread">
                {cards.map((selected, index) => (
                    <div
                        key={selected.card.id}
                        className={`spread-card-wrapper ${currentCardIndex === index ? 'current' : ''}`}
                    >
                        {state.spread?.positions[index] && (
                            <div className="position-label">
                                {state.spread.positions[index].meaning}
                            </div>
                        )}
                        <TarotCard
                            card={selected.card}
                            isReversed={selected.isReversed}
                            isFlipped={flippedCards.includes(index)}
                            size="medium"
                            onClick={() => flippedCards.includes(index) && setModalCard({ card: selected.card, isReversed: selected.isReversed })}
                        />
                    </div>
                ))}
            </div>

            {/* 대화 영역 */}
            <div className="reading-dialog">
                {currentDialog && (
                    <DialogBubble
                        key={currentDialog}
                        text={currentDialog}
                        typingSpeed={settings.speed === 'fast' ? 25 : settings.speed === 'slow' ? 50 : 35}
                        showAvatar={false}
                    />
                )}
            </div>

            {/* 완료 버튼 */}
            {phase === 'complete' && (
                <div className="reading-complete">
                    <button
                        className="btn btn-primary"
                        onClick={handleComplete}
                    >
                        조언 받기
                    </button>
                </div>
            )}

            {/* 카드 확대 모달 */}
            {modalCard && (
                <CardModal
                    card={modalCard.card}
                    isReversed={modalCard.isReversed}
                    isOpen={true}
                    onClose={() => setModalCard(null)}
                />
            )}
        </div>
    );
}
