import { ArrowLeft, Check, AlertCircle } from 'lucide-react';

interface ResumeGapsTabProps {
  setActiveTab: (tab: string) => void;
  selectedRole?: {
    title: string;
    company: string;
    location: string;
    logo: string;
    score: number;
    matchingSkills: string[];
    missingSkills: string[];
  };
}

export default function ResumeGapsTab({ setActiveTab, selectedRole }: ResumeGapsTabProps) {
  // Default values mapping to the design screenshot if none selected
  const role = selectedRole || {
    title: 'Sr. Product Designer',
    company: 'Northwind',
    location: 'Remote · US',
    logo: 'N',
    score: 96,
    matchingSkills: ['Design systems', 'Prototyping', 'User research'],
    missingSkills: ['TypeScript']
  };

  return (
    <div className="space-y-6 font-sans text-left animate-fadeIn max-w-3xl mx-auto">
      
      {/* Back to matches navigation link */}
      <button
        onClick={() => setActiveTab('resume-matches')}
        className="flex items-center gap-1.5 text-[#5B5B5B] hover:text-[#121212] font-bold text-xs transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to matches</span>
      </button>

      {/* Role overview header card */}
      <div className="bg-white border border-[#EEEEEE] rounded-2xl p-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-[50px] h-[50px] rounded-xl bg-[#F3F3F3] text-[#5B5B5B] flex items-center justify-center font-extrabold text-base shrink-0 select-none">
            {role.logo}
          </div>
          <div>
            <h2 className="text-[17px] font-black text-[#121212] tracking-tight">{role.title}</h2>
            <p className="text-[12.5px] text-[#8A8A8A] mt-0.5 font-medium">{role.company} · {role.location}</p>
          </div>
        </div>

        {/* Circular Gauge Score */}
        <div className="relative w-[52px] h-[52px] flex items-center justify-center shrink-0 select-none">
          <svg className="w-[52px] h-[52px] transform -rotate-90">
            <circle cx="26" cy="26" r="22" className="stroke-[#EBEBEB] fill-none" strokeWidth="3.5" />
            <circle cx="26" cy="26" r="22" className="stroke-[#1DB954] fill-none" strokeWidth="3.5" strokeDasharray="138.2" strokeDashoffset={138.2 * (1 - role.score / 100)} strokeLinecap="round" />
          </svg>
          <span className="absolute font-sans font-extrabold text-[13.5px] text-[#121212]">{role.score}</span>
        </div>
      </div>

      {/* Keywords and Gaps column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 select-none">
        
        {/* Keywords Covered */}
        <div className="bg-white border border-[#EEEEEE] rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-[#0E9E48] font-bold text-xs uppercase tracking-wider">
            <Check className="w-4 h-4" />
            <span>Keywords you cover</span>
          </div>
          <div className="space-y-3.5">
            {role.matchingSkills.map(skill => (
              <div key={skill} className="flex justify-between items-center text-xs py-1 border-b border-[#F9F9F9]">
                <div className="flex items-center gap-2 font-bold text-[#121212]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954]" />
                  {skill}
                </div>
                <span className="text-[#0E9E48] font-bold text-[10px]">Strong</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gaps to Close */}
        <div className="bg-white border border-[#EEEEEE] rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-[#E22134] font-bold text-xs uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            <span>Gaps to close</span>
          </div>
          <div className="space-y-3.5">
            {role.missingSkills.map(skill => (
              <div key={skill} className="flex justify-between items-center text-xs py-1 border-b border-[#F9F9F9]">
                <div className="flex items-center gap-2 font-bold text-[#121212]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E22134]" />
                  {skill}
                </div>
                <span className="text-[#E22134] font-bold text-[10px]">Missing</span>
              </div>
            ))}
            <p className="text-[11.5px] text-[#5B5B5B] leading-relaxed pt-2">
              Adding these could lift your score by up to <span className="font-extrabold text-[#121212]">+4 points</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA Banner Bar */}
      <div className="bg-[#121212] rounded-2xl p-5 flex items-center justify-between gap-6 shadow-xl select-none">
        <div className="flex items-center gap-4 text-left">
          {/* Green Star Icon Badge */}
          <div className="w-[42px] h-[42px] rounded-xl bg-[#1DB954] flex items-center justify-center text-white shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
          </div>
          <div>
            <h4 className="text-white font-extrabold text-[13.5px] tracking-wide">Let Profiling close these gaps</h4>
            <p className="text-[#A7A7A7] text-[11px] mt-0.5 font-medium leading-normal">
              Rewrite your CV for {role.company} and draft a matching cover letter.
            </p>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('resume-tailor')}
          className="bg-[#1DB954] hover:bg-[#1aa34a] text-black font-extrabold text-xs tracking-wider uppercase px-5 py-3 rounded-full hover:scale-95 transition-all shrink-0 active:scale-90"
        >
          TAILOR MY CV
        </button>
      </div>

    </div>
  );
}
