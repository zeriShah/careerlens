import { Search, Plus, Menu } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onNewAnalysis?: () => void;
  onMenuClick?: () => void;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  onNewAnalysis,
  onMenuClick
}: HeaderProps) {


  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#F0F0F0] px-4 lg:px-8 flex items-center gap-3 justify-between select-none">

      {/* Left group: mobile menu button + search */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {/* Hamburger — opens the sidebar drawer on mobile */}
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          className="lg:hidden p-2 -ml-1 rounded-lg text-[#5B5B5B] hover:bg-[#F3F3F3] transition-colors shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Input (Connect UIUX Pill style) */}
        <div className="relative w-full max-w-[340px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8A8A]" />
          <input
            type="text"
            placeholder="Search roles, documents…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-11 pr-4 bg-[#F3F3F3] border-none rounded-full text-xs placeholder:text-[#8A8A8A] text-[#121212] focus:outline-none focus:bg-[#EBEBEB] transition-all"
          />
        </div>
      </div>

      {/* Header Controls (Notify, New Analysis) */}
      <div className="flex items-center gap-3 shrink-0">


        {/* "+ NEW ANALYSIS" Pill Button */}
        <button
          onClick={onNewAnalysis}
          className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 bg-[#1DB954] hover:bg-[#1aa34a] text-white text-xs font-extrabold rounded-full active:scale-95 transition-all shadow-sm focus:outline-none select-none uppercase tracking-wide"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Analysis</span>
        </button>

      </div>
    </header>
  );
}
