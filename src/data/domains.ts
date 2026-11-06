import { DomainData } from './types.ts';

export const CONSULTING_OVERVIEW = {
  hero: {
    eyebrow: "WORLD'S FIRST HR CONSULTECH",
    titleLine1: "Good HR Helps Organisations.",
    titleLine2: "Great HR Helps Them",
    titleAccent: "THRIVE.",
    sub: "Transform from transactional HR to strategic powerhouse. Build the operating ecosystem that makes organizations thrive, not just survive.",
    cta: "Begin Your Transformation",
    tags: ["ON-DEMAND", "EXPERIENCE-FIRST", "AI-POWERED"]
  },
  uniquePropositions: {
    tabs: [
      {
        id: "architecture",
        label: "Architecture",
        items: [
          { value: "10", label: "Industries" },
          { value: "19", label: "Functions" },
          { value: "100%", label: "Integrated Unified Marketplace" }
        ],
        description: "A single unified workforce architecture connecting business strategy to everyday execution across every corporate division."
      },
      {
        id: "coverage",
        label: "Coverage",
        items: [
          { value: "12", label: "Calibrated Sectors" },
          { value: "21", label: "Functions Mapped" },
          { value: "2,000+", label: "Job Success Profiles" }
        ],
        description: "Deep domain calibrations spanning global enterprises, sovereign entities, and agile tech ecosystems."
      },
      {
        id: "content-engine",
        label: "Content Engine",
        items: [
          { value: "30K+", label: "Skills Curated" },
          { value: "200+", label: "Validated Assessments" },
          { value: "150K+", label: "Curated Learning Tracks" }
        ],
        description: "Pre-trained taxonomies, rubrics, and development paths ready for same-day production rollout into your HRMS."
      }
    ]
  },
  paradigmShift: {
    title: "HR is Shifting Across Three Critical Dimensions",
    sub: "The world of work has fundamentally changed. Organisations that cling to legacy HR operating models will be outcompeted by those that architect their workforce function like a digital enterprise.",
    dimensions: [
      {
        number: "01",
        name: "Work",
        title: "Real Work Architecture",
        bullets: [
          "From job-based to skills-based architecture",
          "Work Operating Model redesign",
          "Role decomposition & task intelligence",
          "AI-human work distribution"
        ]
      },
      {
        number: "02",
        name: "Workforce",
        title: "Skills-Based Intelligence",
        bullets: [
          "Dynamic skills architecture & taxonomy",
          "Internal talent marketplace",
          "Capability planning & gap analytics",
          "Career ecosystem design"
        ]
      },
      {
        number: "03",
        name: "Workplace",
        title: "Seamless Experience Anywhere",
        bullets: [
          "Distributed workforce operating model",
          "Digital-first employee experience",
          "Culture & belonging architecture",
          "Manager enablement in hybrid contexts"
        ]
      }
    ],
    closing: "BlueNxt's transformation framework addresses the shift across Work, Workforce, and Workplace — building the architecture that makes your HR the competitive advantage, not the constraint."
  },
  visionCards: {
    title: "Architect Your HR Like Amazon, Netflix, Uber, Airbnb",
    sub: "These companies didn't improve industries — they reimagined them. Now imagine applying the same platform-thinking, on-demand access, and hyper-personalization to your HR function.",
    companies: [
      {
        name: "AMAZON",
        theme: "Platform Thinking",
        description: "Build HR as an integrated platform — every process, data point, and capability connected in one ecosystem."
      },
      {
        name: "NETFLIX",
        theme: "Personalization at Scale",
        description: "AI-curated learning, career paths, and development — the right intervention for every employee, automatically."
      },
      {
        name: "UBER",
        theme: "On-Demand Execution",
        description: "Career frameworks, succession plans, reward models — available instantly, when and where you need them."
      },
      {
        name: "AIRBNB",
        theme: "Experience-First Design",
        description: "Every touchpoint designed for humans — beautiful, intuitive, and built for engagement at every level."
      }
    ],
    closing: "These aren't metaphors. They are the exact methodology BlueNxt uses to architect your HR Operating Ecosystem — where every element is connected, intelligent, personalised, instant, and built around experience. Not built around process."
  },
  readyToDeployLibrary: {
    title: "The World's Most Comprehensive HR Content Engine",
    sub: "Every library is live, dynamic, and ready to deploy directly into your systems the moment you need it. Not after months of consulting. Now.",
    tags: ["Ready to Deploy", "Dynamic & Live", "HRMS Integrated", "AI-Generated on Demand", "Industry-Calibrated"],
    cards: [
      {
        badge: "12 CALIBRATED",
        title: "Industries Covered",
        description: "BFSI, Healthcare, Technology, Energy, Retail, Government — pre-calibrated to sector realities.",
        impact: "Eliminates 3–4 months of industry benchmarking. Frameworks arrive calibrated from day one.",
        cta: "Explore this library"
      },
      {
        badge: "21 FUNCTIONS",
        title: "Functions Mapped",
        description: "Finance, Engineering, Sales, Marketing, Operations, Legal — mapped and ready.",
        impact: "Enterprise-wide talent strategies deployed without rebuilding for each business unit.",
        cta: "Explore this library"
      },
      {
        badge: "2,000+ DEPLOY-READY",
        title: "Job Success Profiles",
        description: "Complete profiles with competencies, skills, KPIs — living documents that evolve.",
        impact: "Replaces months of job analysis. Skills-based hiring and career dev from week one.",
        cta: "Explore this library"
      },
      {
        badge: "30K+ AI-CURATED",
        title: "Skills Library",
        description: "The most granular skills taxonomy — technical, power skills, AI-era proficiencies.",
        impact: "Powers the shift to skills-based architecture. Unlocks mobility and predictive planning.",
        cta: "Explore this library"
      },
      {
        badge: "200+ VALIDATED",
        title: "Assessments",
        description: "Role-specific, competency-mapped for hiring, development, and leadership readiness.",
        impact: "Removes guesswork from talent decisions. Reduces mis-hires, accelerates readiness.",
        cta: "Explore this library"
      },
      {
        badge: "150K+ · 250 TRACKS",
        title: "Learning Content",
        description: "Curated resources mapped to skills and career paths — 250 structured Learning Tracks.",
        impact: "L&D transforms from generic catalogues to personalised skill journeys at scale.",
        cta: "Explore this library"
      }
    ]
  },
  domainsAccordion: [
    {
      number: "01",
      slug: "organization-work-architecture",
      name: "Organization & Work Architecture",
      tagline: "Design for agility & performance",
      description: "Architect organizations that flex, adapt, and thrive. Build the foundation for a skills-first, future-ready enterprise.",
      tags: ["Org Design", "Job Architecture", "Skills Taxonomy", "Work Design", "GIG Integration"]
    },
    {
      number: "02",
      slug: "workforce-workplace-strategy",
      name: "Workforce & Workplace Strategy",
      tagline: "Plan for the future, now",
      description: "Orchestrate your workforce by capabilities, not headcount. Blending human talent, digital workforce, and AI agents into one ecosystem.",
      tags: ["Strategic Planning", "Nationalization", "Digital Workforce", "Workplace Strategy"]
    },
    {
      number: "03",
      slug: "strategic-hr-transformation",
      name: "Strategic HR & Transformation",
      tagline: "Drive business impact",
      description: "Reinvent HR from transactional administration into an executive engine powering top-line growth and enterprise value.",
      tags: ["Target Operating Model", "HR Strategy", "Executive Alignment", "Change Leadership"]
    },
    {
      number: "04",
      slug: "integrated-talent-management",
      name: "Integrated Talent Management",
      tagline: "Attract, grow, retain the best",
      description: "Create a seamless talent ecosystem from acquisition through career progression to succession, powered by skills intelligence.",
      tags: ["Talent Acquisition", "Career Paths", "Succession", "Learning Tracks", "Assessments"]
    },
    {
      number: "05",
      slug: "total-rewards-recognition",
      name: "Total Rewards & Recognition",
      tagline: "Compensate, motivate, retain",
      description: "Shift from tenure-based compensation to skills-based total rewards that drive high performance and pay equity.",
      tags: ["Compensation Architecture", "Skills-Based Pay", "STI & LTI Design", "Pay Equity"]
    },
    {
      number: "06",
      slug: "hr-operations-tech-ai",
      name: "HR Operations, Tech & AI",
      tagline: "Intelligent, seamless, autonomous",
      description: "Build the intelligent backbone. Integrate 50+ HRIS tools, automate manual burden, and activate predictive workforce intelligence.",
      tags: ["AI & Automation", "Integration Architecture", "Data Governance", "Workforce Intelligence"]
    }
  ],
  disruptiveOfferings: {
    title: "For the first time, every HR process is available as a living, ready-to-deploy capability",
    tagline: "No waiting. No delays.",
    sub: "As consulting blends seamlessly between your organisation and ours — strategy becomes execution the moment it is agreed. See how it works",
    cards: [
      {
        number: "01",
        title: "HR Strategy Development",
        description: "Build and activate HR strategy using AI-powered frameworks connecting workforce data to business outcomes — in real time.",
        outcome: "Continuous strategic alignment. Strategy becomes a living capability, not a document that expires on delivery."
      },
      {
        number: "02",
        title: "Career Path & Internal Mobility",
        description: "Generate skills-based career paths with transferability indices instantly — mapped to real roles and opportunities.",
        outcome: "Reduces attrition by making growth visible. Employees stay when they see and act on their future — today."
      },
      {
        number: "03",
        title: "Succession Management",
        description: "Dynamic succession pipelines with readiness scoring, gap analysis — updating continuously as talent evolves.",
        outcome: "Eliminates leadership vacuum risk. Critical roles always have a ready pipeline — not a static annual review."
      },
      {
        number: "04",
        title: "Leadership Development",
        description: "Competency-mapped programs through personalized learning journeys connected to real business challenges.",
        outcome: "Builds bench strength at scale. Every high-potential gets a plan connected to actual business needs."
      },
      {
        number: "05",
        title: "Total Rewards Architecture",
        description: "Model compensation, benefits, and incentives with real-time scenario planning — across roles and geographies.",
        outcome: "Optimizes rewards spend. Data-driven architecture replaces gut-feel and outdated benchmarks."
      },
      {
        number: "06",
        title: "HR Agents & Automation",
        description: "AI agents handling policy queries, onboarding, benefits administration, compliance, and self-service autonomously.",
        outcome: "Frees HR from transactional burden. Professionals drive strategy instead of answering repetitive queries."
      }
    ]
  },
  differentiation: {
    title: "From One-Time Project to Always-On Partnership",
    sub: "Traditional consulting delivers projects that expire. BlueNxt delivers a permanent transformation capability — combining pre-built intelligence, AI-powered generation, and deep expertise available 365 × 24 × 7.",
    traditionalPoints: [
      "12–16 week discovery-to-delivery cycles",
      "Static reports and frameworks that expire",
      "Solutions stuck in PowerPoint, never implemented",
      "No infrastructure left behind after engagement",
      "Creates dependency on consultant availability",
      "Content built from scratch every engagement"
    ],
    blueNxtPoints: [
      "From months to days — ready to deploy from day one",
      "Dynamic solutions that evolve with your organisation",
      "Strategy becomes execution — instantly",
      "Tools, platforms, and knowledge that stay forever",
      "Permanent capability — always-on, anytime, anywhere",
      "30K+ skills, 180K+ content — pre-built, always current"
    ],
    timeline: [
      {
        phase: "01",
        timeframe: "WEEK 1–2",
        title: "Discovery & Diagnostic",
        description: "Deep diagnostic across all six domains. A comprehensive picture of where you are, where the gaps are, and the priority sequence for transformation."
      },
      {
        phase: "02",
        timeframe: "WEEK 3–6",
        title: "Architecture & Roadmap",
        description: "We co-design your HR Operating Ecosystem — the target state, the transformation architecture, and a phased roadmap with clear priorities."
      },
      {
        phase: "03",
        timeframe: "MONTH 2–6",
        title: "Deploy & Embed",
        description: "Our team works inside your organisation — deploying platforms, running programs, building capability, and making the new model operational from day one."
      },
      {
        phase: "04",
        timeframe: "ONGOING",
        title: "Always-On Partnership",
        description: "The engagement never ends — it evolves. BlueNxt remains embedded as a permanent capability partner, continuously adapting as your business changes."
      }
    ]
  },
  finalCta: {
    eyebrow: "THE TRUE OUTCOME",
    title: "Generate 10× Value",
    sub: "The organisations that get this right don't just improve HR — they build the enterprise operating system that makes everything else perform better. Begin your transformation journey with a single conversation.",
    checks: [
      "30-minute strategic conversation",
      "Customised to your domain priorities",
      "No obligation"
    ]
  }
};

export const DOMAINS_DATA: Record<string, DomainData> = {
  "organization-work-architecture": {
    slug: "organization-work-architecture",
    number: "01",
    title: "Organization & Work Architecture",
    h1: "Architect Work & Organization",
    fromTo: "Static hierarchies & fixed job descriptions → Dynamic, skills-first organization design",
    subtitle: "Design organizations that flex, adapt, and perform. Build the structural foundation for a skills-first enterprise where work flows to the best capability — not the nearest job title.",
    caseForChangeStats: [
      { stat: "75%", label: "Of org redesigns fail to deliver intended outcomes", source: "McKinsey, 2024" },
      { stat: "3–5×", label: "More agile when work is decomposed into skills", source: "Deloitte, 2024" },
      { stat: "23%", label: "Of roles will be substantially changed by 2027", source: "WEF Future of Jobs, 2024" },
      { stat: "2.1×", label: "Higher performance in skills-based organizations", source: "Mercer, 2024" }
    ],
    journey: {
      h2: "From Static Structures to Dynamic Organization Design",
      subtitle: "The traditional organization chart is dead. The future belongs to fluid architectures that reconfigure around business needs — powered by skills intelligence and designed for continuous adaptation.",
      friction: [
        "Rigid hierarchies that can't adapt to market shifts",
        "Job descriptions disconnected from actual work performed",
        "Siloed departments blocking cross-functional collaboration",
        "Span of control and layers creating decision bottlenecks",
        "No connection between org structure and skills strategy"
      ],
      vision: [
        "Skills-based org design that flexes with business needs",
        "Work architecture decomposed into tasks, projects, and capabilities",
        "Fluid team structures blending FTEs, gig workers, and AI agents",
        "Living job frameworks that evolve continuously",
        "Data-driven design decisions powered by workforce intelligence"
      ],
      catalyst: [
        "Ready-to-deploy org design frameworks and job architectures",
        "AI-powered role mapping and skills-to-structure alignment",
        "2,000+ Job Success Profiles for instant deployment",
        "Direct HRMS integration — design becomes execution same day",
        "Co-creation partnership, not one-time consulting engagements"
      ],
      outcome: [
        "Faster organizational response to market opportunities",
        "Reduced bureaucratic layers and decision-making time",
        "Clear line of sight from roles to skills to business outcomes",
        "Foundation for internal mobility and career development",
        "Workforce agility that compounds over time"
      ]
    },
    approach: {
      h2: "How We Transform Organizations",
      subtitle: "A proven four-phase methodology that takes you from diagnosis to deployment — in days, not months.",
      phases: [
        {
          phaseNumber: "PHASE 01",
          name: "Diagnose",
          description: "Assess current org health, structural gaps, and skills misalignment using our diagnostic framework",
          tags: ["Org Assessment", "Span Analysis", "Health Check"]
        },
        {
          phaseNumber: "PHASE 02",
          name: "Design",
          description: "Build target operating model, job architecture, and work design using ready-to-deploy libraries",
          tags: ["Target Model", "Job Architecture", "Role Decomposition"]
        },
        {
          phaseNumber: "PHASE 03",
          name: "Deploy",
          description: "Implement directly into HRMS with role mapping, skills tagging, and career framework integration",
          tags: ["HRMS Integration", "Skills Tagging", "Role Mapping"]
        },
        {
          phaseNumber: "PHASE 04",
          name: "Optimize",
          description: "Continuously refine with AI-powered analytics measuring structural effectiveness against business KPIs",
          tags: ["Continuous Refinement", "Structural Analytics", "KPI Tracking"]
        }
      ],
      footerPill: "From diagnosis to deployment · Days, not months"
    },
    capabilities: [
      {
        number: "01",
        name: "Organization Design & Health",
        shortDescription: "Diagnose structural effectiveness and design target operating models that balance efficiency with agility.",
        tags: ["Org Assessment", "Target Model", "Span Analysis", "Layer Optimization"],
        cta: "Architect My Organization"
      },
      {
        number: "02",
        name: "Work Design & Job Framework",
        shortDescription: "Deconstruct jobs into discrete skills and tasks to establish dynamic, adaptable work architecture.",
        tags: ["Work Deconstruction", "Task Intelligence", "Job Leveling", "Capability Matrix"],
        cta: "Build Job Framework"
      },
      {
        number: "03",
        name: "Job Success Profiles",
        shortDescription: "Deploy pre-calibrated living job profiles enriched with competency rubrics, KPIs, and skills.",
        tags: ["2,000+ Profiles", "Competency Rubrics", "KPI Mapping", "Living Taxonomy"],
        cta: "Explore Success Profiles"
      },
      {
        number: "04",
        name: "Project & GIG Management",
        shortDescription: "Architect agile pod-based staffing models blending full-time employees, gigs, and AI agents.",
        tags: ["Agile Pods", "Gig Integration", "Internal Gigs", "Dynamic Resourcing"],
        cta: "Deploy Pod Architecture"
      },
      {
        number: "05",
        name: "Capability & Assessment",
        shortDescription: "Map enterprise capability blueprints and assess team proficiencies against global industry benchmarks.",
        tags: ["Capability Mapping", "Proficiency Scoring", "Benchmark Rubrics"],
        cta: "Assess Capabilities"
      },
      {
        number: "06",
        name: "Change & Transition Management",
        shortDescription: "Ensure seamless adoption with change-readiness indices, leader enablement, and transition toolkits.",
        tags: ["Change Readiness", "Leader Enablement", "Transition Toolkits", "Continuous Adoption"],
        cta: "Plan Transition"
      }
    ],
    scenario: {
      problemTitle: "A growing enterprise needs to restructure for agility but every org redesign has failed to stick.",
      problemDescription: "Their rigid hierarchy can't support cross-functional collaboration, decision-making is slow, and job descriptions haven't been updated in years. They need a structural foundation that enables skills-based talent management.",
      problemTags: ["Rigid Hierarchy", "Slow Decisions", "Outdated JDs", "Failed Redesigns"],
      solutionTitle: "BlueNxt Solution",
      solutionDescription: "Deploy our ready-to-deploy Organization Design framework with pre-built job architecture covering their industry. Map 500+ roles to skills taxonomy, integrate directly into HRMS, and build career frameworks in weeks — not the 6-month consulting project they were quoted elsewhere.",
      solutionTags: ["Ready-to-Deploy", "Skills Taxonomy", "HRMS Integration", "Weeks Not Months"],
      results: [
        { value: "65%", label: "Faster than traditional org design" },
        { value: "500+", label: "Roles mapped to skills in weeks" },
        { value: "100%", label: "HRMS integrated from day one" }
      ]
    }
  },

  "workforce-workplace-strategy": {
    slug: "workforce-workplace-strategy",
    number: "02",
    title: "Workforce & Workplace Strategy",
    h1: "Build a Skills-Based Workforce Strategy",
    fromTo: "Headcount-based planning & role-centric models → Skills-powered workforce intelligence",
    subtitle: "Orchestrate your workforce by capabilities, not headcount. Build strategic workforce intelligence that anticipates tomorrow — blending human talent, digital workforce, and AI agents into one ecosystem.",
    caseForChangeStats: [
      { stat: "74%", label: "Of CEOs cite skills shortage as top business risk", source: "PwC CEO Survey, 2024" },
      { stat: "44%", label: "Of workers' skills will be disrupted by 2027", source: "WEF, 2024" },
      { stat: "89%", label: "Of organizations moving to skills-based models", source: "Deloitte, 2024" },
      { stat: "30K+", label: "Skills in BlueNxt's ready-to-deploy library", source: "BlueNxt Platform" }
    ],
    journey: {
      h2: "From Headcount Planning to Skills-Based Workforce Intelligence",
      subtitle: "The future workforce isn't planned by roles — it's orchestrated by capabilities, driven by skills intelligence, and built for continuous adaptation.",
      friction: [
        "Workforce planning driven by headcount, not capabilities",
        "No visibility into skills supply vs. demand across the enterprise",
        "Nationalization targets disconnected from skill readiness",
        "Digital workforce and AI integration treated as IT projects",
        "Static, annual planning cycles that can't keep pace"
      ],
      vision: [
        "Real-time skills intelligence driving workforce decisions",
        "Strategic workforce planning powered by predictive analytics",
        "Nationalization integrated with skill development pathways",
        "Human + digital + AI workforce orchestration",
        "Continuous planning with dynamic scenario modeling"
      ],
      catalyst: [
        "30,000+ skill library ready for immediate deployment",
        "AI-powered skills gap analysis and workforce modeling",
        "Industry-calibrated workforce planning frameworks",
        "Nationalization strategy with skills-first pathways",
        "Digital workforce integration architecture"
      ],
      outcome: [
        "Proactive identification of critical skills gaps",
        "Workforce agility — redeploy capabilities in weeks, not quarters",
        "Nationalization targets achieved through skill-based development",
        "Optimized workforce cost through intelligent blended models",
        "Future-proof talent pipeline powered by skills intelligence"
      ]
    },
    approach: {
      h2: "How We Build Skills-Based Workforce Strategy",
      subtitle: "From skills taxonomy deployment to predictive workforce intelligence — in weeks, not months.",
      phases: [
        {
          phaseNumber: "PHASE 01",
          name: "Map",
          description: "Deploy skills taxonomy, assess current workforce capabilities, and identify critical gaps.",
          tags: ["Skills Taxonomy Deployment", "Capability Assessment", "Gap Identification", "Workforce Baseline"]
        },
        {
          phaseNumber: "PHASE 02",
          name: "Model",
          description: "Build workforce scenarios, map supply-demand dynamics, and design blended workforce architecture.",
          tags: ["Scenario Planning", "Supply-Demand Mapping", "Blended Workforce Design", "Cost Optimization"]
        },
        {
          phaseNumber: "PHASE 03",
          name: "Activate",
          description: "Launch skills-based planning, connect to talent and learning systems, integrate into HRMS.",
          tags: ["System Integration", "Learning Paths", "HRMS Connection", "Change Management"]
        },
        {
          phaseNumber: "PHASE 04",
          name: "Intelligence",
          description: "Enable predictive analytics, continuous skills monitoring, and real-time workforce optimization.",
          tags: ["Predictive Analytics", "Real-Time Dashboards", "Continuous Monitoring", "AI Recommendations"]
        }
      ],
      footerPill: "From skills taxonomy to intelligence · Weeks, not months"
    },
    capabilities: [
      {
        number: "01",
        name: "Strategic Workforce Planning",
        shortDescription: "Build dynamic, scenario-based workforce plans that align capabilities with business strategy in real time.",
        tags: ["Demand Forecasting", "Supply Analysis", "Scenario Planning", "Capacity Modeling"],
        cta: "Build My Workforce Strategy"
      },
      {
        number: "02",
        name: "Skills Architecture",
        shortDescription: "Deploy a 30,000+ granular skill taxonomy connected to job families and career mobility paths.",
        tags: ["Taxonomy Deployment", "Skill Clustering", "Proficiency Levels", "Mobility Vectors"],
        cta: "Deploy Skills Taxonomy"
      },
      {
        number: "03",
        name: "Workforce Nationalization",
        shortDescription: "Accelerate localization and nationalization targets through structured capability-building pathways.",
        tags: ["Localization Strategy", "National Talent Tracks", "Compliance Tracking", "Fast-track Readiness"],
        cta: "Design Nationalization Plan"
      },
      {
        number: "04",
        name: "Digital Workforce Integration",
        shortDescription: "Harmonize full-time personnel, contractors, and autonomous AI agents in one unified workflow.",
        tags: ["AI Agent Teaming", "Blended Labor Modeling", "Digital Colleagues", "Task Allocation"],
        cta: "Integrate Digital Workforce"
      },
      {
        number: "05",
        name: "Workplace Strategy",
        shortDescription: "Design distributed, hybrid, and remote operating frameworks focused on productivity and culture.",
        tags: ["Hybrid Policies", "Space Utilization", "Distributed Culture", "Collaboration Model"],
        cta: "Optimize Workplace"
      },
      {
        number: "06",
        name: "Workforce Analytics",
        shortDescription: "Generate predictive foresights on flight risks, capability deficits, and labor cost efficiency.",
        tags: ["Predictive Foresights", "Flight Risk", "Productivity Telemetry", "Cost Optimization"],
        cta: "Explore Workforce Analytics"
      }
    ],
    scenario: {
      problemTitle: "A government entity must achieve nationalization targets while maintaining operational excellence",
      problemDescription: "Traditional nationalization approaches create compliance without capability. They need a skills-first strategy that builds genuine workforce readiness.",
      problemTags: ["Compliance-Only", "No Skill Readiness", "Headcount Focus", "Static Plans"],
      solutionTitle: "BlueNxt Solution",
      solutionDescription: "Deploy skills taxonomy for target roles, map current national workforce capabilities against requirements, design accelerated development pathways with 250 learning tracks, and build succession pipelines — all integrated into HRMS for real-time tracking.",
      solutionTags: ["Skills Taxonomy", "250 Learning Tracks", "Succession Pipelines", "HRMS Integrated"],
      results: [
        { value: "10K+", label: "Skills mapped to national workforce" },
        { value: "250", label: "Learning tracks deployed" },
        { value: "65%", label: "Faster capability readiness" }
      ]
    }
  },

  "strategic-hr-transformation": {
    slug: "strategic-hr-transformation",
    number: "03",
    title: "Strategic HR & Transformation",
    h1: "Transform Strategic HR & Operating Models",
    fromTo: "Administrative service provider → Executive value-creation engine",
    subtitle: "Re-engineer your HR organization into an indispensable enterprise partner. Align human capital with boardroom strategy through data-driven architectures and living operational models.",
    caseForChangeStats: [
      { stat: "82%", label: "Of CEOs say HR must act as an enterprise growth catalyst", source: "Gartner CHRO Study, 2024" },
      { stat: "3.2×", label: "Higher shareholder return in business-aligned HR firms", source: "McKinsey, 2024" },
      { stat: "60%", label: "Of HR leaders report disconnect between strategy and execution", source: "Bersin, 2024" },
      { stat: "90 Days", label: "Average timeline to full Target Operating Model activation", source: "BlueNxt Benchmark" }
    ],
    journey: {
      h2: "From Administrative Center to Strategic Engine",
      subtitle: "When HR operates like a digital enterprise, every strategic ambition of the business is supported by continuous capability orchestration.",
      friction: [
        "HR perceived as an administrative bottleneck and cost center",
        "Disjointed priorities between business units and people teams",
        "Lack of quantified ROI on human capital programs",
        "Outdated three-legged stool operating models that slow execution",
        "Strategy that lives in PowerPoint presentations and dies on rollout"
      ],
      vision: [
        "HR functioning as the primary architect of enterprise agility",
        "Direct alignment between capital allocation and capability building",
        "Agile HR pools deploying talent dynamically to highest-value initiatives",
        "Algorithmic decision support augmenting HR business partners",
        "Continuous execution that adapts to market shifts in real time"
      ],
      catalyst: [
        "Target Operating Model blueprints designed for modern digital scale",
        "Direct executive dashboarding linking workforce signals to EBITDA",
        "Pre-built HR Business Partner capability upskilling tracks",
        "Seamless integration of consulting, AI platforms, and academy",
        "Always-on partnership that evolves with corporate strategy"
      ],
      outcome: [
        "HR seated at the core of all executive strategic planning",
        "Accelerated strategic execution across business transformations",
        "Quantifiable contribution to productivity, innovation, and margins",
        "Elimination of repetitive administrative friction across all teams",
        "Permanent organizational capability that compounds over time"
      ]
    },
    approach: {
      h2: "How We Transform Strategic HR",
      subtitle: "A modern co-creation pathway turning intent into an agile, permanently embedded operating engine.",
      phases: [
        {
          phaseNumber: "PHASE 01",
          name: "Assess & Align",
          description: "Benchmark current HR maturity, stakeholder sentiment, and alignment with corporate strategy.",
          tags: ["Strategic Audit", "Stakeholder Alignment", "Value Driver Mapping"]
        },
        {
          phaseNumber: "PHASE 02",
          name: "Architect TOM",
          description: "Co-design the target operating model: agile pools, digital centers of expertise, and AI buddy augmentation.",
          tags: ["Target Operating Model", "Service Delivery Design", "Governance Setup"]
        },
        {
          phaseNumber: "PHASE 03",
          name: "Activate & Embed",
          description: "Deploy new operating mechanisms, retrain HR teams via BlueNxt Academy, and activate AI tools.",
          tags: ["Capability Building", "Academy Upskilling", "Pilot Activation"]
        },
        {
          phaseNumber: "PHASE 04",
          name: "Measure & Compound",
          description: "Continuously track enterprise impact with real-time value scorecards and strategic scenario modeling.",
          tags: ["Value Telemetry", "Continuous Advisory", "Adaptive Scaling"]
        }
      ],
      footerPill: "From strategic diagnosis to embedded TOM · 6 to 12 weeks"
    },
    capabilities: [
      {
        number: "01",
        name: "Target Operating Model (TOM) Design",
        shortDescription: "Architect agile, fluid HR operating structures that replace rigid functional silos with dynamic capability hubs.",
        tags: ["TOM Architecture", "Agile Pods", "Shared Services Modernization", "Service Delivery"],
        cta: "Design Target Operating Model"
      },
      {
        number: "02",
        name: "HR Business Partner Enablement",
        shortDescription: "Elevate HRBPs from relationship managers to strategic talent architects equipped with predictive data.",
        tags: ["HRBP Academy", "Consultative Skills", "Business Acumen", "Decision Intelligence"],
        cta: "Upskill HRBPs"
      },
      {
        number: "03",
        name: "Enterprise Transformation Governance",
        shortDescription: "Establish disciplined transformation management offices that ensure changes deliver planned financial value.",
        tags: ["TMO Setup", "Value Realization", "Milestone Tracking", "Risk Mitigation"],
        cta: "Establish Governance"
      },
      {
        number: "04",
        name: "Culture & Change Architecture",
        shortDescription: "Engineer the cultural foundations and communication cadences necessary for sustained digital transformation.",
        tags: ["Culture Diagnostic", "Behavioral Nudges", "Leadership Modeling", "Adoption Metrics"],
        cta: "Architect Culture"
      }
    ],
    scenario: {
      problemTitle: "A diversified conglomerate struggling with fragmented HR functions and lagging growth",
      problemDescription: "Five disparate subsidiaries had independent HR teams, disjointed metrics, and zero shared talent mobility, resulting in massive redundant overhead and stalled business initiatives.",
      problemTags: ["Siloed Subsidiaries", "Redundant Overhead", "Zero Mobility", "Disjointed Metrics"],
      solutionTitle: "BlueNxt Solution",
      solutionDescription: "Deployed a unified Target Operating Model with centralized digital centers of expertise and federated agile business partners. Implemented shared skills intelligence and aligned HR KPIs directly with enterprise growth targets.",
      solutionTags: ["Unified TOM", "Centralized CoE", "Federated Agile Pods", "Skills Platform"],
      results: [
        { value: "40%", label: "Reduction in HR operating redundancy" },
        { value: "3.5X", label: "Increase in cross-subsidiary mobility" },
        { value: "8 Weeks", label: "To complete TOM cutover" }
      ]
    }
  },

  "integrated-talent-management": {
    slug: "integrated-talent-management",
    number: "04",
    title: "Integrated Talent Management",
    h1: "Engineer Talent Advantage",
    fromTo: "Fragmented talent processes & siloed HR → Integrated, skills-powered talent ecosystem",
    subtitle: "Create a seamless talent ecosystem — from acquisition through career development to succession — powered by skills intelligence, personalized experiences, and AI-driven decisions.",
    caseForChangeStats: [
      { stat: "$1.2M", label: "Average cost of a bad hire at executive level", source: "SHRM, 2024" },
      { stat: "94%", label: "Of employees would stay if they saw career growth", source: "LinkedIn, 2024" },
      { stat: "86%", label: "Of HR leaders say succession planning is inadequate", source: "Gartner, 2024" },
      { stat: "3.8×", label: "Higher engagement in personalized EX organizations", source: "Gallup, 2024" }
    ],
    journey: {
      h2: "From Fragmented Processes to Integrated Talent Ecosystem",
      subtitle: "The future of talent is connected — skills-powered decisions flowing through acquisition, development, performance, and succession as one ecosystem.",
      friction: [
        "Talent acquisition disconnected from internal mobility",
        "Performance management that doesn't drive development",
        "Leadership pipeline gaps discovered too late",
        "Learning investments not connected to career progression",
        "Employee experience inconsistent across touchpoints"
      ],
      vision: [
        "Unified talent lifecycle powered by skills intelligence",
        "AI-driven hiring with skills-based matching",
        "Visible career paths with transferability indices",
        "Dynamic succession with real-time readiness scoring",
        "Personalized employee experience at every touchpoint"
      ],
      catalyst: [
        "500+ validated assessments ready for deployment",
        "AI-generated career paths with skills transferability",
        "180,000+ learning resources in 250 structured tracks",
        "Performance-to-development integration frameworks",
        "End-to-end HRMS integration across talent lifecycle"
      ],
      outcome: [
        "Reduced mis-hires through skills-based assessment",
        "Higher retention through visible growth trajectories",
        "Stronger leadership pipeline with dynamic succession",
        "Accelerated time-to-productivity for new hires",
        "Connected talent decisions driving business performance"
      ]
    },
    approach: {
      h2: "How We Engineer Talent Advantage",
      subtitle: "From talent ecosystem assessment to AI-powered intelligence — in weeks, not months.",
      phases: [
        {
          phaseNumber: "PHASE 01",
          name: "Assess",
          description: "Map current talent ecosystem maturity, identify integration gaps, and benchmark against best practice.",
          tags: ["Talent Audit", "Integration Mapping", "Maturity Scoring", "Benchmark Analysis"]
        },
        {
          phaseNumber: "PHASE 02",
          name: "Architect",
          description: "Design connected talent lifecycle with skills-based frameworks for every process.",
          tags: ["Skills Framework", "Lifecycle Design", "Assessment Rubrics", "Career Paths"]
        },
        {
          phaseNumber: "PHASE 03",
          name: "Activate",
          description: "Deploy assessments, career paths, succession pipelines, and learning tracks into your HRMS.",
          tags: ["Assessment Rollout", "HRMS Embedding", "Track Activation", "Marketplace Launch"]
        },
        {
          phaseNumber: "PHASE 04",
          name: "Amplify",
          description: "Enable AI-driven talent intelligence — predictive matching, flight risk, and readiness scoring.",
          tags: ["Predictive Matching", "Flight Risk Scoring", "Readiness Analytics", "Continuous Feedback"]
        }
      ],
      footerPill: "From assessment to AI intelligence · Weeks, not months"
    },
    capabilities: [
      {
        number: "01",
        name: "Talent Acquisition",
        shortDescription: "Skills-based hiring with AI matching, validated assessments, and structured interview frameworks.",
        tags: ["Skills Matching", "Assessment", "Employer Brand", "Onboarding"],
        cta: "Engineer My Talent Ecosystem"
      },
      {
        number: "02",
        name: "Career & Internal Mobility",
        shortDescription: "AI-generated career trajectories with skills transferability indices that unlock internal mobility.",
        tags: ["Career Paths", "Internal Marketplace", "Transferability Index", "Talent Mobility"],
        cta: "Build Mobility Engine"
      },
      {
        number: "03",
        name: "Learning & Development",
        shortDescription: "Curated learning paths mapped to exact skill gaps across 250 structured tracks.",
        tags: ["Skill-Mapped Tracks", "Micro-Learning", "Practice Labs", "Personalized IDP"],
        cta: "Activate Learning Tracks"
      },
      {
        number: "04",
        name: "Leadership Development",
        shortDescription: "Targeted executive interventions building bench strength for business-critical challenges.",
        tags: ["Executive Bench", "High-Potential Tracks", "Leadership Labs", "Mentorship"],
        cta: "Develop Leaders"
      },
      {
        number: "05",
        name: "Succession Planning",
        shortDescription: "Dynamic talent pipelines with continuous readiness scoring replacing static annual reviews.",
        tags: ["Continuous Readiness", "Pipeline Risk", "Succession Mapping", "Talent Review"],
        cta: "Automate Succession"
      },
      {
        number: "06",
        name: "Performance Management",
        shortDescription: "Outcome-driven performance reviews tied directly to development actions and rewards.",
        tags: ["Continuous Check-ins", "OKRs", "Growth Goals", "Development Integration"],
        cta: "Modernize Performance"
      },
      {
        number: "07",
        name: "Employee Experience",
        shortDescription: "Human-centric touchpoints across the employee lifecycle that elevate loyalty and belonging.",
        tags: ["Journey Mapping", "Sentiment Analytics", "Moments that Matter", "EX Governance"],
        cta: "Elevate Experience"
      },
      {
        number: "08",
        name: "Recognition & Retention",
        shortDescription: "Peer-to-peer and milestone recognition mechanisms that reinforce desired strategic behaviors.",
        tags: ["Social Recognition", "Retention Nudges", "Impact Rewards", "Behavior Modeling"],
        cta: "Deploy Recognition"
      },
      {
        number: "09",
        name: "Talent Assessment",
        shortDescription: "Over 500 validated psychometric and competency assessments for defensible talent decisions.",
        tags: ["Validated Psychometrics", "Skill Rubrics", "Simulation Labs", "Hiring Accuracy"],
        cta: "Deploy Assessments"
      }
    ],
    scenario: {
      problemTitle: "A fast-growing company is losing top talent because employees can't see their future",
      problemDescription: "No visible career paths, fragmented learning, and succession planning that's a spreadsheet reviewed annually. They're hiring externally for roles they could fill internally — losing talent to competitors who show growth.",
      problemTags: ["No Career Paths", "Fragmented L&D", "Spreadsheet Succession", "External Hiring Bias"],
      solutionTitle: "BlueNxt Solution",
      solutionDescription: "Deploy skills-based career paths with transferability indices for all roles, launch 250 learning tracks connected to career progression, build dynamic succession pipelines for critical positions, and implement an internal talent marketplace — all integrated into HRMS within weeks.",
      solutionTags: ["Career Paths", "250 Learning Tracks", "Succession Pipelines", "Talent Marketplace"],
      results: [
        { value: "42%", label: "Reduction in regrettable attrition" },
        { value: "250", label: "Learning tracks activated" },
        { value: "500+", label: "Assessments deployed" }
      ]
    }
  },

  "total-rewards-recognition": {
    slug: "total-rewards-recognition",
    number: "05",
    title: "Total Rewards & Recognition",
    h1: "Reinvent Total Rewards",
    fromTo: "Tenure-based pay & static benefits → Skills-based total rewards architecture",
    subtitle: "Design total rewards strategies that attract, retain, and motivate — shifting from tenure-based pay to skills-based compensation that drives performance and reflects true capability contribution.",
    caseForChangeStats: [
      { stat: "68%", label: "Of employees would leave for better total rewards", source: "Willis Towers Watson, 2024" },
      { stat: "$3.2M", label: "Annual cost of misaligned compensation per 1,000 employees", source: "Mercer, 2024" },
      { stat: "2.4×", label: "Higher retention in skills-based pay organizations", source: "WorldatWork, 2024" },
      { stat: "72%", label: "Of compensation decisions lack market intelligence", source: "Korn Ferry, 2024" }
    ],
    journey: {
      h2: "From Tenure-Based Pay to Skills-Based Total Rewards",
      subtitle: "Your compensation philosophy either attracts the capabilities you need or subsidizes mediocrity. The shift to skills-based rewards is no longer optional — it's a competitive imperative.",
      friction: [
        "Pay structures based on tenure, not contribution or capability",
        "No connection between skills acquired and compensation growth",
        "Pay equity gaps across gender, roles, and geographies",
        "Incentive structures that don't drive desired performance",
        "Benefits packages that aren't personalized to workforce needs"
      ],
      vision: [
        "Skills-to-pay mapping across all job families",
        "Dynamic market intelligence driving compensation decisions",
        "Transparent pay progression tied to capability development",
        "STI/LTI schemes connected to measurable outcomes",
        "Personalized benefits reflecting diverse workforce needs"
      ],
      catalyst: [
        "Ready-to-deploy compensation architecture frameworks",
        "AI-powered market benchmarking and pay modeling",
        "STI/LTI design with real-time scenario planning",
        "Pay equity diagnostic and remediation tools",
        "Direct integration with HRMS for seamless execution"
      ],
      outcome: [
        "Significant reduction in critical skills turnover",
        "Optimized rewards spend — paying for value, not tenure",
        "Pay equity achieved with transparent, defensible structures",
        "Incentive structures that genuinely drive performance",
        "Competitive positioning in talent markets"
      ]
    },
    approach: {
      h2: "How We Reinvent Total Rewards",
      subtitle: "From diagnosis to deployment — paying for capability, not tenure.",
      phases: [
        {
          phaseNumber: "PHASE 01",
          name: "Diagnose",
          description: "Assess current rewards effectiveness, pay equity gaps, and market competitiveness.",
          tags: ["Pay Equity Audit", "Market Benchmarking", "Rewards Effectiveness", "Workforce Sentiment"]
        },
        {
          phaseNumber: "PHASE 02",
          name: "Architect",
          description: "Design skills-based compensation structure, STI/LTI schemes, and benefits architecture.",
          tags: ["Grade Structure", "Skills-Based Pay", "STI/LTI Design", "Benefits Architecture"]
        },
        {
          phaseNumber: "PHASE 03",
          name: "Model",
          description: "Run cost scenarios, impact analysis, and transition planning with AI-powered tools.",
          tags: ["Cost Scenarios", "Impact Analysis", "Risk Modeling", "Transition Planning"]
        },
        {
          phaseNumber: "PHASE 04",
          name: "Implement",
          description: "Deploy into HRMS, train managers on pay conversations, and activate continuous monitoring.",
          tags: ["HRMS Integration", "Manager Training", "Pay Communication", "Continuous Monitoring"]
        }
      ],
      footerPill: "From diagnosis to deployment · Pay for capability, not tenure"
    },
    capabilities: [
      {
        number: "01",
        name: "Compensation Architecture",
        shortDescription: "Design grade structures, pay bands, and salary scales connected to job architecture and skills taxonomy.",
        tags: ["Grade Structure", "Pay Bands", "Skills-Based Pay", "Market Pricing"],
        cta: "Reinvent My Rewards"
      },
      {
        number: "02",
        name: "STI & LTI Design",
        shortDescription: "Formulate short- and long-term incentive plans tightly calibrated to strategic enterprise outcomes.",
        tags: ["Incentive Design", "STI Calibration", "LTI & Equity", "Performance Gates"],
        cta: "Design Incentive Schemes"
      },
      {
        number: "03",
        name: "Pay Equity & Transparency",
        shortDescription: "Conduct comprehensive pay audits and remediate disparities to guarantee defensible compliance.",
        tags: ["Pay Equity Audit", "Remediation Engine", "Transparency Frameworks", "Compliance"],
        cta: "Audit Pay Equity"
      },
      {
        number: "04",
        name: "Benefits & Wellbeing",
        shortDescription: "Curate modular, personalized benefits portfolios tailored to diverse multigenerational workforces.",
        tags: ["Modular Benefits", "Mental Health", "Wellness Allowances", "Flexible Portfolios"],
        cta: "Personalize Benefits"
      },
      {
        number: "05",
        name: "Recognition Programs",
        shortDescription: "Design peer and milestone reward mechanisms that visibly reinforce high-impact behaviors.",
        tags: ["Peer Points", "Values-Based Recognition", "Milestone Rewards", "Social Impact"],
        cta: "Build Recognition Engine"
      },
      {
        number: "06",
        name: "Market Intelligence",
        shortDescription: "Access dynamic, real-time compensation benchmarks to respond proactively to talent poaching.",
        tags: ["Dynamic Benchmarks", "Talent Market Heatmaps", "Competitive Index", "Real-Time Pricing"],
        cta: "Access Market Intel"
      }
    ],
    scenario: {
      problemTitle: "A technology company losing critical talent to competitors offering premium pay for in-demand skills",
      problemDescription: "Traditional job-based pay can't respond to market dynamics. Compensation decisions are based on tenure rather than capability contribution.",
      problemTags: ["Tenure-Based Pay", "No Market Intel", "Pay Equity Gaps", "Talent Flight"],
      solutionTitle: "BlueNxt Solution",
      solutionDescription: "Deploy skills-to-pay mapping across all job families, implement dynamic market intelligence, design STI scheme tied to measurable outcomes, and create transparent pay progression — all integrated with real-time scenario modeling.",
      solutionTags: ["Skills-to-Pay Mapping", "Market Intelligence", "STI Design", "Pay Transparency"],
      results: [
        { value: "38%", label: "Reduction in critical skills turnover" },
        { value: "3×", label: "Faster time-to-competitiveness" },
        { value: "100%", label: "Pay equity compliance achieved" }
      ]
    }
  },

  "hr-operations-tech-ai": {
    slug: "hr-operations-tech-ai",
    number: "06",
    title: "HR Operations, Tech & AI",
    h1: "Transform HR Operations, Tech & AI",
    fromTo: "Disconnected systems → Intelligent, unified HR ecosystem",
    subtitle: "Build the technology backbone for future-ready HR. Integrate systems, deploy AI, automate operations, and create the data infrastructure that turns HR from cost center to intelligence engine.",
    caseForChangeStats: [
      { stat: "67%", label: "Of HR leaders plan to adopt AI solutions within 2 years", source: "Gartner, 2024" },
      { stat: "35%", label: "Of HR processes can be automated with current technology", source: "McKinsey, 2024" },
      { stat: "4×", label: "ROI from integrated HR technology platforms", source: "Josh Bersin, 2024" },
      { stat: "$2.8B", label: "Global HR tech market investment in 2024", source: "Sapient Insights, 2024" }
    ],
    journey: {
      h2: "From Disconnected Systems to Intelligent HR Technology",
      subtitle: "Most organizations invested in HR technology but haven't achieved the promise. The shift to AI-native HR operations is not a future state — it's available now.",
      friction: [
        "Multiple HR systems that don't integrate or share data",
        "Manual processes surviving despite technology investments",
        "AI initiatives stuck at pilot stage without enterprise adoption",
        "No single source of truth for workforce data",
        "HR analytics limited to backward-looking reporting"
      ],
      vision: [
        "Unified HR technology platform with seamless data flow",
        "AI embedded across all HR processes — not just pilots",
        "Predictive workforce intelligence driving decisions",
        "Automated operations with intelligent exception handling",
        "Real-time analytics dashboards for every stakeholder"
      ],
      catalyst: [
        "HR technology strategy and vendor-agnostic architecture",
        "AI deployment roadmap with use case prioritization",
        "Integration architecture connecting all HR systems",
        "Workforce intelligence platform design and deployment",
        "HR analytics maturity assessment and building program"
      ],
      outcome: [
        "Single source of truth for all workforce data",
        "AI-powered decisions at scale — not just experiments",
        "Dramatic reduction in manual HR processing time",
        "Predictive capabilities that anticipate workforce needs",
        "Technology ROI realized — not just invested"
      ]
    },
    approach: {
      h2: "How We Transform HR Technology & AI",
      subtitle: "From tech audit to AI-native operations — in weeks, not months.",
      phases: [
        {
          phaseNumber: "PHASE 01",
          name: "Audit",
          description: "Assess current tech landscape, integration gaps, data quality, and AI readiness",
          tags: ["Tech Assessment", "Integration Gaps", "Data Quality", "AI Readiness"]
        },
        {
          phaseNumber: "PHASE 02",
          name: "Architect",
          description: "Design target technology ecosystem, integration architecture, and AI deployment roadmap",
          tags: ["Target Architecture", "Integration Design", "AI Roadmap", "Vendor Strategy"]
        },
        {
          phaseNumber: "PHASE 03",
          name: "Implement",
          description: "Deploy integrations, activate AI capabilities, build dashboards, and automate processes",
          tags: ["System Integration", "AI Deployment", "Dashboard Build", "Process Automation"]
        },
        {
          phaseNumber: "PHASE 04",
          name: "Evolve",
          description: "Continuously expand AI capabilities, optimize technology ROI, and build internal capability",
          tags: ["AI Expansion", "ROI Optimization", "Capability Building", "Continuous Improvement"]
        }
      ],
      footerPill: "From audit to AI-native operations · Weeks, not months"
    },
    capabilities: [
      {
        number: "01",
        name: "HR Technology Strategy",
        shortDescription: "Vendor-agnostic technology strategy and roadmap aligned to your HR transformation vision.",
        tags: ["Tech Strategy", "Vendor Selection", "Roadmap", "Ecosystem Architecture"],
        cta: "Transform My HR Tech"
      },
      {
        number: "02",
        name: "AI & Automation",
        shortDescription: "Autonomous agents and intelligent bots resolving inquiries, document approvals, and repetitive tasks.",
        tags: ["Autonomous Agents", "Workflow Automation", "Zero-Touch Onboarding", "NLP Bots"],
        cta: "Deploy AI Automation"
      },
      {
        number: "03",
        name: "Integration Architecture",
        shortDescription: "Pre-built connectors uniting Workday, SAP, Oracle, BambooHR, Slack, and Microsoft Teams.",
        tags: ["50+ Connectors", "Real-Time Sync", "Unified Data Fabric", "API Middleware"],
        cta: "Unify HR Data"
      },
      {
        number: "04",
        name: "Workforce Intelligence",
        shortDescription: "Real-time executive dashboards surfacing turnover risk, capacity crunches, and cost variances.",
        tags: ["Predictive Analytics", "Executive Telemetry", "Sentiment Indices", "Attrition Models"],
        cta: "Activate Intelligence"
      },
      {
        number: "05",
        name: "Data Governance",
        shortDescription: "Robust data quality protocols, lineage mapping, and strict SOC 2 / GDPR privacy guardrails.",
        tags: ["Data Lineage", "GDPR Guardrails", "SOC 2 Type II", "Role-Based Access"],
        cta: "Audit Data Governance"
      },
      {
        number: "06",
        name: "HR Digital Transformation",
        shortDescription: "End-to-end digital journey re-engineering that eliminates paper and manual hand-offs.",
        tags: ["Digital Journey", "Paperless HR", "Self-Service Portals", "Mobile-First"],
        cta: "Accelerate Digital HR"
      }
    ],
    scenario: {
      problemTitle: "7 disconnected systems and no workforce intelligence",
      problemDescription: "Each HR function bought its own tool. Data doesn't flow between systems. The CHRO can't get a single view. AI pilots never scaled. Technology investment hasn't delivered ROI.",
      problemTags: ["7 Disconnected Systems", "No Data Flow", "AI Stuck at Pilots", "No ROI"],
      solutionTitle: "BlueNxt Solution",
      solutionDescription: "Conduct technology audit across all 7 systems, design integration architecture, deploy workforce intelligence dashboards, implement AI capabilities for highest-impact use cases — transforming disconnected tools into a unified intelligence platform.",
      solutionTags: ["Unified Data Platform", "AI at Scale", "Intelligence Dashboards", "Process Automation"],
      results: [
        { value: "1", label: "Unified workforce data platform" },
        { value: "3.5×", label: "Technology ROI improvement" },
        { value: "60%", label: "Process automation achieved" }
      ]
    }
  }
};
