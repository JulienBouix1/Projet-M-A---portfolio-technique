"use client";

import styles from "./FootballField.module.css";

interface BarData {
  label: string;
  low: number;
  high: number;
  median: number;
  colorVar: string;
  barOpacity: number;
}

const bars: BarData[] = [
  { label: "Transaction Comps", low: 5.5, high: 9.0, median: 7.2, colorVar: "var(--accent)", barOpacity: 0.3 },
  { label: "Trading Comps (adj.)", low: 4.8, high: 7.5, median: 6.0, colorVar: "var(--testing)", barOpacity: 0.3 },
  { label: "LBO Floor (25% IRR)", low: 4.0, high: 5.5, median: 4.8, colorVar: "var(--text-3)", barOpacity: 0.2 },
  { label: "LBO Floor (20% IRR)", low: 5.0, high: 6.5, median: 5.8, colorVar: "var(--text-3)", barOpacity: 0.2 },
];

const AXIS_MIN = 3.5;
const AXIS_MAX = 10.5;
const CHART_LEFT = 180;
const CHART_RIGHT = 620;
const CHART_WIDTH = CHART_RIGHT - CHART_LEFT;
const BAR_HEIGHT = 28;
const BAR_GAP = 18;
const TOP_PADDING = 30;
const BOTTOM_PADDING = 40;
const SVG_WIDTH = 660;

const ARGOS_X = 8.5;
const TICKS = [4, 5, 6, 7, 8, 9, 10];

function xScale(value: number): number {
  return CHART_LEFT + ((value - AXIS_MIN) / (AXIS_MAX - AXIS_MIN)) * CHART_WIDTH;
}

export default function FootballField() {
  const totalBarsHeight = bars.length * (BAR_HEIGHT + BAR_GAP) - BAR_GAP;
  const svgHeight = TOP_PADDING + totalBarsHeight + BOTTOM_PADDING;

  return (
    <div className={styles.container}>
      <div className={styles.chartWrapper}>
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${svgHeight}`}
          className={styles.svg}
          role="img"
          aria-label="Football field valuation chart"
        >
          {/* Grid lines */}
          {TICKS.map((tick) => (
            <line
              key={tick}
              x1={xScale(tick)}
              y1={TOP_PADDING - 8}
              x2={xScale(tick)}
              y2={TOP_PADDING + totalBarsHeight + 8}
              stroke="var(--border)"
              strokeWidth={0.5}
            />
          ))}

          {/* Bars */}
          {bars.map((bar, i) => {
            const y = TOP_PADDING + i * (BAR_HEIGHT + BAR_GAP);
            const x1 = xScale(bar.low);
            const x2 = xScale(bar.high);
            const xMed = xScale(bar.median);
            const barWidth = x2 - x1;

            return (
              <g key={bar.label}>
                {/* Label */}
                <text
                  x={CHART_LEFT - 12}
                  y={y + BAR_HEIGHT / 2}
                  textAnchor="end"
                  dominantBaseline="central"
                  className={styles.barLabel}
                >
                  {bar.label}
                </text>

                {/* Range bar */}
                <rect
                  x={x1}
                  y={y}
                  width={barWidth}
                  height={BAR_HEIGHT}
                  rx={6}
                  ry={6}
                  fill={bar.colorVar}
                  opacity={bar.barOpacity}
                />

                {/* Low value */}
                <text
                  x={x1 - 4}
                  y={y + BAR_HEIGHT / 2}
                  textAnchor="end"
                  dominantBaseline="central"
                  className={styles.tickValue}
                >
                  {bar.low.toFixed(1)}x
                </text>

                {/* High value */}
                <text
                  x={x2 + 4}
                  y={y + BAR_HEIGHT / 2}
                  textAnchor="start"
                  dominantBaseline="central"
                  className={styles.tickValue}
                >
                  {bar.high.toFixed(1)}x
                </text>

                {/* Median dot */}
                <circle
                  cx={xMed}
                  cy={y + BAR_HEIGHT / 2}
                  r={5}
                  fill={bar.colorVar}
                />
              </g>
            );
          })}

          {/* Argos annotation */}
          <line
            x1={xScale(ARGOS_X)}
            y1={TOP_PADDING - 14}
            x2={xScale(ARGOS_X)}
            y2={TOP_PADDING + totalBarsHeight + 8}
            stroke="var(--text-3)"
            strokeWidth={1.2}
            strokeDasharray="5 3"
            opacity={0.4}
          />
          <text
            x={xScale(ARGOS_X)}
            y={TOP_PADDING - 18}
            textAnchor="middle"
            className={styles.annotationLabel}
          >
            Argos 2025 mid-market
          </text>

          {/* X-axis ticks */}
          {TICKS.map((tick) => (
            <text
              key={tick}
              x={xScale(tick)}
              y={TOP_PADDING + totalBarsHeight + 24}
              textAnchor="middle"
              className={styles.axisLabel}
            >
              {tick}x
            </text>
          ))}
        </svg>
      </div>

      <blockquote className={styles.quote}>
        Transaction comps are the anchor. Trading comps confirm or challenge. LBO
        floor sets the minimum. The banker decides the weights.
      </blockquote>
    </div>
  );
}
