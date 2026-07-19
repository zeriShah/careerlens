import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  User,
  Shield,
  Check,
  AlertCircle,
  Trash2,
  LogOut,
  Eye,
  EyeOff,
  Calendar,
  Mail,
  KeyRound,
} from 'lucide-react';

interface SettingsTabProps {
  currentUser: {
    fullName: string;
    email: string;
    createdAt: string;
  };
}

type SettingsPanel = 'profile' | 'security' | 'danger';

export default function SettingsTab({ currentUser }: SettingsTabProps) {
  const { updateProfile, logout } = useAuth();
  const [activePanel, setActivePanel] = useState<SettingsPanel>('profile');

  // Profile fields
  const [fullName, setFullName] = useState<string>(currentUser.fullName);
  const [email, setEmail] = useState<string>(currentUser.email);
  const [profileLoading, setProfileLoading] = useState(false);

  // Security fields
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);



  // Toasts
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setErrorMsg('');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const showError = (msg: string) => {
    setErrorMsg(msg);
    setSuccessMsg('');
  };

  // --- Profile Save ---
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!fullName.trim() || !email.trim()) {
      showError('Full name and email address are required.');
      return;
    }

    setProfileLoading(true);
    try {
      await updateProfile(fullName.trim(), email.trim());
      showSuccess('Profile details saved successfully.');
    } catch (err: any) {
      showError(err.message || 'Failed to update profile.');
    } finally {
      setProfileLoading(false);
    }
  };

  // --- Password Change ---
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!currentPassword || !newPassword) {
      showError('Please enter your current and new passwords.');
      return;
    }
    if (newPassword.length < 8) {
      showError('New password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      showError('New password and confirmation do not match.');
      return;
    }

    setPasswordLoading(true);
    try {
      await updateProfile(fullName, email, currentPassword, newPassword);
      showSuccess('Password changed successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err: any) {
      showError(err.message || 'Failed to change password.');
    } finally {
      setPasswordLoading(false);
    }
  };

  const memberSince = new Date(currentUser.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const navItems: { key: SettingsPanel; label: string; icon: typeof User; badge?: string }[] = [
    { key: 'profile', label: 'Profile Details', icon: User },
    { key: 'security', label: 'Login & Security', icon: Shield },
    { key: 'danger', label: 'Danger Zone', icon: Trash2 },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2 text-left animate-fadeIn select-none">
      {/* Page Header */}
      <div className="space-y-1">
        <h2 className="text-[22px] font-black text-[#121212] tracking-tight">Account Settings</h2>
        <p className="text-[13px] text-[#8A8A8A] font-medium">
          Manage your profile information, security preferences, and notification alerts.
        </p>
      </div>

      {/* Toast Messages */}
      {successMsg && (
        <div className="flex items-center gap-2.5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold animate-fadeIn">
          <Check className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="flex items-center gap-2.5 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold animate-fadeIn">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Grid: Nav Sidebar + Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* ─── Navigation Sidebar ─── */}
        <div className="md:col-span-1 space-y-4">
          {/* User Card */}
          <div className="bg-white border border-[#EEEEEE] rounded-2xl p-5 shadow-sm text-center space-y-3">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1DB954] to-[#0E9E48] mx-auto flex items-center justify-center text-white text-xl font-black shadow-md">
              {currentUser.fullName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)}
            </div>
            <div>
              <p className="text-[13px] font-extrabold text-[#121212]">{currentUser.fullName}</p>
              <p className="text-[11px] text-[#8A8A8A] font-medium">{currentUser.email}</p>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#8A8A8A]">
              <Calendar className="w-3 h-3" />
              <span>Member since {memberSince}</span>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="bg-white border border-[#EEEEEE] rounded-2xl p-3 shadow-sm space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePanel === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => { setActivePanel(item.key); setSuccessMsg(''); setErrorMsg(''); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 text-left ${
                    isActive
                      ? 'bg-[#1DB954]/10 text-[#121212]'
                      : item.key === 'danger'
                      ? 'text-red-400 hover:bg-red-50 hover:text-red-600'
                      : 'text-[#8A8A8A] hover:bg-[#F3F3F3] hover:text-[#121212]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#1DB954]' : item.key === 'danger' ? '' : 'text-[#B0B0B0]'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto text-[8px] font-extrabold bg-[#EEEEEE] text-[#8A8A8A] px-1.5 py-0.5 rounded uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Content Panel ─── */}
        <div className="md:col-span-3 space-y-6">

          {/* ═══════════════ PROFILE PANEL ═══════════════ */}
          {activePanel === 'profile' && (
            <div className="bg-white border border-[#EEEEEE] rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-[#F0F0F0] flex items-center gap-2.5">
                <User className="w-4.5 h-4.5 text-[#1DB954]" />
                <h3 className="text-sm font-extrabold text-[#121212]">Profile Details</h3>
              </div>
              <form onSubmit={handleSaveProfile} className="p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold text-[#8A8A8A] uppercase tracking-wider block">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C0C0C0]" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E5E5] text-xs text-[#121212] font-medium focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/10 bg-white transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold text-[#8A8A8A] uppercase tracking-wider block">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C0C0C0]" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E5E5] text-xs text-[#121212] font-medium focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/10 bg-white transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Account Info Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold text-[#8A8A8A] uppercase tracking-wider block">Account ID</label>
                    <div className="px-4 py-3 rounded-xl border border-[#F0F0F0] bg-[#FAFAFA] text-xs text-[#B0B0B0] font-mono select-all">
                      {currentUser.email.split('@')[0]}-{currentUser.createdAt.slice(0, 10).replace(/-/g, '')}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold text-[#8A8A8A] uppercase tracking-wider block">Member Since</label>
                    <div className="px-4 py-3 rounded-xl border border-[#F0F0F0] bg-[#FAFAFA] text-xs text-[#8A8A8A] font-medium flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#C0C0C0]" />
                      {memberSince}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2 border-t border-[#F5F5F5]">
                  <button
                    type="submit"
                    disabled={profileLoading}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#1DB954] hover:bg-[#1aa34a] text-white text-[11px] font-extrabold tracking-wider uppercase rounded-full shadow-sm active:scale-95 transition-all disabled:opacity-50"
                  >
                    {profileLoading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Saving…</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ═══════════════ SECURITY PANEL ═══════════════ */}
          {activePanel === 'security' && (
            <div className="space-y-6">
              {/* Change Password Card */}
              <div className="bg-white border border-[#EEEEEE] rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#F0F0F0] flex items-center gap-2.5">
                  <KeyRound className="w-4.5 h-4.5 text-[#1DB954]" />
                  <h3 className="text-sm font-extrabold text-[#121212]">Change Password</h3>
                </div>
                <form onSubmit={handleChangePassword} className="p-6 space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold text-[#8A8A8A] uppercase tracking-wider block">Current Password</label>
                    <div className="relative">
                      <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C0C0C0]" />
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#E5E5E5] text-xs text-[#121212] font-medium focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/10 bg-white transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#C0C0C0] hover:text-[#8A8A8A] transition-colors"
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold text-[#8A8A8A] uppercase tracking-wider block">New Password</label>
                      <div className="relative">
                        <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C0C0C0]" />
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#E5E5E5] text-xs text-[#121212] font-medium focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/10 bg-white transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#C0C0C0] hover:text-[#8A8A8A] transition-colors"
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold text-[#8A8A8A] uppercase tracking-wider block">Confirm New Password</label>
                      <div className="relative">
                        <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C0C0C0]" />
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E5E5] text-xs text-[#121212] font-medium focus:outline-none focus:border-[#1DB954] focus:ring-2 focus:ring-[#1DB954]/10 bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password strength hint */}
                  <div className="text-[10px] text-[#B0B0B0] font-medium">
                    Password must be at least 8 characters. Use a mix of letters, numbers, and symbols for stronger security.
                  </div>

                  <div className="flex justify-end pt-2 border-t border-[#F5F5F5]">
                    <button
                      type="submit"
                      disabled={passwordLoading}
                      className="flex items-center gap-2 px-6 py-2.5 bg-[#1DB954] hover:bg-[#1aa34a] text-white text-[11px] font-extrabold tracking-wider uppercase rounded-full shadow-sm active:scale-95 transition-all disabled:opacity-50"
                    >
                      {passwordLoading ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Updating…</span>
                        </>
                      ) : (
                        <>
                          <Shield className="w-3.5 h-3.5" />
                          <span>Update Password</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Connected Accounts Card */}
              <div className="bg-white border border-[#EEEEEE] rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#F0F0F0] flex items-center gap-2.5">
                  <Shield className="w-4.5 h-4.5 text-[#1DB954]" />
                  <h3 className="text-sm font-extrabold text-[#121212]">Connected Accounts</h3>
                </div>
                <div className="p-6 space-y-3">
                  {/* Google */}
                  <div className="flex items-center justify-between bg-[#FAFAFA] p-4 rounded-xl border border-[#F0F0F0]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center border border-[#E5E5E5] shadow-sm">
                        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                          <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.478 0-6.3-2.822-6.3-6.3s2.822-6.3 6.3-6.3c1.556 0 2.978.57 4.088 1.509l3.076-3.076C18.99 2.067 15.78 1 12 1 5.925 1 1 5.925 1 12s4.925 11 11 11c6.333 0 10.74-4.444 10.74-11 0-.68-.06-1.34-.18-1.715h-10.32z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-extrabold text-[#121212]">Google Account</p>
                        <p className="text-[10px] text-[#8A8A8A] font-medium">Single sign-on integration</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                      Connected
                    </span>
                  </div>

                  {/* LinkedIn */}
                  <div className="flex items-center justify-between bg-[#FAFAFA] p-4 rounded-xl border border-[#F0F0F0]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center border border-[#E5E5E5] shadow-sm">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#0A66C2">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-extrabold text-[#121212]">LinkedIn</p>
                        <p className="text-[10px] text-[#8A8A8A] font-medium">Profile sync &amp; growth tools</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold text-[#8A8A8A] bg-[#EEEEEE] border border-[#E0E0E0] px-2.5 py-1 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* ═══════════════ DANGER ZONE PANEL ═══════════════ */}
          {activePanel === 'danger' && (
            <div className="space-y-6">
              {/* Sign Out Card */}
              <div className="bg-white border border-[#EEEEEE] rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#F0F0F0] flex items-center gap-2.5">
                  <LogOut className="w-4.5 h-4.5 text-amber-500" />
                  <h3 className="text-sm font-extrabold text-[#121212]">Sign Out</h3>
                </div>
                <div className="p-6 flex items-center justify-between gap-4">
                  <div className="text-left">
                    <p className="text-xs font-extrabold text-[#121212]">Sign out from all devices</p>
                    <p className="text-[10.5px] text-[#8A8A8A] font-medium mt-0.5">
                      End your current session and clear saved credentials. You will need to sign in again.
                    </p>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-5 py-2.5 border border-[#D5D5D5] text-[#121212] text-[11px] font-extrabold tracking-wider uppercase rounded-full hover:bg-[#F3F3F3] hover:border-[#121212] active:scale-95 transition-all shrink-0"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>

              {/* Delete Account Card */}
              <div className="bg-white border border-red-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-red-100 flex items-center gap-2.5 bg-red-50/50">
                  <Trash2 className="w-4.5 h-4.5 text-red-500" />
                  <h3 className="text-sm font-extrabold text-red-700">Delete Account</h3>
                </div>
                <div className="p-6 flex items-center justify-between gap-4">
                  <div className="text-left">
                    <p className="text-xs font-extrabold text-[#121212]">Permanently delete your account</p>
                    <p className="text-[10.5px] text-[#8A8A8A] font-medium mt-0.5">
                      This action cannot be undone. All your data including resumes, analyses, and cover letters will be permanently removed.
                    </p>
                  </div>
                  <button
                    className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-[11px] font-extrabold tracking-wider uppercase rounded-full active:scale-95 transition-all shrink-0 shadow-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
