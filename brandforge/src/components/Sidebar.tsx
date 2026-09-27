'use client';

import React from 'react';
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
  BrainCircuit
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
  const agentStages = [
    { id: 'discover' as ActiveTab, number: '1', name: 'Discover', role: 'Idea', icon: Compass },
    { id: 'position' as ActiveTab, number: '2', name: 'Position', role: 'Strategy', icon: Crosshair },
    { id: 'shape' as ActiveTab, number: '3', name: 'Shape', role: 'Personality', icon: Sparkles },
    { id: 'visualize' as ActiveTab, number: '4', name: 'Visualize', role: 'Design', icon: Palette },
    { id: 'critic' as ActiveTab, number: '5', name: 'Challenge', role: 'AI Critic', icon: ShieldAlert },
    { id: 'launch' as ActiveTab, number: '6', name: 'Deliver', role: 'Launch', icon: PackageCheck },
  ];

  const tools = [
    { id: 'battle' as ActiveTab, name: 'Brand Battle', icon: Flame, badge: 'NEW', badgeColor: 'bg-rose-500/20 text-rose-300 border border-rose-500/30' },
    { id: 'guardian' as ActiveTab, name: 'Brand Guardian', icon: Scale, badge: '', badgeColor: '' },
    { id: 'quality' as ActiveTab, name: 'Quality Report (ML)', icon: BrainCircuit, badge: 'RF + DL', badgeColor: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' },
    { id: 'launch' as ActiveTab, name: 'Launch Assets', icon: PackageCheck, badge: '12 Assets', badgeColor: 'bg-amber-500/10 text-amber-300 border border-amber-500/20' },
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-white/10 bg-[#090c15] p-3.5 flex flex-col justify-between hidden md:flex overflow-y-auto">
      <div className="space-y-5">
        {/* Main Navigation */}
        <div className="space-y-1">
          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('overview');
            }}
            className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-indigo-600/20 text-cyan-300 border border-indigo-500/30 shadow-sm'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <LayoutDashboard className="h-4 w-4 text-cyan-400" />
              <span>Dashboard</span>
            </div>
            {activeTab === 'overview' && <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />}
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              if (onOpenNewModal) onOpenNewModal();
            }}
            className="w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-900 hover:text-white transition-all"
          >
            <div className="flex items-center space-x-2.5">
              <Plus className="h-4 w-4 text-indigo-400" />
              <span>New Brand Idea</span>
            </div>
            <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[9px] font-mono text-indigo-300">+</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('overview');
            }}
            className="w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
          >
            <div className="flex items-center space-x-2.5">
              <FolderKanban className="h-4 w-4 text-slate-400" />
              <span>My Projects</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">4</span>
          </button>
        </div>

        {/* AI Agents Workflow Pipeline (1 to 6) */}
        <div className="space-y-1.5">
          <div className="px-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <span>AI Agents</span>
            <span className="text-cyan-400 font-mono">6 Stages</span>
          </div>

          <nav className="space-y-0.5">
            {agentStages.map((stage) => {
              const Icon = stage.icon;
              const isActive = activeTab === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveTab(stage.id);
                  }}
                  className={`w-full flex items-center justify-between rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600/20 text-white border border-indigo-500/30'
                      : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <span className="font-mono text-[10px] font-bold text-indigo-400 w-3">
                      {stage.number}.
                    </span>
                    <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-cyan-300' : 'text-slate-400'}`} />
                    <span className="truncate">{stage.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 truncate">
                    ({stage.role})
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tools & Intelligence Section */}
        <div className="space-y-1.5">
          <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Tools &amp; Intelligence
          </div>

          <nav className="space-y-0.5">
            {tools.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveTab(t.id);
                  }}
                  className={`w-full flex items-center justify-between rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-purple-600/20 text-purple-200 border border-purple-500/30'
                      : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-purple-300' : 'text-slate-400'}`} />
                    <span className="truncate">{t.name}</span>
                  </div>
                  {t.badge && (
                    <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${t.badgeColor}`}>
                      {t.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Auxiliary Links */}
        <div className="space-y-1 border-t border-white/5 pt-2">
          <button
            onClick={() => {
              soundEngine.playClick();
              alert('Brand Library: Stores all generated brand books, SVG vector marks, and color tokens.');
            }}
            className="w-full flex items-center space-x-2.5 rounded-xl px-3 py-1.5 text-xs text-slate-400 hover:bg-slate-900 hover:text-slate-300"
          >
            <Layers className="h-3.5 w-3.5 text-slate-400" />
            <span>Brand Library</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('quality');
            }}
            className="w-full flex items-center space-x-2.5 rounded-xl px-3 py-1.5 text-xs text-slate-400 hover:bg-slate-900 hover:text-slate-300"
          >
            <BarChart3 className="h-3.5 w-3.5 text-slate-400" />
            <span>Analytics &amp; Scores</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              alert('Inkloom Community: Share and benchmark brand strategies with 1,200+ founders.');
            }}
            className="w-full flex items-center space-x-2.5 rounded-xl px-3 py-1.5 text-xs text-slate-400 hover:bg-slate-900 hover:text-slate-300"
          >
            <Users2 className="h-3.5 w-3.5 text-slate-400" />
            <span>Community</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('settings');
            }}
            className="w-full flex items-center space-x-2.5 rounded-xl px-3 py-1.5 text-xs text-slate-400 hover:bg-slate-900 hover:text-slate-300"
          >
            <Settings className="h-3.5 w-3.5 text-slate-400" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Active Brand Capsule Footer */}
      <div className="rounded-xl border border-white/10 bg-slate-900/80 p-3 mt-4 space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-bold text-white truncate">{project.name}</span>
          <span className="font-mono text-emerald-400 font-bold">
            {project.stage5Critic.overallHealthScore}%
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500"
            style={{ width: `${project.progressPercentage}%` }}
          />
        </div>
        <p className="text-[10px] text-slate-400 line-clamp-1">
          {project.stage2Position.category}
        </p>
      </div>
    </aside>
  );
};
