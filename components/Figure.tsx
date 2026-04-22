"use client";

import { useState } from "react";
import styles from "./Figure.module.css";

type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
  placeholderTitle?: string;
  placeholderHint?: string;
};

/**
 * Figure wraps a screenshot with a caption. If the image fails to load
 * (because the user hasn't dropped it into /public yet), it degrades
 * gracefully to a labelled placeholder tile — keeping layout intact.
 */
export function Figure({ src, alt, caption, placeholderTitle, placeholderHint }: FigureProps) {
  const [errored, setErrored] = useState(false);

  return (
    <figure className={styles.figure}>
      <div className={styles.frame}>
        {errored ? (
          <div className={styles.placeholder} role="img" aria-label={alt}>
            <span className={styles.placeholderTag}>Screenshot placeholder</span>
            {placeholderTitle && (
              <span className={styles.placeholderTitle}>{placeholderTitle}</span>
            )}
            {placeholderHint && (
              <span className={styles.placeholderHint}>{placeholderHint}</span>
            )}
            <code className={styles.placeholderPath}>{src}</code>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={styles.img}
            src={src}
            alt={alt}
            onError={() => setErrored(true)}
          />
        )}
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
