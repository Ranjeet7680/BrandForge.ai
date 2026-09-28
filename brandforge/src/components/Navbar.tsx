'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  Globe,
  ChevronDown
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
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#070914]/85 backdrop-blur-2xl transition-all">
      <div className="flex h-16 items-center justify-between px-3 sm:px-6 gap-2 sm:gap-4 max-w-[1920px] mx-auto">
        {/* Left: Brand Logo (iOS App Icon Squircle) */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <motion.div
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              soundEngine.playClick();
              onNavigateToStage('overview');
            }}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[14px] bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/25 hover:shadow-cyan-500/30 transition-shadow"
          >
            <div className="flex h-full w-full items-center justify-center rounded-[12px] bg-[#070914]">
              <Sparkles className="h-5 w-5 text-cyan-300" />
            </div>
          </motion.div>
          <div>
            <div className="flex items-center space-x-2">
              <span
                onClick={() => onNavigateToStage('overview')}
                className="font-bold tracking-tight text-white text-base sm:text-lg cursor-pointer"
              >
                BrandForge<span className="text-cyan-400">.ai</span>
              </span>
              <span className="hidden sm:inline-flex rounded-full bg-indigo-500/15 border border-indigo-500/30 px-2 py-0.5 text-[9px] font-mono font-bold text-indigo-300 tracking-wider">
                iOS EDITION
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden xl:block leading-none mt-0.5">
              Multi-Agent Brand Intelligence Engine
            </p>
          </div>
        </div>

        {/* Center: iOS Spotlight Style Command Palette Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              soundEngine.playClick();
              onOpenCommandPalette();
            }}
            className="w-full flex items-center justify-between rounded-2xl border border-white/[0.08] bg-black/30 backdrop-blur-xl px-3.5 py-1.5 text-xs text-slate-400 hover:border-white/20 hover:text-slate-200 transition-all shadow-inner"
          >
            <div className="flex items-center space-x-2">
              <Search className="h-3.5 w-3.5 text-slate-400" />
              <span>Search projects, agents, DNA...</span>
            </div>
            <kbd className="hidden lg:inline-flex items-center rounded-lg bg-white/10 px-2 py-0.5 font-mono text-[10px] text-slate-300 border border-white/10">
              ⌘K
            </kbd>
          </motion.button>
        </div>

        {/* Right Section: Actions, Notifications, User */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* Mobile Search Button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={onOpenCommandPalette}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:text-white"
          >
            <Search className="h-4 w-4" />
          </motion.button>

          {/* iOS Project Selector Pill */}
          <div className="relative flex items-center">
            <select
              value={currentProject.id}
              onChange={(e) => onSelectProject(e.target.value)}
              className="h-9 rounded-2xl border border-white/10 bg-[#0e1326]/80 backdrop-blur-xl px-3 pr-7 text-xs font-semibold text-slate-200 shadow-sm focus:border-indigo-500 focus:outline-none cursor-pointer appearance-none"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#090c16] text-white">
                  {p.name}
                </option>
              ))}
            </select>
            <ChevronDown className="h-3 w-3 text-slate-400 pointer-events-none absolute right-2.5" />
          </div>

          {/* Landing Page Button */}
          {onOpenLanding && (
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                soundEngine.playClick();
                onOpenLanding();
              }}
              className="hidden md:flex h-9 items-center space-x-1.5 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-3 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-all shadow-sm"
              title="Return to Landing Showcase"
            >
              <Globe className="h-3.5 w-3.5 text-cyan-400" />
              <span>Showcase</span>
            </motion.button>
          )}

          {/* New Brand Idea Button */}
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              soundEngine.playClick();
              onOpenNewModal();
            }}
            className="flex h-9 items-center space-x-1.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-3.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/25 hover:from-indigo-500 hover:to-cyan-500 transition-all"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">New Idea</span>
          </motion.button>

          {/* Brand Battle shortcut */}
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              soundEngine.playClick();
              onNavigateToStage('battle');
            }}
            className="hidden lg:flex h-9 items-center space-x-1.5 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-3 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition-all"
          >
            <Flame className="h-3.5 w-3.5 text-rose-400" />
            <span>Battle</span>
          </motion.button>

          {/* AI Engine Status Badge */}
          <div className="hidden xl:flex items-center space-x-1.5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
            <Cpu className="h-3.5 w-3.5 text-emerald-400" />
            <span className="capitalize">{aiSource === 'local' ? 'Neural 2.0' : `${aiSource} Engine`}</span>
          </div>

          {/* Export Button */}
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              soundEngine.playClick();
              onOpenExportModal();
            }}
            className="hidden sm:flex h-9 items-center space-x-1.5 rounded-2xl border border-white/10 bg-white/5 px-3 text-xs font-semibold text-slate-200 hover:bg-white/10 transition-all"
            title="Export Launch Kit"
          >
            <Download className="h-3.5 w-3.5 text-slate-300" />
            <span className="hidden md:inline">Export</span>
          </motion.button>

          {/* Sound Toggle */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              const newState = soundEngine.toggleSound();
              setIsMuted(!newState);
              if (newState) soundEngine.playClick();
            }}
            className={`flex h-9 w-9 items-center justify-center rounded-2xl border transition-all ${
              !isMuted
                ? 'border-indigo-500/40 bg-indigo-500/15 text-cyan-300 shadow-sm'
                : 'border-white/10 bg-white/5 text-slate-500 hover:text-slate-300'
            }`}
            title={!isMuted ? 'Mute Procedural Audio' : 'Unmute Procedural Audio'}
          >
            {!isMuted ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </motion.button>

          {/* Notifications Bell */}
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                soundEngine.playClick();
                setIsNotificationsOpen(!isNotificationsOpen);
              }}
              className="relative flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 transition-all"
              title="Agent Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-400 text-[9px] font-bold text-black ring-2 ring-[#070914] shadow-sm">
                3
              </span>
            </motion.button>
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
