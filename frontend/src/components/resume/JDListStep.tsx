import { useState } from 'react';
import { Search, Plus, Trash2, ExternalLink, Briefcase, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { fetchJDs } from '../../services/resumeService';
import type { JobDescription } from '../../services/resumeService';

interface JDListStepProps {
  jds: JobDescription[];
  onJdsChange: (jds: JobDescription[]) => void;
  onBack: () => void;
  onAnalyze: () => void;
  analysisLoading: boolean;
}

export default function JDListStep({
  jds,
  onJdsChange,
  onBack,
  onAnalyze,
  analysisLoading
}: JDListStepProps) {
  const [role, setRole] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string>('');
  const [expandedJd, setExpandedJd] = useState<number | null>(null);
  const [manualMode, setManualMode] = useState<boolean>(false);
  const [manualJd, setManualJd] = useState({ title: '', company: '', text: '' });

  const handleFetchJDs = async () => {
    if (!role.trim()) {
      setFetchError('Role/Title is required to fetch target descriptions.');
      return;
    }
    setFetchLoading(true);
    setFetchError('');
    try {
      const res = await fetchJDs(role.trim(), location.trim());
      const incoming = res.jds || [];
      
      const nextJds = [...jds];
      for (const jd of incoming) {
        if (nextJds.length >= 10) break;
        if (!nextJds.some(j => j.title.toLowerCase() === jd.title.toLowerCase() && j.company.toLowerCase() === jd.company.toLowerCase())) {
          nextJds.push(jd);
        }
      }
      onJdsChange(nextJds);
      setRole('');
      setLocation('');
    } catch (e: any) {
      setFetchError(e.response?.data?.error || 'Failed to fetch live job listings.');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleAddManualJd = () => {
    if (!manualJd.title.trim()) {
      setFetchError('Job title is required.');
      return;
    }
    if (manualJd.text.trim().length < 50) {
      setFetchError('Please provide a job description of at least 50 characters.');
      return;
    }

    const nextJds = [...jds];
    if (nextJds.length >= 10) {
      setFetchError('Maximum limit of 10 job descriptions reached.');
      return;
    }

    nextJds.push({
      title: manualJd.title.trim(),
      company: manualJd.company.trim() || 'Custom Position',
      text: manualJd.text.trim(),
      source: 'manual'
    });

    onJdsChange(nextJds);
    setManualJd({ title: '', company: '', text: '' });
    setManualMode(false);
    setFetchError('');
  };

  const handleRemoveJd = (index: number) => {
    const nextJds = jds.filter((_, i) => i !== index);
    onJdsChange(nextJds);
    if (expandedJd === index) setExpandedJd(null);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto py-4 font-sans text-left">
      <div className="text-center space-y-1">
        <h2 className="font-extrabold text-2xl tracking-tight text-[#121212]">What role are you targeting?</h2>
        <p className="text-[13.5px] text-[#5B5B5B]">
          We'll pull the most relevant live openings and score your ATS compatibility fit.
        </p>
      </div>

      {fetchError && (
        <div className="flex items-center space-x-2 p-3.5 bg-danger/10 border border-danger/20 text-[#E22134] rounded-xl text-xs font-bold animate-fadeIn">
          <AlertCircle className="w-4.5 h-4.5 shrink-0" />
          <span>{fetchError}</span>
        </div>
      )}

      {/* Search JDs panel */}
      <div className="bg-[#FBFBFB] border border-[#EBEBEB] p-5 rounded-2xl space-y-4">
        <h3 className="text-[10px] font-bold text-[#8A8A8A] uppercase tracking-wider">Search Live Job Listings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#5B5B5B]">Target role / Job Title <span className="text-red-400">*</span></label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Senior Product Designer"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EBEBEB] bg-white text-[#121212] text-xs font-medium focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/10 transition-all placeholder-[#8A8A8A]"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#5B5B5B]">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. London, UK or Remote"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EBEBEB] bg-white text-[#121212] text-xs font-medium focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/10 transition-all placeholder-[#8A8A8A]"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            onClick={handleFetchJDs}
            disabled={fetchLoading || jds.length >= 10 || !role.trim()}
            className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#1DB954] hover:bg-[#1aa34a] disabled:bg-[#F3F3F3] disabled:text-[#8A8A8A] text-white text-[11px] font-bold tracking-wider uppercase rounded-full shadow-xs active:scale-95 transition-all"
          >
            {fetchLoading ? (
              <>
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Searching Listings...</span>
              </>
            ) : (
              <>
                <Search className="w-3.5 h-3.5" />
                <span>Find matching roles</span>
              </>
            )}
          </button>

          <button
            onClick={() => setManualMode(!manualMode)}
            className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-white border border-[#CFCFCF] hover:bg-[#F3F3F3] text-[#121212] text-[11px] font-bold tracking-wider uppercase rounded-full shadow-xs active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Manually</span>
          </button>

          {jds.length >= 10 && (
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
              Max 10 jobs reached
            </span>
          )}
        </div>
      </div>

      {/* Manual Entry */}
      {manualMode && (
        <div className="bg-white border border-[#EBEBEB] p-5 rounded-2xl space-y-4 shadow-card animate-fadeIn">
          <h3 className="text-xs font-bold text-[#121212] uppercase tracking-wider">Add Custom Position</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#5B5B5B]">Position Title <span className="text-red-400">*</span></label>
              <input
                type="text"
                value={manualJd.title}
                onChange={(e) => setManualJd({ ...manualJd, title: e.target.value })}
                placeholder="e.g. React Developer"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EBEBEB] text-xs font-medium focus:outline-none focus:border-[#1DB954] transition-all text-[#121212]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#5B5B5B]">Company Name</label>
              <input
                type="text"
                value={manualJd.company}
                onChange={(e) => setManualJd({ ...manualJd, company: e.target.value })}
                placeholder="e.g. Stripe"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#EBEBEB] text-xs font-medium focus:outline-none focus:border-[#1DB954] transition-all text-[#121212]"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-[#5B5B5B]">Job Description / Requirements <span className="text-red-400">*</span></label>
            <textarea
              value={manualJd.text}
              onChange={(e) => setManualJd({ ...manualJd, text: e.target.value })}
              placeholder="Paste details of the job requirements here..."
              rows={5}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EBEBEB] text-xs font-medium focus:outline-none focus:border-[#1DB954] transition-all text-[#121212] resize-none"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setManualMode(false)}
              className="px-4 py-2 text-xs font-bold text-[#5B5B5B] hover:text-[#121212]"
            >
              Cancel
            </button>
            <button
              onClick={handleAddManualJd}
              className="px-4 py-2 bg-[#1DB954] hover:bg-[#1aa34a] text-white text-[11px] font-bold tracking-wider uppercase rounded-full shadow-xs transition-all"
            >
              Add to List
            </button>
          </div>
        </div>
      )}

      {/* List of positions */}
      {jds.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-2">
            <h3 className="text-xs font-bold text-[#121212] uppercase tracking-wider">Target Position List ({jds.length}/10)</h3>
            {jds.length >= 5 ? (
              <span className="text-[10px] font-bold text-[#0E9E48] bg-[#1DB954]/10 px-2 py-0.5 rounded border border-[#1DB954]/20 uppercase tracking-wide">
                Ready to Analyze
              </span>
            ) : (
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-100 uppercase tracking-wide">
                Need {5 - jds.length} more
              </span>
            )}
          </div>

          <div className="space-y-2">
            {jds.map((jd, idx) => (
              <div key={idx} className="border border-[#EBEBEB] rounded-xl overflow-hidden bg-white shadow-xs transition-all hover:border-[#1DB954]/40">
                <div
                  onClick={() => setExpandedJd(expandedJd === idx ? null : idx)}
                  className="flex items-center justify-between px-4 py-3 cursor-pointer select-none bg-[#FBFBFB]/50 hover:bg-[#F3F3F3]/20 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#1DB954]/10 flex items-center justify-center text-[#1DB954] shrink-0">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-xs font-bold text-[#121212] truncate">{jd.title}</p>
                        {jd.source === 'live' ? (
                          <span className="text-[9px] font-bold text-[#0E9E48] bg-[#1DB954]/10 border border-[#1DB954]/20 px-1.5 py-0.2 rounded uppercase">Live</span>
                        ) : (
                          <span className="text-[9px] font-bold text-[#121212] bg-[#F3F3F3] border border-[#E6E6E6] px-1.5 py-0.2 rounded uppercase">Custom</span>
                        )}
                        {jd.location && (
                          <span className="text-[9px] font-bold text-[#8A8A8A]">{jd.location}</span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#5B5B5B] truncate mt-0.5">{jd.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    {jd.applyLink && (
                      <a
                        href={jd.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-[10px] text-[#1DB954] hover:text-[#1aa34a] bg-[#1DB954]/10 border border-[#1DB954]/20 px-2.5 py-1 rounded-full font-bold transition-all"
                      >
                        <span>Link</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveJd(idx);
                      }}
                      className="p-1 text-[#8A8A8A] hover:text-[#E22134] rounded-lg hover:bg-red-50 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    {expandedJd === idx ? (
                      <ChevronUp className="w-4 h-4 text-[#8A8A8A]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#8A8A8A]" />
                    )}
                  </div>
                </div>

                {expandedJd === idx && (
                  <div className="px-4 py-4 border-t border-[#EBEBEB] bg-white text-left">
                    <p className="text-xs text-[#5B5B5B] leading-relaxed whitespace-pre-wrap font-medium">{jd.text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Controls */}
      <div className="flex items-center justify-between border-t border-[#F0F0F0] pt-5">
        <button
          onClick={onBack}
          className="px-5 py-2.5 border border-[#CFCFCF] rounded-full text-[11px] font-bold uppercase tracking-wider text-[#121212] hover:bg-[#F3F3F3] transition-all"
        >
          Back
        </button>

        <button
          onClick={onAnalyze}
          disabled={jds.length < 5 || analysisLoading}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#1DB954] hover:bg-[#1aa34a] text-white text-[11px] font-bold tracking-wider uppercase rounded-full shadow-subtle disabled:opacity-50 transition-all duration-150"
        >
          {analysisLoading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Auditing...</span>
            </>
          ) : (
            <span>Find matching roles</span>
          )}
        </button>
      </div>
    </div>
  );
}
