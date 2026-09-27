import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, Text, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from .db import Base

class ProjectModel(Base):
    __tablename__ = "projects"

    id = Column(String(100), primary_key=True)
    name = Column(String(150), nullable=False)
    current_stage = Column(Integer, default=1)
    progress_percentage = Column(Integer, default=0)
    overall_health_score = Column(Float, default=0.0)
    status = Column(String(50), default="active")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    ideas = relationship("IdeaModel", back_populates="project", cascade="all, delete-orphan")
    evaluations = relationship("EvaluationModel", back_populates="project", cascade="all, delete-orphan")
    scores = relationship("ScoreModel", back_populates="project", cascade="all, delete-orphan")
    launch_assets = relationship("LaunchAssetModel", back_populates="project", cascade="all, delete-orphan")


class IdeaModel(Base):
    __tablename__ = "ideas"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = Column(String(100), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    raw_idea = Column(Text, nullable=False)
    target_market = Column(Text)
    existing_problem = Column(Text)
    location_market = Column(String(150))
    business_goals = Column(Text)
    constraints = Column(Text)
    competitors = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("ProjectModel", back_populates="ideas")


class EvaluationModel(Base):
    __tablename__ = "ai_evaluations"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = Column(String(100), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    category = Column(String(100), nullable=False)
    severity = Column(String(20), default="warning")
    issue = Column(Text, nullable=False)
    original_draft = Column(Text, nullable=False)
    critique_reason = Column(Text, nullable=False)
    alternative_angle = Column(Text, nullable=False)
    revised_result = Column(Text, nullable=False)
    status = Column(String(50), default="applied")
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("ProjectModel", back_populates="evaluations")


class ScoreModel(Base):
    __tablename__ = "brand_scores"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = Column(String(100), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    overall_score = Column(Float, nullable=False)
    rf_quality_score = Column(Float, nullable=False)
    dl_semantic_distinctiveness = Column(Float, nullable=False)
    critic_coherence_score = Column(Float, nullable=False)
    guardian_consistency_score = Column(Float, nullable=False)
    features_breakdown = Column(JSON, nullable=False)
    rf_feature_importances = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("ProjectModel", back_populates="scores")


class LaunchAssetModel(Base):
    __tablename__ = "launch_assets"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = Column(String(100), ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    asset_type = Column(String(100), nullable=False)
    title = Column(String(255))
    content = Column(Text, nullable=False)
    metadata_json = Column(JSON, default={})
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("ProjectModel", back_populates="launch_assets")
