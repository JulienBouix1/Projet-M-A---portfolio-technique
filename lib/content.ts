/* ================================================================
   CONTENT LAYER — epochassocies.com
   Returns EN or FR content based on language selection.
   French translations use professional M&A vocabulary.
   ================================================================ */

export type {
  NavSection,
  HeroMetric,
  InfraNode,
  PipelineStatus,
  PipelineStage,
  CrossCuttingLayer,
  Guardrail,
  ValoBranch,
  ComparisonRow,
  ShowcaseSlide,
} from "./site-content";

import type {
  NavSection,
  HeroMetric,
  InfraNode,
  PipelineStage,
  CrossCuttingLayer,
  Guardrail,
  ValoBranch,
  ComparisonRow,
  ShowcaseSlide,
} from "./site-content";

import {
  navSections as navSectionsEN,
  heroMetrics as heroMetricsEN,
  infraNodes as infraNodesEN,
  pipelineStages as pipelineStagesEN,
  crossCuttingLayers as crossCuttingLayersEN,
  guardrails as guardrailsEN,
  valoBranches as valoBranchesEN,
  comparisonRows as comparisonRowsEN,
  showcaseSlides as showcaseSlidesEN,
} from "./site-content";

// ── Thesis types ───────────────────────────────────────────────

export type ThesisCard = { number: string; heading: string; body: string };
export type ThesisContent = { tag: string; title: string; cards: ThesisCard[] };

// ── Thesis content ─────────────────────────────────────────────

const thesisEN: ThesisContent = {
  tag: "The Problem",
  title: "400,000 French SMEs must change hands by 2030. Half will do it without IB-grade advisory.",
  cards: [
    {
      number: "01",
      heading: "The economics don\u2019t work",
      body: "A sell-side mandate on a 2M\u20AC deal generates a success fee of 80-150K\u20AC. A proper IB team (MD, Director, VP, Associate, Analyst) costs 40-60K\u20AC/month fully loaded. The math is brutal: you cannot staff a real team on a deal that takes 6-9 months and pays less than two months of payroll."
    },
    {
      number: "02",
      heading: "So the market adapts poorly",
      body: "Either boutiques cut corners (no real valuation, no structured buyer search, no CIM, just a phone call and a handshake), or the deal gets no advisory at all. 400,000 French SMEs need to change hands by 2030. Most will do it without IB-grade support because nobody can afford to give it to them."
    },
    {
      number: "03",
      heading: "AI changes the cost equation",
      body: "The thesis is not \"AI replaces the banker.\" It is: purpose-built agents can replace the junior team (Analyst + Associate + VP execution work), making IB-grade deliverables profitable at 500K-10M\u20AC EV. The MD still runs the relationship. The system does the production."
    },
    {
      number: "04",
      heading: "Infrastructure follows from the constraint",
      body: "If you need IB-grade output with no junior team, every module must be auditable, every figure traceable, every output validated by a senior banker. That is why Epoch is not a chatbot with a database. It is a deal operating system with isolation, memory, a facts layer, and human control gates at every stage."
    }
  ]
};

const thesisFR: ThesisContent = {
  tag: "Le probl\u00E8me",
  title: "400 000 PME fran\u00E7aises doivent changer de mains d\u2019ici 2030. La moiti\u00E9 le fera sans conseil de qualit\u00E9.",
  cards: [
    {
      number: "01",
      heading: "L\u2019\u00E9quation \u00E9conomique ne fonctionne pas",
      body: "Un mandat de cession sur une transaction de 2M\u20AC g\u00E9n\u00E8re 80–150K\u20AC d\u2019honoraires de succ\u00E8s. Une \u00E9quipe IB compl\u00E8te (MD, Directeur, VP, Associ\u00E9, Analyste) co\u00FBte 40-60K\u20AC/mois charges comprises. Le compte n\u2019y est pas : impossible de mobiliser une vraie \u00E9quipe sur 6-9 mois quand les honoraires couvrent \u00E0 peine deux mois de masse salariale."
    },
    {
      number: "02",
      heading: "Le march\u00E9 s\u2019adapte mal",
      body: "Soit les boutiques rognent sur la qualit\u00E9 (pas de vraie valorisation, pas de recherche structur\u00E9e d\u2019acqu\u00E9reurs, pas de m\u00E9morandum d\u2019information confidentiel, un gr\u00E9-\u00E0-gr\u00E9 non concurrentiel), soit le dossier ne b\u00E9n\u00E9ficie d\u2019aucun conseil. 400 000 PME fran\u00E7aises doivent changer de mains d\u2019ici 2030 ; la plupart le feront sans accompagnement de qualit\u00E9 IB, faute de mod\u00E8le \u00E9conomique viable."
    },
    {
      number: "03",
      heading: "L\u2019IA change l\u2019\u00E9quation des co\u00FBts",
      body: "La th\u00E8se n\u2019est pas \u00AB l\u2019IA remplace le banquier \u00BB. Elle est : des agents sp\u00E9cialis\u00E9s peuvent remplacer l\u2019\u00E9quipe junior (Analyste + Associ\u00E9 + VP en ex\u00E9cution), rendant des livrables de qualit\u00E9 IB rentables sur des valorisations de 500K-10M\u20AC. Le MD conserve la relation client. Le syst\u00E8me assure la production."
    },
    {
      number: "04",
      heading: "L\u2019infrastructure d\u00E9coule de la contrainte",
      body: "Si l\u2019on veut un livrable de qualit\u00E9 IB sans \u00E9quipe junior, chaque module doit \u00EAtre auditable, chaque chiffre tra\u00E7able, chaque livrable valid\u00E9 par un banquier senior. Ce n\u2019est donc pas un chatbot avec une base de donn\u00E9es : c\u2019est une infrastructure de process — isolation par dossier, m\u00E9moire persistante, tra\u00E7abilit\u00E9 de chaque chiffre, validation banquier \u00E0 chaque \u00E9tape."
    }
  ]
};

// ── French data ────────────────────────────────────────────────

const navSectionsFR: NavSection[] = [
  { id: "thesis",          label: "Th\u00E8se" },
  { id: "architecture",    label: "Architecture" },
  { id: "pipeline",        label: "Pipeline" },
  { id: "hitl",            label: "HITL" },
  { id: "valuation",       label: "Valorisation" },
  { id: "deliverable",     label: "Livrable" },
  { id: "differentiation", label: "Pourquoi" },
  { id: "limits",          label: "Limites" },
  { id: "team",            label: "\u00C9quipe" },
  { id: "contact",         label: "Contact" }
];

const heroMetricsFR: HeroMetric[] = [
  { value: 500, suffix: "K",  label: "Entreprises fran\u00E7aises scor\u00E9es : le dirigeant est-il pr\u00EAt \u00E0 c\u00E9der ?" },
  { value: 7,   suffix: "M",  label: "Acqu\u00E9reurs index\u00E9s et enrichis (base construite sans Pappers)" },
  { value: 400, suffix: "K",  label: "Transactions dans notre base de comparables" },
  { value: 14,  suffix: "+",  label: "Modules m\u00E9tier interconnect\u00E9s" }
];

const infraNodesFR: InfraNode[] = [
  {
    id: "postgresql",
    label: "PostgreSQL 16",
    sublabel: "Relational DB",
    techDetail:
      "Conteneur ind\u00E9pendant. Stocke toutes les donn\u00E9es structur\u00E9es de transactions, les files HITL, les boucles de r\u00E9troaction, le bus de messages inter-agents et les logs syst\u00E8me. Recherche plein texte + extension earthdistance pour les requ\u00EAtes g\u00E9ographiques de matching acqu\u00E9reurs.",
    techSpecs: [
      "Conteneur Docker ind\u00E9pendant",
      "Recherche plein texte + earthdistance",
      "Files HITL + logs de r\u00E9troaction",
      "Bus de messages agents (communication inter-agents)"
    ],
    maReason:
      "Chaque correction d\u2019un banquier doit \u00EAtre persist\u00E9e, cat\u00E9goris\u00E9e et r\u00E9inject\u00E9e dans le syst\u00E8me. Le dossier 20 n\u2019est meilleur que le dossier 1 que si les corrections se capitalisent. Cela exige une vraie base de donn\u00E9es, pas un historique de conversation.",
    moduleIds: ["sourcing", "pitch", "datapack", "bp", "valo", "buyer", "im", "post-im"]
  },
  {
    id: "qdrant",
    label: "Qdrant",
    sublabel: "Vector database",
    techDetail:
      "Isolation stricte par namespace et par dossier : deal_{id}_{type}. Recherche hybride combinant embeddings denses (bge-m3 1024d) + vecteurs creux BM25 + Reciprocal Rank Fusion. Re-ranking par cross-encoder (bge-reranker-v2-m3) sur toutes les requ\u00EAtes.",
    techSpecs: [
      "Namespace : deal_{id}_{type}",
      "Dense : embeddings bge-m3 1024d",
      "Creux : BM25 + fusion RRF",
      "Reranker : bge-reranker-v2-m3"
    ],
    maReason:
      "Un banquier travaillant sur 5 dossiers simultan\u00E9ment ne peut pas risquer une fuite de donn\u00E9es du dossier A vers le dossier B. L\u2019isolation est une obligation juridique. Et la recherche par embeddings seuls rate les chiffres exacts et les noms \u2014 pr\u00E9cis\u00E9ment ce qui tue un dossier quand c\u2019est faux.",
    moduleIds: ["sourcing", "pitch", "workshop", "datapack", "bp", "valo", "buyer", "im"]
  },
  {
    id: "vllm",
    label: "vLLM + Qwen 32B",
    sublabel: "Local LLM on RTX 4090",
    techDetail:
      "Mod\u00E8le Qwen 2.5 32B-AWQ quantifi\u00E9 sur serveur d\u2019inf\u00E9rence vLLM. G\u00E8re les t\u00E2ches batch : r\u00E9solution d\u2019entit\u00E9s, classification de documents, enrichissement. ~18 Go VRAM sur RTX 4090. Co\u00FBt marginal API nul.",
    techSpecs: [
      "Qwen 2.5 32B-AWQ (4-bit)",
      "Serveur d\u2019inf\u00E9rence vLLM",
      "RTX 4090 (~18 Go VRAM)",
      "Co\u00FBt marginal nul apr\u00E8s le GPU"
    ],
    maReason:
      "R\u00E9soudre 500K entit\u00E9s entreprises co\u00FBte z\u00E9ro euro en GPU local contre des milliers via API. Quand on traite ce volume quotidiennement, la structure de co\u00FBts est une d\u00E9cision d\u2019architecture, pas d\u2019optimisation.",
    moduleIds: ["sourcing", "buyer"]
  },
  {
    id: "openrouter",
    label: "OpenRouter",
    sublabel: "LLM gateway",
    techDetail:
      "Passerelle API unifi\u00E9e pour tous les appels \u00E0 des mod\u00E8les frontier. Client Python unique (infra/llm_client.py). Routage par t\u00E2che : Claude pour le raisonnement, GPT pour la sortie structur\u00E9e, Kimi 2.5 pour le crawling web. Aucun import direct de SDK dans les modules m\u00E9tier.",
    techSpecs: [
      "Point d\u2019entr\u00E9e unique : infra/llm_client.py",
      "Routage de mod\u00E8le par type de t\u00E2che",
      "DEC-002 : pas d\u2019import SDK direct",
      "Kimi 2.5 pour l\u2019extraction web"
    ],
    maReason:
      "Les mod\u00E8les s\u2019am\u00E9liorent chaque mois. \u00CAtre verrouill\u00E9 sur un fournisseur signifie prendre du retard en qualit\u00E9. Une passerelle permet de passer de Claude \u00E0 GPT \u00E0 Gemini par simple changement de configuration, pas par refactoring du code.",
    moduleIds: ["pitch", "workshop", "datapack", "bp", "valo", "im", "buyer"]
  },
  {
    id: "docling",
    label: "Docling",
    sublabel: "Document processing",
    techDetail:
      "Processeur de documents open-source IBM (licence MIT). Extraction structur\u00E9e de tableaux PDF pour les documents financiers (liasses fiscales, grand livre, FEC). Convertit en donn\u00E9es structur\u00E9es avant tout passage par un LLM.",
    techSpecs: [
      "IBM, licence MIT",
      "Extraction structur\u00E9e de tableaux PDF",
      "Classification de documents financiers",
      "Structuration des donn\u00E9es en amont du LLM"
    ],
    maReason:
      "Les donn\u00E9es financi\u00E8res ne sont jamais g\u00E9n\u00E9r\u00E9es par un LLM. L\u2019extraction est d\u00E9terministe. Le LLM ne fait que classer les documents et signaler les anomalies. On ne peut pas risquer un EBITDA hallucin\u00E9 dans une valorisation.",
    moduleIds: ["datapack", "bp"]
  },
  {
    id: "langgraph",
    label: "LangGraph",
    sublabel: "Stateful orchestration",
    techDetail:
      "Utilis\u00E9 UNIQUEMENT pour l\u2019agent VP Email Intelligence, o\u00F9 la m\u00E9moire stateful sur plusieurs semaines de communication est essentielle. thread_id = deal_id. Persistance des checkpoints dans PostgreSQL. Tous les autres modules utilisent des pipelines Python s\u00E9quentiels explicites.",
    techSpecs: [
      "Agent VP Email uniquement",
      "thread_id = deal_id",
      "Checkpointing PostgreSQL",
      "Pas de CrewAI, pas d\u2019AutoGen"
    ],
    maReason:
      "L\u2019agent VP doit se souvenir qu\u2019Argos a demand\u00E9 l\u2019exclusivit\u00E9 le 3 mars quand ils relancent le 20 mars. Cela exige une vraie gestion d\u2019\u00E9tat, pas de la m\u00E9moire de session. Mais l\u2019utiliser partout ajouterait de la complexit\u00E9 l\u00E0 o\u00F9 des pipelines simples suffisent.",
    moduleIds: ["post-im"]
  },
  {
    id: "fastapi",
    label: "FastAPI + HTMX",
    sublabel: "CRM Cockpit",
    techDetail:
      "Interface cockpit rendue c\u00F4t\u00E9 serveur. Backend FastAPI + HTMX pour l\u2019interactivit\u00E9 + templates Jinja2. Pas de React, pas de framework SPA. Cinq onglets : Sourcing, Dossiers, Acqu\u00E9reurs, Analyste (file HITL), Vue VP/Directeur. Fonctionne en couche transversale sur toutes les \u00E9tapes du dossier.",
    techSpecs: [
      "Rendu c\u00F4t\u00E9 serveur",
      "Mises \u00E0 jour partielles HTMX",
      "Templates Jinja2",
      "Transversal : couche HITL permanente"
    ],
    maReason:
      "Le cockpit EST la couche de contr\u00F4le. Aucun output d\u2019agent n\u2019atteint l\u2019ext\u00E9rieur sans passer par la file HITL. La rapidit\u00E9 et la simplicit\u00E9 pour une \u00E9quipe de deux l\u2019emportent sur la complexit\u00E9 de React.",
    moduleIds: ["sourcing", "pitch", "workshop", "datapack", "bp", "valo", "buyer", "im", "post-im"]
  },
  {
    id: "playwright",
    label: "Playwright",
    sublabel: "Web scraping",
    techDetail:
      "Automatisation de navigateur en mode furtif pour le scraping de portails de transactions (BPI, Fusacq, CessionPME, Michel Simond) et l\u2019enrichissement LinkedIn (signaux de recrutement C-level, indicateurs de croissance).",
    techSpecs: [
      "Automatisation en mode furtif",
      "10+ portails de transactions scrap\u00E9s",
      "Extraction de signaux LinkedIn",
      "Rendu navigateur headless"
    ],
    maReason:
      "Les portails de transactions sont la mati\u00E8re premi\u00E8re du sourcing. Scraper 10+ portails quotidiennement et r\u00E9soudre les entit\u00E9s contre SIRENE donne \u00E0 Epoch un pipeline continuellement mis \u00E0 jour qu\u2019aucun processus manuel ne peut \u00E9galer.",
    moduleIds: ["sourcing", "pitch"]
  },
  {
    id: "pptx",
    label: "python-pptx",
    sublabel: "PowerPoint engine",
    techDetail:
      "G\u00E9n\u00E9ration programmatique de slides pour les pitch decks. 20 taxonomies de mise en page, syst\u00E8me de design, audit des chiffres sur chaque slide. Produit des fichiers .pptx \u00E9ditables, pas des PDF statiques.",
    techSpecs: [
      "20 taxonomies de mise en page",
      "Sortie .pptx \u00E9ditable",
      "Audit des chiffres par slide",
      "Syst\u00E8me de design"
    ],
    maReason:
      "Les pitch decks sont la monnaie du M&A. Un banquier envoie 3 \u00E0 5 pitchs par semaine. Si chacun prend une journ\u00E9e \u00E0 construire manuellement, le goulot d'\u00E9tranglement n'est pas la qualit\u00E9 mais le d\u00E9bit. La g\u00E9n\u00E9ration programmatique avec des mises en page IB-grade change l'\u00E9quation \u00E9conomique.",
    moduleIds: ["pitch"]
  },
  {
    id: "langfuse",
    label: "Langfuse",
    sublabel: "LLM observability",
    techDetail:
      "Monitoring sp\u00E9cifique LLM : versioning des prompts, suivi des co\u00FBts par token, mesure de latence, scoring qualit\u00E9. Chaque appel LLM sur l'ensemble des modules est trac\u00E9, chiffr\u00E9 et auditable.",
    techSpecs: [
      "Contr\u00F4le de version des prompts",
      "Suivi des co\u00FBts par appel",
      "Monitoring de latence",
      "Scoring qualit\u00E9"
    ],
    maReason:
      "Quand 14 modules font des milliers d'appels LLM par dossier, il faut savoir quels appels co\u00FBtent de l'argent, lesquels sont lents, et lesquels produisent de mauvais r\u00E9sultats. Sans observabilit\u00E9, on pilote \u00E0 l'aveugle le poste de co\u00FBt le plus variable du syst\u00E8me.",
    moduleIds: ["pitch", "workshop", "datapack", "bp", "valo", "im", "buyer"]
  },
  {
    id: "neo4j",
    label: "Neo4j",
    sublabel: "Knowledge graph",
    techDetail:
      "Base de données graphe pour les faits structurés, les relations entre entités et les chaînes de provenance. Modélise entreprise → dirigeants → autres entreprises → historique d'acquisitions → faits du dossier. Permet des requêtes multi-sauts que les bases relationnelles ne peuvent pas exprimer efficacement.",
    techSpecs: [
      "Graphe entités-relations",
      "Requêtes de provenance multi-sauts",
      "Liaison de faits inter-modules",
      "Analyse des réseaux de dirigeants"
    ],
    maReason:
      "En M&A, les faits sont connectés. Un dirigeant qui siège dans 3 conseils, chacun acquis par le même fonds de PE, est un signal d'acquéreur sériel. Un chiffre d'affaires du workshop qui contredit un compte publié est un red flag. Un graphe relie ce que les tables ne peuvent pas.",
    moduleIds: ["sourcing", "buyer", "pitch", "workshop", "datapack", "valo"]
  },
  {
    id: "openpyxl",
    label: "openpyxl",
    sublabel: "Excel engine",
    techDetail:
      "Lecture/\u00E9criture pour tous les mod\u00E8les financiers : datapacks, business plans, classeurs de valorisation, listes d\u2019acqu\u00E9reurs. Z\u00E9ro valeur en dur : chaque cellule est une formule (SUMIF, INDEX MATCH). Onglet de tra\u00E7abilit\u00E9 des sources dans chaque livrable.",
    techSpecs: [
      "Toutes les cellules sont des formules",
      "Tra\u00E7abilit\u00E9 des sources",
      "Plusieurs familles de templates",
      "Sortie d\u00E9terministe"
    ],
    maReason:
      "Les banquiers d\u2019affaires vivent dans Excel. Une valorisation livr\u00E9e en PDF est inutilisable. L\u2019analyste de l\u2019acqu\u00E9reur doit pouvoir d\u00E9monter le mod\u00E8le, modifier les hypoth\u00E8ses, faire des stress tests. Chaque cellule doit \u00EAtre une formule, chaque chiffre tra\u00E7able.",
    moduleIds: ["datapack", "bp", "valo", "buyer"]
  }
];

const pipelineStagesFR: PipelineStage[] = [
  {
    id: "sourcing",
    number: "01",
    title: "Sourcing",
    status: "live",
    oneLiner: "Scraper 10+ portails de transactions, r\u00E9soudre les entit\u00E9s, enrichir, scorer par signaux de propension \u00E0 la cession.",
    details: [
      "Cascade de r\u00E9solution d\u2019entit\u00E9s \u00E0 3 niveaux (matching flou d\u00E9terministe, puis Qwen 32B local, puis mod\u00E8le frontier via OpenRouter). Chaque niveau ne se d\u00E9clenche que si le pr\u00E9c\u00E9dent \u00E9choue.",
      "Module de d\u00E9duplication pr\u00E9-ER pour \u00E9viter de payer 3x la m\u00EAme entreprise provenant de diff\u00E9rents portails.",
      "R\u00E9solution d\u2019URL : cascade \u00E0 4 niveaux (Pappers, Google, agr\u00E9gateurs, manuel).",
      "Enrichissement LinkedIn via Playwright (signaux de recrutement C-level, indicateurs de croissance).",
      "Sourcing froid : recherche mulicrit\u00E8res sur INSEE/INPI pour trouver 5K-15K PME probablement cessibles mais non r\u00E9f\u00E9renc\u00E9es.",
      "PostgreSQL avec recherche plein texte + extension earthdistance pour les requ\u00EAtes g\u00E9ographiques."
    ],
    architectureInsight: "Module = pipeline d\u00E9terministe. Le LLM n\u2019intervient qu\u2019en fallback quand les r\u00E8gles \u00E9chouent, pas par d\u00E9faut. 70 % de la r\u00E9solution d\u2019entit\u00E9s est du pur matching de cha\u00EEnes \u00E0 co\u00FBt nul."
  },
  {
    id: "pitch",
    number: "02",
    title: "Agent Pitch",
    status: "live",
    oneLiner: "G\u00E9n\u00E9rer un pitch deck de qualit\u00E9 IB (python-pptx) pour convaincre un dirigeant de signer un mandat de cession.",
    details: [
      "Conversation-first : le banquier d\u00E9crit le dossier en langage naturel, l\u2019agent planifie et ex\u00E9cute de mani\u00E8re autonome.",
      "Appelle Agent Info Publique (recherche compl\u00E8te de donn\u00E9es publiques), Module Buyer Research (liste pr\u00E9liminaire d\u2019acqu\u00E9reurs), Module Valo (fourchette de valorisation pr\u00E9liminaire).",
      "Structure d\u2019equity story propri\u00E9taire Epoch : Gen\u00E8se & L\u00E9gitimit\u00E9, Pourquoi maintenant, Valeur cach\u00E9e, Potentiel de croissance, Univers d\u2019acqu\u00E9reurs, Contexte de valorisation, Processus & Calendrier.",
      "20 taxonomies de mise en page (12 standard + 4 premium + 4 innovation).",
      "Audit des chiffres : chaque nombre trac\u00E9 \u00E0 sa source, qualifi\u00E9 par fiabilit\u00E9 (certifi\u00E9 / d\u00E9claratif / estim\u00E9 / web_public).",
      "Circuit breaker \u00E0 3 r\u00E9visions : si la m\u00EAme section est r\u00E9vis\u00E9e 3x, escalade vers le banquier."
    ],
    architectureInsight: "Agent Info Publique tourne INTEGRALEMENT au stade du pitch, pas post-mandat. Il faut le dossier public complet pour r\u00E9diger un pitch cr\u00E9dible. Le deck 24 slides Projet Atlas a \u00E9t\u00E9 g\u00E9n\u00E9r\u00E9 en 15 minutes (relecture et it\u00E9rations ajoutent du temps banquier)."
  },
  {
    id: "mandate",
    number: "03",
    title: "Signature du mandat",
    status: "live",
    oneLiner: "Le dossier passe sous nom de code. Tous les modules utilisent deal_id + DEAL_ROOT_PATH uniquement.",
    details: [
      "L\u2019entreprise passe de son vrai nom (\u00AB Plombier Dupont \u00BB) \u00E0 un nom de code mythologique (\u00AB Projet Hephaistos \u00BB).",
      "Arborescence fichiers synchronis\u00E9e via Google Drive desktop (montage de volume Docker en dev, rclone en prod).",
      "deal_id devient l\u2019identifiant canonique \u00E0 travers tous les modules, bases de donn\u00E9es et namespaces vectoriels.",
      "Suivi des NDA et gestion de la confidentialit\u00E9 int\u00E9gr\u00E9s \u00E0 partir de cette \u00E9tape."
    ],
    architectureInsight: "C\u2019est une porte de processus, pas un module. Mais la transition de namespace (vrai nom vers nom de code, isolation deal_id) est le moment o\u00F9 le cloisonnement des donn\u00E9es devient structurel."
  },
  {
    id: "workshop",
    number: "04",
    title: "Workshop",
    status: "testing",
    oneLiner: "G\u00E9n\u00E9rer des guides d\u2019entretien structur\u00E9s pour les workshops management avec d\u00E9tection d\u2019obsolescence.",
    details: [
      "Pipeline en 8 \u00E9tapes : ingestion info publique, ingestion docs client, analyse de couverture, d\u00E9tection de contradictions, validation HITL du brief, g\u00E9n\u00E9ration de trame aliment\u00E9e par RAG, g\u00E9n\u00E9ration de livrables, boucle de r\u00E9troaction post-workshop.",
      "Deux versions de livrables : interne (notes banquier, alertes, angles strat\u00E9giques) et externe (version propre, envoy\u00E9e au management).",
      "D\u00E9tection d\u2019obsolescence : si de nouvelles informations arrivent entre le Workshop 1 et le Workshop 2, la trame s\u2019adapte automatiquement.",
      "Le Workshop N+1 ing\u00E8re la synth\u00E8se du Workshop N.",
      "D\u00E9tection de contradictions entre sources publiques et documents client."
    ],
    architectureInsight: "La trame de workshop est le moment o\u00F9 la connaissance du dossier se cristallise. Chaque module en aval (BP, Valo, IM) s\u2019appuie sur cette fondation. Si elle est bancale, tout ce qui suit est b\u00E2ti sur du sable."
  },
  {
    id: "datapack",
    number: "05",
    title: "Datapack Financier",
    status: "testing",
    oneLiner: "Ing\u00E9rer les documents financiers bruts, extraire, retraiter, produire un classeur Excel enti\u00E8rement formul\u00E9.",
    details: [
      "Ing\u00E8re les liasses fiscales PDF, grands livres Excel, fichiers FEC.",
      "Classification des documents par LLM (formulaires fiscaux 2050, 2051, 2052, 2053).",
      "Extraction PDF via Docling (IBM, licence MIT) pour les tableaux structur\u00E9s.",
      "Z\u00E9ro valeur en dur : chaque cellule du classeur de sortie est une formule (SUMIF, INDEX MATCH).",
      "Chaque retraitement signal\u00E9 pour validation HITL avec justification et r\u00E9f\u00E9rence source.",
      "Tra\u00E7abilit\u00E9 des sources : onglet d\u00E9di\u00E9 mappant chaque chiffre \u00E0 (fichier, page, cellule, date d\u2019extraction).",
      "Agent Devil\u2019s Advocate qui challenge chaque retraitement du point de vue de l\u2019acqu\u00E9reur."
    ],
    architectureInsight: "Les donn\u00E9es financi\u00E8res ne sont JAMAIS g\u00E9n\u00E9r\u00E9es par un LLM. L\u2019extraction est d\u00E9terministe. Le LLM classe les documents et signale les anomalies. Un EBITDA erron\u00E9 se propage dans la valorisation, le m\u00E9morandum, chaque \u00E9change avec les acqu\u00E9reurs."
  },
  {
    id: "bp",
    number: "06",
    title: "Business Plan",
    status: "testing",
    oneLiner: "Construire un P&L pr\u00E9visionnel sur 5 ans, bilan, flux de tr\u00E9sorerie sous forme de classeur Excel enti\u00E8rement formul\u00E9.",
    details: [
      "4 agents : Diagnostic (compr\u00E9hension du dossier aliment\u00E9e par RAG), Builder (construction Excel), Reviewer (validation d\u00E9terministe des formules), Devil\u2019s Advocate (challenge contradictoire du point de vue acqu\u00E9reur).",
      "7 moteurs de d\u00E9composition du topline : top clients + reliquat, volume x prix, bridge ARR (SaaS), analyse de cohortes, pipeline commercial, multicanal, personnalis\u00E9.",
      "Anti-hallucination \u00E0 4 niveaux : parsing structur\u00E9 (pas de RAG sur les chiffres), scoring de confiance par hypoth\u00E8se RAG, garde \u00AB non disponible \u00BB si en-dessous du seuil, agent Reviewer ind\u00E9pendant.",
      "Points de contr\u00F4le HITL entre chaque phase. Le pipeline ATTEND la validation (heures, jours). \u00C9tat persist\u00E9 en base."
    ],
    architectureInsight: "Le module BP a plus de points de contr\u00F4le que tout autre. Une projection erron\u00E9e se propage dans la valorisation, le m\u00E9morandum, les \u00E9changes acqu\u00E9reurs. Chaque hypoth\u00E8se doit \u00EAtre tra\u00E7able \u00E0 une source."
  },
  {
    id: "valo",
    number: "07",
    title: "Moteur de Valorisation",
    status: "testing",
    oneLiner: "Trois branches ind\u00E9pendantes (comparables transactionnels, comparables boursiers, analyse LBO) qui se croisent dans un football field.",
    details: [
      "Branche A (toujours active) : 400K transactions issues de MAKB + CFNews. ~15-25 % avec multiples divulgu\u00E9s. Cascade de recherche \u00E0 3 niveaux : filtres SQL stricts, SQL assoupli, recherche s\u00E9mantique avec re-ranking par cross-encoder.",
      "Branche B (conditionnelle) : donn\u00E9es de march\u00E9 en temps r\u00E9el via yfinance. D\u00E9cotes obligatoires : DLOM (20-35 %), d\u00E9cote de taille (5-30 %). Toutes les formules en Excel natif. Ignor\u00E9e si moins de 3 pairs.",
      "Branche C (conditionnelle, EBITDA >= 1M) : mod\u00E8le de LBO invers\u00E9. 2 familles de templates (885 lignes standard, 606 lignes alternatif). Tables de sensibilit\u00E9 : multiple d\u2019entr\u00E9e x multiple de sortie vers TRI.",
      "Synth\u00E8se : football field. Validation crois\u00E9e : si les comparables boursiers divergent de > 30 % des comparables transactionnels, alerte au banquier.",
      "Classeur Excel 5 onglets : Synth\u00E8se, Comparables transactionnels, Comparables boursiers, Analyse LBO, Hypoth\u00E8ses & Limites."
    ],
    architectureInsight: "Les comparables transactionnels sont l\u2019ancre. Les comparables boursiers confirment ou challengent. L\u2019analyse LBO fixe le plafond acqu\u00E9reur PE. Le banquier d\u00E9cide des pond\u00E9rations. Le syst\u00E8me propose, jamais ne conclut."
  },
  {
    id: "buyer",
    number: "08",
    title: "Matching Acqu\u00E9reurs",
    status: "testing",
    oneLiner: "Matcher la cible contre une base de 7M d\u2019acqu\u00E9reurs. Pas de Pappers. API publiques directes uniquement. Tourne en parall\u00E8le des \u00E9tapes 05-07.",
    details: [
      "Base construite SANS Pappers (INSEE direct, INPI RNE, BODACC, open data).",
      "Couches d\u2019enrichissement : SIRENE (identit\u00E9, NAF, effectifs), INPI RNE (dirigeants, \u00E2ge, chiffres, b\u00E9n\u00E9ficiaires effectifs), BODACC (historique d\u2019acquisitions, juridique), march\u00E9s publics, g\u00E9ocodage.",
      "D\u00E9tection d\u2019acqu\u00E9reurs en s\u00E9rie : analyse de graphe des dirigeants \u00E0 travers les soci\u00E9t\u00E9s + patterns d\u2019acquisition BODACC + scraping de portefeuilles PE.",
      "6 types d\u2019acqu\u00E9reurs : corporate ind\u00E9pendant, PE-backed, fonds PE, search fund, consolidateur, personne physique.",
      "Descriptions d\u2019entreprises vectoris\u00E9es dans Qdrant pour le matching s\u00E9mantique.",
      "La liste pr\u00E9liminaire d\u2019acqu\u00E9reurs est produite au stade du pitch. La liste compl\u00E8te est construite en parall\u00E8le du datapack/BP/valo, pr\u00EAte avant la mise sur le march\u00E9 du m\u00E9morandum.",
      "Chaque correction du banquier (ajout/suppression/reclassement) am\u00E9liore le matching futur."
    ],
    architectureInsight: "Construire une base de 7M d\u2019acqu\u00E9reurs \u00E0 partir d\u2019API publiques gratuites plut\u00F4t que de payer Pappers est le travail ingrat qui cr\u00E9e un vrai avantage concurrentiel. La donn\u00E9e est l\u2019actif d\u00E9fendable."
  },
  {
    id: "im",
    number: "09",
    title: "R\u00E9daction du M\u00E9morandum",
    status: "testing",
    oneLiner: "G\u00E9n\u00E9rer le m\u00E9morandum d\u2019information confidentiel \u00E0 partir de tous les livrables des modules pr\u00E9c\u00E9dents.",
    details: [
      "Consomme TOUS les modules en amont : Info Publique, synth\u00E8se Workshop, Datapack, BP, Valo.",
      "Deux modes narratifs : sell-side comp\u00E9titif (processus multi-acqu\u00E9reurs, pas de prix affich\u00E9) et pr\u00E9sentation management bilat\u00E9rale (acqu\u00E9reur identifi\u00E9 unique, valorisation compl\u00E8te incluse).",
      "Corpus de CIM : 8+ m\u00E9morandums analys\u00E9s de Lincoln, Sycomore, Bryan Garnier, Clipperton. Couverture sectorielle en expansion au-del\u00E0 de la tech/SaaS vers l\u2019industrie, le BTP, la sant\u00E9, le retail.",
      "La valorisation n\u2019appara\u00EEt JAMAIS dans un CIM sell-side comp\u00E9titif (r\u00E8gle fondamentale du M&A).",
      "Chaque chiffre exige une citation avec tag de fiabilit\u00E9."
    ],
    architectureInsight: "Le m\u00E9morandum est le point de convergence de tous les modules. C\u2019est le livrable qui part sur le march\u00E9. Chaque fait, chiffre et affirmation doit \u00EAtre tra\u00E7able \u00E0 sa source \u00E0 travers l\u2019ensemble du pipeline."
  },
  {
    id: "post-im",
    number: "10",
    title: "Pipeline Post-M\u00E9morandum",
    status: "spec",
    oneLiner: "Approche acqu\u00E9reurs, pr\u00E9sentations management, support due diligence, n\u00E9gociation, closing.",
    details: [
      "S\u00E9quen\u00E7age et suivi de l\u2019approche acqu\u00E9reurs avec distribution de la process letter.",
      "Gestion des offres indicatives : comparaison, shortlisting, recommandation du banquier.",
      "Pr\u00E9paration et planification des pr\u00E9sentations management.",
      "Coordination de la due diligence : constitution de la dataroom avec masquage automatique, routage des Q&A et r\u00E9daction de r\u00E9ponses.",
      "Gestion des offres fermes, comparaison LOI/SPA, analyse de term sheets.",
      "Email Intelligence (actif en permanence d\u00E8s le mandat) : deux agents IA surveillent Gmail, classifient, extraient les faits, r\u00E9digent des projets de r\u00E9ponse. Agent VP stateful LangGraph avec thread_id = deal_id. Aucun email n\u2019est jamais envoy\u00E9 par un agent.",
      "Ces modules bouclent la cha\u00EEne de la distribution du m\u00E9morandum jusqu\u2019au SPA sign\u00E9."
    ],
    architectureInsight: "Le pipeline post-mémorandum est là où les transactions se gagnent ou se perdent. Le timing d'approche, la qualité des Q&A et le support en négociation déterminent si le mandat se transforme en closing."
  },
  {
    id: "qa-agent",
    number: "11",
    title: "Agent Q&A",
    status: "spec",
    oneLiner: "Gestion structurée des Q&A pendant la due diligence. Même infrastructure RAG, conçue pour les questions acquéreurs.",
    details: [
      "Ingère les questions acquéreurs depuis le module dataroom ou les emails.",
      "Route chaque question vers la source pertinente : datapack, BP, synthèse workshop, ou management.",
      "Rédige les réponses avec le même pipeline RAG hybride (Qdrant + reranking + citation guard).",
      "Chaque réponse validée par le banquier avant diffusion. require_citation=True.",
      "Détecte les patterns de questions entre acquéreurs pour identifier les préoccupations.",
      "Construit une base de connaissances Q&A cumulative réutilisable entre dossiers."
    ],
    architectureInsight: "La phase Q&A est le moment où les acquéreurs testent chaque affirmation du mémorandum. Des réponses rapides, précises et sourcées maintiennent la crédibilité. La même infrastructure RAG qui a construit le mémorandum le défend maintenant."
  },
  {
    id: "anonymization",
    number: "12",
    title: "Anonymisation Dataroom",
    status: "spec",
    oneLiner: "Masquage automatique des informations sensibles dans les documents de dataroom avant l'accès acquéreur.",
    details: [
      "Scanne les documents uploadés pour les données personnelles, noms de clients, données salariés et termes commercialement sensibles.",
      "Masquage rule-based + assisté par LLM avec niveaux de sensibilité configurables.",
      "Génère des versions masquées et non masquées avec audit trail.",
      "Support des cercles de confidentialité : niveaux de masquage différents par catégorie d'acquéreur (stratégique vs. financier vs. individuel).",
      "S'intègre au pipeline de constitution de dataroom du module post-mémorandum."
    ],
    architectureInsight: "La préparation de la dataroom est l'une des tâches les plus chronophages d'un dossier. L'anonymisation automatique avec cercles configurables supprime des heures de travail manuel tout en réduisant le risque de divulgation accidentelle."
  }
];

const crossCuttingLayersFR: CrossCuttingLayer[] = [
  {
    id: "crm",
    title: "CRM Cockpit",
    description: "Interface de contr\u00F4le permanente. Chaque output d\u2019agent est mis en file dans l\u2019onglet Analyste pour validation humaine avant toute action externe. Cinq vues : Sourcing, Dossiers, Acqu\u00E9reurs, Analyste (file HITL), VP/Directeur.",
    status: "live"
  },
  {
    id: "email",
    title: "Email Intelligence",
    description: "Actif en permanence d\u00E8s la signature du mandat. Deux agents IA surveillent Gmail : Analyste (stateless par email) et VP Directeur (stateful par dossier via LangGraph). AUCUN ENVOI JAMAIS. Le banquier envoie.",
    status: "testing"
  }
];

const guardrailsFR: Guardrail[] = [
  {
    id: "no-send",
    label: "No Send Ever",
    description: "Aucun email n\u2019est jamais envoy\u00E9 par un agent. Ni maintenant, ni en V2, ni jamais. Le banquier envoie."
  },
  {
    id: "citation",
    label: "require_citation=True",
    description: "Chaque chiffre de chaque livrable doit \u00EAtre tra\u00E7able \u00E0 une source avec un tag de fiabilit\u00E9."
  },
  {
    id: "reliability",
    label: "Reliability Tagging",
    description: "certifi\u00E9 (comptes audit\u00E9s) / d\u00E9claratif (d\u00E9clar\u00E9 par le management) / estim\u00E9 (calcul\u00E9 par l\u2019agent) / web_public (scrap\u00E9 de source publique)."
  },
  {
    id: "hitl-queue",
    label: "HITL Queue",
    description: "Chaque output d\u2019agent transite par l\u2019onglet Analyste du CRM. Rien n\u2019atteint le monde ext\u00E9rieur sans validation humaine."
  },
  {
    id: "circuit-breaker",
    label: "Circuit Breakers",
    description: "Si la m\u00EAme section est r\u00E9vis\u00E9e 3x, escalade vers le banquier. Si la confiance est en-dessous du seuil, afficher \u00AB non disponible \u00BB plut\u00F4t que deviner."
  },
  {
    id: "adversarial",
    label: "Devil's Advocate",
    description: "Un agent contradictoire challenge les livrables du point de vue de l\u2019acqu\u00E9reur. Signale les probl\u00E8mes par s\u00E9v\u00E9rit\u00E9 : critique / significatif / mineur."
  }
];

const valoBranchesFR: ValoBranch[] = [
  {
    id: "transaction",
    label: "Comparables transactionnels",
    role: "L\u2019ancre",
    active: "Toujours active",
    description: "400K transactions issues de MAKB (S&P Global) + CFNews. ~15-25 % avec multiples divulgu\u00E9s, structur\u00E9s et requ\u00EAtables.",
    details: [
      "Recherche \u00E0 3 niveaux : filtres SQL stricts, SQL assoupli, recherche s\u00E9mantique via Qdrant",
      "Re-ranking par cross-encoder (bge-reranker-v2-m3)",
      "Rafra\u00EEchissement MAKB mensuel, CFNews trimestriel",
      "Mapping de 185 champs depuis MAKB, structur\u00E9s et requ\u00EAtables"
    ]
  },
  {
    id: "trading",
    label: "Comparables boursiers",
    role: "La v\u00E9rification crois\u00E9e",
    active: "Conditionnel (3+ pairs requis)",
    description: "Donn\u00E9es de march\u00E9 en temps r\u00E9el via yfinance avec d\u00E9cotes obligatoires pour illiquidit\u00E9 et taille.",
    details: [
      "Identification de pairs \u00E0 3 niveaux : recherche en base, g\u00E9n\u00E9ration LLM, validation web",
      "DLOM obligatoire : 20-35 % par mod\u00E8le \u00E9conomique (selon Stout/Finnerty)",
      "D\u00E9cote de taille : 5-30 % par tranche de chiffre d\u2019affaires",
      "Toutes les formules en Excel natif (MEDIAN, QUARTILE.INC)"
    ]
  },
  {
    id: "lbo",
    label: "Analyse LBO",
    role: "Le plafond acqu\u00E9reur PE",
    active: "Conditionnel (EBITDA >= 1M)",
    description: "LBO invers\u00E9 : quel est le prix maximum qu\u2019un fonds PE paierait pour un TRI cible de 20-25 % ?",
    details: [
      "2 familles de templates : 885 lignes standard, 606 lignes alternatif",
      "Sensibilit\u00E9 : multiple d\u2019entr\u00E9e x multiple de sortie vers TRI",
      "Hypoth\u00E8ses sectorielles issues de MEMORY_LBO.md, enrichies dossier par dossier",
      "6+ structures de transactions internalisées enrichissant les paramètres sectoriels"
    ]
  }
];

const comparisonRowsFR: ComparisonRow[] = [
  {
    property: "Isolation",
    baseline: "Aucun cloisonnement entre dossiers. Le contexte d\u2019un mandat peut ressortir dans un autre.",
    epoch: "Chaque dossier vit dans son propre silo. Aucune donn\u00E9e d\u2019un mandat ne peut remonter dans un autre."
  },
  {
    property: "M\u00E9moire",
    baseline: "M\u00E9moire de session. Aucun \u00E9tat persistant entre deux conversations.",
    epoch: "Le syst\u00E8me se souvient du dossier sur toute sa dur\u00E9e (6–9 mois). Ce qui est dit au Workshop 1 alimente le Workshop 2, le BP, le m\u00E9morandum."
  },
  {
    property: "Couche factuelle",
    baseline: "G\u00E9n\u00E8re du texte plausible. Aucune v\u00E9rification de source, aucune \u00E9chelle de fiabilit\u00E9.",
    epoch: "Chaque chiffre est tagu\u00E9 par niveau de fiabilit\u00E9 (audit\u00E9 / d\u00E9clar\u00E9 management / estim\u00E9 / public) et remonte \u00E0 son document source. Le syst\u00E8me pr\u00E9f\u00E8re r\u00E9pondre \u00AB non disponible \u00BB plut\u00F4t qu\u2019inventer."
  },
  {
    property: "Orchestration",
    baseline: "Un prompt, un output. Aucune coordination entre \u00E9tapes.",
    epoch: "14 modules cha\u00EEn\u00E9s. La sortie de l\u2019un alimente le suivant, avec une validation banquier obligatoire entre chaque \u00E9tape."
  },
  {
    property: "Garde-fous",
    baseline: "Repose sur la formulation du prompt. Aucune protection structurelle.",
    epoch: "Quatre couches anti-hallucination : extraction structur\u00E9e des chiffres, seuils de confiance, agent contradictoire (Devil\u2019s Advocate), escalade automatique apr\u00E8s 3 r\u00E9visions."
  },
  {
    property: "Apprentissage",
    baseline: "Repart de zéro à chaque nouveau dossier. Aucune mémoire d'une correction à l'autre.",
    epoch: "Chaque correction du banquier est capitalisée : le 20ᵉ dossier est matériellement meilleur que le 1er."
  },
  {
    property: "Structure de coûts",
    baseline: "Chaque appel à un modèle frontier est facturé. Le volume fait exploser la facture.",
    epoch: "Les tâches de masse (résolution d'entités, classification documentaire) tournent sur un LLM local. Les modèles payants sont réservés aux tâches où la qualité de raisonnement le justifie."
  },
  {
    property: "Audit trail",
    baseline: "Aucune traçabilité. Impossible de savoir quel modèle a produit quoi, quand.",
    epoch: "Chaque appel modèle est loggé : qui a produit quoi, quand, à quel coût. Chaque chiffre du livrable est traçable jusqu'à la cellule du document source."
  }
];

const showcaseSlidesFR: ShowcaseSlide[] = [
  { id: "cover",  label: "Slide 01", title: "Couverture" },
  { id: "comps",  label: "Slide 15", title: "Comparables transactionnels" },
  { id: "valo",   label: "Slide 16", title: "Fourchette de valorisation" },
  { id: "buyers", label: "Slide 20", title: "Short-list acqu\u00E9reurs" }
];

// ── Content bundles ────────────────────────────────────────────

export type SiteContent = {
  navSections: NavSection[];
  heroMetrics: HeroMetric[];
  infraNodes: InfraNode[];
  pipelineStages: PipelineStage[];
  crossCuttingLayers: CrossCuttingLayer[];
  guardrails: Guardrail[];
  valoBranches: ValoBranch[];
  comparisonRows: ComparisonRow[];
  showcaseSlides: ShowcaseSlide[];
  thesis: ThesisContent;
};

const contentEN: SiteContent = {
  navSections: navSectionsEN,
  heroMetrics: heroMetricsEN,
  infraNodes: infraNodesEN,
  pipelineStages: pipelineStagesEN,
  crossCuttingLayers: crossCuttingLayersEN,
  guardrails: guardrailsEN,
  valoBranches: valoBranchesEN,
  comparisonRows: comparisonRowsEN,
  showcaseSlides: showcaseSlidesEN,
  thesis: thesisEN,
};

const contentFR: SiteContent = {
  navSections: navSectionsFR,
  heroMetrics: heroMetricsFR,
  infraNodes: infraNodesFR,
  pipelineStages: pipelineStagesFR,
  crossCuttingLayers: crossCuttingLayersFR,
  guardrails: guardrailsFR,
  valoBranches: valoBranchesFR,
  comparisonRows: comparisonRowsFR,
  showcaseSlides: showcaseSlidesFR,
  thesis: thesisFR,
};

export function getContent(lang: "en" | "fr"): SiteContent {
  return lang === "fr" ? contentFR : contentEN;
}
