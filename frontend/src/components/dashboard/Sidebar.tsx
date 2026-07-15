import { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  ChevronDown,
  ChevronRight,
  History,
  BarChart2,
  Settings,
  LogOut,
  Linkedin
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: {
    fullName: string;
    email: string;
  };
  onLogout: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, currentUser, onLogout }: SidebarProps) {
  const [resumeOpen, setResumeOpen] = useState(true);
  const [linkedinOpen, setLinkedinOpen] = useState(true);

  return (
    <aside className="w-64 bg-[#FBFBFB] text-[#121212] border-r border-[#EEEEEE] h-screen fixed left-0 top-0 flex flex-col justify-between z-40 font-sans">
      
      {/* Workspace Brand */}
      <div className="p-5 border-b border-[#EEEEEE] flex items-center gap-2.5">
        <div className="w-[30px] h-[30px] rounded-full bg-[#1DB954] flex items-center justify-center">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.8"><circle cx="10" cy="10" r="6"/><path d="M14.5 14.5l5 5" strokeLinecap="round"/></svg>
        </div>
        <div>
          <span className="font-extrabold text-lg text-[#121212] block tracking-tight leading-none">Profiling</span>
        </div>
      </div>

      {/* Sidebar Nav Links */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        
        {/* Main Dashboard Link */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
            activeTab === 'dashboard'
              ? 'bg-[#1DB954]/12 text-[#0E9E48]'
              : 'text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212]'
          }`}
        >
          <LayoutDashboard className="w-4.5 h-4.5" />
          Home
        </button>

        {/* Resume Section (Collapsible) */}
        <div className="space-y-0.5">
          <button
            onClick={() => setResumeOpen(!resumeOpen)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212] transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4.5 h-4.5" />
              <span>Résumé analyzer</span>
            </div>
            {resumeOpen ? <ChevronDown className="w-3.5 h-3.5 text-[#B0B0B0]" /> : <ChevronRight className="w-3.5 h-3.5 text-[#B0B0B0]" />}
          </button>
          
          {resumeOpen && (
            <div className="pl-6 pr-2 space-y-0.5 animate-in fade-in slide-in-from-top-1 duration-150">
              <button
                onClick={() => setActiveTab('resume-analyzer')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 block ${
                  activeTab === 'resume-analyzer' 
                    ? 'bg-[#1DB954]/12 text-[#0E9E48]' 
                    : 'text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212]'
                }`}
              >
                Upload CV
              </button>
              <button
                onClick={() => setActiveTab('resume-skills')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 block ${
                  activeTab === 'resume-skills' 
                    ? 'bg-[#1DB954]/12 text-[#0E9E48]' 
                    : 'text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212]'
                }`}
              >
                Gaps &amp; keywords
              </button>
              <button
                onClick={() => setActiveTab('resume-tailor')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 block ${
                  activeTab === 'resume-tailor' 
                    ? 'bg-[#1DB954]/12 text-[#0E9E48]' 
                    : 'text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212]'
                }`}
              >
                Tailored CV
              </button>
            </div>
          )}
        </div>

        {/* LinkedIn Section (Collapsible) */}
        <div className="space-y-0.5">
          <button
            onClick={() => setLinkedinOpen(!linkedinOpen)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212] transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <Linkedin className="w-4.5 h-4.5" />
              <span>LinkedIn</span>
            </div>
            {linkedinOpen ? <ChevronDown className="w-3.5 h-3.5 text-[#B0B0B0]" /> : <ChevronRight className="w-3.5 h-3.5 text-[#B0B0B0]" />}
          </button>
          
          {linkedinOpen && (
            <div className="pl-6 pr-2 space-y-0.5 animate-in fade-in slide-in-from-top-1 duration-150">
              <button
                onClick={() => setActiveTab('linkedin-enhancer')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 block ${
                  activeTab === 'linkedin-enhancer' 
                    ? 'bg-[#1DB954]/12 text-[#0E9E48]' 
                    : 'text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212]'
                }`}
              >
                Posts
              </button>
              <button
                onClick={() => setActiveTab('linkedin-generator')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 block ${
                  activeTab === 'linkedin-generator' 
                    ? 'bg-[#1DB954]/12 text-[#0E9E48]' 
                    : 'text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212]'
                }`}
              >
                Post Generator
              </button>
              <button
                onClick={() => setActiveTab('linkedin-scheduler')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 block ${
                  activeTab === 'linkedin-scheduler' 
                    ? 'bg-[#1DB954]/12 text-[#0E9E48]' 
                    : 'text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212]'
                }`}
              >
                Scheduling
              </button>
            </div>
          )}
        </div>

        <hr className="border-[#EEEEEE] my-2" />

        {/* History */}
        <button
          onClick={() => setActiveTab('history')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
            activeTab === 'history'
              ? 'bg-[#1DB954]/12 text-[#0E9E48]'
              : 'text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212]'
          }`}
        >
          <History className="w-4.5 h-4.5" />
          History
        </button>

        {/* Reports */}
        <button
          onClick={() => setActiveTab('reports')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
            activeTab === 'reports'
              ? 'bg-[#1DB954]/12 text-[#0E9E48]'
              : 'text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212]'
          }`}
        >
          <BarChart2 className="w-4.5 h-4.5" />
          Reports
        </button>

        {/* Settings */}
        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
            activeTab === 'settings'
              ? 'bg-[#1DB954]/12 text-[#0E9E48]'
              : 'text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212]'
          }`}
        >
          <Settings className="w-4.5 h-4.5" />
          Settings
        </button>
      </nav>

      {/* Upgrade Banner & Sidebar Footer / User Profile */}
      <div className="p-4 space-y-4">
        {/* Upgrade Pro Widget Box */}
        <div className="bg-[#121212] rounded-xl p-4 text-left text-white select-none">
          <div className="font-bold text-xs">Free plan</div>
          <div className="text-[11px] text-[#A7A7A7] mt-1">1 of 3 analyses used</div>
          <div className="h-1.5 rounded-full bg-[#282828] mt-2.5 overflow-hidden">
            <div className="h-full w-1/3 bg-[#1DB954] rounded-full"></div>
          </div>
          <button className="w-full text-center mt-3.5 font-bold text-[10px] tracking-wider uppercase text-[#121212] bg-[#1DB954] py-2 rounded-full hover:bg-[#1aa34a] transition-all">
            Upgrade to Pro
          </button>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between gap-2.5 pt-2 border-t border-[#EEEEEE]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#1DB954] flex items-center justify-center text-white font-extrabold text-sm shrink-0">
              {currentUser.fullName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <span className="font-extrabold text-xs text-[#121212] block truncate leading-tight">{currentUser.fullName}</span>
              <span className="text-[10px] text-[#8A8A8A] block truncate">{currentUser.email}</span>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="p-1.5 text-[#8A8A8A] hover:text-[#E22134] hover:bg-[#E22134]/10 rounded-full transition-colors active:scale-95"
            title="Log Out"
          >
            <LogOut className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}

