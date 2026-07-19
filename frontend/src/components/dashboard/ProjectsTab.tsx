import React, { useState, useEffect } from 'react';
import { Upload, FileText, Trash2, Loader2, Sparkles, FolderOpen, AlertCircle, ShieldAlert } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

interface Project {
  id: string;
  title: string;
  filename: string;
  description: string;
  createdAt: string;
}

interface ProjectsTabProps {
  searchQuery?: string;
}

export default function ProjectsTab({ searchQuery = '' }: ProjectsTabProps) {
  const { user, refreshUser } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [billingLoading, setBillingLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get('/projects');
      if (res.data && res.data.success) {
        setProjects(res.data.projects);
      }
    } catch (err: any) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMockActivate = async (action: 'activate' | 'cancel') => {
    setBillingLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await api.post('/payments/mock-activate', { action });
      if (res.data && res.data.success) {
        await refreshUser();
        setSuccess(res.data.message);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update mock subscription.');
    } finally {
      setBillingLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File is too large. Max size is 10MB.');
      return;
    }

    // Validate extension
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!['pdf', 'docx', 'txt', 'md'].includes(ext || '')) {
      setError('Unsupported file type. Use .pdf, .docx, .txt, or .md.');
      return;
    }

    try {
      setUploading(true);
      setError(null);
      setSuccess(null);

      const formData = new FormData();
      formData.append('file', file);

      const res = await api.post('/projects/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data && res.data.success) {
        setSuccess('Project file uploaded and parsed successfully!');
        setProjects((prev) => [res.data.project, ...prev]);
      }
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.response?.data?.error || 'Failed to upload and parse project file.');
    } finally {
      setUploading(false);
      // Reset input value
      e.target.value = '';
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project description?')) return;

    try {
      setError(null);
      setSuccess(null);
      const res = await api.delete(`/projects/${id}`);
      if (res.data && res.data.success) {
        setSuccess('Project deleted successfully.');
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err: any) {
      console.error('Delete error:', err);
      setError('Failed to delete project.');
    }
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (user?.subscriptionStatus !== 'active') {
    return (
      <div className="max-w-xl mx-auto py-10 space-y-6 text-center animate-fadeIn select-none">
        {/* Paywall Banner Details */}
        <div className="bg-white border border-[#EEEEEE] rounded-3xl p-8 shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#1DB954]/10 text-[#1DB954] flex items-center justify-center mx-auto shadow-sm">
            <ShieldAlert className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <span className="bg-[#1DB954]/10 text-[#1DB954] text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                Premium Feature
              </span>
            </div>
            <h3 className="text-xl font-black text-[#121212] tracking-tight">Unlock Custom Projects Auto-Alignment</h3>
            <p className="text-xs text-[#8A8A8A] leading-relaxed max-w-sm mx-auto font-medium">
              Upload separate descriptions of your personal project files. Our AI engine scans them and matches the most relevant ones to each target Job Description during CV tailoring automatically!
            </p>
          </div>

          <div className="pt-2">
            <a
              href="https://pay.rev.cat/poaaekrofyijbwwq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-[#1DB954] hover:bg-[#1aa34a] text-white text-xs font-black rounded-full uppercase tracking-wider shadow-sm hover:shadow active:scale-95 transition-all text-center"
            >
              Upgrade to Pro Plan
            </a>
          </div>
        </div>

        {/* Developer Sandbox Simulator block */}
        <div className="bg-[#F8F9FA] border border-[#EEEEEE] rounded-2xl p-5 text-left flex flex-col justify-between space-y-4">
          <div className="text-left">
            <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest block">Developer Sandbox Simulator</span>
            <h4 className="font-extrabold text-sm text-[#121212] mt-1">1-Click Test Activation</h4>
            <p className="text-xs text-[#8A8A8A] font-medium leading-relaxed mt-1">
              Skip adding credit cards/payments and immediately elevate this account to Pro. Extremely useful for verifying the Projects CV alignment logic instantly!
            </p>
          </div>
          <button
            onClick={() => handleMockActivate('activate')}
            disabled={billingLoading}
            className="w-full text-center px-4 py-2.5 bg-[#121212] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full transition-colors disabled:opacity-60 focus:outline-none"
          >
            {billingLoading ? 'Simulating...' : 'Instant Pro Upgrade'}
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl text-left">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Tab Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#EEEEEE]">
        <div className="text-left">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-[#121212]">My Projects</h1>
            <span className="flex items-center gap-1 bg-[#1DB954]/10 text-[#1DB954] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
              <Sparkles className="w-2.5 h-2.5" /> Auto-Align
            </span>
          </div>
          <p className="text-sm text-[#8A8A8A] mt-1 font-medium leading-relaxed max-w-xl">
            Upload description files for each of your projects (in PDF, DOCX, TXT, or MD format). 
            When tailoring your CV, our AI will automatically select the projects that align best with the job description.
          </p>
        </div>

        {/* Upload Button */}
        <div>
          <label className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#121212] text-white hover:bg-black transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider ${uploading ? 'opacity-70 pointer-events-none' : ''}`}>
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Parsing...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload Project
              </>
            )}
            <input
              type="file"
              accept=".pdf,.docx,.txt,.md"
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2.5 bg-green-50 border border-green-200 text-green-700 text-xs px-4 py-3 rounded-xl">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
          <span>{success}</span>
        </div>
      )}

      {/* Projects List */}
      {loading ? (
        <div className="bg-white border border-[#EEEEEE] rounded-2xl p-16 text-center shadow-sm">
          <Loader2 className="w-8 h-8 animate-spin text-[#1DB954] mx-auto" />
          <p className="text-sm text-[#8A8A8A] mt-2 font-medium">Retrieving projects...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="bg-white border border-[#EEEEEE] rounded-2xl p-16 text-center shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EEEEEE] text-[#8A8A8A] flex items-center justify-center mx-auto">
            <FolderOpen className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#121212]">
              {searchQuery ? 'No matching projects found' : 'No projects uploaded yet'}
            </h3>
            <p className="text-xs text-[#8A8A8A] max-w-sm mx-auto leading-relaxed">
              {searchQuery 
                ? 'Try adjusting your search keywords to find the project.' 
                : 'Upload separate description files (e.g. ecommerce-app.pdf, security-audit.md) representing your technical projects.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white border border-[#EEEEEE] hover:border-[#1DB954] rounded-2xl p-5 text-left shadow-sm flex flex-col justify-between transition-all group relative duration-200">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F8F9FA] border border-[#E9ECEF] flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-[#1DB954]" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-[#121212] tracking-tight line-clamp-1 capitalize">
                        {project.title.replace(/[-_]/g, ' ')}
                      </h4>
                      <span className="text-[10px] font-bold text-[#8A8A8A] block">
                        {project.filename}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="p-1.5 rounded-lg text-[#8A8A8A] hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-[#F8F9FA] rounded-xl p-3 border border-[#F1F3F5] text-xs text-[#5B5B5B] leading-relaxed max-h-32 overflow-y-auto whitespace-pre-wrap">
                  {project.description}
                </div>
              </div>

              <div className="border-t border-[#F1F3F5] mt-4 pt-3 flex items-center justify-between text-[10px] text-[#8A8A8A] font-bold">
                <span>Uploaded: {new Date(project.createdAt).toLocaleDateString()}</span>
                <span className="text-[#1DB954] uppercase tracking-wider bg-[#1DB954]/10 px-2 py-0.5 rounded-full">
                  Indexed
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Subtle Developer Sandbox Controller */}
      <div className="bg-[#F8F9FA] border border-[#EEEEEE] rounded-xl p-4 flex items-center justify-between text-left mt-8 select-none">
        <div>
          <h5 className="text-xs font-extrabold text-[#121212]">Simulate Subscription Downgrade (Testing)</h5>
          <p className="text-[10px] text-[#8A8A8A] font-medium mt-0.5">Revert account status back to Free plan to test the paywall lock wall and redirection.</p>
        </div>
        <button
          onClick={() => handleMockActivate('cancel')}
          disabled={billingLoading}
          className="px-4 py-2 border border-red-200 hover:border-red-600 text-red-600 hover:bg-red-50 text-[10px] font-bold tracking-wider uppercase rounded-full transition-colors disabled:opacity-60 shrink-0"
        >
          {billingLoading ? 'Simulating...' : 'Revert to Free'}
        </button>
      </div>
    </div>
  );
}
