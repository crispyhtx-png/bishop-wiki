import styles from './SectionHead.module.css';

export default function SectionHead({ title, sub, tier }) {
  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>{title}</h2>
      {sub && <p className={styles.sub}>{sub}</p>}
      {tier && <span className={`${styles.tier} ${styles[tier]}`}>{tier.toUpperCase()}</span>}
    </div>
  );
}
