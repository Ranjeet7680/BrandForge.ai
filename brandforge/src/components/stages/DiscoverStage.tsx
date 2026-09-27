'use client';

import React from 'react';
import {
  Compass,
  AlertCircle,
  Users,
  HeartCrack,
  Briefcase,
  HelpCircle,
  Copy,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { Stage1Discover } from '@/types/brand';

interface DiscoverStageProps {
  discover: Stage1Discover;
  rawIdea: string;
  targetMarket: string;
  onProceedToNext: () => void;
}

export const DiscoverStage: React.FC<DiscoverStageProps> = ({
  discover,
  rawIdea,
  targetMarket,
  onProceedToNext,
}) => {
  const [copiedItem, setCopiedItem] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20">
              STAGE 01
            </span>
            <span className="text-xs text-slate-400 font-mono">
              PROBLEM &gt; SOLUTION FIT INTELLIGENCE
            </span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Discover: Idea Intelligence
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            The Inkloom Handbook emphasizes: <em>Understand the problem before branding</em>. Here we deconstruct root friction, JTBDs, and risky assumptions.
          </p>
        </div>

        <button
          onClick={onProceedToNext}
          className="flex items-center space-x-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shadow-sm self-start sm:self-auto"
        >
          <span>Proceed to Stage 2: Position</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Raw Idea vs Deconstructed Problem */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Raw Idea Card */}
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
            <span className="flex items-center text-indigo-400">
              <Compass className="mr-1.5 h-4 w-4" />
              Original Founder Input
            </span>
            <span className="text-[10px] rounded bg-white/5 px-2 py-0.5 text-slate-400">
              Raw Seed
            </span>
          </div>
          <p className="text-sm font-medium text-slate-200 leading-relaxed italic bg-black/20 p-3 rounded-lg border border-white/5">
            &ldquo;{rawIdea}&rdquo;
          </p>
          <div className="text-xs text-slate-400 pt-1">
            <strong className="text-slate-300">Initial Market Target:</strong> {targetMarket}
          </div>
        </div>

        {/* Extracted Core Problem */}
        <div className="rounded-xl border border-blue-500/20 bg-blue-950/20 p-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-blue-400">
            <span className="flex items-center">
              <AlertCircle className="mr-1.5 h-4 w-4 text-blue-400" />
              AI Extracted Core Problem
            </span>
            <button
              onClick={() => copyToClipboard(discover.coreProblem, 'core-prob')}
              className="text-[10px] text-slate-400 hover:text-white flex items-center"
            >
              <Copy className="mr-1 h-3 w-3" />
              {copiedItem === 'core-prob' ? 'Copied' : 'Copy'}
            </button>
          </div>
          <p className="text-sm font-semibold text-white leading-relaxed bg-blue-900/30 p-3 rounded-lg border border-blue-500/20">
            {discover.coreProblem}
          </p>
          <p className="text-xs text-blue-200/70">
            Validated against market friction benchmarks to prevent solving non-existent problems.
          </p>
        </div>
      </div>

      {/* Target User Micro-Segments */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">
            Target User Micro-Segments
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {discover.targetUsers.map((user, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/10 bg-slate-900/60 p-5 space-y-3 hover:border-indigo-500/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-indigo-500/10 px-2 py-0.5 text-[11px] font-semibold text-indigo-400">
                  Segment 0{idx + 1}
                </span>
                <span className="text-xs font-mono font-medium text-amber-400 flex items-center">
                  Pain Level: {user.painLevel}/10
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">{user.name}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {user.description}
              </p>
              {/* Pain Meter */}
              <div className="pt-2">
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full"
                    style={{ width: `${user.painLevel * 10}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Three Pillars of User Pain Points */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <HeartCrack className="h-5 w-5 text-rose-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">
            User Pain Points Decomposition
          </h2>
          <span className="text-xs text-slate-400">(Functional vs Emotional vs Financial)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Functional Pain */}
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-400 pb-2 border-b border-white/5">
              <span>⚙️ Functional Pain</span>
            </div>
            <ul className="space-y-2.5">
              {discover.userPainPoints.functional.map((pt, i) => (
                <li key={i} className="flex items-start text-xs text-slate-300 leading-relaxed">
                  <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Emotional Pain */}
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-rose-400 pb-2 border-b border-white/5">
              <span>❤️ Emotional Pain</span>
            </div>
            <ul className="space-y-2.5">
              {discover.userPainPoints.emotional.map((pt, i) => (
                <li key={i} className="flex items-start text-xs text-slate-300 leading-relaxed">
                  <span className="text-rose-400 mr-2 flex-shrink-0">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Financial / Resource Pain */}
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400 pb-2 border-b border-white/5">
              <span>💰 Financial & Opportunity Cost</span>
            </div>
            <ul className="space-y-2.5">
              {discover.userPainPoints.financial.map((pt, i) => (
                <li key={i} className="flex items-start text-xs text-slate-300 leading-relaxed">
                  <span className="text-emerald-400 mr-2 flex-shrink-0">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Jobs-To-Be-Done Matrix */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Briefcase className="h-5 w-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">
            Jobs-To-Be-Done (JTBD) Matrix
          </h2>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-900/60 divide-y divide-white/5 overflow-hidden">
          {discover.jobsToBeDone.map((job, idx) => (
            <div key={idx} className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                  Functional Job
                </span>
                <p className="mt-1 text-xs text-slate-200 leading-relaxed font-medium">
                  {job.functional}
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                  Emotional Job
                </span>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  {job.emotional}
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Social Job
                </span>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  {job.social}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Existing Assumptions & Risk Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5 space-y-4">
          <div className="flex items-center space-x-2 text-white font-bold text-base">
            <ShieldAlert className="h-4 w-4 text-amber-400" />
            <span>Risky Assumptions & Validation Approach</span>
          </div>

          <div className="space-y-3">
            {discover.existingAssumptions.map((item, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-white/5 bg-black/20 p-3.5 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">
                    Assumption #{idx + 1}
                  </span>
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                      item.riskLevel === 'High'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        : item.riskLevel === 'Medium'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}
                  >
                    {item.riskLevel} Risk
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">{item.assumption}</p>
                <div className="text-[11px] text-indigo-300 pt-1 border-t border-white/5">
                  <strong>Validation:</strong> {item.validationApproach}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unanswered Discovery Questions */}
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5 space-y-4">
          <div className="flex items-center space-x-2 text-white font-bold text-base">
            <HelpCircle className="h-4 w-4 text-purple-400" />
            <span>Customer Discovery Probes (Unanswered Questions)</span>
          </div>
          <p className="text-xs text-slate-400">
            Critical customer interview questions to ask prospective users before writing code or spending marketing dollars:
          </p>

          <div className="space-y-2.5">
            {discover.unansweredQuestions.map((q, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-3 rounded-lg border border-white/5 bg-black/20 p-3 text-xs text-slate-200"
              >
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-[10px] font-bold text-purple-400 border border-purple-500/20">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{q}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
