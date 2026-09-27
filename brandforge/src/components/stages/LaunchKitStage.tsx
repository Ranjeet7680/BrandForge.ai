'use client';

import React, { useState, useEffect } from 'react';
import {
  PackageCheck,
  Copy,
  Check,
  Download,
  Printer,
  Sparkles,
  Share2,
  FileText,
  Palette,
  Target
} from 'lucide-react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
import confetti from 'canvas-confetti';
import { BrandProject } from '@/types/brand';

interface LaunchKitStageProps {
  project: BrandProject;
  onOpenExportModal: () => void;
}

export const LaunchKitStage: React.FC<LaunchKitStageProps> = ({
  project,
  onOpenExportModal,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'marketing' | 'strategy' | 'identity' | 'visual'>('marketing');

  const kit = project.stage6LaunchKit;

  useEffect(() => {
    // Launch celebratory confetti when user reaches the deliver stage
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#6366F1', '#10B981', '#F59E0B', '#EC4899']
      });
    } catch {
      // Ignore if window context issues
    }
  }, []);

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const downloadMarkdown = () => {
    const mdContent = `# ${project.name} — Brand Launch Book
Generated with BrandForge AI (Inkloom Edition)

## 1. Brand Strategy
- **Brand Name:** ${kit.brandStrategySummary.brandName}
- **Category:** ${kit.brandStrategySummary.category}
- **Mission:** ${kit.brandStrategySummary.mission}
- **Vision:** ${kit.brandStrategySummary.vision}
- **Target Audience:** ${kit.brandStrategySummary.targetAudience}
- **Core Problem:** ${kit.brandStrategySummary.problem}
- **Value Proposition:** ${kit.brandStrategySummary.valueProposition}
- **Positioning Statement:** ${kit.brandStrategySummary.positioning}

## 2. Brand Identity & Personality
- **Tagline:** ${kit.brandIdentitySummary.tagline}
- **One-Line Pitch:** ${kit.brandIdentitySummary.oneLinePitch}
- **Naming Rationale:** ${kit.brandIdentitySummary.namingRationale}
- **Personality Traits:** ${kit.brandIdentitySummary.personality.join(', ')}
- **Tone of Voice:** ${kit.brandIdentitySummary.toneOfVoice.join(', ')}
- **Brand Principles:**
${kit.brandIdentitySummary.principles.map(p => `  - ${p}`).join('\n')}

## 3. Visual System
- **Logo Concept:** ${kit.visualSystemSummary.logoDirection}
- **Headline Font:** ${kit.visualSystemSummary.typography.headline}
- **Body Font:** ${kit.visualSystemSummary.typography.body}
- **Visual Mood:** ${kit.visualSystemSummary.visualMood}
- **Color Palette:**
${kit.visualSystemSummary.colorPalette.map(c => `  - ${c.name} (${c.role}): ${c.hex}`).join('\n')}

## 4. Marketing Launch Assets
### Landing Page
- **Headline:** ${kit.marketingAssets.landingHeadline}
- **Subheadline:** ${kit.marketingAssets.landingSubheadline}
- **Hero Copy:** ${kit.marketingAssets.heroCopy}
- **Product Description:** ${kit.marketingAssets.productDescription}
- **Primary CTA:** ${kit.marketingAssets.primaryCta}
- **Secondary CTA:** ${kit.marketingAssets.secondaryCta}

### Feature Pillars
${kit.marketingAssets.bulletFeatures.map(f => `- **${f.title}:** ${f.desc}`).join('\n')}

### Social Campaigns
#### Instagram Post
${kit.marketingAssets.instagramPost.caption}
Hashtags: ${kit.marketingAssets.instagramPost.hashtags.join(' ')}

#### LinkedIn Post
${kit.marketingAssets.linkedInPost.hook}

${kit.marketingAssets.linkedInPost.body}

CTA: ${kit.marketingAssets.linkedInPost.cta}

#### X/Twitter Viral Thread
${kit.marketingAssets.twitterThread.join('\n\n')}

#### Official Launch Announcement
${kit.marketingAssets.launchAnnouncement}
`;

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name.toLowerCase()}-brand-launch-kit.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <PackageCheck className="h-3.5 w-3.5" />
              STAGE 06 — FINAL DELIVERABLE
            </span>
            <span className="text-xs text-slate-400 font-mono">
              PRODUCTION LAUNCH KIT
            </span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Deliver: Complete Brand Launch Kit
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            A cohesive brand system ready for market: Strategy, Identity, Visual tokens, and High-converting marketing copy.
          </p>
        </div>

        {/* Global Export Buttons */}
        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={downloadMarkdown}
            className="flex items-center space-x-1.5 rounded-lg border border-white/10 bg-slate-800 px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors shadow-sm"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Markdown</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 rounded-lg border border-white/10 bg-slate-800 px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors shadow-sm"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print PDF</span>
          </button>

          <button
            onClick={onOpenExportModal}
            className="flex items-center space-x-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shadow-sm"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Share Kit</span>
          </button>
        </div>
      </div>

      {/* Nav Tabs for Launch Kit Categories */}
      <div className="flex items-center space-x-2 border-b border-white/10 pb-3 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('marketing')}
          className={`flex items-center space-x-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all flex-shrink-0 ${
            activeTab === 'marketing'
              ? 'bg-indigo-600 text-white shadow-sm glow-indigo'
              : 'bg-slate-900/60 text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="h-3.5 w-3.5" />
          <span>Marketing &amp; Launch Copy</span>
        </button>

        <button
          onClick={() => setActiveTab('strategy')}
          className={`flex items-center space-x-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all flex-shrink-0 ${
            activeTab === 'strategy'
              ? 'bg-indigo-600 text-white shadow-sm glow-indigo'
              : 'bg-slate-900/60 text-slate-400 hover:text-white'
          }`}
        >
          <Target className="h-3.5 w-3.5" />
          <span>Brand Strategy</span>
        </button>

        <button
          onClick={() => setActiveTab('identity')}
          className={`flex items-center space-x-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all flex-shrink-0 ${
            activeTab === 'identity'
              ? 'bg-indigo-600 text-white shadow-sm glow-indigo'
              : 'bg-slate-900/60 text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Brand Identity</span>
        </button>

        <button
          onClick={() => setActiveTab('visual')}
          className={`flex items-center space-x-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all flex-shrink-0 ${
            activeTab === 'visual'
              ? 'bg-indigo-600 text-white shadow-sm glow-indigo'
              : 'bg-slate-900/60 text-slate-400 hover:text-white'
          }`}
        >
          <Palette className="h-3.5 w-3.5" />
          <span>Visual Specs</span>
        </button>
      </div>

      {/* Tab 1: Marketing & Launch Copy */}
      {activeTab === 'marketing' && (
        <div className="space-y-6">
          {/* Landing Page Hero Box */}
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                1. Landing Page Hero Copy
              </span>
              <button
                onClick={() =>
                  copyText(
                    `${kit.marketingAssets.landingHeadline}\n${kit.marketingAssets.landingSubheadline}\n\n${kit.marketingAssets.heroCopy}`,
                    'hero-all'
                  )
                }
                className="text-xs text-slate-400 hover:text-white flex items-center"
              >
                {copiedKey === 'hero-all' ? <Check className="mr-1 h-3 w-3 text-emerald-400" /> : <Copy className="mr-1 h-3 w-3" />}
                {copiedKey === 'hero-all' ? 'Copied Hero Pack!' : 'Copy Hero Copy'}
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] font-semibold uppercase text-slate-400">
                  Primary Headline
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
                  {kit.marketingAssets.landingHeadline}
                </h2>
              </div>

              <div>
                <span className="text-[10px] font-semibold uppercase text-slate-400">
                  Subheadline
                </span>
                <p className="text-sm font-medium text-indigo-200/90 mt-0.5 leading-relaxed">
                  {kit.marketingAssets.landingSubheadline}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-semibold uppercase text-slate-400">
                  Hero Paragraph
                </span>
                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  {kit.marketingAssets.heroCopy}
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-3">
                <button className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm pointer-events-none">
                  {kit.marketingAssets.primaryCta} →
                </button>
                <button className="rounded-lg border border-white/10 bg-slate-800 px-4 py-2 text-xs font-medium text-slate-300 pointer-events-none">
                  {kit.marketingAssets.secondaryCta}
                </button>
              </div>
            </div>
          </div>

          {/* Product Description & Feature Bullets */}
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              2. Product Description &amp; Feature Pillars
            </span>
            <p className="text-xs text-slate-200 leading-relaxed">
              {kit.marketingAssets.productDescription}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {kit.marketingAssets.bulletFeatures.map((f, i) => (
                <div key={i} className="rounded-lg border border-white/5 bg-black/20 p-3.5 space-y-1">
                  <h4 className="text-xs font-bold text-indigo-300">{f.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media Package Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Instagram Post */}
            <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-400 flex items-center">
                    <InstagramIcon className="mr-1.5 h-4 w-4" /> Instagram Carousel
                  </span>
                  <button
                    onClick={() => copyText(kit.marketingAssets.instagramPost.caption, 'ig-post')}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    {copiedKey === 'ig-post' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {kit.marketingAssets.instagramPost.caption}
                </p>
                <div className="rounded bg-black/30 p-2 text-[11px] text-indigo-400 font-mono">
                  {kit.marketingAssets.instagramPost.hashtags.join(' ')}
                </div>
              </div>
              <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400">
                <strong>Visual Concept:</strong> {kit.marketingAssets.instagramPost.visualDescription}
              </div>
            </div>

            {/* LinkedIn Post */}
            <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center">
                    <LinkedinIcon className="mr-1.5 h-4 w-4" /> LinkedIn Launch
                  </span>
                  <button
                    onClick={() =>
                      copyText(
                        `${kit.marketingAssets.linkedInPost.hook}\n\n${kit.marketingAssets.linkedInPost.body}\n\n${kit.marketingAssets.linkedInPost.cta}`,
                        'li-post'
                      )
                    }
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    {copiedKey === 'li-post' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <p className="text-xs font-bold text-white">
                  {kit.marketingAssets.linkedInPost.hook}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {kit.marketingAssets.linkedInPost.body}
                </p>
              </div>
              <div className="pt-2 border-t border-white/5 text-[11px] text-emerald-400">
                <strong>CTA:</strong> {kit.marketingAssets.linkedInPost.cta}
              </div>
            </div>

            {/* X / Twitter Thread */}
            <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center">
                    <TwitterIcon className="mr-1.5 h-4 w-4" /> Viral X Thread
                  </span>
                  <button
                    onClick={() => copyText(kit.marketingAssets.twitterThread.join('\n\n'), 'tw-thread')}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    {copiedKey === 'tw-thread' ? 'Copied' : 'Copy Thread'}
                  </button>
                </div>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {kit.marketingAssets.twitterThread.map((tweet, i) => (
                    <div key={i} className="rounded bg-black/20 p-2.5 text-xs text-slate-300">
                      {tweet}
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400">
                5-part narrative thread engineered for viral engagement.
              </div>
            </div>
          </div>

          {/* Official Launch Announcement PR */}
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Official Press &amp; Product Hunt Launch Announcement
              </span>
              <button
                onClick={() => copyText(kit.marketingAssets.launchAnnouncement, 'pr-ann')}
                className="text-xs text-slate-400 hover:text-white"
              >
                {copiedKey === 'pr-ann' ? 'Copied' : 'Copy PR Statement'}
              </button>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed bg-black/20 p-4 rounded-lg border border-white/5">
              {kit.marketingAssets.launchAnnouncement}
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Brand Strategy */}
      {activeTab === 'strategy' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <span className="text-[11px] font-semibold uppercase text-slate-400">Mission</span>
                <p className="mt-1 text-sm font-semibold text-white leading-relaxed">
                  {kit.brandStrategySummary.mission}
                </p>
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase text-slate-400">Vision</span>
                <p className="mt-1 text-sm font-semibold text-white leading-relaxed">
                  {kit.brandStrategySummary.vision}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <span className="text-[11px] font-semibold uppercase text-slate-400">Target Audience</span>
              <p className="text-xs text-slate-200">{kit.brandStrategySummary.targetAudience}</p>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <span className="text-[11px] font-semibold uppercase text-slate-400">Core Problem</span>
              <p className="text-xs text-slate-200">{kit.brandStrategySummary.problem}</p>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <span className="text-[11px] font-semibold uppercase text-slate-400">Positioning Statement</span>
              <p className="text-xs text-indigo-200 italic">&ldquo;{kit.brandStrategySummary.positioning}&rdquo;</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Brand Identity */}
      {activeTab === 'identity' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <span className="text-[11px] font-semibold uppercase text-slate-400">Tagline</span>
                <p className="mt-1 text-base font-bold text-white">
                  &ldquo;{kit.brandIdentitySummary.tagline}&rdquo;
                </p>
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase text-slate-400">One-Line Pitch</span>
                <p className="mt-1 text-xs text-slate-200 leading-relaxed">
                  {kit.brandIdentitySummary.oneLinePitch}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <span className="text-[11px] font-semibold uppercase text-slate-400">Naming Rationale</span>
              <p className="text-xs text-slate-300">{kit.brandIdentitySummary.namingRationale}</p>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <span className="text-[11px] font-semibold uppercase text-slate-400">Core Principles</span>
              <ul className="space-y-1.5 pt-1">
                {kit.brandIdentitySummary.principles.map((pr, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start">
                    <span className="text-emerald-400 mr-2">✓</span>
                    <span>{pr}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Visual System */}
      {activeTab === 'visual' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-6 space-y-6">
            <div>
              <span className="text-[11px] font-semibold uppercase text-slate-400">Logo Direction</span>
              <p className="mt-1 text-xs text-slate-200">{kit.visualSystemSummary.logoDirection}</p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <span className="text-[11px] font-semibold uppercase text-slate-400">Color Palette Tokens</span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-3">
                {kit.visualSystemSummary.colorPalette.map((col, i) => (
                  <div key={i} className="rounded-lg border border-white/10 bg-black/20 p-2.5 space-y-1">
                    <div className="h-10 w-full rounded" style={{ backgroundColor: col.hex }} />
                    <span className="text-[10px] text-slate-400 font-bold block truncate">{col.name}</span>
                    <span className="text-[11px] font-mono text-white">{col.hex}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-[11px] font-semibold uppercase text-slate-400">Typography</span>
                <p className="mt-1 text-xs text-white">Headline: {kit.visualSystemSummary.typography.headline}</p>
                <p className="text-xs text-slate-300">Body: {kit.visualSystemSummary.typography.body}</p>
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase text-slate-400">Visual Mood</span>
                <p className="mt-1 text-xs text-slate-200">{kit.visualSystemSummary.visualMood}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
