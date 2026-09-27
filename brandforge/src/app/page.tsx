'use client';

import React, { useState, useEffect } from 'react';
import { PRESET_PROJECTS } from '@/lib/brand-engine/presets';
import { BrandProject, RawBrandInput } from '@/types/brand';
import { AIConfig } from '@/lib/brand-engine/llm-service';
import { Navbar } from '@/components/Navbar';
import { Sidebar, ActiveTab } from '@/components/Sidebar';
import { StageProgress } from '@/components/StageProgress';
import { LandingView } from '@/components/LandingView';

import { OverviewStage } from '@/components/stages/OverviewStage';
import { DiscoverStage } from '@/components/stages/DiscoverStage';
import { PositionStage } from '@/components/stages/PositionStage';
import { PersonalityStage } from '@/components/stages/PersonalityStage';
import { VisualIdentityStage } from '@/components/stages/VisualIdentityStage';
import { BrandCriticStage } from '@/components/stages/BrandCriticStage';
import { BrandBattleStage } from '@/components/stages/BrandBattleStage';
import { GuardianStage } from '@/components/stages/GuardianStage';
import { LaunchKitStage } from '@/components/stages/LaunchKitStage';

import { NewProjectModal } from '@/components/modals/NewProjectModal';
import { SettingsModal } from '@/components/modals/SettingsModal';
import { ExportModal } from '@/components/modals/ExportModal';

export default function Home() {
  const [projects, setProjects] = useState<BrandProject[]>(PRESET_PROJECTS);
  const [currentProjectId, setCurrentProjectId] = useState<string>(PRESET_PROJECTS[0].id);
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [showLanding, setShowLanding] = useState<boolean>(false);

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [aiConfig, setAiConfig] = useState<AIConfig>({
    provider: 'local',
  });

  // Load saved config and custom projects from localStorage
  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem('brandforge_ai_config');
      if (savedConfig) {
        setAiConfig(JSON.parse(savedConfig));
      }
      const savedProjects = localStorage.getItem('brandforge_projects');
      if (savedProjects) {
        const parsed = JSON.parse(savedProjects);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects([...PRESET_PROJECTS, ...parsed]);
        }
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
  }, []);

  const saveAiConfig = (newConfig: AIConfig) => {
    setAiConfig(newConfig);
    try {
      localStorage.setItem('brandforge_ai_config', JSON.stringify(newConfig));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  };

  const currentProject = projects.find((p) => p.id === currentProjectId) || projects[0];

  const handleSelectProject = (id: string) => {
    setCurrentProjectId(id);
    setShowLanding(false);
  };

  const handleCreateNewProject = async (input: RawBrandInput) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, config: aiConfig }),
      });

      if (!res.ok) {
        throw new Error('API generation failed');
      }

      const data = await res.json();
      if (data.success && data.project) {
        const newProj = data.project as BrandProject;
        setProjects((prev) => [newProj, ...prev]);
        setCurrentProjectId(newProj.id);
        setActiveTab('overview');
        setShowLanding(false);
        setIsNewModalOpen(false);

        // Store custom projects
        try {
          const customOnly = [newProj, ...projects.filter((p) => !p.id.startsWith('project-'))];
          localStorage.setItem('brandforge_projects', JSON.stringify(customOnly));
        } catch {
          // ignore
        }
      }
    } catch (err) {
      console.error('Error generating brand project:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadPreset = (presetId: string) => {
    setCurrentProjectId(presetId);
    setShowLanding(false);
  };

  const handleUpdateSelectedName = (newName: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === currentProjectId) {
          return {
            ...p,
            name: newName,
            stage3Shape: {
              ...p.stage3Shape,
              selectedBrandName: newName,
            },
            stage6LaunchKit: {
              ...p.stage6LaunchKit,
              brandStrategySummary: {
                ...p.stage6LaunchKit.brandStrategySummary,
                brandName: newName,
              },
            },
          };
        }
        return p;
      })
    );
  };

  const handleUpdateSelectedTagline = (newTagline: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === currentProjectId) {
          return {
            ...p,
            stage3Shape: {
              ...p.stage3Shape,
              selectedTagline: newTagline,
            },
            stage6LaunchKit: {
              ...p.stage6LaunchKit,
              brandIdentitySummary: {
                ...p.stage6LaunchKit.brandIdentitySummary,
                tagline: newTagline,
              },
            },
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#090c15] text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        currentProject={currentProject}
        projects={projects}
        onSelectProject={handleSelectProject}
        onOpenNewModal={() => setIsNewModalOpen(true)}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        aiSource={aiConfig.provider}
        onNavigateToStage={(tab) => {
          setActiveTab(tab as ActiveTab);
          setShowLanding(false);
        }}
      />

      {/* Top Banner toggle for Landing vs Dashboard */}
      <div className="no-print bg-[#0b0f1a] border-b border-white/5 px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center space-x-2">
          <span>Mode:</span>
          <button
            onClick={() => setShowLanding(false)}
            className={`rounded px-2 py-0.5 font-medium transition-colors ${
              !showLanding ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Workspace Dashboard
          </button>
          <button
            onClick={() => setShowLanding(true)}
            className={`rounded px-2 py-0.5 font-medium transition-colors ${
              showLanding ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Landing Presentation
          </button>
        </div>

        <div className="hidden sm:flex items-center space-x-3">
          <span>Inkloom AI Brand Intelligence Engine</span>
          <span>•</span>
          <span className="text-emerald-400">6 Stages Validated</span>
        </div>
      </div>

      {showLanding ? (
        <LandingView
          onStartBuilding={() => setIsNewModalOpen(true)}
          onViewExample={() => {
            setCurrentProjectId('project-hackforge');
            setActiveTab('overview');
            setShowLanding(false);
          }}
        />
      ) : (
        <>
          {/* Stage Breadcrumb Bar */}
          <StageProgress
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenNewModal={() => setIsNewModalOpen(true)}
          />

          {/* Main App Workspace */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <Sidebar
              activeTab={activeTab}
              setActiveTab={(tab) => {
                if (tab === 'settings') {
                  setIsSettingsModalOpen(true);
                } else {
                  setActiveTab(tab);
                }
              }}
              project={currentProject}
            />

            {/* Dynamic Stage View Container */}
            <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 lg:px-10">
              <div className="mx-auto max-w-6xl">
                {activeTab === 'overview' && (
                  <OverviewStage
                    project={currentProject}
                    setActiveTab={setActiveTab}
                    onOpenExportModal={() => setIsExportModalOpen(true)}
                  />
                )}

                {activeTab === 'discover' && (
                  <DiscoverStage
                    discover={currentProject.stage1Discover}
                    rawIdea={currentProject.rawInput.idea}
                    targetMarket={currentProject.rawInput.targetMarket}
                    onProceedToNext={() => setActiveTab('position')}
                  />
                )}

                {activeTab === 'position' && (
                  <PositionStage
                    position={currentProject.stage2Position}
                    brandName={currentProject.name}
                    onProceedToNext={() => setActiveTab('shape')}
                  />
                )}

                {activeTab === 'shape' && (
                  <PersonalityStage
                    shape={currentProject.stage3Shape}
                    onUpdateSelectedName={handleUpdateSelectedName}
                    onUpdateSelectedTagline={handleUpdateSelectedTagline}
                    onProceedToNext={() => setActiveTab('visualize')}
                  />
                )}

                {activeTab === 'visualize' && (
                  <VisualIdentityStage
                    visualize={currentProject.stage4Visualize}
                    brandName={currentProject.name}
                    onProceedToNext={() => setActiveTab('critic')}
                  />
                )}

                {activeTab === 'critic' && (
                  <BrandCriticStage
                    critic={currentProject.stage5Critic}
                    brandName={currentProject.name}
                    onProceedToBattle={() => setActiveTab('battle')}
                    onProceedToDeliver={() => setActiveTab('launch')}
                  />
                )}

                {activeTab === 'battle' && (
                  <BrandBattleStage
                    battleData={currentProject.brandBattle}
                    brandName={currentProject.name}
                    onProceedToDeliver={() => setActiveTab('launch')}
                  />
                )}

                {activeTab === 'guardian' && (
                  <GuardianStage
                    project={currentProject}
                    onProceedToDeliver={() => setActiveTab('launch')}
                  />
                )}

                {activeTab === 'launch' && (
                  <LaunchKitStage
                    project={currentProject}
                    onOpenExportModal={() => setIsExportModalOpen(true)}
                  />
                )}
              </div>
            </main>
          </div>
        </>
      )}

      {/* Modals */}
      <NewProjectModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSubmit={handleCreateNewProject}
        isLoading={isLoading}
        onLoadPreset={handleLoadPreset}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        config={aiConfig}
        onSaveConfig={saveAiConfig}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        project={currentProject}
      />
    </div>
  );
}
