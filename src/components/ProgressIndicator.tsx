import type { ReadingStep } from '../hooks/useReading';
import './ProgressIndicator.css';

interface ProgressIndicatorProps {
    currentStep: ReadingStep;
}

const steps: { key: ReadingStep; label: string; icon: string }[] = [
    { key: 'entrance', label: '입장', icon: '🚪' },
    { key: 'question', label: '질문', icon: '❓' },
    { key: 'masterAppear', label: '만남', icon: '✧' },
    { key: 'shuffle', label: '셔플', icon: '🔀' },
    { key: 'select', label: '선택', icon: '👆' },
    { key: 'reveal', label: '공개', icon: '🃏' },
    { key: 'reading', label: '리딩', icon: '📖' },
    { key: 'result', label: '결과', icon: '✨' }
];

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
    const currentIndex = steps.findIndex(s => s.key === currentStep);

    return (
        <div className="progress-indicator">
            <div className="progress-track">
                <div
                    className="progress-fill"
                    style={{
                        width: `${((currentIndex + 1) / steps.length) * 100}%`
                    }}
                />
            </div>

            <div className="progress-dots">
                {steps.map((step, index) => (
                    <div
                        key={step.key}
                        className={`progress-dot ${index <= currentIndex ? 'active' : ''} ${index === currentIndex ? 'current' : ''}`}
                        title={step.label}
                    >
                        <span className="dot-icon">{step.icon}</span>
                    </div>
                ))}
            </div>

            <div className="progress-label">
                {steps[currentIndex]?.label}
            </div>
        </div>
    );
}
