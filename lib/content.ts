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
      heading: "The economics don’t work",
      body: "A sell-side mandate on a 2M€ deal generates a success fee of 80-150K€. A proper IB team (MD, Director, VP, Associate, Analyst) costs 40-60K€/month fully loaded. The math is brutal: you cannot staff a real team on a deal that takes 6-9 months and pays less than two months of payroll."
    },
    {
      number: "02",
      heading: "So the market adapts poorly",
      body: "Either boutiques cut corners (no real valuation, no structured buyer search, no CIM, just a phone call and a handshake), or the deal gets no advisory at all. 400,000 French SMEs need to change hands by 2030. Most will do it without IB-grade support because nobody can afford to give it to them."
    },
    {
      number: "03",
      heading: "AI changes the cost equation",
      body: "The thesis is not \"AI replaces the banker.\" It is: purpose-built agents can replace the junior team (Analyst + Associate + VP execution work), making IB-grade deliverables profitable at 500K-10M€ EV. The MD still runs the relationship. The system does the production."
    },
    {
      number: "04",
      heading: "Infrastructure follows from the constraint",
      body: "If you need IB-grade output with no junior team, every module must be auditable, every figure traceable, every output validated by a senior banker. That is why Epoch is not a chatbot with a database. It is a deal operating system with isolation, memory, a facts layer, and human control gates at every stage."
    }
  ]
};

const thesisFR: ThesisContent = {
  tag: "Le problème",
  title: "400 000 PME françaises doivent changer de mains d’ici 2030. La moitié le fera sans conseil de qualité.",
  cards: [
    {
      number: "01",
      heading: "L’équation économique ne fonctionne pas",
      body: "Un mandat de cession sur une transaction de 2M€ génère 80–150K€ d’honoraires de succès. Une équipe IB complète (MD, Directeur, VP, Associé, Analyste) coûte 40-60K€/mois charges comprises. Le compte n’y est pas : impossible de mobiliser une vraie équipe sur 6-9 mois quand les honoraires couvrent à peine deux mois de masse salariale."
    },
    {
      number: "02",
      heading: "Le marché s’adapte mal",
      body: "Soit les boutiques rognent sur la qualité (pas de vraie valorisation, pas de recherche structurée d’acquéreurs, pas de mémorandum d’information confidentiel, un gré-à-gré non concurrentiel), soit le dossier ne bénéficie d’aucun conseil. 400 000 PME françaises doivent changer de mains d’ici 2030 ; la plupart le feront sans accompagnement de qualité IB, faute de modèle économique viable."
    },
    {
      number: "03",
      heading: "L’IA change l’équation des coûts",
      body: "La thèse n’est pas « l’IA remplace le banquier ». Elle est : des agents spécialisés peuvent remplacer l’équipe junior (Analyste + Associé + VP en exécution), rendant des livrables de qualité IB rentables sur des valorisations de 500K-10M€. Le MD conserve la relation client. Le système assure la production."
    },
    {
      number: "04",
      heading: "L’infrastructure découle de la contrainte",
      body: "Si l’on veut un livrable de qualité IB sans équipe junior, chaque module doit être auditable, chaque chiffre traçable, chaque livrable validé par un banquier senior. Ce n’est donc pas un chatbot avec une base de données : c’est une infrastructure de process — isolation par dossier, mémoire persistante, traçabilité de chaque chiffre, validation banquier à chaque étape."
    }
  ]
};

// ── French data ────────────────────────────────────────────────

const navSectionsFR: NavSection[] = [
  { id: "thesis",          label: "Thèse" },
  { id: "architecture",    label: "Architecture" },
  { id: "pipeline",        label: "Pipeline" },
  { id: "hitl",            label: "HITL" },
  { id: "valuation",       label: "Valorisation" },
  { id: "deliverable",     label: "Livrable" },
  { id: "differentiation", label: "Pourquoi" },
  { id: "limits",          label: "Limites" },
  { id: "team",            label: "Équipe" },
  { id: "contact",         label: "Contact" }
];

const heroMetricsFR: HeroMetric[] = [
  { value: 500, suffix: "K",  label: "Entreprises françaises scorées : le dirigeant est-il prêt à céder ?" },
  { value: 7,   suffix: "M",  label: "Acquéreurs indexés (base construite grâce à l'open data française)" },
  { value: 400, suffix: "K",  label: "Transactions dans notre base de comparables" },
  { value: 14,  suffix: "",   label: "Modules métier interconnectés" }
];

const infraNodesFR: InfraNode[] = [
  {
    id: "postgresql",
    label: "PostgreSQL 16",
    sublabel: "Relational DB",
    techDetail:
      "Conteneur indépendant. Stocke toutes les données structurées de transactions, les files HITL, les boucles de rétroaction, le bus de messages inter-agents et les logs système. Recherche plein texte + extension earthdistance pour les requêtes géographiques de matching acquéreurs.",
    techSpecs: [
      "Conteneur Docker indépendant",
      "Recherche plein texte + earthdistance",
      "Files HITL + logs de rétroaction",
      "Bus de messages agents (communication inter-agents)"
    ],
    maReason:
      "Chaque correction d’un banquier doit être persistée, catégorisée et réinjectée dans le système. Le dossier 20 n’est meilleur que le dossier 1 que si les corrections se capitalisent. Cela exige une vraie base de données, pas un historique de conversation.",
    moduleIds: ["sourcing", "pitch", "datapack", "bp", "valo", "buyer", "im", "post-im"]
  },
  {
    id: "qdrant",
    label: "Qdrant",
    sublabel: "Vector database",
    techDetail:
      "Isolation stricte par namespace et par dossier : deal_{id}_{type}. Recherche hybride combinant embeddings denses (bge-m3 1024d) + vecteurs creux BM25 + Reciprocal Rank Fusion. Re-ranking par cross-encoder (bge-reranker-v2-m3) sur toutes les requêtes.",
    techSpecs: [
      "Namespace : deal_{id}_{type}",
      "Dense : embeddings bge-m3 1024d",
      "Creux : BM25 + fusion RRF",
      "Reranker : bge-reranker-v2-m3"
    ],
    maReason:
      "Qdrant porte toute la recherche documentaire interne (RAG hybride dense + BM25 + re-ranking) : c'est l'infrastructure qui permet au système de citer chaque chiffre à sa source au lieu de l'inventer. Deux propriétés rendent cela opérable en M&A : isolation stricte par dossier (zéro fuite entre mandats, obligation juridique) et recherche qui ne manque pas les chiffres exacts — contrairement à un embedding seul, qui confond \"EBITDA 1,24 M€\" et \"EBITDA 1,42 M€\".",
    moduleIds: ["sourcing", "pitch", "workshop", "datapack", "bp", "valo", "buyer", "im"]
  },
  {
    id: "vllm",
    label: "vLLM + Qwen 32B",
    sublabel: "Local LLM on RTX 4090",
    techDetail:
      "Modèle Qwen 2.5 32B-AWQ quantifié sur serveur d’inférence vLLM. Gère les tâches batch : résolution d’entités, classification de documents, enrichissement. ~18 Go VRAM sur RTX 4090. Coût marginal API nul.",
    techSpecs: [
      "Qwen 2.5 32B-AWQ (4-bit)",
      "Serveur d’inférence vLLM",
      "RTX 4090 (~18 Go VRAM)",
      "Coût marginal nul après le GPU"
    ],
    maReason:
      "Résoudre 500K entités entreprises coûte zéro euro en GPU local contre des milliers via API. Quand on traite ce volume quotidiennement, la structure de coûts est une décision d’architecture, pas d’optimisation.",
    moduleIds: ["sourcing", "buyer"]
  },
  {
    id: "openrouter",
    label: "OpenRouter",
    sublabel: "LLM gateway",
    techDetail:
      "Passerelle API unifiée pour tous les appels à des modèles frontier. Client Python unique (infra/llm_client.py). Routage par tâche : Claude pour le raisonnement, GPT pour la sortie structurée, Kimi 2.5 pour le crawling web. Aucun import direct de SDK dans les modules métier.",
    techSpecs: [
      "Point d’entrée unique : infra/llm_client.py",
      "Routage de modèle par type de tâche",
      "DEC-002 : pas d’import SDK direct",
      "Kimi 2.5 pour l’extraction web"
    ],
    maReason:
      "Les modèles s’améliorent chaque mois. Être verrouillé sur un fournisseur signifie prendre du retard en qualité. Une passerelle permet de passer de Claude à GPT à Gemini par simple changement de configuration, pas par refactoring du code.",
    moduleIds: ["pitch", "workshop", "datapack", "bp", "valo", "im", "buyer"]
  },
  {
    id: "docling",
    label: "Docling",
    sublabel: "Document processing",
    techDetail:
      "Processeur de documents open-source IBM (licence MIT). Extraction structurée de tableaux PDF pour les documents financiers (liasses fiscales, grand livre, FEC). Convertit en données structurées avant tout passage par un LLM.",
    techSpecs: [
      "IBM, licence MIT",
      "Extraction structurée de tableaux PDF",
      "Classification de documents financiers",
      "Structuration des données en amont du LLM"
    ],
    maReason:
      "Les données financières ne sont jamais générées par un LLM. L’extraction est déterministe. Le LLM ne fait que classer les documents et signaler les anomalies. On ne peut pas risquer un EBITDA halluciné dans une valorisation.",
    moduleIds: ["datapack", "bp"]
  },
  {
    id: "langgraph",
    label: "LangGraph",
    sublabel: "Stateful orchestration",
    techDetail:
      "Utilisé UNIQUEMENT pour l’agent VP Email Intelligence, où la mémoire stateful sur plusieurs semaines de communication est essentielle. thread_id = deal_id. Persistance des checkpoints dans PostgreSQL. Tous les autres modules utilisent des pipelines Python séquentiels explicites.",
    techSpecs: [
      "Agent VP Email uniquement",
      "thread_id = deal_id",
      "Checkpointing PostgreSQL",
      "Pas de CrewAI, pas d’AutoGen"
    ],
    maReason:
      "L’agent VP doit se souvenir qu’Argos a demandé l’exclusivité le 3 mars quand ils relancent le 20 mars. Cela exige une vraie gestion d’état, pas de la mémoire de session. Mais l’utiliser partout ajouterait de la complexité là où des pipelines simples suffisent.",
    moduleIds: ["post-im"]
  },
  {
    id: "fastapi",
    label: "FastAPI + HTMX",
    sublabel: "CRM Cockpit",
    techDetail:
      "Interface cockpit rendue côté serveur. Backend FastAPI + HTMX pour l’interactivité + templates Jinja2. Pas de React, pas de framework SPA. Cinq onglets : Sourcing, Dossiers, Acquéreurs, Analyste (file HITL), Vue VP/Directeur. Fonctionne en couche transversale sur toutes les étapes du dossier.",
    techSpecs: [
      "Rendu côté serveur",
      "Mises à jour partielles HTMX",
      "Templates Jinja2",
      "Transversal : couche HITL permanente"
    ],
    maReason:
      "Le cockpit EST la couche de contrôle. Aucun output d’agent n’atteint l’extérieur sans passer par la file HITL. La rapidité et la simplicité pour une équipe de deux l’emportent sur la complexité de React.",
    moduleIds: ["sourcing", "pitch", "workshop", "datapack", "bp", "valo", "buyer", "im", "post-im"]
  },
  {
    id: "playwright",
    label: "Playwright",
    sublabel: "Web scraping",
    techDetail:
      "Automatisation de navigateur en mode furtif pour le scraping de portails de transactions (BPI, Fusacq, CessionPME, Michel Simond) et l’enrichissement LinkedIn (signaux de recrutement C-level, indicateurs de croissance).",
    techSpecs: [
      "Automatisation en mode furtif",
      "10+ portails de transactions scrapés",
      "Extraction de signaux LinkedIn",
      "Rendu navigateur headless"
    ],
    maReason:
      "Les portails de transactions sont la matière première du sourcing. Scraper 10+ portails quotidiennement et résoudre les entités contre SIRENE donne à Epoch un pipeline continuellement mis à jour qu’aucun processus manuel ne peut égaler.",
    moduleIds: ["sourcing", "pitch"]
  },
  {
    id: "pptx",
    label: "HTML + Playwright",
    sublabel: "Moteur de rendu pitch (HTML → PDF)",
    techDetail:
      "Chaque pitch est un site HTML rendu par un template Jinja, convertit en PDF par Playwright (fidelité print 1:1). Pas de python-pptx dans la chaîne v2 : HTML donne un contrôle typographique total, un design auditable en CSS et des audits de chiffres par data-attribute.",
    techSpecs: [
      "Templates Jinja2 HTML par layout",
      "Export PDF via Playwright headless",
      "Audit des chiffres par data-attribute",
      "Design system CSS vars"
    ],
    maReason:
      "Les pitch decks sont la monnaie du M&A. Générer le deck en HTML plutôt qu'en .pptx natif donne trois choses qu'un banquier reconnaît : typographie de qualité print, audit machine-lisible de chaque chiffre et déploiement instantané de la charte graphique sur tout un portefeuille de dossiers.",
    moduleIds: ["pitch"]
  },
  {
    id: "langfuse",
    label: "Langfuse",
    sublabel: "LLM observability",
    techDetail:
      "Monitoring spécifique LLM : versioning des prompts, suivi des coûts par token, mesure de latence, scoring qualité. Chaque appel LLM sur l'ensemble des modules est tracé, chiffré et auditable.",
    techSpecs: [
      "Contrôle de version des prompts",
      "Suivi des coûts par appel",
      "Monitoring de latence",
      "Scoring qualité"
    ],
    maReason:
      "Quand 14 modules font des milliers d'appels LLM par dossier, il faut savoir quels appels coûtent de l'argent, lesquels sont lents, et lesquels produisent de mauvais résultats. Sans observabilité, on pilote à l'aveugle le poste de coût le plus variable du système.",
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
      "Lecture/écriture pour tous les modèles financiers : datapacks, business plans, classeurs de valorisation, listes d’acquéreurs. Zéro valeur en dur : chaque cellule est une formule (SUMIF, INDEX MATCH). Onglet de traçabilité des sources dans chaque livrable.",
    techSpecs: [
      "Toutes les cellules sont des formules",
      "Traçabilité des sources",
      "Plusieurs familles de templates",
      "Sortie déterministe"
    ],
    maReason:
      "Les banquiers d’affaires vivent dans Excel. Une valorisation livrée en PDF est inutilisable. L’analyste de l’acquéreur doit pouvoir démonter le modèle, modifier les hypothèses, faire des stress tests. Chaque cellule doit être une formule, chaque chiffre traçable.",
    moduleIds: ["datapack", "bp", "valo", "buyer"]
  }
];

const pipelineStagesFR: PipelineStage[] = [
  {
    id: "sourcing",
    number: "01",
    title: "Sourcing",
    status: "live",
    oneLiner: "Scraper 10+ portails de transactions, résoudre les entités, enrichir, scorer par signaux de propension à la cession.",
    details: [
      "Cascade de résolution d’entités à 3 niveaux (matching flou déterministe, puis Qwen 32B local, puis modèle frontier via OpenRouter). Chaque niveau ne se déclenche que si le précédent échoue.",
      "Module de déduplication pré-ER pour éviter de payer 3x la même entreprise provenant de différents portails.",
      "Résolution d’URL : cascade à 4 niveaux (Pappers, Google, agrégateurs, manuel).",
      "Enrichissement LinkedIn via Playwright (signaux de recrutement C-level, indicateurs de croissance).",
      "Sourcing froid : recherche mulicritères sur INSEE/INPI pour trouver 5K-15K PME probablement cessibles mais non référencées.",
      "PostgreSQL avec recherche plein texte + extension earthdistance pour les requêtes géographiques."
    ],
    architectureInsight: "Module = pipeline déterministe. Le LLM n’intervient qu’en fallback quand les règles échouent, pas par défaut. 70 % de la résolution d’entités est du pur matching de chaînes à coût nul."
  },
  {
    id: "pitch",
    number: "02",
    title: "Agent Pitch",
    status: "live",
    oneLiner: "Générer un pitch deck de qualité IB (python-pptx) pour convaincre un dirigeant de signer un mandat de cession.",
    details: [
      "Conversation-first : le banquier décrit le dossier en langage naturel, l’agent planifie et exécute de manière autonome.",
      "Appelle Agent Info Publique (recherche complète de données publiques), Module Buyer Research (liste préliminaire d’acquéreurs), Module Valo (fourchette de valorisation préliminaire).",
      "Structure d’equity story propriétaire Epoch : Genèse & Légitimité, Pourquoi maintenant, Valeur cachée, Potentiel de croissance, Univers d’acquéreurs, Contexte de valorisation, Processus & Calendrier.",
      "20 taxonomies de mise en page (12 standard + 4 premium + 4 innovation).",
      "Audit des chiffres : chaque nombre tracé à sa source, qualifié par fiabilité (certifié / déclaratif / estimé / web_public).",
      "Circuit breaker à 3 révisions : si la même section est révisée 3x, escalade vers le banquier."
    ],
    architectureInsight: "Agent Info Publique tourne INTEGRALEMENT au stade du pitch, pas post-mandat. Il faut le dossier public complet pour rédiger un pitch crédible. Le deck 24 slides Projet Atlas a été généré en 15 minutes (relecture et itérations ajoutent du temps banquier)."
  },
  {
    id: "mandate",
    number: "03",
    title: "Signature du mandat",
    status: "live",
    oneLiner: "Le dossier passe sous nom de code. Tous les modules utilisent deal_id + DEAL_ROOT_PATH uniquement.",
    details: [
      "L’entreprise passe de son vrai nom (« Plombier Dupont ») à un nom de code mythologique (« Projet Hephaistos »).",
      "Arborescence fichiers synchronisée via Google Drive desktop (montage de volume Docker en dev, rclone en prod).",
      "deal_id devient l’identifiant canonique à travers tous les modules, bases de données et namespaces vectoriels.",
      "Suivi des NDA et gestion de la confidentialité intégrés à partir de cette étape."
    ],
    architectureInsight: "C’est une porte de processus, pas un module. Mais la transition de namespace (vrai nom vers nom de code, isolation deal_id) est le moment où le cloisonnement des données devient structurel."
  },
  {
    id: "workshop",
    number: "04",
    title: "Workshop",
    status: "testing",
    oneLiner: "Générer des guides d’entretien structurés pour les workshops management avec détection d’obsolescence.",
    details: [
      "Pipeline en 8 étapes : ingestion info publique, ingestion docs client, analyse de couverture, détection de contradictions, validation HITL du brief, génération de trame alimentée par RAG, génération de livrables, boucle de rétroaction post-workshop.",
      "Deux versions de livrables : interne (notes banquier, alertes, angles stratégiques) et externe (version propre, envoyée au management).",
      "Détection d’obsolescence : si de nouvelles informations arrivent entre le Workshop 1 et le Workshop 2, la trame s’adapte automatiquement.",
      "Le Workshop N+1 ingère la synthèse du Workshop N.",
      "Détection de contradictions entre sources publiques et documents client."
    ],
    architectureInsight: "La trame de workshop est le moment où la connaissance du dossier se cristallise. Chaque module en aval (BP, Valo, IM) s’appuie sur cette fondation. Si elle est bancale, tout ce qui suit est bâti sur du sable."
  },
  {
    id: "datapack",
    number: "05",
    title: "Datapack Financier",
    status: "testing",
    oneLiner: "Ingérer les documents financiers bruts, extraire, retraiter, produire un classeur Excel entièrement formulé.",
    details: [
      "Ingère les liasses fiscales PDF, grands livres Excel, fichiers FEC.",
      "Classification des documents par LLM (formulaires fiscaux 2050, 2051, 2052, 2053).",
      "Extraction PDF via Docling (IBM, licence MIT) pour les tableaux structurés.",
      "Zéro valeur en dur : chaque cellule du classeur de sortie est une formule (SUMIF, INDEX MATCH).",
      "Chaque retraitement signalé pour validation HITL avec justification et référence source.",
      "Traçabilité des sources : onglet dédié mappant chaque chiffre à (fichier, page, cellule, date d’extraction).",
      "Agent Devil’s Advocate qui challenge chaque retraitement du point de vue de l’acquéreur."
    ],
    architectureInsight: "Les données financières ne sont JAMAIS générées par un LLM. L’extraction est déterministe. Le LLM classe les documents et signale les anomalies. Un EBITDA erroné se propage dans la valorisation, le mémorandum, chaque échange avec les acquéreurs."
  },
  {
    id: "bp",
    number: "06",
    title: "Business Plan",
    status: "testing",
    oneLiner: "Construire un P&L prévisionnel sur 5 ans, bilan, flux de trésorerie sous forme de classeur Excel entièrement formulé.",
    details: [
      "4 agents : Diagnostic (compréhension du dossier alimentée par RAG), Builder (construction Excel), Reviewer (validation déterministe des formules), Devil’s Advocate (challenge contradictoire du point de vue acquéreur).",
      "7 moteurs de décomposition du topline : top clients + reliquat, volume x prix, bridge ARR (SaaS), analyse de cohortes, pipeline commercial, multicanal, personnalisé.",
      "Anti-hallucination à 4 niveaux : parsing structuré (pas de RAG sur les chiffres), scoring de confiance par hypothèse RAG, garde « non disponible » si en-dessous du seuil, agent Reviewer indépendant.",
      "Points de contrôle HITL entre chaque phase. Le pipeline ATTEND la validation (heures, jours). État persisté en base."
    ],
    architectureInsight: "Le module BP a plus de points de contrôle que tout autre. Une projection erronée se propage dans la valorisation, le mémorandum, les échanges acquéreurs. Chaque hypothèse doit être traçable à une source."
  },
  {
    id: "valo",
    number: "07",
    title: "Moteur de Valorisation",
    status: "testing",
    oneLiner: "Trois branches indépendantes (comparables transactionnels, comparables boursiers, analyse LBO) qui se croisent dans un football field.",
    details: [
      "Branche A (toujours active) : 400K transactions issues de MAKB + CFNews. ~15-25 % avec multiples divulgués. Cascade de recherche à 3 niveaux : filtres SQL stricts, SQL assoupli, recherche sémantique avec re-ranking par cross-encoder.",
      "Branche B (conditionnelle) : données de marché en temps réel via yfinance. Décotes obligatoires : DLOM (20-35 %), décote de taille (5-30 %). Toutes les formules en Excel natif. Ignorée si moins de 3 pairs.",
      "Branche C (conditionnelle, EBITDA >= 1M) : modèle de LBO inversé. 2 familles de templates (885 lignes standard, 606 lignes alternatif). Tables de sensibilité : multiple d’entrée x multiple de sortie vers TRI.",
      "Synthèse : football field. Validation croisée : si les comparables boursiers divergent de > 30 % des comparables transactionnels, alerte au banquier.",
      "Classeur Excel 5 onglets : Synthèse, Comparables transactionnels, Comparables boursiers, Analyse LBO, Hypothèses & Limites."
    ],
    architectureInsight: "Les comparables transactionnels sont l’ancre. Les comparables boursiers confirment ou challengent. L’analyse LBO fixe le plafond acquéreur PE. Le banquier arbitre les pondérations. Le système ne conclut pas à sa place."
  },
  {
    id: "buyer",
    number: "08",
    title: "Matching Acquéreurs",
    status: "testing",
    oneLiner: "Matcher la cible contre une base de 7M d’acquéreurs. Pas de Pappers. API publiques directes uniquement. Tourne en parallèle des étapes 05-07.",
    details: [
      "Base construite SANS Pappers (INSEE direct, INPI RNE, BODACC, open data).",
      "Couches d’enrichissement : SIRENE (identité, NAF, effectifs), INPI RNE (dirigeants, âge, chiffres, bénéficiaires effectifs), BODACC (historique d’acquisitions, juridique), marchés publics, géocodage.",
      "Détection d’acquéreurs en série : analyse de graphe des dirigeants à travers les sociétés + patterns d’acquisition BODACC + scraping de portefeuilles PE.",
      "6 types d’acquéreurs : corporate indépendant, PE-backed, fonds PE, search fund, consolidateur, personne physique.",
      "Descriptions d’entreprises vectorisées dans Qdrant pour le matching sémantique.",
      "La liste préliminaire d’acquéreurs est produite au stade du pitch. La liste complète est construite en parallèle du datapack/BP/valo, prête avant la mise sur le marché du mémorandum.",
      "Chaque correction du banquier (ajout/suppression/reclassement) améliore le matching futur."
    ],
    architectureInsight: "Construire une base de 7M d’acquéreurs à partir d’API publiques gratuites plutôt que de payer Pappers est le travail ingrat qui crée un vrai avantage concurrentiel. La donnée est l’actif défendable."
  },
  {
    id: "im",
    number: "09",
    title: "Rédaction du Mémorandum",
    status: "testing",
    oneLiner: "Générer le mémorandum d’information confidentiel à partir de tous les livrables des modules précédents.",
    details: [
      "Consomme TOUS les modules en amont : Info Publique, synthèse Workshop, Datapack, BP, Valo.",
      "Deux modes narratifs : sell-side compétitif (processus multi-acquéreurs, pas de prix affiché) et présentation management bilatérale (acquéreur identifié unique, valorisation complète incluse).",
      "Corpus de CIM : 8+ mémorandums analysés de Lincoln, Sycomore, Bryan Garnier, Clipperton. Couverture sectorielle en expansion au-delà de la tech/SaaS vers l’industrie, le BTP, la santé, le retail.",
      "La valorisation n’apparaît JAMAIS dans un CIM sell-side compétitif (règle fondamentale du M&A).",
      "Chaque chiffre exige une citation avec tag de fiabilité."
    ],
    architectureInsight: "Le mémorandum est le point de convergence de tous les modules. C’est le livrable qui part sur le marché. Chaque fait, chiffre et affirmation doit être traçable à sa source à travers l’ensemble du pipeline."
  },
  {
    id: "post-im",
    number: "10",
    title: "Pipeline Post-Mémorandum",
    status: "spec",
    oneLiner: "Approche acquéreurs, présentations management, support due diligence, négociation, closing.",
    details: [
      "Séquençage et suivi de l’approche acquéreurs avec distribution de la process letter.",
      "Gestion des offres indicatives : comparaison, shortlisting, recommandation du banquier.",
      "Préparation et planification des présentations management.",
      "Coordination de la due diligence : constitution de la dataroom avec masquage automatique, routage des Q&A et rédaction de réponses.",
      "Gestion des offres fermes, comparaison LOI/SPA, analyse de term sheets.",
      "Email Intelligence (actif en permanence dès le mandat) : deux agents IA surveillent Gmail, classifient, extraient les faits, rédigent des projets de réponse. Agent VP stateful LangGraph avec thread_id = deal_id. Aucun email n’est jamais envoyé par un agent.",
      "Ces modules bouclent la chaîne de la distribution du mémorandum jusqu’au SPA signé."
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
    description: "Interface de contrôle permanente. Chaque output d’agent est mis en file dans l’onglet Analyste pour validation humaine avant toute action externe. Cinq vues : Sourcing, Dossiers, Acquéreurs, Analyste (file HITL), VP/Directeur.",
    status: "live"
  },
  {
    id: "email",
    title: "Email Intelligence",
    description: "Actif en permanence dès la signature du mandat. Deux agents IA surveillent Gmail : Analyste (stateless par email) et VP Directeur (stateful par dossier via LangGraph). AUCUN ENVOI JAMAIS. Le banquier envoie.",
    status: "testing"
  }
];

const guardrailsFR: Guardrail[] = [
  {
    id: "no-send",
    label: "No Send Ever",
    description: "Aucun email n’est jamais envoyé par un agent. Ni maintenant, ni en V2, ni jamais. Le banquier envoie."
  },
  {
    id: "citation",
    label: "require_citation=True",
    description: "Chaque chiffre de chaque livrable doit être traçable à une source avec un tag de fiabilité."
  },
  {
    id: "reliability",
    label: "Reliability Tagging",
    description: "certifié (comptes audités) / déclaratif (déclaré par le management) / estimé (calculé par l’agent) / web_public (scrapé de source publique)."
  },
  {
    id: "hitl-queue",
    label: "HITL Queue",
    description: "Chaque output d’agent transite par l’onglet Analyste du CRM. Rien n’atteint le monde extérieur sans validation humaine."
  },
  {
    id: "circuit-breaker",
    label: "Circuit Breakers",
    description: "Si la même section est révisée 3x, escalade vers le banquier. Si la confiance est en-dessous du seuil, afficher « non disponible » plutôt que deviner."
  },
  {
    id: "adversarial",
    label: "Devil's Advocate",
    description: "Un agent contradictoire challenge les livrables du point de vue de l’acquéreur. Signale les problèmes par sévérité : critique / significatif / mineur."
  }
];

const valoBranchesFR: ValoBranch[] = [
  {
    id: "transaction",
    label: "Comparables transactionnels",
    role: "L’ancre",
    active: "Toujours active",
    description: "400K transactions issues de MAKB (S&P Global) + CFNews. ~15-25 % avec multiples divulgués, structurés et requêtables.",
    details: [
      "Recherche à 3 niveaux : filtres SQL stricts, SQL assoupli, recherche sémantique via Qdrant",
      "Re-ranking par cross-encoder (bge-reranker-v2-m3)",
      "Rafraîchissement MAKB mensuel, CFNews trimestriel",
      "Mapping de 185 champs depuis MAKB, structurés et requêtables"
    ]
  },
  {
    id: "trading",
    label: "Comparables boursiers",
    role: "La vérification croisée",
    active: "Conditionnel (3+ pairs requis)",
    description: "Données de marché en temps réel via yfinance avec décotes obligatoires pour illiquidité et taille.",
    details: [
      "Identification de pairs à 3 niveaux : recherche en base, génération LLM, validation web",
      "DLOM obligatoire : 20-35 % par modèle économique (selon Stout/Finnerty)",
      "Décote de taille : 5-30 % par tranche de chiffre d’affaires",
      "Toutes les formules en Excel natif (MEDIAN, QUARTILE.INC)"
    ]
  },
  {
    id: "lbo",
    label: "Analyse LBO",
    role: "Le plafond acquéreur PE",
    active: "Conditionnel (EBITDA >= 1M)",
    description: "LBO inversé : quel est le prix maximum qu’un fonds PE paierait pour un TRI cible de 20-25 % ?",
    details: [
      "2 familles de templates : 885 lignes standard, 606 lignes alternatif",
      "Sensibilité : multiple d’entrée x multiple de sortie vers TRI",
      "Hypothèses sectorielles issues de MEMORY_LBO.md, enrichies dossier par dossier",
      "6+ structures de transactions internalisées enrichissant les paramètres sectoriels"
    ]
  }
];

const comparisonRowsFR: ComparisonRow[] = [
  {
    property: "Isolation",
    baseline: "Aucun cloisonnement entre dossiers. Le contexte d’un mandat peut ressortir dans un autre.",
    epoch: "Chaque dossier vit dans son propre silo. Aucune donnée d’un mandat ne peut remonter dans un autre."
  },
  {
    property: "Mémoire",
    baseline: "Mémoire de session. Aucun état persistant entre deux conversations.",
    epoch: "Le système se souvient du dossier sur toute sa durée (6–9 mois). Ce qui est dit au Workshop 1 alimente le Workshop 2, le BP, le mémorandum."
  },
  {
    property: "Couche factuelle",
    baseline: "Génère du texte plausible. Aucune vérification de source, aucune échelle de fiabilité.",
    epoch: "Chaque chiffre est tagué par niveau de fiabilité (audité / déclaré management / estimé / public) et remonte à son document source. Le système préfère répondre « non disponible » plutôt qu’inventer."
  },
  {
    property: "Orchestration",
    baseline: "Un prompt, un output. Aucune coordination entre étapes.",
    epoch: "14 modules chaînés. La sortie de l’un alimente le suivant, avec une validation banquier obligatoire entre chaque étape."
  },
  {
    property: "Garde-fous",
    baseline: "Repose sur la formulation du prompt. Aucune protection structurelle.",
    epoch: "Quatre couches anti-hallucination : extraction structurée des chiffres, seuils de confiance, agent contradictoire (Devil’s Advocate), escalade automatique après 3 révisions."
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
  { id: "buyers", label: "Slide 20", title: "Short-list acquéreurs" }
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
