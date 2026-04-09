/* ================================================================
   SITE CONTENT — epochassocies.com
   All data consumed by components. English, M&A-native vocabulary.
   Reviewed by senior M&A banker (April 2026).
   ================================================================ */

// ── Navigation ──────────────────────────────────────────────────

export type NavSection = { id: string; label: string };

export const navSections: NavSection[] = [
  { id: "thesis",       label: "Thesis" },
  { id: "architecture", label: "Architecture" },
  { id: "pipeline",     label: "Pipeline" },
  { id: "valuation",    label: "Valuation" },
  { id: "deliverable",  label: "Deliverable" },
  { id: "differentiation", label: "Why" },
  { id: "team",         label: "Team" }
];

// ── Hero metrics (animated counters) ────────────────────────────

export type HeroMetric = {
  value: number;
  suffix: string;
  label: string;
};

export const heroMetrics: HeroMetric[] = [
  { value: 500, suffix: "K",  label: "Seller leads scored by exit readiness" },
  { value: 7,   suffix: "M",  label: "Indexed buyer records" },
  { value: 400, suffix: "K",  label: "Deals in transaction comp database" },
  { value: 14,  suffix: "+",  label: "Interconnected modules" }
];

// ── Infrastructure nodes (architecture explorer) ────────────────

export type InfraNode = {
  id: string;
  label: string;
  sublabel: string;
  techDetail: string;
  techSpecs: string[];
  maReason: string;
  moduleIds: string[];
};

export const infraNodes: InfraNode[] = [
  {
    id: "postgresql",
    label: "PostgreSQL 16",
    sublabel: "Relational DB",
    techDetail:
      "Independent container. Stores all structured deal data, HITL review queues, feedback loops, agent message bus, and system-of-record logs. Full-text search + earthdistance extension for geo queries on buyer matching.",
    techSpecs: [
      "Independent Docker container",
      "Full-text search + earthdistance",
      "HITL queues + feedback logs",
      "Agent message bus (inter-agent comms)"
    ],
    maReason:
      "Every correction a banker makes must be persisted, categorized, and fed back into the system. Deal 20 is better than Deal 1 only if corrections compound. That requires a real database, not conversation history.",
    moduleIds: ["sourcing", "pitch", "datapack", "bp", "valo", "buyer", "im", "post-im"]
  },
  {
    id: "qdrant",
    label: "Qdrant",
    sublabel: "Vector database",
    techDetail:
      "Strict namespace isolation per deal: deal_{id}_{type}. Hybrid search combining dense embeddings (bge-m3 1024d) + BM25 sparse vectors + Reciprocal Rank Fusion. Cross-encoder reranking (bge-reranker-v2-m3) on all retrieval.",
    techSpecs: [
      "Namespace: deal_{id}_{type}",
      "Dense: bge-m3 1024d embeddings",
      "Sparse: BM25 + RRF fusion",
      "Reranker: bge-reranker-v2-m3"
    ],
    maReason:
      "A banker working 5 deals simultaneously cannot risk data from Deal A leaking into Deal B. Isolation is a legal requirement. And embed-only search misses exact numbers and names, the things that kill deals when wrong.",
    moduleIds: ["sourcing", "pitch", "workshop", "datapack", "bp", "valo", "buyer", "im"]
  },
  {
    id: "vllm",
    label: "vLLM + Qwen 32B",
    sublabel: "Local LLM on RTX 4090",
    techDetail:
      "Qwen 2.5 32B-AWQ quantized model running on vLLM inference server. Handles batch tasks: entity resolution, document classification, enrichment. ~18GB VRAM on RTX 4090. Zero marginal API cost.",
    techSpecs: [
      "Qwen 2.5 32B-AWQ (4-bit)",
      "vLLM inference server",
      "RTX 4090 (~18GB VRAM)",
      "Zero marginal cost after GPU"
    ],
    maReason:
      "Resolving 500K company entities costs zero dollars on local GPU vs thousands via API. When you process that volume daily, cost structure is architecture, not optimization.",
    moduleIds: ["sourcing", "buyer"]
  },
  {
    id: "openrouter",
    label: "OpenRouter",
    sublabel: "LLM gateway",
    techDetail:
      "Unified API gateway for all frontier model calls. Single Python client (infra/llm_client.py). Model routing per task: Claude for reasoning, GPT for structured output, Kimi 2.5 for web crawling. No direct SDK imports in business modules.",
    techSpecs: [
      "Single entry: infra/llm_client.py",
      "Model routing per task type",
      "DEC-002: no direct SDK imports",
      "Kimi 2.5 for web extraction"
    ],
    maReason:
      "Models improve monthly. Being locked to one vendor means falling behind on quality. A gateway means switching from Claude to GPT to Gemini is a config change, not a codebase refactor.",
    moduleIds: ["pitch", "workshop", "datapack", "bp", "valo", "im", "buyer"]
  },
  {
    id: "docling",
    label: "Docling",
    sublabel: "Document processing",
    techDetail:
      "IBM open-source (MIT license) document processor. Structured PDF table extraction for financial documents (liasses fiscales, grand livre, FEC). Converts to structured data before any LLM sees it.",
    techSpecs: [
      "IBM, MIT license",
      "PDF structured table extraction",
      "Financial doc classification",
      "Pre-LLM data structuring"
    ],
    maReason:
      "Financial data is never generated by an LLM. Extraction is deterministic. The LLM only classifies documents and flags anomalies. You cannot risk a hallucinated EBITDA figure in a valuation.",
    moduleIds: ["datapack", "bp"]
  },
  {
    id: "langgraph",
    label: "LangGraph",
    sublabel: "Stateful orchestration",
    techDetail:
      "Used ONLY for the Email Intelligence VP agent, where stateful memory across weeks of deal communications is essential. thread_id = deal_id. Checkpoint persistence in PostgreSQL. All other modules use explicit sequential Python pipelines.",
    techSpecs: [
      "Email VP agent only",
      "thread_id = deal_id",
      "PostgreSQL checkpointing",
      "No CrewAI, no AutoGen"
    ],
    maReason:
      "The VP agent needs to remember that Argos asked for exclusivity on March 3rd when they send a follow-up on March 20th. That requires real state management, not session memory. But using it everywhere would add complexity where simple pipelines work.",
    moduleIds: ["post-im"]
  },
  {
    id: "fastapi",
    label: "FastAPI + HTMX",
    sublabel: "CRM Cockpit",
    techDetail:
      "Server-rendered cockpit interface. FastAPI backend + HTMX for interactivity + Jinja2 templates. No React, no SPA framework. Five tabs: Sourcing, Deals, Buyers, Analyst (HITL queue), VP/Director view. Runs as a cross-cutting layer across all deal stages.",
    techSpecs: [
      "Server-side rendering",
      "HTMX partial updates",
      "Jinja2 templates",
      "Cross-cutting: always-on HITL layer"
    ],
    maReason:
      "The cockpit IS the control layer. No agent output reaches the outside world without passing through the HITL queue here. Speed and simplicity for a two-person team beats React complexity.",
    moduleIds: ["sourcing", "pitch", "workshop", "datapack", "bp", "valo", "buyer", "im", "post-im"]
  },
  {
    id: "playwright",
    label: "Playwright",
    sublabel: "Web scraping",
    techDetail:
      "Stealth-mode browser automation for deal portal scraping (BPI, Fusacq, CessionPME, Michel Simond) and LinkedIn enrichment (C-level hiring signals, growth indicators).",
    techSpecs: [
      "Stealth-mode automation",
      "10+ deal portals scraped",
      "LinkedIn signal extraction",
      "Headless browser rendering"
    ],
    maReason:
      "Deal portals are the raw material of sourcing. Scraping 10+ portals daily and resolving entities against SIRENE gives Epoch a continuously updated pipeline that no manual process can match.",
    moduleIds: ["sourcing", "pitch"]
  },
  {
    id: "pptx",
    label: "python-pptx",
    sublabel: "PowerPoint engine",
    techDetail:
      "Programmatic slide generation for pitch decks. 20 layout taxonomies, design language system, figures audit on every slide. Outputs editable .pptx files, not static PDFs.",
    techSpecs: [
      "20 layout taxonomies",
      "Editable .pptx output",
      "Figures audit per slide",
      "Design language system"
    ],
    maReason:
      "Pitch decks are the currency of M&A. A banker sends 3-5 pitches per week. If each takes a day to build manually, the bottleneck is not quality but throughput. Programmatic generation with IB-grade layouts changes the unit economics.",
    moduleIds: ["pitch"]
  },
  {
    id: "langfuse",
    label: "Langfuse",
    sublabel: "LLM observability",
    techDetail:
      "LLM-specific monitoring: prompt versioning, token cost tracking, latency measurement, quality scoring. Every LLM call across all modules is traced, costed, and auditable.",
    techSpecs: [
      "Prompt version control",
      "Per-call cost tracking",
      "Latency monitoring",
      "Quality score tracking"
    ],
    maReason:
      "When 14 modules make thousands of LLM calls per deal, you need to know which calls cost money, which are slow, and which produce bad output. Without observability, you are flying blind on the most variable cost in the system.",
    moduleIds: ["pitch", "workshop", "datapack", "bp", "valo", "im", "buyer"]
  },
  {
    id: "neo4j",
    label: "Neo4j",
    sublabel: "Knowledge graph",
    techDetail:
      "Graph database for structured facts, entity relationships, and provenance chains. Models company → directors → other companies → acquisition history → deal facts. Enables multi-hop queries that relational databases cannot express efficiently.",
    techSpecs: [
      "Entity-relationship graph",
      "Multi-hop provenance queries",
      "Fact linking across modules",
      "Director network analysis"
    ],
    maReason:
      "In M&A, facts are connected. A director who sits on 3 boards, each acquired by the same PE fund, is a serial acquirer signal. A revenue figure from a workshop that contradicts a published account is a red flag. A graph connects what tables cannot.",
    moduleIds: ["sourcing", "buyer", "pitch", "workshop", "datapack", "valo"]
  },
  {
    id: "openpyxl",
    label: "openpyxl",
    sublabel: "Excel engine",
    techDetail:
      "Read/write for all financial models: datapacks, business plans, valuation workbooks, buyer lists. Zero hard-coded values: every cell is a formula (SUMIF, INDEX MATCH). Source lineage tab in every output.",
    techSpecs: [
      "All cells are formulas",
      "Source lineage tracking",
      "Multiple template families",
      "Deterministic output"
    ],
    maReason:
      "Investment bankers live in Excel. A valuation delivered as a PDF is useless. The buyer's analyst needs to pull the model apart, change assumptions, stress-test. Every cell must be a formula, every figure traceable.",
    moduleIds: ["datapack", "bp", "valo", "buyer"]
  }
];

// ── Pipeline stages ─────────────────────────────────────────────
// Corrected ordering per senior banker review.
// CRM Cockpit and Email Intelligence are cross-cutting layers,
// not sequential stages — they are shown in the architecture explorer
// as infrastructure (FastAPI + LangGraph).

export type PipelineStatus = "live" | "testing" | "spec";

export type PipelineStage = {
  id: string;
  number: string;
  title: string;
  status: PipelineStatus;
  oneLiner: string;
  details: string[];
  architectureInsight: string;
};

export const pipelineStages: PipelineStage[] = [
  {
    id: "sourcing",
    number: "01",
    title: "Sourcing",
    status: "live",
    oneLiner: "Scrape 10+ deal portals, resolve entities, enrich, score by exit readiness signals.",
    details: [
      "Entity Resolution cascade: 3 levels (deterministic fuzzy match, then Qwen 32B local, then frontier model via OpenRouter). Each level fires only if the previous fails.",
      "Dedup pre-ER module to avoid paying 3x for the same company across portals.",
      "URL Resolution: 4-level cascade (Pappers, Google, aggregators, manual).",
      "LinkedIn enrichment via Playwright (C-level hiring signals, growth indicators).",
      "Cold data sourcing: multicriteria search on INSEE/INPI to find 5K-15K SMEs that are likely sellable but have not listed anywhere.",
      "PostgreSQL with full-text search + earthdistance extension for geo queries."
    ],
    architectureInsight: "Module = deterministic pipeline. LLM is only the fallback when rules fail, not the default. 70% of entity resolution is pure string matching at zero cost."
  },
  {
    id: "pitch",
    number: "02",
    title: "Agent Pitch",
    status: "live",
    oneLiner: "Generate an IB-grade pitch deck (python-pptx) to convince a business owner to sign a sell-side mandate.",
    details: [
      "Conversation-first: the banker describes the deal in natural language, the agent plans and executes autonomously.",
      "Autonomously calls Agent Info Publique (full public data research), Buyer Matching (preliminary buyer list), and Valuation Engine (preliminary valuation range). These modules run for the first time at pitch stage.",
      "Epoch's proprietary equity story structure: Genesis & Legitimacy, Why Now, Hidden Value, Growth Potential, Buyer Universe, Valuation Context, Process & Timeline.",
      "20 layout taxonomies (12 standard + 4 premium + 4 innovation).",
      "Figures audit: every number traced to source, flagged by reliability (certified / declarative / estimated / public_web).",
      "3-revision circuit breaker: if same section revised 3x, escalate to human."
    ],
    architectureInsight: "Agent Info Publique runs FULL at pitch stage, not post-mandate. You need the complete public dossier to write a credible pitch. The 24-slide Medadom deck was generated in 15 minutes (review and iteration add banker time on top)."
  },
  {
    id: "mandate",
    number: "03",
    title: "Mandate Signed",
    status: "live",
    oneLiner: "Deal transitions to code name. All modules use deal_id + DEAL_ROOT_PATH only.",
    details: [
      "Company moves from real name (\"Plombier Dupont\") to mythological code name (\"Projet Hephaistos\").",
      "File structure synced via Google Drive desktop (Docker volume mount in dev, rclone in prod).",
      "deal_id becomes the canonical identifier across all modules, databases, and vector namespaces.",
      "NDA tracking and confidentiality management integrated from this point forward."
    ],
    architectureInsight: "This is a process gate, not a module. But the namespace transition (real name to code name, deal_id isolation) is where data compartmentalization becomes structural."
  },
  {
    id: "workshop",
    number: "04",
    title: "Workshop",
    status: "testing",
    oneLiner: "Generate structured interview guides for management workshops with staleness detection.",
    details: [
      "8-step pipeline: public info ingestion, client doc ingestion, coverage analysis, contradiction detection, HITL brief validation, RAG-powered trame generation, output generation, post-workshop feedback loop.",
      "Two output versions: internal (banker notes, red flags, strategic angles) and external (clean, sent to management).",
      "Staleness detection: if new info arrives between Workshop 1 and Workshop 2, the trame adapts automatically.",
      "Workshop N+1 ingests the synthesis of Workshop N.",
      "Contradiction detection across public vs. client sources."
    ],
    architectureInsight: "The workshop trame is where deal knowledge crystallizes. Every subsequent module (BP, Valo, IM) reads from this foundation. Get this wrong and everything downstream is built on sand."
  },
  {
    id: "datapack",
    number: "05",
    title: "Datapack Financier",
    status: "testing",
    oneLiner: "Ingest raw financial documents, extract, restate, produce a fully formulaic Excel workbook.",
    details: [
      "Ingests liasses fiscales PDF, grand livre Excel, FEC files.",
      "Document classification via LLM (2050, 2051, 2052, 2053 tax forms).",
      "PDF extraction via Docling (IBM, MIT license) for structured tables.",
      "Zero hard-coded values: every cell in the output Excel is a formula (SUMIF, INDEX MATCH).",
      "Each restatement flagged for HITL review with justification and source reference.",
      "Source lineage: dedicated tab mapping every figure to (file, page, cell, extraction date).",
      "Devil's Advocate agent challenges every restatement from a buyer's perspective."
    ],
    architectureInsight: "Financial data is NEVER generated by an LLM. Extraction is deterministic. The LLM classifies documents and flags anomalies. A wrong EBITDA cascades into the valuation, the IM, every buyer conversation."
  },
  {
    id: "bp",
    number: "06",
    title: "Business Plan",
    status: "testing",
    oneLiner: "Build a 5-year projected P&L, balance sheet, cash flow as a fully formulaic Excel workbook.",
    details: [
      "4 agents: Diagnostic (RAG-powered deal understanding), Builder (Excel construction), Reviewer (deterministic formula validation), Devil's Advocate (adversarial challenge from buyer perspective).",
      "7 topline decomposition engines: top clients + remainder, volume x price, ARR bridge (SaaS), cohort analysis, sales pipeline, multichannel, custom.",
      "Anti-hallucination at 4 levels: structured parsing (no RAG on financials), confidence scoring per RAG hypothesis, \"not available\" guard if below threshold, independent Reviewer agent.",
      "HITL gates between each phase. Pipeline WAITS for validation (hours, days). State persisted in DB."
    ],
    architectureInsight: "The BP module has more gates than any other. A wrong projection cascades into the valuation, the IM, the buyer conversations. Every assumption must be traceable to a source."
  },
  {
    id: "valo",
    number: "07",
    title: "Valuation Engine",
    status: "testing",
    oneLiner: "Three independent branches (transaction comps, trading comps, LBO analysis) that cross-validate into a football field.",
    details: [
      "Branch A (always active): 400K deals from MAKB + CFNews. ~15-25% with disclosed multiples. 3-tier retrieval cascade: strict SQL, relaxed SQL, semantic search with cross-encoder reranking.",
      "Branch B (conditional): live yfinance data. Mandatory discounts: DLOM (20-35%), size discount (5-30%). All formulas in native Excel. Skip if fewer than 3 peers.",
      "Branch C (conditional, EBITDA >= 1M): reverse LBO model. 2 template families (885-row standard, 606-row alternative). Sensitivity tables: entry multiple x exit multiple to IRR.",
      "Synthesis: football field chart. Cross-validation: if trading comps diverge >30% from transaction comps, flag to banker.",
      "5-tab Excel output: Synthesis, Transaction Comps, Trading Comps, LBO Analysis, Hypotheses & Limits."
    ],
    architectureInsight: "Transaction comps are the anchor. Trading comps confirm or challenge. LBO analysis sets the PE buyer ceiling. The banker decides the weights. The system proposes, never concludes."
  },
  {
    id: "buyer",
    number: "08",
    title: "Buyer Matching",
    status: "testing",
    oneLiner: "Match target against a 7M-record buyer database. No Pappers. Direct public APIs only. Runs in parallel with stages 05-07.",
    details: [
      "Database built WITHOUT Pappers (direct INSEE, INPI RNE, BODACC, open data).",
      "Enrichment layers: SIRENE (identity, NAF, headcount), INPI RNE (directors, age, financials, beneficial owners), BODACC (acquisition history, legal), public procurement, geocoding.",
      "Serial acquirer detection: graph analysis of directors across companies + BODACC acquisition patterns + PE portfolio scraping.",
      "6 buyer types: corporate independent, PE-backed, PE fund, search fund, consolidator, individual.",
      "Vectorized company descriptions in Qdrant for semantic matching.",
      "Preliminary buyer list runs at pitch stage. Full list built in parallel with datapack/BP/valo, ready before IM goes to market.",
      "Every banker correction (add/remove/rerank) improves future matching."
    ],
    architectureInsight: "Building a 7M-record buyer DB from free public APIs instead of paying Pappers is the unsexy work that creates a real moat. The data is the defensible asset."
  },
  {
    id: "im",
    number: "09",
    title: "IM Writer",
    status: "testing",
    oneLiner: "Generate the Confidential Information Memorandum from all prior module outputs.",
    details: [
      "Consumes ALL prior modules: Info Publique, Workshop synthesis, Datapack, BP, Valo.",
      "Two narrative modes: sell-side competitive (multi-buyer process, no price shown) and bilateral management presentation (single identified buyer, full valuation included).",
      "CIM corpus: 8+ analyzed IMs from Lincoln, Sycomore, Bryan Garnier, Clipperton. Sector coverage expanding beyond tech/SaaS into industrial, BTP, healthcare, retail.",
      "Valuation NEVER appears in a sell-side competitive CIM (fundamental M&A rule).",
      "Every figure requires citation with reliability tag."
    ],
    architectureInsight: "The IM is where all modules converge. It is the deliverable that goes to market. Every fact, figure, and claim must trace back to a source through the entire pipeline."
  },
  {
    id: "post-im",
    number: "10",
    title: "Post-IM Pipeline",
    status: "spec",
    oneLiner: "Outreach, management presentations, due diligence support, negotiation, closing.",
    details: [
      "Buyer outreach sequencing and tracking with process letter distribution.",
      "Indicative offer management: comparison, shortlisting, banker recommendation.",
      "Management presentation preparation and scheduling.",
      "Due diligence coordination: dataroom assembly, Q&A routing and answer drafting.",
      "Binding offer management, LOI/SPA comparison, term sheet analysis.",
      "Email Intelligence (always-on from mandate): two AI agents monitor Gmail, classify, extract facts, draft replies. LangGraph stateful VP agent with thread_id = deal_id. No email is ever sent by any agent.",
      "These modules close the loop from IM distribution to signed SPA."
    ],
    architectureInsight: "The post-IM pipeline is where deals are won or lost. Outreach timing, Q&A quality, and negotiation support determine whether the mandate converts to a closing."
  },
  {
    id: "qa-agent",
    number: "11",
    title: "Q&A Agent",
    status: "spec",
    oneLiner: "Structured Q&A management during due diligence. Same RAG infrastructure, purpose-built for buyer questions.",
    details: [
      "Ingests buyer questions from the dataroom Q&A module or email.",
      "Routes each question to the relevant source: datapack, BP, workshop synthesis, or management.",
      "Drafts answers using the same hybrid RAG pipeline (Qdrant + reranking + citation guard).",
      "Every answer flagged for banker review before release. require_citation=True.",
      "Tracks question patterns across buyers to detect concerns early.",
      "Builds a cumulative Q&A knowledge base reusable across deals."
    ],
    architectureInsight: "The Q&A phase is where buyers test every claim in the IM. Fast, accurate, sourced answers maintain credibility. The same RAG infrastructure that built the IM now defends it."
  },
  {
    id: "anonymization",
    number: "12",
    title: "Dataroom Anonymization",
    status: "spec",
    oneLiner: "Automatic redaction of sensitive information in dataroom documents before buyer access.",
    details: [
      "Scans uploaded documents for PII, client names, employee data, and commercially sensitive terms.",
      "Rule-based + LLM-assisted redaction with configurable sensitivity levels.",
      "Generates redacted and unredacted versions with audit trail.",
      "Confidentiality ring support: different redaction levels per buyer category (strategic vs. financial vs. individual).",
      "Integrates with the dataroom assembly pipeline in the post-IM module."
    ],
    architectureInsight: "Dataroom preparation is one of the most time-consuming tasks in a deal. Automatic anonymization with configurable rings removes hours of manual redaction work while reducing the risk of accidental disclosure."
  }
];

// ── Cross-cutting layers (displayed in architecture, not pipeline) ──

export type CrossCuttingLayer = {
  id: string;
  title: string;
  description: string;
  status: PipelineStatus;
};

export const crossCuttingLayers: CrossCuttingLayer[] = [
  {
    id: "crm",
    title: "CRM Cockpit",
    description: "Always-on control interface. Every agent output queues in the Analyst tab for human validation before any external action. Five views: Sourcing, Deals, Buyers, Analyst (HITL queue), VP/Director.",
    status: "live"
  },
  {
    id: "email",
    title: "Email Intelligence",
    description: "Always-on from mandate signature. Two AI agents monitor Gmail: Analyste (stateless per email) and VP Director (stateful per deal via LangGraph). NO SEND EVER. The banker sends.",
    status: "testing"
  }
];

// ── Guardrail principles ────────────────────────────────────────

export type Guardrail = {
  id: string;
  label: string;
  description: string;
};

export const guardrails: Guardrail[] = [
  {
    id: "no-send",
    label: "No Send Ever",
    description: "No email is ever sent by any agent. Not now, not in V2, not ever. The banker sends."
  },
  {
    id: "citation",
    label: "require_citation=True",
    description: "Every figure in every deliverable must trace to a source with a reliability tag."
  },
  {
    id: "reliability",
    label: "Reliability Tagging",
    description: "certified (audited accounts) / declarative (stated by management) / estimated (computed by agent) / public_web (scraped from public source)."
  },
  {
    id: "hitl-queue",
    label: "HITL Queue",
    description: "Every agent output flows through the CRM Analyst tab. Nothing reaches the outside world without human validation."
  },
  {
    id: "circuit-breaker",
    label: "Circuit Breakers",
    description: "If the same section is revised 3x, escalate to human. If confidence is below threshold, output \"not available\" instead of guessing."
  },
  {
    id: "adversarial",
    label: "Devil's Advocate",
    description: "An adversarial agent challenges outputs from the buyer's perspective. Flags issues by severity: critical / material / minor."
  }
];

// ── Valuation branches ──────────────────────────────────────────

export type ValoBranch = {
  id: string;
  label: string;
  role: string;
  active: string;
  description: string;
  details: string[];
};

export const valoBranches: ValoBranch[] = [
  {
    id: "transaction",
    label: "Transaction Comps",
    role: "The anchor",
    active: "Always active",
    description: "400K deals from MAKB (S&P Global) + CFNews. ~15-25% with disclosed multiples, structured and queryable.",
    details: [
      "3-tier retrieval: strict SQL filters, relaxed SQL, semantic search via Qdrant",
      "Cross-encoder reranking (bge-reranker-v2-m3)",
      "Monthly MAKB refresh, quarterly CFNews refresh",
      "185-field mapping from MAKB, structured and queryable"
    ]
  },
  {
    id: "trading",
    label: "Trading Comps",
    role: "The cross-check",
    active: "Conditional (3+ peers required)",
    description: "Live market data via yfinance with mandatory discounts for illiquidity and size.",
    details: [
      "3-layer peer identification: DB lookup, LLM generation, web validation",
      "Mandatory DLOM: 20-35% by business model (per Stout/Finnerty)",
      "Size discount: 5-30% by revenue bracket",
      "All formulas in native Excel (MEDIAN, QUARTILE.INC)"
    ]
  },
  {
    id: "lbo",
    label: "LBO Analysis",
    role: "The PE buyer ceiling",
    active: "Conditional (EBITDA >= 1M)",
    description: "Reverse LBO: what is the maximum a PE fund would pay for a target IRR of 20-25%?",
    details: [
      "2 template families: 885-row standard, 606-row alternative",
      "Sensitivity: entry multiple x exit multiple to IRR",
      "Sector defaults from MEMORY_LBO.md, enriched deal by deal",
      "6+ internalized deal structures enriching sector defaults"
    ]
  }
];

// ── Comparison table ────────────────────────────────────────────

export type ComparisonRow = {
  property: string;
  baseline: string;
  epoch: string;
};

export const comparisonRows: ComparisonRow[] = [
  {
    property: "Isolation",
    baseline: "No structural isolation between deals. Context shared across queries.",
    epoch: "Strict namespace isolation per deal. Qdrant deal_{id}_{type}. No cross-contamination."
  },
  {
    property: "Memory",
    baseline: "Session-based memory. No persistent per-deal state across weeks.",
    epoch: "Persistent per-deal memory. LangGraph checkpointing for email agent (thread_id = deal_id). Workshop N+1 reads Workshop N."
  },
  {
    property: "Facts layer",
    baseline: "Generates plausible text. No source verification or reliability classification.",
    epoch: "Every figure tagged: certified / declarative / estimated / public_web. require_citation=True. Zero hallucination tolerance."
  },
  {
    property: "Orchestration",
    baseline: "Single prompt, single output. No multi-module pipeline coordination.",
    epoch: "14 modules with Pydantic I/O contracts. Each output feeds the next. HITL gates between phases. Pipeline waits for human validation."
  },
  {
    property: "Guardrails",
    baseline: "Relies on prompt engineering for accuracy. No structural safeguards.",
    epoch: "4-level anti-hallucination. Circuit breakers. Devil's Advocate agent. Structured parsing for numbers. Confidence thresholds."
  },
  {
    property: "Learning",
    baseline: "Starts from zero every time. No compounding across engagements.",
    epoch: "Feedback compounds across deals. MEMORY files, golden examples, quarterly retro-learning. Deal 20 is dramatically better than Deal 1."
  }
];

// ── Pitch showcase slides ───────────────────────────────────────

export type ShowcaseSlide = {
  id: string;
  label: string;
  title: string;
};

export const showcaseSlides: ShowcaseSlide[] = [
  { id: "cover",  label: "Slide 01", title: "Cover" },
  { id: "comps",  label: "Slide 15", title: "Transaction comps" },
  { id: "valo",   label: "Slide 16", title: "Valuation range" },
  { id: "buyers", label: "Slide 20", title: "Buyer shortlist" }
];
