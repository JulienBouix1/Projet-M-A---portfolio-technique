"use client";

import styles from "./ComparisonTable.module.css";

type ComparisonRow = {
  property: string;
  baseline: string;
  epoch: string;
};

type ComparisonTableProps = {
  rows: ComparisonRow[];
};

export default function ComparisonTable({ rows }: ComparisonTableProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerCell}>Property</div>
        <div className={styles.headerCell}>ChatGPT + a Banker</div>
        <div className={styles.headerCell}>Epoch</div>
      </div>
      {rows.map((row, i) => (
        <div key={i} className={styles.row}>
          <div className={styles.propertyCell}>{row.property}</div>
          <div className={styles.baselineCell}>{row.baseline}</div>
          <div className={styles.epochCell}>{row.epoch}</div>
        </div>
      ))}
    </div>
  );
}
