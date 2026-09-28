'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Plus,
  FolderKanban,
  Compass,
  Crosshair,
  Sparkles,
  Palette,
  ShieldAlert,
  PackageCheck,
  Flame,
  Scale,
  Layers,
  BarChart3,
  Users2,
  Settings,
  BrainCircuit,
  ChevronRight
} from 'lucide-react';
import { BrandProject } from '@/types/brand';
import { soundEngine } from '@/lib/sound-engine';

export type ActiveTab =
  | 'overview'
  | 'discover'
  | 'position'
  | 'shape'
  | 'visualize'
  | 'critic'
  | 'battle'
  | 'guardian'
  | 'quality'
  | 'launch'
  | 'settings';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  project: BrandProject;
  onOpenNewModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  project,
  onOpenNewModal,
}) => {
  const agentStages: { id: ActiveTab; number: string; name: string; role: string; icon: any }[] = [
    { id: 'discover', number: '1', name: 'Discover', role: 'Idea DNA', icon: Compass },
    { id: 'position', number: '2', name: 'Position', role: 'Category & Moat', icon: Crosshair },
    { id: 'shape', number: '3', name: 'Shape', role: 'Voice & Naming', icon: Sparkles },
    { id: 'visualize', number: '4', name: 'Visualize', role: 'Design Tokens', icon: Palette },
    { id: 'critic', number: '5', name: 'Challenge', role: 'AI Critic Loop', icon: ShieldAlert },
    { id: 'launch', number: '6', name: 'Deliver', role: 'Launch Assets', icon: PackageCheck },
  ];

  const tools: { id: ActiveTab; name: string; icon: any; badge?: string; badgeColor?: string }[] = [
    {
      id: 'battle',
      name: 'Brand Battle Arena',
      icon: Flame,
      badge: '5 AGENTS',
      badgeColor: 'bg-rose-500/20 text-rose-300 border border-rose-500/30',
    },
    {
      id: 'guardian',
      name: 'Brand Guardian',
      icon: Scale,
      badge: 'LIVE',
      badgeColor: 'bg-teal-500/20 text-teal-300 border border-teal-500/30',
    },
    {
      id: 'quality',
      name: 'ML Quality Report',
      icon: BrainCircuit,
      badge: 'RF+DL',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    },
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-white/[0.08] bg-[#070a16]/85 backdrop-blur-2xl p-3 flex flex-col justify-between hidden md:flex overflow-y-auto select-none">
      <div className="space-y-4">
        {/* Main Workspace Navigation */}
        <div className="space-y-1">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('overview');
            }}
            className={`w-full flex items-center justify-between rounded-2xl px-3 py-2 text-xs font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/20 text-white border border-white/15 shadow-sm'
                : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-500/15 border border-indigo-500/25">
                <LayoutDashboard className="h-4 w-4 text-cyan-400" />
              </div>
              <span>Command Hub</span>
            </div>
            {activeTab === 'overview' && (
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            )}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              soundEngine.playClick();
              if (onOpenNewModal) onOpenNewModal();
            }}
            className="w-full flex items-center justify-between rounded-2xl px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-white/[0.05] hover:text-white transition-all group"
          >
            <div className="flex items-center space-x-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 group-hover:border-cyan-400/40">
                <Plus className="h-4 w-4 text-cyan-400" />
              </div>
              <span>New Brand Idea</span>
            </div>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-mono text-cyan-300">+</span>
          </motion.button>
        </div>

        {/* AI Agent Workflow Pipeline (1 to 6) */}
        <div className="space-y-1.5">
          <div className="px-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <span>AI Pipeline</span>
            <span className="text-cyan-400 font-mono">6 Stages</span>
          </div>

          <nav className="space-y-0.5">
            {agentStages.map((stage) => {
              const Icon = stage.icon;
              const isActive = activeTab === stage.id;
              return (
                <motion.button
                  key={stage.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveTab(stage.id);
                  }}
                  className={`w-full flex items-center justify-between rounded-2xl px-3 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/20 text-white border border-white/15 shadow-sm'
                      : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-lg text-[10px] font-mono font-bold ${
                        isActive
                          ? 'bg-indigo-500 text-white'
                          : 'bg-white/5 text-slate-400'
                      }`}
                    >
                      {stage.number}
                    </span>
                    <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-cyan-300' : 'text-slate-400'}`} />
                    <span className="truncate">{stage.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 truncate">
                    {stage.role.split(' ')[0]}
                  </span>
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* iOS Inset Grouped: Intelligence & Tools */}
        <div className="space-y-1.5">
          <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Intelligence Tools
          </div>

          <nav className="space-y-0.5">
            {tools.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <motion.button
                  key={t.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveTab(t.id);
                  }}
                  className={`w-full flex items-center justify-between rounded-2xl px-3 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/20 text-purple-200 border border-white/15 shadow-sm'
                      : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-purple-300' : 'text-slate-400'}`} />
                    <span className="truncate">{t.name}</span>
                  </div>
                  {t.badge && (
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${t.badgeColor}`}>
                      {t.badge}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* Auxiliary Links */}
        <div className="space-y-0.5 border-t border-white/[0.06] pt-2">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('quality');
            }}
            className="w-full flex items-center space-x-2.5 rounded-2xl px-3 py-1.5 text-xs text-slate-400 hover:bg-white/[0.04] hover:text-slate-300"
          >
            <BarChart3 className="h-3.5 w-3.5 text-slate-400" />
            <span>Analytics &amp; Scores</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('settings');
            }}
            className="w-full flex items-center space-x-2.5 rounded-2xl px-3 py-1.5 text-xs text-slate-400 hover:bg-white/[0.04] hover:text-slate-300"
          >
            <Settings className="h-3.5 w-3.5 text-slate-400" />
            <span>Settings</span>
          </motion.button>
        </div>
      </div>

      {/* iOS-Style Brand DNA Capsule Widget */}
      <div className="rounded-[22px] border border-white/[0.08] bg-[#0c1022]/90 backdrop-blur-xl p-3 mt-4 space-y-2 shadow-lg">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1.5 truncate">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span className="font-bold text-white truncate">{project.name}</span>
          </div>
          <span className="font-mono text-emerald-400 font-bold text-[11px]">
            {project.stage5Critic.overallHealthScore}%
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-black/40 overflow-hidden border border-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${project.progressPercentage}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500"
          />
        </div>
        <p className="text-[10px] text-slate-400 line-clamp-1">
          {project.stage2Position.category}
        </p>
      </div>
    </aside>
  );
};
