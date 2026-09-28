'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Compass, Flame, Scale, PackageCheck, Sparkles } from 'lucide-react';
import { ActiveTab } from './Sidebar';
import { soundEngine } from '@/lib/sound-engine';

interface MobileNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  const items = [
    { id: 'overview' as ActiveTab, label: 'Hub', icon: LayoutDashboard },
    { id: 'discover' as ActiveTab, label: 'Discover', icon: Compass },
    { id: 'shape' as ActiveTab, label: 'Identity', icon: Sparkles },
    { id: 'battle' as ActiveTab, label: 'Battle', icon: Flame },
    { id: 'guardian' as ActiveTab, label: 'Guardian', icon: Scale },
    { id: 'launch' as ActiveTab, label: 'Launch', icon: PackageCheck },
  ];

  return (
    <nav className="fixed bottom-3 inset-x-3 z-40 md:hidden flex justify-center pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-around w-full max-w-md rounded-full border border-white/[0.15] bg-[#0c1022]/90 backdrop-blur-2xl px-2 py-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.88 }}
              onClick={() => {
                soundEngine.playClick();
                setActiveTab(item.id);
              }}
              className="relative flex flex-col items-center justify-center py-1 px-2.5 rounded-full transition-all"
            >
              {isActive && (
                <motion.div
                  layoutId="mobileNavActivePill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600/40 to-cyan-600/30 border border-white/20 shadow-sm backdrop-blur-md"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}

              <div className="relative z-10 flex flex-col items-center">
                <Icon
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isActive ? 'text-cyan-300 scale-110' : 'text-slate-400'
                  }`}
                />
                <span
                  className={`text-[9px] mt-0.5 tracking-tight font-medium ${
                    isActive ? 'text-white font-semibold' : 'text-slate-400'
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};
