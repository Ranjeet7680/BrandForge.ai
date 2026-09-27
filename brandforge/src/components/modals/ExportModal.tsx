'use client';

import React, { useState } from 'react';
import {
  X,
  Download,
  Copy,
  Check,
  Printer,
  FileCode
} from 'lucide-react';
import { BrandProject } from '@/types/brand';

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
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(project, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `${project.name.toLowerCase()}-brand-system.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(project, null, 2));
    setCopiedType('json');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handlePrint = () => {
    onClose();
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0d1220] p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <Download className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Export Brand System
              </h2>
              <p className="text-xs text-slate-400">
                Download or copy structured assets for production development.
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

        {/* Export Options */}
        <div className="space-y-3">
          {/* JSON Option */}
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <FileCode className="h-4 w-4 text-indigo-400" />
                <span className="text-xs font-bold text-white">Complete JSON Schema</span>
              </div>
              <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-[10px] font-mono text-indigo-300">
                .json
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Contains all 6 stages, token values, debate transcripts, and critic audits for programmatic consumption.
            </p>
            <div className="flex items-center space-x-2 pt-1">
              <button
                onClick={downloadJson}
                className="flex-1 flex items-center justify-center space-x-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download .JSON</span>
              </button>
              <button
                onClick={copyJson}
                className="flex items-center space-x-1.5 rounded-lg border border-white/10 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white"
              >
                {copiedType === 'json' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedType === 'json' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Printable Style Guide */}
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Printer className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">Print / Save as PDF</span>
              </div>
              <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
                .pdf
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Formats the entire Brand Launch Kit into a clean, presentation-ready print document.
            </p>
            <button
              onClick={handlePrint}
              className="w-full flex items-center justify-center space-x-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Open Print / PDF Dialog</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
