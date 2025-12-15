import { useState, useEffect, useCallback } from 'react';

// AI 설정 타입 정의
export interface AIConfig {
    apiUrl: string;          // vLLM 엔드포인트 URL
    apiKey: string;          // API 인증 키
    model: string;           // 사용할 모델명
    timeout: number;         // 타임아웃 (밀리초)
    enabled: boolean;        // AI 조언 기능 활성화 여부
}

export interface AISettingsState extends AIConfig {
    isConnected: boolean;    // 연결 상태 (Health Check 결과)
    isChecking: boolean;     // Health Check 진행 중
    lastError: string | null; // 마지막 에러 메시지
}

const defaultConfig: AIConfig = {
    apiUrl: '',
    apiKey: '',
    model: 'default',
    timeout: 5000,           // 기본 5초
    enabled: false
};

const AI_SETTINGS_KEY = 'tarot-master-ai-settings';

export function useAISettings() {
    const [settings, setSettings] = useState<AISettingsState>(() => {
        try {
            const saved = localStorage.getItem(AI_SETTINGS_KEY);
            const parsed = saved ? JSON.parse(saved) : {};
            return {
                ...defaultConfig,
                ...parsed,
                isConnected: false,
                isChecking: false,
                lastError: null
            };
        } catch {
            return {
                ...defaultConfig,
                isConnected: false,
                isChecking: false,
                lastError: null
            };
        }
    });

    // 설정 변경 시 localStorage에 저장
    useEffect(() => {
        const { isConnected, isChecking, lastError, ...configToSave } = settings;
        localStorage.setItem(AI_SETTINGS_KEY, JSON.stringify(configToSave));
    }, [settings]);

    // 개별 설정 업데이트
    const updateSetting = useCallback(<K extends keyof AIConfig>(key: K, value: AIConfig[K]) => {
        setSettings(prev => ({
            ...prev,
            [key]: value,
            // 설정 변경 시 연결 상태 초기화
            isConnected: key === 'enabled' ? prev.isConnected : false
        }));
    }, []);

    // 전체 설정 업데이트
    const updateSettings = useCallback((config: Partial<AIConfig>) => {
        setSettings(prev => ({
            ...prev,
            ...config,
            isConnected: false
        }));
    }, []);

    // Health Check 상태 업데이트
    const setConnectionStatus = useCallback((isConnected: boolean, error?: string) => {
        setSettings(prev => ({
            ...prev,
            isConnected,
            isChecking: false,
            lastError: error || null
        }));
    }, []);

    // Health Check 시작
    const startHealthCheck = useCallback(() => {
        setSettings(prev => ({
            ...prev,
            isChecking: true,
            lastError: null
        }));
    }, []);

    // 설정 초기화
    const resetSettings = useCallback(() => {
        setSettings({
            ...defaultConfig,
            isConnected: false,
            isChecking: false,
            lastError: null
        });
    }, []);

    // AI 기능이 사용 가능한지 확인
    const isAvailable = settings.enabled && settings.isConnected && settings.apiUrl !== '';

    return {
        settings,
        updateSetting,
        updateSettings,
        setConnectionStatus,
        startHealthCheck,
        resetSettings,
        isAvailable
    };
}
