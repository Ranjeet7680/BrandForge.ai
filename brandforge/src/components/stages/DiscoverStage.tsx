'use client';

import React, { useState } from 'react';
import {
  Compass,
  AlertCircle,
  Users,
  HeartCrack,
  Briefcase,
  HelpCircle,
  Copy,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Edit3,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Stage1Discover } from '@/types/brand';
import { soundEngine } from '@/lib/sound-engine';

interface DiscoverStageProps {
  discover: Stage1Discover;
  rawIdea: string;
  targetMarket: string;
  onProceedToNext: () => void;
  onUpdateDiscover?: (updated: Stage1Discover) => void;
}

export const DiscoverStage: React.FC<DiscoverStageProps> = ({
  discover: initialDiscover,
  rawIdea: initialIdea,
  targetMarket: initialMarket,
  onProceedToNext,
  onUpdateDiscover,
}) => {
  // Workspace inputs
  const [idea, setIdea] = useState(initialIdea);
  const [targetAudience, setTargetAudience] = useState(initialMarket);
  const [problem, setProblem] = useState(
    'Students struggle to find complementary teammates for hackathons and projects, leading to dropped projects and ghosting.'
  );
  const [market, setMarket] = useState('Global collegiate engineering & design students');
  const [goals, setGoals] = useState('Enable verified squad formation in under 90 seconds');
  const [constraints, setConstraints] = useState('No corporate HR-speak, must feel like Discord/GitHub');
  const [competitors, setCompetitors] = useState('Devpost, Devfolio, Discord channels, WhatsApp groups');

  const [showAdvancedInputs, setShowAdvancedInputs] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isApproved, setIsApproved] = useState(true);

  // Active Discover State
  const [currentDiscover, setCurrentDiscover] = useState<Stage1Discover>(initialDiscover);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // Editable fields
  const [editedProblem, setEditedProblem] = useState(currentDiscover.coreProblem);
  const [opportunity, setOpportunity] = useState(
    'A high-signal, reputation-backed sprint infrastructure where builders match by complementary stack rather than awkward networking.'
  );

  const copyToClipboard = (text: string, id: string) => {
    soundEngine.playClick();
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handleAnalyzeIdea = () => {
    setIsAnalyzing(true);
    soundEngine.playClick();
    soundEngine.startAmbientThinking();

    setTimeout(() => {
      soundEngine.stopAmbientThinking();
      setIsAnalyzing(false);
      soundEngine.playSuccessChord();

      const newCoreProblem = `Modern builders struggle with ${problem.toLowerCase()}. Traditional channels like ${competitors} create friction and ghosting, resulting in unbuilt prototypes.`;
      const newOpp = `A high-signal wedge where builders match on complementary stack and verified reliability rather than awkward cold messaging (${constraints}).`;
      setOpportunity(newOpp);
      const updated: Stage1Discover = {
        ...currentDiscover,
        coreProblem: newCoreProblem,
      };
      setCurrentDiscover(updated);
      setEditedProblem(newCoreProblem);
      setIsApproved(true);

      if (onUpdateDiscover) {
        onUpdateDiscover(updated);
      }
    }, 1200);
  };

  const handleApprove = () => {
    soundEngine.playSuccessChord();
    setIsApproved(true);
    setIsEditing(false);
    const updated: Stage1Discover = {
      ...currentDiscover,
      coreProblem: editedProblem,
    };
    setCurrentDiscover(updated);
    if (onUpdateDiscover) {
      onUpdateDiscover(updated);
    }
  };

  const handleReject = () => {
    soundEngine.playCriticAlert();
    setIsApproved(false);
    setEditedProblem(initialDiscover.coreProblem);
  };

  return (
    <div className="space-y-8 pb-16">
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
            Discover: Idea Intelligence Workspace
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Deconstruct raw founder vision into root friction, micro-segments, JTBDs, and risky assumptions before crafting the brand.
          </p>
        </div>

        <button
          onClick={() => {
            soundEngine.playClick();
            onProceedToNext();
          }}
          className="flex items-center space-x-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shadow-sm self-start sm:self-auto"
        >
          <span>Proceed to Stage 2: Position</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* 1. INTERACTIVE INPUT FORM WORKSPACE (Handbook Requirement) */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 sm:p-6 backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <Compass className="h-4 w-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Idea Input &amp; Constraints Studio
            </h2>
          </div>
          <span className="text-[11px] text-slate-400">
            Stage 1 Context Generator
          </span>
        </div>

        {/* What are you building? (Large Textarea) */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">
            What are you building? <span className="text-cyan-400">*</span>
          </label>
          <textarea
            rows={3}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Describe your raw product, startup, or community idea in your own words..."
            className="w-full rounded-xl border border-white/10 bg-black/40 p-3.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
        </div>

        {/* Primary Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Target Audience
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Student hackathon builders, indie makers..."
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Core Pain / Problem
            </label>
            <input
              type="text"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="e.g. Solo fatigue, ghosting teammates, skill mismatch..."
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Expandable Advanced Inputs */}
        <div>
          <button
            type="button"
            onClick={() => setShowAdvancedInputs(!showAdvancedInputs)}
            className="flex items-center space-x-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            <span>{showAdvancedInputs ? 'Hide' : 'Show'} Advanced Market Context (Goals, Competitors, Constraints)</span>
            {showAdvancedInputs ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>

          {showAdvancedInputs && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 mt-2 border-t border-white/5 animate-fadeIn">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Market Scope</label>
                <input
                  type="text"
                  value={market}
                  onChange={(e) => setMarket(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-2.5 py-1.5 text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Key Goals</label>
                <input
                  type="text"
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-2.5 py-1.5 text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Competitors</label>
                <input
                  type="text"
                  value={competitors}
                  onChange={(e) => setCompetitors(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-2.5 py-1.5 text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Brand Constraints</label>
                <input
                  type="text"
                  value={constraints}
                  onChange={(e) => setConstraints(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-2.5 py-1.5 text-xs text-white focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Analyze Idea Action Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleAnalyzeIdea}
            disabled={isAnalyzing || !idea.trim()}
            className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:from-blue-500 hover:to-purple-500 transition-all disabled:opacity-50"
          >
            <Sparkles className={`h-4 w-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? 'Analyzing Problem Intelligence...' : 'Analyze Idea with AI'}</span>
          </button>
        </div>
      </div>

      {/* 2. AI RESPONSE PANEL: CORE PROBLEM & OPPORTUNITY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Core Problem Card with Edit/Approve/Reject */}
        <div className="rounded-2xl border border-blue-500/20 bg-blue-950/20 p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-blue-500/20">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center">
              <AlertCircle className="mr-1.5 h-4 w-4" /> Extracted Core Problem
            </span>
            <div className="flex items-center space-x-2">
              {isApproved && (
                <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30 flex items-center">
                  <Check className="h-3 w-3 mr-1" /> Approved
                </span>
              )}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs text-slate-400 hover:text-white flex items-center"
              >
                <Edit3 className="h-3.5 w-3.5 mr-1" />
                {isEditing ? 'Done' : 'Edit'}
              </button>
            </div>
          </div>

          {isEditing ? (
            <textarea
              rows={3}
              value={editedProblem}
              onChange={(e) => setEditedProblem(e.target.value)}
              className="w-full rounded-xl border border-blue-400/50 bg-black/40 p-3 text-xs text-white focus:outline-none"
            />
          ) : (
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed bg-blue-900/30 p-3.5 rounded-xl border border-blue-500/20">
              {editedProblem}
            </p>
          )}

          <div className="flex items-center justify-between pt-1">
            <p className="text-[11px] text-blue-200/70">
              Validated against friction benchmarks to prevent solving phantom problems.
            </p>
            <div className="flex items-center space-x-1.5">
              <button
                onClick={handleApprove}
                className="rounded-lg bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-300 hover:bg-emerald-500/30 flex items-center"
              >
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Approve
              </button>
              <button
                onClick={handleReject}
                className="rounded-lg bg-rose-500/10 px-2.5 py-1 text-xs font-bold text-rose-300 hover:bg-rose-500/20 flex items-center"
              >
                <XCircle className="h-3.5 w-3.5 mr-1" /> Reset
              </button>
            </div>
          </div>
        </div>

        {/* Opportunity Gap Card */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center">
              <Lightbulb className="mr-1.5 h-4 w-4" /> Market Opportunity &amp; Wedge
            </span>
            <button
              onClick={() => copyToClipboard(opportunity, 'opp-gap')}
              className="text-[10px] text-slate-400 hover:text-white flex items-center"
            >
              <Copy className="mr-1 h-3 w-3" />
              {copiedItem === 'opp-gap' ? 'Copied' : 'Copy'}
            </button>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed bg-emerald-900/30 p-3.5 rounded-xl border border-emerald-500/20">
            {opportunity}
          </p>
          <p className="text-[11px] text-emerald-200/70">
            Strategic opening where incumbents (Devpost, Discord) fail to deliver verified compatibility.
          </p>
        </div>
      </div>

      {/* 3. TARGET USER MICRO-SEGMENTS */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-indigo-400" />
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Target User Micro-Segments
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentDiscover.targetUsers.map((user, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 space-y-3 hover:border-indigo-500/40 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-indigo-500/10 px-2 py-0.5 text-[11px] font-semibold text-indigo-400 border border-indigo-500/20">
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
              <div className="space-y-1 pt-2 border-t border-white/5">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Willingness to Adopt</span>
                  <span className="font-mono text-emerald-400">
                    {user.painLevel >= 9 ? 'High (90%+)' : user.painLevel >= 8 ? 'Strong (80%+)' : 'Medium (65%)'}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
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

      {/* 4. THREE-PILLAR PAIN BREAKDOWN */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <HeartCrack className="h-5 w-5 text-rose-400" />
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
            3-Pillar Pain Breakdown
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              type: 'Functional Friction',
              title: 'Workflow & Skill Imbalance',
              description: currentDiscover.userPainPoints?.functional?.[0] || 'Unverified skill claims and timezone friction.',
              quote: currentDiscover.userPainPoints?.functional?.[1] || 'We wasted hours because skills were mismatched.',
            },
            {
              type: 'Emotional Friction',
              title: 'Imposter Syndrome & Ghosting',
              description: currentDiscover.userPainPoints?.emotional?.[0] || 'Anxiety of joining the wrong team or being abandoned.',
              quote: currentDiscover.userPainPoints?.emotional?.[1] || 'I hate having to pitch myself in giant noisy chats.',
            },
            {
              type: 'Financial / Resource',
              title: 'Zero Budget & Tool Costs',
              description: currentDiscover.userPainPoints?.financial?.[0] || 'Near-zero budget to pay for enterprise squad tools.',
              quote: currentDiscover.userPainPoints?.financial?.[1] || 'We need free, fast infrastructure to ship prototypes.',
            },
          ].map((pain, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-rose-500/20 bg-rose-950/10 p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="rounded bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold text-rose-300">
                  {pain.type}
                </span>
                <span className="text-[11px] text-slate-400">Pillar 0{idx + 1}</span>
              </div>
              <h3 className="text-sm font-bold text-white">{pain.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {pain.description}
              </p>
              <div className="pt-2 border-t border-rose-500/20 text-[11px] text-rose-300/80 italic">
                &ldquo;{pain.quote}&rdquo;
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. JOBS TO BE DONE (JTBD) MATRIX */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-6 space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-white/10">
          <Briefcase className="h-5 w-5 text-indigo-400" />
          <h2 className="text-base font-bold text-white">
            Jobs-to-be-Done (JTBD) Matrix
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-white/5 bg-black/20 p-4 space-y-2">
            <span className="text-[11px] font-bold uppercase text-indigo-400">
              Functional Job
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentDiscover.jobsToBeDone?.[0]?.functional || 'Instantly discover teammates with verified, complementary skills.'}
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-black/20 p-4 space-y-2">
            <span className="text-[11px] font-bold uppercase text-purple-400">
              Emotional Job
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentDiscover.jobsToBeDone?.[0]?.emotional || 'Feel confident and excited about building something ambitious.'}
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-black/20 p-4 space-y-2">
            <span className="text-[11px] font-bold uppercase text-cyan-400">
              Social Job
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentDiscover.jobsToBeDone?.[0]?.social || 'Gain peer recognition, build an elite portfolio, and get noticed.'}
            </p>
          </div>
        </div>
      </div>

      {/* 6. RISKY ASSUMPTIONS & OPEN QUESTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assumptions */}
        <div className="rounded-2xl border border-amber-500/20 bg-amber-950/15 p-5 space-y-3">
          <div className="flex items-center space-x-2 pb-2 border-b border-amber-500/20">
            <ShieldAlert className="h-4 w-4 text-amber-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Risky Assumptions Requiring Validation
            </h3>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {(currentDiscover.existingAssumptions || []).map((assump, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>
                  <strong className="text-amber-200">[{assump.riskLevel} Risk]</strong> {assump.assumption}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Open Questions */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 space-y-3">
          <div className="flex items-center space-x-2 pb-2 border-b border-white/10">
            <HelpCircle className="h-4 w-4 text-cyan-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              Open Strategic Inquiries
            </h3>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {(currentDiscover.unansweredQuestions || []).map((q, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
