import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { ReadingProvider } from './hooks/useReading';
import { SettingsPanel } from './components/SettingsPanel';
import { EntrancePage } from './pages/EntrancePage';
import { QuestionPage } from './pages/QuestionPage';
import { MasterAppearPage } from './pages/MasterAppearPage';
import { ShufflePage } from './pages/ShufflePage';
import { SelectCardPage } from './pages/SelectCardPage';
import { ReadingPage } from './pages/ReadingPage';
import { ResultPage } from './pages/ResultPage';
import { AdminPage } from './pages/AdminPage';
import './App.css';

function AppContent() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="app-container">
      {/* 배경 테이블 텍스처 */}
      <div className="table-texture"></div>

      {/* 설정 버튼 */}
      <button
        className="settings-toggle"
        onClick={() => setShowSettings(true)}
        aria-label="설정"
      >
        ⚙️
      </button>

      {/* 설정 패널 */}
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />

      {/* 페이지 라우팅 */}
      <Routes>
        <Route path="/" element={<EntrancePage />} />
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/master" element={<MasterAppearPage />} />
        <Route path="/shuffle" element={<ShufflePage />} />
        <Route path="/select" element={<SelectCardPage />} />
        <Route path="/reading" element={<ReadingPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ReadingProvider>
        <AppContent />
      </ReadingProvider>
    </BrowserRouter>
  );
}

export default App;
