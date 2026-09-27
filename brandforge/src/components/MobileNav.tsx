'use client';

import React from 'react';
import { LayoutDashboard, Compass, Flame, Scale, PackageCheck } from 'lucide-react';
import { ActiveTab } from './Sidebar';
import { soundEngine } from '@/lib/sound-engine';

interface MobileNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  const items = [
    { id: 'overview' as ActiveTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'discover' as ActiveTab, label: 'Discover', icon: Compass },
    { id: 'battle' as ActiveTab, label: 'Battle', icon: Flame },
    { id: 'guardian' as ActiveTab, label: 'Guardian', icon: Scale },
    { id: 'launch' as ActiveTab, label: 'Launch', icon: PackageCheck },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#090c15]/95 px-2 py-1.5 backdrop-blur-lg md:hidden">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                soundEngine.playClick();
                setActiveTab(item.id);
              }}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all ${
                isActive ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
