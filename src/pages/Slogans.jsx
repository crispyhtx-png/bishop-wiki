import { useState } from 'react';
import { sloganData } from '../data/slogans';
import CopyCard from '../components/CopyCard';
import SectionHead from '../components/SectionHead';
import SelectBar from '../components/SelectBar';
import GenerateSheet from '../components/GenerateSheet';
import styles from './Slogans.module.css';

export default function Slogans() {
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState([]);
  const [showSheet, setShowSheet] = useState(false);

  function toggleItem(text) {
    setSelected((prev) =>
      prev.includes(text) ? prev.filter((t) => t !== text) : [...prev, text]
    );
  }

  function handleCancel() {
    setSelectMode(false);
    setSelected([]);
  }

  return (
    <div className="page-content">
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Slogans</h1>
        <button
          className={`${styles.selectToggle} ${selectMode ? styles.selectActive : ''}`}
          onClick={selectMode ? handleCancel : () => setSelectMode(true)}
        >
          {selectMode ? 'Cancel' : 'Select'}
        </button>
      </div>

      <SectionHead title="Top Picks" />
      {sloganData.top.map((item, i) => (
        <CopyCard
          key={i}
          cat={item.label}
          text={item.text}
          selectable={selectMode}
          selected={selected.includes(item.text)}
          onToggle={toggleItem}
        />
      ))}

      <SectionHead title={sloganData.family1.title} sub={sloganData.family1.sub} />
      {sloganData.family1.items.map((text, i) => (
        <CopyCard
          key={i}
          text={text}
          selectable={selectMode}
          selected={selected.includes(text)}
          onToggle={toggleItem}
        />
      ))}

      <SectionHead title={sloganData.family2.title} sub={sloganData.family2.sub} />
      {sloganData.family2.items.map((text, i) => (
        <CopyCard
          key={i}
          text={text}
          selectable={selectMode}
          selected={selected.includes(text)}
          onToggle={toggleItem}
        />
      ))}

      <SelectBar
        count={selected.length}
        onClear={() => setSelected([])}
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
