import { useState } from 'react';
import { campaignData } from '../data/campaigns';
import styles from './Campaigns.module.css';

const priorityLabel = { 1: 'High', 2: 'Medium', 3: 'Low' };
const priorityClass = { 1: 'high', 2: 'med', 3: 'low' };

export default function Campaigns() {
  const [filter, setFilter] = useState('All');
  const [copied, setCopied] = useState(null);

  const filtered = campaignData.filter((c) => {
    if (filter === 'High') return c.priority === 1;
    if (filter === 'Medium') return c.priority === 2;
    return true;
  });

  async function handleCopy(c, i) {
    const text = `CAMPAIGN: ${c.title}\n\nHero: ${c.hero}\n\nCTA: ${c.cta}\n\nWhy it works: ${c.why}`;
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
    setCopied(i);
    setTimeout(() => setCopied(null), 1800);
  }

  return (
    <div className="page-content">
      <h1 className={styles.pageTitle}>Campaigns</h1>
      <div className={styles.filterRow}>
        {['All', 'High', 'Medium'].map((f) => (
          <button
            key={f}
            className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      {filtered.map((c, i) => (
        <div key={c.title} className={`${styles.card} ${copied === i ? styles.flash : ''}`}>
          <div className={styles.cardTop}>
            <h3 className={styles.cardTitle}>{c.title}</h3>
            <span className={`${styles.badge} ${styles[priorityClass[c.priority]]}`}>
              {priorityLabel[c.priority]}
            </span>
          </div>
          <p className={styles.hero}>{c.hero}</p>
          <div className={styles.ctaRow}>
            <span className={styles.ctaLabel}>CTA</span>
            <span className={styles.ctaText}>{c.cta}</span>
          </div>
          <p className={styles.why}>{c.why}</p>
          <button
            className={`${styles.copyBtn} ${copied === i ? styles.done : ''}`}
            onClick={() => handleCopy(c, i)}
          >
            {copied === i ? 'Copied ✓' : 'Copy brief'}
          </button>
        </div>
      ))}
    </div>
  );
}
