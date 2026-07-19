import { useState } from 'react';
import { Logo } from '../Logo';
import { useAuth } from '../../contexts/AuthContext';
import {
  Home,
  FileText,
  ChevronDown,
  ChevronRight,
  FolderOpen,
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
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen?: boolean;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  currentUser,
  onLogout,
  collapsed,
  setCollapsed,
  mobileOpen = false
}: SidebarProps) {
  const { user } = useAuth();
  const [resumeOpen, setResumeOpen] = useState(true);
  const [linkedinOpen, setLinkedinOpen] = useState(false);

  // Helpers to determine active groups
  const isResumeTabGroupActive = ['resume-upload', 'resume-target', 'resume-matches', 'resume-gaps', 'resume-tailor', 'resume-covers'].includes(activeTab);
  const isLinkedinTabGroupActive = ['linkedin-posts', 'linkedin-scheduling', 'linkedin-connects', 'linkedin-impressions'].includes(activeTab);

  const isResumeTabActive = (tab: string) => activeTab === tab;

  return (
    <aside
      className={`bg-[#FBFBFB] text-[#121212] border-r border-[#EEEEEE] h-screen fixed left-0 top-0 flex flex-col justify-between z-50 font-sans select-none transition-transform duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      } ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
    >
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
        {/* Brand Header: Profiling with green magnifying glass logo & collapse toggle */}
        <div className={`p-4 flex items-center justify-between gap-3 ${collapsed ? 'flex-col justify-center' : ''}`}>
          <div className="flex items-center gap-3">
            <Logo variant="light" size={36} className="shrink-0" />
            {!collapsed && (
              <div className="flex flex-col text-left animate-fadeIn" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <span className="text-[20px] font-extrabold text-[#121212] tracking-[-0.025em] leading-none">
                  Profiling
                </span>
                <span className="text-[8.5px] font-bold text-[#8A8A8A] leading-none tracking-[0.3em] uppercase mt-1">
                  by morpheralabs
                </span>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`hidden lg:block p-1.5 rounded-lg text-[#8A8A8A] hover:text-[#121212] hover:bg-[#F3F3F3] transition-colors focus:outline-none shrink-0 ${
              collapsed ? 'mt-2' : ''
            }`}
            title={collapsed ? "Expand Sidebar" : "Minimize Sidebar"}
          >
            {collapsed ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="px-3 py-2 space-y-1.5 overflow-y-auto scrollbar-none">
          
          {/* 1. Home Tab */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center rounded-xl text-[13.5px] font-bold transition-all duration-200 text-left ${
              activeTab === 'dashboard'
                ? 'bg-[#1DB954]/8 text-[#121212]'
                : 'text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212]'
            } ${collapsed ? 'w-12 h-12 justify-center mx-auto' : 'w-full gap-3 px-3 py-2.5'}`}
            title="Home Dashboard"
          >
            <Home className={`w-5 h-5 shrink-0 ${activeTab === 'dashboard' ? 'text-[#1DB954]' : 'text-[#8A8A8A]'}`} />
            {!collapsed && <span>Home</span>}
          </button>

          {/* 2. Résumé Analyzer Tab Menu */}
          {collapsed ? (
            <button
              onClick={() => setActiveTab('resume-upload')}
              className={`flex items-center justify-center rounded-xl transition-all duration-200 mx-auto w-12 h-12 ${
                isResumeTabGroupActive
                  ? 'bg-[#1DB954]/8 text-[#121212]'
                  : 'text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212]'
              }`}
              title="Résumé Analyzer"
            >
              <FileText className={`w-5 h-5 shrink-0 ${isResumeTabGroupActive ? 'text-[#1DB954]' : 'text-[#8A8A8A]'}`} />
            </button>
          ) : (
            <div className="space-y-0.5">
              <button
                onClick={() => setResumeOpen(!resumeOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13.5px] font-bold text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212] transition-all duration-200 text-left"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#8A8A8A]" />
                  <span>Résumé analyzer</span>
                </div>
                {resumeOpen ? <ChevronDown className="w-4 h-4 text-[#B0B0B0]" /> : <ChevronRight className="w-4 h-4 text-[#B0B0B0]" />}
              </button>
              
              {resumeOpen && (
                <div className="pl-9 pr-2 space-y-0.5 animate-in fade-in slide-in-from-top-1 duration-150">
                  <button
                    onClick={() => setActiveTab('resume-upload')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 block ${
                      isResumeTabActive('resume-upload') 
                        ? 'bg-[#1DB954]/8 text-[#121212]' 
                        : 'text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212]'
                    }`}
                  >
                    Upload CV
                  </button>

                  <button
                    onClick={() => setActiveTab('resume-matches')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                      isResumeTabActive('resume-matches') 
                        ? 'bg-[#1DB954]/8 text-[#121212]' 
                        : 'text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212]'
                    }`}
                  >
                    <span>Job matches</span>
                    <span className="bg-[#1DB954]/12 text-[#0E9E48] text-[9.5px] font-extrabold px-1.5 py-0.5 rounded-full">
                      10
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('resume-gaps')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 block ${
                      isResumeTabActive('resume-gaps') 
                        ? 'bg-[#1DB954]/8 text-[#121212]' 
                        : 'text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212]'
                    }`}
                  >
                    Gaps &amp; keywords
                  </button>

                  <button
                    onClick={() => setActiveTab('resume-tailor')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 block ${
                      isResumeTabActive('resume-tailor') 
                        ? 'bg-[#1DB954]/8 text-[#121212]' 
                        : 'text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212]'
                    }`}
                  >
                    Tailored CV
                  </button>

                  <button
                    onClick={() => setActiveTab('resume-covers')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 block ${
                      isResumeTabActive('resume-covers') 
                        ? 'bg-[#1DB954]/8 text-[#121212]' 
                        : 'text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212]'
                    }`}
                  >
                    Cover letters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 3. LinkedIn Tab Menu */}
          {collapsed ? (
            <button
              onClick={() => setActiveTab('linkedin-posts')}
              className={`flex items-center justify-center rounded-xl transition-all duration-200 mx-auto w-12 h-12 ${
                isLinkedinTabGroupActive
                  ? 'bg-[#1DB954]/8 text-[#121212]'
                  : 'text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212]'
              }`}
              title="LinkedIn Growth"
            >
              <Linkedin className={`w-5 h-5 shrink-0 ${isLinkedinTabGroupActive ? 'text-[#1DB954]' : 'text-[#8A8A8A]'}`} />
            </button>
          ) : (
            <div className="space-y-0.5">
              <button
                onClick={() => setLinkedinOpen(!linkedinOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13.5px] font-bold text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212] transition-all duration-200 text-left"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-[#8A8A8A]" />
                  <span>LinkedIn</span>
                </div>
                {linkedinOpen ? <ChevronDown className="w-4 h-4 text-[#B0B0B0]" /> : <ChevronRight className="w-4 h-4 text-[#B0B0B0]" />}
              </button>
              
              {linkedinOpen && (
                <div className="pl-9 pr-2 space-y-0.5 animate-in fade-in slide-in-from-top-1 duration-150">
                  <button
                    onClick={() => setActiveTab('linkedin-posts')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                      activeTab === 'linkedin-posts' ? 'bg-[#1DB954]/8 text-[#121212]' : 'text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212]'
                    }`}
                  >
                    <span>Posts</span>
                    <span className="text-[8px] font-extrabold text-[#8A8A8A] bg-[#EEEEEE] px-1.5 py-0.5 rounded uppercase tracking-wider scale-90">Soon</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('linkedin-scheduling')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                      activeTab === 'linkedin-scheduling' ? 'bg-[#1DB954]/8 text-[#121212]' : 'text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212]'
                    }`}
                  >
                    <span>Scheduling</span>
                    <span className="text-[8px] font-extrabold text-[#8A8A8A] bg-[#EEEEEE] px-1.5 py-0.5 rounded uppercase tracking-wider scale-90">Soon</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('linkedin-connects')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                      activeTab === 'linkedin-connects' ? 'bg-[#1DB954]/8 text-[#121212]' : 'text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212]'
                    }`}
                  >
                    <span>Connects</span>
                    <span className="text-[8px] font-extrabold text-[#8A8A8A] bg-[#EEEEEE] px-1.5 py-0.5 rounded uppercase tracking-wider scale-90">Soon</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('linkedin-impressions')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                      activeTab === 'linkedin-impressions' ? 'bg-[#1DB954]/8 text-[#121212]' : 'text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212]'
                    }`}
                  >
                    <span>Impressions</span>
                    <span className="text-[8px] font-extrabold text-[#8A8A8A] bg-[#EEEEEE] px-1.5 py-0.5 rounded uppercase tracking-wider scale-90">Soon</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 4. My Projects */}
          <button
            onClick={() => setActiveTab('my-documents')}
            className={`flex items-center rounded-xl text-[13.5px] font-bold transition-all duration-200 text-left ${
              activeTab === 'my-documents'
                ? 'bg-[#1DB954]/8 text-[#121212]'
                : 'text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212]'
            } ${collapsed ? 'w-12 h-12 justify-center mx-auto' : 'w-full gap-3 px-3 py-2.5'}`}
            title="My Projects"
          >
            <FolderOpen className={`w-5 h-5 shrink-0 ${activeTab === 'my-documents' ? 'text-[#1DB954]' : 'text-[#8A8A8A]'}`} />
            {!collapsed && <span>My projects</span>}
          </button>

          {/* 5. Settings */}
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center rounded-xl text-[13.5px] font-bold transition-all duration-200 text-left ${
              activeTab === 'settings'
                ? 'bg-[#1DB954]/8 text-[#121212]'
                : 'text-[#5B5B5B] hover:bg-[#F3F3F3] hover:text-[#121212]'
            } ${collapsed ? 'w-12 h-12 justify-center mx-auto' : 'w-full gap-3 px-3 py-2.5'}`}
            title="Settings"
          >
            <Settings className={`w-5 h-5 shrink-0 ${activeTab === 'settings' ? 'text-[#1DB954]' : 'text-[#8A8A8A]'}`} />
            {!collapsed && <span>Settings</span>}
          </button>

        </nav>
      </div>

      {/* Upgrade Banner & User Profile Footer */}
      <div className="p-4 space-y-4 border-t border-[#EEEEEE] shrink-0">
        
        {/* Dynamic Upgrade Card Box (hidden if collapsed) */}
        {!collapsed && (() => {
          const registrationDate = user?.createdAt ? new Date(user.createdAt) : new Date();
          const daysSinceReg = Math.floor((Date.now() - registrationDate.getTime()) / (1000 * 60 * 60 * 24));
          const trialDaysLeft = Math.max(0, 30 - daysSinceReg);
          const isPro = user?.subscriptionStatus === 'active';

          if (isPro) {
            return (
              <div className="bg-[#121212] rounded-2xl p-4 text-left text-white select-none shadow-xl border border-[#282828] animate-fadeIn">
                <div className="font-extrabold text-[12.5px] tracking-wide text-[#1DB954]">Pro Plan Active</div>
                <div className="text-[11px] text-[#A7A7A7] mt-1.5 font-medium leading-relaxed">
                  All premium features, including My Projects auto-alignment, are fully unlocked.
                </div>
              </div>
            );
          }

          return (
            <div className="bg-[#121212] rounded-2xl p-4 text-left text-white select-none shadow-xl border border-[#282828] animate-fadeIn">
              <div className="flex justify-between items-center">
                <div className="font-extrabold text-[12.5px] tracking-wide">30-Day Trial Active</div>
                <span className="text-[9px] font-bold bg-[#1DB954]/15 text-[#1DB954] px-2 py-0.5 rounded">Free</span>
              </div>
              <div className="text-[11px] text-[#A7A7A7] mt-1 font-medium">{trialDaysLeft} days left in trial</div>
              <div className="h-1.5 rounded-full bg-[#282828] mt-3 overflow-hidden">
                <div 
                  className="h-full bg-[#1DB954] rounded-full transition-all duration-500" 
                  style={{ width: `${Math.round((trialDaysLeft / 30) * 100)}%` }}
                ></div>
              </div>
              <a 
                href="https://pay.rev.cat/poaaekrofyijbwwq"
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center mt-4 font-bold text-[11px] tracking-wider uppercase text-[#121212] bg-[#1DB954] py-2.5 rounded-full hover:scale-95 active:scale-90 transition-all"
              >
                Upgrade to Pro ($1.99)
              </a>
            </div>
          );
        })()}

        {/* User Card */}
        <div className={`pt-3.5 border-t border-[#EEEEEE] flex ${collapsed ? 'flex-col items-center gap-3.5' : 'items-center justify-between gap-2.5'}`}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#1DB954] flex items-center justify-center text-white font-extrabold text-sm shrink-0 shadow-sm" title={currentUser.fullName}>
              {currentUser.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'AR'}
            </div>
            {!collapsed && (
              <div className="min-w-0 text-left animate-fadeIn">
                <span className="font-extrabold text-[12.5px] text-[#121212] block truncate leading-tight">{currentUser.fullName}</span>
                <span className="text-[10px] text-[#8A8A8A] block truncate leading-none mt-0.5">{currentUser.email}</span>
              </div>
            )}
          </div>
          
          <button
            onClick={onLogout}
            className={`p-2 text-[#8A8A8A] hover:text-[#E22134] hover:bg-[#E22134]/8 rounded-full transition-all active:scale-95 shrink-0`}
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
