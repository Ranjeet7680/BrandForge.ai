'use client';

import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  PackageCheck
} from 'lucide-react';

interface LandingViewProps {
  onStartBuilding: () => void;
  onViewExample: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onStartBuilding,
  onViewExample,
}) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      {/* Background Radiance */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-indigo-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-purple-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-emerald-500/10 blur-[110px] pointer-events-none" />

      {/* Hero Section */}
      <div className="relative z-10 mx-auto max-w-4xl text-center space-y-6 my-auto pt-6">
        <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>Inkloom AI Brand Intelligence Challenge</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white">
          Build a brand that can <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">think</span>.
        </h1>

        <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
          Turn your raw startup, product, or creator idea into a validated brand strategy, identity, and launch kit through 6 connected AI stages.
        </p>

        {/* Hero CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={onStartBuilding}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-500/25 hover:from-indigo-500 hover:to-purple-500 transition-all hover:scale-105"
          >
            <Sparkles className="h-4 w-4" />
            <span>Start Building →</span>
          </button>

          <button
            onClick={onViewExample}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl border border-white/10 bg-slate-900/80 px-8 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-800 transition-all"
          >
            <span>View Example</span>
            <ArrowRight className="h-4 w-4 text-slate-400" />
          </button>
        </div>

        {/* 6 Stages Visual Pipeline Preview */}
        <div className="pt-12">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            6 Connected AI Stages Workflow
          </span>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {[
              { num: '01', name: 'Discover', desc: 'Idea Intelligence' },
              { num: '02', name: 'Position', desc: 'Strategy & Quadrant' },
              { num: '03', name: 'Shape', desc: 'Personality & Naming' },
              { num: '04', name: 'Visualize', desc: 'Visual Identity' },
              { num: '05', name: 'Challenge', desc: 'AI Brand Critic' },
              { num: '06', name: 'Deliver', desc: 'Launch Kit' }
            ].map((step, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-2 rounded-lg border border-white/5 bg-slate-900/60 px-3 py-2 text-xs backdrop-blur-sm"
              >
                <span className="font-mono text-[10px] text-indigo-400 font-bold">
                  {step.num}
                </span>
                <span className="font-bold text-white">{step.name}</span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">
                  • {step.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Pillars Highlights */}
      <div className="relative z-10 mx-auto max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-4 pt-12">
        <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5 space-y-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Zap className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Multi-Agent Brand Battle</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            5 autonomous agents (Strategist, Creative Director, Customer, Critic, Guardian) debate your positioning before market launch.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5 space-y-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Adversarial Critic Loop</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Diagnoses clichés, generic names, and audience mismatch with side-by-side Original → Critique → Alternative → Revised diffs.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-900/40 p-5 space-y-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <PackageCheck className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Turnkey Brand Launch Kit</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Exports complete brand books, SVG vector marks, color tokens, hero copy, and multi-channel social campaigns.
          </p>
        </div>
      </div>
    </div>
  );
};
