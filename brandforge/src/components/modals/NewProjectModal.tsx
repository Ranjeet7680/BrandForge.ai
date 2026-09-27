'use client';

import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { RawBrandInput } from '@/types/brand';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: RawBrandInput) => Promise<void>;
  isLoading: boolean;
  onLoadPreset: (presetId: string) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  onLoadPreset,
}) => {
  const [formData, setFormData] = useState<RawBrandInput>({
    idea: '',
    targetMarket: '',
    existingProblem: '',
    location: 'Global (Online-first)',
    businessGoals: '',
    constraints: '',
    competitors: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.idea.trim()) return;
    await onSubmit(formData);
  };

  const handleSelectPresetTemplate = (preset: 'hackathon' | 'finance' | 'sneaker' | 'dev') => {
    if (preset === 'hackathon') {
      onLoadPreset('project-hackforge');
      onClose();
    } else if (preset === 'finance') {
      onLoadPreset('project-ledgerlens');
      onClose();
    } else if (preset === 'sneaker') {
      setFormData({
        idea: 'Zero-waste modular sneakers with interchangeable outsoles that eliminate shoe landfill waste.',
        targetMarket: 'Eco-conscious urban commuters and streetwear enthusiasts aged 22-38.',
        existingProblem: 'Traditional sneakers are glued together with toxic adhesives and end up in landfills after 18 months when the sole wears out.',
        location: 'North America & Western Europe',
        businessGoals: 'Launch Kickstarter with $250k goal, achieve Cradle-to-Cradle certification.',
        constraints: 'Initial unit economics must be under $60 landed; must look sleek and futuristic.',
        competitors: 'Allbirds, Veja, On Running, traditional Nike streetwear',
      });
    } else if (preset === 'dev') {
      setFormData({
        idea: 'Continuous AI architecture and security review companion for solo startup developers.',
        targetMarket: 'Solo fullstack founders, indie hackers, and early-stage startup CTOs.',
        existingProblem: 'Solo devs have no senior tech lead to review architectural trade-offs, leading to catastrophic technical debt.',
        location: 'Global',
        businessGoals: 'Attract 10,000 GitHub repo connections and convert 5% to pro tier.',
        constraints: 'Zero false positives on PR reviews; runs locally or with private cloud compliance.',
        competitors: 'SonarQube, Snyk, GitHub Copilot code review, manual peer reviews',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0d1220] p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Forge a New Brand System
              </h2>
              <p className="text-xs text-slate-400">
                Enter your raw idea or pick a realistic handbook preset to trigger the 6 AI stages.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Presets Buttons */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
            ⚡ Quick-Load Realistic Presets
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => handleSelectPresetTemplate('hackathon')}
              className="rounded-lg border border-indigo-500/30 bg-indigo-500/10 p-2.5 text-left hover:bg-indigo-500/20 transition-all group"
            >
              <span className="text-xs font-bold text-indigo-300 group-hover:text-white block">
                HackForge
              </span>
              <span className="text-[10px] text-slate-400 block truncate">
                Hackathon Teammates
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectPresetTemplate('finance')}
              className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-left hover:bg-emerald-500/20 transition-all group"
            >
              <span className="text-xs font-bold text-emerald-300 group-hover:text-white block">
                LedgerLens
              </span>
              <span className="text-[10px] text-slate-400 block truncate">
                SME Financial Co-pilot
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectPresetTemplate('sneaker')}
              className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-2.5 text-left hover:bg-amber-500/20 transition-all group"
            >
              <span className="text-xs font-bold text-amber-300 group-hover:text-white block">
                Modular Kicks
              </span>
              <span className="text-[10px] text-slate-400 block truncate">
                Zero-Waste Sneakers
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectPresetTemplate('dev')}
              className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-2.5 text-left hover:bg-purple-500/20 transition-all group"
            >
              <span className="text-xs font-bold text-purple-300 group-hover:text-white block">
                DevPulse
              </span>
              <span className="text-[10px] text-slate-400 block truncate">
                Solo Dev Architect
              </span>
            </button>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Idea Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>Startup / Product Idea *</span>
              <span className="text-[10px] text-slate-400 font-normal">
                Can be raw &amp; unrefined
              </span>
            </label>
            <textarea
              required
              rows={3}
              value={formData.idea}
              onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
              placeholder="e.g. I want to build an app that helps students find teammates for hackathons and projects..."
              className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Target Market */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Target Market / Users</label>
              <input
                type="text"
                value={formData.targetMarket}
                onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
                placeholder="e.g. University CS & Design students, hackers"
                className="w-full rounded-xl border border-white/10 bg-black/30 p-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Existing Problem */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Core Problem / Pain Point</label>
              <input
                type="text"
                value={formData.existingProblem}
                onChange={(e) => setFormData({ ...formData, existingProblem: e.target.value })}
                placeholder="e.g. Messy Discord servers lead to ghosting and abandoned projects"
                className="w-full rounded-xl border border-white/10 bg-black/30 p-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Business Goals */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Business Goals</label>
              <input
                type="text"
                value={formData.businessGoals}
                onChange={(e) => setFormData({ ...formData, businessGoals: e.target.value })}
                placeholder="e.g. 50,000 active builders in Year 1"
                className="w-full rounded-xl border border-white/10 bg-black/30 p-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Constraints */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Key Constraints</label>
              <input
                type="text"
                value={formData.constraints}
                onChange={(e) => setFormData({ ...formData, constraints: e.target.value })}
                placeholder="e.g. Students have zero budget; under 60s onboarding"
                className="w-full rounded-xl border border-white/10 bg-black/30 p-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Competitors */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Known Competitors (Optional)</label>
            <input
              type="text"
              value={formData.competitors}
              onChange={(e) => setFormData({ ...formData, competitors: e.target.value })}
              placeholder="e.g. Discord channels, Devpost team finder, LinkedIn groups"
              className="w-full rounded-xl border border-white/10 bg-black/30 p-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex items-center justify-end space-x-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading || !formData.idea.trim()}
              className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-purple-500 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Synthesizing 6 Brand Stages...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Trigger 6-Stage Brand Pipeline</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
