import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, User, AlertCircle, ArrowLeft, ArrowRight, Eye, EyeOff, Clock } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);

  const { login, isAuthenticated } = useCMS();
  const navigate = useNavigate();

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const timer = setInterval(() => {
      setLockoutSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setError(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [lockoutSeconds]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (lockoutSeconds > 0) return;

    setLoading(true);
    setError(null);

    const result = await login(username, password);
    setLoading(false);

    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error || 'Invalid credentials. Please verify your login details.');
      if (result.remainingSeconds) {
        setLockoutSeconds(result.remainingSeconds);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Top Navigation Link */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#181b66] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Website</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header Banner */}
          <div className="bg-[#181b66] p-8 text-center text-white relative">
            <div className="w-16 h-16 rounded-2xl bg-white p-1.5 mx-auto mb-4 shadow-md flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Good Shepherd Crest" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-xl font-bold font-serif">Good Shepherd Montessori</h1>
            <p className="text-xs uppercase tracking-widest text-blue-200 mt-1 font-semibold">
              Content Management Interface (CMI)
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/60 text-blue-200 text-[11px] font-semibold border border-blue-400/20">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
              <span>PBKDF2 Protected Portal</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span>{error}</span>
                  {lockoutSeconds > 0 && (
                    <div className="mt-1 flex items-center gap-1 font-bold text-red-800">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Security Lockout: {lockoutSeconds}s remaining</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Username or Staff Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter administrator username"
                  disabled={lockoutSeconds > 0}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-[#181b66] focus:bg-white transition-colors disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  disabled={lockoutSeconds > 0}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-[#181b66] focus:bg-white transition-colors disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || lockoutSeconds > 0}
              className="w-full py-3 rounded-xl bg-[#181b66] hover:bg-blue-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              <span>
                {lockoutSeconds > 0
                  ? `Locked (${lockoutSeconds}s)`
                  : loading
                    ? 'Authenticating...'
                    : 'Sign In to CMI Portal'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Security Notice */}
            <div className="pt-4 border-t border-slate-100 text-center">
              <span className="text-[11px] text-slate-400 block font-medium">
                Authorized School Administrative Access Only · Protected System
              </span>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Presbyterian Church of Ghana · Bechem District · Secure Editor
        </p>
      </div>
    </div>
  );
}
