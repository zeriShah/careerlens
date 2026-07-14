import { Check, X, ShieldAlert, Sparkles } from 'lucide-react';

export default function WhyCareerLens() {
  return (
    <section id="about" className="py-20 md:py-28 px-6 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-bold text-primary tracking-wider uppercase bg-primary/10 px-3 py-1 rounded-full">
            The Better Way
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-text-primary mt-4 mb-4 tracking-tight">
            How Profiling compares
          </h2>
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
            Discover why modern professionals choose Profiling over traditional templates and static checkers.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Traditional Tools Card */}
          <div className="bg-slate-50 border border-border rounded-lg p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-lg bg-slate-200/60 flex items-center justify-center text-text-secondary">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-lg text-text-primary">Traditional Methods</h3>
                  <span className="text-xs text-text-secondary">Static, Disconnected, Manual</span>
                </div>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-danger shrink-0 mt-0.5" />
                  <span className="text-sm text-text-secondary">
                    Disconnected checkers: separate sites for resumes, cover letters, and LinkedIn.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-danger shrink-0 mt-0.5" />
                  <span className="text-sm text-text-secondary">
                    Static suggestions: generic checklists that don't match specific recruiters.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-danger shrink-0 mt-0.5" />
                  <span className="text-sm text-text-secondary">
                    Manual post scheduling: no insight on when or what to post to build personal brand.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-danger shrink-0 mt-0.5" />
                  <span className="text-sm text-text-secondary">
                    No matching: you manually search and apply to thousands of cold listings.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Profiling Card */}
          <div className="bg-white border-2 border-primary rounded-lg p-8 shadow-md flex flex-col justify-between relative overflow-hidden">
            {/* Ribbon */}
            <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold tracking-wider px-3 py-1 uppercase rounded-bl">
              Recommended
            </div>

            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-lg text-text-primary">Profiling Platform</h3>
                  <span className="text-xs text-primary font-medium">All-In-One Career Copilot</span>
                </div>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-text-primary font-medium">
                    Integrated Workspace: resume feedback, LinkedIn posting, and job matches in one spot.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-text-primary font-medium">
                    recruiter-informed AI adjustments tailored specifically to your target roles.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-text-primary font-medium">
                    Automated content scheduler with AI drafts customized to match your voice.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-text-primary font-medium">
                    ATS-matched job discovery: instant compatibility rankings and direct application paths.
                  </span>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
