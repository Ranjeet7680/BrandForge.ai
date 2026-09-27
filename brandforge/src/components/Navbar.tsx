'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Download,
  Plus,
  Flame,
  Volume2,
  VolumeX,
  Search,
  Bell,
  Cpu,
  Globe
} from 'lucide-react';
import { BrandProject } from '@/types/brand';
import { soundEngine } from '@/lib/sound-engine';
import { NotificationsPopover } from './NotificationsPopover';
import { UserProfileMenu } from './UserProfileMenu';

interface NavbarProps {
  currentProject: BrandProject;
  projects: BrandProject[];
  onSelectProject: (id: string) => void;
  onOpenNewModal: () => void;
  onOpenSettingsModal: () => void;
  onOpenExportModal: () => void;
  aiSource: 'local' | 'gemini' | 'openai';
  onNavigateToStage: (stage: string) => void;
  onOpenCommandPalette: () => void;
  onReplayLoading: () => void;
  onOpenLanding?: () => void;
  user: { name: string; email: string; role: string };
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentProject,
  projects,
  onSelectProject,
  onOpenNewModal,
  onOpenSettingsModal,
  onOpenExportModal,
  aiSource,
  onNavigateToStage,
  onOpenCommandPalette,
  onReplayLoading,
  onOpenLanding,
  user,
  onOpenAuth,
  onLogout,
}) => {
  const [isMuted, setIsMuted] = useState(!soundEngine.soundEnabled);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#090c15]/95 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-3 sm:px-6 gap-2 sm:gap-4">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <div
            onClick={() => {
              soundEngine.playClick();
              onNavigateToStage('overview');
            }}
            className="flex h-9 w-9 sm:h-10 sm:w-10 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20"
          >
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#090c15]">
              <Sparkles className="h-5 w-5 text-cyan-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span
                onClick={() => onNavigateToStage('overview')}
                className="font-bold tracking-tight text-white text-base sm:text-lg cursor-pointer"
              >
                BrandForge<span className="text-cyan-400">.ai</span>
              </span>
              <span className="hidden sm:inline-block rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-indigo-400 border border-indigo-500/20">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden xl:block">
              Multi-Agent Brand Intelligence &amp; Strategy Engine
            </p>
          </div>
        </div>

        {/* Center: Search / Command Palette Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenCommandPalette();
            }}
            className="w-full flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/70 px-3.5 py-1.5 text-xs text-slate-400 hover:border-indigo-500/40 hover:text-slate-200 transition-all shadow-inner"
          >
            <div className="flex items-center space-x-2">
              <Search className="h-3.5 w-3.5 text-slate-500" />
              <span>Search projects, ideas, or anything...</span>
            </div>
            <kbd className="hidden lg:inline-flex items-center rounded bg-black/40 px-1.5 py-0.5 font-mono text-[10px] text-slate-400 border border-white/10">
              Ctrl + K
            </kbd>
          </button>
        </div>

        {/* Right Section: Actions, Notifications, User */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* Mobile search button */}
          <button
            onClick={onOpenCommandPalette}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-slate-800 text-slate-400 hover:text-white"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Project Selector */}
          <div className="relative flex items-center">
            <select
              value={currentProject.id}
              onChange={(e) => onSelectProject(e.target.value)}
              className="h-8 sm:h-9 rounded-lg border border-white/10 bg-slate-900/90 px-2.5 sm:pl-3 sm:pr-8 text-xs font-semibold text-slate-200 shadow-sm focus:border-indigo-500 focus:outline-none"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Landing Page Link */}
          {onOpenLanding && (
            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenLanding();
              }}
              className="hidden md:flex h-8 sm:h-9 items-center space-x-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/20 px-2.5 sm:px-3 text-xs font-semibold text-cyan-300 hover:bg-cyan-900/30 hover:border-cyan-400 transition-all shadow-sm"
              title="Return to Landing Page"
            >
              <Globe className="h-3.5 w-3.5 text-cyan-400" />
              <span>Landing Page</span>
            </button>
          )}

          {/* Forge New Idea Button */}
          <button
            onClick={onOpenNewModal}
            className="flex h-8 sm:h-9 items-center space-x-1.5 rounded-lg bg-indigo-600 px-2.5 sm:px-3 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">New Idea</span>
          </button>

          {/* Brand Battle shortcut */}
          <button
            onClick={() => onNavigateToStage('battle')}
            className="hidden lg:flex h-9 items-center space-x-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 px-2.5 text-xs font-medium text-purple-300 hover:bg-purple-500/20 transition-colors"
          >
            <Flame className="h-3.5 w-3.5 text-purple-400" />
            <span>Battle</span>
          </button>

          {/* AI Engine Status Badge */}
          <div className="hidden xl:flex items-center space-x-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
            <Cpu className="h-3.5 w-3.5 text-emerald-400" />
            <span className="capitalize">{aiSource === 'local' ? 'Neural Engine' : `${aiSource} Engine`}</span>
          </div>

          {/* Export Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenExportModal();
            }}
            className="hidden sm:flex h-8 sm:h-9 items-center space-x-1.5 rounded-lg border border-white/10 bg-slate-800/80 px-2.5 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors"
            title="Export Launch Kit"
          >
            <Download className="h-3.5 w-3.5 text-slate-300" />
            <span className="hidden md:inline">Export</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              const newState = soundEngine.toggleSound();
              setIsMuted(!newState);
              if (newState) soundEngine.playClick();
            }}
            className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border transition-colors ${
              !isMuted
                ? 'border-indigo-500/30 bg-indigo-500/10 text-cyan-300 hover:bg-indigo-500/20'
                : 'border-white/10 bg-slate-800/80 text-slate-500 hover:text-slate-300'
            }`}
            title={!isMuted ? 'Mute Procedural Web Audio' : 'Unmute Procedural Web Audio'}
          >
            {!isMuted ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                soundEngine.playClick();
                setIsNotificationsOpen(!isNotificationsOpen);
              }}
              className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-white/10 bg-slate-800/80 text-slate-300 hover:bg-slate-700 transition-colors"
              title="Agent Activity Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[9px] font-bold text-black ring-2 ring-[#090c15]">
                3
              </span>
            </button>
            <NotificationsPopover
              isOpen={isNotificationsOpen}
              onClose={() => setIsNotificationsOpen(false)}
              onNavigateToStage={onNavigateToStage}
            />
          </div>

          {/* User Profile Menu */}
          <UserProfileMenu
            user={user}
            onOpenSettings={onOpenSettingsModal}
            onLogout={onLogout}
            onReplayLoading={onReplayLoading}
            onOpenAuth={onOpenAuth}
            onOpenLanding={onOpenLanding}
          />
        </div>
      </div>
    </header>
  );
};
