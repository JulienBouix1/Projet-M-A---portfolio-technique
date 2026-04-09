"use client";

import { startTransition, useState } from "react";
import s from "./DealPipeline.module.css";

type PipelineStatus = "live" | "testing" | "spec";

type PipelineStage = {
  id: string;
  number: string;
  title: string;
  status: PipelineStatus;
  oneLiner: string;
  details: string[];
  architectureInsight: string;
};

type DealPipelineProps = {
  stages: PipelineStage[];
};

const statusLabel: Record<PipelineStatus, string> = {
  live: "LIVE",
  testing: "IN TEST",
  spec: "SPEC",
};

function Chevron({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={`${s.chevron} ${expanded ? s.chevronExpanded : ""}`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DealPipeline({ stages }: DealPipelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function toggle(id: string) {
    startTransition(() => {
      setExpandedId((prev) => (prev === id ? null : id));
    });
  }

  return (
    <div className={s.pipeline}>
      {stages.map((stage) => {
        const isExpanded = expandedId === stage.id;
        return (
          <div
            key={stage.id}
            className={`${s.card} ${isExpanded ? s.cardExpanded : ""}`}
          >
            <button
              className={s.header}
              onClick={() => toggle(stage.id)}
              aria-expanded={isExpanded}
              type="button"
            >
              <span className={s.meta}>
                <span className={s.number}>{stage.number}</span>
                <span className={s.title}>{stage.title}</span>
                <span className={`${s.badge} ${s[stage.status]}`}>
                  {statusLabel[stage.status]}
                </span>
              </span>
              <span className={s.oneLiner}>{stage.oneLiner}</span>
              <Chevron expanded={isExpanded} />
            </button>

            <div
              className={s.body}
              style={{
                maxHeight: isExpanded ? "600px" : "0px",
              }}
            >
              <div className={s.bodyInner}>
                <ul className={s.details}>
                  {stage.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>

                <div className={s.insightBlock}>
                  <span className={s.insightLabel}>Architecture Insight</span>
                  <div className={s.insightCallout}>
                    {stage.architectureInsight}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
