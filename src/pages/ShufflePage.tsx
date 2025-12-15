import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../hooks/useSettings';
import { DialogBubble } from '../components/DialogBubble';
import { CandleEffect } from '../components/CandleEffect';
import { getRandomDialog, shuffleDialogs } from '../data/masterDialogs';
import './ShufflePage.css';

export function ShufflePage() {
    const navigate = useNavigate();
    const { settings } = useSettings();

    const [isShuffling, setIsShuffling] = useState(false);
    const [shuffleCount, setShuffleCount] = useState(0);
    const [canProceed, setCanProceed] = useState(false);

    const requiredShuffles = 3;
    const dialog = getRandomDialog(shuffleDialogs, settings.masterStyle);

    const handleShuffle = () => {
        if (isShuffling) return;

        setIsShuffling(true);
        setShuffleCount(prev => prev + 1);

        // 더 긴 애니메이션 시간
        setTimeout(() => {
            setIsShuffling(false);
            if (shuffleCount + 1 >= requiredShuffles) {
                setCanProceed(true);
            }
        }, 1500);
    };

    const handleProceed = () => {
        navigate('/select');
    };

    // 자동 셔플 옵션
    useEffect(() => {
        if (settings.speed === 'fast') {
            const autoShuffle = setInterval(() => {
                if (shuffleCount < requiredShuffles) {
                    handleShuffle();
                }
            }, 1800);

            return () => clearInterval(autoShuffle);
        }
    }, [shuffleCount, settings.speed]);

    return (
        <div className="shuffle-page">
            <CandleEffect position="left" size="small" />
            <CandleEffect position="right" size="small" />

            {/* 안내 대화 */}
            <div className="shuffle-dialog">
                <DialogBubble
                    text={dialog}
                    typingSpeed={40}
                />
            </div>

            {/* 셔플 영역 */}
            <div className="shuffle-area">
                <div className={`deck-visual ${isShuffling ? 'shuffling' : ''}`}>
                    {/* 마법 링 */}
                    {isShuffling && <div className="magic-ring" />}

                    {/* 오라 효과 */}
                    {isShuffling && <div className="shuffle-aura" />}

                    {/* 카드 덱 시각화 */}
                    <div className="deck-stack">
                        {[...Array(7)].map((_, i) => (
                            <div
                                key={i}
                                className="deck-card"
                                style={{
                                    '--index': i,
                                    transform: `translateY(${-i * 4}px) translateX(${i * 1.5}px) rotateZ(${(i - 3) * 1.5}deg)`,
                                    zIndex: 7 - i
                                } as React.CSSProperties}
                            />
                        ))}
                    </div>

                    {/* 마법 파티클 - 더 많은 파티클 */}
                    {isShuffling && (
                        <div className="shuffle-particles">
                            {[...Array(24)].map((_, i) => (
                                <div
                                    key={i}
                                    className="particle"
                                    style={{
                                        '--angle': `${i * 15}deg`,
                                        '--delay': `${i * 0.04}s`
                                    } as React.CSSProperties}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* 셔플 진행률 */}
                <div className="shuffle-progress">
                    <div className="progress-dots">
                        {[...Array(requiredShuffles)].map((_, i) => (
                            <div
                                key={i}
                                className={`progress-dot ${i < shuffleCount ? 'filled' : ''}`}
                            />
                        ))}
                    </div>
                    <span className="progress-text">{shuffleCount} / {requiredShuffles}</span>
                </div>
            </div>

            {/* 액션 버튼 */}
            <div className="shuffle-actions">
                {!canProceed ? (
                    <button
                        className="shuffle-btn"
                        onClick={handleShuffle}
                        disabled={isShuffling}
                    >
                        <span className="btn-icon">🔀</span>
                        <span className="btn-text">카드 섞기</span>
                    </button>
                ) : (
                    <button
                        className="btn btn-primary proceed-btn"
                        onClick={handleProceed}
                    >
                        카드 선택하기
                    </button>
                )}
            </div>

            {/* 힌트 */}
            <div className="shuffle-hint">
                <p>
                    {canProceed
                        ? '준비가 되었습니다. 카드를 선택해주세요.'
                        : '버튼을 클릭하여 카드를 섞어주세요.'}
                </p>
            </div>
        </div>
    );
}
