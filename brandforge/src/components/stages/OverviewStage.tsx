'use client';

import React, { useState } from 'react';
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
  Plus,
  Scale,
  Sparkle
} from 'lucide-react';
import { BrandProject } from '@/types/brand';
import { ActiveTab } from '../Sidebar';
import { soundEngine } from '@/lib/sound-engine';

interface OverviewStageProps {
  project: BrandProject;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenExportModal: () => void;
  onOpenNewModal?: () => void;
  onSelectProject?: (id: string) => void;
}

export const OverviewStage: React.FC<OverviewStageProps> = ({
  project,
  setActiveTab,
  onOpenExportModal,
  onOpenNewModal,
  onSelectProject,
}) => {
  const [copied, setCopied] = useState(false);

  const copyPitch = () => {
    soundEngine.playClick();
    navigator.clipboard.writeText(project.stage3Shape.oneLinePitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const recentProjects = [
    {
      id: 'project-hackforge',
      name: 'HackForge',
      subtitle: 'Student Builder Platform',
      updated: 'Updated 2 hours ago',
      category: 'Developer Tools',
      initials: 'HF',
      color: 'from-cyan-500 to-indigo-600',
    },
    {
      id: 'project-financefit',
      name: 'FinanceFit',
      subtitle: 'AI Finance Coach',
      updated: 'Updated 1 day ago',
      category: 'Fintech & EdTech',
      initials: 'FF',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'project-communitypulse',
      name: 'CommunityPulse',
      subtitle: 'Decision Intelligence',
      updated: 'Updated 3 days ago',
      category: 'Community Analytics',
      initials: 'CP',
      color: 'from-purple-500 to-pink-600',
    },
    {
      id: 'project-voyage',
      name: 'Voyage Analytics',
      subtitle: 'Travel Data Platform',
      updated: 'Updated 5 days ago',
      category: 'Travel Intelligence',
      initials: 'VA',
      color: 'from-amber-500 to-orange-600',
    },
  ];

  const councilAgents = [
    { name: 'The Strategist', role: 'Category & Moat', status: 'Active', pulse: 'bg-emerald-400' },
    { name: 'Creative Director', role: 'Visuals & Mark', status: 'Active', pulse: 'bg-indigo-400' },
    { name: 'Naming Specialist', role: 'Territories & Voice', status: 'Complete', pulse: 'bg-cyan-400' },
    { name: 'Brand Critic', role: 'Clichés & Guardrails', status: 'Thinking', pulse: 'bg-amber-400' },
    { name: 'Brand Guardian', role: 'WCAG & Coherence', status: 'Active', pulse: 'bg-teal-400' },
    { name: 'Launch Strategist', role: 'Social & PR Kits', status: 'Complete', pulse: 'bg-purple-400' },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      {/* 1. PROJECT HEADER BANNER (Matches panel 6 in screenshot) */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-[#0c1022] via-[#090d1b] to-[#120f26] p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-purple-500/15 blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left Column: Title, Tagline, Description, Actions */}
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
              <Sparkle className="h-3.5 w-3.5 text-cyan-400" />
              <span>Full Brand System Validated</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                {project.name}
              </h1>
              <p className="mt-1 text-base sm:text-lg text-cyan-300 font-semibold italic">
                &ldquo;{project.stage3Shape.selectedTagline}&rdquo;
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.stage3Shape.oneLinePitch}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setActiveTab('discover');
                }}
                className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-purple-500 transition-all hover:scale-105"
              >
                <span>Continue Project</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  setActiveTab('battle');
                }}
                className="flex items-center space-x-1.5 rounded-xl border border-purple-500/40 bg-purple-500/15 px-4 py-2.5 text-xs font-semibold text-purple-300 hover:bg-purple-500/25 transition-all"
              >
                <Flame className="h-4 w-4 text-purple-400" />
                <span>Launch Brand Battle</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  onOpenExportModal();
                }}
                className="flex items-center space-x-1.5 rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-all"
              >
                <Download className="h-3.5 w-3.5 text-slate-400" />
                <span>Export Launch Kit</span>
              </button>

              <button
                onClick={copyPitch}
                className="flex items-center space-x-1.5 rounded-xl border border-white/10 bg-slate-900/80 px-3.5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-all"
                title="Copy One-Line Pitch to Clipboard"
              >
                <Copy className="h-3.5 w-3.5 text-slate-400" />
                <span>{copied ? 'Copied Pitch!' : 'Copy Pitch'}</span>
              </button>
            </div>
          </div>

          {/* Center Column: Floating 3D Device & Mockup Cards (Visual from screenshot) */}
          <div className="hidden xl:flex items-center justify-center relative w-72 h-52 select-none">
            {/* Background glowing glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-600/20 blur-xl" />

            {/* Laptop Mockup Plate */}
            <div className="absolute left-2 top-4 w-52 rounded-xl border border-white/15 bg-slate-950/90 p-2.5 shadow-2xl backdrop-blur-md transform -rotate-3 hover:rotate-0 transition-transform">
              <div className="flex items-center space-x-1.5 pb-2 border-b border-white/10">
                <div className="h-2 w-2 rounded-full bg-rose-500" />
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-[9px] text-slate-400 pl-2 font-mono">{project.name}.app</span>
              </div>
              <div className="mt-2 space-y-1.5">
                <div className="h-2 w-24 rounded bg-indigo-500/40" />
                <div className="h-1.5 w-36 rounded bg-slate-800" />
                <div className="grid grid-cols-2 gap-1 pt-1">
                  <div className="h-8 rounded bg-cyan-950/40 border border-cyan-500/20" />
                  <div className="h-8 rounded bg-purple-950/40 border border-purple-500/20" />
                </div>
              </div>
            </div>

            {/* Glowing Brand Mark Badge */}
            <div className="absolute right-6 top-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-indigo-600 to-purple-700 p-0.5 shadow-xl shadow-cyan-500/30 transform rotate-6 hover:rotate-0 transition-transform">
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#090d1b]">
                <span className="font-black text-2xl tracking-tighter bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                  {project.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
            </div>

            {/* Mobile Mockup Plate */}
            <div className="absolute right-0 bottom-1 w-24 rounded-2xl border border-white/20 bg-slate-900/95 p-1.5 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform">
              <div className="h-1.5 w-8 rounded-full bg-slate-800 mx-auto mb-1.5" />
              <div className="space-y-1">
                <div className="h-6 rounded-lg bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 p-1 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-cyan-300">Squad Match</span>
                </div>
                <div className="h-1 w-12 rounded bg-slate-800" />
                <div className="h-1 w-16 rounded bg-slate-800" />
              </div>
            </div>
          </div>

          {/* Right Column: 4 Stats Tiles */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:w-72 flex-shrink-0">
            {/* Tile 1 */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-3.5 text-center hover:border-emerald-500/40 transition-colors">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Health Score
              </span>
              <div className="mt-1 text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                {project.stage5Critic.overallHealthScore}%
              </div>
              <span className="text-[10px] text-emerald-300/90 font-medium">✓ Brand Coherent</span>
            </div>

            {/* Tile 2 */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-3.5 text-center hover:border-indigo-500/40 transition-colors">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                AI Stages
              </span>
              <div className="mt-1 text-2xl sm:text-3xl font-black text-indigo-400 font-mono">
                6 / 6
              </div>
              <span className="text-[10px] text-indigo-300/90 font-medium">Synchronized</span>
            </div>

            {/* Tile 3 */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-3.5 text-center hover:border-purple-500/40 transition-colors">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Council Agents
              </span>
              <div className="mt-1 text-2xl sm:text-3xl font-black text-purple-400 font-mono">
                5 Active
              </div>
              <span className="text-[10px] text-purple-300/90 font-medium">Debating &amp; Improving</span>
            </div>

            {/* Tile 4 */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-3.5 text-center hover:border-amber-500/40 transition-colors">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Launch Assets
              </span>
              <div className="mt-1 text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                12 Ready
              </div>
              <span className="text-[10px] text-amber-300/90 font-medium">Web, Social, PR</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BRAND SYSTEM HEALTH & COHERENCE METRICS BAR (Matches screenshot) */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 sm:p-6 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldAlert className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white">
                Brand System Health &amp; Coherence Metrics
              </h2>
              <p className="text-[11px] text-slate-400">
                Evaluated by Agent D (Brand Critic) and Agent E (Brand Guardian)
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('quality');
            }}
            className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center font-semibold"
          >
            <span>View Detailed Audit</span>
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </button>
        </div>

        {/* 5 Animated Glowing Progress Bars */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-5">
          {[
            { label: 'Distinctiveness', val: 95 },
            { label: 'Audience Fit', val: 92 },
            { label: 'Memorability', val: 91 },
            { label: 'Scalability', val: 88 },
            { label: 'Consistency', val: 94 },
          ].map((m) => (
            <div key={m.label} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">{m.label}</span>
                <span className="font-mono text-cyan-300 font-bold">{m.val}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800/90 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 shadow-sm shadow-cyan-400/30 transition-all duration-500"
                  style={{ width: `${m.val}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. RECENT PROJECTS & QUICK ACTIONS (Matches screenshot) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects (2 Cols) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Recent Projects
            </h3>
            <button
              onClick={() => {
                soundEngine.playClick();
                alert('Projects view: All 4 workspace brands are synced and editable.');
              }}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center"
            >
              <span>View All</span>
              <ArrowRight className="ml-1 h-3 w-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recentProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => {
                  soundEngine.playClick();
                  if (onSelectProject) onSelectProject(proj.id);
                }}
                className={`group relative rounded-2xl border p-4 cursor-pointer transition-all ${
                  project.name.toLowerCase().includes(proj.name.toLowerCase())
                    ? 'border-indigo-500/50 bg-indigo-950/20 shadow-lg shadow-indigo-950/50'
                    : 'border-white/10 bg-slate-900/60 hover:bg-slate-800/60 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${proj.color} font-black text-sm text-white shadow-md`}
                    >
                      {proj.initials}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {proj.name}
                      </h4>
                      <p className="text-[11px] text-slate-400">{proj.subtitle}</p>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono">
                    {proj.updated}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-slate-400">
                  <span className="rounded bg-white/5 px-2 py-0.5 text-slate-300">
                    {proj.category}
                  </span>
                  <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform flex items-center font-medium">
                    Open <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions (1 Col) */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Quick Actions
          </h3>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => {
                soundEngine.playClick();
                if (onOpenNewModal) onOpenNewModal();
              }}
              className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-center hover:bg-slate-800 hover:border-indigo-500/40 transition-all group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
                <Plus className="h-5 w-5" />
              </div>
              <span className="mt-2 text-xs font-bold text-white">New Brand Idea</span>
              <span className="text-[10px] text-slate-400">Start with rough idea</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('battle');
              }}
              className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-center hover:bg-slate-800 hover:border-purple-500/40 transition-all group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                <Flame className="h-5 w-5" />
              </div>
              <span className="mt-2 text-xs font-bold text-white">Brand Battle</span>
              <span className="text-[10px] text-slate-400">AI critique &amp; improve</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('guardian');
              }}
              className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-center hover:bg-slate-800 hover:border-teal-500/40 transition-all group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 group-hover:scale-110 transition-transform">
                <Scale className="h-5 w-5" />
              </div>
              <span className="mt-2 text-xs font-bold text-white">Brand Guardian</span>
              <span className="text-[10px] text-slate-400">Check consistency</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('launch');
              }}
              className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-center hover:bg-slate-800 hover:border-amber-500/40 transition-all group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                <PackageCheck className="h-5 w-5" />
              </div>
              <span className="mt-2 text-xs font-bold text-white">Launch Kit</span>
              <span className="text-[10px] text-slate-400">Generate assets</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. SIX-STAGE CONNECTED PIPELINE (Interactive Timeline) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              6-Stage Brand Intelligence Pipeline
            </h2>
            <p className="text-xs text-slate-400">
              Context is preserved and enriched across all connected branding layers.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400">
            100% Complete
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Discover */}
          <div
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('discover');
            }}
            className="group cursor-pointer rounded-2xl border border-white/10 bg-slate-900/60 p-5 hover:border-blue-500/40 hover:bg-slate-800/60 transition-all shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Compass className="h-5 w-5" />
              </div>
              <span className="rounded bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-400">
                Stage 01
              </span>
            </div>
            <h3 className="mt-3 text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
              Discover: Idea Intelligence
            </h3>
            <p className="mt-1 text-xs text-slate-400 line-clamp-2">
              {project.stage1Discover.coreProblem}
            </p>
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 text-[11px] text-slate-400">
              <span>{project.stage1Discover.targetUsers.length} Micro-Segments</span>
              <span className="text-blue-400 flex items-center group-hover:translate-x-0.5 transition-transform font-medium">
                Open Workspace <ArrowRight className="ml-1 h-3 w-3" />
              </span>
            </div>
          </div>

          {/* Card 2: Position */}
          <div
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('position');
            }}
            className="group cursor-pointer rounded-2xl border border-white/10 bg-slate-900/60 p-5 hover:border-emerald-500/40 hover:bg-slate-800/60 transition-all shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Crosshair className="h-5 w-5" />
              </div>
              <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                Stage 02
              </span>
            </div>
            <h3 className="mt-3 text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
              Position: Brand Strategy
            </h3>
            <p className="mt-1 text-xs text-slate-400 line-clamp-2">
              {project.stage2Position.valueProposition}
            </p>
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 text-[11px] text-slate-400">
              <span>{project.stage2Position.category.split(' ')[0]} Category</span>
              <span className="text-emerald-400 flex items-center group-hover:translate-x-0.5 transition-transform font-medium">
                Open Workspace <ArrowRight className="ml-1 h-3 w-3" />
              </span>
            </div>
          </div>

          {/* Card 3: Shape */}
          <div
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('shape');
            }}
            className="group cursor-pointer rounded-2xl border border-white/10 bg-slate-900/60 p-5 hover:border-purple-500/40 hover:bg-slate-800/60 transition-all shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="rounded bg-purple-500/10 px-2 py-0.5 text-[10px] font-semibold text-purple-400">
                Stage 03
              </span>
            </div>
            <h3 className="mt-3 text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
              Shape: Personality &amp; Naming
            </h3>
            <p className="mt-1 text-xs text-slate-400 line-clamp-2">
              Name: <strong className="text-purple-300">{project.stage3Shape.selectedBrandName}</strong> — {project.stage3Shape.personalityTraits.map(t => t.trait).join(', ')}
            </p>
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 text-[11px] text-slate-400">
              <span>{project.stage3Shape.namingTerritories.length} Territories</span>
              <span className="text-purple-400 flex items-center group-hover:translate-x-0.5 transition-transform font-medium">
                Open Workspace <ArrowRight className="ml-1 h-3 w-3" />
              </span>
            </div>
          </div>

          {/* Card 4: Visualize */}
          <div
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('visualize');
            }}
            className="group cursor-pointer rounded-2xl border border-white/10 bg-slate-900/60 p-5 hover:border-pink-500/40 hover:bg-slate-800/60 transition-all shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
                <Palette className="h-5 w-5" />
              </div>
              <span className="rounded bg-pink-500/10 px-2 py-0.5 text-[10px] font-semibold text-pink-400">
                Stage 04
              </span>
            </div>
            <h3 className="mt-3 text-sm font-bold text-white group-hover:text-pink-300 transition-colors">
              Visualize: Visual Identity
            </h3>
            <div className="mt-2 flex items-center space-x-1.5">
              {project.stage4Visualize.colorPalette.slice(0, 5).map((c, i) => (
                <div
                  key={i}
                  className="h-4 w-4 rounded-full border border-white/20 shadow-sm"
                  style={{ backgroundColor: c.hex }}
                  title={`${c.name} (${c.hex})`}
                />
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 text-[11px] text-slate-400">
              <span>3D Polyhedron &amp; Mark</span>
              <span className="text-pink-400 flex items-center group-hover:translate-x-0.5 transition-transform font-medium">
                Open Workspace <ArrowRight className="ml-1 h-3 w-3" />
              </span>
            </div>
          </div>

          {/* Card 5: Challenge */}
          <div
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('critic');
            }}
            className="group cursor-pointer rounded-2xl border border-white/10 bg-slate-900/60 p-5 hover:border-amber-500/40 hover:bg-slate-800/60 transition-all shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
                Stage 05
              </span>
            </div>
            <h3 className="mt-3 text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
              Challenge: Brand Critic
            </h3>
            <p className="mt-1 text-xs text-slate-400 line-clamp-2">
              {project.stage5Critic.critiquePoints.length} clichés and contradictions diagnosed &amp; corrected.
            </p>
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 text-[11px] text-slate-400">
              <span className="text-emerald-400">Original → Revised</span>
              <span className="text-amber-400 flex items-center group-hover:translate-x-0.5 transition-transform font-medium">
                Open Workspace <ArrowRight className="ml-1 h-3 w-3" />
              </span>
            </div>
          </div>

          {/* Card 6: Deliver */}
          <div
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('launch');
            }}
            className="group cursor-pointer rounded-2xl border border-white/10 bg-slate-900/60 p-5 hover:border-emerald-500/40 hover:bg-slate-800/60 transition-all shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <PackageCheck className="h-5 w-5" />
              </div>
              <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                Stage 06
              </span>
            </div>
            <h3 className="mt-3 text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
              Deliver: Launch Kit
            </h3>
            <p className="mt-1 text-xs text-slate-400 line-clamp-2">
              Landing page copy, social threads, press release, and full brand book.
            </p>
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5 text-[11px] text-slate-400">
              <span>Ready for Production</span>
              <span className="text-emerald-400 flex items-center group-hover:translate-x-0.5 transition-transform font-medium">
                Open Workspace <ArrowRight className="ml-1 h-3 w-3" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. AI BRAND COUNCIL STATUS ROW */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-purple-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              AI Brand Council Activity
            </h3>
          </div>
          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('battle');
            }}
            className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
          >
            Enter Brand Battle Arena →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {councilAgents.map((agent) => (
            <div
              key={agent.name}
              className="rounded-xl border border-white/5 bg-black/25 p-3 space-y-1 text-left"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-white truncate">{agent.name}</span>
                <span className={`h-1.5 w-1.5 rounded-full ${agent.pulse} animate-ping`} />
              </div>
              <p className="text-[10px] text-slate-400 truncate">{agent.role}</p>
              <div className="pt-1">
                <span className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] font-medium text-slate-300">
                  {agent.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
