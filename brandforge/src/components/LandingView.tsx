'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  PackageCheck,
  Compass,
  Crosshair,
  Palette,
  ShieldAlert,
  Flame,
  Scale,
  CheckCircle2,
  ChevronDown,
  Check,
  AlertTriangle,
  Play,
} from 'lucide-react';
import { soundEngine } from '@/lib/sound-engine';

interface LandingViewProps {
  onStartBuilding: () => void;
  onViewExample: () => void;
  onOpenAuth: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onStartBuilding,
  onViewExample,
  onOpenAuth,
}) => {
  // Brand Battle Interactive Direction Selector
  const [selectedDirection, setSelectedDirection] = useState<'A' | 'B' | 'C' | 'D' | 'E'>('A');

  // Brand Guardian Interactive Live Audit State
  const [guardianInput, setGuardianInput] = useState(
    'Introducing our all-in-one revolutionary AI platform that disrupts team communication through synergy!'
  );
  const [guardianResult, setGuardianResult] = useState<{
    status: 'PASS' | 'WARNING' | 'NEEDS REVISION';
    score: number;
    explanation: string;
    suggestion: string;
  } | null>(null);

  // Pricing monthly/yearly toggle
  const [isYearly, setIsYearly] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Feature Learn More modal state
  const [selectedFeature, setSelectedFeature] = useState<{
    title: string;
    desc: string;
    details: string;
  } | null>(null);

  // Handle Guardian Audit Demo Click
  const handleRunGuardianAudit = () => {
    soundEngine.playClick();
    soundEngine.startAmbientThinking();
    setTimeout(() => {
      soundEngine.stopAmbientThinking();
      if (
        guardianInput.toLowerCase().includes('synergy') ||
        guardianInput.toLowerCase().includes('revolutionary') ||
        guardianInput.toLowerCase().includes('all-in-one')
      ) {
        soundEngine.playCriticAlert();
        setGuardianResult({
          status: 'NEEDS REVISION',
          score: 42,
          explanation:
            'Violates Brand Voice Guardrail: Contains empty corporate jargon ("synergy", "revolutionary", "all-in-one"). Weak emotional resonance.',
          suggestion:
            'Approved AI Rewrite: "Meet HackForge — the squad infrastructure built for fast hackathon shipping. Match verified builders with complementary skills in under 90 seconds."',
        });
      } else {
        soundEngine.playSuccessChord();
        setGuardianResult({
          status: 'PASS',
          score: 96,
          explanation:
            'Strong Brand Voice Alignment: Tone is active, confident, and speaks directly to collegiate builder pain points.',
          suggestion:
            'Ready for publication across official Discord, LinkedIn, and X channels.',
        });
      }
    }, 600);
  };

  const battleDirections = {
    A: {
      name: 'Direction A — Technical Infrastructure',
      tagline: 'Stop solo struggling. Start squad shipping.',
      focus: 'Developer-grade matching by tech stack compatibility',
      strategist: 'Highest defensibility against generalist social tools.',
      critic: 'Beware of overly clinical UX; keep peer warmth alive.',
      confidence: 94,
    },
    B: {
      name: 'Direction B — Human / Community',
      tagline: 'Find your co-founder before the weekend ends.',
      focus: 'High emotional bonding & shared passion communities',
      strategist: 'Broadest appeal, but higher churn if matching is purely social.',
      critic: 'Risk of sounding like another generic student networking group.',
      confidence: 81,
    },
    C: {
      name: 'Direction C — Premium / High-Stakes',
      tagline: 'The competitive league for hackathon champions.',
      focus: 'Verified portfolio badges & corporate recruiter access',
      strategist: 'Monetization-ready with sponsor partnerships.',
      critic: 'Excludes beginner hackers; might intimidate first-timers.',
      confidence: 88,
    },
    D: {
      name: 'Direction D — Playful / Creative',
      tagline: 'Swipe right on your next 48-hour build squad.',
      focus: 'Gamified builder cards & quest XP rewards',
      strategist: 'High viral TikTok/campus growth mechanics.',
      critic: 'Trivializes complex hackathon project commitments.',
      confidence: 76,
    },
    E: {
      name: 'Direction E — Bold / Movement',
      tagline: 'No ghosting. No unbuilt ideas. Just shipped code.',
      focus: 'Anti-flake squad contracts & reputation staking',
      strategist: 'Polarizing and unforgettable brand attitude.',
      critic: 'Needs ironclad verification so contracts mean something.',
      confidence: 91,
    },
  };

  const features = [
    {
      title: '1. Multi-Agent Brand Strategy',
      desc: 'Autonomous AI council explores market positioning, moats, and ICP personas.',
      details:
        'Employs multi-agent consensus to stress-test your core premise, eliminating blind spots before market commitment.',
    },
    {
      title: '2. Intelligent Positioning',
      desc: 'Automatic category creation, value proposition, and 2D competitive quadrants.',
      details:
        'Plots your brand dynamically against existing market incumbents, identifying the exact whitespace opportunity.',
    },
    {
      title: '3. Brand Personality Engine',
      desc: 'Formulates 3–5 distinctive core traits, tone sliders, and explicit anti-traits.',
      details:
        'Establishes strictly defined boundaries for what your brand is and what it refuses to be (e.g. No corporate HR fluff).',
    },
    {
      title: '4. AI Naming Studio',
      desc: 'Explores 4 naming territories: Descriptive, Metaphorical, Invented, Evocative.',
      details:
        'Generates names with phoneme cadence analysis, linguistic defensibility, and matched taglines.',
    },
    {
      title: '5. Visual Identity System',
      desc: 'Dynamic SVG vector marks, WCAG AA color palettes, and typography tokens.',
      details:
        'Produces downloadable SVG marks, accessible hex tokens, and an interactive 3D particle constellation canvas.',
    },
    {
      title: '6. Brand Battle Arena',
      desc: '5 autonomous AI agents engage in an adversarial debate over strategic directions.',
      details:
        'The Strategist, Creative Director, Customer Persona, Critic, and Guardian clash across 3 rounds to crown the optimal brand.',
    },
    {
      title: '7. Adversarial Brand Critic',
      desc: 'Diagnoses clichés, generic promises, and jargon with side-by-side comparative diffs.',
      details:
        'Replaces empty tech buzzwords with punchy, concrete claims through Original → Critique → Alternative → Revised loops.',
    },
    {
      title: '8. Brand Guardian',
      desc: 'Live consistency engine auditing draft marketing copy against your Brand DNA.',
      details:
        'Audits landing pages, ads, and social copy for personality match, tone guardrails, and compliance scoring.',
    },
    {
      title: '9. Launch Kit Generator',
      desc: '1-click generation of social copy, 5-part X thread, LinkedIn posts, and PR announcements.',
      details:
        'Synthesizes launch-ready copy with downloadable Markdown, JSON, and PDF brand book exports.',
    },
    {
      title: '10. Brand Consistency Engine',
      desc: 'Cross-stage state persistence ensuring all downstream assets share unified DNA.',
      details:
        'Every change approved in Discover or Shape cascades automatically into Visuals, Critic audits, and Launch kits.',
    },
    {
      title: '11. Audience Intelligence',
      desc: '3 micro-segments, pain levels, JTBD matrix, and risky assumption mapping.',
      details:
        'Deconstructs target builders into actionable psychological profiles with quantified willingness-to-adopt metrics.',
    },
    {
      title: '12. Machine Learning Quality Report',
      desc: 'Scikit-Learn Random Forest Regressor & Deep Learning vector embeddings evaluation.',
      details:
        'Quantifies brand strength across 8 feature vectors with Gini feature importances and archetype cosine similarities.',
    },
  ];

  const pricingPlans = [
    {
      name: 'Free Starter',
      price: '$0',
      period: 'forever',
      description: 'Ideal for student hackathon projects and raw idea validation.',
      features: [
        '3 Active Brand Projects',
        '6-Stage AI Brand Pipeline',
        'Basic Brand Critic Audit',
        'Export Markdown Brand Book',
        'Community Support',
      ],
      cta: 'Get Started Free',
      popular: false,
    },
    {
      name: 'Pro Builder',
      price: isYearly ? '$15' : '$19',
      period: 'per month',
      description: 'For founders, creators, and teams shipping launch-ready products.',
      features: [
        'Unlimited Brand Projects',
        'Brand Battle Arena (5-Agent Debate)',
        'Live Brand Guardian Copy Auditor',
        'ML Random Forest Quality Report',
        'SVG Vector Marks & 3D Canvas Visualizer',
        'Social Launch Kits (X, LinkedIn, PR)',
        'Full PDF & JSON Exports',
      ],
      cta: 'Start Pro Plan',
      popular: true,
    },
    {
      name: 'Teams & Studio',
      price: isYearly ? '$39' : '$49',
      period: 'per month',
      description: 'For design agencies, accelerators, and multi-brand incubators.',
      features: [
        'Everything in Pro',
        'Multi-user Workspace Collaboration',
        'Custom Fine-Tuned Brand Archetypes',
        'SQL Database Export (13 Tables)',
        'Dedicated API Access (FastAPI)',
        'Priority 24/7 Agent SLA',
      ],
      cta: 'Deploy Teams Studio',
      popular: false,
    },
  ];

  const faqs = [
    {
      q: 'What is BrandForge.ai?',
      a: 'BrandForge.ai is a multi-agent brand intelligence platform built for the Inkloom Challenge. It transforms a rough founder idea into a structured, validated, and launch-ready brand system through a 6-stage connected AI workflow.',
    },
    {
      q: 'How does the 6-stage AI workflow work?',
      a: 'The workflow progresses through Discover (Problem & Audience), Position (Category & Strategy), Shape (Personality & Naming), Visualize (Visual Identity & Dynamic Marks), Challenge (Brand Critic & Battle Arena), and Deliver (Launch Kit). Context is automatically preserved across all 6 stages.',
    },
    {
      q: 'What is the Brand Battle Arena?',
      a: 'Brand Battle is our autonomous multi-agent debate council. Five AI agents (Strategist, Creative Director, Customer Persona, Critic, and Guardian) debate multiple strategic brand directions to eliminate clichés and crown the strongest identity.',
    },
    {
      q: 'Can I edit and approve AI-generated results?',
      a: 'Yes! Every stage provides an interactive workspace with inline editing, regeneration, approval, and rejection controls. Approved data automatically cascades into downstream stages.',
    },
    {
      q: 'How does Brand Guardian work?',
      a: 'Brand Guardian allows you to paste any draft marketing copy (social posts, landing page headlines, ads, outreach emails) and checks them in real-time against your brand traits, flagging guardrail violations and offering approved revisions.',
    },
    {
      q: 'Can I export the brand kit?',
      a: 'Yes. You can export complete Brand Books in Markdown, structured JSON, vector SVG marks, and launch copy with 1-click downloads.',
    },
    {
      q: 'Is my project data saved?',
      a: 'Yes. Projects are automatically persisted locally via browser storage and backed by our production-grade 13-table SQL database schema in the FastAPI Python backend.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#070913] text-slate-100 overflow-x-hidden font-sans">
      {/* 1. STICKY GLASS HEADER */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#070913]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div
            onClick={onViewExample}
            className="flex items-center space-x-2.5 cursor-pointer"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-400 p-0.5 shadow-md shadow-indigo-500/30">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#070913]">
                <Sparkles className="h-5 w-5 text-cyan-300" />
              </div>
            </div>
            <span className="font-bold text-lg text-white tracking-tight">
              BrandForge<span className="text-cyan-400">.ai</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-cyan-300 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-cyan-300 transition-colors">How It Works</a>
            <a href="#ai-council" className="hover:text-cyan-300 transition-colors">AI Agents</a>
            <a href="#brand-battle" className="hover:text-cyan-300 transition-colors">Brand Battle</a>
            <a href="#guardian" className="hover:text-cyan-300 transition-colors">Guardian</a>
            <a href="#use-cases" className="hover:text-cyan-300 transition-colors">Use Cases</a>
            <a href="#architecture" className="hover:text-cyan-300 transition-colors">Tech Architecture</a>
            <a href="#pricing" className="hover:text-cyan-300 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-cyan-300 transition-colors">FAQ</a>
          </nav>

          {/* CTA & Sign In */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenAuth();
              }}
              className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                onStartBuilding();
              }}
              className="flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-cyan-400 transition-all hover:scale-105"
            >
              <span>Forge New Idea</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section id="hero" className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient Backdrops */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-cyan-400/20 blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 -left-20 h-72 w-72 rounded-full bg-blue-600/15 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-purple-600/15 blur-[120px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-5xl text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Powered by Multi-Agent AI • Inkloom Challenge 2026</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
            Build a brand <br />
            that can{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              think
            </span>
            .
          </h1>

          {/* Description */}
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
            Turn your rough idea into a validated, consistent and launch-ready brand with the power of multi-agent AI.
          </p>

          {/* Hero Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <button
              onClick={() => {
                soundEngine.playClick();
                onStartBuilding();
              }}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-500/25 hover:from-cyan-400 hover:to-purple-500 transition-all hover:scale-105"
            >
              <Sparkles className="h-4 w-4" />
              <span>Forge New Idea Now →</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                onViewExample();
              }}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl border border-white/10 bg-slate-900/80 px-8 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-800 transition-all"
            >
              <Play className="h-4 w-4 text-cyan-400" />
              <span>Watch Demo (HackForge)</span>
            </button>
          </div>

          {/* Floating UI Hero Visual (From Screenshot) */}
          <div className="pt-10">
            <div className="relative mx-auto max-w-4xl rounded-3xl border border-white/10 bg-slate-950/80 p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs text-slate-400">
                <div className="flex items-center space-x-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="font-mono text-[11px] text-slate-400 pl-2">
                    brandforge.ai/workspace/hackforge
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-[11px]">
                  <span className="text-emerald-400 font-semibold">● 5 AI Agents Synced</span>
                  <span>•</span>
                  <span>Health: 92%</span>
                </div>
              </div>

              {/* Inside Hero Visual */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5 text-left">
                {/* Visual Card 1: Strategy */}
                <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/30 p-4 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                    Stage 02 • Strategy
                  </span>
                  <h4 className="text-sm font-bold text-white">Autonomous Category</h4>
                  <p className="text-xs text-slate-300">
                    &ldquo;Autonomous squad formation infrastructure for student builders.&rdquo;
                  </p>
                  <div className="pt-2 text-[10px] text-emerald-400 font-mono">
                    ✓ Defensible Moat Validated
                  </div>
                </div>

                {/* Visual Card 2: Identity & Mark */}
                <div className="rounded-2xl border border-purple-500/30 bg-purple-950/30 p-4 space-y-2 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block text-left">
                    Stage 04 • Identity
                  </span>
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-indigo-600 to-purple-700 font-black text-xl text-white shadow-lg shadow-cyan-500/30">
                    HF
                  </div>
                  <h4 className="text-sm font-bold text-white">HackForge</h4>
                  <p className="text-[11px] text-slate-400">Electric Indigo &amp; Neon Teal</p>
                </div>

                {/* Visual Card 3: Launch Kit */}
                <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/30 p-4 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                    Stage 06 • Launch Kit
                  </span>
                  <h4 className="text-sm font-bold text-white">5-Part Social Thread</h4>
                  <p className="text-xs text-slate-300 line-clamp-2">
                    &ldquo;Stop solo struggling. Meet HackForge — where hackathon winners unite.&rdquo;
                  </p>
                  <div className="pt-2 text-[10px] text-cyan-300 font-mono">
                    ✓ 12 Assets Ready to Ship
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LANDING PAGE SECTIONS (PREVIEW & DIRECTORY) - Matching panel 5 of screenshot */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 border-y border-white/10 bg-[#080b18]/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              Landing Page Sections (Interactive Directory)
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Click any section to navigate instantly
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {[
              { label: 'Hero Section', href: '#hero', tag: 'Visual Flow', color: 'border-cyan-500/30 bg-cyan-950/20' },
              { label: 'Features Section', href: '#features', tag: '12 Systems', color: 'border-indigo-500/30 bg-indigo-950/20' },
              { label: 'How It Works', href: '#how-it-works', tag: '6 AI Stages', color: 'border-purple-500/30 bg-purple-950/20' },
              { label: 'Brand Battle', href: '#brand-battle', tag: '5 Directions', color: 'border-rose-500/30 bg-rose-950/20' },
              { label: 'Brand Guardian', href: '#guardian', tag: 'Live Audit', color: 'border-teal-500/30 bg-teal-950/20' },
              { label: 'Pricing Section', href: '#pricing', tag: 'Free & Pro', color: 'border-emerald-500/30 bg-emerald-950/20' },
            ].map((sec) => (
              <a
                key={sec.label}
                href={sec.href}
                onClick={() => soundEngine.playClick()}
                className={`rounded-xl border ${sec.color} p-3 text-left hover:scale-[1.02] hover:border-white/40 transition-all`}
              >
                <span className="text-[10px] font-bold text-cyan-300 block">{sec.tag}</span>
                <span className="text-xs font-bold text-white block mt-0.5">{sec.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TRUST & STATS SECTION */}
      <section className="py-12 border-b border-white/5 bg-slate-950/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Sample Platform Performance Metrics
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="font-mono text-3xl sm:text-4xl font-black text-cyan-400">
                10K+
              </div>
              <p className="text-xs text-slate-400 font-medium">Ideas Transformed</p>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-3xl sm:text-4xl font-black text-purple-400">
                4.8 / 5
              </div>
              <p className="text-xs text-slate-400 font-medium">User Rating</p>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-3xl sm:text-4xl font-black text-emerald-400">
                90%
              </div>
              <p className="text-xs text-slate-400 font-medium">Launch Ready</p>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-3xl sm:text-4xl font-black text-indigo-400">
                3x
              </div>
              <p className="text-xs text-slate-400 font-medium">Faster Go-to-Market</p>
            </div>
          </div>

          <div className="pt-6 text-center space-y-3">
            <p className="text-xs text-slate-400">
              Trusted by innovators, students, and hackathon builders worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-400 text-xs font-bold tracking-wider">
              <span>GOOGLE</span>
              <span>MICROSOFT</span>
              <span>NVIDIA</span>
              <span>AWS</span>
              <span>VERCEL</span>
              <span>META</span>
              <span>NOTION</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (6 STAGES) */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Core AI Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              6 Connected AI Stages
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Context is enriched stage-by-stage, preventing generic text and ensuring rigorous consistency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                name: 'Discover',
                subtitle: 'Idea Intelligence',
                desc: 'Deconstruct raw founder idea into core problem, 3 micro-segments, pain pillars, and JTBDs.',
                icon: Compass,
                color: 'text-blue-400 border-blue-500/20 bg-blue-500/10',
              },
              {
                num: '02',
                name: 'Position',
                subtitle: 'Category Creation',
                desc: 'Define unique category, value proposition, ICP persona, and 2D competitive quadrant map.',
                icon: Crosshair,
                color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
              },
              {
                num: '03',
                name: 'Shape',
                subtitle: 'Personality & Naming',
                desc: 'Formulate core traits, explicit anti-traits, 4 naming territories, and voice sliders.',
                icon: Sparkles,
                color: 'text-purple-400 border-purple-500/20 bg-purple-500/10',
              },
              {
                num: '04',
                name: 'Visualize',
                subtitle: 'Visual Identity',
                desc: 'Dynamic SVG vector marks, WCAG AA contrast swatches, and interactive 3D particle canvas.',
                icon: Palette,
                color: 'text-pink-400 border-pink-500/20 bg-pink-500/10',
              },
              {
                num: '05',
                name: 'Challenge',
                subtitle: 'Brand Critic & Battle',
                desc: 'Adversarial Critic loop and 5-agent debate to diagnose clichés and eliminate weak assumptions.',
                icon: ShieldAlert,
                color: 'text-amber-400 border-amber-500/20 bg-amber-500/10',
              },
              {
                num: '06',
                name: 'Deliver',
                subtitle: 'Turnkey Launch Kit',
                desc: 'Generate social media copy (IG, LinkedIn, X thread), PR statement, and 1-click brand book export.',
                icon: PackageCheck,
                color: 'text-teal-400 border-teal-500/20 bg-teal-500/10',
              },
            ].map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.num}
                  className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 space-y-3 hover:border-cyan-400/40 hover:bg-slate-800/60 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-cyan-400">
                      STAGE {st.num}
                    </span>
                    <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${st.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {st.name}: {st.subtitle}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FEATURES SECTION (12 Cards) */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/40 border-y border-white/5">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Everything you need to build a brand.
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              From market discovery to real-time marketing consistency, BrandForge delivers a complete system.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 space-y-2.5 hover:border-indigo-500/40 hover:bg-slate-800/60 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Zap className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white">{feat.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>

                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedFeature(feat);
                  }}
                  className="pt-2 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center"
                >
                  <span>Learn More</span>
                  <ArrowRight className="ml-1 h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. AI BRAND COUNCIL SECTION */}
      <section id="ai-council" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Autonomous Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Meet your AI Brand Council
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Specialized neural agents debate, critique, and refine your identity with distinct perspectives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'The Strategist',
                focus: 'Positioning & Market Moat',
                role: 'Defends category creation and sustainable competitive advantage.',
                status: 'Active',
                color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
              },
              {
                title: 'Creative Director',
                focus: 'Visual Identity & Art Direction',
                role: 'Crafts distinctive visual language, typography tokens, and marks.',
                status: 'Active',
                color: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
              },
              {
                title: 'Naming Specialist',
                focus: 'Names, Taglines & Cadence',
                role: 'Explores phonetics, semantic territories, and trademark safety.',
                status: 'Complete',
                color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
              },
              {
                title: 'Brand Critic',
                focus: 'Detect Clichés & Challenge Ideas',
                role: 'Attacks vague buzzwords and demands concrete, punchy value claims.',
                status: 'Thinking',
                color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
              },
              {
                title: 'Brand Guardian',
                focus: 'Consistency & WCAG Guardrails',
                role: 'Ensures marketing drafts never violate personality boundaries.',
                status: 'Active',
                color: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
              },
              {
                title: 'Launch Strategist',
                focus: 'Go-to-Market & Campaign Assets',
                role: 'Builds social threads, press releases, and viral community hooks.',
                status: 'Complete',
                color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
              },
            ].map((agent, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 space-y-3 hover:border-purple-500/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{agent.title}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold border ${agent.color}`}>
                    ● {agent.status}
                  </span>
                </div>
                <div className="text-xs font-semibold text-indigo-300">{agent.focus}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{agent.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BRAND BATTLE SECTION */}
      <section id="brand-battle" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/40 border-y border-white/5">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center justify-center gap-1">
              <Flame className="h-4 w-4" /> Standout Feature
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Brand Battle: Don&apos;t settle for the first idea.
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Explore 5 distinct strategic directions and review how the AI council debates each one.
            </p>
          </div>

          {/* Direction Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {(['A', 'B', 'C', 'D', 'E'] as const).map((dirKey) => (
              <button
                key={dirKey}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedDirection(dirKey);
                }}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  selectedDirection === dirKey
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                    : 'bg-slate-900 border border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {battleDirections[dirKey].name.split('—')[1]}
              </button>
            ))}
          </div>

          {/* Selected Direction Review Card */}
          <div className="rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-950/20 via-slate-900 to-indigo-950/20 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {battleDirections[selectedDirection].name}
                </h3>
                <p className="text-sm text-rose-300 font-semibold italic mt-0.5">
                  &ldquo;{battleDirections[selectedDirection].tagline}&rdquo;
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400">Council Consensus:</span>
                <span className="font-mono text-lg font-black text-emerald-400">
                  {battleDirections[selectedDirection].confidence}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/15 p-4 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-1.5" /> The Strategist&apos;s Defense
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {battleDirections[selectedDirection].strategist}
                </p>
              </div>

              <div className="rounded-xl border border-amber-500/20 bg-amber-950/15 p-4 space-y-1.5">
                <span className="text-xs font-bold text-amber-400 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1.5" /> The Critic&apos;s Stress-Test
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {battleDirections[selectedDirection].critic}
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  soundEngine.playSuccessChord();
                  onViewExample();
                }}
                className="flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg hover:from-rose-500 hover:to-indigo-500 transition-all"
              >
                <span>Select This Direction in Battle Arena</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. BRAND GUARDIAN LIVE AUDIT SECTION */}
      <section id="guardian" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center justify-center gap-1">
              <Scale className="h-4 w-4" /> Real-Time Brand Guardian
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Keep every message on-brand.
            </h2>
            <p className="text-sm text-slate-400 max-w-lg mx-auto">
              Paste any marketing draft below to run an instant brand compliance diagnostic.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 space-y-4">
            <textarea
              rows={3}
              value={guardianInput}
              onChange={(e) => setGuardianInput(e.target.value)}
              placeholder="Paste draft copy (social post, landing hero, ad headline)..."
              className="w-full rounded-xl border border-white/10 bg-black/40 p-3.5 text-xs sm:text-sm text-white focus:border-teal-400 focus:outline-none"
            />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    setGuardianInput(
                      'Disrupting the market with a revolutionary all-in-one AI platform for synergizing teams!'
                    )
                  }
                  className="rounded bg-rose-500/10 px-2.5 py-1 text-[11px] font-medium text-rose-300 border border-rose-500/20 hover:bg-rose-500/20"
                >
                  Load Cliché Sample
                </button>
                <button
                  onClick={() =>
                    setGuardianInput(
                      'Stop solo struggling. Meet HackForge — the squad infrastructure for student builders to match and ship winning hackathons in 90 seconds.'
                    )
                  }
                  className="rounded bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/20"
                >
                  Load On-Brand Sample
                </button>
              </div>

              <button
                onClick={handleRunGuardianAudit}
                className="flex items-center space-x-2 rounded-xl bg-teal-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg hover:bg-teal-500 transition-all"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Run Guardian Audit</span>
              </button>
            </div>

            {/* Audit Diagnostic Output */}
            {guardianResult && (
              <div className="rounded-2xl border border-white/10 bg-black/40 p-5 space-y-3 animate-fadeIn mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`h-3 w-3 rounded-full ${
                        guardianResult.status === 'PASS' ? 'bg-emerald-400' : 'bg-rose-400'
                      }`}
                    />
                    <span className="text-xs font-bold text-white">
                      Diagnostic Verdict: {guardianResult.status}
                    </span>
                  </div>
                  <span className="font-mono text-sm font-bold text-teal-300">
                    Compliance Score: {guardianResult.score}%
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {guardianResult.explanation}
                </p>

                <div className="rounded-xl border border-teal-500/20 bg-teal-950/20 p-3.5 space-y-1 text-xs">
                  <span className="text-[10px] uppercase font-bold text-teal-400 block">
                    Guardian Recommendation
                  </span>
                  <p className="text-teal-200">{guardianResult.suggestion}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 9. USE CASES (10 Cards) */}
      <section id="use-cases" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/40 border-y border-white/5">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Versatile Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Engineered for Every Type of Creator
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {[
              'Startups',
              'Student Projects',
              'Creators',
              'SMEs',
              'Agencies',
              'Communities',
              'SaaS Products',
              'Hackathon Teams',
              'Personal Brands',
              'New Products',
            ].map((uc, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-center hover:border-cyan-400/40 transition-colors"
              >
                <div className="h-2 w-2 rounded-full bg-cyan-400 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-white">{uc}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. TECH & AI ARCHITECTURE */}
      <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Technical Rigor
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Multi-Layer AI &amp; Machine Learning Engine
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Clear separation between creative LLM generation and quantitative ML/DL evaluation.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-2 text-center text-xs font-bold items-center">
              <div className="p-3 rounded-xl bg-slate-900 border border-white/10 text-indigo-300">
                LLM Inference
              </div>
              <div className="text-slate-500 font-mono">→</div>
              <div className="p-3 rounded-xl bg-slate-900 border border-white/10 text-cyan-300">
                AI Orchestrator
              </div>
              <div className="text-slate-500 font-mono">→</div>
              <div className="p-3 rounded-xl bg-slate-900 border border-white/10 text-purple-300">
                Multi-Agent Battle
              </div>
              <div className="text-slate-500 font-mono">→</div>
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
                ML Random Forest
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="space-y-1">
                <span className="font-bold text-white block">Full-Stack Core:</span>
                <p className="text-slate-400">Next.js 14, React 18, TypeScript, Tailwind CSS, Web Audio API.</p>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-white block">FastAPI Backend:</span>
                <p className="text-slate-400">Python 3.11, Uvicorn, Scikit-learn (Random Forest 100 Estimators).</p>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-white block">Database &amp; SQL:</span>
                <p className="text-slate-400">13-table PostgreSQL schema, SQLAlchemy ORM, indexed relations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. PRICING SECTION */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/40 border-y border-white/5">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Simple, Transparent Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Choose the Plan for Your Venture
            </h2>

            {/* Toggle */}
            <div className="flex items-center justify-center space-x-3 pt-2">
              <span className={`text-xs font-semibold ${!isYearly ? 'text-white' : 'text-slate-400'}`}>
                Monthly
              </span>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setIsYearly(!isYearly);
                }}
                className="h-6 w-11 rounded-full bg-slate-800 p-1 transition-colors relative"
              >
                <div
                  className={`h-4 w-4 rounded-full bg-cyan-400 transition-transform ${
                    isYearly ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`text-xs font-semibold ${isYearly ? 'text-cyan-300' : 'text-slate-400'}`}>
                Yearly (Save 20%)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <div
                key={i}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 ${
                  plan.popular
                    ? 'border-2 border-indigo-500 bg-indigo-950/20 shadow-2xl shadow-indigo-950/50 relative'
                    : 'border border-white/10 bg-slate-900/60'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-3 py-0.5 text-[10px] font-black uppercase text-black">
                    Most Popular
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">{plan.description}</p>
                  </div>

                  <div className="flex items-baseline space-x-1 font-mono">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-xs text-slate-400">/{plan.period}</span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-white/10">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex items-center space-x-2">
                        <Check className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    soundEngine.playSuccessChord();
                    onStartBuilding();
                  }}
                  className={`w-full py-3 rounded-xl text-xs font-bold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-cyan-400 via-indigo-600 to-purple-600 text-white shadow-lg hover:from-cyan-300 hover:to-purple-500'
                      : 'border border-white/10 bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FAQ SECTION */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Got Questions?
            </span>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-slate-900/60 overflow-hidden"
              >
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setOpenFaq(openFaq === idx ? null : idx);
                  }}
                  className="w-full flex items-center justify-between p-4 text-left text-xs sm:text-sm font-semibold text-white hover:text-cyan-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform ${
                      openFaq === idx ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>

                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-white/5 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. FINAL CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/40 to-transparent pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-2xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Your idea deserves more than a generic answer.
          </h2>
          <p className="text-sm text-slate-400">
            Join the creators building iconic, defensible, and launch-ready brands with multi-agent intelligence.
          </p>
          <button
            onClick={() => {
              soundEngine.playClick();
              onStartBuilding();
            }}
            className="inline-flex items-center space-x-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-cyan-500/25 hover:from-cyan-400 hover:to-purple-500 transition-all hover:scale-105"
          >
            <span>Forge Your Brand Now →</span>
          </button>
        </div>
      </section>

      {/* 14. FOOTER */}
      <footer className="border-t border-white/10 bg-[#05070e] py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-400 p-0.5">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#090c15]">
                <Sparkles className="h-4 w-4 text-cyan-300" />
              </div>
            </div>
            <div>
              <span className="font-bold text-sm text-white">BrandForge.ai</span>
              <p className="text-[11px] text-slate-400">Multi-Agent Brand Intelligence</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px]">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#how-it-works" className="hover:text-white">How It Works</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
            <button onClick={onViewExample} className="hover:text-white">Workspace Demo</button>
            <button onClick={onOpenAuth} className="hover:text-white">Sign In</button>
          </div>

          <p className="text-[11px] text-slate-400">
            Built for Inkloom Brand Intelligence 2026. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Feature Learn More Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fadeIn">
          <div className="max-w-md w-full rounded-3xl border border-white/10 bg-[#0c101d] p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">{selectedFeature.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{selectedFeature.desc}</p>
            <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/20 p-3.5 text-xs text-indigo-200 leading-relaxed">
              {selectedFeature.details}
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedFeature(null)}
                className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
