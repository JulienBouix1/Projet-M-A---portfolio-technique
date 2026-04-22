"use client";

import { useEffect, useRef, useState } from "react";

import type { NavSection } from "@/lib/site-content";
import { useUIStore } from "@/store/ui-store";
import { useLangStore } from "@/store/lang-store";
import { useAudienceStore } from "@/store/audience-store";

import styles from "./Navigation.module.css";

type NavigationProps = {
  sections: NavSection[];
};

export function Navigation({ sections }: NavigationProps) {
  const activeSection = useUIStore((s) => s.activeSection);
  const { lang, toggleLang } = useLangStore();
  const { audience, setAudience } = useAudienceStore();
  const [scrolled, setScrolled] = useState(false);
  const shellRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={shellRef}
      className={`${styles.shell} ${scrolled ? styles.scrolled : ""}`}
    >
      <div className={styles.inner}>
        <a className={styles.brand} href="#top">
          <span className={styles.brandMark}>EA</span>
          <span className={styles.brandName}>Epoch Associes</span>
        </a>

        <nav className={styles.nav} aria-label="Main navigation">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={activeSection === s.id ? styles.active : undefined}
            >
              {s.label}
            </a>
          ))}
          <div className={styles.controls}>
            <div
              className={styles.audienceGroup}
              role="group"
              aria-label={lang === "fr" ? "Audience" : "Audience"}
            >
              <button
                type="button"
                className={`${styles.audienceBtn} ${audience === "banker" ? styles.audienceActive : ""}`}
                onClick={() => setAudience("banker")}
                aria-pressed={audience === "banker"}
              >
                {lang === "fr" ? "Banquier" : "Banker"}
              </button>
              <button
                type="button"
                className={`${styles.audienceBtn} ${audience === "operator" ? styles.audienceActive : ""}`}
                onClick={() => setAudience("operator")}
                aria-pressed={audience === "operator"}
              >
                {lang === "fr" ? "Opérateur" : "Operator"}
              </button>
            </div>
            <button
              className={styles.langToggle}
              onClick={toggleLang}
              aria-label={`Switch to ${lang === "fr" ? "English" : "French"}`}
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>
            <a className={styles.printBtn} href="/portfolio/print" target="_blank" rel="noopener" title={lang === "fr" ? "Version PDF imprimable" : "Printable PDF version"}>
              PDF
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
