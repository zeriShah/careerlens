import { useState } from 'react';
import { Sparkles, User, Copy, Check, AlertCircle } from 'lucide-react';
import { generateCoverLetter } from '../../services/resumeService';
import type { JobDescription } from '../../services/resumeService';

interface CoverLetterGeneratorProps {
  cvText: string;
  jds: JobDescription[];
  onClose: () => void;
}

export default function CoverLetterGenerator({ cvText, jds, onClose }: CoverLetterGeneratorProps) {
  const [candidateName, setCandidateName] = useState<string>('');
  const [selectedJdIndex, setSelectedJdIndex] = useState<number>(0);
  const [clLoading, setClLoading] = useState<boolean>(false);
  const [clLetter, setClLetter] = useState<string>('');
  const [clError, setClError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerateCL = async () => {
    if (!candidateName.trim()) {
      setClError('Please enter your name.');
      return;
    }
    const targetJd = jds[selectedJdIndex];
    if (!targetJd) {
      setClError('Invalid job description selection.');
      return;
    }

    setClLoading(true);
    setClError('');
    try {
      const res = await generateCoverLetter({
        candidateName: candidateName.trim(),
        jobTitle: targetJd.title,
        company: targetJd.company,
        cvText,
        jdText: targetJd.text
      });
      setClLetter(res.letter);
    } catch (e: any) {
      setClError(e.response?.data?.error || 'Failed to generate cover letter.');
    } finally {
      setClLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(clLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-blue-100 bg-white p-6 rounded-2xl shadow-sm space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center space-x-2 text-blue-700">
          <Sparkles className="w-4.5 h-4.5" />
          <h4 className="text-xs font-bold uppercase tracking-wider">AI Cover Letter Generator</h4>
        </div>
        <button
          onClick={onClose}
          className="text-xs text-slate-400 hover:text-slate-600"
        >
          Close
        </button>
      </div>

      {clError && (
        <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm">
          <AlertCircle className="w-4.5 h-4.5 shrink-0" />
          <span>{clError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-500">Candidate / Your Name</label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="e.g. Jane Doe"
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500 text-slate-800"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-slate-500">Target Role / Listing</label>
          <select
            value={selectedJdIndex}
            onChange={(e) => setSelectedJdIndex(Number(e.target.value))}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500 text-slate-800 bg-white"
          >
            {jds.map((jd, i) => (
              <option key={i} value={i}>
                {jd.title} @ {jd.company}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end pt-1">
        <button
          onClick={handleGenerateCL}
          disabled={clLoading || !candidateName.trim()}
          className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
        >
          {clLoading ? (
            <>
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Drafting cover letter...</span>
            </>
          ) : (
            <span>Generate Cover Letter</span>
          )}
        </button>
      </div>

      {clLetter && (
        <div className="space-y-2 border-t border-slate-100 pt-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">AI Drafted Cover Letter</span>
            <button
              onClick={handleCopyToClipboard}
              className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-700"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Letter</span>
                </>
              )}
            </button>
          </div>
          <textarea
            readOnly
            value={clLetter}
            rows={8}
            className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50/50 text-slate-700 text-xs font-mono leading-relaxed resize-none focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
