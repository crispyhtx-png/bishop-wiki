import { useState } from 'react';
import styles from './Pill.module.css';

const tierStyles = {
  primary: styles.tierPrimary,
  aeo: styles.tierAeo,
  services: styles.tierServices,
  competitive: styles.tierCompetitive,
  local: styles.tierNeutral,
  longtail: styles.tierNeutral,
  brand: styles.tierNeutral,
};

export default function Pill({ text, tier }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <button
      className={`${styles.pill} ${tier ? tierStyles[tier] : ''} ${copied ? styles.copied : ''}`}
      onClick={handleCopy}
    >
      {copied ? '✓' : text}
    </button>
  );
}
