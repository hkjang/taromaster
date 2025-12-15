import { useState, useEffect } from 'react';
import './DialogBubble.css';

interface DialogBubbleProps {
    text: string;
    isTyping?: boolean;
    typingSpeed?: number;
    onComplete?: () => void;
    showAvatar?: boolean;
    avatarPosition?: 'left' | 'right';
}

export function DialogBubble({
    text,
    isTyping = true,
    typingSpeed = 50,
    onComplete,
    showAvatar = true,
    avatarPosition = 'left'
}: DialogBubbleProps) {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(!isTyping);

    useEffect(() => {
        if (!isTyping) {
            setDisplayedText(text);
            setIsComplete(true);
            return;
        }

        setDisplayedText('');
        setIsComplete(false);

        let index = 0;
        const timer = setInterval(() => {
            if (index < text.length) {
                const char = text[index];
                if (char !== undefined) {
                    setDisplayedText(prev => prev + char);
                }
                index++;
            } else {
                clearInterval(timer);
                setIsComplete(true);
                onComplete?.();
            }
        }, typingSpeed);

        return () => clearInterval(timer);
    }, [text, isTyping, typingSpeed, onComplete]);

    return (
        <div className={`dialog-container ${avatarPosition}`}>
            {showAvatar && (
                <div className="dialog-avatar">
                    <div className="avatar-inner">
                        <span className="avatar-icon">✧</span>
                    </div>
                </div>
            )}

            <div className="dialog-bubble">
                <div className="bubble-content">
                    <p className="dialog-text">
                        {displayedText}
                        {!isComplete && <span className="typing-cursor"></span>}
                    </p>
                </div>
                <div className="bubble-tail"></div>
            </div>
        </div>
    );
}
