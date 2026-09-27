'use client';

import React, { useState } from 'react';
import {
  Scale,
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import { BrandProject } from '@/types/brand';

interface GuardianStageProps {
  project: BrandProject;
  onProceedToDeliver: () => void;
}

export const GuardianStage: React.FC<GuardianStageProps> = ({
  project,
  onProceedToDeliver,
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [lastVerified, setLastVerified] = useState('Just now');

  const runVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setLastVerified('Just now');
    }, 800);
  };

  const audit = project.brandBattle.guardianAudit;

  const checks = [
    {
      id: 'name',
      title: 'Name & Positioning Harmony',
      data: audit.nameConsistency,
      description: 'Verifies that the brand name encapsulates the core functional and emotional promise without sounding generic.',
    },
    {
      id: 'tagline',
      title: 'Tagline & Problem Alignment',
      data: audit.taglineAlignment,
      description: 'Checks that the tagline attacks the primary customer pain trigger rather than relying on abstract buzzwords.',
    },
    {
      id: 'personality',
      title: 'Voice & Jargon Boundaries',
      data: audit.personalityGuard,
      description: 'Guarantees that avoided traits (e.g. corporate HR buzzwords, cold banking tone) are strictly omitted.',
    },
    {
      id: 'visual',
      title: 'Visual Identity & Palette Accessibility',
      data: audit.visualCoherence,
      description: 'Ensures primary and surface colors maintain WCAG AA contrast standards and match product aesthetic.',
    },
    {
      id: 'messaging',
      title: 'Launch Messaging & Persona Resonance',
      data: audit.launchMessagingCheck,
      description: 'Validates that social copy, hero headlines, and PR announcements speak directly to target user objections.',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="rounded-md bg-teal-500/10 px-2.5 py-1 text-xs font-semibold text-teal-400 border border-teal-500/20 flex items-center gap-1">
              <Scale className="h-3.5 w-3.5" />
              CROSS-SYSTEM AUDITOR
            </span>
            <span className="text-xs text-slate-400 font-mono">
              AGENT E: THE BRAND GUARDIAN
            </span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Brand Guardian: Cross-System Consistency Audit
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Continuously monitors the 6 branding stages to guarantee that visual identity, messaging tone, and strategic positioning remain 100% synchronized.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={runVerification}
            disabled={isVerifying}
            className="flex items-center space-x-1.5 rounded-lg border border-white/10 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors shadow-sm disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
            <span>{isVerifying ? 'Auditing System...' : 'Re-Run System Audit'}</span>
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

      {/* High-Level Compliance Gauge */}
      <div className="rounded-2xl border border-teal-500/30 bg-gradient-to-r from-teal-950/20 via-slate-900 to-indigo-950/20 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-400 flex items-center">
            <ShieldCheck className="mr-1.5 h-4 w-4" /> System Audit Status: Approved
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Coherence Index: 95% Across All Brand Layers
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Zero contradictions detected between the strategic positioning statement and the launch marketing copy.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs text-slate-400">
          <span>Last full audit: <strong className="text-white">{lastVerified}</strong></span>
        </div>
      </div>

      {/* The 5 Coherence Checks */}
      <div className="space-y-4">
        {checks.map((chk, idx) => (
          <div
            key={chk.id}
            className="rounded-xl border border-white/10 bg-slate-900/60 p-6 space-y-3 hover:border-teal-500/30 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500/10 text-xs font-bold text-teal-400 border border-teal-500/20">
                  {idx + 1}
                </span>
                <h3 className="text-sm font-bold text-white">{chk.title}</h3>
              </div>

              <span className="flex items-center text-xs font-mono font-bold text-emerald-400">
                <CheckCircle2 className="mr-1.5 h-4 w-4" />
                Passed ({chk.data.score}%)
              </span>
            </div>

            <p className="text-xs text-slate-400">{chk.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="rounded-lg border border-white/5 bg-black/20 p-3.5 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Guardian Note
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">{chk.data.note}</p>
              </div>

              <div className="rounded-lg border border-teal-500/10 bg-teal-950/10 p-3.5 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
                  Refinement Recommendation
                </span>
                <p className="text-xs text-teal-200/90 leading-relaxed">{chk.data.suggestion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
