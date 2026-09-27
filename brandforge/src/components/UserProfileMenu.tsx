'use client';

import React, { useState } from 'react';
import { User, Settings, CreditCard, LogOut, Sparkles, ChevronDown, Play } from 'lucide-react';
import { soundEngine } from '@/lib/sound-engine';

interface UserProfileMenuProps {
  user: { name: string; email: string; role: string };
  onOpenSettings: () => void;
  onLogout: () => void;
  onReplayLoading: () => void;
  onOpenAuth: () => void;
}

export const UserProfileMenu: React.FC<UserProfileMenuProps> = ({
  user,
  onOpenSettings,
  onLogout,
  onReplayLoading,
  onOpenAuth,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    soundEngine.playClick();
    setIsOpen(!isOpen);
  };

  return (
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
                alert('Plan: INKLOOM PRO (Active until Oct 2026)');
              }}
              className="w-full flex items-center space-x-2.5 rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <CreditCard className="h-3.5 w-3.5 text-slate-400" />
              <span>Billing &amp; License</span>
            </button>

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
  );
};
