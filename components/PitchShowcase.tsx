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
  // Real French small-cap levage M&A transactions 2020-2025 (sources: CONSTRUCTIONBTP,
  // Usine Nouvelle, JDL Groupe, KHL, Batiactu, Construction Cayola). Multiples are
  // rarely publicly disclosed for small-cap private deals — we cite our internal
  // EBITDA range from the MAKB + CFNews aggregate for the sector.
  const comps = [
    { cible: "MARTIN LEVAGE",  acquereur: "Foselev",       region: "Occitanie",       annee: "2025" },
    { cible: "STL",            acquereur: "Foselev",       region: "Pas-de-Calais",   annee: "2024" },
    { cible: "Bour",           acquereur: "Noblet",        region: "Île-de-France",   annee: "2024" },
    { cible: "BETKA",          acquereur: "Foselev",       region: "Savoie",          annee: "2023" },
    { cible: "SISE",           acquereur: "Foselev",       region: "Nord",            annee: "2023" },
    { cible: "SE Levage",      acquereur: "Mediaco",       region: "Haute-Savoie",    annee: "2020" }
  ];

  return (
    <div className={styles.slideContent}>
      <span className={styles.micro}>Transactions comparables — levage FR, 2020-2025</span>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Cible</th>
              <th>Acquéreur</th>
              <th>Région</th>
              <th>Année</th>
            </tr>
          </thead>
          <tbody>
            {comps.map((row) => (
              <tr key={row.cible}>
                <td className={styles.cellBold}>{row.cible}</td>
                <td className={styles.cellGold}>{row.acquereur}</td>
                <td>{row.region}</td>
                <td>{row.annee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={styles.tableFootnote}>Transactions privées, multiples non divulgués. Fourchette indicative interne : 4.0x–6.5x EBITDA sur comparables small-cap levage FR (base MAKB + CFNews).</p>
    </div>
  );
}

function ValoSlide() {
  // Target profile: CA ~€4M, EBITDA ~€670K — small-cap levage, sud-ouest.
  const ranges = [
    { label: "Standalone",  value: "2,7 M€", multiple: "4.0x EBITDA · 0.7x CA", note: "Sortie financière conservatrice" },
    { label: "Marché",      value: "3,7 M€", multiple: "5.5x EBITDA · 0.9x CA", note: "Médiane des comps small-cap récentes", highlight: true },
    { label: "Premium",     value: "5,3 M€", multiple: "8.0x EBITDA · 1.3x CA", note: "Build-up stratégique, acquéreur régional" }
  ];

  return (
    <div className={styles.slideContent}>
      <span className={styles.micro}>Fourchette de valorisation — cible CA ~4 M€ / EBITDA ~670 K€</span>
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
          <span>2,7 M€</span>
          <span>3,7 M€</span>
          <span>5,3 M€</span>
        </div>
      </div>
    </div>
  );
}

function BuyersSlide() {
  // Hyper-niche strategic acquirers — no PE, no search funds, no MBI.
  // Mix of active sector consolidators and adjacency plays the 7M-record
  // matching engine surfaces: aerospace (Daher · Toulouse), industrial
  // piping (Ponticelli), BTP-adjacent (Fayat · Gironde).
  const buyers = [
    { name: "Foselev Group",       type: "Consolidateur levage",      logique: "7 build-ups 2023-25 (STL, BETKA, SISE, MARTIN LEVAGE) — maillage sud-ouest manquant", prio: 3 },
    { name: "Mediaco Groupe",      type: "#1 levage FR",              logique: "Ex-Altéad levage post-2019, agence Occitanie à renforcer sur transport exceptionnel", prio: 3 },
    { name: "Capelle Transports",  type: "#1 transport exceptionnel", logique: "Ex-Altéad transport, cherche capacité levage intégrée — mariage vertical évident", prio: 2 },
    { name: "Daher Industrial Services", type: "Aéro & industrie (Toulouse)", logique: "Post-acquisition AAA (2023, 270 M€) — besoin de levage AOG pour sites Airbus sud-ouest", prio: 2 },
    { name: "Ponticelli Frères",   type: "Levage + piping nucléaire", logique: "Exposition Lacq / Golfech — bolt-on levage pour maintenance industrielle lourde", prio: 2 },
    { name: "Fayat Industries",    type: "Groupe Gironde / BTP",      logique: "HQ Bordeaux, filiale ADC Fayat (ponts roulants) — synergie géographique + flotte", prio: 1 }
  ];

  return (
    <div className={styles.slideContent}>
      <span className={styles.micro}>Short-list stratégique — matching hyper-niche · 7M fiches indexées</span>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Acquéreur</th>
              <th>Positionnement</th>
              <th>Rationale</th>
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
