'use client';

import React, { useState } from 'react';
import { User, Settings, CreditCard, LogOut, Sparkles, ChevronDown, Play, Check, Copy, ShieldCheck, Zap, X } from 'lucide-react';
import { soundEngine } from '@/lib/sound-engine';

interface UserProfileMenuProps {
  user: { name: string; email: string; role: string };
  onOpenSettings: () => void;
  onLogout: () => void;
  onReplayLoading: () => void;
  onOpenAuth: () => void;
  onOpenLanding?: () => void;
}

export const UserProfileMenu: React.FC<UserProfileMenuProps> = ({
  user,
  onOpenSettings,
  onLogout,
  onReplayLoading,
  onOpenAuth,
  onOpenLanding,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBillingModal, setShowBillingModal] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const toggle = () => {
    soundEngine.playClick();
    setIsOpen(!isOpen);
  };

  const copyLicense = () => {
    soundEngine.playClick();
    navigator.clipboard.writeText('INKLM-PRO-9842-8819-7411');
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2200);
  };

  return (
    <>
      <div className="relative">
        {/* Profile Trigger Button */}
        <button
          onClick={toggle}
          className="flex items-center space-x-2.5 rounded-xl border border-white/10 bg-slate-900/80 px-2.5 py-1.5 hover:bg-slate-800/90 transition-all text-left"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 text-xs font-bold text-white shadow-sm">
            {user.name.charAt(0)}
          </div>
          <div className="hidden sm:block leading-none">
            <div className="text-xs font-semibold text-white tracking-tight">{user.name}</div>
            <div className="text-[10px] text-indigo-400 font-medium">{user.role}</div>
          </div>
          <ChevronDown className="h-3 w-3 text-slate-400" />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 top-12 z-50 w-56 rounded-2xl border border-white/10 bg-[#0c101d] p-2 shadow-2xl shadow-black/80 backdrop-blur-xl animate-fadeIn">
            {/* User Header */}
            <div className="px-3 py-2 border-b border-white/10">
              <span className="text-xs font-bold text-white block">{user.name}</span>
              <span className="text-[11px] text-slate-400 block truncate">{user.email}</span>
              <div className="mt-1.5 inline-flex items-center space-x-1 rounded bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/20">
                <Sparkles className="h-2.5 w-2.5 text-indigo-400" />
                <span>INKLOOM PRO TIER</span>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1 space-y-0.5 text-xs">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setIsOpen(false);
                  onOpenSettings();
                }}
                className="w-full flex items-center space-x-2.5 rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <Settings className="h-3.5 w-3.5 text-slate-400" />
                <span>Preferences &amp; AI</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  setIsOpen(false);
                  setShowBillingModal(true);
                }}
                className="w-full flex items-center space-x-2.5 rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <CreditCard className="h-3.5 w-3.5 text-slate-400" />
                <span>Billing &amp; License</span>
              </button>

              {onOpenLanding && (
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setIsOpen(false);
                    onOpenLanding();
                  }}
                  className="w-full flex items-center space-x-2.5 rounded-lg px-3 py-2 text-cyan-300 hover:bg-cyan-950/30 hover:text-white transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                  <span>View Landing Page</span>
                </button>
              )}

              <button
                onClick={() => {
                  soundEngine.playClick();
                  setIsOpen(false);
                  onReplayLoading();
                }}
                className="w-full flex items-center space-x-2.5 rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <Play className="h-3.5 w-3.5 text-cyan-400" />
                <span>Replay Cinematic Welcome</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  setIsOpen(false);
                  onOpenAuth();
                }}
                className="w-full flex items-center space-x-2.5 rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <User className="h-3.5 w-3.5 text-slate-400" />
                <span>Switch Account / Sign In</span>
              </button>
            </div>

            {/* Logout */}
            <div className="pt-1 border-t border-white/10">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setIsOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center space-x-2.5 rounded-lg px-3 py-2 text-xs text-rose-400 hover:bg-rose-950/20 hover:text-rose-300 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* iOS-Style Billing & License Modal Sheet */}
      {showBillingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md rounded-[28px] border border-white/15 bg-[#0e1322]/95 p-6 shadow-2xl backdrop-blur-2xl space-y-5">
            <div className="ios-grabber" />

            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-lg">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">INKLOOM PRO License</h3>
                  <p className="text-xs text-slate-400">Enterprise AI Brand Synthesis System</p>
                </div>
              </div>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setShowBillingModal(false);
                }}
                className="rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* License Details Card */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white">Active Pro Subscription</span>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
                  Active
                </span>
              </div>
              <div className="text-xs text-slate-400">
                Valid through <span className="font-semibold text-white">October 28, 2026</span> (Auto-renews annually)
              </div>

              {/* License Key Box */}
              <div className="flex items-center justify-between rounded-xl bg-black/40 border border-white/10 px-3 py-2">
                <span className="font-mono text-xs text-indigo-300">INKLM-PRO-9842-8819-7411</span>
                <button
                  onClick={copyLicense}
                  className="flex items-center space-x-1 text-[11px] font-medium text-slate-300 hover:text-white"
                >
                  {copiedKey ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3 text-slate-400" />}
                  <span>{copiedKey ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Inset Features List */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Included Capabilities
              </span>
              <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-3 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-200">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-3.5 w-3.5 text-amber-400" />
                    <span>Autonomous 5-Agent Council</span>
                  </div>
                  <span className="text-emerald-400 font-semibold">Unlimited</span>
                </div>
                <div className="flex items-center justify-between text-slate-200">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                    <span>Multi-Provider LLM Fallback</span>
                  </div>
                  <span className="text-emerald-400 font-semibold">Gemini + GPT-4o</span>
                </div>
                <div className="flex items-center justify-between text-slate-200">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-3.5 w-3.5 text-purple-400" />
                    <span>Production SQL &amp; Launch Kit Exports</span>
                  </div>
                  <span className="text-emerald-400 font-semibold">Full 13 Tables</span>
                </div>
              </div>
            </div>

            {/* Close / Done */}
            <div className="pt-2">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setShowBillingModal(false);
                }}
                className="w-full rounded-2xl bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-lg hover:bg-indigo-500 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

