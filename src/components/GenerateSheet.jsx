import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './GenerateSheet.module.css';

const FORMAT_OPTIONS = [
  { id: 'bullet',   label: '• Bullet' },
  { id: 'numbered', label: '1. Numbered' },
  { id: 'plain',    label: 'Plain' },
  { id: 'dash',     label: '— Em dash' },
];

const formatters = {
  bullet:   (items) => items.map((t) => `• ${t}`).join('\n'),
  numbered: (items) => items.map((t, i) => `${i + 1}. ${t}`).join('\n'),
  plain:    (items) => items.join('\n\n'),
  dash:     (items) => items.map((t) => `— ${t}`).join('\n'),
};

export default function GenerateSheet({ items, onClose }) {
  const [format, setFormat] = useState('bullet');
  const [copied, setCopied] = useState(false);

  const output = formatters[format](items);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(output);
    } catch {
      const el = document.createElement('textarea');
      el.value = output;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />
      <motion.div
        className={styles.sheet}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 340, damping: 34 }}
      >
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.title}>Generate</span>
          <span className={styles.itemCount}>{items.length} item{items.length !== 1 ? 's' : ''}</span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">×</button>
        </div>

        {/* Format tabs */}
        <div className={styles.formatRow}>
          {FORMAT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              className={`${styles.formatBtn} ${format === opt.id ? styles.formatActive : ''}`}
              onClick={() => { setFormat(opt.id); setCopied(false); }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Preview */}
        <div className={styles.preview}>
          <pre className={styles.previewText}>{output}</pre>
        </div>

        {/* Copy button */}
        <button
          className={`${styles.copyAllBtn} ${copied ? styles.copyDone : ''}`}
          onClick={handleCopy}
        >
          {copied ? 'Copied ✓' : 'Copy All'}
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
