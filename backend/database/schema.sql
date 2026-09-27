-- BrandForge AI: Enterprise PostgreSQL Schema
-- Inkloom Brand Intelligence Engine Database Specification

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(150),
    organization VARCHAR(150),
    role VARCHAR(50) DEFAULT 'founder',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Brand Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(100) PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    name VARCHAR(150) NOT NULL,
    current_stage INTEGER DEFAULT 1,
    progress_percentage INTEGER DEFAULT 0,
    overall_health_score NUMERIC(5,2) DEFAULT 0.00,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Raw Founder Ideas & Inputs
CREATE TABLE IF NOT EXISTS ideas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id VARCHAR(100) REFERENCES projects(id) ON DELETE CASCADE,
    raw_idea TEXT NOT NULL,
    target_market TEXT,
    existing_problem TEXT,
    location_market VARCHAR(150),
    business_goals TEXT,
    constraints TEXT,
    competitors TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Audiences & Target Segments (Stage 1)
CREATE TABLE IF NOT EXISTS audiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id VARCHAR(100) REFERENCES projects(id) ON DELETE CASCADE,
    segment_name VARCHAR(150) NOT NULL,
    description TEXT,
    pain_level INTEGER CHECK (pain_level BETWEEN 1 AND 10),
    functional_pains JSONB DEFAULT '[]'::jsonb,
    emotional_pains JSONB DEFAULT '[]'::jsonb,
    financial_pains JSONB DEFAULT '[]'::jsonb,
    jtbd_functional TEXT,
    jtbd_emotional TEXT,
    jtbd_social TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Strategic Positioning & Category (Stage 2)
CREATE TABLE IF NOT EXISTS positioning (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id VARCHAR(100) REFERENCES projects(id) ON DELETE CASCADE,
    category VARCHAR(200) NOT NULL,
    category_definition TEXT,
    value_proposition TEXT NOT NULL,
    differentiator TEXT NOT NULL,
    competitive_angle TEXT,
    positioning_statement TEXT NOT NULL,
    target_persona JSONB DEFAULT '{}'::jsonb,
    competitive_quadrant JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Brand Personalities & Tone (Stage 3)
CREATE TABLE IF NOT EXISTS personalities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id VARCHAR(100) REFERENCES projects(id) ON DELETE CASCADE,
    traits JSONB NOT NULL DEFAULT '[]'::jsonb,
    traits_to_avoid JSONB NOT NULL DEFAULT '[]'::jsonb,
    voice_sliders JSONB NOT NULL DEFAULT '{}'::jsonb,
    dos JSONB DEFAULT '[]'::jsonb,
    donts JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Brand Names & Naming Territories (Stage 3)
CREATE TABLE IF NOT EXISTS brand_names (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id VARCHAR(100) REFERENCES projects(id) ON DELETE CASCADE,
    candidate_name VARCHAR(100) NOT NULL,
    territory VARCHAR(150),
    rationale TEXT,
    domain_suggestion VARCHAR(150),
    feasibility_score NUMERIC(5,2),
    is_selected BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Visual Directions & Design Tokens (Stage 4)
CREATE TABLE IF NOT EXISTS visual_directions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id VARCHAR(100) REFERENCES projects(id) ON DELETE CASCADE,
    logo_concept JSONB NOT NULL,
    color_palette JSONB NOT NULL,
    typography JSONB NOT NULL,
    shapes_geometry JSONB DEFAULT '{}'::jsonb,
    imagery_direction JSONB DEFAULT '{}'::jsonb,
    ui_mood JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. AI Multi-Agent Runs & Debate Transcripts (Brand Battle)
CREATE TABLE IF NOT EXISTS ai_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id VARCHAR(100) REFERENCES projects(id) ON DELETE CASCADE,
    stage VARCHAR(50) NOT NULL,
    agent_id VARCHAR(100),
    agent_role VARCHAR(100),
    prompt_tokens INTEGER,
    completion_tokens INTEGER,
    model_name VARCHAR(100),
    transcript JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. AI Critic Diagnostics & Contradictions (Stage 5)
CREATE TABLE IF NOT EXISTS ai_evaluations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id VARCHAR(100) REFERENCES projects(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    severity VARCHAR(20) CHECK (severity IN ('critical', 'warning', 'suggestion')),
    issue TEXT NOT NULL,
    original_draft TEXT NOT NULL,
    critique_reason TEXT NOT NULL,
    alternative_angle TEXT NOT NULL,
    revised_result TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'applied',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Multi-Signal Brand Scores (Random Forest + DL + AI)
CREATE TABLE IF NOT EXISTS brand_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id VARCHAR(100) REFERENCES projects(id) ON DELETE CASCADE,
    overall_score NUMERIC(5,2) NOT NULL,
    rf_quality_score NUMERIC(5,2) NOT NULL,
    dl_semantic_distinctiveness NUMERIC(5,2) NOT NULL,
    critic_coherence_score NUMERIC(5,2) NOT NULL,
    guardian_consistency_score NUMERIC(5,2) NOT NULL,
    features_breakdown JSONB NOT NULL,
    rf_feature_importances JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Complete Launch Assets (Stage 6)
CREATE TABLE IF NOT EXISTS launch_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id VARCHAR(100) REFERENCES projects(id) ON DELETE CASCADE,
    asset_type VARCHAR(100) NOT NULL, -- 'landing_page', 'instagram', 'linkedin', 'twitter', 'press_release'
    title VARCHAR(255),
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. Brand Versions & Snapshots
CREATE TABLE IF NOT EXISTS brand_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id VARCHAR(100) REFERENCES projects(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    change_summary TEXT,
    snapshot_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_ideas_project_id ON ideas(project_id);
CREATE INDEX IF NOT EXISTS idx_brand_scores_project_id ON brand_scores(project_id);
CREATE INDEX IF NOT EXISTS idx_launch_assets_project_id ON launch_assets(project_id);
CREATE INDEX IF NOT EXISTS idx_ai_evaluations_project_id ON ai_evaluations(project_id);
