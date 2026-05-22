import { brandData } from '../data/brand';
import SectionHead from '../components/SectionHead';
import styles from './Brand.module.css';

export default function Brand() {
  return (
    <div className="page-content">
      <h1 className={styles.pageTitle}>Brand Identity</h1>

      {/* Stats */}
      <div className={styles.statsRow}>
        {brandData.stats.map((s) => (
          <div key={s.label} className={styles.statCard}>
            <span className={styles.statVal}>{s.val}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Positioning */}
      <SectionHead title="Positioning" />
      <div className={styles.posCard}>
        <p className={styles.posCore}>{brandData.positioning.core}</p>
      </div>
      <div className={styles.posCard}>
        <span className={styles.posLabel}>What we are</span>
        <p className={styles.posText}>{brandData.positioning.what}</p>
      </div>
      <div className={styles.posCard}>
        <span className={styles.posLabel}>What we are not</span>
        <p className={styles.posText}>{brandData.positioning.not}</p>
      </div>

      {/* Method */}
      <SectionHead title="The Bishop Method" />
      {brandData.method.map((m) => (
        <div key={m.num} className={styles.methodCard}>
          <span className={styles.methodNum}>{m.num}</span>
          <div className={styles.methodBody}>
            <div className={styles.methodTop}>
              <span className={styles.methodTitle}>{m.title}</span>
              <span className={styles.methodSub}>{m.sub}</span>
            </div>
            <p className={styles.methodDesc}>{m.desc}</p>
          </div>
        </div>
      ))}

      {/* Aesthetic & Tone */}
      <div className={styles.twoCol}>
        <div>
          <SectionHead title="Aesthetic" />
          <div className={styles.pillWrap}>
            {brandData.aesthetic.map((a) => (
              <span key={a} className={styles.tagPill}>{a}</span>
            ))}
          </div>
        </div>
        <div>
          <SectionHead title="Tone" />
          <div className={styles.pillWrap}>
            {brandData.tone.map((t) => (
              <span key={t} className={styles.tagPill}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <SectionHead title="Values" />
      <div className={styles.pillWrap}>
        {brandData.values.map((v) => (
          <span key={v} className={`${styles.tagPill} ${styles.tagOrange}`}>{v}</span>
        ))}
      </div>

      {/* Voice Rules */}
      <SectionHead title="Voice Rules" />
      <div className={styles.voiceGrid}>
        <div className={styles.voiceCol}>
          <span className={styles.voiceHead}>Do</span>
          {brandData.voice.do.map((d) => (
            <p key={d} className={`${styles.voiceItem} ${styles.voiceDo}`}>{d}</p>
          ))}
        </div>
        <div className={styles.voiceCol}>
          <span className={styles.voiceHead}>Don't</span>
          {brandData.voice.dont.map((d) => (
            <p key={d} className={`${styles.voiceItem} ${styles.voiceDont}`}>{d}</p>
          ))}
        </div>
      </div>

      {/* Colors */}
      <SectionHead title="Brand Colors" />
      <div className={styles.colorRow}>
        {brandData.colors.map((c) => (
          <div key={c.hex} className={styles.colorSwatch}>
            <div
              className={styles.swatchBlock}
              style={{ background: c.hex, border: c.hex === '#ffffff' ? '1px solid var(--border-md)' : 'none' }}
            />
            <span className={styles.swatchName}>{c.name}</span>
            <span className={styles.swatchHex}>{c.hex}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
