import { motion, AnimatePresence } from 'motion/react';
import styles from './SelectBar.module.css';

export default function SelectBar({ count, onClear, onGenerate }) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          className={styles.bar}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        >
          <span className={styles.count}>
            {count} selected
          </span>
          <button className={styles.clearBtn} onClick={onClear}>
            Clear
          </button>
          <button className={styles.generateBtn} onClick={onGenerate}>
            Generate →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
