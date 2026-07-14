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
    <aside className="w-64 bg-dark text-white border-r border-neutral-800/80 h-screen fixed left-0 top-0 flex flex-col justify-between z-40">
      
      {/* Workspace Brand */}
      <div className="p-5 border-b border-neutral-800/80 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center shadow-lg shadow-indigo-500/10">
          <span className="text-white font-black text-lg">P</span>
        </div>
        <div>
          <span className="font-bold text-sm text-white block leading-tight">Profiling</span>
          <span className="text-[10px] text-neutral-500 font-medium">Workspace v1.0.0</span>
        </div>
      </div>

      {/* Sidebar Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        
        {/* Main Dashboard Link */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
            activeTab === 'dashboard'
              ? 'bg-white/10 text-white shadow-sm'
              : 'text-neutral-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 text-indigo-400" />
          Dashboard
        </button>

        {/* Resume Section (Collapsible) */}
        <div className="space-y-1">
          <button
            onClick={() => setResumeOpen(!resumeOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-neutral-400 hover:bg-white/5 hover:text-white transition-all duration-150"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Resume</span>
            </div>
            {resumeOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
          
          {resumeOpen && (
            <div className="pl-9 pr-2 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
              <button
                onClick={() => setActiveTab('resume-analyzer')}
                className={`w-full text-left px-2.5 py-1.5 rounded text-[11px] font-semibold transition-all block ${
                  activeTab === 'resume-analyzer' 
                    ? 'text-white bg-white/10' 
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Resume Analyzer
              </button>
              <button
                onClick={() => setActiveTab('resume-skills')}
                className={`w-full text-left px-2.5 py-1.5 rounded text-[11px] font-semibold transition-all block ${
                  activeTab === 'resume-skills' 
                    ? 'text-white bg-white/10' 
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Gaps & Matching
              </button>
              <button
                onClick={() => setActiveTab('resume-tailor')}
                className={`w-full text-left px-2.5 py-1.5 rounded text-[11px] font-semibold transition-all block ${
                  activeTab === 'resume-tailor' 
                    ? 'text-white bg-white/10' 
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
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
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-neutral-400 hover:bg-white/5 hover:text-white transition-all duration-150"
          >
            <div className="flex items-center gap-3">
              <Linkedin className="w-4 h-4 text-indigo-400" />
              <span>LinkedIn</span>
            </div>
            {linkedinOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
          
          {linkedinOpen && (
            <div className="pl-9 pr-2 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
              <button
                onClick={() => setActiveTab('linkedin-enhancer')}
                className={`w-full text-left px-2.5 py-1.5 rounded text-[11px] font-semibold transition-all block ${
                  activeTab === 'linkedin-enhancer' 
                    ? 'text-white bg-white/10' 
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Profile Enhancer
              </button>
              <button
                onClick={() => setActiveTab('linkedin-generator')}
                className={`w-full text-left px-2.5 py-1.5 rounded text-[11px] font-semibold transition-all block ${
                  activeTab === 'linkedin-generator' 
                    ? 'text-white bg-white/10' 
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Post Generator
              </button>
              <button
                onClick={() => setActiveTab('linkedin-scheduler')}
                className={`w-full text-left px-2.5 py-1.5 rounded text-[11px] font-semibold transition-all block ${
                  activeTab === 'linkedin-scheduler' 
                    ? 'text-white bg-white/10' 
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Post Schedule
              </button>
            </div>
          )}
        </div>

        <hr className="border-neutral-800/80 my-2" />

        {/* History */}
        <button
          onClick={() => setActiveTab('history')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
            activeTab === 'history'
              ? 'bg-white/10 text-white shadow-sm'
              : 'text-neutral-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <History className="w-4 h-4 text-indigo-400" />
          History
        </button>

        {/* Reports */}
        <button
          onClick={() => setActiveTab('reports')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
            activeTab === 'reports'
              ? 'bg-white/10 text-white shadow-sm'
              : 'text-neutral-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <BarChart2 className="w-4 h-4 text-indigo-400" />
          Reports
        </button>

        {/* Settings */}
        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
            activeTab === 'settings'
              ? 'bg-white/10 text-white shadow-sm'
              : 'text-neutral-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4 text-indigo-400" />
          Settings
        </button>
      </nav>

      {/* Sidebar Footer / User Profile */}
      <div className="p-3 border-t border-neutral-800/80 bg-neutral-900/60 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center text-white font-bold text-sm shrink-0">
            {currentUser.fullName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <span className="font-semibold text-xs text-white block truncate">{currentUser.fullName}</span>
            <span className="text-[10px] text-neutral-500 block truncate">{currentUser.email}</span>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="p-1.5 text-neutral-400 hover:text-danger hover:bg-danger/10 rounded-lg transition-colors"
          title="Log Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}

