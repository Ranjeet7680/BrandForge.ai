'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  Crosshair,
  Sparkles,
  Palette,
  ShieldAlert,
  PackageCheck,
  Lightbulb,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { ActiveTab } from './Sidebar';
import { soundEngine } from '@/lib/sound-engine';

interface StageProgressProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenNewModal: () => void;
}

export const StageProgress: React.FC<StageProgressProps> = ({
  activeTab,
  setActiveTab,
  onOpenNewModal,
}) => {
  const stages: { id: ActiveTab; num: string; label: string; desc: string; icon: any }[] = [
    { id: 'discover', num: '1', label: 'Discover', desc: 'Idea DNA', icon: Compass },
    { id: 'position', num: '2', label: 'Position', desc: 'Moat Map', icon: Crosshair },
    { id: 'shape', num: '3', label: 'Shape', desc: 'Personality', icon: Sparkles },
    { id: 'visualize', num: '4', label: 'Visualize', desc: 'Identity', icon: Palette },
    { id: 'critic', num: '5', label: 'Challenge', desc: 'AI Critic', icon: ShieldAlert },
    { id: 'launch', num: '6', label: 'Deliver', desc: 'Launch Kit', icon: PackageCheck },
  ];

  return (
    <div className="w-full border-b border-white/[0.08] bg-[#080b16]/80 backdrop-blur-xl px-3 sm:px-6 py-2.5 select-none">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center md:justify-between gap-2.5">
        {/* iOS Segmented Container */}
        <div className="flex items-center overflow-x-auto pb-1 md:pb-0 scrollbar-none space-x-1.5 sm:space-x-2">
          {/* Quick Idea Trigger Pill */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenNewModal();
            }}
            className="group relative flex items-center space-x-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-400 transition-all flex-shrink-0 active:scale-95"
            title="Edit Startup Idea"
          >
            <Lightbulb className="h-3.5 w-3.5 text-indigo-400 group-hover:rotate-12 transition-transform" />
            <span>Raw Idea</span>
          </button>

          <ChevronRight className="h-3.5 w-3.5 text-slate-500 flex-shrink-0" />

          {/* Segmented Stages Trough */}
          <div className="ios-segmented-trough flex items-center p-1 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl flex-shrink-0">
            {stages.map((st) => {
              const Icon = st.icon;
              const isActive = activeTab === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveTab(st.id);
                  }}
                  className={`relative flex items-center space-x-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all flex-shrink-0 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  {/* Sliding Glass Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeStageSegment"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600/60 to-purple-600/50 border border-white/20 shadow-md backdrop-blur-lg"
                      transition={{
                        type: 'spring',
                        stiffness: 450,
                        damping: 35,
                      }}
                    />
                  )}

                  <span className="relative z-10 flex items-center space-x-1.5">
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-mono font-bold ${
                        isActive
                          ? 'bg-white text-indigo-900 shadow-sm'
                          : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      {st.num}
                    </span>
                    <Icon
                      className={`h-3.5 w-3.5 ${
                        isActive ? 'text-cyan-300' : 'text-slate-400'
                      }`}
                    />
                    <span>{st.label}</span>
                    <span
                      className={`hidden lg:inline text-[10px] ${
                        isActive ? 'text-indigo-200' : 'text-slate-500'
                      }`}
                    >
                      • {st.desc}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Status Capsule */}
        <div className="hidden lg:flex items-center space-x-2 text-xs">
          <div className="flex items-center space-x-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-[11px]">6 Stages Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
};
