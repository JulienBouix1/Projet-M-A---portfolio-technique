"use client";

import { startTransition, useState } from "react";

import { showcaseSlides } from "@/lib/site-content";

import styles from "./PitchShowcase.module.css";

function CoverSlide() {
  return (
    <div className={styles.slideContent}>
      <div className={styles.coverLayout}>
        <span className={styles.micro}>STRICTEMENT CONFIDENTIEL</span>
        <h3 className={styles.coverTitle}>PROJET ATLAS</h3>
        <p className={styles.coverSub}>Présentation confidentielle — Levage & services industriels (sud-ouest France)</p>
        <div className={styles.coverFooter}>
          <span>EPOCH ASSOCIÉS — Paris</span>
          <span>01</span>
        </div>
      </div>
    </div>
  );
}

function CompsSlide() {
  // Fictive small-cap transaction comps in French industrial-services / levage.
  // Multiples are sector-realistic (4-6.5x EBITDA, 0.5-1.2x CA).
  const comps = [
    { cible: "Levage Pyrénées",        secteur: "Levage mobile",        ev: "12 M€", multiple: "5.8x",  annee: "2025" },
    { cible: "Manutention Occitanie",  secteur: "Manutention industrielle", ev: "9 M€",  multiple: "5.2x",  annee: "2024" },
    { cible: "Grues Atlantique",       secteur: "Grues & levage lourd", ev: "7 M€",  multiple: "4.8x",  annee: "2024" },
    { cible: "Nord Levage Services",   secteur: "Location + levage",    ev: "11 M€", multiple: "5.5x",  annee: "2023" },
    { cible: "Coubertin Maintenance",  secteur: "Maintenance indus.",   ev: "8 M€",  multiple: "4.6x",  annee: "2023" },
    { cible: "Levage Normandie",       secteur: "Transport exceptionnel", ev: "6 M€",  multiple: "4.2x",  annee: "2025" }
  ];

  return (
    <div className={styles.slideContent}>
      <span className={styles.micro}>Transactions comparables — levage & services industriels FR</span>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Cible</th>
              <th>Secteur</th>
              <th>EV</th>
              <th>EV/EBITDA</th>
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
      <p className={styles.tableFootnote}>Médiane : 5.1x EV/EBITDA sur 6 transactions small-cap 2023–2025. Données fictives, calibrées sur la base MAKB + CFNews du secteur.</p>
    </div>
  );
}

function ValoSlide() {
  // Target profile: CA ~€9M, EBITDA ~€1.8M — realistic small-cap levage.
  const ranges = [
    { label: "Standalone",  value: "7 M€",  multiple: "4.0x EBITDA · 0.8x CA", note: "Sortie financière conservatrice" },
    { label: "Marché",      value: "10 M€", multiple: "5.5x EBITDA · 1.1x CA", note: "Médiane des comps small-cap récentes", highlight: true },
    { label: "Premium",     value: "14 M€", multiple: "7.5x EBITDA · 1.5x CA", note: "Build-up stratégique, acquéreur régional" }
  ];

  return (
    <div className={styles.slideContent}>
      <span className={styles.micro}>Fourchette de valorisation — cible CA ~9 M€ / EBITDA ~1,8 M€</span>
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
          <span>7 M€</span>
          <span>10 M€</span>
          <span>14 M€</span>
        </div>
      </div>
    </div>
  );
}

function BuyersSlide() {
  // Small-cap industrial-services buyer universe: regional consolidators,
  // mid-cap PE doing build-ups, corporate adjacent sectors.
  const buyers = [
    { name: "Foselev Group",          type: "Consolidateur sectoriel",  logique: "Build-up régional levage — complément géographique sud-ouest", prio: 3 },
    { name: "Mediaco Levage",         type: "Leader indépendant",       logique: "Extension flotte + couverture clients industrie locale", prio: 3 },
    { name: "Fayat Services",         type: "Groupe BTP / services",    logique: "Intégration verticale — levage pour chantiers propres", prio: 2 },
    { name: "Capza (small-cap)",      type: "PE — services B2B",        logique: "Plateforme services industriels régionaux", prio: 2 },
    { name: "Andera MidCap",          type: "PE — industrie",           logique: "Build-up national, synergie avec portefeuille existant", prio: 2 },
    { name: "Dirigeant sortant MBI",  type: "Repreneur / search fund",  logique: "Reprise opérationnelle, continuité équipe", prio: 1 }
  ];

  return (
    <div className={styles.slideContent}>
      <span className={styles.micro}>Acquéreurs prioritaires — matching 7M base Epoch</span>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Acquéreur</th>
              <th>Type</th>
              <th>Logique stratégique</th>
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
          <span>pitch_atlas.pptx — 24 slides</span>
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
