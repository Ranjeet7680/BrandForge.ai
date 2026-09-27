'use client';

import React, { useState } from 'react';
import {
  Flame,
  Scale,
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2
} from 'lucide-react';
import { BrandBattleData } from '@/types/brand';

interface BrandBattleStageProps {
  battleData: BrandBattleData;
  brandName: string;
  onProceedToDeliver: () => void;
}

export const BrandBattleStage: React.FC<BrandBattleStageProps> = ({
  battleData,
  brandName,
  onProceedToDeliver,
}) => {
  const [activeRound, setActiveRound] = useState<number>(battleData.debateRounds.length);
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateDebate = () => {
    setIsSimulating(true);
    setActiveRound(1);
    let current = 1;
    const interval = setInterval(() => {
      current++;
      if (current <= battleData.debateRounds.length) {
        setActiveRound(current);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 700);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="rounded-md bg-purple-500/10 px-2.5 py-1 text-xs font-semibold text-purple-400 border border-purple-500/20 flex items-center gap-1">
              <Flame className="h-3.5 w-3.5" />
              SPECIAL FEATURE: BRAND BATTLE
            </span>
            <span className="text-xs text-slate-400 font-mono">
              MULTI-AGENT ADVERSARIAL COUNCIL
            </span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Brand Battle Arena: 5 AI Agents Debate {brandName}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Watch the Strategist, Creative Director, Target Customer, Critic, and Guardian challenge assumptions in an autonomous debate loop before synthesis.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={simulateDebate}
            disabled={isSimulating}
            className="flex items-center space-x-1.5 rounded-lg border border-purple-500/40 bg-purple-500/20 px-3.5 py-2 text-xs font-semibold text-purple-200 hover:bg-purple-500/30 transition-colors shadow-sm disabled:opacity-50"
          >
            <Play className={`h-3.5 w-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Debate in Progress...' : 'Replay Agent Debate'}</span>
          </button>
          <button
            onClick={onProceedToDeliver}
            className="flex items-center space-x-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shadow-sm"
          >
            <span>Proceed to Launch Kit</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* The 5 Council Agents Cards */}
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          The 5 Autonomous Council Members
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {battleData.agents.map((agent) => (
            <div
              key={agent.id}
              className="rounded-xl border border-white/10 bg-slate-900/60 p-4 space-y-2 hover:border-purple-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{agent.avatar}</span>
                  <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-purple-300 border border-purple-500/20">
                    {agent.badge}
                  </span>
                </div>
                <h3 className="mt-2 text-sm font-bold text-white">{agent.name}</h3>
                <p className="text-[11px] text-indigo-400 font-medium">{agent.role}</p>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-white/5">
                <strong>Stance:</strong> {agent.stance}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Live Debate Arena Transcript */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Flame className="h-5 w-5 text-rose-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              Arena Transcript: Multi-Agent Debate Rounds
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Showing Rounds 1 to {activeRound} of {battleData.debateRounds.length}
          </span>
        </div>

        <div className="space-y-4">
          {battleData.debateRounds.slice(0, activeRound).map((round) => (
            <div
              key={round.round}
              className="rounded-xl border border-white/10 bg-slate-900/70 p-5 space-y-3 animate-fadeIn transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{round.avatar}</span>
                  <div>
                    <h3 className="text-sm font-bold text-white">{round.speaker}</h3>
                    <span className="text-[11px] text-purple-400 font-medium">
                      {round.agentRole}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {round.critiqueOf && (
                    <span className="rounded bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold text-rose-400 border border-rose-500/20">
                      Challenging: {round.critiqueOf}
                    </span>
                  )}
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400">
                    Round 0{round.round}
                  </span>
                </div>
              </div>

              <blockquote className="text-xs sm:text-sm text-slate-200 leading-relaxed italic bg-black/20 p-3 rounded-lg border border-white/5">
                &ldquo;{round.statement}&rdquo;
              </blockquote>

              <div className="text-xs text-emerald-400 font-medium pt-1">
                <strong>Recommendation:</strong> {round.recommendation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Guardian Consistency Matrix */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Scale className="h-5 w-5 text-teal-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">
            Agent E (The Brand Guardian) — System Coherence Audit
          </h2>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(battleData.guardianAudit).map(([key, check]) => {
              const labelMap: Record<string, string> = {
                nameConsistency: 'Name & Personality Alignment',
                taglineAlignment: 'Tagline & Pain Point Match',
                personalityGuard: 'Tone & Jargon Boundaries',
                visualCoherence: 'Visual & Dark Mode Palette',
                launchMessagingCheck: 'Launch Marketing Resonance',
              };

              return (
                <div
                  key={key}
                  className="rounded-lg border border-white/5 bg-black/25 p-4 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">
                      {labelMap[key] || key}
                    </span>
                    <span className="flex items-center font-mono text-emerald-400 font-semibold">
                      <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                      {check.score}%
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{check.note}</p>
                  <div className="text-[11px] text-indigo-300 pt-2 border-t border-white/5">
                    <strong>Tweak:</strong> {check.suggestion}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Brand Orchestrator Final Synthesis */}
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/20 via-slate-900 to-indigo-950/20 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center">
            <Sparkles className="mr-1.5 h-4 w-4" /> Final Orchestrator Verdict
          </span>
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/20">
            Debate Consensus Reached
          </span>
        </div>

        <p className="text-base font-bold text-white">
          {battleData.orchestratorSynthesis.verdict}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase text-indigo-300">
              Consensus Pillars
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {battleData.orchestratorSynthesis.consensusPillars.map((p, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-indigo-400 mr-2">✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase text-emerald-300">
              Actionable Council Tweaks
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {battleData.orchestratorSynthesis.actionableTweaks.map((t, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-emerald-400 mr-2">✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
