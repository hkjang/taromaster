import { useState, useEffect } from 'react';
import type { MasterStyle } from '../data/masterDialogs';

export interface Settings {
    masterStyle: MasterStyle;
    bgSound: 'cafe' | 'rain' | 'none';
    cardStyle: 'classic' | 'dark' | 'minimal';
    speed: 'slow' | 'normal' | 'fast';
    saveHistory: boolean;
}

const defaultSettings: Settings = {
    masterStyle: 'comforting',
    bgSound: 'none',
    cardStyle: 'classic',
    speed: 'normal',
    saveHistory: true
};

const SETTINGS_KEY = 'tarot-master-settings';

export function useSettings() {
    const [settings, setSettings] = useState<Settings>(() => {
        try {
            const saved = localStorage.getItem(SETTINGS_KEY);
            return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
        } catch {
            return defaultSettings;
        }
    });

    useEffect(() => {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    }, [settings]);

    const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const resetSettings = () => {
        setSettings(defaultSettings);
    };

    return {
        settings,
        updateSetting,
        resetSettings
    };
}
