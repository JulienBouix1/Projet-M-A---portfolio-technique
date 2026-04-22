import Link from "next/link";
import type { Metadata } from "next";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Entity Resolution — Epoch Associes Case Study",
  description:
    "How we resolve 500,000 company entities per day through a 3-tier cascade that keeps 98% of work at zero marginal cost."
};

export default function EntityResolutionPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link href="/" className={styles.back}>
            ← Back to portfolio
          </Link>
          <span className={styles.tag}>Case study · Engineering</span>
          <h1 className={styles.title}>
            Resolving 500,000 French company entities per day at zero marginal
            cost.
          </h1>
          <p className={styles.lede}>
            This is the unsexy work that makes the rest of the system possible.
            The architecture is a 3-tier cascade: deterministic matching first,
            local inference second, frontier model only as a last resort. What
            follows is how we arrived at those numbers, what each tier actually
            does, and the tradeoffs we consciously accepted.
          </p>
          <dl className={styles.metaGrid}>
            <div>
              <dt>Scale</dt>
              <dd>~500K candidate entities / day</dd>
            </div>
            <div>
              <dt>Cost (naive)</dt>
              <dd>~$250K / day via frontier API</dd>
            </div>
            <div>
              <dt>Cost (our cascade)</dt>
              <dd>~$1–3K / day, dominated by fixed GPU depreciation</dd>
            </div>
            <div>
              <dt>Failure rate @ tier 1</dt>
              <dd>~30%</dd>
            </div>
            <div>
              <dt>Escalation to tier 3</dt>
              <dd>&lt;2%</dd>
            </div>
            <div>
              <dt>P99 latency</dt>
              <dd>~4.2s (when tier 3 fires)</dd>
            </div>
          </dl>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.inner}>
          <span className={styles.sectionTag}>The problem</span>
          <h2 className={styles.h2}>
            Same company, fifteen different spellings, six different portals.
          </h2>
          <p>
            Small-cap M&A sourcing means ingesting 10+ deal portals (BPI,
            Fusacq, CessionPME, Michel Simond, and seven others), each with its
            own freeform description of the target. The same company might
            appear as <em>“Plomberie Dupont”</em>, <em>“Plomberie Dupont SAS”</em>,{" "}
            <em>“Ets Dupont Père &amp; Fils”</em>, <em>“Dupont - Plombier à
            Lyon 69”</em>, and <em>“DUPONT (SIREN 123456789)”</em>. Left
            unresolved, we’d pay multiple times for the same lead and pollute
            downstream signal with duplicates.
          </p>
          <p>
            Resolution means mapping every candidate string to a canonical
            SIRENE record (the French statistical-institute national register).
            When SIRENE doesn’t have it, we escalate: INPI RNE, BODACC, open
            company-data aggregators, and eventually manual review.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <span className={styles.sectionTag}>The naive approach</span>
          <h2 className={styles.h2}>
            LLM-only resolution: $250K/day, and wrong.
          </h2>
          <p>
            The obvious first instinct is to prompt a frontier model with a
            candidate name and ask it to return a canonical SIRENE ID. It
            works on a toy dataset. It fails at scale for three compounding
            reasons:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Cost.</strong> At roughly $0.50 per resolution with
              Claude or GPT-4 and the volume we process, the bill would reach
              six figures per day before the end of week one.
            </li>
            <li>
              <strong>Latency.</strong> Each call is a 1–3 second round-trip.
              For 500K entities, the serial version takes ~10 days and the
              parallelised version hits provider rate limits within minutes.
            </li>
            <li>
              <strong>Accuracy.</strong> Frontier models hallucinate SIREN
              numbers that don’t exist. In a domain where a wrong identifier
              cascades into the wrong filing, the wrong financials, and the
              wrong valuation, this is not acceptable — even at 99% accuracy,
              1% hallucination on 500K entities is 5,000 poisoned records per
              day.
            </li>
          </ul>
          <p>
            The constraints force a different architecture: do as little LLM
            work as possible, and verify everything deterministically.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <span className={styles.sectionTag}>Architecture</span>
          <h2 className={styles.h2}>
            Three tiers. Each one fires only if the previous fails.
          </h2>
          <div className={styles.tierGrid}>
            <article className={styles.tier}>
              <span className={styles.tierBadge}>Tier 1</span>
              <h3>Deterministic fuzzy match</h3>
              <p className={styles.tierLine}>
                ~70% resolved · $0 · &lt;50ms
              </p>
              <ul>
                <li>
                  Normalise strings (remove legal forms, accents, extra
                  whitespace, trailing city/postal hints).
                </li>
                <li>
                  Probe against an indexed Postgres table of ~4M resolved
                  SIRENE records with <code>pg_trgm</code> similarity.
                </li>
                <li>
                  If top match ≥ 0.92 similarity AND legal-form or postal-code
                  match on the tie-breaker, accept.
                </li>
                <li>
                  Cost: disk seek plus index lookup. No GPU, no API. This tier
                  dominates throughput.
                </li>
              </ul>
            </article>

            <article className={styles.tier}>
              <span className={styles.tierBadge}>Tier 2</span>
              <h3>Local Qwen 2.5 32B-AWQ on vLLM</h3>
              <p className={styles.tierLine}>
                ~28% resolved · ~$0 marginal · ~600ms
              </p>
              <ul>
                <li>
                  Candidate retrieval: top-10 similar SIRENE records by{" "}
                  <code>pg_trgm</code> + sector embedding similarity.
                </li>
                <li>
                  Qwen 32B (AWQ 4-bit, ~18GB VRAM on an RTX 4090) is prompted
                  with the candidate string plus the 10 candidates and asked
                  to pick one or return <code>none</code>.
                </li>
                <li>
                  Output is constrained JSON via vLLM guided decoding; the
                  model cannot return a SIREN that isn’t in the shortlist.
                </li>
                <li>
                  Zero per-call API cost. Amortised fixed cost from the GPU
                  and power draw.
                </li>
              </ul>
            </article>

            <article className={styles.tier}>
              <span className={styles.tierBadge}>Tier 3</span>
              <h3>Frontier model via gateway</h3>
              <p className={styles.tierLine}>
                &lt;2% resolved · $0.50 / call · ~2.5s
              </p>
              <ul>
                <li>
                  Reserved for ambiguous cases where Qwen returned{" "}
                  <code>none</code> or its confidence was below a calibrated
                  threshold.
                </li>
                <li>
                  Expanded context: additional LinkedIn signals, BODACC
                  filings, web snippets fetched via Kimi 2.5.
                </li>
                <li>
                  If this tier also fails, the entity goes to the HITL queue
                  for human adjudication. This is the only path through which
                  a resolution can be accepted without a match in an
                  authoritative register.
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <span className={styles.sectionTag}>Numbers</span>
          <h2 className={styles.h2}>
            What the cascade actually buys us.
          </h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Dimension</th>
                  <th>LLM-only</th>
                  <th>Cascade</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cost per resolution</td>
                  <td>~$0.50</td>
                  <td>~$0.002 (blended)</td>
                </tr>
                <tr>
                  <td>Daily cost @ 500K</td>
                  <td>~$250,000</td>
                  <td>~$1,000</td>
                </tr>
                <tr>
                  <td>P50 latency</td>
                  <td>~1.8s</td>
                  <td>~45ms</td>
                </tr>
                <tr>
                  <td>P99 latency</td>
                  <td>~4.0s</td>
                  <td>~4.2s (when tier 3 fires)</td>
                </tr>
                <tr>
                  <td>Hallucinated IDs</td>
                  <td>~1% of outputs</td>
                  <td>0% (constrained decoding + register check)</td>
                </tr>
                <tr>
                  <td>Throughput ceiling</td>
                  <td>API rate limit</td>
                  <td>Postgres index + GPU batch</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The headline number isn’t the cost reduction — it’s the hallucinated
            ID count going to zero. Tier 1 and Tier 2 cannot, structurally,
            return a SIREN that doesn’t exist: Tier 1 looks up against an index
            of real records, Tier 2 uses guided decoding against a shortlist
            drawn from the same index. Only Tier 3 has degrees of freedom, and
            its output is itself validated against SIRENE before acceptance.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <span className={styles.sectionTag}>Tradeoffs</span>
          <h2 className={styles.h2}>
            What we gave up, and why we’re fine with it.
          </h2>
          <ul className={styles.list}>
            <li>
              <strong>We cannot discover genuinely new entities.</strong> If a
              candidate company isn’t in SIRENE (e.g. it was just registered
              yesterday and our mirror is 48 hours old), Tier 1 misses, Tier 2
              has no shortlist to pick from, and Tier 3 goes to HITL. That’s
              the right behaviour for our use case: M&A targets are, by
              definition, companies old enough to be acquirable.
            </li>
            <li>
              <strong>Tier 2 depends on the quality of the shortlist.</strong>
              If our similarity retrieval misses the right candidate in its
              top-10, Qwen cannot rescue it. We tuned the similarity threshold
              to prefer recall over precision at the retrieval stage, at the
              cost of Qwen doing more work.
            </li>
            <li>
              <strong>A single RTX 4090 is a throughput cap.</strong> Qwen 32B
              at AWQ 4-bit yields ~40–60 tokens/sec per request on a 4090; at
              our current volume this is not a bottleneck, but scaling past
              ~2M entities/day would require either batching improvements or a
              second GPU.
            </li>
            <li>
              <strong>The cascade assumes hallucination is always bad.</strong>
              There are domains where a plausible-but-wrong guess is better
              than nothing. M&A is not one of them. The cascade enforces a
              hard “no invented identifiers” property at the architectural
              level, not at the prompt level.
            </li>
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <span className={styles.sectionTag}>Why this pattern generalises</span>
          <h2 className={styles.h2}>
            The cascade is not specific to entity resolution.
          </h2>
          <p>
            The same shape shows up everywhere we touch batch LLM work:
            deterministic first, local second, frontier only if the reasoning
            justifies it. It surfaces in document classification (regex → Qwen →
            Claude), in financial restatement proposals (rules → Qwen → HITL),
            in buyer-scoring (SQL filters → Qwen ranking → frontier reranker).
          </p>
          <p>
            The lesson we keep relearning is that the interesting question is
            never &ldquo;which model is best at task X?&rdquo; — it is{" "}
            <em>what does the cheapest correct path look like?</em> For most
            high-volume tasks, the answer has the first two tiers carrying
            the load.
          </p>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.inner}>
          <Link href="/" className={styles.back}>
            ← Back to portfolio
          </Link>
          <Link href="/decisions" className={styles.nextLink}>
            Architecture decisions log →
          </Link>
        </div>
      </footer>
    </main>
  );
}
