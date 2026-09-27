'use client';

import React, { useState } from 'react';
import {
  Palette,
  Type,
  Shapes,
  Camera,
  Copy,
  Check,
  Download,
  ArrowRight,
  Eye
} from 'lucide-react';
import { Stage4Visualize } from '@/types/brand';
import { BrandCanvas3D } from '@/components/canvas/BrandCanvas3D';

interface VisualIdentityStageProps {
  visualize: Stage4Visualize;
  brandName: string;
  onProceedToNext: () => void;
}

export const VisualIdentityStage: React.FC<VisualIdentityStageProps> = ({
  visualize,
  brandName,
  onProceedToNext,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [previewHeadline, setPreviewHeadline] = useState(visualize.typography.specimen.headlineSample);
  const [logoStyle, setLogoStyle] = useState<'geometric' | 'monogram' | 'minimalist'>('geometric');

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const downloadSvgLogo = () => {
    const svgElement = document.getElementById('brand-svg-mark');
    if (!svgElement) return;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${brandName.toLowerCase()}-logo.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const primaryColor = visualize.colorPalette[0]?.hex || '#6366F1';
  const secondaryColor = visualize.colorPalette[1]?.hex || '#10B981';
  const accentColor = visualize.colorPalette[2]?.hex || '#F59E0B';

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="rounded-md bg-pink-500/10 px-2.5 py-1 text-xs font-semibold text-pink-400 border border-pink-500/20">
              STAGE 04
            </span>
            <span className="text-xs text-slate-400 font-mono">
              VISUAL IDENTITY &amp; DESIGN SYSTEM
            </span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Visualize: Brand System &amp; Art Direction
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Translates the brand strategy into a complete visual design brief: SVG logo mark, color tokens, typography specimen, and Midjourney prompts.
          </p>
        </div>

        <button
          onClick={onProceedToNext}
          className="flex items-center space-x-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shadow-sm self-start sm:self-auto"
        >
          <span>Proceed to Stage 5: Critic</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Interactive Logo Studio */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
              <Shapes className="h-4 w-4" />
              Dynamic SVG Logo Mark &amp; Geometry
            </span>
            <h2 className="text-lg font-bold text-white mt-0.5">
              {visualize.logoConcept.primaryMark}
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex rounded-lg bg-black/40 p-1 border border-white/10">
              <button
                onClick={() => setLogoStyle('geometric')}
                className={`rounded px-2.5 py-1 text-xs font-medium transition-all ${
                  logoStyle === 'geometric' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Geometric Catalyst
              </button>
              <button
                onClick={() => setLogoStyle('monogram')}
                className={`rounded px-2.5 py-1 text-xs font-medium transition-all ${
                  logoStyle === 'monogram' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Monogram Emblem
              </button>
              <button
                onClick={() => setLogoStyle('minimalist')}
                className={`rounded px-2.5 py-1 text-xs font-medium transition-all ${
                  logoStyle === 'minimalist' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Minimal Wordmark
              </button>
            </div>

            <button
              onClick={downloadSvgLogo}
              className="flex items-center space-x-1.5 rounded-lg border border-white/10 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors"
              title="Download vector SVG"
            >
              <Download className="h-3.5 w-3.5" />
              <span>SVG</span>
            </button>
          </div>
        </div>

        {/* SVG Preview Stage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="relative mx-auto h-64 w-full max-w-sm rounded-xl border border-white/10 bg-[#06080f] flex items-center justify-center p-6 overflow-hidden group shadow-2xl">
            {/* Ambient Background Glow */}
            <div
              className="absolute h-36 w-36 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
              style={{ backgroundColor: primaryColor }}
            />

            {/* Live Interactive SVG */}
            <svg
              id="brand-svg-mark"
              viewBox="0 0 200 200"
              className="h-40 w-40 transition-transform duration-300 group-hover:scale-105"
            >
              <defs>
                <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={primaryColor} />
                  <stop offset="100%" stopColor={secondaryColor} />
                </linearGradient>
                <linearGradient id="accentGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={secondaryColor} />
                  <stop offset="100%" stopColor={accentColor} />
                </linearGradient>
                <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={primaryColor} floodOpacity="0.4" />
                </filter>
              </defs>

              {logoStyle === 'geometric' && (
                <g filter="url(#glowEffect)">
                  {/* Outer Shield / Polygon */}
                  <polygon
                    points="100,25 170,65 170,145 100,185 30,145 30,65"
                    fill="none"
                    stroke="url(#brandGrad)"
                    strokeWidth="8"
                    strokeLinejoin="round"
                  />
                  {/* Inner Interlocking Nodes */}
                  <path
                    d="M75,85 L100,60 L125,85 L100,110 Z"
                    fill="url(#brandGrad)"
                  />
                  <path
                    d="M100,115 L125,140 L100,165 L75,140 Z"
                    fill="url(#accentGrad)"
                  />
                  {/* Central Pulse Point */}
                  <circle cx="100" cy="112.5" r="4" fill="#FFFFFF" />
                </g>
              )}

              {logoStyle === 'monogram' && (
                <g filter="url(#glowEffect)">
                  <rect
                    x="35"
                    y="35"
                    width="130"
                    height="130"
                    rx="24"
                    fill="#111726"
                    stroke="url(#brandGrad)"
                    strokeWidth="6"
                  />
                  <text
                    x="100"
                    y="125"
                    textAnchor="middle"
                    fill="url(#brandGrad)"
                    fontSize="72"
                    fontWeight="900"
                    fontFamily="system-ui, sans-serif"
                    letterSpacing="-2"
                  >
                    {brandName.charAt(0)}
                  </text>
                  <circle cx="138" cy="62" r="7" fill={accentColor} />
                </g>
              )}

              {logoStyle === 'minimalist' && (
                <g filter="url(#glowEffect)">
                  <path
                    d="M50,140 L100,45 L150,140 L125,140 L100,90 L75,140 Z"
                    fill="url(#brandGrad)"
                  />
                  <line
                    x1="40"
                    y1="160"
                    x2="160"
                    y2="160"
                    stroke={secondaryColor}
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </g>
              )}
            </svg>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Design Symbolism &amp; Rationale
              </span>
              <p className="mt-1 text-sm text-slate-200 leading-relaxed">
                {visualize.logoConcept.symbolism}
              </p>
            </div>

            <div className="rounded-lg border border-white/5 bg-black/20 p-3 text-xs space-y-1">
              <span className="text-slate-400 font-medium">Secondary Variant:</span>
              <p className="text-indigo-300 font-medium">{visualize.logoConcept.secondaryVariant}</p>
            </div>

            <div className="text-xs text-slate-400">
              Generated in strict accordance with modern SVG standards. Safe for digital dark modes, vector billboards, favicon scaling, and high-DPI screens.
            </div>
          </div>
        </div>

        {/* 3D Brand Canvas Field */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive 3D Geometric Brand Canvas
            </span>
            <span className="text-[11px] text-slate-400">
              Procedural WebGL / Particle Constellation
            </span>
          </div>
          <BrandCanvas3D
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            brandName={brandName}
          />
        </div>
      </div>

      {/* Color Palette Tokens */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Palette className="h-5 w-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              Curated Color System &amp; Tokens
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Click any code to copy to clipboard
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {visualize.colorPalette.map((color, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/10 bg-slate-900/60 overflow-hidden space-y-2 pb-3 hover:border-white/25 transition-all group"
            >
              {/* Swatch block */}
              <div
                className="h-20 w-full relative flex items-end justify-end p-2 transition-transform group-hover:scale-105"
                style={{ backgroundColor: color.hex }}
              >
                <button
                  onClick={() => copyText(color.hex, `hex-${idx}`)}
                  className="rounded bg-black/60 backdrop-blur-md px-1.5 py-0.5 text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center"
                >
                  {copiedKey === `hex-${idx}` ? <Check className="h-3 w-3 text-emerald-400 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                  {copiedKey === `hex-${idx}` ? 'Copied' : color.hex}
                </button>
              </div>

              <div className="px-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                    {color.role}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400">
                    {color.contrastRatio.split(' ')[0]}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-white truncate" title={color.name}>
                  {color.name}
                </h3>
                <div className="text-[10px] font-mono text-slate-300">
                  {color.hex}
                </div>
                <p className="text-[10px] text-slate-400 leading-tight pt-1 border-t border-white/5 line-clamp-2">
                  {color.psychology}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography System & Interactive Specimen */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Type className="h-5 w-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">
              Typography Hierarchy &amp; Specimen Sandbox
            </h2>
          </div>
          <span className="text-xs text-slate-400">Type below to test pairing live</span>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Primary Headline Font
              </span>
              <p className="mt-1 text-base font-bold text-white font-mono">
                {visualize.typography.headlineFont}
              </p>
              <p className="text-xs text-indigo-300 font-mono mt-0.5">Weight: 700 / Bold</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Primary Body Font
              </span>
              <p className="mt-1 text-base font-bold text-white font-mono">
                {visualize.typography.bodyFont}
              </p>
              <p className="text-xs text-indigo-300 font-mono mt-0.5">Weight: 400 / Regular</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Code / Accent Font
              </span>
              <p className="mt-1 text-base font-bold text-white font-mono">
                {visualize.typography.accentFont}
              </p>
              <p className="text-xs text-indigo-300 font-mono mt-0.5">Weight: 500 / Medium</p>
            </div>
          </div>

          {/* Interactive Specimen Box */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Live Typography Specimen</span>
              <span className="text-[11px] text-slate-400">Edit text below:</span>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#070a12] p-5 space-y-4">
              <input
                type="text"
                value={previewHeadline}
                onChange={(e) => setPreviewHeadline(e.target.value)}
                className="w-full bg-transparent text-xl sm:text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-2 focus:border-indigo-500 focus:outline-none"
                placeholder="Type sample headline..."
              />
              <p className="text-sm text-slate-300 leading-relaxed">
                {visualize.typography.specimen.bodySample}
              </p>
              <div className="flex items-center space-x-2 pt-2 text-xs font-mono text-indigo-400">
                <span>[ STATUS: 200 OK ]</span>
                <span>•</span>
                <span>LATENCY: 12ms</span>
                <span>•</span>
                <span>BUILD: PRODUCTION</span>
              </div>
            </div>

            <p className="text-xs text-slate-400">
              <strong className="text-slate-300">Rationale:</strong> {visualize.typography.rationale}
            </p>
          </div>
        </div>
      </div>

      {/* Imagery Direction & Ready AI Prompts */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Camera className="h-5 w-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">
            Art Direction &amp; Generative AI Image Prompts
          </h2>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Lighting Philosophy
              </span>
              <p className="mt-1 text-xs text-slate-200 leading-relaxed font-medium">
                {visualize.imageryDirection.lighting}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Compositional Style
              </span>
              <p className="mt-1 text-xs text-slate-200 leading-relaxed font-medium">
                {visualize.imageryDirection.composition}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Subject Matter
              </span>
              <p className="mt-1 text-xs text-slate-200 leading-relaxed font-medium">
                {visualize.imageryDirection.subjectMatter}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                UI Aesthetic
              </span>
              <p className="mt-1 text-xs text-slate-200 leading-relaxed font-medium">
                {visualize.uiMood.aesthetic}
              </p>
            </div>
          </div>

          {/* AI Prompts Ready to Copy */}
          <div className="space-y-2 pt-3 border-t border-white/10">
            <span className="text-xs font-semibold text-slate-300">
              Ready-to-Use Midjourney / DALL-E Production Prompts
            </span>
            {visualize.imageryDirection.aiImagePrompts.map((prompt, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-white/5 bg-black/30 p-3 text-xs text-slate-300 space-x-3"
              >
                <code className="text-[11px] text-indigo-300 flex-1 font-mono">{prompt}</code>
                <button
                  onClick={() => copyText(prompt, `ai-prompt-${i}`)}
                  className="flex-shrink-0 flex items-center text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
                >
                  {copiedKey === `ai-prompt-${i}` ? <Check className="h-3 w-3 text-emerald-400 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                  {copiedKey === `ai-prompt-${i}` ? 'Copied' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Anti-Patterns (Things to Avoid) */}
      <div className="rounded-xl border border-rose-500/20 bg-rose-950/10 p-6 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center">
          <Eye className="mr-1.5 h-4 w-4" /> Visual Clichés &amp; Anti-Patterns to Avoid
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          {visualize.visualsToAvoid.map((item, idx) => (
            <div key={idx} className="flex items-start text-xs text-slate-300">
              <span className="text-rose-400 mr-2 flex-shrink-0">✕</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
