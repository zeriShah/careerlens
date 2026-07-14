import { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import type { ResumeAnalysisResult } from '../../services/resumeService';

export default function ReportsTab() {
  const [stats, setStats] = useState({
    avgAts: 86,
    avgMatch: 81,
    unresolvedGaps: 6
  });

  useEffect(() => {
    const cached = sessionStorage.getItem('careerlens_cv_analysis');
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as ResumeAnalysisResult;
        setStats({
          avgAts: parsed.ats_score,
          avgMatch: parsed.match_score,
          unresolvedGaps: parsed.weak_points.length
        });
      } catch (e) {}
    }
  }, []);

  const barChartWidth = (score: number) => {
    return `${score}%`;
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2 text-left">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-text-primary tracking-tight">Career Readiness Reports</h2>
        <p className="text-sm text-text-secondary">Analyze aggregate compatibility metrics, keyword deficits, and formatting checks.</p>
      </div>

      {/* Aggregate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-border bg-white p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Average ATS Compliance</span>
          <p className="text-2xl font-extrabold text-text-primary tracking-tight">{stats.avgAts}%</p>
          <span className="text-[9px] font-bold text-success bg-success/15 px-2 py-0.5 rounded border border-success/10 block w-fit">Excellent</span>
        </div>

        <div className="border border-border bg-white p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Mean Role Alignment</span>
          <p className="text-2xl font-extrabold text-text-primary tracking-tight">{stats.avgMatch}%</p>
          <span className="text-[9px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 block w-fit">Moderate Gaps</span>
        </div>

        <div className="border border-border bg-white p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Identified Action Gaps</span>
          <p className="text-2xl font-extrabold text-text-primary tracking-tight">{stats.unresolvedGaps} Actions</p>
          <span className="text-[9px] font-bold text-warning bg-warning/10 px-2 py-0.5 rounded border border-warning/20 block w-fit">Requires Edits</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Compliance alignment chart */}
        <div className="border border-border bg-white p-5 rounded-2xl shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider">Alignment By Company</h3>
          
          <div className="space-y-4 py-2">
            
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-text-primary">Stripe Corporation</span>
                <span className="font-extrabold text-text-primary">88%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: barChartWidth(88) }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-text-primary">Netflix Tech Inc</span>
                <span className="font-extrabold text-text-primary">74%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary/80 rounded-full transition-all" style={{ width: barChartWidth(74) }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-text-primary">Vercel Inc</span>
                <span className="font-extrabold text-text-primary">81%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: barChartWidth(81) }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-text-primary">Google Inc (Fallback)</span>
                <span className="font-extrabold text-text-primary">68%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-warning rounded-full transition-all" style={{ width: barChartWidth(68) }} />
              </div>
            </div>

          </div>
        </div>

        {/* Missing Keyword Deficit Index */}
        <div className="border border-border bg-white p-5 rounded-2xl shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider">Deficit Keyword Frequency</h3>
          
          <div className="divide-y divide-slate-100 text-xs">
            
            <div className="py-2.5 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-3.5 h-3.5 text-warning shrink-0" />
                <span className="font-semibold text-text-primary">Docker / Containers</span>
              </div>
              <span className="text-[10px] font-bold text-text-secondary bg-slate-50 border border-border/60 px-2 py-0.5 rounded">6 Positions</span>
            </div>

            <div className="py-2.5 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-3.5 h-3.5 text-warning shrink-0" />
                <span className="font-semibold text-text-primary">GraphQL APIs</span>
              </div>
              <span className="text-[10px] font-bold text-text-secondary bg-slate-50 border border-border/60 px-2 py-0.5 rounded">4 Positions</span>
            </div>

            <div className="py-2.5 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-3.5 h-3.5 text-warning shrink-0" />
                <span className="font-semibold text-text-primary">CI/CD / GitHub Actions</span>
              </div>
              <span className="text-[10px] font-bold text-text-secondary bg-slate-50 border border-border/60 px-2 py-0.5 rounded">3 Positions</span>
            </div>

            <div className="py-2.5 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-3.5 h-3.5 text-success shrink-0" />
                <span className="font-semibold text-text-primary">TypeScript Type Safety</span>
              </div>
              <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded border border-success/15">0 Deficits</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

