import { sloganData } from '../data/slogans';
import CopyCard from '../components/CopyCard';
import SectionHead from '../components/SectionHead';
import styles from './Slogans.module.css';

export default function Slogans() {
  return (
    <div className="page-content">
      <h1 className={styles.pageTitle}>Slogans</h1>

      <SectionHead title="Top Picks" />
      {sloganData.top.map((item, i) => (
        <CopyCard key={i} cat={item.label} text={item.text} />
      ))}

      <SectionHead title={sloganData.family1.title} sub={sloganData.family1.sub} />
      {sloganData.family1.items.map((text, i) => (
        <CopyCard key={i} text={text} />
      ))}

      <SectionHead title={sloganData.family2.title} sub={sloganData.family2.sub} />
      {sloganData.family2.items.map((text, i) => (
        <CopyCard key={i} text={text} />
      ))}
    </div>
  );
}
