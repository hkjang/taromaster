import { useState, useEffect } from 'react';
import type { SelectedCard } from './useReading';

export interface ReadingHistory {
    id: string;
    date: string;
    question: string;
    category: string;
    spreadId: string;
    cards: SelectedCard[];
    memo?: string;
}

const HISTORY_KEY = 'tarot-master-history';

export function useHistory() {
    const [history, setHistory] = useState<ReadingHistory[]>(() => {
        try {
            const saved = localStorage.getItem(HISTORY_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    }, [history]);

    const saveReading = (
        question: string,
        category: string,
        spreadId: string,
        cards: SelectedCard[],
        memo?: string
    ): string => {
        const id = `reading-${Date.now()}`;
        const newReading: ReadingHistory = {
            id,
            date: new Date().toISOString(),
            question,
            category,
            spreadId,
            cards,
            memo
        };

        setHistory(prev => [newReading, ...prev]);
        return id;
    };

    const getReading = (id: string): ReadingHistory | undefined => {
        return history.find(reading => reading.id === id);
    };

    const deleteReading = (id: string) => {
        setHistory(prev => prev.filter(reading => reading.id !== id));
    };

    const updateMemo = (id: string, memo: string) => {
        setHistory(prev => prev.map(reading =>
            reading.id === id ? { ...reading, memo } : reading
        ));
    };

    const clearHistory = () => {
        setHistory([]);
    };

    return {
        history,
        saveReading,
        getReading,
        deleteReading,
        updateMemo,
        clearHistory
    };
}
