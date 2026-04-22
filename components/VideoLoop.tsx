"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./VideoLoop.module.css";

type VideoLoopProps = {
  src: string;
  poster?: string;
  caption?: string;
  placeholderTitle?: string;
  placeholderHint?: string;
};

/**
 * VideoLoop renders a muted auto-playing video loop. When the file is
 * missing, it degrades to a labelled placeholder tile that keeps layout.
 *
 * Auto-play is muted (required by all browsers) and only starts when
 * the element scrolls into view (saves bandwidth, keeps phones cool).
 */
export function VideoLoop({ src, poster, caption, placeholderTitle, placeholderHint }: VideoLoopProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [errored, setErrored] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = videoRef.current;
    if (!node || errored) return;
    if (inView) {
      node.play().catch(() => { /* autoplay blocked — ignore */ });
    } else {
      node.pause();
    }
  }, [inView, errored]);

  return (
    <figure className={styles.figure}>
      <div className={styles.frame}>
        {errored ? (
          <div className={styles.placeholder}>
            <span className={styles.placeholderTag}>Video placeholder</span>
            {placeholderTitle && <span className={styles.placeholderTitle}>{placeholderTitle}</span>}
            {placeholderHint && <span className={styles.placeholderHint}>{placeholderHint}</span>}
            <code className={styles.placeholderPath}>{src}</code>
          </div>
        ) : (
          <video
            ref={videoRef}
            className={styles.video}
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setErrored(true)}
          />
        )}
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
