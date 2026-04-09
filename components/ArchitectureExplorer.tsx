"use client";

import { startTransition, useMemo, useState } from "react";

import type { Guardrail, InfraNode, PipelineStage } from "@/lib/site-content";

import styles from "./ArchitectureExplorer.module.css";

type ArchitectureExplorerProps = {
  nodes: InfraNode[];
  guardrails: Guardrail[];
  modules: PipelineStage[];
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

const STATUS_LABELS: Record<string, string> = {
  live: "LIVE",
  testing: "IN TEST",
  spec: "SPEC"
};

export function ArchitectureExplorer({ nodes, guardrails, modules }: ArchitectureExplorerProps) {
  const [focusedId, setFocusedId] = useState<string | null>(null);

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
        <span className={styles.layerTag}>Infrastructure Layer</span>
        <p className={styles.layerHint}>
          Click any component to see what it does, why M&A needs it, and which modules depend on it.
        </p>
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
          <div className={styles.loupeInner}>
            <div className={styles.loupeTech}>
              <span className={styles.loupeLabel}>Technical</span>
              <h4>{focusedNode.label}</h4>
              <p>{focusedNode.techDetail}</p>
              <ul className={styles.specList}>
                {focusedNode.techSpecs.map((spec) => (
                  <li key={spec}>{spec}</li>
                ))}
              </ul>
            </div>

            <div className={styles.loupeDivider}>
              <span>Why M&A needs this</span>
            </div>

            <div className={styles.loupeBusiness}>
              <span className={styles.loupeLabel}>Business rationale</span>
              <p>{focusedNode.maReason}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Module layer (pipeline modules) ──────────── */}
      <div className={styles.moduleLayer}>
        <div className={styles.moduleLayerHeader}>
          <span className={styles.layerTag}>Module Layer</span>
          {focusedNode && (
            <span className={styles.connectionCount}>
              {focusedNode.label} connects to {connectedModuleIds.size} module{connectedModuleIds.size !== 1 ? "s" : ""}
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
                    {STATUS_LABELS[mod.status]}
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
        <span className={styles.layerTag}>Guardrail Layer</span>
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
