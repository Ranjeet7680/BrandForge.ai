'use client';

import React from 'react';
import {
  Compass,
  Crosshair,
  Sparkles,
  Palette,
  ShieldAlert,
  Flame,
  Scale,
  PackageCheck,
  LayoutDashboard,
  Settings,
  CheckCircle2,
  BrainCircuit
} from 'lucide-react';
import { BrandProject } from '@/types/brand';

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
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  project,
}) => {
  const navItems = [
    {
      id: 'overview' as ActiveTab,
      label: 'Brand Dashboard',
      icon: LayoutDashboard,
      badge: 'Hub',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
    },
    {
      id: 'discover' as ActiveTab,
      label: '1. Discover (Intelligence)',
      icon: Compass,
      stageNumber: 1,
      badge: `${project.stage1Discover.targetUsers.length} Segments`,
      badgeColor: 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
    },
    {
      id: 'position' as ActiveTab,
      label: '2. Position (Strategy)',
      icon: Crosshair,
      stageNumber: 2,
      badge: 'Defensible',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
    },
    {
      id: 'shape' as ActiveTab,
      label: '3. Shape (Personality & Name)',
      icon: Sparkles,
      stageNumber: 3,
      badge: project.stage3Shape.selectedBrandName,
      badgeColor: 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
    },
    {
      id: 'visualize' as ActiveTab,
      label: '4. Visualize (Identity)',
      icon: Palette,
      stageNumber: 4,
      badge: 'Design System',
      badgeColor: 'bg-pink-500/10 text-pink-400 border border-pink-500/20'
    },
    {
      id: 'critic' as ActiveTab,
      label: '5. Challenge (Brand Critic)',
      icon: ShieldAlert,
      stageNumber: 5,
      badge: `${project.stage5Critic.overallHealthScore}% Health`,
      badgeColor: 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
    },
    {
      id: 'battle' as ActiveTab,
      label: '⭐ Brand Battle Arena',
      icon: Flame,
      badge: '5 Agents',
      badgeColor: 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
    },
    {
      id: 'guardian' as ActiveTab,
      label: 'Brand Guardian Audit',
      icon: Scale,
      badge: '5 Checks',
      badgeColor: 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
    },
    {
      id: 'quality' as ActiveTab,
      label: '🌲 ML Report (RF + DL)',
      icon: BrainCircuit,
      badge: 'RF & DL',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
    },
    {
      id: 'launch' as ActiveTab,
      label: '6. Deliver (Launch Kit)',
      icon: PackageCheck,
      stageNumber: 6,
      badge: 'Ready to Ship',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
    },
    {
      id: 'settings' as ActiveTab,
      label: 'Project & AI Settings',
      icon: Settings,
      badge: '',
      badgeColor: ''
    }
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-white/10 bg-[#090c15] p-4 flex flex-col justify-between hidden md:flex">
      <div className="space-y-6">
        {/* Project Header Widget */}
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-3.5 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Active Brand Project
            </span>
            <span className="flex items-center text-[11px] font-medium text-emerald-400">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              100% Validated
            </span>
          </div>
          <h2 className="mt-1 text-base font-bold text-white tracking-tight">
            {project.name}
          </h2>
          <p className="mt-0.5 text-xs text-indigo-400 truncate">
            {project.stage2Position.category}
          </p>

          {/* Mini progress bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Pipeline Completion</span>
              <span className="text-white font-mono">{project.progressPercentage}%</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${project.progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            6 Connected AI Stages
          </p>
          <nav className="mt-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`group flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-sm'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <Icon
                      className={`h-4 w-4 flex-shrink-0 transition-colors ${
                        isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-300'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`ml-2 rounded px-1.5 py-0.5 text-[10px] font-medium transition-colors ${
                        item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Info Box */}
      <div className="rounded-xl border border-white/5 bg-slate-900/40 p-3 text-xs text-slate-400">
        <div className="flex items-center justify-between text-[11px] font-medium text-slate-300">
          <span>Critic Coherence</span>
          <span className="font-mono text-emerald-400 font-bold">
            {project.stage5Critic.overallHealthScore}/100
          </span>
        </div>
        <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
          Multi-agent debate loop active across all 6 branding layers.
        </p>
      </div>
    </aside>
  );
};
