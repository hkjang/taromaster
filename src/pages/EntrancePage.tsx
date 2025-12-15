import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CandleEffect } from '../components/CandleEffect';
import './EntrancePage.css';

export function EntrancePage() {
    const [phase, setPhase] = useState<'closed' | 'opening' | 'open'>('closed');
    const navigate = useNavigate();

    useEffect(() => {
        // 자동으로 문 열기 시작
        const timer1 = setTimeout(() => setPhase('opening'), 500);
        const timer2 = setTimeout(() => setPhase('open'), 2000);
        const timer3 = setTimeout(() => navigate('/question'), 3500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [navigate]);

    return (
        <div className="entrance-page">
            {/* 배경 */}
            <div className="entrance-background">
                <div className="stars">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="star"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* 문 */}
            <div className={`door-container ${phase}`}>
                <div className="door-frame">
                    <div className="door-left">
                        <div className="door-panel">
                            <div className="door-ornament">✧</div>
                        </div>
                    </div>
                    <div className="door-right">
                        <div className="door-panel">
                            <div className="door-ornament">✧</div>
                        </div>
                    </div>
                </div>

                {/* 문 뒤의 빛 */}
                <div className="door-light"></div>
            </div>

            {/* 타이틀 */}
            <div className={`entrance-title ${phase === 'open' ? 'visible' : ''}`}>
                <h1>타로 마스터</h1>
                <p>당신의 운명을 읽어드립니다</p>
            </div>

            {/* 촛불 효과 */}
            {phase === 'open' && (
                <>
                    <CandleEffect position="left" />
                    <CandleEffect position="right" />
                </>
            )}

            {/* 로딩 힌트 */}
            <div className={`entrance-hint ${phase === 'open' ? 'visible' : ''}`}>
                <span className="hint-text">잠시만 기다려주세요...</span>
                <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    );
}
