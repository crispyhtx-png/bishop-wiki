import { useState } from 'react';
import { copyData } from '../data/copy';
import SearchBar from '../components/SearchBar';
import CopyCard from '../components/CopyCard';
import styles from './CopyVault.module.css';

const allCats = ['All', ...copyData.map((c) => c.cat)];

export default function CopyVault() {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('All');

  const filtered = copyData
    .filter((group) => activeCat === 'All' || group.cat === activeCat)
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          !query ||
          item.text.toLowerCase().includes(query.toLowerCase()) ||
          item.sub.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="page-content">
      <h1 className={styles.pageTitle}>Copy Vault</h1>
      <SearchBar value={query} onChange={setQuery} placeholder="Search copy…" />
      <div className={styles.catRow}>
        {allCats.map((cat) => (
          <button
            key={cat}
            className={`${styles.catBtn} ${activeCat === cat ? styles.active : ''}`}
            onClick={() => setActiveCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      {filtered.map((group) => (
        <div key={group.cat}>
          <div className={styles.groupHead}>{group.cat}</div>
          {group.items.map((item, i) => (
            <CopyCard key={i} text={item.text} sub={item.sub} />
          ))}
        </div>
      ))}
      {filtered.length === 0 && (
        <p className={styles.empty}>No results for "{query}"</p>
      )}
    </div>
  );
}
