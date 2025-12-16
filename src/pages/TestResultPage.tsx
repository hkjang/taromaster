import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReading } from '../hooks/useReading';
import { majorArcana } from '../data/tarotCards';
import { threeCardSpread } from '../data/spreads';

/**
 * 결과 페이지 테스트용 페이지
 * /test-result 로 접근하면 자동으로 mock 데이터를 설정하고 결과 페이지로 이동합니다.
 */
export function TestResultPage() {
    const navigate = useNavigate();
    const { dispatch } = useReading();
    const initialized = useRef(false);

    useEffect(() => {
        // StrictMode에서 중복 실행 방지
        if (initialized.current) return;
        initialized.current = true;

        // 먼저 상태 초기화
        dispatch({ type: 'RESET' });

        // 약간의 딜레이 후 mock 데이터 설정
        setTimeout(() => {
            // 질문 설정
            dispatch({
                type: 'SET_QUESTION',
                payload: {
                    question: '오늘의 운세를 알려주세요',
                    category: 'general'
                }
            });

            // 스프레드 설정
            dispatch({
                type: 'SET_SPREAD',
                payload: threeCardSpread
            });

            // 카드 선택 - 각각 다른 positionId 사용
            const mockCards = [
                { card: majorArcana[0], isReversed: false, positionId: 1 },   // 바보
                { card: majorArcana[6], isReversed: true, positionId: 2 },    // 연인 (역방향)
                { card: majorArcana[19], isReversed: false, positionId: 3 }, // 태양
            ];

            mockCards.forEach(cardData => {
                dispatch({
                    type: 'SELECT_CARD',
                    payload: cardData
                });
            });

            // 결과 페이지로 이동
            dispatch({ type: 'SET_STEP', payload: 'result' });
            navigate('/result');
        }, 50);
    }, [dispatch, navigate]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            color: '#fff'
        }}>
            <p>결과 페이지로 이동 중...</p>
        </div>
    );
}
