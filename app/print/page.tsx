"use client";

import { useCallback } from "react";
import { useLangStore } from "@/store/lang-store";
import { getContent } from "@/lib/content";
import styles from "./print.module.css";

/* ── Shared components ───────────────────────────────────── */

function SlideHeader({ section, chapter }: { section: string; chapter?: string }) {
  return (
    <div className={styles.slideHeader}>
      <span className={styles.slideHeaderLeft}>
        {chapter && <span className={styles.chapterLabel}>{chapter} — </span>}
        {section}
      </span>
      <span className={styles.slideHeaderRight}>Epoch Associés</span>
    </div>
  );
}

function SlideFooter({ page, lang }: { page: number | string; lang: string }) {
  return (
    <div className={styles.slideFooter}>
      <span>Epoch Associés | {lang === "fr" ? "Confidentiel" : "Confidential"}</span>
      <span>{typeof page === "number" ? `Page ${page}` : page}</span>
    </div>
  );
}

function Title({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <>
      <h2 className={styles.slideTitle}>{title}</h2>
      <div className={styles.slideTitleAccent} />
      {subtitle && <p className={styles.slideSubtitle}>{subtitle}</p>}
    </>
  );
}

/* ── Football Field SVG ──────────────────────────────────── */

const ffBars = [
  { label: "Transaction Comps", low: 5.5, high: 9.0, median: 7.2, color: "#c17f4e", opacity: 0.25 },
  { label: "Trading Comps (adj.)", low: 4.8, high: 7.5, median: 6.0, color: "#3b82f6", opacity: 0.2 },
  { label: "LBO Floor (25% IRR)", low: 4.0, high: 5.5, median: 4.8, color: "#666", opacity: 0.15 },
  { label: "LBO Floor (20% IRR)", low: 5.0, high: 6.5, median: 5.8, color: "#666", opacity: 0.15 },
];
const FF_MIN = 3.5, FF_MAX = 10.5, FF_L = 180, FF_R = 780, FF_W = FF_R - FF_L;
const FF_BH = 32, FF_G = 20, FF_T = 36, FF_B = 44, FF_TICKS = [4, 5, 6, 7, 8, 9, 10];
const ffX = (v: number) => FF_L + ((v - FF_MIN) / (FF_MAX - FF_MIN)) * FF_W;

function FootballFieldSVG() {
  const totalH = ffBars.length * (FF_BH + FF_G) - FF_G;
  const svgH = FF_T + totalH + FF_B;
  const mono = "var(--font-mono), monospace";
  return (
    <div className={styles.footballChart}>
      <svg viewBox={`0 0 820 ${svgH}`} style={{ width: "100%", height: "auto", display: "block" }}>
        {FF_TICKS.map((t) => (
          <line key={t} x1={ffX(t)} y1={FF_T - 8} x2={ffX(t)} y2={FF_T + totalH + 8} stroke="#e0ddd8" strokeWidth={0.5} />
        ))}
        {ffBars.map((bar, i) => {
          const y = FF_T + i * (FF_BH + FF_G);
          const x1 = ffX(bar.low), x2 = ffX(bar.high), xM = ffX(bar.median);
          return (
            <g key={bar.label}>
              <text x={FF_L - 12} y={y + FF_BH / 2} textAnchor="end" dominantBaseline="central" style={{ fontFamily: mono, fontSize: "10px", fill: "#666", letterSpacing: "0.02em" }}>{bar.label}</text>
              <rect x={x1} y={y} width={x2 - x1} height={FF_BH} fill={bar.color} opacity={bar.opacity} />
              <text x={x1 - 4} y={y + FF_BH / 2} textAnchor="end" dominantBaseline="central" style={{ fontFamily: mono, fontSize: "9px", fill: "#888" }}>{bar.low.toFixed(1)}x</text>
              <text x={x2 + 4} y={y + FF_BH / 2} textAnchor="start" dominantBaseline="central" style={{ fontFamily: mono, fontSize: "9px", fill: "#888" }}>{bar.high.toFixed(1)}x</text>
              <circle cx={xM} cy={y + FF_BH / 2} r={5} fill={bar.color} />
            </g>
          );
        })}
        <line x1={ffX(8.5)} y1={FF_T - 16} x2={ffX(8.5)} y2={FF_T + totalH + 8} stroke="#888" strokeWidth={1} strokeDasharray="5 3" opacity={0.4} />
        <text x={ffX(8.5)} y={FF_T - 20} textAnchor="middle" style={{ fontFamily: mono, fontSize: "9px", fill: "#999" }}>Argos 2025 mid-market</text>
        {FF_TICKS.map((t) => (
          <text key={t} x={ffX(t)} y={FF_T + totalH + 28} textAnchor="middle" style={{ fontFamily: mono, fontSize: "10px", fill: "#888" }}>{t}x</text>
        ))}
      </svg>
    </div>
  );
}

/* ── Pipeline Timeline SVG ───────────────────────────────── */

function PipelineTimeline({ stages, isFR }: { stages: { number: string; title: string; status: string }[]; isFR: boolean }) {
  const W = 820, H = 260;
  const Y_MAIN = 60, Y_LABELS = Y_MAIN + 28, Y_CROSS = 210;
  const startX = 50, endX = W - 50;
  const gap = (endX - startX) / (stages.length - 1);
  const statusColor: Record<string, string> = { live: "#22c55e", testing: "#3b82f6", spec: "#f59e0b" };
  const mono = "var(--font-mono), monospace";
  const sans = "var(--font-sans), sans-serif";

  return (
    <div className={styles.timelineSvg}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
        {/* Main line */}
        <line x1={startX} y1={Y_MAIN} x2={endX} y2={Y_MAIN} stroke="#ddd" strokeWidth={2} />
        {/* Phase labels */}
        <text x={startX + gap} y={18} textAnchor="middle" style={{ fontFamily: mono, fontSize: "8px", fill: "#c17f4e", letterSpacing: "0.1em" }}>
          {isFR ? "PRÉ-MANDAT" : "PRE-MANDATE"}
        </text>
        <text x={startX + gap * 5.5} y={18} textAnchor="middle" style={{ fontFamily: mono, fontSize: "8px", fill: "#c17f4e", letterSpacing: "0.1em" }}>
          {isFR ? "EXÉCUTION" : "EXECUTION"}
        </text>
        <text x={startX + gap * 10} y={18} textAnchor="middle" style={{ fontFamily: mono, fontSize: "8px", fill: "#c17f4e", letterSpacing: "0.1em" }}>
          POST-IM
        </text>
        {/* Phase separators */}
        <line x1={startX + gap * 2.5} y1={25} x2={startX + gap * 2.5} y2={Y_MAIN + 90} stroke="#e0ddd8" strokeWidth={0.5} strokeDasharray="3 2" />
        <line x1={startX + gap * 8.5} y1={25} x2={startX + gap * 8.5} y2={Y_MAIN + 90} stroke="#e0ddd8" strokeWidth={0.5} strokeDasharray="3 2" />

        {/* Stage nodes */}
        {stages.map((s, i) => {
          const x = startX + i * gap;
          return (
            <g key={s.number}>
              <circle cx={x} cy={Y_MAIN} r={14} fill="#fff" stroke={statusColor[s.status] ?? "#999"} strokeWidth={2} />
              <text x={x} y={Y_MAIN + 1} textAnchor="middle" dominantBaseline="central" style={{ fontFamily: mono, fontSize: "8px", fill: "#333", fontWeight: 600 }}>{s.number}</text>
              <text x={x + 2} y={Y_LABELS} textAnchor="start" transform={`rotate(35, ${x + 2}, ${Y_LABELS})`} style={{ fontFamily: sans, fontSize: "7px", fill: "#555", fontWeight: 500 }}>{s.title}</text>
            </g>
          );
        })}

        {/* Cross-cutting layers */}
        <rect x={startX - 10} y={Y_CROSS - 10} width={endX - startX + 20} height={18} rx={0} fill="#c17f4e" opacity={0.08} />
        <text x={startX} y={Y_CROSS + 2} style={{ fontFamily: mono, fontSize: "7.5px", fill: "#c17f4e", letterSpacing: "0.06em" }}>
          CRM COCKPIT — {isFR ? "toujours actif" : "always-on"}
        </text>
        <rect x={startX + gap * 2 - 10} y={Y_CROSS + 14} width={endX - startX - gap * 2 + 20} height={18} rx={0} fill="#3b82f6" opacity={0.06} />
        <text x={startX + gap * 2} y={Y_CROSS + 26} style={{ fontFamily: mono, fontSize: "7.5px", fill: "#3b82f6", letterSpacing: "0.06em" }}>
          EMAIL INTELLIGENCE — {isFR ? "à partir du mandat" : "from mandate onward"}
        </text>
      </svg>
    </div>
  );
}

/* ── Architecture Diagram SVG ────────────────────────────── */

function ArchitectureDiagram({ isFR }: { isFR: boolean }) {
  const W = 820, H = 260;
  const mono = "var(--font-mono), monospace";
  const sans = "var(--font-sans), sans-serif";

  const layers = [
    { y: 20, label: isFR ? "INTERFACE" : "INTERFACE", color: "#c17f4e", items: ["FastAPI + HTMX", "Langfuse", "OpenRouter"] },
    { y: 105, label: isFR ? "TRAITEMENT" : "PROCESSING", color: "#3b82f6", items: ["Docling", "Playwright", "python-pptx", "openpyxl", "LangGraph"] },
    { y: 190, label: isFR ? "INFRASTRUCTURE" : "INFRASTRUCTURE", color: "#666", items: ["PostgreSQL", "Qdrant", "Neo4j", "vLLM + Qwen 32B"] },
  ];

  return (
    <div className={styles.archDiagram}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
        {layers.map((layer) => {
          const boxW = (W - 140) / layer.items.length - 8;
          return (
            <g key={layer.label}>
              {/* Layer label */}
              <text x={20} y={layer.y + 30} style={{ fontFamily: mono, fontSize: "8px", fill: layer.color, letterSpacing: "0.1em", fontWeight: 600 }}>{layer.label}</text>
              {/* Boxes */}
              {layer.items.map((item, i) => {
                const x = 120 + i * (boxW + 8);
                return (
                  <g key={item}>
                    <rect x={x} y={layer.y} width={boxW} height={50} fill="#fff" stroke={layer.color} strokeWidth={1} opacity={1} />
                    <text x={x + boxW / 2} y={layer.y + 28} textAnchor="middle" style={{ fontFamily: sans, fontSize: "9px", fill: "#333", fontWeight: 600 }}>{item}</text>
                  </g>
                );
              })}
              {/* Connection arrows down */}
              {layer.y < 190 && layer.items.map((_, i) => {
                const x = 120 + i * (boxW + 8) + boxW / 2;
                return <line key={i} x1={x} y1={layer.y + 50} x2={x} y2={layer.y + 55 + 30} stroke="#ddd" strokeWidth={1} markerEnd="url(#arrowhead)" />;
              })}
            </g>
          );
        })}
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="#ccc" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

/* ── Status helpers ──────────────────────────────────────── */

const statusLabel: Record<string, string> = { live: "LIVE", testing: "IN TEST", spec: "SPEC" };
const statusClass: Record<string, string> = { live: "badgeLive", testing: "badgeTesting", spec: "badgeSpec" };

/* ── Main component ──────────────────────────────────────── */

export default function PrintPage() {
  const lang = useLangStore((s) => s.lang);
  const c = getContent(lang);
  const handleExport = useCallback(() => window.print(), []);
  const isFR = lang === "fr";
  const date = isFR ? "Avril 2026" : "April 2026";
  const src = `Source : Epoch Associés, ${date}`;

  const tocItems = isFR
    ? [
        "Synthèse", "Thèse — Pourquoi le M&A small-cap a besoin d'un nouveau modèle",
        "Opportunité de marché", "Étude de cas — Pitch Projet Atlas",
        "Moteur de valorisation", "Football Field",
        "Pipeline de transaction", "Architecture système",
        "Différenciation", "Philosophie HITL", "Équipe"
      ]
    : [
        "Executive Summary", "Thesis — Why Small-Cap M&A Needs a New Model",
        "Market Opportunity", "Case Study — Projet Atlas Pitch Deck",
        "Valuation Engine", "Football Field",
        "Deal Pipeline", "System Architecture",
        "Differentiation", "HITL Philosophy", "Team"
      ];

  return (
    <div className={styles.deck}>
      <div className={styles.toolbar}>
        <button className={styles.exportBtn} onClick={handleExport}>Export PDF</button>
        <span className={styles.toolbarHint}>{isFR ? "Destination : « Enregistrer au format PDF »" : "Destination: \"Save as PDF\""}</span>
      </div>

      {/* ═══════════════════════════════════════════════════════
          PAGE 1 — COVER
          ═══════════════════════════════════════════════════════ */}
      <div className={`${styles.slide} ${styles.cover}`}>
        <div className={styles.coverBrand}>Epoch Associés</div>
        <div className={styles.coverRule} />
        <div className={styles.coverTagline}>{isFR ? "Conseil M&A augmenté par l'IA" : "AI-Native M&A Advisory"}</div>
        <div className={styles.coverMeta}>
          <div>Paris, France</div>
          <div>{date}</div>
        </div>
        <div className={styles.coverFooter}>{isFR ? "Document strictement confidentiel — Ne pas diffuser" : "Strictly confidential — Do not distribute"}</div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          PAGE 2 — TABLE OF CONTENTS
          ═══════════════════════════════════════════════════════ */}
      <div className={styles.slide}>
        <SlideHeader section={isFR ? "Sommaire" : "Contents"} />
        <div className={styles.slideContent}>
          <Title title={isFR ? "Sommaire" : "Table of Contents"} />
          <div className={styles.tocList}>
            {tocItems.map((item, i) => (
              <div key={item} className={styles.tocItem}>
                <span className={styles.tocNumber}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.tocLabel}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <SlideFooter page={2} lang={lang} />
      </div>

      {/* ═══════════════════════════════════════════════════════
          PAGE 3 — EXECUTIVE SUMMARY
          ═══════════════════════════════════════════════════════ */}
      <div className={styles.slide}>
        <SlideHeader section={isFR ? "Synthèse" : "Executive Summary"} chapter={isFR ? "Vue d'ensemble" : "Overview"} />
        <div className={styles.slideContent}>
          <Title title={isFR
            ? "Un système d'exécution de transactions, construit de zéro pour le M&A small-cap."
            : "A deal operating system built from scratch for small-cap M&A."} />
          <div className={styles.execColumns}>
            <div className={styles.execLeft}>
              <p className={styles.execParagraph}>
                {isFR
                  ? "Epoch Associés est un cabinet de conseil M&A augmenté par l'IA, spécialisé dans les mandats de cession français small-cap (500K–10M€ EV). Le cabinet remplace l'équipe d'exécution junior (Analyste à VP) par des agents IA sur mesure tout en préservant le jugement du banquier senior à chaque point de décision."
                  : "Epoch Associés is an AI-native M&A advisory boutique focused on French small-cap sell-side transactions (500K–10M€ EV). The firm replaces the junior execution team (Analyst through VP) with purpose-built AI agents while preserving senior banker judgment at every decision point."}
              </p>
            </div>
            <div className={styles.execRight}>
              <ul className={styles.execBullets}>
                <li>{isFR ? "14+ modules couvrant l'intégralité du cycle sell-side, du sourcing au closing" : "14+ modules covering the full sell-side lifecycle from sourcing to closing"}</li>
                <li>{isFR ? "Human-in-the-loop à chaque porte — aucun output d'agent n'atteint le marché sans validation du banquier" : "Human-in-the-loop at every gate — no agent output reaches the market without banker validation"}</li>
                <li>{isFR ? "Construit par un ex-Lincoln International et un ingénieur ML full-stack" : "Built by an ex-Lincoln International banker and a full-stack ML engineer"}</li>
              </ul>
            </div>
          </div>
          <div className={styles.metricsRow}>
            {c.heroMetrics.map((m) => (
              <div key={m.label} className={styles.metricBox}>
                <div className={styles.metricValue}>{m.value}{m.suffix}</div>
                <div className={styles.metricLabel}>{m.label}</div>
              </div>
            ))}
          </div>
          <div className={styles.source}>{src}</div>
        </div>
        <SlideFooter page={3} lang={lang} />
      </div>

      {/* ═══════════════════════════════════════════════════════
          PAGE 4 — THESIS
          ═══════════════════════════════════════════════════════ */}
      <div className={styles.slide}>
        <SlideHeader section={isFR ? "Thèse" : "Thesis"} chapter={isFR ? "Vue d'ensemble" : "Overview"} />
        <div className={styles.slideContent}>
          <Title title={c.thesis.title} />
          <div className={styles.thesisGrid}>
            {c.thesis.cards.map((card) => (
              <div key={card.number} className={styles.thesisCard}>
                <span className={styles.thesisNumber}>{card.number.replace(/^0/, "")}</span>
                <h3 className={styles.thesisHeading}>{card.heading}</h3>
                <p className={styles.thesisBody}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
        <SlideFooter page={4} lang={lang} />
      </div>

      {/* ═══════════════════════════════════════════════════════
          PAGE 5 — MARKET OPPORTUNITY
          ═══════════════════════════════════════════════════════ */}
      <div className={styles.slide}>
        <SlideHeader section={isFR ? "Opportunité de marché" : "Market Opportunity"} chapter={isFR ? "Vue d'ensemble" : "Overview"} />
        <div className={styles.slideContent}>
          <Title title={isFR ? "Un marché massif, sous-servi, prêt pour l'automatisation." : "A massive market, underserved, ready for automation."} />
          <div className={styles.marketMetrics}>
            <div className={styles.marketMetric}>
              <div className={styles.marketMetricValue}>400K</div>
              <div className={styles.marketMetricLabel}>{isFR ? "PME françaises nécessitant une transmission d'ici 2030" : "French SMEs requiring ownership transition by 2030"}</div>
            </div>
            <div className={styles.marketMetric}>
              <div className={styles.marketMetricValue}>80–150K€</div>
              <div className={styles.marketMetricLabel}>{isFR ? "Success fee typique sur un deal de 2M€ EV" : "Typical success fee on a 2M€ EV deal"}</div>
            </div>
            <div className={styles.marketMetric}>
              <div className={styles.marketMetricValue}>&lt;5%</div>
              <div className={styles.marketMetricLabel}>{isFR ? "Part estimée recevant un conseil IB-grade" : "Estimated share currently receiving IB-grade advisory"}</div>
            </div>
          </div>
          <div className={styles.marketInsight}>
            <div className={styles.marketInsightTitle}>{isFR ? "L'équation économique" : "The economics equation"}</div>
            <p className={styles.marketInsightBody}>
              {isFR
                ? "Un deal de 2M€ génère 80-150K€ de fees. Avec une équipe junior traditionnelle (2-3 analystes à 60-80K€/an), les coûts fixes rendent le deal à peine rentable. Epoch remplace l'équipe junior par des agents IA à coût marginal quasi nul, rendant chaque deal dans la fourchette 500K-10M€ économiquement viable avec une qualité IB-grade."
                : "A 2M€ deal generates 80-150K€ in fees. With a traditional junior team (2-3 analysts at 60-80K€/year), fixed costs make the deal barely profitable. Epoch replaces the junior team with AI agents at near-zero marginal cost, making every deal in the 500K-10M€ range economically viable with IB-grade quality."}
            </p>
          </div>
          <div className={styles.source}>{isFR ? "Source : INSEE, BPI France, estimations Epoch Associés" : "Source: INSEE, BPI France, Epoch Associés estimates"}</div>
        </div>
        <SlideFooter page={5} lang={lang} />
      </div>

      {/* ═══════════════════════════════════════════════════════
          PAGE 6 — CASE STUDY: MEDADOM
          ═══════════════════════════════════════════════════════ */}
      <div className={styles.slide}>
        <SlideHeader section={isFR ? "Étude de cas" : "Case Study"} chapter={isFR ? "Preuve de concept" : "Proof of Concept"} />
        <div className={styles.slideContent}>
          <Title title={isFR ? "Projet Atlas — 24 slides, 15 minutes, chaque chiffre sourcé." : "Projet Atlas — 24 slides, 15 minutes, every figure sourced."} />
          <div className={styles.caseColumns}>
            <div className={styles.caseLeft}>
              <div className={styles.caseSlides}>
                {["01 — Cover", "15 — Transaction Comps", "16 — Valuation Range", "20 — Buyer Shortlist"].map((s) => (
                  <div key={s} className={styles.caseSlideThumb}>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
              <div className={styles.caseCaption}>
                {isFR ? "Aperçu des slides clés — deck généré par le système" : "Key slide preview — system-generated deck"}
              </div>
            </div>
            <div className={styles.caseRight}>
              <div className={styles.caseStat}>
                <span className={styles.caseStatValue}>24</span>
                <span className={styles.caseStatLabel}>{isFR ? "slides IB-grade" : "IB-grade slides"}</span>
              </div>
              <div className={styles.caseStat}>
                <span className={styles.caseStatValue}>15 min</span>
                <span className={styles.caseStatLabel}>{isFR ? "temps de génération" : "generation time"}</span>
              </div>
              <div className={styles.caseStat}>
                <span className={styles.caseStatValue}>3</span>
                <span className={styles.caseStatLabel}>{isFR ? "modules autonomes activés" : "autonomous modules triggered"}</span>
              </div>
              <div className={styles.caseStat}>
                <span className={styles.caseStatValue}>20</span>
                <span className={styles.caseStatLabel}>{isFR ? "taxonomies de layouts" : "layout taxonomies"}</span>
              </div>
              <div className={styles.caseModules}>
                <div className={styles.caseModuleTitle}>{isFR ? "Modules déclenchés :" : "Modules triggered:"}</div>
                <ul>
                  <li>Agent Info Publique — {isFR ? "recherche données publiques complète" : "full public data research"}</li>
                  <li>Buyer Matching — {isFR ? "liste préliminaire d'acquéreurs" : "preliminary acquirer list"}</li>
                  <li>{isFR ? "Moteur de Valorisation" : "Valuation Engine"} — {isFR ? "fourchette à partir de 400K comps" : "range from 400K transaction comps"}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.source}>{isFR ? "Source : génération interne Epoch Associés, données fictives à des fins de démonstration" : "Source: Epoch Associés internal generation, fictional data for demonstration purposes"}</div>
        </div>
        <SlideFooter page={6} lang={lang} />
      </div>

      {/* ═══════════════════════════════════════════════════════
          PAGE 7 — VALUATION ENGINE
          ═══════════════════════════════════════════════════════ */}
      <div className={styles.slide}>
        <SlideHeader section={isFR ? "Moteur de valorisation" : "Valuation Engine"} chapter={isFR ? "Capacités" : "Capabilities"} />
        <div className={styles.slideContent}>
          <Title title={isFR ? "Trois branches indépendantes, un football field." : "Three independent branches, one football field."} />
          <div className={styles.valoGrid}>
            {c.valoBranches.map((b) => (
              <div key={b.id} className={styles.valoBranch}>
                <span className={styles.valoBranchActive}>{b.active}</span>
                <h3 className={styles.valoBranchTitle}>{b.label}</h3>
                <span className={styles.valoBranchRole}>{b.role}</span>
                <p className={styles.valoBranchDesc}>{b.description}</p>
                <ul className={styles.valoBranchDetails}>
                  {b.details.map((d) => (<li key={d}>{d}</li>))}
                </ul>
              </div>
            ))}
          </div>
          <div className={styles.source}>{src}</div>
        </div>
        <SlideFooter page={7} lang={lang} />
      </div>

      {/* ═══════════════════════════════════════════════════════
          PAGE 8 — FOOTBALL FIELD
          ═══════════════════════════════════════════════════════ */}
      <div className={styles.slide}>
        <SlideHeader section={isFR ? "Synthèse valorisation" : "Valuation Synthesis"} chapter={isFR ? "Capacités" : "Capabilities"} />
        <div className={styles.slideContent}>
          <Title title="Football Field — EV/EBITDA" />
          <FootballFieldSVG />
          <p className={styles.footballQuote}>
            {isFR
              ? "Les transaction comps sont l'ancre. Les trading comps confirment ou challengent. Le LBO fixe le plafond PE. Le banquier décide des pondérations. Le système propose, jamais ne conclut."
              : "Transaction comps are the anchor. Trading comps confirm or challenge. LBO floor sets the PE buyer ceiling. The banker decides the weights. The system proposes, never concludes."}
          </p>
          <div className={styles.source}>{src}</div>
        </div>
        <SlideFooter page={8} lang={lang} />
      </div>

      {/* ═══════════════════════════════════════════════════════
          PAGE 9 — DEAL PIPELINE (VISUAL TIMELINE)
          ═══════════════════════════════════════════════════════ */}
      <div className={styles.slide}>
        <SlideHeader section={isFR ? "Pipeline de transaction" : "Deal Pipeline"} chapter={isFR ? "Capacités" : "Capabilities"} />
        <div className={styles.slideContent}>
          <Title
            title={isFR ? "L'intégralité du cycle sell-side, décomposée en étapes auditables." : "The entire sell-side lifecycle, decomposed into auditable stages."}
            subtitle={isFR
              ? "12 étapes séquentielles, 2 couches transversales. Chaque étape a des contrats Pydantic I/O, des portes HITL et un suivi de statut. Le pipeline attend la validation humaine."
              : "12 sequential stages, 2 cross-cutting layers. Each stage has Pydantic I/O contracts, HITL gates, and status tracking. The pipeline waits for human validation."}
          />
          <PipelineTimeline stages={c.pipelineStages.map((s) => ({ number: s.number, title: s.title, status: s.status }))} isFR={isFR} />
          <div className={styles.pipelineLegend}>
            <span><span className={styles.legendDot} style={{ background: "#22c55e" }} /> Live</span>
            <span><span className={styles.legendDot} style={{ background: "#3b82f6" }} /> In Test</span>
            <span><span className={styles.legendDot} style={{ background: "#f59e0b" }} /> Spec</span>
          </div>
          <div className={styles.source}>{src}</div>
        </div>
        <SlideFooter page={9} lang={lang} />
      </div>

      {/* ═══════════════════════════════════════════════════════
          PAGE 10 — ARCHITECTURE OVERVIEW
          ═══════════════════════════════════════════════════════ */}
      <div className={styles.slide}>
        <SlideHeader section={isFR ? "Architecture système" : "System Architecture"} chapter={isFR ? "Capacités" : "Capabilities"} />
        <div className={styles.slideContent}>
          <Title
            title={isFR ? "12 briques d'infrastructure. Chacune existe parce que le M&A cassait sans elle." : "12 infrastructure components. Each one exists because M&A broke without it."}
          />
          <ArchitectureDiagram isFR={isFR} />
          <p className={styles.archCaption}>
            {isFR
              ? "Chaque couche résout un mode de défaillance spécifique qu'une IA générique ne sait pas gérer. RAG hybride pour la précision numérique. LLM local pour le coût à l'échelle. Knowledge graph pour les faits connectés. Voir Appendice B pour le détail des 12 composants."
              : "Every layer solves a specific failure mode that a generic AI setup cannot handle. Hybrid RAG for numerical precision. Local LLM for cost at scale. Knowledge graph for connected facts. See Appendix B for detailed component descriptions."}
          </p>
          <div className={styles.source}>{src}</div>
        </div>
        <SlideFooter page={10} lang={lang} />
      </div>

      {/* ═══════════════════════════════════════════════════════
          PAGE 11 — DIFFERENTIATION
          ═══════════════════════════════════════════════════════ */}
      <div className={styles.slide}>
        <SlideHeader section={isFR ? "Différenciation" : "Differentiation"} chapter={isFR ? "Positionnement" : "Positioning"} />
        <div className={styles.slideContent}>
          <Title title={isFR ? "Pas des fonctionnalités. De l'architecture." : "Not features. Architecture."} />
          <table className={styles.compTable}>
            <thead>
              <tr>
                <th>{isFR ? "Propriété" : "Property"}</th>
                <th>ChatGPT + {isFR ? "un banquier" : "a Banker"}</th>
                <th>Epoch</th>
              </tr>
            </thead>
            <tbody>
              {c.comparisonRows.map((r) => (
                <tr key={r.property}>
                  <td>{r.property}</td>
                  <td>{r.baseline}</td>
                  <td>{r.epoch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SlideFooter page={11} lang={lang} />
      </div>

      {/* ═══════════════════════════════════════════════════════
          PAGE 12 — HITL + GUARDRAILS
          ═══════════════════════════════════════════════════════ */}
      <div className={styles.slide}>
        <SlideHeader section={isFR ? "Philosophie HITL" : "HITL Philosophy"} chapter={isFR ? "Positionnement" : "Positioning"} />
        <div className={styles.slideContent}>
          <Title title="&laquo; No Send Ever &raquo;" />
          <div className={styles.hitlFlow}>
            {(isFR
              ? [
                  { s: "L'agent produit", p: "Brouillon, analyse ou recommandation" },
                  { s: "File HITL", p: "Le livrable entre dans l'onglet Analyste" },
                  { s: "Le banquier valide", p: "Approuver / Modifier / Rejeter" },
                  { s: "Correction routée", p: "Catégorisée vers SKILL ou MEMORY" },
                  { s: "Deal N+1 meilleur", p: "Le feedback compose. Deal 20 > Deal 1." }
                ]
              : [
                  { s: "Agent produces", p: "Draft, analysis, or recommendation" },
                  { s: "HITL Queue", p: "Output enters the Analyst review tab" },
                  { s: "Banker reviews", p: "Approve / Edit / Reject" },
                  { s: "Correction routed", p: "Categorized to SKILL or MEMORY" },
                  { s: "Next deal is better", p: "Feedback compounds. Deal 20 > Deal 1." }
                ]
            ).map((step, i) => (
              <div key={step.s} className={styles.hitlStep}>
                <span className={styles.hitlStepNumber}>{i + 1}</span>
                <strong className={styles.hitlStepTitle}>{step.s}</strong>
                <p className={styles.hitlStepDesc}>{step.p}</p>
              </div>
            ))}
          </div>
          <h3 className={styles.guardrailSectionTitle}>{isFR ? "Garde-fous" : "Guardrails"}</h3>
          <div className={styles.slideTitleAccent} />
          <div className={styles.guardrailGrid}>
            {c.guardrails.map((g) => (
              <div key={g.id} className={styles.guardrailCard}>
                <strong>{g.label}</strong>
                <p>{g.description}</p>
              </div>
            ))}
          </div>
        </div>
        <SlideFooter page={12} lang={lang} />
      </div>

      {/* ═══════════════════════════════════════════════════════
          PAGE 13 — TEAM
          ═══════════════════════════════════════════════════════ */}
      <div className={styles.slide}>
        <SlideHeader section={isFR ? "Équipe" : "Team"} />
        <div className={styles.slideContent}>
          <Title title={isFR ? "Deux personnes. Un système." : "Two people. One system."} />
          <div className={styles.teamGrid}>
            <div className={styles.teamCard}>
              <h3 className={styles.teamName}>Julien Bouix</h3>
              <span className={styles.teamRole}>{isFR ? "Président" : "President"}</span>
              <p className={styles.teamDesc}>
                {isFR
                  ? "Ex-Lincoln International, équipe Technology (niveau Associate). 10+ transactions mid-cap dans les secteurs Technology, Healthcare et Industrials. M&A execution, conception du système, rédaction des specs, validation HITL et co-développement."
                  : "Ex-Lincoln International, Technology Team (Associate level). 10+ mid-cap transactions across Technology, Healthcare, and Industrials. M&A execution, system design, spec authorship, HITL validation, and co-development."}
              </p>
              <p className={styles.teamQuote}>{isFR ? "\"Specs, décisions d'architecture, validation et code.\"" : "\"Specs, architecture decisions, validation, and code.\""}</p>
            </div>
            <div className={styles.teamCard}>
              <h3 className={styles.teamName}>Louis Germain</h3>
              <span className={styles.teamRole}>CTO / DG</span>
              <p className={styles.teamDesc}>
                {isFR
                  ? "MSc Informatique. Implémentation intégrale : infrastructure, orchestration d'agents, pipelines de données, déploiement. RTX 4090, Docker, PostgreSQL, Qdrant."
                  : "MSc Computer Science. Full-stack implementation: infrastructure, agent orchestration, data pipelines, deployment. RTX 4090, Docker, PostgreSQL, Qdrant, the works."}
              </p>
              <p className={styles.teamQuote}>{isFR ? "\"Architecture, infrastructure et chaque pipeline.\"" : "\"Architecture, infrastructure, and every pipeline.\""}</p>
            </div>
          </div>
          <div className={styles.teamAdvisory}>
            <strong>{isFR ? "Réseau de conseil" : "Advisory Network"}</strong>
            <p>{isFR
              ? "Epoch engage des conseillers sectoriels seniors sur une base par-mandat pour l'expertise sectorielle et l'accès au réseau d'acquéreurs. Exécution senior-only : pas de junior, pas de délégation de qualité."
              : "Epoch engages sector-specific senior advisors on a per-deal basis for industry expertise and buyer network access. Senior-only execution: no juniors, no quality delegation."}</p>
          </div>
        </div>
        <SlideFooter page={13} lang={lang} />
      </div>

      {/* ═══════════════════════════════════════════════════════
          PAGE 14 — DISCLAIMER
          ═══════════════════════════════════════════════════════ */}
      <div className={styles.slide}>
        <SlideHeader section={isFR ? "Avertissement" : "Important Notice"} />
        <div className={styles.slideContent}>
          <Title title={isFR ? "Avertissement" : "Important Notice"} />
          <div className={styles.disclaimer}>
            <p>{isFR
              ? "Ce document est la propriété exclusive d'Epoch Associés SAS et est strictement confidentiel. Il est fourni à titre d'information uniquement et ne constitue en aucun cas un conseil en investissement, une offre de vente ou une sollicitation d'offre d'achat de titres."
              : "This document is the exclusive property of Epoch Associés SAS and is strictly confidential. It is provided for information purposes only and does not constitute investment advice, an offer to sell, or a solicitation of an offer to purchase securities."}</p>
            <p>{isFR
              ? "Les informations contenues dans ce document proviennent de sources considérées comme fiables, notamment MAKB (S&P Global), CFNews, INSEE, INPI, BODACC et des sources publiques. Epoch Associés ne garantit pas l'exactitude, l'exhaustivité ou l'actualité de ces informations."
              : "The information contained in this document has been obtained from sources believed to be reliable, including MAKB (S&P Global), CFNews, INSEE, INPI, BODACC, and public sources. Epoch Associés makes no representation or warranty as to the accuracy, completeness, or timeliness of such information."}</p>
            <p>{isFR
              ? "Ce document peut contenir des déclarations prospectives fondées sur les attentes et hypothèses actuelles d'Epoch Associés. Ces déclarations comportent des risques et incertitudes et les résultats réels peuvent différer sensiblement."
              : "This document may contain forward-looking statements based on Epoch Associés' current expectations and assumptions. These statements involve risks and uncertainties, and actual results may differ materially."}</p>
            <p>{isFR
              ? "Toute reproduction, distribution ou divulgation de ce document, en tout ou en partie, sans le consentement écrit préalable d'Epoch Associés est strictement interdite."
              : "Any reproduction, distribution, or disclosure of this document, in whole or in part, without the prior written consent of Epoch Associés is strictly prohibited."}</p>
          </div>
        </div>
        <SlideFooter page={14} lang={lang} />
      </div>

      {/* ═══════════════════════════════════════════════════════
          PAGE 15 — BACK COVER
          ═══════════════════════════════════════════════════════ */}
      <div className={`${styles.slide} ${styles.backCover}`}>
        <div className={styles.backBrand}>Epoch Associés</div>
        <div className={styles.coverRule} />
        <div className={styles.backTagline}>{isFR ? "Conseil M&A augmenté par l'IA" : "AI-Native M&A Advisory"}</div>
        <div className={styles.backContact}>
          <div>julien@epochassocies.com</div>
          <div>Paris, France</div>
        </div>
        <div className={styles.coverFooter}>{isFR ? "Document strictement confidentiel — Ne pas diffuser" : "Strictly confidential — Do not distribute"}</div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          APPENDIX A — PIPELINE DETAIL
          ═══════════════════════════════════════════════════════ */}
      <div className={styles.slide}>
        <SlideHeader section={isFR ? "Appendice A — Pipeline détaillé" : "Appendix A — Pipeline Detail"} />
        <div className={styles.slideContent}>
          <Title title={isFR ? "Pipeline — Détail des étapes 01–06" : "Pipeline — Stages 01–06 Detail"} />
          <table className={styles.pipelineTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>{isFR ? "Étape" : "Stage"}</th>
                <th>Status</th>
                <th>Description</th>
                <th>{isFR ? "Insight architecture" : "Architecture Insight"}</th>
              </tr>
            </thead>
            <tbody>
              {c.pipelineStages.slice(0, 6).map((s) => (
                <tr key={s.id}>
                  <td>{s.number}</td>
                  <td>{s.title}</td>
                  <td><span className={`${styles.badge} ${styles[statusClass[s.status]] ?? ""}`}>{statusLabel[s.status] ?? s.status}</span></td>
                  <td>{s.oneLiner}</td>
                  <td>{s.architectureInsight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SlideFooter page="A-1" lang={lang} />
      </div>

      <div className={styles.slide}>
        <SlideHeader section={isFR ? "Appendice A — Pipeline détaillé (suite)" : "Appendix A — Pipeline Detail (continued)"} />
        <div className={styles.slideContent}>
          <Title title={isFR ? "Pipeline — Détail des étapes 07–12" : "Pipeline — Stages 07–12 Detail"} />
          <table className={styles.pipelineTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>{isFR ? "Étape" : "Stage"}</th>
                <th>Status</th>
                <th>Description</th>
                <th>{isFR ? "Insight architecture" : "Architecture Insight"}</th>
              </tr>
            </thead>
            <tbody>
              {c.pipelineStages.slice(6).map((s) => (
                <tr key={s.id}>
                  <td>{s.number}</td>
                  <td>{s.title}</td>
                  <td><span className={`${styles.badge} ${styles[statusClass[s.status]] ?? ""}`}>{statusLabel[s.status] ?? s.status}</span></td>
                  <td>{s.oneLiner}</td>
                  <td>{s.architectureInsight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SlideFooter page="A-2" lang={lang} />
      </div>

      {/* ═══════════════════════════════════════════════════════
          APPENDIX B — ARCHITECTURE DETAIL
          ═══════════════════════════════════════════════════════ */}
      <div className={styles.slide}>
        <SlideHeader section={isFR ? "Appendice B — Architecture détaillée" : "Appendix B — Architecture Detail"} />
        <div className={styles.slideContent}>
          <Title title={isFR ? "Composants d'infrastructure 1–6" : "Infrastructure Components 1–6"} />
          <div className={styles.nodeGrid}>
            {c.infraNodes.slice(0, 6).map((n) => (
              <div key={n.id} className={styles.nodeCard}>
                <span className={styles.nodeCardSub}>{n.sublabel}</span>
                <div className={styles.nodeCardLabel}>{n.label}</div>
                <p className={styles.nodeCardReason}>{n.maReason}</p>
              </div>
            ))}
          </div>
        </div>
        <SlideFooter page="B-1" lang={lang} />
      </div>

      <div className={styles.slide}>
        <SlideHeader section={isFR ? "Appendice B — Architecture détaillée (suite)" : "Appendix B — Architecture Detail (continued)"} />
        <div className={styles.slideContent}>
          <Title title={isFR ? "Composants d'infrastructure 7–12" : "Infrastructure Components 7–12"} />
          <div className={styles.nodeGrid}>
            {c.infraNodes.slice(6).map((n) => (
              <div key={n.id} className={styles.nodeCard}>
                <span className={styles.nodeCardSub}>{n.sublabel}</span>
                <div className={styles.nodeCardLabel}>{n.label}</div>
                <p className={styles.nodeCardReason}>{n.maReason}</p>
              </div>
            ))}
          </div>
        </div>
        <SlideFooter page="B-2" lang={lang} />
      </div>
    </div>
  );
}
