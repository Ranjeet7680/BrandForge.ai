export interface RawBrandInput {
  idea: string;
  targetMarket: string;
  existingProblem: string;
  location: string;
  businessGoals: string;
  constraints: string;
  competitors: string;
}

export interface TargetUserSegment {
  name: string;
  description: string;
  painLevel: number; // 1-10
}

export interface UserPainPoints {
  functional: string[];
  emotional: string[];
  financial: string[];
}

export interface JobToBeDone {
  functional: string;
  emotional: string;
  social: string;
}

export interface AssumptionItem {
  assumption: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  validationApproach: string;
}

export interface Stage1Discover {
  coreProblem: string;
  targetUsers: TargetUserSegment[];
  userPainPoints: UserPainPoints;
  jobsToBeDone: JobToBeDone[];
  existingAssumptions: AssumptionItem[];
  unansweredQuestions: string[];
}

export interface TargetPersona {
  name: string;
  role: string;
  ageRange: string;
  quote: string;
  painTriggers: string[];
  desiredOutcomes: string[];
  buyingResistance: string;
}

export interface CompetitorCoord {
  name: string;
  x: number; // -100 to 100
  y: number; // -100 to 100
}

export interface CompetitiveQuadrant {
  xAxis: { left: string; right: string };
  yAxis: { bottom: string; top: string };
  competitors: CompetitorCoord[];
  ourPosition: CompetitorCoord;
}

export interface Stage2Position {
  category: string;
  categoryDefinition: string;
  valueProposition: string;
  differentiator: string;
  competitiveAngle: string;
  positioningStatement: string;
  targetPersona: TargetPersona;
  uniqueSellingProposition: string;
  competitiveQuadrant: CompetitiveQuadrant;
}

export interface PersonalityTrait {
  trait: string;
  description: string;
  manifestation: string;
}

export interface TraitToAvoid {
  trait: string;
  why: string;
  ruleOfThumb: string;
}

export interface NamingCandidate {
  name: string;
  rationale: string;
  domainSuggestion: string;
  score: number;
}

export interface NamingTerritory {
  territory: string;
  description: string;
  examples: NamingCandidate[];
}

export interface TaglineOption {
  text: string;
  style: 'Action' | 'Outcome' | 'Provocative';
  rationale: string;
}

export interface MessagingPillar {
  title: string;
  explanation: string;
  proofPoint: string;
}

export interface MessagingHierarchy {
  promise: string;
  pillars: MessagingPillar[];
}

export interface VoiceDimension {
  dimension: string;
  value: number; // 0-100
  leftLabel: string;
  rightLabel: string;
}

export interface BrandVoice {
  attributes: VoiceDimension[];
  dos: string[];
  donts: string[];
}

export interface Stage3Shape {
  personalityTraits: PersonalityTrait[];
  traitsToAvoid: TraitToAvoid[];
  namingTerritories: NamingTerritory[];
  selectedBrandName: string;
  taglines: TaglineOption[];
  selectedTagline: string;
  oneLinePitch: string;
  messagingHierarchy: MessagingHierarchy;
  brandVoice: BrandVoice;
}

export interface ColorSwatch {
  role: 'Primary' | 'Secondary' | 'Accent' | 'Dark' | 'Light' | 'Surface';
  name: string;
  hex: string;
  rgb: string;
  hsl: string;
  psychology: string;
  contrastRatio: string;
}

export interface LogoConcept {
  primaryMark: string;
  symbolism: string;
  svgStyle: 'geometric' | 'monogram' | 'abstract' | 'minimalist';
  svgIconType: string;
  secondaryVariant: string;
}

export interface TypographyPairing {
  headlineFont: string;
  headlineClass: string;
  bodyFont: string;
  bodyClass: string;
  accentFont: string;
  rationale: string;
  specimen: {
    headlineSample: string;
    bodySample: string;
  };
}

export interface ShapeAndGeometry {
  style: string;
  radius: string;
  description: string;
  usageExamples: string[];
}

export interface ImageryDirection {
  moodKeywords: string[];
  lighting: string;
  composition: string;
  subjectMatter: string;
  aiImagePrompts: string[];
}

export interface UiMood {
  aesthetic: string;
  surfaces: string;
  elevation: string;
  microInteractions: string;
}

export interface DesignReference {
  brandOrProduct: string;
  whatToEmulate: string;
}

export interface Stage4Visualize {
  logoConcept: LogoConcept;
  typography: TypographyPairing;
  colorPalette: ColorSwatch[];
  shapesAndGeometry: ShapeAndGeometry;
  imageryDirection: ImageryDirection;
  uiMood: UiMood;
  designReferences: DesignReference[];
  visualsToAvoid: string[];
}

export interface CritiquePoint {
  id: string;
  category:
    | 'Generic Names'
    | 'Startup Cliché'
    | 'Conflicting Personality'
    | 'Audience Mismatch'
    | 'Weak Value Prop'
    | 'Cliché Visuals'
    | 'Inconsistent Messaging';
  severity: 'critical' | 'warning' | 'suggestion';
  issue: string;
  original: string;
  critiqueReason: string;
  alternative: string;
  revisedResult: string;
  status: 'applied' | 'pending';
}

export interface RadarScores {
  distinctiveness: number;
  audienceFit: number;
  memorability: number;
  scalability: number;
  consistency: number;
}

export interface Stage5Critic {
  overallHealthScore: number;
  radarScores: RadarScores;
  critiquePoints: CritiquePoint[];
}

export interface BattleAgent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  badge: string;
  color: string;
  stance: string;
}

export interface DebateRound {
  round: number;
  speaker: string;
  agentRole: string;
  avatar: string;
  statement: string;
  critiqueOf?: string;
  recommendation: string;
}

export interface GuardianAuditCheck {
  passed: boolean;
  score: number;
  note: string;
  suggestion: string;
}

export interface GuardianAudit {
  nameConsistency: GuardianAuditCheck;
  taglineAlignment: GuardianAuditCheck;
  personalityGuard: GuardianAuditCheck;
  visualCoherence: GuardianAuditCheck;
  launchMessagingCheck: GuardianAuditCheck;
}

export interface BrandBattleData {
  arenaTopic: string;
  agents: BattleAgent[];
  debateRounds: DebateRound[];
  guardianAudit: GuardianAudit;
  orchestratorSynthesis: {
    verdict: string;
    consensusPillars: string[];
    actionableTweaks: string[];
  };
}

export interface BulletFeature {
  title: string;
  desc: string;
}

export interface Stage6LaunchKit {
  brandStrategySummary: {
    brandName: string;
    category: string;
    mission: string;
    vision: string;
    targetAudience: string;
    problem: string;
    valueProposition: string;
    positioning: string;
  };
  brandIdentitySummary: {
    personality: string[];
    principles: string[];
    toneOfVoice: string[];
    namingRationale: string;
    tagline: string;
    oneLinePitch: string;
  };
  visualSystemSummary: {
    logoDirection: string;
    colorPalette: { name: string; hex: string; role: string }[];
    typography: { headline: string; body: string };
    visualMood: string;
    imageryDirection: string;
  };
  marketingAssets: {
    landingHeadline: string;
    landingSubheadline: string;
    heroCopy: string;
    productDescription: string;
    bulletFeatures: BulletFeature[];
    instagramPost: {
      caption: string;
      hashtags: string[];
      visualDescription: string;
    };
    linkedInPost: {
      hook: string;
      body: string;
      cta: string;
    };
    twitterThread: string[];
    launchAnnouncement: string;
    primaryCta: string;
    secondaryCta: string;
  };
}

export interface BrandProject {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  currentStage: number; // 1 to 6
  progressPercentage: number;
  rawInput: RawBrandInput;
  stage1Discover: Stage1Discover;
  stage2Position: Stage2Position;
  stage3Shape: Stage3Shape;
  stage4Visualize: Stage4Visualize;
  stage5Critic: Stage5Critic;
  brandBattle: BrandBattleData;
  stage6LaunchKit: Stage6LaunchKit;
}
