import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReading } from '../hooks/useReading';
import type { QuestionCategory } from '../hooks/useReading';
import { DialogBubble } from '../components/DialogBubble';
import { CandleEffect } from '../components/CandleEffect';
import { spreads } from '../data/spreads';
import type { Spread } from '../data/spreads';
import './QuestionPage.css';

const categories: { key: QuestionCategory; label: string; icon: string; desc: string }[] = [
    { key: 'love', label: '사랑', icon: '💕', desc: '연애, 짝사랑, 관계' },
    { key: 'work', label: '일/커리어', icon: '💼', desc: '직장, 진로, 성장' },
    { key: 'relationship', label: '인간관계', icon: '🤝', desc: '가족, 친구, 동료' },
    { key: 'money', label: '재정', icon: '💰', desc: '돈, 투자, 기회' },
    { key: 'health', label: '건강', icon: '🌿', desc: '몸, 마음, 에너지' },
    { key: 'general', label: '일반', icon: '🔮', desc: '전체 운세, 조언' }
];

export function QuestionPage() {
    const navigate = useNavigate();
    const { setQuestion, dispatch } = useReading();

    const [step, setStep] = useState<'category' | 'question' | 'spread'>('category');
    const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | null>(null);
    const [questionText, setQuestionText] = useState('');
    const [selectedSpread, setSelectedSpread] = useState<Spread | null>(null);

    const handleCategorySelect = (category: QuestionCategory) => {
        setSelectedCategory(category);
        setStep('question');
    };

    const handleQuestionSubmit = () => {
        if (!selectedCategory) return;

        const finalQuestion = questionText.trim() || `${categories.find(c => c.key === selectedCategory)?.label}에 대한 조언`;
        setQuestion(finalQuestion, selectedCategory);
        setStep('spread');
    };

    const handleSpreadSelect = (spread: Spread) => {
        setSelectedSpread(spread);
        dispatch({ type: 'SET_SPREAD', payload: spread });

        // 다음 페이지로 이동
        setTimeout(() => {
            navigate('/master');
        }, 500);
    };

    return (
        <div className="question-page">
            <CandleEffect position="left" size="small" />
            <CandleEffect position="right" size="small" />

            {/* 카테고리 선택 */}
            {step === 'category' && (
                <div className="question-section">
                    <DialogBubble
                        text="어떤 이야기를 나누고 싶으신가요?"
                        typingSpeed={40}
                    />

                    <div className="category-grid">
                        {categories.map((cat, index) => (
                            <button
                                key={cat.key}
                                className="category-card"
                                onClick={() => handleCategorySelect(cat.key)}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <span className="category-icon">{cat.icon}</span>
                                <span className="category-label">{cat.label}</span>
                                <span className="category-desc">{cat.desc}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* 질문 입력 */}
            {step === 'question' && selectedCategory && (
                <div className="question-section">
                    <DialogBubble
                        text={`${categories.find(c => c.key === selectedCategory)?.label || '이 주제'}에 대해 궁금한 것이 있으시군요. 더 구체적인 질문이 있다면 적어주세요.`}
                        typingSpeed={40}
                    />

                    <div className="question-input-area">
                        <textarea
                            className="question-input"
                            placeholder="질문을 입력하세요... (비워두셔도 됩니다)"
                            value={questionText}
                            onChange={e => setQuestionText(e.target.value)}
                            rows={3}
                        />

                        <div className="question-actions">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setStep('category')}
                            >
                                다시 선택
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleQuestionSubmit}
                            >
                                다음으로
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 스프레드 선택 */}
            {step === 'spread' && (
                <div className="question-section">
                    <DialogBubble
                        text="어떤 방식으로 카드를 펼쳐볼까요?"
                        typingSpeed={40}
                    />

                    <div className="spread-grid">
                        {spreads.slice(0, 4).map((spread, index) => (
                            <button
                                key={spread.id}
                                className={`spread-card ${selectedSpread?.id === spread.id ? 'selected' : ''}`}
                                onClick={() => handleSpreadSelect(spread)}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="spread-cards-preview">
                                    {[...Array(Math.min(spread.cardCount, 5))].map((_, i) => (
                                        <div key={i} className="mini-card" style={{
                                            transform: `rotate(${(i - 2) * 15}deg) translateY(${Math.abs(i - 2) * 5}px)`
                                        }} />
                                    ))}
                                </div>
                                <span className="spread-name">{spread.nameKr}</span>
                                <span className="spread-count">{spread.cardCount}장</span>
                                <span className="spread-desc">{spread.description}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
