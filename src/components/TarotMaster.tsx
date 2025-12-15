import { useState, useEffect } from 'react';
import type { MasterStyle } from '../data/masterDialogs';
import './TarotMaster.css';

interface TarotMasterProps {
    style: MasterStyle;
    isTalking?: boolean;
    lookAt?: 'user' | 'cards' | 'thinking';
}

export function TarotMaster({
    style,
    isTalking = false,
    lookAt = 'user'
}: TarotMasterProps) {
    const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const positions = {
            user: { x: 0, y: 0 },
            cards: { x: -3, y: 3 },
            thinking: { x: 2, y: -2 }
        };

        setEyePosition(positions[lookAt]);
    }, [lookAt]);

    return (
        <div className={`tarot-master ${style} ${isTalking ? 'talking' : ''}`}>
            <div className="master-aura">
                <div className="aura-ring ring-1"></div>
                <div className="aura-ring ring-2"></div>
                <div className="aura-ring ring-3"></div>
            </div>

            <div className="master-figure">
                {/* 후드 */}
                <div className="master-hood">
                    <div className="hood-shadow"></div>
                </div>

                {/* 얼굴 */}
                <div className="master-face">
                    {/* 눈 */}
                    <div className="master-eyes">
                        <div
                            className="eye left"
                            style={{
                                transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`
                            }}
                        >
                            <div className="eye-glow"></div>
                        </div>
                        <div
                            className="eye right"
                            style={{
                                transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`
                            }}
                        >
                            <div className="eye-glow"></div>
                        </div>
                    </div>

                    {/* 입 (말할 때 움직임) */}
                    <div className={`master-mouth ${isTalking ? 'talking' : ''}`}>
                        <div className="mouth-inner"></div>
                    </div>
                </div>

                {/* 로브 */}
                <div className="master-robe">
                    <div className="robe-fold fold-1"></div>
                    <div className="robe-fold fold-2"></div>
                    <div className="robe-symbol">✧</div>
                </div>

                {/* 손 */}
                <div className="master-hands">
                    <div className="hand left">
                        <div className="hand-glow"></div>
                    </div>
                    <div className="hand right">
                        <div className="hand-glow"></div>
                    </div>
                </div>
            </div>

            {/* 스타일 표시 배지 */}
            <div className="master-style-badge">
                {style === 'comforting' ? '🌙 위로형' : '⚡ 직설형'}
            </div>
        </div>
    );
}
