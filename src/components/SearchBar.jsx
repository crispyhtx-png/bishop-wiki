import { useRef, useEffect, useState } from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar({ value, onChange, placeholder = 'Search…' }) {
  const inputRef = useRef(null);
  const [timer, setTimer] = useState(null);

  function handleChange(e) {
    const val = e.target.value;
    if (timer) clearTimeout(timer);
    const t = setTimeout(() => onChange(val), 150);
    setTimer(t);
    // Update input directly for visual responsiveness
    e.target.value = val;
  }

  function handleClear() {
    if (inputRef.current) inputRef.current.value = '';
    onChange('');
  }

  return (
    <div className={styles.wrap}>
      <svg className={styles.icon} width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input
        ref={inputRef}
        className={styles.input}
        type="search"
        defaultValue={value}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
      {value && (
        <button className={styles.clear} onClick={handleClear} aria-label="Clear">
          ×
        </button>
      )}
    </div>
  );
}
