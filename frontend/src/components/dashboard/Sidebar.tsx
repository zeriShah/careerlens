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
    <aside className="w-64 bg-[#F3EDF7] text-[#1C1B1F] border-r border-[#E7E0EC] h-screen fixed left-0 top-0 flex flex-col justify-between z-40">
      
      {/* Workspace Brand */}
      <div className="p-5 border-b border-[#E7E0EC] flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center shadow-sm">
          <span className="text-white font-black text-lg">P</span>
        </div>
        <div>
          <span className="font-bold text-sm text-[#1C1B1F] block leading-tight">Profiling</span>
          <span className="text-[10px] text-[#49454F] font-medium">Workspace v1.0.0</span>
        </div>
      </div>

      {/* Sidebar Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        
        {/* Main Dashboard Link */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95 ${
            activeTab === 'dashboard'
              ? 'bg-[#E8DEF8] text-[#1D192B] shadow-sm'
              : 'text-[#49454F] hover:bg-[#6750A4]/8 hover:text-[#1C1B1F]'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 text-[#6750A4]" />
          Dashboard
        </button>

        {/* Resume Section (Collapsible) */}
        <div className="space-y-1">
          <button
            onClick={() => setResumeOpen(!resumeOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-full text-xs font-semibold text-[#49454F] hover:bg-[#6750A4]/8 hover:text-[#1C1B1F] transition-all duration-200 active:scale-95"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-[#6750A4]" />
              <span>Resume</span>
            </div>
            {resumeOpen ? <ChevronDown className="w-3.5 h-3.5 text-[#49454F]" /> : <ChevronRight className="w-3.5 h-3.5 text-[#49454F]" />}
          </button>
          
          {resumeOpen && (
            <div className="pl-6 pr-2 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
              <button
                onClick={() => setActiveTab('resume-analyzer')}
                className={`w-full text-left px-4 py-2 rounded-full text-[11px] font-semibold transition-all duration-200 active:scale-95 block ${
                  activeTab === 'resume-analyzer' 
                    ? 'text-[#1D192B] bg-[#E8DEF8]' 
                    : 'text-[#49454F] hover:text-[#1C1B1F] hover:bg-[#6750A4]/8'
                }`}
              >
                Resume Analyzer
              </button>
              <button
                onClick={() => setActiveTab('resume-skills')}
                className={`w-full text-left px-4 py-2 rounded-full text-[11px] font-semibold transition-all duration-200 active:scale-95 block ${
                  activeTab === 'resume-skills' 
                    ? 'text-[#1D192B] bg-[#E8DEF8]' 
                    : 'text-[#49454F] hover:text-[#1C1B1F] hover:bg-[#6750A4]/8'
                }`}
              >
                Gaps & Matching
              </button>
              <button
                onClick={() => setActiveTab('resume-tailor')}
                className={`w-full text-left px-4 py-2 rounded-full text-[11px] font-semibold transition-all duration-200 active:scale-95 block ${
                  activeTab === 'resume-tailor' 
                    ? 'text-[#1D192B] bg-[#E8DEF8]' 
                    : 'text-[#49454F] hover:text-[#1C1B1F] hover:bg-[#6750A4]/8'
                }`}
              >
                Resume Tailor
              </button>
            </div>
          )}
        </div>

        {/* LinkedIn Section (Collapsible) */}
        <div className="space-y-1">
          <button
            onClick={() => setLinkedinOpen(!linkedinOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-full text-xs font-semibold text-[#49454F] hover:bg-[#6750A4]/8 hover:text-[#1C1B1F] transition-all duration-200 active:scale-95"
          >
            <div className="flex items-center gap-3">
              <Linkedin className="w-4 h-4 text-[#6750A4]" />
              <span>LinkedIn</span>
            </div>
            {linkedinOpen ? <ChevronDown className="w-3.5 h-3.5 text-[#49454F]" /> : <ChevronRight className="w-3.5 h-3.5 text-[#49454F]" />}
          </button>
          
          {linkedinOpen && (
            <div className="pl-6 pr-2 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
              <button
                onClick={() => setActiveTab('linkedin-enhancer')}
                className={`w-full text-left px-4 py-2 rounded-full text-[11px] font-semibold transition-all duration-200 active:scale-95 block ${
                  activeTab === 'linkedin-enhancer' 
                    ? 'text-[#1D192B] bg-[#E8DEF8]' 
                    : 'text-[#49454F] hover:text-[#1C1B1F] hover:bg-[#6750A4]/8'
                }`}
              >
                Profile Enhancer
              </button>
              <button
                onClick={() => setActiveTab('linkedin-generator')}
                className={`w-full text-left px-4 py-2 rounded-full text-[11px] font-semibold transition-all duration-200 active:scale-95 block ${
                  activeTab === 'linkedin-generator' 
                    ? 'text-[#1D192B] bg-[#E8DEF8]' 
                    : 'text-[#49454F] hover:text-[#1C1B1F] hover:bg-[#6750A4]/8'
                }`}
              >
                Post Generator
              </button>
              <button
                onClick={() => setActiveTab('linkedin-scheduler')}
                className={`w-full text-left px-4 py-2 rounded-full text-[11px] font-semibold transition-all duration-200 active:scale-95 block ${
                  activeTab === 'linkedin-scheduler' 
                    ? 'text-[#1D192B] bg-[#E8DEF8]' 
                    : 'text-[#49454F] hover:text-[#1C1B1F] hover:bg-[#6750A4]/8'
                }`}
              >
                Post Schedule
              </button>
            </div>
          )}
        </div>

        <hr className="border-[#E7E0EC] my-2" />

        {/* History */}
        <button
          onClick={() => setActiveTab('history')}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95 ${
            activeTab === 'history'
              ? 'bg-[#E8DEF8] text-[#1D192B] shadow-sm'
              : 'text-[#49454F] hover:bg-[#6750A4]/8 hover:text-[#1C1B1F]'
          }`}
        >
          <History className="w-4 h-4 text-[#6750A4]" />
          History
        </button>

        {/* Reports */}
        <button
          onClick={() => setActiveTab('reports')}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95 ${
            activeTab === 'reports'
              ? 'bg-[#E8DEF8] text-[#1D192B] shadow-sm'
              : 'text-[#49454F] hover:bg-[#6750A4]/8 hover:text-[#1C1B1F]'
          }`}
        >
          <BarChart2 className="w-4 h-4 text-[#6750A4]" />
          Reports
        </button>

        {/* Settings */}
        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95 ${
            activeTab === 'settings'
              ? 'bg-[#E8DEF8] text-[#1D192B] shadow-sm'
              : 'text-[#49454F] hover:bg-[#6750A4]/8 hover:text-[#1C1B1F]'
          }`}
        >
          <Settings className="w-4 h-4 text-[#6750A4]" />
          Settings
        </button>
      </nav>

      {/* Sidebar Footer / User Profile */}
      <div className="p-3 border-t border-[#E7E0EC] bg-[#E7E0EC]/50 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center text-white font-bold text-sm shrink-0">
            {currentUser.fullName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <span className="font-semibold text-xs text-[#1C1B1F] block truncate">{currentUser.fullName}</span>
            <span className="text-[10px] text-[#49454F] block truncate">{currentUser.email}</span>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="p-1.5 text-[#49454F] hover:text-[#EF4444] hover:bg-[#EF4444]/10 rounded-full transition-colors active:scale-95"
          title="Log Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}

