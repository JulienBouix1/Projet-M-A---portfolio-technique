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
        total: "modules au total",
        honest: "Statut revu manuellement. On ne gonfle pas : un banquier senior le détecterait en 10 min d'utilisation."
      }
    : {
        tag: "POC status · April 2026",
        live: "Live",
        testing: "In test",
        spec: "Spec",
        total: "modules total",
        honest: "Status reviewed by hand. No inflation — a senior banker would catch it in 10 min of poking."
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
