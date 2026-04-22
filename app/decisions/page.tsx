import Link from "next/link";
import type { Metadata } from "next";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Architecture Decisions Log — Epoch Associes",
  description:
    "Load-bearing decisions for the Epoch deal operating system, with the reasoning behind each one and the alternatives we rejected."
};

type Decision = {
  id: string;
  date: string;
  title: string;
  status: "accepted" | "revisiting" | "superseded";
  context: string;
  decision: string;
  consequences: string;
  rejected: string;
};

const decisions: Decision[] = [
  {
    id: "DEC-001",
    date: "2025-10",
    title: "Deterministic extraction over LLM extraction for financial data",
    status: "accepted",
    context:
      "Liasses fiscales, grand livre, and FEC files carry the primary financial signal for every deal. A single wrong EBITDA propagates into the valuation, the IM, and every buyer conversation. Cost of an error is high and hard to detect after the fact.",
    decision:
      "Never let an LLM generate financial figures. PDF parsing runs through Docling (IBM, MIT-licensed) for deterministic table extraction. Excel parsing runs through openpyxl. The LLM is only permitted to classify documents and flag anomalies.",
    consequences:
      "We pay the cost of building a richer extraction pipeline (form recognition, table normalisation, FEC schema handling) instead of outsourcing the work to a prompt. Extraction is reproducible and auditable. Edge cases require explicit rules rather than hoping the model notices.",
    rejected:
      "A single prompt that ingests the whole PDF and returns structured JSON. Rejected because hallucination rates on numeric extraction at this document length are incompatible with the use case."
  },
  {
    id: "DEC-002",
    date: "2025-11",
    title: "A single LLM gateway — no direct SDK imports in business modules",
    status: "accepted",
    context:
      "Frontier model leaderboards change monthly. Being locked to one SDK means every model migration becomes a codebase refactor touching dozens of call sites. Price/quality tradeoffs also differ per task type (reasoning, structured output, web extraction).",
    decision:
      "All frontier calls go through a single client at infra/llm_client.py. Business modules import that client only. Model routing is config-driven: task type → model name. Switching from Claude to GPT to Gemini is a YAML change.",
    consequences:
      "Adds one layer of indirection and a small amount of per-request overhead. Forces us to standardise on a minimal common-denominator API surface. Vendor-specific features (Anthropic caching, OpenAI structured outputs) need explicit gateway support before any module can use them.",
    rejected:
      "Per-module SDK imports for maximum flexibility. Rejected because the cost of one migration in the first three months outweighed the cumulative cost of the abstraction."
  },
  {
    id: "DEC-003",
    date: "2025-11",
    title: "HTMX + Jinja over React for the cockpit",
    status: "accepted",
    context:
      "The cockpit is an internal control surface for a two-person team. Five tabs (Sourcing, Deals, Buyers, Analyst HITL, VP view), all read-heavy, all server-rendered. Peak concurrent users: two.",
    decision:
      "FastAPI + HTMX + Jinja2 templates. Server-rendered HTML with partial updates. No SPA framework, no build step for the UI, no state management library.",
    consequences:
      "Shipped the first working cockpit in three weeks instead of eight. Deployment is a single container. Debugging is HTML in the DevTools. The cost is that if the product ever grows to an external user base with real interaction patterns, we'll need to port to React.",
    rejected:
      "Next.js + React Query. Rejected for this cockpit; retained for the public portfolio site where we actually need SPA capabilities."
  },
  {
    id: "DEC-004",
    date: "2025-12",
    title: "LangGraph only for the Email VP agent, not as a general orchestrator",
    status: "accepted",
    context:
      "LangGraph is powerful but introduces real complexity: stateful graphs, checkpointing, debuggability tradeoffs. Most of our modules are linear pipelines (sourcing → enrichment → scoring) that do not need stateful orchestration.",
    decision:
      "Use LangGraph only where stateful memory across weeks matters — specifically, the Email VP agent that needs to remember that Argos asked for exclusivity on March 3rd when they reply on March 20th. Everywhere else, plain sequential Python with Pydantic contracts at the boundaries.",
    consequences:
      "Most of the codebase stays readable by anyone who knows Python. Onboarding a contractor on a business module does not require learning a framework. The VP agent's persistence is a solved problem via PostgreSQL checkpointing.",
    rejected:
      "Wrapping every module in a LangGraph state machine. Rejected because CrewAI / AutoGen / full-LangGraph deployments add a framework tax without a matching benefit for linear pipelines."
  },
  {
    id: "DEC-005",
    date: "2026-01",
    title: "Build the 7M-record buyer database without Pappers",
    status: "accepted",
    context:
      "Pappers provides a clean API for French company data at a real cost per call. The raw signal it provides (INSEE identity, INPI filings, BODACC publications) is publicly available from the original administrations.",
    decision:
      "Ingest directly from INSEE (SIRENE stock files), INPI RNE (beneficial owners, directors), BODACC (acquisition history, legal notices), and open procurement data. Run our own entity resolution on top (see case study). Pay with engineering time, not per-call fees.",
    consequences:
      "The database becomes a defensible asset: we own the schema, the refresh cadence, and the enrichment layers. Every enrichment we add compounds on the next deal. Downside: we carry the maintenance burden when upstream schemas change, which they do.",
    rejected:
      "Pappers-as-a-service. Rejected because at our expected query volume, the cumulative API cost would exceed the engineering cost of the in-house build within the first year, and we would hold no IP at the end."
  },
  {
    id: "DEC-006",
    date: "2026-02",
    title: "No Send Ever — not now, not in V2, not ever",
    status: "accepted",
    context:
      "Every generative system faces the question of how aggressive to be with autonomous external action. In M&A, an agent sending an email to a buyer without banker review is a business-ending risk: confidentiality breach, mistimed outreach, tone that misrepresents the mandate.",
    decision:
      "No agent may send any external communication. Ever. The HITL queue in the cockpit is the terminal stop for every agent output. The banker reviews, edits, or rejects, and the banker presses send. This is a product invariant, not a configuration.",
    consequences:
      "Throughput is capped by banker review time. We accept this because the reputation cost of one misfired email exceeds the throughput gain of any automation. We have received requests to relax this rule and have refused every one.",
    rejected:
      "'Auto-send with human override within 15 minutes' policies. Rejected because the failure mode is adversarial (a bad email reaches a buyer before the override fires) and cannot be undone."
  },
  {
    id: "DEC-007",
    date: "2026-03",
    title: "Hybrid RAG (dense + BM25 + RRF + cross-encoder) over embed-only",
    status: "accepted",
    context:
      "Pure embedding-based retrieval under-recalls exact numerics and named entities. In M&A retrieval, the query is often 'what was the 2023 EBITDA for this specific company' — a question where approximate semantic match is worse than useless.",
    decision:
      "All retrieval uses Qdrant with hybrid search: bge-m3 dense embeddings + BM25 sparse, fused via Reciprocal Rank Fusion, then reranked with bge-reranker-v2-m3 cross-encoder. Namespaces are strict: deal_{id}_{type}.",
    consequences:
      "Retrieval quality on numeric and named-entity queries is materially better than embed-only baselines. Latency budget per retrieval increases to ~200–400ms. Qdrant hosting and cross-encoder inference add infrastructure cost. Worth it for the correctness gain.",
    rejected:
      "Embed-only with a single dense model. Rejected after measured recall on a golden set of M&A queries was unacceptable for financial figures."
  }
];

const statusLabel: Record<Decision["status"], string> = {
  accepted: "Accepted",
  revisiting: "Revisiting",
  superseded: "Superseded"
};

export default function DecisionsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link href="/" className={styles.back}>
            ← Back to portfolio
          </Link>
          <span className={styles.tag}>Architecture decisions log</span>
          <h1 className={styles.title}>
            The load-bearing decisions, and the alternatives we rejected.
          </h1>
          <p className={styles.lede}>
            This log captures the architecture choices that shape how every
            module behaves. Each entry follows the same shape: the context, the
            decision, its consequences, and what we considered and rejected.
            Entries marked <em>revisiting</em> are ones we expect to reopen.
          </p>
        </div>
      </header>

      <section className={styles.body}>
        <div className={styles.inner}>
          {decisions.map((dec) => (
            <article key={dec.id} className={styles.decision}>
              <header className={styles.decisionHeader}>
                <span className={styles.decisionId}>{dec.id}</span>
                <span className={styles.decisionDate}>{dec.date}</span>
                <span className={`${styles.decisionStatus} ${styles[`status_${dec.status}`]}`}>
                  {statusLabel[dec.status]}
                </span>
              </header>
              <h2 className={styles.decisionTitle}>{dec.title}</h2>
              <dl className={styles.decisionGrid}>
                <div>
                  <dt>Context</dt>
                  <dd>{dec.context}</dd>
                </div>
                <div>
                  <dt>Decision</dt>
                  <dd>{dec.decision}</dd>
                </div>
                <div>
                  <dt>Consequences</dt>
                  <dd>{dec.consequences}</dd>
                </div>
                <div>
                  <dt>Rejected alternative</dt>
                  <dd>{dec.rejected}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.inner}>
          <Link href="/" className={styles.back}>
            ← Back to portfolio
          </Link>
          <Link href="/case-studies/entity-resolution" className={styles.nextLink}>
            Entity resolution case study →
          </Link>
        </div>
      </footer>
    </main>
  );
}
