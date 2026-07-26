import React, { useEffect, useRef, useState } from 'react';
import { educationData, experienceData, projectData } from '../../data/timelineData';
import styles from './Timeline.module.scss';

const allData = [...educationData, ...experienceData, ...projectData].sort((a, b) => {
  const yearA = parseInt(a.date.split(' - ')[0]);
  const yearB = parseInt(b.date.split(' - ')[0]);
  return yearA - yearB;
});

const Timeline = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, entry.target.dataset.index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = document.querySelectorAll(`.${styles.timelineItem}`);
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.timelineWrapper}>
      <div className={styles.timelineLine} />
      <ul className={styles.timeline} role="list">
        {allData.map((entry, index) => (
          <li
            key={entry.id}
            className={`${styles.timelineItem} ${visibleItems.has(index.toString()) ? styles.visible : styles.hidden}`}
            data-index={index}
            aria-label={`${entry.type}: ${entry.title}`}
          >
            <div className={styles.content}>
              <span className={styles.date}>{entry.date}</span>
              <h3 className={styles.title}>{entry.title}</h3>
              {entry.institution && <p className={styles.org}>{entry.institution}</p>}
              {entry.organization && <p className={styles.org}>{entry.organization}</p>}
              <p className={styles.description}>{entry.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timeline;