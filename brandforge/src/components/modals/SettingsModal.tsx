'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Settings,
  Sparkles,
  Key,
  CheckCircle2,
  Cpu,
  Zap,
  Info
} from 'lucide-react';
import { AIConfig } from '@/lib/brand-engine/llm-service';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AIConfig;
  onSaveConfig: (config: AIConfig) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [provider, setProvider] = useState<'local' | 'gemini' | 'openai'>(config.provider);
  const [apiKey, setApiKey] = useState(config.apiKey || '');
  const [model, setModel] = useState(config.model || 'gemini-1.5-flash');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    setProvider(config.provider);
    setApiKey(config.apiKey || '');
    setModel(config.model || (config.provider === 'openai' ? 'gpt-4o-mini' : 'gemini-1.5-flash'));
  }, [config, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveConfig({
      provider,
      apiKey: apiKey.trim(),
      model,
    });
    setStatusMessage('Configuration saved successfully!');
    setTimeout(() => {
      setStatusMessage(null);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0d1220] p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
              <Settings className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                BrandForge AI Settings
              </h2>
              <p className="text-xs text-slate-400">
                Configure generative model provider and inference parameters.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Engine Selection */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-300">
            Select Active AI Engine
          </span>

          <div className="space-y-2">
            {/* Built-in Neural Engine */}
            <div
              onClick={() => setProvider('local')}
              className={`cursor-pointer rounded-xl border p-3.5 transition-all ${
                provider === 'local'
                  ? 'border-indigo-500/50 bg-indigo-600/15 shadow-sm glow-indigo'
                  : 'border-white/5 bg-black/20 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <Cpu className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white">
                    Built-in Neural Intelligence (Recommended)
                  </span>
                </div>
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                  Zero Setup Needed
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                100% offline-ready, high-speed deterministic heuristic synthesis. Guarantees complete stage generation without API keys or rate limits.
              </p>
            </div>

            {/* Google Gemini */}
            <div
              onClick={() => {
                setProvider('gemini');
                if (model.includes('gpt')) setModel('gemini-1.5-flash');
              }}
              className={`cursor-pointer rounded-xl border p-3.5 transition-all ${
                provider === 'gemini'
                  ? 'border-indigo-500/50 bg-indigo-600/15 shadow-sm glow-indigo'
                  : 'border-white/5 bg-black/20 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <Sparkles className="h-4 w-4 text-indigo-400" />
                  <span className="text-xs font-bold text-white">
                    Google Gemini API (Live LLM)
                  </span>
                </div>
                <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-400">
                  Gemini 1.5 Flash / Pro
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Direct live inference via Google Generative AI REST API with structured JSON output formatting.
              </p>
            </div>

            {/* OpenAI */}
            <div
              onClick={() => {
                setProvider('openai');
                if (model.includes('gemini')) setModel('gpt-4o-mini');
              }}
              className={`cursor-pointer rounded-xl border p-3.5 transition-all ${
                provider === 'openai'
                  ? 'border-indigo-500/50 bg-indigo-600/15 shadow-sm glow-indigo'
                  : 'border-white/5 bg-black/20 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <Zap className="h-4 w-4 text-purple-400" />
                  <span className="text-xs font-bold text-white">
                    OpenAI API (Live LLM)
                  </span>
                </div>
                <span className="rounded bg-purple-500/10 px-2 py-0.5 text-[10px] font-semibold text-purple-400">
                  GPT-4o Mini
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Call OpenAI endpoints with JSON schema enforcement.
              </p>
            </div>
          </div>
        </div>

        {/* API Key Input (if not local) */}
        {provider !== 'local' && (
          <div className="space-y-3 pt-2 border-t border-white/10">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>{provider === 'gemini' ? 'Google Gemini API Key' : 'OpenAI API Key'}</span>
                <span className="text-[10px] text-slate-400">Stored safely in browser</span>
              </label>
              <div className="relative flex items-center">
                <Key className="pointer-events-none absolute left-3 h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={provider === 'gemini' ? 'AIzaSy...' : 'sk-...'}
                  className="w-full rounded-xl border border-white/10 bg-black/30 pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Model Name</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder={provider === 'gemini' ? 'gemini-1.5-flash' : 'gpt-4o-mini'}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="flex items-start space-x-2 rounded-lg bg-indigo-500/10 p-3 text-[11px] text-indigo-300 border border-indigo-500/20">
              <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>
                Note: If the API key is empty or returns a rate limit, the system gracefully and instantaneously falls back to the Built-in Neural Engine so your experience never breaks.
              </span>
            </div>
          </div>
        )}

        {/* Status message */}
        {statusMessage && (
          <div className="rounded-lg bg-emerald-500/10 p-2 text-xs font-medium text-emerald-400 border border-emerald-500/20 text-center">
            {statusMessage}
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-4 flex items-center justify-end space-x-3 border-t border-white/10">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-1.5 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};
