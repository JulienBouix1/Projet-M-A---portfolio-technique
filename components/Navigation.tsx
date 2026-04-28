"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavSection } from "@/lib/site-content";
import { useUIStore } from "@/store/ui-store";
import { useLangStore } from "@/store/lang-store";

import styles from "./Navigation.module.css";

type NavigationProps = {
  sections: NavSection[];
};

export function Navigation({ sections }: NavigationProps) {
  const activeSection = useUIStore((s) => s.activeSection);
  const { lang, toggleLang } = useLangStore();
  const pathname = usePathname();
  const isOperator = pathname.endsWith("/operator");
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
          <span className={styles.brandName}>Epoch Associés</span>
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
        </nav>

        <div className={styles.controls}>
          <div
            className={styles.audienceGroup}
            role="group"
            aria-label={lang === "fr" ? "Audience" : "Audience"}
          >
            <Link
              href="/"
              className={`${styles.audienceBtn} ${!isOperator ? styles.audienceActive : ""}`}
              aria-current={!isOperator ? "page" : undefined}
            >
              M&A
            </Link>
            <Link
              href="/operator"
              className={`${styles.audienceBtn} ${isOperator ? styles.audienceActive : ""}`}
              aria-current={isOperator ? "page" : undefined}
            >
              {lang === "fr" ? "Opérateur" : "Operator"}
            </Link>
          </div>
          <button
            className={styles.langToggle}
            type="button"
            onClick={toggleLang}
            aria-label={`Switch to ${lang === "fr" ? "English" : "French"}`}
          >
            {lang === "fr" ? "EN" : "FR"}
          </button>
        </div>
      </div>
    </header>
  );
}
