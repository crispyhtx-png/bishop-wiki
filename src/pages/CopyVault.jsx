import { useState } from 'react';
import { copyData } from '../data/copy';
import SearchBar from '../components/SearchBar';
import CopyCard from '../components/CopyCard';
import SelectBar from '../components/SelectBar';
import GenerateSheet from '../components/GenerateSheet';
import styles from './CopyVault.module.css';

const allCats = ['All', ...copyData.map((c) => c.cat)];

export default function CopyVault() {
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState('All');
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState([]);
  const [showSheet, setShowSheet] = useState(false);

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

  function toggleItem(text) {
    setSelected((prev) =>
      prev.includes(text) ? prev.filter((t) => t !== text) : [...prev, text]
    );
  }

  function handleCancel() {
    setSelectMode(false);
    setSelected([]);
  }

  function handleClear() {
    setSelected([]);
  }

  return (
    <div className="page-content">
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Copy Vault</h1>
        <button
          className={`${styles.selectToggle} ${selectMode ? styles.selectActive : ''}`}
          onClick={selectMode ? handleCancel : () => setSelectMode(true)}
        >
          {selectMode ? 'Cancel' : 'Select'}
        </button>
      </div>

      {!selectMode && (
        <>
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
        </>
      )}

      {filtered.map((group) => (
        <div key={group.cat}>
          <div className={styles.groupHead}>{group.cat}</div>
          {group.items.map((item, i) => (
            <CopyCard
              key={i}
              text={item.text}
              sub={item.sub}
              selectable={selectMode}
              selected={selected.includes(item.text)}
              onToggle={toggleItem}
            />
          ))}
        </div>
      ))}

      {filtered.length === 0 && (
        <p className={styles.empty}>No results for "{query}"</p>
      )}

      <SelectBar
        count={selected.length}
        onClear={handleClear}
        onGenerate={() => setShowSheet(true)}
      />

      {showSheet && (
        <GenerateSheet
          items={selected}
          onClose={() => setShowSheet(false)}
        />
      )}
    </div>
  );
}
