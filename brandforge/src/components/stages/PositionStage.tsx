'use client';

import React from 'react';
import {
  Target,
  Layers,
  ArrowRight,
  Copy,
  Check,
  UserCheck,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { Stage2Position } from '@/types/brand';

interface PositionStageProps {
  position: Stage2Position;
  brandName: string;
  onProceedToNext: () => void;
}

export const PositionStage: React.FC<PositionStageProps> = ({
  position,
  brandName,
  onProceedToNext,
}) => {
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
              STAGE 02
            </span>
            <span className="text-xs text-slate-400 font-mono">
              STRATEGIC MARKET POSITIONING
            </span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Position: Brand Strategy &amp; Category Design for {brandName}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Define who you are for, what category you own, and why competitors cannot easily displace you.
          </p>
        </div>

        <button
          onClick={onProceedToNext}
          className="flex items-center space-x-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shadow-sm self-start sm:self-auto"
        >
          <span>Proceed to Stage 3: Shape</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Category Creation Banner */}
      <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-950/30 via-slate-900 to-indigo-950/20 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Defined Market Category
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {position.category}
            </h2>
          </div>
          <span className="self-start sm:self-auto rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/20">
            Category Defining Brand
          </span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {position.categoryDefinition}
        </p>
      </div>

      {/* Value Proposition & Differentiator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Value Proposition */}
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center">
              <Zap className="mr-1.5 h-4 w-4" />
              Core Value Proposition
            </span>
            <button
              onClick={() => copyText(position.valueProposition, 'val-prop')}
              className="text-xs text-slate-400 hover:text-white flex items-center"
            >
              {copiedKey === 'val-prop' ? <Check className="mr-1 h-3 w-3 text-emerald-400" /> : <Copy className="mr-1 h-3 w-3" />}
              {copiedKey === 'val-prop' ? 'Copied' : 'Copy'}
            </button>
          </div>
          <p className="text-base font-semibold text-white leading-relaxed">
            {position.valueProposition}
          </p>
          <p className="text-xs text-slate-400 pt-1">
            Focuses on the immediate transformation delivered to the user.
          </p>
        </div>

        {/* Core Differentiator */}
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center">
              <ShieldCheck className="mr-1.5 h-4 w-4" />
              The &ldquo;Only&rdquo; Differentiator
            </span>
            <button
              onClick={() => copyText(position.differentiator, 'diff')}
              className="text-xs text-slate-400 hover:text-white flex items-center"
            >
              {copiedKey === 'diff' ? <Check className="mr-1 h-3 w-3 text-emerald-400" /> : <Copy className="mr-1 h-3 w-3" />}
              {copiedKey === 'diff' ? 'Copied' : 'Copy'}
            </button>
          </div>
          <p className="text-sm font-medium text-slate-200 leading-relaxed">
            {position.differentiator}
          </p>
          <div className="text-xs text-purple-300/80 pt-1">
            <strong>Competitive Angle:</strong> {position.competitiveAngle}
          </div>
        </div>
      </div>

      {/* Official Positioning Statement Card */}
      <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/20 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center">
            <Target className="mr-1.5 h-4 w-4" />
            Official Brand Positioning Statement
          </span>
          <button
            onClick={() => copyText(position.positioningStatement, 'pos-stmt')}
            className="text-xs text-indigo-300 hover:text-white flex items-center"
          >
            {copiedKey === 'pos-stmt' ? <Check className="mr-1 h-3 w-3 text-emerald-400" /> : <Copy className="mr-1 h-3 w-3" />}
            {copiedKey === 'pos-stmt' ? 'Copied' : 'Copy Full Statement'}
          </button>
        </div>

        <blockquote className="rounded-lg border border-indigo-500/30 bg-black/30 p-4 text-sm font-medium text-indigo-100 leading-relaxed italic">
          &ldquo;{position.positioningStatement}&rdquo;
        </blockquote>

        <p className="text-xs text-slate-400">
          Formulated using the classic positioning framework: Target Audience + Primary Need + Category + Compelling Benefit + Competitive Contrast.
        </p>
      </div>

      {/* Target Persona Avatar Card */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <UserCheck className="h-5 w-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">
            Target Persona Deep Avatar
          </h2>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Persona Profile Header */}
          <div className="space-y-3 lg:border-r border-white/10 lg:pr-6">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              {position.targetPersona.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {position.targetPersona.name}
              </h3>
              <p className="text-xs text-indigo-400 font-medium">
                {position.targetPersona.role}
              </p>
              <p className="text-xs text-slate-400">
                Age: {position.targetPersona.ageRange}
              </p>
            </div>
            <div className="rounded-lg border border-white/5 bg-black/20 p-3">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Persona Quote
              </span>
              <p className="mt-1 text-xs italic text-slate-300 leading-relaxed">
                &ldquo;{position.targetPersona.quote}&rdquo;
              </p>
            </div>
          </div>

          {/* Pain Triggers & Desired Outcomes */}
          <div className="space-y-4 lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                  Critical Pain Triggers
                </span>
                <ul className="space-y-2">
                  {position.targetPersona.painTriggers.map((trigger, i) => (
                    <li key={i} className="flex items-start text-xs text-slate-300">
                      <span className="text-rose-400 mr-2 flex-shrink-0">•</span>
                      <span>{trigger}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Desired Outcomes
                </span>
                <ul className="space-y-2">
                  {position.targetPersona.desiredOutcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start text-xs text-slate-300">
                      <span className="text-emerald-400 mr-2 flex-shrink-0">•</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 text-xs text-slate-300">
              <strong className="text-amber-400">Primary Buying Resistance:</strong>{' '}
              {position.targetPersona.buyingResistance}
            </div>
          </div>
        </div>
      </div>

      {/* 2D Competitive Quadrant Map */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Layers className="h-5 w-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              2D Strategic Competitive Quadrant
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Top-Right Dominance Positioning
          </span>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-6 space-y-4">
          <div className="relative mx-auto h-72 sm:h-96 max-w-2xl rounded-xl border border-white/10 bg-[#070a12] p-4 flex items-center justify-center overflow-hidden">
            {/* Axis Lines */}
            <div className="absolute inset-y-4 left-1/2 w-[1px] bg-white/10" />
            <div className="absolute inset-x-4 top-1/2 h-[1px] bg-white/10" />

            {/* Labels */}
            <span className="absolute top-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {position.competitiveQuadrant.yAxis.top}
            </span>
            <span className="absolute bottom-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {position.competitiveQuadrant.yAxis.bottom}
            </span>
            <span className="absolute left-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {position.competitiveQuadrant.xAxis.left}
            </span>
            <span className="absolute right-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {position.competitiveQuadrant.xAxis.right}
            </span>

            {/* Competitors Plotted */}
            {position.competitiveQuadrant.competitors.map((comp, idx) => {
              // Convert -100..100 coordinates to 0..100% position
              const leftPercent = 50 + comp.x * 0.42;
              const topPercent = 50 - comp.y * 0.42;
              return (
                <div
                  key={idx}
                  className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                >
                  <div className="h-3 w-3 rounded-full bg-slate-500 border border-white/20 group-hover:scale-125 transition-transform" />
                  <span className="mt-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-slate-300 whitespace-nowrap border border-white/5">
                    {comp.name}
                  </span>
                </div>
              );
            })}

            {/* Our Brand Position (Highlighted) */}
            {(() => {
              const our = position.competitiveQuadrant.ourPosition;
              const leftPercent = 50 + our.x * 0.42;
              const topPercent = 50 - our.y * 0.42;
              return (
                <div
                  className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                >
                  <div className="relative flex h-5 w-5 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-white"></span>
                  </div>
                  <span className="mt-1 rounded bg-emerald-500/20 px-2 py-0.5 text-[11px] font-bold text-emerald-300 border border-emerald-500/40 shadow-lg whitespace-nowrap">
                    ⭐ {our.name} (Our Brand)
                  </span>
                </div>
              );
            })()}
          </div>

          <p className="text-xs text-slate-400 text-center">
            {position.competitiveQuadrant.ourPosition.name} occupies the defensible top-right quadrant combining high domain integration with rapid user execution.
          </p>
        </div>
      </div>
    </div>
  );
};
