import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Clock } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentUser: {
    fullName: string;
    email: string;
  };
  onLogout: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  currentUser,
  onLogout
}: HeaderProps) {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: 1, text: "Resume score improved to 84% after optimization suggestion.", time: "2 hours ago", unread: true },
    { id: 2, text: "Scheduled post on AI tooling is set for Tuesday 9:00 AM.", time: "1 day ago", unread: false },
    { id: 3, text: "Your LinkedIn impressions grew by 12% this week!", time: "2 days ago", unread: false }
  ];

  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#F0F0F0] px-8 flex items-center justify-between">
      
      {/* Header Title Section */}
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-extrabold text-[#121212] capitalize tracking-tight font-sans">
          {activeTab.replace('-', ' ')}
        </h1>
        <span className="h-4 w-px bg-[#F0F0F0]" />
        <div className="flex items-center gap-1.5 bg-[#1DB954]/10 text-[10px] font-bold text-[#0E9E48] px-2.5 py-0.5 rounded-full border border-[#1DB954]/20">
          <div className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-pulse" />
          <span>Workspace Sync Active</span>
        </div>
      </div>

      {/* Header Controls (Search, Notify, Profile) */}
      <div className="flex items-center gap-4 relative">
        
        {/* Search Input (Connect UIUX Pill style) */}
        <div className="relative w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8A8A]" />
          <input
            type="text"
            placeholder="Search roles, documents…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-11 pr-4 bg-[#F3F3F3] border-none rounded-full text-xs placeholder:text-[#8A8A8A] text-[#121212] focus:outline-none focus:bg-[#EBEBEB] transition-all"
          />
        </div>

        {/* Notification Bell (Connect UIUX style) */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="w-[42px] h-[42px] bg-[#F3F3F3] hover:bg-[#EBEBEB] text-[#5B5B5B] rounded-full flex items-center justify-center relative active:scale-95 transition-all"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-[10px] right-[11px] w-2 h-2 rounded-full bg-[#E22134] border border-[#FFFFFF]" />
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-[#EBEBEB] rounded-2xl shadow-card p-4 space-y-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-left">
              <div className="flex justify-between items-center border-b border-[#F0F0F0] pb-2">
                <span className="text-xs font-extrabold text-[#121212]">Notifications</span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-[10px] text-[#1DB954] font-bold hover:underline"
                >
                  Clear all
                </button>
              </div>
              <div className="divide-y divide-[#F0F0F0] max-h-60 overflow-y-auto">
                {notifications.map((notif) => (
                  <div key={notif.id} className="py-2.5 space-y-1">
                    <p className="text-[11px] text-[#121212] leading-normal font-medium">
                      {notif.text}
                    </p>
                    <span className="text-[9px] text-[#5B5B5B] block flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {notif.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown Trigger */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="w-9 h-9 rounded-full bg-[#1DB954] flex items-center justify-center text-white font-extrabold text-xs cursor-pointer border-2 border-transparent hover:border-[#1DB954] transition-all active:scale-95 shadow-sm"
          >
            {currentUser.fullName.charAt(0).toUpperCase()}
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-[#EBEBEB] rounded-2xl shadow-card py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-left">
              <div className="px-4 py-2 border-b border-[#F0F0F0]">
                <p className="text-xs font-extrabold text-[#121212] block truncate">{currentUser.fullName}</p>
                <p className="text-[10px] text-[#5B5B5B] block truncate">{currentUser.email}</p>
              </div>
              <button
                onClick={() => { setShowProfileMenu(false); setActiveTab('settings'); }}
                className="w-full text-left px-4 py-2 text-xs text-[#121212] hover:bg-[#F3F3F3] transition-colors"
              >
                Account Settings
              </button>
              <button
                onClick={() => { setShowProfileMenu(false); navigate('/'); }}
                className="w-full text-left px-4 py-2 text-xs text-[#121212] hover:bg-[#F3F3F3] transition-colors"
              >
                Public Landing Page
              </button>
              <hr className="border-[#F0F0F0] my-1" />
              <button
                onClick={() => { setShowProfileMenu(false); onLogout(); }}
                className="w-full text-left px-4 py-2 text-xs text-[#E22134] hover:bg-[#E22134]/10 font-bold transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
