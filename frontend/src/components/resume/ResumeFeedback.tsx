import { useState, useEffect } from 'react';
import { Sparkles, FileText, AlertCircle, Copy, Check } from 'lucide-react';
import { rewriteCV } from '../../services/resumeService';
import type { RewriteSuggestion } from '../../services/resumeService';

export default function ResumeFeedback() {
  const [cvText, setCvText] = useState<string>('');
  const [weakPoints, setWeakPoints] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<RewriteSuggestion[]>([]);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const cachedText = sessionStorage.getItem('careerlens_cv_text');
    const cachedAnalysis = sessionStorage.getItem('careerlens_cv_analysis');

    if (cachedText) setCvText(cachedText);
    if (cachedAnalysis) {
      try {
        const parsed = JSON.parse(cachedAnalysis);
        if (parsed.weak_points && Array.isArray(parsed.weak_points)) {
          setWeakPoints(parsed.weak_points);
        }
      } catch (e) {}
    }
  }, []);

  const handleGenerateSuggestions = async () => {
    if (!cvText.trim() || !weakPoints.length) return;

    setLoading(true);
    setError('');
    try {
      const res = await rewriteCV({
        cvText,
        weakPoints: weakPoints.slice(0, 5) // Optimize top 5 weak points to avoid token bloat
      });
      setSuggestions(res.suggestions || []);
    } catch (e: any) {
      setError(e.response?.data?.error || 'Failed to generate rewrite suggestions.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!cvText || !weakPoints.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 max-w-md mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
          <FileText className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-slate-800">No Active Audit Scan Found</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Run an initial audit scan in the <strong>Resume Analyzer</strong> tab first. We will extract weak points from your target positions and generate optimize bullet rewrites for your CV here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-slate-800">AI Bullet Optimizer & Rewrite Feedback</h2>
        <p className="text-sm text-slate-500">
          Improve your CV section-by-section. We analyzed your {weakPoints.length} gaps and can formulate direct bullet-point rewrite suggestions tailored to target requirements.
        </p>
      </div>

      {error && (
        <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {suggestions.length === 0 && !loading && (
        <div className="border border-slate-100 bg-slate-50/50 p-6 rounded-2xl text-center space-y-4">
          <p className="text-xs text-slate-600">
            Click below to analyze your CV text against identified weak points and receive professional bullet suggestions.
          </p>
          <button
            onClick={handleGenerateSuggestions}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate CV Bullet Rewrites</span>
          </button>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-3 bg-slate-50/30 rounded-2xl border border-dashed border-slate-200">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-medium text-slate-600">Formulating professional bullet suggestions...</p>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Rewrite Recommendations</h3>
            <button
              onClick={handleGenerateSuggestions}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
            >
              Regenerate
            </button>
          </div>

          <div className="space-y-3">
            {suggestions.map((suggestion, idx) => (
              <div key={idx} className="border border-slate-100 rounded-xl bg-white shadow-sm p-4 space-y-3 transition-all hover:border-slate-200">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-red-500 uppercase tracking-wider bg-red-50 border border-red-100 px-2 py-0.5 rounded">Identified Gap</span>
                  <p className="text-xs font-medium text-slate-700 mt-1">{suggestion.weak_point}</p>
                </div>
                
                <div className="bg-slate-50 border border-slate-100/50 p-3.5 rounded-xl space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">Optimized CV Bullet</span>
                    <button
                      onClick={() => handleCopy(suggestion.rewritten, idx)}
                      className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all shrink-0"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans pr-6">{suggestion.rewritten}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
