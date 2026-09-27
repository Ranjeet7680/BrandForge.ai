'use client';

import React from 'react';
import { ArrowRight, Lightbulb, Compass, Crosshair, Sparkles, Palette, ShieldAlert, PackageCheck } from 'lucide-react';
import { ActiveTab } from './Sidebar';

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
  const stages = [
    { id: 'discover' as ActiveTab, label: '1. Discover', desc: 'Idea Intelligence', icon: Compass },
    { id: 'position' as ActiveTab, label: '2. Position', desc: 'Strategy & Quadrant', icon: Crosshair },
    { id: 'shape' as ActiveTab, label: '3. Shape', desc: 'Personality & Naming', icon: Sparkles },
    { id: 'visualize' as ActiveTab, label: '4. Visualize', desc: 'Visual Identity', icon: Palette },
    { id: 'critic' as ActiveTab, label: '5. Challenge', desc: 'AI Critic Diagnostic', icon: ShieldAlert },
    { id: 'launch' as ActiveTab, label: '6. Deliver', desc: 'Launch Kit', icon: PackageCheck },
  ];

  return (
    <div className="w-full border-b border-white/10 bg-[#0c101d] px-4 py-3 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Pipeline Navigation Bar */}
        <div className="flex items-center overflow-x-auto pb-1 md:pb-0 scrollbar-none space-x-1 sm:space-x-2">
          {/* Idea trigger */}
          <button
            onClick={onOpenNewModal}
            className="flex items-center space-x-1.5 rounded-lg border border-dashed border-indigo-500/40 bg-indigo-500/5 px-2.5 py-1.5 text-xs font-medium text-indigo-300 hover:bg-indigo-500/15 transition-all flex-shrink-0"
            title="Edit Raw Startup Idea"
          >
            <Lightbulb className="h-3.5 w-3.5 text-indigo-400" />
            <span>Raw Idea</span>
          </button>

          <ArrowRight className="h-3 w-3 text-slate-400 flex-shrink-0" />

          {stages.map((st, idx) => {
            const Icon = st.icon;
            const isActive = activeTab === st.id;
            return (
              <React.Fragment key={st.id}>
                <button
                  onClick={() => setActiveTab(st.id)}
                  className={`flex items-center space-x-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all flex-shrink-0 ${
                    isActive
                      ? 'border border-indigo-500/40 bg-indigo-600/20 text-white shadow-sm glow-indigo'
                      : 'border border-white/5 bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <Icon
                    className={`h-3.5 w-3.5 ${
                      isActive ? 'text-indigo-400' : 'text-slate-400'
                    }`}
                  />
                  <span>{st.label}</span>
                  <span className="hidden xl:inline text-[10px] text-slate-400">
                    ({st.desc.split(' ')[0]})
                  </span>
                </button>
                {idx < stages.length - 1 && (
                  <ArrowRight className="h-3 w-3 text-slate-400 flex-shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Quick status pill */}
        <div className="hidden lg:flex items-center space-x-3 text-xs">
          <span className="flex items-center text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 mr-1.5"></span>
            6 Connected AI Stages Active
          </span>
        </div>
      </div>
    </div>
  );
};
