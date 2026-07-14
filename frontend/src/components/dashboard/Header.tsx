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
    <header className="sticky top-0 z-30 w-full h-16 bg-background/80 backdrop-blur-md border-b border-border/80 px-8 flex items-center justify-between">
      
      {/* Header Title Section */}
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-bold text-text-primary capitalize tracking-tight">
          {activeTab.replace('-', ' ')}
        </h1>
        <span className="h-4 w-px bg-border/80" />
        <div className="flex items-center gap-1 bg-success/15 text-[10px] font-bold text-success px-2 py-0.5 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span>Workspace Sync Active</span>
        </div>
      </div>

      {/* Header Controls (Search, Notify, Profile) */}
      <div className="flex items-center gap-4 relative">
        
        {/* Search Input */}
        <div className="relative w-56">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-100 border border-transparent rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-200 transition-colors"
          />
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger border border-white" />
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-lg p-3 space-y-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-left">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-800">Notifications</span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-[10px] text-primary font-bold hover:underline"
                >
                  Clear all
                </button>
              </div>
              <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                {notifications.map((notif) => (
                  <div key={notif.id} className="py-2.5 space-y-1">
                    <p className="text-[11px] text-slate-700 leading-normal font-medium">
                      {notif.text}
                    </p>
                    <span className="text-[9px] text-slate-400 block flex items-center gap-1">
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
            className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs cursor-pointer border border-transparent hover:border-slate-200 transition-all"
          >
            {currentUser.fullName.charAt(0).toUpperCase()}
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-left">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-800 block truncate">{currentUser.fullName}</p>
                <p className="text-[10px] text-slate-400 block truncate">{currentUser.email}</p>
              </div>
              <button
                onClick={() => { setShowProfileMenu(false); setActiveTab('settings'); }}
                className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
              >
                Account Settings
              </button>
              <button
                onClick={() => { setShowProfileMenu(false); navigate('/'); }}
                className="w-full text-left px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
              >
                Public Landing Page
              </button>
              <hr className="border-slate-100 my-1" />
              <button
                onClick={() => { setShowProfileMenu(false); onLogout(); }}
                className="w-full text-left px-3 py-1.5 text-xs text-danger hover:bg-danger/5 font-semibold"
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
