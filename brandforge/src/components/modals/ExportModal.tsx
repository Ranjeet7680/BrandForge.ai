'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  Copy,
  Check,
  Printer,
  FileCode,
  BookOpen
} from 'lucide-react';
import { BrandProject } from '@/types/brand';
import { soundEngine } from '@/lib/sound-engine';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: BrandProject;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const [copiedType, setCopiedType] = useState<'json' | 'md' | null>(null);

  if (!isOpen) return null;

  const downloadJson = () => {
    soundEngine.playClick();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(project, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `${project.name.toLowerCase()}-brand-system.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copyJson = () => {
    soundEngine.playClick();
    navigator.clipboard.writeText(JSON.stringify(project, null, 2));
    setCopiedType('json');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const generateMarkdownBook = (): string => {
    const p = project;
    return `# ${p.name} — Brand Identity & Guidelines Book
Generated with BrandForge.ai Autonomous Agent Council

## 1. Executive Summary
- **Brand Name:** ${p.name}
- **One-Line Pitch:** ${p.stage3Shape.oneLinePitch}
- **Tagline:** ${p.stage3Shape.selectedTagline}
- **Target Audience:** ${p.rawInput.targetMarket}
- **Core Problem Solved:** ${p.rawInput.existingProblem}

---

## 2. Strategic Positioning
- **Target Persona:** ${p.stage2Position.targetPersona.name} (${p.stage2Position.targetPersona.role})
  - Age Range: ${p.stage2Position.targetPersona.ageRange}
  - Pain Triggers: ${p.stage2Position.targetPersona.painTriggers.join(', ')}
  - Desired Outcomes: ${p.stage2Position.targetPersona.desiredOutcomes.join(', ')}
- **Positioning Statement:** ${p.stage2Position.positioningStatement}
- **Category:** ${p.stage2Position.categoryDefinition}
- **Differentiator:** ${p.stage2Position.differentiator}
- **Unique Selling Proposition:** ${p.stage2Position.uniqueSellingProposition}

---

## 3. Brand Personality & Tone of Voice
- **Overarching Promise:** ${p.stage3Shape.messagingHierarchy.promise}

### Core Personality Traits:
${p.stage3Shape.personalityTraits.map((t, i) => `${i + 1}. **${t.trait}:** ${t.description} (Manifestation: ${t.manifestation})`).join('\n')}

### Strict Anti-Traits (What We Avoid):
${p.stage3Shape.traitsToAvoid.map((a, i) => `${i + 1}. **Avoid ${a.trait}:** ${a.why} (Rule: ${a.ruleOfThumb})`).join('\n')}

### Editorial Do's:
${p.stage3Shape.brandVoice.dos.map(d => `- ${d}`).join('\n')}

### Editorial Don'ts:
${p.stage3Shape.brandVoice.donts.map(d => `- ${d}`).join('\n')}

---

## 4. Visual Identity Tokens
- **Color Palette:**
${p.stage4Visualize.colorPalette.map(c => `  - **${c.name}** (${c.role}): \`${c.hex}\` (Psychology: ${c.psychology})`).join('\n')}

- **Typography System:**
  - Headline Font: ${p.stage4Visualize.typography.headlineFont}
  - Body Font: ${p.stage4Visualize.typography.bodyFont}
  - Accent Font: ${p.stage4Visualize.typography.accentFont}
  - Pairing Rationale: ${p.stage4Visualize.typography.rationale}

---

## 5. Agent Council Audit Score
- **Overall Brand Health:** ${p.stage5Critic.overallHealthScore}/100
- **Auditor Critiques Count:** ${p.stage5Critic.critiquePoints.length} audits logged
- **Radar Scores:** Distinctiveness: ${p.stage5Critic.radarScores.distinctiveness} | Audience Fit: ${p.stage5Critic.radarScores.audienceFit} | Memorability: ${p.stage5Critic.radarScores.memorability} | Scalability: ${p.stage5Critic.radarScores.scalability} | Consistency: ${p.stage5Critic.radarScores.consistency}

---

## 6. Launch Kit Assets
- **Headline:** ${p.stage6LaunchKit.marketingAssets.landingHeadline}
- **Subheadline:** ${p.stage6LaunchKit.marketingAssets.landingSubheadline}
- **Hero Copy:** ${p.stage6LaunchKit.marketingAssets.heroCopy}
- **LinkedIn Post Hook:** ${p.stage6LaunchKit.marketingAssets.linkedInPost.hook}
- **Official Launch Announcement:** ${p.stage6LaunchKit.marketingAssets.launchAnnouncement}

*Exported on ${new Date().toLocaleDateString()} via BrandForge AI*
`;
  };

  const downloadMarkdown = () => {
    soundEngine.playSuccessChord();
    const md = generateMarkdownBook();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name.toLowerCase()}-brand-book.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyMarkdown = () => {
    soundEngine.playClick();
    navigator.clipboard.writeText(generateMarkdownBook());
    setCopiedType('md');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handlePrint = () => {
    soundEngine.playClick();
    onClose();
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 28, stiffness: 380 }}
          className="relative w-full max-w-lg rounded-[28px] border border-white/15 bg-[#0e1322]/95 p-6 shadow-2xl backdrop-blur-2xl space-y-5"
        >
          {/* iOS Grabber */}
          <div className="ios-grabber" />

          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 shadow-md">
                <Download className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">
                  Export Brand System
                </h2>
                <p className="text-xs text-slate-400">
                  Production-grade artifacts and brand book formats.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Export Options */}
          <div className="space-y-3">
            {/* Markdown Brand Book (NEW HIGHLIGHT) */}
            <div className="rounded-2xl border border-purple-500/30 bg-purple-950/20 p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <BookOpen className="h-4 w-4 text-purple-400" />
                  <span className="text-xs font-bold text-white">Full Brand Guidelines Book</span>
                </div>
                <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] font-mono text-purple-300 border border-purple-500/30">
                  .md Book
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Complete structured handbook including strategy, positioning, voice guidelines, tokens, and social bios.
              </p>
              <div className="flex items-center space-x-2 pt-1">
                <button
                  onClick={downloadMarkdown}
                  className="flex-1 flex items-center justify-center space-x-1.5 rounded-xl bg-purple-600 px-3 py-2 text-xs font-semibold text-white hover:bg-purple-500 transition-colors shadow-md"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download .MD</span>
                </button>
                <button
                  onClick={copyMarkdown}
                  className="flex items-center space-x-1.5 rounded-xl border border-white/10 bg-slate-800/80 px-3.5 py-2 text-xs font-medium text-slate-200 hover:text-white transition-colors"
                >
                  {copiedType === 'md' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedType === 'md' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* JSON Option */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <FileCode className="h-4 w-4 text-indigo-400" />
                  <span className="text-xs font-bold text-white">Complete JSON Schema</span>
                </div>
                <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-mono text-indigo-300 border border-indigo-500/20">
                  .json
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Contains all 6 stages, token values, debate transcripts, and critic audits for programmatic consumption.
              </p>
              <div className="flex items-center space-x-2 pt-1">
                <button
                  onClick={downloadJson}
                  className="flex-1 flex items-center justify-center space-x-1.5 rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shadow-md"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download .JSON</span>
                </button>
                <button
                  onClick={copyJson}
                  className="flex items-center space-x-1.5 rounded-xl border border-white/10 bg-slate-800/80 px-3.5 py-2 text-xs font-medium text-slate-200 hover:text-white transition-colors"
                >
                  {copiedType === 'json' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedType === 'json' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Printable Style Guide */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <Printer className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white">Print / Save as PDF</span>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-300 border border-emerald-500/20">
                  .pdf
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Formats the entire Brand Launch Kit into a clean, presentation-ready print document.
              </p>
              <button
                onClick={handlePrint}
                className="w-full flex items-center justify-center space-x-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-colors shadow-md"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Open Print / PDF Dialog</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="rounded-xl px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
