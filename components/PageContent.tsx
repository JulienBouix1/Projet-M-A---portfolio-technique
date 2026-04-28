"use client";

import Link from "next/link";

import { getContent } from "@/lib/content";
import type { CrossCuttingLayer, PipelineStage } from "@/lib/site-content";
import { useLangStore } from "@/store/lang-store";
import type { Audience } from "@/store/audience-store";

import { ArchitectureExplorer } from "@/components/ArchitectureExplorer";
import { CockpitMockup } from "@/components/CockpitMockup";
import DealPipeline from "@/components/DealPipeline";
import FootballField from "@/components/FootballField";
import { Navigation } from "@/components/Navigation";
import { PitchShowcase } from "@/components/PitchShowcase";
import { POCStatus } from "@/components/POCStatus";
import { Reveal } from "@/components/Reveal";
import { SectionObserver } from "@/components/SectionObserver";

import styles from "../app/page.module.css";

type Lang = "fr" | "en";

type PageContentProps = {
  audience?: Audience;
};

type SectionCopy = {
  eyebrow: string;
  title: string;
  lead: string;
};

type PageCopy = {
  nav: Array<{ id: string; label: string }>;
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    note: string;
    primary: string;
    secondary: string;
  };
  facts: Array<{ label: string; value: string; detail: string }>;
  problem: SectionCopy & {
    cards: Array<{ title: string; body: string }>;
  };
  method?: SectionCopy & {
    cards: Array<{ title: string; body: string }>;
  };
  built: SectionCopy & {
    cards: Array<{ label: string; value: string; body: string }>;
  };
  architecture: SectionCopy;
  pipeline: SectionCopy;
  control: SectionCopy & {
    steps: Array<{ title: string; body: string }>;
  };
  proof: SectionCopy & {
    caveat: string;
  };
  limits: SectionCopy & {
    items: Array<{ title: string; body: string }>;
  };
  contact: SectionCopy & {
    email: string;
    linkedin: string;
    pdf: string;
    decisions: string;
    operatorLink: string;
    bankerLink: string;
  };
};

function DeliveryMap({
  stages,
  crossCutting,
  lang
}: {
  stages: PipelineStage[];
  crossCutting: CrossCuttingLayer[];
  lang: Lang;
}) {
  const statusLabels = lang === "fr"
    ? { live: "Live", testing: "En test", spec: "Spec" }
    : { live: "Live", testing: "In test", spec: "Spec" };
  const shortTitles: Record<string, string> = lang === "fr"
    ? {
        sourcing: "Sourcing",
        pitch: "Pitch",
        mandate: "Mandat",
        workshop: "Workshop",
        datapack: "Datapack",
        bp: "BP",
        valo: "Valo",
        buyer: "Acquéreurs",
        im: "IM",
        "post-im": "Post-IM",
        "qa-agent": "Q&A",
        anonymization: "Dataroom"
      }
    : {
        sourcing: "Sourcing",
        pitch: "Pitch",
        mandate: "Mandate",
        workshop: "Workshop",
        datapack: "Datapack",
        bp: "BP",
        valo: "Valuation",
        buyer: "Buyers",
        im: "IM",
        "post-im": "Post-IM",
        "qa-agent": "Q&A",
        anonymization: "Dataroom"
      };

  return (
    <div className={styles.deliveryMap}>
      <div className={styles.deliveryHead}>
        <div>
          <span>{lang === "fr" ? "Cartographie d'exécution" : "Delivery map"}</span>
          <strong>{lang === "fr" ? "12 étapes séquentielles + 2 couches transversales" : "12 sequential stages + 2 cross-cutting layers"}</strong>
        </div>
        <div className={styles.deliveryLegend}>
          {(["live", "testing", "spec"] as const).map((status) => (
            <span key={status}>
              <i className={styles[`statusDot_${status}`]} />
              {statusLabels[status]}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.deliveryPhases}>
        <span>{lang === "fr" ? "Pré-mandat" : "Pre-mandate"}</span>
        <span>{lang === "fr" ? "Production dossier" : "Deal production"}</span>
        <span>{lang === "fr" ? "Post-mémorandum" : "Post-IM"}</span>
      </div>

      <ol className={styles.deliveryTrack}>
        {stages.map((stage) => (
          <li key={stage.id} className={`${styles.deliveryStage} ${styles[`deliveryStage_${stage.status}`]}`}>
            <span>{stage.number}</span>
            <strong>{shortTitles[stage.id] ?? stage.title}</strong>
          </li>
        ))}
      </ol>

      <div className={styles.deliveryRails}>
        <span className={styles.deliveryRailsLabel}>
          {lang === "fr" ? "Couches transversales" : "Cross-cutting layers"}
        </span>
        {crossCutting.map((layer) => (
          <div key={layer.id} className={`${styles.deliveryRail} ${styles[`deliveryRail_${layer.status}`]}`}>
            <strong>{layer.title}</strong>
            <span>{statusLabels[layer.status]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExecutionBlueprint({ lang, audience }: { lang: Lang; audience: Audience }) {
  const t = lang === "fr"
    ? {
        eyebrow: "Carte de transformation",
        title: audience === "banker"
          ? "Le mandat devient une suite de portes de contrôle."
          : "Un processus expert devient un système opérable.",
        lead: audience === "banker"
          ? "La démonstration importante n'est pas qu'un LLM peut rédiger. C'est qu'un geste M&A peut être découpé en contrat de module, contrôlé par des garde-fous, puis arbitré par le banquier."
          : "Le coeur du projet est cette transformation : passer d'un savoir tacite à des contrats, statuts, garde-fous et décisions que l'on peut piloter.",
        columns: [
          {
            label: "01",
            title: "Geste métier",
            items: ["Qualifier une opportunité", "Préparer un pitch", "Retraiter un EBITDA", "Construire une liste d'acquéreurs", "Rédiger un IM"],
          },
          {
            label: "02",
            title: "Contrat module",
            items: ["Entrées identifiées", "Sources assignées", "Livrable attendu", "Statut live / test / spec", "Responsable humain"],
          },
          {
            label: "03",
            title: "Garde-fou qualité",
            items: ["Citation obligatoire", "Tag de fiabilité", "Contrôle des contradictions", "Devil's Advocate", "File HITL"],
          },
          {
            label: "04",
            title: "Décision",
            items: ["Approuver", "Corriger", "Bloquer", "Escalader", "Envoyer soi-même"],
          },
        ],
        outcomes: [
          { label: "Ce que ça prouve", value: "décomposition réelle du métier" },
          { label: "Ce que ça révèle", value: "les POC cassent aux garde-fous qualité" },
          { label: "Ce qui reste humain", value: "jugement, relation, négociation" },
        ],
      }
    : {
        eyebrow: "Transformation map",
        title: audience === "banker"
          ? "The mandate becomes a sequence of control gates."
          : "An expert process becomes an operable system.",
        lead: audience === "banker"
          ? "The important demonstration is not that an LLM can write. It is that an M&A action can be decomposed into a module contract, checked by quality gates, then arbitrated by the banker."
          : "The core of the project is this transformation: moving from tacit expertise to contracts, statuses, quality gates and decisions that can be operated.",
        columns: [
          {
            label: "01",
            title: "Business action",
            items: ["Qualify an opportunity", "Prepare a pitch", "Restate EBITDA", "Build a buyer list", "Draft an IM"],
          },
          {
            label: "02",
            title: "Module contract",
            items: ["Inputs identified", "Sources assigned", "Expected output", "Live / test / spec status", "Human owner"],
          },
          {
            label: "03",
            title: "Quality gate",
            items: ["Mandatory citation", "Reliability tag", "Contradiction check", "Devil's Advocate", "HITL queue"],
          },
          {
            label: "04",
            title: "Decision",
            items: ["Approve", "Correct", "Block", "Escalate", "Send manually"],
          },
        ],
        outcomes: [
          { label: "What it proves", value: "real decomposition of the craft" },
          { label: "What it reveals", value: "POCs break at quality gates" },
          { label: "What stays human", value: "judgment, relationship, negotiation" },
        ],
      };

  return (
    <div className={styles.blueprintPanel}>
      <div className={styles.blueprintHeader}>
        <p className={styles.eyebrow}>{t.eyebrow}</p>
        <h3>{t.title}</h3>
        <p>{t.lead}</p>
      </div>
      <div className={styles.blueprintFlow}>
        {t.columns.map((column) => (
          <article key={column.title} className={styles.blueprintColumn}>
            <span>{column.label}</span>
            <h4>{column.title}</h4>
            <ul>
              {column.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className={styles.blueprintOutcomes}>
        {t.outcomes.map((item) => (
          <div key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

const copy: Record<Audience, Record<Lang, PageCopy>> = {
  banker: {
    fr: {
      nav: [
        { id: "problem", label: "Problème" },
        { id: "built", label: "Construit" },
        { id: "architecture", label: "Architecture" },
        { id: "pipeline", label: "Pipeline" },
        { id: "control", label: "Contrôle" },
        { id: "valuation", label: "Valo" },
        { id: "proof", label: "Exemple" },
        { id: "limits", label: "Limites" },
        { id: "contact", label: "Contact" },
      ],
      hero: {
        eyebrow: "Portfolio technique M&A",
        title: "Epoch Associés est né d'une question : l'exécution M&A small-cap est-elle automatisable ?",
        lead:
          "Pendant trois mois, nous avons travaillé sur Epoch Associés : un cabinet d'exécution M&A assistée par IA pour des mandats de cession français de 500K€ à 10M€ EV. Les différents POC n'atteignent pas encore les standards attendus en M&A ; le projet est donc mis en attente. Cette page documente ce qui a été construit, ce qui fonctionne, ce qui bloque et ce que cette expérience démontre.",
        note:
          "Objectif du portfolio : documenter le travail réalisé sur Epoch et permettre à un banquier de comprendre ce qui fonctionne, ce qui bloque, et pourquoi je candidate maintenant à des rôles M&A.",
        primary: "Voir le système",
        secondary: "Page opérateur",
      },
      facts: [
        { label: "Marché visé", value: "500K-10M€ EV", detail: "cessions small-cap françaises" },
        { label: "Rôle", value: "Produit + M&A", detail: "spécifications, architecture, validation métier" },
        { label: "Période", value: "2025-2026", detail: "trois mois de build intensif sur le POC" },
        { label: "Position actuelle", value: "En pause", detail: "POC réels, qualité finale encore insuffisante" },
      ],
      problem: {
        eyebrow: "Pourquoi tenter ce projet",
        title: "Le small-cap a besoin de rigueur bancaire, mais pas du modèle de coûts d'une banque d'affaires.",
        lead:
          "Sur un mandat à 2M€ EV, les honoraires ne financent pas une équipe MD / Director / VP / Associate / Analyst pendant six à neuf mois. Le risque est connu: moins de préparation, moins de recherche acquéreurs, moins de structuration, donc moins de tension concurrentielle.",
        cards: [
          {
            title: "Le coût de production ne colle pas",
            body: "Un mandat small-cap peut payer 80-150K€ de success fee. Une équipe IB complète coûte vite 40-60K€ par mois. L'équation ne tient pas si l'on reproduit le modèle mid-cap.",
          },
          {
            title: "Le travail junior reste indispensable",
            body: "Sourcing, collecte documentaire, recherche d'acquéreurs, comparables, préparation de trames, rédaction initiale : ce travail détermine la qualité du processus, mais il est difficile à rentabiliser sur les petits dossiers.",
          },
          {
            title: "Le banquier ne doit pas disparaître",
            body: "Le jugement commercial, la relation dirigeant, la négociation et la décision finale restent humains. Le projet vise la production, pas l'autorité.",
          },
        ],
      },
      method: {
        eyebrow: "Ce que le POC a vraiment testé",
        title: "Avant d'automatiser un mandat, il fallait transformer le métier en système.",
        lead:
          "L'intérêt d'Epoch Associés n'est pas l'IA en soi. C'est la formalisation d'un processus M&A largement tacite : quelles données demander, quelles sources croire, quel livrable produire, quand bloquer, quand escalader, et quelle décision doit rester humaine.",
        cards: [
          {
            title: "Tacite → explicite",
            body: "Transformer les gestes métier en entrées, sorties, critères de qualité et points de validation. Sans cette couche, le système produit du texte ; avec elle, il devient auditable.",
          },
          {
            title: "Production → blocage",
            body: "Un module ne doit pas seulement générer un pitch, un datapack ou une shortlist. Il doit aussi savoir refuser de sortir si les sources, la valorisation ou la logique acquéreur sont insuffisantes.",
          },
          {
            title: "Correction → mémoire",
            body: "Une correction banquier ne doit pas rester une retouche locale. Elle doit être captée, classée et réutilisée pour durcir le module concerné sur le dossier suivant.",
          },
        ],
      },
      built: {
        eyebrow: "Ce qui a été construit",
        title: "Une chaîne de modules assistée par IA, pas un chatbot.",
        lead:
          "L'IA est assumée, mais encadrée. Epoch Associés a été conçu comme une chaîne de modules : chaque module reçoit des données, produit un livrable et doit passer par une validation humaine. Le point important est la décomposition du processus M&A, pas une promesse de génération automatique.",
        cards: [
          { label: "Prospects", value: "500K fiches", body: "Base de prospects et annonces structurées à partir de portails et d'open data française." },
          { label: "Acquéreurs", value: "7M fiches", body: "Base acquéreurs française avec faits financiers et matching déterministe." },
          { label: "Modules dossier", value: "Pitch → IM", body: "Pitch, atelier management, datapack, business plan, valorisation, matching acquéreurs, rédaction IM." },
          { label: "Contrôle", value: "HITL", body: "Cockpit, runs API, runner, files de validation et principe No Send Ever." },
        ],
      },
      architecture: {
        eyebrow: "Architecture",
        title: "Chaque brique répond à un risque concret de dossier.",
        lead:
          "Fuite de données entre mandats, chiffre halluciné, coût d'API, source non traçable, email envoyé trop tôt : les choix techniques ne sont pas décoratifs. Ils découlent des contraintes M&A.",
      },
      pipeline: {
        eyebrow: "Pipeline",
        title: "Le périmètre réel s'arrête au mémorandum. Le closing reste chez le banquier.",
        lead:
          "Les modules couvrent l'origination, le pré-mandat et la production des livrables jusqu'à l'IM. Les étapes post-IM existent surtout comme spécifications ou briques partielles ; elles ne doivent pas être présentées comme un processus autonome de closing.",
      },
      control: {
        eyebrow: "Contrôle humain",
        title: "Le garde-fou central : aucun livrable externe sans validation.",
        lead:
          "Le cockpit est la surface qui rend le système opérable. Les agents préparent; le banquier approuve, modifie ou rejette. La correction devient ensuite un signal durable pour le module concerné.",
        steps: [
          { title: "L'agent produit", body: "analyse, brouillon, retraitement ou recommandation" },
          { title: "La sortie entre en file", body: "artefact visible dans le cockpit Analyste" },
          { title: "Le banquier tranche", body: "valide, corrige, rejette ; jamais d'envoi automatique" },
          { title: "La correction est routée", body: "mémoire, règle métier ou backlog module" },
        ],
      },
      proof: {
        eyebrow: "Exemple de livrable",
        title: "Projet Atlas montre l'intention; il ne doit pas masquer les limites du POC.",
        lead:
          "Le cas Atlas est synthétique et calibré small-cap. Il sert à rendre visible le type de livrable recherché: recherche publique, valorisation, acquéreurs, logique industrielle. Il ne remplace pas une preuve de production sur un mandat réel.",
        caveat:
          "Point important : les derniers audits de pitch montrent que la chaîne peut encore produire un document non envoyable. Le bon apprentissage n'est pas de polir le PDF, mais de bloquer l'export quand les garde-fous qualité échouent.",
      },
      limits: {
        eyebrow: "Limites actuelles",
        title: "Le POC est utile pour comprendre le système. Il n'est pas encore un produit M&A vendable tel quel.",
        lead:
          "C'est précisément pour cela que ce portfolio existe: montrer le travail de structuration, pas prétendre que le système a déjà remplacé une équipe deal.",
        items: [
          { title: "Qualité livrable", body: "Certains pitches générés n'atteignent pas le standard bancaire. Les garde-fous sources, acquéreurs et valorisation doivent bloquer plus tôt." },
          { title: "Liste acquéreurs", body: "La base est réelle, mais une liste de qualité client exige encore une supervision sur la capacité financière, la logique d'acquisition et la pertinence sectorielle." },
          { title: "Valorisation", body: "L'architecture multi-méthode existe; la preuve robuste sur dossiers réels reste partielle." },
          { title: "Modules aval", body: "IM, email intelligence et post-IM ne doivent pas être racontés comme entièrement productisés." },
        ],
      },
      contact: {
        eyebrow: "Contact",
        title: "Discuter du projet, du M&A small-cap ou d'une opportunité.",
        lead:
          "Je candidate à des rôles M&A et je peux détailler aussi bien le raisonnement deal que le travail de structuration produit réalisé sur Epoch Associés.",
        email: "Email",
        linkedin: "LinkedIn",
        pdf: "PDF de présentation",
        decisions: "Décisions techniques",
        operatorLink: "Voir la page opérateur",
        bankerLink: "Voir la page M&A",
      },
    },
    en: {
      nav: [
        { id: "problem", label: "Problem" },
        { id: "built", label: "Built" },
        { id: "architecture", label: "Architecture" },
        { id: "pipeline", label: "Pipeline" },
        { id: "control", label: "Control" },
        { id: "valuation", label: "Valuation" },
        { id: "proof", label: "Example" },
        { id: "limits", label: "Limits" },
        { id: "contact", label: "Contact" },
      ],
      hero: {
        eyebrow: "Technical M&A portfolio",
        title: "Epoch Associés began with one question: can small-cap M&A execution be automated?",
        lead:
          "For three months, we worked on Epoch Associés: an AI-assisted M&A execution firm for French small-cap sell-side mandates between €500K and €10M EV. The POCs do not yet meet M&A standards; the project is therefore on hold. This page documents what was built, what works, what blocks, and what the experience demonstrates.",
        note:
          "Purpose of the portfolio: document the work done on Epoch and help a banker understand what works, what blocks, and why I am now applying to M&A roles.",
        primary: "See the system",
        secondary: "Operator page",
      },
      facts: [
        { label: "Target market", value: "500K-10M€ EV", detail: "French small-cap sell-side" },
        { label: "Role", value: "Product + M&A", detail: "specs, architecture, domain validation" },
        { label: "Period", value: "2025-2026", detail: "three months of intensive POC build" },
        { label: "Current position", value: "On hold", detail: "real POCs, final quality still insufficient" },
      ],
      problem: {
        eyebrow: "Why attempt this",
        title: "Small-cap needs banker-grade rigor, but not the cost base of an investment bank.",
        lead:
          "On a €2M EV mandate, the fee pool cannot fund a full MD / Director / VP / Associate / Analyst team for six to nine months. The usual consequence is less preparation, less buyer work, less structure, and less competitive tension.",
        cards: [
          { title: "Production cost does not fit", body: "A small-cap mandate may pay €80-150K of success fee. A full IB team can cost €40-60K per month. The mid-cap staffing model does not translate." },
          { title: "Junior execution work still matters", body: "Sourcing, document collection, buyer research, comps, workshop prep, first drafts: this work drives process quality, but is hard to monetize on small deals." },
          { title: "The banker must remain in control", body: "Commercial judgment, owner relationship, negotiation and final decisions stay human. The project targets production, not authority." },
        ],
      },
      method: {
        eyebrow: "What the POC really tested",
        title: "Before automating a mandate, the craft had to become a system.",
        lead:
          "The core value of Epoch Associés is not AI in itself. It is the formalization of a largely tacit M&A process: what data to request, which sources to trust, what deliverable to produce, when to block, when to escalate, and which decisions must remain human.",
        cards: [
          {
            title: "Tacit → explicit",
            body: "Turn deal craft into inputs, outputs, quality criteria and review points. Without that layer, the system produces text; with it, it becomes auditable.",
          },
          {
            title: "Production → blocking",
            body: "A module should not only generate a pitch, datapack or buyer list. It must also refuse output when sources, valuation or buyer rationale are too weak.",
          },
          {
            title: "Correction → memory",
            body: "A banker correction should not remain a one-off edit. It should be captured, classified and reused to harden the relevant module on the next deal.",
          },
        ],
      },
      built: {
        eyebrow: "What was built",
        title: "An AI-assisted module chain, not a chatbot.",
        lead:
          "AI is explicit, but constrained. Epoch Associés was designed as a chain of modules: each module receives data, produces a deliverable, and goes through human validation. The important point is the decomposition of the M&A process, not a promise of automatic generation.",
        cards: [
          { label: "Prospects", value: "500K records", body: "Prospect and announcement base structured from portals and French open data." },
          { label: "Buyers", value: "7M records", body: "French acquirer database with financial facts and deterministic matching." },
          { label: "Deal modules", value: "Pitch -> IM", body: "Pitch, workshop, datapack, business plan, valuation, buyer matching, IM drafting." },
          { label: "Control plane", value: "HITL", body: "Cockpit, runs API, runner, review queues, and No Send Ever." },
        ],
      },
      architecture: {
        eyebrow: "Architecture",
        title: "Every component maps to a concrete deal risk.",
        lead:
          "Cross-deal leakage, hallucinated figures, API cost, untraceable sources, premature emails: technical choices are not decorative. They follow from M&A constraints.",
      },
      pipeline: {
        eyebrow: "Pipeline",
        title: "The real scope stops at the memorandum. Closing remains with the banker.",
        lead:
          "The modules cover origination, pre-mandate work and deliverable production up to the IM. Post-IM stages exist mostly as specs or partial components and should not be presented as an autonomous closing process.",
      },
      control: {
        eyebrow: "Human control",
        title: "The central guardrail: no external output without review.",
        lead:
          "The cockpit is what makes the system operable. Agents prepare; the banker approves, edits or rejects. The correction then becomes durable signal for the relevant module.",
        steps: [
          { title: "Agent produces", body: "analysis, draft, restatement or recommendation" },
          { title: "Output enters queue", body: "artifact visible in the Analyst cockpit" },
          { title: "Banker decides", body: "approve, edit, reject; never auto-send" },
          { title: "Correction is routed", body: "memory, skill or module backlog" },
        ],
      },
      proof: {
        eyebrow: "Example deliverable",
        title: "Project Atlas shows the intent; it should not hide the POC limits.",
        lead:
          "Atlas is synthetic and calibrated small-cap. It makes the desired output visible: public research, valuation, acquirers, industrial logic. It is not a substitute for production proof on a real mandate.",
        caveat:
          "Important point: recent pitch audits show the chain can still produce a non-send document. The right lesson is not to polish the PDF, but to block export when quality gates fail.",
      },
      limits: {
        eyebrow: "Current limits",
        title: "The POC is useful to understand the system. It is not yet a sellable M&A product as-is.",
        lead:
          "That is exactly why this portfolio exists: to show the structuring work, not to pretend the system already replaced a deal team.",
        items: [
          { title: "Deliverable quality", body: "Some generated pitches do not meet banking standards. Source, buyer and valuation gates need to block earlier." },
          { title: "Buyer list", body: "The database is real, but a client-grade buyer list still requires supervision on capacity, acquisition rationale and sector relevance." },
          { title: "Valuation", body: "The multi-method architecture exists; robust proof on real deals remains partial." },
          { title: "Downstream modules", body: "IM, email intelligence and post-IM should not be described as fully productized." },
        ],
      },
      contact: {
        eyebrow: "Contact",
        title: "Discuss the project, French small-cap M&A, or an opportunity.",
        lead:
          "I am applying to M&A roles and can discuss both the deal logic and the product structuring work behind Epoch Associés.",
        email: "Email",
        linkedin: "LinkedIn",
        pdf: "Presentation PDF",
        decisions: "Technical decisions",
        operatorLink: "See operator page",
        bankerLink: "See M&A page",
      },
    },
  },
  operator: {
    fr: {
      nav: [
        { id: "problem", label: "Défi" },
        { id: "built", label: "Système" },
        { id: "architecture", label: "Architecture" },
        { id: "pipeline", label: "Exécution" },
        { id: "control", label: "Contrôle" },
        { id: "valuation", label: "Méthode" },
        { id: "proof", label: "Preuve" },
        { id: "limits", label: "Limites" },
        { id: "contact", label: "Contact" },
      ],
      hero: {
        eyebrow: "Portfolio opérateur",
        title: "Epoch Associés : tester l'automatisation d'un processus expert.",
        lead:
          "Epoch Associés est le projet sur lequel nous avons travaillé pour formaliser une partie de l'exécution M&A small-cap. Les POC n'ont pas encore livré la qualité finale attendue, mais ils montrent le travail produit : décomposer un processus tacite, écrire les contrats, construire les boucles de validation et identifier les vrais points de rupture.",
        note:
          "Lecture opérateur : ce projet démontre ma capacité à structurer un problème dense, aligner métier et technique, et garder une ligne honnête entre preuve, dette et promesse.",
        primary: "Voir la structure",
        secondary: "Page M&A",
      },
      facts: [
        { label: "Problème", value: "processus expert", detail: "beaucoup de savoir tacite, peu de processus écrit" },
        { label: "Travail", value: "décomposition", detail: "modules, entrées/sorties, statuts, garde-fous, feedback" },
        { label: "Contraintes", value: "qualité + vérité", detail: "pas de chiffre inventé, pas de sortie sans validation" },
        { label: "Résultat", value: "Projet en pause", detail: "utile, imparfait, riche en apprentissages" },
      ],
      problem: {
        eyebrow: "Défi produit",
        title: "Le sujet n'était pas de coder vite. Il fallait d'abord rendre le métier explicite.",
        lead:
          "L'exécution M&A repose sur des centaines de micro-décisions : quoi demander, quoi croire, quoi ignorer, quoi escalader, quoi envoyer. Sans décomposition, l'IA produit du texte. Avec décomposition, on peut commencer à produire un système.",
        cards: [
          { title: "Tacite → explicite", body: "Transformer des gestes métier en entrées, sorties, critères de qualité et points de validation." },
          { title: "Production → contrôle", body: "Ne pas seulement générer un livrable, mais savoir quand il doit être bloqué." },
          { title: "Feedback → mémoire", body: "Faire en sorte qu'une correction banquier devienne un signal durable, pas une retouche ponctuelle." },
        ],
      },
      built: {
        eyebrow: "Système construit",
        title: "La valeur du projet est dans la structure autant que dans les livrables.",
        lead:
          "Même quand un livrable final n'atteint pas le niveau attendu, le système révèle les interfaces à construire : sources, garde-fous, files HITL, livrables, statuts et décisions d'architecture.",
        cards: [
          { label: "Périmètre", value: "12+2", body: "Découpage d'un processus sell-side en 12 étapes et 2 couches transversales." },
          { label: "Data", value: "500K+7M fiches", body: "Prospects et acquéreurs pour rendre les modules moins dépendants d'une conversation." },
          { label: "Contrôle", value: "HITL", body: "File de revue, décision humaine, correction routée vers le système." },
          { label: "Fiabilité", value: "garde-fous", body: "Le système doit apprendre à refuser la sortie, pas seulement à produire." },
        ],
      },
      architecture: {
        eyebrow: "Architecture",
        title: "Les choix techniques suivent les risques métier.",
        lead:
          "Isolation par dossier, traçabilité des sources, RAG hybride, rendu HTML, cockpit de validation : chaque choix correspond à une contrainte opérationnelle, pas à une préférence de stack.",
      },
      pipeline: {
        eyebrow: "Exécution",
        title: "Le chantier a surtout clarifié où le système casse.",
        lead:
          "C'est un résultat important : distinguer ce qui tourne, ce qui est en test, ce qui relève de la spécification et ce qui doit être bloqué avant de toucher un client.",
      },
      control: {
        eyebrow: "Contrôle",
        title: "La boucle HITL est le produit, pas une annexe.",
        lead:
          "Un système d'exécution expert n'est pas seulement un pipeline. C'est un mécanisme pour capter les corrections, les router au bon endroit et améliorer le dossier suivant.",
        steps: [
          { title: "Production", body: "un module génère un artefact" },
          { title: "Validation", body: "un humain tranche dans le cockpit" },
          { title: "Routage", body: "la correction rejoint mémoire, règle métier ou backlog" },
          { title: "Amélioration", body: "le prochain run hérite du signal" },
        ],
      },
      proof: {
        eyebrow: "Preuve par l'échec utile",
        title: "Un POC imparfait peut être très informatif s'il révèle les bons garde-fous.",
        lead:
          "Les audits récents ont montré que générer un document ne suffit pas. Il faut une mécanique de refus : sources insuffisantes, liste acquéreurs faible, valorisation incomplète, formulation générique.",
        caveat:
          "C'est aussi le point de ce portfolio : montrer comment je raisonne sur un système complexe quand la première version ne livre pas la qualité attendue.",
      },
      limits: {
        eyebrow: "Limites",
        title: "Ce que je ne veux pas sur-vendre.",
        lead:
          "Le projet est un socle sérieux, pas un produit final. La valeur pour un recruteur est dans la clarté du diagnostic, la structuration et la capacité à apprendre vite.",
        items: [
          { title: "Qualité finale", body: "Le niveau bancaire n'est pas constant. Les garde-fous doivent devenir plus stricts." },
          { title: "Coordination modules", body: "Les contrats entre modules restent à durcir pour éviter les livrables incohérents." },
          { title: "Expérience utilisateur", body: "Le cockpit existe, mais la preuve live complète reste partielle." },
          { title: "Priorisation", body: "Le prochain chantier serait moins de génération, plus de blocage qualité et d'observabilité." },
        ],
      },
      contact: {
        eyebrow: "Contact",
        title: "Discuter produit, opérations ou M&A.",
        lead:
          "Je peux détailler la méthode de décomposition, les décisions, les erreurs et les apprentissages du projet Epoch Associés.",
        email: "Email",
        linkedin: "LinkedIn",
        pdf: "PDF de présentation",
        decisions: "Décisions techniques",
        operatorLink: "Voir la page opérateur",
        bankerLink: "Voir la page M&A",
      },
    },
    en: {
      nav: [
        { id: "problem", label: "Challenge" },
        { id: "built", label: "System" },
        { id: "architecture", label: "Architecture" },
        { id: "pipeline", label: "Delivery" },
        { id: "control", label: "Control" },
        { id: "valuation", label: "Method" },
        { id: "proof", label: "Proof" },
        { id: "limits", label: "Limits" },
        { id: "contact", label: "Contact" },
      ],
      hero: {
        eyebrow: "Operator portfolio",
        title: "Epoch Associés: testing automation on an expert process.",
        lead:
          "Epoch Associés is the project where we worked on formalizing part of French small-cap M&A execution. The POCs do not yet deliver the expected final quality, but they show the product work: decomposing a tacit process, writing contracts, building validation loops and identifying real failure points.",
        note:
          "Operator reading: this project demonstrates my ability to structure a dense problem, align domain and technical work, and keep a clear line between proof, debt and promise.",
        primary: "See the structure",
        secondary: "M&A page",
      },
      facts: [
        { label: "Problem", value: "expert process", detail: "much tacit knowledge, little written process" },
        { label: "Work", value: "decomposition", detail: "modules, I/O, statuses, gates, feedback" },
        { label: "Constraints", value: "quality + truth", detail: "no invented figures, no unreviewed output" },
        { label: "Result", value: "Project on hold", detail: "useful, imperfect, rich in learnings" },
      ],
      problem: {
        eyebrow: "Product challenge",
        title: "The task was not to code fast. It was to make the craft explicit first.",
        lead:
          "M&A execution involves hundreds of micro-decisions: what to ask, what to trust, what to ignore, what to escalate, what to send. Without decomposition, AI produces text. With decomposition, you can start building a system.",
        cards: [
          { title: "Tacit → explicit", body: "Turn domain gestures into inputs, outputs, quality criteria and validation points." },
          { title: "Production → control", body: "Do not only generate a deliverable; know when it must be blocked." },
          { title: "Feedback → memory", body: "Make a banker correction durable signal, not a one-off edit." },
        ],
      },
      built: {
        eyebrow: "System built",
        title: "The value is in the structure as much as the outputs.",
        lead:
          "Even when a final deliverable falls short, the system reveals the interfaces to build: sources, gates, HITL queues, artifacts, statuses and decisions.",
        cards: [
          { label: "Scope", value: "12+2", body: "A sell-side process decomposed into 12 stages and 2 cross-cutting layers." },
          { label: "Data", value: "500K+7M records", body: "Prospects and buyer DB to move beyond conversation-only context." },
          { label: "Control", value: "HITL", body: "Review queue, human decision, correction routed back to the system." },
          { label: "Truth", value: "gates", body: "The system must learn to refuse output, not only produce it." },
        ],
      },
      architecture: {
        eyebrow: "Architecture",
        title: "Technical choices follow business risks.",
        lead:
          "Deal isolation, source lineage, hybrid RAG, HTML rendering, review cockpit: each choice maps to an operational constraint, not stack preference.",
      },
      pipeline: {
        eyebrow: "Delivery",
        title: "The project mostly clarified where the system breaks.",
        lead:
          "That is a useful result: separate what runs, what is in test, what is specification, and what must be blocked before a client sees it.",
      },
      control: {
        eyebrow: "Control",
        title: "The HITL loop is the product, not an appendix.",
        lead:
          "An expert execution system is not only a pipeline. It is a mechanism to capture corrections, route them to the right place and make the next file better.",
        steps: [
          { title: "Production", body: "a module generates an artifact" },
          { title: "Validation", body: "a human decides in the cockpit" },
          { title: "Routing", body: "the correction reaches memory, skill or backlog" },
          { title: "Improvement", body: "the next run inherits the signal" },
        ],
      },
      proof: {
        eyebrow: "Proof through useful failure",
        title: "An imperfect POC can be informative if it reveals the right gates.",
        lead:
          "Recent audits showed that generating a document is not enough. The system needs refusal mechanics: insufficient sources, weak buyer list, incomplete valuation, generic wording.",
        caveat:
          "This is also the point of the portfolio: show how I reason about a complex system when the first version does not deliver the expected quality.",
      },
      limits: {
        eyebrow: "Limits",
        title: "What I do not want to over-sell.",
        lead:
          "The project is a serious foundation, not a final product. The value for a recruiter is in diagnosis, structuring and learning speed.",
        items: [
          { title: "Final quality", body: "Banker-grade quality is not consistent. Gates need to become stricter." },
          { title: "Module coordination", body: "Inter-module contracts must be hardened to avoid incoherent outputs." },
          { title: "User experience", body: "The cockpit exists, but full live proof remains partial." },
          { title: "Prioritization", body: "The next wave should be less generation, more quality blocking and observability." },
        ],
      },
      contact: {
        eyebrow: "Contact",
        title: "Discuss product, operations or M&A.",
        lead:
          "I can walk through the decomposition method, decisions, mistakes and learnings from Epoch Associés.",
        email: "Email",
        linkedin: "LinkedIn",
        pdf: "Presentation PDF",
        decisions: "Technical decisions",
        operatorLink: "See operator page",
        bankerLink: "See M&A page",
      },
    },
  },
};

export function PageContent({ audience = "banker" }: PageContentProps) {
  const lang = useLangStore((s) => s.lang);
  const c = getContent(lang);
  const t = copy[audience][lang];
  const isOperator = audience === "operator";

  return (
    <div className={styles.page}>
      <Navigation sections={t.nav} />
      <SectionObserver ids={t.nav.map((s) => s.id)} />

      <main>
        <section className={`${styles.section} ${styles.hero}`} id="top">
          <div className={styles.container}>
            <Reveal>
              <div className={styles.heroGrid}>
                <div>
                  <p className={styles.eyebrow}>{t.hero.eyebrow}</p>
                  <h1 className={styles.heroTitle}>{t.hero.title}</h1>
                  <p className={styles.heroLead}>{t.hero.lead}</p>
                  <p className={styles.heroNote}>{t.hero.note}</p>
                  <div className={styles.heroActions}>
                    <a href="#architecture">{t.hero.primary}</a>
                    <a href="/portfolio/portfolio-technique-epoch.pdf" download>
                      {t.contact.pdf}
                    </a>
                    <Link href={isOperator ? "/" : "/operator"}>
                      {isOperator ? t.contact.bankerLink : t.hero.secondary}
                    </Link>
                  </div>
                </div>
                <div className={styles.factPanel}>
                  {t.facts.map((fact) => (
                    <article key={fact.label}>
                      <span>{fact.label}</span>
                      <strong>{fact.value}</strong>
                      <p>{fact.detail}</p>
                    </article>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.section} id="problem">
          <div className={styles.container}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>{t.problem.eyebrow}</p>
                <h2 className={styles.sectionTitle}>{t.problem.title}</h2>
                <p className={styles.sectionLead}>{t.problem.lead}</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className={styles.cardGrid}>
                {t.problem.cards.map((card) => (
                  <article key={card.title} className={styles.textCard}>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </article>
                ))}
              </div>
            </Reveal>
            {t.method && (
              <Reveal delay={140}>
                <div className={styles.methodPanel}>
                  <div className={styles.methodHeader}>
                    <p className={styles.eyebrow}>{t.method.eyebrow}</p>
                    <h3>{t.method.title}</h3>
                    <p>{t.method.lead}</p>
                  </div>
                  <div className={styles.methodGrid}>
                    {t.method.cards.map((card) => (
                      <article key={card.title} className={styles.methodCard}>
                        <h4>{card.title}</h4>
                        <p>{card.body}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
            <Reveal delay={180}>
              <ExecutionBlueprint lang={lang} audience={audience} />
            </Reveal>
          </div>
        </section>

        <section className={`${styles.section} ${styles.band}`} id="built">
          <div className={styles.container}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>{t.built.eyebrow}</p>
                <h2 className={styles.sectionTitle}>{t.built.title}</h2>
                <p className={styles.sectionLead}>{t.built.lead}</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className={styles.metricGrid}>
                {t.built.cards.map((card) => (
                  <article key={card.label} className={styles.metricCard}>
                    <span>{card.label}</span>
                    <strong>{card.value}</strong>
                    <p>{card.body}</p>
                  </article>
                ))}
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className={styles.statusWrap}>
                <POCStatus stages={c.pipelineStages} crossCutting={c.crossCuttingLayers} lang={lang} />
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.section} id="architecture">
          <div className={styles.container}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>{t.architecture.eyebrow}</p>
                <h2 className={styles.sectionTitle}>{t.architecture.title}</h2>
                <p className={styles.sectionLead}>{t.architecture.lead}</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <ArchitectureExplorer nodes={c.infraNodes} guardrails={c.guardrails} modules={c.pipelineStages} lang={lang} />
            </Reveal>
          </div>
        </section>

        <section className={styles.section} id="pipeline">
          <div className={styles.container}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>{t.pipeline.eyebrow}</p>
                <h2 className={styles.sectionTitle}>{t.pipeline.title}</h2>
                <p className={styles.sectionLead}>{t.pipeline.lead}</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <DeliveryMap stages={c.pipelineStages} crossCutting={c.crossCuttingLayers} lang={lang} />
            </Reveal>
            <Reveal delay={140}>
              <DealPipeline stages={c.pipelineStages} />
            </Reveal>
          </div>
        </section>

        <section className={`${styles.section} ${styles.band}`} id="control">
          <div className={styles.container}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>{t.control.eyebrow}</p>
                <h2 className={styles.sectionTitle}>{t.control.title}</h2>
                <p className={styles.sectionLead}>{t.control.lead}</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className={styles.processGrid}>
                {t.control.steps.map((step) => (
                  <article key={step.title}>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </article>
                ))}
              </div>
            </Reveal>
            <Reveal delay={140}>
              <CockpitMockup lang={lang} />
            </Reveal>
          </div>
        </section>

        <section className={styles.section} id="valuation">
          <div className={styles.container}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>{lang === "fr" ? "Méthode de valorisation" : "Valuation method"}</p>
                <h2 className={styles.sectionTitle}>
                  {lang === "fr"
                    ? "Trois méthodes prévues; le banquier garde l'arbitrage."
                    : "Three intended methods; the banker keeps the judgment."}
                </h2>
                <p className={styles.sectionLead}>
                  {lang === "fr"
                    ? "La valorisation illustre la philosophie du projet: transactions comparables comme ancre, trading comparables comme contrôle, LBO comme test de prix. Le système calcule et trace; il ne conclut pas seul."
                    : "Valuation illustrates the project philosophy: transaction comps as anchor, trading comps as control, LBO as price test. The system calculates and traces; it does not decide alone."}
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}><FootballField /></Reveal>
          </div>
        </section>

        <section className={styles.section} id="proof">
          <div className={styles.container}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>{t.proof.eyebrow}</p>
                <h2 className={styles.sectionTitle}>{t.proof.title}</h2>
                <p className={styles.sectionLead}>{t.proof.lead}</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className={styles.proofGrid}>
                <PitchShowcase />
                <aside className={styles.caveatBox}>
                  <h3>{lang === "fr" ? "Lecture honnête" : "Honest reading"}</h3>
                  <p>{t.proof.caveat}</p>
                </aside>
              </div>
            </Reveal>
          </div>
        </section>

        <section className={`${styles.section} ${styles.band}`} id="limits">
          <div className={styles.container}>
            <Reveal>
              <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>{t.limits.eyebrow}</p>
                <h2 className={styles.sectionTitle}>{t.limits.title}</h2>
                <p className={styles.sectionLead}>{t.limits.lead}</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className={styles.limitGrid}>
                {t.limits.items.map((item, i) => (
                  <article key={item.title} className={styles.limitCard}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.section} id="contact">
          <div className={styles.container}>
            <Reveal>
              <div className={styles.contactPanel}>
                <div>
                  <p className={styles.eyebrow}>{t.contact.eyebrow}</p>
                  <h2>{t.contact.title}</h2>
                  <p>{t.contact.lead}</p>
                </div>
                <div className={styles.contactLinks}>
                  <a href="mailto:julien@jbouix.com">{t.contact.email}</a>
                  <a href="https://www.linkedin.com/in/julien-bouix/" target="_blank" rel="noopener noreferrer">{t.contact.linkedin}</a>
                  <a href="/portfolio/portfolio-technique-epoch.pdf" download>{t.contact.pdf}</a>
                  <Link href="/decisions">{t.contact.decisions}</Link>
                  <Link href={isOperator ? "/" : "/operator"}>
                    {isOperator ? t.contact.bankerLink : t.contact.operatorLink}
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
