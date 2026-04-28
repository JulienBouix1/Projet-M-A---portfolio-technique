"use client";

import type { PipelineStage, CrossCuttingLayer } from "@/lib/site-content";
import styles from "./POCStatus.module.css";

type POCStatusProps = {
  stages: PipelineStage[];
  crossCutting: CrossCuttingLayer[];
  lang: "en" | "fr";
};

export function POCStatus({ stages, crossCutting, lang }: POCStatusProps) {
  const all = [...stages, ...crossCutting];
  const live = all.filter((x) => x.status === "live").length;
  const testing = all.filter((x) => x.status === "testing").length;
  const spec = all.filter((x) => x.status === "spec").length;
  const total = all.length;

  const t = lang === "fr"
    ? {
        tag: "Statut du POC · avril 2026",
        live: "Live",
        testing: "En test",
        spec: "Spec",
        total: "éléments cartographiés",
        honest: "Statut revu manuellement : les modules en test ou en spécification ne sont pas présentés comme live."
      }
    : {
        tag: "POC status · April 2026",
        live: "Live",
        testing: "In test",
        spec: "Spec",
        total: "mapped elements",
        honest: "Status reviewed manually: modules in test or specification are not presented as live."
      };

  return (
    <div className={styles.shell}>
      <div className={styles.head}>
        <span className={styles.tag}>{t.tag}</span>
        <span className={styles.total}>
          <strong>{total}</strong> {t.total}
        </span>
      </div>
      <div className={styles.grid}>
        <div className={`${styles.cell} ${styles.cellLive}`}>
          <span className={styles.cellNum}>{live}</span>
          <span className={styles.cellLabel}>{t.live}</span>
        </div>
        <div className={`${styles.cell} ${styles.cellTesting}`}>
          <span className={styles.cellNum}>{testing}</span>
          <span className={styles.cellLabel}>{t.testing}</span>
        </div>
        <div className={`${styles.cell} ${styles.cellSpec}`}>
          <span className={styles.cellNum}>{spec}</span>
          <span className={styles.cellLabel}>{t.spec}</span>
        </div>
      </div>
      <p className={styles.honest}>{t.honest}</p>
    </div>
  );
}
