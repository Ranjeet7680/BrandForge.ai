'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ChevronDown,
  Activity,
  Flame,
  Download,
  Volume2,
  VolumeX,
  Compass,
  Crosshair,
  Palette,
  ShieldAlert,
  PackageCheck,
  CheckCircle2,
  Cpu,
  Layers
} from 'lucide-react';
import { BrandProject } from '@/types/brand';
import { ActiveTab } from './Sidebar';
import { soundEngine } from '@/lib/sound-engine';

interface DynamicIslandProps {
  currentProject: BrandProject;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenExportModal: () => void;
  onOpenNewModal: () => void;
}

export const DynamicIsland: React.FC<DynamicIslandProps> = ({
  currentProject,
  activeTab,
  setActiveTab,
  onOpenExportModal,
  onOpenNewModal,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(!soundEngine.soundEnabled);

  const stageNames: Record<string, string> = {
    overview: 'Overview',
    discover: '1. Discover',
    position: '2. Position',
    shape: '3. Shape',
    visualize: '4. Visualize',
    critic: '5. Critic',
    battle: 'Brand Battle',
    guardian: 'Brand Guardian',
    quality: 'Quality (ML)',
    launch: '6. Deliver',
  };

  const stageIcons: Record<string, any> = {
    overview: Layers,
    discover: Compass,
    position: Crosshair,
    shape: Sparkles,
    visualize: Palette,
    critic: ShieldAlert,
    battle: Flame,
    guardian: Activity,
    quality: Cpu,
    launch: PackageCheck,
  };

  const CurrentIcon = stageIcons[activeTab] || Sparkles;

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = soundEngine.toggleSound();
    setIsMuted(!newState);
    if (newState) soundEngine.playClick();
  };

  return (
    <div className="w-full flex justify-center py-2 px-4 z-30 pointer-events-none sticky top-16 md:top-[68px]">
      <motion.div
        layout
        transition={{
          type: 'spring',
          stiffness: 450,
          damping: 35,
          mass: 0.8,
        }}
        onClick={() => {
          soundEngine.playClick();
          setIsExpanded(!isExpanded);
        }}
        className={`pointer-events-auto cursor-pointer rounded-[26px] border border-white/[0.12] bg-[#0c1020]/90 backdrop-blur-2xl shadow-2xl transition-colors duration-200 select-none ${
          isExpanded
            ? 'w-full max-w-2xl p-4 dynamic-island-glow border-indigo-500/40 bg-[#0d1226]/95'
            : 'px-4 py-2 hover:border-white/25 hover:bg-[#11162d]/95'
        }`}
      >
        {/* Compact Island Pill */}
        {!isExpanded ? (
          <div className="flex items-center justify-between space-x-3 text-xs">
            {/* Left: Project & Live Indicator */}
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="font-semibold text-white tracking-tight">
                {currentProject.name}
              </span>
            </div>

            <div className="h-3 w-px bg-white/15" />

            {/* Center: Current Stage */}
            <div className="flex items-center space-x-1.5 text-cyan-300 font-medium">
              <CurrentIcon className="h-3.5 w-3.5 text-cyan-400" />
              <span>{stageNames[activeTab] || 'Workspace'}</span>
            </div>

            <div className="h-3 w-px bg-white/15" />

            {/* Right: Health Score Capsule & Expand */}
            <div className="flex items-center space-x-2">
              <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400">
                {currentProject.stage5Critic.overallHealthScore}%
              </span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </motion.div>
            </div>
          </div>
        ) : (
          /* Expanded Island View */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Header in Expanded State */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 shadow-md">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                    {currentProject.name}
                    <span className="rounded-full bg-indigo-500/20 border border-indigo-500/30 px-2 py-0.5 text-[10px] font-mono text-cyan-300">
                      iOS Dynamic Hub
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate max-w-xs sm:max-w-md">
                    {currentProject.stage3Shape.selectedTagline}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleSound}
                  className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  title="Toggle Procedural Audio"
                >
                  {!isMuted ? <Volume2 className="h-4 w-4 text-cyan-400" /> : <VolumeX className="h-4 w-4 text-slate-500" />}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                  className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10"
                >
                  Collapse
                </button>
              </div>
            </div>

            {/* AI Agent Status Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-2.5 space-y-1">
                <span className="text-[10px] font-semibold uppercase text-slate-400">Health Index</span>
                <div className="font-mono text-base font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {currentProject.stage5Critic.overallHealthScore}%
                </div>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-2.5 space-y-1">
                <span className="text-[10px] font-semibold uppercase text-slate-400">Agent Council</span>
                <div className="font-mono text-base font-bold text-cyan-300 flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5" />
                  5 Synced
                </div>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-2.5 space-y-1">
                <span className="text-[10px] font-semibold uppercase text-slate-400">Category Moat</span>
                <div className="font-mono text-xs font-bold text-purple-300 truncate">
                  {currentProject.stage2Position.category.split(' ')[0]}
                </div>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-2.5 space-y-1">
                <span className="text-[10px] font-semibold uppercase text-slate-400">Workflow Progress</span>
                <div className="font-mono text-base font-bold text-indigo-400">
                  {currentProject.progressPercentage}%
                </div>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-white/10">
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEngine.playClick();
                    setActiveTab('battle');
                    setIsExpanded(false);
                  }}
                  className="flex items-center space-x-1 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition-all active:scale-95"
                >
                  <Flame className="h-3.5 w-3.5 text-rose-400" />
                  <span>Battle Arena</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEngine.playClick();
                    setActiveTab('launch');
                    setIsExpanded(false);
                  }}
                  className="flex items-center space-x-1 rounded-xl border border-teal-500/30 bg-teal-500/10 px-3 py-1.5 text-xs font-semibold text-teal-300 hover:bg-teal-500/20 transition-all active:scale-95"
                >
                  <PackageCheck className="h-3.5 w-3.5 text-teal-400" />
                  <span>Launch Kit</span>
                </button>
              </div>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEngine.playClick();
                    onOpenExportModal();
                    setIsExpanded(false);
                  }}
                  className="flex items-center space-x-1 rounded-xl border border-white/10 bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-all active:scale-95"
                >
                  <Download className="h-3.5 w-3.5 text-slate-300" />
                  <span>Export</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEngine.playClick();
                    onOpenNewModal();
                    setIsExpanded(false);
                  }}
                  className="flex items-center space-x-1 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-3 py-1.5 text-xs font-bold text-white shadow-md hover:from-indigo-500 hover:to-cyan-500 transition-all active:scale-95"
                >
                  <span>+ New Idea</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
