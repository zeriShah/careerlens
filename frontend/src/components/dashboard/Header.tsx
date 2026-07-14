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
    <header className="sticky top-0 z-30 w-full h-16 bg-[#FFFBFE]/80 backdrop-blur-md border-b border-[#E7E0EC] px-8 flex items-center justify-between">
      
      {/* Header Title Section */}
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-bold text-[#1C1B1F] capitalize tracking-tight font-sans">
          {activeTab.replace('-', ' ')}
        </h1>
        <span className="h-4 w-px bg-[#E7E0EC]" />
        <div className="flex items-center gap-1.5 bg-[#22C55E]/10 text-[10px] font-bold text-[#22C55E] px-2.5 py-0.5 rounded-full border border-[#22C55E]/20">
          <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
          <span>Workspace Sync Active</span>
        </div>
      </div>

      {/* Header Controls (Search, Notify, Profile) */}
      <div className="flex items-center gap-4 relative">
        
        {/* Search Input (MD3 Filled Field Style) */}
        <div className="relative w-56">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#49454F]" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 bg-[#E7E0EC] border-b-2 border-[#79747E] rounded-t-lg text-xs placeholder:text-[#49454F]/60 text-[#1C1B1F] focus:outline-none focus:border-[#6750A4] focus:bg-[#E7E0EC] transition-all"
          />
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 text-[#49454F] hover:text-[#1C1B1F] hover:bg-[#6750A4]/8 rounded-full transition-colors relative active:scale-95"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#EF4444] border border-[#FFFBFE]" />
          </button>

          {/* Notifications Dropdown Panel (MD3 Surface Container XL Card) */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#F3EDF7] border border-[#E7E0EC] rounded-2xl shadow-md p-4 space-y-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-left">
              <div className="flex justify-between items-center border-b border-[#E7E0EC] pb-2">
                <span className="text-xs font-bold text-[#1C1B1F]">Notifications</span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-[10px] text-[#6750A4] font-bold hover:underline"
                >
                  Clear all
                </button>
              </div>
              <div className="divide-y divide-[#E7E0EC] max-h-60 overflow-y-auto">
                {notifications.map((notif) => (
                  <div key={notif.id} className="py-2.5 space-y-1">
                    <p className="text-[11px] text-[#1C1B1F] leading-normal font-medium">
                      {notif.text}
                    </p>
                    <span className="text-[9px] text-[#49454F] block flex items-center gap-1">
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
            className="w-8 h-8 rounded-full bg-[#E8DEF8] flex items-center justify-center text-[#1D192B] font-bold text-xs cursor-pointer border border-transparent hover:border-[#79747E] transition-all active:scale-95"
          >
            {currentUser.fullName.charAt(0).toUpperCase()}
          </button>

          {/* Profile Dropdown (MD3 Surface XL Card) */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-[#F3EDF7] border border-[#E7E0EC] rounded-2xl shadow-md py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-left">
              <div className="px-4 py-2 border-b border-[#E7E0EC]">
                <p className="text-xs font-bold text-[#1C1B1F] block truncate">{currentUser.fullName}</p>
                <p className="text-[10px] text-[#49454F] block truncate">{currentUser.email}</p>
              </div>
              <button
                onClick={() => { setShowProfileMenu(false); setActiveTab('settings'); }}
                className="w-full text-left px-4 py-2 text-xs text-[#1C1B1F] hover:bg-[#6750A4]/8 transition-colors"
              >
                Account Settings
              </button>
              <button
                onClick={() => { setShowProfileMenu(false); navigate('/'); }}
                className="w-full text-left px-4 py-2 text-xs text-[#1C1B1F] hover:bg-[#6750A4]/8 transition-colors"
              >
                Public Landing Page
              </button>
              <hr className="border-[#E7E0EC] my-1" />
              <button
                onClick={() => { setShowProfileMenu(false); onLogout(); }}
                className="w-full text-left px-4 py-2 text-xs text-[#EF4444] hover:bg-[#EF4444]/10 font-bold transition-colors"
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
