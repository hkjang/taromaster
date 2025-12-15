import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { TarotCard } from '../data/tarotCards';
import type { Spread } from '../data/spreads';
import type { MasterStyle } from '../data/masterDialogs';

// 리딩 상태 타입
export type ReadingStep =
    | 'entrance'
    | 'question'
    | 'masterAppear'
    | 'shuffle'
    | 'select'
    | 'reveal'
    | 'reading'
    | 'result';

export type QuestionCategory = 'love' | 'work' | 'relationship' | 'money' | 'health' | 'general';

export interface SelectedCard {
    card: TarotCard;
    isReversed: boolean;
    positionId: number;
}

export interface ReadingState {
    step: ReadingStep;
    question: string;
    category: QuestionCategory;
    spread: Spread | null;
    selectedCards: SelectedCard[];
    currentRevealIndex: number;
    isAnimating: boolean;
    masterStyle: MasterStyle;
}

// 액션 타입
type ReadingAction =
    | { type: 'SET_STEP'; payload: ReadingStep }
    | { type: 'SET_QUESTION'; payload: { question: string; category: QuestionCategory } }
    | { type: 'SET_SPREAD'; payload: Spread }
    | { type: 'SELECT_CARD'; payload: SelectedCard }
    | { type: 'REVEAL_NEXT' }
    | { type: 'SET_ANIMATING'; payload: boolean }
    | { type: 'SET_MASTER_STYLE'; payload: MasterStyle }
    | { type: 'RESET' };

// 초기 상태
const initialState: ReadingState = {
    step: 'entrance',
    question: '',
    category: 'general',
    spread: null,
    selectedCards: [],
    currentRevealIndex: -1,
    isAnimating: false,
    masterStyle: 'comforting'
};

// 리듀서
function readingReducer(state: ReadingState, action: ReadingAction): ReadingState {
    switch (action.type) {
        case 'SET_STEP':
            return { ...state, step: action.payload };

        case 'SET_QUESTION':
            return {
                ...state,
                question: action.payload.question,
                category: action.payload.category
            };

        case 'SET_SPREAD':
            return { ...state, spread: action.payload };

        case 'SELECT_CARD':
            return {
                ...state,
                selectedCards: [...state.selectedCards, action.payload]
            };

        case 'REVEAL_NEXT':
            return {
                ...state,
                currentRevealIndex: state.currentRevealIndex + 1
            };

        case 'SET_ANIMATING':
            return { ...state, isAnimating: action.payload };

        case 'SET_MASTER_STYLE':
            return { ...state, masterStyle: action.payload };

        case 'RESET':
            return { ...initialState, masterStyle: state.masterStyle };

        default:
            return state;
    }
}

// Context 생성
interface ReadingContextType {
    state: ReadingState;
    dispatch: React.Dispatch<ReadingAction>;
    goToStep: (step: ReadingStep) => void;
    setQuestion: (question: string, category: QuestionCategory) => void;
    selectCard: (card: TarotCard, positionId: number) => void;
    revealNextCard: () => void;
    reset: () => void;
}

const ReadingContext = createContext<ReadingContextType | undefined>(undefined);

// Provider 컴포넌트
export function ReadingProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(readingReducer, initialState);

    const goToStep = (step: ReadingStep) => {
        dispatch({ type: 'SET_ANIMATING', payload: true });
        setTimeout(() => {
            dispatch({ type: 'SET_STEP', payload: step });
            dispatch({ type: 'SET_ANIMATING', payload: false });
        }, 300);
    };

    const setQuestion = (question: string, category: QuestionCategory) => {
        dispatch({ type: 'SET_QUESTION', payload: { question, category } });
    };

    const selectCard = (card: TarotCard, positionId: number) => {
        const isReversed = Math.random() > 0.7; // 30% 확률로 역방향
        dispatch({
            type: 'SELECT_CARD',
            payload: { card, isReversed, positionId }
        });
    };

    const revealNextCard = () => {
        dispatch({ type: 'REVEAL_NEXT' });
    };

    const reset = () => {
        dispatch({ type: 'RESET' });
    };

    return (
        <ReadingContext.Provider value={{
            state,
            dispatch,
            goToStep,
            setQuestion,
            selectCard,
            revealNextCard,
            reset
        }}>
            {children}
        </ReadingContext.Provider>
    );
}

// 커스텀 훅
export function useReading() {
    const context = useContext(ReadingContext);
    if (context === undefined) {
        throw new Error('useReading must be used within a ReadingProvider');
    }
    return context;
}
