import { BrainCircuit } from 'lucide-react';
import styles from './BrainIcon.module.css';

export default function BrainIcon() {
  return (
    <div className={styles.brainIconContainer}>
      <div className={styles.brainIconWrapper}>
        <BrainCircuit
          size={280}
          strokeWidth={1}
          className={styles.brainIcon}
        />
        <div className={styles.accentRing} />
        <div className={styles.accentDots}>
          <div className={styles.dot} />
          <div className={styles.dot} />
          <div className={styles.dot} />
        </div>
      </div>
    </div>
  );
}
