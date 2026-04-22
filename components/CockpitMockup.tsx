"use client";

import styles from "./CockpitMockup.module.css";

type QueueItem = {
  id: string;
  deal: string;
  module: string;
  type: string;
  timestamp: string;
  status: "pending" | "reviewing";
  selected?: boolean;
};

type CitationLine = { figure: string; source: string; reliability: "certified" | "declarative" | "estimated" | "public_web" };

type CockpitMockupProps = {
  lang: "en" | "fr";
};

const reliabilityLabel = {
  en: { certified: "Certified", declarative: "Declarative", estimated: "Estimated", public_web: "Public web" },
  fr: { certified: "Certifié", declarative: "Déclaratif", estimated: "Estimé", public_web: "Web public" }
};

export function CockpitMockup({ lang }: CockpitMockupProps) {
  const t = lang === "fr"
    ? {
        tab: "Analyste — file HITL",
        urlbar: "cockpit.epoch.local / deals / analyst",
        headerCount: "4 éléments en attente",
        headerRule: "Rien ne part sans votre validation",
        columns: { deal: "Dossier", module: "Module", type: "Sortie", ago: "Il y a", action: "Action" },
        previewTitle: "Projet Héphaïstos · Datapack financier · retraitement #3",
        previewLead: "EBITDA retraité 2023 : 1,24 M€ — vs 1,18 M€ en comptes audités. Écart dû à la réintégration des frais management (+42K€) et au retraitement CVAE (+19K€).",
        citations: [
          { figure: "EBITDA 2023 comptes : 1 182 K€", source: "liasse_fiscale_2023.pdf · p.4 · formulaire 2052 · ligne FR", reliability: "certified" as const },
          { figure: "Frais management à réintégrer : 42 K€", source: "FEC_2023.xlsx · cell G487 · comptes 6226", reliability: "certified" as const },
          { figure: "CVAE 2024 — phase-out : +19 K€", source: "workshop_2026-04-10.pdf · §3.2 — direction", reliability: "declarative" as const },
        ] as CitationLine[],
        approve: "Approuver",
        edit: "Modifier",
        reject: "Rejeter",
        routed: "Approuvé → écrit dans MEMORY_datapack.md"
      }
    : {
        tab: "Analyst — HITL queue",
        urlbar: "cockpit.epoch.local / deals / analyst",
        headerCount: "4 items awaiting review",
        headerRule: "Nothing ships without your sign-off",
        columns: { deal: "Deal", module: "Module", type: "Output", ago: "Age", action: "Action" },
        previewTitle: "Project Hephaestus · Financial datapack · restatement #3",
        previewLead: "Restated 2023 EBITDA: €1.24M — vs €1.18M in audited accounts. Delta = management-fee add-back (+€42K) and CVAE phase-out (+€19K).",
        citations: [
          { figure: "2023 EBITDA (accounts): 1,182K€", source: "liasse_fiscale_2023.pdf · p.4 · form 2052 · line FR", reliability: "certified" as const },
          { figure: "Management-fee add-back: 42K€", source: "FEC_2023.xlsx · cell G487 · accounts 6226", reliability: "certified" as const },
          { figure: "CVAE 2024 phase-out: +19K€", source: "workshop_2026-04-10.pdf · §3.2 — mgmt", reliability: "declarative" as const },
        ] as CitationLine[],
        approve: "Approve",
        edit: "Edit",
        reject: "Reject",
        routed: "Approved → written to MEMORY_datapack.md"
      };

  const queue: QueueItem[] = [
    { id: "1", deal: "Héphaïstos", module: "Datapack", type: lang === "fr" ? "Retraitement EBITDA" : "EBITDA restatement", timestamp: "2m", status: "reviewing", selected: true },
    { id: "2", deal: "Apollon", module: "Valo", type: lang === "fr" ? "Fourchette transac." : "Transaction range", timestamp: "14m", status: "pending" },
    { id: "3", deal: "Athéna", module: "Buyer match", type: lang === "fr" ? "Short-list 24 PE" : "24-PE shortlist", timestamp: "32m", status: "pending" },
    { id: "4", deal: "Déméter", module: "IM", type: lang === "fr" ? "Brouillon §Hidden Value" : "Draft §Hidden Value", timestamp: "1h", status: "pending" },
  ];

  return (
    <div className={styles.shell}>
      <div className={styles.chrome}>
        <div className={styles.dots}><i /><i /><i /></div>
        <span className={styles.urlbar}>{t.urlbar}</span>
        <span className={styles.tabLabel}>{t.tab}</span>
      </div>

      <div className={styles.body}>
        <div className={styles.leftPane}>
          <div className={styles.header}>
            <strong>{t.headerCount}</strong>
            <span>{t.headerRule}</span>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t.columns.deal}</th>
                <th>{t.columns.module}</th>
                <th>{t.columns.type}</th>
                <th>{t.columns.ago}</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((q) => (
                <tr key={q.id} className={q.selected ? styles.rowSelected : undefined}>
                  <td className={styles.cellDeal}>{q.deal}</td>
                  <td>{q.module}</td>
                  <td className={styles.cellType}>{q.type}</td>
                  <td className={styles.cellAge}>
                    <span className={`${styles.statusDot} ${q.status === "reviewing" ? styles.statusReviewing : styles.statusPending}`} />
                    {q.timestamp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.rightPane}>
          <div className={styles.preview}>
            <span className={styles.previewTag}>{lang === "fr" ? "En revue" : "In review"}</span>
            <h4 className={styles.previewTitle}>{t.previewTitle}</h4>
            <p className={styles.previewLead}>{t.previewLead}</p>

            <div className={styles.citations}>
              {t.citations.map((c, i) => (
                <div key={i} className={styles.citation}>
                  <div className={styles.citationHead}>
                    <span className={styles.citationFigure}>{c.figure}</span>
                    <span className={`${styles.pill} ${styles[`pill_${c.reliability}`]}`}>
                      {reliabilityLabel[lang][c.reliability]}
                    </span>
                  </div>
                  <code className={styles.citationSource}>{c.source}</code>
                </div>
              ))}
            </div>

            <div className={styles.actions}>
              <button type="button" className={`${styles.btn} ${styles.btnApprove}`}>✓ {t.approve}</button>
              <button type="button" className={styles.btn}>{t.edit}</button>
              <button type="button" className={`${styles.btn} ${styles.btnReject}`}>{t.reject}</button>
            </div>

            <div className={styles.routed}>→ {t.routed}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
