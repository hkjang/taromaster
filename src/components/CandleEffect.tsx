import './CandleEffect.css';

interface CandleEffectProps {
    position?: 'left' | 'right' | 'center';
    size?: 'small' | 'medium' | 'large';
}

export function CandleEffect({
    position = 'left',
    size = 'medium'
}: CandleEffectProps) {
    return (
        <div className={`candle-container ${position} ${size}`}>
            <div className="candle">
                <div className="candle-body">
                    <div className="candle-wax"></div>
                    <div className="candle-drip drip-1"></div>
                    <div className="candle-drip drip-2"></div>
                </div>
                <div className="candle-flame-container">
                    <div className="candle-flame">
                        <div className="flame-inner"></div>
                        <div className="flame-glow"></div>
                    </div>
                </div>
                <div className="candle-light-rays">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className={`ray ray-${i + 1}`}></div>
                    ))}
                </div>
            </div>
            <div className="candle-plate"></div>
            <div className="candle-ambient-light"></div>
        </div>
    );
}
