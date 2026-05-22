import styles from './BottomNav.module.css';

const tabs = [
  { id: 'brand', label: 'Brand', icon: BishopIcon },
  { id: 'copy', label: 'Copy', icon: QuoteIcon },
  { id: 'keywords', label: 'Keywords', icon: SearchIcon },
  { id: 'campaigns', label: 'Campaigns', icon: MegaphoneIcon },
  { id: 'slogans', label: 'Slogans', icon: BoltIcon },
  { id: 'prompts', label: 'Prompts', icon: TerminalIcon },
  { id: 'contact', label: 'Contact', icon: ContactIcon },
];

function BishopIcon({ active }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2C8.5 2 7.5 3 7.5 4C7.5 5 8 5.5 8 6L6 9H14L12 6C12 5.5 12.5 5 12.5 4C12.5 3 11.5 2 10 2Z" fill={active ? '#F07B00' : 'currentColor'} />
      <rect x="5" y="14" width="10" height="2" rx="1" fill={active ? '#F07B00' : 'currentColor'} />
      <path d="M6 9L5 14H15L14 9H6Z" fill={active ? '#F07B00' : 'currentColor'} opacity="0.7" />
    </svg>
  );
}

function QuoteIcon({ active }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 7C4 5.9 4.9 5 6 5H8C9.1 5 10 5.9 10 7V9C10 10.1 9.1 11 8 11H7L5 15H4V11C4 11 4 10.1 4 10V7Z" fill={active ? '#F07B00' : 'currentColor'} />
      <path d="M11 7C11 5.9 11.9 5 13 5H15C16.1 5 17 5.9 17 7V9C17 10.1 16.1 11 15 11H14L12 15H11V11C11 11 11 10.1 11 10V7Z" fill={active ? '#F07B00' : 'currentColor'} />
    </svg>
  );
}

function SearchIcon({ active }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="9" cy="9" r="5" stroke={active ? '#F07B00' : 'currentColor'} strokeWidth="1.5" />
      <path d="M13 13L17 17" stroke={active ? '#F07B00' : 'currentColor'} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MegaphoneIcon({ active }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M14 4L6 8H4C3.4 8 3 8.4 3 9V11C3 11.6 3.4 12 4 12H6L14 16V4Z" fill={active ? '#F07B00' : 'currentColor'} />
      <path d="M17 7C17.6 7.6 18 8.7 18 10C18 11.3 17.6 12.4 17 13" stroke={active ? '#F07B00' : 'currentColor'} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 12L7 16H8.5L7.5 12" fill={active ? '#F07B00' : 'currentColor'} opacity="0.6" />
    </svg>
  );
}

function BoltIcon({ active }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M11 2L4 11H10L9 18L16 9H10L11 2Z" fill={active ? '#F07B00' : 'currentColor'} />
    </svg>
  );
}

function TerminalIcon({ active }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="16" height="12" rx="2" stroke={active ? '#F07B00' : 'currentColor'} strokeWidth="1.5" />
      <path d="M6 8L9 10L6 12" stroke={active ? '#F07B00' : 'currentColor'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 12H14" stroke={active ? '#F07B00' : 'currentColor'} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ContactIcon({ active }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="3" width="14" height="14" rx="2" stroke={active ? '#F07B00' : 'currentColor'} strokeWidth="1.5" />
      <circle cx="10" cy="8" r="2" fill={active ? '#F07B00' : 'currentColor'} />
      <path d="M6 14C6 12 7.8 11 10 11C12.2 11 14 12 14 14" stroke={active ? '#F07B00' : 'currentColor'} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function BottomNav({ active, onChange }) {
  function handleTab(id) {
    if (navigator.vibrate) navigator.vibrate(10);
    onChange(id);
  }

  return (
    <nav className={styles.nav}>
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className={`${styles.tab} ${active === id ? styles.active : ''}`}
          onClick={() => handleTab(id)}
          aria-label={label}
        >
          <Icon active={active === id} />
          <span className={styles.label}>{label}</span>
        </button>
      ))}
    </nav>
  );
}
