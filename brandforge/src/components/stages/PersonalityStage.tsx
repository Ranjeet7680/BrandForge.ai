'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Ban,
  CheckCircle2,
  Tag,
  MessageSquare,
  Sliders,
  Check,
  X,
  ArrowRight,
  Copy,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { Stage3Shape } from '@/types/brand';
import { soundEngine } from '@/lib/sound-engine';

interface PersonalityStageProps {
  shape: Stage3Shape;
  onUpdateSelectedName?: (name: string) => void;
  onUpdateSelectedTagline?: (tagline: string) => void;
  onProceedToNext: () => void;
}

export const PersonalityStage: React.FC<PersonalityStageProps> = ({
  shape,
  onUpdateSelectedName,
  onUpdateSelectedTagline,
  onProceedToNext,
}) => {
  const [selectedName, setSelectedName] = useState(shape.selectedBrandName);
  const [selectedTagline, setSelectedTagline] = useState(shape.selectedTagline);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [attributes, setAttributes] = useState(shape.brandVoice.attributes);

  const handleNameSelect = (name: string) => {
    soundEngine.playClick();
    setSelectedName(name);
    if (onUpdateSelectedName) onUpdateSelectedName(name);
  };

  const handleTaglineSelect = (tagline: string) => {
    soundEngine.playClick();
    setSelectedTagline(tagline);
    if (onUpdateSelectedTagline) onUpdateSelectedTagline(tagline);
  };

  const handleSliderChange = (idx: number, newVal: number) => {
    setAttributes((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], value: newVal };
      return next;
    });
    soundEngine.playTick();
  };

  const handleResetSliders = () => {
    soundEngine.playClick();
    setAttributes(shape.brandVoice.attributes);
  };

  const copyText = (text: string, key: string) => {
    soundEngine.playClick();
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
            <span className="rounded-md bg-purple-500/10 px-2.5 py-1 text-xs font-semibold text-purple-400 border border-purple-500/20">
              STAGE 03
            </span>
            <span className="text-xs text-slate-400 font-mono">
              BRAND PERSONALITY &amp; NAMING
            </span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Shape: Personality, Naming &amp; Voice
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Define 3–5 core traits, explicit anti-traits to avoid, naming territories with domain readiness, and the messaging hierarchy.
          </p>
        </div>

        <button
          onClick={onProceedToNext}
          className="flex items-center space-x-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shadow-sm self-start sm:self-auto"
        >
          <span>Proceed to Stage 4: Visualize</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Selected Identity Highlight Banner */}
      <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/30 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
            Selected Brand Identity
          </span>
          <div className="mt-1 flex items-baseline space-x-3">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              {selectedName}
            </h2>
            <span className="text-xs text-emerald-400 font-mono">
              ✓ Active Brand Name
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-300 italic">
            &ldquo;{selectedTagline}&rdquo;
          </p>
        </div>

        <button
          onClick={() => copyText(`${selectedName} — ${selectedTagline}`, 'hero-pack')}
          className="self-start md:self-center flex items-center space-x-1.5 rounded-lg border border-white/10 bg-slate-800/80 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors"
        >
          {copiedKey === 'hero-pack' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copiedKey === 'hero-pack' ? 'Copied Brand Mark!' : 'Copy Brand Header'}</span>
        </button>
      </div>

      {/* Personality Traits & Avoided Traits Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Core Personality Traits */}
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-indigo-400" />
            <h2 className="text-base font-bold text-white tracking-tight">
              3–5 Core Personality Traits
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Handbook requirement: Humanized personality attributes that guide voice and visual feel.
          </p>

          <div className="space-y-3">
            {shape.personalityTraits.map((t, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-white/5 bg-black/20 p-3.5 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-300">
                    0{idx + 1}. {t.trait}
                  </span>
                  <span className="text-[10px] rounded bg-indigo-500/10 px-2 py-0.5 text-indigo-400 font-medium">
                    Cultivate
                  </span>
                </div>
                <p className="text-xs text-slate-200 font-medium">{t.description}</p>
                <div className="text-[11px] text-slate-400 pt-1">
                  <strong className="text-slate-300">Manifestation:</strong> {t.manifestation}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explicit Traits to Avoid */}
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Ban className="h-5 w-5 text-rose-400" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Explicit Anti-Traits (What to Avoid)
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Strict behavioral boundaries to prevent brand dilution, cringe jargon, or tone-deaf copy.
          </p>

          <div className="space-y-3">
            {shape.traitsToAvoid.map((a, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-rose-500/15 bg-rose-950/10 p-3.5 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-400 flex items-center">
                    <X className="mr-1 h-3.5 w-3.5 text-rose-400" />
                    Avoid: {a.trait}
                  </span>
                  <span className="text-[10px] rounded bg-rose-500/10 px-2 py-0.5 text-rose-400 font-medium">
                    Forbidden
                  </span>
                </div>
                <p className="text-xs text-slate-300">{a.why}</p>
                <div className="text-[11px] text-amber-300 pt-1 border-t border-rose-500/10">
                  <strong>Rule of Thumb:</strong> {a.ruleOfThumb}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Naming Territories Explorer */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Tag className="h-5 w-5 text-purple-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              Brand Naming Territories &amp; Candidates
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Click any candidate name to make it the active brand name
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shape.namingTerritories.map((terr, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/10 bg-slate-900/60 p-5 space-y-3"
            >
              <div>
                <h3 className="text-sm font-bold text-purple-300">{terr.territory}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{terr.description}</p>
              </div>

              <div className="space-y-2 pt-2">
                {terr.examples.map((item, i) => {
                  const isSelected = selectedName === item.name;
                  return (
                    <div
                      key={i}
                      onClick={() => handleNameSelect(item.name)}
                      className={`cursor-pointer rounded-lg border p-3 transition-all ${
                        isSelected
                          ? 'border-purple-500/50 bg-purple-600/15 shadow-sm glow-indigo'
                          : 'border-white/5 bg-black/20 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-white">
                            {item.name}
                          </span>
                          {isSelected && (
                            <span className="flex items-center text-[10px] font-semibold text-emerald-400">
                              <CheckCircle2 className="mr-1 h-3 w-3" /> Selected
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[11px] font-mono text-indigo-300">
                            {item.domainSuggestion}
                          </span>
                          <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-slate-300">
                            {item.score}/100
                          </span>
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-slate-400">{item.rationale}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Taglines Selector */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">
            Tagline Options (Action vs Outcome vs Provocative)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {shape.taglines.map((tag, idx) => {
            const isSelected = selectedTagline === tag.text;
            return (
              <div
                key={idx}
                onClick={() => handleTaglineSelect(tag.text)}
                className={`cursor-pointer rounded-xl border p-5 space-y-3 transition-all ${
                  isSelected
                    ? 'border-indigo-500/50 bg-indigo-600/15 glow-indigo'
                    : 'border-white/10 bg-slate-900/60 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                      tag.style === 'Action'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : tag.style === 'Outcome'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    }`}
                  >
                    {tag.style} Angle
                  </span>
                  {isSelected && (
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center">
                      <Check className="mr-1 h-3 w-3" /> Active Tagline
                    </span>
                  )}
                </div>
                <p className="text-sm font-bold text-white leading-relaxed">
                  &ldquo;{tag.text}&rdquo;
                </p>
                <p className="text-xs text-slate-400">{tag.rationale}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Messaging Hierarchy (Pillars & Proof Points) */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-5 w-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">
            Messaging Hierarchy &amp; Proof Points
          </h2>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-6 space-y-4">
          <div className="pb-3 border-b border-white/10">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              High-Level Overarching Promise
            </span>
            <p className="mt-1 text-base font-bold text-white">
              {shape.messagingHierarchy.promise}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {shape.messagingHierarchy.pillars.map((pillar, i) => (
              <div key={i} className="rounded-lg border border-white/5 bg-black/20 p-4 space-y-2">
                <span className="text-xs font-bold text-indigo-300">
                  Pillar 0{i + 1}: {pillar.title}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {pillar.explanation}
                </p>
                <div className="text-[11px] text-emerald-400 pt-2 border-t border-white/5">
                  <strong>Proof Point:</strong> {pillar.proofPoint}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Voice Sliders & Dos/Don'ts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sliders */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sliders className="h-5 w-5 text-indigo-400" />
              <h2 className="text-base font-bold text-white tracking-tight">
                Brand Voice Sliders
              </h2>
            </div>
            <button
              onClick={handleResetSliders}
              className="flex items-center space-x-1 text-[11px] font-medium text-slate-400 hover:text-indigo-300 transition-colors"
              title="Reset to default voice settings"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>

          <p className="text-xs text-slate-400">
            Drag sliders to tune the brand&apos;s personality spectrum in real time.
          </p>

          <div className="space-y-3 pt-1">
            {attributes.map((attr, idx) => (
              <div key={idx} className="space-y-2 rounded-xl bg-black/20 border border-white/5 p-3">
                <div className="flex justify-between items-center text-xs font-medium">
                  <span className="text-slate-300 font-semibold">{attr.leftLabel}</span>
                  <span className="font-mono text-xs rounded-full bg-indigo-500/20 px-2 py-0.5 text-indigo-300 font-bold border border-indigo-500/30">
                    {attr.value}%
                  </span>
                  <span className="text-slate-300 font-semibold">{attr.rightLabel}</span>
                </div>
                <div className="relative flex items-center">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={attr.value}
                    onChange={(e) => handleSliderChange(idx, Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dos and Don'ts */}
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-6 space-y-4">
          <h2 className="text-base font-bold text-white tracking-tight">
            Editorial Do’s &amp; Don’ts
          </h2>

          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center mb-2">
                <Check className="mr-1 h-3.5 w-3.5 text-emerald-400" /> What We Always Do
              </span>
              <ul className="space-y-1.5">
                {shape.brandVoice.dos.map((d, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start">
                    <span className="text-emerald-400 mr-2">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-white/5">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center mb-2">
                <X className="mr-1 h-3.5 w-3.5 text-rose-400" /> What We Never Do
              </span>
              <ul className="space-y-1.5">
                {shape.brandVoice.donts.map((d, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start">
                    <span className="text-rose-400 mr-2">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
