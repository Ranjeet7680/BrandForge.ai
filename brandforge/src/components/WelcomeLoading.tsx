'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Loader2, Volume2, VolumeX, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { soundEngine } from '@/lib/sound-engine';

interface WelcomeLoadingProps {
  onComplete: () => void;
}

export const WelcomeLoading: React.FC<WelcomeLoadingProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(soundEngine.soundEnabled);

  const steps = [
    { label: 'Initializing AI Models...', threshold: 25 },
    { label: 'Connecting Knowledge Base...', threshold: 50 },
    { label: 'Preparing Brand Agents...', threshold: 75 },
    { label: 'Calibrating Creative Engine & Almost ready...', threshold: 95 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const next = prev + 1.5;
        if (next >= 25 && currentStep === 0) setCurrentStep(1);
        if (next >= 50 && currentStep === 1) setCurrentStep(2);
        if (next >= 75 && currentStep === 2) setCurrentStep(3);
        if (next >= 100 && currentStep === 3) setCurrentStep(4);
        return next > 100 ? 100 : next;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [currentStep]);

  const handleToggleSound = () => {
    const enabled = soundEngine.toggleSound();
    setSoundEnabled(enabled);
    if (enabled) {
      soundEngine.playSuccessChord();
    }
  };

  const handleEnter = () => {
    if (soundEnabled) {
      soundEngine.playSuccessChord();
    }
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#060810] text-slate-100 overflow-hidden px-4 py-8 select-none">
      {/* Ambient Cosmic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-cyan-500/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-20 right-10 h-80 w-80 rounded-full bg-purple-600/15 blur-[110px] pointer-events-none" />

      {/* Orbit Rings Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-indigo-500/10 pointer-events-none animate-spin" style={{ animationDuration: '60s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full border border-cyan-500/5 pointer-events-none animate-spin" style={{ animationDuration: '100s', animationDirection: 'reverse' }} />

      {/* Top Bar with Sound Toggle & Skip */}
      <div className="relative z-10 w-full max-w-5xl flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono uppercase tracking-wider text-[11px]">System Online • Inkloom Neural Engine</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleToggleSound}
            className="flex items-center space-x-1.5 rounded-full border border-white/10 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-300 hover:border-indigo-500/40 hover:text-white transition-all backdrop-blur-md"
            title="Toggle procedural UI audio"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>Sound On</span>
              </>
            ) : (
              <>
                <VolumeX className="h-3.5 w-3.5 text-slate-500" />
                <span>Sound Off</span>
              </>
            )}
          </button>

          <button
            onClick={handleEnter}
            className="flex items-center space-x-1 rounded-full border border-white/10 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:border-white/20 transition-all backdrop-blur-md"
          >
            <span>Skip</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Center Hero Card */}
      <div className="relative z-10 my-auto flex flex-col items-center text-center max-w-md w-full px-6 py-8 rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-2xl shadow-2xl shadow-indigo-950/50">
        {/* Glowing Logo Icon */}
        <div className="relative mb-6">
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 opacity-60 blur-lg animate-pulse" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-400 p-0.5 shadow-2xl">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#090c15]">
              <Sparkles className="h-9 w-9 text-cyan-300" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-black tracking-tight text-white">
          BrandForge<span className="text-cyan-400">.ai</span>
        </h1>
        <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-indigo-400">
          Multi-Agent Brand Intelligence
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Turning ideas into iconic brands
        </p>

        {/* Progress Bar */}
        <div className="w-full mt-7 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">
              {progress < 100 ? steps[Math.min(currentStep, 3)].label : 'System Ready!'}
            </span>
            <span className="font-mono text-cyan-300 font-bold">
              {Math.floor(progress)}%
            </span>
          </div>

          <div className="h-2 w-full rounded-full bg-slate-900 border border-white/10 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 transition-all duration-150 shadow-sm shadow-cyan-400/50"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Sequential Checklist */}
        <div className="w-full mt-6 space-y-2.5 text-left border-t border-white/5 pt-5">
          {steps.map((s, idx) => {
            const isDone = progress >= s.threshold;
            const isCurrent = !isDone && (idx === 0 || progress >= steps[idx - 1].threshold);

            return (
              <div key={idx} className="flex items-center space-x-2.5 text-xs">
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="h-4 w-4 text-cyan-400 animate-spin flex-shrink-0" />
                ) : (
                  <div className="h-4 w-4 rounded-full border border-slate-700 flex-shrink-0" />
                )}
                <span
                  className={
                    isDone
                      ? 'text-slate-300 font-medium'
                      : isCurrent
                      ? 'text-cyan-300 font-semibold'
                      : 'text-slate-600'
                  }
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Enter Button (Appears when >= 100% or allow click anytime) */}
        <div className="w-full mt-7">
          {progress >= 100 ? (
            <button
              onClick={handleEnter}
              className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-purple-500 transition-all transform hover:scale-[1.02] animate-bounce"
            >
              <span>Enter BrandForge Platform</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleEnter}
              className="w-full flex items-center justify-center space-x-1.5 rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 text-xs font-medium text-slate-400 hover:text-slate-200 hover:border-white/20 transition-all"
            >
              <span>Loading Workspace ({Math.floor(progress)}%)... Click to Open</span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Quote & Trust Badges */}
      <div className="relative z-10 w-full max-w-xl text-center space-y-2">
        <p className="text-xs text-slate-400 italic">
          &ldquo;Every great brand starts with an idea.&rdquo;
        </p>
        <div className="flex items-center justify-center space-x-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Cpu className="h-3 w-3 text-cyan-400" /> Multi-Agent AI
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3 w-3 text-emerald-400" /> Brand Critic Loop
          </span>
          <span>•</span>
          <span>Inkloom Challenge 2026</span>
        </div>
      </div>
    </div>
  );
};
