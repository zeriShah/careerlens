import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Shield, Bell, Check, AlertCircle } from 'lucide-react';

interface SettingsTabProps {
  currentUser: {
    fullName: string;
    email: string;
    createdAt: string;
  };
}

export default function SettingsTab({ currentUser }: SettingsTabProps) {
  const { updateProfile } = useAuth();
  const [fullName, setFullName] = useState<string>(currentUser.fullName);
  const [email, setEmail] = useState<string>(currentUser.email);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  
  const [profileSuccess, setProfileSuccess] = useState<string>('');
  const [profileError, setProfileError] = useState<string>('');

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccess('');
    setProfileError('');

    if (!fullName.trim() || !email.trim()) {
      setProfileError('Full name and email are required.');
      return;
    }

    try {
      await updateProfile(fullName, email);
      setProfileSuccess('Profile settings updated successfully!');
      setTimeout(() => setProfileSuccess(''), 4000);
    } catch (err: any) {
      setProfileError(err.message || 'Failed to update profile settings.');
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccess('');
    setProfileError('');

    if (!currentPassword || !newPassword) {
      setProfileError('Please enter your current and new passwords.');
      return;
    }
    if (newPassword.length < 8) {
      setProfileError('New password must be at least 8 characters long.');
      return;
    }

    try {
      await updateProfile(fullName, email, currentPassword, newPassword);
      setProfileSuccess('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setTimeout(() => setProfileSuccess(''), 4000);
    } catch (err: any) {
      setProfileError(err.message || 'Failed to change password.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2 text-left">
      <div className="space-y-1 text-left">
        <h2 className="text-xl font-bold text-text-primary tracking-tight">Account Settings</h2>
        <p className="text-sm text-text-secondary">Configure your profile info, security metrics, and application alerts.</p>
      </div>

      {profileSuccess && (
        <div className="flex items-center space-x-2 p-3.5 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-sm animate-fadeIn">
          <Check className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{profileSuccess}</span>
        </div>
      )}

      {profileError && (
        <div className="flex items-center space-x-2 p-3.5 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm animate-fadeIn">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{profileError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Navigation Sidebar Panel */}
        <div className="border border-border bg-white p-4 rounded-2xl shadow-sm h-fit space-y-1">
          <button className="w-full flex items-center space-x-3 px-3 py-2 bg-primary/10 text-primary font-bold rounded-lg text-xs transition-all text-left">
            <User className="w-4 h-4" />
            <span>Profile Details</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-3 py-2 text-text-secondary hover:bg-slate-50 rounded-lg text-xs transition-all text-left">
            <Shield className="w-4 h-4" />
            <span>Login & Security</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-3 py-2 text-text-secondary hover:bg-slate-50 rounded-lg text-xs transition-all text-left">
            <Bell className="w-4 h-4" />
            <span>Notification Alerts</span>
          </button>
        </div>

        {/* Content Panel */}
        <div className="md:col-span-2 space-y-6">
          {/* Profile Details Card */}
          <div className="border border-border bg-white p-5 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-text-primary pb-2 border-b border-slate-100 flex items-center space-x-2">
              <User className="w-4.5 h-4.5 text-primary" />
              <span>Profile Details</span>
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wide">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 text-xs focus:outline-none focus:border-primary text-text-primary bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wide">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 text-xs focus:outline-none focus:border-primary text-text-primary bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#121212] hover:bg-[#121212]/90 text-white text-[11px] font-bold tracking-wider uppercase rounded-full shadow-subtle transition-all duration-150"
                >
                  Save Profile Settings
                </button>
              </div>
            </form>
          </div>

          {/* Login & Security Card */}
          <div className="border border-border bg-white p-5 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-text-primary pb-2 border-b border-slate-100 flex items-center space-x-2">
              <Shield className="w-4.5 h-4.5 text-primary" />
              <span>Login Security</span>
            </h3>

            <form onSubmit={handleUpdatePassword} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wide">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 text-xs focus:outline-none focus:border-primary text-text-primary bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-text-secondary uppercase tracking-wide">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border/80 text-xs focus:outline-none focus:border-primary text-text-primary bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#121212] hover:bg-[#121212]/90 text-white text-[11px] font-bold tracking-wider uppercase rounded-full shadow-subtle transition-all duration-150"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>

          {/* Application Connected Accounts */}
          <div className="border border-border bg-white p-5 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-text-primary pb-2 border-b border-slate-100">Connected Accounts</h3>
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-border/60">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-border/60">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.478 0-6.3-2.822-6.3-6.3s2.822-6.3 6.3-6.3c1.556 0 2.978.57 4.088 1.509l3.076-3.076C18.99 2.067 15.78 1 12 1 5.925 1 1 5.925 1 12s4.925 11 11 11c6.333 0 10.74-4.444 10.74-11 0-.68-.06-1.34-.18-1.715h-10.32z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-text-primary">Google Account</p>
                  <p className="text-[10px] text-text-secondary">Single Sign-On integration active</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.8 rounded-full">
                Connected
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

