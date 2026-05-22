import { useState } from 'react';
import styles from './CopyCard.module.css';

export default function CopyCard({ cat, text, sub, mono = false }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback for older iOS
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }

  return (
    <div className={`${styles.card} ${copied ? styles.flash : ''}`}>
      {cat && <span className={styles.cat}>{cat}</span>}
      <p className={`${styles.text} ${mono ? styles.mono : ''}`}>{text}</p>
      {sub && <p className={styles.sub}>{sub}</p>}
      <button className={`${styles.btn} ${copied ? styles.btnDone : ''}`} onClick={handleCopy}>
        {copied ? 'Copied ✓' : 'Copy'}
      </button>
    </div>
  );
}
