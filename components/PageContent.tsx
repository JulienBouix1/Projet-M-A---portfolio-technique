"use client";

import { useLangStore } from "@/store/lang-store";
import { useAudienceStore, type Audience } from "@/store/audience-store";
import { getContent } from "@/lib/content";
import type { ThesisContent } from "@/lib/content";

import Link from "next/link";

import AnimatedCounter from "@/components/AnimatedCounter";
import { ArchitectureExplorer } from "@/components/ArchitectureExplorer";
import ComparisonTable from "@/components/ComparisonTable";
import DealPipeline from "@/components/DealPipeline";
import { Figure } from "@/components/Figure";
import FootballField from "@/components/FootballField";
import { Navigation } from "@/components/Navigation";
import { PitchShowcase } from "@/components/PitchShowcase";
import { Reveal } from "@/components/Reveal";
import { SectionObserver } from "@/components/SectionObserver";
import { VideoLoop } from "@/components/VideoLoop";

import styles from "../app/page.module.css";

type TextMap = {
  hero: { tag: string; title: string; titleEm: string; lead: string };
  arch: { tag: string; title: string; lead: string };
  pipe: { tag: string; title: string; lead: string };
  valo: { tag: string; title: string };
  deliv: { tag: string; title: string; lead: string };
  diff: { tag: string; title: string; lead: string };
  hitl: { tag: string; title: string };
  hitlSteps: Array<{ strong: string; p: string }>;
  team: { tag: string; title: string };
  julien: { name: string; role: string; desc: string; quote: string };
  louis: { name: string; role: string; desc: string; quote: string };
  contact: {
    tag: string;
    title: string;
    lead: string;
    emailLabel: string;
    email: string;
    linkedinLabel: string;
    linkedinUrl: string;
    cvLabel: string;
    cvUrl: string;
    caseStudyLabel: string;
    decisionsLabel: string;
  };
  footer: string[];
};

const textsEN: TextMap = {
  hero: {
    tag: "Epoch Associes · Paris",
    title: "A deal operating system ",
    titleEm: "built from scratch for small-cap M&A.",
    lead: "14+ purpose-built modules execute French sell-side transactions (500K-10M euros EV) end-to-end. From a 500K-lead sourcing engine to a fully formulaic valuation workbook. Each module has its own agents, tools, guardrails, and human control gates. Nothing off-the-shelf. Everything auditable."
  },
  arch: {
    tag: "System Architecture",
    title: "12 infrastructure components. Each one exists because M&A broke without it.",
    lead: "Hybrid RAG because embed-only search gets the numbers wrong. A knowledge graph because facts are connected across entities. Local LLM because resolving 500K entities via API is economically absurd. An LLM gateway because models change monthly. Every layer solves a specific failure mode that a generic AI setup cannot handle."
  },
  pipe: {
    tag: "Deal Pipeline",
    title: "The entire sell-side lifecycle, decomposed into auditable stages.",
    lead: "10 sequential stages, 2 cross-cutting layers running in parallel. Each stage has Pydantic I/O contracts, HITL gates, and status tracking. The pipeline waits for human validation between stages. Hours, days. It does not skip ahead."
  },
  valo: { tag: "Valuation Engine", title: "Three independent branches, one football field." },
  deliv: {
    tag: "First Deliverable",
    title: "24 slides generated in 15 minutes. Every figure sourced, then reviewed by the banker.",
    lead: "The Medadom pitch deck was produced end-to-end by the system: Agent Info Publique ran a full public data research, Buyer Matching produced a preliminary acquirer list, the Valuation Engine computed a range from 400K transaction comps. No number is typed by hand. Every output still passes the banker's review before it leaves the building. The same deliverable takes a junior analyst a full working day."
  },
  diff: {
    tag: "Why Epoch",
    title: "What separates Epoch from ChatGPT plus a banker.",
    lead: "The difference is not what a single prompt can produce. It is what Epoch maintains across months of deal execution: isolation between mandates, persistent memory per deal, a facts layer with source verification, and feedback that compounds across every transaction."
  },
  hitl: { tag: "HITL Philosophy", title: "\"No Send Ever\"" },
  hitlSteps: [
    { strong: "Agent produces", p: "Draft, analysis, or recommendation" },
    { strong: "HITL Queue", p: "Output enters the Analyst review tab" },
    { strong: "Banker reviews", p: "Approve / Edit / Reject" },
    { strong: "Correction routed", p: "Categorized, sent to SKILL or MEMORY file" },
    { strong: "Next deal is better", p: "Feedback compounds. Deal 20 > Deal 1." }
  ],
  team: { tag: "Team", title: "Two people. One system." },
  julien: {
    name: "Julien Bouix", role: "President",
    desc: "Ex-Lincoln International, Technology Team (Associate level). 10+ transactions mid-cap. Domain: M&A execution, system design, spec authorship, HITL validation, and co-development of the platform.",
    quote: "\"Specs, architecture decisions, validation, and code.\""
  },
  louis: {
    name: "Louis Germain", role: "CTO / DG",
    desc: "MSc Computer Science. Full-stack implementation: infrastructure, agent orchestration, data pipelines, deployment. RTX 4090, Docker, PostgreSQL, Qdrant, the works.",
    quote: "\"Architecture, infrastructure, and every pipeline.\""
  },
  contact: {
    tag: "Get in touch",
    title: "Two doors. Same system.",
    lead: "If you run a French SME and are thinking about a sale — or if you build AI systems and want to compare notes on agent architecture, HITL, or RAG for high-stakes domains — write to us.",
    emailLabel: "Email",
    email: "julien@jbouix.com",
    linkedinLabel: "LinkedIn",
    linkedinUrl: "https://www.linkedin.com/in/julien-bouix/",
    cvLabel: "Download CV (PDF)",
    cvUrl: "/portfolio/cv-julien-bouix.pdf",
    caseStudyLabel: "Deep dive — entity resolution",
    decisionsLabel: "Architecture decisions log"
  },
  footer: ["Epoch Associes", "AI-native M&A advisory", "Paris, France"]
};

const textsFR: TextMap = {
  hero: {
    tag: "Epoch Associés · Paris",
    title: "Un système d'exécution de transactions, ",
    titleEm: "construit de zéro pour le M&A small-cap.",
    lead: "14+ modules sur mesure exécutent des mandats de cession français (500K-10M euros EV) de bout en bout. D'un moteur de sourcing de 500K leads à un classeur de valorisation entièrement formulé. Chaque module a ses propres agents, outils, garde-fous et portes de contrôle humain. Rien de générique. Tout auditable."
  },
  arch: {
    tag: "Architecture système",
    title: "12 briques d'infrastructure. Chacune existe parce que le M&A cassait sans elle.",
    lead: "Un RAG hybride parce que la recherche par embeddings seuls se trompe sur les chiffres. Un knowledge graph parce que les faits sont reliés entre entités. Un LLM local parce que résoudre 500K entités via API est économiquement absurde. Un gateway LLM parce que les modèles changent tous les mois. Chaque couche résout un mode de défaillance spécifique qu'une IA générique ne sait pas gérer."
  },
  pipe: {
    tag: "Pipeline de transaction",
    title: "L'intégralité du cycle sell-side, décomposée en étapes auditables.",
    lead: "10 étapes séquentielles, 2 couches transversales en parallèle. Chaque étape a des contrats Pydantic I/O, des portes HITL et un suivi de statut. Le pipeline attend la validation humaine entre les étapes. Des heures, des jours. Il ne saute pas."
  },
  valo: { tag: "Moteur de valorisation", title: "Trois branches indépendantes, un football field." },
  deliv: {
    tag: "Premier livrable",
    title: "24 slides générées en 15 minutes. Chaque chiffre sourcé, puis validé par le banquier.",
    lead: "Le pitch Medadom a été produit de bout en bout par le système : l'Agent Info Publique a fait une recherche complète de données publiques, le Buyer Matching a produit une liste préliminaire d'acquéreurs, le moteur de Valorisation a calculé une fourchette à partir de 400K comparables transactionnels. Aucun chiffre n'est saisi à la main. Chaque livrable passe encore par la revue du banquier avant de sortir. Le même livrable prend une journée entière à un analyste junior."
  },
  diff: {
    tag: "Pourquoi Epoch",
    title: "Ce qui distingue Epoch d'un ChatGPT augmenté d'un banquier.",
    lead: "La différence n'est pas ce qu'un prompt isolé peut produire. C'est ce qu'Epoch maintient sur des mois d'exécution : isolation entre mandats, mémoire persistante par dossier, couche de faits avec vérification des sources, et feedback qui se capitalise à chaque transaction."
  },
  hitl: { tag: "Philosophie HITL", title: "\"No Send Ever\"" },
  hitlSteps: [
    { strong: "L'agent produit", p: "Brouillon, analyse ou recommandation" },
    { strong: "File HITL", p: "Le livrable entre dans l'onglet Analyste" },
    { strong: "Le banquier valide", p: "Approuver / Modifier / Rejeter" },
    { strong: "Correction routée", p: "Catégorisée, envoyée au fichier SKILL ou MEMORY" },
    { strong: "Le deal suivant est meilleur", p: "Le feedback composé. Deal 20 > Deal 1." }
  ],
  team: { tag: "Équipe", title: "Deux personnes. Un système." },
  julien: {
    name: "Julien Bouix", role: "Président",
    desc: "Ex-Lincoln International, équipe Technology (niveau Associate). 10+ transactions mid-cap. Domaine : exécution M&A, conception du système, rédaction des specs, validation HITL et co-développement de la plateforme.",
    quote: "\"Specs, décisions d'architecture, validation et code.\""
  },
  louis: {
    name: "Louis Germain", role: "CTO / DG",
    desc: "MSc Informatique. Implémentation intégrale : infrastructure, orchestration d'agents, pipelines de données, déploiement. RTX 4090, Docker, PostgreSQL, Qdrant.",
    quote: "\"Architecture, infrastructure et chaque pipeline.\""
  },
  contact: {
    tag: "Nous contacter",
    title: "Deux portes. Un même système.",
    lead: "Si vous dirigez une PME française et réfléchissez à une cession — ou si vous construisez des systèmes d'IA et voulez échanger sur l'architecture d'agents, le HITL ou le RAG dans un domaine à forts enjeux — écrivez-nous.",
    emailLabel: "Email",
    email: "julien@jbouix.com",
    linkedinLabel: "LinkedIn",
    linkedinUrl: "https://www.linkedin.com/in/julien-bouix/",
    cvLabel: "Télécharger CV (PDF)",
    cvUrl: "/portfolio/cv-julien-bouix.pdf",
    caseStudyLabel: "Étude de cas — résolution d'entités",
    decisionsLabel: "Journal des décisions d'architecture"
  },
  footer: ["Epoch Associés", "Conseil M&A augmenté par l'IA", "Paris, France"]
};

// ── Engineer-audience overrides ─────────────────────────────────
// Only the surfaces that change meaningfully when speaking to an
// engineering reader. Banker copy falls through for everything else.

type TextOverride = Partial<Pick<TextMap, "hero" | "arch" | "pipe" | "deliv" | "diff" | "team">>;

const engineerEN: TextOverride = {
  hero: {
    tag: "Engineering portfolio · Paris",
    title: "A multi-agent OS for high-stakes document production, ",
    titleEm: "built on hybrid RAG, knowledge graphs, and local inference."
  ,
    lead: "Next.js, FastAPI+HTMX, LangGraph, Qdrant, Neo4j, PostgreSQL, Docling, vLLM+Qwen 2.5 32B on an RTX 4090. 14+ business modules with Pydantic I/O contracts, 4-level anti-hallucination guards, persistent per-deal memory, and observability on every LLM call. The domain happens to be M&A; the system design generalises to any workflow where figures must be auditable and humans must stay in the loop."
  },
  arch: {
    tag: "System architecture",
    title: "Why 12 separate infra components and not one framework.",
    lead: "Embed-only retrieval under-recalls exact numerics, so retrieval is hybrid dense+sparse with cross-encoder rerank. Entity resolution through a 3-tier cascade keeps 98% of work at zero marginal cost. A gateway abstracts all frontier model calls into a single Python client so model migration is a config change. LangGraph only where stateful memory across weeks matters. Everything else is explicit sequential pipelines — simpler, more testable, fewer surprises in prod."
  },
  pipe: {
    tag: "Pipeline",
    title: "12 stages, strict I/O contracts, and no agent ships output untouched by a human.",
    lead: "Each stage is a Python module with Pydantic schemas at the boundary. HITL checkpoints persist to Postgres so the pipeline can wait hours or days for validation without holding memory. Circuit breakers kill runaway revision loops. Every figure carries a reliability tag (certified / declarative / estimated / public_web). This is what it takes to run LLM output through a domain where one wrong EBITDA poisons the rest of the deal."
  },
  deliv: {
    tag: "Proof",
    title: "24 slides generated in 15 minutes — every number traceable to source.",
    lead: "The Medadom pitch deck was produced end-to-end: public data ingestion, buyer matching against a 7M-record database, valuation from 400K transaction comps, deck composition via python-pptx against 20 layout taxonomies. Zero hardcoded numbers; every figure links back through the lineage tab to (file, page, cell, extraction date). The banker still reviews before anything ships."
  },
  diff: {
    tag: "What makes it work",
    title: "The six properties that separate a production system from a prompt.",
    lead: "Namespace isolation per deal. Persistent memory with checkpointing. A facts layer with citation enforcement. Multi-module orchestration with Pydantic contracts. Structural guardrails (circuit breakers, adversarial agents, confidence thresholds). Local inference for batch work, frontier models only where reasoning quality pays for itself. Observability on every call. None of this comes out of the box."
  },
  team: { tag: "Team", title: "Two-person team. Senior domain expert plus full-stack builder." }
};

const engineerFR: TextOverride = {
  hero: {
    tag: "Portfolio technique · Paris",
    title: "Un OS multi-agents pour la production de documents à fort enjeu, ",
    titleEm: "bâti sur RAG hybride, graphes de connaissances et inférence locale."
  ,
    lead: "Next.js, FastAPI+HTMX, LangGraph, Qdrant, Neo4j, PostgreSQL, Docling, vLLM+Qwen 2.5 32B sur une RTX 4090. 14+ modules métier avec contrats d'I/O Pydantic, garde-fous anti-hallucination à 4 niveaux, mémoire persistante par dossier et observabilité sur chaque appel LLM. Le domaine est le M&A ; la conception système se généralise à tout workflow où chaque chiffre doit être auditable et chaque humain rester dans la boucle."
  },
  arch: {
    tag: "Architecture système",
    title: "Pourquoi 12 briques d'infra séparées plutôt qu'un framework unique.",
    lead: "La recherche par embeddings seuls rate les valeurs numériques exactes ; d'où un RAG hybride dense+sparse avec re-ranking cross-encoder. La résolution d'entités passe par une cascade à 3 niveaux qui maintient 98 % du travail à coût marginal nul. Une passerelle isole tous les appels frontier derrière un client Python unique : changer de modèle devient un changement de config. LangGraph est réservé aux cas où la mémoire stateful sur plusieurs semaines compte ; partout ailleurs, des pipelines séquentiels explicites — plus simples, plus testables, moins de surprises en prod."
  },
  pipe: {
    tag: "Pipeline",
    title: "12 étapes, contrats d'I/O stricts, aucun agent ne livre sans relecture humaine.",
    lead: "Chaque étape est un module Python avec des schémas Pydantic aux frontières. Les points de contrôle HITL sont persistés en Postgres : le pipeline attend des heures ou des jours sans occuper de mémoire. Des circuit breakers stoppent les boucles de révision. Chaque chiffre porte un tag de fiabilité (certifié / déclaratif / estimé / web_public). C'est le minimum pour faire tourner des sorties LLM dans un domaine où un EBITDA faux empoisonne tout le deal."
  },
  deliv: {
    tag: "Preuve",
    title: "24 slides générées en 15 minutes — chaque chiffre traçable à sa source.",
    lead: "Le pitch Medadom a été produit de bout en bout : ingestion de données publiques, matching contre une base de 7M acquéreurs, valorisation à partir de 400K comparables, composition du deck via python-pptx sur 20 taxonomies de mise en page. Zéro valeur codée en dur ; chaque chiffre remonte via l'onglet lineage vers (fichier, page, cellule, date d'extraction). Le banquier valide toujours avant toute sortie."
  },
  diff: {
    tag: "Ce qui fait tenir",
    title: "Les six propriétés qui séparent un système en production d'un prompt.",
    lead: "Isolation de namespace par dossier. Mémoire persistante avec checkpointing. Couche factuelle avec citation obligatoire. Orchestration multi-modules avec contrats Pydantic. Garde-fous structurels (circuit breakers, agents adverses, seuils de confiance). Inférence locale pour le batch, modèles frontier uniquement quand la qualité de raisonnement le justifie. Observabilité sur chaque appel. Rien de tout cela ne sort d'une boîte."
  },
  team: { tag: "Équipe", title: "Deux personnes. Expert domaine senior + full-stack." }
};

function selectTexts(base: TextMap, audience: Audience, lang: "en" | "fr"): TextMap {
  if (audience === "banker") return base;
  const overlay = lang === "fr" ? engineerFR : engineerEN;
  return { ...base, ...overlay };
}

// Engineer-audience thesis overrides (replace the 4 cards with tech-focused cards)
const thesisEngineerEN: ThesisContent = {
  tag: "The technical problem",
  title: "Small-cap deals produce a very specific engineering constraint.",
  cards: [
    {
      number: "01",
      heading: "The economic envelope is tiny",
      body: "A 2M€ transaction pays 80-150K€ in fees. A full IB team costs 40-60K€/month fully loaded. You cannot throw junior headcount at the problem. Every module has to produce output close to banker-final on the first pass."
    },
    {
      number: "02",
      heading: "Which means zero tolerance for hallucination",
      body: "A fabricated EBITDA figure cascades into the valuation, into the IM, into every buyer conversation. So numbers never come from an LLM. Extraction is deterministic (Docling for PDFs, openpyxl for Excel). The LLM classifies and flags. A citation guard rejects any figure without source."
    },
    {
      number: "03",
      heading: "And the throughput pattern forces local inference",
      body: "Entity resolution across 500K candidate companies, daily. At $0.50/entity via frontier API, that's $250K/day. A cascade (deterministic → local Qwen 32B → frontier) keeps ~98% at zero marginal cost. Cost structure is architecture, not optimization."
    },
    {
      number: "04",
      heading: "The result is a deal operating system, not a chatbot",
      body: "Isolation per deal (Qdrant namespaces), persistent memory (Postgres + LangGraph checkpoints), HITL queues at every boundary, observability via Langfuse, and a feedback loop that turns banker corrections into MEMORY and SKILL files. Deal 20 is meaningfully better than Deal 1."
    }
  ]
};

const thesisEngineerFR: ThesisContent = {
  tag: "Le problème technique",
  title: "Le M&A small-cap impose une contrainte d'ingénierie très spécifique.",
  cards: [
    {
      number: "01",
      heading: "L'enveloppe économique est minuscule",
      body: "Une transaction à 2M€ rapporte 80-150K€ d'honoraires. Une équipe IB complète coûte 40-60K€/mois chargés. On ne peut pas noyer le problème sous du junior. Chaque module doit produire une sortie proche du livrable final dès le premier passage."
    },
    {
      number: "02",
      heading: "Donc zéro tolérance à l'hallucination",
      body: "Un EBITDA inventé se propage dans la valorisation, dans le mémorandum, dans chaque échange acquéreur. Les chiffres ne viennent donc jamais d'un LLM. L'extraction est déterministe (Docling pour les PDF, openpyxl pour Excel). Le LLM classe et signale. Un citation guard rejette tout chiffre sans source."
    },
    {
      number: "03",
      heading: "Et le volume impose l'inférence locale",
      body: "Résoudre 500K entreprises candidates, chaque jour. À 0,50 $/entité via API frontier, c'est 250K$/jour. Une cascade (déterministe → Qwen 32B local → frontier) maintient ~98 % à coût marginal nul. La structure de coûts est une décision d'architecture, pas d'optimisation."
    },
    {
      number: "04",
      heading: "Le résultat est un OS transactionnel, pas un chatbot",
      body: "Isolation par dossier (namespaces Qdrant), mémoire persistante (Postgres + checkpoints LangGraph), files HITL à chaque frontière, observabilité via Langfuse, et boucle de feedback qui transforme les corrections banquier en fichiers MEMORY et SKILL. Le dossier 20 est vraiment meilleur que le dossier 1."
    }
  ]
};

function selectThesis(base: ThesisContent, audience: Audience, lang: "en" | "fr"): ThesisContent {
  if (audience === "banker") return base;
  return lang === "fr" ? thesisEngineerFR : thesisEngineerEN;
}

export function PageContent() {
  const lang = useLangStore((s) => s.lang);
  const audience = useAudienceStore((s) => s.audience);
  const c = getContent(lang);
  const baseT = lang === "fr" ? textsFR : textsEN;
  const t = selectTexts(baseT, audience, lang);
  const thesis = selectThesis(c.thesis, audience, lang);

  return (
    <div className={styles.page}>
      <Navigation sections={c.navSections} />
      <SectionObserver ids={c.navSections.map((s) => s.id)} />

      <main>
        {/* ── Hero ──────────────────────────────────── */}
        <section className={`${styles.section} ${styles.hero}`} id="top">
          <div className={styles.heroInner}>
            <Reveal>
              <p className={styles.heroSupertitle}>
                Portfolio technique — Epoch Associes — Julien Bouix
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className={styles.heroTitle}>
                {t.hero.title}<em>{t.hero.titleEm}</em>
              </h1>
            </Reveal>
            <Reveal delay={160}><p className={styles.heroLead}>{t.hero.lead}</p></Reveal>
          </div>
          <Reveal delay={280}>
            <div className={styles.container}>
              <AnimatedCounter items={c.heroMetrics} />
            </div>
          </Reveal>
        </section>

        {/* ── Thesis ────────────────────────────────── */}
        <section className={styles.section} id="thesis">
          <div className={styles.container}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>{thesis.tag}</span>
                <h2 className={styles.sectionTitle}>{thesis.title}</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className={styles.thesisGrid}>
                {thesis.cards.map((card) => (
                  <article key={card.number} className={styles.thesisCard}>
                    <span className={styles.thesisNumber}>{card.number}</span>
                    <h3 className={styles.thesisHeading}>{card.heading}</h3>
                    <p className={styles.thesisBody}>{card.body}</p>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Architecture ──────────────────────────── */}
        <section className={styles.section} id="architecture">
          <div className={styles.container}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>{t.arch.tag}</span>
                <h2 className={styles.sectionTitle}>{t.arch.title}</h2>
                <p className={styles.sectionLead}>{t.arch.lead}</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <ArchitectureExplorer nodes={c.infraNodes} guardrails={c.guardrails} modules={c.pipelineStages} />
            </Reveal>
            <Reveal delay={180}>
              <Figure
                src="/portfolio/screenshots/arch-explorer-panel.png"
                alt={lang === "fr" ? "Exploration d'une brique d'infrastructure" : "Infra node drill-down"}
                caption={lang === "fr"
                  ? "Vue détaillée d'un nœud d'infrastructure (specs techniques / rationale M&A / modules connectés)."
                  : "Drill-down panel on a single infra node (tech specs / M&A rationale / connected modules)."}
                placeholderTitle={lang === "fr"
                  ? "Capture : drill-down sur un nœud d'infrastructure"
                  : "Screenshot: infra-node drill-down panel"}
                placeholderHint={lang === "fr"
                  ? "Drop un PNG 16:9 dans /public/screenshots/arch-explorer-panel.png pour remplacer ce placeholder."
                  : "Drop a 16:9 PNG at /public/screenshots/arch-explorer-panel.png to replace this placeholder."}
              />
            </Reveal>
          </div>
        </section>

        {/* ── Pipeline ──────────────────────────────── */}
        <section className={styles.section} id="pipeline">
          <div className={styles.container}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>{t.pipe.tag}</span>
                <h2 className={styles.sectionTitle}>{t.pipe.title}</h2>
                <p className={styles.sectionLead}>{t.pipe.lead}</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <DealPipeline stages={c.pipelineStages} />
            </Reveal>
          </div>
        </section>

        {/* ── Valuation ─────────────────────────────── */}
        <section className={styles.section} id="valuation">
          <div className={styles.container}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>{t.valo.tag}</span>
                <h2 className={styles.sectionTitle}>{t.valo.title}</h2>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className={styles.valoGrid}>
                {c.valoBranches.map((branch) => (
                  <article key={branch.id} className={styles.valoBranch}>
                    <span className={styles.valoBranchLabel}>{branch.active}</span>
                    <h3 className={styles.valoBranchTitle}>{branch.label}</h3>
                    <span className={styles.valoBranchRole}>{branch.role}</span>
                    <p className={styles.valoBranchDesc}>{branch.description}</p>
                    <ul className={styles.valoBranchDetails}>
                      {branch.details.map((d) => (<li key={d}>{d}</li>))}
                    </ul>
                  </article>
                ))}
              </div>
            </Reveal>
            <Reveal delay={180}><FootballField /></Reveal>
            <Reveal delay={240}>
              <Figure
                src="/portfolio/screenshots/valo-football-field.png"
                alt={lang === "fr" ? "Synthèse de valorisation — Excel" : "Valuation synthesis — Excel"}
                caption={lang === "fr"
                  ? "Onglet Synthèse du classeur de valorisation. Chaque cellule est une formule, chaque source est traçable."
                  : "Synthesis tab of the valuation workbook. Every cell is a formula, every source is traceable."}
                placeholderTitle={lang === "fr"
                  ? "Capture : classeur de valorisation"
                  : "Screenshot: valuation workbook"}
                placeholderHint={lang === "fr"
                  ? "Drop un PNG 16:9 dans /public/screenshots/valo-football-field.png"
                  : "Drop a 16:9 PNG at /public/screenshots/valo-football-field.png"}
              />
            </Reveal>
          </div>
        </section>

        {/* ── Deliverable ───────────────────────────── */}
        <section className={styles.section} id="deliverable">
          <div className={styles.container}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>{t.deliv.tag}</span>
                <h2 className={styles.sectionTitle}>{t.deliv.title}</h2>
                <p className={styles.sectionLead}>{t.deliv.lead}</p>
              </div>
            </Reveal>
            <Reveal delay={100}><PitchShowcase /></Reveal>
            <Reveal delay={180}>
              <Figure
                src="/portfolio/screenshots/medadom-deck-cover.png"
                alt={lang === "fr" ? "Couverture du deck Medadom généré" : "Generated Medadom deck cover"}
                caption={lang === "fr"
                  ? "Slide 01 du pitch Medadom, exporté depuis python-pptx."
                  : "Slide 01 of the Medadom pitch, exported from python-pptx."}
                placeholderTitle={lang === "fr"
                  ? "Capture : couverture du deck Medadom"
                  : "Screenshot: generated Medadom deck cover"}
                placeholderHint={lang === "fr"
                  ? "Drop un PNG 16:9 dans /public/screenshots/medadom-deck-cover.png"
                  : "Drop a 16:9 PNG at /public/screenshots/medadom-deck-cover.png"}
              />
            </Reveal>
          </div>
        </section>

        {/* ── Differentiation ───────────────────────── */}
        <section className={styles.section} id="differentiation">
          <div className={styles.container}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>{t.diff.tag}</span>
                <h2 className={styles.sectionTitle}>{t.diff.title}</h2>
                <p className={styles.sectionLead}>{t.diff.lead}</p>
              </div>
            </Reveal>
            <Reveal delay={100}><ComparisonTable rows={c.comparisonRows} /></Reveal>
            <Reveal delay={200}>
              <div style={{ marginTop: 48 }}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionTag}>{t.hitl.tag}</span>
                  <h2 className={styles.sectionTitle}>{t.hitl.title}</h2>
                </div>
                <div className={styles.hitlFlow}>
                  {t.hitlSteps.map((step) => (
                    <div key={step.strong} className={styles.hitlStep}>
                      <strong className={styles.hitlTitle}>{step.strong}</strong>
                      <p className={styles.hitlDesc}>{step.p}</p>
                    </div>
                  ))}
                </div>
                <Figure
                  src="/portfolio/screenshots/cockpit-hitl.png"
                  alt={lang === "fr" ? "CRM Cockpit — onglet Analyste / file HITL" : "CRM Cockpit — Analyst tab / HITL queue"}
                  caption={lang === "fr"
                    ? "La file HITL dans le cockpit. Tout ce qu'un agent produit y atterrit avant de partir."
                    : "HITL queue in the cockpit. Everything an agent produces lands here before it ships."}
                  placeholderTitle={lang === "fr"
                    ? "Capture : onglet Analyste du cockpit"
                    : "Screenshot: cockpit Analyst tab"}
                  placeholderHint={lang === "fr"
                    ? "Drop un PNG 16:9 dans /public/screenshots/cockpit-hitl.png"
                    : "Drop a 16:9 PNG at /public/screenshots/cockpit-hitl.png"}
                />
                <VideoLoop
                  src="/portfolio/videos/cockpit-hitl.mp4"
                  poster="/portfolio/screenshots/cockpit-hitl.png"
                  caption={lang === "fr"
                    ? "Démo ~30s : un output d'agent entre dans la file, le banquier approuve, la correction part en MEMORY."
                    : "~30s loop: agent output enters the queue, the banker approves, the correction is routed into MEMORY."}
                  placeholderTitle={lang === "fr"
                    ? "Vidéo : le cockpit HITL en action"
                    : "Video: the HITL cockpit in action"}
                  placeholderHint={lang === "fr"
                    ? "Drop une MP4 ~30s / 16:9 dans /public/videos/cockpit-hitl.mp4"
                    : "Drop a ~30s 16:9 MP4 at /public/videos/cockpit-hitl.mp4"}
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Team ──────────────────────────────────── */}
        <section className={styles.section} id="team">
          <div className={styles.container}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>{t.team.tag}</span>
                <h2 className={styles.sectionTitle}>{t.team.title}</h2>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className={styles.teamGrid}>
                <article className={styles.teamCard}>
                  <h3 className={styles.teamName}>{t.julien.name}</h3>
                  <span className={styles.teamRole}>{t.julien.role}</span>
                  <p className={styles.teamDesc}>{t.julien.desc}</p>
                  <p className={styles.teamQuote}>{t.julien.quote}</p>
                </article>
                <article className={styles.teamCard}>
                  <h3 className={styles.teamName}>{t.louis.name}</h3>
                  <span className={styles.teamRole}>{t.louis.role}</span>
                  <p className={styles.teamDesc}>{t.louis.desc}</p>
                  <p className={styles.teamQuote}>{t.louis.quote}</p>
                </article>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Contact ───────────────────────────────── */}
        <section className={styles.section} id="contact">
          <div className={styles.container}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>{t.contact.tag}</span>
                <h2 className={styles.sectionTitle}>{t.contact.title}</h2>
                <p className={styles.sectionLead}>{t.contact.lead}</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className={styles.contactGrid}>
                <a className={styles.contactCard} href={`mailto:${t.contact.email}`}>
                  <span className={styles.contactLabel}>{t.contact.emailLabel}</span>
                  <span className={styles.contactValue}>{t.contact.email}</span>
                </a>
                <a className={styles.contactCard} href={t.contact.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  <span className={styles.contactLabel}>{t.contact.linkedinLabel}</span>
                  <span className={styles.contactValue}>/in/julien-bouix</span>
                </a>
                <a className={styles.contactCard} href={t.contact.cvUrl} target="_blank" rel="noopener noreferrer">
                  <span className={styles.contactLabel}>PDF</span>
                  <span className={styles.contactValue}>{t.contact.cvLabel}</span>
                </a>
                <Link className={styles.contactCard} href="/case-studies/entity-resolution">
                  <span className={styles.contactLabel}>Case study</span>
                  <span className={styles.contactValue}>{t.contact.caseStudyLabel}</span>
                </Link>
                <Link className={styles.contactCard} href="/decisions">
                  <span className={styles.contactLabel}>Log</span>
                  <span className={styles.contactValue}>{t.contact.decisionsLabel}</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          {t.footer.map((s) => (<span key={s}>{s}</span>))}
        </div>
      </footer>
    </div>
  );
}
