import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReading } from '../hooks/useReading';
import { useSettings } from '../hooks/useSettings';
import { useHistory } from '../hooks/useHistory';
import { TarotCard } from '../components/TarotCard';
import { DialogBubble } from '../components/DialogBubble';
import { CandleEffect } from '../components/CandleEffect';
import { getRandomDialog, closingDialogs } from '../data/masterDialogs';
import { generateReadingSummary, generatePersonalizedReading } from '../data/interpretations';
import './ResultPage.css';

export function ResultPage() {
    const navigate = useNavigate();
    const { state, reset } = useReading();
    const { settings } = useSettings();
    const { saveReading } = useHistory();

    const [saved, setSaved] = useState(false);
    const [memo, setMemo] = useState('');
    const [showMemoInput, setShowMemoInput] = useState(false);

    const cards = state.selectedCards;

    // 카드가 없으면 홈으로 리다이렉트
    useEffect(() => {
        if (cards.length === 0) {
            navigate('/');
        }
    }, [cards.length, navigate]);

    // 핵심 메시지 생성 - 질문과 카테고리를 반영
    const generateCoreMessage = () => {
        if (cards.length === 0) return '카드를 선택해주세요.';

        return generateReadingSummary(
            cards.map(c => ({ card: c.card, isReversed: c.isReversed })),
            state.category,
            state.question || '오늘의 운세'
        );
    };

    // 행동 가이드 생성 - 카테고리별 개인화
    const generateActionGuide = () => {
        if (cards.length === 0) return [];

        return cards.map((selected, index) => {
            const positionMeaning = state.spread?.positions[index]?.meaning || '';
            return {
                card: selected.card.nameKr,
                position: positionMeaning,
                action: generatePersonalizedReading(
                    selected.card,
                    selected.isReversed,
                    state.category,
                    positionMeaning
                )
            };
        });
    };

    const handleSave = () => {
        if (settings.saveHistory && state.spread) {
            saveReading(
                state.question,
                state.category,
                state.spread.id,
                state.selectedCards,
                memo
            );
            setSaved(true);
        }
    };

    const handleNewReading = () => {
        reset();
        navigate('/');
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: '타로 마스터 리딩 결과',
                    text: `오늘의 타로 메시지: ${generateCoreMessage()}`,
                    url: window.location.origin
                });
            } catch (err) {
                console.log('공유 취소됨');
            }
        }
    };

    return (
        <div className="result-page">
            <CandleEffect position="left" size="small" />
            <CandleEffect position="right" size="small" />

            {/* 헤더 */}
            <div className="result-header">
                <h1>✧ 오늘의 리딩 ✧</h1>
                <p className="result-date">{new Date().toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long'
                })}</p>
            </div>

            {/* 핵심 메시지 */}
            <div className="core-message">
                <DialogBubble
                    text={generateCoreMessage()}
                    isTyping={false}
                    showAvatar={false}
                />
            </div>

            {/* 카드 요약 */}
            <div className="cards-summary">
                <h2>선택한 카드</h2>
                <div className="summary-cards">
                    {cards.map((selected, index) => (
                        <div key={selected.card.id} className="summary-card">
                            <TarotCard
                                card={selected.card}
                                isReversed={selected.isReversed}
                                isFlipped={true}
                                size="small"
                            />
                            <div className="card-info">
                                <span className="card-position">
                                    {state.spread?.positions[index]?.meaning}
                                </span>
                                <span className="card-meaning">
                                    {selected.isReversed ? selected.card.reversed : selected.card.upright}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 행동 가이드 */}
            <div className="action-guide">
                <h2>오늘의 조언</h2>
                <div className="advice-list">
                    {generateActionGuide().map((item, index) => (
                        <div key={index} className="advice-item">
                            <span className="advice-card">{item.card}</span>
                            <p className="advice-text">{item.action}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 마무리 인사 */}
            <div className="closing-message">
                <DialogBubble
                    text={getRandomDialog(closingDialogs, settings.masterStyle)}
                    isTyping={false}
                    showAvatar={true}
                />
            </div>

            {/* 메모 입력 */}
            {showMemoInput && (
                <div className="memo-section">
                    <textarea
                        className="memo-input"
                        placeholder="이 리딩에 대한 메모를 남겨보세요..."
                        value={memo}
                        onChange={e => setMemo(e.target.value)}
                        rows={3}
                    />
                </div>
            )}

            {/* 액션 버튼 */}
            <div className="result-actions">
                {settings.saveHistory && !saved && (
                    <>
                        <button
                            className="btn btn-secondary"
                            onClick={() => setShowMemoInput(!showMemoInput)}
                        >
                            📝 메모 추가
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleSave}
                        >
                            💾 저장하기
                        </button>
                    </>
                )}

                {saved && (
                    <div className="saved-message">
                        ✓ 리딩이 저장되었습니다
                    </div>
                )}

                <button
                    className="btn btn-secondary"
                    onClick={handleShare}
                >
                    📤 공유하기
                </button>

                <button
                    className="btn btn-primary"
                    onClick={handleNewReading}
                >
                    🔮 새로운 리딩
                </button>
            </div>
        </div>
    );
}
