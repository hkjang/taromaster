import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminSettingsPanel } from '../components/AdminSettingsPanel';
import './AdminPage.css';

export function AdminPage() {
    const [showAISettings, setShowAISettings] = useState(false);

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>⚙️ 관리자 설정</h1>
                <p>타로 마스터 앱 설정을 관리합니다</p>
            </div>

            <div className="admin-page-actions">
                <button
                    className="admin-action-btn"
                    onClick={() => setShowAISettings(true)}
                >
                    <span className="icon">🤖</span>
                    <span>AI 조언 설정</span>
                </button>
            </div>

            <Link to="/" className="back-link">
                ← 홈으로 돌아가기
            </Link>

            <AdminSettingsPanel
                isOpen={showAISettings}
                onClose={() => setShowAISettings(false)}
            />
        </div>
    );
}
