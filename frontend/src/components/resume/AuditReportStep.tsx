import { useState, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Sparkles, FileDown, ChevronDown, ChevronUp, Loader2, Youtube, Clock, BookOpen } from 'lucide-react';
import type { ResumeAnalysisResult, JobDescription } from '../../services/resumeService';
import api from '../../services/api';
import { generateAnalysisPDF } from '../../lib/generateAnalysisPDF';
import CoverLetterGenerator from './CoverLetterGenerator';

interface AuditReportStepProps {
  analysis: ResumeAnalysisResult;
  cvText: string;
  jds: JobDescription[];
}

function getAdvantageDetails(text: string): { context: string; action: string } {
  const lower = text.toLowerCase();
  if (lower.includes('react') || lower.includes('frontend') || lower.includes('ui') || lower.includes('interface')) {
    return {
      context: 'Strong React and front-end competency ensures rapid UI feature development and design consistency.',
      action: 'Highlight your proficiency with modern rendering methods, state libraries, and responsive CSS architectures.'
    };
  }
  if (lower.includes('typescript') || lower.includes('types')) {
    return {
      context: 'TypeScript prevents standard type coercion errors and is essential in collaborative dev teams.',
      action: 'Mention static analysis benefits, custom type definitions, and type guards utilized in your project code.'
    };
  }
  if (lower.includes('node') || lower.includes('backend') || lower.includes('express') || lower.includes('api')) {
    return {
      context: 'Server-side knowledge proves you can handle endpoints security, routing logic, and data orchestration.',
      action: 'Discuss RESTful structure, API middleware, security validation, and asynchronous processing.'
    };
  }
  if (lower.includes('database') || lower.includes('postgres') || lower.includes('sql') || lower.includes('prisma')) {
    return {
      context: 'Understanding data relations, indexing, and migration lifecycles is critical for any functional engineer.',
      action: 'Be ready to explain schema modeling, transactional security, and query profiling practices.'
    };
  }
  return {
    context: 'This capability represents an essential matching parameter across high-performing team templates.',
    action: 'Be prepared to tell a quick STAR story demonstrating your direct execution and metrics of this capability.'
  };
}

function getGapDetails(text: string): { context: string; action: string } {
  const lower = text.toLowerCase();
  if (lower.includes('test') || lower.includes('jest') || lower.includes('cypress') || lower.includes('testing')) {
    return {
      context: 'Automated test suites reduce regression bugs and support high-frequency continuous integration.',
      action: 'Introduce Jest unit testing or Cypress/Playwright integration tests into your project repo and add it to your CV.'
    };
  }
  if (lower.includes('webpack') || lower.includes('bundler') || lower.includes('vite') || lower.includes('build')) {
    return {
      context: 'Build processes dictate final compilation bundle sizes and client-side performance index metrics.',
      action: 'Create a custom configurations sandbox or document bundle reduction strategies in your experiences.'
    };
  }
  if (lower.includes('deploy') || lower.includes('ci/cd') || lower.includes('pipeline') || lower.includes('github actions')) {
    return {
      context: 'Release pipelines ensure fast deployments and eliminate manual compilation mistakes.',
      action: 'Draft a short pipeline workflow (e.g. GitHub Actions or Vercel) that compiles, runs tests, and deploys on push.'
    };
  }
  if (lower.includes('scale') || lower.includes('docker') || lower.includes('kubernetes')) {
    return {
      context: 'Container setups assure standard dev-to-prod environment matching and cloud architecture scaling.',
      action: 'Build a containerized project structure utilizing Docker Compose and mention it in your experience metrics.'
    };
  }
  return {
    context: 'This keyword is missing from your CV but is frequently parsed by screening algorithms on these profiles.',
    action: 'Use the Resume Tailor feature to weave this key capability or tooling into your accomplishments.'
  };
}

export default function AuditReportStep({ analysis, cvText, jds }: AuditReportStepProps) {
  const [coverLetterOpen, setCoverLetterOpen] = useState<boolean>(false);
  const [expandedRoleIndex, setExpandedRoleIndex] = useState<number | null>(null);
  // Detailed scorecard and interactive project checklist states
  const [showScorecard, setShowScorecard] = useState<boolean>(false);
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});
  // Selected item inspector state (gaps first, then strengths)
  const [selectedItem, setSelectedItem] = useState<{ type: 'gap' | 'strength'; index: number }>(() => {
    if (analysis.weak_points && analysis.weak_points.length > 0) {
      return { type: 'gap', index: 0 };
    }
    return { type: 'strength', index: 0 };
  });

  const toggleTask = (projTitle: string, taskIdx: number) => {
    const key = `${projTitle}-${taskIdx}`;
    setCheckedTasks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Suggested projects state for Gaps
  const [suggestedProjects, setSuggestedProjects] = useState<any[]>([]);
  const [projectsLoading, setProjectsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (analysis.weak_points && analysis.weak_points.length > 0) {
      const fetchProjects = async () => {
        setProjectsLoading(true);
        try {
          const res = await api.post('/resume/suggest-projects', {
            // Trim weak point sentences to optimize API context matching
            missingSkills: analysis.weak_points.map(p => p.split(':')[0] || p)
          });
          setSuggestedProjects(res.data.projects || []);
        } catch (e) {
          console.error('Failed to fetch projects for gaps:', e);
        } finally {
          setProjectsLoading(false);
        }
      };
      fetchProjects();
    }
  }, [analysis.weak_points]);

  const getScoreProgressColor = (score: number) => {
    if (score >= 75) return '#10b981';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const isSelectedGap = selectedItem.type === 'gap';
  const selectedTitle = isSelectedGap
    ? analysis.weak_points[selectedItem.index]
    : analysis.strong_points[selectedItem.index];

  const selectedDetails = isSelectedGap
    ? getGapDetails(selectedTitle)
    : getAdvantageDetails(selectedTitle);

  // Find matching project that bridges this gap
  const matchingProject = isSelectedGap && suggestedProjects.find((proj: any) =>
    proj.gaps_fulfilled.some((gf: string) =>
      selectedTitle.toLowerCase().includes(gf.toLowerCase()) ||
      gf.toLowerCase().includes(selectedTitle.toLowerCase())
    )
  );

  const projectToDisplay = matchingProject || (isSelectedGap ? {
    title: `Targeted ${selectedTitle.split(':')[0] || selectedTitle} Practice Project`,
    description: `A hands-on sandbox project designed to implement, test, and master ${selectedTitle.split(':')[0] || selectedTitle} in a production-ready application environment.`,
    recommended_course_search: `${selectedTitle.split(':')[0] || selectedTitle} course tutorial step by step`,
    roadmap_tasks: [
      `Set up workspace folder and configure local compiler tools for ${selectedTitle.split(':')[0] || selectedTitle}`,
      `Build the core functional interface and state management variables`,
      `Add validation logic, unit test cases, and exception handling`,
      `Document execution flow and create a deployment release package`
    ],
    gaps_fulfilled: [selectedTitle.split(':')[0] || selectedTitle]
  } : null);

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4 text-left font-sans">
      
      {/* 1. SaaS Score Summary Ribbon (Light Theme) */}
      <div className="grid grid-cols-1 md:grid-cols-3 border border-slate-100 bg-white rounded-2xl shadow-sm divide-y md:divide-y-0 md:divide-x divide-slate-100 overflow-hidden select-none">
        
        {/* Metric 1: Target Alignment */}
        <div className="p-5 flex flex-col justify-between space-y-1.5">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target Alignment</span>
          </div>
          <div className="flex items-baseline space-x-1.5 pt-1">
            <span className="text-3xl font-extrabold text-slate-800">{analysis.match_score}</span>
            <span className="text-sm text-slate-400 font-bold">/ 100</span>
          </div>
          <span className="text-[10px] text-slate-400 leading-normal">
            Profile fit compared to target jobs
          </span>
        </div>

        {/* Metric 2: ATS Score */}
        <div className="p-5 flex flex-col justify-between space-y-1.5">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ATS Parse-ability</span>
          </div>
          <div className="flex items-baseline space-x-1.5 pt-1">
            <span className="text-3xl font-extrabold text-slate-800">{analysis.ats_score}</span>
            <span className="text-sm text-slate-400 font-bold">/ 100</span>
          </div>
          <span className="text-[10px] text-slate-400 leading-normal">
            Likelihood of passing screening filters
          </span>
        </div>

        {/* Metric 3: Best Match Target Career */}
        <div className="p-5 flex flex-col justify-between space-y-1.5 bg-slate-50/20">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Best Match Career Target</span>
          </div>
          <p className="text-xs font-extrabold text-slate-800 pt-1.5 truncate leading-tight">
            {analysis.jd_title}
          </p>
          <span className="text-[10px] text-slate-400 leading-normal">
            Primary target matching JD
          </span>
        </div>

      </div>

      {/* 1.5 Executive Verdict Summary Box */}
      <div className="border border-slate-100 bg-white p-5 rounded-2xl shadow-sm space-y-2.5">
        <span className="text-[9px] font-bold text-blue-600 bg-blue-50/80 px-2.5 py-1 rounded uppercase tracking-wider inline-block">
          Executive Audit Summary
        </span>
        <p className="text-xs text-slate-650 leading-relaxed font-sans mt-1">
          {analysis.summary}
        </p>
      </div>

      {/* 2. Unified Master-Detail Workspace Terminal */}
      <div className="flex flex-col lg:flex-row border border-slate-200 bg-white rounded-2xl shadow-sm overflow-hidden h-[600px] items-stretch select-none">
        
        {/* Left Master List Sidebar (40% width) */}
        <div className="w-full lg:w-[38%] border-r border-slate-100 flex flex-col h-full bg-slate-50/30">
          <div className="p-4 border-b border-slate-100 bg-white">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Audit Findings</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Critical gaps and confirmed matches sorted by priority.</p>
          </div>
          
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100/60 p-2 space-y-1">
            
            {/* Gaps List */}
            {analysis.weak_points.map((p, idx) => {
              const isActive = selectedItem.type === 'gap' && selectedItem.index === idx;
              return (
                <button
                  key={`gap-${idx}`}
                  onClick={() => setSelectedItem({ type: 'gap', index: idx })}
                  className={`w-full text-left p-3.5 rounded-xl transition-all flex items-start space-x-3 focus:outline-none ${
                    isActive
                      ? 'bg-rose-500/10 border-l-4 border-l-rose-500 shadow-sm'
                      : 'hover:bg-slate-100/70 border-l-4 border-l-transparent'
                  }`}
                >
                  <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 ${isActive ? 'text-rose-600' : 'text-slate-400'}`} />
                  <div className="min-w-0 flex-1 space-y-1">
                    <span className="inline-block text-[8px] font-extrabold uppercase bg-rose-50 text-rose-600 border border-rose-100/60 px-1.5 py-0.5 rounded">
                      Missing Gap
                    </span>
                    <p className={`text-xs font-bold truncate leading-tight ${isActive ? 'text-rose-955 font-extrabold' : 'text-slate-705'}`}>
                      {p.split(':')[0] || p}
                    </p>
                  </div>
                </button>
              );
            })}

            {/* Strengths List */}
            {analysis.strong_points.map((p, idx) => {
              const isActive = selectedItem.type === 'strength' && selectedItem.index === idx;
              return (
                <button
                  key={`strength-${idx}`}
                  onClick={() => setSelectedItem({ type: 'strength', index: idx })}
                  className={`w-full text-left p-3.5 rounded-xl transition-all flex items-start space-x-3 focus:outline-none ${
                    isActive
                      ? 'bg-emerald-500/10 border-l-4 border-l-emerald-500 shadow-sm'
                      : 'hover:bg-slate-100/70 border-l-4 border-l-transparent'
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <div className="min-w-0 flex-1 space-y-1">
                    <span className="inline-block text-[8px] font-extrabold uppercase bg-emerald-50 text-emerald-600 border border-emerald-100/60 px-1.5 py-0.5 rounded">
                      Matched
                    </span>
                    <p className={`text-xs font-bold truncate leading-tight ${isActive ? 'text-emerald-955 font-extrabold' : 'text-slate-705'}`}>
                      {p.split(':')[0] || p}
                    </p>
                  </div>
                </button>
              );
            })}

          </div>
        </div>

        {/* Right Details Inspector Panel (60% width) */}
        <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/10">
            <div className="min-w-0">
              <span className={`text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-md border ${
                isSelectedGap
                  ? 'bg-rose-50 text-rose-600 border-rose-100'
                  : 'bg-emerald-50 text-emerald-600 border-emerald-100'
              }`}>
                {isSelectedGap ? 'Action Required' : 'CV Check Passed'}
              </span>
              <h3 className="text-sm font-extrabold text-slate-800 tracking-tight mt-2.5 leading-normal">
                {selectedTitle}
              </h3>
            </div>
          </div>

          <div className="p-6 space-y-6 flex-1">
            
            {/* Context block */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-bold text-slate-405 uppercase tracking-wider block">Why this matters</span>
              <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                {selectedDetails.context}
              </p>
            </div>

            {/* Recommendation block */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-bold text-slate-405 uppercase tracking-wider block">Action Recommended</span>
              <div className={`p-4 rounded-xl border ${
                isSelectedGap
                  ? 'bg-rose-50/20 border-rose-100 text-slate-700'
                  : 'bg-emerald-50/20 border-emerald-100 text-slate-700'
              }`}>
                <p className="text-xs font-semibold leading-relaxed leading-normal">
                  {selectedDetails.action}
                </p>
              </div>
            </div>

            {/* If it is a Gap: Bridge Project Roadmap */}
            {isSelectedGap && (
              projectsLoading ? (
                <div className="flex items-center justify-center space-x-2.5 py-12 bg-slate-50/50 rounded-xl border border-dashed border-slate-200 mt-4 animate-pulse">
                  <Loader2 className="w-4 h-4 text-rose-500 animate-spin" />
                  <span className="text-xs text-slate-400 font-semibold">Generating Gap Bridge roadmap...</span>
                </div>
              ) : projectToDisplay && (
                <div className="space-y-4 pt-4 border-t border-slate-100 animate-fadeIn">
                  <div className="flex items-center space-x-2">
                    <Youtube className="w-5 h-5 text-red-500 shrink-0" />
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-805 uppercase tracking-wider">Gap Fulfiller Project Roadmap</h4>
                      <p className="text-[10px] text-slate-400">Complete this hands-on setup to showcase competent build credentials.</p>
                    </div>
                  </div>

                <div className="border border-slate-100 bg-slate-50/40 p-4 rounded-xl space-y-4">
                  <div className="space-y-1">
                    <h5 className="text-[11.5px] font-extrabold text-slate-800 leading-snug">{projectToDisplay.title}</h5>
                    <p className="text-[10.5px] text-slate-500 leading-relaxed font-sans">{projectToDisplay.description}</p>
                  </div>

                  {projectToDisplay.roadmap_tasks && projectToDisplay.roadmap_tasks.length > 0 && (
                    <div className="space-y-1.5 pt-1.5 border-t border-slate-200/60">
                      <span className="text-[8.5px] font-extrabold text-slate-400 uppercase tracking-wider block">Milestones Checklist</span>
                      <div className="space-y-1.5">
                        {projectToDisplay.roadmap_tasks.map((task: string, taskIdx: number) => {
                          const isChecked = !!checkedTasks[`${projectToDisplay.title}-${taskIdx}`];
                          return (
                            <button
                              key={taskIdx}
                              onClick={() => toggleTask(projectToDisplay.title, taskIdx)}
                              className="w-full flex items-start space-x-2.5 text-left text-[10px] hover:bg-slate-100/50 p-1 rounded transition-colors focus:outline-none"
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {}} // handled by button click
                                className="rounded text-blue-600 focus:ring-blue-500 border-slate-300 h-3.5 w-3.5 shrink-0 mt-0.5 cursor-pointer"
                              />
                              <span className={`leading-normal ${isChecked ? 'line-through text-slate-400 font-semibold' : 'text-slate-650 font-semibold'}`}>
                                {task.replace(/^<(.*)>$/, '$1')}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 pt-2 border-t border-slate-200/60">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>~8h Build</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-3 h-3 text-slate-400" />
                      <span>Intermediate</span>
                    </div>
                  </div>

                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(projectToDisplay.recommended_course_search || projectToDisplay.title + " course")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 px-3 py-2.5 border border-rose-200 bg-rose-50/50 hover:bg-rose-100 text-rose-750 rounded-xl text-[10px] font-extrabold transition-all w-full shadow-sm"
                  >
                    <Youtube className="w-3.5 h-3.5 fill-rose-600 text-rose-650" />
                    <span>Watch Tutorial Playlist Course</span>
                  </a>
                </div>
              </div>
            ))}

            {/* If it is a Strength: Showcase tips */}
            {!isSelectedGap && (
              <div className="border border-emerald-105 bg-emerald-50/15 p-4 rounded-xl flex items-start space-x-3 pt-4 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-505 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-[9px] font-extrabold text-emerald-700 uppercase tracking-wider block">CV Optimization Verified</span>
                  <p className="text-[10.5px] text-slate-600 leading-normal font-sans">
                    You have successfully matched this job requirement! No bridge roadmap is required. Emphasize the impact metrics of this capability during technical screening interviews.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* 3. Action Panel & Detailed Scorecard Toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
            <FileDown className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-700">Audit report generated</h4>
            <p className="text-[10px] text-slate-400">Save matching metrics locally as a high-quality PDF report.</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => generateAnalysisPDF(analysis)}
            className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            <span>Download PDF Report</span>
          </button>
          
          <button
            onClick={() => setCoverLetterOpen(!coverLetterOpen)}
            className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            <span>Generate Cover Letter</span>
          </button>
        </div>
      </div>

      {/* Cover Letter Panel */}
      {coverLetterOpen && (
        <CoverLetterGenerator
          cvText={cvText}
          jds={jds}
          onClose={() => setCoverLetterOpen(false)}
        />
      )}

      {/* 4. Detailed Scorecard Matrix (Toggleable) */}
      <div className="flex flex-col items-center space-y-4 pt-4 border-t border-slate-105">
        <button
          onClick={() => setShowScorecard(!showScorecard)}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl shadow-sm transition-all focus:outline-none"
        >
          <span>{showScorecard ? 'Hide Detailed Matching Matrix' : 'Show Detailed Matching Matrix'}</span>
          {showScorecard ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>

        {showScorecard && (
          <div className="w-full border border-slate-100 bg-white p-5 rounded-2xl shadow-sm space-y-4 animate-slideDown">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Detailed Position Scorecard Matrix</h4>
            <div className="space-y-3">
              {analysis.per_jd_scores.map((jd, idx) => {
                const isExpanded = expandedRoleIndex === idx;
                return (
                  <div key={idx} className="border border-slate-100 rounded-xl overflow-hidden bg-white hover:border-slate-200 transition-all">
                    <button
                      onClick={() => setExpandedRoleIndex(isExpanded ? null : idx)}
                      className="w-full p-4 flex items-center justify-between text-left focus:outline-none"
                    >
                      <div className="flex items-center space-x-4 min-w-0 flex-1">
                        <div className="w-10 h-10 shrink-0 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                          <span className={`text-xs font-bold ${jd.score >= 75 ? 'text-emerald-500' : jd.score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
                            {jd.score}%
                          </span>
                        </div>
                        
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-800 truncate">{jd.title}</p>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">{jd.company}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 shrink-0">
                        {/* Visual Progress Bar */}
                        <div className="hidden sm:block w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${jd.score}%`,
                              backgroundColor: getScoreProgressColor(jd.score)
                            }}
                          />
                        </div>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 pt-2 border-t border-slate-50 bg-slate-50/20 space-y-3.5 animate-fadeIn">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          
                          {/* Key Matches checklist */}
                          <div className="p-3.5 bg-white border border-slate-100 rounded-xl space-y-2">
                            <span className="text-[9px] font-extrabold uppercase text-emerald-600 block">Matched Checklist</span>
                            <div className="flex items-start space-x-2.5 p-1">
                              <input type="checkbox" checked readOnly className="rounded text-emerald-600 focus:ring-emerald-500 border-emerald-300 mt-0.5 h-4 w-4 bg-emerald-50" />
                              <span className="text-xs text-slate-650 font-medium leading-relaxed">
                                {jd.key_match || 'Core matches confirmed'}
                              </span>
                            </div>
                          </div>

                          {/* Key Gaps checklist */}
                          <div className="p-3.5 bg-white border border-slate-100 rounded-xl space-y-2">
                            <span className="text-[9px] font-extrabold uppercase text-amber-600 block">Identified Gaps Checklist</span>
                            <div className="flex items-start space-x-2.5 p-1">
                              <input type="checkbox" readOnly className="rounded text-amber-600 focus:ring-amber-500 border-slate-350 mt-0.5 h-4 w-4 bg-slate-50" />
                              <span className="text-xs text-slate-655 font-medium leading-relaxed">
                                {jd.key_gap || 'No gaps identified'}
                              </span>
                            </div>
                          </div>

                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
