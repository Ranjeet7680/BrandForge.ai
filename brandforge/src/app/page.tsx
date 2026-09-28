'use client';

import React, { useState, useEffect } from 'react';
import { PRESET_PROJECTS } from '@/lib/brand-engine/presets';
import { BrandProject, RawBrandInput, Stage1Discover } from '@/types/brand';
import { AIConfig } from '@/lib/brand-engine/llm-service';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Sidebar, ActiveTab } from '@/components/Sidebar';
import { StageProgress } from '@/components/StageProgress';
import { DynamicIsland } from '@/components/DynamicIsland';
import { LandingView } from '@/components/LandingView';
import { WelcomeLoading } from '@/components/WelcomeLoading';
import { AuthModal, AuthMode } from '@/components/auth/AuthModal';
import { CommandPalette } from '@/components/CommandPalette';
import { MobileNav } from '@/components/MobileNav';

import { OverviewStage } from '@/components/stages/OverviewStage';
import { DiscoverStage } from '@/components/stages/DiscoverStage';
import { PositionStage } from '@/components/stages/PositionStage';
import { PersonalityStage } from '@/components/stages/PersonalityStage';
import { VisualIdentityStage } from '@/components/stages/VisualIdentityStage';
import { BrandCriticStage } from '@/components/stages/BrandCriticStage';
import { BrandBattleStage } from '@/components/stages/BrandBattleStage';
import { GuardianStage } from '@/components/stages/GuardianStage';
import { QualityReportStage } from '@/components/stages/QualityReportStage';
import { LaunchKitStage } from '@/components/stages/LaunchKitStage';

import { NewProjectModal } from '@/components/modals/NewProjectModal';
import { SettingsModal } from '@/components/modals/SettingsModal';
import { ExportModal } from '@/components/modals/ExportModal';

export default function Home() {
  const [projects, setProjects] = useState<BrandProject[]>(PRESET_PROJECTS);
  const [currentProjectId, setCurrentProjectId] = useState<string>(PRESET_PROJECTS[0].id);
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [showLanding, setShowLanding] = useState<boolean>(true);
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  // Auth & User Profile State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [currentUser, setCurrentUser] = useState({
    name: 'Ranjeet Kumar',
    email: 'rajranjeet7680@gmail.com',
    role: 'Student Builder',
  });

  // Modals & Navigation
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [aiConfig, setAiConfig] = useState<AIConfig>({
    provider: 'local',
  });

  const handleFinishWelcome = () => {
    setShowWelcome(false);
    setShowLanding(true);
  };

  const handleReplayWelcome = () => {
    setShowWelcome(true);
  };

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

  // Global ⌘K / Ctrl+K listener for Spotlight Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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

  const handleUpdateDiscover = (updatedDiscover: Stage1Discover) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === currentProjectId) {
          return {
            ...p,
            stage1Discover: updatedDiscover,
          };
        }
        return p;
      })
    );
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

  // Open Auth modal for specific flow
  const handleOpenAuth = (mode: AuthMode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (user: { name: string; email: string; role: string }) => {
    setCurrentUser(user);
    setShowLanding(false);
    setActiveTab('overview');
  };

  const handleCreateProject = (
    name?: string,
    idea?: string,
    tier?: string,
    category?: string,
    targetAudience?: string
  ) => {
    handleCreateNewProject({
      idea: idea || name || 'Autonomous AI Brand Intelligence Project',
      targetMarket: targetAudience || 'Modern Builders and Innovators',
      existingProblem: 'Lack of unified brand intelligence, strategy, and design alignment',
      location: 'Global (Online-first)',
      businessGoals: `Launch ${name || 'Product'} with category creation and launch-ready identity`,
      constraints: 'Fast execution, high distinctiveness',
      competitors: category || 'Incumbent platforms',
    });
  };

  return (
    <div className="min-h-screen bg-[#090c15] text-slate-100 flex flex-col font-sans">
      {/* 1. Cinematic Welcome Loading Screen (Plays first or on replay) */}
      {showWelcome && <WelcomeLoading onComplete={handleFinishWelcome} />}

      {showLanding ? (
        <LandingView
          onStartBuilding={() => handleOpenAuth('login')}
          onViewExample={(presetId?: string) => {
            if (presetId) {
              setCurrentProjectId(presetId);
            } else {
              setCurrentProjectId('project-hackforge');
            }
            setActiveTab('overview');
            setShowLanding(false);
          }}
          onOpenAuth={handleOpenAuth}
          onNavigateToDashboard={(tab) => {
            if (tab) setActiveTab(tab as ActiveTab);
            setShowLanding(false);
          }}
          onLoadTemplate={(template) => {
            handleCreateProject(
              template.name,
              template.idea,
              'pro',
              template.category,
              template.targetAudience
            );
          }}
          user={currentUser}
        />
      ) : (
        <>
          {/* Top Navigation for Workspace */}
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
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            onReplayLoading={handleReplayWelcome}
            onOpenLanding={() => setShowLanding(true)}
            user={currentUser}
            onOpenAuth={() => handleOpenAuth('login')}
            onLogout={() => {
              handleOpenAuth('login');
            }}
          />

          {/* Stage Breadcrumb Bar */}
          <StageProgress
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenNewModal={() => setIsNewModalOpen(true)}
          />

          {/* iOS Dynamic Island Status Hub */}
          <DynamicIsland
            currentProject={currentProject}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenExportModal={() => setIsExportModalOpen(true)}
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
              onOpenNewModal={() => setIsNewModalOpen(true)}
            />

            {/* Dynamic Stage View Container with iOS Spring Physics */}
            <main className="flex-1 overflow-y-auto px-4 py-4 sm:px-8 lg:px-10 pb-28 md:pb-12">
              <div className="mx-auto max-w-6xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 14, scale: 0.992 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.992 }}
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 32,
                      mass: 0.8,
                    }}
                  >
                    {activeTab === 'overview' && (
                      <OverviewStage
                        project={currentProject}
                        setActiveTab={setActiveTab}
                        onOpenExportModal={() => setIsExportModalOpen(true)}
                        onOpenNewModal={() => setIsNewModalOpen(true)}
                        onSelectProject={handleSelectProject}
                        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
                      />
                    )}

                    {activeTab === 'discover' && (
                      <DiscoverStage
                        discover={currentProject.stage1Discover}
                        rawIdea={currentProject.rawInput.idea}
                        targetMarket={currentProject.rawInput.targetMarket}
                        onProceedToNext={() => setActiveTab('position')}
                        onUpdateDiscover={handleUpdateDiscover}
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
                        onProceedToDeliver={() => setActiveTab('quality')}
                      />
                    )}

                    {activeTab === 'quality' && (
                      <QualityReportStage
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
                  </motion.div>
                </AnimatePresence>
              </div>
            </main>
          </div>

          {/* Mobile Bottom Navigation */}
          <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
      )}

      {/* Modals & Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        projects={projects}
        onSelectProject={handleSelectProject}
        onNavigateToStage={(tab) => {
          setActiveTab(tab as ActiveTab);
          setShowLanding(false);
        }}
        onOpenNewModal={() => setIsNewModalOpen(true)}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        onLoginSuccess={handleLoginSuccess}
      />

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
