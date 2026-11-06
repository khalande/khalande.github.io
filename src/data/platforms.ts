import { PlatformItem } from './types.ts';

export const PLATFORMS_DATA = {
  hero: {
    eyebrow: "INTELLIGENCE-FIRST HR PLATFORM",
    h1Line1: "Six Platforms.",
    h1Line2: "One Intelligent",
    h1Line3: "HR Ecosystem.",
    sub: "Not another HR software suite. Six AI-native platforms that think, act, and adapt — deployed across every domain of your workforce lifecycle. Ready in weeks. Running forever.",
    cta: "Experience the Platform",
    stats: [
      { value: "6+", label: "AI Platforms" },
      { value: "75%", label: "Faster Decisions" },
      { value: "60%", label: "Less Admin" },
      { value: "24/7", label: "Always On" }
    ],
    platformChips: ["InHRsight", "ORBIT", "TalentXler", "AchievHR", "OneClick", "Pioneers"]
  },
  designPhilosophy: {
    title: "We Fundamentally Reimagine How HR Technology Works.",
    body: "Every BlueNxt platform is designed from a single purpose: to give HR the intelligence to act, not just report. Traditional HR software automates processes. Our platforms augment judgment — making every HR decision faster, smarter, and more human.",
    quote: "The best HR technology is invisible to the human and unstoppable in its intelligence.",
    capeGrid: [
      {
        letter: "C",
        title: "Conversational",
        description: "Every platform is accessed through natural language. No training. No manuals. Ask it anything — it responds like the world's most expert HR colleague."
      },
      {
        letter: "A",
        title: "Autonomous",
        description: "AI agents that don't just surface insights — they act on them. Draft the communication. Schedule the meeting. Update the system. All in the flow of work."
      },
      {
        letter: "P",
        title: "Predictive",
        description: "From flight risk to skills gaps to succession readiness — our models don't tell you what happened. They tell you what's about to happen and what to do about it."
      },
      {
        letter: "E",
        title: "Embedded",
        description: "Not a separate tool to log into. Intelligence embedded into the moments that matter — in Slack, Teams, email, mobile, and your existing HRIS."
      }
    ],
    closing: "Built on conversational AI, real-time workforce data, and predictive models trained on 30,000+ skills, our platforms don't bolt onto your HR team. They become part of it — permanently."
  },
  marqueeItems: [
    "INTELLIGENCE OVER PROCESS",
    "INSIGHTS & FORESIGHTS",
    "REAL TIME & IN THE FLOW",
    "FROM PROCESS TO EXPERIENCES",
    "MAN–MACHINE COLLABORATION",
    "HUMAN IN THE LOOP",
    "CONVERSATIONAL & DYNAMIC",
    "ALWAYS ON",
    "YOUR PERSONAL HR CONSULTANT"
  ],
  suite: {
    title: "One Intelligence. Multiple AI Platforms.",
    sub: "Each platform is a complete AI product — purpose-built for a specific domain of HR. Together they form the Workforce Operating Stack, sharing a single intelligence layer so every insight, every action, and every employee record is connected.",
    platforms: [
      {
        id: "inhrsight",
        name: "InHRsight",
        tagline: "Workforce Intelligence",
        headline: "Real-time intelligence across your entire workforce.",
        description: "InHRsight is the command centre of your workforce — a real-time intelligence platform that turns fragmented HR data into predictive insight. See your workforce as clearly as Amazon sees its supply chain. Know who's at risk, who's ready, and what's coming next — before anyone else does.",
        metrics: [
          { value: "75%", label: "ADMIN TIME SAVED" },
          { value: "98%", label: "ATTRITION ACCURACY" },
          { value: "3×", label: "FASTER DECISIONS" },
          { value: "24/7", label: "ALWAYS RUNNING" }
        ],
        coreCapabilities: [
          "Real-time workforce dashboards — headcount, skills, turnover, costs",
          "Predictive attrition modelling with 90-day early warning signals",
          "Succession readiness scores updated daily across all critical roles",
          "Skills inventory mapping across 30,000+ competencies",
          "Manager health index — team sentiment, performance, and engagement",
          "Natural language querying — ask anything, get instant answers"
        ],
        featureCards: [
          {
            symbol: "◎",
            title: "Predictive Attrition Engine",
            description: "AI models that identify flight risk 90 days before an employee decides to leave — with recommended interventions."
          },
          {
            symbol: "◈",
            title: "Skills Inventory Intelligence",
            description: "A live map of every skill across your workforce — who has it, who needs it, and where the critical gaps are forming."
          },
          {
            symbol: "⬡",
            title: "Natural Language Querying",
            description: "\"Who are my top engineers at risk of leaving?\" Ask anything. Get an answer in seconds, not a report in days."
          }
        ],
        liveViewLabel: "INHRSIGHT · LIVE VIEW | Live Intelligence",
        querySample: "Show all high-performing engineers with high flight risk across regional hubs"
      },
      {
        id: "orbit",
        name: "ORBIT",
        tagline: "Work Architecture",
        headline: "Dynamic organization and job framework architecture.",
        description: "ORBIT deconstructs static corporate hierarchies into living, agile work structures. Automatically maps tasks to capabilities, monitors span of control in real-time, and generates living job profiles synced directly with your core HRIS.",
        metrics: [
          { value: "80%", label: "FASTER RE-ORGS" },
          { value: "2,000+", label: "SUCCESS PROFILES" },
          { value: "100%", label: "TAXONOMY SYNCED" },
          { value: "0", label: "MANUAL JD WRITING" }
        ],
        coreCapabilities: [
          "Dynamic span of control and organizational layer optimization",
          "Automated job profile generation with skill and competency rubrics",
          "Agile pod design balancing full-time employees, gigs, and AI bots",
          "Continuous organizational health monitoring and reporting",
          "Instant export and synchronization to Workday, SAP, and Oracle HCM"
        ],
        featureCards: [
          {
            symbol: "◎",
            title: "Structural Health Auditor",
            description: "Real-time algorithmic detection of redundant layers and inefficient management spans."
          },
          {
            symbol: "◈",
            title: "Living Job Architecture",
            description: "Role descriptions that automatically adjust when market skills or internal project requirements shift."
          },
          {
            symbol: "⬡",
            title: "Pod & Gig Assembler",
            description: "Form cross-functional teams in minutes based on real-time task capability requirements."
          }
        ],
        liveViewLabel: "ORBIT · WORK ARCHITECTURE | Structural Graph",
        querySample: "Simulate removing 2 management layers in Global Operations and calculate span change"
      },
      {
        id: "talentxler",
        name: "TalentXler",
        tagline: "Skills Intelligence",
        headline: "Internal talent marketplace and capability mobility.",
        description: "TalentXler maps every employee's latent capabilities against emerging business needs. Employees explore personalized career paths with skill transferability indices while managers source internal talent before opening external requisitions.",
        metrics: [
          { value: "3.5X", label: "INTERNAL MOBILITY" },
          { value: "45%", label: "LOWER RECRUITING COSTS" },
          { value: "30K+", label: "SKILLS TAXONOMY" },
          { value: "92%", label: "EMPLOYEE ENGAGEMENT" }
        ],
        coreCapabilities: [
          "AI-driven internal talent matchmaking for gigs and permanent roles",
          "Skills transferability index revealing adjacent non-linear career moves",
          "Granular capability gap analysis across departments and business units",
          "Dynamic succession pipeline scoring updating as employees complete projects"
        ],
        featureCards: [
          {
            symbol: "◎",
            title: "Mobility Matchmaker",
            description: "Matches open positions to existing staff based on adjacent skills rather than rigid titles."
          },
          {
            symbol: "◈",
            title: "Transferability Scoring",
            description: "Shows employees exactly which 3 skills will unlock their target dream role within the company."
          },
          {
            symbol: "⬡",
            title: "Internal Gig Dispatch",
            description: "Allows project managers to borrow fractional talent across departments seamlessly."
          }
        ],
        liveViewLabel: "TALENTXLER · MOBILITY MAP | Talent Flows",
        querySample: "Find top 5 internal marketing specialists with data analytics transferability"
      },
      {
        id: "achievhr",
        name: "AchievHR",
        tagline: "Performance Intelligence",
        headline: "Outcome-driven continuous performance alignment.",
        description: "AchievHR replaces rigid annual appraisals with continuous, contextual performance intelligence. Sync OKRs with project milestones, surface peer recognition, and connect individual achievement directly to growth and reward recommendations.",
        metrics: [
          { value: "65%", label: "LESS APPRAISAL TIME" },
          { value: "4.2X", label: "MORE FEEDBACK TOUCHPOINTS" },
          { value: "95%", label: "GOAL ALIGNMENT" },
          { value: "100%", label: "AUDITABLE COMPLIANCE" }
        ],
        coreCapabilities: [
          "Continuous goal recalibration based on corporate quarterly shifts",
          "AI-assisted feedback summaries eliminating bias and halo effects",
          "Direct integration between performance milestones and compensation models",
          "Manager coaching nudges that prompt timely 1:1 check-ins and recognition"
        ],
        featureCards: [
          {
            symbol: "◎",
            title: "Outcome Calibration Engine",
            description: "Translates team deliverables into verifiable individual performance milestones."
          },
          {
            symbol: "◈",
            title: "Bias-Free Feedback Co-Pilot",
            description: "Assists managers in writing objective, constructive reviews grounded in observed data."
          },
          {
            symbol: "⬡",
            title: "Dynamic Goal Cascader",
            description: "Updates lower-level KPIs when executive priorities pivot mid-year."
          }
        ],
        liveViewLabel: "ACHIEVHR · PERFORMANCE RADAR | Goal Velocity",
        querySample: "Highlight team OKRs at risk of delay and draft developmental coaching suggestions"
      },
      {
        id: "oneclickhr",
        name: "OneClickHR",
        tagline: "Flow-of-Work Automation",
        headline: "Instant policy answers and autonomous workflows in Slack & Teams.",
        description: "OneClickHR meets employees and managers wherever they work. Ask policy questions, initiate parental leave, verify benefits, or process approvals with a single sentence inside collaboration tools.",
        metrics: [
          { value: "85%", label: "TIER-1 QUERIES RESOLVED" },
          { value: "< 2 SEC", label: "AVERAGE RESPONSE TIME" },
          { value: "50+", label: "AUTOMATED ACTIONS" },
          { value: "24/7/365", label: "GLOBAL AVAILABILITY" }
        ],
        coreCapabilities: [
          "Context-aware policy navigation with citations to internal employee handbooks",
          "Autonomous routing and approval executions for leaves, travel, and perks",
          "Proactive notifications reminding managers of upcoming team milestones",
          "Multi-lingual enterprise support across 20+ languages"
        ],
        featureCards: [
          {
            symbol: "◎",
            title: "In-Slack Resolution",
            description: "Answer complex parental leave, relocation, or medical benefits questions in milliseconds."
          },
          {
            symbol: "◈",
            title: "Autonomous Action Runner",
            description: "Submit expense exemptions or role transfer approvals without ever visiting an HR portal."
          },
          {
            symbol: "⬡",
            title: "Compliance Sentinel",
            description: "Ensures every answer and automated decision strictly adheres to local labor regulations."
          }
        ],
        liveViewLabel: "ONECLICKHR · FLOW AUTOMATION | Live Bot Stream",
        querySample: "What is our paternity leave policy in Germany for employees with over 2 years tenure?"
      },
      {
        id: "pioneers",
        name: "Pioneers",
        tagline: "Learning & Capability",
        headline: "Adaptive, skills-first continuous development engine.",
        description: "Pioneers replaces generic learning libraries with hyper-personalized skill journeys. Synthesizes 150,000+ vetted modules into 250 structured tracks aligned directly to the individual's career goals and the enterprise capability blueprint.",
        metrics: [
          { value: "78%", label: "COURSE COMPLETION" },
          { value: "250", label: "STRUCTURED TRACKS" },
          { value: "4.8/5", label: "LEARNER SATISFACTION" },
          { value: "3X", label: "FASTER SKILL ACQUISITION" }
        ],
        coreCapabilities: [
          "AI Individual Development Plan (IDP) auto-generation in under 2 minutes",
          "Virtual sandbox practice labs testing applied real-world capability",
          "Automated micro-credential issuance verified against industry standards",
          "Direct integration with BlueNxt Academy mentorship and coach network"
        ],
        featureCards: [
          {
            symbol: "◎",
            title: "Personalized Track Weaver",
            description: "Assembles custom micro-learning modules based on real diagnostic assessment gaps."
          },
          {
            symbol: "◈",
            title: "Virtual Sandbox Labs",
            description: "Interactive simulations where learners practice tricky negotiation, coding, or leadership scenarios."
          },
          {
            symbol: "⬡",
            title: "Market Credentialing",
            description: "Issues blockchain-verifiable digital badges recognized across 200+ partner enterprises."
          }
        ],
        liveViewLabel: "PIONEERS · LEARNING LAB | Capability Velocity",
        querySample: "Generate a 6-week capability pathway to transition from Senior Analyst to Lead Architect"
      }
    ] as PlatformItem[]
  },
  intelligenceLayer: {
    title: "Your Personal HR Consultant — Always On",
    sub: "A unified AI engine that thinks across every platform. It doesn't just answer — it anticipates, recommends, executes, and learns.",
    cards: [
      {
        title: "Natural Conversations",
        description: "Ask anything in plain language. \"Who are my attrition risks?\" \"What skills do we need for Q3?\" Instant, intelligent answers."
      },
      {
        title: "Predictive Foresights",
        description: "See what's coming. Flight risk predictions, skills trajectories, organizational bottleneck forecasting. Proactive, not reactive."
      },
      {
        title: "In-the-Flow Intelligence",
        description: "Intelligence surfaces where you work. No logging into dashboards. Decisions happen in Slack, Teams, email — in real time."
      },
      {
        title: "Agentic Execution",
        description: "AI agents that execute — auto-route approvals, trigger onboarding, match talent, draft retention plans, and close the loop."
      }
    ]
  },
  measurableImpact: {
    title: "Intelligence That Delivers Results",
    sub: "Real outcomes from real-time intelligence. Not promises — performance metrics our platforms consistently achieve.",
    counters: [
      { value: "75%", label: "Faster Workforce Decisions", detail: "Real-time data replaces quarterly reports" },
      { value: "60%", label: "Admin Burden Eliminated", detail: "AI automation replaces manual workflows" },
      { value: "3.5X", label: "Internal Mobility", detail: "Skills-based matching unlocks hidden talent" },
      { value: "32%", label: "Cost Optimization", detail: "Workforce planning drives structural savings" }
    ]
  },
  deployment: {
    title: "Ready in Weeks. Running Forever.",
    sub: "Most HR technology takes 12–18 months to deploy. BlueNxt platforms are pre-configured, pre-trained, and ready to connect — so you start generating intelligence within weeks, not years.",
    points: [
      {
        number: "01",
        title: "No-code configuration for HR teams",
        description: "BlueNxt platforms are configured by your HR team — no IT department, no implementation partners, no six-month integration projects."
      },
      {
        number: "02",
        title: "Pre-built connectors to 50+ HRIS systems",
        description: "SAP SuccessFactors, Workday, Oracle HCM, BambooHR, ADP — your data starts flowing immediately."
      },
      {
        number: "03",
        title: "Embedded in your collaboration tools",
        description: "HRAI Assistant lives in Slack and Microsoft Teams. Intelligence reaches people where they work — not behind another login."
      },
      {
        number: "04",
        title: "Enterprise security & compliance by default",
        description: "SOC 2 Type II certified. GDPR compliant. Your data never trains our models. Privacy-first architecture from the ground up."
      }
    ],
    timelineCard: {
      title: "TYPICAL DEPLOYMENT TIMELINE",
      steps: [
        { time: "2 WEEKS", label: "Data Connect & Config" },
        { time: "4 WEEKS", label: "First Intelligence Live" },
        { time: "8 WEEKS", label: "Full Platform Operational" }
      ]
    },
    trustBadges: [
      { name: "SOC 2 Type II", detail: "Certified" },
      { name: "GDPR Compliant", detail: "Privacy-First" },
      { name: "Zero Data Training", detail: "Your data stays yours" },
      { name: "99.9% Uptime SLA", detail: "Enterprise-grade" }
    ]
  },
  cta: {
    eyebrow: "BUILD AN INTELLIGENT HR",
    title: "Ready to Build an Intelligent HR?",
    sub: "See how organisations are transforming HR from a reporting function into a real-time intelligence engine. A 30-minute demo. Always personalised to your priorities.",
    primaryBtn: "Book a Platform Demo",
    secondaryBtn: "Explore All Platforms",
    checks: [
      "Live platform walkthrough",
      "Customised to your industry",
      "No commitment required"
    ]
  }
};
