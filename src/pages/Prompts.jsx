import { promptData } from '../data/prompts';
import SectionHead from '../components/SectionHead';
import styles from './Prompts.module.css';
import { useState } from 'react';

function PromptCard({ title, body }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(body);
    } catch {
      const el = document.createElement('textarea');
      el.value = body;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  // Highlight [bracketed] placeholders in orange
  const parts = body.split(/(\[[^\]]+\])/g);

  return (
    <div className={`${styles.card} ${copied ? styles.flash : ''}`}>
      <p className={styles.title}>{title}</p>
      <p className={styles.body}>
        {parts.map((part, i) =>
          /^\[.+\]$/.test(part) ? (
            <span key={i} className={styles.placeholder}>{part}</span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </p>
      <button className={`${styles.btn} ${copied ? styles.done : ''}`} onClick={handleCopy}>
        {copied ? 'Copied ✓' : 'Copy'}
      </button>
    </div>
  );
}

export default function Prompts() {
  return (
    <div className="page-content">
      <h1 className={styles.pageTitle}>Prompts</h1>
      {promptData.map((group) => (
        <div key={group.cat}>
          <SectionHead title={group.cat} />
          {group.items.map((item, i) => (
            <PromptCard key={i} title={item.title} body={item.body} />
          ))}
        </div>
      ))}
    </div>
  );
}
