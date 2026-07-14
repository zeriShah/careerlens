import { useState, useEffect } from 'react';
import { History, FileText, Trash2, ArrowUpRight, RotateCcw, Award } from 'lucide-react';
import type { ResumeAnalysisResult } from '../../services/resumeService';

interface HistoryTabProps {
  setActiveTab: (tab: string) => void;
}

interface HistoryItem {
  id: string;
  title: string;
  company: string;
  date: string;
  matchScore: number;
  atsScore: number;
  cvText: string;
}

export default function HistoryTab({ setActiveTab }: HistoryTabProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeAnalysis, setActiveAnalysis] = useState<ResumeAnalysisResult | null>(null);

  useEffect(() => {
    // 1. Get active analysis from sessionStorage
    const cached = sessionStorage.getItem('careerlens_cv_analysis');
    const cachedText = sessionStorage.getItem('careerlens_cv_text') || '';
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as ResumeAnalysisResult;
        setActiveAnalysis(parsed);
      } catch (e) {}
    }

    // 2. Generate list of previous audits
    const mockHistory: HistoryItem[] = [
      {
        id: '1',
        title: 'Senior Frontend Engineer',
        company: 'Stripe Corporation',
        date: 'June 28, 2026',
        matchScore: 88,
        atsScore: 92,
        cvText: cachedText || 'Senior React Developer Resume text...'
      },
      {
        id: '2',
        title: 'Full Stack JavaScript Engineer',
        company: 'Netflix Tech Inc',
        date: 'June 15, 2026',
        matchScore: 74,
        atsScore: 86,
        cvText: 'Full Stack Engineer with React, Node.js, Express experience...'
      },
      {
        id: '3',
        title: 'UI Developer - Core Platform',
        company: 'Vercel Inc',
        date: 'May 20, 2026',
        matchScore: 81,
        atsScore: 89,
        cvText: 'React / Next.js Specialist CV...'
      }
    ];

    setHistory(mockHistory);
  }, []);

  const handleRestore = (item: HistoryItem) => {
    // Restore this items data to session storage
    sessionStorage.setItem('careerlens_cv_text', item.cvText);
    
    // Simulate restoring matching analysis
    const restoredAnalysis: ResumeAnalysisResult = {
      match_score: item.matchScore,
      ats_score: item.atsScore,
      jd_title: item.title,
      summary: `Restored CV audit matching position requirement profile at ${item.company}.`,
      strong_points: [
        'React framework expertise',
        'TypeScript integration & static typing',
        'State management design patterns',
        'TailwindCSS responsive design systems'
      ],
      weak_points: [
        'Missing Webpack bundler configs',
        'Unit testing coverages (Jest/Cypress)'
      ],
      per_jd_scores: [
        { title: item.title, company: item.company, score: item.matchScore, key_match: 'React design systems', key_gap: 'Testing coverage' },
        { title: 'Frontend Engineer', company: 'Partner Tech', score: 78, key_match: 'Tailwind CSS', key_gap: 'Vite configurations' },
        { title: 'UX Engineer', company: 'Consultancy Group', score: 82, key_match: 'Responsive Design', key_gap: 'E2E Testing' },
        { title: 'React Developer', company: 'Digital Agency', score: 85, key_match: 'JavaScript Core', key_gap: 'Build systems' },
        { title: 'UI Lead', company: 'Product SaaS', score: 89, key_match: 'Team mentorship', key_gap: 'Web Vitals audit' }
      ],
      ats_tips: ['Include unit testing metrics', 'Add specific core bundler tools'],
      keywords: [
        { word: 'React', in_cv: true },
        { word: 'TypeScript', in_cv: true },
        { word: 'Testing', in_cv: false },
        { word: 'Tailwind', in_cv: true }
      ]
    };

    sessionStorage.setItem('careerlens_cv_analysis', JSON.stringify(restoredAnalysis));
    
    // Force active tab redirect
    setActiveTab('resume-analyzer');
  };

  const handleRemove = (id: string) => {
    setHistory(history.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2 text-left">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-text-primary tracking-tight">Scan Audit History</h2>
        <p className="text-sm text-text-secondary">Track and restore previous resume audits and scoring evaluations.</p>
      </div>

      {/* Active Scan Indicator Card */}
      {activeAnalysis && (
        <div className="border border-primary/20 bg-primary/5 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-1 bg-primary" />
          <div className="flex items-center space-x-3.5 pl-2">
            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md shadow-primary/10">
              <Award className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">Latest Session Scan</span>
              <h4 className="text-sm font-bold text-text-primary leading-snug">{activeAnalysis.jd_title}</h4>
              <p className="text-[11px] text-text-secondary">ATS Score: {activeAnalysis.ats_score}% · Match Alignment: {activeAnalysis.match_score}%</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('resume-analyzer')}
            className="flex items-center space-x-1 text-xs text-primary font-bold hover:underline"
          >
            <span>Open Session Report</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Audit History List */}
      <div className="border border-border bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex items-center space-x-2">
          <History className="w-4.5 h-4.5 text-text-secondary" />
          <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider">Historical Scans</h3>
        </div>

        {history.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {history.map((item) => (
              <div key={item.id} className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-slate-50/30 transition-colors">
                <div className="flex items-start space-x-3 min-w-0 text-left">
                  <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-text-secondary shrink-0 border border-border/80">
                    <FileText className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-text-primary truncate">{item.title}</p>
                    <p className="text-[10px] text-text-secondary truncate">{item.company} · Scanned on {item.date}</p>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-[9px] font-bold px-2 py-0.2 bg-success/15 text-success rounded border border-success/10">
                        Match: {item.matchScore}%
                      </span>
                      <span className="text-[9px] font-bold px-2 py-0.2 bg-primary/10 text-primary rounded border border-primary/20">
                        ATS: {item.atsScore}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5 shrink-0 self-end sm:self-auto">
                  <button
                    onClick={() => handleRestore(item)}
                    className="flex items-center space-x-1 px-3 py-1.5 border border-border hover:bg-slate-100 rounded-lg text-[10px] font-bold text-text-primary transition-all"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Restore Scan</span>
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="p-1.5 text-text-secondary hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-text-secondary text-xs">
            No audit history found.
          </div>
        )}
      </div>
    </div>
  );
}

