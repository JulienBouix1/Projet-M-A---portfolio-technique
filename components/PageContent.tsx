"use client";

import { useLangStore } from "@/store/lang-store";
import { useAudienceStore, type Audience } from "@/store/audience-store";
import { getContent } from "@/lib/content";
import type { ThesisContent } from "@/lib/content";

import Link from "next/link";

import AnimatedCounter from "@/components/AnimatedCounter";
import { ArchitectureExplorer } from "@/components/ArchitectureExplorer";
import { CockpitMockup } from "@/components/CockpitMockup";
import ComparisonTable from "@/components/ComparisonTable";
import DealPipeline from "@/components/DealPipeline";
import FootballField from "@/components/FootballField";
import { Navigation } from "@/components/Navigation";
import { PitchShowcase } from "@/components/PitchShowcase";
import { Reveal } from "@/components/Reveal";
import { SectionObserver } from "@/components/SectionObserver";

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
    tag: "Technical portfolio · Julien Bouix · Paris",
    title: "The system I built for small-cap M&A. ",
    titleEm: "14 agents, 12 infra components, two builders.",
    lead: "A full sell-side mandate runs on it — pitch deck, financial datapack, business plan, valuation, buyer short-list, information memorandum. The pages below walk through the architecture, the engineering tradeoffs, and one concrete deliverable produced end-to-end. The domain happens to be M&A; the problem was how to make LLM output safe enough to leave the building."
  },
  arch: {
    tag: "Architecture",
    title: "12 infra components, each blocking a concrete way a deal can break.",
    lead: "Hallucinated numbers, cross-mandate leakage, runaway API bills on 500,000 entities, stale models — each component below fixes one of these. Click any node: you'll see the tech specs AND the M&A reason it exists."
  },
  pipe: {
    tag: "Deal Pipeline",
    title: "14 modules. The full sell-side lifecycle, from first contact to signed SPA.",
    lead: "10 sequential stages from lead to closing. 2 cross-cutting layers that run in parallel (CRM + Email). Between every stage, the pipeline stops and waits for the banker to validate. Hours or days if that's what it takes. Nothing skips ahead."
  },
  valo: { tag: "Valuation engine", title: "Three independent branches, one football field." },
  deliv: {
    tag: "Demo deliverable",
    title: "A 24-slide pitch deck. 15 minutes to generate.",
    lead: "On the Medadom file (synthetic), the system ran end-to-end: full public research, buyer short-list, a valuation range cross-checked against 400K transaction comps. Zero numbers typed by hand — every figure traces back to its source document. The banker reviews, edits, then sends. A junior analyst takes a full working day to produce the equivalent."
  },
  diff: {
    tag: "Why build a system",
    title: "Why a ChatGPT prompt cannot do this.",
    lead: "ChatGPT forgets everything between conversations; this system keeps a dedicated memory across 6–9 months of execution. ChatGPT invents numbers; here every figure is tied to its source document. ChatGPT has no access to 400,000 recent French transaction comps; this one does. ChatGPT starts from zero every deal — this system compounds: every banker correction becomes a gain on the next mandate."
  },
  hitl: { tag: "Human guardrail", title: "\"No Send Ever\"" },
  hitlSteps: [
    { strong: "Agent produces", p: "Draft, analysis, or recommendation" },
    { strong: "HITL Queue", p: "Output enters the Analyst review tab" },
    { strong: "Banker reviews", p: "Approve / Edit / Reject" },
    { strong: "Correction routed", p: "Categorized, sent to SKILL or MEMORY file" },
    { strong: "Next deal is better", p: "Feedback compounds. Deal 20 > Deal 1." }
  ],
  team: { tag: "Who built this", title: "Two people. A senior M&A banker and a full-stack engineer." },
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
    tag: "Reach out",
    title: "Questions on the build, the stack, or hiring? Write.",
    lead: "Open to tech conversations (agents, RAG, HITL, local LLM), hiring / collab opportunities, and M&A discussions on the French small-cap side. Reply within 48 hours.",
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
    tag: "Portfolio technique · Julien Bouix · Paris",
    title: "Le système que j'ai construit pour le M&A small-cap. ",
    titleEm: "14 agents, 12 briques d'infra, à deux.",
    lead: "Un mandat de cession complet tourne dessus — pitch deck, datapack financier, business plan, valorisation, short-list d'acquéreurs, mémorandum d'information. Les pages suivantes parcourent l'architecture, les arbitrages d'ingénierie, et un livrable concret généré de bout en bout. Le domaine est le M&A ; la vraie question, c'était comment rendre une sortie de LLM assez fiable pour sortir du bâtiment."
  },
  arch: {
    tag: "Architecture",
    title: "12 briques d'infra, chacune pour bloquer une façon concrète de casser un dossier.",
    lead: "Chiffre halluciné, fuite d'un mandat A vers un mandat B, coût d'API qui explose sur 500 000 entités, modèle qui devient obsolète — chaque brique ci-dessous règle un de ces problèmes. Cliquez sur un nœud : vous verrez les specs techniques ET la raison M&A de son existence."
  },
  pipe: {
    tag: "Pipeline de transaction",
    title: "14 modules. L'intégralité du cycle sell-side, du sourcing au closing.",
    lead: "10 étapes séquentielles, du premier contact à la signature. 2 couches transversales qui tournent en parallèle (CRM + Email). Entre chaque étape, le pipeline s'arrête et attend la validation du banquier. Des heures ou des jours s'il le faut. Aucune étape ne saute."
  },
  valo: { tag: "Moteur de valorisation", title: "Trois branches indépendantes qui se croisent dans un football field." },
  deliv: {
    tag: "Livrable démo",
    title: "Un deck pitch de 24 slides. 15 minutes de génération.",
    lead: "Sur le dossier Medadom (fictif), le système a tourné de bout en bout : recherche publique complète, short-list d'acquéreurs, fourchette de valo croisée sur 400K comparables. Aucun chiffre saisi à la main — chaque figure remonte à son document source. Le banquier relit, corrige, puis envoie. Un analyste junior met une journée entière pour produire l'équivalent."
  },
  diff: {
    tag: "Pourquoi construire un système",
    title: "Pourquoi un prompt ChatGPT ne peut pas faire ça.",
    lead: "ChatGPT oublie tout entre deux conversations ; ici le système tient une mémoire dédiée sur 6 à 9 mois de dossier. ChatGPT invente des chiffres ; ici chaque figure est rattachée à son document source. ChatGPT n'a pas accès aux 400 000 transactions françaises récentes ; ce système si. Et ChatGPT repart de zéro à chaque dossier, là où ce système capitalise : chaque correction du banquier devient un gain sur le dossier suivant."
  },
  hitl: { tag: "Garde-fou humain", title: "« No Send Ever »" },
  hitlSteps: [
    { strong: "L'agent produit", p: "Brouillon, analyse ou recommandation" },
    { strong: "File HITL", p: "Le livrable entre dans l'onglet Analyste" },
    { strong: "Le banquier valide", p: "Approuver / Modifier / Rejeter" },
    { strong: "Correction routée", p: "Catégorisée, envoyée au fichier SKILL ou MEMORY" },
    { strong: "Le deal suivant est meilleur", p: "Le feedback composé. Deal 20 > Deal 1." }
  ],
  team: { tag: "Qui a construit ça", title: "Deux personnes. Un banquier M&A senior et un ingénieur full-stack." },
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
    tag: "Parler",
    title: "Questions sur le système, le stack, ou opportunité pro ? Écrivez.",
    lead: "Ouvert aux discussions tech (agents, RAG, HITL, LLM local), opportunités d'embauche ou de collaboration, et dossiers M&A small-cap. Réponse sous 48h.",
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
    title: "14 agents. 12 infra components. ",
    titleEm: "One high-stakes document-production system.",
    lead: "Next.js, FastAPI + HTMX, LangGraph, Qdrant, Neo4j, Postgres, Docling, vLLM + Qwen 2.5 32B on an RTX 4090. Every figure carries a source tag. Every agent output hits a human queue before it ships. Entity resolution runs at €1K a day instead of €250K through a 3-tier cascade. The domain is M&A; the patterns port to any workflow where a fabricated number poisons everything downstream."
  },
  arch: {
    tag: "Architecture",
    title: "12 infra pieces. No framework to hide behind.",
    lead: "Retrieval is hybrid (dense + BM25 + RRF + cross-encoder rerank) because embeddings alone miss exact numbers. Entity resolution is a 3-tier cascade so 98% of the work never hits a paid API. Model calls go through one gateway — switching from Claude to GPT is a config change, not a refactor. LangGraph shows up exactly once, where stateful memory across weeks earns its keep. Everywhere else: plain Python, Pydantic at the seams, and fewer surprises in prod."
  },
  pipe: {
    tag: "Pipeline",
    title: "14 modules. Strict I/O contracts. No agent ships output a human hasn't seen.",
    lead: "Each stage is a Python module with Pydantic schemas at the boundary. HITL checkpoints persist to Postgres, so the pipeline can wait hours or days without holding state in memory. Circuit breakers kill revision loops at 3 iterations. Every figure is tagged certified / declarative / estimated / public_web. This is the minimum to run LLM output through a domain where one wrong EBITDA poisons the whole deal."
  },
  deliv: {
    tag: "Proof",
    title: "24 slides. 15 minutes. Every figure back-linked to its source document.",
    lead: "Public data ingestion → buyer matching against 7M records → valuation from 400K transaction comps → python-pptx across 20 layout taxonomies. Zero hardcoded numbers. The lineage tab maps every figure to (file, page, cell, extraction date). The banker still reviews before anything ships — that's the point."
  },
  diff: {
    tag: "What holds it together",
    title: "Six properties that turn an LLM prompt into a production system.",
    lead: "Per-deal namespace isolation. Persistent memory with checkpointing. A facts layer with citation enforcement. Multi-module orchestration on Pydantic contracts. Structural guardrails — circuit breakers, adversarial agents, confidence thresholds. Local inference for batch work; frontier models only where reasoning pays. Observability on every call. None of this comes out of the box."
  },
  team: { tag: "Team", title: "Senior domain expert + full-stack builder. That's the whole team." }
};

const engineerFR: TextOverride = {
  hero: {
    tag: "Portfolio technique · Paris",
    title: "14 agents. 12 briques d'infra. ",
    titleEm: "Un système de production de documents à fort enjeu.",
    lead: "Next.js, FastAPI + HTMX, LangGraph, Qdrant, Neo4j, Postgres, Docling, vLLM + Qwen 2.5 32B sur RTX 4090. Chaque chiffre porte son tag de source. Chaque sortie d'agent passe par une file humaine avant de partir. La résolution d'entités tourne à 1K€/jour au lieu de 250K€/jour via une cascade à 3 niveaux. Le domaine, c'est le M&A ; les patterns valent pour tout workflow où un chiffre inventé pollue toute la chaîne."
  },
  arch: {
    tag: "Architecture",
    title: "12 briques d'infra. Pas de framework pour se cacher derrière.",
    lead: "La recherche est hybride (dense + BM25 + RRF + reranker cross-encoder) parce que les embeddings seuls ratent les chiffres exacts. La résolution d'entités passe par une cascade à 3 niveaux : 98 % du travail ne touche jamais une API payante. Tous les appels modèle passent par une passerelle unique — changer de Claude à GPT, c'est un changement de config. LangGraph n'apparaît qu'une seule fois, là où la mémoire stateful sur plusieurs semaines gagne sa place. Partout ailleurs : du Python simple, du Pydantic aux jointures, et moins de surprises en prod."
  },
  pipe: {
    tag: "Pipeline",
    title: "14 modules. Contrats I/O stricts. Aucun agent ne livre sans relecture humaine.",
    lead: "Chaque étape est un module Python avec des schémas Pydantic aux frontières. Les points HITL sont persistés en Postgres : le pipeline peut attendre des heures ou des jours sans tenir l'état en mémoire. Les circuit breakers tuent les boucles de révision à 3 itérations. Chaque chiffre est tagué certifié / déclaratif / estimé / web_public. C'est le minimum pour faire tourner des sorties LLM dans un domaine où un EBITDA faux empoisonne tout le dossier."
  },
  deliv: {
    tag: "Preuve",
    title: "24 slides. 15 minutes. Chaque chiffre tracé jusqu'à son document source.",
    lead: "Ingestion de données publiques → matching contre 7M fiches → valorisation à partir de 400K comparables → composition du deck via python-pptx sur 20 taxonomies de mise en page. Zéro valeur en dur. L'onglet lineage mappe chaque chiffre à (fichier, page, cellule, date). Le banquier valide avant toute sortie — c'est précisément le but."
  },
  diff: {
    tag: "Ce qui fait tenir",
    title: "Six propriétés qui transforment un prompt en système de production.",
    lead: "Isolation de namespace par dossier. Mémoire persistante avec checkpointing. Couche factuelle avec citation obligatoire. Orchestration multi-modules sur contrats Pydantic. Garde-fous structurels — circuit breakers, agents adverses, seuils de confiance. Inférence locale pour le batch ; frontier uniquement quand le raisonnement le justifie. Observabilité sur chaque appel. Rien de tout ça ne sort d'une boîte."
  },
  team: { tag: "Équipe", title: "Expert domaine senior + full-stack. C'est toute l'équipe." }
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
            <Reveal delay={80}>
              <div className={styles.moduleStrip}>
                <div className={styles.moduleStripHead}>
                  <span className={styles.moduleCount}>14</span>
                  <div className={styles.moduleStripHeadText}>
                    <strong>
                      {lang === "fr" ? "Modules métier" : "Business modules"}
                    </strong>
                    <span>
                      {lang === "fr"
                        ? "10 étapes séquentielles · 2 en spec · 2 couches transversales permanentes"
                        : "10 sequential stages · 2 in spec · 2 always-on cross-cutting layers"}
                    </span>
                  </div>
                </div>
                <ol className={styles.moduleList}>
                  {c.pipelineStages.map((stage) => (
                    <li key={stage.id} className={`${styles.moduleChip} ${styles[`moduleChip_${stage.status}`]}`}>
                      <span className={styles.moduleChipNum}>{stage.number}</span>
                      <span className={styles.moduleChipName}>{stage.title}</span>
                    </li>
                  ))}
                  {c.crossCuttingLayers.map((layer) => (
                    <li key={layer.id} className={`${styles.moduleChip} ${styles.moduleChipCross} ${styles[`moduleChip_${layer.status}`]}`}>
                      <span className={styles.moduleChipNum}>✕</span>
                      <span className={styles.moduleChipName}>{layer.title}</span>
                    </li>
                  ))}
                </ol>
                <div className={styles.moduleLegend}>
                  <span><i className={`${styles.legendDot} ${styles.legendLive}`} /> Live</span>
                  <span><i className={`${styles.legendDot} ${styles.legendTesting}`} /> {lang === "fr" ? "En test" : "Testing"}</span>
                  <span><i className={`${styles.legendDot} ${styles.legendSpec}`} /> Spec</span>
                  <span>
                    <i className={styles.legendCross}>✕</i>
                    {lang === "fr" ? "Couche transversale" : "Cross-cutting"}
                  </span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={140}>
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
                <CockpitMockup lang={lang} />
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
