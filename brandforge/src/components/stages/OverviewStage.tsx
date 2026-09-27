'use client';

import React from 'react';
import {
  Compass,
  Crosshair,
  Sparkles,
  Palette,
  ShieldAlert,
  Flame,
  PackageCheck,
  ArrowRight,
  Copy,
  Download,
  Sparkle
} from 'lucide-react';
import { BrandProject } from '@/types/brand';
import { ActiveTab } from '../Sidebar';

interface OverviewStageProps {
  project: BrandProject;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenExportModal: () => void;
}

export const OverviewStage: React.FC<OverviewStageProps> = ({
  project,
  setActiveTab,
  onOpenExportModal,
}) => {
  const [copied, setCopied] = React.useState(false);

  const copyPitch = () => {
    navigator.clipboard.writeText(project.stage3Shape.oneLinePitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/40 via-slate-900/80 to-purple-950/40 p-6 sm:p-8 backdrop-blur-md">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
              <Sparkle className="h-3.5 w-3.5 text-indigo-400" />
              <span>Full Brand System Validated</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {project.name}
            </h1>

            <p className="text-base text-indigo-200/90 font-medium">
              &ldquo;{project.stage3Shape.selectedTagline}&rdquo;
            </p>

            <p className="text-sm text-slate-300 leading-relaxed">
              {project.stage3Shape.oneLinePitch}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={copyPitch}
                className="inline-flex items-center space-x-1.5 rounded-lg border border-white/10 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-750 transition-colors"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>{copied ? 'Copied Pitch!' : 'Copy One-Line Pitch'}</span>
              </button>

              <button
                onClick={() => setActiveTab('battle')}
                className="inline-flex items-center space-x-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-300 hover:bg-purple-500/20 transition-colors"
              >
                <Flame className="h-3.5 w-3.5 text-purple-400" />
                <span>Launch Brand Battle</span>
              </button>

              <button
                onClick={onOpenExportModal}
                className="inline-flex items-center space-x-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 hover:bg-emerald-500/20 transition-colors"
              >
                <Download className="h-3.5 w-3.5 text-emerald-400" />
                <span>Export Launch Kit</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Pillar */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:w-72">
            <div className="rounded-xl border border-white/10 bg-slate-900/80 p-3.5 text-center">
              <span className="text-[11px] font-semibold uppercase text-slate-400">
                Health Score
              </span>
              <div className="mt-1 text-2xl font-extrabold text-emerald-400 font-mono">
                {project.stage5Critic.overallHealthScore}%
              </div>
              <span className="text-[10px] text-emerald-300/80">Critic Verified</span>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-900/80 p-3.5 text-center">
              <span className="text-[11px] font-semibold uppercase text-slate-400">
                AI Stages
              </span>
              <div className="mt-1 text-2xl font-extrabold text-indigo-400 font-mono">
                6 / 6
              </div>
              <span className="text-[10px] text-indigo-300/80">Synchronized</span>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-900/80 p-3.5 text-center">
              <span className="text-[11px] font-semibold uppercase text-slate-400">
                Council Agents
              </span>
              <div className="mt-1 text-2xl font-extrabold text-purple-400 font-mono">
                5 Active
              </div>
              <span className="text-[10px] text-purple-300/80">Debating Stances</span>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-900/80 p-3.5 text-center">
              <span className="text-[11px] font-semibold uppercase text-slate-400">
                Launch Assets
              </span>
              <div className="mt-1 text-2xl font-extrabold text-amber-400 font-mono">
                12 Ready
              </div>
              <span className="text-[10px] text-amber-300/80">Web, Social, PR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Health Radar Breakdown */}
      <div className="rounded-xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-emerald-400" />
              Brand System Health & Coherence Metrics
            </h2>
            <p className="text-xs text-slate-400">
              Evaluated by Agent D (The Brand Critic) and Agent E (The Brand Guardian)
            </p>
          </div>
          <button
            onClick={() => setActiveTab('critic')}
            className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center font-medium"
          >
            Inspect Critic Audit <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-6">
          {Object.entries(project.stage5Critic.radarScores).map(([key, val]) => (
            <div key={key} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="capitalize text-slate-300">{key}</span>
                <span className="font-mono text-white font-semibold">{val}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full"
                  style={{ width: `${val}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6 Connected Stages Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white tracking-tight">
            Explore 6 Connected AI Stages
          </h2>
          <span className="text-xs text-slate-400">
            Click any stage to inspect and customize
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Discover */}
          <div
            onClick={() => setActiveTab('discover')}
            className="group glass-panel-interactive cursor-pointer rounded-xl p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Compass className="h-5 w-5" />
              </div>
              <span className="rounded bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-400">
                Stage 1
              </span>
            </div>
            <h3 className="mt-3 text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
              Discover: Idea Intelligence
            </h3>
            <p className="mt-1 text-xs text-slate-400 line-clamp-2">
              {project.stage1Discover.coreProblem}
            </p>
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 text-xs text-slate-400">
              <span>{project.stage1Discover.targetUsers.length} Micro-Segments</span>
              <span className="text-blue-400 group-hover:translate-x-0.5 transition-transform flex items-center">
                Explore <ArrowRight className="ml-1 h-3 w-3" />
              </span>
            </div>
          </div>

          {/* Card 2: Position */}
          <div
            onClick={() => setActiveTab('position')}
            className="group glass-panel-interactive cursor-pointer rounded-xl p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Crosshair className="h-5 w-5" />
              </div>
              <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                Stage 2
              </span>
            </div>
            <h3 className="mt-3 text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
              Position: Brand Strategy
            </h3>
            <p className="mt-1 text-xs text-slate-400 line-clamp-2">
              {project.stage2Position.valueProposition}
            </p>
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 text-xs text-slate-400">
              <span>{project.stage2Position.category.split(' ')[0]} Category</span>
              <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform flex items-center">
                Explore <ArrowRight className="ml-1 h-3 w-3" />
              </span>
            </div>
          </div>

          {/* Card 3: Shape */}
          <div
            onClick={() => setActiveTab('shape')}
            className="group glass-panel-interactive cursor-pointer rounded-xl p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="rounded bg-purple-500/10 px-2 py-0.5 text-[10px] font-semibold text-purple-400">
                Stage 3
              </span>
            </div>
            <h3 className="mt-3 text-base font-bold text-white group-hover:text-purple-300 transition-colors">
              Shape: Personality & Naming
            </h3>
            <p className="mt-1 text-xs text-slate-400 line-clamp-2">
              Name: <strong className="text-purple-300">{project.stage3Shape.selectedBrandName}</strong> — {project.stage3Shape.personalityTraits.map(t => t.trait).join(', ')}
            </p>
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 text-xs text-slate-400">
              <span>{project.stage3Shape.namingTerritories.length} Naming Territories</span>
              <span className="text-purple-400 group-hover:translate-x-0.5 transition-transform flex items-center">
                Explore <ArrowRight className="ml-1 h-3 w-3" />
              </span>
            </div>
          </div>

          {/* Card 4: Visualize */}
          <div
            onClick={() => setActiveTab('visualize')}
            className="group glass-panel-interactive cursor-pointer rounded-xl p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20">
                <Palette className="h-5 w-5" />
              </div>
              <span className="rounded bg-pink-500/10 px-2 py-0.5 text-[10px] font-semibold text-pink-400">
                Stage 4
              </span>
            </div>
            <h3 className="mt-3 text-base font-bold text-white group-hover:text-pink-300 transition-colors">
              Visualize: Visual Identity
            </h3>
            <div className="mt-2 flex items-center space-x-1.5">
              {project.stage4Visualize.colorPalette.slice(0, 5).map((c, i) => (
                <div
                  key={i}
                  className="h-5 w-5 rounded-full border border-white/20 shadow-sm"
                  style={{ backgroundColor: c.hex }}
                  title={`${c.name} (${c.hex})`}
                />
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 text-xs text-slate-400">
              <span>{project.stage4Visualize.typography.headlineFont}</span>
              <span className="text-pink-400 group-hover:translate-x-0.5 transition-transform flex items-center">
                Explore <ArrowRight className="ml-1 h-3 w-3" />
              </span>
            </div>
          </div>

          {/* Card 5: Challenge */}
          <div
            onClick={() => setActiveTab('critic')}
            className="group glass-panel-interactive cursor-pointer rounded-xl p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
                Stage 5
              </span>
            </div>
            <h3 className="mt-3 text-base font-bold text-white group-hover:text-amber-300 transition-colors">
              Challenge: Brand Critic
            </h3>
            <p className="mt-1 text-xs text-slate-400 line-clamp-2">
              {project.stage5Critic.critiquePoints.length} clichés and contradictions diagnosed & corrected.
            </p>
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 text-xs text-slate-400">
              <span className="text-emerald-400">Original → Revised</span>
              <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform flex items-center">
                Explore <ArrowRight className="ml-1 h-3 w-3" />
              </span>
            </div>
          </div>

          {/* Card 6: Deliver */}
          <div
            onClick={() => setActiveTab('launch')}
            className="group glass-panel-interactive cursor-pointer rounded-xl p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <PackageCheck className="h-5 w-5" />
              </div>
              <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                Stage 6
              </span>
            </div>
            <h3 className="mt-3 text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
              Deliver: Brand Launch Kit
            </h3>
            <p className="mt-1 text-xs text-slate-400 line-clamp-2">
              Landing page copy, social threads, press announcement, and full brand book.
            </p>
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 text-xs text-slate-400">
              <span>Ready for Production</span>
              <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform flex items-center">
                Explore <ArrowRight className="ml-1 h-3 w-3" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Battle Featured Card */}
      <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-950/30 via-slate-900 to-indigo-950/30 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-purple-400">
            <Flame className="h-4 w-4" />
            <span>EXCLUSIVE FEATURE: THE BRAND BATTLE</span>
          </div>
          <h3 className="text-xl font-bold text-white">
            Watch 5 Autonomous AI Agents Debate Your Brand
          </h3>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            The Strategist, Creative Director, Target Customer, Brand Critic, and Guardian engage in an adversarial debate loop to eliminate weaknesses, stress-test pricing, and verify consistency.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('battle')}
          className="flex-shrink-0 flex items-center space-x-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 hover:from-purple-500 hover:to-indigo-500 transition-all"
        >
          <Flame className="h-4 w-4" />
          <span>Enter Battle Arena</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
