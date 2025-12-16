import { useState } from 'react';
import './TipPayment.css';

// 토스페이먼츠 테스트 클라이언트 키
const TOSS_CLIENT_KEY = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';

// 글로벌 TossPayments 타입 선언
declare global {
    interface Window {
        TossPayments?: (clientKey: string) => {
            requestPayment: (method: string, options: PaymentOptions) => Promise<PaymentResult>;
        };
    }
}

interface PaymentOptions {
    amount: { value: number; currency: string };
    orderId: string;
    orderName: string;
    customerName?: string;
    successUrl: string;
    failUrl: string;
}

interface PaymentResult {
    paymentKey?: string;
    orderId?: string;
    amount?: number;
}

interface TipPaymentProps {
    onClose?: () => void;
}

const TIP_AMOUNTS = [
    { value: 1000, label: '1,000원', emoji: '🙏' },
    { value: 3000, label: '3,000원', emoji: '💝' },
    { value: 5000, label: '5,000원', emoji: '✨' },
    { value: 10000, label: '10,000원', emoji: '🌟' },
];

export function TipPayment({ onClose }: TipPaymentProps) {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showWidget, setShowWidget] = useState(false);

    const handlePayment = async () => {
        if (!selectedAmount) return;

        setIsProcessing(true);

        try {
            // TossPayments 객체 확인
            if (!window.TossPayments) {
                alert('결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
                setIsProcessing(false);
                return;
            }

            const tossPayments = window.TossPayments(TOSS_CLIENT_KEY);

            // 주문 ID 생성
            const orderId = `tarot_tip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            // 결제 요청
            await tossPayments.requestPayment('카드', {
                amount: {
                    value: selectedAmount,
                    currency: 'KRW'
                },
                orderId,
                orderName: '타로 마스터 복채',
                customerName: '익명의 손님',
                successUrl: `${window.location.origin}/result?payment=success`,
                failUrl: `${window.location.origin}/result?payment=fail`,
            });

        } catch (error: unknown) {
            // 사용자가 결제를 취소한 경우
            if (error && typeof error === 'object' && 'code' in error) {
                const paymentError = error as { code: string; message?: string };
                if (paymentError.code === 'USER_CANCEL') {
                    console.log('결제가 취소되었습니다.');
                } else {
                    console.error('결제 오류:', paymentError.message);
                }
            }
        } finally {
            setIsProcessing(false);
        }
    };

    if (!showWidget) {
        return (
            <div className="tip-teaser">
                <button
                    className="tip-teaser-btn"
                    onClick={() => setShowWidget(true)}
                >
                    💰 복채로 감사 표현하기
                </button>
            </div>
        );
    }

    return (
        <div className="tip-payment">
            <div className="tip-header">
                <h3>💰 복채</h3>
                <button className="tip-close" onClick={() => {
                    setShowWidget(false);
                    onClose?.();
                }}>×</button>
            </div>

            <p className="tip-description">
                오늘의 리딩이 도움이 되셨다면<br />
                작은 복채로 감사를 표현해주세요 ✨
            </p>

            <div className="tip-amounts">
                {TIP_AMOUNTS.map(({ value, label, emoji }) => (
                    <button
                        key={value}
                        className={`tip-amount-btn ${selectedAmount === value ? 'selected' : ''}`}
                        onClick={() => setSelectedAmount(value)}
                        disabled={isProcessing}
                    >
                        <span className="tip-emoji">{emoji}</span>
                        <span className="tip-label">{label}</span>
                    </button>
                ))}
            </div>

            <button
                className="tip-pay-btn"
                onClick={handlePayment}
                disabled={!selectedAmount || isProcessing}
            >
                {isProcessing ? '처리 중...' : '결제하기'}
            </button>

            <p className="tip-notice">
                테스트 모드입니다. 실제 결제가 되지 않습니다.
            </p>
        </div>
    );
}
