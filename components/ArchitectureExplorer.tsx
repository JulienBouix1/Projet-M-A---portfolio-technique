"use client";

import { startTransition, useMemo, useState } from "react";

import type { Guardrail, InfraNode, PipelineStage } from "@/lib/site-content";

import styles from "./ArchitectureExplorer.module.css";

type ArchitectureExplorerProps = {
  nodes: InfraNode[];
  guardrails: Guardrail[];
  modules: PipelineStage[];
  lang: "en" | "fr";
};

const NODE_ICONS: Record<string, string> = {
  postgresql: "PG",
  qdrant:     "QD",
  vllm:       "ML",
  openrouter: "OR",
  docling:    "DL",
  langgraph:  "LG",
  fastapi:    "FA",
  playwright: "PW",
  pptx:       "PP",
  langfuse:   "LF",
  neo4j:      "N4",
  openpyxl:   "XL"
};

const STATUS_LABELS: Record<"en" | "fr", Record<string, string>> = {
  en: {
    live: "LIVE",
    testing: "IN TEST",
    spec: "SPEC"
  },
  fr: {
    live: "LIVE",
    testing: "EN TEST",
    spec: "SPEC"
  }
};

export function ArchitectureExplorer({ nodes, guardrails, modules, lang }: ArchitectureExplorerProps) {
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const t = lang === "fr"
    ? {
        infrastructure: "Couche infrastructure",
        hint: "Lecture: risque métier, brique technique, puis modules dépendants. Cliquez sur une brique pour ouvrir le détail.",
        technical: "Technique",
        business: "Rôle M&A",
        usedBy: "Utilisé par",
        module: "module",
        modules: "modules",
        moduleLayer: "Couche modules",
        connects: "connecté à",
        guardrails: "Garde-fous",
        summary: [
          {
            label: "Données",
            title: "Cloisonner les mandats",
            body: "PostgreSQL, Qdrant et Neo4j structurent les faits, les sources et la mémoire de correction."
          },
          {
            label: "Sources",
            title: "Retrouver le chiffre exact",
            body: "Recherche hybride, citations obligatoires et lineage évitent le chiffre plausible mais faux."
          },
          {
            label: "Production",
            title: "Produire des artefacts auditables",
            body: "Docling, Excel et HTML -> PDF transforment les données en livrables contrôlables."
          },
          {
            label: "Contrôle",
            title: "Bloquer avant le client",
            body: "HITL, No Send Ever, circuit breakers et observabilité empêchent la sortie automatique."
          }
        ]
      }
    : {
        infrastructure: "Infrastructure layer",
        hint: "Read this as business risk, technical component, then dependent modules. Click a component to open the detail.",
        technical: "Technical",
        business: "Why M&A needs this",
        usedBy: "Used by",
        module: "module",
        modules: "modules",
        moduleLayer: "Module layer",
        connects: "connects to",
        guardrails: "Guardrail layer",
        summary: [
          {
            label: "Data",
            title: "Isolate each mandate",
            body: "PostgreSQL, Qdrant and Neo4j structure facts, sources and correction memory."
          },
          {
            label: "Sources",
            title: "Recover the exact number",
            body: "Hybrid search, mandatory citations and lineage prevent plausible but false figures."
          },
          {
            label: "Production",
            title: "Produce auditable artifacts",
            body: "Docling, Excel and HTML -> PDF turn data into controllable deliverables."
          },
          {
            label: "Control",
            title: "Block before the client",
            body: "HITL, No Send Ever, circuit breakers and observability prevent automatic release."
          }
        ]
      };

  const focusedNode = useMemo(
    () => (focusedId ? nodes.find((n) => n.id === focusedId) ?? null : null),
    [focusedId, nodes]
  );

  const connectedModuleIds = useMemo(
    () => new Set(focusedNode?.moduleIds ?? []),
    [focusedNode]
  );

  const toggleFocus = (id: string) => {
    startTransition(() => {
      setFocusedId((prev) => (prev === id ? null : id));
    });
  };

  return (
    <div className={styles.shell}>
      {/* ── Infrastructure layer ─────────────────────── */}
      <div className={styles.layerHeader}>
        <span className={styles.layerTag}>{t.infrastructure}</span>
        <p className={styles.layerHint}>{t.hint}</p>
      </div>

      <div className={styles.summaryGrid}>
        {t.summary.map((item) => (
          <article key={item.label} className={styles.summaryCard}>
            <span>{item.label}</span>
            <strong>{item.title}</strong>
            <p>{item.body}</p>
          </article>
        ))}
      </div>

      <div className={styles.nodeGrid}>
        {nodes.map((node) => {
          const isFocused = focusedId === node.id;
          const isDimmed = focusedId !== null && !isFocused;

          return (
            <button
              key={node.id}
              type="button"
              className={`${styles.node} ${isFocused ? styles.nodeFocused : ""} ${isDimmed ? styles.nodeDimmed : ""}`}
              onClick={() => toggleFocus(node.id)}
              aria-expanded={isFocused}
            >
              <span className={styles.nodeIcon}>{NODE_ICONS[node.id] ?? "?"}</span>
              <div className={styles.nodeText}>
                <strong>{node.label}</strong>
                <span>{node.sublabel}</span>
              </div>
              {isFocused && <span className={styles.loupeIndicator} />}
            </button>
          );
        })}
      </div>

      {/* ── Loupe detail panel ───────────────────────── */}
      {focusedNode && (
        <div key={focusedNode.id} className={styles.loupe}>
          {/* Title row above both columns */}
          <div className={styles.loupeTitle}>
            <h4>{focusedNode.label}</h4>
            <span className={styles.loupeSublabel}>{focusedNode.sublabel}</span>
          </div>

          <div className={styles.loupeColumns}>
            {/* Tech side */}
            <div className={styles.loupeCol}>
              <span className={styles.loupeLabel}>{t.technical}</span>
              <p>{focusedNode.techDetail}</p>
              <ul className={styles.specList}>
                {focusedNode.techSpecs.map((spec) => (
                  <li key={spec}>{spec}</li>
                ))}
              </ul>
            </div>

            {/* Business side */}
            <div className={styles.loupeCol}>
              <span className={styles.loupeLabel}>{t.business}</span>
              <p>{focusedNode.maReason}</p>
            </div>
          </div>

          {/* Module connections */}
          <div className={styles.loupeModules}>
            <span className={styles.loupeLabel}>
              {t.usedBy} {focusedNode.moduleIds.length} {focusedNode.moduleIds.length === 1 ? t.module : t.modules}
            </span>
            <div className={styles.modulePills}>
              {focusedNode.moduleIds.map((id) => (
                <span key={id} className={styles.modulePill}>{id}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Module layer ─────────────────────────────── */}
      <div className={styles.moduleLayer}>
        <div className={styles.moduleLayerHeader}>
          <span className={styles.layerTag}>{t.moduleLayer}</span>
          {focusedNode && (
            <span className={styles.connectionCount}>
              {focusedNode.label} {t.connects} {connectedModuleIds.size} {connectedModuleIds.size === 1 ? t.module : t.modules}
            </span>
          )}
        </div>
        <div className={styles.moduleStrip}>
          {modules.map((mod) => {
            const isConnected = connectedModuleIds.has(mod.id);
            const isDimmed = focusedId !== null && !isConnected;

            return (
              <div
                key={mod.id}
                className={`${styles.moduleCard} ${isConnected ? styles.moduleCardConnected : ""} ${isDimmed ? styles.moduleCardDimmed : ""}`}
              >
                <div className={styles.moduleCardHeader}>
                  <span className={styles.moduleNumber}>{mod.number}</span>
                  <span className={`${styles.moduleStatus} ${styles[`status_${mod.status}`]}`}>
                    {STATUS_LABELS[lang][mod.status]}
                  </span>
                </div>
                <strong>{mod.title}</strong>
                {isConnected && <span className={styles.connectionDot} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Guardrail layer ──────────────────────────── */}
      <div className={styles.guardrailStrip}>
        <span className={styles.layerTag}>{t.guardrails}</span>
        <div className={styles.guardrailGrid}>
          {guardrails.map((g) => (
            <div key={g.id} className={styles.guardrailCard}>
              <strong>{g.label}</strong>
              <p>{g.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
