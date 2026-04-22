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
    tag: "Technical portfolio · AI-augmented M&A advisory",
    title: "Can a full small-cap M&A mandate ",
    titleEm: "run on AI agents alone?",
    lead: "This is the POC I built to test it — with Louis Germain as CTO. A synthetic sell-side mandate was taken end-to-end: pitch deck, datapack, business plan, valuation, buyer short-list, information memorandum. 14 agents, 12 infra components. Every figure back-links to its source document; a senior banker signs off before anything ships. What follows is the system itself, and an honest line between what runs in prod and what's still on paper."
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
    title: "24-slide pitch deck. 15 min generated, 45 min reviewed.",
    lead: "Synthetic Medadom file, taken end-to-end: full public research, buyer short-list, a valuation range cross-checked against our base of 60–100K transactions with disclosed multiples. Zero numbers typed by hand — every figure traces back to its source document. An analyst produces the same deck in 2–3 full days."
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
    lead: "Voici le POC que j'ai construit pour le tester, avec Louis Germain au CTO. Un mandat sell-side fictif a été traité de bout en bout : pitch, datapack, business plan, valorisation, short-list acquéreurs, mémorandum. 14 agents, 12 briques d'infra. Chaque chiffre renvoie à son document source ; un banquier senior valide avant toute sortie. Les pages suivantes détaillent le système et la ligne honnête entre ce qui tourne en prod et ce qui reste à construire."
  },
  arch: {
    tag: "Architecture",
    title: "12 briques d'infra, chacune pour bloquer une façon concrète de casser un dossier.",
    lead: "Chiffre halluciné, fuite d'un mandat A vers un mandat B, coût d'API qui explose sur 500 000 entités, modèle qui devient obsolète — chaque brique ci-dessous règle un de ces problèmes. Chaque nœud ouvre la spec technique et la raison M&A de son existence."
  },
  pipe: {
    tag: "Pipeline de transaction",
    title: "14 modules. L'intégralité du cycle sell-side, du sourcing au closing.",
    lead: "10 étapes séquentielles, du premier contact à la signature. 2 couches transversales qui tournent en parallèle (CRM + Email). Entre chaque étape, le pipeline s'arrête et attend la validation du banquier. Des heures ou des jours s'il le faut. Aucune étape ne saute."
  },
  valo: { tag: "Moteur de valorisation", title: "Trois branches indépendantes qui se croisent dans un football field." },
  deliv: {
    tag: "Livrable démo",
    title: "Deck pitch 24 slides. 15 min de génération, 45 min de relecture.",
    lead: "Dossier fictif Medadom, traité de bout en bout : recherche publique complète, short-list d'acquéreurs, fourchette de valorisation recoupée sur notre base de 60-100K transactions avec multiples divulgués. Aucun chiffre saisi à la main — chaque figure remonte à son document source. Un analyste sort le même deck en 2-3 jours pleins."
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

// Operator lens — Chief of Staff / Product / Program Management audience.
// Reader is a recruiter or hiring manager evaluating: product scope control,
// delivery under constraint, cross-functional orchestration, decisions.
// This is NOT a deep-engineering view; the tech stack is context, not subject.
const operatorEN: TextOverride = {
  hero: {
    tag: "Portfolio · Chief of Staff / Product lens",
    title: "A proof of concept, ",
    titleEm: "delivered by a two-person team against hard constraints.",
    lead: "I own the product side: scoping the MVP across 14 modules, sequencing what ships vs what waits, running the human-in-the-loop reviews, and holding the build to a tight perimeter — no fundraising, no hiring, bounded bandwidth. What follows is the system my co-founder Louis Germain built, the decisions I made along the way, and an honest line between what runs, what's in test, and what's still on paper."
  },
  arch: {
    tag: "Architecture, for a non-engineer",
    title: "12 components. Each one carries a written rationale.",
    lead: "Every node below has two explanations side-by-side: what it does, and why we chose to own it in-house rather than outsource or skip. Click any node. The architecture decisions log (linked in the footer) carries the full trail of why each choice got made, and what we rejected."
  },
  pipe: {
    tag: "Scope map",
    title: "14 modules. Honest status. Zero vaporware.",
    lead: "10 sequential stages covering the full sell-side lifecycle, plus 2 cross-cutting layers running in parallel. Green = live. Blue = in test. Amber = still on paper. We resist the temptation to inflate module status — a senior M&A reader will catch it inside 10 minutes of poking."
  },
  deliv: {
    tag: "Proof on a synthetic file",
    title: "24 slides, built end-to-end in 15 minutes of machine time.",
    lead: "The Medadom file (synthetic) was pushed through every module: public research, buyer matching, valuation, deck composition. Every number back-links to its source. The banker still reviews before anything ships — that's a product decision, not a limitation. A banker-analyst pair produces the same deliverable in 2–3 full days."
  },
  diff: {
    tag: "The product argument",
    title: "Why this is a product, not a prompt.",
    lead: "A prompt forgets the deal between two questions; this system holds state for 6–9 months. A prompt invents numbers; this system cites every figure back to its source document. A prompt has no access to 400,000 recent transactions; this one does. A prompt restarts from zero each time; this one compounds — every banker correction becomes a gain on the next mandate."
  },
  team: { tag: "The team", title: "Two people. Ex-Lincoln banker on product, one CTO on build." }
};

const operatorFR: TextOverride = {
  hero: {
    tag: "Portfolio · Angle Chief of Staff / Produit",
    title: "Un POC, ",
    titleEm: "livré à deux sous des contraintes serrées.",
    lead: "Je porte le produit : cadrage du MVP sur 14 modules, séquencement de ce qui sort vs ce qui attend, revue humaine des livrables agents, et tenue du périmètre — pas de levée, pas d'embauche, bande passante bornée. Les pages suivantes montrent le système construit par mon cofondateur Louis Germain, les arbitrages que j'ai faits en chemin, et une ligne honnête entre ce qui tourne, ce qui est en test, et ce qui reste sur le papier."
  },
  arch: {
    tag: "Architecture, vue non-ingé",
    title: "12 briques. Chacune a une justification écrite.",
    lead: "Chaque nœud ci-dessous a deux explications consultables côte à côte : ce qu'il fait, et pourquoi on a choisi de le posséder en interne plutôt que de l'externaliser ou de s'en passer. Cliquez. Le journal des décisions d'architecture (lien en footer) porte le raisonnement complet et les alternatives rejetées."
  },
  pipe: {
    tag: "Cartographie du scope",
    title: "14 modules. Statut honnête. Zéro vaporware.",
    lead: "10 étapes séquentielles couvrant le cycle sell-side complet, plus 2 couches transversales en parallèle. Vert = live. Bleu = en test. Ambre = encore sur le papier. On évite de gonfler les statuts — un banquier senior le détectera en 10 minutes d'utilisation."
  },
  deliv: {
    tag: "Preuve sur un dossier fictif",
    title: "24 slides, construites de bout en bout en 15 minutes de temps machine.",
    lead: "Le dossier Medadom (fictif) a traversé tous les modules : recherche publique, matching acquéreurs, valorisation, composition du deck. Chaque chiffre remonte à son document source. Le banquier valide avant toute sortie — c'est un choix produit, pas une limite. Un binôme banquier-analyste produit le même livrable en 2–3 jours pleins."
  },
  diff: {
    tag: "L'argument produit",
    title: "Pourquoi c'est un produit, pas un prompt.",
    lead: "Un prompt oublie le dossier entre deux questions ; ce système garde l'état sur 6–9 mois. Un prompt invente des chiffres ; ce système cite chaque figure à un document source. Un prompt n'a pas accès à 400 000 transactions récentes ; ce système si. Un prompt repart de zéro chaque fois ; ce système capitalise — chaque correction banquier devient un gain sur le dossier suivant."
  },
  team: { tag: "L'équipe", title: "Deux personnes. Ex-banquier Lincoln au produit, un CTO au build." }
};

function selectTexts(base: TextMap, audience: Audience, lang: "en" | "fr"): TextMap {
  if (audience === "banker") return base;
  const overlay = lang === "fr" ? operatorFR : operatorEN;
  return { ...base, ...overlay };
}

// Operator-lens thesis: reframe the problem as a product/delivery challenge,
// not a technical one. Concrete numbers, decisions-made, no stack name-drops.
const thesisOperatorEN: ThesisContent = {
  tag: "The delivery problem",
  title: "Building an IB-grade product with a two-person team, against real constraints.",
  cards: [
    {
      number: "01",
      heading: "Tiny fee envelope forces product discipline",
      body: "A €2M transaction pays €80–150K. A junior IB team costs €40–60K a month. You cannot staff the traditional way. The product had to produce output close to final on the first pass, with a single human reviewer. That's the hard scoping constraint that shaped every choice below."
    },
    {
      number: "02",
      heading: "The hiring decision: two people, no juniors",
      body: "A banker-analyst pair, a senior + junior IB team, a full engineering squad — all considered, all declined. We shipped as a pair: Julien on product + M&A domain, Louis on engineering. Every module was negotiated between us against the fee envelope. Every module in the Scope Map below carries the trace of that negotiation."
    },
    {
      number: "03",
      heading: "Zero tolerance for hallucinated numbers",
      body: "A fabricated EBITDA figure cascades into the valuation, the IM, every buyer conversation — reputation-fatal in M&A. So we built a product rule: no number ever comes from the LLM. Extraction is deterministic; the model only classifies and flags. The system would rather display \"not available\" than guess."
    },
    {
      number: "04",
      heading: "Honest status, no vaporware",
      body: "10 sequential modules + 2 cross-cutting layers, each shown below with its real status: live, in test, or still on paper. We resisted marking modules 'ready' until they could survive a senior banker's scrutiny. The Scope Map in section 03 is the truth of where the POC stands today."
    }
  ]
};

const thesisOperatorFR: ThesisContent = {
  tag: "Le problème de livraison",
  title: "Construire un produit qualité IB à deux, sous contraintes réelles.",
  cards: [
    {
      number: "01",
      heading: "Enveloppe d'honoraires minuscule = discipline produit forcée",
      body: "Une transaction à 2M€ rapporte 80–150K€. Une équipe IB junior coûte 40–60K€/mois. On ne peut pas staffer à la classique. Le produit devait sortir près du final au premier passage, avec un seul relecteur. C'est la contrainte de cadrage qui a façonné chaque décision en aval."
    },
    {
      number: "02",
      heading: "La décision d'équipe : deux personnes, zéro junior",
      body: "Un binôme banquier-analyste, une équipe IB senior + junior, une squad ingé complète — tous considérés, tous refusés. On a livré à deux : Julien au produit + domaine M&A, Louis à l'ingénierie. Chaque module a été négocié entre nous contre l'enveloppe d'honoraires. La Cartographie du scope en §03 porte la trace de cette négociation."
    },
    {
      number: "03",
      heading: "Tolérance zéro sur les chiffres inventés",
      body: "Un EBITDA halluciné se propage dans la valorisation, le mémorandum, chaque échange acquéreur — fatal à la réputation en M&A. Règle produit : aucun chiffre ne vient jamais du LLM. L'extraction est déterministe ; le modèle se contente de classer et de signaler. Le système préfère afficher « non disponible » que deviner."
    },
    {
      number: "04",
      heading: "Statut honnête, pas de vaporware",
      body: "10 modules séquentiels + 2 couches transversales, chacun affiché ci-dessous avec son vrai statut : live, en test, ou encore sur le papier. On refuse de marquer un module « prêt » tant qu'il ne résiste pas à l'examen d'un banquier senior. La Cartographie du scope en §03 est la vérité du POC aujourd'hui."
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
