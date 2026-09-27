'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Flame,
  XCircle
} from 'lucide-react';
import { Stage5Critic, CritiquePoint } from '@/types/brand';

interface BrandCriticStageProps {
  critic: Stage5Critic;
  brandName: string;
  onProceedToBattle: () => void;
  onProceedToDeliver: () => void;
}

export const BrandCriticStage: React.FC<BrandCriticStageProps> = ({
  critic,
  brandName,
  onProceedToBattle,
  onProceedToDeliver,
}) => {
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical' | 'warning' | 'suggestion'>('all');
  const [critiqueList, setCritiqueList] = useState<CritiquePoint[]>(critic.critiquePoints);

  const toggleStatus = (id: string) => {
    setCritiqueList((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'applied' ? 'pending' : 'applied' } : c
      )
    );
  };

  const filteredPoints = critiqueList.filter((c) =>
    filterSeverity === 'all' ? true : c.severity === filterSeverity
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="rounded-md bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
              STAGE 05 — THE AI BRAND CRITIC
            </span>
            <span className="text-xs text-slate-400 font-mono">
              ADVERSARIAL COHERENCE CHECK
            </span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Challenge: Cliché &amp; Contradiction Audit for {brandName}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            The handbook&apos;s standout differentiator: an autonomous adversarial AI critic that hunts down generic names, buzzword soup, and audience disconnects.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={onProceedToBattle}
            className="flex items-center space-x-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-2 text-xs font-semibold text-purple-300 hover:bg-purple-500/20 transition-colors"
          >
            <Flame className="h-3.5 w-3.5 text-purple-400" />
            <span>Enter Brand Battle</span>
          </button>
          <button
            onClick={onProceedToDeliver}
            className="flex items-center space-x-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shadow-sm"
          >
            <span>Stage 6: Deliver</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Critic Health Meter & Diagnostic Overview */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/20 via-slate-900 to-indigo-950/20 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center">
            <ShieldAlert className="mr-1.5 h-4 w-4" />
            Adversarial Audit Completed
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Overall Brand Health &amp; Defensibility: {critic.overallHealthScore}/100
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            All detected startup clichés, weak value propositions, and visual tropes were revised. The diagnostic loops below show exactly how each draft was upgraded.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center justify-center h-24 w-24 rounded-full border-4 border-emerald-500/40 bg-black/40 shadow-lg font-mono">
            <span className="text-2xl font-black text-emerald-400">
              {critic.overallHealthScore}%
            </span>
            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
              Score
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilterSeverity('all')}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              filterSeverity === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-800/80 text-slate-400 hover:text-white'
            }`}
          >
            All Critiques ({critiqueList.length})
          </button>
          <button
            onClick={() => setFilterSeverity('critical')}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              filterSeverity === 'critical'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'bg-slate-800/80 text-slate-400 hover:text-white'
            }`}
          >
            Critical Fixes ({critiqueList.filter((c) => c.severity === 'critical').length})
          </button>
          <button
            onClick={() => setFilterSeverity('warning')}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              filterSeverity === 'warning'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-800/80 text-slate-400 hover:text-white'
            }`}
          >
            Warnings ({critiqueList.filter((c) => c.severity === 'warning').length})
          </button>
        </div>

        <span className="hidden sm:inline-block text-xs text-slate-400">
          Showing <strong>Original → Critique → Alternative → Revised</strong>
        </span>
      </div>

      {/* 4-Step Critique Comparative Cards */}
      <div className="space-y-6">
        {filteredPoints.map((pt) => (
          <div
            key={pt.id}
            className="rounded-xl border border-white/10 bg-slate-900/60 p-6 space-y-4 hover:border-white/20 transition-all"
          >
            {/* Card Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <span
                  className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    pt.severity === 'critical'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : pt.severity === 'warning'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}
                >
                  {pt.severity}
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  {pt.category}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono text-emerald-400 flex items-center">
                  <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                  {pt.status === 'applied' ? 'Correction Applied' : 'Pending Review'}
                </span>
                <button
                  onClick={() => toggleStatus(pt.id)}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  {pt.status === 'applied' ? 'Toggle Status' : 'Mark Applied'}
                </button>
              </div>
            </div>

            <p className="text-sm font-semibold text-white leading-relaxed">
              {pt.issue}
            </p>

            {/* 4-Column Pipeline: Original -> Critique -> Alternative -> Revised */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
              {/* 1. Original (Red Flagged) */}
              <div className="rounded-lg border border-rose-500/20 bg-rose-950/10 p-3.5 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 flex items-center">
                  <XCircle className="mr-1 h-3 w-3" /> 1. Original Draft
                </span>
                <p className="text-xs text-rose-200/90 leading-relaxed font-mono">
                  {pt.original}
                </p>
              </div>

              {/* 2. AI Critique Reason */}
              <div className="rounded-lg border border-amber-500/20 bg-amber-950/10 p-3.5 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center">
                  <AlertTriangle className="mr-1 h-3 w-3" /> 2. Critic Diagnostic
                </span>
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  {pt.critiqueReason}
                </p>
              </div>

              {/* 3. Generated Alternative */}
              <div className="rounded-lg border border-blue-500/20 bg-blue-950/10 p-3.5 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 flex items-center">
                  <Sparkles className="mr-1 h-3 w-3" /> 3. Alternative Angle
                </span>
                <p className="text-xs text-blue-200/90 leading-relaxed font-medium">
                  {pt.alternative}
                </p>
              </div>

              {/* 4. Final Revised Result (Green) */}
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/15 p-3.5 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center">
                  <CheckCircle2 className="mr-1 h-3 w-3" /> 4. Revised Result
                </span>
                <p className="text-xs text-emerald-200 leading-relaxed font-semibold">
                  {pt.revisedResult}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
