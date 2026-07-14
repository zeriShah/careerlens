import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import OverviewTab from '../components/dashboard/OverviewTab';
import ResumeAnalyzer from '../components/resume/ResumeAnalyzer';
import ResumeSkills from '../components/resume/ResumeSkills';
import ResumeTailor from '../components/resume/ResumeTailor';
import SettingsTab from '../components/dashboard/SettingsTab';
import HistoryTab from '../components/dashboard/HistoryTab';
import ReportsTab from '../components/dashboard/ReportsTab';
import type { ResumeAnalysisResult } from '../services/resumeService';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Fallback defaults for realistic display
  const currentUser = user || {
    fullName: 'Alex Carter',
    email: 'alex@careerlens.io',
    createdAt: new Date().toISOString()
  };

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Resume analysis result shared state
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResult | null>(null);

  // Sync analysisResult from sessionStorage on tab changes or mount
  useEffect(() => {
    const cached = sessionStorage.getItem('careerlens_cv_analysis');
    if (cached) {
      try {
        setAnalysisResult(JSON.parse(cached));
      } catch (e) {}
    } else {
      setAnalysisResult(null);
    }
  }, [activeTab]);

  const handleAnalysisUpdated = (result: ResumeAnalysisResult | null) => {
    setAnalysisResult(result);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex font-sans select-none text-text-primary">
      
      {/* LEFT SIDEBAR NAVBAR */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* RIGHT WORKSPACE PANELS CONTAINER */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        
        {/* STICKY HEADER */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentUser={currentUser}
          onLogout={handleLogout}
        />

        {/* WORKSPACE CONTENT BODY */}
        <main className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto text-left space-y-8">
          
          {activeTab === 'dashboard' && (
            <OverviewTab
              currentUser={currentUser}
              analysisResult={analysisResult}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'resume-analyzer' && (
            <ResumeAnalyzer onAnalysisUpdated={handleAnalysisUpdated} />
          )}

          {activeTab === 'resume-skills' && (
            <ResumeSkills />
          )}

          {activeTab === 'resume-tailor' && (
            <ResumeTailor />
          )}

          {activeTab === 'settings' && (
            <SettingsTab currentUser={currentUser} />
          )}

          {activeTab === 'history' && (
            <HistoryTab setActiveTab={setActiveTab} />
          )}

          {activeTab === 'reports' && (
            <ReportsTab />
          )}

          {!['dashboard', 'resume-analyzer', 'resume-skills', 'resume-tailor', 'settings', 'history', 'reports'].includes(activeTab) && (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-400">
              {activeTab.replace('-', ' ')} module is under construction. Let's finish the Resume module first!
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
