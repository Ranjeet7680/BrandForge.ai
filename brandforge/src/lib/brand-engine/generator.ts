import { BrandProject, RawBrandInput, ColorSwatch } from '@/types/brand';

// Helper to generate consistent IDs
function generateId(): string {
  return 'proj-' + Math.random().toString(36).substring(2, 9);
}

// Clean and capitalize keywords
function extractKeywords(text: string): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 3 && !['with', 'that', 'this', 'from', 'have', 'build', 'want', 'helps', 'app'].includes(w));
  return Array.from(new Set(words));
}

// Domain-aware color palette picker
function generatePalette(idea: string, category: string): ColorSwatch[] {
  const lower = (idea + ' ' + category).toLowerCase();

  if (lower.includes('student') || lower.includes('hackathon') || lower.includes('dev') || lower.includes('code') || lower.includes('ai')) {
    return [
      { role: 'Primary', name: 'Electric Indigo', hex: '#6366F1', rgb: '99, 102, 241', hsl: '239, 84%, 67%', psychology: 'Sparks algorithmic focus, ambition, and visionary intelligence.', contrastRatio: '4.8:1 on dark' },
      { role: 'Secondary', name: 'Cyber Neon Lime', hex: '#10B981', rgb: '16, 185, 129', hsl: '161, 84%, 39%', psychology: 'Signals active terminal status and build momentum.', contrastRatio: '5.2:1 on dark' },
      { role: 'Accent', name: 'Hyper Amber', hex: '#F59E0B', rgb: '245, 158, 11', hsl: '38, 92%, 50%', psychology: 'Evokes sprint countdown urgency and coffee fuel.', contrastRatio: '6.1:1 on dark' },
      { role: 'Dark', name: 'Abyss Void', hex: '#0B0F17', rgb: '11, 15, 23', hsl: '220, 35%, 7%', psychology: 'Grounds developer workspace focus.', contrastRatio: '18.5:1' },
      { role: 'Light', name: 'Frost Glow', hex: '#F8FAFC', rgb: '248, 250, 252', hsl: '210, 40%, 98%', psychology: 'Surgical contrast for typography.', contrastRatio: '17:1' },
      { role: 'Surface', name: 'Terminal Card', hex: '#141C2E', rgb: '20, 28, 46', hsl: '222, 39%, 13%', psychology: 'Elevated UI card layer with subtle blue glow.', contrastRatio: '11:1' }
    ];
  } else if (lower.includes('finance') || lower.includes('money') || lower.includes('bookkeeping') || lower.includes('cfo') || lower.includes('tax')) {
    return [
      { role: 'Primary', name: 'Deep Emerald', hex: '#059669', rgb: '5, 150, 105', hsl: '160, 93%, 30%', psychology: 'Signals fiscal health, prosperous longevity, and calm security.', contrastRatio: '4.9:1' },
      { role: 'Secondary', name: 'Midnight Navy', hex: '#0F172A', rgb: '15, 23, 42', hsl: '222, 47%, 11%', psychology: 'Conveys institutional solidity, audit-proof precision.', contrastRatio: '17:1' },
      { role: 'Accent', name: 'Luminous Mint', hex: '#34D399', rgb: '52, 211, 153', hsl: '158, 64%, 52%', psychology: 'Highlights positive revenue momentum.', contrastRatio: '7.2:1' },
      { role: 'Dark', name: 'Slate Obsidian', hex: '#090D16', rgb: '9, 13, 22', hsl: '222, 42%, 6%', psychology: 'Refined dark backdrop for executive review.', contrastRatio: '19:1' },
      { role: 'Light', name: 'Pure Alabaster', hex: '#F8FAFC', rgb: '248, 250, 252', hsl: '210, 40%, 98%', psychology: 'Crisp ledger paper readability.', contrastRatio: '18:1' },
      { role: 'Surface', name: 'Navy Slate Card', hex: '#1E293B', rgb: '30, 41, 59', hsl: '217, 33%, 17%', psychology: 'Stable financial card surface.', contrastRatio: '10:1' }
    ];
  } else if (lower.includes('health') || lower.includes('fitness') || lower.includes('wellness') || lower.includes('medical') || lower.includes('therapy')) {
    return [
      { role: 'Primary', name: 'Vibrant Teal', hex: '#0D9488', rgb: '13, 148, 136', hsl: '175, 84%, 32%', psychology: 'Evokes clinical clarity, rejuvenation, and holistic vitality.', contrastRatio: '5.1:1' },
      { role: 'Secondary', name: 'Coral Pulse', hex: '#F43F5E', rgb: '244, 63, 94', hsl: '350, 89%, 60%', psychology: 'Signals heartbeat, human warmth, and urgency.', contrastRatio: '4.7:1' },
      { role: 'Accent', name: 'Warm Amber', hex: '#FBBF24', rgb: '251, 191, 36', hsl: '43, 96%, 56%', psychology: 'Brings morning sunlight optimism.', contrastRatio: '6.4:1' },
      { role: 'Dark', name: 'Deep Spruce', hex: '#061314', rgb: '6, 19, 20', hsl: '184, 54%, 5%', psychology: 'Grounds health tech in deep serenity.', contrastRatio: '19:1' },
      { role: 'Light', name: 'Clean Linen', hex: '#F8FAFC', rgb: '248, 250, 252', hsl: '210, 40%, 98%', psychology: 'Sanitary and welcoming typography.', contrastRatio: '17:1' },
      { role: 'Surface', name: 'Spruce Card', hex: '#102528', rgb: '16, 37, 40', hsl: '188, 43%, 11%', psychology: 'Comfortable wellness widget background.', contrastRatio: '11:1' }
    ];
  } else if (lower.includes('eco') || lower.includes('sustainable') || lower.includes('climate') || lower.includes('sneaker') || lower.includes('fashion')) {
    return [
      { role: 'Primary', name: 'Earthy Sage', hex: '#15803D', rgb: '21, 128, 61', hsl: '142, 72%, 29%', psychology: 'Symbolizes regeneration, circular design, and organic earth.', contrastRatio: '5.2:1' },
      { role: 'Secondary', name: 'Terracotta Clay', hex: '#EA580C', rgb: '234, 88, 12', hsl: '21, 90%, 48%', psychology: 'Raw warmth of natural crafted materials.', contrastRatio: '4.6:1' },
      { role: 'Accent', name: 'Ochre Sun', hex: '#EAB308', rgb: '234, 179, 8', hsl: '48, 93%, 47%', psychology: 'Renewable solar energy feel.', contrastRatio: '6.0:1' },
      { role: 'Dark', name: 'Volcanic Basalt', hex: '#0C0F0D', rgb: '12, 15, 13', hsl: '140, 11%, 5%', psychology: 'Rich organic dark foundation.', contrastRatio: '19:1' },
      { role: 'Light', name: 'Raw Cotton', hex: '#F7F6F2', rgb: '247, 246, 242', hsl: '48, 24%, 96%', psychology: 'Warm, tactile unbleached paper.', contrastRatio: '17:1' },
      { role: 'Surface', name: 'Basalt Card', hex: '#161C18', rgb: '22, 28, 24', hsl: '140, 12%, 10%', psychology: 'Sustainable tactile card enclosure.', contrastRatio: '11:1' }
    ];
  } else {
    // Default high-grade Tech / Creative palette
    return [
      { role: 'Primary', name: 'Electric Violet', hex: '#8B5CF6', rgb: '139, 92, 246', hsl: '258, 90%, 66%', psychology: 'Visionary creativity, modern technological distinction.', contrastRatio: '5.1:1' },
      { role: 'Secondary', name: 'Cyan Spark', hex: '#06B6D4', rgb: '6, 182, 212', hsl: '189, 94%, 43%', psychology: 'Dynamic motion and fresh perspectives.', contrastRatio: '4.9:1' },
      { role: 'Accent', name: 'Solar Coral', hex: '#F43F5E', rgb: '244, 63, 94', hsl: '350, 89%, 60%', psychology: 'High-conversion focal punch.', contrastRatio: '5.0:1' },
      { role: 'Dark', name: 'Obsidian Space', hex: '#0A0A0F', rgb: '10, 10, 15', hsl: '240, 20%, 5%', psychology: 'Sophisticated deep digital dark space.', contrastRatio: '19:1' },
      { role: 'Light', name: 'Crisp White', hex: '#F8FAFC', rgb: '248, 250, 252', hsl: '210, 40%, 98%', psychology: 'Razor-sharp legible contrast.', contrastRatio: '17:1' },
      { role: 'Surface', name: 'Elevated Slate', hex: '#151722', rgb: '21, 23, 34', hsl: '231, 24%, 11%', psychology: 'Smooth obsidian floating surface.', contrastRatio: '11:1' }
    ];
  }
}

// Name generation heuristics
function synthesizeNames(idea: string, targetMarket: string): { territory: string; description: string; examples: { name: string; rationale: string; domainSuggestion: string; score: number }[] }[] {
  const words = extractKeywords(idea + ' ' + targetMarket);
  const primaryWord = words[0] ? words[0].charAt(0).toUpperCase() + words[0].slice(1) : 'Nova';
  const secondaryWord = words[1] ? words[1].charAt(0).toUpperCase() + words[1].slice(1) : 'Forge';

  return [
    {
      territory: 'Territory 1: Evocative & Metaphorical',
      description: 'Abstract and aspirational marks that capture the emotional breakthrough of the product.',
      examples: [
        { name: `${primaryWord}Lens`, rationale: `Focuses perception and clarity on the user's primary challenge.`, domainSuggestion: `${primaryWord.toLowerCase()}lens.io`, score: 94 },
        { name: `Kinetiq`, rationale: 'Suggests sudden momentum and dynamic force unlocking progress.', domainSuggestion: 'kinetiq.ai', score: 88 },
        { name: `Vanguard${secondaryWord}`, rationale: 'Positions the brand as the vanguard of a new market standard.', domainSuggestion: `vanguard${secondaryWord.toLowerCase()}.com`, score: 82 }
      ]
    },
    {
      territory: 'Territory 2: High Craft & Action (Compound)',
      description: 'Action-oriented compounds that signal tangible building, speed, and real-world execution.',
      examples: [
        { name: `${primaryWord}Forge`, rationale: 'Evokes deliberate craftsmanship, strength under pressure, and durable outcomes.', domainSuggestion: `${primaryWord.toLowerCase()}forge.com`, score: 96 },
        { name: `Sync${secondaryWord}`, rationale: 'Directly conveys alignment, harmony, and frictionless speed.', domainSuggestion: `sync${secondaryWord.toLowerCase()}.app`, score: 90 },
        { name: `PulseCraft`, rationale: 'Combines continuous real-time vitality with skilled execution.', domainSuggestion: 'pulsecraft.dev', score: 85 }
      ]
    },
    {
      territory: 'Territory 3: Neologism / Invented',
      description: 'Proprietary coined words that allow total trademark protection and distinct search dominance.',
      examples: [
        { name: `${primaryWord.slice(0, 4)}ura`, rationale: 'Clean, modern Latin-sounding neologism with rhythmic cadence.', domainSuggestion: `${primaryWord.slice(0, 4).toLowerCase()}ura.co`, score: 89 },
        { name: `Synapto`, rationale: 'Modern tech moniker indicating neural-fast intelligence.', domainSuggestion: 'synapto.tech', score: 84 }
      ]
    },
    {
      territory: 'Territory 4: Functional & Direct',
      description: 'Utilitarian names that reduce user cognitive load with immediate category comprehension.',
      examples: [
        { name: `${primaryWord}Pilot`, rationale: 'Instantly understood as a guided co-pilot, but risk of generic confusion.', domainSuggestion: `${primaryWord.toLowerCase()}pilot.io`, score: 76 },
        { name: `${secondaryWord}Base`, rationale: 'Clean operational hub terminology.', domainSuggestion: `${secondaryWord.toLowerCase()}base.com`, score: 78 }
      ]
    }
  ];
}

// Master synthesizer function
export function generateBrandProject(input: RawBrandInput): BrandProject {
  const idea = input.idea.trim() || 'An intelligent tool that solves user problems';
  const market = input.targetMarket.trim() || 'Modern creators and professionals';
  const problem = input.existingProblem.trim() || 'Existing tools are complex, fragmented, and slow';

  // Step 1: Synthesize category
  let category = 'Intelligent Decision Infrastructure';
  if (idea.toLowerCase().includes('student') || idea.toLowerCase().includes('hackathon')) {
    category = 'Autonomous Hackathon Squad Infrastructure';
  } else if (idea.toLowerCase().includes('finance') || idea.toLowerCase().includes('money')) {
    category = 'AI Financial Decision Intelligence';
  } else if (idea.toLowerCase().includes('code') || idea.toLowerCase().includes('dev')) {
    category = 'Continuous Architecture & Code Companion';
  } else if (idea.toLowerCase().includes('sneaker') || idea.toLowerCase().includes('fashion')) {
    category = 'Circular Zero-Waste Modular Footwear';
  } else {
    category = `Next-Gen ${extractKeywords(idea)[0] || 'Digital'} Intelligence Platform`;
  }

  // Generate naming territories & pick primary
  const namingTerritories = synthesizeNames(idea, market);
  const primaryTerritory = namingTerritories[1] || namingTerritories[0];
  const selectedBrandName = primaryTerritory.examples[0].name;

  const colorPalette = generatePalette(idea, category);

  // Generate Stage 1: Discover
  const stage1Discover = {
    coreProblem: problem.length > 20 ? problem : `Users struggle with fragmented workflows and high cognitive overhead trying to solve ${extractKeywords(idea).join(', ')}.`,
    targetUsers: [
      {
        name: `Primary Champion: ${market.split(',')[0] || 'Early Adopter'}`,
        description: `Highly motivated individual who experiences the pain point weekly and actively seeks better software.`,
        painLevel: 9
      },
      {
        name: `Secondary Beneficiary: Collaborator / Stakeholder`,
        description: `Team member or client who benefits directly when the primary user speeds up execution.`,
        painLevel: 8
      },
      {
        name: `Emerging Adopter: Time-Constrained Novice`,
        description: `Struggles with steep learning curves of existing complex incumbents.`,
        painLevel: 7
      }
    ],
    userPainPoints: {
      functional: [
        'Time lost switching between 4+ fragmented tools and spreadsheets',
        'Lack of real-time intelligence when making high-stakes decisions',
        'Manual setup friction and steep learning curves of legacy incumbents'
      ],
      emotional: [
        'Anxiety and fear of missing critical oversights',
        'Exhaustion from repetitive low-leverage coordination tasks',
        'Imposter syndrome or frustration when tools feel hostile'
      ],
      financial: [
        'Unnecessary spend on expensive consultants or bloated enterprise suites',
        'Lost revenue caused by delayed execution and missed deadlines'
      ]
    },
    jobsToBeDone: [
      {
        functional: `Achieve desired results in under 5 minutes without manual spreadsheet gymnastics.`,
        emotional: `Feel confident, capable, and in absolute control of outcomes.`,
        social: `Signal modern taste, speed, and competence to peers and leadership.`
      },
      {
        functional: `Eliminate guesswork through automated, deterministic recommendations.`,
        emotional: `Replace chronic dread with proactive clarity.`,
        social: `Be recognized as a high-velocity operator.`
      }
    ],
    existingAssumptions: [
      {
        assumption: 'Users prefer an active intelligent co-pilot over a passive reporting dashboard.',
        riskLevel: 'Medium' as const,
        validationApproach: 'Track engagement with interactive recommendations vs static export downloads.'
      },
      {
        assumption: 'Target audience will adopt software with under 60 seconds onboarding time.',
        riskLevel: 'High' as const,
        validationApproach: 'Measure dropoff during the 3-step onboarding pipeline in beta cohort.'
      },
      {
        assumption: 'Clear plain-English answers outperform complex multi-tab dashboards.',
        riskLevel: 'Low' as const,
        validationApproach: 'Qualitative user interviews comparing narrative insight vs raw charts.'
      }
    ],
    unansweredQuestions: [
      'What is the tipping point where a user converts from free usage to a monthly subscription?',
      'How do we guarantee 100% data privacy and trust for proprietary user data?',
      'Which native integrations (GitHub, Slack, QuickBooks, Stripe) unlock the stickiest daily habits?'
    ]
  };

  // Generate Stage 2: Position
  const stage2Position = {
    category,
    categoryDefinition: `The specialized platform engineered to eliminate friction and empower ${market} to make decisive progress.`,
    valueProposition: `Transform raw uncertainty into structured, validated outcomes in seconds with automated intelligence.`,
    differentiator: `Active Decision Foresight: Unlike backward-looking directories or passive dashboards, ${selectedBrandName} provides forward-looking, stress-tested guidance.`,
    competitiveAngle: `Incumbents rely on manual entry and confusing reports. ${selectedBrandName} delivers instant clarity through purpose-built intelligence.`,
    positioningStatement: `For ${market} who are exhausted by ${problem.slice(0, 50)}..., ${selectedBrandName} is the ${category} that provides instant clarity and decisive momentum, unlike fragmented legacy tools or generic text generators.`,
    targetPersona: {
      name: 'Alex Morgan',
      role: `Pacesetter & Founder in ${market.split(' ')[0] || 'Tech'}`,
      ageRange: '24-36',
      quote: `I don't have time to decipher bloated software. Give me clear answers and let me get back to shipping.`,
      painTriggers: [
        'Spending hours every week on manual data re-entry and alignment',
        'Receiving outdated reports days after the critical moment has passed',
        'Wasting money on disjointed tools that don’t talk to each other'
      ],
      desiredOutcomes: [
        'Complete clarity on next steps in under 60 seconds',
        'High-confidence decisions backed by verifiable data',
        'Peace of mind to focus on high-leverage creative work'
      ],
      buyingResistance: 'Skeptical of over-hyped tools that deliver generic fluff instead of concrete utility.'
    },
    uniqueSellingProposition: `The only solution in the ${category} space that combines real-time situational analysis with actionable, pre-built execution workflows.`,
    competitiveQuadrant: {
      xAxis: { left: 'Passive / Generic Tools', right: 'Active Decision Intelligence' },
      yAxis: { bottom: 'Complex Legacy Jargon', top: 'Intuitive & Fast' },
      competitors: [
        { name: 'Legacy Enterprise Suite', x: -75, y: -65 },
        { name: 'Manual Spreadsheets', x: -50, y: 15 },
        { name: 'Generic AI Chatbot', x: 20, y: -45 },
        { name: 'Point Solution A', x: -20, y: -10 }
      ],
      ourPosition: { name: selectedBrandName, x: 82, y: 84 }
    }
  };

  // Generate Stage 3: Shape
  const stage3Shape = {
    personalityTraits: [
      {
        trait: 'Surgical Clarity',
        description: 'Cuts through noise to deliver immediate, unambiguous insight.',
        manifestation: 'Concise sentences, structured cards, zero empty buzzwords.'
      },
      {
        trait: 'Electrifying Momentum',
        description: 'Instills confidence and urgency to take action without hesitation.',
        manifestation: 'Action verbs, fast micro-interactions, dark aesthetic with electric accents.'
      },
      {
        trait: 'Grounded Authority',
        description: 'Backed by verified logic and deep domain understanding.',
        manifestation: 'Audit trails, transparent reasoning, zero hand-waving.'
      },
      {
        trait: 'Radical Empathy',
        description: 'Understands the pressure and stakes our users face daily.',
        manifestation: 'Supportive tone, helpful error states, celebratory milestones.'
      }
    ],
    traitsToAvoid: [
      {
        trait: 'Corporate Jargon & Bureaucracy',
        why: 'Alienates ambitious builders and feels outdated.',
        ruleOfThumb: 'Never use words like "synergy", "paradigm shift", or "leverage holistic solutions".'
      },
      {
        trait: 'Vague Generic Hand-Waving',
        why: 'Users need concrete answers, not philosophical platitudes.',
        ruleOfThumb: 'Always tie every recommendation to a specific number, time, or action.'
      },
      {
        trait: 'Arrogant or Condescending Tone',
        why: 'Users are smart; they are just constrained by time.',
        ruleOfThumb: 'Treat the user as a respected peer, never lecture.'
      }
    ],
    namingTerritories,
    selectedBrandName,
    taglines: [
      {
        text: 'Stop guessing. Start shipping with certainty.',
        style: 'Action' as const,
        rationale: 'Direct call to action addressing the pain of hesitation.'
      },
      {
        text: 'Where raw ideas turn into unstoppable execution.',
        style: 'Outcome' as const,
        rationale: 'Focuses on the transformation of potential into tangible success.'
      },
      {
        text: 'Build with who you believe in.',
        style: 'Provocative' as const,
        rationale: 'Appeals to high-conviction founders and creators.'
      }
    ],
    selectedTagline: 'Stop guessing. Start shipping with certainty.',
    oneLinePitch: `${selectedBrandName} is the ${category} that turns raw ideas and scattered inputs into structured, launch-ready systems in seconds.`,
    messagingHierarchy: {
      promise: 'Go from raw uncertainty to launch-ready execution in under 5 minutes.',
      pillars: [
        {
          title: 'Algorithmic Precision',
          explanation: 'Every recommendation is synthesized against verified domain benchmarks, eliminating generic hallucinated fluff.',
          proofPoint: 'Benchmarked across 500+ successful industry case studies.'
        },
        {
          title: 'Frictionless Velocity',
          explanation: 'Zero tedious 20-field surveys. Drop your raw thought and watch the full architecture self-assemble.',
          proofPoint: 'Under 60 seconds from prompt to structured output.'
        },
        {
          title: 'Coherence Guardian',
          explanation: 'Built-in multi-agent audit loops continuously verify that your positioning, visual identity, and messaging never contradict.',
          proofPoint: '95%+ cross-system coherence rating across all generated assets.'
        }
      ]
    },
    brandVoice: {
      attributes: [
        { dimension: 'Formality', value: 30, leftLabel: 'Casual & Direct', rightLabel: 'Academic / Formal' },
        { dimension: 'Energy', value: 80, leftLabel: 'Calm & Reserved', rightLabel: 'Electrifying & Bold' },
        { dimension: 'Tone', value: 25, leftLabel: 'Blunt & Clear', rightLabel: 'Diplomatic & Polite' },
        { dimension: 'Warmth', value: 75, leftLabel: 'Detached System', rightLabel: 'Empathetic Partner' }
      ],
      dos: [
        'Use active, decisive verbs: "Ship", "Deploy", "Validate", "Lock in".',
        'State truths simply without defensive preamble.',
        'Celebrate user momentum and tangible milestones.'
      ],
      donts: [
        'Never use corporate buzzwords like "synergy" or "seamless holistic paradigms".',
        'Never give vague advice without concrete next steps.',
        'Never talk down to the user.'
      ]
    }
  };

  // Generate Stage 4: Visualize
  const stage4Visualize = {
    logoConcept: {
      primaryMark: `${selectedBrandName} Dynamic Polygonal Catalyst`,
      symbolism: `Interlocking geometric facets representing diverse inputs locking into an ascending, unified vector.`,
      svgStyle: 'geometric' as const,
      svgIconType: 'polygonal-catalyst',
      secondaryVariant: `${selectedBrandName} Monogram inside a sharp 1px glowing square chassis`
    },
    typography: {
      headlineFont: 'Space Grotesk',
      headlineClass: 'font-space-grotesk tracking-tight font-bold',
      bodyFont: 'Inter',
      bodyClass: 'font-inter leading-relaxed',
      accentFont: 'JetBrains Mono',
      rationale: 'Space Grotesk brings algorithmic precision with human warmth; Inter provides maximum cross-platform legibility; JetBrains Mono injects technical credibility.',
      specimen: {
        headlineSample: 'Build brands that think, challenge, and convert.',
        bodySample: `${selectedBrandName} provides real-time brand intelligence that bridges raw intuition with launch-ready execution.`
      }
    },
    colorPalette,
    shapesAndGeometry: {
      style: 'Modern Sharp Precision with Chamfered Corners',
      radius: '6px to 10px',
      description: '1px luminous border strokes, subtle obsidian elevation, and monospace coordinate markers.',
      usageExamples: [
        '1px glowing border containers (border-indigo-500/20)',
        'Monospace coordinate badges [ 01 / STRATEGY ]',
        'Tactile pill buttons with subtle gradient highlights'
      ]
    },
    imageryDirection: {
      moodKeywords: ['Focused execution', 'Sleek dark workspace', 'Luminous ambient reflections', 'Modern architecture', 'Natural tactile craft'],
      lighting: 'Volumetric cinematic rim lighting with deep shadows and soft ambient neon fills.',
      composition: 'Asymmetric editorial angles, shallow depth of field, candid high-focus moments.',
      subjectMatter: 'Ambitious operators actively building, reviewing crisp data, and collaborating.',
      aiImagePrompts: [
        `Cinematic editorial portrait of an ambitious founder working in a modern glass studio at dusk, ambient ${colorPalette[0].name.toLowerCase()} monitor glow, 35mm lens f/1.4, hyper-focused expression --ar 16:9`,
        `Minimalist workspace with matte black notebook, titanium pen, and glowing tablet showing clean charts, soft volumetric lighting --ar 16:9`
      ]
    },
    uiMood: {
      aesthetic: 'Executive Dark Mode meets Precision Tooling',
      surfaces: 'Frosted glass with 14px blur, obsidian matte card layers, 1px glowing borders.',
      elevation: 'Deep multilayered ambient diffusion shadows.',
      microInteractions: 'Snappy 150ms spring transitions, tactile haptic response on button click, instant search.'
    },
    designReferences: [
      { brandOrProduct: 'Linear', whatToEmulate: 'Obsidian dark palette, micro-keyboard shortcuts, and surgical UI density.' },
      { brandOrProduct: 'Vercel', whatToEmulate: 'Monochrome contrast, typographic restraint, and technical credibility.' },
      { brandOrProduct: 'Raycast', whatToEmulate: 'Snappy command palettes, luminous glow accents, and delightful speed.' }
    ],
    visualsToAvoid: [
      'No 2017 Corporate Memphis flat illustrations with oversized limbs.',
      'No clichéd glowing robot hand or brain holograms.',
      'No blurry rainbow gradients with illegible low-contrast text.'
    ]
  };

  // Generate Stage 5: Critic
  const stage5Critic = {
    overallHealthScore: 91,
    radarScores: {
      distinctiveness: 90,
      audienceFit: 95,
      memorability: 89,
      scalability: 92,
      consistency: 94
    },
    critiquePoints: [
      {
        id: 'crit-gen-1',
        category: 'Generic Names' as const,
        severity: 'critical' as const,
        issue: `Original draft name "${extractKeywords(idea)[0] || 'App'}Master" sounds like a generic utility tool from 2008.`,
        original: `${extractKeywords(idea)[0] || 'App'}Master — The ultimate solution`,
        critiqueReason: 'Impossible to trademark, conveys low-effort utility, and blends into the background of spam search results.',
        alternative: `${selectedBrandName} or Kinetiq`,
        revisedResult: `${selectedBrandName} — ${stage3Shape.selectedTagline}`,
        status: 'applied' as const
      },
      {
        id: 'crit-cliche-2',
        category: 'Startup Cliché' as const,
        severity: 'warning' as const,
        issue: 'Value proposition contained overused buzzwords like "revolutionize" and "all-in-one platform".',
        original: 'Revolutionizing the industry with an all-in-one AI platform for maximum synergy.',
        critiqueReason: 'Modern buyers have developed total banner blindness to "all-in-one" and "revolutionize". It signals lack of focus.',
        alternative: 'Concrete, verifiable mechanism: "Go from raw input to structured output in under 5 minutes."',
        revisedResult: stage2Position.valueProposition,
        status: 'applied' as const
      },
      {
        id: 'crit-aud-3',
        category: 'Audience Mismatch' as const,
        severity: 'warning' as const,
        issue: 'Initial tone drifted into dry enterprise compliance language that alienates fast-moving builders.',
        original: 'Standardizing cross-departmental alignment workflows for organizational compliance.',
        critiqueReason: 'Constrained operators hate compliance theater; they care about rapid shipping and clear decisions.',
        alternative: 'High-velocity builder agency tone.',
        revisedResult: 'A builder-first intelligence engine that arms you to ship with certainty.',
        status: 'applied' as const
      },
      {
        id: 'crit-vis-4',
        category: 'Cliché Visuals' as const,
        severity: 'critical' as const,
        issue: 'Early aesthetic proposal suggested stock corporate 3D floating icons and lightbulb clipart.',
        original: '3D glossy lightbulb surrounded by floating gear icons.',
        critiqueReason: 'Widely recognized as cheap template design, instantly degrading perceived valuation.',
        alternative: 'Minimalist interlocking polygonal catalyst mark in obsidian space.',
        revisedResult: stage4Visualize.logoConcept.primaryMark,
        status: 'applied' as const
      }
    ]
  };

  // Generate Multi-Agent Council (Brand Battle)
  const brandBattle = {
    arenaTopic: `Positioning, Distinctiveness, & Defensibility Audit for ${selectedBrandName}`,
    agents: [
      { id: 'ag-strat', name: 'Marcus Reid', role: 'The Brand Strategist', avatar: '🎯', badge: 'Strategy', color: 'indigo', stance: `Defend sharp vertical positioning in ${category} over broad generic software.` },
      { id: 'ag-creat', name: 'Elena Vance', role: 'The Creative Director', avatar: '🎨', badge: 'Creative', color: 'purple', stance: 'Elevate typography and contrast to establish an iconic, defensible aesthetic.' },
      { id: 'ag-cust', name: 'Alex Morgan', role: 'The Target Customer', avatar: '⚡', badge: 'Persona', color: 'emerald', stance: 'Kill any feature or word that feels like extra homework. Keep it fast.' },
      { id: 'ag-crit', name: 'Diana Vance', role: 'The Brand Critic', avatar: '🛡️', badge: 'Critic', color: 'amber', stance: 'Expose clichés, over-promising, and copycat risks before market launch.' },
      { id: 'ag-guard', name: 'The Brand Guardian', role: 'Cross-System Auditor', avatar: '⚖️', badge: 'Guardian', color: 'cyan', stance: 'Ensure name, tagline, color tokens, and launch copy stay 100% synchronized.' }
    ],
    debateRounds: [
      {
        round: 1,
        speaker: 'Marcus Reid',
        agentRole: 'The Brand Strategist',
        avatar: '🎯',
        statement: `If we market ${selectedBrandName} as just another generic "AI helper", we will get commoditized in 6 months. We need to own the category: "${category}".`,
        recommendation: `Frame every marketing touchpoint around high-velocity decision intelligence.`
      },
      {
        round: 2,
        speaker: 'Alex Morgan',
        agentRole: 'The Target Customer',
        avatar: '⚡',
        critiqueOf: 'Marcus Reid',
        statement: `I agree we need to avoid generic AI slop, but Marcus, don’t make the pitch sound like an academic paper. Tell me how many hours I am going to save this week.`,
        recommendation: `Lead with the tangible outcome: "${stage3Shape.taglines[0].text}"`
      },
      {
        round: 3,
        speaker: 'Diana Vance',
        agentRole: 'The Brand Critic',
        avatar: '🛡️',
        statement: `I reviewed the competitive quadrant. Legacy tools are slow and expensive, but they have brand recognition. ${selectedBrandName} must double down on speed and radical simplicity to win.`,
        recommendation: `Guarantee an onboarding experience under 60 seconds with instant value.`
      },
      {
        round: 4,
        speaker: 'Elena Vance',
        agentRole: 'The Creative Director',
        avatar: '🎨',
        statement: `The visual identity needs to match the speed promise. By pairing ${stage4Visualize.typography.headlineFont} with an obsidian dark theme and ${colorPalette[0].name} accents, we communicate modern precision.`,
        recommendation: `Finalize the brand palette and interactive logo guidelines.`
      },
      {
        round: 5,
        speaker: 'The Brand Guardian',
        agentRole: 'Cross-System Auditor',
        avatar: '⚖️',
        statement: `All 6 brand dimensions have been verified. Value proposition, personality traits, and launch marketing copy reflect seamless coherence with 94% alignment.`,
        recommendation: `Approve brand for public launch kit generation.`
      }
    ],
    guardianAudit: {
      nameConsistency: { passed: true, score: 95, note: `${selectedBrandName} strongly aligns with the speed and craftsmanship principles.`, suggestion: 'Maintain consistent case styling.' },
      taglineAlignment: { passed: true, score: 94, note: `Tagline directly articulates the emotional relief of certainty.`, suggestion: 'Feature prominently above the fold.' },
      personalityGuard: { passed: true, score: 93, note: 'Avoided empty corporate buzzwords across all copy surfaces.', suggestion: 'Audit customer success emails quarterly.' },
      visualCoherence: { passed: true, score: 96, note: `${colorPalette[0].name} paired with dark obsidian matches modern tool expectations.`, suggestion: 'Verify contrast on mobile screens.' },
      launchMessagingCheck: { passed: true, score: 92, note: 'Social posts target real founder frustrations with zero cringe.', suggestion: 'Test video demonstrations on X.' }
    },
    orchestratorSynthesis: {
      verdict: `Brand system approved for launch with high market defensibility.`,
      consensusPillars: [
        `Claim the specialized ${category} category rather than competing as a generic AI utility.`,
        `Focus communication on time saved and immediate decision clarity.`,
        `Maintain surgical typography and high-contrast obsidian visuals.`
      ],
      actionableTweaks: [
        `Replaced all generic buzzwords with concrete time-saving metrics.`,
        `Streamlined the hero landing headline for maximum conversion.`,
        `Locked in 1px luminous border aesthetic across all brand touchpoints.`
      ]
    }
  };

  // Generate Stage 6: Launch Kit
  const stage6LaunchKit = {
    brandStrategySummary: {
      brandName: selectedBrandName,
      category,
      mission: `To liberate ${market} from friction and empower them to make decisive, high-velocity progress.`,
      vision: `A world where brilliant ideas never stall due to execution confusion or fragmented tools.`,
      targetAudience: market,
      problem,
      valueProposition: stage2Position.valueProposition,
      positioning: stage2Position.positioningStatement
    },
    brandIdentitySummary: {
      personality: stage3Shape.personalityTraits.map(p => p.trait),
      principles: [
        'Decisiveness over deliberation: Rapid feedback beats endless debate.',
        'Radical clarity: Plain words and transparent math always win.',
        'Craft matters: Speed is meaningless without surgical precision.'
      ],
      toneOfVoice: ['Direct', 'Dev-Native', 'Empathetic', 'Decisive'],
      namingRationale: primaryTerritory.examples[0].rationale,
      tagline: stage3Shape.selectedTagline,
      oneLinePitch: stage3Shape.oneLinePitch
    },
    visualSystemSummary: {
      logoDirection: stage4Visualize.logoConcept.symbolism,
      colorPalette: colorPalette.map(c => ({ name: c.name, hex: c.hex, role: c.role })),
      typography: { headline: `${stage4Visualize.typography.headlineFont} (Modern Precision)`, body: `${stage4Visualize.typography.bodyFont} (High Readability)` },
      visualMood: stage4Visualize.uiMood.aesthetic,
      imageryDirection: stage4Visualize.imageryDirection.composition
    },
    marketingAssets: {
      landingHeadline: `Turn raw intuition into structured launch-ready execution.`,
      landingSubheadline: `Stop wrestling with fragmented tools and guesswork. ${selectedBrandName} gives you verified answers, strategy, and execution assets in under 60 seconds.`,
      heroCopy: `Building something ambitious is hard enough without getting bogged down in manual setup. ${selectedBrandName} transforms your raw ideas into validated positioning, distinct identity, and market-ready launch assets.`,
      productDescription: `${selectedBrandName} is the AI-powered brand intelligence engine built for ${market}. With a multi-agent critique loop and real-time coherence scoring, you can build a brand that can think, challenge, and convert.`,
      bulletFeatures: [
        { title: 'Idea Intelligence', desc: 'Deconstruct raw concepts into root problems, jobs-to-be-done, and testable assumptions.' },
        { title: 'Multi-Agent Battle Arena', desc: 'Watch virtual strategist, critic, and customer agents stress-test your brand before launch.' },
        { title: 'Turnkey Launch Kit', desc: 'Export complete brand books, copy assets, and social campaigns with one click.' }
      ],
      instagramPost: {
        caption: `Ever notice how 90% of brilliant startup ideas get abandoned before launch? It’s not because the idea was bad — it’s because turning an idea into a cohesive brand is overwhelming. ⚡ Meet ${selectedBrandName}: the AI brand strategist that turns raw concepts into launch-ready brand systems in minutes. Try the live interactive demo at the link in bio!`,
        hashtags: ['#startuplife', '#buildinpublic', '#branding', '#brandstrategy', '#founder', '#launch'],
        visualDescription: `High-contrast carousel: Slide 1: "Raw idea vs Launch-ready Brand". Slide 2: Interactive multi-agent critique comparison. Slide 3: Complete generated launch kit.`
      },
      linkedInPost: {
        hook: `Most founders don't fail at building. They fail at positioning.`,
        body: `You have a breakthrough product idea. But when it comes to explaining who it is for, why it matters, and how it stands out, you get stuck in buzzword soup.\n\nWe built ${selectedBrandName} to fix this.\n\nInstead of generating generic marketing copy, ${selectedBrandName} runs your idea through a 6-stage brand intelligence pipeline — including a multi-agent debate that critiques clichés and tests defensibility.\n\n${stage3Shape.selectedTagline}`,
        cta: `Experience the future of brand intelligence at ${selectedBrandName.toLowerCase()}.app`
      },
      twitterThread: [
        `1/ Turning a rough idea into a launch-ready brand used to take 6 weeks and $15k in agency fees. Today, we are changing that with @${selectedBrandName} 🧵👇`,
        `2/ Most AI tools just spit out generic marketing text. They don't challenge assumptions or catch clichés. We designed ${selectedBrandName} as 6 connected AI stages that think, critique, and synthesize.`,
        `3/ Our secret weapon? The Brand Battle Arena. A virtual council (Strategist, Creative Director, Persona Advocate, Critic, Guardian) debates your positioning in real-time.`,
        `4/ The result is not just a logo or tagline — it's a battle-tested Brand Launch Kit with typography, color tokens, positioning statements, and social copy ready to ship.`,
        `5/ Live today for founders, creators, and builders worldwide. Build a brand that can think: ${selectedBrandName.toLowerCase()}.app 🚀`
      ],
      launchAnnouncement: `🚀 TODAY: Announcing ${selectedBrandName} — Build a brand that can think. Turn your raw idea into a validated brand strategy, identity, and complete launch kit in minutes.`,
      primaryCta: 'Start Building Your Brand',
      secondaryCta: 'Explore Sample Brand Kit'
    }
  };

  return {
    id: generateId(),
    name: selectedBrandName,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    currentStage: 6,
    progressPercentage: 100,
    rawInput: input,
    stage1Discover,
    stage2Position,
    stage3Shape,
    stage4Visualize,
    stage5Critic,
    brandBattle,
    stage6LaunchKit
  };
}
