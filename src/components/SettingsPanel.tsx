import { useState } from 'react';
import { useSettings } from '../hooks/useSettings';
import './SettingsPanel.css';

interface SettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
    const { settings, updateSetting } = useSettings();
    const [closing, setClosing] = useState(false);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setClosing(false);
            onClose();
        }, 300);
    };

    if (!isOpen) return null;

    return (
        <div className={`settings-overlay ${closing ? 'closing' : ''}`} onClick={handleClose}>
            <div className="settings-panel" onClick={e => e.stopPropagation()}>
                <div className="settings-header">
                    <h2>설정</h2>
                    <button className="close-btn" onClick={handleClose}>✕</button>
                </div>

                <div className="settings-content">
                    {/* 마스터 스타일 */}
                    <div className="setting-group">
                        <label className="setting-label">타로 마스터 스타일</label>
                        <div className="setting-options">
                            <button
                                className={`option-btn ${settings.masterStyle === 'comforting' ? 'active' : ''}`}
                                onClick={() => updateSetting('masterStyle', 'comforting')}
                            >
                                🌙 위로형
                            </button>
                            <button
                                className={`option-btn ${settings.masterStyle === 'direct' ? 'active' : ''}`}
                                onClick={() => updateSetting('masterStyle', 'direct')}
                            >
                                ⚡ 직설형
                            </button>
                        </div>
                    </div>

                    {/* 배경음 */}
                    <div className="setting-group">
                        <label className="setting-label">배경음</label>
                        <div className="setting-options">
                            <button
                                className={`option-btn ${settings.bgSound === 'cafe' ? 'active' : ''}`}
                                onClick={() => updateSetting('bgSound', 'cafe')}
                            >
                                ☕ 카페
                            </button>
                            <button
                                className={`option-btn ${settings.bgSound === 'rain' ? 'active' : ''}`}
                                onClick={() => updateSetting('bgSound', 'rain')}
                            >
                                🌧️ 빗소리
                            </button>
                            <button
                                className={`option-btn ${settings.bgSound === 'none' ? 'active' : ''}`}
                                onClick={() => updateSetting('bgSound', 'none')}
                            >
                                🔇 무음
                            </button>
                        </div>
                    </div>

                    {/* 카드 스타일 */}
                    <div className="setting-group">
                        <label className="setting-label">카드 스타일</label>
                        <div className="setting-options">
                            <button
                                className={`option-btn ${settings.cardStyle === 'classic' ? 'active' : ''}`}
                                onClick={() => updateSetting('cardStyle', 'classic')}
                            >
                                🎴 클래식
                            </button>
                            <button
                                className={`option-btn ${settings.cardStyle === 'dark' ? 'active' : ''}`}
                                onClick={() => updateSetting('cardStyle', 'dark')}
                            >
                                🌑 다크
                            </button>
                            <button
                                className={`option-btn ${settings.cardStyle === 'minimal' ? 'active' : ''}`}
                                onClick={() => updateSetting('cardStyle', 'minimal')}
                            >
                                ◻️ 미니멀
                            </button>
                        </div>
                    </div>

                    {/* 속도 */}
                    <div className="setting-group">
                        <label className="setting-label">진행 속도</label>
                        <div className="setting-options">
                            <button
                                className={`option-btn ${settings.speed === 'slow' ? 'active' : ''}`}
                                onClick={() => updateSetting('speed', 'slow')}
                            >
                                🐢 느림
                            </button>
                            <button
                                className={`option-btn ${settings.speed === 'normal' ? 'active' : ''}`}
                                onClick={() => updateSetting('speed', 'normal')}
                            >
                                🚶 기본
                            </button>
                            <button
                                className={`option-btn ${settings.speed === 'fast' ? 'active' : ''}`}
                                onClick={() => updateSetting('speed', 'fast')}
                            >
                                🏃 빠름
                            </button>
                        </div>
                    </div>

                    {/* 히스토리 저장 */}
                    <div className="setting-group">
                        <label className="setting-label">
                            <span>기록 저장</span>
                            <span className="setting-desc">리딩 결과를 로컬에 저장합니다</span>
                        </label>
                        <div className="setting-toggle">
                            <button
                                className={`toggle-btn ${settings.saveHistory ? 'active' : ''}`}
                                onClick={() => updateSetting('saveHistory', !settings.saveHistory)}
                            >
                                <span className="toggle-track">
                                    <span className="toggle-thumb"></span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="settings-footer">
                    <p className="footer-text">설정은 자동으로 저장됩니다</p>
                </div>
            </div>
        </div>
    );
}
