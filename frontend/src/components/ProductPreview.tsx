import { Search, Bell, LayoutDashboard, FileText, Linkedin, MessageSquare, LineChart, Settings, ExternalLink } from 'lucide-react';

export default function ProductPreview() {
  return (
    <section className="py-20 md:py-28 px-6 bg-slate-50/50 border-b border-border">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-bold text-primary tracking-wider uppercase bg-primary/10 px-3 py-1 rounded-full">
            Product Walkthrough
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-text-primary mt-4 mb-4 tracking-tight">
            Designed for high-performance careers
          </h2>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
            Take a look inside the Profiling Workspace. An intuitive interface engineered to accelerate your personal brand.
          </p>
        </div>

        {/* Laptop Mockup Wrapper */}
        <div className="relative mx-auto max-w-5xl">
          {/* Laptop Screen Bezel */}
          <div className="bg-[#1e1e24] p-3 sm:p-4 rounded-t-2xl shadow-2xl border-t border-x border-[#3a3a45]">
            {/* Screen Inner Frame */}
            <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800 aspect-[16/10] relative flex flex-col">
              
              {/* Camera Notch / Dot */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex gap-1 z-35">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                <span className="w-1 h-1 rounded-full bg-blue-500/80" />
              </div>

              {/* Dashboard Content */}
              <div className="flex flex-1 overflow-hidden text-left bg-slate-50 text-slate-800 text-xs font-sans">
                
                {/* Sidebar */}
                <aside className="w-40 sm:w-48 bg-white border-r border-slate-200 hidden sm:flex flex-col justify-between p-4 shrink-0">
                  <div className="flex flex-col gap-6">
                    {/* Sidebar Logo */}
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                        <span className="text-white font-extrabold text-xs">P</span>
                      </div>
                      <span className="font-bold text-sm text-text-primary tracking-tight">Profiling</span>
                    </div>

                    {/* Sidebar Nav */}
                    <nav className="flex flex-col gap-1">
                      <a href="#preview" className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-primary/10 text-primary font-medium">
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        Dashboard
                      </a>
                      <a href="#preview" className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-text-secondary hover:bg-slate-100 hover:text-text-primary transition-colors">
                        <FileText className="w-3.5 h-3.5" />
                        Resume Analyzer
                      </a>
                      <a href="#preview" className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-text-secondary hover:bg-slate-100 hover:text-text-primary transition-colors">
                        <Linkedin className="w-3.5 h-3.5" />
                        LinkedIn Workspace
                      </a>
                      <a href="#preview" className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-text-secondary hover:bg-slate-100 hover:text-text-primary transition-colors">
                        <MessageSquare className="w-3.5 h-3.5" />
                        Content Generator
                      </a>
                      <a href="#preview" className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-text-secondary hover:bg-slate-100 hover:text-text-primary transition-colors">
                        <LineChart className="w-3.5 h-3.5" />
                        Career Insights
                      </a>
                    </nav>
                  </div>

                  <div className="flex flex-col gap-1">
                    <a href="#preview" className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-text-secondary hover:bg-slate-100 hover:text-text-primary transition-colors">
                      <Settings className="w-3.5 h-3.5" />
                      Settings
                    </a>
                  </div>
                </aside>

                {/* Main Workspace Area */}
                <div className="flex-1 flex flex-col min-w-0">
                  
                  {/* Top Bar */}
                  <header className="h-10 bg-white border-b border-slate-200 px-4 flex items-center justify-between gap-4">
                    <div className="relative w-44 sm:w-60">
                      <Search className="w-3.5 h-3.5 text-text-secondary absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search positions, keywords..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-md pl-8 pr-3 py-1 text-[11px] focus:outline-none"
                        disabled
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="p-1 rounded-full text-text-secondary hover:bg-slate-100 relative">
                        <Bell className="w-3.5 h-3.5" />
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-danger" />
                      </button>
                      <span className="h-4 w-px bg-slate-200" />
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-slate-200 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-tr from-primary to-blue-300" />
                        </div>
                        <span className="font-medium text-text-primary hidden md:inline">Alex Carter</span>
                      </div>
                    </div>
                  </header>

                  {/* Dashboard Body */}
                  <main className="flex-1 p-4 overflow-y-auto space-y-4">
                    
                    {/* Greeting & Quick Summary */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                      <div>
                        <h3 className="text-sm font-bold text-text-primary">Welcome back, Alex</h3>
                        <p className="text-[10px] text-text-secondary">Here's your career optimization status today.</p>
                      </div>
                      <div className="text-[10px] text-text-secondary bg-white border border-slate-200 px-2 py-1 rounded">
                        Last synced: 3 mins ago
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-white p-3 border border-slate-200 rounded-lg">
                        <span className="text-[10px] font-medium text-text-secondary block">ATS Score</span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-lg font-bold text-text-primary">82%</span>
                          <span className="text-[9px] text-success font-medium">+4%</span>
                        </div>
                      </div>
                      <div className="bg-white p-3 border border-slate-200 rounded-lg">
                        <span className="text-[10px] font-medium text-text-secondary block">LinkedIn Views</span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-lg font-bold text-text-primary">1,248</span>
                          <span className="text-[9px] text-success font-medium">+24%</span>
                        </div>
                      </div>
                      <div className="bg-white p-3 border border-slate-200 rounded-lg">
                        <span className="text-[10px] font-medium text-text-secondary block">Active Matches</span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-lg font-bold text-text-primary">14 Roles</span>
                          <span className="text-[9px] text-primary font-medium">8 High</span>
                        </div>
                      </div>
                      <div className="bg-white p-3 border border-slate-200 rounded-lg">
                        <span className="text-[10px] font-medium text-text-secondary block">Weekly Posts</span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-lg font-bold text-text-primary">3 / 5</span>
                          <span className="text-[9px] text-text-secondary font-medium">Scheduled</span>
                        </div>
                      </div>
                    </div>

                    {/* Inner Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                      
                      {/* Active Job Matches */}
                      <div className="bg-white border border-slate-200 rounded-lg p-3 md:col-span-8 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-bold text-[11px] text-text-primary">AI-Matched Open Roles</span>
                            <a href="#preview" className="text-[10px] text-primary font-medium hover:underline flex items-center gap-0.5">
                              View all matches
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                          
                          {/* Mock Table */}
                          <div className="space-y-2">
                            <div className="grid grid-cols-12 font-semibold text-[10px] text-text-secondary border-b border-slate-100 pb-1">
                              <span className="col-span-5">Company & Role</span>
                              <span className="col-span-3">Compatibility</span>
                              <span className="col-span-2">ATS Score</span>
                              <span className="col-span-2 text-right">Action</span>
                            </div>
                            <div className="grid grid-cols-12 text-[10px] text-text-primary items-center py-0.5 border-b border-slate-100">
                              <span className="col-span-5 font-medium">Stripe — Staff Frontend Engineer</span>
                              <span className="col-span-3 text-success font-medium">96% High Match</span>
                              <span className="col-span-2 font-medium">91%</span>
                              <button className="col-span-2 text-right text-primary font-bold hover:underline">Apply</button>
                            </div>
                            <div className="grid grid-cols-12 text-[10px] text-text-primary items-center py-0.5 border-b border-slate-100">
                              <span className="col-span-5 font-medium">Vercel — Senior React Developer</span>
                              <span className="col-span-3 text-success font-medium">92% High Match</span>
                              <span className="col-span-2 font-medium">88%</span>
                              <button className="col-span-2 text-right text-primary font-bold hover:underline">Apply</button>
                            </div>
                            <div className="grid grid-cols-12 text-[10px] text-text-primary items-center py-0.5">
                              <span className="col-span-5 font-medium">Linear — Product Designer</span>
                              <span className="col-span-3 text-warning font-medium">81% Mid Match</span>
                              <span className="col-span-2 font-medium">74%</span>
                              <button className="col-span-2 text-right text-primary font-bold hover:underline">Optimize</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* LinkedIn Schedule */}
                      <div className="bg-white border border-slate-200 rounded-lg p-3 md:col-span-4 flex flex-col justify-between">
                        <div>
                          <span className="font-bold text-[11px] text-text-primary block mb-3">LinkedIn Workspace Insights</span>
                          <div className="space-y-2">
                            <div className="p-2 bg-slate-50 border border-slate-100 rounded">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-[10px] text-text-primary">Optimized Headline Idea</span>
                                <span className="text-[8px] bg-primary/10 text-primary px-1 rounded font-medium">AI Idea</span>
                              </div>
                              <p className="text-[9px] text-text-secondary leading-tight italic">
                                "Senior Frontend Engineer | React Specialist | Building high-performance developer tools"
                              </p>
                            </div>
                            <div className="p-2 bg-slate-50 border border-slate-100 rounded">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-[10px] text-text-primary">Engagement Spike Target</span>
                                <span className="text-[8px] bg-success/10 text-success px-1 rounded font-medium">Insight</span>
                              </div>
                              <p className="text-[9px] text-text-secondary leading-tight">
                                Posting on Tuesdays at 9:00 AM matches active periods for engineering recruiters.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </main>
                </div>

              </div>
            </div>
          </div>

          {/* Laptop Base Bezel */}
          <div className="bg-[#2c2c34] h-4 rounded-b-2xl shadow-2xl relative border-t border-[#3f3f4a]">
            {/* Display Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-[#19191e] rounded-b-md" />
          </div>
        </div>

      </div>
    </section>
  );
}
