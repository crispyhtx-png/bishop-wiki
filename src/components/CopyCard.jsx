import { useState } from 'react';
import styles from './CopyCard.module.css';

export default function CopyCard({
  cat,
  text,
  sub,
  mono = false,
  selectable = false,
  selected = false,
  onToggle,
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
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

  function handleCardClick() {
    if (selectable && onToggle) onToggle(text);
  }

  const cardClass = [
    styles.card,
    copied && !selectable ? styles.flash : '',
    selectable ? styles.selectable : '',
    selected ? styles.selected : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClass} onClick={handleCardClick}>
      <div className={styles.cardInner}>
        <div className={styles.cardBody}>
          {cat && <span className={styles.cat}>{cat}</span>}
          <p className={`${styles.text} ${mono ? styles.mono : ''}`}>{text}</p>
          {sub && <p className={styles.sub}>{sub}</p>}
          {!selectable && (
            <button className={`${styles.btn} ${copied ? styles.btnDone : ''}`} onClick={handleCopy}>
              {copied ? 'Copied ✓' : 'Copy'}
            </button>
          )}
        </div>
        {selectable && (
          <div className={`${styles.checkbox} ${selected ? styles.checkboxChecked : ''}`}>
            {selected && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
