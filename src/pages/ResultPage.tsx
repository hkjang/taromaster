import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { useReading } from '../hooks/useReading';
import { useSettings } from '../hooks/useSettings';
import { useHistory } from '../hooks/useHistory';
import { useAISettings } from '../hooks/useAISettings';
import { TarotCard } from '../components/TarotCard';
import { CardModal } from '../components/CardModal';
import { DialogBubble } from '../components/DialogBubble';
import { CandleEffect } from '../components/CandleEffect';
import { AIAdviceSection } from '../components/AIAdviceSection';
import { TipPayment } from '../components/TipPayment';
import { getRandomDialog, closingDialogs } from '../data/masterDialogs';
import { generateReadingSummary, generatePersonalizedReading } from '../data/interpretations';
import type { TarotCard as TarotCardType } from '../data/tarotCards';
import './ResultPage.css';

export function ResultPage() {
    const navigate = useNavigate();
    const { state, reset } = useReading();
    const { settings } = useSettings();
    const { saveReading } = useHistory();
    const { settings: aiSettings, isAvailable: isAIAvailable } = useAISettings();

    const [saved, setSaved] = useState(false);
    const [memo, setMemo] = useState('');
    const [showMemoInput, setShowMemoInput] = useState(false);
    const [modalCard, setModalCard] = useState<{ card: TarotCardType; isReversed: boolean } | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const resultRef = useRef<HTMLDivElement>(null);

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

    const handleSaveAsImage = async () => {
        if (!resultRef.current || isSaving) return;

        setIsSaving(true);
        try {
            // 1. 임시 컨테이너 생성 (화면 밖에 배치)
            const tempContainer = document.createElement('div');
            tempContainer.style.cssText = `
                position: absolute;
                left: -9999px;
                top: 0;
                width: ${resultRef.current.scrollWidth}px;
                background: linear-gradient(180deg, #0d0d1a 0%, #1a1a2e 50%, #0d0d1a 100%);
                padding: 32px;
                font-family: 'Noto Serif KR', serif;
                color: #f5f5f5;
            `;
            document.body.appendChild(tempContainer);

            // 2. 결과 페이지 내용 복제
            const clone = resultRef.current.cloneNode(true) as HTMLElement;

            // 3. 모든 요소에 computed style 적용 (먼저 스타일 적용 후 요소 제거)
            const applyStyles = (original: Element, cloned: Element) => {
                if (original instanceof HTMLElement && cloned instanceof HTMLElement) {
                    const computed = window.getComputedStyle(original);
                    cloned.style.cssText = `
                        color: ${computed.color};
                        background: ${computed.background};
                        background-color: ${computed.backgroundColor};
                        font-family: ${computed.fontFamily};
                        font-size: ${computed.fontSize};
                        font-weight: ${computed.fontWeight};
                        line-height: ${computed.lineHeight};
                        padding: ${computed.padding};
                        margin: ${computed.margin};
                        border: ${computed.border};
                        border-left: ${computed.borderLeft};
                        border-radius: ${computed.borderRadius};
                        box-shadow: ${computed.boxShadow};
                        text-shadow: ${computed.textShadow};
                        display: ${computed.display};
                        flex-direction: ${computed.flexDirection};
                        align-items: ${computed.alignItems};
                        justify-content: ${computed.justifyContent};
                        flex-wrap: ${computed.flexWrap};
                        gap: ${computed.gap};
                        width: ${computed.width};
                        height: ${computed.height};
                        max-width: ${computed.maxWidth};
                        text-align: ${computed.textAlign};
                        white-space: ${computed.whiteSpace};
                    `;
                }

                const originalChildren = original.children;
                const clonedChildren = cloned.children;
                for (let i = 0; i < originalChildren.length; i++) {
                    if (clonedChildren[i]) {
                        applyStyles(originalChildren[i], clonedChildren[i]);
                    }
                }
            };

            applyStyles(resultRef.current, clone);

            // 4. 스타일 적용 후 불필요한 요소 제거
            clone.querySelectorAll('.candle-effect, .result-actions').forEach(el => el.remove());

            // 클론의 기본 스타일 설정
            clone.style.background = 'transparent';
            clone.style.padding = '0';
            clone.style.minHeight = 'auto';
            clone.style.height = 'auto';

            tempContainer.appendChild(clone);

            // 4. 이미지 로드 대기
            const images = tempContainer.querySelectorAll('img');
            await Promise.all(Array.from(images).map(img => {
                if (img.complete) return Promise.resolve();
                return new Promise(resolve => {
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            }));

            // 5. 캡처
            const canvas = await html2canvas(tempContainer, {
                backgroundColor: '#0d0d1a',
                scale: 2,
                useCORS: true,
                allowTaint: true,
                logging: false
            });

            // 6. 다운로드
            const link = document.createElement('a');
            link.download = `tarot-reading-${new Date().toISOString().split('T')[0]}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();

            // 7. 정리
            document.body.removeChild(tempContainer);
        } catch (error) {
            console.error('이미지 저장 실패:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="result-page" ref={resultRef}>
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
                                onClick={() => setModalCard({ card: selected.card, isReversed: selected.isReversed })}
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

            {/* AI 추가 조언 */}
            <AIAdviceSection
                cards={cards}
                category={state.category}
                question={state.question}
                aiConfig={aiSettings}
                isAvailable={isAIAvailable}
            />

            {/* 복채 (팁) */}
            <TipPayment />

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
                    className="btn btn-secondary"
                    onClick={handleSaveAsImage}
                    disabled={isSaving}
                >
                    {isSaving ? '저장 중...' : '🖼️ 이미지 저장'}
                </button>

                <button
                    className="btn btn-primary"
                    onClick={handleNewReading}
                >
                    🔮 새로운 리딩
                </button>
            </div>

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
