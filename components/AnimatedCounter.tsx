"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./AnimatedCounter.module.css";

type AnimatedCounterProps = {
  items: Array<{ value: number; suffix: string; label: string }>;
};

function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

const DURATION = 1400;
const STAGGER = 220;

export default function AnimatedCounter({ items }: AnimatedCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [currentValues, setCurrentValues] = useState<number[]>(
    () => items.map(() => 0)
  );

  const animate = useCallback(() => {
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      let stillRunning = false;
      const next = items.map((item, i) => {
        const localElapsed = elapsed - i * STAGGER;
        if (localElapsed <= 0) return 0;
        const progress = Math.min(localElapsed / DURATION, 1);
        if (progress < 1) stillRunning = true;
        return Math.round(easeOutExpo(progress) * item.value);
      });
      setCurrentValues(next);
      if (stillRunning || elapsed < items.length * STAGGER + DURATION) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [items]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasAnimated(true);
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasAnimated, animate]);

  return (
    <div ref={containerRef} className={styles.grid}>
      {items.map((item, i) => (
        <div
          key={item.label}
          className={styles.counter}
          style={{ transitionDelay: `${i * STAGGER}ms` }}
        >
          <div className={styles.numberCell}>
            <span className={styles.number}>{currentValues[i]}</span>
            <span className={styles.suffix}>{item.suffix}</span>
          </div>
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
