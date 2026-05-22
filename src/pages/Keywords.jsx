import { useState } from 'react';
import { keywordData } from '../data/keywords';
import SearchBar from '../components/SearchBar';
import Pill from '../components/Pill';
import SectionHead from '../components/SectionHead';
import styles from './Keywords.module.css';

export default function Keywords() {
  const [query, setQuery] = useState('');

  const filtered = keywordData
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (kw) => !query || kw.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="page-content">
      <h1 className={styles.pageTitle}>Keywords</h1>
      <p className={styles.hint}>Tap any keyword to copy it.</p>
      <SearchBar value={query} onChange={setQuery} placeholder="Filter keywords…" />
      {filtered.map((group) => (
        <div key={group.cat}>
          <SectionHead title={group.cat} tier={group.tier} />
          <div className={styles.pillWrap}>
            {group.items.map((kw) => (
              <Pill key={kw} text={kw} tier={group.tier} />
            ))}
          </div>
        </div>
      ))}
      {filtered.length === 0 && (
        <p className={styles.empty}>No keywords match "{query}"</p>
      )}
    </div>
  );
}
