'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, CheckCircle2, Loader2, Volume2, VolumeX, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { soundEngine } from '@/lib/sound-engine';

interface WelcomeLoadingProps {
  onComplete: () => void;
}

export const WelcomeLoading: React.FC<WelcomeLoadingProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(soundEngine.soundEnabled);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const steps = [
    { label: 'Initializing AI Models...', threshold: 25 },
    { label: 'Connecting Knowledge Base...', threshold: 50 },
    { label: 'Preparing Brand Agents...', threshold: 75 },
    { label: 'Calibrating Creative Engine & Almost ready...', threshold: 95 },
  ];

  // Particle Canvas Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? 'rgba(6, 182, 212, ' : 'rgba(168, 85, 247, ',
      alpha: Math.random() * 0.6 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Progress animation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const next = prev + 1.8;
        if (next >= 25 && currentStep === 0) {
          setCurrentStep(1);
          if (soundEngine.soundEnabled) soundEngine.playClick();
        }
        if (next >= 50 && currentStep === 1) {
          setCurrentStep(2);
          if (soundEngine.soundEnabled) soundEngine.playClick();
        }
        if (next >= 75 && currentStep === 2) {
          setCurrentStep(3);
          if (soundEngine.soundEnabled) soundEngine.playClick();
        }
        if (next >= 100 && currentStep === 3) {
          setCurrentStep(4);
          if (soundEngine.soundEnabled) soundEngine.playSuccessChord();
        }
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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#04060d] text-slate-100 overflow-hidden px-4 py-8 select-none">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Ambient Cosmic Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-cyan-500/15 via-indigo-600/20 to-purple-600/20 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-10 h-80 w-80 rounded-full bg-purple-600/15 blur-[120px] pointer-events-none" />

      {/* Orbit Rings Effect */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] rounded-full border border-indigo-500/15 pointer-events-none animate-spin"
        style={{ animationDuration: '45s' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[880px] h-[880px] rounded-full border border-cyan-500/10 pointer-events-none animate-spin"
        style={{ animationDuration: '80s', animationDirection: 'reverse' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full border border-purple-500/5 pointer-events-none animate-spin"
        style={{ animationDuration: '120s' }}
      />

      {/* Top Bar with Sound Toggle & Skip */}
      <div className="relative z-10 w-full max-w-5xl flex items-center justify-between">
        <div className="flex items-center space-x-2.5 text-xs text-slate-400">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400"></span>
          </span>
          <span className="font-mono uppercase tracking-wider text-[11px] text-cyan-300 font-semibold">
            System Online • Inkloom Neural Engine
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleToggleSound}
            className={`flex items-center space-x-1.5 rounded-full border px-3.5 py-1.5 text-xs transition-all backdrop-blur-md ${
              soundEnabled
                ? 'border-cyan-400/40 bg-cyan-950/40 text-cyan-300 shadow-lg shadow-cyan-500/20'
                : 'border-white/10 bg-slate-900/80 text-slate-400 hover:text-white'
            }`}
            title="Toggle procedural UI audio"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="h-3.5 w-3.5 text-cyan-400" />
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
            className="flex items-center space-x-1 rounded-full border border-white/10 bg-slate-900/60 px-3.5 py-1.5 text-xs text-slate-400 hover:text-white hover:border-white/20 transition-all backdrop-blur-md"
          >
            <span>Skip</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Center Cinematic Card */}
      <div className="relative z-10 my-auto flex flex-col items-center text-center max-w-md w-full px-7 py-9 rounded-3xl border border-white/15 bg-[#0b0e1b]/80 backdrop-blur-2xl shadow-2xl shadow-cyan-950/40 animate-fadeIn">
        {/* Glowing Logo Icon */}
        <div className="relative mb-6">
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 opacity-60 blur-xl animate-pulse" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 via-indigo-600 to-purple-600 p-0.5 shadow-2xl shadow-cyan-500/30">
            <div className="flex h-full w-full items-center justify-center rounded-[22px] bg-[#070913]">
              <Sparkles className="h-11 w-11 text-cyan-300 animate-pulse-glow" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          BrandForge<span className="text-cyan-400">.ai</span>
        </h1>
        <p className="mt-1.5 text-xs font-bold uppercase tracking-widest text-indigo-300">
          Multi-Agent Brand Intelligence
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Turning ideas into iconic brands
        </p>

        {/* Progress Bar */}
        <div className="w-full mt-7 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">
              {progress < 100 ? steps[Math.min(currentStep, 3)].label : 'Neural Engine Calibrated!'}
            </span>
            <span className="font-mono text-cyan-300 font-extrabold text-sm">
              {Math.floor(progress)}%
            </span>
          </div>

          <div className="h-2.5 w-full rounded-full bg-slate-900 border border-white/10 overflow-hidden p-0.5">
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
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 animate-fadeIn" />
                ) : isCurrent ? (
                  <Loader2 className="h-4 w-4 text-cyan-400 animate-spin flex-shrink-0" />
                ) : (
                  <div className="h-4 w-4 rounded-full border border-slate-700 flex-shrink-0" />
                )}
                <span
                  className={
                    isDone
                      ? 'text-slate-200 font-medium'
                      : isCurrent
                      ? 'text-cyan-300 font-semibold'
                      : 'text-slate-500'
                  }
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Enter Button (Appears when >= 100% or click anytime) */}
        <div className="w-full mt-7">
          {progress >= 100 ? (
            <button
              onClick={handleEnter}
              className="w-full flex items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-cyan-400 via-indigo-600 to-purple-600 px-6 py-3.5 text-xs font-extrabold text-white shadow-xl shadow-cyan-500/30 hover:from-cyan-300 hover:to-purple-500 transition-all transform hover:scale-[1.03] animate-bounce"
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
