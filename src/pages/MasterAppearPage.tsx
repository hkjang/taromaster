import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReading } from '../hooks/useReading';
import { useSettings } from '../hooks/useSettings';
import { TarotMaster } from '../components/TarotMaster';
import { DialogBubble } from '../components/DialogBubble';
import { CandleEffect } from '../components/CandleEffect';
import { getRandomDialog, entranceDialogs, questionDialogs, emotionResponses } from '../data/masterDialogs';
import './MasterAppearPage.css';

export function MasterAppearPage() {
    const navigate = useNavigate();
    const { state } = useReading();
    const { settings } = useSettings();

    const [phase, setPhase] = useState<'appearing' | 'greeting' | 'reacting' | 'ready'>('appearing');
    const [currentDialog, setCurrentDialog] = useState('');
    const [isTalking, setIsTalking] = useState(false);

    useEffect(() => {
        const timings = {
            slow: { appear: 2000, greet: 4000, react: 7000, ready: 10000 },
            normal: { appear: 1500, greet: 3000, react: 5500, ready: 8000 },
            fast: { appear: 1000, greet: 2000, react: 4000, ready: 6000 }
        };

        const t = timings[settings.speed];

        // Phase 1: 등장
        setTimeout(() => {
            setPhase('greeting');
            setCurrentDialog(getRandomDialog(entranceDialogs, settings.masterStyle));
            setIsTalking(true);
        }, t.appear);

        // Phase 2: 인사 후 반응
        setTimeout(() => {
            setPhase('reacting');
            setIsTalking(false);
            const response = emotionResponses[state.category] || emotionResponses.general;
            setCurrentDialog(settings.masterStyle === 'comforting' ? response.comforting : response.direct);
            setTimeout(() => setIsTalking(true), 300);
        }, t.greet);

        // Phase 3: 준비 완료
        setTimeout(() => {
            setPhase('ready');
            setIsTalking(false);
            setCurrentDialog(getRandomDialog(questionDialogs, settings.masterStyle));
            setTimeout(() => setIsTalking(true), 300);
        }, t.react);

        // 다음 페이지로 이동
        setTimeout(() => {
            navigate('/shuffle');
        }, t.ready);
    }, [navigate, settings.speed, settings.masterStyle, state.category]);

    return (
        <div className="master-appear-page">
            <CandleEffect position="left" />
            <CandleEffect position="right" />

            {/* 타로 마스터 */}
            <div className={`master-container ${phase}`}>
                <TarotMaster
                    style={settings.masterStyle}
                    isTalking={isTalking}
                    lookAt={phase === 'greeting' ? 'user' : phase === 'reacting' ? 'thinking' : 'user'}
                />
            </div>

            {/* 대화 영역 */}
            <div className="dialog-area">
                {currentDialog && (
                    <DialogBubble
                        key={currentDialog}
                        text={currentDialog}
                        typingSpeed={settings.speed === 'fast' ? 30 : settings.speed === 'slow' ? 60 : 45}
                        onComplete={() => { }}
                    />
                )}
            </div>

            {/* 안내 메시지 */}
            <div className={`hint-area ${phase === 'ready' ? 'visible' : ''}`}>
                <p>카드를 섞으러 갑니다...</p>
            </div>
        </div>
    );
}
