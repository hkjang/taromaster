import { useState, useEffect, useCallback } from 'react';
import type { SelectedCard, QuestionCategory } from '../hooks/useReading';
import type { AIConfig } from '../hooks/useAISettings';
import { generateAdvice } from '../services/aiService';
import { buildAdvicePrompt } from '../services/aiPromptBuilder';
import './AIAdviceSection.css';

interface AIAdviceSectionProps {
    cards: SelectedCard[];
    category: QuestionCategory;
    question: string;
    aiConfig: AIConfig;
    isAvailable: boolean;
}

export function AIAdviceSection({
    cards,
    category,
    question,
    aiConfig,
    isAvailable
}: AIAdviceSectionProps) {
    const [advice, setAdvice] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const [shouldShow, setShouldShow] = useState(false);

    const fetchAdvice = useCallback(async () => {
        if (!isAvailable || cards.length === 0) return;

        setIsLoading(true);

        try {
            const messages = buildAdvicePrompt(cards, category, question);
            const result = await generateAdvice(aiConfig, messages);

            if (result.success && result.content) {
                setAdvice(result.content);
            }
            // 실패 시 조용히 생략 - 에러 메시지 없음
        } catch {
            // 에러 발생 시 조용히 생략
        } finally {
            setIsLoading(false);
        }
    }, [isAvailable, cards, category, question, aiConfig]);

    useEffect(() => {
        if (!isAvailable) return;

        // 정적 시간 후 API 호출 (1.5초 대기)
        const delayTimer = setTimeout(() => {
            setShouldShow(true);
            fetchAdvice();
        }, 1500);

        return () => clearTimeout(delayTimer);
    }, [isAvailable, fetchAdvice]);

    // AI가 비활성화되었거나, 닫혔거나, 아직 표시할 시간이 아니면 렌더링하지 않음
    if (!isAvailable || dismissed || !shouldShow) {
        return null;
    }

    // 로딩 중일 때
    if (isLoading) {
        return (
            <div className="ai-advice-section">
                <div className="ai-advice-header">
                    <div className="ai-advice-title">
                        <h3>✨ 오늘의 추가 조언</h3>
                        <span className="ai-badge">AI</span>
                    </div>
                </div>
                <div className="ai-advice-loading">
                    <div className="ai-advice-shimmer" style={{ width: '100%' }} />
                    <div className="ai-advice-shimmer" style={{ width: '90%' }} />
                    <div className="ai-advice-shimmer" style={{ width: '75%' }} />
                </div>
            </div>
        );
    }

    // 조언이 없으면 (실패했으면) 아무것도 표시하지 않음
    if (!advice) {
        return null;
    }

    return (
        <div className="ai-advice-section entering">
            <div className="ai-advice-header">
                <div className="ai-advice-title">
                    <h3>✨ 오늘의 추가 조언</h3>
                    <span className="ai-badge">AI</span>
                </div>
                <button
                    className="ai-advice-close"
                    onClick={() => setDismissed(true)}
                    aria-label="닫기"
                >
                    ✕
                </button>
            </div>
            <div className="ai-advice-content">
                <p>{advice}</p>
            </div>
        </div>
    );
}
