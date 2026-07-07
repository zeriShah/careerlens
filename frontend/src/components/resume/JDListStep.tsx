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
    <div className="space-y-6 max-w-4xl mx-auto py-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-slate-800">Identify Target Positions</h2>
        <p className="text-sm text-slate-500">
          Provide the job descriptions (JDs) you want to optimize your resume against. We recommend adding between 5 and 10 JDs.
        </p>
      </div>

      {fetchError && (
        <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm animate-fadeIn">
          <AlertCircle className="w-4.5 h-4.5 shrink-0" />
          <span>{fetchError}</span>
        </div>
      )}

      {/* Search JDs panel */}
      <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Search Live Job Listings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-500">Position / Job Title <span className="text-red-400">*</span></label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Senior Frontend Engineer"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all placeholder-slate-400"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-500">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. San Francisco, CA or Remote"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all placeholder-slate-400"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            onClick={handleFetchJDs}
            disabled={fetchLoading || jds.length >= 10 || !role.trim()}
            className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            {fetchLoading ? (
              <>
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Searching Listings...</span>
              </>
            ) : (
              <>
                <Search className="w-3.5 h-3.5" />
                <span>Fetch Live Jobs</span>
              </>
            )}
          </button>

          <button
            onClick={() => setManualMode(!manualMode)}
            className="flex items-center space-x-1.5 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Position Manually</span>
          </button>

          {jds.length >= 10 && (
            <span className="text-[11px] font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
              Maximum of 10 positions added
            </span>
          )}
        </div>
      </div>

      {/* Manual Entry */}
      {manualMode && (
        <div className="bg-white border border-blue-100 p-5 rounded-2xl space-y-4 shadow-sm animate-fadeIn">
          <h3 className="text-sm font-semibold text-slate-800">Add Custom Position</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-500">Position Title <span className="text-red-400">*</span></label>
              <input
                type="text"
                value={manualJd.title}
                onChange={(e) => setManualJd({ ...manualJd, title: e.target.value })}
                placeholder="e.g. React Developer"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500 transition-all text-slate-800"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-500">Company Name</label>
              <input
                type="text"
                value={manualJd.company}
                onChange={(e) => setManualJd({ ...manualJd, company: e.target.value })}
                placeholder="e.g. Stripe"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500 transition-all text-slate-800"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-500">Job Description / Requirements <span className="text-red-400">*</span></label>
            <textarea
              value={manualJd.text}
              onChange={(e) => setManualJd({ ...manualJd, text: e.target.value })}
              placeholder="Paste details of the job requirements here..."
              rows={5}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500 transition-all text-slate-800 resize-none"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setManualMode(false)}
              className="px-3.5 py-1.5 text-xs text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={handleAddManualJd}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
            >
              Add to List
            </button>
          </div>
        </div>
      )}

      {/* List of positions */}
      {jds.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-sm font-semibold text-slate-700">Target Position List ({jds.length}/10)</h3>
            {jds.length >= 5 ? (
              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                Ready to Analyze
              </span>
            ) : (
              <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                Need {5 - jds.length} more position{5 - jds.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          <div className="space-y-2">
            {jds.map((jd, idx) => (
              <div key={idx} className="border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm transition-all hover:border-slate-200">
                <div
                  onClick={() => setExpandedJd(expandedJd === idx ? null : idx)}
                  className="flex items-center justify-between px-4 py-3.5 cursor-pointer select-none bg-slate-50/50 hover:bg-slate-50 transition-all"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2 flex-wrap">
                        <p className="text-xs font-bold text-slate-800 truncate">{jd.title}</p>
                        {jd.source === 'live' ? (
                          <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.2 rounded">Live</span>
                        ) : (
                          <span className="text-[9px] font-semibold text-purple-600 bg-purple-50 border border-purple-100 px-1.5 py-0.2 rounded">Custom</span>
                        )}
                        {jd.location && (
                          <span className="text-[9px] font-medium text-slate-400">{jd.location}</span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">{jd.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    {jd.applyLink && (
                      <a
                        href={jd.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center space-x-1 text-[10px] text-blue-600 hover:text-blue-700 bg-blue-50/50 px-2 py-1 rounded-md"
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
                      className="p-1 text-slate-300 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    {expandedJd === idx ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {expandedJd === idx && (
                  <div className="px-4 py-4 border-t border-slate-100 bg-white">
                    <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">{jd.text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-slate-100 pt-5">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all"
        >
          Back to Resume
        </button>

        <button
          onClick={onAnalyze}
          disabled={jds.length < 5 || analysisLoading}
          className="flex items-center space-x-1.5 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm disabled:opacity-50 transition-all"
        >
          {analysisLoading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Auditing Resume (takes 10-15s)...</span>
            </>
          ) : (
            <span>Run ATS Audit ({jds.length} JDs)</span>
          )}
        </button>
      </div>
    </div>
  );
}
