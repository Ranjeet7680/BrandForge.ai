'use client';

import React, { useState } from 'react';
import { Bell, X, ShieldAlert, Cpu, Sparkles, Scale } from 'lucide-react';
import { soundEngine } from '@/lib/sound-engine';

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  type: 'critic' | 'guardian' | 'ml' | 'battle';
}

interface NotificationsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToStage: (stage: string) => void;
}

export const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({
  isOpen,
  onClose,
  onNavigateToStage,
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: 'Critic Guardrail Alert Resolved',
      description: 'Agent D detected and corrected a vague buzzword in the Taglines territory.',
      time: '5m ago',
      unread: true,
      type: 'critic',
    },
    {
      id: '2',
      title: 'Guardian Copy Audit Pass',
      description: 'Agent E verified WCAG AA compliance across brand color palette tokens.',
      time: '18m ago',
      unread: true,
      type: 'guardian',
    },
    {
      id: '3',
      title: 'Random Forest Model Scored',
      description: 'Scikit-learn Regressor completed 8-vector brand quality inference (92%).',
      time: '1h ago',
      unread: true,
      type: 'ml',
    },
    {
      id: '4',
      title: 'Brand Battle Consensus',
      description: '5-agent debate round concluded with unanimous endorsement on positioning.',
      time: '2h ago',
      unread: false,
      type: 'battle',
    },
  ]);

  if (!isOpen) return null;

  const markAllRead = () => {
    soundEngine.playClick();
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleClickItem = (item: NotificationItem) => {
    soundEngine.playClick();
    if (item.type === 'critic') onNavigateToStage('critic');
    if (item.type === 'guardian') onNavigateToStage('guardian');
    if (item.type === 'ml') onNavigateToStage('quality');
    if (item.type === 'battle') onNavigateToStage('battle');
    onClose();
  };

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'critic':
        return <ShieldAlert className="h-4 w-4 text-amber-400" />;
      case 'guardian':
        return <Scale className="h-4 w-4 text-teal-400" />;
      case 'ml':
        return <Cpu className="h-4 w-4 text-emerald-400" />;
      case 'battle':
        return <Sparkles className="h-4 w-4 text-purple-400" />;
    }
  };

  return (
    <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-2xl border border-white/10 bg-[#0c101d] p-4 shadow-2xl shadow-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <Bell className="h-4 w-4 text-indigo-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Agent Intelligence Alerts
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={markAllRead}
            className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Mark all read
          </button>
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="divide-y divide-white/5 max-h-72 overflow-y-auto mt-2 space-y-1">
        {notifications.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClickItem(item)}
            className={`p-2.5 rounded-xl cursor-pointer transition-colors flex items-start space-x-3 ${
              item.unread ? 'bg-indigo-950/20 hover:bg-indigo-950/30' : 'hover:bg-slate-900/60'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">{getIcon(item.type)}</div>
            <div className="space-y-0.5 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate">{item.title}</span>
                <span className="text-[10px] text-slate-500 font-mono flex-shrink-0">{item.time}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
                {item.description}
              </p>
            </div>
            {item.unread && (
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-white/5 text-center">
        <button
          onClick={() => {
            soundEngine.playClick();
            onNavigateToStage('guardian');
            onClose();
          }}
          className="text-xs text-slate-400 hover:text-white font-medium"
        >
          View All Brand Guardrail Logs →
        </button>
      </div>
    </div>
  );
};
