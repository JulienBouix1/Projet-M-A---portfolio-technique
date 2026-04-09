"use client";

import { startTransition, useState } from "react";

import { showcaseSlides } from "@/lib/site-content";

import styles from "./PitchShowcase.module.css";

function CoverSlide() {
  return (
    <div className={styles.slideContent}>
      <div className={styles.coverLayout}>
        <span className={styles.micro}>STRICTEMENT CONFIDENTIEL</span>
        <h3 className={styles.coverTitle}>MEDADOM</h3>
        <p className={styles.coverSub}>Présentation confidentielle — HealthTech / Télémédecine</p>
        <div className={styles.coverFooter}>
          <span>EPOCH ASSOCIÉS — Paris</span>
          <span>01</span>
        </div>
      </div>
    </div>
  );
}

function CompsSlide() {
  const comps = [
    { cible: "Doctolib", secteur: "HealthTech", ev: "5.8 Md€", multiple: "25.0x", annee: "2022" },
    { cible: "Qare (HealthHero)", secteur: "Télémédecine", ev: "300 M€", multiple: "12.0x", annee: "2021" },
    { cible: "Livi (KRY)", secteur: "Télémédecine", ev: "200 M€", multiple: "8.0x", annee: "2020" },
    { cible: "Hellocare", secteur: "Télémédecine", ev: "50 M€", multiple: "6.5x", annee: "2022" },
    { cible: "MesDocteurs", secteur: "Télémédecine", ev: "35 M€", multiple: "5.0x", annee: "2021" },
    { cible: "Tessan", secteur: "Téléconsultation", ev: "25 M€", multiple: "4.0x", annee: "2023" }
  ];

  return (
    <div className={styles.slideContent}>
      <span className={styles.micro}>Transactions comparables récentes</span>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Cible</th>
              <th>Secteur</th>
              <th>EV</th>
              <th>EV/CA</th>
              <th>Année</th>
            </tr>
          </thead>
          <tbody>
            {comps.map((row) => (
              <tr key={row.cible}>
                <td className={styles.cellBold}>{row.cible}</td>
                <td>{row.secteur}</td>
                <td>{row.ev}</td>
                <td className={styles.cellGold}>{row.multiple}</td>
                <td>{row.annee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={styles.tableFootnote}>Médiane : 8.5x EV/CA sur 6 transactions</p>
    </div>
  );
}

function ValoSlide() {
  const ranges = [
    { label: "Standalone", value: "225 M€", multiple: "5.0x CA", note: "Valorisation conservatrice" },
    { label: "Marché", value: "380 M€", multiple: "8.5x CA", note: "Transactions comparables", highlight: true },
    { label: "Premium", value: "675 M€", multiple: "15.0x CA", note: "Scénario compétitif" }
  ];

  return (
    <div className={styles.slideContent}>
      <span className={styles.micro}>Fourchette de valorisation</span>
      <div className={styles.valoGrid}>
        {ranges.map((r) => (
          <div key={r.label} className={`${styles.valoCard} ${r.highlight ? styles.valoCardHighlight : ""}`}>
            <span className={styles.valoLabel}>{r.label}</span>
            <strong className={styles.valoValue}>{r.value}</strong>
            <span className={styles.valoMultiple}>{r.multiple}</span>
            <p>{r.note}</p>
          </div>
        ))}
      </div>
      <div className={styles.footballField}>
        <div className={styles.ffTrack}>
          <div className={styles.ffBar} style={{ left: "10%", width: "80%" }}>
            <span className={styles.ffMarker} style={{ left: "0%" }} />
            <span className={styles.ffMarker} style={{ left: "40%" }} />
            <span className={styles.ffMarker} style={{ left: "100%" }} />
          </div>
        </div>
        <div className={styles.ffLabels}>
          <span>225 M€</span>
          <span>380 M€</span>
          <span>675 M€</span>
        </div>
      </div>
    </div>
  );
}

function BuyersSlide() {
  const buyers = [
    { name: "Doctolib", type: "HealthTech", logique: "Consolidation — leader téléconsultation", prio: 3 },
    { name: "Cegedim", type: "Health IT", logique: "Diversification — canal télémédecine", prio: 2 },
    { name: "Cerballiance", type: "Biologie médicale", logique: "Build-up santé — extension digitale", prio: 2 },
    { name: "Bridgepoint", type: "PE — Healthcare", logique: "Plateforme PE healthcare", prio: 2 },
    { name: "EQT", type: "PE — Tech/Healthcare", logique: "Build-up européen cross-border", prio: 2 },
    { name: "Ramsay Santé", type: "Hospitalier", logique: "Intégration verticale — parcours digital", prio: 1 }
  ];

  return (
    <div className={styles.slideContent}>
      <span className={styles.micro}>Acquéreurs prioritaires</span>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Acquéreur</th>
              <th>Secteur</th>
              <th>Logique</th>
              <th>Priorité</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((row) => (
              <tr key={row.name}>
                <td className={styles.cellBold}>{row.name}</td>
                <td>{row.type}</td>
                <td>{row.logique}</td>
                <td className={styles.cellGold}>{"★".repeat(row.prio)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const slideComponents: Record<string, React.FC> = {
  cover: CoverSlide,
  comps: CompsSlide,
  valo: ValoSlide,
  buyers: BuyersSlide
};

export function PitchShowcase() {
  const [activeId, setActiveId] = useState("valo");
  const ActiveSlide = slideComponents[activeId] ?? ValoSlide;

  return (
    <div className={styles.shell}>
      <div className={styles.tabs}>
        {showcaseSlides.map((slide) => (
          <button
            key={slide.id}
            type="button"
            className={`${styles.tab} ${activeId === slide.id ? styles.tabActive : ""}`}
            onClick={() => startTransition(() => setActiveId(slide.id))}
          >
            <span>{slide.label}</span>
            <strong>{slide.title}</strong>
          </button>
        ))}
      </div>

      <div className={styles.preview}>
        <div className={styles.previewChrome}>
          <div className={styles.chromeDots}>
            <i />
            <i />
            <i />
          </div>
          <span>pitch_medadom.pptx — 24 slides</span>
        </div>

        <ActiveSlide />

        <div className={styles.previewFooter}>
          <span className={styles.badge}>100% AI-generated</span>
          <span className={styles.footerNote}>Données fictives — pitch de démonstration</span>
        </div>
      </div>
    </div>
  );
}
