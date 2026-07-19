import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import OverviewTab from '../components/dashboard/OverviewTab';
import CVUploadStep from '../components/resume/CVUploadStep';
import JDListStep from '../components/resume/JDListStep';
import ResumeMatchesTab from '../components/resume/ResumeMatchesTab';
import ResumeGapsTab from '../components/resume/ResumeGapsTab';
import ResumeTailor from '../components/resume/ResumeTailor';
import ResumeCoversTab from '../components/resume/ResumeCoversTab';
import SettingsTab from '../components/dashboard/SettingsTab';
import HistoryTab from '../components/dashboard/HistoryTab';
import ReportsTab from '../components/dashboard/ReportsTab';
import ProjectsTab from '../components/dashboard/ProjectsTab';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Fallback defaults for realistic display
  const currentUser = user || {
    fullName: 'Alex Rivera',
    email: 'alex.rivera@gmail.com',
    createdAt: new Date().toISOString()
  };

  const [activeTab, setActiveTabRaw] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Mobile off-canvas sidebar drawer state
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  // On desktop honour the collapse toggle; on mobile the drawer always shows the full menu.
  const effectiveCollapsed = isDesktop ? sidebarCollapsed : false;
  // Selecting a tab also closes the mobile drawer.
  const setActiveTab = (tab: string) => {
    setActiveTabRaw(tab);
    setMobileNavOpen(false);
  };
  
  // Shared Resume states
  const [cvText, setCvText] = useState<string>(() => sessionStorage.getItem('careerlens_cv_text') || '');
  const [jds, setJds] = useState<any[]>(() => {
    const cached = sessionStorage.getItem('careerlens_cv_jds');
    try {
      return cached ? JSON.parse(cached) : [];
    } catch (e) {
      return [];
    }
  });
  const [selectedRole, setSelectedRole] = useState<any>(null);

  // Sync state helpers
  const handleCVTextChange = (text: string) => {
    setCvText(text);
    sessionStorage.setItem('careerlens_cv_text', text);
  };

  const handleJdsChange = (updatedJds: any[]) => {
    setJds(updatedJds);
    sessionStorage.setItem('careerlens_cv_jds', JSON.stringify(updatedJds));
  };

  const handleNewAnalysis = () => {
    setCvText('');
    setJds([]);
    setSelectedRole(null);
    sessionStorage.removeItem('careerlens_cv_text');
    sessionStorage.removeItem('careerlens_cv_jds');
    sessionStorage.removeItem('careerlens_cv_analysis');
    setActiveTab('resume-upload');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Determine if stepper should render
  const isResumeTab = ['resume-upload', 'resume-target', 'resume-matches', 'resume-gaps', 'resume-tailor', 'resume-covers'].includes(activeTab);

  // Determine current active step
  let currentStep = 1;
  if (activeTab === 'resume-upload') currentStep = 1;
  else if (activeTab === 'resume-target') currentStep = 2;
  else if (activeTab === 'resume-matches' || activeTab === 'resume-gaps') currentStep = 3;
  else if (activeTab === 'resume-tailor' || activeTab === 'resume-covers') currentStep = 4;

  // 30-Day Free Trial Verification
  const registrationDate = user?.createdAt ? new Date(user.createdAt) : new Date();
  const daysSinceReg = Math.floor((Date.now() - registrationDate.getTime()) / (1000 * 60 * 60 * 24));
  const isTrialExpired = daysSinceReg > 30 && user?.subscriptionStatus !== 'active';

  if (isTrialExpired) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-6 select-none font-sans text-left">
        <div className="bg-white border border-[#EEEEEE] rounded-3xl p-8 max-w-md w-full shadow-lg space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#E22134]/10 text-[#E22134] flex items-center justify-center mx-auto shadow-sm">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-xl font-black text-[#121212] tracking-tight">Free Trial Expired</h3>
            <p className="text-xs text-[#8A8A8A] leading-relaxed font-medium">
              Your 30-day free trial of Profiling has ended. To continue using our intelligent CV parser, matching scans, and tailored resume generator, please upgrade to Pro.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <a
              href="https://pay.rev.cat/poaaekrofyijbwwq"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 bg-[#1DB954] hover:bg-[#1aa34a] text-white text-xs font-black rounded-full uppercase tracking-wider shadow-sm hover:shadow active:scale-95 transition-all"
            >
              Upgrade to Pro ($1.99)
            </a>
            
            <button
              onClick={handleLogout}
              className="block w-full text-center py-3 border border-[#EEEEEE] hover:bg-slate-50 text-[#5B5B5B] text-xs font-bold rounded-full uppercase tracking-wider active:scale-95 transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Developer Sandbox Test Simulator */}
        <div className="bg-white border border-[#EEEEEE] rounded-2xl p-5 max-w-md w-full mt-6 text-left shadow-sm flex flex-col justify-between gap-4">
          <div>
            <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest block">Developer Sandbox Simulator</span>
            <h4 className="font-extrabold text-sm text-[#121212] mt-1">Simulate Pro Upgrade (For Testing)</h4>
            <p className="text-xs text-[#8A8A8A] font-medium leading-relaxed mt-1">
              Skip payments during evaluations and immediately reactivate the dashboard access with 1 click.
            </p>
          </div>
          <button
            onClick={async () => {
              try {
                await api.post('/payments/mock-activate', { action: 'activate' });
                window.location.reload();
              } catch (e) {
                alert('Mock upgrade failed');
              }
            }}
            className="w-full text-center py-2.5 bg-[#121212] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all focus:outline-none"
          >
            Instant Pro Upgrade
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex font-sans select-none text-[#121212]">

      {/* Mobile drawer backdrop */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* LEFT SIDEBAR NAVBAR */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onLogout={handleLogout}
        collapsed={effectiveCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileNavOpen}
      />

      {/* RIGHT WORKSPACE PANELS CONTAINER */}
      <div className={`flex-1 min-w-0 pl-0 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'} flex flex-col min-h-screen transition-all duration-300`}>

        {/* STICKY HEADER */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onNewAnalysis={handleNewAnalysis}
          onMenuClick={() => setMobileNavOpen(true)}
        />

        {/* WORKSPACE CONTENT BODY */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto text-left space-y-6">

          {/* Stepper Header (renders on any resume workspace screen) */}
          {isResumeTab && (
            <div className="py-4 border-b border-[#F0F0F0] flex items-center justify-between gap-0 font-sans select-none mb-4 bg-white px-3 sm:px-6 rounded-2xl overflow-x-auto">
              <div className="flex items-center flex-1 justify-start">
                
                {/* Step 1: Upload CV */}
                <button
                  onClick={() => setActiveTab('resume-upload')}
                  className="flex items-center gap-3 text-left focus:outline-none"
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12.5px] font-extrabold transition-all duration-200 ${
                    currentStep >= 1 ? 'bg-[#1DB954] text-white' : 'bg-[#F3F3F3] text-[#8A8A8A]'
                  }`}>
                    {currentStep > 1 ? '✓' : '1'}
                  </div>
                  <span className={`hidden sm:inline text-[13px] font-bold transition-all duration-200 ${
                    currentStep === 1 ? 'text-[#121212]' : 'text-[#8A8A8A]'
                  }`}>Upload CV</span>
                </button>
                
                <div className={`flex-1 h-[2px] mx-2 sm:mx-4 transition-all duration-200 ${
                  currentStep >= 2 ? 'bg-[#1DB954]' : 'bg-[#F0F0F0]'
                }`} />

                {/* Step 2: Target role */}
                <button
                  onClick={() => setActiveTab('resume-target')}
                  disabled={!cvText.trim()}
                  className="flex items-center gap-3 text-left focus:outline-none disabled:opacity-60"
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12.5px] font-extrabold transition-all duration-200 ${
                    currentStep >= 2 ? 'bg-[#1DB954] text-white' : 'bg-[#F3F3F3] text-[#8A8A8A]'
                  }`}>
                    {currentStep > 2 ? '✓' : '2'}
                  </div>
                  <span className={`hidden sm:inline text-[13px] font-bold transition-all duration-200 ${
                    currentStep === 2 ? 'text-[#121212]' : 'text-[#8A8A8A]'
                  }`}>Target role</span>
                </button>

                <div className={`flex-1 h-[2px] mx-2 sm:mx-4 transition-all duration-200 ${
                  currentStep >= 3 ? 'bg-[#1DB954]' : 'bg-[#F0F0F0]'
                }`} />

                {/* Step 3: Matches */}
                <button
                  onClick={() => setActiveTab('resume-matches')}
                  disabled={!cvText.trim() || jds.length === 0}
                  className="flex items-center gap-3 text-left focus:outline-none disabled:opacity-60"
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12.5px] font-extrabold transition-all duration-200 ${
                    currentStep >= 3 ? 'bg-[#1DB954] text-white' : 'bg-[#F3F3F3] text-[#8A8A8A]'
                  }`}>
                    {currentStep > 3 ? '✓' : '3'}
                  </div>
                  <span className={`hidden sm:inline text-[13px] font-bold transition-all duration-200 ${
                    currentStep === 3 ? 'text-[#121212]' : 'text-[#8A8A8A]'
                  }`}>Matches</span>
                </button>

                <div className={`flex-1 h-[2px] mx-2 sm:mx-4 transition-all duration-200 ${
                  currentStep >= 4 ? 'bg-[#1DB954]' : 'bg-[#F0F0F0]'
                }`} />

                {/* Step 4: Tailor & apply */}
                <button
                  onClick={() => setActiveTab('resume-tailor')}
                  disabled={!cvText.trim() || jds.length === 0}
                  className="flex items-center gap-3 text-left focus:outline-none disabled:opacity-60"
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12.5px] font-extrabold transition-all duration-200 ${
                    currentStep >= 4 ? 'bg-[#1DB954] text-white' : 'bg-[#F3F3F3] text-[#8A8A8A]'
                  }`}>
                    4
                  </div>
                  <span className={`hidden sm:inline text-[13px] font-bold transition-all duration-200 ${
                    currentStep === 4 ? 'text-[#121212]' : 'text-[#8A8A8A]'
                  }`}>Tailor &amp; apply</span>
                </button>
              </div>
            </div>
          )}

          {/* Render Active Panels */}
          {activeTab === 'dashboard' && (
            <OverviewTab
              currentUser={currentUser}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'resume-upload' && (
            <CVUploadStep
              cvText={cvText}
              onCVTextChange={handleCVTextChange}
              onComplete={() => setActiveTab('resume-target')}
            />
          )}

          {activeTab === 'resume-target' && (
            <JDListStep
              cvText={cvText}
              onJdsChange={handleJdsChange}
              onBack={() => setActiveTab('resume-upload')}
              onAnalyze={() => setActiveTab('resume-matches')}
            />
          )}

          {activeTab === 'resume-matches' && (
            <ResumeMatchesTab
              setActiveTab={setActiveTab}
              setSelectedRole={setSelectedRole}
            />
          )}

          {activeTab === 'resume-gaps' && (
            <ResumeGapsTab
              setActiveTab={setActiveTab}
              selectedRole={selectedRole}
            />
          )}

          {activeTab === 'resume-tailor' && (
            <ResumeTailor setActiveTab={setActiveTab} />
          )}

          {activeTab === 'resume-covers' && (
            <ResumeCoversTab
              setActiveTab={setActiveTab}
              selectedRole={selectedRole}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsTab currentUser={currentUser} />
          )}

          {activeTab === 'history' && (
            <HistoryTab setActiveTab={setActiveTab} searchQuery={searchQuery} />
          )}

          {activeTab === 'reports' && (
            <ReportsTab />
          )}

          {activeTab === 'my-documents' && (
            <ProjectsTab searchQuery={searchQuery} />
          )}

          {activeTab.startsWith('linkedin-') && (
            <div className="bg-white border border-[#EEEEEE] rounded-2xl p-16 text-center max-w-xl mx-auto shadow-sm space-y-6 select-none animate-fadeIn mt-12">
              <div className="w-16 h-16 rounded-2xl bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center mx-auto shadow-sm">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-[#121212] tracking-tight">Coming Soon</h3>
                <p className="text-sm text-[#8A8A8A] leading-relaxed max-w-sm mx-auto font-medium">
                  We are finalising our secure API integration to fetch real-time engagement data, automate scheduling, and draft posts in your personal voice.
                </p>
              </div>
              <div className="pt-2">
                <span className="inline-block bg-[#0A66C2]/10 text-[#0A66C2] text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-[#0A66C2]/10">
                  LinkedIn Growth Module
                </span>
              </div>
            </div>
          )}

          {!['dashboard', 'resume-upload', 'resume-target', 'resume-matches', 'resume-gaps', 'resume-tailor', 'resume-covers', 'settings', 'history', 'reports', 'my-documents'].includes(activeTab) && !activeTab.startsWith('linkedin-') && (
            <div className="bg-white border border-[#EEEEEE] rounded-2xl p-12 text-center text-[#8A8A8A]">
              The {activeTab.replace('-', ' ')} module is under construction. Please focus on the Resume module!
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
