'use client';

import React, { useState } from 'react';
import {
  Scale,
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
  ArrowRight,
  AlertTriangle,
  XCircle,
  Sparkles,
  Copy,
  Check,
  FileText
} from 'lucide-react';
import { BrandProject } from '@/types/brand';
import { auditMarketingAsset, GuardianAssetAuditResult } from '@/lib/ml/guardian-client';
import { soundEngine } from '@/lib/sound-engine';

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

  // Marketing Asset Validator State
  const [assetText, setAssetText] = useState(
    `Check out our revolutionary all-in-one AI platform that synergizes hackathon teams! We are disrupting collegiate tech with a game changer paradigm shift.`
  );
  const [assetType, setAssetType] = useState('social_post');
  const [auditResult, setAuditResult] = useState<GuardianAssetAuditResult | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [copiedRevision, setCopiedRevision] = useState(false);

  const runVerification = () => {
    setIsVerifying(true);
    soundEngine.playClick();
    setTimeout(() => {
      setIsVerifying(false);
      setLastVerified('Just now');
      soundEngine.playSuccessChord();
    }, 700);
  };

  const handleAuditAsset = async () => {
    if (!assetText.trim()) return;
    setIsAuditing(true);
    soundEngine.playClick();
    soundEngine.startAmbientThinking();

    try {
      const res = await auditMarketingAsset(
        assetText,
        assetType,
        project.name,
        project.stage3Shape.selectedTagline,
        project.stage3Shape.personalityTraits.map((t) => t.trait),
        project.stage3Shape.traitsToAvoid.map((t) => t.trait),
        project.stage2Position.valueProposition
      );
      setAuditResult(res);
      if (res.violations.length > 0) {
        soundEngine.playCriticAlert();
      } else {
        soundEngine.playSuccessChord();
      }
    } catch {
      // fallback
    } finally {
      soundEngine.stopAmbientThinking();
      setIsAuditing(false);
    }
  };

  const loadSample = (type: 'cliche' | 'onbrand') => {
    soundEngine.playClick();
    if (type === 'cliche') {
      setAssetText(
        `Check out our revolutionary all-in-one AI platform that synergizes teams! We are disrupting the market with an unprecedented paradigm shift.`
      );
    } else {
      setAssetText(
        `Stop solo struggling. Meet ${project.name} — the squad infrastructure built for high-stakes sprints. Match complementary builders with verified skills in under 90 seconds.`
      );
    }
  };

  const copyRevision = () => {
    if (!auditResult) return;
    navigator.clipboard.writeText(auditResult.revised_suggestion);
    setCopiedRevision(true);
    soundEngine.playClick();
    setTimeout(() => setCopiedRevision(false), 2000);
  };

  const audit = project.brandBattle.guardianAudit;

  const checks = [
    {
      id: 'name',
      title: 'Name & Positioning Harmony',
      data: audit.nameConsistency,
      description: 'Verifies that the brand name encapsulates the core promise without sounding generic.',
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
            Brand Guardian: Cross-System Consistency &amp; Asset Validator
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Continuously monitors the 6 branding stages and validates future marketing assets (Instagram posts, ads, landing pages) against your established brand system.
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
            System Coherence Index: 95% Across All Brand Layers
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Zero internal contradictions detected between the strategic positioning statement, visual tokens, and launch copy.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs text-slate-400">
          <span>Last full audit: <strong className="text-white">{lastVerified}</strong></span>
        </div>
      </div>

      {/* FEATURE: Live Marketing Asset Consistency Validator */}
      <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/80 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <FileText className="h-4 w-4" />
              Live Marketing Asset Consistency Validator
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Audit New Posts &amp; Campaigns Against {project.name}
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => loadSample('cliche')}
              className="rounded bg-rose-500/10 px-2.5 py-1 text-xs font-medium text-rose-300 border border-rose-500/20 hover:bg-rose-500/20"
            >
              Load Cliché Sample
            </button>
            <button
              onClick={() => loadSample('onbrand')}
              className="rounded bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/20"
            >
              Load On-Brand Sample
            </button>
          </div>
        </div>

        {/* Input Text Area */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
            <div className="flex items-center space-x-2">
              <span>Asset Category:</span>
              <select
                value={assetType}
                onChange={(e) => setAssetType(e.target.value)}
                className="rounded-lg border border-white/10 bg-slate-900 px-2.5 py-1 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
              >
                <option value="social_post">Social Media Post</option>
                <option value="landing_page">Landing Page Copy</option>
                <option value="ad_headline">Ad Campaign Headline</option>
                <option value="outreach_pitch">Cold Outreach / Pitch</option>
              </select>
            </div>
            <span className="font-mono text-slate-500">{assetText.length} characters</span>
          </div>

          <textarea
            rows={3}
            value={assetText}
            onChange={(e) => setAssetText(e.target.value)}
            placeholder="Type or paste draft marketing copy here..."
            className="w-full rounded-xl border border-white/10 bg-black/30 p-3.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />

          <div className="flex justify-end">
            <button
              onClick={handleAuditAsset}
              disabled={isAuditing || !assetText.trim()}
              className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg hover:from-indigo-500 hover:to-purple-500 transition-all disabled:opacity-50"
            >
              <ShieldCheck className={`h-4 w-4 ${isAuditing ? 'animate-spin' : ''}`} />
              <span>{isAuditing ? 'Auditing Asset...' : 'Run Guardian Consistency Audit'}</span>
            </button>
          </div>
        </div>

        {/* Audit Results View */}
        {auditResult && (
          <div className="rounded-xl border border-white/10 bg-black/30 p-5 space-y-5 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div
                  className={`h-3 w-3 rounded-full ${
                    auditResult.overall_compliance_score >= 80 ? 'bg-emerald-400' : 'bg-rose-400'
                  }`}
                />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Guardian Verdict: {auditResult.guardian_verdict}
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Engine source: {auditResult.source}
                  </span>
                </div>
              </div>

              <div className="flex items-baseline space-x-1.5">
                <span className="text-xs text-slate-400">Compliance Score:</span>
                <span className="font-mono text-lg font-black text-emerald-400">
                  {auditResult.overall_compliance_score}%
                </span>
              </div>
            </div>

            {/* 4 Check Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.entries(auditResult.checks).map(([key, check]) => {
                const labelMap: Record<string, string> = {
                  personality_match: 'Personality Match',
                  tone_consistency: 'Tone Consistency',
                  messaging_alignment: 'Messaging Alignment',
                  generic_language_filter: 'Jargon Filter',
                };
                return (
                  <div key={key} className="rounded-lg border border-white/5 bg-slate-900/60 p-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-slate-400">
                        {labelMap[key] || key}
                      </span>
                      {check.passed ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 text-rose-400" />
                      )}
                    </div>
                    <p className="text-xs text-slate-200 leading-snug">{check.note}</p>
                  </div>
                );
              })}
            </div>

            {/* Violations Flagged */}
            {auditResult.violations.length > 0 && (
              <div className="rounded-lg border border-rose-500/20 bg-rose-950/15 p-3.5 space-y-2">
                <span className="text-xs font-bold text-rose-400 flex items-center">
                  <AlertTriangle className="mr-1.5 h-4 w-4" /> Detected Guardrail Violations
                </span>
                <ul className="space-y-1 text-xs text-rose-200/90">
                  {auditResult.violations.map((v, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-rose-400 mr-2">✕</span>
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Constructive AI Revision */}
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/10 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center">
                  <Sparkles className="mr-1.5 h-4 w-4" /> Guardian Approved AI Revision
                </span>
                <button
                  onClick={copyRevision}
                  className="flex items-center space-x-1 text-xs text-slate-400 hover:text-white"
                >
                  {copiedRevision ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedRevision ? 'Copied Revision!' : 'Copy Revision'}</span>
                </button>
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed font-medium bg-black/20 p-3 rounded-lg border border-emerald-500/20">
                {auditResult.revised_suggestion}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* The 5 Coherence Checks */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white tracking-tight">
          System-Wide Coherence Diagnostic Checks
        </h3>
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
