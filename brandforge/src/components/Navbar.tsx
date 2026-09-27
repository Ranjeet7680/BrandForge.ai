'use client';

import React from 'react';
import { Sparkles, Layers, Download, Settings, Plus, Flame } from 'lucide-react';
import { BrandProject } from '@/types/brand';

interface NavbarProps {
  currentProject: BrandProject;
  projects: BrandProject[];
  onSelectProject: (id: string) => void;
  onOpenNewModal: () => void;
  onOpenSettingsModal: () => void;
  onOpenExportModal: () => void;
  aiSource: 'local' | 'gemini' | 'openai';
  onNavigateToStage: (stage: string) => void;
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
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#090c15]/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#090c15]">
              <Sparkles className="h-5 w-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold tracking-tight text-white text-lg">
                BrandForge<span className="text-indigo-400">.ai</span>
              </span>
              <span className="hidden sm:inline-block rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-indigo-400 border border-indigo-500/20">
                INKLOOM PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Multi-Agent Brand Intelligence & Strategy Engine
            </p>
          </div>
        </div>

        {/* Center: Project Selector */}
        <div className="flex items-center space-x-2">
          <div className="relative flex items-center">
            <Layers className="pointer-events-none absolute left-3 h-4 w-4 text-slate-400" />
            <select
              value={currentProject.id}
              onChange={(e) => onSelectProject(e.target.value)}
              className="h-9 rounded-lg border border-white/10 bg-slate-900/90 pl-9 pr-8 text-xs font-medium text-slate-200 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.stage2Position.category.split(' ')[0]}...)
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onOpenNewModal}
            className="flex h-9 items-center space-x-1.5 rounded-lg bg-indigo-600 px-3 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Forge New Idea</span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2">
          {/* Quick Battle shortcut */}
          <button
            onClick={() => onNavigateToStage('battle')}
            className="hidden lg:flex h-9 items-center space-x-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 text-xs font-medium text-purple-300 hover:bg-purple-500/20 transition-colors"
          >
            <Flame className="h-3.5 w-3.5 text-purple-400" />
            <span>Brand Battle</span>
          </button>

          {/* AI Engine Status Badge */}
          <div className="hidden md:flex items-center space-x-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="capitalize">{aiSource === 'local' ? 'Neural Engine' : `${aiSource} Live`}</span>
          </div>

          {/* Export Button */}
          <button
            onClick={onOpenExportModal}
            className="flex h-9 items-center space-x-1.5 rounded-lg border border-white/10 bg-slate-800/80 px-3 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-slate-300" />
            <span className="hidden sm:inline">Launch Kit</span>
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettingsModal}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-slate-800/80 text-slate-300 hover:bg-slate-700 transition-colors"
            title="Configure AI & Settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
