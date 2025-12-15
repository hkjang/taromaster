import { useState, useCallback } from 'react';
import { useAISettings } from '../hooks/useAISettings';
import { healthCheck } from '../services/aiService';
import './AdminSettingsPanel.css';

interface AdminSettingsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AdminSettingsPanel({ isOpen, onClose }: AdminSettingsPanelProps) {
    const { settings, updateSetting, startHealthCheck, setConnectionStatus } = useAISettings();
    const [closing, setClosing] = useState(false);
    const [showApiKey, setShowApiKey] = useState(false);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            setClosing(false);
            onClose();
        }, 300);
    };

    const handleHealthCheck = useCallback(async () => {
        startHealthCheck();

        const result = await healthCheck({
            apiUrl: settings.apiUrl,
            apiKey: settings.apiKey,
            model: settings.model,
            timeout: settings.timeout,
            enabled: settings.enabled
        });

        setConnectionStatus(result.success, result.error);
    }, [settings.apiUrl, settings.apiKey, settings.model, settings.timeout, settings.enabled, startHealthCheck, setConnectionStatus]);

    if (!isOpen) return null;

    return (
        <div className={`admin-settings-overlay ${closing ? 'closing' : ''}`} onClick={handleClose}>
            <div className="admin-settings-panel" onClick={e => e.stopPropagation()}>
                <div className="admin-settings-header">
                    <h2>🤖 AI 설정</h2>
                    <button className="close-btn" onClick={handleClose}>✕</button>
                </div>

                <div className="admin-settings-content">
                    {/* 기능 활성화 토글 */}
                    <div className="admin-toggle-group">
                        <div className="admin-toggle-label">
                            <span className="label-text">AI 조언 기능</span>
                            <span className="label-desc">타로 리딩 후 AI 추가 조언을 제공합니다</span>
                        </div>
                        <div
                            className={`toggle-switch ${settings.enabled ? 'active' : ''}`}
                            onClick={() => updateSetting('enabled', !settings.enabled)}
                        />
                    </div>

                    {/* API URL */}
                    <div className="admin-setting-group">
                        <label className="admin-setting-label">API URL</label>
                        <input
                            type="text"
                            className="admin-setting-input"
                            placeholder="https://your-vllm-server.com"
                            value={settings.apiUrl}
                            onChange={e => updateSetting('apiUrl', e.target.value)}
                        />
                    </div>

                    {/* API Key */}
                    <div className="admin-setting-group">
                        <label className="admin-setting-label">API Key (선택)</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showApiKey ? 'text' : 'password'}
                                className="admin-setting-input password"
                                placeholder="sk-..."
                                value={settings.apiKey}
                                onChange={e => updateSetting('apiKey', e.target.value)}
                            />
                            <button
                                type="button"
                                style={{
                                    position: 'absolute',
                                    right: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#666',
                                    cursor: 'pointer',
                                    fontSize: '1rem'
                                }}
                                onClick={() => setShowApiKey(!showApiKey)}
                            >
                                {showApiKey ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    {/* 모델명과 타임아웃 */}
                    <div className="admin-setting-row">
                        <div className="admin-setting-group">
                            <label className="admin-setting-label">모델명</label>
                            <input
                                type="text"
                                className="admin-setting-input"
                                placeholder="default"
                                value={settings.model}
                                onChange={e => updateSetting('model', e.target.value)}
                            />
                        </div>
                        <div className="admin-setting-group">
                            <label className="admin-setting-label">타임아웃 (초)</label>
                            <input
                                type="number"
                                className="admin-setting-input"
                                min={1}
                                max={30}
                                value={settings.timeout / 1000}
                                onChange={e => updateSetting('timeout', Number(e.target.value) * 1000)}
                            />
                        </div>
                    </div>

                    {/* Health Check */}
                    <div className="admin-setting-group">
                        <label className="admin-setting-label">연결 테스트</label>
                        <div className="health-check-section">
                            <button
                                className={`health-check-btn ${settings.isChecking ? 'checking' : ''}`}
                                onClick={handleHealthCheck}
                                disabled={settings.isChecking || !settings.apiUrl}
                            >
                                {settings.isChecking ? '확인 중...' : '🔍 연결 확인'}
                            </button>

                            {!settings.isChecking && (settings.isConnected || settings.lastError) && (
                                <div className={`connection-status ${settings.isConnected ? 'connected' : 'disconnected'}`}>
                                    <span className="status-dot" />
                                    {settings.isConnected ? '연결됨' : '연결 실패'}
                                </div>
                            )}

                            {settings.lastError && (
                                <div className="error-message">
                                    {settings.lastError}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="admin-settings-footer">
                    <p className="footer-info">설정은 자동으로 저장됩니다</p>
                </div>
            </div>
        </div>
    );
}
