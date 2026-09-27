'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  Compass,
  Crosshair,
  Sparkles,
  Palette,
  ShieldAlert,
  Flame,
  Scale,
  PackageCheck,
  BrainCircuit,
  Settings,
  Plus,
  ArrowRight,
  FolderOpen
} from 'lucide-react';
import { soundEngine } from '@/lib/sound-engine';
import { BrandProject } from '@/types/brand';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  projects: BrandProject[];
  onSelectProject: (id: string) => void;
  onNavigateToStage: (stage: string) => void;
  onOpenNewModal: () => void;
  onOpenSettingsModal: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  projects,
  onSelectProject,
  onNavigateToStage,
  onOpenNewModal,
  onOpenSettingsModal,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Global Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        soundEngine.playClick();
        if (isOpen) {
          onClose();
        } else {
          // Open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items = [
    // Stages
    { id: 'stage-overview', title: 'Brand Dashboard Overview', category: 'Stages', icon: Compass, action: () => onNavigateToStage('overview') },
    { id: 'stage-discover', title: 'Stage 1: Discover (Idea Intelligence)', category: 'Stages', icon: Compass, action: () => onNavigateToStage('discover') },
    { id: 'stage-position', title: 'Stage 2: Position (Category & Strategy)', category: 'Stages', icon: Crosshair, action: () => onNavigateToStage('position') },
    { id: 'stage-shape', title: 'Stage 3: Shape (Personality & Naming)', category: 'Stages', icon: Sparkles, action: () => onNavigateToStage('shape') },
    { id: 'stage-visualize', title: 'Stage 4: Visualize (Visual Identity)', category: 'Stages', icon: Palette, action: () => onNavigateToStage('visualize') },
    { id: 'stage-critic', title: 'Stage 5: Challenge (Adversarial Critic)', category: 'Stages', icon: ShieldAlert, action: () => onNavigateToStage('critic') },
    { id: 'stage-battle', title: 'Brand Battle Arena (5-Agent Debate)', category: 'Tools', icon: Flame, action: () => onNavigateToStage('battle') },
    { id: 'stage-guardian', title: 'Brand Guardian (Live Copy Audit)', category: 'Tools', icon: Scale, action: () => onNavigateToStage('guardian') },
    { id: 'stage-quality', title: 'ML Quality Report (Random Forest & DL)', category: 'Intelligence', icon: BrainCircuit, action: () => onNavigateToStage('quality') },
    { id: 'stage-launch', title: 'Stage 6: Deliver (Launch Kit & Social Copy)', category: 'Stages', icon: PackageCheck, action: () => onNavigateToStage('launch') },
    // Actions
    { id: 'action-new', title: 'Forge New Brand Idea (+)', category: 'Actions', icon: Plus, action: onOpenNewModal },
    { id: 'action-settings', title: 'Project & AI Settings', category: 'Actions', icon: Settings, action: onOpenSettingsModal },
    // Projects
    ...projects.map((p) => ({
      id: `proj-${p.id}`,
      title: `Project: ${p.name} (${p.stage2Position.category.split(' ')[0]})`,
      category: 'Projects',
      icon: FolderOpen,
      action: () => onSelectProject(p.id),
    })),
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (index: number) => {
    soundEngine.playClick();
    const item = filteredItems[index];
    if (item) {
      item.action();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 p-4 pt-20 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0c101d] shadow-2xl shadow-indigo-950/80">
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-white/10 px-4 py-3.5">
          <Search className="h-5 w-5 text-indigo-400 mr-3 flex-shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
              } else if (e.key === 'Enter') {
                e.preventDefault();
                handleSelect(selectedIndex);
              }
            }}
            placeholder="Search projects, stages, intelligence tools... (Ctrl + K)"
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No matching stages or projects found for &quot;{query}&quot;.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(idx)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs text-left transition-colors ${
                    isSelected
                      ? 'bg-indigo-600/20 text-white border border-indigo-500/30'
                      : 'text-slate-300 hover:bg-slate-900 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                        isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-medium">{item.title}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] uppercase font-semibold text-slate-500">
                      {item.category}
                    </span>
                    {isSelected && <ArrowRight className="h-3 w-3 text-indigo-400" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="border-t border-white/5 bg-slate-950/60 px-4 py-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center space-x-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>BrandForge.ai Fast Navigator</span>
        </div>
      </div>
    </div>
  );
};
