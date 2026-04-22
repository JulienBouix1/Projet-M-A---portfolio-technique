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
import { POCStatus } from "@/components/POCStatus";
import { Reveal } from "@/components/Reveal";
import { SectionObserver } from "@/components/SectionObserver";

import styles from "../app/page.module.css";

// ── Scope limits — honest "not yet" list, shown before Team ─────
type ScopeLimit = { title: string; why: string };
type ScopeLimitsCopy = { tag: string; title: string; lead: string; items: ScopeLimit[] };

const scopeLimitsEN: ScopeLimitsCopy = {
  tag: "Scope limits",
  title: "Where the POC stops.",
  lead: "Real limitations, not excuses. Each one is a concrete feature a banker could ask for that isn't built.",
  items: [
    { title: "Mandates above €10M EV", why: "The module library is calibrated for small-cap: buyer universe, comps database, fee structure, DD depth. Mid-cap is a different product." },
    { title: "Cross-border transactions", why: "Buyer database is France-only (INSEE / INPI / BODACC). No multi-jurisdiction tax structuring, no foreign-acquirer mapping outside France." },
    { title: "Heavily regulated sectors", why: "Banking, insurance, defense: sector-specific filings and process requirements (AMF, ACPR, DGSI) are not in the templates." },
    { title: "Live Q&A during management presentations", why: "The Q&A agent produces prepared answers from the knowledge base. It doesn't join the buyer call." },
    { title: "Data-room anonymization at closing", why: "Module specced and queued, not yet deployed. Today the banker redacts manually before data-room upload." },
    { title: "Late-stage negotiation support (LOI→SPA)", why: "System stops at indicative-offer comparison. Term-sheet negotiation, drag-along clauses, and final-round tactics stay with the banker." }
  ]
};

const scopeLimitsFR: ScopeLimitsCopy = {
  tag: "Limites de scope",
  title: "Où le POC s'arrête.",
  lead: "Des limites réelles, pas des excuses. Chaque item est une fonctionnalité concrète qu'un banquier pourrait demander et qui n'est pas construite.",
  items: [
    { title: "Mandats au-delà de 10 M€ EV", why: "La bibliothèque de modules est calibrée small-cap : univers acquéreurs, base de comps, structure d'honoraires, profondeur de DD. Le mid-cap, c'est un autre produit." },
    { title: "Transactions cross-border", why: "Base acquéreurs 100 % France (INSEE / INPI / BODACC). Pas de structuring fiscal multi-juridictions, pas de mapping d'acquéreurs hors France." },
    { title: "Secteurs très régulés", why: "Banque, assurance, défense : les dépôts réglementaires spécifiques et les exigences process (AMF, ACPR, DGSI) ne sont pas dans les templates." },
    { title: "Q&A en direct pendant les présentations management", why: "L'agent Q&A produit des réponses préparées à partir de la base de connaissances. Il ne rejoint pas la réunion avec l'acquéreur." },
    { title: "Anonymisation de la dataroom au closing", why: "Module spec'é et en file, pas encore déployé. Aujourd'hui le banquier expurge manuellement avant upload de la dataroom." },
    { title: "Support négociation finale (LOI → SPA)", why: "Le système s'arrête à la comparaison des offres indicatives. Négociation du term sheet, clauses de sortie, tactique de dernier tour — ça reste chez le banquier." }
  ]
};


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
    tag: "Technical portfolio · AI-augmented M&A advisory",
    title: "Can a full small-cap M&A mandate ",
    titleEm: "run on AI agents alone?",
    lead: "POC built with my co-founder Louis Germain (CTO). A synthetic sell-side mandate ran end-to-end through the system — pitch, datapack, business plan, valuation, buyer short-list, information memorandum. 14 agents, 12 infra components. Every figure back-links to its source document; a senior banker signs off before anything ships. What follows is the system itself, and an honest line between what runs in prod and what's still on paper."
  },
  arch: {
    tag: "Architecture",
    title: "12 infra components, each blocking a concrete way a deal can break.",
    lead: "Hallucinated numbers, cross-mandate leakage, runaway API bills on 500,000 entities, stale models — each component below fixes one of these. Click any node: you'll see the tech specs AND the M&A reason it exists."
  },
  pipe: {
    tag: "Deal Pipeline",
    title: "14 modules. From sourcing to the IM — closing stays with the banker.",
    lead: "10 sequential stages, from first contact to market launch. 2 cross-cutting layers running in parallel (CRM + Email). Between every stage, the pipeline stops and waits for the banker to validate. Hours or days if that's what it takes. Nothing skips ahead."
  },
  valo: { tag: "Valuation engine", title: "Three independent branches, one football field." },
  deliv: {
    tag: "Demo deliverable",
    title: "24-slide pitch deck. 15 min generated, 45 min reviewed.",
    lead: "Synthetic Projet Atlas file, taken end-to-end: full public research, buyer short-list, a valuation range cross-checked against our base of 60–100K transactions with disclosed multiples. Zero numbers typed by hand — every figure traces back to its source document. An analyst produces the same deck in 2–3 full days."
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
    tag: "Portfolio technique · Conseil M&A augmenté par l'IA",
    title: "Peut-on exécuter un mandat M&A small-cap ",
    titleEm: "avec des agents IA ?",
    lead: "POC construit avec mon cofondateur Louis Germain (CTO). Un mandat sell-side fictif a traversé le système de bout en bout — pitch, datapack, business plan, valorisation, short-list acquéreurs, mémorandum. 14 agents, 12 briques d'infra. Chaque chiffre renvoie à son document source ; un banquier senior valide avant toute sortie. Les pages suivantes détaillent le système et la ligne honnête entre ce qui tourne en prod et ce qui reste à construire."
  },
  arch: {
    tag: "Architecture",
    title: "12 briques d'infra, chacune pour bloquer une façon concrète de casser un dossier.",
    lead: "Chiffre halluciné, fuite d'un mandat A vers un mandat B, coût d'API qui explose sur 500 000 entités, modèle qui devient obsolète — chaque brique ci-dessous règle un de ces problèmes. Chaque nœud ouvre la spec technique et la raison M&A de son existence."
  },
  pipe: {
    tag: "Pipeline de transaction",
    title: "14 modules. Du sourcing au mémorandum — le reste du process reste chez le banquier.",
    lead: "10 étapes séquentielles, du premier contact à la mise sur le marché. 2 couches transversales qui tournent en parallèle (CRM + Email). Entre chaque étape, le pipeline s'arrête et attend la validation du banquier. Des heures ou des jours s'il le faut. Aucune étape ne saute."
  },
  valo: { tag: "Moteur de valorisation", title: "Trois branches indépendantes qui se croisent dans un football field." },
  deliv: {
    tag: "Livrable démo",
    title: "Deck pitch 24 slides. 15 min de génération, 45 min de relecture.",
    lead: "Dossier fictif Projet Atlas, traité de bout en bout : recherche publique complète, short-list d'acquéreurs, fourchette de valorisation recoupée sur notre base de 60-100K transactions avec multiples divulgués. Aucun chiffre saisi à la main — chaque figure remonte à son document source. Un analyste sort le même deck en 2-3 jours pleins."
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
    lead: "Ouvert aux discussions tech (agents, RAG, HITL, LLM local), aux opportunités d'embauche ou de collaboration. Réponse sous 48h.",
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

// Operator lens — Chief of Staff / Product / Program Management audience.
// Reader is a recruiter or hiring manager evaluating: product scope control,
// delivery under constraint, cross-functional orchestration, decisions.
// This is NOT a deep-engineering view; the tech stack is context, not subject.
const operatorEN: TextOverride = {
  hero: {
    tag: "Portfolio · Operator / Chief of Staff lens",
    title: "I broke a dense, expert-driven M&A process ",
    titleEm: "into 14 agent-executable modules.",
    lead: "M&A execution is a craft: tacit knowledge, dozens of implicit decisions per mandate, no textbook. The core product work here was decomposing that craft into 14 discrete modules — each with explicit inputs, outputs, quality gates, and banker sign-off. That decomposition is the transferable competency this POC demonstrates: taking a workflow treated as intransmissible and turning it into operable pieces. It ports to any organization sitting on a dense, expert-driven process that refuses to scale."
  },
  arch: {
    tag: "The shape of the decomposition",
    title: "12 infrastructure components. Each one earns its line.",
    lead: "Decomposing the process meant being ruthless about what the system needs to own, vs what it can outsource or skip. Every node below has two explanations side-by-side: what it does, and why it has to exist. The architecture decisions log (footer link) carries the full trail of what got kept, what got rejected, and why."
  },
  pipe: {
    tag: "The map",
    title: "14 modules. Honest status. Zero vaporware.",
    lead: "10 sequential stages covering the sell-side up to the IM, plus 2 cross-cutting layers running in parallel. Green = live. Blue = in test. Amber = still on paper. Inflating module status would be caught by any senior M&A reader inside ten minutes of poking — so we don't."
  },
  deliv: {
    tag: "Proof the decomposition holds",
    title: "A synthetic mandate ran end-to-end, in 15 minutes of machine time.",
    lead: "Every module on the map was exercised against the Projet Atlas file: public research, buyer matching, valuation, deck composition. Every figure back-links to its source. The senior banker still signs off before anything ships — the product goal is banker-grade output, not banker-free output. A banker-analyst pair produces the equivalent in 2–3 full days."
  },
  diff: {
    tag: "Why the decomposition matters",
    title: "Why this competency transfers beyond M&A.",
    lead: "Every dense, expert-driven workflow has the same failure mode: the craft lives in three people's heads and can't be handed off without them. What this POC demonstrates is the inverse — making the craft explicit, contract-bound, and operable. The pattern (define the modules, write the I/O contracts, put a human at every boundary, enforce citation) transfers to any workflow facing the same bottleneck: legal due diligence, medical case review, audit, regulatory filings, forensic accounting."
  },
  team: { tag: "The team", title: "Ex-Lincoln M&A banker on product. One CTO on build. No juniors." }
};

const operatorFR: TextOverride = {
  hero: {
    tag: "Portfolio · Angle opérateur / Chief of Staff",
    title: "J'ai découpé un process M&A dense ",
    titleEm: "en 14 modules agent-exécutables.",
    lead: "L'exécution M&A est un métier : connaissance tacite, des dizaines de décisions implicites par dossier, aucun manuel. Le vrai travail produit, ici, a été de décomposer ce métier en 14 modules discrets — chacun avec des entrées, des sorties, des points de contrôle qualité et une validation banquier explicites. Cette décomposition est la compétence transférable que ce POC démontre : prendre un workflow jugé intransmissible et en faire des briques opérables. Le même patron s'applique à toute organisation qui porte un process dense, expert-driven, qui refuse de passer à l'échelle."
  },
  arch: {
    tag: "La forme de la décomposition",
    title: "12 briques d'infrastructure. Chacune mérite sa ligne.",
    lead: "Décomposer le process a imposé d'être tranchant : ce que le système doit posséder en interne, ce qu'il peut externaliser, ce qu'il peut ignorer. Chaque nœud ci-dessous a deux explications consultables côte à côte : ce qu'il fait, et pourquoi il doit exister. Le journal des décisions d'architecture (lien en footer) porte la traçabilité complète de ce qui a été gardé, rejeté, et pourquoi."
  },
  pipe: {
    tag: "La carte",
    title: "14 modules. Statut honnête. Zéro vaporware.",
    lead: "10 étapes séquentielles couvrant le sell-side jusqu'au mémorandum, plus 2 couches transversales en parallèle. Vert = live. Bleu = en test. Ambre = encore sur le papier. Gonfler les statuts se ferait détecter par un banquier senior en dix minutes d'utilisation — donc on ne le fait pas."
  },
  deliv: {
    tag: "Preuve que la décomposition tient",
    title: "Un mandat fictif, traversé de bout en bout, 15 minutes de temps machine.",
    lead: "Chaque module de la carte a été exercé sur le dossier Projet Atlas : recherche publique, matching acquéreurs, valorisation, composition du deck. Chaque chiffre remonte à son document source. Le banquier senior valide toujours avant toute sortie — le but produit, c'est le livrable qualité banquier, pas le livrable sans banquier. Un binôme banquier-analyste produit l'équivalent en 2–3 jours pleins."
  },
  diff: {
    tag: "Pourquoi cette décomposition compte",
    title: "Pourquoi cette compétence se transpose au-delà du M&A.",
    lead: "Tout workflow dense, expert-driven, a le même mode de défaillance : le métier vit dans la tête de trois personnes et ne se transmet pas sans elles. Ce que ce POC démontre, c'est l'inverse — rendre le métier explicite, contractualisé, opérable. Le patron (définir les modules, écrire les contrats d'I/O, mettre un humain à chaque frontière, imposer la citation de source) se transpose à tout workflow qui subit le même goulot : due diligence juridique, revue de dossier médical, audit, dépôts réglementaires, expertise comptable forensique."
  },
  team: { tag: "L'équipe", title: "Ex-banquier M&A Lincoln au produit. Un CTO au build. Zéro junior." }
};

function selectTexts(base: TextMap, audience: Audience, lang: "en" | "fr"): TextMap {
  if (audience === "banker") return base;
  const overlay = lang === "fr" ? operatorFR : operatorEN;
  return { ...base, ...overlay };
}

// Operator-lens thesis: reframe the problem as a product/delivery challenge,
// not a technical one. Concrete numbers, decisions-made, no stack name-drops.
const thesisOperatorEN: ThesisContent = {
  tag: "The decomposition problem",
  title: "M&A is treated as a craft. We turned it into a set of contracts.",
  cards: [
    {
      number: "01",
      heading: "M&A execution resists decomposition — that's the problem",
      body: "The process is dense: hundreds of sub-decisions per mandate, most of them tacit. Every incumbent firm treats it as untransferable — taught by sitting next to a senior for five years. That makes the workflow impossible to scale without headcount, and impossible to agentify without a ruthless decomposition pass."
    },
    {
      number: "02",
      heading: "The work was the decomposition, not the coding",
      body: "Breaking the craft into 14 discrete modules with explicit I/O contracts — what goes in, what comes out, what quality gate it has to pass, who signs off — is the product work. The code followed. That decomposition is the asset a two-person team can own; a traditional IB team can't, because the process isn't written down anywhere."
    },
    {
      number: "03",
      heading: "Zero tolerance for hallucinated figures",
      body: "A fabricated EBITDA cascades into the valuation, the IM, every buyer conversation — reputation-fatal in M&A. So the product rule: no figure ever comes from the LLM. Extraction is deterministic; the model classifies and flags. The system would rather display 'not available' than guess."
    },
    {
      number: "04",
      heading: "The pattern transfers beyond M&A",
      body: "Any dense, expert-driven workflow has the same failure: it lives in three people's heads and can't be handed off. Medical case review, legal due diligence, audit, regulatory filings — they all face the decomposition problem first. The shape we built (modules + contracts + HITL boundaries + citation) is the generic answer, not the M&A-specific one."
    }
  ]
};

const thesisOperatorFR: ThesisContent = {
  tag: "Le problème de décomposition",
  title: "Le M&A est traité comme un métier. On en a fait un jeu de contrats.",
  cards: [
    {
      number: "01",
      heading: "L'exécution M&A résiste à la décomposition — c'est le vrai problème",
      body: "Le process est dense : des centaines de sous-décisions par dossier, la plupart tacites. Toute boutique incumbent le traite comme intransmissible — ça s'apprend en s'asseyant à côté d'un senior pendant cinq ans. Résultat : le workflow est impossible à scaler sans masse salariale, et impossible à agentifier sans une passe de décomposition tranchante."
    },
    {
      number: "02",
      heading: "Le vrai travail, c'est la décomposition — pas le code",
      body: "Découper le métier en 14 modules discrets avec des contrats d'I/O explicites — ce qui entre, ce qui sort, le point de contrôle qualité à passer, qui valide — c'est ça, le travail produit. Le code a suivi. Cette décomposition, c'est l'actif qu'une équipe de deux peut posséder ; une équipe IB classique ne le peut pas, parce que son process n'est écrit nulle part."
    },
    {
      number: "03",
      heading: "Tolérance zéro sur les chiffres hallucinés",
      body: "Un EBITDA inventé se propage dans la valorisation, le mémorandum, chaque échange acquéreur — fatal à la réputation en M&A. Règle produit : aucun chiffre ne vient jamais du LLM. L'extraction est déterministe ; le modèle classe et signale. Le système préfère afficher « non disponible » que deviner."
    },
    {
      number: "04",
      heading: "Le patron se transpose au-delà du M&A",
      body: "Tout workflow dense, expert-driven, a le même échec : il vit dans la tête de trois personnes et ne se transmet pas. Revue médicale, due diligence juridique, audit, dépôts réglementaires — ils affrontent tous le problème de décomposition en premier. La forme qu'on a construite (modules + contrats + frontières HITL + citation de source) est la réponse générique, pas la réponse spécifique au M&A."
    }
  ]
};

function selectThesis(base: ThesisContent, audience: Audience, lang: "en" | "fr"): ThesisContent {
  if (audience === "banker") return base;
  return lang === "fr" ? thesisOperatorFR : thesisOperatorEN;
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
          <div className={styles.heroGridTexture} aria-hidden />
          <div className={styles.heroInner}>
            <Reveal>
              <p className={styles.heroSupertitle}>{t.hero.tag}</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className={styles.heroTitle}>
                {t.hero.title}
                <em className={styles.heroTitleEm}>{t.hero.titleEm}</em>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className={styles.heroLead}>{t.hero.lead}</p>
            </Reveal>
            <Reveal delay={240}>
              <div className={styles.heroMeta}>
                <span>
                  {lang === "fr"
                    ? "POC construit en 2025–2026 · avec Louis Germain (CTO)"
                    : "POC built in 2025–2026 · with Louis Germain (CTO)"}
                </span>
                <a href="#architecture" className={styles.heroJump}>
                  {lang === "fr" ? "Voir le système ↓" : "See the system ↓"}
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={320}>
            <div className={styles.container}>
              <AnimatedCounter items={c.heroMetrics} />
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div className={styles.container} style={{ marginTop: 48 }}>
              <POCStatus stages={c.pipelineStages} crossCutting={c.crossCuttingLayers} lang={lang} />
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
              <div className={styles.gantt}>
                <header className={styles.ganttHead}>
                  <div>
                    <span className={styles.ganttKicker}>
                      {lang === "fr" ? "Cartographie" : "Map"}
                    </span>
                    <h3 className={styles.ganttTitle}>
                      {lang === "fr"
                        ? "10 étapes séquentielles, 2 en spec, 2 couches transversales."
                        : "10 sequential stages, 2 in spec, 2 cross-cutting layers."}
                    </h3>
                  </div>
                  <div className={styles.ganttLegend}>
                    <span><i className={`${styles.legendDot} ${styles.legendLive}`} /> Live</span>
                    <span><i className={`${styles.legendDot} ${styles.legendTesting}`} /> {lang === "fr" ? "En test" : "Testing"}</span>
                    <span><i className={`${styles.legendDot} ${styles.legendSpec}`} /> Spec</span>
                  </div>
                </header>

                <div className={styles.ganttPhase}>
                  <span>{lang === "fr" ? "Pré-mandat" : "Pre-mandate"}</span>
                  <span>{lang === "fr" ? "Exécution" : "Execution"}</span>
                  <span>{lang === "fr" ? "Post-IM" : "Post-IM"}</span>
                </div>

                <ol className={styles.ganttTrack}>
                  {c.pipelineStages.map((stage) => (
                    <li key={stage.id} className={`${styles.ganttBar} ${styles[`ganttBar_${stage.status}`]}`}>
                      <span className={styles.ganttBarNum}>{stage.number}</span>
                      <span className={styles.ganttBarName}>{stage.title}</span>
                    </li>
                  ))}
                </ol>

                <div className={styles.ganttCrossLabel}>
                  <span className={styles.ganttCrossLabelText}>
                    {lang === "fr"
                      ? "Couches transversales — tournent sur toutes les étapes"
                      : "Cross-cutting layers — running across every stage"}
                  </span>
                </div>

                <ol className={styles.ganttRails}>
                  {c.crossCuttingLayers.map((layer) => (
                    <li key={layer.id} className={`${styles.ganttRail} ${styles[`ganttRail_${layer.status}`]}`}>
                      <span className={styles.ganttRailPulse} />
                      <span className={styles.ganttRailName}>{layer.title}</span>
                      <span className={styles.ganttRailDesc}>
                        {layer.id === "crm"
                          ? (lang === "fr" ? "File HITL · validation banquier" : "HITL queue · banker sign-off")
                          : (lang === "fr" ? "Analyse Gmail stateful · jamais d'envoi auto" : "Stateful Gmail agent · never auto-sends")}
                      </span>
                      <span className={styles.ganttRailStatus}>
                        {layer.status === "live" ? "Live" : layer.status === "testing" ? (lang === "fr" ? "En test" : "Testing") : "Spec"}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <DealPipeline stages={c.pipelineStages} />
            </Reveal>
          </div>
        </section>

        {/* ── HITL / Cockpit ───────────────────────── */}
        <section className={styles.section} id="hitl">
          <div className={styles.container}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>{t.hitl.tag}</span>
                <h2 className={styles.sectionTitle}>{t.hitl.title}</h2>
                <p className={styles.sectionLead}>
                  {lang === "fr"
                    ? "Chaque sortie d'agent atterrit dans la file de revue du cockpit. Le banquier approuve, modifie ou rejette. La correction est routée vers la mémoire du système, et le dossier suivant en bénéficie."
                    : "Every agent output lands in the cockpit review queue. The banker approves, edits, or rejects. The correction is routed to the system's memory — and the next mandate benefits from it."}
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className={styles.hitlFlow}>
                {t.hitlSteps.map((step) => (
                  <div key={step.strong} className={styles.hitlStep}>
                    <strong className={styles.hitlTitle}>{step.strong}</strong>
                    <p className={styles.hitlDesc}>{step.p}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={180}>
              <CockpitMockup lang={lang} />
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
          </div>
        </section>

        {/* ── Scope limits — honest "not yet" ─────── */}
        <section className={styles.section} id="limits">
          <div className={styles.container}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>{(lang === "fr" ? scopeLimitsFR : scopeLimitsEN).tag}</span>
                <h2 className={styles.sectionTitle}>{(lang === "fr" ? scopeLimitsFR : scopeLimitsEN).title}</h2>
                <p className={styles.sectionLead}>{(lang === "fr" ? scopeLimitsFR : scopeLimitsEN).lead}</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <ol className={styles.limitsList}>
                {(lang === "fr" ? scopeLimitsFR : scopeLimitsEN).items.map((item, i) => (
                  <li key={item.title} className={styles.limitsItem}>
                    <span className={styles.limitsNum}>{String(i + 1).padStart(2, "0")}</span>
                    <div className={styles.limitsBody}>
                      <h3 className={styles.limitsTitle}>{item.title}</h3>
                      <p className={styles.limitsWhy}>{item.why}</p>
                    </div>
                  </li>
                ))}
              </ol>
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
