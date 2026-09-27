'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Building,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Rocket
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '@/lib/sound-engine';

export type AuthMode = 'login' | 'signup' | 'otp' | 'forgot-password' | 'onboarding';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
  onLoginSuccess: (user: { name: string; email: string; role: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [email, setEmail] = useState('rajranjeet7680@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Ranjeet Kumar');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Student Builder');
  const [company, setCompany] = useState('Inkloom Cohort');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // OTP State
  const [otpValues, setOtpValues] = useState<string[]>(['4', '2', '8', '1', '9', '6']);
  const [countdown, setCountdown] = useState(24);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpSuccess, setOtpSuccess] = useState(false);
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Onboarding State
  const [projectType, setProjectType] = useState('Student Project');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    'Strategy',
    'Naming',
    'Visual Identity',
    'Launch',
  ]);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode, isOpen]);

  // Countdown timer for OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (mode === 'otp' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [mode, countdown]);

  if (!isOpen) return null;

  // Handle OTP Inputs
  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;

    const newOtp = [...otpValues];
    newOtp[index] = val.slice(-1);
    setOtpValues(newOtp);

    // Auto advance
    if (val && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtpValues(digits);
      otpInputsRef.current[5]?.focus();
    }
  };

  const handleResendOtp = () => {
    setCountdown(24);
    soundEngine.playClick();
  };

  const handleVerifyOtp = () => {
    setIsVerifyingOtp(true);
    soundEngine.playClick();
    setTimeout(() => {
      setIsVerifyingOtp(false);
      setOtpSuccess(true);
      soundEngine.playSuccessChord();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#a855f7', '#06b6d4', '#10b981'],
      });

      setTimeout(() => {
        setOtpSuccess(false);
        setMode('onboarding');
      }, 900);
    }, 800);
  };

  const handleFinishOnboarding = () => {
    soundEngine.playSuccessChord();
    onLoginSuccess({
      name: name || 'Ranjeet Kumar',
      email: email || 'rajranjeet7680@gmail.com',
      role: role || 'Student Builder',
    });
    onClose();
  };

  const toggleGoal = (goal: string) => {
    soundEngine.playClick();
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#0b0e19] p-7 shadow-2xl shadow-indigo-950/70">
        {/* Glow decoration */}
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 h-48 w-48 rounded-full bg-cyan-600/20 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute right-5 top-5 rounded-full p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* 1. LOGIN MODE */}
        {mode === 'login' && (
          <div className="space-y-5">
            <div className="text-center space-y-1.5">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/30">
                <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#090c15]">
                  <Sparkles className="h-6 w-6 text-cyan-300" />
                </div>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white">Welcome Back</h2>
              <p className="text-xs text-slate-400">
                Sign in to continue building iconic brands.
              </p>
            </div>

            {/* Social Logins */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  onLoginSuccess({ name: 'Ranjeet Kumar', email: 'rajranjeet7680@gmail.com', role: 'Student Builder' });
                  onClose();
                }}
                className="w-full flex items-center justify-center space-x-2 rounded-xl border border-white/10 bg-slate-900/80 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:border-white/20 transition-all"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  onLoginSuccess({ name: 'Ranjeet Kumar', email: 'rajranjeet7680@gmail.com', role: 'Student Builder' });
                  onClose();
                }}
                className="w-full flex items-center justify-center space-x-2 rounded-xl border border-white/10 bg-slate-900/80 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:border-white/20 transition-all"
              >
                <svg className="h-4 w-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>Continue with GitHub</span>
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Email / Password Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                soundEngine.playClick();
                onLoginSuccess({ name, email, role });
                onClose();
              }}
              className="space-y-3.5"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-slate-900/90 pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">Password</label>
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setMode('forgot-password');
                    }}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-white/10 bg-slate-900/90 pl-9 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-purple-500 transition-all"
              >
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="text-center text-xs text-slate-400 pt-1">
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setMode('signup');
                }}
                className="text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Create one
              </button>
            </div>
          </div>
        )}

        {/* 2. SIGN UP MODE */}
        {mode === 'signup' && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold tracking-tight text-white">Create an Account</h2>
              <p className="text-xs text-slate-400">
                Join founders &amp; builders architecting iconic brands.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                soundEngine.playClick();
                setMode('otp');
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Ranjeet Kumar"
                    className="w-full rounded-xl border border-white/10 bg-slate-900/90 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="rajranjeet7680@gmail.com"
                    className="w-full rounded-xl border border-white/10 bg-slate-900/90 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-900/90 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="Student Builder">Student Builder</option>
                    <option value="Founder / CEO">Founder / CEO</option>
                    <option value="Product Designer">Product Designer</option>
                    <option value="Growth Marketer">Growth Marketer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Organization</label>
                  <div className="relative">
                    <Building className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Inkloom Cohort"
                      className="w-full rounded-xl border border-white/10 bg-slate-900/90 pl-8 pr-2 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="At least 8 chars"
                    className="w-full rounded-xl border border-white/10 bg-slate-900/90 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Confirm password"
                    className="w-full rounded-xl border border-white/10 bg-slate-900/90 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                  className="h-3.5 w-3.5 rounded border-white/20 bg-slate-900 text-indigo-600 focus:ring-0"
                />
                <label htmlFor="terms" className="text-[11px] text-slate-400">
                  I agree to the Terms of Service &amp; Privacy Policy
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-purple-500 transition-all"
              >
                <span>Create Account</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="text-center text-xs text-slate-400 pt-1">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setMode('login');
                }}
                className="text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Sign In
              </button>
            </div>
          </div>
        )}

        {/* 3. OTP VERIFICATION MODE */}
        {mode === 'otp' && (
          <div className="space-y-5 text-center">
            {/* Animated Envelope / Shield Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-purple-600 p-0.5 shadow-xl shadow-cyan-500/20">
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#090c15]">
                {otpSuccess ? (
                  <CheckCircle2 className="h-8 w-8 text-emerald-400 animate-bounce" />
                ) : (
                  <Mail className="h-8 w-8 text-cyan-300" />
                )}
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight text-white">Verify Your Account</h2>
              <p className="text-xs text-slate-400">
                We&apos;ve sent a 6-digit code to{' '}
                <span className="text-indigo-300 font-semibold">{email}</span>
              </p>
            </div>

            {/* 6 OTP Input Boxes */}
            <div className="flex justify-center space-x-2 py-2">
              {otpValues.map((val, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    otpInputsRef.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={val}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  onPaste={handleOtpPaste}
                  className="h-12 w-11 rounded-xl border border-white/10 bg-slate-900/90 text-center font-mono text-lg font-bold text-white shadow-inner focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                />
              ))}
            </div>

            {/* Resend Timer */}
            <div className="text-xs text-slate-400 flex items-center justify-center space-x-1">
              {countdown > 0 ? (
                <span>
                  Resend code in <strong className="text-cyan-400 font-mono">00:{countdown < 10 ? `0${countdown}` : countdown}</strong>
                </span>
              ) : (
                <button
                  onClick={handleResendOtp}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center space-x-1"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Resend 6-Digit Code</span>
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleVerifyOtp}
                disabled={isVerifyingOtp}
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-500/30 hover:from-cyan-400 hover:to-purple-500 transition-all disabled:opacity-50"
              >
                {isVerifyingOtp ? (
                  <span>Verifying Code...</span>
                ) : (
                  <>
                    <span>Verify &amp; Continue</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setMode('signup');
                }}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                Use a different email address
              </button>
            </div>
          </div>
        )}

        {/* 4. ONBOARDING MODE */}
        {mode === 'onboarding' && (
          <div className="space-y-5">
            <div className="text-center space-y-1">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-indigo-600 p-0.5">
                <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#090c15]">
                  <Rocket className="h-6 w-6 text-emerald-400" />
                </div>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                Welcome, {name.split(' ')[0]}!
              </h2>
              <p className="text-xs text-slate-400">
                Let&apos;s configure your BrandForge workspace.
              </p>
            </div>

            {/* Question 1: What are you building? */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                What are you building?
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  'Student Project',
                  'SaaS Platform',
                  'Startup',
                  'Creator Brand',
                  'Community',
                  'Agency / Studio',
                ].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setProjectType(type);
                    }}
                    className={`rounded-xl border p-2.5 text-left font-medium transition-all ${
                      projectType === type
                        ? 'border-indigo-500 bg-indigo-600/20 text-indigo-300 font-semibold shadow-sm'
                        : 'border-white/10 bg-slate-900/60 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: What would you like help with? */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                What would you like BrandForge to help with?
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {[
                  'Strategy',
                  'Naming',
                  'Visual Identity',
                  'Messaging',
                  'Launch',
                  'Brand Audit',
                ].map((goal) => {
                  const isChecked = selectedGoals.includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`rounded-lg border px-2 py-1.5 text-center text-[11px] font-medium transition-all ${
                        isChecked
                          ? 'border-cyan-400/50 bg-cyan-500/15 text-cyan-300'
                          : 'border-white/5 bg-slate-900/50 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {isChecked ? '✓ ' : ''}{goal}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleFinishOnboarding}
              className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-emerald-500 via-indigo-600 to-purple-600 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-purple-500 transition-all"
            >
              <span>Launch My Workspace</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* 5. FORGOT PASSWORD MODE */}
        {mode === 'forgot-password' && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold tracking-tight text-white">Reset Password</h2>
              <p className="text-xs text-slate-400">
                Enter your account email to receive a password reset link.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                soundEngine.playSuccessChord();
                alert(`Reset instructions sent to ${email}`);
                setMode('login');
              }}
              className="space-y-3.5"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-slate-900/90 pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-lg hover:bg-indigo-500 transition-all"
              >
                <span>Send Reset Link</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="text-center text-xs text-slate-400 pt-1">
              Remember your password?{' '}
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setMode('login');
                }}
                className="text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
