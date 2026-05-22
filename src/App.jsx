import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import BottomNav from './components/BottomNav';
import Brand from './pages/Brand';
import CopyVault from './pages/CopyVault';
import Keywords from './pages/Keywords';
import Campaigns from './pages/Campaigns';
import Slogans from './pages/Slogans';
import Prompts from './pages/Prompts';
import Contact from './pages/Contact';
import styles from './App.module.css';

const pages = {
  brand: Brand,
  copy: CopyVault,
  keywords: Keywords,
  campaigns: Campaigns,
  slogans: Slogans,
  prompts: Prompts,
  contact: Contact,
};

export default function App() {
  const [active, setActive] = useState('brand');
  const Page = pages[active];

  return (
    <div className={styles.app}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className={styles.pageWrap}
        >
          <Page />
        </motion.div>
      </AnimatePresence>
      <BottomNav active={active} onChange={setActive} />
    </div>
  );
}
