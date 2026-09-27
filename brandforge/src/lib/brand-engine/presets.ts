import { BrandProject } from '@/types/brand';

export const PRESET_PROJECTS: BrandProject[] = [
  {
    id: 'project-hackforge',
    name: 'HackForge',
    createdAt: '2026-09-27T10:00:00Z',
    updatedAt: '2026-09-27T11:30:00Z',
    currentStage: 6,
    progressPercentage: 100,
    rawInput: {
      idea: 'I want to build an app that helps university students find complementary teammates for hackathons and ambitious side projects based on skills, timezone, and work rhythm.',
      targetMarket: 'Global university students, hackathon builders, early career developers and designers aged 18-24.',
      existingProblem: 'Finding teammates right now happens on messy Discord servers or Google Sheets. People end up with ghosting teammates, duplicated skills, and abandoned hackathon submissions.',
      location: 'Global (Online-first, US & Europe hackathon circuits)',
      businessGoals: 'Reach 50,000 active student builders in Year 1, partner with 30 major hackathons, launch premium team workspace tier.',
      constraints: 'Students have near-zero budget; onboarding friction must be under 60 seconds; must integrate with GitHub and Discord.',
      competitors: 'Discord server channels, Devpost matchmaking, LinkedIn student groups, Notion teammate boards'
    },
    stage1Discover: {
      coreProblem: 'High teammate friction and compatibility mismatch in time-compressed hackathons lead to 40%+ project abandonment and miserable team dynamics.',
      targetUsers: [
        {
          name: 'The Solo Code Crusader',
          description: 'Talented backend/AI dev who can build the engine in 24 hours but has zero design skills and hates pitching.',
          painLevel: 9
        },
        {
          name: 'The Product/Design Virtuoso',
          description: 'UI/UX enthusiast eager to build an award-winning portfolio project but blocked by lack of technical implementation partners.',
          painLevel: 8
        },
        {
          name: 'The First-Time Hackathon Rookie',
          description: 'Intimidated by elite dev squads, overwhelmed by giant Discord threads, and terrified of joining the wrong team.',
          painLevel: 9
        }
      ],
      userPainPoints: {
        functional: [
          'Unverified GitHub/Figma skill claims resulting in unbalanced workload distribution',
          'Timezone conflicts and ghosting 6 hours before demo submission deadline',
          'Chaotic communication scattered across Telegram, Discord, and WhatsApp'
        ],
        emotional: [
          'Imposter syndrome when pitching oneself in public general chats',
          'Anxiety of being trapped in a toxic or passive team for 48 sleepless hours',
          'Frustration of wasting a weekend because team members surrendered early'
        ],
        financial: [
          'Zero disposable income to pay for paid team collaboration software',
          'Lost opportunity costs for winning prize money and sponsor bounties'
        ]
      },
      jobsToBeDone: [
        {
          functional: 'Instantly discover teammates with verified, complementary skills (e.g. Next.js dev paired with Figma designer).',
          emotional: 'Feel confident and excited about building something ambitious with peers who pull their weight.',
          social: 'Gain peer recognition, build an elite portfolio, and get noticed by tech recruiters and startup incubators.'
        },
        {
          functional: 'Synchronize project milestones, roles, and commit track-record within a single squad dashboard.',
          emotional: 'Eliminate awkward interpersonal confrontations over uncompleted tasks.',
          social: 'Signal belonging to a top-tier hackathon squad.'
        }
      ],
      existingAssumptions: [
        {
          assumption: 'Students will connect their GitHub/Figma accounts to verify past project contributions.',
          riskLevel: 'Medium',
          validationApproach: 'Offer 1-click OAuth with gamified skill badge previews.'
        },
        {
          assumption: 'Hackathon organizers will actively endorse HackForge over their existing Discord channels.',
          riskLevel: 'High',
          validationApproach: 'Provide organizers with automated team formation telemetry and prize distribution dashboards.'
        },
        {
          assumption: 'Teammates who match on work rhythm will have significantly lower dropout rates.',
          riskLevel: 'Low',
          validationApproach: 'A/B test squads formed with rhythm matching vs random matching across 3 pilot hackathons.'
        }
      ],
      unansweredQuestions: [
        'How do we handle skill dispute if a student over-inflates their role on a past project?',
        'What prevents teams from abandoning the platform for WhatsApp immediately after matching?',
        'Can we monetize through sponsor bounties and talent recruitment without alienating free student users?'
      ]
    },
    stage2Position: {
      category: 'Autonomous Hackathon Squad Infrastructure',
      categoryDefinition: 'The real-time talent synthesis platform that transforms individual student builders into cohesive, high-velocity hackathon squads.',
      valueProposition: 'Form your dream hackathon squad in 90 seconds with verified skills, aligned work rhythms, and zero ghosting.',
      differentiator: 'Skill-Complementarity Engine that verifies real GitHub/Figma commits and matches by working stamina rather than arbitrary buzzwords.',
      competitiveAngle: 'Unlike static Discord directories or passive job boards, HackForge is an active squad operating system built for high-stakes 48-hour sprints.',
      positioningStatement: 'For ambitious student builders who waste precious hackathon hours searching through noisy chats, HackForge is the squad infrastructure that pairs complementary talent and synchronizes sprint execution, unlike chaotic Discord channels or corporate LinkedIn boards.',
      targetPersona: {
        name: 'Maya Chen',
        role: 'Computer Science Junior & Hackathon Veteran',
        ageRange: '20-21',
        quote: 'I want to build real stuff that wins, not spend Friday night begging strangers in #team-formation to review my repo.',
        painTriggers: [
          'Arriving at a 1,000-person hackathon solo with no pre-formed squad',
          'Teammate ghosting at 3:00 AM on Saturday night',
          'Spending 4 hours setting up Discord permissions and repo access'
        ],
        desiredOutcomes: [
          'Get matched with a dedicated designer and ML specialist in under 5 minutes',
          'Win track prizes or sponsor bounties',
          'Build friendships with engineers she can co-found a startup with later'
        ],
        buyingResistance: 'Skeptical of apps that require lengthy 20-field surveys or spam their email inbox.'
      },
      uniqueSellingProposition: 'The only student team builder that verifies actual code/design artifacts and provides 48-hour squad contract safeguards.',
      competitiveQuadrant: {
        xAxis: { left: 'Passive Directory', right: 'Active Squad OS' },
        yAxis: { bottom: 'Generic Professional', top: 'Hackathon Native' },
        competitors: [
          { name: 'Discord Channels', x: -65, y: 55 },
          { name: 'LinkedIn Groups', x: -80, y: -70 },
          { name: 'Devpost Team Finder', x: -30, y: 30 },
          { name: 'Notion Templates', x: 20, y: -20 }
        ],
        ourPosition: { name: 'HackForge', x: 80, y: 85 }
      }
    },
    stage3Shape: {
      personalityTraits: [
        {
          trait: 'Electrifying',
          description: 'High-energy, sprint-driven, and relentlessly encouraging of ambitious ambition.',
          manifestation: 'Action-oriented language, snappy micro-interactions, dark aesthetic with electric accents.'
        },
        {
          trait: 'Authentic',
          description: 'Deeply in touch with genuine student dev culture; avoids corporate jargon at all costs.',
          manifestation: 'Speaks like a senior hacker mentor; values shipping code over resume posturing.'
        },
        {
          trait: 'Inclusive',
          description: 'Welcoming to first-timers while respecting elite builders.',
          manifestation: 'Clear onboarding, gentle guidance for novices, zero elitist gatekeeping.'
        },
        {
          trait: 'Pragmatic',
          description: 'Laser-focused on what works in 48 hours: shipping functioning software.',
          manifestation: 'Concise templates, direct tools, no unnecessary fluff.'
        }
      ],
      traitsToAvoid: [
        {
          trait: 'Corporate HR Speak',
          why: 'Alienates students and feels like an unpaid internship recruitment tool.',
          ruleOfThumb: 'Never use words like "synergy", "talent acquisition", or "candidate pipeline".'
        },
        {
          trait: 'Gamer Cliche / Memelord',
          why: 'Demeans serious builders who want to win venture funding and build real startups.',
          ruleOfThumb: 'Keep it punchy and playful, but avoid overused memes and cringe slang.'
        },
        {
          trait: 'Overly Academic / Bureaucratic',
          why: 'Feels like homework or a forced university portal.',
          ruleOfThumb: 'Zero syllabus vibe; everything should feel like a late-night terminal session.'
        }
      ],
      namingTerritories: [
        {
          territory: 'Territory 1: High Velocity & Craft (Compound)',
          description: 'Names that evoke speed, building, and intense creative output.',
          examples: [
            { name: 'HackForge', rationale: 'Evokes craftsmanship, heat, and forging resilient teams under pressure.', domainSuggestion: 'hackforge.io', score: 96 },
            { name: 'SprintCraft', rationale: 'Directly references 48-hour sprint building.', domainSuggestion: 'sprintcraft.dev', score: 84 },
            { name: 'SquadShip', rationale: 'Combines team camaraderie with the ultimate goal: shipping.', domainSuggestion: 'squadship.app', score: 88 }
          ]
        },
        {
          territory: 'Territory 2: Synaptic & Neural (Metaphorical)',
          description: 'Names drawing from collective intelligence, networks, and instant pairing.',
          examples: [
            { name: 'Synaptik', rationale: 'Connects brains like synapses firing in unison.', domainSuggestion: 'synaptik.ai', score: 82 },
            { name: 'NexusSquad', rationale: 'The central hub where diverse builder talents converge.', domainSuggestion: 'nexussquad.com', score: 79 },
            { name: 'Kinetic', rationale: 'Turns potential talent into moving project energy.', domainSuggestion: 'kinetic.build', score: 85 }
          ]
        },
        {
          territory: 'Territory 3: Direct & Functional',
          description: 'Crystal-clear naming that immediately communicates the product utility.',
          examples: [
            { name: 'TeamSync', rationale: 'Clean and functional, but borders on generic corporate software.', domainSuggestion: 'teamsync.dev', score: 74 },
            { name: 'CollabMatch', rationale: 'Clear matchmaking focus, but lacks distinct identity.', domainSuggestion: 'collabmatch.io', score: 71 }
          ]
        }
      ],
      selectedBrandName: 'HackForge',
      taglines: [
        {
          text: 'Stop solo struggling. Start squad shipping.',
          style: 'Action',
          rationale: 'Addresses the pain point of lonely hacking and emphasizes immediate collaborative output.'
        },
        {
          text: 'Where 48-hour ideas meet the squads that ship them.',
          style: 'Outcome',
          rationale: 'Frames the product around the tangible result of winning hackathon projects.'
        },
        {
          text: 'Build with who you believe in.',
          style: 'Provocative',
          rationale: 'Appeals to trust, shared destiny, and founder chemistry.'
        }
      ],
      selectedTagline: 'Stop solo struggling. Start squad shipping.',
      oneLinePitch: 'HackForge is the autonomous squad infrastructure for student builders to match complementary talent, eliminate ghosting, and ship winning hackathon projects.',
      messagingHierarchy: {
        promise: 'Assemble an unstoppable hackathon squad in under 90 seconds.',
        pillars: [
          {
            title: 'Verified Skill Harmony',
            explanation: 'Match based on real GitHub commits and Figma systems, not self-proclaimed buzzwords.',
            proofPoint: 'Direct repo-derived skill signatures with 98% accuracy.'
          },
          {
            title: 'Rhythm & Stamina Alignment',
            explanation: 'Pair with people who share your hackathon sleep schedule, target prize tracks, and commitment level.',
            proofPoint: '87% drop in 3:00 AM teammate abandonment in pilot runs.'
          },
          {
            title: 'Turnkey Sprint War Room',
            explanation: 'Instant repo scaffolding, Kanban milestone presets, and Discord bot integration pre-configured upon squad creation.',
            proofPoint: 'Go from match to first git commit in under 4 minutes.'
          }
        ]
      },
      brandVoice: {
        attributes: [
          { dimension: 'Formality', value: 20, leftLabel: 'Casual / Dev-Native', rightLabel: 'Formal / Academic' },
          { dimension: 'Energy', value: 85, leftLabel: 'Chill / Reserved', rightLabel: 'Electrifying / Hyper-Driven' },
          { dimension: 'Tone', value: 30, leftLabel: 'Direct & Blunt', rightLabel: 'Polite & Diplomatic' },
          { dimension: 'Humor', value: 45, leftLabel: 'Serious', rightLabel: 'Witty / Insider' }
        ],
        dos: [
          'Use concise, active verbs: "Ship", "Deploy", "Forge", "Lock in", "Sync".',
          'Speak directly to the builder mindset (respect terminal time and clean code).',
          'Celebrate non-technical contributors (designers, storytellers) as crucial equal partners.'
        ],
        donts: [
          'Never use corporate human-resource jargon ("talent pipelining", "synergies").',
          'Avoid cringe forced meme humor that dates the brand in 6 months.',
          'Never sound condescending to beginners or overly worshipful of elite coders.'
        ]
      }
    },
    stage4Visualize: {
      logoConcept: {
        primaryMark: 'Interlocking Polygonal Catalyst',
        symbolism: 'Two angled, hyper-clean geometric nodes slotting into each other to form an upward-pointing terminal cursor and spark.',
        svgStyle: 'geometric',
        svgIconType: 'interlocking-nodes',
        secondaryVariant: 'HackForge Monogram in monospace square bracket enclosure'
      },
      typography: {
        headlineFont: 'Space Grotesk',
        headlineClass: 'font-space-grotesk tracking-tight font-bold',
        bodyFont: 'Inter',
        bodyClass: 'font-inter leading-relaxed',
        accentFont: 'JetBrains Mono',
        rationale: 'Space Grotesk brings contemporary algorithmic flair with human warmth; Inter ensures frictionless readability at all densities; JetBrains Mono anchors the developer credibility.',
        specimen: {
          headlineSample: 'Ship what matters before the 48-hour clock expires.',
          bodySample: 'HackForge connects students with complementary technical and creative superpowers, giving every squad an unfair advantage on the leaderboard.'
        }
      },
      colorPalette: [
        {
          role: 'Primary',
          name: 'Electric Indigo',
          hex: '#6366F1',
          rgb: '99, 102, 241',
          hsl: '239, 84%, 67%',
          psychology: 'Sparks focus, visionary thinking, and digital intelligence.',
          contrastRatio: '4.8:1 on dark surfaces'
        },
        {
          role: 'Secondary',
          name: 'Cyber Neon Lime',
          hex: '#10B981',
          rgb: '16, 185, 129',
          hsl: '161, 84%, 39%',
          psychology: 'Signals active terminal status, positive build pipelines, and momentum.',
          contrastRatio: '5.2:1 on dark surfaces'
        },
        {
          role: 'Accent',
          name: 'Hyper Amber',
          hex: '#F59E0B',
          rgb: '245, 158, 11',
          hsl: '38, 92%, 50%',
          psychology: 'Evokes sprint countdown urgency, energy, and hackathon midnight coffee.',
          contrastRatio: '6.1:1 on dark surfaces'
        },
        {
          role: 'Dark',
          name: 'Abyss Void',
          hex: '#0A0D14',
          rgb: '10, 13, 20',
          hsl: '222, 33%, 6%',
          psychology: 'Grounds the system in modern developer dark mode aesthetic.',
          contrastRatio: '18.5:1 against text'
        },
        {
          role: 'Light',
          name: 'Frost Glow',
          hex: '#F1F5F9',
          rgb: '241, 245, 249',
          hsl: '210, 40%, 96%',
          psychology: 'Provides surgical contrast for high-priority typography.',
          contrastRatio: '16.2:1 against dark backgrounds'
        },
        {
          role: 'Surface',
          name: 'Terminal Card',
          hex: '#131926',
          rgb: '19, 25, 38',
          hsl: '221, 33%, 11%',
          psychology: 'Elevated UI card surface with subtle blue-purple ambient reflections.',
          contrastRatio: '12:1'
        }
      ],
      shapesAndGeometry: {
        style: 'Modern Sharp Precision with Subtle Rounded Accents',
        radius: '6px to 10px (controlled industrial feel)',
        description: 'Crisp borders with 1px glowing indigo strokes, subtle dot grid textures, and monospace coordinate markers.',
        usageExamples: [
          '1px borders with border-indigo-500/20 glow',
          'Subtle terminal-style bracket indicators [ 01 / SQUAD ]',
          'Monospace micro-badges with neon pulse pips'
        ]
      },
      imageryDirection: {
        moodKeywords: ['Late-night hackathon energy', 'Cinematic glow', 'Focused collaboration', 'Authentic mechanical keyboards', 'Spontaneous whiteboard architecture'],
        lighting: 'Moody volumetric ambient light, monitor glow reflections, soft neon rim-lighting.',
        composition: 'Over-the-shoulder candid perspectives, shallow depth of field, natural motion blur of bustling hackathon ballrooms.',
        subjectMatter: 'Real student builders in hoodies debugging code, sketching wireframes, and celebrating working demos.',
        aiImagePrompts: [
          'Cinematic photo of diverse university students huddled around glowing laptops in a modern glass hackathon hall at 2 AM, ambient purple and cyan lighting, authentic focus, shot on 35mm f/1.4 --ar 16:9 --style raw',
          'Close-up candid of a designer pointing at a Figma wireframe while a developer types in a dark IDE terminal, neon reflections, natural tech culture --ar 16:9'
        ]
      },
      uiMood: {
        aesthetic: 'High-Velocity Developer Workspace meets Editorial Cyberpunk',
        surfaces: 'Frosted glass backdrops with 12px blur, obsidian dark card containers, 1px neon border accents.',
        elevation: 'Subtle deep drop-shadows with colored ambient diffusion.',
        microInteractions: 'Snappy 150ms spring transitions, tactile button depress states, and confetti bursts on team lock-in.'
      },
      designReferences: [
        { brandOrProduct: 'Linear', whatToEmulate: 'Obsidian dark mode, micro-keyboard shortcuts, and surgical UI density.' },
        { brandOrProduct: 'Raycast', whatToEmulate: 'Snappy commands, vibrant electric glow accents, and developer credibility.' },
        { brandOrProduct: 'Vercel', whatToEmulate: 'Monochrome precision typography and crisp monochrome contrast.' }
      ],
      visualsToAvoid: [
        'No generic cheesy stock photos of businessmen shaking hands over a blank tablet.',
        'No goofy 2018 corporate flat illustrations (Corporate Memphis / big-foot illustrations).',
        'No literal 3D cartoon robots holding glowing lightbulbs.',
        'No childish clip-art gears or handshake icons.'
      ]
    },
    stage5Critic: {
      overallHealthScore: 92,
      radarScores: {
        distinctiveness: 90,
        audienceFit: 96,
        memorability: 91,
        scalability: 88,
        consistency: 95
      },
      critiquePoints: [
        {
          id: 'critique-1',
          category: 'Generic Names',
          severity: 'critical',
          issue: 'Original candidate "TeamFinder" is descriptive but completely unprotectable and sounds like a 2004 bulletin board.',
          original: 'TeamFinder — The student teammate directory',
          critiqueReason: 'Lacks energy, zero trademark uniqueness, conveys passive directory instead of dynamic collaboration engine.',
          alternative: 'HackForge or SquadShip',
          revisedResult: 'HackForge — Stop solo struggling. Start squad shipping.',
          status: 'applied'
        },
        {
          id: 'critique-2',
          category: 'Startup Cliché',
          severity: 'warning',
          issue: 'Original value proposition relied on lazy buzzwords ("AI-powered synergistic ecosystem").',
          original: 'Leveraging AI-driven talent synergy to revolutionize the future of collegiate hackathon ecosystems.',
          critiqueReason: 'Buzzword salad that provokes instant cynicism among student developers.',
          alternative: 'Direct, concrete mechanism: "Match complementary talent in 90 seconds based on verified GitHub and Figma commits."',
          revisedResult: 'Form your dream hackathon squad in 90 seconds with verified skills, aligned work rhythms, and zero ghosting.',
          status: 'applied'
        },
        {
          id: 'critique-3',
          category: 'Audience Mismatch',
          severity: 'warning',
          issue: 'Early pitch deck tone sounded like an enterprise B2B HR software pitch.',
          original: 'Streamlining campus recruitment pipelines for enterprise corporate sponsors.',
          critiqueReason: 'Students will flee immediately if they feel they are productized for HR headhunters.',
          alternative: 'Student-first agency: frame sponsors as bounty suppliers that students conquer and win prizes from.',
          revisedResult: 'A builder-first platform that arms squads to win prizes, ship real products, and get funded.',
          status: 'applied'
        },
        {
          id: 'critique-4',
          category: 'Cliché Visuals',
          severity: 'critical',
          issue: 'Draft visual brief included generic tech tropes (blue glowing brains and cartoon robots).',
          original: 'Abstract glowing brain surrounded by spinning gear icons and circuit board lines.',
          critiqueReason: 'Universally mocked by modern designers and developers as amateurish AI slop.',
          alternative: 'Minimalist interlocking polygonal catalyst mark inspired by terminal cursors and circuit nodes.',
          revisedResult: 'Interlocking geometric nodes in Electric Indigo with 1px border glow and Space Grotesk typography.',
          status: 'applied'
        }
      ]
    },
    brandBattle: {
      arenaTopic: 'Brand Defensibility & Positioning Audit for HackForge',
      agents: [
        {
          id: 'agent-strategist',
          name: 'Marcus Reid',
          role: 'The Brand Strategist',
          avatar: '🎯',
          badge: 'Strategy Lead',
          color: 'indigo',
          stance: 'Defend high-velocity niche positioning over broad generalist social networking.'
        },
        {
          id: 'agent-creative',
          name: 'Elena Vance',
          role: 'The Creative Director',
          avatar: '🎨',
          badge: 'Visual & Identity',
          color: 'purple',
          stance: 'Insist on dark-mode cyber aesthetic with electric accents to outshine boring academic portals.'
        },
        {
          id: 'agent-customer',
          name: 'Leo Rivera',
          role: 'The Student Advocate',
          avatar: '⚡',
          badge: 'Target Persona',
          color: 'emerald',
          stance: 'Call out anything that smells like homework, 5-page signup forms, or corporate resume fluff.'
        },
        {
          id: 'agent-critic',
          name: 'Diana Vance',
          role: 'The Brand Critic',
          avatar: '🛡️',
          badge: 'Devil Advocate',
          color: 'amber',
          stance: 'Challenge retention: hackathons happen twice a year. What keeps them around post-event?'
        },
        {
          id: 'agent-guardian',
          name: 'The Brand Guardian',
          role: 'Cross-System Auditor',
          avatar: '⚖️',
          badge: 'Synthesis & Coherence',
          color: 'cyan',
          stance: 'Ensure name, tagline, color tokens, and launch copy stay 100% synchronized.'
        }
      ],
      debateRounds: [
        {
          round: 1,
          speaker: 'Marcus Reid',
          agentRole: 'The Brand Strategist',
          avatar: '🎯',
          statement: 'If we position HackForge merely as "Tinder for hackathons", we limit ourselves to a shallow matching feature that Discord can copy with a single bot. We must claim the category of "Autonomous Hackathon Squad Infrastructure".',
          recommendation: 'Anchor the value on the full sprint lifecycle: discovery, commitment contract, and pre-configured repository scaffolding.'
        },
        {
          round: 2,
          speaker: 'Leo Rivera',
          agentRole: 'The Student Advocate',
          avatar: '⚡',
          critiqueOf: 'Marcus Reid',
          statement: 'Marcus, "Autonomous Squad Infrastructure" is 100% corporate word salad. No sophomore at 2 AM is saying "bro let us deploy some squad infrastructure." Just say: find people who actually ship and will not ghost you at 3 AM.',
          recommendation: 'Change customer-facing hero tagline to: "Stop solo struggling. Start squad shipping."'
        },
        {
          round: 3,
          speaker: 'Diana Vance',
          agentRole: 'The Brand Critic',
          avatar: '🛡️',
          critiqueOf: 'Elena Vance',
          statement: 'Elena proposed neon pink and lime cyberpunk aesthetic. Be careful: if it looks like a gamer crypto project, university hackathons like HackMIT and CalHacks won’t partner with us for official sponsorship.',
          recommendation: 'Ground the palette in Electric Indigo and Deep Abyss. Keep lime as an accent for active build status, not a circus lightshow.'
        },
        {
          round: 4,
          speaker: 'Elena Vance',
          agentRole: 'The Creative Director',
          avatar: '🎨',
          critiqueOf: 'Diana Vance',
          statement: 'Agreed on dialing back the gaudiness. Electric Indigo (#6366F1) combined with Space Grotesk gives us the precision of Linear and the energy of a hackathon countdown clock. It signals serious craft.',
          recommendation: 'Finalize the mark as an interlocking polygonal catalyst with terminal cursor geometry.'
        },
        {
          round: 5,
          speaker: 'The Brand Guardian',
          agentRole: 'Cross-System Auditor',
          avatar: '⚖️',
          statement: 'Audit complete across Name, Positioning, Voice, Visuals, and Launch messaging. All 5 components now align with zero internal contradictions.',
          recommendation: 'Approve final Brand Launch Kit with 95% Coherence Index.'
        }
      ],
      guardianAudit: {
        nameConsistency: {
          passed: true,
          score: 96,
          note: 'HackForge matches the craft and sprint energy defined in the personality profile.',
          suggestion: 'Ensure lowercase "h" and uppercase "F" are strictly maintained in guidelines.'
        },
        taglineAlignment: {
          passed: true,
          score: 94,
          note: '"Stop solo struggling. Start squad shipping." directly hits the emotional pain point of ghosting.',
          suggestion: 'Use the shorter "Start squad shipping" for mobile navigation badges.'
        },
        personalityGuard: {
          passed: true,
          score: 92,
          note: 'Avoided corporate HR speak entirely across all stage documents.',
          suggestion: 'Regularly audit customer support canned responses to prevent formal tone drift.'
        },
        visualCoherence: {
          passed: true,
          score: 95,
          note: 'Electric Indigo and Abyss Void match developer dark mode expectations flawlessly.',
          suggestion: 'Maintain AA contrast ratio on code blocks and chip tags.'
        },
        launchMessagingCheck: {
          passed: true,
          score: 93,
          note: 'Social copy hooks target real student hackathon dilemmas with zero cringe.',
          suggestion: 'Test TikTok/Reels short-form video adaptation of the 3 AM ghosting scenario.'
        }
      },
      orchestratorSynthesis: {
        verdict: 'Brand approved with high differentiation and defensible developer positioning.',
        consensusPillars: [
          'Position as a sprint companion rather than a passive social network.',
          'Double-down on verified GitHub/Figma integration to kill resume inflation.',
          'Lead with "Stop solo struggling. Start squad shipping."'
        ],
        actionableTweaks: [
          'Eliminated all mentions of "talent pipeline" in public marketing copy.',
          'Tightened visual palette to Electric Indigo + Abyss Void with Neon Lime build pips.',
          'Added 48-hour sprint squad contract feature to the launch roadmap.'
        ]
      }
    },
    stage6LaunchKit: {
      brandStrategySummary: {
        brandName: 'HackForge',
        category: 'Autonomous Hackathon Squad Infrastructure',
        mission: 'To empower every ambitious student builder to find their dream squad and turn 48-hour hackathon ideas into world-changing software.',
        vision: 'A world where creative and technical talent seamlessly self-organizes without friction, credentials, or gatekeepers.',
        targetAudience: 'University CS & Design students, self-taught builders, and hackathon competitors worldwide.',
        problem: 'Chaotic matchmaking on Discord leads to mismatched skills, awkward ghosting, and 40%+ hackathon project abandonment.',
        valueProposition: 'Form your dream hackathon squad in 90 seconds with verified skills, aligned work rhythms, and zero ghosting.',
        positioning: 'The active squad operating system built for high-stakes 48-hour sprints.'
      },
      brandIdentitySummary: {
        personality: ['Electrifying', 'Authentic', 'Inclusive', 'Pragmatic'],
        principles: [
          'Ship over posture: Code and working prototypes speak louder than resumes.',
          'Zero gatekeeping: Everyone with curiosity and drive deserves a squad.',
          'Radical reliability: Never leave a teammate hanging at 3 AM.'
        ],
        toneOfVoice: ['Snappy', 'Dev-Native', 'Encouraging', 'Direct'],
        namingRationale: 'HackForge combines the urgency of hackathons with the timeless craftsmanship of forging durable tools under heat.',
        tagline: 'Stop solo struggling. Start squad shipping.',
        oneLinePitch: 'HackForge matches student builders with verified complementary skills to ship winning hackathon projects without ghosting.'
      },
      visualSystemSummary: {
        logoDirection: 'Interlocking polygonal catalyst mark symbolizing code blocks and team synergy.',
        colorPalette: [
          { name: 'Electric Indigo', hex: '#6366F1', role: 'Primary' },
          { name: 'Cyber Neon Lime', hex: '#10B981', role: 'Secondary' },
          { name: 'Hyper Amber', hex: '#F59E0B', role: 'Accent' },
          { name: 'Abyss Void', hex: '#0A0D14', role: 'Dark Background' },
          { name: 'Frost Glow', hex: '#F1F5F9', role: 'Light Text' }
        ],
        typography: { headline: 'Space Grotesk (Bold, Algorithmic Flair)', body: 'Inter (Clean, High Readability)' },
        visualMood: 'Obsidian dark workspace, 1px glowing neon borders, ambient volumetric lighting, authentic hackathon photography.',
        imageryDirection: 'Moody high-contrast late night build sessions, glowing IDE screens, and energetic collaborative whiteboard sketches.'
      },
      marketingAssets: {
        landingHeadline: 'Build with people who actually ship.',
        landingSubheadline: 'Stop scrolling through messy Discord channels. HackForge matches you with verified designers, developers, and makers in under 90 seconds.',
        heroCopy: 'No more 3:00 AM ghosting. No more duplicated skills. Connect your GitHub or Figma, set your hackathon sprint rhythm, and unlock an elite squad built to win.',
        productDescription: 'HackForge is the complete squad operating system for hackathon competitors. From instant skill verification to pre-configured repo templates and role synchronization, we take the pain out of team formation so you can focus on building what matters.',
        bulletFeatures: [
          { title: 'Verified Skill Harmony', desc: 'Sync GitHub repos and Figma files to showcase real output, not buzzwords.' },
          { title: 'Rhythm Matching', desc: 'Pair with teammates who match your sleep schedule, prize goals, and stamina.' },
          { title: 'Instant Sprint War Room', desc: 'Auto-generate repos, task boards, and voice channels with one click.' }
        ],
        instagramPost: {
          caption: 'POV: It’s 2 AM at the hackathon, your teammate ghosted, and you’re trying to build a fullstack AI app alone... 💀 Never again. Meet HackForge — the squad builder that pairs you with teammates who actually ship. Link in bio to lock in your squad for next weekend.',
          hashtags: ['#hackathon', '#studentdev', '#codinglife', '#buildinpublic', '#csstudent', '#hackforge'],
          visualDescription: 'Split screen carousel: Slide 1: Desperate student alone in empty hall with text "2 AM Solo Nightmare". Slide 2: HackForge match animation showing 100% skill synergy. Slide 3: 4 happy builders demoing on stage.'
        },
        linkedInPost: {
          hook: '40% of hackathon projects are abandoned before Sunday demo day. Not because the ideas are bad, but because the teams fall apart.',
          body: 'Every weekend, thousands of brilliant university students enter hackathons solo. They search through thousands of chaotic Discord messages in #team-formation, end up in mismatched squads, and burn out by Saturday night.\n\nWe built HackForge to fix this once and for all.\n\nBy analyzing real code contributions and aligning sprint work habits, HackForge builds resilient, high-velocity squads in under 90 seconds.\n\nStop solo struggling. Start squad shipping.',
          cta: 'Sign up for the early access beta at hackforge.io or tag an ambitious student builder below.'
        },
        twitterThread: [
          '1/ Why do 40% of student hackathon projects never make it to the demo stage? It is almost never the code. It is team breakdown. Here is how we are fixing it with @HackForge 🧵👇',
          '2/ Problem: Discord #team-formation is a roulette wheel. You meet someone who claims to be a fullstack guru, but by 3 AM Saturday they disappear, leaving you with half a React frontend and no database.',
          '3/ Introducing HackForge: The squad infrastructure built for high-stakes 48-hour sprints. Instead of resumes, we verify real GitHub commits and Figma systems.',
          '4/ We also match by work rhythm. Night owls pair with night owls. Weekend sprinters pair with weekend sprinters. Zero awkward friction.',
          '5/ Live today for collegiate hackathon teams worldwide. Ready to ship something legendary this weekend? Claim your squad at hackforge.io 🚀'
        ],
        launchAnnouncement: '🚀 TODAY: Announcing HackForge — Stop solo struggling, start squad shipping. We are opening public access to the first autonomous squad formation engine for student builders. Build your team, verify complementary skills, and launch your next breakthrough project.',
        primaryCta: 'Find Your Squad in 90s',
        secondaryCta: 'Explore Winning Teams'
      }
    }
  },
  {
    id: 'project-ledgerlens',
    name: 'LedgerLens',
    createdAt: '2026-09-27T12:00:00Z',
    updatedAt: '2026-09-27T14:15:00Z',
    currentStage: 6,
    progressPercentage: 100,
    rawInput: {
      idea: 'I want to build an AI platform that helps small businesses understand their finances without hiring a fractional CFO.',
      targetMarket: 'Small business owners, digital agency founders, boutique e-commerce shops doing $200k-$3M ARR.',
      existingProblem: 'Small business owners receive dense 20-page accounting reports from QuickBooks or bookkeepers once a month, but cannot answer basic questions: "Can I afford to hire next month?" or "Where is my cash bleeding?"',
      location: 'United States & Canada',
      businessGoals: 'Reach $100k MRR in 14 months, integrate with QuickBooks, Xero, Stripe, and Plaid.',
      constraints: 'Must maintain bank-grade SOC2 security; non-financial founders get intimidated by jargon.',
      competitors: 'QuickBooks reporting, Pilot.com, LivePlan, casual Excel spreadsheets'
    },
    stage1Discover: {
      coreProblem: 'Small business founders are flying blind between monthly bookkeeping recaps, suffering from chronic cash anxiety and inability to translate accounting reports into proactive business decisions.',
      targetUsers: [
        {
          name: 'The Creative Agency Owner',
          description: 'Runs an 8-person design studio, brilliant at client work, but panics every payroll Friday because client invoice payments are lumpy.',
          painLevel: 9
        },
        {
          name: 'The E-Commerce Brand Founder',
          description: 'Navigates inventory re-order cycles, Meta ad spend fluctuations, and Shopify payout delays without real-time margin visibility.',
          painLevel: 9
        }
      ],
      userPainPoints: {
        functional: [
          'Monthly P&L reports arrive 15 days after month-end when it is too late to fix cash burn',
          'Inability to model "what-if" scenarios (e.g. hiring a developer vs buying inventory)',
          'Multiple disconnected data silos: Stripe, bank accounts, payroll, and bookkeeping software'
        ],
        emotional: [
          'Guilt and dread whenever opening QuickBooks or meeting with the CPA',
          'Persistent 3:00 AM panic about payroll sustainability',
          'Feeling inadequate or mathematically incompetent despite running a profitable business'
        ],
        financial: [
          'Hiring a fractional CFO costs $3,000 - $7,000/month, out of reach for sub-$2M businesses',
          'Unexpected tax bills and overdraft fees caused by poor cash flow timing'
        ]
      },
      jobsToBeDone: [
        {
          functional: 'Ask plain English questions like "Can I afford to hire a $5,000/mo contractor?" and get instant data-backed answers.',
          emotional: 'Feel in total command of business health, replacing dread with clarity and confidence.',
          social: 'Present crisp financial summaries to investors, banks, and partners.'
        }
      ],
      existingAssumptions: [
        {
          assumption: 'Owners will trust an AI agent to read their live bank transaction feeds.',
          riskLevel: 'High',
          validationApproach: 'Partner with Plaid and highlight read-only bank-grade 256-bit encryption.'
        },
        {
          assumption: 'Plain-English narrative summaries are more valuable to owners than interactive charts.',
          riskLevel: 'Medium',
          validationApproach: 'Provide hybrid summaries: 3-sentence executive takeaways paired with a cash runway countdown.'
        }
      ],
      unansweredQuestions: [
        'How do we handle messy categorization in user accounting books without giving inaccurate forecasts?',
        'Will CPAs view LedgerLens as a competitor or as a collaborative client communication tool?'
      ]
    },
    stage2Position: {
      category: 'AI Financial Decision Intelligence',
      categoryDefinition: 'The proactive financial co-pilot that translates messy accounting ledgers into clear, actionable business foresight for small enterprise founders.',
      valueProposition: 'Understand your cash flow in 60 seconds. Know exactly what you can spend, hire, and save without touching a spreadsheet.',
      differentiator: 'Proactive Conversational Foresight: Instead of looking backward at historical transactions, LedgerLens continuously stress-tests future cash runways.',
      competitiveAngle: 'QuickBooks tells you what happened 30 days ago. LedgerLens tells you what decision to make today.',
      positioningStatement: 'For small business owners who dread deciphering complex accounting sheets, LedgerLens is the AI financial decision co-pilot that turns raw financial data into clear answers and forward-looking runway alerts, unlike backward-looking accounting software or expensive fractional CFOs.',
      targetPersona: {
        name: 'Sarah Jenkins',
        role: 'Founder & CEO of Bloom Design Co.',
        ageRange: '34',
        quote: 'I love design, but looking at my QuickBooks balance sheet makes me feel like I am reading ancient hieroglyphics.',
        painTriggers: [
          'Getting surprised by quarterly tax estimates',
          'Debating whether to hire another designer without knowing next quarter runway',
          'Waiting two weeks for her part-time bookkeeper to close last month’s books'
        ],
        desiredOutcomes: [
          'A single daily runway number she can trust at a glance',
          'Proactive alerts before cash dips below 60 days of operating expenses',
          'Peace of mind to focus on creative client work'
        ],
        buyingResistance: 'Concerned about AI hallucinations on critical financial calculations.'
      },
      uniqueSellingProposition: 'The only small business financial platform that pairs deterministic double-entry ledger calculations with plain-English conversational reasoning.',
      competitiveQuadrant: {
        xAxis: { left: 'Backward Looking Recap', right: 'Forward Looking Foresight' },
        yAxis: { bottom: 'Complex Accountant Tool', top: 'Intuitive Founder First' },
        competitors: [
          { name: 'QuickBooks Online', x: -80, y: -60 },
          { name: 'Fractional CFO ($5k/mo)', x: 40, y: -20 },
          { name: 'Excel Templates', x: -50, y: 10 },
          { name: 'Pilot.com', x: -10, y: -40 }
        ],
        ourPosition: { name: 'LedgerLens', x: 85, y: 80 }
      }
    },
    stage3Shape: {
      personalityTraits: [
        { trait: 'Clairvoyant & Clear', description: 'Cuts through accounting fog with concise, crystal-clear summaries.', manifestation: 'Eliminates all jargon; translates debit/credit into "cash in" and "cash out".' },
        { trait: 'Reassuring', description: 'Calms founder anxiety with steady, objective financial facts.', manifestation: 'Empathetic framing; never scolds, always provides constructive options.' },
        { trait: 'Surgical', description: 'Rigorous accuracy on numbers, zero hand-waving.', manifestation: 'Transparent math audit trails on every forecast.' },
        { trait: 'Proactive', description: 'Surfaces anomalies before they turn into emergencies.', manifestation: 'Automated morning pulses when recurring vendor charges spike.' }
      ],
      traitsToAvoid: [
        { trait: 'Cold Corporate Bank Tone', why: 'Triggers the exact bureaucratic anxiety founders hate.', ruleOfThumb: 'Speak like a trusted financial advisor having coffee, not a loan compliance officer.' },
        { trait: 'Over-Optimistic Hype', why: 'Dangerous in finance; false optimism leads to bankruptcy.', ruleOfThumb: 'Always present base, best, and stress-tested worst-case runway scenarios.' }
      ],
      namingTerritories: [
        {
          territory: 'Clarity & Optical Focus (Evocative)',
          description: 'Names that evoke seeing clearly through complex data.',
          examples: [
            { name: 'LedgerLens', rationale: 'Combines the classic financial ledger with high-definition optical clarity.', domainSuggestion: 'ledgerlens.io', score: 95 },
            { name: 'CashPrism', rationale: 'Splits raw cash streams into clear actionable spectra.', domainSuggestion: 'cashprism.com', score: 86 }
          ]
        },
        {
          territory: 'Guiding & Pilot (Compound)',
          description: 'Names suggesting flight control and safe navigation.',
          examples: [
            { name: 'FinancePilot', rationale: 'Descriptive and steady, but flagged by critic as overused.', domainSuggestion: 'financepilot.co', score: 72 },
            { name: 'RunwayNav', rationale: 'Focuses directly on extending business runway.', domainSuggestion: 'runwaynav.com', score: 81 }
          ]
        }
      ],
      selectedBrandName: 'LedgerLens',
      taglines: [
        { text: 'Understand your numbers. Make better decisions.', style: 'Action', rationale: 'Clear, direct, and universally understood by busy founders.' },
        { text: 'Financial clarity without the CFO price tag.', style: 'Outcome', rationale: 'Directly anchors the economic value proposition.' },
        { text: 'Stop guessing your cash flow. Know it.', style: 'Provocative', rationale: 'Hits the deep psychological pain of midnight cash uncertainty.' }
      ],
      selectedTagline: 'Understand your numbers. Make better decisions.',
      oneLinePitch: 'LedgerLens translates messy small business ledgers into forward-looking runway forecasts and plain-English financial decisions.',
      messagingHierarchy: {
        promise: 'Absolute financial certainty for your small business in 60 seconds a day.',
        pillars: [
          { title: 'Plain English Answers', explanation: 'Ask anything about your cash, expenses, or runway. No formulas required.', proofPoint: '99% natural language query accuracy across 200+ SME financial scenarios.' },
          { title: 'Continuous Runway Stress-Testing', explanation: 'Simulate hiring decisions, customer churn, and seasonal dips before signing contracts.', proofPoint: 'Dynamic 12-month Monte Carlo cash forecasts updated in real-time.' },
          { title: 'Zero Data Entry', explanation: 'Connects seamlessly to QuickBooks, Xero, Stripe, and 12,000+ banks.', proofPoint: 'Under 3-minute read-only setup.' }
        ]
      },
      brandVoice: {
        attributes: [
          { dimension: 'Formality', value: 45, leftLabel: 'Warm & Approachable', rightLabel: 'Boardroom Formal' },
          { dimension: 'Confidence', value: 90, leftLabel: 'Tentative', rightLabel: 'Definitive & Grounded' },
          { dimension: 'Complexity', value: 15, leftLabel: 'Plain English', rightLabel: 'Financial Jargon' },
          { dimension: 'Empathy', value: 80, leftLabel: 'Detached Analyst', rightLabel: 'Empathetic Partner' }
        ],
        dos: ['Translate accounting concepts into plain words ("runway" instead of "quick liquidity ratio").', 'Always provide a constructive "next step" when alerting to negative cash events.', 'Celebrate founder profitability and runway milestones.'],
        donts: ['Never use alarmist clickbait headlines ("YOU ARE RUNNING OUT OF MONEY").', 'Never give legal or tax advice without standard disclaimer disclaimers.', 'Never hide the math behind a black-box AI excuse.']
      }
    },
    stage4Visualize: {
      logoConcept: {
        primaryMark: 'Prismatic Lens & Dual-Horizon Glyph',
        symbolism: 'A stylized emerald lens intersecting with two progressive geometric strata, symbolizing clarity through complex financial layers.',
        svgStyle: 'geometric',
        svgIconType: 'lens-strata',
        secondaryVariant: 'LedgerLens Monogram in rounded rectangular seal'
      },
      typography: {
        headlineFont: 'Cabinet Grotesk',
        headlineClass: 'font-cabinet tracking-tight font-extrabold',
        bodyFont: 'Plus Jakarta Sans',
        bodyClass: 'font-jakarta leading-relaxed',
        accentFont: 'Space Mono',
        rationale: 'Cabinet Grotesk conveys fiscal stability and modern authority; Plus Jakarta Sans provides friendly, legible digital typography for busy founders.',
        specimen: {
          headlineSample: 'Know your exact financial runway in 60 seconds.',
          bodySample: 'LedgerLens connects with your bank accounts and accounting software to turn messy bookkeeping records into immediate strategic foresight.'
        }
      },
      colorPalette: [
        {
          role: 'Primary',
          name: 'Verdant Deep Emerald',
          hex: '#059669',
          rgb: '5, 150, 105',
          hsl: '160, 93%, 30%',
          psychology: 'Signals fiscal health, prosperous growth, and stability.',
          contrastRatio: '4.9:1'
        },
        {
          role: 'Secondary',
          name: 'Midnight Navy',
          hex: '#0F172A',
          rgb: '15, 23, 42',
          hsl: '222, 47%, 11%',
          psychology: 'Establishes institutional trust, security, and precision.',
          contrastRatio: '17:1'
        },
        {
          role: 'Accent',
          name: 'Luminous Mint',
          hex: '#34D399',
          rgb: '52, 211, 153',
          hsl: '158, 64%, 52%',
          psychology: 'Highlights positive cash flows, gains, and proactive recommendations.',
          contrastRatio: '7.2:1'
        },
        {
          role: 'Dark',
          name: 'Slate Carbon',
          hex: '#090D16',
          rgb: '9, 13, 22',
          hsl: '222, 42%, 6%',
          psychology: 'Ultra-refined dark background for executive focus.',
          contrastRatio: '19:1'
        },
        {
          role: 'Light',
          name: 'Pure Alabaster',
          hex: '#F8FAFC',
          rgb: '248, 250, 252',
          hsl: '210, 40%, 98%',
          psychology: 'Crisp readability and clean ledger paper feel.',
          contrastRatio: '18:1'
        },
        {
          role: 'Surface',
          name: 'Glass Slate',
          hex: '#111827',
          rgb: '17, 24, 39',
          hsl: '215, 28%, 17%',
          psychology: 'Card surface reflecting depth and modern SaaS elegance.',
          contrastRatio: '11:1'
        }
      ],
      shapesAndGeometry: {
        style: 'Rounded Architectural Precision',
        radius: '8px to 12px (smooth, approachable stability)',
        description: 'Clean data card containers, subtle glassmorphic blur, and emerald indicator dots.',
        usageExamples: ['12px radius cards with emerald hover glow', 'Pill badges for cash metrics', 'Subtle fine-line financial charts']
      },
      imageryDirection: {
        moodKeywords: ['Calm confidence', 'Bright architectural office', 'Artisan small business', 'Modern storefront', 'High-end espresso machine'],
        lighting: 'Warm natural morning sunlight, clean Scandinavian interiors, serene atmosphere.',
        composition: 'Thoughtful portraits of small business owners smiling in their actual workshops, bakeries, and design studios.',
        subjectMatter: 'Authentic entrepreneurs looking relieved and confident while reviewing simple tablet dashboards.',
        aiImagePrompts: [
          'Medium shot of a confident boutique shop owner smiling in her bright naturally lit plant-filled studio, reviewing numbers on an iPad, warm Scandinavian morning light, 50mm lens --ar 16:9',
          'Modern minimalist desk with an espresso cup, brass ruler, and sleek laptop displaying clean green financial charts, elegant editorial lighting --ar 16:9'
        ]
      },
      uiMood: {
        aesthetic: 'Executive Financial Sanctuary',
        surfaces: 'Deep obsidian backdrops, emerald glow indicators, and tactile glass metric widgets.',
        elevation: 'Soft multilayered diffusion shadows that create calm visual hierarchy.',
        microInteractions: 'Smooth 200ms easing counters, subtle green pulse on positive runway delta, and instant search modal.'
      },
      designReferences: [
        { brandOrProduct: 'Stripe Press & Dashboard', whatToEmulate: 'Impeccable data typography, subtle borders, and financial dignity.' },
        { brandOrProduct: 'Mercury Bank', whatToEmulate: 'Clean mint-on-dark aesthetics and effortless non-intimidating banking UX.' }
      ],
      visualsToAvoid: [
        'No clichéd dollar sign graphics or flying gold coins.',
        'No old-school green-on-black matrix stock images.',
        'No stiff corporate suits shaking hands across conference glass.'
      ]
    },
    stage5Critic: {
      overallHealthScore: 94,
      radarScores: {
        distinctiveness: 92,
        audienceFit: 97,
        memorability: 93,
        scalability: 94,
        consistency: 96
      },
      critiquePoints: [
        {
          id: 'critique-cfo-1',
          category: 'Generic Names',
          severity: 'critical',
          issue: 'Original proposed name "FinancePilot" is generic, overused in fintech, and lacks distinct trademark protection.',
          original: 'FinancePilot — The financial pilot for small business',
          critiqueReason: 'More than 40 companies use variations of "FinancePilot" or "FinPilot". It sounds like an offshore bookkeeping agency.',
          alternative: 'LedgerLens or CashPrism',
          revisedResult: 'LedgerLens — Understand your numbers. Make better decisions.',
          status: 'applied'
        },
        {
          id: 'critique-cfo-2',
          category: 'Weak Value Prop',
          severity: 'critical',
          issue: 'Original proposition was passive and sounded like a dashboard clone.',
          original: 'All-in-one financial dashboard aggregating your business bank accounts in real time.',
          critiqueReason: 'Dashboards don’t solve problems; founders already have 10 dashboards they ignore. They need decision answers.',
          alternative: 'Decision-oriented co-pilot: "Know exactly what you can spend, hire, and save without touching a spreadsheet."',
          revisedResult: 'Understand your cash flow in 60 seconds. Know exactly what you can spend, hire, and save without touching a spreadsheet.',
          status: 'applied'
        },
        {
          id: 'critique-cfo-3',
          category: 'Conflicting Personality',
          severity: 'warning',
          issue: 'Draft tone oscillated between ultra-jargon academic finance and flippant casual banter.',
          original: 'Hey buddy, your debt-service coverage ratio is looking kinda sketchy LOL.',
          critiqueReason: 'Destroys trust on life-or-death financial solvency issues.',
          alternative: 'Calm, objective, empathetic advisor tone.',
          revisedResult: 'Your cash runway is currently at 42 days. Pausing non-essential SaaS seats will extend this to 58 days. Here is the breakdown.',
          status: 'applied'
        }
      ]
    },
    brandBattle: {
      arenaTopic: 'Positioning & Messaging Alignment for LedgerLens',
      agents: [
        { id: 'b-strat', name: 'Marcus Reid', role: 'The Brand Strategist', avatar: '🎯', badge: 'Strategy', color: 'indigo', stance: 'Position against backward-looking accounting, not against CPAs.' },
        { id: 'b-creat', name: 'Elena Vance', role: 'The Creative Director', avatar: '🎨', badge: 'Design', color: 'purple', stance: 'Emerald green is necessary for financial legitimacy, but elevate it to luxury obsidian.' },
        { id: 'b-cust', name: 'Sarah Jenkins', role: 'The Small Business Persona', avatar: '💼', badge: 'Customer', color: 'emerald', stance: 'If you show me an EBITDA calculation without explaining it in English, I am unsubscribing.' },
        { id: 'b-crit', name: 'Diana Vance', role: 'The Brand Critic', avatar: '🛡️', badge: 'Critic', color: 'amber', stance: 'Ensure you do not over-promise automated tax filing. Keep focus on cash decisions.' },
        { id: 'b-guard', name: 'The Brand Guardian', role: 'Guardian & Arbiter', avatar: '⚖️', badge: 'Guardian', color: 'cyan', stance: 'Maintain unified terminology across web, app, and email digests.' }
      ],
      debateRounds: [
        {
          round: 1,
          speaker: 'Marcus Reid',
          agentRole: 'The Brand Strategist',
          avatar: '🎯',
          statement: 'We must make it clear that LedgerLens is not replacing the founder’s tax CPA. CPAs hate doing weekly cash advisory. LedgerLens becomes the daily tool CPAs recommend to their clients.',
          recommendation: 'Position LedgerLens as the founder’s daily decision co-pilot that complements existing tax accountants.'
        },
        {
          round: 2,
          speaker: 'Sarah Jenkins',
          agentRole: 'The Small Business Persona',
          avatar: '💼',
          critiqueOf: 'Marcus Reid',
          statement: 'Exactly. I like my bookkeeper, she is great at filing my 1099s. But she doesn’t help me decide if I can afford to buy 5,000 units of holiday inventory this Thursday. That is what I need LedgerLens for.',
          recommendation: 'Headline should be: "Know what you can afford to spend, hire, and inventory."'
        },
        {
          round: 3,
          speaker: 'Diana Vance',
          agentRole: 'The Brand Critic',
          avatar: '🛡️',
          statement: 'Make sure your "AI" claims don’t make owners feel their bank account is subject to probabilistic hallucinations. Emphasize that underlying calculations are deterministic math.',
          recommendation: 'Add "Deterministic calculations + plain-English explanations" to the product messaging pillars.'
        },
        {
          round: 4,
          speaker: 'The Brand Guardian',
          agentRole: 'Guardian & Arbiter',
          avatar: '⚖️',
          statement: 'Every stage output has been aligned. Color psychology (Emerald + Slate) matches stability; copy tone is reassuring without being condescending.',
          recommendation: 'Approved for launch with 94% Health Index.'
        }
      ],
      guardianAudit: {
        nameConsistency: { passed: true, score: 95, note: 'LedgerLens perfectly encapsulates double-entry bookkeeping and optical clarity.', suggestion: 'Keep capitalization uniform.' },
        taglineAlignment: { passed: true, score: 94, note: 'Tagline delivers immediate value in 6 words.', suggestion: 'Emphasize "better decisions".' },
        personalityGuard: { passed: true, score: 93, note: 'Avoided cold banking robotic prose.', suggestion: 'Ensure AI email notifications maintain reassuring cadence.' },
        visualCoherence: { passed: true, score: 96, note: 'Emerald green palette reinforces wealth preservation.', suggestion: 'Preserve high text contrast.' },
        launchMessagingCheck: { passed: true, score: 92, note: 'Speaks to the quiet panic of small business payroll.', suggestion: 'A/B test LinkedIn ad headline.' }
      },
      orchestratorSynthesis: {
        verdict: 'Unanimous alignment on AI financial decision intelligence.',
        consensusPillars: [
          'Proactive future foresight beats historical accounting retrospectives.',
          'Plain-English answers eliminate founder financial dread.',
          'Bank-grade deterministic calculations safeguard user trust.'
        ],
        actionableTweaks: [
          'Renamed from generic FinancePilot to distinctive LedgerLens.',
          'Replaced generic dashboard pitch with conversational runway intelligence.',
          'Established strict tone rules preventing alarmist notifications.'
        ]
      }
    },
    stage6LaunchKit: {
      brandStrategySummary: {
        brandName: 'LedgerLens',
        category: 'AI Financial Decision Intelligence',
        mission: 'To give every small business founder total clarity and control over their financial destiny.',
        vision: 'A world where no small business fails due to unexpected cash flow blindness.',
        targetAudience: 'Small business owners, digital agency founders, and boutique e-commerce operators doing $200k-$3M ARR.',
        problem: 'Confusing monthly accounting spreadsheets arrive too late to inform everyday spending and hiring decisions.',
        valueProposition: 'Understand your cash flow in 60 seconds. Know exactly what you can spend, hire, and save without touching a spreadsheet.',
        positioning: 'The proactive AI financial decision co-pilot that turns backward-looking ledgers into forward-looking runway foresight.'
      },
      brandIdentitySummary: {
        personality: ['Clairvoyant', 'Reassuring', 'Surgical', 'Proactive'],
        principles: [
          'Never confuse data with insight: numbers must always translate to clear actions.',
          'Trust is non-negotiable: deterministic math backed by 256-bit bank-grade encryption.',
          'Empathy first: we know running a business is stressful; our job is peace of mind.'
        ],
        toneOfVoice: ['Empathetic', 'Plain English', 'Objective', 'Decisive'],
        namingRationale: 'LedgerLens marries the timeless foundation of accounting (the ledger) with the optical clarity of a lens.',
        tagline: 'Understand your numbers. Make better decisions.',
        oneLinePitch: 'LedgerLens translates messy small business bookkeeping into plain-English financial forecasts and proactive runway decisions.'
      },
      visualSystemSummary: {
        logoDirection: 'Emerald prismatic lens intersecting dual-horizon strata glyph.',
        colorPalette: [
          { name: 'Verdant Deep Emerald', hex: '#059669', role: 'Primary' },
          { name: 'Midnight Navy', hex: '#0F172A', role: 'Secondary' },
          { name: 'Luminous Mint', hex: '#34D399', role: 'Accent' },
          { name: 'Slate Carbon', hex: '#090D16', role: 'Dark' },
          { name: 'Pure Alabaster', hex: '#F8FAFC', role: 'Light' }
        ],
        typography: { headline: 'Cabinet Grotesk (Fiscal Authority)', body: 'Plus Jakarta Sans (Legible Clarity)' },
        visualMood: 'Executive financial sanctuary, serene Scandinavian morning light, crisp emerald and slate cards.',
        imageryDirection: 'Warm, authentic business owners in their studios and stores smiling with peace of mind.'
      },
      marketingAssets: {
        landingHeadline: 'Never wonder if you can afford to hire again.',
        landingSubheadline: 'LedgerLens connects to your bank and accounting software to turn messy bookkeeping into clear, plain-English financial answers in 60 seconds.',
        heroCopy: 'Stop dreading your monthly P&L statement. Ask plain questions like "What happens if client invoice X is delayed 30 days?" and get instant, stress-tested cash forecasts you can trust.',
        productDescription: 'LedgerLens is the AI financial decision co-pilot for small business owners who want fractional CFO foresight without the $5,000/month price tag. Continuously monitoring your cash runway, recurring costs, and margins so you can focus on building your business with zero financial anxiety.',
        bulletFeatures: [
          { title: 'Plain English Inquiries', desc: 'Ask natural questions about payroll, hiring, and runway without touching formulas.' },
          { title: 'Dynamic Runway Stress-Testing', desc: 'Simulate revenue changes and large expenses before committing funds.' },
          { title: 'Bank-Grade Security', desc: 'Read-only 256-bit encryption with Plaid integration. Your funds are never at risk.' }
        ],
        instagramPost: {
          caption: 'Opening your accounting software shouldn’t feel like taking a math exam you didn’t study for. ☕ LedgerLens gives you instant 60-second cash flow clarity in plain English. No spreadsheets. No panic. Just clear decisions. Try the interactive demo via link in bio.',
          hashtags: ['#smallbiz', '#founderlife', '#agencyowner', '#fintech', '#ledgerlens', '#financialclarity'],
          visualDescription: 'Serene carousel of a coffee cup beside a clean tablet dashboard displaying: "Current Runway: 84 Days. You can safely hire a part-time designer next month."'
        },
        linkedInPost: {
          hook: 'Most small business owners don’t have a cash problem. They have a cash CLARITY problem.',
          body: 'You get a 20-page PDF from your accountant on the 15th of the month. It tells you what happened 3 weeks ago.\n\nIt does not tell you if you can afford to buy inventory this Thursday or hire an account manager next month.\n\nWe built LedgerLens to give founders the proactive foresight of a fractional CFO at a fraction of the cost.\n\nUnderstand your numbers. Make better decisions.',
          cta: 'Discover your true cash runway in under 3 minutes at ledgerlens.io.'
        },
        twitterThread: [
          '1/ The #1 reason profitable small businesses fail is not lack of sales. It is unexpected cash flow timing. Here is why we built @LedgerLens to solve this 🧵👇',
          '2/ Traditional accounting tools were built for CPAs, not founders. Balance sheets and cash flow statements read like ancient Greek when all you need to know is: "Can I afford payroll next month?"',
          '3/ LedgerLens syncs with QuickBooks, Xero, and your bank to translate raw numbers into plain-English decision guidance.',
          '4/ Want to know if you can hire a $4k/mo freelancer? Ask LedgerLens. It simulates your seasonal revenue variations and gives you an instant green/yellow/red decision.',
          '5/ Public beta is live today for agencies, e-commerce brands, and service businesses: ledgerlens.io 📊✨'
        ],
        launchAnnouncement: '🚀 Announcing LedgerLens: Financial clarity without the CFO price tag. We are launching the first AI financial decision co-pilot designed specifically for small business founders. Connect in 3 minutes and replace financial dread with absolute certainty.',
        primaryCta: 'Check Your Runway in 60s',
        secondaryCta: 'Watch 2-Min Demo'
      }
    }
  }
];
