import { brandData } from '../data/brand';
import styles from './Contact.module.css';

const contactItems = [
  { label: 'Email', value: 'christian@bishopadv.ai', icon: '✉' },
  { label: 'Website', value: 'bishopadv.ai', icon: '🌐' },
  { label: 'Phone', value: '(832) 603-7269', icon: '📞' },
  { label: 'GA4 ID', value: 'G-XXXXXXXXXX', icon: '📊' },
];

const socials = [
  { platform: 'LinkedIn', handle: 'Bishop Advertising & AI', url: 'https://linkedin.com/company/bishop-advertising-ai' },
  { platform: 'Instagram', handle: '@bishopadv.ai', url: '#' },
  { platform: 'X / Twitter', handle: '@bishopadv', url: '#' },
];

function CopyItem({ label, value, icon }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try { await navigator.clipboard.writeText(value); }
    catch {
      const el = document.createElement('textarea');
      el.value = value; document.body.appendChild(el); el.select();
      document.execCommand('copy'); document.body.removeChild(el);
    }
    setCopied(true); setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className={`${styles.contactCard} ${copied ? styles.flash : ''}`} onClick={handleCopy}>
      <span className={styles.icon}>{icon}</span>
      <div className={styles.contactBody}>
        <span className={styles.contactLabel}>{label}</span>
        <span className={styles.contactValue}>{value}</span>
      </div>
      <span className={styles.copyHint}>{copied ? '✓' : 'tap to copy'}</span>
    </div>
  );
}

import { useState } from 'react';
import SectionHead from '../components/SectionHead';

export default function Contact() {
  return (
    <div className="page-content">
      <h1 className={styles.pageTitle}>Contact</h1>

      <SectionHead title="Bishop Advertising & AI" />
      {contactItems.map((item) => (
        <CopyItem key={item.label} {...item} />
      ))}

      <SectionHead title="Social" />
      {socials.map((s) => (
        <div key={s.platform} className={styles.socialCard}>
          <span className={styles.socialPlatform}>{s.platform}</span>
          <span className={styles.socialHandle}>{s.handle}</span>
        </div>
      ))}

      <SectionHead title="Brand Colors" />
      <div className={styles.colorRow}>
        {brandData.colors.map((c) => (
          <div key={c.hex} className={styles.colorSwatch}>
            <div
              className={styles.swatchBlock}
              style={{ background: c.hex, border: c.hex === '#ffffff' ? '1px solid var(--border-md)' : 'none' }}
            />
            <span className={styles.swatchHex}>{c.hex}</span>
            <span className={styles.swatchName}>{c.name}</span>
          </div>
        ))}
      </div>

      <div className={styles.warning}>
        ⚠ Team cards and testimonials — verify before publishing
      </div>
    </div>
  );
}
