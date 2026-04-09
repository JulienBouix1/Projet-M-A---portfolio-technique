"use client";

import { useLangStore } from "@/store/lang-store";
import { getContent } from "@/lib/content";
import type { ThesisContent } from "@/lib/content";

import AnimatedCounter from "@/components/AnimatedCounter";
import { ArchitectureExplorer } from "@/components/ArchitectureExplorer";
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
    title: "24 slides. 15 minutes. Zero manual input on the content.",
    lead: "The Medadom pitch deck was generated end-to-end: Agent Info Publique ran a full public data research, Buyer Matching produced a preliminary acquirer list, the Valuation Engine computed a range from 400K transaction comps. The same deliverable takes a junior analyst a full working day."
  },
  diff: {
    tag: "System Properties",
    title: "Not features. Architecture.",
    lead: "The difference is not what it can do in a single prompt. It is what it maintains across months of deal execution: isolation between mandates, persistent memory per deal, a facts layer with source verification, and feedback that compounds across every transaction."
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
    title: "24 slides. 15 minutes. Zéro intervention manuelle sur le contenu.",
    lead: "Le pitch Medadom a été généré de bout en bout : l'Agent Info Publique a fait une recherche complète de données publiques, le Buyer Matching a produit une liste préliminaire d'acquéreurs, le moteur de Valorisation a calculé une fourchette à partir de 400K comparables transactionnels. Le même livrable prend une journée entière à un analyste junior."
  },
  diff: {
    tag: "Propriétés système",
    title: "Pas des fonctionnalités. De l'architecture.",
    lead: "La différence n'est pas ce que le système peut faire en un prompt. C'est ce qu'il maintient sur des mois d'exécution : isolation entre mandats, mémoire persistante par dossier, couche de faits avec vérification des sources, et feedback qui compose à chaque transaction."
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
  footer: ["Epoch Associés", "Conseil M&A augmenté par l'IA", "Paris, France"]
};

export function PageContent() {
  const lang = useLangStore((s) => s.lang);
  const c = getContent(lang);
  const t = lang === "fr" ? textsFR : textsEN;

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
                <span className={styles.sectionTag}>{c.thesis.tag}</span>
                <h2 className={styles.sectionTitle}>{c.thesis.title}</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className={styles.thesisGrid}>
                {c.thesis.cards.map((card) => (
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
                    <strong key={`t-${step.strong}`} className={styles.hitlTitle}>{step.strong}</strong>
                  ))}
                  {t.hitlSteps.map((step) => (
                    <p key={`d-${step.strong}`} className={styles.hitlDesc}>{step.p}</p>
                  ))}
                </div>
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
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          {t.footer.map((s) => (<span key={s}>{s}</span>))}
        </div>
      </footer>
    </div>
  );
}
